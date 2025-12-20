/**
 * RecipeSelector Component
 *
 * Interactive image overlay for selecting between multiple detected recipes
 * Displays clickable bounding box regions with recipe titles
 */

import React, { useState } from 'react';
import { DetectedRecipe } from './types';
import { COLORS } from './constants';

interface RecipeSelectorProps {
  imageUrl: string;
  detectedRecipes: DetectedRecipe[];
  onSelectRecipe: (recipeId: string) => void;
}

export default function RecipeSelector({
  imageUrl,
  detectedRecipes,
  onSelectRecipe,
}: RecipeSelectorProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Desktop: Image with Bounding Box Overlays */}
      <div className="hidden md:block relative">
        <img
          src={imageUrl}
          alt="Recipe card with multiple recipes"
          className="w-full h-auto rounded-lg"
        />
        {detectedRecipes.map((recipe) => (
          <button
            key={recipe.id}
            onClick={() => onSelectRecipe(recipe.id)}
            onMouseEnter={() => setHoveredId(recipe.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="absolute transition-all duration-200 cursor-pointer"
            style={{
              left: `${recipe.boundingBox.x}%`,
              top: `${recipe.boundingBox.y}%`,
              width: `${recipe.boundingBox.width}%`,
              height: `${recipe.boundingBox.height}%`,
              border: `3px solid ${hoveredId === recipe.id ? COLORS.primary : COLORS.primaryLight}`,
              backgroundColor: hoveredId === recipe.id ? 'rgba(139, 90, 43, 0.15)' : 'rgba(139, 90, 43, 0.08)',
              borderRadius: '8px',
            }}
          >
            <div
              className="absolute -top-8 left-0 px-3 py-1 rounded-md text-sm font-semibold whitespace-nowrap shadow-lg"
              style={{
                backgroundColor: COLORS.primary,
                color: 'white',
              }}
            >
              {recipe.title}
            </div>
          </button>
        ))}
      </div>

      {/* Mobile: Compact List */}
      <div className="md:hidden space-y-3">{detectedRecipes.map((recipe, index) => (
          <button
            key={recipe.id}
            onClick={() => onSelectRecipe(recipe.id)}
            className="w-full p-4 rounded-lg border-2 transition-all duration-200 text-left hover:shadow-md"
            style={{
              borderColor: hoveredId === recipe.id ? COLORS.primary : COLORS.grayLight,
              backgroundColor: hoveredId === recipe.id ? COLORS.bgWarm : COLORS.bgCard,
            }}
            onTouchStart={() => setHoveredId(recipe.id)}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: COLORS.primaryLight,
                      color: COLORS.primaryDarkest,
                    }}
                  >
                    {index + 1}
                  </span>
                  <span
                    className="text-sm px-2.5 py-1 rounded font-semibold"
                    style={{
                      backgroundColor: COLORS.badgeMom,
                      color: COLORS.badgeMomText,
                    }}
                  >
                    {recipe.confidence} confidence
                  </span>
                </div>
                <h4 className="font-semibold" style={{ color: COLORS.primaryDark }}>
                  {recipe.title}
                </h4>
              </div>
              <svg
                className="w-5 h-5 flex-shrink-0"
                style={{ color: COLORS.primary }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </button>
        ))}</div>
    </div>
  );
}
