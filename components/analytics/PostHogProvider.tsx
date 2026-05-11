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
    // SDK still appends ?compression=gzip-js to the URL even with this flag
    // set, but at least the body stays plain JSON. The /ingest route handler
    // strips that URL param before forwarding so the upstream PostHog server
    // doesn't try to decode plain JSON as gzip.
    disable_compression: true,
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

// Common referrer-domain → canonical-source mapping. Add entries here as
// you notice new short-link or social aggregator domains in the dashboard.
// Anything not in this table passes through as-is.
const TRAFFIC_SOURCE_ALIASES: Record<string, string> = {
  't.co': 'twitter',
  'x.com': 'twitter',
  'twitter.com': 'twitter',
  'lnkd.in': 'linkedin',
  'linkedin.com': 'linkedin',
  'l.linkedin.com': 'linkedin',
  'news.ycombinator.com': 'hn',
  'hn.algolia.com': 'hn',
  'reddit.com': 'reddit',
  'old.reddit.com': 'reddit',
  'm.reddit.com': 'reddit',
  'out.reddit.com': 'reddit',
  'google.com': 'google',
  'www.google.com': 'google',
  'bing.com': 'bing',
  'duckduckgo.com': 'duckduckgo',
  'substack.com': 'substack',
  'open.substack.com': 'substack',
  'mail.google.com': 'gmail',
  'outlook.live.com': 'outlook',
  'outlook.office.com': 'outlook',
};

function normalizeTrafficSource(referrerDomain: string | null | undefined): string | null {
  if (!referrerDomain) return null;
  const d = referrerDomain.toLowerCase().replace(/^www\./, '');
  return TRAFFIC_SOURCE_ALIASES[d] ?? d;
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!POSTHOG_KEY || typeof window === 'undefined') return;
    const search = searchParams?.toString();
    const url = search ? `${pathname}?${search}` : pathname;

    // UTM extraction + session-level registration. Once registered via
    // posthog.register, these props stick to every subsequent event in the
    // session — so the conversion ($outbound_click, vault_unlock_*) carries
    // the source it came from without needing to re-parse.
    const utmProps: Record<string, string> = {};
    for (const key of UTM_KEYS) {
      const v = searchParams?.get(key);
      if (v) utmProps[key] = v;
    }
    if (Object.keys(utmProps).length > 0) {
      posthog.register(utmProps);
    }

    // Normalize the referrer domain into a coarse "traffic_source" so the
    // dashboard isn't fragmented across t.co / x.com / twitter.com etc.
    // posthog's $referring_domain is set automatically; we just label it.
    let referrer_domain: string | null = null;
    try {
      if (document.referrer) {
        referrer_domain = new URL(document.referrer).hostname;
      }
    } catch {
      // bad referrer; ignore
    }
    const traffic_source = normalizeTrafficSource(referrer_domain);

    posthog.capture('$pageview', {
      $current_url: window.location.origin + url,
      ...(traffic_source ? { traffic_source } : {}),
      ...utmProps,
    });
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
// Walk up the DOM from a clicked anchor looking for the nearest ancestor
// that carries `data-cta-location` / `data-cta-type` attributes. Falls back
// to inferring `cta_location` from the nearest semantic element (header,
// footer, nav, article, section) so we get useful labels for free.
function ctaContext(anchor: HTMLAnchorElement): { cta_location: string; cta_type: string | null } {
  let node: HTMLElement | null = anchor;
  let cta_location: string | null = null;
  let cta_type: string | null = null;

  while (node && node !== document.body) {
    const loc = node.dataset.ctaLocation;
    const type = node.dataset.ctaType;
    if (!cta_location && loc) cta_location = loc;
    if (!cta_type && type) cta_type = type;
    if (cta_location && cta_type) break;
    node = node.parentElement;
  }

  if (!cta_location) {
    // Fall back to semantic ancestor — header/footer/nav give 80% of the
    // signal even without explicit data attributes.
    const semantic = anchor.closest('header, footer, nav, article, section, aside, main');
    if (semantic) {
      cta_location = semantic.tagName.toLowerCase();
    } else {
      cta_location = 'unknown';
    }
  }

  return { cta_location, cta_type };
}

function inferCtaType(kind: 'mailto' | 'tel' | 'external', destination: string): string {
  if (kind === 'mailto') return 'email';
  if (kind === 'tel') return 'phone';
  const d = destination.toLowerCase();
  if (d.includes('apps.apple.com')) return 'app_store';
  if (d.includes('play.google.com')) return 'play_store';
  if (d.includes('github.com')) return 'github';
  if (d.includes('substack.com')) return 'substack';
  if (d.includes('linkedin.com') || d === 'lnkd.in') return 'linkedin';
  if (d.includes('twitter.com') || d === 'x.com' || d === 't.co') return 'twitter';
  if (d.includes('vimeo.com')) return 'vimeo';
  if (d.includes('youtube.com') || d === 'youtu.be') return 'youtube';
  return 'external_link';
}

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

      const { cta_location, cta_type: explicitType } = ctaContext(anchor as HTMLAnchorElement);
      const cta_type = explicitType ?? inferCtaType(kind, destination);

      posthog.capture('outbound_click', {
        kind,
        destination,
        href,
        text: (anchor.textContent ?? '').trim().slice(0, 120),
        source_path: window.location.pathname,
        target: anchor.getAttribute('target') ?? null,
        cta_location,
        cta_type,
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
