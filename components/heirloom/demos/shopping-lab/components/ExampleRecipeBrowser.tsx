'use client';

import { useState } from 'react';
import { RecipeScraper } from '@/components/heirloom/shared/services/RecipeScraper';
import { RandomRecipeGenerator } from '@/components/heirloom/shared/services/RandomRecipeGenerator';
import type { Recipe } from '@/components/heirloom/shared/shopping-lab/shopping';
import { EXAMPLE_RECIPES, type ExampleRecipe } from '../data/exampleRecipes';

interface ExampleRecipeBrowserProps {
  onAddRecipe: (recipe: Recipe) => void;
}

type Category = 'dinner' | 'breakfast' | 'dessert' | 'sides' | 'rando';

const scraper = new RecipeScraper();
const randomGenerator = new RandomRecipeGenerator();

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
  const [selectedCategory, setSelectedCategory] = useState<Category>('dinner');
  const [randomRecipes, setRandomRecipes] = useState<ExampleRecipe[]>([]);
  const [expandedRecipes, setExpandedRecipes] = useState<Set<string>>(new Set());
  const [urlSectionCollapsed, setUrlSectionCollapsed] = useState(false);

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

  const toggleRecipeExpansion = (recipeId: string) => {
    setExpandedRecipes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(recipeId)) {
        newSet.delete(recipeId);
      } else {
        newSet.add(recipeId);
      }
      return newSet;
    });
  };

  const generateRecipeDescription = (name: string, ingredients: string[]): string => {
    // Extract key words from the recipe name for riffing
    const nameLower = name.toLowerCase();
    const words = name.split(' ');

    // Silly riff templates that play off the recipe name
    const templates = [
      `Not your grandma's ${name.toLowerCase()}, unless your grandma was really weird`,
      `${name} - exactly what it sounds like, but somehow worse`,
      `Legend says ${name.split(' ').slice(0, 2).join(' ')} was invented by accident. This proves it.`,
      `${name}: because normal food is overrated`,
      `Warning: ${name} may cause confusion, delight, or mild regret`,
      `The ${name.split(' ')[0].toLowerCase()} speaks to your soul. Your soul is confused.`,
      `${name} - when you want to impress absolutely nobody`,
      `Serving suggestion: Don't tell anyone what's in this`,
      `${name.length > 40 ? 'Yes, the name is this long. No, we will not explain.' : `${name} tastes better than it sounds. Probably.`}`,
      `Your kitchen will never be the same after making this`,
      `${name.split(' ').pop()} enthusiasts hate this one simple trick`,
      `Brought to you by the same chef who invented ${name.split(' ')[0].toLowerCase() + ' chaos'}`,
      `This ${name.toLowerCase()} has been banned in 3 countries. Make it at your own risk.`,
      `${name.split(' ').slice(0, 2).join(' ')} - sounds fancy, tastes... interesting`,
      `Fun fact: Nobody asked for ${name.toLowerCase()}, but here we are`
    ];

    return templates[Math.floor(Math.random() * templates.length)];
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

  const handleCategoryChange = (newCategory: Category) => {
    if (newCategory === 'rando') {
      // Generate 10 random recipes
      const generatedRecipes: ExampleRecipe[] = [];
      for (let i = 0; i < 10; i++) {
        const randomRecipe = randomGenerator.generateRecipe({
          ingredientCount: Math.floor(Math.random() * 8) + 5, // 5-12 ingredients
        });
        generatedRecipes.push({
          id: `random-${Date.now()}-${i}`,
          name: randomRecipe.name,
          description: generateRecipeDescription(randomRecipe.name, randomRecipe.ingredients),
          category: 'dinner', // doesn't matter for display
          servings: Math.floor(Math.random() * 6) + 2, // 2-7 servings
          ingredients: randomRecipe.ingredients,
        });
      }
      setRandomRecipes(generatedRecipes);
      setSelectedCategory('rando');
    } else {
      setSelectedCategory(newCategory);
    }
  };

  const getDisplayRecipes = (): ExampleRecipe[] => {
    if (selectedCategory === 'rando') {
      return randomRecipes;
    }
    return EXAMPLE_RECIPES.filter(r => r.category === selectedCategory);
  };

  const displayRecipes = getDisplayRecipes();

  const categories: Array<{ id: Category; label: string }> = [
    { id: 'dinner', label: 'Dinner' },
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'dessert', label: 'Dessert' },
    { id: 'sides', label: 'Sides' },
    { id: 'rando', label: '🎲 Rando' },
  ];

  return (
    <div className="space-y-6">
      {/* URL Entry Section */}
      <div className="bg-heirloom-cream rounded-lg p-4 sm:p-6">
        <button
          onClick={() => setUrlSectionCollapsed(!urlSectionCollapsed)}
          className="w-full flex items-center justify-between text-left mb-3 sm:mb-4 group"
        >
          <h4 className="text-base sm:text-lg font-bold text-gray-900">Add from URL</h4>
          <span className="text-gray-500 group-hover:text-gray-700 transition-transform duration-200" style={{ transform: urlSectionCollapsed ? 'rotate(0deg)' : 'rotate(180deg)' }}>
            ▼
          </span>
        </button>

        {!urlSectionCollapsed && (
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
        )}
      </div>

      {/* Example Recipe Browser */}
      <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
        <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Example Recipes</h4>

        {/* Category Filter Dropdown */}
        <div className="mb-3 sm:mb-4">
          <label htmlFor="category-select" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
            Filter by Category
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value as Category)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-heirloom-coral focus:border-heirloom-coral bg-white"
          >
            {categories.map((cat) => {
              if (cat.id === 'rando') {
                return (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                );
              }
              const count = EXAMPLE_RECIPES.filter(r => r.category === cat.id).length;
              return (
                <option key={cat.id} value={cat.id}>
                  {cat.label} ({count})
                </option>
              );
            })}
          </select>
        </div>

        {/* Recipe Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 h-[400px] overflow-y-auto">
          {displayRecipes.map((recipe) => {
            const isExpanded = expandedRecipes.has(recipe.id);
            return (
              <div
                key={recipe.id}
                className="border border-gray-200 rounded-lg p-3 hover:border-heirloom-coral/50 transition-colors"
              >
                <div className="mb-2">
                  <h5 className="font-semibold text-gray-900 text-sm mb-1">{recipe.name}</h5>
                  {!isExpanded && (
                    <p className="text-xs text-gray-500 line-clamp-2">{recipe.description}</p>
                  )}
                </div>

                {isExpanded && (
                  <div className="mb-3 p-2 bg-gray-50 rounded text-xs">
                    <button
                      onClick={() => toggleRecipeExpansion(recipe.id)}
                      className="flex items-center gap-1 font-medium text-gray-700 mb-1 hover:text-heirloom-coral w-full"
                      aria-label="Collapse ingredients"
                    >
                      <span>Ingredients</span>
                      <span className="text-heirloom-coral text-[10px]">▼</span>
                    </button>
                    <ul className="space-y-0.5 text-gray-600">
                      {recipe.ingredients.map((ingredient, idx) => (
                        <li key={idx} className="leading-tight">• {ingredient}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  {!isExpanded && (
                    <>
                      <span className="whitespace-nowrap">{recipe.servings} servings</span>
                      <span>•</span>
                      <button
                        onClick={() => toggleRecipeExpansion(recipe.id)}
                        className="flex items-center gap-1 hover:text-heirloom-coral"
                      >
                        <span>{recipe.ingredients.length} ingredients</span>
                        <span className="text-[10px]">▶</span>
                      </button>
                    </>
                  )}
                  {isExpanded && (
                    <span className="whitespace-nowrap">{recipe.servings} servings</span>
                  )}
                </div>
                <button
                  onClick={() => handleAddExampleRecipe(recipe)}
                  className="w-full px-3 py-1.5 bg-heirloom-teal text-white text-xs font-medium rounded hover:bg-heirloom-teal/90"
                >
                  Add
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
