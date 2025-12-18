/**
 * POST /api/recipes/create
 *
 * Create a new recipe in Firestore
 * Requires authentication via session cookie
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminAuth } from '@/lib/auth/firebase-admin';
import { createRecipe, serializeRecipe, type CreateRecipeInput } from '@/lib/firestore/recipes';
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
    const body: Omit<CreateRecipeInput, 'userId'> = await request.json();

    // Validate required fields
    if (!body.title || !body.ingredients || !body.instructions) {
      return NextResponse.json(
        { error: 'Missing required fields: title, ingredients, instructions' },
        { status: 400 }
      );
    }

    // Create recipe
    const { id, recipe } = await createRecipe({
      ...body,
      userId,
    });

    logger.log('[Create Recipe] Recipe created:', { id, userId, title: recipe.title });

    return NextResponse.json({
      success: true,
      recipe: serializeRecipe(recipe),
    });
  } catch (error) {
    logger.error('[Create Recipe] Error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    // Handle session errors
    if (errorMessage.includes('expired') || errorMessage.includes('revoked')) {
      return NextResponse.json(
        { error: 'Session expired or revoked' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create recipe', details: errorMessage },
      { status: 500 }
    );
  }
}
