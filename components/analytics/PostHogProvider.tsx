/**
 * PostHogProvider — initializes posthog-js once on the client and emits a
 * `$pageview` on every App Router pathname change. Wraps the whole app.
 *
 * Inert when NEXT_PUBLIC_POSTHOG_KEY is unset (local dev without a key,
 * preview builds without env, etc.) so nothing breaks if the var is missing.
 *
 * Configuration choices:
 *   - autocapture        on   (clicks / inputs / form submits)
 *   - session_recording  on   (full replay; mask sensitive inputs by default)
 *   - capture_pageview   off  (we emit manually on route change for SPA accuracy)
 *   - capture_pageleave  on   (so duration / bounce metrics are accurate)
 */

'use client';

import { Suspense, useEffect, type ReactNode } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';
import { PostHogProvider as PostHogReactProvider } from 'posthog-js/react';

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

// ui_host is the dashboard URL (us.posthog.com) — distinct from the ingest URL (us.i.posthog.com).
// Derive by stripping the `i.` subdomain so the toolbar links to the right place.
const POSTHOG_UI_HOST = POSTHOG_HOST.replace('://us.i.posthog.com', '://us.posthog.com')
                                    .replace('://eu.i.posthog.com', '://eu.posthog.com');

function initPostHog() {
  if (typeof window === 'undefined' || !POSTHOG_KEY || posthog.__loaded) return;
  posthog.init(POSTHOG_KEY, {
    api_host: '/ingest',
    ui_host: POSTHOG_UI_HOST,
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: true,
    session_recording: {
      maskAllInputs: true,
      maskInputOptions: {
        password: true,
        email: false,
      },
    },
    loaded: () => {
      // Expose the singleton on window so debugging from the console
      // works without needing to import the module.
      (window as unknown as { posthog: unknown }).posthog = posthog;
    },
  });
}

function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!POSTHOG_KEY || typeof window === 'undefined') return;
    const search = searchParams?.toString();
    const url = search ? `${pathname}?${search}` : pathname;
    posthog.capture('$pageview', { $current_url: window.location.origin + url });
  }, [pathname, searchParams]);

  return null;
}

/**
 * Global outbound-click delegate. Captures clicks on any anchor whose
 * href is mailto:/tel:/external-origin and fires a named `outbound_click`
 * event with destination + kind + source path. Lets us build top-of-funnel
 * insights (which case studies drive contact) without per-link wiring.
 *
 * Autocapture already records the raw click; this just adds a queryable
 * event with structured props.
 */
function OutboundClickTracker() {
  useEffect(() => {
    if (!POSTHOG_KEY || typeof window === 'undefined') return;

    const onClick = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      let kind: 'mailto' | 'tel' | 'external' | null = null;
      let destination = href;

      if (href.startsWith('mailto:')) {
        kind = 'mailto';
        destination = href.slice('mailto:'.length).split('?')[0];
      } else if (href.startsWith('tel:')) {
        kind = 'tel';
        destination = href.slice('tel:'.length);
      } else if (/^https?:\/\//i.test(href)) {
        try {
          const url = new URL(href, window.location.href);
          if (url.origin !== window.location.origin) {
            kind = 'external';
            destination = url.hostname;
          }
        } catch {
          // malformed href — ignore
        }
      }

      if (!kind) return;

      posthog.capture('outbound_click', {
        kind,
        destination,
        href,
        text: (anchor.textContent ?? '').trim().slice(0, 120),
        source_path: window.location.pathname,
        target: anchor.getAttribute('target') ?? null,
      });
    };

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}

export function PostHogProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    initPostHog();
  }, []);

  if (!POSTHOG_KEY) return <>{children}</>;
  return (
    <PostHogReactProvider client={posthog}>
      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
      <OutboundClickTracker />
      {children}
    </PostHogReactProvider>
  );
}
