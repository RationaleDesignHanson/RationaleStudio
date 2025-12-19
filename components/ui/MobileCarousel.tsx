/**
 * MobileCarousel Component
 *
 * Horizontal swipeable carousel for mobile devices
 * Shows dot indicators and supports touch/swipe gestures
 */

'use client';

import { useState, useRef, useEffect } from 'react';

interface MobileCarouselProps {
  children: React.ReactNode[];
  className?: string;
}

export function MobileCarousel({ children, className = '' }: MobileCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < children.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

    // Reset values
    setTouchStart(0);
    setTouchEnd(0);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-scroll the container to show current card
  useEffect(() => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.offsetWidth;
      containerRef.current.scrollTo({
        left: cardWidth * currentIndex,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  return (
    <div className={`relative ${className}`}>
      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 px-2"
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Dot Indicators - Visual Only */}
      <div className="flex justify-center gap-1.5 mt-6" aria-live="polite" aria-atomic="true">
        {children.map((_, index) => (
          <div
            key={index}
            className={`rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-[#E85D4D]/80 w-4 h-1.5'
                : 'bg-gray-300/50 w-1.5 h-1.5'
            }`}
            aria-hidden="true"
          />
        ))}
        <span className="sr-only">Slide {currentIndex + 1} of {children.length}</span>
      </div>
    </div>
  );
}
