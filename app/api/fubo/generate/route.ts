/**
 * FUBO Thumbnail Generator API Proxy
 *
 * This route proxies image generation requests to the Python Flask backend
 * running on localhost:5001. The backend handles all the complex Gemini API
 * logic, team data, style processing, etc.
 *
 * Note: Requires the Python Flask backend to be running:
 * cd public/prototypes/fubo/backend && python app.py
 */

import { NextRequest, NextResponse } from 'next/server';

const PYTHON_BACKEND_URL = process.env.FUBO_BACKEND_URL || 'http://localhost:5001';

export async function POST(request: NextRequest) {
  try {
    // Get the form data from the request
    const formData = await request.formData();

    // Forward the request to the Python backend
    const response = await fetch(`${PYTHON_BACKEND_URL}/generate`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend error:', errorText);
      return NextResponse.json(
        { error: `Backend error: ${response.statusText}` },
        { status: response.status }
      );
    }

    // Get the JSON response from Python backend
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error('API route error:', error);

    // Check if it's a connection error (Python backend not running)
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ECONNREFUSED') {
      return NextResponse.json(
        {
          error: 'Python backend is not running. Please start it with: cd public/prototypes/fubo/backend && python app.py'
        },
        { status: 503 }
      );
    }

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to generate image: ${errorMessage}` },
      { status: 500 }
    );
  }
}

/**
 * Handle bulk generation requests
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${PYTHON_BACKEND_URL}/generate_bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend error:', errorText);
      return NextResponse.json(
        { error: `Backend error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error('Bulk generation error:', error);

    if (error && typeof error === 'object' && 'code' in error && error.code === 'ECONNREFUSED') {
      return NextResponse.json(
        {
          error: 'Python backend is not running. Please start it with: cd public/prototypes/fubo/backend && python app.py'
        },
        { status: 503 }
      );
    }

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to generate images: ${errorMessage}` },
      { status: 500 }
    );
  }
}
