/**
 * RecipeSelector Component
 *
 * Interactive image overlay for selecting between multiple detected recipes
 * Displays clickable bounding box regions with recipe titles
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
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

// Calculate optimal image transform to center on title area
const getImageTransform = (boundingBox: { x: number; y: number; width: number; height: number }) => {
  // Scale to fit width of container
  const scale = 100 / boundingBox.width;
  const translateX = -boundingBox.x;

  // Calculate visible height in 4:3 container (as % of original image)
  const containerAspect = 4 / 3;
  const visibleHeight = boundingBox.width / containerAspect;

  // Focus on title area (assume title is ~30% down from top of bounding box)
  // Adjust this ratio to show more/less content below title
  const titleFocusRatio = 0.3;
  const titlePosition = boundingBox.y + boundingBox.height * titleFocusRatio;

  // Center the visible area on the title position
  const translateY = -(titlePosition - visibleHeight / 2);

  return { translateX, translateY, scale };
};

export default function RecipeSelector({
  imageUrl,
  detectedRecipes,
  onSelectRecipe,
}: RecipeSelectorProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Peek animation on first view
  useEffect(() => {
    const hasSeenPeek = sessionStorage.getItem('heirloom-carousel-peek-shown');

    if (!hasSeenPeek && carouselRef.current && detectedRecipes.length > 1) {
      const timer = setTimeout(() => {
        if (carouselRef.current) {
          // Scroll right to show next card exists
          carouselRef.current.scrollTo({ left: 120, behavior: 'smooth' });

          // Scroll back after a brief pause
          setTimeout(() => {
            if (carouselRef.current) {
              carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            }
          }, 800);

          // Mark as seen
          sessionStorage.setItem('heirloom-carousel-peek-shown', 'true');
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [detectedRecipes.length]);

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

      {/* Mobile: Horizontal Carousel */}
      <div
        ref={carouselRef}
        className="md:hidden overflow-x-auto flex gap-4 px-6 py-4 snap-x snap-mandatory scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {detectedRecipes.map((recipe, index) => {
          const transform = getImageTransform(recipe.boundingBox);
          return (
            <button
              key={recipe.id}
              onClick={() => onSelectRecipe(recipe.id)}
              className="flex-shrink-0 w-[280px] snap-center cursor-pointer"
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
              }}
              onTouchStart={() => setHoveredId(recipe.id)}
              onTouchEnd={() => setHoveredId(null)}
            >
              {/* Cropped Recipe Image */}
              <div
                className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 relative transition-all duration-200"
                style={{
                  border: `3px solid ${hoveredId === recipe.id ? COLORS.primary : COLORS.grayLight}`,
                  boxShadow: hoveredId === recipe.id ? '0 4px 12px rgba(139, 90, 43, 0.2)' : 'none',
                }}
              >
                <img
                  src={imageUrl}
                  alt={recipe.title}
                  className="absolute top-0 left-0 w-full h-auto"
                  style={{
                    transformOrigin: 'top left',
                    transform: `translate(${transform.translateX}%, ${transform.translateY}%) scale(${transform.scale})`,
                  }}
                />
              </div>

              {/* Recipe Title Below */}
              <div className="w-full">
                <h4
                  className="font-semibold text-base m-0 leading-snug"
                  style={{ color: COLORS.primaryDark }}
                >
                  {recipe.title}
                </h4>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
