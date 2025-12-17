'use client';

import { useState } from 'react';
import { RecipeScraper } from '@/components/heirloom/shared/services/RecipeScraper';
import type { Recipe } from '@/components/heirloom/shared/shopping-lab/shopping';

interface RecipeManagerProps {
  recipes: Recipe[];
  onAddRecipe: (recipe: Recipe) => void;
  onRemoveRecipe: (recipeId: string) => void;
  onGenerateList: () => void;
}

const scraper = new RecipeScraper();

export function RecipeManager({
  recipes,
  onAddRecipe,
  onRemoveRecipe,
  onGenerateList,
}: RecipeManagerProps) {
  const [name, setName] = useState('');
  const [servings, setServings] = useState('4');
  const [ingredients, setIngredients] = useState('');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !ingredients.trim()) return;

    const recipe: Recipe = {
      id: `recipe-${Date.now()}`,
      name: name.trim(),
      servings: parseInt(servings) || 4,
      ingredientLines: ingredients
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0),
    };

    onAddRecipe(recipe);
    setName('');
    setServings('4');
    setIngredients('');
  };

  const handleFetchFromUrl = async () => {
    if (!url.trim()) {
      setUrlError('Please enter a URL');
      return;
    }

    setUrlLoading(true);
    setUrlError('');

    try {
      const scrapedRecipe = await scraper.scrapeRecipe(url.trim());
      setName(scrapedRecipe.name);
      setServings(scrapedRecipe.servings.toString());
      setIngredients(scrapedRecipe.ingredientLines.join('\n'));
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recipe Form */}
      <div className="bg-heirloom-cream rounded-lg p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Add Recipe</h4>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* URL Input */}
          <div className="pb-4 border-b border-heirloom-sage/20">
            <div className="flex items-center justify-between mb-2">
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
                {urlError && <p className="mt-2 text-xs text-red-600">{urlError}</p>}
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
                <div className="flex items-center gap-2 mt-2">
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
                  <div className="mt-4 space-y-2">
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

          {/* Manual Entry */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-heirloom-coral focus:border-heirloom-coral"
                placeholder="e.g., Chocolate Chip Cookies"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Servings</label>
              <input
                type="number"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-heirloom-coral focus:border-heirloom-coral"
                min="1"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ingredients (one per line)
            </label>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-heirloom-coral focus:border-heirloom-coral font-mono"
              placeholder="2 cups flour&#10;1 cup sugar&#10;2 eggs"
              rows={6}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-heirloom-coral text-white text-sm font-medium rounded-md hover:bg-heirloom-coral/90"
          >
            Add Recipe
          </button>
        </form>
      </div>

      {/* Recipe List */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-bold text-gray-900">
            My Recipes ({recipes.length})
          </h4>
          {recipes.length > 0 && (
            <button
              onClick={onGenerateList}
              className="px-4 py-2 bg-heirloom-teal text-white text-sm font-medium rounded-md hover:bg-heirloom-teal/90"
            >
              Generate List
            </button>
          )}
        </div>

        {recipes.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
            <h5 className="mt-2 text-sm font-medium text-gray-900">No recipes yet</h5>
            <p className="mt-1 text-xs text-gray-500">Add your first recipe to get started</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="border border-gray-200 rounded-lg p-3 hover:border-heirloom-coral/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-900 text-sm">{recipe.name}</h5>
                    <p className="text-xs text-gray-500 mt-1">
                      {recipe.servings} servings • {recipe.ingredientLines.length} ingredients
                    </p>
                  </div>
                  <button
                    onClick={() => onRemoveRecipe(recipe.id)}
                    className="ml-3 text-gray-400 hover:text-red-600"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
