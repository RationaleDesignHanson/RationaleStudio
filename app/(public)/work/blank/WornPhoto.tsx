/**
 * See it worn — the one place a person is wanted.
 *
 * People are kept out of every other route on purpose. A model wandering into a
 * flat-lay is unusable, and that is a rights problem rather than a taste one, so
 * the garment scenes, the racks and the place graphics all exclude them at the
 * subject level rather than with a trailing "no person" that models ignore.
 *
 * A photograph of someone actually wearing the thing is a different object. It
 * is what a lookbook is made of and what a paid ad needs, and it belongs at the
 * end, once the line exists. So it is asked for explicitly, once, and never
 * arrives by accident.
 *
 * It spends. One render per press, and the artwork is composited first so the
 * lettering on a sign panel survives the trip — the same flattening the colour
 * round and the deviation render use.
 */

'use client';

import { useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { useLine } from '@/lib/blank/lineState';
import { artworkDataUrl } from '@/lib/blank/signComposite';
import { rasteriseMark, readFont } from '@/lib/blank/rasterise';
import { ALL_TREATMENTS, normalise } from '@/lib/blank/wordmark';
import { constructionsFor, randomConstructions } from '@/lib/blank/markFamily';
import { PinButton } from './Pins';

export function WornPhoto({ probeRef }: { probeRef: React.RefObject<HTMLSpanElement | null> }) {
  const { config, skus } = useLine();
  const [url, setUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const garment = skus[0]?.garment ?? 'tee';
  const colour = skus[0]?.colours[0] ?? config.palette[0] ?? 'faded-charcoal';
  const word = normalise(config.wordmark);

  const run = async () => {
    setBusy(true);
    setError(null);
    try {
      let image: string | null = null;
      if (config.customGraphic) {
        image = await artworkDataUrl(
          config.customGraphic,
          config.register === 'sign' ? config.signText : '',
          config.signSize,
          config.signY,
        );
      } else if (probeRef.current) {
        const seed = Number(config.markSeed);
        const pool =
          config.markSeed !== '' && Number.isFinite(seed)
            ? randomConstructions(word, seed)
            : constructionsFor(word);
        const mark = pool.find((c) => c.id === config.mark);
        if (mark) image = rasteriseMark(mark, word, readFont(probeRef.current));
      }
      if (!image) {
        setError('Pick artwork first.');
        return;
      }
      const res = await fetch('/api/blank/bakeoff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: 'lifestyle', garment, palette: colour, image, variant: 0 }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? 'Render failed.');
      else setUrl(data.imageUrl);
    } catch {
      setError('Network error.');
    } finally {
      setBusy(false);
    }
  };

  const t = ALL_TREATMENTS.find((x) => x.id === config.wordmarkStyle) ?? ALL_TREATMENTS[0];

  return (
    <div>
      {/* The probe the rasteriser measures the live font from. */}
      <span
        ref={probeRef}
        aria-hidden
        className="opacity-0 pointer-events-none absolute"
        style={{ ...t.css, left: -9999 }}
      >
        {word || 'BLANK'}
      </span>

      <button
        onClick={run}
        disabled={busy}
        className="inline-flex items-center gap-1.5 px-3 py-2 text-[12px] sm:text-[11px] font-mono uppercase tracking-wider border transition-colors disabled:opacity-40"
        style={{ borderColor: 'var(--accent)', color: 'var(--accent)', minHeight: 0 }}
      >
        {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
        {busy ? 'Rendering…' : 'See it worn'}
      </button>
      <span className="ml-3 text-[12px] sm:text-[11px]" style={{ color: 'var(--era-ink-muted)' }}>
        One render. The only image here with a person in it.
      </span>

      {error && (
        <p className="mt-2 text-[12px]" style={{ color: '#A8456E' }}>
          {error}
        </p>
      )}

      {url && (
        <figure className="mt-4 m-0" style={{ maxWidth: 320 }}>
          <div className="relative w-full aspect-[3/4] overflow-hidden" style={{ backgroundColor: 'var(--era-bg-deep)' }}>
            <PinButton url={url} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="The garment worn" className="w-full h-full object-cover" />
          </div>
          <figcaption className="mt-1.5 text-[11px] sm:text-[10px] font-mono" style={{ color: 'var(--era-ink-muted)' }}>
            Generated. Not a photograph of a person who exists.
          </figcaption>
        </figure>
      )}
    </div>
  );
}
