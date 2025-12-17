'use client';

import { useState } from 'react';
import { RecipeScraper } from '@/components/heirloom/shared/services/RecipeScraper';
import type { Recipe } from '@/components/heirloom/shared/shopping-lab/shopping';
import { EXAMPLE_RECIPES, type ExampleRecipe } from '../data/exampleRecipes';

interface ExampleRecipeBrowserProps {
  onAddRecipe: (recipe: Recipe) => void;
}

type Category = 'all' | 'dinner' | 'breakfast' | 'dessert' | 'sides';

const scraper = new RecipeScraper();

export function ExampleRecipeBrowser({ onAddRecipe }: ExampleRecipeBrowserProps) {
  const [url, setUrl] = useState('');
  const [urlLoading, setUrlLoading] = useState(false);
  const [urlError, setUrlError] = useState('');
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkUrls, setBulkUrls] = useState('');
  const [bulkProcessing, setBulkProcessing] = useState(false);
  const [bulkResults, setBulkResults] = useState<Array<{
    url: string;
    status: 'pending' | 'processing' | 'success' | 'failed';
    recipeName?: string;
    error?: string;
  }>>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  const handleFetchFromUrl = async () => {
    if (!url.trim()) {
      setUrlError('Please enter a URL');
      return;
    }

    setUrlLoading(true);
    setUrlError('');

    try {
      const scrapedRecipe = await scraper.scrapeRecipe(url.trim());
      const recipe: Recipe = {
        id: `recipe-${Date.now()}`,
        name: scrapedRecipe.name,
        servings: scrapedRecipe.servings,
        ingredientLines: scrapedRecipe.ingredientLines,
      };
      onAddRecipe(recipe);
      setUrl('');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch recipe';
      setUrlError(errorMessage);
    } finally {
      setUrlLoading(false);
    }
  };

  const handleBulkProcess = async () => {
    const urlsText = bulkUrls.trim();
    if (!urlsText) return;

    const urls = urlsText
      .split(/[\n,]+/)
      .map(u => u.trim())
      .filter(u => u.length > 0)
      .filter(u => {
        try {
          new URL(u);
          return true;
        } catch {
          return false;
        }
      });

    if (urls.length === 0) return;

    const initialResults = urls.map(url => ({ url, status: 'pending' as const }));
    setBulkResults(initialResults);
    setBulkProcessing(true);

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];

      setBulkResults(prev => prev.map((r, idx) =>
        idx === i ? { ...r, status: 'processing' } : r
      ));

      try {
        const scrapedRecipe = await scraper.scrapeRecipe(url);
        const recipe: Recipe = {
          id: `recipe-${Date.now()}-${Math.random()}`,
          name: scrapedRecipe.name,
          servings: scrapedRecipe.servings,
          ingredientLines: scrapedRecipe.ingredientLines,
        };
        onAddRecipe(recipe);

        setBulkResults(prev => prev.map((r, idx) =>
          idx === i ? { ...r, status: 'success', recipeName: scrapedRecipe.name } : r
        ));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch recipe';
        setBulkResults(prev => prev.map((r, idx) =>
          idx === i ? { ...r, status: 'failed', error: errorMessage } : r
        ));
      }

      if (i < urls.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    setBulkProcessing(false);
  };

  const handleAddExampleRecipe = (example: ExampleRecipe) => {
    const recipe: Recipe = {
      id: `recipe-${Date.now()}`,
      name: example.name,
      servings: example.servings,
      ingredientLines: example.ingredients,
    };
    onAddRecipe(recipe);
  };

  const getDisplayRecipes = (): ExampleRecipe[] => {
    if (selectedCategory === 'all') {
      return EXAMPLE_RECIPES;
    }
    return EXAMPLE_RECIPES.filter(r => r.category === selectedCategory);
  };

  const displayRecipes = getDisplayRecipes();

  const categories: Array<{ id: Category; label: string }> = [
    { id: 'all', label: 'All' },
    { id: 'dinner', label: 'Dinner' },
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'dessert', label: 'Dessert' },
    { id: 'sides', label: 'Sides' },
  ];

  return (
    <div className="space-y-6">
      {/* URL Entry Section */}
      <div className="bg-heirloom-cream rounded-lg p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Add from URL</h4>

        <div className="space-y-4">
          {/* Toggle between single/bulk */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              {bulkMode ? 'Bulk Add from URLs' : 'Paste Recipe URL'}
            </label>
            <button
              type="button"
              onClick={() => {
                setBulkMode(!bulkMode);
                setBulkResults([]);
                setUrl('');
                setBulkUrls('');
                setUrlError('');
              }}
              className="text-xs text-heirloom-coral hover:text-heirloom-orange font-medium"
            >
              {bulkMode ? '← Single URL' : 'Bulk Mode →'}
            </button>
          </div>

          {!bulkMode ? (
            <>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleFetchFromUrl();
                    }
                  }}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-heirloom-coral focus:border-heirloom-coral"
                  placeholder="https://example.com/recipe"
                  disabled={urlLoading}
                />
                <button
                  type="button"
                  onClick={handleFetchFromUrl}
                  disabled={urlLoading || !url.trim()}
                  className="px-4 py-2 bg-heirloom-teal text-white text-sm font-medium rounded-md hover:bg-heirloom-teal/90 disabled:opacity-50"
                >
                  {urlLoading ? 'Fetching...' : 'Fetch'}
                </button>
              </div>
              {urlError && <p className="text-xs text-red-600">{urlError}</p>}
            </>
          ) : (
            <>
              <textarea
                value={bulkUrls}
                onChange={(e) => setBulkUrls(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-heirloom-coral focus:border-heirloom-coral font-mono"
                placeholder="https://site1.com/recipe1&#10;https://site2.com/recipe2&#10;https://site3.com/recipe3"
                rows={4}
                disabled={bulkProcessing}
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleBulkProcess}
                  disabled={bulkProcessing || !bulkUrls.trim()}
                  className="px-4 py-2 bg-heirloom-teal text-white text-sm font-medium rounded-md hover:bg-heirloom-teal/90 disabled:opacity-50"
                >
                  {bulkProcessing ? 'Processing...' : `Process ${bulkUrls.trim().split(/[\n,]+/).filter(u => u.trim()).length} URLs`}
                </button>
                {bulkResults.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setBulkUrls('');
                      setBulkResults([]);
                    }}
                    className="px-3 py-2 text-sm text-gray-600 hover:text-gray-700"
                  >
                    Clear
                  </button>
                )}
              </div>

              {bulkResults.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-gray-700">
                      Progress: {bulkResults.filter(r => r.status === 'success' || r.status === 'failed').length}/{bulkResults.length}
                    </span>
                    <span className="text-gray-500">
                      ✓ {bulkResults.filter(r => r.status === 'success').length} success •
                      ✗ {bulkResults.filter(r => r.status === 'failed').length} failed
                    </span>
                  </div>
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {bulkResults.map((result, idx) => (
                      <div
                        key={idx}
                        className={`p-2 rounded text-xs ${
                          result.status === 'success' ? 'bg-green-50 border border-green-200' :
                          result.status === 'failed' ? 'bg-red-50 border border-red-200' :
                          result.status === 'processing' ? 'bg-blue-50 border border-blue-200' :
                          'bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 mt-0.5">
                            {result.status === 'success' && '✓'}
                            {result.status === 'failed' && '✗'}
                            {result.status === 'processing' && '⏳'}
                            {result.status === 'pending' && '○'}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">
                              {result.recipeName || new URL(result.url).hostname}
                            </div>
                            {result.error && <div className="text-red-600 mt-1">{result.error}</div>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Example Recipe Browser */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Example Recipes</h4>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-heirloom-coral text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.label}
              {cat.id !== 'all' && (
                <span className="ml-1.5 text-xs opacity-75">
                  ({EXAMPLE_RECIPES.filter(r => r.category === cat.id).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Recipe Cards */}
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {displayRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-heirloom-coral/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900 text-sm">{recipe.name}</h5>
                  <p className="text-xs text-gray-500 mt-1">{recipe.description}</p>
                </div>
                <button
                  onClick={() => handleAddExampleRecipe(recipe)}
                  className="ml-3 px-3 py-1.5 bg-heirloom-teal text-white text-xs font-medium rounded hover:bg-heirloom-teal/90 flex-shrink-0"
                >
                  Add
                </button>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span>{recipe.servings} servings</span>
                <span>•</span>
                <span>{recipe.ingredients.length} ingredients</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
