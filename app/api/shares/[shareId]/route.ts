/**
 * GET /api/shares/[shareId]
 *
 * Get a recipe by share ID
 * Public endpoint - no authentication required
 * Increments view count
 */

import { NextRequest, NextResponse } from 'next/server';
import { getRecipeByShareId, serializeRecipe, serializeShare } from '@/lib/firestore/recipes';
import { logger } from '@/lib/utils/logger';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shareId: string }> }
) {
  try {
    // Get shareId from params
    const { shareId } = await params;

    // Get recipe by share ID
    const { recipe, share } = await getRecipeByShareId(shareId);

    if (!recipe || !share) {
      return NextResponse.json(
        { error: 'Recipe not found or share link invalid' },
        { status: 404 }
      );
    }

    // Check if expired
    if (share.expiresAt && share.expiresAt.toMillis() < Date.now()) {
      return NextResponse.json(
        { error: 'Share link has expired' },
        { status: 410 } // 410 Gone
      );
    }

    logger.log('[Get Shared Recipe] Recipe accessed:', {
      shareId,
      recipeId: recipe.id,
      views: share.views,
    });

    return NextResponse.json({
      success: true,
      recipe: serializeRecipe(recipe),
      share: serializeShare(share),
    });
  } catch (error) {
    logger.error('[Get Shared Recipe] Error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      { error: 'Failed to get recipe', details: errorMessage },
      { status: 500 }
    );
  }
}
