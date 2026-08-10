/**
 * Draw a mark construction to a PNG data URL, so it can be sent to a model.
 *
 * WHY THIS EXISTS. The applied view layers a CSS-drawn mark over a photograph of
 * a garment. That is a PLACEMENT MOCK — it shows position and relative size
 * honestly, and it is instant and free — but it is not a render: the glyph sits
 * flat on top, it does not follow the fold of the cloth, take the light, or sink
 * into the weave. Calling it a preview of the printed garment would be a lie.
 *
 * The real thing already exists in this codebase: /api/blank/apply-reference
 * takes ARTWORK AS AN IMAGE and puts it on a garment with Seedream, which is how
 * the six stock marks were expanded. It needs a raster, and a construction is
 * DOM. This bridges the two.
 *
 * Drawn with canvas primitives rather than serialising the DOM into an SVG
 * foreignObject: that technique does not load web fonts, so every mark would come
 * out in a fallback face and stop matching the wordmark — which is the one
 * property the whole family depends on.
 */

import type { Construction } from './markFamily';
import { lettersFor } from './markFamily';

export interface RasterOptions {
  /** Resolved font shorthand parts, read from a live element so the treatment's
      actual face, weight and size are used rather than guessed. */
  fontFamily: string;
  fontWeight: string | number;
  letterSpacing?: string;
  size?: number;
}

/**
 * The whole word, set in its treatment, as a wide image.
 *
 * `rasteriseMark` draws a monogram into a square, which is right for a mark and
 * wrong for a wordmark — a word set at 1024 square is either tiny or clipped.
 * This is the same trick at a word's proportions, and it exists so the wordmark
 * can be REDRAWN rather than generated.
 *
 * That distinction is the whole answer to "are there good text models". Asking a
 * model to spell BLANK is unreliable and always will be — it is why the sign
 * panels come back deliberately empty. Handing it a picture of the word already
 * correctly spelled and asking it to redraw the letterforms is a different job:
 * it is copying shapes, not spelling, and it is the one thing image models do
 * well with type. The mark family has worked this way for weeks.
 */
export function rasteriseWord(
  word: string,
  opts: RasterOptions,
): string | null {
  if (typeof document === 'undefined') return null;
  const W = 1536;
  const H = 512;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#111111';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Fit to the box rather than trusting a size: a long word at wide tracking
  // runs off the canvas, and a clipped reference gets redrawn clipped.
  let px = Math.floor(H * 0.62);
  const family = opts.fontFamily ?? 'sans-serif';
  const weight = opts.fontWeight ?? '700';
  for (; px > 12; px -= 4) {
    ctx.font = `${weight} ${px}px ${family}`;
    if (ctx.measureText(word).width <= W * 0.86) break;
  }
  ctx.fillText(word, W / 2, H / 2);
  return canvas.toDataURL('image/png');
}

/**
 * Black ink on white, matching the M-* artwork the reference pipeline was built
 * against — Seedream is being asked to reproduce artwork, and artwork is a
 * two-value image on a light ground.
 */
export function rasteriseMark(
  c: Construction,
  word: string,
  opts: RasterOptions,
): string | null {
  if (typeof document === 'undefined') return null;
  const S = opts.size ?? 1024;
  const canvas = document.createElement('canvas');
  canvas.width = S;
  canvas.height = S;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, S, S);

  const ink = '#111111';
  const enclosed = c.enclosure !== 'none';
  const filled = c.enclosure === 'square' || c.enclosure === 'shield';
  const letters = lettersFor(word, c);

  const cx = S / 2;
  const cy = S / 2;
  const box = S * 0.62;
  const stroke = Math.max(6, S * 0.035);

  ctx.save();
  if (c.enclosure === 'circle') {
    ctx.beginPath();
    if (c.notched) {
      // A wedge left open at the upper right, matching the CSS mask.
      ctx.arc(cx, cy, box / 2, -Math.PI / 2 + 0.6, -Math.PI / 2 + Math.PI * 2 - 0.02);
    } else {
      ctx.arc(cx, cy, box / 2, 0, Math.PI * 2);
    }
    ctx.strokeStyle = ink;
    ctx.lineWidth = stroke;
    ctx.stroke();
  } else if (c.enclosure === 'square') {
    ctx.fillStyle = ink;
    ctx.fillRect(cx - box / 2, cy - box / 2, box, box);
  } else if (c.enclosure === 'shield') {
    ctx.fillStyle = ink;
    ctx.beginPath();
    const l = cx - box / 2;
    const r = cx + box / 2;
    const t = cy - box / 2;
    const b = cy + box / 2;
    const shoulder = t + box * 0.62;
    ctx.moveTo(l, t);
    ctx.lineTo(r, t);
    ctx.lineTo(r, shoulder);
    ctx.lineTo(cx, b);
    ctx.lineTo(l, shoulder);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  // Letters. Knocked out of filled enclosures, inked otherwise.
  const glyphSize = enclosed ? S * 0.26 : S * 0.42;
  ctx.fillStyle = filled ? '#ffffff' : ink;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `${opts.fontWeight} ${glyphSize}px ${opts.fontFamily}`;
  // letterSpacing is Chrome 99+/Safari 26+; harmless where unsupported.
  if (opts.letterSpacing) {
    (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing =
      opts.letterSpacing;
  }

  if (c.stacked) {
    const chars = letters.split('');
    const lh = glyphSize * 0.86;
    const top = cy - ((chars.length - 1) * lh) / 2;
    chars.forEach((ch, i) => ctx.fillText(ch, cx, top + i * lh));
  } else if (c.mirrored) {
    const w = ctx.measureText(letters[0]).width;
    ctx.fillText(letters[0], cx - w / 2, cy);
    ctx.save();
    ctx.translate(cx + w / 2, cy);
    ctx.scale(-1, 1);
    ctx.fillText(letters[0], 0, 0);
    ctx.restore();
  } else if (c.overlap) {
    const a = letters[0];
    const bb = letters[1] ?? letters[0];
    const w = ctx.measureText(a).width;
    ctx.fillText(a, cx - w * 0.28, cy);
    ctx.fillText(bb, cx + w * 0.28, cy);
  } else {
    ctx.fillText(letters, cx, cy);
  }

  return canvas.toDataURL('image/png');
}

/** Read the treatment's resolved type off a live node, so canvas matches CSS. */
export function readFont(el: HTMLElement): RasterOptions {
  const cs = getComputedStyle(el);
  return {
    fontFamily: cs.fontFamily,
    fontWeight: cs.fontWeight,
    letterSpacing: cs.letterSpacing !== 'normal' ? cs.letterSpacing : undefined,
  };
}
