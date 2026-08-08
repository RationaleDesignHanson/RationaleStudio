/**
 * The identity applied — four garment frames for whichever symbol is current.
 *
 * Lives in the "how it looks made" beat rather than with the symbol choice,
 * because seeing a mark on a garment presupposes an aesthetic direction, and the
 * identity beat runs before direction is chosen. Showing it earlier asked you to
 * judge a rendering of a decision two beats away.
 *
 * Four frames chosen to span the budget rather than to look varied: the large
 * chest print is what $3k buys, the tonal chest print is the same mark at $8k, the
 * micro left-chest survives every tier, and the oversize back prints and cannot be
 * stitched. The family and its limits in one row.
 *
 * These are mark-PRESERVING: each was made by passing the mark's own artwork to
 * Seedream 4 as an image input, not by re-describing it. A fixed seed does not hold
 * a subject across a changed prompt, so a same-seed family would have shown four
 * different marks and been fiction.
 */

'use client';

import Image from 'next/image';
import { useLine } from '@/lib/blank/lineState';

interface Candidate {
  id: string;
  title: string;
}

const CANDIDATES: Candidate[] = [
  { id: 'M-glyph', title: 'Glyph' },
  { id: 'M-chevron', title: 'Chevron' },
  { id: 'M-seal', title: 'Seal' },
  { id: 'M-lot-stamp', title: 'Lot stamp' },
  { id: 'M-brush', title: 'Brush' },
  { id: 'M-module', title: 'Module' },
];

const EXPANSIONS = [
  { slug: 'chest-large', label: 'Chest, large', gate: '$3k version' },
  { slug: 'chest-tonal', label: 'Chest, tonal', gate: 'same mark at $8k' },
  { slug: 'left-chest-micro', label: 'Left chest, micro', gate: 'every tier' },
  { slug: 'back-oversize', label: 'Back, oversize', gate: 'cannot be stitched' },
];

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
