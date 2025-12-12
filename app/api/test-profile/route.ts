/**
 * Test endpoint to debug user profile retrieval
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAdminUserProfile } from '@/lib/auth/firebase-admin';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Test UIDs from our check
    const testUIDs = {
      'hanson': 'aOIBYRp5dETUrEJuDfKJzDoaWNr1',
      'athletesfirst': 'fK5eymD5gVYAruWkzOu76pb6AuS2',
      'creait': 'qIGcgI5iEGX6KRc6alAana9bbAb2',
    };

    const results: Record<string, any> = {};

    for (const [name, uid] of Object.entries(testUIDs)) {
      const profile = await getAdminUserProfile(uid);
      results[name] = {
        uid,
        profileExists: !!profile,
        hasRole: profile ? !!profile.role : false,
        role: profile?.role || null,
        clientId: profile?.clientId || null,
        email: profile?.email || null,
        fullProfile: profile,
      };
    }

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to test profiles', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
