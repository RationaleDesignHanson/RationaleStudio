'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface Recipe {
  id: string;
  name: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: string[];
  emoji: string;
}

interface RecipeSelectorProps {
  recipes: Recipe[];
  selectedRecipes: Set<string>;
  onToggleRecipe: (recipeId: string) => void;
}

export function RecipeSelector({
  recipes,
  selectedRecipes,
  onToggleRecipe,
}: RecipeSelectorProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          Select Recipes
        </h3>
        <p className="text-sm text-gray-600">
          Choose recipes to add to your shopping list
        </p>
      </div>

      <div className="grid gap-3">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isSelected={selectedRecipes.has(recipe.id)}
            onToggle={() => onToggleRecipe(recipe.id)}
          />
        ))}
      </div>

      {/* Selection Summary */}
      {selectedRecipes.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">✓</span>
            <p className="text-sm font-medium text-amber-900">
              {selectedRecipes.size} {selectedRecipes.size === 1 ? 'recipe' : 'recipes'} selected
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ========== RECIPE CARD ==========

interface RecipeCardProps {
  recipe: Recipe;
  isSelected: boolean;
  onToggle: () => void;
}

function RecipeCard({ recipe, isSelected, onToggle }: RecipeCardProps) {
  const totalTime = recipe.prepTime + recipe.cookTime;
  const ingredientCount = recipe.ingredients.length;

  return (
    <motion.button
      onClick={onToggle}
      className="relative p-4 rounded-xl border-2 text-left transition-all"
      style={{
        backgroundColor: isSelected ? '#FEF3C7' : 'white',
        borderColor: isSelected ? '#F59E0B' : '#E5E7EB',
        boxShadow: isSelected ? '0 4px 12px rgba(245, 158, 11, 0.15)' : '0 2px 4px rgba(0,0,0,0.05)',
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Checkbox */}
      <div
        className="absolute top-4 right-4 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all"
        style={{
          backgroundColor: isSelected ? '#F59E0B' : 'white',
          borderColor: isSelected ? '#F59E0B' : '#D1D5DB',
        }}
      >
        {isSelected && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-white text-sm font-bold"
          >
            ✓
          </motion.span>
        )}
      </div>

      {/* Recipe Info */}
      <div className="pr-10">
        <div className="flex items-start gap-3 mb-2">
          <span className="text-3xl">{recipe.emoji}</span>
          <div>
            <h4 className="font-semibold text-gray-900 text-lg">
              {recipe.name}
            </h4>
            <div className="flex items-center gap-3 mt-1 text-xs text-gray-600">
              <span>⏱️ {totalTime} min</span>
              <span>•</span>
              <span>👥 {recipe.servings} servings</span>
              <span>•</span>
              <span>🥘 {ingredientCount} ingredients</span>
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
