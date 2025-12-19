/**
 * Sample Recipe Selector Component
 * Allows users to quickly try demo with pre-loaded recipes
 */

'use client';

import { SAMPLE_RECIPE_CARDS, SAMPLE_COOKBOOK_PAGES, SampleRecipe } from '@/lib/heirloom/sample-recipes';

interface SampleRecipeSelectorProps {
  onSelectSample: (recipe: SampleRecipe) => void;
  onUploadOwn: () => void;
}

export function SampleRecipeSelector({ onSelectSample, onUploadOwn }: SampleRecipeSelectorProps) {
  // Combine recipe cards and cookbook pages, alternating them
  const allSamples = [...SAMPLE_RECIPE_CARDS, ...SAMPLE_COOKBOOK_PAGES];
  const displaySamples = allSamples.slice(0, 12); // Show 12 samples total

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Sample Grid - More appealing with better spacing and shadows */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        {displaySamples.map((sample) => (
          <button
            key={sample.id}
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
        ))}
      </div>

      {/* Upload Own */}
      <div className="text-center">
        <button
          onClick={onUploadOwn}
          className="px-6 py-3 bg-white/60 hover:bg-white border-2 border-[#8b5a2b] text-[#8b5a2b] rounded-lg font-semibold transition-all"
        >
          📤 Upload Your Own Recipe
        </button>
      </div>
    </div>
  );
}
