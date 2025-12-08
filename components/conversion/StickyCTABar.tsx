/**
 * Sticky CTA Bar Component
 *
 * Dismissible sticky bar that appears at bottom of viewport after user scrolls.
 * Helps guide engaged users to take action on long pages.
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';

interface StickyCTABarProps {
  message?: string;
  ctaText?: string;
  ctaHref?: string;
  scrollThreshold?: number; // Percentage of page scrolled before showing (0-1)
  storageKey?: string; // Key for sessionStorage to remember dismissal
}

export function StickyCTABar({
  message = "Ready to build conviction?",
  ctaText = "Start a conversation",
  ctaHref = "/contact",
  scrollThreshold = 0.3, // Show after scrolling 30% of page
  storageKey = 'sticky-cta-dismissed'
}: StickyCTABarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Don't run on server
    if (typeof window === 'undefined') return;

    // Check if user has dismissed this in current session
    const hasDismissed = sessionStorage.getItem(storageKey);
    if (hasDismissed) {
      setIsDismissed(true);
      return;
    }

    const handleScroll = () => {
      // Calculate scroll percentage
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = scrollTop / (documentHeight - windowHeight);

      // Show bar once user scrolls past threshold
      if (scrollPercentage >= scrollThreshold && !isDismissed) {
        setIsVisible(true);
      }
    };

    // Check scroll position on mount
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollThreshold, storageKey, isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem(storageKey, 'true');

    // Track dismissal
    trackEvent(AnalyticsEvents.STICKY_CTA_DISMISSED, {
      page: window.location.pathname
    });
  };

  const handleCTAClick = () => {
    trackEvent(AnalyticsEvents.STICKY_CTA_CLICKED, {
      page: window.location.pathname,
      cta_text: ctaText
    });
  };

  // Don't render if dismissed or not yet visible
  if (isDismissed || !isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 animate-in slide-in-from-bottom duration-300"
      role="complementary"
      aria-label="Call to action"
    >
      {/* Main bar */}
      <div className="bg-background/95 backdrop-blur-md border-t border-border shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Message */}
            <p className="text-sm sm:text-base font-medium text-foreground">
              {message}
            </p>

            {/* CTA and Dismiss */}
            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
              {/* CTA Button */}
              <Link
                href={ctaHref}
                onClick={handleCTAClick}
                className="px-4 py-2 sm:px-6 sm:py-2.5 text-sm sm:text-base font-medium text-white bg-accent rounded-md hover:bg-accent/90 transition-colors whitespace-nowrap"
              >
                {ctaText}
              </Link>

              {/* Dismiss Button */}
              <button
                onClick={handleDismiss}
                className="p-2 text-muted hover:text-foreground transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
                aria-label="Dismiss"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
