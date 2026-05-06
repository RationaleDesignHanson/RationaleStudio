/**
 * WorkViewer — parallax-merge scrollytelling with per-era treatment.
 *
 * Each era is a card with its own visual world: bg color, type
 * treatment, accent inks, and ASCII shader palette. Cards stack
 * absolute in the sticky stage and crossfade based on scroll
 * progress, so during transition zones both cards' backgrounds
 * are partially opaque (they literally blend — the "merge").
 *
 * Within each card, three layers move on independent timing:
 *   bg     — slow, atmospheric. Fades over the longest range.
 *   header — mid. Drifts at moderate rate, opacity tracks tighter.
 *   rows   — fast, foreground. Snaps in/out, biggest excursion.
 *
 * Section is N × 80vh of page scroll. Sticky inner pins for the
 * full duration; the page-scroll drives the choreography.
 */

'use client';

import { useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  cubicBezier,
  type MotionValue,
} from 'framer-motion';

// Smooth in/out easing for opacity + translate. Slower at the edges
// so the transition reads continuous, not mechanical.
const SMOOTH = cubicBezier(0.4, 0, 0.2, 1);

export type EraTheme = 'now' | 'meta' | 'maker';

export interface EraBlockData {
  theme: EraTheme;
  era: string;
  /** Short tab label, e.g. "NOW" / "LEADER" / "DIRECTOR". */
  label: string;
  years: string;
  tagline?: string;
  renderHeader: (theme: EraTheme, era: string, years: string, tagline?: string) => ReactNode;
  rows: ReactNode;
}

interface WorkViewerProps {
  blocks: EraBlockData[];
}

export function WorkViewer({ blocks }: WorkViewerProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const total = blocks.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={sectionRef}
      className="relative bg-paper"
      style={{ height: `${total * 160}vh` }}
    >
      {/* Sticky stage — pins below the page Header. Mobile chrome
          is two lines tall (wordmark + nav stacked), so the offset
          is bigger there. Desktop is one line side-by-side. */}
      <div className="sticky top-[4.5rem] md:top-16 h-[calc(100vh-4.5rem)] md:h-[calc(100vh-4rem)] overflow-hidden">
        {blocks.map((block, i) => (
          <EraCard
            key={block.theme}
            block={block}
            index={i}
            total={total}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}

interface EraCardProps {
  block: EraBlockData;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

function EraCard({ block, index, total, scrollYProgress }: EraCardProps) {
  // ── Lifecycle math ────────────────────────────────────────────
  // Each layer has its OWN fade window centered on the slot boundary.
  // Wider window = slower fade. This is what creates the choreography:
  //   bg     — wide window  (~30% of slot) → atmospheric merge
  //   header — medium       (~18% of slot)
  //   rows   — narrow       (~8% of slot)  → snappy handoff
  //
  // Translates (parallax) use the bg window so visible motion is
  // smooth across the full transition, not rushed inside a tiny zone.
  //
  // First card anchors at scroll start (no visible entry); last card
  // anchors at scroll end (no visible exit) — boundary cards are at
  // rest when the user arrives / leaves the section.
  const slot = 1 / total;
  // Transition windows are kept tight so each card has a real
  // "fully visible" dwell zone. With section height = 160vh per
  // card, the math works out to ~96vh of stable scroll between
  // boundaries — plenty of time to read each era before the
  // next one starts crossfading in.
  //   bg     40% of slot → atmospheric crossfade, half the slot
  //   header 32% of slot → mid-rate
  //   rows   20% of slot → snappy handoff
  const twBg = slot * 0.4;
  const twHeader = slot * 0.32;
  const twRows = slot * 0.2;
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const slotStart = index * slot;
  const slotEnd = (index + 1) * slot;

  // Outer range (bg-wide) — also used for translate keyframes.
  const outerStart = isFirst ? -slot : slotStart - twBg / 2;
  const outerEnd = isLast ? 1 + slot : slotEnd + twBg / 2;
  const bgEnterEnd = isFirst ? 0 : slotStart + twBg / 2;
  const bgExitStart = isLast ? 1 : slotEnd - twBg / 2;

  // ── Translates (parallax depth) ───────────────────────────────
  // Span the bg window. Ease-in-out so motion settles instead of
  // snapping linearly through the keyframes.
  const headerY = useTransform(
    scrollYProgress,
    [outerStart, bgEnterEnd, bgExitStart, outerEnd],
    ['24vh', '0vh', '0vh', '-24vh'],
    { ease: [SMOOTH, SMOOTH, SMOOTH] },
  );
  const rowsY = useTransform(
    scrollYProgress,
    [outerStart, bgEnterEnd, bgExitStart, outerEnd],
    ['48vh', '0vh', '0vh', '-48vh'],
    { ease: [SMOOTH, SMOOTH, SMOOTH] },
  );

  // ── Opacity per layer ─────────────────────────────────────────
  const bgOpacity = useTransform(
    scrollYProgress,
    [outerStart, bgEnterEnd, bgExitStart, outerEnd],
    [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0],
    { ease: [SMOOTH, SMOOTH, SMOOTH] },
  );

  const headerEnterStart = isFirst ? outerStart : slotStart - twHeader / 2;
  const headerEnterEnd = isFirst ? 0 : slotStart + twHeader / 2;
  const headerExitStart = isLast ? 1 : slotEnd - twHeader / 2;
  const headerExitEnd = isLast ? outerEnd : slotEnd + twHeader / 2;
  const headerOpacity = useTransform(
    scrollYProgress,
    [headerEnterStart, headerEnterEnd, headerExitStart, headerExitEnd],
    [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0],
    { ease: [SMOOTH, SMOOTH, SMOOTH] },
  );

  const rowsEnterStart = isFirst ? outerStart : slotStart - twRows / 2;
  const rowsEnterEnd = isFirst ? 0 : slotStart + twRows / 2;
  const rowsExitStart = isLast ? 1 : slotEnd - twRows / 2;
  const rowsExitEnd = isLast ? outerEnd : slotEnd + twRows / 2;
  const rowsOpacity = useTransform(
    scrollYProgress,
    [rowsEnterStart, rowsEnterEnd, rowsExitStart, rowsExitEnd],
    [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0],
    { ease: [SMOOTH, SMOOTH, SMOOTH] },
  );

  // ── Row-glint trigger ─────────────────────────────────────────
  // Fires the one-shot sweep on each row inside this card the first
  // time the rows layer crosses ~50% opacity. First card seeds true
  // so the user sees the sweep on initial load, no scroll required.
  const [hasGlinted, setHasGlinted] = useState(isFirst);
  useMotionValueEvent(rowsOpacity, 'change', (v) => {
    if (!hasGlinted && v > 0.5) setHasGlinted(true);
  });

  // ── Page-turn wipe ────────────────────────────────────────────
  // A single 1px accent line that scans top→bottom during the
  // bg crossfade INTO this card. Only renders for non-first cards
  // (no wipe on initial render). Uses the era's accent so each
  // boundary signals the new color.
  const wipeY = useTransform(
    scrollYProgress,
    [outerStart, bgEnterEnd],
    ['0%', '100%'],
    { ease: SMOOTH },
  );
  const wipeOpacity = useTransform(
    scrollYProgress,
    [outerStart, slotStart, bgEnterEnd, bgEnterEnd + 0.001],
    [0, 0.85, 0.85, 0],
  );

  return (
    <>
      {/* BG layer — full bleed era-themed background color, fades on
          the longest track. (ASCII shader temporarily disabled for
          scroll perf — three concurrent WebGL contexts were sticky.
          Can re-enable per-card later or do one shared interpolated
          shader if we want the texture back.) */}
      <motion.div
        className={`era-${block.theme} absolute inset-0 z-10`}
        style={{ opacity: bgOpacity, willChange: 'opacity' }}
        aria-hidden
      />

      {/* Page-turn wipe — thin accent line scanning top→bottom during
          bg crossfade. Skipped on first card. */}
      {!isFirst && (
        <motion.div
          className={`era-${block.theme} absolute inset-x-0 z-30 pointer-events-none`}
          style={{
            top: wipeY,
            height: 1,
            backgroundColor: 'var(--era-accent)',
            opacity: wipeOpacity,
            willChange: 'top, opacity',
          }}
          aria-hidden
        />
      )}

      {/* CONTENT layers — header + rows, each on their own translate +
          opacity track. Sit inside an era-themed wrapper so any
          era CSS-var styling resolves correctly within the content.
          Bg forced transparent so this wrapper doesn't cover other
          cards' bg layers (the era class sets bg-color by default). */}
      <div
        className={`era-${block.theme} absolute inset-0 z-20 px-4 sm:px-6 md:px-8 pt-4 md:pt-6 pb-6 md:pb-10 pointer-events-none`}
        style={{ backgroundColor: 'transparent' }}
        data-era={block.theme}
      >
        <div className="max-w-6xl mx-auto h-full flex flex-col justify-start">
          <motion.div
            style={{
              y: headerY,
              opacity: headerOpacity,
              // Only capture clicks when this card is actually visible — prevents
              // faded-out era cards from intercepting clicks meant for the active one.
              pointerEvents: useTransform(headerOpacity, [0, 0.5, 1], ['none', 'none', 'auto']),
              willChange: 'transform, opacity',
            }}
          >
            {block.renderHeader(block.theme, block.era, block.years, block.tagline)}
          </motion.div>
          <motion.div
            className="mt-4 md:mt-6"
            data-glinted={hasGlinted ? 'true' : undefined}
            style={{
              y: rowsY,
              opacity: rowsOpacity,
              pointerEvents: useTransform(rowsOpacity, [0, 0.5, 1], ['none', 'none', 'auto']),
              willChange: 'transform, opacity',
            }}
          >
            {block.rows}
          </motion.div>
        </div>
      </div>
    </>
  );
}
