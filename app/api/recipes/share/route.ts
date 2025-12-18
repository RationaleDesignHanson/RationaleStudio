/**
 * POST /api/recipes/share
 *
 * Create a share link for a recipe
 * Requires authentication and ownership
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminAuth } from '@/lib/auth/firebase-admin';
import { createShare, getRecipe, serializeShare, type CreateShareInput } from '@/lib/firestore/recipes';
import { logger } from '@/lib/utils/logger';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
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

    // Parse request body
    const body: { recipeId: string; expiresInDays?: number } = await request.json();

    if (!body.recipeId) {
      return NextResponse.json(
        { error: 'Missing required field: recipeId' },
        { status: 400 }
      );
    }

    // Verify ownership
    const recipe = await getRecipe(body.recipeId, userId);
    if (!recipe) {
      return NextResponse.json(
        { error: 'Recipe not found or access denied' },
        { status: 404 }
      );
    }

    // Create share
    const shareInput: CreateShareInput = {
      recipeId: body.recipeId,
      ownerId: userId,
      expiresInDays: body.expiresInDays,
    };

    const share = await createShare(shareInput);

    logger.log('[Share Recipe] Share created:', {
      shareId: share.shareId,
      recipeId: share.recipeId,
      userId,
    });

    return NextResponse.json({
      success: true,
      share: serializeShare(share),
      shareUrl: `/r/${share.shareId}`,
    });
  } catch (error) {
    logger.error('[Share Recipe] Error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    if (errorMessage.includes('expired') || errorMessage.includes('revoked')) {
      return NextResponse.json(
        { error: 'Session expired or revoked' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create share', details: errorMessage },
      { status: 500 }
    );
  }
}
