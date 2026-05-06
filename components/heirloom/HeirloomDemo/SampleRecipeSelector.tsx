/**
 * Sample Recipe Selector Component
 * Allows users to quickly try demo with pre-loaded recipes
 */

'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { SAMPLE_RECIPE_CARDS, SAMPLE_COOKBOOK_PAGES, SampleRecipe } from '@/lib/heirloom/sample-recipes';

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

  // Compact card — fixed width so the row is uniformly scannable.
  const RecipeCard = ({ sample }: { sample: SampleRecipe }) => (
    <button
      onClick={() => onSelectSample(sample)}
      className="group relative flex-shrink-0 w-[96px] sm:w-[112px] aspect-[3/4] rounded-lg overflow-hidden border-2 border-[#e8e0d5] hover:border-[#8b5a2b] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 bg-white snap-start"
      aria-label={sample.name}
    >
      <img
        src={sample.thumbnailPath}
        alt={sample.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-1.5 text-white text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center leading-tight">
        {sample.name}
      </div>
    </button>
  );

  // Upload-your-own tile — same footprint as RecipeCard.
  const UploadTile = () => (
    <button
      onClick={onUploadOwn}
      className="group relative flex-shrink-0 w-[96px] sm:w-[112px] aspect-[3/4] rounded-lg overflow-hidden border-2 border-dashed border-[#c9a66b] hover:border-[#8b5a2b] hover:bg-[rgba(139,90,43,0.04)] transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 bg-[#faf8f5] flex flex-col items-center justify-center gap-1.5 text-[#8b5a2b] snap-start"
      aria-label="Upload your own recipe"
    >
      <svg
        className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
      <span className="text-[9px] font-semibold tracking-wider uppercase opacity-70 group-hover:opacity-100 transition-opacity text-center px-1.5 leading-tight">
        Add your own
      </span>
    </button>
  );

  // Click-and-drag scroll. Only commits to dragging once the pointer crosses
  // a 6px threshold — under that we treat it as a click and let the button
  // handler fire normally (otherwise scroll updates shift the click target
  // and the browser drops the click).
  const DRAG_THRESHOLD = 6;
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ startX: number; startScroll: number; moved: boolean } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || !scrollRef.current) return;
    dragState.current = {
      startX: e.clientX,
      startScroll: scrollRef.current.scrollLeft,
      moved: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current || !scrollRef.current) return;
    const dx = e.clientX - dragState.current.startX;
    if (!dragState.current.moved && Math.abs(dx) <= DRAG_THRESHOLD) return;
    if (!dragState.current.moved) {
      dragState.current.moved = true;
      setIsDragging(true);
      // Capture pointer so we keep getting move events even outside the strip
      scrollRef.current.setPointerCapture?.(e.pointerId);
    }
    scrollRef.current.scrollLeft = dragState.current.startScroll - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (scrollRef.current && dragState.current?.moved) {
      scrollRef.current.releasePointerCapture?.(e.pointerId);
    }
    setIsDragging(false);
    // Keep `moved` alive long enough for the click event to read it, then clear.
    const wasMoved = dragState.current?.moved ?? false;
    if (wasMoved) {
      // Clear on next tick so onClickCapture (fires synchronously after pointerup → click) sees it.
      setTimeout(() => {
        dragState.current = null;
      }, 0);
    } else {
      dragState.current = null;
    }
  };

  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragState.current?.moved) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mb-6">
      <div
        ref={scrollRef}
        className="heirloom-carousel flex gap-3 overflow-x-auto px-3 py-2 snap-x"
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: isDragging ? 'none' : 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollbarColor: '#c9a66b #f0ebe3',
          scrollbarWidth: 'thin',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        <UploadTile />
        {displaySamples.map((sample) => (
          <RecipeCard key={sample.id} sample={sample} />
        ))}
      </div>
      <style jsx>{`
        .heirloom-carousel::-webkit-scrollbar {
          height: 8px;
        }
        .heirloom-carousel::-webkit-scrollbar-track {
          background: #f0ebe3;
          border-radius: 4px;
        }
        .heirloom-carousel::-webkit-scrollbar-thumb {
          background: #c9a66b;
          border-radius: 4px;
        }
        .heirloom-carousel::-webkit-scrollbar-thumb:hover {
          background: #8b5a2b;
        }
      `}</style>
    </div>
  );
}
