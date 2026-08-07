/**
 * Graphics & print library — every decoration language worth considering, on
 * one garment, one framing, one colourway.
 *
 * The budget lever answers "how much decoration the budget carries". This answers
 * "what kind". Each option carries its production note, because that's what
 * decides which of them survive Stage 0.
 */

'use client';

import Image from 'next/image';
import { useLine } from '@/lib/blank/lineState';

interface PrintOption {
  id: string;
  title: string;
  method: string;
  /** Producible in a 50–150 unit Stage 0 run? */
  ok: boolean;
  note?: string;
}

const OPTIONS: PrintOption[] = [
  { id: 'G-abstract-mark', title: 'Abstract mark', method: '1-colour screen', ok: true },
  { id: 'G-emblem', title: 'Emblem / crest', method: '2-colour screen', ok: true },
  { id: 'G-numeral', title: 'Athletic numeral', method: '1-colour screen', ok: true },
  { id: 'G-pocket-hit', title: 'Pocket-scale hit', method: '1-colour screen', ok: true, note: 'Cheapest option in the set — smallest platen, least ink.' },
  { id: 'G-back-panel', title: 'Back-panel graphic', method: '1-colour screen', ok: true, note: 'Within the 14×16in standard platen. Larger needs jumbo frames.' },
  { id: 'G-sleeve-hit', title: 'Sleeve hit', method: '1-colour screen', ok: true, note: 'Small platen; 1–4in is the practical limit.' },
  { id: 'G-tonal-emboss', title: 'Tonal / no-contrast', method: 'Tonal ink or discharge', ok: true, note: 'The quiet option. On a faded blank it needs an underbase blocker.' },
  { id: 'G-distressed', title: 'Distressed overlay', method: 'Screen w/ halftone', ok: true },
  { id: 'G-grid-diagram', title: 'Technical diagram', method: '1-colour screen', ok: false, note: 'Fine lines below ~1pt drop out on textured cotton. Redraw heavier or move to DTF.' },
  { id: 'G-embroidered-patch', title: 'Applied patch', method: 'Appliqué', ok: false, note: 'Adds a cut piece plus tack-down labour per unit.' },
  { id: 'G-stripe-panel', title: 'Colour-block panel', method: 'Cut-and-sew', ok: false, note: 'Not a decoration — a pieced seam. Leaves the blanks path entirely.' },
  { id: 'G-allover', title: 'All-over pattern', method: 'Sublimation', ok: false, note: 'Needs polyester. Off-brief for a cotton, garment-dyed line.' },
];

export function GraphicsLibrary() {
  // Shared config, not local state — the graphic is part of what gets sent.
  const { config, set } = useLine();
  const sel = config.graphic;
  const setSel = (v: string | null) => set('graphic', v);
  const active = OPTIONS.find((o) => o.id === sel);

  return (
    <div className="my-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-5">
        {OPTIONS.map((o) => {
          const on = sel === o.id;
          return (
            <button
              key={o.id}
              onClick={() => setSel(on ? null : o.id)}
              aria-pressed={on}
              className="text-left w-full min-w-0 flex flex-col items-stretch group"
            >
              <div
                className="relative w-full aspect-[4/5] overflow-hidden transition-opacity"
                style={{ backgroundColor: 'var(--era-bg-deep)', opacity: on || !sel ? 1 : 0.4 }}
              >
                <Image
                  src={`/blank/${o.id}.webp`}
                  alt={o.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2">
                <span
                  className="text-[12px]"
                  style={{ color: on ? 'var(--accent)' : 'var(--era-ink)' }}
                >
                  {o.title}
                </span>
                {!o.ok && (
                  <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: '#A8456E' }}>
                    not Stage 0
                  </span>
                )}
              </div>
              <span className="text-[11px] font-mono" style={{ color: 'var(--era-ink-muted)' }}>
                {o.method}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-[13px] max-w-3xl" style={{ color: 'var(--era-ink-body)' }}>
        {active?.note ??
          (active
            ? `${active.title} — ${active.method}.`
            : 'Twelve print languages on one garment. Eight are producible in a 50–150 unit run; four leave the decorated-blanks path and take the budget with them.')}
      </p>
    </div>
  );
}
