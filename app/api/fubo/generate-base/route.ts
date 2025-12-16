/**
 * FUBO Base Image Generation API Proxy
 *
 * This route proxies base image generation requests (Step 1 of the two-step process)
 * to the Python Flask backend.
 */

import { NextRequest, NextResponse } from 'next/server';

const PYTHON_BACKEND_URL = process.env.FUBO_BACKEND_URL || 'http://localhost:5001';

export async function POST(request: NextRequest) {
  try {
    // Get the form data from the request
    const formData = await request.formData();

    // Forward the request to the Python backend
    const response = await fetch(`${PYTHON_BACKEND_URL}/generate_base_image`, {
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

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Base image generation error:', error);

    if (error.code === 'ECONNREFUSED') {
      return NextResponse.json(
        {
          error: 'Python backend is not running. Please start it with: cd public/prototypes/fubo/backend && python app.py'
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: `Failed to generate base image: ${error.message}` },
      { status: 500 }
    );
  }
}
