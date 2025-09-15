export interface OpenSkyCredentials {
  clientId: string;
  clientSecret: string;
}

export interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface TokenCache {
  access_token: string | null;
  exp: number;
}

export interface FlightData {
  icao24: string;
  callsign?: string;
  estDepartureAirport?: string;
  estArrivalAirport?: string;
  firstSeen: number;
  lastSeen: number;
}

export interface ProcessedFlight {
  icao24: string;
  callsign?: string;
  estDepartureAirport?: string;
  estArrivalAirport?: string;
  firstSeen: Date;
  lastSeen: Date;
  dep_local: Date;
  arr_local: Date;
  duration_hours: number;
}

export interface AirportData {
  ident: string;
  name?: string;
  municipality?: string;
  iata_code?: string;
  label?: string;
}

export interface StateVector {
  icao24: string;
  callsign: string | null;
  origin_country: string;
  time_position: number | null;
  last_contact: number;
  longitude: number | null;
  latitude: number | null;
  baro_altitude: number | null;
  on_ground: boolean;
  velocity: number | null;
  true_track: number | null;
  vertical_rate: number | null;
  sensors: number[] | null;
  geo_altitude: number | null;
  squawk: string | null;
  spi: boolean;
  position_source: number;
}

export interface StatesResponse {
  time: number;
  states: (string | number | boolean | null)[][] | null;
}
