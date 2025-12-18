/**
 * Firestore Recipes Collection
 *
 * Handles recipe storage, sharing, and social features for Heirloom web app
 * Collections: recipes, shares, recipe_versions (future)
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  Timestamp,
  serverTimestamp,
  QueryConstraint,
} from 'firebase/firestore';
import { getFirebaseDB } from '@/lib/auth/firebase';
import { nanoid } from 'nanoid';

// =============================================================================
// TYPES
// =============================================================================

/**
 * Card style options for recipe personalization
 * Matches iOS app CardStyle enum
 */
export type CardStyle = 'vintage' | 'modern' | 'minimalist' | 'grandma' | 'chef';

/**
 * Source type for recipe attribution
 */
export type SourceType = 'website' | 'cookbook' | 'user' | 'family';

/**
 * Recipe sticker for personalization
 * Matches iOS RecipeSticker model
 */
export interface RecipeSticker {
  id: string;
  stickerAssetName: string;  // Reference to sticker asset
  x: number;                 // Position (0-1 normalized)
  y: number;                 // Position (0-1 normalized)
  rotation: number;          // Degrees
  scale: number;             // 0.5-2.0
}

/**
 * Simple ingredient for recipe storage
 * Full ParsedIngredient type is for processing, this is for storage
 */
export interface RecipeIngredient {
  original: string;          // Original ingredient line
  quantity?: number;
  unit?: string;
  ingredient: string;
  preparation?: string[];
}

/**
 * Complete recipe with social and personalization features
 * Based on iOS Recipe model with web-specific additions
 */
export interface Recipe {
  id: string;
  userId: string;            // Owner's Firebase Auth UID
  title: string;
  imageUrl?: string;
  ingredients: RecipeIngredient[];
  instructions: string[];
  servings?: number;
  prepTime?: string;
  cookTime?: string;

  // Attribution
  sourceType: SourceType;
  sourceURL?: string;
  sourceBookTitle?: string;
  sourcePerson?: string;

  // Social (from iOS model)
  sharedBy?: string;         // Display name of person who shared
  sharedDate?: Timestamp;
  passedDownBy?: string;     // For family recipes
  passedDownMessage?: string;
  generationCount: number;   // How many times it's been forked

  // Personalization (Phase 2)
  cardStyle?: CardStyle;
  stickers?: RecipeSticker[];

  // Metadata
  tags: string[];
  isFavorite: boolean;
  timesCooked: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * Input for creating a new recipe
 */
export interface CreateRecipeInput {
  userId: string;
  title: string;
  imageUrl?: string;
  ingredients: RecipeIngredient[];
  instructions: string[];
  servings?: number;
  prepTime?: string;
  cookTime?: string;
  sourceType: SourceType;
  sourceURL?: string;
  sourceBookTitle?: string;
  sourcePerson?: string;
  tags?: string[];
}

/**
 * Share link for public recipe access
 * Separate collection for anonymous viewing
 */
export interface RecipeShare {
  id: string;                // Firestore document ID
  shareId: string;           // Short URL-friendly ID (nanoid)
  recipeId: string;          // Reference to recipe document
  ownerId: string;           // User who created the share
  createdAt: Timestamp;
  expiresAt?: Timestamp;     // Optional expiration
  views: number;             // Track popularity
  isActive: boolean;         // Can be deactivated without deleting
}

/**
 * Input for creating a share link
 */
export interface CreateShareInput {
  recipeId: string;
  ownerId: string;
  expiresInDays?: number;    // Optional expiration
}

// =============================================================================
// COLLECTION REFERENCES
// =============================================================================

function getRecipesCollection() {
  const db = getFirebaseDB();
  return collection(db, 'recipes');
}

function getSharesCollection() {
  const db = getFirebaseDB();
  return collection(db, 'shares');
}

function getUserRecipesCollection(userId: string) {
  const db = getFirebaseDB();
  return collection(db, 'users', userId, 'recipes');
}

// =============================================================================
// RECIPE OPERATIONS
// =============================================================================

/**
 * Create a new recipe
 * Saves to both /recipes collection and /users/{userId}/recipes subcollection
 */
export async function createRecipe(input: CreateRecipeInput): Promise<{ id: string; recipe: Recipe }> {
  const now = Timestamp.now();

  const recipeData: Omit<Recipe, 'id'> = {
    userId: input.userId,
    title: input.title,
    imageUrl: input.imageUrl,
    ingredients: input.ingredients,
    instructions: input.instructions,
    servings: input.servings,
    prepTime: input.prepTime,
    cookTime: input.cookTime,
    sourceType: input.sourceType,
    sourceURL: input.sourceURL,
    sourceBookTitle: input.sourceBookTitle,
    sourcePerson: input.sourcePerson,
    generationCount: 0,
    tags: input.tags || [],
    isFavorite: false,
    timesCooked: 0,
    createdAt: now,
    updatedAt: now,
  };

  // Save to main recipes collection
  const recipesCol = getRecipesCollection();
  const docRef = await addDoc(recipesCol, recipeData);

  // Also save reference in user's subcollection
  const userRecipesCol = getUserRecipesCollection(input.userId);
  await addDoc(userRecipesCol, {
    recipeId: docRef.id,
    createdAt: now,
  });

  const recipe: Recipe = {
    id: docRef.id,
    ...recipeData,
  };

  return { id: docRef.id, recipe };
}

/**
 * Get recipe by ID
 * Returns null if not found or user doesn't have access
 */
export async function getRecipe(recipeId: string, requestingUserId?: string): Promise<Recipe | null> {
  try {
    const db = getFirebaseDB();
    const recipeDoc = await getDoc(doc(db, 'recipes', recipeId));

    if (!recipeDoc.exists()) {
      return null;
    }

    const data = recipeDoc.data();

    // Check access: owner only for now (Phase 1)
    // In future phases, check if recipe is shared
    if (requestingUserId && data.userId !== requestingUserId) {
      return null;
    }

    return {
      id: recipeDoc.id,
      ...data,
    } as Recipe;
  } catch (error) {
    console.error('[Firestore] Get recipe error:', error);
    return null;
  }
}

/**
 * Get all recipes for a user
 */
export async function getUserRecipes(userId: string): Promise<Recipe[]> {
  try {
    const recipesCol = getRecipesCollection();
    const q = query(
      recipesCol,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Recipe[];
  } catch (error) {
    console.error('[Firestore] Get user recipes error:', error);
    return [];
  }
}

/**
 * Update recipe metadata
 */
export async function updateRecipe(
  recipeId: string,
  userId: string,
  updates: Partial<Omit<Recipe, 'id' | 'userId' | 'createdAt'>>
): Promise<boolean> {
  try {
    const db = getFirebaseDB();
    const recipeRef = doc(db, 'recipes', recipeId);

    // Verify ownership
    const recipeDoc = await getDoc(recipeRef);
    if (!recipeDoc.exists() || recipeDoc.data().userId !== userId) {
      return false;
    }

    await updateDoc(recipeRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error('[Firestore] Update recipe error:', error);
    return false;
  }
}

// =============================================================================
// SHARE OPERATIONS
// =============================================================================

/**
 * Generate unique share ID
 * Uses nanoid for short, URL-friendly IDs (8 characters)
 */
async function generateUniqueShareId(): Promise<string> {
  const sharesCol = getSharesCollection();
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    const shareId = nanoid(8);

    // Check if exists
    const q = query(sharesCol, where('shareId', '==', shareId));
    const existing = await getDocs(q);

    if (existing.empty) {
      return shareId;
    }

    attempts++;
  }

  throw new Error('Failed to generate unique share ID');
}

/**
 * Create a share link for a recipe
 * Generates short URL like /r/abc12345
 */
export async function createShare(input: CreateShareInput): Promise<RecipeShare> {
  const shareId = await generateUniqueShareId();
  const now = Timestamp.now();

  // Calculate expiration if specified
  let expiresAt: Timestamp | undefined;
  if (input.expiresInDays) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + input.expiresInDays);
    expiresAt = Timestamp.fromDate(expiryDate);
  }

  const shareData: Omit<RecipeShare, 'id'> = {
    shareId,
    recipeId: input.recipeId,
    ownerId: input.ownerId,
    createdAt: now,
    expiresAt,
    views: 0,
    isActive: true,
  };

  const sharesCol = getSharesCollection();
  const docRef = await addDoc(sharesCol, shareData);

  return {
    id: docRef.id,
    ...shareData,
  };
}

/**
 * Get recipe by share ID
 * Public access - no authentication required
 * Increments view count
 */
export async function getRecipeByShareId(shareId: string): Promise<{
  recipe: Recipe | null;
  share: RecipeShare | null;
}> {
  try {
    const sharesCol = getSharesCollection();
    const q = query(sharesCol, where('shareId', '==', shareId));
    const shareSnapshot = await getDocs(q);

    if (shareSnapshot.empty) {
      return { recipe: null, share: null };
    }

    const shareDoc = shareSnapshot.docs[0];
    const shareData = shareDoc.data() as Omit<RecipeShare, 'id'>;
    const share: RecipeShare = {
      id: shareDoc.id,
      ...shareData,
    };

    // Check if share is active and not expired
    if (!share.isActive) {
      return { recipe: null, share };
    }

    if (share.expiresAt && share.expiresAt.toMillis() < Date.now()) {
      return { recipe: null, share };
    }

    // Get the recipe
    const db = getFirebaseDB();
    const recipeDoc = await getDoc(doc(db, 'recipes', share.recipeId));

    if (!recipeDoc.exists()) {
      return { recipe: null, share };
    }

    const recipe: Recipe = {
      id: recipeDoc.id,
      ...recipeDoc.data(),
    } as Recipe;

    // Increment view count (fire and forget)
    updateDoc(shareDoc.ref, {
      views: (share.views || 0) + 1,
    }).catch((err) => console.error('Failed to increment views:', err));

    return { recipe, share };
  } catch (error) {
    console.error('[Firestore] Get recipe by share ID error:', error);
    return { recipe: null, share: null };
  }
}

/**
 * Get all shares for a user
 */
export async function getUserShares(userId: string): Promise<RecipeShare[]> {
  try {
    const sharesCol = getSharesCollection();
    const q = query(
      sharesCol,
      where('ownerId', '==', userId),
      where('isActive', '==', true),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as RecipeShare[];
  } catch (error) {
    console.error('[Firestore] Get user shares error:', error);
    return [];
  }
}

/**
 * Deactivate a share (soft delete)
 */
export async function deactivateShare(shareId: string, userId: string): Promise<boolean> {
  try {
    const sharesCol = getSharesCollection();
    const q = query(sharesCol, where('shareId', '==', shareId));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return false;
    }

    const shareDoc = snapshot.docs[0];
    const shareData = shareDoc.data();

    // Verify ownership
    if (shareData.ownerId !== userId) {
      return false;
    }

    await updateDoc(shareDoc.ref, {
      isActive: false,
    });

    return true;
  } catch (error) {
    console.error('[Firestore] Deactivate share error:', error);
    return false;
  }
}

// =============================================================================
// SERIALIZATION HELPERS
// =============================================================================

/**
 * Convert Firestore Recipe to JSON-serializable format
 * For use in API responses and Next.js server components
 */
export function serializeRecipe(recipe: Recipe): Omit<Recipe, 'createdAt' | 'updatedAt' | 'sharedDate'> & {
  createdAt: string;
  updatedAt: string;
  sharedDate?: string;
} {
  return {
    ...recipe,
    createdAt: recipe.createdAt instanceof Timestamp
      ? recipe.createdAt.toDate().toISOString()
      : recipe.createdAt,
    updatedAt: recipe.updatedAt instanceof Timestamp
      ? recipe.updatedAt.toDate().toISOString()
      : recipe.updatedAt,
    sharedDate: recipe.sharedDate instanceof Timestamp
      ? recipe.sharedDate.toDate().toISOString()
      : recipe.sharedDate,
  };
}

/**
 * Convert Firestore RecipeShare to JSON-serializable format
 */
export function serializeShare(share: RecipeShare): Omit<RecipeShare, 'createdAt' | 'expiresAt'> & {
  createdAt: string;
  expiresAt?: string;
} {
  return {
    ...share,
    createdAt: share.createdAt instanceof Timestamp
      ? share.createdAt.toDate().toISOString()
      : share.createdAt,
    expiresAt: share.expiresAt instanceof Timestamp
      ? share.expiresAt.toDate().toISOString()
      : share.expiresAt,
  };
}
