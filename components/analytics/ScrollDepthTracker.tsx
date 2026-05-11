/**
 * <ScrollDepthTracker /> — fires PostHog `scroll_depth` events when the
 * visitor scrolls past 25 / 50 / 75 / 100% of the document. Each threshold
 * fires at most once per page mount. Drop it inside any long page where
 * read-completion is a useful signal (case studies, essays).
 *
 * Implementation: scroll listener that computes
 *   depth = (scrollY + viewportHeight) / documentScrollHeight
 * on every scroll, throttled via requestAnimationFrame. Fires the highest
 * threshold reached. Renders no DOM — purely a side effect.
 */

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import posthog from 'posthog-js';

interface Props {
  /** Identifier for the page being tracked. Defaults to the current pathname. */
  page?: string;
  /** Override the default 25/50/75/100% thresholds (in 0–1 fractions). */
  thresholds?: number[];
}

const DEFAULT_THRESHOLDS = [0.25, 0.5, 0.75, 1];

export function ScrollDepthTracker({ page, thresholds = DEFAULT_THRESHOLDS }: Props = {}) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // pathname is included in the deps so navigating between pages within
    // the same layout (which keeps this component mounted) resets the
    // fired-thresholds set and the listener re-binds against the new page.
    const pageId = page ?? pathname;
    const sorted = [...thresholds].sort((a, b) => a - b);
    const fired = new Set<number>();
    let ticking = false;

    const measure = () => {
      ticking = false;
      const scrollHeight = document.documentElement.scrollHeight;
      const viewport = window.innerHeight;
      // Avoid divide-by-zero on short pages; clamp depth to [0, 1].
      const denom = Math.max(scrollHeight - viewport, 1);
      const depth = Math.min(1, Math.max(0, window.scrollY / denom));

      for (const t of sorted) {
        if (depth >= t && !fired.has(t)) {
          fired.add(t);
          posthog.capture('scroll_depth', {
            depth: t,
            page: pageId,
            source_path: window.location.pathname,
          });
        }
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    // Run once on mount in case the page loads scrolled (back-button, deep link).
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [page, pathname, thresholds]);

  return null;
}
