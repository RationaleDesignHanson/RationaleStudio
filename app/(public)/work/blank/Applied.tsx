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
 * ALL THREE GARMENTS AT ONCE. This used to tab between tee, hoodie and cap and
 * show four placements of the one you picked. That is backwards for a LINE: the
 * question is what the identity does across the range, and a tab answers it by
 * hiding two thirds of the range. Placement is the selector now — it is a genuine
 * either/or, a mark is in one place at a time — and the three garments sit side by
 * side underneath it.
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
import { TIER_METHOD, METHOD_LABEL, METHOD_MEANING } from '@/lib/blank/producible';
import {
  constructionAvailable,
  constructionsFor,
  randomConstructions,
  type Construction,
} from '@/lib/blank/markFamily';
import { MIN_WORDMARK_INCHES } from '@/lib/blank/identity';
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
  const mark = pool.find((c) => c.id === config.mark) ?? null;

  const stop = STATES[tier];

  // Placement is the axis you switch; the garments are all shown.
  const place =
    PLACEMENTS.find((x) => x.id === config.placement) ?? PLACEMENTS[0];


  // Plain blanks, generated for this purpose. Every other garment plate in the
  // pipeline already carries a printed mark, so using one showed the tier's
  // generic blob AND the user's mark fighting for the same chest. The canvas has
  // to be empty; the path is built per garment in the grid below.

  return (
    <div className="my-2">
      {/* Placement is the selector. The garments are not hidden behind it. */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
        <div className="flex flex-wrap gap-1.5">
          {PLACEMENTS.map((pl) => {
            const on = pl.id === place.id;
            return (
              <button
                key={pl.id}
                onClick={() => set('placement', pl.id)}
                aria-pressed={on}
                className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider transition-colors border-b-2"
                style={{
                  borderColor: on ? 'var(--accent)' : 'transparent',
                  color: on ? 'var(--accent)' : 'var(--era-ink-muted)',
                  minHeight: 0,
                }}
              >
                {pl.label} · {pl.inches}in
              </button>
            );
          })}
        </div>
        <p className="text-[12px] font-mono" style={{ color: 'var(--era-ink-muted)' }}>
          <span title={METHOD_MEANING[method]}>{METHOD_LABEL[method]}</span> at {money(stop.budget)}
        </p>
      </div>

      {mark ? (
        <>
          {/* Close-up of the chosen style, with the mark placed on it. */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {GARMENTS.map((gm) => {
              const av = constructionAvailable(mark, method);
              // A cap has no back and no sleeve; say so rather than drawing a
              // placement onto a garment that does not have one.
              const nA = gm.key === 'cap' && place.id !== 'chest';
              return (
                <figure key={gm.key} className="min-w-0">
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ aspectRatio: gm.ratio, backgroundColor: 'var(--era-bg-deep)' }}
                  >
                    <Image
                      src={`/blank/P-${gm.key}-plain.webp`}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover"
                      style={{ opacity: nA ? 0.35 : 1 }}
                    />
                    {!nA && (
                      <span
                        className="absolute flex items-center justify-center"
                        style={{
                          left: `${place.x}%`,
                          top: `${place.y}%`,
                          transform: 'translate(-50%, -50%)',
                          width: `${place.frac * 100}%`,
                          opacity: av.ok ? 0.92 : 0.3,
                          mixBlendMode: 'screen',
                        }}
                      >
                        <span style={{ ['--era-ink' as string]: 'var(--era-bg)' }}>
                          <Mark c={mark} word={word} css={t.css} size={300 * place.frac} />
                        </span>
                      </span>
                    )}
                    {nA && (
                      <span
                        className="absolute inset-0 flex items-center justify-center text-[11px] font-mono uppercase tracking-wider"
                        style={{ color: 'var(--era-ink-muted)' }}
                      >
                        no {place.label.toLowerCase()} on a cap
                      </span>
                    )}
                  </div>
                  <figcaption className="mt-1.5">
                    <span className="text-[12px] block" style={{ color: 'var(--era-ink)' }}>
                      {gm.label}
                    </span>
                    <span className="text-[10px] font-mono" style={{ color: 'var(--era-ink-muted)' }}>
                      {stop.treatment[gm.key]}
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>


          <p className="mt-3 text-[12px] max-w-2xl" style={{ color: 'var(--era-ink-muted)' }}>
            <strong style={{ color: 'var(--era-ink)' }}>These are placement mocks, not renders.</strong>{' '}
            The position and the relative size are accurate — a 2in hit really is a fifth of the 10in
            chest print — but the mark is layered flat over the blank: it does not follow the fold of
            the cloth or take the light. For a real photograph of it printed, generate one.
          </p>

          <p className="mt-2 text-[12px] max-w-2xl" style={{ color: 'var(--era-ink-muted)' }}>
            To see it actually printed — placed, scaled and inked — use the placement renderer
            below. It renders the same artwork through the same route, so this view and that one
            cannot disagree about what your mark is.
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
