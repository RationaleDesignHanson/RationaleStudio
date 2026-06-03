'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ProjectScope } from '@/components/case-study/ProjectScope';
import { ChapterRow } from '@/components/case-study/ChapterRow';
import { ArrowLeft, Lock, ArrowRight, ChevronDown } from 'lucide-react';
import { listVaultEssays } from '@/lib/content/vault-writing';

interface VaultItem {
  slug: string;
  status: 'live' | 'dead' | 'paused';
  title: string;
  subtitle: string;
  blurb: string;
  /** Optional primary case-study / overview link */
  href?: string;
  /** Optional deck link, surfaced as a second CTA on the card */
  deckHref?: string;
  /** Override the primary CTA label (default: "Open") */
  primaryLabel?: string;
}

const ITEMS: VaultItem[] = [
  {
    slug: 'athletes-first',
    status: 'live',
    title: 'Athletes First',
    subtitle: 'NIL platform strategy · 2024',
    blurb: 'AI platform to scale personal attention across 50+ college athletes. NIL workflow, agent tooling, and the pitch-deck case for an Amplify-style product. Confidential.',
    href: '/work/athletes-first',
  },
  {
    slug: 'fubo',
    status: 'live',
    title: 'Fubo',
    subtitle: 'VP of Design · 2025 — 2026',
    blurb: 'Streaming entertainment platform. Leading design across product, brand, and the in-flight transformation of the live-TV experience. Confidential.',
    href: '/work/fubo',
  },
  {
    slug: 'rumi',
    status: 'live',
    title: 'Rumi',
    subtitle: 'Head of Design · 2024',
    blurb: 'Design engine for an AI media companion startup. Stealth-stage product, brand, and creative-engineering scaffolding. Confidential.',
    href: '/work/rumi',
  },
  {
    slug: 'nimbus',
    status: 'live',
    title: 'Nimbus',
    subtitle: 'Sanitary-waste system · venture in flight',
    blurb: 'A reimagined household waste system that separates organic, sanitary, and recyclable streams at the bin instead of at the curb. Hardware + software, currently in concept-prototype.',
    href: '/work/nimbus',
    primaryLabel: 'Case study',
    deckHref: '/work/nimbus/deck',
  },
  {
    slug: 'world-ar-avatars-deck',
    status: 'live',
    title: 'World AR Avatars · the deck',
    subtitle: '26-page strategic deck · Q2 2021',
    blurb: 'The internal FRL Design + UXR deck that became the world-locked interactive avatars patent. Mission, hypotheses, validation plan, MVP launch in Cambodia, in-progress feature set.',
    href: '/work/decks/world-ar-avatars',
  },
  {
    slug: 'portfolio-flash-2024-deck',
    status: 'live',
    title: 'Portfolio Flash · October 2024',
    subtitle: '104-page comprehensive recent deck',
    blurb: 'FAIR Embodied AI, Spark AR, AR Commerce, AR Ads — the full Meta-era story, most recent.',
    href: '/work/decks/portfolio-flash-2024',
  },
  {
    slug: 'disney-work-samples-2022',
    status: 'live',
    title: 'Disney Work Samples · September 2022',
    subtitle: '19-page internal review',
    blurb: 'Location-based AR collaboration with Disney — character placement, theme-park context, licensed-IP try-ons. The applied side of the World AR on Mobile pattern.',
    href: '/work/decks/disney-work-samples-2022',
  },
  {
    slug: 'meta-talks',
    status: 'live',
    title: 'Talks from Meta',
    subtitle: 'F8 2019 · Berlin VirtualWorlds · AR Fundamentals',
    blurb: 'Public: F8 2019 flagship Spark AR Outlook plus two team-supported sessions (Shopping, Places and Spaces) — embedded in the Spark AR case study. Internal: Berlin VirtualWorlds, AR Fundamentals, CLA113 — source decks not currently republished.',
    href: '/work/spark-ar',
  },
  {
    slug: 'portfolio-2022-deck',
    status: 'live',
    title: 'Portfolio · Spring 2022',
    subtitle: '29-page Spark-AR-era deck',
    blurb: 'Spark on Wearables, AR Commerce strategy, Camera AR Platform case study, Hanson Scope diagram.',
    href: '/work/decks/portfolio-2022',
  },
];

const STATUS_META: Record<VaultItem['status'], { label: string; color: string }> = {
  live: { label: 'IN FLIGHT', color: 'var(--project-fair)' },
  dead: { label: 'DEAD', color: 'var(--era-ink-muted)' },
  paused: { label: 'PAUSED', color: 'var(--project-fubo)' },
};

export function VaultContent() {
  const [writingOpen, setWritingOpen] = useState(false);
  const essays = listVaultEssays();
  return (
    <ProjectScope project="vault">
      <main
        className="era-now min-h-screen"
        style={{ backgroundColor: 'var(--era-bg)', color: 'var(--era-ink-body)' }}
      >
        {/* HERO */}
        <section className="px-4 sm:px-6 md:px-8 pt-6 md:pt-8 pb-5 md:pb-7 border-b-2" style={{ borderColor: 'var(--accent)' }}>
          <div className="max-w-5xl mx-auto">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-[var(--era-ink-muted)] hover:text-[var(--accent)] mb-5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to work
            </Link>

            <div className="grid md:grid-cols-12 md:gap-6 lg:gap-8 items-start">
              <div className="md:col-span-2 flex md:block items-baseline gap-3 md:gap-0 mb-3 md:mb-0 hero-stack">
                <div className="flex items-stretch gap-3">
                  <span className="block w-[3px] self-stretch min-h-[3.5rem] md:min-h-[5rem]" style={{ backgroundColor: 'var(--accent)' }} aria-hidden />
                  <div className="flex flex-col leading-none">
                    <span className="font-mono text-4xl md:text-5xl tracking-tight" style={{ color: 'var(--accent)' }}>✱</span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[var(--era-ink-muted)] mt-2 inline-flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Confidential
                    </span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase mt-0.5" style={{ color: 'var(--accent)' }}>
                      Concepts
                    </span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-10 max-w-3xl">
                <h1 className="font-display text-display text-[var(--era-ink)] mb-2 leading-[0.92]">
                  Vault
                </h1>
                <p className="font-display italic text-base md:text-lg text-[var(--era-ink-body)] leading-snug max-w-2xl">
                  Dead pitches and live ideas. Concepts that didn&rsquo;t ship, ventures in flight, side bets worth keeping warm.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WRITING */}
        {essays.length > 0 && (
          <>
            <ChapterRow index="01" kicker="WRITING" title="In vetting">
              <p>
                Essays staged for Substack, kept here while I vet them with partners. First-person, principle-first. Not yet public.
              </p>
              <button
                type="button"
                onClick={() => setWritingOpen((v) => !v)}
                aria-expanded={writingOpen}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider border border-[var(--era-hairline)] text-[var(--era-ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              >
                <ChevronDown
                  className="w-3.5 h-3.5 transition-transform"
                  style={{ transform: writingOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}
                  aria-hidden
                />
                {writingOpen ? 'Hide essays' : `Show essays (${essays.length})`}
              </button>
            </ChapterRow>
            {writingOpen &&
              essays.map((essay) => (
                <section
                  key={essay.slug}
                  className="px-4 sm:px-6 md:px-8 py-8 md:py-10 border-t"
                  style={{ borderColor: 'var(--era-hairline)' }}
                >
                  <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-12 md:gap-6 lg:gap-8 items-start">
                      <div className="md:col-span-2 flex items-baseline gap-3 md:gap-4 mb-3 md:mb-0">
                        <span className="block w-[3px] self-stretch min-h-[2.5rem]" style={{ backgroundColor: 'var(--accent)' }} aria-hidden />
                        <span className="font-mono text-base sm:text-lg md:text-xl tracking-wider leading-none" style={{ color: 'var(--accent)' }}>
                          ✱
                        </span>
                      </div>
                      <div className="md:col-span-10">
                        <p className="text-[11px] font-mono tracking-[0.25em] uppercase mb-2 text-[var(--era-ink-muted)]">
                          {essay.category} · {essay.readTime}
                        </p>
                        <h2 className="font-display text-2xl md:text-3xl leading-tight mb-1" style={{ color: 'var(--era-ink)' }}>
                          {essay.title}
                        </h2>
                        <p className="text-base md:text-lg leading-relaxed text-[var(--era-ink-body)] max-w-3xl mb-4">
                          {essay.subtitle}
                        </p>
                        <Link
                          href={`/work/vault/writing/${essay.slug}`}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider border border-[var(--era-hairline)] text-[var(--era-ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                        >
                          Read <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </section>
              ))}
          </>
        )}

        {/* INTRO */}
        <ChapterRow index="02" kicker="WHAT&rsquo;S HERE" title="The bench">
          <p>
            Not every bet ships. Some die at the validator stage; some wait for the right moment; some are running quietly in the background. This is where they live so they don&rsquo;t get forgotten and so collaborators can see the surface area of what I&rsquo;m thinking about beyond the headline projects.
          </p>
        </ChapterRow>

        {/* ITEMS */}
        {ITEMS.map((item, i) => {
          const meta = STATUS_META[item.status];
          return (
            <section
              key={item.slug}
              className="px-4 sm:px-6 md:px-8 py-8 md:py-10 border-t"
              style={{ borderColor: 'var(--era-hairline)' }}
            >
              <div className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-12 md:gap-6 lg:gap-8 items-start">
                  <div className="md:col-span-2 flex items-baseline gap-3 md:gap-4 mb-3 md:mb-0">
                    <span className="block w-[3px] self-stretch min-h-[2.5rem]" style={{ backgroundColor: 'var(--accent)' }} aria-hidden />
                    <span className="font-mono text-base sm:text-lg md:text-xl tracking-wider tabular-nums leading-none" style={{ color: 'var(--accent)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="md:col-span-10">
                    <p className="text-[11px] font-mono tracking-[0.25em] uppercase mb-2" style={{ color: meta.color }}>
                      {meta.label}
                    </p>
                    <h2 className="font-display text-2xl md:text-3xl leading-tight mb-1" style={{ color: 'var(--era-ink)' }}>
                      {item.title}
                    </h2>
                    <p className="font-mono text-xs md:text-sm tracking-wide mb-3 uppercase text-[var(--era-ink-muted)]">
                      {item.subtitle}
                    </p>
                    <p className="text-base md:text-lg leading-relaxed text-[var(--era-ink-body)] max-w-3xl">
                      {item.blurb}
                    </p>
                    {(item.href || item.deckHref) && (
                      <div className="flex flex-wrap items-center gap-2 mt-4">
                        {item.href && (
                          <Link
                            href={item.href}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider border border-[var(--era-hairline)] text-[var(--era-ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                          >
                            {item.primaryLabel ?? 'Open'} <span aria-hidden>→</span>
                          </Link>
                        )}
                        {item.deckHref && (
                          <Link
                            href={item.deckHref}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--era-bg)] transition-colors"
                          >
                            Deck <span aria-hidden>→</span>
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* FOOTER */}
        <section className="px-4 sm:px-6 md:px-8 py-10 md:py-14 border-t border-[var(--era-hairline)] bg-[var(--era-bg-deep)]/40">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase">
              Vault &middot; concepts &amp; pitches
            </p>
          </div>
        </section>
      </main>
    </ProjectScope>
  );
}
