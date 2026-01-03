/**
 * Google Places Photos API Route
 * 
 * Fetches hotel photos from Google Places API
 * GET /api/places/photos?name=Hotel+Name&location=City
 */

import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

interface PlacePhoto {
  name: string;
  widthPx: number;
  heightPx: number;
}

interface PlaceResult {
  id: string;
  displayName: {
    text: string;
  };
  photos?: PlacePhoto[];
}

interface PlacesSearchResponse {
  places?: PlaceResult[];
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  const location = searchParams.get('location');

  if (!name) {
    return NextResponse.json(
      { error: 'Missing required parameter: name' },
      { status: 400 }
    );
  }

  if (!GOOGLE_API_KEY) {
    console.error('[Places API] GOOGLE_PLACES_API_KEY not configured');
    return NextResponse.json(
      { error: 'API not configured' },
      { status: 500 }
    );
  }

  try {
    // Step 1: Search for the place using Text Search (New)
    const searchQuery = location ? `${name} ${location}` : name;
    
    const searchResponse = await fetch(
      'https://places.googleapis.com/v1/places:searchText',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GOOGLE_API_KEY,
          'X-Goog-FieldMask': 'places.id,places.displayName,places.photos',
        },
        body: JSON.stringify({
          textQuery: searchQuery,
          maxResultCount: 1,
        }),
      }
    );

    if (!searchResponse.ok) {
      const errorText = await searchResponse.text();
      console.error('[Places API] Search failed:', errorText);
      return NextResponse.json(
        { error: 'Failed to search for place' },
        { status: searchResponse.status }
      );
    }

    const searchData: PlacesSearchResponse = await searchResponse.json();

    if (!searchData.places || searchData.places.length === 0) {
      return NextResponse.json(
        { error: 'Place not found', photos: [] },
        { status: 404 }
      );
    }

    const place = searchData.places[0];

    if (!place.photos || place.photos.length === 0) {
      return NextResponse.json({
        placeId: place.id,
        name: place.displayName.text,
        photos: [],
      });
    }

    // Step 2: Get photo URLs (up to 3 photos)
    const photoPromises = place.photos.slice(0, 3).map(async (photo) => {
      // The photo.name is the resource name, e.g., "places/xxx/photos/yyy"
      const photoUrl = `https://places.googleapis.com/v1/${photo.name}/media?maxHeightPx=500&maxWidthPx=800&key=${GOOGLE_API_KEY}`;
      return photoUrl;
    });

    const photoUrls = await Promise.all(photoPromises);

    return NextResponse.json({
      placeId: place.id,
      name: place.displayName.text,
      photos: photoUrls,
    });

  } catch (error) {
    console.error('[Places API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

