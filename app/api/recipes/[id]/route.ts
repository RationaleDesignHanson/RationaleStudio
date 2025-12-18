/**
 * GET /api/recipes/[id]
 *
 * Get a recipe by ID
 * Requires authentication and ownership
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminAuth } from '@/lib/auth/firebase-admin';
import { getRecipe, serializeRecipe } from '@/lib/firestore/recipes';
import { logger } from '@/lib/utils/logger';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Get session cookie
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Verify session
    const adminAuth = getAdminAuth();
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    const userId = decodedClaims.uid;

    // Get recipe ID from params
    const { id } = await params;

    // Get recipe
    const recipe = await getRecipe(id, userId);

    if (!recipe) {
      return NextResponse.json(
        { error: 'Recipe not found or access denied' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      recipe: serializeRecipe(recipe),
    });
  } catch (error) {
    logger.error('[Get Recipe] Error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    if (errorMessage.includes('expired') || errorMessage.includes('revoked')) {
      return NextResponse.json(
        { error: 'Session expired or revoked' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to get recipe', details: errorMessage },
      { status: 500 }
    );
  }
}
