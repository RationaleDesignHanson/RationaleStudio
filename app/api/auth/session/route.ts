/**
 * Session Management API Route
 *
 * Creates secure Firebase session cookies for authenticated sessions
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminAuth, getAdminUserProfile } from '@/lib/auth/firebase-admin';

// Force dynamic rendering (don't prerender at build time)
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { idToken } = body;

    if (!idToken) {
      return NextResponse.json(
        { error: 'Missing Firebase ID token' },
        { status: 400 }
      );
    }

    // Log environment variable status for debugging
    console.log('[Session API] Environment check:', {
      hasProjectId: !!process.env.FIREBASE_PROJECT_ID,
      hasClientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
      hasPrivateKey: !!process.env.FIREBASE_PRIVATE_KEY,
      privateKeyPrefix: process.env.FIREBASE_PRIVATE_KEY?.substring(0, 30),
    });

    // Verify the Firebase ID token using Firebase Admin SDK
    const adminAuth = await getAdminAuth();
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Get user profile from Firestore using Admin SDK (bypasses security rules)
    const userProfile = await getAdminUserProfile(uid);

    console.log('[Session API] User profile lookup:', {
      uid,
      profileFound: !!userProfile,
      profile: userProfile,
    });

    if (!userProfile || !userProfile.role) {
      console.error('[Session API] Profile validation failed:', {
        hasProfile: !!userProfile,
        hasRole: userProfile ? !!userProfile.role : false,
        role: userProfile?.role || null,
      });
      return NextResponse.json(
        { error: 'User profile not found or missing role' },
        { status: 403 }
      );
    }

    // Create Firebase session cookie (expires in 7 days)
    const expiresIn = 60 * 60 * 24 * 7 * 1000; // 7 days in ms
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    });

    // Set secure HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set('session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return NextResponse.json({
      success: true,
      user: {
        uid: userProfile.uid,
        email: userProfile.email,
        role: userProfile.role,
        name: userProfile.name,
      },
    });
  } catch (error) {
    console.error('Session creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create session', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    // Clear session cookie
    const cookieStore = await cookies();
    cookieStore.delete('session');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Session deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete session' },
      { status: 500 }
    );
  }
}
