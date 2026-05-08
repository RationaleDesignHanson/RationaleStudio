/**
 * PostHog server-side query client.
 *
 * Uses the Personal API key (phx_*) and the /api/projects/<id>/query/
 * endpoint to run HogQL queries from server components. Never imported
 * by client code — the personal key is admin-level and must stay server-side.
 */

import 'server-only';

const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';
const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID;
const POSTHOG_PERSONAL_API_KEY = process.env.POSTHOG_PERSONAL_API_KEY;

// Dashboard at us.posthog.com; ingest at us.i.posthog.com. Query API lives on
// the dashboard host, not the ingest host.
const QUERY_HOST = POSTHOG_HOST.replace('://us.i.posthog.com', '://us.posthog.com')
                               .replace('://eu.i.posthog.com', '://eu.posthog.com');

export interface HogQLResult<T extends readonly unknown[] = readonly unknown[]> {
  columns: string[];
  results: T[];
  hasMore: boolean;
  is_cached: boolean;
}

export class PostHogQueryError extends Error {
  constructor(message: string, readonly status?: number, readonly raw?: unknown) {
    super(message);
    this.name = 'PostHogQueryError';
  }
}

/**
 * Run a HogQL query. Returns rows as arrays of unknowns — caller is
 * responsible for narrowing to the expected column types.
 *
 * @param hogql Plain HogQL string. Use ${} interpolation only for values
 *              you control (no user input). Quote strings with single quotes.
 * @param revalidate Seconds to cache the response (default 30s — feels live
 *              for a low-traffic site). Bump per-call for expensive queries.
 *              Set to 0 to disable caching entirely.
 */
export async function hogql<T extends readonly unknown[] = readonly unknown[]>(
  hogql: string,
  revalidate = 30,
): Promise<HogQLResult<T>> {
  if (!POSTHOG_PROJECT_ID || !POSTHOG_PERSONAL_API_KEY) {
    throw new PostHogQueryError(
      'PostHog query disabled: POSTHOG_PROJECT_ID or POSTHOG_PERSONAL_API_KEY not set.',
    );
  }

  const url = `${QUERY_HOST}/api/projects/${POSTHOG_PROJECT_ID}/query/`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${POSTHOG_PERSONAL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: { kind: 'HogQLQuery', query: hogql } }),
    next: { revalidate },
  });

  const text = await res.text();
  if (!res.ok) {
    throw new PostHogQueryError(
      `PostHog query failed: ${res.status} ${res.statusText} — ${text.slice(0, 500)}`,
      res.status,
      text,
    );
  }

  const json = JSON.parse(text) as {
    columns?: string[];
    results?: unknown[][];
    hasMore?: boolean;
    is_cached?: boolean;
    error?: string | null;
  };

  if (json.error) {
    throw new PostHogQueryError(`PostHog query error: ${json.error}`);
  }

  return {
    columns: json.columns ?? [],
    results: (json.results ?? []) as unknown as T[],
    hasMore: json.hasMore ?? false,
    is_cached: json.is_cached ?? false,
  };
}

export function isPostHogConfigured(): boolean {
  return Boolean(POSTHOG_PROJECT_ID && POSTHOG_PERSONAL_API_KEY);
}
