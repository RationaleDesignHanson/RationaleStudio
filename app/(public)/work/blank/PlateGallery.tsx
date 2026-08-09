/**
 * The 22 generated plates, by phase. Everything the pipeline produced —
 * including the ones that fought back.
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Plate {
  id: string;
  title: string;
  note?: string;
  ratio: string;
}

const PHASES: { key: string; label: string; blurb: string; plates: Plate[] }[] = [
  {
    key: 'A',
    label: 'Direction',
    blurb: 'Judge the lane before spending on SKUs.',
    plates: [
      { id: 'A1-mood-board', title: 'Mood board', ratio: '3/4' },
      { id: 'A2-palette', title: 'Colourway board', note: 'Rendered warmer than the spec hexes', ratio: '3/2' },
      { id: 'A3-style-anchor', title: 'Style anchor', ratio: '1/1' },
    ],
  },
  {
    key: 'B',
    label: 'Basics',
    blurb: 'The six Stage 0 SKUs on decorated premium blanks.',
    plates: [
      { id: 'B1-tee-clay-screenprint', title: 'Tee — clay, 2-colour tonal', ratio: '4/5' },
      { id: 'B2-tee-oatmeal-embroidery', title: 'Tee — oatmeal, embroidery', note: 'Strongest mark in the set', ratio: '4/5' },
      { id: 'B3-tee-black-discharge', title: 'Tee — faded black, discharge', note: 'Technique later found impossible on this blank', ratio: '4/5' },
      { id: 'B4-hoodie-olive', title: 'Hoodie — faded olive', ratio: '4/5' },
      { id: 'B5-hoodie-stone', title: 'Hoodie — stone grey', ratio: '4/5' },
      { id: 'B6-cap-olive', title: 'Cap — washed olive', ratio: '1/1' },
    ],
  },
  {
    key: 'C',
    label: 'Hero',
    blurb: 'Three cut-and-sew candidates. The chore coat won on outerwear economics.',
    plates: [
      { id: 'C1-chore-jacket-clay', title: 'Chore coat', note: 'Renders flapped pockets against a spec of open patches', ratio: '4/5' },
      { id: 'C2-trousers-stone', title: 'Wide-leg trousers', note: 'Stone grey held at #A19D97', ratio: '4/5' },
      { id: 'C3-overshirt-olive', title: 'Overshirt', note: 'Same pattern block as the coat', ratio: '4/5' },
    ],
  },
  {
    key: 'D',
    label: 'Technical',
    blurb: 'Flats and detail macros. Communication aids, not spec-grade.',
    plates: [
      { id: 'D1-flat-chore-jacket', title: 'Flat — chore coat', ratio: '3/2' },
      { id: 'D2-flat-hoodie', title: 'Flat — hoodie', ratio: '3/2' },
      { id: 'D3-flat-trousers', title: 'Flat — trousers', note: 'Still draws belt loops, stated against twice', ratio: '3/2' },
      { id: 'D4-colorway-spec-jacket', title: 'Colourway spec', note: 'Retired — failed three times, three ways', ratio: '3/2' },
      { id: 'D5-macro-embroidery', title: 'Macro — embroidery', ratio: '1/1' },
      { id: 'D6-macro-garment-dye', title: 'Macro — garment dye', ratio: '1/1' },
      { id: 'D7-label-system', title: 'Woven hem tag', ratio: '1/1' },
    ],
  },
  {
    key: 'E',
    label: 'Lookbook',
    blurb: 'Campaign imagery. E3 keeps the top third open for a text overlay.',
    plates: [
      { id: 'E1-lookbook-seoul', title: 'Seongsu-dong, Seoul', ratio: '3/4' },
      { id: 'E2-lookbook-tokyo', title: 'Tokyo backstreet', ratio: '3/4' },
      { id: 'E3-lookbook-group', title: 'Group key art', ratio: '4/5' },
    ],
  },
];

export function PlateGallery() {
  const [active, setActive] = useState('B');
  const phase = PHASES.find((p) => p.key === active)!;

  return (
    <div className="my-8">
      <div className="flex flex-wrap gap-2 mb-4">
        {PHASES.map((p) => (
          <button
            key={p.key}
            onClick={() => setActive(p.key)}
            className="px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider border transition-colors"
            style={{
              borderColor: active === p.key ? 'var(--accent)' : 'var(--era-hairline)',
              color: active === p.key ? 'var(--accent)' : 'var(--era-ink-muted)',
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      <p className="text-sm mb-4 text-[var(--era-ink-muted)]">{phase.blurb}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {phase.plates.map((pl) => (
          <figure key={pl.id}>
            <div
              className="relative overflow-hidden rounded"
              style={{ aspectRatio: pl.ratio, backgroundColor: 'var(--era-bg-deep)' }}
            >
              <Image
                src={`/blank/${pl.id}.webp`}
                alt={pl.title}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-1.5">
              <span className="block text-[11px]" style={{ color: 'var(--era-ink)' }}>
                {pl.title}
              </span>
              {pl.note && (
                <span className="block text-[10px] italic leading-snug text-[var(--era-ink-muted)]">
                  {pl.note}
                </span>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
