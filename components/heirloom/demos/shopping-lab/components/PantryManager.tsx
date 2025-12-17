'use client';

import { useState } from 'react';
import type { ShoppingListManager } from '@/components/heirloom/shared/shopping-lab/shopping';

interface PantryManagerProps {
  manager: ShoppingListManager;
  onUpdate: () => void;
}

export function PantryManager({ manager, onUpdate }: PantryManagerProps) {
  const [ingredientName, setIngredientName] = useState('');
  const pantryItems = manager.getPantryItems();

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredientName.trim()) return;

    manager.addPantryItem(ingredientName.trim(), 1, null);  // Default quantity: 1, no unit
    setIngredientName('');
    onUpdate();
  };

  const handleRemove = (canonical: string) => {
    manager.removePantryItem(canonical);
    onUpdate();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-heirloom-cream rounded-lg p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-2">Pantry Tracking</h4>
        <p className="text-sm text-gray-600 mb-4">
          Add items you already have at home. They'll be excluded from your shopping list.
        </p>

        <form onSubmit={handleAdd} className="flex gap-2 mb-6">
          <input
            type="text"
            value={ingredientName}
            onChange={(e) => setIngredientName(e.target.value)}
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-heirloom-coral focus:border-heirloom-coral"
            placeholder="e.g., flour, butter, eggs"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-heirloom-coral text-white text-sm font-medium rounded-md hover:bg-heirloom-coral/90"
          >
            Add
          </button>
        </form>

        {pantryItems.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
            <p className="text-sm text-gray-500">No pantry items yet</p>
            <p className="text-xs text-gray-400 mt-1">Add items to exclude them from shopping lists</p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-700 mb-2">
              {pantryItems.length} item{pantryItems.length !== 1 ? 's' : ''} in pantry
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {pantryItems.map((item) => (
                <div
                  key={item.canonical}
                  className="flex items-center justify-between bg-white border border-gray-200 rounded-md px-3 py-2 text-sm"
                >
                  <span className="text-gray-900 truncate">{item.displayName}</span>
                  <button
                    onClick={() => handleRemove(item.canonical)}
                    className="ml-2 text-gray-400 hover:text-red-600 flex-shrink-0"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
