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
    // Get session cookie from request
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'No session cookie found' },
        { status: 401 }
      );
    }

    // Verify session cookie using Firebase Admin SDK
    const adminAuth = getAdminAuth();
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
