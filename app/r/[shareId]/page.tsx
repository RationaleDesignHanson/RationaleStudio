/**
 * Public Recipe View Page
 *
 * /r/[shareId] - View a shared recipe
 * No authentication required - public access via share link
 */

import React from 'react';
import { notFound } from 'next/navigation';
import { AttributionBadge } from '@/components/heirloom/social';
import type { Recipe } from '@/lib/firestore/recipes';

interface PageProps {
  params: Promise<{
    shareId: string;
  }>;
}

async function getSharedRecipe(shareId: string): Promise<Recipe | null> {
  try {
    // Fetch from our API endpoint
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/shares/${shareId}`, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.recipe;
  } catch (error) {
    console.error('[Shared Recipe Page] Error:', error);
    return null;
  }
}

export default async function SharedRecipePage({ params }: PageProps) {
  const { shareId } = await params;
  const recipe = await getSharedRecipe(shareId);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FBF8F3]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#2D2D2D]">
                Heirloom
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Shared Recipe
              </p>
            </div>
            <a
              href="/"
              className="px-4 py-2 bg-[#E85D4D] text-white rounded-lg hover:bg-[#D94D3D] transition-colors font-medium"
            >
              Try Heirloom
            </a>
          </div>
        </div>
      </header>

      {/* Recipe Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Recipe Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Recipe Image */}
            {recipe.imageUrl && (
              <div className="aspect-video w-full bg-gray-200">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Recipe Header */}
            <div className="p-6 md:p-8">
              <div className="mb-4">
                <h1 className="text-3xl md:text-4xl font-bold text-[#2D2D2D] mb-3">
                  {recipe.title}
                </h1>
                <AttributionBadge
                  sourceType={recipe.sourceType}
                  sourceURL={recipe.sourceURL}
                  sourceBookTitle={recipe.sourceBookTitle}
                  sourcePerson={recipe.sourcePerson}
                />
              </div>

              {/* Recipe Meta */}
              {(recipe.servings || recipe.prepTime || recipe.cookTime) && (
                <div className="flex flex-wrap gap-4 py-4 border-y border-gray-200">
                  {recipe.servings && (
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🍽️</span>
                      <span className="text-gray-700">
                        <span className="font-medium">{recipe.servings}</span> servings
                      </span>
                    </div>
                  )}
                  {recipe.prepTime && (
                    <div className="flex items-center gap-2">
                      <span className="text-xl">⏱️</span>
                      <span className="text-gray-700">
                        <span className="font-medium">{recipe.prepTime}</span> prep
                      </span>
                    </div>
                  )}
                  {recipe.cookTime && (
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🔥</span>
                      <span className="text-gray-700">
                        <span className="font-medium">{recipe.cookTime}</span> cook
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Ingredients */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4">
                  Ingredients
                </h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <span className="text-[#E85D4D] mt-1">•</span>
                      <span>{ingredient.original}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4">
                  Instructions
                </h2>
                <ol className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-4"
                    >
                      <span className="flex-shrink-0 w-8 h-8 bg-[#E85D4D] text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </span>
                      <p className="text-gray-700 pt-1">{instruction}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Tags */}
              {recipe.tags && recipe.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {recipe.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg text-center">
            <h3 className="text-xl font-bold text-[#2D2D2D] mb-2">
              Love this recipe?
            </h3>
            <p className="text-gray-600 mb-4">
              Save and organize all your favorite recipes with Heirloom
            </p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-[#E85D4D] text-white rounded-lg hover:bg-[#D94D3D] transition-colors font-medium"
            >
              Get Started Free
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600 text-sm">
          <p>Powered by <span className="font-semibold text-[#E85D4D]">Heirloom</span></p>
        </div>
      </footer>
    </div>
  );
}
