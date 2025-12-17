/**
 * Sentry Edge Configuration
 *
 * Monitors errors in Edge Runtime (middleware, edge functions)
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

    // Release tracking
    release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'development',

    // Lower sample rate for edge (runs frequently)
    tracesSampleRate: ENVIRONMENT === 'production' ? 0.05 : 1.0,

    // Filter sensitive data
    beforeSend(event) {
      // Don't send in development
      if (ENVIRONMENT === 'development') {
        logger.error('Sentry (edge) would send:', event);
        return null;
      }

      // Remove sensitive edge data
      if (event.request) {
        delete event.request.cookies;
        delete event.request.headers;
      }

      return event;
    },
  });
}
