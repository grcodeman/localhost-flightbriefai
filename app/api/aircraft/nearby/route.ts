import { NextRequest, NextResponse } from 'next/server';
import { getAircraftNearAirport } from '../../../../lib/services/opensky';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get query parameters
    const lat = parseFloat(searchParams.get('lat') || '0');
    const lon = parseFloat(searchParams.get('lon') || '0');
    const dlat = parseFloat(searchParams.get('dlat') || '0.25');
    const dlon = parseFloat(searchParams.get('dlon') || '0.25');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    // Validate coordinates
    if (lat === 0 || lon === 0) {
      return NextResponse.json(
        { error: 'Latitude and longitude parameters are required' },
        { status: 400 }
      );
    }
    
    if (lat < -90 || lat > 90) {
      return NextResponse.json(
        { error: 'Latitude must be between -90 and 90 degrees' },
        { status: 400 }
      );
    }
    
    if (lon < -180 || lon > 180) {
      return NextResponse.json(
        { error: 'Longitude must be between -180 and 180 degrees' },
        { status: 400 }
      );
    }
    
    if (limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: 'Limit must be between 1 and 100' },
        { status: 400 }
      );
    }
    
    // Fetch nearby aircraft
    const aircraftHexCodes = await getAircraftNearAirport(lat, lon, dlat, dlon, limit);
    
    return NextResponse.json({
      location: { lat, lon },
      boundingBox: {
        north: lat + dlat,
        south: lat - dlat,
        east: lon + dlon,
        west: lon - dlon
      },
      aircraft: aircraftHexCodes,
      count: aircraftHexCodes.length
    });
    
  } catch (error) {
    console.error('OpenSky nearby aircraft API error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
