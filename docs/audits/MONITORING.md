# Monitoring & Error Tracking Setup

Guide for production monitoring, error tracking, and performance observability.

## Overview

This document covers:
- Built-in Netlify monitoring
- Client-side error tracking
- Server-side logging
- Performance monitoring
- Custom analytics

---

## 1. Netlify Analytics (Recommended)

### 1.1 Enable Netlify Analytics

**Cost**: $9/month per site

**Features**:
- Real-time visitor analytics
- Page views and unique visitors
- Top pages and referrers
- Bandwidth usage
- No client-side JavaScript required (server-side tracking)

**Setup**:
```bash
# Via Netlify Dashboard:
# 1. Go to Site > Analytics
# 2. Enable Netlify Analytics
# 3. View metrics in dashboard

# Via CLI:
netlify plugins:install @netlify/plugin-analytics
```

### 1.2 Monitor Key Metrics

Track these metrics in Netlify Dashboard:

**Traffic**:
- Daily/weekly/monthly visitors
- Top pages (homepage, /work, /ventures)
- Referrer sources
- Geographic distribution

**Performance**:
- Build times
- Deploy frequency
- Failed builds
- Function execution times

**Errors**:
- 404 errors (broken links)
- 500 errors (server issues)
- Build failures

---

## 2. Client-Side Error Tracking

### 2.1 React Error Boundary (Already Configured)

Location: `/app/error.tsx` and `/app/global-error.tsx`

**Current Implementation**:
```typescript
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console (upgrade to error service in production)
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
        <button onClick={() => reset()}>Try again</button>
      </div>
    </div>
  );
}
```

**Upgrade for Production**:

Replace `console.error` with error service:

```typescript
// Option 1: Sentry
import * as Sentry from '@sentry/nextjs';

useEffect(() => {
  Sentry.captureException(error);
}, [error]);

// Option 2: Rollbar
import Rollbar from 'rollbar';

const rollbar = new Rollbar({
  accessToken: process.env.NEXT_PUBLIC_ROLLBAR_TOKEN,
  environment: 'production',
});

useEffect(() => {
  rollbar.error(error);
}, [error]);

// Option 3: Custom logging endpoint
useEffect(() => {
  fetch('/api/log-error', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      error: error.message,
      stack: error.stack,
      digest: error.digest,
      timestamp: new Date().toISOString(),
    }),
  });
}, [error]);
```

### 2.2 Console Monitoring

For development, already configured in `next.config.mjs`:

```javascript
// Suppress hydration warnings in development
reactStrictMode: true,
```

**Production Console Tracking**:

Add to `/app/layout.tsx`:

```typescript
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  // Capture console errors
  const originalError = console.error;
  console.error = (...args) => {
    originalError(...args);
    // Send to error tracking service
    fetch('/api/log-error', {
      method: 'POST',
      body: JSON.stringify({
        type: 'console.error',
        message: args.map(a => String(a)).join(' '),
        timestamp: new Date().toISOString(),
      }),
    });
  };
}
```

---

## 3. Server-Side Logging

### 3.1 API Route Logging

Create middleware for API logging:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const start = Date.now();

  // Log request
  console.log({
    type: 'api_request',
    method: request.method,
    path: request.nextUrl.pathname,
    timestamp: new Date().toISOString(),
  });

  const response = NextResponse.next();

  // Log response time
  response.headers.set('X-Response-Time', `${Date.now() - start}ms`);

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
```

### 3.2 Firebase Admin Logging

Already implemented in `/lib/auth/firebase-admin.ts`:

```typescript
export async function verifyAuthToken(token: string) {
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}
```

**Upgrade for Production**:

```typescript
export async function verifyAuthToken(token: string) {
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);

    // Log successful auth
    console.log({
      type: 'auth_success',
      uid: decodedToken.uid,
      timestamp: new Date().toISOString(),
    });

    return decodedToken;
  } catch (error) {
    // Log auth failure with details
    console.error({
      type: 'auth_failure',
      error: error.message,
      timestamp: new Date().toISOString(),
    });

    return null;
  }
}
```

---

## 4. Performance Monitoring

### 4.1 Netlify Performance Monitoring

**Built-in Metrics**:
- Time to First Byte (TTFB)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- First Input Delay (FID)

Access in: Netlify Dashboard > Analytics > Performance

### 4.2 Web Vitals Reporting (Custom)

Add to `/app/layout.tsx`:

```typescript
'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(metric);
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      fetch('/api/analytics/web-vitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metric),
      });
    }
  });

  return null;
}
```

Then in root layout:

```typescript
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <WebVitalsReporter />
        {children}
      </body>
    </html>
  );
}
```

### 4.3 API Performance Tracking

Add timing to API routes:

```typescript
// Example: /app/api/zero/beta-signup/route.ts
export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    // ... existing logic ...

    const duration = Date.now() - startTime;
    console.log({
      type: 'api_performance',
      endpoint: '/api/zero/beta-signup',
      duration,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error({
      type: 'api_error',
      endpoint: '/api/zero/beta-signup',
      duration,
      error: error.message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
```

---

## 5. Custom Analytics (Optional)

### 5.1 Page View Tracking

Create custom analytics component:

```typescript
// components/analytics/PageViewTracker.tsx
'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page view
    if (typeof window !== 'undefined') {
      const url = pathname + (searchParams ? `?${searchParams}` : '');

      // Send to custom analytics endpoint
      fetch('/api/analytics/pageview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          referrer: document.referrer,
          timestamp: new Date().toISOString(),
        }),
      });
    }
  }, [pathname, searchParams]);

  return null;
}
```

### 5.2 Event Tracking

For tracking specific user actions:

```typescript
// lib/analytics.ts
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window === 'undefined') return;

  fetch('/api/analytics/event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: eventName,
      properties,
      timestamp: new Date().toISOString(),
    }),
  });
}

// Usage:
import { trackEvent } from '@/lib/analytics';

// Button click
<button onClick={() => {
  trackEvent('beta_signup_clicked', { page: 'homepage' });
  // ... rest of handler
}}>
  Sign Up
</button>

// Form submission
<form onSubmit={(e) => {
  trackEvent('contact_form_submitted', {
    interest: formData.interest,
  });
  // ... rest of handler
}}>
```

---

## 6. Alert Configuration

### 6.1 Netlify Deploy Notifications

**Setup**:
1. Go to Netlify Dashboard > Site > Settings > Deploy notifications
2. Add notification for:
   - Deploy started
   - Deploy succeeded
   - Deploy failed

**Channels**:
- Email
- Slack (via webhook)
- Discord (via webhook)
- Custom webhook

### 6.2 Firebase Alerts

**Setup in Firebase Console**:
1. Go to Alerts tab
2. Configure alerts for:
   - Authentication failures (spike detection)
   - Firestore quota exceeded
   - Storage quota exceeded

---

## 7. Logging Best Practices

### 7.1 Log Levels

Use consistent log levels:

```typescript
// Development
console.log('Info message');
console.warn('Warning message');
console.error('Error message');

// Production (structured logging)
const log = {
  level: 'info' | 'warn' | 'error',
  message: string,
  context?: Record<string, any>,
  timestamp: string,
};
```

### 7.2 What to Log

**DO Log**:
- API request/response times
- Authentication events (success/failure)
- Critical errors with stack traces
- Performance metrics
- Security events (failed auth attempts)

**DON'T Log**:
- User passwords or sensitive data
- API keys or tokens
- Personal information (PII)
- Full request/response bodies in production

### 7.3 Log Retention

Netlify function logs:
- Retained for 7 days on free plan
- Retained for 30 days on Pro plan

For longer retention:
- Ship logs to external service (e.g., Logtail, Papertrail)
- Use Firebase Cloud Functions for custom log aggregation

---

## 8. Dashboard Setup

### 8.1 Monitoring Dashboard

Recommended tools:
- **Netlify Analytics**: Primary traffic and performance monitoring
- **Firebase Console**: Authentication and database monitoring
- **Uptime Robot** (free): Website uptime monitoring

### 8.2 Custom Admin Dashboard

Create at `/app/owners/monitoring/page.tsx`:

```typescript
export default function MonitoringDashboard() {
  return (
    <div>
      <h1>System Monitoring</h1>

      {/* Embed Netlify Analytics iframe */}
      <iframe src="https://app.netlify.com/..." />

      {/* Firebase usage stats */}
      <FirebaseUsageWidget />

      {/* Recent errors */}
      <RecentErrorsWidget />

      {/* Performance metrics */}
      <PerformanceMetricsWidget />
    </div>
  );
}
```

---

## 9. Testing Monitoring Setup

### 9.1 Trigger Test Error

```bash
# Visit this route to trigger error boundary:
# /test-error (create this route for testing)

# app/test-error/page.tsx
export default function TestError() {
  throw new Error('Test error for monitoring');
}
```

### 9.2 Verify Logs

```bash
# Netlify function logs:
netlify functions:log

# Local development logs:
# Check terminal running `npm run dev`

# Production logs:
# Netlify Dashboard > Functions > View logs
```

---

## 10. Incident Response

### 10.1 When Error Rate Spikes

1. Check Netlify Analytics for traffic patterns
2. Review function logs for error patterns
3. Check Firebase Console for quota issues
4. Review recent deploys (rollback if needed)

### 10.2 When Site is Down

1. Check Netlify status: https://www.netlifystatus.com
2. Check DNS configuration
3. Review recent configuration changes
4. Contact Netlify support if needed

### 10.3 When Build Fails

1. Review build logs in Netlify Dashboard
2. Check for dependency issues (`npm audit`)
3. Verify environment variables are set
4. Test build locally: `npm run build`

---

## Summary

**Enabled by Default**:
- ✅ React Error Boundaries
- ✅ Console error logging
- ✅ Netlify build logs
- ✅ Firebase authentication logs

**Recommended to Enable**:
- 📊 Netlify Analytics ($9/month)
- 🚨 Deploy notifications (Slack/Email)
- ⏱️ Uptime monitoring (free tier available)

**Optional Upgrades**:
- 📈 Web Vitals reporting API
- 🎯 Custom event tracking
- 🔍 Error tracking service (Sentry/Rollbar)

**Next Steps**:
1. Enable Netlify Analytics
2. Set up deploy notifications
3. Create monitoring dashboard
4. Configure alerts for critical errors
