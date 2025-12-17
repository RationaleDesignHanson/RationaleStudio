/**
 * Shopping List Manager Tests
 */

import { describe, test, expect, beforeEach } from 'vitest';
import { ShoppingListManager } from './ShoppingListManager';
import { Recipe } from './types';

describe('ShoppingListManager', () => {
  let manager: ShoppingListManager;

  beforeEach(() => {
    manager = new ShoppingListManager();
  });

  // ===========================================================================
  // RECIPE MANAGEMENT
  // ===========================================================================

  describe('recipe management', () => {
    test('adds a recipe', () => {
      const recipe: Recipe = {
        id: 'recipe1',
        name: 'Pancakes',
        servings: 4,
        ingredientLines: ['2 cups flour', '1 cup milk', '2 eggs'],
      };

      manager.addRecipe(recipe);
      const recipes = manager.getRecipes();

      expect(recipes).toHaveLength(1);
      expect(recipes[0].name).toBe('Pancakes');
    });

    test('removes a recipe', () => {
      const recipe: Recipe = {
        id: 'recipe1',
        name: 'Pancakes',
        servings: 4,
        ingredientLines: ['2 cups flour'],
      };

      manager.addRecipe(recipe);
      manager.removeRecipe('recipe1');

      expect(manager.getRecipes()).toHaveLength(0);
    });

    test('updates a recipe', () => {
      const recipe: Recipe = {
        id: 'recipe1',
        name: 'Pancakes',
        servings: 4,
        ingredientLines: ['2 cups flour'],
      };

      manager.addRecipe(recipe);

      const updated: Recipe = {
        ...recipe,
        name: 'Waffles',
      };

      manager.updateRecipe('recipe1', updated);
      const result = manager.getRecipe('recipe1');

      expect(result?.name).toBe('Waffles');
    });

    test('throws error when updating non-existent recipe', () => {
      const recipe: Recipe = {
        id: 'recipe1',
        name: 'Pancakes',
        servings: 4,
        ingredientLines: ['2 cups flour'],
      };

      expect(() => {
        manager.updateRecipe('nonexistent', recipe);
      }).toThrow();
    });

    test('clears all recipes', () => {
      manager.addRecipe({
        id: 'recipe1',
        name: 'Recipe 1',
        servings: 4,
        ingredientLines: ['1 cup flour'],
      });

      manager.addRecipe({
        id: 'recipe2',
        name: 'Recipe 2',
        servings: 2,
        ingredientLines: ['1 cup sugar'],
      });

      manager.clearRecipes();
      expect(manager.getRecipes()).toHaveLength(0);
    });
  });

  // ===========================================================================
  // RECIPE SCALING
  // ===========================================================================

  describe('recipe scaling', () => {
    test('scales recipe up (double servings)', () => {
      const recipe: Recipe = {
        id: 'recipe1',
        name: 'Cookies',
        servings: 12,
        ingredientLines: [
          '2 cups flour',
          '1 cup sugar',
          '1/2 cup butter',
        ],
      };

      manager.addRecipe(recipe);
      const scaled = manager.scaleRecipe('recipe1', 24);

      expect(scaled.servings).toBe(24);
      expect(scaled.ingredientLines[0]).toContain('4');  // 2 * 2 = 4
      expect(scaled.ingredientLines[1]).toContain('2');  // 1 * 2 = 2
      expect(scaled.ingredientLines[2]).toContain('1');  // 0.5 * 2 = 1
    });

    test('scales recipe down (half servings)', () => {
      const recipe: Recipe = {
        id: 'recipe1',
        name: 'Cookies',
        servings: 12,
        ingredientLines: [
          '4 cups flour',
          '2 cups sugar',
        ],
      };

      manager.addRecipe(recipe);
      const scaled = manager.scaleRecipe('recipe1', 6);

      expect(scaled.servings).toBe(6);
      expect(scaled.ingredientLines[0]).toContain('2');  // 4 * 0.5 = 2
      expect(scaled.ingredientLines[1]).toContain('1');  // 2 * 0.5 = 1
    });

    test('scales "to taste" ingredients correctly', () => {
      const recipe: Recipe = {
        id: 'recipe1',
        name: 'Pasta',
        servings: 4,
        ingredientLines: [
          '1 lb pasta',
          'salt to taste',
        ],
      };

      manager.addRecipe(recipe);
      const scaled = manager.scaleRecipe('recipe1', 8);

      expect(scaled.ingredientLines[0]).toContain('2');  // 1 * 2 = 2
      // "salt to taste" becomes "1+ pinch salt", which scales to "2+ pinch salt"
      expect(scaled.ingredientLines[1]).toContain('2');
      expect(scaled.ingredientLines[1]).toContain('pinch');
      expect(scaled.ingredientLines[1]).toContain('salt');
    });

    test('throws error when scaling non-existent recipe', () => {
      expect(() => {
        manager.scaleRecipe('nonexistent', 4);
      }).toThrow();
    });

    test('throws error when scaling recipe with 0 servings', () => {
      const recipe: Recipe = {
        id: 'recipe1',
        name: 'Recipe',
        servings: 0,
        ingredientLines: ['1 cup flour'],
      };

      manager.addRecipe(recipe);

      expect(() => {
        manager.scaleRecipe('recipe1', 4);
      }).toThrow();
    });
  });

  // ===========================================================================
  // PANTRY MANAGEMENT
  // ===========================================================================

  describe('pantry management', () => {
    test('adds item to pantry', () => {
      manager.addPantryItem('flour', 5, 'cup');

      const pantry = manager.getPantryItems();
      expect(pantry).toHaveLength(1);
      expect(pantry[0].canonical).toBe('all-purpose flour');
      expect(pantry[0].quantity).toBe(5);
    });

    test('combines quantities when adding same item', () => {
      manager.addPantryItem('flour', 2, 'cup');
      manager.addPantryItem('flour', 3, 'cup');

      const pantry = manager.getPantryItems();
      expect(pantry).toHaveLength(1);
      expect(pantry[0].quantity).toBe(5);
    });

    test('removes item from pantry', () => {
      manager.addPantryItem('flour', 5, 'cup');
      manager.removePantryItem('all-purpose flour');

      expect(manager.getPantryItems()).toHaveLength(0);
    });

    test('updates pantry item quantity', () => {
      manager.addPantryItem('flour', 5, 'cup');
      manager.updatePantryItem('all-purpose flour', 10);

      const pantry = manager.getPantryItems();
      expect(pantry[0].quantity).toBe(10);
    });

    test('throws error when updating non-existent pantry item', () => {
      expect(() => {
        manager.updatePantryItem('nonexistent', 5);
      }).toThrow();
    });

    test('clears all pantry items', () => {
      manager.addPantryItem('flour', 5, 'cup');
      manager.addPantryItem('sugar', 3, 'cup');

      manager.clearPantry();
      expect(manager.getPantryItems()).toHaveLength(0);
    });
  });

  // ===========================================================================
  // SHOPPING LIST GENERATION
  // ===========================================================================

  describe('shopping list generation', () => {
    test('generates list from single recipe', () => {
      const recipe: Recipe = {
        id: 'recipe1',
        name: 'Cookies',
        servings: 12,
        ingredientLines: [
          '2 cups flour',
          '1 cup sugar',
          '2 eggs',
        ],
      };

      manager.addRecipe(recipe);
      const list = manager.generateShoppingList();

      expect(list.items.length).toBeGreaterThan(0);
      expect(list.summary.totalRecipes).toBe(1);
      expect(list.recipes[0].name).toBe('Cookies');
    });

    test('consolidates ingredients from multiple recipes', () => {
      manager.addRecipe({
        id: 'recipe1',
        name: 'Cookies',
        servings: 12,
        ingredientLines: ['2 cups flour', '1 cup sugar'],
      });

      manager.addRecipe({
        id: 'recipe2',
        name: 'Cake',
        servings: 8,
        ingredientLines: ['3 cups flour', '2 cups sugar'],
      });

      const list = manager.generateShoppingList();

      // Should consolidate flour and sugar
      const flour = list.items.find(item => item.canonical === 'all-purpose flour');
      const sugar = list.items.find(item => item.canonical === 'sugar');

      expect(flour?.quantity).toBe(5);  // 2 + 3
      expect(sugar?.quantity).toBe(3);  // 1 + 2
    });

    test('subtracts pantry items when excludePantry is true', () => {
      manager.addRecipe({
        id: 'recipe1',
        name: 'Cookies',
        servings: 12,
        ingredientLines: ['5 cups flour', '2 cups sugar'],
      });

      manager.addPantryItem('flour', 2, 'cup');
      manager.addPantryItem('sugar', 1, 'cup');

      const list = manager.generateShoppingList({ excludePantry: true });

      const flour = list.items.find(item => item.canonical === 'all-purpose flour');
      const sugar = list.items.find(item => item.canonical === 'sugar');

      expect(flour?.needed).toBe(3);  // 5 - 2
      expect(flour?.inPantry).toBe(2);
      expect(sugar?.needed).toBe(1);  // 2 - 1
      expect(sugar?.inPantry).toBe(1);
    });

    test('does not subtract pantry when excludePantry is false', () => {
      manager.addRecipe({
        id: 'recipe1',
        name: 'Cookies',
        servings: 12,
        ingredientLines: ['5 cups flour'],
      });

      manager.addPantryItem('flour', 2, 'cup');

      const list = manager.generateShoppingList({ excludePantry: false });

      const flour = list.items.find(item => item.canonical === 'all-purpose flour');
      expect(flour?.quantity).toBe(5);  // Not reduced
      expect(flour?.inPantry).toBeNull();
    });

    test('filters out items completely covered by pantry', () => {
      manager.addRecipe({
        id: 'recipe1',
        name: 'Cookies',
        servings: 12,
        ingredientLines: ['2 cups flour'],
      });

      manager.addPantryItem('flour', 5, 'cup');  // More than needed

      const list = manager.generateShoppingList({ excludePantry: true });

      const flour = list.items.find(item => item.canonical === 'all-purpose flour');
      expect(flour).toBeUndefined();  // Filtered out
    });

    test('scales recipes before consolidation', () => {
      manager.addRecipe({
        id: 'recipe1',
        name: 'Cookies',
        servings: 12,
        ingredientLines: ['2 cups flour'],
      });

      const scaleMap = new Map([['recipe1', 24]]);  // Double the recipe
      const list = manager.generateShoppingList({ scaleRecipes: scaleMap });

      const flour = list.items.find(item => item.canonical === 'all-purpose flour');
      expect(flour?.quantity).toBe(4);  // 2 * 2
    });

    test('groups items by category', () => {
      manager.addRecipe({
        id: 'recipe1',
        name: 'Mixed',
        servings: 4,
        ingredientLines: [
          '1 cup flour',
          '1 lb chicken',
          '1 cup sugar',
        ],
      });

      const list = manager.generateShoppingList({ groupByCategory: true });

      // Check that items are grouped (baking ingredients together, meat separate)
      const categories = list.items.map(item => item.category);
      const uniqueCategories = Array.from(new Set(categories));

      expect(uniqueCategories.length).toBeGreaterThan(1);
    });

    test('includes recipe names in shopping list items', () => {
      manager.addRecipe({
        id: 'recipe1',
        name: 'Cookies',
        servings: 12,
        ingredientLines: ['2 cups flour'],
      });

      manager.addRecipe({
        id: 'recipe2',
        name: 'Cake',
        servings: 8,
        ingredientLines: ['3 cups flour'],
      });

      const list = manager.generateShoppingList();

      const flour = list.items.find(item => item.canonical === 'all-purpose flour');
      expect(flour?.recipes).toContain('Cookies');
      expect(flour?.recipes).toContain('Cake');
    });

    test('tracks pantry items used in summary', () => {
      manager.addRecipe({
        id: 'recipe1',
        name: 'Cookies',
        servings: 12,
        ingredientLines: ['2 cups flour', '1 cup sugar'],
      });

      manager.addPantryItem('flour', 1, 'cup');

      const list = manager.generateShoppingList({ excludePantry: true });

      expect(list.summary.pantryItemsUsed).toBe(1);
    });
  });

  // ===========================================================================
  // TEXT EXPORT
  // ===========================================================================

  describe('text export', () => {
    test('exports shopping list as formatted text', () => {
      manager.addRecipe({
        id: 'recipe1',
        name: 'Cookies',
        servings: 12,
        ingredientLines: ['2 cups flour', '1 cup sugar'],
      });

      const list = manager.generateShoppingList();
      const text = manager.exportAsText(list);

      expect(text).toContain('Shopping List');
      expect(text).toContain('Cookies');
      expect(text.toLowerCase()).toContain('flour');
      expect(text.toLowerCase()).toContain('sugar');
      expect(text).toContain('☐');
    });

    test('includes pantry information in export', () => {
      manager.addRecipe({
        id: 'recipe1',
        name: 'Cookies',
        servings: 12,
        ingredientLines: ['5 cups flour'],
      });

      manager.addPantryItem('flour', 2, 'cup');

      const list = manager.generateShoppingList({ excludePantry: true });
      const text = manager.exportAsText(list);

      expect(text).toContain('have 2 cup');
      expect(text).toContain('Pantry items used: 1');
    });
  });
});
