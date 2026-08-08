/**
 * Beat 04 — the identity on the clothes.
 *
 * Three things that were separate and should not have been: the style selector,
 * the close-up of the chosen style, and the mark applied to garments.
 *
 * WHY THE GLYPH IS DRAWN ON, NOT PRE-RENDERED. The previous version showed four
 * pre-generated photographs of a fixed mark — M-seal on a tee — while the beat
 * before it had you build a mark from YOUR name. So you designed a roundel and
 * were then shown somebody else's ring. Drawing the chosen construction onto the
 * garment at the real placement and the real relative scale is both truthful and
 * instant: change the name, the face or the mark and every placement follows.
 *
 * Scale is not decorative here. The chest print, the left-chest hit and the cap
 * front are sized against each other the way they would be on cloth, so a mark
 * that dies at 2in visibly dies at 2in — which is exactly the judgement the
 * production gating is trying to force.
 *
 * The generative surface lives here too. It had been dropped entirely in a
 * restructure: DeviationRender and ReferenceUpload were imported and never
 * mounted, which quietly removed the whole live-generation half of the tool.
 */

'use client';

import Image from 'next/image';
import { useLine } from '@/lib/blank/lineState';
import { STATES, tierIndex, GARMENTS } from '@/lib/blank/line';
import { ALL_TREATMENTS, normalise } from '@/lib/blank/wordmark';
import { TIER_METHOD, METHOD_LABEL } from '@/lib/blank/producible';
import {
  constructionAvailable,
  constructionsFor,
  randomConstructions,
  type Construction,
} from '@/lib/blank/markFamily';
import { LOCKUPS, MIN_WORDMARK_INCHES } from '@/lib/blank/identity';
import { Mark } from './MarkFamily';

const money = (n: number) => `$${(n / 1000).toFixed(0)}k`;

/**
 * Placements, with the mark's width as a fraction of the garment's width so the
 * relative sizes are honest rather than eyeballed. A 12in chest print on a ~20in
 * body is 0.6; a 2in left-chest hit is 0.1.
 */
const PLACEMENTS = [
  { id: 'chest', label: 'Chest', inches: 10, frac: 0.5, x: 50, y: 44 },
  { id: 'left-chest', label: 'Left chest', inches: 2, frac: 0.1, x: 34, y: 36 },
  { id: 'back', label: 'Upper back', inches: 12, frac: 0.6, x: 50, y: 38 },
  { id: 'sleeve', label: 'Sleeve', inches: 1.5, frac: 0.075, x: 12, y: 46 },
] as const;

export function Applied() {
  const { config, set } = useLine();
  const tier = tierIndex(config.budget);
  const method = TIER_METHOD[tier];
  const word = normalise(config.wordmark);
  const t = ALL_TREATMENTS.find((x) => x.id === config.wordmarkStyle) ?? ALL_TREATMENTS[0];

  const seed = Number(config.markSeed);
  const pool: Construction[] =
    config.markSeed !== '' && Number.isFinite(seed)
      ? randomConstructions(word, seed)
      : constructionsFor(word);
  const mark = pool.find((c) => c.id === config.graphic) ?? null;
  const lockup = LOCKUPS.find((l) => l.id === config.placement) ?? LOCKUPS[0];

  const garment = config.garment;
  const g = GARMENTS.find((x) => x.key === garment)!;
  const stop = STATES[tier];

  // A PLAIN blank, generated for this purpose. Every other garment plate in the
  // pipeline already carries a printed mark, so using one showed the tier's
  // generic blob AND the user's mark fighting for the same chest. Ghosting the
  // plate did not fix that, it just made both faint. The canvas has to be empty.
  const plate = `/blank/P-${garment}-plain.webp`;

  return (
    <div className="my-2">
      {/* Style selector — which garment, at this budget. */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
        <div className="flex gap-1.5">
          {GARMENTS.map((gm) => (
            <button
              key={gm.key}
              onClick={() => set('garment', gm.key)}
              aria-pressed={garment === gm.key}
              className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider transition-colors border-b-2"
              style={{
                borderColor: garment === gm.key ? 'var(--accent)' : 'transparent',
                color: garment === gm.key ? 'var(--accent)' : 'var(--era-ink-muted)',
                minHeight: 0,
              }}
            >
              {gm.label}
            </button>
          ))}
        </div>
        <p className="text-[12px] font-mono" style={{ color: 'var(--era-ink-muted)' }}>
          {stop.treatment[garment]} · {METHOD_LABEL[method]} at {money(stop.budget)}
        </p>
      </div>

      {mark ? (
        <>
          {/* Close-up of the chosen style, with the mark placed on it. */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PLACEMENTS.filter((pl) => garment !== 'cap' || pl.id === 'chest').map((pl) => {
              const av = constructionAvailable(mark, method);
              // Under 4in the WORDMARK cannot hold, which is precisely why the
              // mark carries these placements. Stated as the reason the mark is
              // here rather than as an error — it was reading as a red warning
              // over a frame where the mark sits perfectly happily.
              const markOnly = pl.inches < MIN_WORDMARK_INCHES;
              return (
                <figure key={pl.id} className="min-w-0">
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ aspectRatio: g.ratio, backgroundColor: 'var(--era-bg-deep)' }}
                  >
                    <Image
                      src={plate}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover"
                    />
                    {/* The mark, at the real relative width for this placement. */}
                    <span
                      className="absolute flex items-center justify-center"
                      style={{
                        left: `${pl.x}%`,
                        top: `${pl.y}%`,
                        transform: 'translate(-50%, -50%)',
                        width: `${pl.frac * 100}%`,
                        opacity: av.ok ? 1 : 0.3,
                      }}
                    >
                      {/* Ink is off-white on a faded charcoal blank, so the mark
                          inverts here — on the garment it is the print, not
                          artwork on paper. */}
                      <span style={{ ['--era-ink' as string]: 'var(--era-bg)' }}>
                        <Mark c={mark} word={word} css={t.css} size={220 * pl.frac} />
                      </span>
                    </span>
                  </div>
                  <figcaption className="mt-1.5">
                    <span className="text-[12px] block" style={{ color: 'var(--era-ink)' }}>
                      {pl.label}
                    </span>
                    <span
                      className="text-[10px] font-mono"
                      style={{ color: 'var(--era-ink-muted)' }}
                    >
                      {pl.inches}in
                      {markOnly ? ' · mark only, no room for the word' : ''}
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>

          <p className="mt-3 text-[12px] max-w-2xl" style={{ color: 'var(--era-ink-muted)' }}>
            Your mark, drawn at the real relative size for each placement — not a stock render of a
            different one. The blank underneath is undecorated on purpose: every other garment plate
            in the pipeline already carries a print, and two marks on one chest is not a preview.
          </p>
        </>
      ) : (
        <p className="text-[13px] py-8" style={{ color: 'var(--accent)' }}>
          Pick a mark in step 03 and it will be applied across the line here.
        </p>
      )}
    </div>
  );
}
