/**
 * Typed HogQL queries powering the /owner/engagement dashboard.
 * Each function runs one HogQL query and narrows the result rows to a
 * specific shape. Add new queries here so they're easy to audit.
 */

import 'server-only';
import { hogql } from './client';
import { BUCKET_CASE_HOGQL, type Bucket } from './buckets';

// ---------------- Headline tiles ----------------

export interface HeadlineCounts {
  pageviews_24h: number;
  pageviews_7d: number;
  pageviews_30d: number;
  visitors_7d: number;
  sessions_7d: number;
  pages_per_session_7d: number;
}

export async function fetchHeadlineCounts(): Promise<HeadlineCounts> {
  const q = `
    SELECT
      countIf(timestamp > now() - INTERVAL 1 DAY) AS pageviews_24h,
      countIf(timestamp > now() - INTERVAL 7 DAY) AS pageviews_7d,
      countIf(timestamp > now() - INTERVAL 30 DAY) AS pageviews_30d,
      uniqIf(person_id, timestamp > now() - INTERVAL 7 DAY) AS visitors_7d,
      uniqIf(properties.$session_id, timestamp > now() - INTERVAL 7 DAY) AS sessions_7d
    FROM events
    WHERE event = '$pageview' AND timestamp > now() - INTERVAL 30 DAY
  `;
  const { results } = await hogql<readonly [number, number, number, number, number]>(q);
  const row = results[0] ?? [0, 0, 0, 0, 0];
  const sessions = row[4] || 1;
  return {
    pageviews_24h: row[0],
    pageviews_7d: row[1],
    pageviews_30d: row[2],
    visitors_7d: row[3],
    sessions_7d: row[4],
    pages_per_session_7d: row[1] / sessions,
  };
}

// ---------------- Bounce rate ----------------

export interface BounceStats {
  sessions: number;
  single_page: number;
  bounce_rate: number;
}

export async function fetchBounceRate(days = 30): Promise<BounceStats> {
  const q = `
    SELECT
      count() AS sessions,
      countIf(pv = 1) AS single_page
    FROM (
      SELECT properties.$session_id AS sid, count() AS pv
      FROM events
      WHERE event = '$pageview'
        AND timestamp > now() - INTERVAL ${days} DAY
        AND properties.$session_id IS NOT NULL
      GROUP BY sid
    )
  `;
  const { results } = await hogql<readonly [number, number]>(q);
  const [sessions = 0, single = 0] = results[0] ?? [];
  return {
    sessions,
    single_page: single,
    bounce_rate: sessions ? single / sessions : 0,
  };
}

// ---------------- Top pages ----------------

export interface TopPage {
  path: string;
  views: number;
  visitors: number;
}

export async function fetchTopPages(days = 7, limit = 25): Promise<TopPage[]> {
  const q = `
    SELECT
      properties.$pathname AS path,
      count() AS views,
      uniq(person_id) AS visitors
    FROM events
    WHERE event = '$pageview'
      AND timestamp > now() - INTERVAL ${days} DAY
      AND properties.$pathname IS NOT NULL
    GROUP BY path
    ORDER BY views DESC
    LIMIT ${limit}
  `;
  const { results } = await hogql<readonly [string, number, number]>(q);
  return results.map(([path, views, visitors]) => ({ path, views, visitors }));
}

// ---------------- Bucket activity ----------------

export interface BucketRow {
  bucket: Bucket;
  sessions: number;
  pageviews: number;
  visitors: number;
}

export async function fetchBucketActivity(days = 30): Promise<BucketRow[]> {
  const q = `
    SELECT
      ${BUCKET_CASE_HOGQL} AS bucket,
      uniq(properties.$session_id) AS sessions,
      count() AS pageviews,
      uniq(person_id) AS visitors
    FROM events
    WHERE event = '$pageview'
      AND timestamp > now() - INTERVAL ${days} DAY
      AND properties.$pathname IS NOT NULL
    GROUP BY bucket
    ORDER BY sessions DESC
  `;
  const { results } = await hogql<readonly [Bucket, number, number, number]>(q);
  return results.map(([bucket, sessions, pageviews, visitors]) => ({ bucket, sessions, pageviews, visitors }));
}

// ---------------- Interest profiles ----------------
// "What combinations of buckets does each session touch?" — surfaces
// implicit visitor types (e.g. "leader + decks" = recruiter; "now + thinking"
// = solo-builder peer). Aggregated server-side after a per-session query.

export interface InterestProfile {
  profile: string;
  sessions: number;
}

export async function fetchInterestProfiles(days = 30, limit = 20): Promise<InterestProfile[]> {
  const q = `
    SELECT
      properties.$session_id AS session_id,
      ${BUCKET_CASE_HOGQL} AS bucket
    FROM events
    WHERE event = '$pageview'
      AND timestamp > now() - INTERVAL ${days} DAY
      AND properties.$session_id IS NOT NULL
      AND properties.$pathname IS NOT NULL
    GROUP BY session_id, bucket
  `;
  const { results } = await hogql<readonly [string, Bucket]>(q);

  const sessionBuckets = new Map<string, Set<Bucket>>();
  for (const [sid, bucket] of results) {
    if (!sessionBuckets.has(sid)) sessionBuckets.set(sid, new Set());
    sessionBuckets.get(sid)!.add(bucket);
  }

  const profileCounts = new Map<string, number>();
  for (const buckets of sessionBuckets.values()) {
    const meaningful = Array.from(buckets)
      .filter((b) => b !== 'home' && b !== 'other' && b !== 'lab')
      .sort();
    const profile = meaningful.length === 0 ? 'home only' : meaningful.join(' + ');
    profileCounts.set(profile, (profileCounts.get(profile) ?? 0) + 1);
  }

  return Array.from(profileCounts.entries())
    .map(([profile, sessions]) => ({ profile, sessions }))
    .sort((a, b) => b.sessions - a.sessions)
    .slice(0, limit);
}

// ---------------- Recent activity ----------------

export interface RecentEvent {
  timestamp: string;
  path: string;
  country: string | null;
  device: string | null;
  referrer: string | null;
}

export async function fetchRecentEvents(limit = 50): Promise<RecentEvent[]> {
  const q = `
    SELECT
      timestamp,
      properties.$pathname AS path,
      properties.$geoip_country_code AS country,
      properties.$device_type AS device,
      properties.$referrer AS referrer
    FROM events
    WHERE event = '$pageview'
      AND timestamp > now() - INTERVAL 7 DAY
    ORDER BY timestamp DESC
    LIMIT ${limit}
  `;
  const { results } = await hogql<readonly [string, string, string | null, string | null, string | null]>(q, 60);
  return results.map(([timestamp, path, country, device, referrer]) => ({
    timestamp, path, country, device, referrer,
  }));
}

// ---------------- Geo + device + referrers ----------------

export interface SimpleCountRow {
  label: string;
  count: number;
}

export async function fetchTopCountries(days = 30, limit = 10): Promise<SimpleCountRow[]> {
  const q = `
    SELECT
      coalesce(properties.$geoip_country_code, '??') AS country,
      uniq(person_id) AS visitors
    FROM events
    WHERE event = '$pageview' AND timestamp > now() - INTERVAL ${days} DAY
    GROUP BY country
    ORDER BY visitors DESC
    LIMIT ${limit}
  `;
  const { results } = await hogql<readonly [string, number]>(q);
  return results.map(([label, count]) => ({ label, count }));
}

export async function fetchTopDevices(days = 30): Promise<SimpleCountRow[]> {
  const q = `
    SELECT
      coalesce(properties.$device_type, 'unknown') AS device,
      uniq(person_id) AS visitors
    FROM events
    WHERE event = '$pageview' AND timestamp > now() - INTERVAL ${days} DAY
    GROUP BY device
    ORDER BY visitors DESC
  `;
  const { results } = await hogql<readonly [string, number]>(q);
  return results.map(([label, count]) => ({ label, count }));
}

export async function fetchTopReferrers(days = 30, limit = 15): Promise<SimpleCountRow[]> {
  const q = `
    SELECT
      coalesce(properties.$referring_domain, properties.$referrer, 'direct') AS source,
      count() AS hits
    FROM events
    WHERE event = '$pageview' AND timestamp > now() - INTERVAL ${days} DAY
    GROUP BY source
    ORDER BY hits DESC
    LIMIT ${limit}
  `;
  const { results } = await hogql<readonly [string, number]>(q);
  return results.map(([label, count]) => ({ label, count }));
}

// ---------------- Repeat visitors ----------------

export interface ReturnStats {
  total_persons: number;
  returning_persons: number;
  return_rate: number;
}

// ---------------- Vault unlock funnel ----------------

export interface VaultUnlockRow {
  scope: string;
  attempts: number;
  successes: number;
  failures: number;
}

export async function fetchVaultUnlockStats(days = 30): Promise<VaultUnlockRow[]> {
  const q = `
    SELECT
      properties.scope AS scope,
      countIf(event = 'vault_unlock_attempted') AS attempts,
      countIf(event = 'vault_unlock_succeeded') AS successes,
      countIf(event = 'vault_unlock_failed') AS failures
    FROM events
    WHERE event IN ('vault_unlock_attempted', 'vault_unlock_succeeded', 'vault_unlock_failed')
      AND timestamp > now() - INTERVAL ${days} DAY
      AND properties.scope IS NOT NULL
    GROUP BY scope
    ORDER BY attempts DESC
  `;
  const { results } = await hogql<readonly [string, number, number, number]>(q);
  return results.map(([scope, attempts, successes, failures]) => ({
    scope,
    attempts,
    successes,
    failures,
  }));
}

// ---------------- Prototype engagement ----------------

export interface PrototypeRow {
  prototype: string;
  loaded: number;
  engaged: number;
  clicks: number;
  visitors: number;
}

export async function fetchPrototypeEngagement(days = 30): Promise<PrototypeRow[]> {
  const q = `
    SELECT
      properties.prototype AS prototype,
      countIf(event = 'prototype_loaded') AS loaded,
      countIf(event = 'prototype_engaged') AS engaged,
      countIf(event = 'prototype_clicked') AS clicks,
      uniq(person_id) AS visitors
    FROM events
    WHERE event IN ('prototype_loaded', 'prototype_engaged', 'prototype_clicked')
      AND timestamp > now() - INTERVAL ${days} DAY
      AND properties.prototype IS NOT NULL
    GROUP BY prototype
    ORDER BY engaged DESC
  `;
  const { results } = await hogql<readonly [string, number, number, number, number]>(q);
  return results.map(([prototype, loaded, engaged, clicks, visitors]) => ({
    prototype,
    loaded,
    engaged,
    clicks,
    visitors,
  }));
}

// ---------------- Outbound clicks ----------------

export interface OutboundRow {
  kind: 'mailto' | 'tel' | 'external';
  destination: string;
  clicks: number;
  visitors: number;
}

export async function fetchOutboundClicks(days = 30, limit = 20): Promise<OutboundRow[]> {
  const q = `
    SELECT
      properties.kind AS kind,
      properties.destination AS destination,
      count() AS clicks,
      uniq(person_id) AS visitors
    FROM events
    WHERE event = 'outbound_click'
      AND timestamp > now() - INTERVAL ${days} DAY
      AND properties.destination IS NOT NULL
    GROUP BY kind, destination
    ORDER BY clicks DESC
    LIMIT ${limit}
  `;
  const { results } = await hogql<readonly ['mailto' | 'tel' | 'external', string, number, number]>(q);
  return results.map(([kind, destination, clicks, visitors]) => ({ kind, destination, clicks, visitors }));
}

// ---------------- Real-interest 4-stage funnel ----------------

/**
 * Builds a session-level funnel:
 *   1. Sessions     — anyone landed (1+ pageview)
 *   2. Engaged      — 2+ pageviews OR fired prototype_engaged OR scroll_depth >= 0.5
 *   3. Considered   — visited at least one case-study page (now/leader/director/decks)
 *   4. Converted    — fired outbound_click (mailto) OR vault_unlock_attempted
 *
 * Each row carries the session count + conversion rate to the next stage.
 */

export interface FunnelStage {
  stage: 'sessions' | 'engaged' | 'considered' | 'converted';
  label: string;
  sessions: number;
  conversion_to_next: number | null;
}

export async function fetchRealInterestFunnel(days = 30): Promise<FunnelStage[]> {
  // One pass over events; aggregate per-session flags then count rollups.
  const q = `
    WITH per_session AS (
      SELECT
        properties.$session_id AS sid,
        count() AS event_count,
        countIf(event = '$pageview') AS pageviews,
        countIf(event = 'prototype_engaged') AS prototype_engaged,
        countIf(event = 'scroll_depth' AND toFloat(properties.depth) >= 0.5) AS deep_scroll,
        countIf(event = '$pageview' AND match(properties.$pathname, '^/work/(heirloom|silly-questions|zero|vault|nimbus|spark-ar|orion|fair-embodied-ai|framestore|viacom|studio-era)(/.*)?$')) AS case_study_views,
        countIf(event = '$pageview' AND match(properties.$pathname, '^/work/decks(/.*)?$')) AS deck_views,
        countIf(event = 'outbound_click' AND properties.kind = 'mailto') AS mailto_clicks,
        countIf(event = 'vault_unlock_attempted') AS vault_attempts
      FROM events
      WHERE timestamp > now() - INTERVAL ${days} DAY
        AND properties.$session_id IS NOT NULL
      GROUP BY sid
    )
    SELECT
      count() AS sessions,
      countIf(pageviews >= 2 OR prototype_engaged > 0 OR deep_scroll > 0) AS engaged,
      countIf(case_study_views > 0 OR deck_views > 0) AS considered,
      countIf(mailto_clicks > 0 OR vault_attempts > 0) AS converted
    FROM per_session
    WHERE pageviews > 0
  `;
  const { results } = await hogql<readonly [number, number, number, number]>(q);
  const [sessions = 0, engaged = 0, considered = 0, converted = 0] = results[0] ?? [];

  const rate = (a: number, b: number) => (b ? a / b : null);

  return [
    { stage: 'sessions',   label: 'Sessions',   sessions, conversion_to_next: rate(engaged, sessions) },
    { stage: 'engaged',    label: 'Engaged',    sessions: engaged,    conversion_to_next: rate(considered, engaged) },
    { stage: 'considered', label: 'Considered', sessions: considered, conversion_to_next: rate(converted, considered) },
    { stage: 'converted',  label: 'Converted',  sessions: converted,  conversion_to_next: null },
  ];
}

// ---------------- Return visitors ----------------

export async function fetchReturnStats(days = 30): Promise<ReturnStats> {
  const q = `
    WITH person_sessions AS (
      SELECT person_id, uniq(properties.$session_id) AS sessions
      FROM events
      WHERE event = '$pageview' AND timestamp > now() - INTERVAL ${days} DAY
      GROUP BY person_id
    )
    SELECT
      count() AS total_persons,
      countIf(sessions > 1) AS returning_persons
    FROM person_sessions
  `;
  const { results } = await hogql<readonly [number, number]>(q);
  const [total = 0, returning = 0] = results[0] ?? [];
  return {
    total_persons: total,
    returning_persons: returning,
    return_rate: total ? returning / total : 0,
  };
}
