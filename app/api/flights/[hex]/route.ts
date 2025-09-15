import { NextRequest, NextResponse } from 'next/server';
import { getFlightHistoryByHex, summarizeFlights } from '../../../../lib/services/opensky';

export async function GET(
  request: NextRequest,
  { params }: { params: { hex: string } }
) {
  try {
    const { hex } = params;
    const { searchParams } = new URL(request.url);
    
    // Get query parameters with defaults
    const days = parseInt(searchParams.get('days') || '7');
    const timezone = searchParams.get('timezone') || 'America/Detroit';
    const decimals = parseInt(searchParams.get('decimals') || '2');
    const format = searchParams.get('format') || 'summary'; // 'summary' or 'raw'
    
    // Validate hex format (6 characters, alphanumeric)
    if (!/^[a-fA-F0-9]{6}$/.test(hex)) {
      return NextResponse.json(
        { error: 'Invalid ICAO24 hex code format. Must be 6 hexadecimal characters.' },
        { status: 400 }
      );
    }
    
    // Validate days range
    if (days < 1 || days > 30) {
      return NextResponse.json(
        { error: 'Days must be between 1 and 30' },
        { status: 400 }
      );
    }
    
    // Fetch flight data
    const flightData = await getFlightHistoryByHex(hex, days);
    
    if (format === 'raw') {
      return NextResponse.json({
        hex,
        days,
        flights: flightData,
        count: flightData.length
      });
    }
    
    // Return formatted summary
    const summary = summarizeFlights(flightData, timezone, decimals);
    
    return NextResponse.json({
      hex,
      days,
      timezone,
      summary
    });
    
  } catch (error) {
    console.error('OpenSky API error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('OPENSKY_CLIENT_ID')) {
        return NextResponse.json(
          { error: 'OpenSky API credentials not configured' },
          { status: 500 }
        );
      }
      
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
