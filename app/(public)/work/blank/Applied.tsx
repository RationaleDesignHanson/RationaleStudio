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
 * Placements. `inches` is the size on a body garment; the cap is sized separately
 * below because it is not a small tee.
 *
 * WHAT WAS WRONG. `frac` used to be the mark's width as a fraction of the IMAGE,
 * and the three plates are the same width on screen, so the identical number of
 * pixels was painted on all three garments. A 10in chest print therefore rendered
 * at 187px on the tee, 187px on the hoodie and 187px on the cap — a roundel
 * sprawling off both sides of a cap whose own caption said "4in printed panel".
 *
 * The beat's entire claim is that "a mark that dies at 2in visibly dies at 2in",
 * and it was drawing every placement at the same size on a garment a third of the
 * width. Scale now comes from real inches over the real garment width.
 */
const PLACEMENTS = [
  { id: 'chest', label: 'Chest', inches: 10, x: 50, y: 44 },
  { id: 'left-chest', label: 'Left chest', inches: 2, x: 34, y: 36 },
  { id: 'back', label: 'Upper back', inches: 12, x: 50, y: 38 },
  { id: 'sleeve', label: 'Sleeve', inches: 1.5, x: 12, y: 46 },
] as const;

/**
 * Per garment: how wide the thing actually is, how much of its plate it fills,
 * and the largest decoration it takes.
 *
 * `frameFrac` is a property of these specific plates, not of clothing — the tee
 * fills nearly its whole frame while the cap sits small in the middle of its
 * one — so it has to be measured off the images rather than derived.
 *
 * A cap is the reason this table exists. Its front panel is about 7in across and
 * takes a 4in hit at the most, so the tee's 10in chest print is not a smaller
 * version of a cap decoration, it is a different decoration. Asking for chest on
 * a cap gives you the front panel at 4in, and the caption says so.
 */
const GARMENT_SCALE: Record<string, { widthIn: number; frameFrac: number; maxIn: number }> = {
  tee: { widthIn: 20, frameFrac: 0.95, maxIn: 14 },
  hoodie: { widthIn: 22, frameFrac: 0.86, maxIn: 14 },
  cap: { widthIn: 7, frameFrac: 0.55, maxIn: 4 },
};

/**
 * How the ink sits on the cloth. Pulled out because these four numbers are the
 * whole difference between a placement mock that reads as printed and one that
 * reads as a sticker, and they were previously a single hardcoded 0.92.
 */
const INK = {
  /** Screen-printed white on dark cotton is bright but not paper-white. */
  opacity: 0.88,
  /** Sub-pixel edge softening. Ink wicks; vector edges do not. */
  softenPx: 0.4,
  /** Claws back the contrast the blur costs. */
  contrast: 1.06,
  /**
   * Strength of the cloth's shadows and highlights over the print.
   *
   * `overlay` beat soft-light, hard-light and multiply in a side-by-side on the
   * real plates: soft-light dulled the ink to grey, hard-light washed it out
   * entirely, and multiply crushed these already-dark garments to black. Overlay
   * keeps the ink bright while still letting the drape cross it.
   */
  cloth: 0.55,
};

/**
 * The chest of a garment is not a flat plane facing the camera, and a mark drawn
 * as if it were is the single strongest tell that you are looking at a decal
 * rather than a print. A few degrees of perspective is enough — the ring goes
 * from floating in front of the photograph to lying on the body.
 *
 * The cap gets much more of it because a cap front is genuinely a curved panel,
 * not a nearly-flat one.
 */
const WARP: Record<string, string> = {
  tee: 'perspective(420px) rotateX(6deg) scaleX(0.97)',
  hoodie: 'perspective(420px) rotateX(7deg) scaleX(0.96)',
  cap: 'perspective(220px) rotateX(10deg) scaleX(0.92)',
};

/** The size this placement is actually made at on this garment, in inches. */
function inchesOn(garment: string, placementInches: number): number {
  return Math.min(placementInches, GARMENT_SCALE[garment]?.maxIn ?? placementInches);
}

/**
 * Where the mark sits vertically on this plate, as a percent.
 *
 * A cap's front panel is lower in its frame than a tee's chest is in its own —
 * the tee placement put the roundel across the crown seam, which is not a place
 * anything gets printed.
 */
function yOn(garment: string, placementY: number): number {
  return garment === 'cap' ? 46 : placementY;
}

/** That size as a fraction of the plate's width, for drawing. */
function fracOn(garment: string, placementInches: number): number {
  const g = GARMENT_SCALE[garment];
  if (!g) return 0.5;
  return (inchesOn(garment, placementInches) / g.widthIn) * g.frameFrac;
}

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
                className="tap px-2.5 py-1 text-[12px] sm:text-[11px] font-mono uppercase tracking-wider transition-colors border-b-2"
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
              const frac = fracOn(gm.key, place.inches);
              const actualIn = inchesOn(gm.key, place.inches);
              // Say when a garment cannot take the size you asked for, rather
              // than silently drawing something smaller than the label claims.
              const clamped = actualIn < place.inches;
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
                          top: `${yOn(gm.key, place.y)}%`,
                          // Centring first, then the drape. Order matters: the
                          // perspective has to apply after the element is placed.
                          transform: `translate(-50%, -50%) ${WARP[gm.key] ?? ''}`,
                          width: `${frac * 100}%`,
                          opacity: av.ok ? INK.opacity : 0.3,
                          mixBlendMode: 'screen',
                          // Ink laid on cloth does not have a razor edge, and no
                          // print is perfectly even. Both are sub-pixel at this
                          // size; both are the difference between "printed" and
                          // "pasted".
                          filter: `blur(${INK.softenPx}px) contrast(${INK.contrast})`,
                        }}
                      >
                        <span style={{ ['--era-ink' as string]: 'var(--era-bg)' }}>
                          <Mark c={mark} word={word} css={t.css} size={300 * frac} />
                        </span>
                      </span>
                    )}

                    {/* THE COMPOSITE PASS. The mark above is a flat shape sitting
                        on top of a photograph — which is why it read as a sticker.
                        A second copy of the garment, blended over everything, puts
                        the cloth's own shadows and highlights back across the
                        print: the fold under the chest darkens it, the light on
                        the shoulder lifts it, and the weave shows through.

                        The garment is its own displacement information, so no
                        separate shading map is needed and nothing has to be
                        generated. It is still not a render — the ink does not
                        actually deform along the folds, it just takes their light
                        — but it stops the mark from floating in front of the
                        picture. `soft-light` over `overlay` because overlay
                        crushes the blacks on these already-dark plates. */}
                    {!nA && (
                      <Image
                        src={`/blank/P-${gm.key}-plain.webp`}
                        alt=""
                        aria-hidden
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover pointer-events-none"
                        style={{ mixBlendMode: 'overlay', opacity: INK.cloth }}
                      />
                    )}
                    {nA && (
                      <span
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <span
                          className="px-2 py-1 text-[11px] font-mono uppercase tracking-wider"
                          style={{
                            color: 'var(--era-ink)',
                            backgroundColor: 'color-mix(in srgb, var(--era-bg) 88%, transparent)',
                          }}
                        >
                          no {place.label.toLowerCase()} on a cap
                        </span>
                      </span>
                    )}
                  </div>
                  <figcaption className="mt-1.5">
                    <span className="text-[12px] block" style={{ color: 'var(--era-ink)' }}>
                      {gm.label}
                    </span>
                    <span className="text-[11px] sm:text-[10px] font-mono" style={{ color: 'var(--era-ink-muted)' }}>
                      {nA ? (
                        stop.treatment[gm.key]
                      ) : (
                        <>
                          {actualIn}in {gm.key === 'cap' ? 'front panel' : place.label.toLowerCase()}
                          {clamped && (
                            <span style={{ color: 'var(--accent)' }}>
                              {' '}
                              — {place.inches}in will not fit
                            </span>
                          )}
                        </>
                      )}
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>


          {/* Both paragraphs here used to point at a renderer "below". The render
              moved to beat 05 when this beat was split, so they were directing
              you at something that is not on the screen. */}
          <p className="mt-3 text-[12px] max-w-2xl" style={{ color: 'var(--era-ink-muted)' }}>
            <strong style={{ color: 'var(--era-ink)' }}>These are placement mocks, not renders.</strong>{' '}
            The position and the size are accurate — a 2in hit really is a fifth of the 10in chest
            print, and a cap really does take a quarter of what a tee takes — but the mark is layered
            flat over the blank: it does not follow the fold of the cloth or take the light. For a
            real photograph of it printed, go to <strong style={{ color: 'var(--era-ink)' }}>05</strong>.
          </p>
        </>
      ) : (
        <p className="text-[13px] py-8" style={{ color: 'var(--accent)' }}>
          Pick a mark in step 02 and it will be applied across the line here.
        </p>
      )}
    </div>
  );
}
