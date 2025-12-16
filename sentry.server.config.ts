/**
 * Sentry Server Configuration
 *
 * Monitors errors in Node.js runtime (API routes, server components)
 */

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
const ENVIRONMENT = process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV || 'development';

// Only initialize if DSN is provided
if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,

    // Environment tracking
    environment: ENVIRONMENT,

    // Release tracking
    release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'development',

    // Performance monitoring (lower sample rate for server)
    tracesSampleRate: ENVIRONMENT === 'production' ? 0.1 : 1.0,

    // Integrations
    integrations: [
      Sentry.httpIntegration(),
    ],

    // Filter sensitive data
    beforeSend(event) {
      // Don't send in development
      if (ENVIRONMENT === 'development') {
        console.error('Sentry (server) would send:', event);
        return null;
      }

      // Remove sensitive server data
      if (event.request) {
        delete event.request.cookies;
        delete event.request.headers;
      }

      // Remove environment variables from context
      if (event.contexts?.runtime) {
        delete event.contexts.runtime.env;
      }

      return event;
    },

    // Ignore non-critical errors
    ignoreErrors: [
      'ECONNREFUSED',
      'ENOTFOUND',
      'ETIMEDOUT',
    ],
  });
}
