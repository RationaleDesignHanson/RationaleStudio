/**
 * Sample Recipe Selector Component
 * Allows users to quickly try demo with pre-loaded recipes
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SAMPLE_RECIPE_CARDS, SAMPLE_COOKBOOK_PAGES, SampleRecipe } from '@/lib/heirloom/sample-recipes';

interface SampleRecipeSelectorProps {
  onSelectSample: (recipe: SampleRecipe) => void;
  onUploadOwn: () => void;
}

export function SampleRecipeSelector({ onSelectSample, onUploadOwn }: SampleRecipeSelectorProps) {
  const [activeTab, setActiveTab] = useState<'cards' | 'cookbooks'>('cards');

  const samples = activeTab === 'cards' ? SAMPLE_RECIPE_CARDS : SAMPLE_COOKBOOK_PAGES;
  const displaySamples = samples.slice(0, 6); // Show 6 samples

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="flex gap-2 mb-4 justify-center">
        <button
          onClick={() => setActiveTab('cards')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            activeTab === 'cards'
              ? 'bg-[#8b5a2b] text-white'
              : 'bg-white/50 text-[#8b5a2b] hover:bg-white/80'
          }`}
        >
          Recipe Cards ({SAMPLE_RECIPE_CARDS.length})
        </button>
        <button
          onClick={() => setActiveTab('cookbooks')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            activeTab === 'cookbooks'
              ? 'bg-[#8b5a2b] text-white'
              : 'bg-white/50 text-[#8b5a2b] hover:bg-white/80'
          }`}
        >
          Cookbooks ({SAMPLE_COOKBOOK_PAGES.length})
        </button>
      </div>

      {/* Sample Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6 max-w-3xl mx-auto">
        {displaySamples.map((sample) => (
          <button
            key={sample.id}
            onClick={() => onSelectSample(sample)}
            className="group relative aspect-[4/5] rounded-lg overflow-hidden border-2 border-[#e8e0d5] hover:border-[#8b5a2b] transition-all shadow-sm hover:shadow-md"
          >
            <img
              src={sample.thumbnailPath}
              alt={sample.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              {sample.name}
            </div>
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
