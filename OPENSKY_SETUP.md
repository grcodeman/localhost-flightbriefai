# OpenSky Network API Setup

This document explains how to set up the OpenSky Network API integration for FlightBrief AI.

## Getting OpenSky API Credentials

1. Go to [OpenSky Network](https://opensky-network.org/)
2. Create a free account
3. Navigate to the API section and create an application
4. Note down your `Client ID` and `Client Secret`

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
OPENSKY_CLIENT_ID=your_client_id_here
OPENSKY_CLIENT_SECRET=your_client_secret_here
```

## API Endpoints

### Get Flight History
```
GET /api/flights/[hex]?days=7&timezone=America/Detroit&format=summary
```

**Parameters:**
- `hex` (required): 6-character ICAO24 hex code (e.g., "ab0356")
- `days` (optional): Number of days to look back (1-30, default: 7)
- `timezone` (optional): Timezone for local times (default: "America/Detroit")
- `decimals` (optional): Decimal places for duration (default: 2)
- `format` (optional): "summary" or "raw" (default: "summary")

**Example:**
```bash
curl "http://localhost:3000/api/flights/ab0356?days=14&timezone=America/New_York"
```

### Get Nearby Aircraft
```
GET /api/aircraft/nearby?lat=42.3314&lon=-83.0458&limit=10
```

**Parameters:**
- `lat` (required): Latitude coordinate
- `lon` (required): Longitude coordinate  
- `dlat` (optional): Latitude delta for bounding box (default: 0.25)
- `dlon` (optional): Longitude delta for bounding box (default: 0.25)
- `limit` (optional): Max number of aircraft (1-100, default: 10)

**Example:**
```bash
curl "http://localhost:3000/api/aircraft/nearby?lat=42.3314&lon=-83.0458&limit=20"
```

## Usage in TypeScript/JavaScript

```typescript
import { getFlightHistoryByHex, summarizeFlights, getAircraftNearAirport } from '../lib/services/opensky';

// Get flight history for an aircraft
const flights = await getFlightHistoryByHex('ab0356', 14);
const summary = summarizeFlights(flights, 'America/New_York', 2);

// Get nearby aircraft
const nearbyHex = await getAircraftNearAirport(42.3314, -83.0458, 0.25, 0.25, 10);
```

## Rate Limits

The OpenSky Network API has rate limits:
- Free accounts: 100 requests per day
- Authenticated requests allow higher limits
- The service automatically caches tokens to minimize authentication requests

## Error Handling

The API returns appropriate HTTP status codes:
- `200`: Success
- `400`: Bad request (invalid parameters)
- `404`: No data found
- `500`: Server error (check credentials, rate limits, or OpenSky service status)
