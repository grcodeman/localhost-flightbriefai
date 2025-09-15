import axios from 'axios';
import { 
  OpenSkyCredentials, 
  TokenResponse, 
  TokenCache, 
  FlightData, 
  ProcessedFlight,
  AirportData,
  StatesResponse
} from '../types/opensky';

const TOKEN_URL = "https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token";
const FLIGHTS_URL = "https://opensky-network.org/api/flights/aircraft";
const STATES_URL = "https://opensky-network.org/api/states/all";

// Token cache to avoid unnecessary token requests
const tokenCache: TokenCache = {
  access_token: null,
  exp: 0
};

/**
 * Load OpenSky credentials from environment variables
 */
function loadCredentials(): OpenSkyCredentials {
  const clientId = process.env.OPENSKY_CLIENT_ID;
  const clientSecret = process.env.OPENSKY_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    throw new Error('OPENSKY_CLIENT_ID and OPENSKY_CLIENT_SECRET environment variables must be set');
  }
  
  return { clientId, clientSecret };
}

/**
 * Get access token for OpenSky API, using cache when possible
 */
async function getToken(): Promise<string> {
  // Check if cached token is still valid (with 60 second buffer)
  if (tokenCache.access_token && Date.now() / 1000 < tokenCache.exp - 60) {
    return tokenCache.access_token;
  }
  
  const { clientId, clientSecret } = loadCredentials();
  
  try {
    const response = await axios.post<TokenResponse>(
      TOKEN_URL,
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret
      }),
      {
        timeout: 20000,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    
    const { access_token, expires_in } = response.data;
    tokenCache.access_token = access_token;
    tokenCache.exp = Date.now() / 1000 + (expires_in || 1200);
    
    return access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`OpenSky token request failed: ${error.response?.status} ${error.response?.statusText}`);
    }
    throw error;
  }
}

/**
 * Query flight history for a specific aircraft using ICAO24 hex code
 * Uses 2-day windows with 1-day overlap to handle cross-midnight flights
 * Only returns flights from yesterday and earlier (not partial 'today')
 */
export async function getFlightHistoryByHex(hex24: string, days: number = 7): Promise<FlightData[]> {
  const token = await getToken();
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json'
  };
  
  // Use today's midnight UTC as the 'end' to avoid partial 'today' data
  const endUtc = new Date();
  endUtc.setUTCHours(0, 0, 0, 0);
  
  // Clamp days between 1 and 30 (OpenSky limits)
  const clampedDays = Math.max(1, Math.min(Math.floor(days), 30));
  const startUtc = new Date(endUtc.getTime() - (clampedDays * 24 * 60 * 60 * 1000));
  
  const flights: FlightData[] = [];
  const windowMs = 2 * 24 * 60 * 60 * 1000; // 2 days
  const stepMs = 1 * 24 * 60 * 60 * 1000;   // 1 day overlap
  
  let currentStart = new Date(startUtc);
  
  while (currentStart < endUtc) {
    const currentEnd = new Date(Math.min(currentStart.getTime() + windowMs, endUtc.getTime()));
    
    const params = {
      icao24: hex24.toLowerCase(),
      begin: Math.floor(currentStart.getTime() / 1000),
      end: Math.floor(currentEnd.getTime() / 1000)
    };
    
    try {
      const response = await axios.get<FlightData[]>(FLIGHTS_URL, {
        headers,
        params,
        timeout: 30000
      });
      
      if (response.status === 200 && Array.isArray(response.data)) {
        flights.push(...response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          // No flights in this window, continue
        } else {
          throw new Error(`OpenSky flights request failed: ${error.response?.status} ${error.response?.statusText}`);
        }
      } else {
        throw error;
      }
    }
    
    currentStart = new Date(currentStart.getTime() + stepMs);
  }
  
  // Remove duplicates and sort by first seen
  const uniqueFlights = flights.filter((flight, index, self) => 
    index === self.findIndex(f => 
      f.icao24 === flight.icao24 && 
      f.firstSeen === flight.firstSeen && 
      f.lastSeen === flight.lastSeen
    )
  );
  
  return uniqueFlights.sort((a, b) => a.firstSeen - b.firstSeen);
}

/**
 * Process and format flight data with timezone conversion and duration calculation
 */
export function summarizeFlights(
  flights: FlightData[],
  timezone: string = 'America/Detroit',
  decimals: number = 2
): string[] {
  if (flights.length === 0) {
    return [];
  }
  
  // Filter out flights without airport data and convert to processed format
  const processedFlights: ProcessedFlight[] = flights
    .filter(flight => flight.estDepartureAirport && flight.estArrivalAirport)
    .map(flight => {
      const firstSeen = new Date(flight.firstSeen * 1000);
      const lastSeen = new Date(flight.lastSeen * 1000);
      
      // Convert to local timezone if possible, otherwise keep UTC
      let depLocal: Date;
      let arrLocal: Date;
      
      try {
        depLocal = new Date(firstSeen.toLocaleString('en-US', { timeZone: timezone }));
        arrLocal = new Date(lastSeen.toLocaleString('en-US', { timeZone: timezone }));
      } catch {
        depLocal = firstSeen;
        arrLocal = lastSeen;
      }
      
      const durationHours = (arrLocal.getTime() - depLocal.getTime()) / (1000 * 60 * 60);
      
      return {
        ...flight,
        firstSeen,
        lastSeen,
        dep_local: depLocal,
        arr_local: arrLocal,
        duration_hours: durationHours
      };
    })
    .filter(flight => flight.duration_hours >= 0 && !isNaN(flight.duration_hours));
  
  // Format each flight as a summary line
  return processedFlights.map(flight => {
    const dep = flight.estDepartureAirport || 'Unknown';
    const arr = flight.estArrivalAirport || 'Unknown';
    const callsign = (flight.callsign || '').trim();
    
    // Get timezone abbreviations
    const depTz = getTzAbbreviation(flight.dep_local, timezone);
    const arrTz = getTzAbbreviation(flight.arr_local, timezone);
    
    // Format times
    const depStr = formatDateTime(flight.dep_local);
    const arrStr = formatDateTime(flight.arr_local);
    
    const duration = parseFloat(flight.duration_hours.toFixed(decimals));
    const day = flight.arr_local.toISOString().split('T')[0]; // Use arrival date
    
    return (
      `${day}: ${dep} → ${arr}` +
      (callsign ? ` (${callsign})` : '') +
      ` | start ${depStr} ${depTz} | end ${arrStr} ${arrTz} | dur ${duration.toFixed(decimals)} h`
    );
  });
}

/**
 * Get aircraft near an airport by bounding box
 */
export async function getAircraftNearAirport(
  lat: number,
  lon: number,
  dlat: number = 0.25,
  dlon: number = 0.25,
  limit: number = 10
): Promise<string[]> {
  const params = {
    lamin: lat - dlat,
    lamax: lat + dlat,
    lomin: lon - dlon,
    lomax: lon + dlon
  };
  
  try {
    const response = await axios.get<StatesResponse>(STATES_URL, {
      params,
      timeout: 20000
    });
    
    const states = response.data?.states || [];
    const hexCodes: string[] = [];
    
    for (const state of states) {
      if (state && state[0] && typeof state[0] === 'string') {
        const hex = state[0];
        if (!hexCodes.includes(hex)) {
          hexCodes.push(hex);
          if (hexCodes.length >= limit) break;
        }
      }
    }
    
    return hexCodes;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`OpenSky states request failed: ${error.response?.status} ${error.response?.statusText}`);
    }
    throw error;
  }
}

/**
 * Helper function to get timezone abbreviation
 */
function getTzAbbreviation(date: Date, timezone: string): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      timeZoneName: 'short'
    });
    const parts = formatter.formatToParts(date);
    const tzPart = parts.find(part => part.type === 'timeZoneName');
    return tzPart?.value || '';
  } catch {
    return '';
  }
}

/**
 * Helper function to format date-time
 */
function formatDateTime(date: Date): string {
  return date.toISOString().slice(0, 16).replace('T', ' ');
}
