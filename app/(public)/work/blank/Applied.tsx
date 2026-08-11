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
import { useLine, frontArt } from '@/lib/blank/lineState';
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
import { SignArtwork } from './SignArtwork';
import { clothTexture, fabricFor, inkOn, onCloth } from '@/lib/blank/fabric';
import { paletteById } from '@/lib/blank/palettes';
import { blankFor } from '@/lib/blank/line';

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
 *
 * IDS MATCH `PLACEMENTS` IN axes.ts EXACTLY, and must keep doing so.
 *
 * This beat and the deviation renderer both write `config.placement`, and they
 * used different vocabularies for the same four positions — `chest`/`back` here
 * against `chest-centre`/`upper-back` there. `validateTuple` rejects an unknown
 * placement, but the renderer's coercion effect rewrites the stranded value to
 * the garment default before anyone sees an error, so choosing "Upper back",
 * stepping to 05 and stepping back silently reset you to Chest with nothing said.
 */
const PLACEMENTS = [
  { id: 'chest-centre', label: 'Chest', inches: 10, x: 50, y: 44 },
  { id: 'left-chest', label: 'Left chest', inches: 2, x: 34, y: 36 },
  { id: 'upper-back', label: 'Upper back', inches: 12, x: 50, y: 38 },
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
  const { config, set, skus } = useLine();
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

  /**
   * THE MARK AND THE GRAPHIC ARE NOT COMPETING FOR ONE SLOT.
   *
   * They were: a kept graphic silently replaced the mark everywhere, so choosing
   * a front print made the identity you had built vanish with no explanation.
   *
   * They are different objects doing different jobs. The MARK is the house
   * identity — it goes on the neck and the hem and it is on every garment in
   * every season, which is what makes a range read as one brand. The GRAPHIC is
   * the front print, and it changes per style, per place, per drop.
   *
   * So the front print is the graphic if there is one and the mark if there is
   * not — a small batch line usually IS its mark on the chest — and the mark is
   * carried at the neck regardless.
   */
  const art = frontArt(config);
  const artwork: { kind: 'mark'; c: Construction } | { kind: 'image'; url: string } | null =
    art
      ? { kind: 'image', url: art }
      : mark
        ? { kind: 'mark', c: mark }
        : null;

  /**
   * A photographic full-colour panel is not screen-printable. Constructions get
   * the real per-graphic gate; an image gets the honest blanket one, which says
   * the same thing the whole page says — the wide, cheap, full-colour path is
   * heat-press and only heat-press.
   */
  const printable =
    artwork?.kind === 'image'
      ? method === 'dtf'
        ? { ok: true as const }
        : {
            ok: false as const,
            why: `A full-colour graphic cannot be pulled through a ${METHOD_LABEL[method]}. Heat-press or nothing.`,
          }
      : null;

  /**
   * THE BEAT CALLED "ON THE CLOTHES" HAD NO COLOUR IN IT.
   *
   * It drew the artwork onto fixed dark plates — the same charcoal tee whatever
   * palette you had chosen — so the one screen whose job is showing the identity
   * on the range was the one screen that ignored the range's colour.
   *
   * The plates are photographs of dark garments and there is no honest way to
   * tint a near-black photograph to bone. So the garment is DRAWN here, in the
   * real colour on the real cloth, exactly as the canvas and the colour card
   * draw it. Placement, scale, perspective and the print's own softness all
   * survive; what goes is a photograph that was telling you the wrong colour.
   * The photograph lives in 05, where it is generated in this colourway.
   */
  const colourId = skus[0]?.colours[0] ?? config.palette[0] ?? config.colorway;
  const palette = paletteById(colourId);

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
                className="tap px-2.5 py-1 b-label transition-colors border-b-2"
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
        <p className="b-data" style={{ color: 'var(--era-ink-muted)' }}>
          <span title={METHOD_MEANING[method]}>{METHOD_LABEL[method]}</span> at {money(stop.budget)}
        </p>
      </div>

      {artwork ? (
        <>
          {printable && !printable.ok && (
            <p className="mb-4 b-note max-w-2xl" style={{ color: '#A8456E' }}>
              {printable.why}
            </p>
          )}
          {/* Close-up of the chosen style, with the mark placed on it. */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {GARMENTS.map((gm) => {
              const av =
                artwork.kind === 'mark'
                  ? constructionAvailable(artwork.c, method)
                  : { ok: method === 'dtf' };
              // A cap has no back and no sleeve; say so rather than drawing a
              // placement onto a garment that does not have one.
              const nA = gm.key === 'cap' && place.id !== 'chest-centre';
              const frac = fracOn(gm.key, place.inches);
              const actualIn = inchesOn(gm.key, place.inches);
              // Say when a garment cannot take the size you asked for, rather
              // than silently drawing something smaller than the label claims.
              const clamped = actualIn < place.inches;
              const fabric = fabricFor(blankFor(gm.key, tier).id);
              const cloth = onCloth(palette?.hex ?? '#2B2A28', fabric);
              const tex = clothTexture(cloth, fabric);
              return (
                <figure key={gm.key} className="min-w-0">
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ aspectRatio: gm.ratio, backgroundColor: 'var(--era-bg-deep)' }}
                  >
                    <span
                      className="absolute inset-0"
                      style={{
                        backgroundColor: cloth,
                        backgroundImage: tex.backgroundImage,
                        backgroundSize: tex.backgroundSize,
                        opacity: nA ? 0.35 : 1,
                      }}
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
                          // Screen both ways, for two different reasons. A
                          // construction is one ink knocked out of the cloth. A
                          // place graphic is generated on a pure black ground
                          // and carries no alpha channel, so screen is what
                          // removes the ground and leaves the artwork.
                          // Screen removes the artwork's black ground, and only
                          // works over a dark garment. On a pale colourway the
                          // ground has to be left alone or the artwork vanishes.
                          mixBlendMode: inkOn(cloth) === '#1A1A18' ? 'multiply' : 'screen',
                          // Ink laid on cloth does not have a razor edge, and no
                          // print is perfectly even. Both are sub-pixel at this
                          // size; both are the difference between "printed" and
                          // "pasted".
                          filter: `blur(${INK.softenPx}px) contrast(${INK.contrast})`,
                        }}
                      >
                        {artwork.kind === 'mark' ? (
                          <span style={{ ['--era-ink' as string]: inkOn(cloth) }}>
                            <Mark c={artwork.c} word={word} css={t.css} size={300 * frac} />
                          </span>
                        ) : (
                          // A kept graphic is a picture, not a glyph, so it is
                          // placed at its own aspect rather than knocked out in
                          // one ink. The sign lettering rides along with it.
                          <span className="relative block w-full" style={{ aspectRatio: '1' }}>
                            {/* Lettering belongs to the SIGN register only. It
                                was being stamped onto every kept image, so
                                keeping a joke graphic after a sign drew highway
                                type across the joke — with no visible control to
                                remove it, because the composer only appears for
                                signs. */}
                            <SignArtwork
                              url={artwork.url}
                              text={config.register === 'sign' ? config.signText : ''}
                              size={config.signSize}
                              y={config.signY}
                              width={300 * frac}
                            />
                          </span>
                        )}
                      </span>
                    )}

                    {/* THE HOUSE MARK AT THE NECK. Small, always there when a
                        graphic has taken the front, because that is the thing
                        making a range read as one brand rather than a pile of
                        unrelated prints. */}
                    {!nA && artwork?.kind === 'image' && mark && gm.key !== 'cap' && (
                      <span
                        className="absolute flex items-center justify-center"
                        style={{
                          left: '50%',
                          top: '13%',
                          transform: 'translate(-50%, -50%)',
                          width: '9%',
                          opacity: 0.75,
                          mixBlendMode: inkOn(cloth) === '#1A1A18' ? 'multiply' : 'screen',
                        }}
                        title="The house mark, at the neck"
                      >
                        <span style={{ ['--era-ink' as string]: inkOn(cloth) }}>
                          <Mark c={mark} word={word} css={t.css} size={26} />
                        </span>
                      </span>
                    )}
                    {nA && (
                      <span
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <span
                          className="px-2 py-1 b-label"
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
                    <span className="b-note block" style={{ color: 'var(--era-ink)' }}>
                      {gm.label}
                    </span>
                    <span className="b-data" style={{ color: 'var(--era-ink-muted)' }}>
                      {/* One scheme for every cell, and the tier is back in it.
                          Printing only the size meant beat 04 no longer reflected
                          the budget at all: at the stitched tier the tee's
                          treatment is "2in embroidered mark" and the caption
                          said "10in chest". */}
                      <>
                        {nA ? (
                          `no ${place.label.toLowerCase()}`
                        ) : (
                          <>
                            {actualIn}in{' '}
                            {gm.key === 'cap' ? 'front panel' : place.label.toLowerCase()}
                            {clamped && (
                              <span style={{ color: 'var(--accent)' }}>
                                {' '}
                                — {place.inches}in will not fit
                              </span>
                            )}
                          </>
                        )}
                        <span style={{ opacity: 0.7 }}> · {stop.treatment[gm.key]}</span>
                      </>
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>


          {/* Both paragraphs here used to point at a renderer "below". The render
              moved to beat 05 when this beat was split, so they were directing
              you at something that is not on the screen. */}
          <p className="mt-3 b-note max-w-2xl" style={{ color: 'var(--era-ink-muted)' }}>
            <strong style={{ color: 'var(--era-ink)' }}>Placement mocks, not renders.</strong>{' '}
            Position and size are accurate; the mark is layered flat and does not take the light.
            For a photograph, go to{' '}
            <strong style={{ color: 'var(--era-ink)' }}>05</strong>.
          </p>
        </>
      ) : (
        <p className="b-body py-8" style={{ color: 'var(--accent)' }}>
          {config.strategy === 'scale'
            ? 'Keep a place graphic in 02 and it appears here.'
            : 'Pick a mark in 02 and it appears here.'}
        </p>
      )}
    </div>
  );
}
