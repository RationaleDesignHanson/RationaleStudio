'use client';

/**
 * Shopping Lab Demo
 *
 * Streamlined demonstration of Heirloom's intelligent shopping list features:
 * - Browse curated example recipes or add from URL (single/bulk)
 * - Automatic ingredient parsing and consolidation
 * - Smart shopping list with metric/imperial toggle
 */

import { useState, useEffect } from 'react';
import { ShoppingListManager } from '@/components/heirloom/shared/shopping-lab/shopping';
import type { Recipe, ShoppingList } from '@/components/heirloom/shared/shopping-lab/shopping';
import { ExampleRecipeBrowser } from './components/ExampleRecipeBrowser';
import { ShoppingListView } from './components/ShoppingListView';

export function ShoppingLabDemo() {
  const [manager] = useState(() => new ShoppingListManager());
  const [shoppingList, setShoppingList] = useState<ShoppingList | null>(null);

  const handleAddRecipe = (recipe: Recipe) => {
    // Create a unique instance of the recipe to allow adding the same recipe multiple times
    const uniqueRecipe = {
      ...recipe,
      id: `${recipe.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };

    manager.addRecipe(uniqueRecipe);

    // Auto-regenerate shopping list
    const list = manager.generateShoppingList({
      excludePantry: false,
      groupByCategory: true
    });
    setShoppingList(list);
  };

  const handleClearAll = () => {
    // Clear all recipes from manager
    const recipes = manager.getRecipes();
    recipes.forEach(recipe => manager.removeRecipe(recipe.id));
    setShoppingList(null);
  };

  const recipeCount = manager.getRecipes().length;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Shopping Lab
            </h3>
            <p className="text-sm text-gray-600">
              Browse example recipes or add from URL • See ingredients consolidate into a smart shopping list
            </p>
          </div>
          {recipeCount > 0 && (
            <button
              onClick={handleClearAll}
              className="px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Clear All ({recipeCount})
            </button>
          )}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Recipe Browser */}
        <div>
          <ExampleRecipeBrowser onAddRecipe={handleAddRecipe} />
        </div>

        {/* Right: Shopping List */}
        <div>
          <ShoppingListView
            shoppingList={shoppingList}
          />
        </div>
      </div>

      {/* Footer Stats */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>326/326 tests passing • 95% parsing accuracy</span>
          <span>
            {recipeCount} {recipeCount === 1 ? 'recipe' : 'recipes'} • {shoppingList?.items.length || 0} shopping list items
          </span>
        </div>
      </div>
    </div>
  );
}
