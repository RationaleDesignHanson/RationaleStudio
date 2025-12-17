/**
 * Analytics & Session Recording Setup
 *
 * Integrates Microsoft Clarity and Google Analytics 4 for:
 * - Session recording and heatmaps
 * - Conversion funnel tracking
 * - Custom event tracking
 * - User behavior analysis
 */

// Microsoft Clarity configuration
export const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || '';

// Google Analytics 4 configuration
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

// Custom events for conversion tracking
export const AnalyticsEvents = {
  // Funnel stages
  HOMEPAGE_VIEW: 'homepage_view',
  SERVICE_EXPLORATION: 'service_exploration',
  PRICING_VIEW: 'pricing_view',
  CONTACT_FORM_START: 'contact_form_start',
  CONTACT_FORM_SUBMIT: 'contact_form_submit',

  // Micro-conversions
  EMAIL_CLICK: 'email_click',
  CASE_STUDY_DOWNLOAD: 'case_study_download',
  ROI_CALCULATOR_USE: 'roi_calculator_use',
  SERVICE_DETAIL_VIEW: 'service_detail_view',
  FAQ_EXPAND: 'faq_expand',

  // Exit intent
  EXIT_INTENT_SHOWN: 'exit_intent_shown',
  EXIT_INTENT_CONVERSION: 'exit_intent_conversion',

  // Sticky CTA
  STICKY_CTA_CLICKED: 'sticky_cta_clicked',
  STICKY_CTA_DISMISSED: 'sticky_cta_dismissed',

  // Form recovery
  FORM_RECOVERY_SHOWN: 'form_recovery_shown',
  FORM_RECOVERY_ACCEPTED: 'form_recovery_accepted',
} as const;

// Type-safe event tracking
type AnalyticsEvent = typeof AnalyticsEvents[keyof typeof AnalyticsEvents];

interface EventProperties {
  [key: string]: string | number | boolean;
}

/**
 * Track custom event in GA4 and Clarity
 */
export function trackEvent(event: AnalyticsEvent, properties?: EventProperties): void {
  if (typeof window === 'undefined') return;

  // Google Analytics 4
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', event, properties);
  }

  // Microsoft Clarity custom tags
  if (typeof window.clarity !== 'undefined') {
    window.clarity('set', event, properties ? JSON.stringify(properties) : 'true');
  }

  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event, properties);
  }
}

/**
 * Track page view
 */
export function trackPageView(url: string, title?: string): void {
  if (typeof window === 'undefined') return;

  // Google Analytics 4
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: title,
    });
  }
}

/**
 * Identify user (for authenticated sessions)
 */
export function identifyUser(userId: string, properties?: EventProperties): void {
  if (typeof window === 'undefined') return;

  // Google Analytics 4
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      user_id: userId,
      ...properties,
    });
  }

  // Microsoft Clarity
  if (typeof window.clarity !== 'undefined') {
    window.clarity('identify', userId, undefined, undefined, properties?.name as string);
  }
}

/**
 * Track conversion goal
 */
export function trackConversion(goalName: string, value?: number): void {
  trackEvent('conversion' as AnalyticsEvent, {
    goal: goalName,
    value: value || 0,
  });
}

// Type declarations for global window objects
declare global {
  interface Window {
    // Google Analytics 4 gtag.js
    gtag: (
      command: 'config' | 'event' | 'set' | 'get',
      targetId: string,
      config?: Record<string, string | number | boolean | undefined>
    ) => void;
    // Microsoft Clarity
    clarity: (command: string, ...args: (string | number | undefined)[]) => void;
    // Google Analytics data layer
    dataLayer: Array<Record<string, unknown>>;
  }
}
