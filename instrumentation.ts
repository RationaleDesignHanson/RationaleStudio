/**
 * Next.js Instrumentation
 *
 * Runs once when the Next.js server starts
 * Used for initializing monitoring tools like Sentry
 */

export async function register() {
  // Only register in production or when explicitly enabled
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}
