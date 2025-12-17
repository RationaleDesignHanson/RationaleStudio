/**
 * Shopping List Manager Types
 *
 * Types for managing recipes, pantry items, and generating shopping lists
 */

export interface Recipe {
  id: string;
  name: string;
  servings: number;
  ingredientLines: string[];
  url?: string;
  image?: string;
  prepTime?: number;  // minutes
  cookTime?: number;  // minutes
}

export interface PantryItem {
  canonical: string;
  displayName: string;
  quantity: number;
  unit: string | null;
  category: string;
  addedAt: Date;
  expiresAt?: Date;
}

export interface ShoppingListItem {
  canonical: string;
  displayName: string;
  quantity: number | null;
  unit: string | null;
  category: string;
  recipes: string[];  // Recipe names that need this ingredient
  needed: number | null;  // Amount needed after subtracting pantry
  inPantry: number | null;  // Amount already in pantry
  hasConflict: boolean;
  conflictReason?: string;
}

export interface ShoppingListOptions {
  excludePantry?: boolean;  // Subtract pantry items from shopping list
  scaleRecipes?: Map<string, number>;  // recipeId -> target servings
  groupByCategory?: boolean;  // Group items by category in output
}

export interface ShoppingList {
  items: ShoppingListItem[];
  summary: {
    totalItems: number;
    totalRecipes: number;
    pantryItemsUsed: number;
    estimatedCost?: number;
  };
  recipes: Recipe[];
  lastUpdated: Date;
}
