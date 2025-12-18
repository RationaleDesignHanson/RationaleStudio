'use client';

import { useState } from 'react';
import type { ShoppingList } from '@/components/heirloom/shared/shopping-lab/shopping';
import { UnitConverter } from '@/components/heirloom/shared/shopping-lab/units';

interface ShoppingListViewProps {
  shoppingList: ShoppingList | null;
}

type UnitSystem = 'imperial' | 'metric';

const unitConverter = new UnitConverter('US');

export function ShoppingListView({ shoppingList }: ShoppingListViewProps) {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('imperial');
  const [activeRecipeModal, setActiveRecipeModal] = useState<string | null>(null);

  /**
   * Convert ingredient quantity and unit to the selected unit system
   */
  const convertToSystem = (quantity: number | undefined, unit: string | undefined): { quantity: string; unit: string } => {
    if (!quantity || !unit) {
      return { quantity: quantity?.toString() || '', unit: unit || '' };
    }

    const parsedUnit = unitConverter.parseUnit(unit);
    if (!parsedUnit) {
      return { quantity: quantity.toString(), unit };
    }

    // If already in the correct system, just format nicely
    if (unitSystem === 'imperial' && parsedUnit.system === 'imperial') {
      return { quantity: formatQuantity(quantity, parsedUnit.canonical), unit: parsedUnit.canonical };
    }

    if (unitSystem === 'metric' && parsedUnit.system === 'metric') {
      return { quantity: formatQuantity(quantity, parsedUnit.canonical), unit: parsedUnit.canonical };
    }

    // Need to convert
    if (unitSystem === 'metric') {
      // Convert to metric
      if (parsedUnit.type === 'volume') {
        const mlUnit = unitConverter.parseUnit('ml')!;
        const converted = unitConverter.convert(quantity, parsedUnit, mlUnit);
        if (converted !== null) {
          // Optimize to L if large enough
          if (converted >= 1000) {
            const literUnit = unitConverter.parseUnit('L')!;
            const liters = converted / 1000;
            return { quantity: formatQuantity(liters, 'L'), unit: 'L' };
          }
          return { quantity: formatQuantity(converted, 'ml'), unit: 'ml' };
        }
      } else if (parsedUnit.type === 'weight') {
        const gramUnit = unitConverter.parseUnit('g')!;
        const converted = unitConverter.convert(quantity, parsedUnit, gramUnit);
        if (converted !== null) {
          // Optimize to kg if large enough
          if (converted >= 1000) {
            const kgUnit = unitConverter.parseUnit('kg')!;
            const kg = converted / 1000;
            return { quantity: formatQuantity(kg, 'kg'), unit: 'kg' };
          }
          return { quantity: formatQuantity(converted, 'g'), unit: 'g' };
        }
      }
    } else if (unitSystem === 'imperial') {
      // Convert to imperial
      if (parsedUnit.type === 'volume') {
        const cupUnit = unitConverter.parseUnit('cup')!;
        const converted = unitConverter.convert(quantity, parsedUnit, cupUnit);
        if (converted !== null) {
          const optimized = unitConverter.getBestDisplayUnit(converted, cupUnit);
          return { quantity: formatQuantity(optimized.quantity, optimized.unit.canonical), unit: optimized.unit.canonical };
        }
      } else if (parsedUnit.type === 'weight') {
        const ozUnit = unitConverter.parseUnit('oz')!;
        const converted = unitConverter.convert(quantity, parsedUnit, ozUnit);
        if (converted !== null) {
          const optimized = unitConverter.getBestDisplayUnit(converted, ozUnit);
          return { quantity: formatQuantity(optimized.quantity, optimized.unit.canonical), unit: optimized.unit.canonical };
        }
      }
    }

    // Fallback if conversion failed
    return { quantity: formatQuantity(quantity, parsedUnit.canonical), unit: parsedUnit.canonical };
  };

  /**
   * Format quantity for display with intelligent fraction rounding
   * Converts decimals to common cooking fractions (1/4, 1/3, 1/2, 2/3, 3/4)
   */
  const formatQuantity = (num: number, unit?: string): string => {
    // Check if this is a metric unit (ml, L, g, kg)
    const isMetric = unit && ['ml', 'l', 'g', 'kg'].includes(unit.toLowerCase());

    if (isMetric) {
      // Round metric to nearest 0.25
      const rounded = Math.round(num * 4) / 4;

      // If it's a whole number, return as is
      if (rounded % 1 === 0) {
        return rounded.toString();
      }

      // Otherwise show with decimal (0.25, 0.5, 0.75, etc.)
      return rounded.toFixed(2).replace(/\.?0+$/, '');
    }

    // Imperial units: snap to nearest common cooking fraction
    const fractions: [number, string][] = [
      [0, ''], [0.125, '⅛'], [0.25, '¼'], [0.333, '⅓'], [0.375, '⅜'],
      [0.5, '½'], [0.625, '⅝'], [0.667, '⅔'], [0.75, '¾'], [0.875, '⅞'], [1, '']
    ];

    const intPart = Math.floor(num);
    const fracPart = num - intPart;

    // Find the closest fraction
    let closestFraction = fractions[0];
    let minDiff = Math.abs(fracPart - fractions[0][0]);

    for (const [target, symbol] of fractions) {
      const diff = Math.abs(fracPart - target);
      if (diff < minDiff) {
        minDiff = diff;
        closestFraction = [target, symbol];
      }
    }

    const [closestValue, closestSymbol] = closestFraction;

    // If closest is 0, just return whole number
    if (closestValue === 0) {
      return intPart.toString();
    }

    // If closest is 1, round up to next whole number
    if (closestValue === 1) {
      return (intPart + 1).toString();
    }

    // Return with fraction symbol
    return intPart === 0 ? closestSymbol : `${intPart} ${closestSymbol}`;
  };

  if (!shoppingList) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-center py-12">
          <svg
            className="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h4 className="mt-4 text-lg font-medium text-gray-900">No shopping list yet</h4>
          <p className="mt-2 text-sm text-gray-500">
            Add recipes from the example browser or paste a URL to generate your shopping list
          </p>
        </div>
      </div>
    );
  }

  // Group items by category
  const itemsByCategory = shoppingList.items.reduce((acc, item) => {
    const category = item.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, typeof shoppingList.items>);

  const categories = Object.keys(itemsByCategory).sort();

  return (
    <div>
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 flex flex-col max-h-[700px]">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-gray-900">Shopping List</h4>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {shoppingList.items.length} item{shoppingList.items.length !== 1 ? 's' : ''} •
              {' '}From {shoppingList.recipes.length} recipe{shoppingList.recipes.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Metric/Imperial Toggle */}
          <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 p-0.5 sm:p-1 rounded-lg">
            <button
              onClick={() => setUnitSystem('imperial')}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded transition-colors ${
                unitSystem === 'imperial'
                  ? 'bg-white text-heirloom-coral shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Imperial
            </button>
            <button
              onClick={() => setUnitSystem('metric')}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded transition-colors ${
                unitSystem === 'metric'
                  ? 'bg-white text-heirloom-coral shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Metric
            </button>
          </div>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {/* Recipe Source List */}
          <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
            <p className="text-[10px] sm:text-xs font-medium text-gray-700 mb-2">Recipes:</p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {shoppingList.recipes.map((recipe) => (
                <span
                  key={recipe.id}
                  className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 bg-heirloom-cream text-gray-800 text-[10px] sm:text-xs font-medium rounded-full"
                >
                  {recipe.name}
                  {recipe.servings && (
                    <span className="ml-1 text-gray-500">({recipe.servings})</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Grouped Shopping List */}
          <div className="space-y-4 sm:space-y-6">
            {categories.map((category) => (
              <div key={category}>
                <h5 className="text-xs sm:text-sm font-bold text-heirloom-coral uppercase tracking-wide mb-2 sm:mb-3">
                  {category}
                </h5>
                <div className="space-y-1.5 sm:space-y-2">
                  {itemsByCategory[category].map((item, idx) => {
                    const converted = convertToSystem(item.quantity ?? undefined, item.unit);
                    const itemKey = `${category}-${idx}`;
                    const isModalOpen = activeRecipeModal === itemKey;

                    return (
                      <div
                        key={idx}
                        className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-heirloom-cream/50 rounded-md hover:bg-heirloom-cream transition-colors relative group"
                      >
                        <input
                          type="checkbox"
                          className="mt-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4 text-heirloom-coral border-gray-300 rounded focus:ring-heirloom-coral"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-1 sm:gap-2 flex-wrap">
                            <span className="text-xs sm:text-sm font-medium text-gray-900 break-words">
                              {converted.quantity} {converted.unit} {item.displayName}
                            </span>
                            {item.recipes && item.recipes.length > 1 && (
                              <button
                                onClick={() => setActiveRecipeModal(itemKey)}
                                className="text-[10px] sm:text-xs text-gray-500 hover:text-heirloom-coral cursor-pointer sm:cursor-default"
                              >
                                From {item.recipes.length} recipes
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Desktop Tooltip - hover on entire item */}
                        {item.recipes && item.recipes.length > 1 && (
                          <div className="hidden sm:block absolute left-0 top-full mt-1 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 pointer-events-none">
                            <div className="font-semibold mb-2">Used in:</div>
                            <ul className="space-y-1">
                              {item.recipes.map((recipeName, recipeIdx) => (
                                <li key={recipeIdx} className="flex items-start gap-1.5">
                                  <span className="text-heirloom-coral mt-0.5">•</span>
                                  <span>{recipeName}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm">
            <span className="text-gray-600">
              Consolidated from {shoppingList.items.reduce((sum, item) => sum + (item.recipes?.length || 1), 0)} original ingredient lines
            </span>
            <span className="font-medium text-heirloom-coral">
              Reduced to {shoppingList.items.length} items
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Modal - Recipe List */}
      {activeRecipeModal && (
        <div className="sm:hidden fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white rounded-t-2xl w-full max-h-[70vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900">Used in these recipes:</h3>
              <button
                onClick={() => setActiveRecipeModal(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              {/* Find the item and show its recipes */}
              {categories.map((category) =>
                itemsByCategory[category].map((item, idx) => {
                  const itemKey = `${category}-${idx}`;
                  if (itemKey === activeRecipeModal && item.recipes) {
                    return (
                      <ul key={itemKey} className="space-y-2">
                        {item.recipes.map((recipeName, recipeIdx) => (
                          <li
                            key={recipeIdx}
                            className="flex items-center gap-2 p-3 bg-heirloom-cream/50 rounded-lg"
                          >
                            <span className="text-heirloom-coral">•</span>
                            <span className="text-sm text-gray-900">{recipeName}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return null;
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
