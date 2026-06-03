/**
 * Prototype Lab — embed test page.
 * Mix of iframe-hosted static prototypes and inline React components.
 */

'use client';

import { useState, lazy, Suspense } from 'react';
import Link from 'next/link';
import { ExternalLink, AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react';
import { TrackedIframe } from '@/components/analytics/TrackedIframe';

const HeirloomDemo = lazy(() => import('@/components/heirloom/HeirloomDemo'));

type Status = 'good' | 'warn' | 'bad';
type Kind = 'iframe' | 'component';

interface Prototype {
  slug: string;
  title: string;
  era: string;
  kind: Kind;
  entries?: { label: string; href: string }[]; // iframe only
  expected: Status;
  note: string;
}

const PROTOTYPES: Prototype[] = [
  {
    slug: 'heirloom-recipe-capture',
    title: 'Heirloom · Recipe Capture (3-stage)',
    era: 'NOW',
    kind: 'component',
    expected: 'good',
    note: 'Inline React component. Pick a sample recipe (or upload from desktop) → AI extracts → fork-edit shows lineage (Mom 2015 → You 2025). Hits /api/heirloom/extract-recipe and /api/heirloom/detect-recipes (Anthropic Claude proxy). Replaces shopping-lab.',
  },
  {
    slug: 'pottery-gifts',
    title: 'Pottery Gifts',
    era: 'NOW',
    kind: 'iframe',
    entries: [{ label: 'index.html', href: '/prototypes/pottery-gifts/index.html' }],
    expected: 'good',
    note: 'Archived 2025 New Year\'s giveaway · 37 pieces, 31 claimed. Original tool fetched live data from a Google Sheet — now baked into items.json so it renders without env vars.',
  },
  {
    slug: 'rumi',
    title: 'Rumi',
    era: 'NOW',
    kind: 'iframe',
    entries: [
      { label: 'index.html', href: '/prototypes/rumi/index.html' },
      { label: 'channel.html', href: '/prototypes/rumi/channel.html' },
      { label: 'genre-channel-optimized.html', href: '/prototypes/rumi/genre-channel-optimized.html' },
      { label: 'multiplier-test.html', href: '/prototypes/rumi/multiplier-test.html' },
    ],
    expected: 'good',
    note: 'Anonymous viewing-fingerprint extension (Head of Design, 2024) — tracks watch history across services as AI training signal, programs a dynamic cross-service cable channel by genre, pays viewers in points for the contribution. Bottom-strip walkthrough auto-advances as you click through.',
  },
  {
    slug: 'zero-swipe',
    title: 'Zero · Swipe',
    era: 'NOW',
    kind: 'iframe',
    entries: [{ label: 'index.html', href: '/prototypes/zero-swipe/index.html' }],
    expected: 'good',
    note: 'CRA build. Asset paths fixed (were absolute-from-root, now scoped to /prototypes/zero-swipe/).',
  },
];

const STATUS_META: Record<Status, { label: string; color: string; Icon: typeof CheckCircle2 }> = {
  good: { label: 'Should embed cleanly', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', Icon: CheckCircle2 },
  warn: { label: 'Likely OK · verify', color: 'text-amber-700 bg-amber-50 border-amber-200', Icon: AlertTriangle },
  bad: { label: 'Will not embed', color: 'text-red-700 bg-red-50 border-red-200', Icon: AlertCircle },
};

export default function PrototypeLabPage() {
  return (
    <main className="min-h-screen bg-paper-base text-ink-body">
      <section className="px-4 sm:px-6 md:px-8 pt-10 md:pt-14 pb-8 border-b border-hairline">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-accent mb-8 transition-colors">
            ← Home
          </Link>
          <p className="text-[11px] md:text-xs font-mono text-ink-muted tracking-[0.3em] uppercase mb-3">
            INTERNAL · PROTOTYPE EMBED TEST
          </p>
          <h1 className="font-display text-display-sm text-ink mb-3 leading-[0.95]">Prototype Lab</h1>
          <p className="font-display italic text-lg md:text-xl text-ink-body leading-snug max-w-2xl">
            Visual + interactive smoke test for each prototype before we wire it into a case study.
          </p>
        </div>
      </section>

      {PROTOTYPES.map((p) => (
        <PrototypeBlock key={p.slug} proto={p} />
      ))}
    </main>
  );
}

function PrototypeBlock({ proto }: { proto: Prototype }) {
  const meta = STATUS_META[proto.expected];
  const Icon = meta.Icon;

  return (
    <section className="px-4 sm:px-6 md:px-8 py-10 md:py-14 border-t border-hairline">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-baseline gap-3 mb-2">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-accent">{proto.era}</span>
          <h2 className="font-display text-2xl md:text-3xl text-ink leading-tight">{proto.title}</h2>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted">{proto.kind}</span>
        </div>

        <div className={`inline-flex items-center gap-2 text-xs font-mono px-2.5 py-1 rounded-full border mb-4 ${meta.color}`}>
          <Icon className="w-3.5 h-3.5" />
          {meta.label}
        </div>

        <p className="text-sm text-ink-body max-w-3xl mb-4">{proto.note}</p>

        {proto.kind === 'iframe' ? <IframeEmbed proto={proto} /> : <ComponentEmbed slug={proto.slug} />}
      </div>
    </section>
  );
}

function IframeEmbed({ proto }: { proto: Prototype }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const entries = proto.entries ?? [];
  const active = entries[activeIndex];
  if (!active) return null;

  return (
    <>
      {entries.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {entries.map((e, i) => (
            <button
              key={e.href}
              onClick={() => setActiveIndex(i)}
              className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-colors ${
                i === activeIndex
                  ? 'bg-ink text-paper-base border-ink'
                  : 'bg-paper-base text-ink-body border-hairline hover:border-ink'
              }`}
            >
              {e.label}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 mb-3 text-xs font-mono text-ink-muted">
        <span>iframe → {active.href}</span>
        <a href={active.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent hover:text-ink">
          open standalone <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="rounded-md overflow-hidden border border-hairline bg-white" style={{ height: '720px' }}>
        <TrackedIframe
          key={active.href}
          prototype={`lab-${active.href.split('/')[2] ?? 'unknown'}`}
          src={active.href}
          title={active.label}
          className="w-full h-full"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock"
        />
      </div>
    </>
  );
}

function ComponentEmbed({ slug }: { slug: string }) {
  if (slug !== 'heirloom-recipe-capture') return null;
  return (
    <div className="rounded-md overflow-hidden border border-hairline bg-white">
      <Suspense fallback={<div className="p-12 text-center text-sm text-ink-muted font-mono">loading demo…</div>}>
        <HeirloomDemo />
      </Suspense>
    </div>
  );
}
