'use client';

import { useSlideNavigation } from './SlideNavigation';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';

/**
 * ProgressIndicator - Elegant minimal pagination dots
 *
 * Features:
 * - Small pagination dots (visual only, not tap targets)
 * - Current slide number displayed
 * - Keyboard navigation supported via context
 * - Minimal, unobtrusive design
 */
export default function ProgressIndicator() {
  const { currentSlide, totalSlides } = useSlideNavigation();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
        {/* Current Slide Indicator */}
        <span className="text-xs font-medium text-white/60 tabular-nums">
          {currentSlide + 1}
        </span>

        {/* Pagination Dots - Visual only, not interactive */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalSlides }, (_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all ${
                i === currentSlide
                  ? 'w-1.5 h-1.5 bg-sky-400'
                  : 'w-1 h-1 bg-white/20'
              }`}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Total Slides */}
        <span className="text-xs font-medium text-white/60 tabular-nums">
          {totalSlides}
        </span>
      </div>

      {/* Keyboard hint - minimal, unobtrusive */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-white/30 whitespace-nowrap hidden md:block">
        Use ← → to navigate
      </div>
    </div>
  );
}
