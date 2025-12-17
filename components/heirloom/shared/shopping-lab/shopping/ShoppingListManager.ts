/**
 * Shopping List Manager
 *
 * Manages recipes, pantry items, and generates smart shopping lists
 * that consolidate ingredients across multiple recipes and subtract
 * what's already in the pantry.
 */

import { ConsolidationEngine, RecipeInput } from '../consolidator';
import { IngredientParser } from '../parser';
import { UnitConverter } from '../units';
import { Recipe, PantryItem, ShoppingList, ShoppingListItem, ShoppingListOptions } from './types';

export class ShoppingListManager {
  private recipes: Map<string, Recipe>;
  private pantry: Map<string, PantryItem>;  // canonical name -> pantry item
  private consolidationEngine: ConsolidationEngine;
  private parser: IngredientParser;
  private unitConverter: UnitConverter;

  constructor() {
    this.recipes = new Map();
    this.pantry = new Map();
    this.consolidationEngine = new ConsolidationEngine();
    this.parser = new IngredientParser();
    this.unitConverter = new UnitConverter();
  }

  // ===========================================================================
  // RECIPE MANAGEMENT
  // ===========================================================================

  /**
   * Add a recipe to the shopping list
   */
  addRecipe(recipe: Recipe): void {
    this.recipes.set(recipe.id, recipe);
  }

  /**
   * Remove a recipe from the shopping list
   */
  removeRecipe(recipeId: string): void {
    this.recipes.delete(recipeId);
  }

  /**
   * Update an existing recipe
   */
  updateRecipe(recipeId: string, recipe: Recipe): void {
    if (!this.recipes.has(recipeId)) {
      throw new Error(`Recipe ${recipeId} not found`);
    }
    this.recipes.set(recipeId, recipe);
  }

  /**
   * Get all recipes
   */
  getRecipes(): Recipe[] {
    return Array.from(this.recipes.values());
  }

  /**
   * Get a single recipe by ID
   */
  getRecipe(recipeId: string): Recipe | null {
    return this.recipes.get(recipeId) || null;
  }

  /**
   * Clear all recipes
   */
  clearRecipes(): void {
    this.recipes.clear();
  }

  // ===========================================================================
  // RECIPE SCALING
  // ===========================================================================

  /**
   * Scale a recipe to a target number of servings
   */
  scaleRecipe(recipeId: string, targetServings: number): Recipe {
    const recipe = this.recipes.get(recipeId);
    if (!recipe) {
      throw new Error(`Recipe ${recipeId} not found`);
    }

    if (recipe.servings === 0) {
      throw new Error(`Recipe ${recipeId} has 0 servings - cannot scale`);
    }

    const scaleFactor = targetServings / recipe.servings;

    // Scale each ingredient line
    const scaledIngredients = recipe.ingredientLines.map(line => {
      const parsed = this.parser.parse(line);

      // If no quantity, return original
      if (!parsed.quantity) {
        return line;
      }

      // Scale the quantity
      const scaledQuantity = parsed.quantity.value * scaleFactor;

      // Rebuild the ingredient string
      const parts: string[] = [];

      // Add scaled quantity
      parts.push(this.formatQuantity(scaledQuantity));

      // Add unit
      if (parsed.unit) {
        parts.push(parsed.unit.canonical);
      }

      // Add ingredient
      parts.push(parsed.ingredient.canonical);

      // Add modifiers
      if (parsed.modifiers.length > 0) {
        parts.push(`(${parsed.modifiers.join(', ')})`);
      }

      // Add preparation
      if (parsed.preparation.length > 0) {
        parts.push(`- ${parsed.preparation.join(', ')}`);
      }

      return parts.join(' ');
    });

    return {
      ...recipe,
      servings: targetServings,
      ingredientLines: scaledIngredients,
    };
  }

  // ===========================================================================
  // PANTRY MANAGEMENT
  // ===========================================================================

  /**
   * Add an item to the pantry
   */
  addPantryItem(ingredient: string, quantity: number, unit: string | null = null): void {
    // Parse and normalize the ingredient
    const parsed = this.parser.parse(`${quantity} ${unit || ''} ${ingredient}`.trim());

    const pantryItem: PantryItem = {
      canonical: parsed.ingredient.canonical,
      displayName: parsed.ingredient.canonical,
      quantity: parsed.quantity?.value || quantity,
      unit: parsed.unit?.canonical || unit,
      category: parsed.ingredient.category,
      addedAt: new Date(),
    };

    // If item already exists, add to quantity
    const existing = this.pantry.get(pantryItem.canonical);
    if (existing && existing.unit === pantryItem.unit) {
      existing.quantity += pantryItem.quantity;
    } else {
      this.pantry.set(pantryItem.canonical, pantryItem);
    }
  }

  /**
   * Remove an item from the pantry
   */
  removePantryItem(canonical: string): void {
    this.pantry.delete(canonical);
  }

  /**
   * Update pantry item quantity
   */
  updatePantryItem(canonical: string, quantity: number): void {
    const item = this.pantry.get(canonical);
    if (!item) {
      throw new Error(`Pantry item ${canonical} not found`);
    }
    item.quantity = quantity;
  }

  /**
   * Get all pantry items
   */
  getPantryItems(): PantryItem[] {
    return Array.from(this.pantry.values());
  }

  /**
   * Clear all pantry items
   */
  clearPantry(): void {
    this.pantry.clear();
  }

  // ===========================================================================
  // SHOPPING LIST GENERATION
  // ===========================================================================

  /**
   * Generate a shopping list from all recipes
   */
  generateShoppingList(options: ShoppingListOptions = {}): ShoppingList {
    const {
      excludePantry = false,
      scaleRecipes = new Map(),
      groupByCategory = true,
    } = options;

    // Get recipes (with optional scaling)
    const recipesToConsolidate: RecipeInput[] = [];
    for (const recipe of this.recipes.values()) {
      const targetServings = scaleRecipes.get(recipe.id);
      const recipeToUse = targetServings
        ? this.scaleRecipe(recipe.id, targetServings)
        : recipe;

      recipesToConsolidate.push({
        id: recipeToUse.id,
        name: recipeToUse.name,
        ingredientLines: recipeToUse.ingredientLines,
        servings: recipeToUse.servings,
      });
    }

    // Consolidate ingredients
    const consolidated = this.consolidationEngine.consolidate(recipesToConsolidate);

    // Build shopping list items
    const items: ShoppingListItem[] = consolidated.ingredients.map(ing => {
      const pantryItem = this.pantry.get(ing.canonical);

      let needed = ing.totalQuantity;
      let inPantry: number | null = null;

      // Subtract pantry if requested
      if (excludePantry && pantryItem && ing.totalQuantity !== null) {
        inPantry = pantryItem.quantity;

        // Try to convert pantry unit to ingredient unit
        if (pantryItem.unit && ing.unit) {
          const pantryUnitInfo = this.unitConverter.parseUnit(pantryItem.unit);
          if (pantryUnitInfo) {
            const converted = this.unitConverter.convert(
              pantryItem.quantity,
              pantryUnitInfo,
              ing.unit
            );

            if (converted !== null) {
              needed = Math.max(0, ing.totalQuantity - converted);
            }
          }
        } else if (pantryItem.unit === ing.unit?.canonical || (!pantryItem.unit && !ing.unit)) {
          // Same unit or both null - direct subtraction
          needed = Math.max(0, ing.totalQuantity - pantryItem.quantity);
        }
      }

      return {
        canonical: ing.canonical,
        displayName: ing.displayName,
        quantity: needed,
        unit: ing.unit?.canonical || null,
        category: ing.category,
        recipes: ing.recipes,
        needed,
        inPantry,
        hasConflict: ing.hasConflict,
        conflictReason: ing.conflictReason,
      };
    });

    // Filter out items with needed = 0
    const filteredItems = items.filter(item => item.needed === null || item.needed > 0);

    // Sort by category if requested
    if (groupByCategory) {
      filteredItems.sort((a, b) => {
        if (a.category !== b.category) {
          return a.category.localeCompare(b.category);
        }
        return a.displayName.localeCompare(b.displayName);
      });
    }

    // Calculate pantry items used
    const pantryItemsUsed = items.filter(item => item.inPantry !== null && item.inPantry > 0).length;

    return {
      items: filteredItems,
      summary: {
        totalItems: filteredItems.length,
        totalRecipes: this.recipes.size,
        pantryItemsUsed,
      },
      recipes: Array.from(this.recipes.values()),
      lastUpdated: new Date(),
    };
  }

  // ===========================================================================
  // UTILITIES
  // ===========================================================================

  /**
   * Format a quantity for display
   */
  private formatQuantity(value: number): string {
    // Check for common fractions
    const fractions: Record<number, string> = {
      0.125: '1/8',
      0.25: '1/4',
      0.333: '1/3',
      0.375: '3/8',
      0.5: '1/2',
      0.625: '5/8',
      0.666: '2/3',
      0.75: '3/4',
      0.875: '7/8',
    };

    // Check if value is close to a fraction
    for (const [decimal, fraction] of Object.entries(fractions)) {
      if (Math.abs(value - parseFloat(decimal)) < 0.01) {
        return fraction;
      }
    }

    // Check for mixed fractions (e.g., 1.5 -> 1 1/2)
    const whole = Math.floor(value);
    const remainder = value - whole;

    for (const [decimal, fraction] of Object.entries(fractions)) {
      if (Math.abs(remainder - parseFloat(decimal)) < 0.01) {
        return whole > 0 ? `${whole} ${fraction}` : fraction;
      }
    }

    // Otherwise, format as decimal
    if (value % 1 === 0) {
      return value.toString();
    }

    return value.toFixed(2).replace(/\.?0+$/, '');
  }

  /**
   * Export shopping list as formatted text
   */
  exportAsText(shoppingList: ShoppingList): string {
    const lines: string[] = [];

    lines.push(`Shopping List - ${shoppingList.lastUpdated.toLocaleDateString()}`);
    lines.push(`Recipes: ${shoppingList.recipes.map(r => r.name).join(', ')}`);
    lines.push('');

    // Group by category
    const byCategory = new Map<string, ShoppingListItem[]>();
    for (const item of shoppingList.items) {
      if (!byCategory.has(item.category)) {
        byCategory.set(item.category, []);
      }
      byCategory.get(item.category)!.push(item);
    }

    for (const [category, items] of byCategory) {
      lines.push(`## ${category.toUpperCase()}`);
      for (const item of items) {
        const qty = item.quantity !== null ? this.formatQuantity(item.quantity) : '';
        const unit = item.unit || '';
        const conflict = item.hasConflict ? ' ⚠️' : '';
        const pantry = item.inPantry ? ` (have ${this.formatQuantity(item.inPantry)} ${item.unit || ''})` : '';
        lines.push(`☐ ${qty} ${unit} ${item.displayName}${pantry}${conflict}`.trim());
      }
      lines.push('');
    }

    lines.push(`Total: ${shoppingList.summary.totalItems} items`);
    if (shoppingList.summary.pantryItemsUsed > 0) {
      lines.push(`Pantry items used: ${shoppingList.summary.pantryItemsUsed}`);
    }

    return lines.join('\n');
  }
}
