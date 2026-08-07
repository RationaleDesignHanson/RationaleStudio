/**
 * BLANK — the tool is the page.
 *
 * Sequencing (analysis/10-horizontal-sequence.md): the page stays VERTICAL and
 * gets chaptered — y-proximity snap, scroll-margin for the sticky header,
 * numbered chapters, one full-bleed break. Exactly one section is horizontal:
 * the budget lever, where the five stops are a sequence with a direction.
 *
 * The masthead is deliberately short. At 1440x900 the fold previously read
 * "drag the budget" above a page whose slider sat at y~926 — the control has to
 * share the fold with the plate or the whole argument collapses to frame 1.
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { ProjectScope } from '@/components/case-study/ProjectScope';
import { ArrowRight } from 'lucide-react';
import { BudgetLever } from './BudgetLever';
import { GraphicsLibrary } from './GraphicsLibrary';
import { ReferenceUpload } from './ReferenceUpload';
import { BrandBakeoff } from './BrandBakeoff';
import { PlateGallery } from './PlateGallery';
import { ShareLine } from './ShareLine';
import { LineTray } from './LineTray';
import { LineProvider } from '@/lib/blank/lineState';

/** Sticky site header is 65px; 81px clears it with breathing room. */
const SCROLL_MARGIN = 81;

function Chapter({
  n,
  title,
  note,
  children,
}: {
  n: string;
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={`ch-${n}`}
      className="px-4 sm:px-6 md:px-8 py-12 border-t snap-start"
      style={{ borderColor: 'var(--era-hairline)', scrollMarginTop: SCROLL_MARGIN }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline gap-3 mb-1">
          <span className="text-[11px] font-mono tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
            {n}
          </span>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)', color: 'var(--era-ink)' }}>
            {title}
          </h2>
        </div>
        <p className="text-[13px] mb-6" style={{ color: 'var(--era-ink-muted)' }}>
          {note}
        </p>
        {children}
      </div>
    </section>
  );
}

export function BlankContent() {
  // Scroll-snap has to live on the scrolling element, so it's applied to <html>
  // for the lifetime of this route only. PROXIMITY, not mandatory — chapters run
  // past a viewport and mandatory y-snap can strand content mid-section.
  // Skipped entirely under prefers-reduced-motion.
  useEffect(() => {
    const el = document.documentElement;
    const prev = el.style.scrollSnapType;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mq.matches) el.style.scrollSnapType = 'y proximity';
    return () => {
      el.style.scrollSnapType = prev;
    };
  }, []);

  return (
    <ProjectScope project="blank">
      <LineProvider>
      <main
        className="era-now min-h-screen"
        style={{ backgroundColor: 'var(--era-bg)', color: 'var(--era-ink-body)' }}
      >
        {/* Masthead — compressed so the slider shares the fold */}
        <header
          className="px-4 sm:px-6 md:px-8 pt-4 pb-2.5 snap-start"
          style={{ scrollMarginTop: SCROLL_MARGIN }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Utility row — the send action pairs with the way back out. Sharing
                a row with the title keeps the lever inside a 720px-tall fold. */}
            <div className="flex items-center justify-between gap-4 mb-1">
              <Link
                href="/work/vault"
                className="shrink-0 text-[11px] font-mono uppercase tracking-[0.2em] transition-colors hover:text-[var(--accent)]"
                style={{ color: 'var(--era-ink-muted)' }}
              >
                ← Vault
              </Link>
              <ShareLine />
            </div>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-0.5">
              <h1
                className="font-display leading-none"
                style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', color: 'var(--era-ink)' }}
              >
                Blank
              </h1>
              <p className="text-sm md:text-base" style={{ color: 'var(--era-ink-body)' }}>
                Quiet is expensive to make. Loud is cheap.{' '}
                <span style={{ color: 'var(--era-ink-muted)' }}>
                  Drag the budget — the brand moves from a printed graphic to a stitched mark.
                </span>
              </p>
            </div>
          </div>
        </header>

        {/* 01 — the only horizontal section on the page */}
        <section
          id="ch-01"
          className="px-4 sm:px-6 md:px-8 pb-10"
        >
          <div className="max-w-[1500px] mx-auto">
            <BudgetLever />
          </div>
        </section>

        <Chapter
          n="02"
          title="Your line"
          note="Add what you want made. Setup fees are charged once across the collection, not once per SKU — so the line costs less than the sum of its garments."
        >
          <LineTray />
        </Chapter>

        <Chapter
          n="03"
          title="What kind of graphic"
          note="Twelve print languages on one garment — eight producible in a 50–150 unit run, four that leave the decorated-blanks path. Then bring your own."
        >
          <GraphicsLibrary />
          <div className="mt-10 pt-8 border-t" style={{ borderColor: 'var(--era-hairline)' }}>
            <h3 className="font-display text-lg mb-1" style={{ color: 'var(--era-ink)' }}>
              Bring your own reference
            </h3>
            <p className="text-[13px] mb-4" style={{ color: 'var(--era-ink-muted)' }}>
              The same question in the other direction — upload something and get its cost, whether
              we can make it, and the nearest option we can execute.
            </p>
            <ReferenceUpload />
          </div>
        </Chapter>

        {/* Full-bleed break — one visual beat between the making and the brand */}
        <div className="relative w-full h-[38vh] min-h-[240px] overflow-hidden">
          <Image
            src="/blank/E1-lookbook-seoul.webp"
            alt="Lookbook — Seongsu-dong, Seoul"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <Chapter n="04" title="Which brand" note="Six directions, judged on the rack. Quiet flex is the control.">
          <BrandBakeoff />
        </Chapter>

        <Chapter
          n="05"
          title="Everything the pipeline made"
          note="Twenty-two plates across five phases. The style matrix and graphics library are above."
        >
          <PlateGallery />
        </Chapter>

        <section className="px-4 sm:px-6 md:px-8 py-8 border-t" style={{ borderColor: 'var(--era-hairline)' }}>
          <div className="max-w-6xl mx-auto">
            <p className="text-sm max-w-3xl" style={{ color: 'var(--era-ink-body)' }}>
              Every quiet signifier is gated behind a fixed cost &mdash; a $70 digitizing fee, a
              200-piece woven-tag minimum, a blank that costs 4&times; the budget one. Strip those
              and ink is all that&rsquo;s left.{' '}
              <span style={{ color: 'var(--era-ink-muted)' }}>
                No inventory ordered, no tech pack, no name. Next is a $150 test: 100 woven labels,
                numbered by hand. 37 of 44 figures here are unverified.
              </span>
            </p>
          </div>
        </section>

        <footer className="px-4 sm:px-6 md:px-8 py-8 border-t" style={{ borderColor: 'var(--era-hairline)' }}>
          <div className="max-w-6xl mx-auto flex items-baseline justify-between gap-3">
            <p className="text-[11px] font-mono tracking-[0.2em] uppercase" style={{ color: 'var(--era-ink-muted)' }}>
              ✱ · Vault · Working name
            </p>
            <Link
              href="/work/vault"
              className="inline-flex items-center gap-2 font-display italic text-lg transition-colors"
              style={{ color: 'var(--accent)' }}
            >
              Back to the Vault <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </footer>
      </main>
      </LineProvider>
    </ProjectScope>
  );
}
