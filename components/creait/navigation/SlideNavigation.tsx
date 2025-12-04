'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface SlideNavigationContextType {
  currentSlide: number;
  totalSlides: number;
  goToSlide: (slideNumber: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
}

const SlideNavigationContext = createContext<SlideNavigationContextType | undefined>(undefined);

export const SLIDE_ROUTES = [
  '/clients/creait/pitch-deck/01-problem',
  '/clients/creait/pitch-deck/02-solution',
  '/clients/creait/pitch-deck/03-demo',
  '/clients/creait/pitch-deck/04-market',
  '/clients/creait/pitch-deck/05-validation',
  '/clients/creait/pitch-deck/06-competitive',
  '/clients/creait/pitch-deck/07-unit-economics',
  '/clients/creait/pitch-deck/08-technical-traction',
  '/clients/creait/pitch-deck/09-revenue-path',
  '/clients/creait/pitch-deck/10-roadmap',
  '/clients/creait/pitch-deck/11-the-ask',
  '/clients/creait/pitch-deck/12-why-we-win',
];

export function SlideNavigationProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Update current slide based on pathname
  useEffect(() => {
    const slideIndex = SLIDE_ROUTES.findIndex((route) => pathname === route);
    if (slideIndex !== -1) {
      setCurrentSlide(slideIndex);
    }
  }, [pathname]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle arrow keys if not in an input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(SLIDE_ROUTES.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const goToSlide = (slideNumber: number) => {
    if (slideNumber >= 0 && slideNumber < SLIDE_ROUTES.length) {
      router.push(SLIDE_ROUTES[slideNumber]);
    }
  };

  const nextSlide = () => {
    if (currentSlide < SLIDE_ROUTES.length - 1) {
      goToSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  };

  return (
    <SlideNavigationContext.Provider
      value={{
        currentSlide,
        totalSlides: SLIDE_ROUTES.length,
        goToSlide,
        nextSlide,
        prevSlide,
      }}
    >
      {children}
    </SlideNavigationContext.Provider>
  );
}

export function useSlideNavigation() {
  const context = useContext(SlideNavigationContext);
  if (context === undefined) {
    throw new Error('useSlideNavigation must be used within a SlideNavigationProvider');
  }
  return context;
}
