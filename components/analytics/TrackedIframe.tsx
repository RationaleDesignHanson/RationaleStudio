/**
 * <TrackedIframe> — drop-in replacement for <iframe> that emits PostHog
 * events for engagement without touching the embedded prototype's code:
 *
 *   prototype_loaded     fires once, when the iframe first enters viewport
 *   prototype_engaged    fires once, after `engagementThreshold` ms in-view
 *                        (default 5000ms — tunes "user actually paid attention")
 *   prototype_clicked    fires every time the user mousedowns into the iframe
 *                        (cross-origin clicks register as window blur)
 *
 * All events carry { prototype, source_path } so we can group by surface.
 * Use the slug param to label which prototype this is — shows up in the
 * dashboard's prototype-engagement section.
 *
 * For richer events (button-level inside the prototype), the prototype's
 * own HTML can add posthog-js directly — same project key, same domain,
 * cookies stitch the session.
 */

'use client';

import { useEffect, useRef, type IframeHTMLAttributes } from 'react';
import posthog from 'posthog-js';

interface Props extends Omit<IframeHTMLAttributes<HTMLIFrameElement>, 'ref'> {
  /** Short identifier for this prototype (rumi, zero-swipe, fubo, etc.) */
  prototype: string;
  /** ms in-viewport before firing prototype_engaged. Default 5000. */
  engagementThreshold?: number;
}

export function TrackedIframe({ prototype, engagementThreshold = 5000, ...iframeProps }: Props) {
  const ref = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;

    // Call the imported singleton directly — reaching for window.posthog
    // grabs whatever's there at effect-time, which is `undefined` if the
    // SDK's `loaded` callback hasn't fired yet. The result is captures
    // silently no-op forever (caught this bug 2026-05-11 via audit).
    // posthog.capture() itself queues pre-init events and flushes after.
    const capture = (event: string, props: Record<string, unknown>) => {
      posthog.capture(event, { prototype, source_path: window.location.pathname, ...props });
    };

    let loaded = false;
    let engaged = false;
    let inViewSince: number | null = null;
    let engageTimer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!loaded) {
              loaded = true;
              capture('prototype_loaded', {});
            }
            inViewSince = Date.now();
            if (!engaged) {
              engageTimer = setTimeout(() => {
                if (!engaged) {
                  engaged = true;
                  capture('prototype_engaged', { threshold_ms: engagementThreshold });
                }
              }, engagementThreshold);
            }
          } else {
            if (engageTimer) {
              clearTimeout(engageTimer);
              engageTimer = null;
            }
            inViewSince = null;
          }
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);

    // Cross-origin (and even same-origin sandboxed) iframes don't surface
    // their own click events to the parent, but the browser fires `blur` on
    // window when focus moves into the iframe — a reliable click-through proxy.
    const onBlur = () => {
      if (document.activeElement === el) {
        capture('prototype_clicked', { in_view_ms: inViewSince ? Date.now() - inViewSince : 0 });
      }
    };
    window.addEventListener('blur', onBlur);

    return () => {
      observer.disconnect();
      window.removeEventListener('blur', onBlur);
      if (engageTimer) clearTimeout(engageTimer);
    };
  }, [prototype, engagementThreshold]);

  return <iframe ref={ref} {...iframeProps} />;
}
