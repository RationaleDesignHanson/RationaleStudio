/**
 * Sample Recipe Selector Component
 * Allows users to quickly try demo with pre-loaded recipes
 */

'use client';

import { useState, useEffect, useMemo } from 'react';
import { SAMPLE_RECIPE_CARDS, SAMPLE_COOKBOOK_PAGES, SampleRecipe } from '@/lib/heirloom/sample-recipes';
import { MobileCarousel } from '@/components/ui/MobileCarousel';

interface SampleRecipeSelectorProps {
  onSelectSample: (recipe: SampleRecipe) => void;
  onUploadOwn: () => void;
}

export function SampleRecipeSelector({ onSelectSample, onUploadOwn }: SampleRecipeSelectorProps) {
  // Multi-recipe cookbooks that demonstrate the carousel selection flow
  const multiRecipeCookbookIds = ['cookbook-09', 'cookbook-10', 'cookbook-11'];

  // Build deterministic initial list (same on server & client)
  const initialSamples = useMemo(() => {
    const multiRecipeCookbooks = SAMPLE_COOKBOOK_PAGES.filter(
      sample => multiRecipeCookbookIds.includes(sample.id)
    );
    const otherSamples = [
      ...SAMPLE_RECIPE_CARDS,
      ...SAMPLE_COOKBOOK_PAGES.filter(sample => !multiRecipeCookbookIds.includes(sample.id))
    ];

    // Deterministic selection: first multi-recipe + first 11 others
    const selectedMultiRecipe = multiRecipeCookbooks[0];
    const otherSelected = otherSamples.slice(0, 11);

    return [selectedMultiRecipe, ...otherSelected];
  }, []);

  // State for displayed samples (shuffled client-side only)
  const [displaySamples, setDisplaySamples] = useState<SampleRecipe[]>(initialSamples);

  // Shuffle on client mount to avoid hydration mismatch
  useEffect(() => {
    const shuffled = [...initialSamples].sort(() => Math.random() - 0.5);
    setDisplaySamples(shuffled);
  }, [initialSamples]);

  // Create card component for reuse
  const RecipeCard = ({ sample }: { sample: SampleRecipe }) => (
    <button
      onClick={() => onSelectSample(sample)}
      className="group relative aspect-[3/4] rounded-xl overflow-hidden border-3 border-[#e8e0d5] hover:border-[#8b5a2b] transition-all shadow-md hover:shadow-2xl hover:-translate-y-1 bg-white"
    >
      <img
        src={sample.thumbnailPath}
        alt={sample.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-2 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
        {sample.name}
      </div>
      {/* Decorative corner */}
      <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );

  // Group samples into pairs for mobile carousel
  const pairedSamples = [];
  for (let i = 0; i < displaySamples.length; i += 2) {
    pairedSamples.push(displaySamples.slice(i, i + 2));
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Mobile: Carousel with 2 cards per slide */}
      <div className="sm:hidden mb-8">
        <MobileCarousel>
          {pairedSamples.map((pair, pairIndex) => (
            <div key={pairIndex} className="grid grid-cols-2 gap-4 px-2">
              {pair.map((sample) => (
                <RecipeCard key={sample.id} sample={sample} />
              ))}
            </div>
          ))}
        </MobileCarousel>
      </div>

      {/* Desktop: Grid */}
      <div className="hidden sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        {displaySamples.map((sample) => (
          <RecipeCard key={sample.id} sample={sample} />
        ))}
      </div>
    </div>
  );
}
