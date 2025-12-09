'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  type AggregatedIngredient,
  type IngredientCategory,
  formatQuantity,
  CATEGORY_LABELS,
  CATEGORY_ICONS,
  CATEGORY_AISLE_HINTS,
} from '@/components/heirloom/shared/ingredientParser';

interface ShoppingListProps {
  ingredients: AggregatedIngredient[];
  onIngredientCheck?: (ingredient: AggregatedIngredient, checked: boolean) => void;
}

export function ShoppingList({ ingredients, onIngredientCheck }: ShoppingListProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [expandedRecipes, setExpandedRecipes] = useState<Set<string>>(new Set());

  // Group ingredients by category
  const groupedIngredients = ingredients.reduce((acc, ing) => {
    if (!acc[ing.category]) {
      acc[ing.category] = [];
    }
    acc[ing.category].push(ing);
    return acc;
  }, {} as Record<IngredientCategory, AggregatedIngredient[]>);

  const handleCheck = (ing: AggregatedIngredient) => {
    const key = `${ing.ingredient}::${ing.unit}`;
    const newChecked = new Set(checkedItems);

    if (newChecked.has(key)) {
      newChecked.delete(key);
    } else {
      newChecked.add(key);
    }

    setCheckedItems(newChecked);
    onIngredientCheck?.(ing, !checkedItems.has(key));
  };

  const toggleRecipeExpand = (key: string) => {
    const newExpanded = new Set(expandedRecipes);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedRecipes(newExpanded);
  };

  // Calculate progress
  const totalItems = ingredients.length;
  const checkedCount = checkedItems.size;
  const progress = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Progress Bar */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Shopping Progress</h3>
            <p className="text-sm text-gray-600">
              {checkedCount} of {totalItems} items
            </p>
          </div>
          <div className="text-3xl">
            {progress === 100 ? '🎉' : ''}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 to-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {progress === 100 && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-green-600 font-medium mt-3"
          >
            All items checked! Ready to cook! 🎉
          </motion.p>
        )}
      </div>

      {/* Shopping List by Category */}
      {Object.entries(groupedIngredients).map(([category, items]) => (
        <CategorySection
          key={category}
          category={category as IngredientCategory}
          items={items}
          checkedItems={checkedItems}
          expandedRecipes={expandedRecipes}
          onCheck={handleCheck}
          onToggleRecipe={toggleRecipeExpand}
        />
      ))}

      {/* Empty State */}
      {ingredients.length === 0 && (
        <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
          <div className="text-5xl mb-3">🍳</div>
          <p className="text-gray-600 font-medium">No recipes selected</p>
          <p className="text-sm text-gray-500 mt-1">
            Select recipes to generate your shopping list
          </p>
        </div>
      )}
    </div>
  );
}

// ========== CATEGORY SECTION ==========

interface CategorySectionProps {
  category: IngredientCategory;
  items: AggregatedIngredient[];
  checkedItems: Set<string>;
  expandedRecipes: Set<string>;
  onCheck: (ing: AggregatedIngredient) => void;
  onToggleRecipe: (key: string) => void;
}

function CategorySection({
  category,
  items,
  checkedItems,
  expandedRecipes,
  onCheck,
  onToggleRecipe,
}: CategorySectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const checkedCount = items.filter((ing) => {
    const key = `${ing.ingredient}::${ing.unit}`;
    return checkedItems.has(key);
  }).length;

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
      {/* Category Header */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{CATEGORY_ICONS[category]}</span>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-gray-900">
              {CATEGORY_LABELS[category]}
            </h3>
            <p className="text-xs text-gray-500">
              {CATEGORY_AISLE_HINTS[category]}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">
            {checkedCount}/{items.length}
          </span>
          <motion.span
            animate={{ rotate: isCollapsed ? -90 : 0 }}
            className="text-gray-400"
          >
            ▼
          </motion.span>
        </div>
      </button>

      {/* Category Items */}
      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t-2 border-gray-100"
          >
            <div className="divide-y divide-gray-100">
              {items.map((ing) => (
                <IngredientItem
                  key={`${ing.ingredient}::${ing.unit}`}
                  ingredient={ing}
                  isChecked={checkedItems.has(`${ing.ingredient}::${ing.unit}`)}
                  isRecipeExpanded={expandedRecipes.has(`${ing.ingredient}::${ing.unit}`)}
                  onCheck={() => onCheck(ing)}
                  onToggleRecipe={() => onToggleRecipe(`${ing.ingredient}::${ing.unit}`)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ========== INGREDIENT ITEM ==========

interface IngredientItemProps {
  ingredient: AggregatedIngredient;
  isChecked: boolean;
  isRecipeExpanded: boolean;
  onCheck: () => void;
  onToggleRecipe: () => void;
}

function IngredientItem({
  ingredient,
  isChecked,
  isRecipeExpanded,
  onCheck,
  onToggleRecipe,
}: IngredientItemProps) {
  const formattedQty = formatQuantity(ingredient.totalQuantity);
  const unit = ingredient.unit ? ` ${ingredient.unit}` : '';
  const hasMultipleRecipes = ingredient.fromRecipes.length > 1;

  return (
    <div className="px-6 py-4">
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={onCheck}
          className="flex-shrink-0 w-6 h-6 mt-0.5 rounded-md border-2 border-gray-300 flex items-center justify-center transition-all"
          style={{
            backgroundColor: isChecked ? '#10B981' : 'white',
            borderColor: isChecked ? '#10B981' : '#D1D5DB',
          }}
        >
          {isChecked && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-white text-sm font-bold"
            >
              
            </motion.span>
          )}
        </button>

        {/* Ingredient Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <p
              className={`font-medium transition-all ${
                isChecked ? 'line-through text-gray-400' : 'text-gray-900'
              }`}
            >
              <span className="text-amber-600">{formattedQty}{unit}</span> {ingredient.ingredient}
            </p>

            {/* Recipe Badge */}
            {hasMultipleRecipes && (
              <button
                onClick={onToggleRecipe}
                className="flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium transition-colors"
                style={{
                  backgroundColor: '#FEF3C7',
                  color: '#92400E',
                }}
              >
                {ingredient.fromRecipes.length} recipes
              </button>
            )}
          </div>

          {/* Notes */}
          {ingredient.notes && (
            <p className="text-sm text-gray-500 mt-0.5">
              {ingredient.notes}
            </p>
          )}

          {/* Recipe Breakdown (expandable) */}
          <AnimatePresence>
            {isRecipeExpanded && hasMultipleRecipes && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-2 pl-3 border-l-2 border-amber-200"
              >
                <p className="text-xs font-medium text-gray-600 mb-1">Used in:</p>
                {ingredient.fromRecipes.map((recipe, idx) => (
                  <p key={idx} className="text-xs text-gray-500">
                    • {recipe}
                  </p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
