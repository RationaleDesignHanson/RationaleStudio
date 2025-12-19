'use client';

import { useEffect, useCallback, useRef } from 'react';

export interface DemoAnalyticsEvent {
  eventName: string;
  timestamp: number;
  properties?: Record<string, any>;
}

export interface SwipeAnalytics {
  direction: 'left' | 'right' | 'up' | 'down';
  emailType: string;
  emailIntent: string;
  wasAccidental: boolean;
  timeToDecision: number; // milliseconds
}

export interface CompletionAnalytics {
  totalEmails: number;
  emailsProcessed: number;
  timeSpent: number; // seconds
  completionRate: number; // percentage
  averageTimePerEmail: number; // seconds
}

/**
 * useDemoAnalytics Hook
 * Tracks user interactions and behavior throughout the demo
 * Provides insights for optimization and A/B testing
 */
export function useDemoAnalytics() {
  const sessionStartRef = useRef<number>(Date.now());
  const eventsRef = useRef<DemoAnalyticsEvent[]>([]);
  const emailStartTimesRef = useRef<Map<string, number>>(new Map());

  // Track generic event
  const trackEvent = useCallback((eventName: string, properties?: Record<string, any>) => {
    const event: DemoAnalyticsEvent = {
      eventName,
      timestamp: Date.now(),
      properties
    };

    eventsRef.current.push(event);

    // Send to analytics service (placeholder)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, properties);
    }

    // Console log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Demo Analytics]', eventName, properties);
    }
  }, []);

  // Track demo start
  const trackDemoStart = useCallback((layout: 'mobile' | 'tablet' | 'desktop') => {
    trackEvent('demo_started', {
      layout,
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'unknown',
      screenWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
      screenHeight: typeof window !== 'undefined' ? window.innerHeight : 0
    });
  }, [trackEvent]);

  // Track demo completion
  const trackDemoComplete = useCallback((analytics: CompletionAnalytics) => {
    trackEvent('demo_completed', {
      ...analytics,
      sessionDuration: Math.round((Date.now() - sessionStartRef.current) / 1000)
    });
  }, [trackEvent]);

  // Track swipe action
  const trackSwipe = useCallback((analytics: SwipeAnalytics) => {
    trackEvent('email_swiped', analytics);
  }, [trackEvent]);

  // Track email view start
  const trackEmailViewStart = useCallback((emailId: string, emailType: string, emailIntent: string) => {
    emailStartTimesRef.current.set(emailId, Date.now());
    trackEvent('email_viewed', {
      emailId,
      emailType,
      emailIntent
    });
  }, [trackEvent]);

  // Track email view end
  const trackEmailViewEnd = useCallback((emailId: string, action: string) => {
    const startTime = emailStartTimesRef.current.get(emailId);
    if (startTime) {
      const viewDuration = Date.now() - startTime;
      trackEvent('email_action_taken', {
        emailId,
        action,
        viewDuration
      });
      emailStartTimesRef.current.delete(emailId);
    }
  }, [trackEvent]);

  // Track action sheet open
  const trackActionSheetOpen = useCallback((emailIntent: string) => {
    trackEvent('action_sheet_opened', { emailIntent });
  }, [trackEvent]);

  // Track action sheet close
  const trackActionSheetClose = useCallback((selectedAction?: string) => {
    trackEvent('action_sheet_closed', { selectedAction });
  }, [trackEvent]);

  // Track action flow modal interactions
  const trackActionFlowStep = useCallback((actionType: string, step: number, totalSteps: number) => {
    trackEvent('action_flow_step', {
      actionType,
      step,
      totalSteps,
      progress: Math.round((step / totalSteps) * 100)
    });
  }, [trackEvent]);

  // Track action flow skip
  const trackActionFlowSkip = useCallback((actionType: string, skippedAtStep: number) => {
    trackEvent('action_flow_skipped', {
      actionType,
      skippedAtStep
    });
  }, [trackEvent]);

  // Track tutorial interactions
  const trackTutorialStart = useCallback(() => {
    trackEvent('tutorial_started', {});
  }, [trackEvent]);

  const trackTutorialStep = useCallback((step: number, stepName: string) => {
    trackEvent('tutorial_step', { step, stepName });
  }, [trackEvent]);

  const trackTutorialComplete = useCallback(() => {
    trackEvent('tutorial_completed', {});
  }, [trackEvent]);

  const trackTutorialSkip = useCallback((skippedAtStep: number) => {
    trackEvent('tutorial_skipped', { skippedAtStep });
  }, [trackEvent]);

  // Track CTA clicks
  const trackCTAClick = useCallback((ctaLocation: string, ctaText: string) => {
    trackEvent('cta_clicked', {
      location: ctaLocation,
      text: ctaText
    });
  }, [trackEvent]);

  // Track exit intent
  const trackExitIntent = useCallback((captured: boolean) => {
    trackEvent('exit_intent_triggered', {
      captured,
      timeOnPage: Math.round((Date.now() - sessionStartRef.current) / 1000)
    });
  }, [trackEvent]);

  // Track errors
  const trackError = useCallback((errorType: string, errorMessage: string) => {
    trackEvent('demo_error', {
      errorType,
      errorMessage
    });
  }, [trackEvent]);

  // Track performance metrics
  const trackPerformance = useCallback((metricName: string, value: number) => {
    trackEvent('performance_metric', {
      metricName,
      value
    });
  }, [trackEvent]);

  // Get session summary
  const getSessionSummary = useCallback(() => {
    const sessionDuration = Math.round((Date.now() - sessionStartRef.current) / 1000);
    const eventCounts = eventsRef.current.reduce((acc, event) => {
      acc[event.eventName] = (acc[event.eventName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      sessionDuration,
      totalEvents: eventsRef.current.length,
      eventCounts,
      events: eventsRef.current
    };
  }, []);

  // Send session summary on unmount
  useEffect(() => {
    return () => {
      const summary = getSessionSummary();
      // Send final session data to analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'session_ended', summary);
      }
    };
  }, [getSessionSummary]);

  return {
    trackEvent,
    trackDemoStart,
    trackDemoComplete,
    trackSwipe,
    trackEmailViewStart,
    trackEmailViewEnd,
    trackActionSheetOpen,
    trackActionSheetClose,
    trackActionFlowStep,
    trackActionFlowSkip,
    trackTutorialStart,
    trackTutorialStep,
    trackTutorialComplete,
    trackTutorialSkip,
    trackCTAClick,
    trackExitIntent,
    trackError,
    trackPerformance,
    getSessionSummary
  };
}
