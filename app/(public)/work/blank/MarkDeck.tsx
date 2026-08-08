/**
 * The symbol deck — one candidate at a time, keep or pass.
 *
 * Replaces a 6-up mark grid plus a 12-up print grid plus an upload block: 19
 * simultaneous choices in 2669px, which was a third of the whole page and the
 * single worst offender in the density audit.
 *
 * A 6-up grid is the right shape when comparison IS the task, which is why the
 * direction bake-off keeps its grid. It is the wrong shape here: you are not
 * ranking six marks against each other on a spreadsheet, you are deciding whether
 * each one is the brand. That is a sequence of yes/no judgements, and a deck is
 * what a sequence of judgements wants — one large mark, its production profile,
 * and two answers.
 *
 * The garment application does NOT live here, and that was a sequencing bug: this
 * beat showed the mark ON GARMENTS before the aesthetic direction had been chosen,
 * so you were judging a rendering of a decision two beats away. The four-frame
 * family moved to the expansion beat, which sits after direction.
 *
 * What stays is what you can judge without a direction: the artwork itself and
 * whether the budget can execute it. `MarkExpansions` is exported for the beat
 * that can legitimately show it.
 */

'use client';

import Image from 'next/image';
import { useCallback } from 'react';
import { Check, X } from 'lucide-react';
import { useLine } from '@/lib/blank/lineState';
import { STATES, tierIndex } from '@/lib/blank/line';
import { gateLabel } from '@/lib/blank/producible';

interface Candidate {
  id: string;
  title: string;
  profile: string;
  tiers: number[];
}

const CANDIDATES: Candidate[] = [
  {
    id: 'M-glyph',
    title: 'Glyph',
    profile: 'Solid, compact, one connected shape — printable and stitchable at every tier.',
    tiers: [0, 1, 2, 3, 4],
  },
  {
    id: 'M-chevron',
    title: 'Chevron',
    profile: 'Solid angular ribbon. Survives every method.',
    tiers: [0, 1, 2, 3, 4],
  },
  {
    id: 'M-seal',
    title: 'Seal',
    profile: 'Ring with a notch. Two values to print cleanly; stitches from $12k.',
    tiers: [0, 2, 3, 4],
  },
  {
    id: 'M-lot-stamp',
    title: 'Lot stamp',
    profile: 'One colour, rough edge. Near-free — and it IS the lot system.',
    tiers: [0, 1, 2, 3, 4],
  },
  {
    id: 'M-brush',
    title: 'Brush',
    profile: 'Dry-brush breakup. Prints as halftone; no equivalent in thread.',
    tiers: [0, 1, 2],
  },
  {
    id: 'M-module',
    title: 'Module',
    profile: 'Sub-1pt hairlines. DTF only — drops out on screen, impossible in thread.',
    tiers: [0],
  },
];

const EXPANSIONS = [
  { slug: 'chest-large', label: 'Chest, large', gate: '$3k version' },
  { slug: 'chest-tonal', label: 'Chest, tonal', gate: 'same mark at $8k' },
  { slug: 'left-chest-micro', label: 'Left chest, micro', gate: 'every tier' },
  { slug: 'back-oversize', label: 'Back, oversize', gate: 'cannot be stitched' },
];

const money = (n: number) => `$${(n / 1000).toFixed(0)}k`;

export function MarkDeck() {
  const { config, set } = useLine();
  const tier = tierIndex(config.budget);

  // Deck position is derived from the chosen mark when there is one, so a shared
  // link opens on the candidate the sender was looking at.
  const chosenIdx = CANDIDATES.findIndex((c) => c.id === config.graphic);
  const cursorRaw = config.motif && /^\d+$/.test(config.motif) ? Number(config.motif) : -1;
  const idx = chosenIdx >= 0 ? chosenIdx : cursorRaw >= 0 ? Math.min(cursorRaw, CANDIDATES.length - 1) : 0;

  const c = CANDIDATES[idx];
  const ok = c.tiers.includes(tier);
  const kept = config.graphic === c.id;

  // `motif` doubles as the deck cursor: it is already in the shared URL and is
  // otherwise unused once a preset graphic is chosen. Documented because it is a
  // reuse, not an obvious home for a card index.
  const move = useCallback(
    (n: number) => {
      const next = Math.min(CANDIDATES.length - 1, Math.max(0, n));
      set('motif', String(next));
      if (config.graphic && CANDIDATES[next].id !== config.graphic) set('graphic', null);
    },
    [set, config.graphic],
  );

  return (
    <div className="my-2 max-w-md mx-auto">
      <div className="flex items-baseline justify-between gap-4 mb-4">
        <p className="text-[12px] font-mono" style={{ color: 'var(--era-ink-muted)' }}>
          <span style={{ color: 'var(--accent)' }}>{idx + 1}</span> of {CANDIDATES.length}
          {' · '}
          {CANDIDATES.filter((x) => x.tiers.includes(tier)).length} makeable at {money(STATES[tier].budget)}
        </p>
        <div className="flex gap-1.5">
          {CANDIDATES.map((x, n) => (
            <button
              key={x.id}
              onClick={() => move(n)}
              aria-label={`Candidate ${n + 1}: ${x.title}`}
              aria-current={n === idx ? 'true' : undefined}
              className="w-6 h-1 transition-colors"
              style={{
                backgroundColor:
                  n === idx
                    ? 'var(--accent)'
                    : config.graphic === x.id
                      ? 'var(--era-ink)'
                      : 'var(--era-hairline)',
              }}
            />
          ))}
        </div>
      </div>

      <div>
        {/* The mark, large. It is the thing being judged, so it gets the room. */}
        <div>
          {/* Capped rather than a bare aspect-square: at 320px wide plus the
              title, profile and buttons, Keep/Pass landed below a 900px fold —
              the primary action of the beat needed scrolling to reach. */}
          <div
            className="relative w-full aspect-square overflow-hidden mx-auto"
            style={{
              maxHeight: 'min(32vh, 280px)',
              maxWidth: 'min(32vh, 280px)',
              backgroundColor: 'var(--era-bg-deep)',
              opacity: ok ? 1 : 0.3,
              filter: ok ? 'none' : 'grayscale(1)',
              outline: kept ? '1px solid var(--accent)' : 'none',
              outlineOffset: '3px',
            }}
          >
            <Image
              src={`/blank/${c.id}.webp`}
              alt={`${c.title} — candidate brandmark`}
              fill
              sizes="(max-width: 1024px) 100vw, 320px"
              priority
              className="object-contain"
            />
          </div>

          <div className="mt-3 flex flex-wrap items-baseline gap-x-2">
            <h4 className="font-display text-xl" style={{ color: 'var(--era-ink)' }}>
              {c.title}
            </h4>
            {!ok && (
              <span
                className="text-[10px] font-mono uppercase tracking-wider"
                style={{ color: 'var(--era-ink-muted)' }}
              >
                {gateLabel(c.tiers, tier, money, STATES.map((s) => s.budget))}
              </span>
            )}
          </div>
          <p className="text-[13px] mt-1" style={{ color: 'var(--era-ink-muted)' }}>
            {c.profile}
          </p>

          {/* Keep or pass. Two answers, which is what a judgement wants. */}
          <div className="flex gap-2 mt-5">
            <button
              onClick={() => {
                set('graphic', kept ? null : c.id);
                if (!kept) set('motif', String(idx));
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-mono uppercase tracking-wider border transition-colors"
              style={{
                borderColor: kept ? 'var(--accent)' : 'var(--era-hairline)',
                color: kept ? 'var(--accent)' : 'var(--era-ink)',
              }}
            >
              <Check className="w-3.5 h-3.5" />
              {kept ? 'Kept' : 'Keep this'}
            </button>
            <button
              onClick={() => move(idx + 1)}
              disabled={idx === CANDIDATES.length - 1}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-mono uppercase tracking-wider transition-colors disabled:opacity-30"
              style={{ color: 'var(--era-ink-muted)' }}
            >
              <X className="w-3.5 h-3.5" /> Pass
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

/**
 * The mark across the line — four applications of whichever candidate is current.
 *
 * Lives in the expansion beat rather than in the deck, because seeing a mark on a
 * garment presupposes an aesthetic direction, and the deck runs before direction
 * is chosen. Four frames chosen to span the budget rather than to look varied: the
 * large chest print is what $3k buys, the tonal chest print is the same mark at
 * $8k, the micro left-chest survives every tier, and the oversize back prints and
 * cannot be stitched. The family and its limits in one row.
 */
export function MarkExpansions() {
  const { config } = useLine();
  const chosen = CANDIDATES.find((c) => c.id === config.graphic);
  const cursor = config.motif && /^\d+$/.test(config.motif) ? Number(config.motif) : 0;
  const c = chosen ?? CANDIDATES[Math.min(cursor, CANDIDATES.length - 1)];

  return (
    <div className="mb-10">
      <div className="flex flex-wrap items-baseline gap-x-2.5 mb-3">
        <h4 className="font-display text-lg" style={{ color: 'var(--era-ink)' }}>
          {c.title} across the line
        </h4>
        {!chosen && (
          <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
            not kept yet — previewing
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-4">
        {EXPANSIONS.map((x) => (
          <figure key={x.slug} className="min-w-0">
            <div
              className="relative w-full aspect-[3/4] overflow-hidden"
              style={{ backgroundColor: 'var(--era-bg-deep)' }}
            >
              <Image
                src={`/blank/marks/${c.id}-${x.slug}.webp`}
                alt={`${c.title} — ${x.label}`}
                fill
                sizes="(max-width: 640px) 50vw, 22vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-1">
              <span className="text-[11px] block" style={{ color: 'var(--era-ink)' }}>
                {x.label}
              </span>
              <span className="text-[10px] font-mono" style={{ color: 'var(--era-ink-muted)' }}>
                {x.gate}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="text-[12px] mt-3 max-w-xl" style={{ color: 'var(--era-ink-muted)' }}>
        Same artwork every frame — passed to the model as an image, not described in words, so it is
        genuinely this mark rather than a redraw of it.
      </p>
    </div>
  );
}
