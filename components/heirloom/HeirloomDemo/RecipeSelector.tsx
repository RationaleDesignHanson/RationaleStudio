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
      {/* Hidden image for loading/reference */}
      <img
        ref={imageRef}
        src={imageUrl}
        alt="Recipe card"
        className="hidden"
        onLoad={() => setImageLoaded(true)}
      />

      {/* Desktop: Recipe Cards with Thumbnails */}
      <div className="hidden md:grid md:grid-cols-2 gap-4 mb-4">
        {detectedRecipes.map((recipe, index) => (
          <button
            key={recipe.id}
            onClick={() => onSelectRecipe(recipe.id)}
            className="rounded-lg border-2 transition-all duration-200 text-left hover:shadow-lg overflow-hidden"
            style={{
              borderColor: hoveredId === recipe.id ? COLORS.primary : COLORS.grayLight,
              backgroundColor: COLORS.bgCard,
            }}
            onMouseEnter={() => setHoveredId(recipe.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Recipe thumbnail preview */}
            <div className="relative h-40 overflow-hidden bg-gray-100">
              <img
                src={imageUrl}
                alt={recipe.title}
                className="w-full h-full object-cover"
                style={{
                  objectPosition: `${recipe.boundingBox.x + recipe.boundingBox.width / 2}% ${recipe.boundingBox.y + recipe.boundingBox.height / 2}%`,
                }}
              />
              <div
                className="absolute top-2 left-2"
                style={{
                  backgroundColor: COLORS.primary,
                  color: '#fff',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}
              >
                {index + 1}
              </div>
            </div>

            {/* Card content */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-semibold text-lg flex-1" style={{ color: COLORS.primaryDark }}>
                  {recipe.title}
                </h4>
                <svg
                  className="w-5 h-5 flex-shrink-0 mt-1"
                  style={{ color: COLORS.primary }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <span
                className="inline-block text-sm px-2.5 py-1 rounded font-semibold"
                style={{
                  backgroundColor: COLORS.badgeMom,
                  color: COLORS.badgeMomText,
                }}
              >
                {recipe.confidence} confidence
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Mobile: Compact List */}
      <div className="md:hidden space-y-3">{detectedRecipes.map((recipe, index) => (
          <button
            key={recipe.id}
            ref={(el) => (listItemRefs.current[recipe.id] = el)}
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
