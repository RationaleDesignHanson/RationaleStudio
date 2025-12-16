/**
 * Session Verification API Route
 *
 * Verifies Firebase session cookies and returns user role.
 * Used by middleware to enforce role-based access control.
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminAuth, getAdminUserProfile } from '@/lib/auth/firebase-admin';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Try to get session cookie from multiple sources
    // 1. From Cookie header (sent by middleware)
    const cookieHeader = request.headers.get('cookie');
    let sessionCookie: string | undefined;

    if (cookieHeader) {
      const cookies = cookieHeader.split(';').map(c => c.trim());
      const sessionCookiePair = cookies.find(c => c.startsWith('session='));
      if (sessionCookiePair) {
        sessionCookie = sessionCookiePair.split('=')[1];
      }
    }

    // 2. Fallback to Next.js cookies() (for direct API calls)
    if (!sessionCookie) {
      const cookieStore = await cookies();
      sessionCookie = cookieStore.get('session')?.value;
    }

    console.log('[Verify API] Cookie check:', {
      hasCookieHeader: !!cookieHeader,
      hasSessionCookie: !!sessionCookie,
      cookieLength: sessionCookie?.length,
    });

    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'No session cookie found' },
        { status: 401 }
      );
    }

    // Verify session cookie using Firebase Admin SDK
    const adminAuth = await getAdminAuth();
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    const uid = decodedClaims.uid;

    // Get user profile from Firestore (contains role)
    const userProfile = await getAdminUserProfile(uid);

    if (!userProfile || !userProfile.role) {
      return NextResponse.json(
        { error: 'User profile not found or missing role' },
        { status: 403 }
      );
    }

    // Return user info for middleware to check
    return NextResponse.json({
      success: true,
      uid: userProfile.uid,
      role: userProfile.role,
      email: userProfile.email,
    });
  } catch (error) {
    console.error('[Verify API] Session verification failed:', error);

    // Check if it's a token expired error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    if (errorMessage.includes('expired') || errorMessage.includes('revoked')) {
      return NextResponse.json(
        { error: 'Session expired or revoked' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Invalid session', details: errorMessage },
      { status: 401 }
    );
  }
}
