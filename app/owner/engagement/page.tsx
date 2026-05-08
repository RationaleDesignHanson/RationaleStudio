/**
 * /owner/engagement — internal analytics dashboard.
 *
 * Server-renders the current state of PostHog data via HogQL. Cached for
 * 5 minutes per query (see lib/posthog/queries.ts) so a refresh hits
 * cache. Never imports a client component — keeps the personal API key
 * strictly server-side.
 *
 * Auth: gated by middleware.ts /owner Firebase RBAC. Layout chrome comes
 * from app/owner/layout.tsx.
 */

import { Suspense } from 'react';
import {
  fetchHeadlineCounts,
  fetchTopPages,
  fetchBucketActivity,
  fetchInterestProfiles,
  fetchRecentEvents,
  fetchTopCountries,
  fetchTopDevices,
  fetchTopReferrers,
  fetchReturnStats,
  fetchVaultUnlockStats,
  fetchOutboundClicks,
} from '@/lib/posthog/queries';
import { isPostHogConfigured } from '@/lib/posthog/client';
import { BUCKET_DEFS, type Bucket } from '@/lib/posthog/buckets';

export const dynamic = 'force-dynamic';
export const revalidate = 300;

const NUM = new Intl.NumberFormat('en-US');
const PCT = new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 0 });
const DEC = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 });

function fmtRelative(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  if (ms < 60_000) return `${Math.floor(ms / 1000)}s ago`;
  if (ms < 3_600_000) return `${Math.floor(ms / 60_000)}m ago`;
  if (ms < 86_400_000) return `${Math.floor(ms / 3_600_000)}h ago`;
  return `${Math.floor(ms / 86_400_000)}d ago`;
}

export default async function EngagementPage() {
  if (!isPostHogConfigured()) {
    return <NotConfigured />;
  }

  // Run every query in parallel — slowest one drives TTFB.
  const [
    headline,
    topPages7d,
    topPages30d,
    buckets,
    profiles,
    recent,
    countries,
    devices,
    referrers,
    returns,
    vaultUnlocks,
    outbound,
  ] = await Promise.all([
    fetchHeadlineCounts().catch(() => null),
    fetchTopPages(7, 20).catch(() => []),
    fetchTopPages(30, 30).catch(() => []),
    fetchBucketActivity(30).catch(() => []),
    fetchInterestProfiles(30, 25).catch(() => []),
    fetchRecentEvents(50).catch(() => []),
    fetchTopCountries(30, 12).catch(() => []),
    fetchTopDevices(30).catch(() => []),
    fetchTopReferrers(30, 15).catch(() => []),
    fetchReturnStats(30).catch(() => null),
    fetchVaultUnlockStats(30).catch(() => []),
    fetchOutboundClicks(30, 25).catch(() => []),
  ]);

  const bucketByKey = new Map(buckets.map((b) => [b.bucket, b]));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-10">
        <p className="text-xs font-mono tracking-[0.3em] uppercase text-terminal-gold mb-2">
          Engagement · rationale.work
        </p>
        <h2 className="text-3xl font-bold text-white mb-1">Who&rsquo;s here, what they&rsquo;re looking at</h2>
        <p className="text-sm text-gray-400">
          Cached 5 min per query. Buckets edit at <code className="text-gray-300">lib/posthog/buckets.ts</code>.
          Reach for PostHog directly (<a className="underline hover:text-terminal-gold" href="https://us.posthog.com" target="_blank" rel="noopener">us.posthog.com</a>) for replays, funnels, cohorts.
        </p>
      </header>

      {/* HEADLINE TILES */}
      {headline ? (
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          <Tile label="Pageviews · 24h" value={NUM.format(headline.pageviews_24h)} />
          <Tile label="Pageviews · 7d"  value={NUM.format(headline.pageviews_7d)} />
          <Tile label="Pageviews · 30d" value={NUM.format(headline.pageviews_30d)} />
          <Tile label="Visitors · 7d"   value={NUM.format(headline.visitors_7d)} />
          <Tile label="Sessions · 7d"   value={NUM.format(headline.sessions_7d)} />
          <Tile label="Pages / session" value={DEC.format(headline.pages_per_session_7d)} />
        </section>
      ) : (
        <ErrorTile label="Headline counts unavailable — check POSTHOG_PERSONAL_API_KEY scope." />
      )}

      {/* BUCKETS */}
      <Section title="Buckets of interest · 30d" subtitle="What surfaces visitors are exploring. Sessions counted once per bucket touched.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {BUCKET_DEFS.map((def) => {
            const row = bucketByKey.get(def.bucket);
            return (
              <BucketCard
                key={def.bucket}
                label={def.label}
                description={def.description}
                accent={def.accentVar}
                sessions={row?.sessions ?? 0}
                pageviews={row?.pageviews ?? 0}
                visitors={row?.visitors ?? 0}
              />
            );
          })}
        </div>
      </Section>

      {/* INTEREST PROFILES */}
      <Section
        title="Interest profiles · 30d"
        subtitle="Distinct combinations of buckets visitors touched. Reads as implicit personas — recruiter, peer, lead — without any tagging."
      >
        {profiles.length === 0 ? (
          <Empty hint="No multi-bucket sessions yet — accrue traffic." />
        ) : (
          <SimpleTable headers={['Profile', 'Sessions']} rows={profiles.map((p) => [p.profile, NUM.format(p.sessions)])} />
        )}
      </Section>

      {/* TOP PAGES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <Section title="Top pages · 7d" inline>
          {topPages7d.length === 0 ? <Empty /> : (
            <SimpleTable
              headers={['Path', 'Views', 'Visitors']}
              rows={topPages7d.map((p) => [p.path, NUM.format(p.views), NUM.format(p.visitors)])}
            />
          )}
        </Section>
        <Section title="Top pages · 30d" inline>
          {topPages30d.length === 0 ? <Empty /> : (
            <SimpleTable
              headers={['Path', 'Views', 'Visitors']}
              rows={topPages30d.map((p) => [p.path, NUM.format(p.views), NUM.format(p.visitors)])}
            />
          )}
        </Section>
      </div>

      {/* RETURN VISITORS / GEO / DEVICE / REFERRERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Section title="Return rate · 30d" inline>
          {returns ? (
            <div className="space-y-3">
              <Tile label="Total persons" value={NUM.format(returns.total_persons)} dense />
              <Tile label="Returning" value={NUM.format(returns.returning_persons)} dense />
              <Tile label="Return rate" value={PCT.format(returns.return_rate)} dense />
            </div>
          ) : <Empty />}
        </Section>
        <Section title="Top countries · 30d" inline>
          {countries.length === 0 ? <Empty /> : (
            <SimpleTable headers={['Country', 'Visitors']} rows={countries.map((c) => [c.label, NUM.format(c.count)])} />
          )}
        </Section>
        <Section title="Devices · 30d" inline>
          {devices.length === 0 ? <Empty /> : (
            <SimpleTable headers={['Device', 'Visitors']} rows={devices.map((d) => [d.label, NUM.format(d.count)])} />
          )}
        </Section>
        <Section title="Referrers · 30d" inline>
          {referrers.length === 0 ? <Empty /> : (
            <SimpleTable headers={['Source', 'Hits']} rows={referrers.map((r) => [r.label, NUM.format(r.count)])} />
          )}
        </Section>
      </div>

      {/* VAULT UNLOCKS + OUTBOUND */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <Section
          title="Vault unlock attempts · 30d"
          subtitle="Who's knocking, where, and how often they get in. Per-scope so you can spot demand for specific gated work."
          inline
        >
          {vaultUnlocks.length === 0 ? (
            <Empty hint="No unlock attempts yet — the form fires events from /work/{vault,rumi,fubo,nimbus}." />
          ) : (
            <SimpleTable
              headers={['Scope', 'Attempts', 'Successes', 'Failures']}
              rows={vaultUnlocks.map((v) => [
                v.scope,
                NUM.format(v.attempts),
                NUM.format(v.successes),
                NUM.format(v.failures),
              ])}
            />
          )}
        </Section>
        <Section
          title="Outbound clicks · 30d"
          subtitle="Mailtos, external links, App Store hits. Where attention exits to."
          inline
        >
          {outbound.length === 0 ? (
            <Empty hint="No outbound clicks yet." />
          ) : (
            <SimpleTable
              headers={['Kind', 'Destination', 'Clicks', 'People']}
              rows={outbound.map((o) => [
                o.kind,
                o.destination,
                NUM.format(o.clicks),
                NUM.format(o.visitors),
              ])}
            />
          )}
        </Section>
      </div>

      {/* RECENT ACTIVITY */}
      <Section
        title="Recent activity · last 7d"
        subtitle="Last 50 pageviews, freshest first. Use PostHog session replay for the full picture per visitor."
      >
        {recent.length === 0 ? <Empty hint="No pageviews yet — env keys may not be set in Netlify." /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="text-gray-500 text-left border-b border-gray-800">
                  <th className="py-2 pr-4 font-normal">When</th>
                  <th className="py-2 pr-4 font-normal">Path</th>
                  <th className="py-2 pr-4 font-normal">Country</th>
                  <th className="py-2 pr-4 font-normal">Device</th>
                  <th className="py-2 pr-4 font-normal">Referrer</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((e, i) => (
                  <tr key={i} className="border-b border-gray-900 text-gray-300 hover:bg-gray-900/40">
                    <td className="py-2 pr-4 text-gray-500">{fmtRelative(e.timestamp)}</td>
                    <td className="py-2 pr-4 text-white">{e.path}</td>
                    <td className="py-2 pr-4">{e.country ?? '??'}</td>
                    <td className="py-2 pr-4">{e.device ?? 'unknown'}</td>
                    <td className="py-2 pr-4 text-gray-400 truncate max-w-[18rem]" title={e.referrer ?? ''}>
                      {e.referrer ?? 'direct'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>

      <p className="mt-12 text-[10px] font-mono text-gray-600 tracking-widest">
        Data via PostHog HogQL. Cache 5 min. Edit queries at lib/posthog/queries.ts.
      </p>
    </div>
  );
}

// ============= helpers =============

function Section({
  title,
  subtitle,
  inline = false,
  children,
}: {
  title: string;
  subtitle?: string;
  inline?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={inline ? '' : 'mb-10'}>
      <header className="mb-3">
        <h3 className="text-sm font-semibold text-terminal-gold tracking-wide">{title}</h3>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </header>
      {children}
    </section>
  );
}

function Tile({ label, value, dense = false }: { label: string; value: string; dense?: boolean }) {
  return (
    <div className={`rounded border border-gray-800 bg-gray-900/40 ${dense ? 'px-3 py-2' : 'px-4 py-4'}`}>
      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">{label}</p>
      <p className={`font-mono text-white ${dense ? 'text-xl mt-0.5' : 'text-2xl md:text-3xl mt-1'}`}>{value}</p>
    </div>
  );
}

function ErrorTile({ label }: { label: string }) {
  return (
    <div className="rounded border border-red-900/60 bg-red-950/30 px-4 py-3 mb-10 text-sm text-red-200 font-mono">
      {label}
    </div>
  );
}

function BucketCard({
  label,
  description,
  accent,
  sessions,
  pageviews,
  visitors,
}: {
  label: string;
  description: string;
  accent: string;
  sessions: number;
  pageviews: number;
  visitors: number;
}) {
  return (
    <div className="rounded border border-gray-800 bg-gray-900/40 p-4 relative overflow-hidden">
      <span className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ backgroundColor: accent }} aria-hidden />
      <div className="pl-3">
        <h4 className="font-mono text-sm text-white tracking-wide">{label}</h4>
        <p className="text-[11px] text-gray-500 leading-snug mt-0.5 mb-3">{description}</p>
        <dl className="grid grid-cols-3 gap-2 text-center">
          <div>
            <dt className="text-[9px] font-mono uppercase tracking-[0.15em] text-gray-500">Sessions</dt>
            <dd className="font-mono text-lg text-white">{NUM.format(sessions)}</dd>
          </div>
          <div>
            <dt className="text-[9px] font-mono uppercase tracking-[0.15em] text-gray-500">Views</dt>
            <dd className="font-mono text-lg text-white">{NUM.format(pageviews)}</dd>
          </div>
          <div>
            <dt className="text-[9px] font-mono uppercase tracking-[0.15em] text-gray-500">People</dt>
            <dd className="font-mono text-lg text-white">{NUM.format(visitors)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function SimpleTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs font-mono">
        <thead>
          <tr className="text-gray-500 text-left border-b border-gray-800">
            {headers.map((h) => <th key={h} className="py-2 pr-4 font-normal">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-900 text-gray-300 hover:bg-gray-900/40">
              {row.map((cell, j) => (
                <td key={j} className={`py-2 pr-4 ${j === 0 ? 'text-white' : ''}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Empty({ hint }: { hint?: string } = {}) {
  return (
    <div className="border border-dashed border-gray-800 rounded p-4 text-xs font-mono text-gray-500">
      No data yet. {hint}
    </div>
  );
}

function NotConfigured() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h2 className="text-2xl text-white font-bold mb-3">Engagement dashboard</h2>
      <p className="text-gray-300 mb-6">
        Server-side PostHog credentials aren&rsquo;t configured. Set the following env vars to enable this page:
      </p>
      <pre className="rounded border border-gray-800 bg-gray-900 px-4 py-3 text-xs font-mono text-terminal-gold whitespace-pre-wrap">
{`POSTHOG_PERSONAL_API_KEY=phx_...
POSTHOG_PROJECT_ID=415605`}
      </pre>
      <p className="text-xs text-gray-500 mt-4 leading-relaxed">
        Add them in Netlify → Site configuration → Environment variables, then redeploy.
        These are server-only — never prefix with NEXT_PUBLIC_.
      </p>
    </div>
  );
}
