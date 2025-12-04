'use client';

import { useSlideNavigation } from './SlideNavigation';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';
import { LabelSM } from '@/components/creait/typography';

/**
 * ProgressIndicator - Shows current slide position and navigation controls
 *
 * Features:
 * - Slide counter (e.g., "3 / 12")
 * - Dot navigation for each slide
 * - Previous/Next buttons
 * - Keyboard shortcut hints
 */
export default function ProgressIndicator() {
  const { currentSlide, totalSlides, goToSlide, nextSlide, prevSlide } = useSlideNavigation();

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-6 px-6 py-4 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Previous slide"
        >
          <span className="text-lg">←</span>
          <LabelSM className="hidden sm:inline">Prev</LabelSM>
        </button>

        {/* Dot Navigation */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSlides }, (_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className="group relative"
              aria-label={`Go to slide ${i + 1}`}
            >
              <div
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentSlide
                    ? 'w-8 bg-sky-400'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
              {/* Tooltip */}
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-slate-800 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Slide {i + 1}
              </div>
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Next slide"
        >
          <LabelSM className="hidden sm:inline">Next</LabelSM>
          <span className="text-lg">→</span>
        </button>

        {/* Slide Counter */}
        <div className="hidden md:flex items-center gap-2 pl-4 border-l border-white/10">
          <LabelSM color={CRE_COLORS.text.muted}>
            SLIDE
          </LabelSM>
          <LabelSM color={CRE_COLORS.primary} className="font-bold tabular-nums">
            {currentSlide + 1} / {totalSlides}
          </LabelSM>
        </div>

        {/* Keyboard Hints */}
        <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="flex items-center gap-1">
            <kbd className="px-2 py-1 text-xs rounded bg-white/10 border border-white/20">←</kbd>
            <kbd className="px-2 py-1 text-xs rounded bg-white/10 border border-white/20">→</kbd>
          </div>
          <LabelSM color={CRE_COLORS.text.muted} className="text-xs">
            Navigate
          </LabelSM>
        </div>
      </div>
    </div>
  );
}
