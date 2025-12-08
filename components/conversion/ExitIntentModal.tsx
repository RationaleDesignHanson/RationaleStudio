/**
 * Exit Intent Modal Component
 *
 * Detects when user is about to leave the site and shows a targeted conversion offer.
 * Uses mouse movement detection to trigger before the user clicks away.
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';

interface ExitIntentModalProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  delay?: number; // Minimum time on page before showing (ms)
}

export function ExitIntentModal({
  title = "Before you go...",
  subtitle = "Let's talk about your product challenge. Book a free 30-minute consultation to see if we can help.",
  ctaText = "Schedule a call",
  ctaHref = "/contact",
  delay = 20000, // Don't show for first 20 seconds (gives users time to engage)
}: ExitIntentModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Don't run on server
    if (typeof window === 'undefined') return;

    // Check if user has already seen this in this session
    const hasSeenInSession = sessionStorage.getItem('exit-intent-shown');
    if (hasSeenInSession) {
      return;
    }

    // Wait for delay before enabling exit intent
    const readyTimer = setTimeout(() => {
      setIsReady(true);
    }, delay);

    return () => clearTimeout(readyTimer);
  }, [delay]);

  useEffect(() => {
    if (!isReady || hasShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Detect if cursor is moving towards top of viewport (classic exit intent)
      if (e.clientY <= 10 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);

        // Track in sessionStorage
        sessionStorage.setItem('exit-intent-shown', 'true');

        // Track analytics
        trackEvent(AnalyticsEvents.EXIT_INTENT_SHOWN, {
          page: window.location.pathname,
          time_on_page: Math.round((Date.now() - performance.now()) / 1000)
        });
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isReady, hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleCTA = () => {
    trackEvent(AnalyticsEvents.EXIT_INTENT_CONVERSION, {
      page: window.location.pathname,
    });
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
        <div
          className="bg-background border border-accent/20 rounded-lg shadow-2xl max-w-md w-full p-6 sm:p-8 pointer-events-auto animate-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 p-2 text-muted hover:text-foreground transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Content */}
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              {title}
            </h2>
            <p className="text-base text-muted mb-6 leading-relaxed">
              {subtitle}
            </p>

            {/* CTA Button */}
            <Link
              href={ctaHref}
              onClick={handleCTA}
              className="inline-block w-full px-6 py-3 text-base font-medium text-white bg-accent rounded-md hover:bg-accent/90 transition-colors"
            >
              {ctaText}
            </Link>

            {/* Secondary action */}
            <button
              onClick={handleClose}
              className="mt-4 text-sm text-muted hover:text-foreground transition-colors"
            >
              No thanks, I'll keep browsing
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
