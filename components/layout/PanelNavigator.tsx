'use client';

import { ReactNode, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGesture } from '@use-gesture/react';

interface Panel {
  id: string;
  content: ReactNode;
}

interface PanelNavigatorProps {
  panels: Panel[];
  className?: string;
}

export default function PanelNavigator({ panels, className = '' }: PanelNavigatorProps) {
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const navigateToPanel = (index: number) => {
    if (index >= 0 && index < panels.length && index !== currentPanelIndex) {
      setDirection(index > currentPanelIndex ? 1 : -1);
      setCurrentPanelIndex(index);
    }
  };

  const nextPanel = () => navigateToPanel(currentPanelIndex + 1);
  const prevPanel = () => navigateToPanel(currentPanelIndex - 1);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          nextPanel();
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          prevPanel();
          break;
        case 'Home':
          e.preventDefault();
          navigateToPanel(0);
          break;
        case 'End':
          e.preventDefault();
          navigateToPanel(panels.length - 1);
          break;
        // Number keys for direct navigation
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          const num = parseInt(e.key) - 1;
          if (num < panels.length) {
            navigateToPanel(num);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPanelIndex, panels.length]);

  // Wheel/scroll navigation with debounce
  useEffect(() => {
    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;

      if (Math.abs(e.deltaY) > 50) {
        isScrolling = true;
        if (e.deltaY > 0) {
          nextPanel();
        } else {
          prevPanel();
        }

        setTimeout(() => {
          isScrolling = false;
        }, 800);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentPanelIndex]);

  // Swipe gesture support
  const bind = useGesture({
    onDrag: ({ direction: [, dy], distance: [, distanceY], cancel }) => {
      if (distanceY > 100) {
        if (dy < 0) nextPanel();
        else prevPanel();
        cancel();
      }
    },
  });

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      y: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  return (
    <div className={`relative w-full h-screen overflow-hidden ${className}`} {...bind()}>
      {/* Panel Navigation Dots - Larger touch targets on mobile */}
      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {panels.map((panel, index) => (
          <button
            key={panel.id}
            onClick={() => navigateToPanel(index)}
            className={`relative rounded-full border-2 transition-all duration-300 touch-manipulation ${
              index === currentPanelIndex
                ? 'bg-accent border-accent w-4 h-4 md:w-4 md:h-4'
                : 'bg-transparent border-muted hover:border-accent w-3 h-3 md:w-3 md:h-3'
            }`}
            style={{
              minWidth: '44px',
              minHeight: '44px',
              padding: '15px',
            }}
            aria-label={`Go to panel ${index + 1}`}
          >
            <span className="sr-only">Panel {index + 1}</span>
          </button>
        ))}
      </div>

      {/* Keyboard hints - Desktop */}
      <div className="hidden md:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-50 text-sm text-muted/80 font-terminal gap-6">
        <span>↑↓ Navigate</span>
        <span>1-9 Jump</span>
        <span>Home/End</span>
      </div>

      {/* Mobile swipe affordance */}
      <div className="md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-black/80 backdrop-blur-sm px-6 py-3 rounded-full border border-accent/30">
          <div className="flex items-center gap-2 text-white/80 font-terminal text-xs">
            <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
            </svg>
            <span>Swipe to explore</span>
          </div>
        </div>
      </div>

      {/* Panels */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentPanelIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0 w-full h-full"
        >
          {panels[currentPanelIndex].content}
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows - Hidden on mobile to avoid clutter */}
      {currentPanelIndex > 0 && (
        <button
          onClick={prevPanel}
          className="hidden md:block fixed top-1/2 left-8 -translate-y-1/2 z-50 text-muted hover:text-accent transition-colors text-4xl touch-manipulation"
          style={{ minWidth: '44px', minHeight: '44px' }}
          aria-label="Previous panel"
        >
          ↑
        </button>
      )}
      {currentPanelIndex < panels.length - 1 && (
        <button
          onClick={nextPanel}
          className="hidden md:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-50 text-muted hover:text-accent transition-colors text-2xl animate-bounce touch-manipulation"
          style={{ minWidth: '44px', minHeight: '44px' }}
          aria-label="Next panel"
        >
          ↓
        </button>
      )}
    </div>
  );
}
