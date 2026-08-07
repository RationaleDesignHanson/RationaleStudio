/**
 * Brand bake-off — six directions, judged on the rack.
 *
 * A single nice tee proves nothing. The comparison that matters is four pieces
 * hanging together, so the racks lead and the garments are secondary.
 * Source: ~/Developer/skreet/bakeoff (six directions x three garments,
 * Flux 1.1 Pro at one fixed seed — the direction is the only variable).
 */

'use client';

import { useLine } from '@/lib/blank/lineState';
import Image from 'next/image';

interface Direction {
  key: string;
  label: string;
  thesis: string;
  cost: string;
  /** Can this direction's mark be made at Stage 0 money? */
  affordable: boolean;
  control?: boolean;
  /** Directly visualises the lot-as-edition mechanic the $150 test is for. */
  testsHypothesis?: boolean;
}

const DIRECTIONS: Direction[] = [
  {
    key: 'quiet-flex',
    label: 'Quiet flex',
    thesis: 'Status through construction, not logos.',
    cost: 'Embroidery ~6k stitches. Needs the premium blank to read.',
    affordable: false,
    control: true,
  },
  {
    key: 'workwear',
    label: 'Workwear utility',
    thesis: 'Function as the aesthetic. Bar tacks, contrast stitch, honest hardware.',
    cost: 'Bar tacks are near-free — the factory already sews them.',
    affordable: true,
  },
  {
    key: 'technical',
    label: 'Technical minimal',
    thesis: 'Mature gorpcore. Restraint borrowed from technical outerwear.',
    cost: 'Heat-pressed tab, no minimum. Cheapest mark in the set.',
    affordable: true,
  },
  {
    key: 'issue',
    label: 'Issue',
    thesis: 'Institutional uniform. Every piece stamped with its lot number — the edition IS the brand.',
    cost: 'One-colour stencil. Near-free — and it IS the lot system.',
    affordable: true,
    testsHypothesis: true,
  },
  {
    key: 'brutalist',
    label: 'Brutalist graphic',
    thesis: 'Stark, high-contrast, type-led. The loud option, done well.',
    cost: 'One-colour screen. Cheapest to produce, loudest to wear.',
    affordable: true,
  },
  {
    key: 'naturals',
    label: 'Japanese naturals',
    thesis: 'Undyed, mended, boro. Value in the cloth and the repair.',
    cost: 'Hand stitch. Beautiful, and the most expensive labour here.',
    affordable: false,
  },
];

export function BrandBakeoff() {
  // Shared config — which direction won is the whole point of sending the link.
  const { config, set } = useLine();
  const sel = config.direction;
  const setSel = (v: string) => set('direction', v);
  const d = DIRECTIONS.find((x) => x.key === sel)!;

  return (
    <div className="my-4">
      {/* The comparison: six racks, side by side */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {DIRECTIONS.map((dir) => {
          const on = dir.key === sel;
          return (
            <button
              key={dir.key}
              onClick={() => setSel(dir.key)}
              className="text-left group w-full min-w-0 flex flex-col items-stretch"
              aria-pressed={on}
            >
              <div
                className="relative w-full aspect-[3/2] overflow-hidden rounded-md border transition-all"
                style={{
                  borderColor: on ? 'var(--accent)' : 'transparent',
                  opacity: on ? 1 : 0.55,
                }}
              >
                <Image
                  src={`/blank/bakeoff/${dir.key}-rack.webp`}
                  alt={`${dir.label} — rack test`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 min-w-0">
                <span
                  className="text-[11px] font-mono uppercase tracking-wider"
                  style={{ color: on ? 'var(--accent)' : 'var(--era-ink-muted)' }}
                >
                  {dir.label}
                </span>
                {dir.control && (
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--era-ink-muted)]">
                    control
                  </span>
                )}
                {dir.testsHypothesis && (
                  <span className="text-[9px] font-mono uppercase tracking-wider" style={{ color: '#4F7A3F' }}>
                    tests the $150 hypothesis
                  </span>
                )}
                {!dir.affordable && (
                  <span className="text-[9px] font-mono uppercase tracking-wider" style={{ color: '#A8456E' }}>
                    over budget
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* The selected direction, on garments */}
      <div
        className="mt-5 rounded-md border px-4 sm:px-5 py-5"
        style={{ borderColor: 'var(--era-hairline)', backgroundColor: 'var(--era-bg-deep)' }}
      >
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-5 items-start">
          <div>
            <h3 className="font-display text-2xl md:text-3xl leading-tight" style={{ color: 'var(--era-ink)' }}>
              {d.label}
            </h3>
            <p className="mt-2 text-sm" style={{ color: 'var(--era-ink-body)' }}>
              {d.thesis}
            </p>
            <p
              className="mt-3 text-[11px] font-mono leading-snug"
              style={{ color: d.affordable ? '#B07025' : '#A8456E' }}
            >
              {d.cost}
            </p>
            {d.control && (
              <p className="mt-3 text-[11px] italic text-[var(--era-ink-muted)] leading-snug">
                The thesis the current plan rests on. If it doesn&rsquo;t win its own bake-off, that&rsquo;s the finding.
              </p>
            )}
            {d.testsHypothesis && (
              <p className="mt-3 text-[11px] italic text-[var(--era-ink-muted)] leading-snug">
                The only direction that makes the lot system visible. Numbering the batch stops being a detail on the label and becomes the whole design language &mdash; which is exactly what the $150 test is for.
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {(['tee', 'hoodie'] as const).map((g) => (
              <div
                key={g}
                className="relative aspect-[4/5] overflow-hidden rounded"
                style={{ backgroundColor: 'var(--era-bg)' }}
              >
                <Image
                  src={`/blank/bakeoff/${d.key}-${g}.webp`}
                  alt={`${d.label} — ${g}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-3 text-[11px] italic text-[var(--era-ink-muted)]">
        One fixed seed across all eighteen cells — the direction is the only variable. Judge the racks, not the tees: anyone can make one good tee.
      </p>
    </div>
  );
}
