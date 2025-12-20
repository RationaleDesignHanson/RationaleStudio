/**
 * RecipeSelector Component
 *
 * Interactive image overlay for selecting between multiple detected recipes
 * Displays clickable bounding box regions with recipe titles
 */

import React, { useState } from 'react';
import { DetectedRecipe, ConfidenceLevel } from './types';
import { COLORS } from './constants';

interface RecipeSelectorProps {
  imageUrl: string;
  detectedRecipes: DetectedRecipe[];
  onSelectRecipe: (recipeId: string) => void;
}

const confidenceToPercent = (confidence: ConfidenceLevel): number => {
  const mapping = {
    high: 95,
    medium: 75,
    low: 60,
  };
  return mapping[confidence];
};

export default function RecipeSelector({
  imageUrl,
  detectedRecipes,
  onSelectRecipe,
}: RecipeSelectorProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-full md:max-w-4xl md:mx-auto">
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
            className="absolute transition-all duration-200 cursor-pointer flex items-center justify-center"
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
              className="px-4 py-2 rounded-md text-base font-semibold shadow-lg text-center"
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
      <div className="md:hidden space-y-3 px-3">{detectedRecipes.map((recipe, index) => (
          <button
            key={recipe.id}
            onClick={() => onSelectRecipe(recipe.id)}
            className="w-full p-3 rounded-lg border-2 transition-all duration-200 hover:shadow-md block text-left"
            style={{
              borderColor: hoveredId === recipe.id ? COLORS.primary : COLORS.grayLight,
              backgroundColor: hoveredId === recipe.id ? COLORS.bgWarm : COLORS.bgCard,
              textAlign: 'left',
            }}
            onTouchStart={() => setHoveredId(recipe.id)}
          >
            <div className="flex items-start gap-3 text-left">
              {/* Thumbnail Preview - Zoomed into recipe area */}
              <div
                className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 relative"
                style={{
                  border: `2px solid ${COLORS.grayLight}`,
                }}
              >
                <img
                  src={imageUrl}
                  alt={recipe.title}
                  className="absolute top-0 left-0 w-full h-auto"
                  style={{
                    transformOrigin: 'top left',
                    transform: `
                      translate(${-recipe.boundingBox.x}%, ${-recipe.boundingBox.y}%)
                      scale(${100 / recipe.boundingBox.width})
                    `,
                  }}
                />
              </div>

              {/* Content Area */}
              <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                {/* First Row: Number, Title, Arrow */}
                <div className="flex items-start gap-2">
                  <span
                    className="text-base font-bold flex-shrink-0 leading-snug pt-0.5"
                    style={{ color: COLORS.primary }}
                  >
                    {index + 1}.
                  </span>
                  <h4 className="font-semibold text-base flex-1 m-0 leading-snug" style={{ color: COLORS.primaryDark }}>
                    {recipe.title}
                  </h4>
                  <svg
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
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

                {/* Second Row: Confidence Badge */}
                <div className="ml-5 text-left">
                  <span
                    className="text-xs px-2 py-0.5 rounded font-medium inline-block"
                    style={{
                      backgroundColor: COLORS.badgeMom,
                      color: COLORS.badgeMomText,
                    }}
                  >
                    {confidenceToPercent(recipe.confidence)}% confidence
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}</div>
    </div>
  );
}
