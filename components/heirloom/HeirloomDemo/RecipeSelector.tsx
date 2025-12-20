/**
 * RecipeSelector Component
 *
 * Interactive image overlay for selecting between multiple detected recipes
 * Displays clickable bounding box regions with recipe titles
 */

import React, { useState, useRef, useEffect } from 'react';
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
  const listItemRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const scrollToListItem = (recipeId: string) => {
    const element = listItemRefs.current[recipeId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      // Brief highlight effect
      setHoveredId(recipeId);
      setTimeout(() => setHoveredId(null), 1000);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Image with Overlay Regions */}
      <div className="relative w-full bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Background Image */}
        <img
          ref={imageRef}
          src={imageUrl}
          alt="Recipe card with multiple recipes"
          className="w-full h-auto block"
          style={{ display: 'block' }}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Desktop: Bounding Box Overlay Regions */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block">
          {detectedRecipes.map((recipe) => {
            const isHovered = hoveredId === recipe.id;

            return (
              <button
                key={recipe.id}
                onClick={() => onSelectRecipe(recipe.id)}
                onMouseEnter={() => setHoveredId(recipe.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="absolute transition-all duration-200 cursor-pointer pointer-events-auto"
                style={{
                  left: `${recipe.boundingBox.x}%`,
                  top: `${recipe.boundingBox.y}%`,
                  width: `${recipe.boundingBox.width}%`,
                  height: `${recipe.boundingBox.height}%`,
                  backgroundColor: isHovered
                    ? 'rgba(139, 90, 43, 0.3)'
                    : 'rgba(139, 90, 43, 0.1)',
                  border: isHovered
                    ? `3px solid ${COLORS.primary}`
                    : `2px dashed ${COLORS.primary}`,
                  borderRadius: '8px',
                }}
                aria-label={`Select recipe: ${recipe.title}`}
              >
                <div
                  className="absolute top-2 left-2 right-2 px-3 py-2 rounded shadow-lg text-sm font-semibold transition-all duration-200"
                  style={{
                    backgroundColor: isHovered ? COLORS.primary : COLORS.primaryDark,
                    color: '#fff',
                    opacity: isHovered ? 1 : 0.9,
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate">{recipe.title}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        color: '#fff',
                      }}
                    >
                      {recipe.confidence}
                    </span>
                  </div>
                </div>

                {isHovered && (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      backgroundColor: 'rgba(139, 90, 43, 0.1)',
                    }}
                  >
                    <div
                      className="px-6 py-3 rounded-lg font-bold text-lg shadow-xl"
                      style={{
                        backgroundColor: COLORS.primary,
                        color: '#fff',
                      }}
                    >
                      Click to Select
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile: Directional Overlay */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none md:hidden">
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.15)' }}
          >
            <div className="text-center">
              <div
                className="text-sm font-semibold px-4 py-2 rounded-lg shadow-lg"
                style={{
                  backgroundColor: COLORS.primary,
                  color: '#fff',
                }}
              >
                Choose a recipe below
              </div>
              <div className="text-white text-2xl mt-2 animate-bounce">↓</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recipe List (for accessibility and mobile) */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {detectedRecipes.map((recipe, index) => (
          <button
            key={recipe.id}
            ref={(el) => (listItemRefs.current[recipe.id] = el)}
            onClick={() => onSelectRecipe(recipe.id)}
            className="p-4 rounded-lg border-2 transition-all duration-200 text-left hover:shadow-md"
            style={{
              borderColor: hoveredId === recipe.id ? COLORS.primary : COLORS.grayLight,
              backgroundColor: hoveredId === recipe.id ? COLORS.bgWarm : COLORS.bgCard,
            }}
            onMouseEnter={() => setHoveredId(recipe.id)}
            onMouseLeave={() => setHoveredId(null)}
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
        ))}
      </div>
    </div>
  );
}
