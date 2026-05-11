import posthog from 'posthog-js';
import { logger } from '@/lib/utils/logger';

/**
 * Analytics — thin facade over PostHog.
 *
 * PostHog is initialized once in components/analytics/PostHogProvider.tsx.
 * This module exposes a small typed surface so call sites don't import
 * posthog directly and we can swap or layer providers later.
 *
 * Captured automatically by PostHog (no code needed):
 *   - $pageview on every App Router pathname change (PostHogProvider)
 *   - $autocapture on clicks / inputs / form submits
 *   - Session replay (with input masking)
 *   - Heatmaps + scroll depth
 *
 * Use the helpers below for explicit funnel / conversion events that you
 * want to query as named events in PostHog Insights.
 */

// Named events with an active call site somewhere in the app. The ten old
// studio-funnel events (HOMEPAGE_VIEW, SERVICE_EXPLORATION, PRICING_VIEW,
// CONTACT_FORM_START/SUBMIT, EMAIL_CLICK, CASE_STUDY_DOWNLOAD,
// ROI_CALCULATOR_USE, SERVICE_DETAIL_VIEW, FAQ_EXPAND) were removed
// 2026-05-11 — they were defined but never fired in any code path. If
// you need a new named event, add it here AND wire its trackEvent call.
export const AnalyticsEvents = {
  // /clients/* conversion components — fire when those gated pages render.
  EXIT_INTENT_SHOWN: 'exit_intent_shown',
  EXIT_INTENT_CONVERSION: 'exit_intent_conversion',

  STICKY_CTA_CLICKED: 'sticky_cta_clicked',
  STICKY_CTA_DISMISSED: 'sticky_cta_dismissed',

  FORM_RECOVERY_SHOWN: 'form_recovery_shown',
  FORM_RECOVERY_ACCEPTED: 'form_recovery_accepted',
} as const;

type AnalyticsEvent = typeof AnalyticsEvents[keyof typeof AnalyticsEvents];

interface EventProperties {
  [key: string]: string | number | boolean;
}

function isReady(): boolean {
  return typeof window !== 'undefined' && posthog.__loaded === true;
}

/**
 * Track a named event. PostHog also auto-captures clicks / form submits as
 * `$autocapture`, so reach for this only when you want a stable, queryable
 * event name (funnels, retention, conversion goals).
 */
export function trackEvent(event: AnalyticsEvent | string, properties?: EventProperties): void {
  if (!isReady()) return;
  posthog.capture(event, properties);

  if (process.env.NODE_ENV === 'development') {
    logger.log('[Analytics]', event, properties);
  }
}

/**
 * Manual pageview. Not normally needed — PostHogProvider already emits
 * `$pageview` on every App Router pathname change. Kept for legacy
 * call sites and one-off virtual pageviews (modals, deep nested routes).
 */
export function trackPageView(url: string, title?: string): void {
  if (!isReady()) return;
  posthog.capture('$pageview', {
    $current_url: typeof window !== 'undefined' ? window.location.origin + url : url,
    title,
  });
}

/**
 * Identify the visitor for cross-session stitching. Call after a known
 * sign-in / pitch-token resolution. PostHog merges anonymous history into
 * the identified profile.
 */
export function identifyUser(userId: string, properties?: EventProperties): void {
  if (!isReady()) return;
  posthog.identify(userId, properties);
}

/**
 * Track a conversion goal. Captured as a generic `conversion` event with
 * a goal name + optional value so we can build funnels / cohorts in
 * PostHog without inventing a new event per goal.
 */
export function trackConversion(goalName: string, value?: number): void {
  trackEvent('conversion', {
    goal: goalName,
    value: value ?? 0,
  });
}
