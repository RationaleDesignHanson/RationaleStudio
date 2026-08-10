/**
 * The kept artwork, flattened to a data URL, with the sign lettering baked in.
 *
 * WHY THIS HAS TO EXIST. The sign register generates a deliberately BLANK panel
 * because image models cannot spell, and the words are then set over it in live
 * type. That works everywhere the browser is doing the drawing — the picker, the
 * composer, the applied mocks — because the type is a DOM node sitting on top of
 * an image.
 *
 * It does not work the moment the artwork has to leave the browser. Both render
 * paths send the artwork to a model as a single image: the colour round, so six
 * colourways carry the same graphic, and the deviation render, which is the one
 * place in the tool that pays real money for a photograph of the finished thing.
 * Both were sending the raw panel, so a user who typed MOLLY PITCHER / NJ, saw it
 * set correctly in beat 02 and again in beat 04, then bought the render and got a
 * shirt with an EMPTY GREEN SIGN on it.
 *
 * So the composite is done here, on a canvas, and the flattened result is what
 * gets sent. Same geometry as SignArtwork — cap height as a percent of width,
 * centre at a percent of height — so the preview and the render agree.
 */

import { signLines } from '@/app/(public)/work/blank/SignArtwork';

/** Matches the stack SignArtwork renders with, so the preview is honest. */
const FACE = '600 {px}px ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif';

/**
 * Fetch `url`, draw `text` into it, return a data URL.
 *
 * Goes via a blob rather than setting `img.src = url` so the canvas is never
 * tainted by a cross-origin read — Storage is a different host, and a tainted
 * canvas throws on toDataURL rather than failing visibly.
 *
 * Returns null rather than throwing: every caller has a "could not prepare the
 * artwork" path already, and a failed composite must not spend a render.
 */
export async function artworkDataUrl(
  url: string,
  text: string,
  sizePct: number,
  yPct: number,
): Promise<string | null> {
  if (typeof document === 'undefined') return null;
  let objectUrl: string | null = null;
  try {
    const blob = await (await fetch(url)).blob();
    objectUrl = URL.createObjectURL(blob);
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error('image load failed'));
      el.src = objectUrl!;
    });

    const w = img.naturalWidth || 1024;
    const h = img.naturalHeight || 1024;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0, w, h);

    const lines = signLines(text);
    if (lines.length > 0) {
      const px = (w * sizePct) / 100;
      ctx.font = FACE.replace('{px}', String(px));
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#FFFFFF';
      // The same soft dark edge the DOM version gets from its text-shadow —
      // without it white lettering dissolves into a bright panel.
      ctx.shadowColor = 'rgba(0,0,0,0.45)';
      ctx.shadowBlur = px * 0.08;
      ctx.shadowOffsetY = px * 0.02;
      const lineHeight = px * 1.05;
      const centre = (h * yPct) / 100;
      const start = centre - ((lines.length - 1) * lineHeight) / 2;
      lines.forEach((l, i) => {
        ctx.fillText(l.toUpperCase(), w / 2, start + i * lineHeight);
      });
    }

    return canvas.toDataURL('image/jpeg', 0.92);
  } catch {
    return null;
  } finally {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
  }
}
