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
import { DeviationRender } from './DeviationRender';
import { MarkBakeoff } from './MarkBakeoff';
import { ChapterRail } from './ChapterRail';
import { Disclosure } from './Disclosure';
import { LineProvider } from '@/lib/blank/lineState';

/** Sticky site header is 65px; 81px clears it with breathing room. */
const SCROLL_MARGIN = 81;

function Standing({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3
        className="text-[11px] font-mono uppercase tracking-[0.2em] pb-2 mb-3 border-b"
        style={{ color: 'var(--era-ink)', borderColor: 'var(--era-hairline)' }}
      >
        {title}
      </h3>
      <ul className="space-y-2.5 text-[13px]" style={{ color: 'var(--era-ink-body)' }}>
        {children}
      </ul>
    </div>
  );
}

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

        {/* Where you are, and what the two of you have settled. Sticky, so the
            state travels with the reader instead of living only in chapter 05. */}
        <ChapterRail />

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
          title="Which direction"
          note="Six aesthetics, judged on the rack rather than on one tee. This is the first real choice — it decides what the mark has to look like. Quiet flex is the control."
        >
          <BrandBakeoff />
        </Chapter>

        <Chapter
          n="03"
          title="Which mark"
          note="Six candidate marks as artwork, so the mark is the only variable — then twelve print languages showing how a mark can be applied. Which of either you can have is decided by the budget in 01, and not simply more of them as you spend more."
        >
          <MarkBakeoff />
          <div className="mt-10 pt-8 border-t" style={{ borderColor: 'var(--era-hairline)' }}>
            <h3 className="font-display text-lg mb-1" style={{ color: 'var(--era-ink)' }}>
              And how a mark can be printed
            </h3>
            <p className="text-[13px] mb-4" style={{ color: 'var(--era-ink-muted)' }}>
              Twelve print languages on one garment — the vocabulary any of the six above gets
              executed in.
            </p>
            <GraphicsLibrary />
          </div>
          <Disclosure
            summary="None of these? Bring your own reference"
            hint="upload → costed, and matched to the nearest thing we can make"
          >
            <ReferenceUpload />
          </Disclosure>
        </Chapter>

        <Chapter
          n="04"
          title="How the mark expands"
          note="One mark is not a brand. Move it across placements, scales and finishes to see the family — and what each application costs to execute at this budget."
        >
          <DeviationRender />
        </Chapter>

        <Chapter
          n="05"
          title="Your line"
          note="What you actually want made. Setup fees are charged once across the collection, not once per SKU — so the line costs less than the sum of its garments."
        >
          <LineTray />
        </Chapter>

        {/* Full-bleed break — the decisions are made; what follows is evidence */}
        <div className="relative w-full h-[38vh] min-h-[240px] overflow-hidden">
          <Image
            src="/blank/E1-lookbook-seoul.webp"
            alt="Lookbook — Seongsu-dong, Seoul"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <Chapter
          n="06"
          title="Everything the pipeline made"
          note="Provenance, not a decision — collapsed so it stops competing with the choices above."
        >
          <Disclosure
            summary="Twenty-two plates across five phases"
            hint="the style matrix and mark library are used in 01 and 03"
          >
            <PlateGallery />
          </Disclosure>
        </Chapter>

        <section
          id="ch-07"
          className="px-4 sm:px-6 md:px-8 py-10 border-t snap-start"
          style={{ borderColor: 'var(--era-hairline)', scrollMarginTop: SCROLL_MARGIN }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-[11px] font-mono tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
                07
              </span>
              <h2 className="font-display" style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)', color: 'var(--era-ink)' }}>
                Where this stands
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Standing title="Settled">
                <li>
                  Quiet costs more to make than loud. The mechanism is fixed costs and minimums,
                  not taste — strip them out and ink is what&rsquo;s left.
                </li>
                <li>
                  Stage 0 is decorated blanks. A cut-and-sew hero needs 86 pre-orders, or 72 if the
                  coat and trousers share one cloth.
                </li>
                <li>
                  The pipeline renders garment <em>categories</em>, not garment specs. Tech packs
                  stay text and vector.
                </li>
              </Standing>

              <Standing title="Open">
                <li>
                  Which brand direction. Six are still live in 04 and none has been chosen.
                </li>
                <li>
                  Retail price. It&rsquo;s the largest single margin lever in the model at 35.9
                  points, and the tray still uses tier defaults.
                </li>
                <li>Nothing is named. &ldquo;Blank&rdquo; is a working title.</li>
                <li>No inventory ordered, no tech pack, no supplier contacted.</li>
              </Standing>

              <Standing title="Unverified">
                <li>
                  37 of 44 load-bearing figures are single-source or derived. The confidence marks
                  sit on the numbers themselves, not in a footnote.
                </li>
                <li>
                  The relabel line may be underbudgeted 3&ndash;5&times; (SR&nbsp;T15). It is exposed
                  as a toggle rather than buried.
                </li>
                <li>Every image here is generated. None is a photograph of product that exists.</li>
              </Standing>
            </div>
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
