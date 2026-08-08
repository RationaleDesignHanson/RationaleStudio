/**
 * The brandmark bake-off — six candidates, and what each becomes on the line.
 *
 * Two things the graphics library cannot do. First, it photographs marks ON
 * garments, so you judge the mark and the tee together; these six are flat
 * artwork, so the mark is the only variable. Second, one mark is not a brand —
 * what matters is whether it survives being scaled, moved and made quiet, so
 * every candidate carries four expansions.
 *
 * The expansions are mark-PRESERVING: each was made by passing the mark's own
 * artwork to Seedream 4 as an image input, not by re-describing it in a prompt.
 * A fixed seed does not hold a subject across a changed prompt — text-to-image
 * redraws it — so a same-seed family would have shown six different marks and
 * been fiction. Same model, same prompt as the live /api/blank/apply-reference
 * route, so what is committed here and what a visitor generates cannot drift.
 *
 * The four expansions are chosen to span the budget rather than to look varied:
 * the large chest print is the $3k version, the tonal chest print is the same
 * mark at $8k, the micro left-chest survives every tier, and the oversize back
 * prints but cannot be stitched. The family and its limits in one row.
 */

'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useLine } from '@/lib/blank/lineState';
import { STATES, tierIndex } from '@/lib/blank/line';

interface Candidate {
  id: string;
  title: string;
  /** The production property that decides where it lives on the slider. */
  profile: string;
  /** Budget stop indices where this mark is executable. */
  tiers: number[];
}

/**
 * Production profiles reason from the same method capability as
 * lib/blank/producible.ts: fine line survives DTF and dies on screen and in
 * thread; halftone and dry-brush breakup cannot be stitched; solid compact
 * marks survive everything; a two-value seal needs the second screen.
 */
const CANDIDATES: Candidate[] = [
  {
    id: 'M-glyph',
    title: 'Glyph',
    profile: 'Solid, compact, one connected shape — printable and stitchable.',
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
    profile: 'Ring with a notch. Two values to print cleanly; stitches at $12k.',
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
  { slug: 'chest-large', label: 'Chest, large', gate: 'the $3k version' },
  { slug: 'chest-tonal', label: 'Chest, tonal', gate: 'the same mark at $8k' },
  { slug: 'left-chest-micro', label: 'Left chest, micro', gate: 'survives every tier' },
  { slug: 'back-oversize', label: 'Back, oversize', gate: 'prints, cannot be stitched' },
];

const money = (n: number) => `$${(n / 1000).toFixed(0)}k`;

export function MarkBakeoff() {
  const { config } = useLine();
  const tier = tierIndex(config.budget);
  const stop = STATES[tier];
  const [open, setOpen] = useState<string | null>(null);

  const makeable = CANDIDATES.filter((c) => c.tiers.includes(tier)).length;

  return (
    <div className="my-4">
      <p className="mb-5 text-[12px] font-mono" style={{ color: 'var(--era-ink-muted)' }}>
        At <span style={{ color: 'var(--accent)' }}>{money(stop.budget)}</span> —{' '}
        <span style={{ color: 'var(--era-ink)' }}>
          {makeable} of these {CANDIDATES.length}
        </span>{' '}
        can be executed. Click a mark to see it across the line.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6">
        {CANDIDATES.map((c) => {
          const ok = c.tiers.includes(tier);
          const on = open === c.id;
          const first = Math.min(...c.tiers);
          const last = Math.max(...c.tiers);
          return (
            <div key={c.id}>
              <button
                onClick={() => setOpen(on ? null : c.id)}
                aria-expanded={on}
                className="text-left w-full min-w-0 flex flex-col items-stretch"
              >
                <div
                  className="relative w-full aspect-square overflow-hidden transition-opacity duration-300"
                  style={{
                    backgroundColor: 'var(--era-bg-deep)',
                    opacity: ok ? 1 : 0.25,
                    filter: ok ? 'none' : 'grayscale(1)',
                    outline: on ? '1px solid var(--accent)' : 'none',
                    outlineOffset: '2px',
                  }}
                >
                  <Image
                    src={`/blank/${c.id}.webp`}
                    alt={`${c.title} — candidate brandmark`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-contain"
                  />
                </div>
                <div className="mt-2 flex flex-wrap items-baseline gap-x-2">
                  <span
                    className="text-[13px]"
                    style={{ color: on ? 'var(--accent)' : ok ? 'var(--era-ink)' : 'var(--era-ink-muted)' }}
                  >
                    {c.title}
                  </span>
                  {!ok && (
                    <span
                      className="text-[10px] font-mono uppercase tracking-wider"
                      style={{ color: 'var(--era-ink-muted)' }}
                    >
                      {tier > last ? `up to ${money(STATES[last].budget)}` : `needs ${money(STATES[first].budget)}`}
                    </span>
                  )}
                </div>
                <span className="text-[11px] mt-0.5" style={{ color: 'var(--era-ink-muted)' }}>
                  {c.profile}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {open && (
        <div
          className="mt-8 pt-6 border-t"
          style={{ borderColor: 'var(--era-hairline)' }}
        >
          <h4 className="font-display text-lg mb-1" style={{ color: 'var(--era-ink)' }}>
            {CANDIDATES.find((c) => c.id === open)?.title} — across the line
          </h4>
          <p className="text-[12px] font-mono mb-4" style={{ color: 'var(--era-ink-muted)' }}>
            Same artwork every time — passed to the model as an image, not re-described.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-4">
            {EXPANSIONS.map((x) => (
              <figure key={x.slug} className="min-w-0">
                <div
                  className="relative w-full aspect-[3/4] overflow-hidden"
                  style={{ backgroundColor: 'var(--era-bg-deep)' }}
                >
                  <Image
                    src={`/blank/marks/${open}-${x.slug}.webp`}
                    alt={`${open} — ${x.label}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-1.5">
                  <span className="text-[12px] block" style={{ color: 'var(--era-ink)' }}>
                    {x.label}
                  </span>
                  <span className="text-[11px] font-mono" style={{ color: 'var(--era-ink-muted)' }}>
                    {x.gate}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
