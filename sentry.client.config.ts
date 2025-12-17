/**
 * Sentry Client Configuration
 *
 * Monitors errors in the browser/client-side code
 */

import * as Sentry from '@sentry/nextjs';
import { logger } from '@/lib/utils/logger';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
const ENVIRONMENT = process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV || 'development';

// Only initialize if DSN is provided
if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,

    // Environment tracking
    environment: ENVIRONMENT,

    // Release tracking (use git commit hash or version)
    release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'development',

    // Performance monitoring
    tracesSampleRate: ENVIRONMENT === 'production' ? 0.1 : 1.0,

    // Session replay for debugging
    replaysSessionSampleRate: ENVIRONMENT === 'production' ? 0.1 : 0,
    replaysOnErrorSampleRate: 1.0, // Always capture replays on errors

    // Integrations
    integrations: [
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
      Sentry.browserTracingIntegration(),
    ],

    // Filter out sensitive data
    beforeSend(event, hint) {
      // Don't send errors in development (unless you want to test)
      if (ENVIRONMENT === 'development') {
        logger.error('Sentry would send:', event);
        return null;
      }

      // Remove sensitive data from error context
      if (event.request) {
        delete event.request.cookies;
        delete event.request.headers;
      }

      return event;
    },

    // Ignore common non-critical errors
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'Non-Error promise rejection captured',
      'Failed to fetch',
      'NetworkError',
    ],
  });
}
