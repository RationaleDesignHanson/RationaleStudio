'use client';

import type { ShoppingList } from '@/components/heirloom/shared/shopping-lab/shopping';

interface ShoppingListViewProps {
  shoppingList: ShoppingList | null;
  onBack: () => void;
}

export function ShoppingListView({ shoppingList, onBack }: ShoppingListViewProps) {
  if (!shoppingList) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
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
          Add some recipes and click "Generate List" to create your shopping list
        </p>
        <button
          onClick={onBack}
          className="mt-6 px-4 py-2 bg-heirloom-coral text-white text-sm font-medium rounded-md hover:bg-heirloom-coral/90"
        >
          Go to Recipes
        </button>
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
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-lg font-bold text-gray-900">Shopping List</h4>
            <p className="text-sm text-gray-600 mt-1">
              {shoppingList.items.length} item{shoppingList.items.length !== 1 ? 's' : ''} •
              {' '}From {shoppingList.recipes.length} recipe{shoppingList.recipes.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-heirloom-sage text-white text-sm font-medium rounded-md hover:bg-heirloom-sage/90"
          >
            Back to Recipes
          </button>
        </div>

        {/* Recipe Source List */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <p className="text-xs font-medium text-gray-700 mb-2">Recipes:</p>
          <div className="flex flex-wrap gap-2">
            {shoppingList.recipes.map((recipe) => (
              <span
                key={recipe.id}
                className="inline-flex items-center px-3 py-1 bg-heirloom-cream text-gray-800 text-xs font-medium rounded-full"
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
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category}>
              <h5 className="text-sm font-bold text-heirloom-coral uppercase tracking-wide mb-3">
                {category}
              </h5>
              <div className="space-y-2">
                {itemsByCategory[category].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 bg-heirloom-cream/50 rounded-md hover:bg-heirloom-cream transition-colors"
                  >
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 text-heirloom-coral border-gray-300 rounded focus:ring-heirloom-coral"
                    />
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="font-medium text-gray-900">
                          {item.quantity || ''} {item.unit || ''} {item.displayName}
                        </span>
                      </div>
                      {item.recipes && item.recipes.length > 1 && (
                        <p className="text-xs text-gray-500 mt-1">
                          From {item.recipes.length} recipes
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Consolidated from {shoppingList.items.reduce((sum, item) => sum + (item.recipes?.length || 1), 0)} original ingredient lines
            </span>
            <span className="font-medium text-heirloom-coral">
              Reduced to {shoppingList.items.length} items
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
