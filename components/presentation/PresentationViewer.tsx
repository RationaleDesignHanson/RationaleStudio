/**
 * PresentationViewer Component
 *
 * World-class presentation viewer with:
 * - GPU-accelerated shader backgrounds
 * - Keyboard navigation (arrows, Esc, Space)
 * - Dot navigation with progress
 * - Full-screen mode
 * - Terminal-style transitions
 * - Boot animations
 */

'use client';

import { useState, useEffect, useCallback, ReactNode } from 'react';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { type WatercolorTheme } from '@/lib/theme/watercolor-palette';

export interface Slide {
  id: number;
  title: string;
  content: ReactNode;
  shaderTheme?: WatercolorTheme;
  shaderOpacity?: number;
  shaderAnimated?: boolean;
}

interface PresentationViewerProps {
  slides: Slide[];
  defaultSlide?: number;
  showProgress?: boolean;
  showNavigation?: boolean;
  keyboardNavigation?: boolean;
  autoAdvance?: boolean;
  autoAdvanceDelay?: number;
  onSlideChange?: (slideIndex: number) => void;
  className?: string;
}

export function PresentationViewer({
  slides,
  defaultSlide = 0,
  showProgress = true,
  showNavigation = true,
  keyboardNavigation = true,
  autoAdvance = false,
  autoAdvanceDelay = 5000,
  onSlideChange,
  className = '',
}: PresentationViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(defaultSlide);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (index < 0 || index >= slides.length || isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      onSlideChange?.(index);
      setIsTransitioning(false);
    }, 300);
  }, [slides.length, isTransitioning, onSlideChange]);

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!keyboardNavigation) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
          break;
        case 'Escape':
          if (isFullscreen) {
            e.preventDefault();
            toggleFullscreen();
          }
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(slides.length - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyboardNavigation, nextSlide, prevSlide, toggleFullscreen, isFullscreen, goToSlide, slides.length]);

  // Auto-advance
  useEffect(() => {
    if (!autoAdvance) return;

    const timer = setInterval(() => {
      if (currentSlide < slides.length - 1) {
        nextSlide();
      }
    }, autoAdvanceDelay);

    return () => clearInterval(timer);
  }, [autoAdvance, autoAdvanceDelay, currentSlide, slides.length, nextSlide]);

  const slide = slides[currentSlide];
  const progress = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div className={`relative min-h-screen bg-black text-white ${className}`}>
      {/* Shader Background */}
      <div className="absolute inset-0 pointer-events-none">
        <ASCIIUnifiedGrid
          opacity={slide.shaderOpacity ?? 0.08}
          animated={slide.shaderAnimated ?? true}
          colorTheme={slide.shaderTheme ?? { colors: ['#1f2937', '#374151', '#FFD700'], name: 'presentation-theme', primary: '#FFD700', description: 'Presentation theme' }}
          charSet="default"
        />
      </div>

      {/* Slide Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Terminal-style header */}
        <div className="border-b border-[#FFD700]/30 bg-black/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs font-mono text-[#FFD700]">
                  presentation.session
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-gray-400">
                  [{currentSlide + 1}/{slides.length}] {slide.title}
                </span>
                <button
                  onClick={toggleFullscreen}
                  className="text-xs font-mono text-gray-400 hover:text-[#FFD700] transition-colors"
                  title="Toggle fullscreen (F)"
                >
                  {isFullscreen ? '[EXIT]' : '[FULLSCREEN]'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div
            className={`w-full max-w-6xl transition-opacity duration-300 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {slide.content}
          </div>
        </div>

        {/* Navigation & Progress */}
        {showNavigation && (
          <div className="border-t border-[#FFD700]/30 bg-black/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              {/* Progress Bar */}
              {showProgress && (
                <div className="mb-4">
                  <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FFD700]/50 to-[#FFD700] transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] font-mono text-gray-500">
                      {progress.toFixed(0)}% COMPLETE
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">
                      {slides.length - currentSlide - 1} SLIDES REMAINING
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                {/* Prev Button */}
                <button
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 text-sm font-mono text-[#FFD700] hover:bg-[#FFD700]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-[#FFD700]/30 rounded"
                >
                  ← PREV
                </button>

                {/* Dot Navigation */}
                <div className="flex gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? 'bg-[#FFD700] w-8'
                          : index < currentSlide
                          ? 'bg-[#FFD700]/50'
                          : 'bg-gray-600'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={nextSlide}
                  disabled={currentSlide === slides.length - 1}
                  className="px-4 py-2 text-sm font-mono text-[#FFD700] hover:bg-[#FFD700]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-[#FFD700]/30 rounded"
                >
                  NEXT →
                </button>
              </div>

              {/* Keyboard Shortcuts Hint */}
              <div className="mt-3 text-center">
                <span className="text-[10px] font-mono text-gray-600">
                  ARROWS: navigate • SPACE: next • F: fullscreen • ESC: exit
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
