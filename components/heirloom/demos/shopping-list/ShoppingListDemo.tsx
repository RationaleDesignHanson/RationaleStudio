'use client';

import React, { useState, useMemo } from 'react';
import { RecipeSelector, type Recipe } from './RecipeSelector';
import { ShoppingList } from './ShoppingList';
import {
  parseIngredients,
  aggregateIngredients,
  type AggregatedIngredient,
} from '@/components/heirloom/shared/ingredientParser';

// Sample Recipes
const SAMPLE_RECIPES: Recipe[] = [
  {
    id: 'lasagna',
    name: 'Classic Lasagna',
    prepTime: 30,
    cookTime: 60,
    servings: 8,
    emoji: '🍝',
    ingredients: [
      '1 lb ground beef',
      '1 onion, diced',
      '3 cloves garlic, minced',
      '2 cans (28 oz) crushed tomatoes',
      '2 tbsp tomato paste',
      '2 tsp dried basil',
      '1 tsp dried oregano',
      '1/2 tsp salt',
      '1/4 tsp black pepper',
      '12 lasagna noodles',
      '15 oz ricotta cheese',
      '2 cups shredded mozzarella',
      '1/2 cup grated parmesan',
      '1 egg',
      '2 tbsp fresh parsley, chopped',
    ],
  },
  {
    id: 'cookies',
    name: 'Chocolate Chip Cookies',
    prepTime: 15,
    cookTime: 12,
    servings: 24,
    emoji: '🍪',
    ingredients: [
      '2 1/4 cups all-purpose flour',
      '1 tsp baking soda',
      '1 tsp salt',
      '1 cup butter, softened',
      '3/4 cup granulated sugar',
      '3/4 cup packed brown sugar',
      '2 large eggs',
      '2 tsp vanilla extract',
      '2 cups chocolate chips',
    ],
  },
  {
    id: 'soup',
    name: "Grandma's Chicken Soup",
    prepTime: 20,
    cookTime: 45,
    servings: 6,
    emoji: '🍲',
    ingredients: [
      '1 whole chicken (3-4 lbs)',
      '8 cups water',
      '3 carrots, sliced',
      '3 celery stalks, sliced',
      '1 onion, diced',
      '3 cloves garlic, minced',
      '2 bay leaves',
      '1 tsp dried thyme',
      '1 tsp salt',
      '1/2 tsp black pepper',
      '2 cups egg noodles',
      '2 tbsp fresh parsley, chopped',
    ],
  },
  {
    id: 'salad',
    name: 'Caesar Salad',
    prepTime: 15,
    cookTime: 0,
    servings: 4,
    emoji: '🥗',
    ingredients: [
      '1 head romaine lettuce, chopped',
      '1/2 cup grated parmesan',
      '1 cup croutons',
      '2 cloves garlic, minced',
      '2 tbsp lemon juice',
      '1 tsp dijon mustard',
      '1/2 cup olive oil',
      '1 egg',
      '1/4 tsp salt',
      '1/4 tsp black pepper',
    ],
  },
  {
    id: 'tacos',
    name: 'Beef Tacos',
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    emoji: '🌮',
    ingredients: [
      '1 lb ground beef',
      '1 onion, diced',
      '2 cloves garlic, minced',
      '1 tbsp chili powder',
      '1 tsp cumin',
      '1/2 tsp paprika',
      '1/2 tsp salt',
      '1/4 tsp black pepper',
      '8 taco shells',
      '2 cups shredded lettuce',
      '1 cup diced tomatoes',
      '1 cup shredded cheddar cheese',
      '1/2 cup sour cream',
    ],
  },
];

export function ShoppingListDemo() {
  const [selectedRecipes, setSelectedRecipes] = useState<Set<string>>(new Set());

  const toggleRecipe = (recipeId: string) => {
    const newSelected = new Set(selectedRecipes);
    if (newSelected.has(recipeId)) {
      newSelected.delete(recipeId);
    } else {
      newSelected.add(recipeId);
    }
    setSelectedRecipes(newSelected);
  };

  // Calculate aggregated shopping list
  const aggregatedList = useMemo<AggregatedIngredient[]>(() => {
    if (selectedRecipes.size === 0) return [];

    const selectedRecipeData = SAMPLE_RECIPES.filter((r) => selectedRecipes.has(r.id));

    const recipeIngredients = selectedRecipeData.map((recipe) => ({
      recipeName: recipe.name,
      ingredients: parseIngredients(recipe.ingredients),
    }));

    return aggregateIngredients(recipeIngredients);
  }, [selectedRecipes]);

  // Stats
  const totalRecipes = selectedRecipes.size;
  const totalIngredients = aggregatedList.length;
  const uniqueCategories = new Set(aggregatedList.map((ing) => ing.category)).size;

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-serif mb-3" style={{ color: 'var(--color-text-dark)' }}>
          Smart Shopping List
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select multiple recipes and watch as Heirloom intelligently aggregates ingredients,
          combining quantities and organizing by category for efficient shopping.
        </p>
      </div>

      {/* Stats Bar */}
      {totalRecipes > 0 && (
        <div className="mb-6 grid grid-cols-3 gap-4">
          <StatCard
            icon="📖"
            label="Recipes"
            value={totalRecipes}
            color="#F59E0B"
          />
          <StatCard
            icon=""
            label="Ingredients"
            value={totalIngredients}
            color="#10B981"
          />
          <StatCard
            icon=""
            label="Categories"
            value={uniqueCategories}
            color="#3B82F6"
          />
        </div>
      )}

      <div className="grid lg:grid-cols-[350px,1fr] gap-6">
        {/* Left: Recipe Selector */}
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
          <RecipeSelector
            recipes={SAMPLE_RECIPES}
            selectedRecipes={selectedRecipes}
            onToggleRecipe={toggleRecipe}
          />
        </div>

        {/* Right: Shopping List */}
        <div>
          <ShoppingList ingredients={aggregatedList} />

          {/* Intelligence Callout */}
          {totalRecipes > 1 && (
            <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🤖</span>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Smart Aggregation
                  </h3>
                  <p className="text-sm text-blue-800 mb-3">
                    Notice how ingredients like garlic, onions, and black pepper appear
                    just once, with quantities combined across {totalRecipes} recipes.
                    Click the recipe badges to see the breakdown.
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-white rounded-lg p-3">
                      <p className="font-medium text-blue-900 mb-1">
                         Quantity Conversion
                      </p>
                      <p className="text-blue-700">
                        Adds 1/2 cup + 3/4 cup automatically
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="font-medium text-blue-900 mb-1">
                         Smart Grouping
                      </p>
                      <p className="text-blue-700">
                        Combines "2 cloves" + "3 cloves" garlic
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="font-medium text-blue-900 mb-1">
                         Category Organization
                      </p>
                      <p className="text-blue-700">
                        Groups by store aisle for efficiency
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="font-medium text-blue-900 mb-1">
                         Source Tracking
                      </p>
                      <p className="text-blue-700">
                        Shows which recipes need each item
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* First Time Tips */}
          {totalRecipes === 0 && (
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">👈</span>
                <div>
                  <h3 className="font-semibold text-amber-900 mb-2">
                    Try It Out!
                  </h3>
                  <p className="text-sm text-amber-800 mb-3">
                    Select 2-3 recipes from the left to see the magic happen:
                  </p>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Ingredients are automatically combined</li>
                    <li>• Quantities are added together intelligently</li>
                    <li>• Items are organized by store section</li>
                    <li>• Check off items as you shop</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ========== STAT CARD ==========

interface StatCardProps {
  icon: string;
  label: string;
  value: number;
  color: string;
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  return (
    <div
      className="bg-white rounded-xl border-2 p-4 flex items-center gap-3"
      style={{ borderColor: `${color}40` }}
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
        style={{ backgroundColor: `${color}20` }}
      >
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold" style={{ color }}>
          {value}
        </p>
        <p className="text-xs text-gray-600">{label}</p>
      </div>
    </div>
  );
}
