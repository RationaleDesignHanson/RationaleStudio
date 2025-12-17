/**
 * Pitch Validation API
 *
 * Server-side endpoint for validating pitch access tokens
 */

import { NextRequest, NextResponse } from 'next/server';
import { validatePitchAccess } from '@/lib/pitch/security';
import { logger } from '@/lib/utils/logger';

// Force dynamic rendering (don't prerender at build time)
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { companySlug, token, username } = await request.json();

    if (!companySlug || !token) {
      return NextResponse.json(
        { valid: false, error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Get client IP
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] ||
                     request.headers.get('x-real-ip') ||
                     'unknown';

    // Validate access
    const result = await validatePitchAccess(
      companySlug,
      token,
      username || null,
      clientIP
    );

    return NextResponse.json(result);
  } catch (error) {
    logger.error('Error in pitch validation API:', error);
    return NextResponse.json(
      { valid: false, error: 'An error occurred while validating access' },
      { status: 500 }
    );
  }
}
