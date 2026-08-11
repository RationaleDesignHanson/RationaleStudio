/**
 * The whole line in one frame.
 *
 * This is the only view in the tool that is about the RANGE rather than a
 * garment, and it is the highest-context thing it can produce. 04 draws
 * placement style by style; 07 puts one piece on a person. Neither answers the
 * question a line actually has to survive — does this hang together — because
 * that question needs every style, in its real colourways, carrying the real
 * artwork, in one shot under one light.
 *
 * It replaced a single-garment render that sat here doing a job 04 already does
 * for free and 07 does better with a person in it. Three ways to look at one
 * garment and no way to look at the line was the wrong split.
 *
 * The rack is built from the ACTUAL SKUs. A generic four garments would be a
 * stock photo with your artwork on it; describing what was specced is the whole
 * point of putting it at the end.
 */

'use client';

import { useRef, useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { useLine, frontArt } from '@/lib/blank/lineState';
import { GARMENTS, blankFor, tierIndex } from '@/lib/blank/line';
import { paletteById } from '@/lib/blank/palettes';
import { artworkDataUrl } from '@/lib/blank/signComposite';
import { rasteriseMark, readFont } from '@/lib/blank/rasterise';
import { ALL_TREATMENTS, normalise } from '@/lib/blank/wordmark';
import { constructionsFor, randomConstructions } from '@/lib/blank/markFamily';
import { DIRECTIONS } from './BrandBakeoff';
import { PinButton } from './Pins';

export function Lookbook() {
  const { config, skus } = useLine();
  const [url, setUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const probeRef = useRef<HTMLSpanElement>(null);

  const word = normalise(config.wordmark);
  const t = ALL_TREATMENTS.find((x) => x.id === config.wordmarkStyle) ?? ALL_TREATMENTS[0];
  const direction = DIRECTIONS.find((d) => d.key === config.direction);

  /** One phrase per garment-and-colourway, from what is actually specced. */
  const pieces = skus.flatMap((s) => {
    const label = GARMENTS.find((g) => g.key === s.garment)?.label.toLowerCase() ?? s.garment;
    const blank = blankFor(s.garment, tierIndex(s.tier));
    return s.colours.map((c) => {
      const pal = paletteById(c);
      return `a ${pal ? pal.name.toLowerCase() : ''} ${label}`.replace(/\s+/g, ' ').trim();
    }).slice(0, 4).map((x) => `${x} (${blank.name.split(' ').slice(0, 2).join(' ')})`);
  });

  const run = async () => {
    setBusy(true);
    setError(null);
    try {
      let image: string | null = null;
      const art = frontArt(config);
      if (art) {
        image = await artworkDataUrl(
          art,
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
        body: JSON.stringify({
          kind: 'lookbook',
          image,
          pieces,
          aesthetic: direction ? `${direction.label}. ${direction.thesis}` : '',
          direction: config.artDirection,
          variant: 0,
        }),
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

  return (
    <section>
      <span
        ref={probeRef}
        aria-hidden
        className="opacity-0 pointer-events-none absolute"
        style={{ ...t.css, left: -9999 }}
      >
        {word || 'BLANK'}
      </span>

      <h3
        className="b-label pb-2 mb-3 border-b"
        style={{ color: 'var(--era-ink)', borderColor: 'var(--era-hairline)' }}
      >
        The lookbook
      </h3>

      {pieces.length === 0 ? (
        <p className="b-body" style={{ color: 'var(--accent)' }}>
          Tick some styles in the costs section and the line can be shot here.
        </p>
      ) : (
        <>
          <p className="b-body mb-3 max-w-2xl" style={{ color: 'var(--era-ink-body)' }}>
            {pieces.length} {pieces.length === 1 ? 'piece' : 'pieces'} in one frame
            {direction ? `, ${direction.label.toLowerCase()}` : ''}. The only view that shows whether
            the range hangs together.
          </p>
          <button
            onClick={run}
            disabled={busy}
            className="inline-flex items-center gap-1.5 px-3 py-2 b-label border transition-colors disabled:opacity-40"
            style={{ borderColor: 'var(--accent)', color: 'var(--accent)', minHeight: 0 }}
          >
            {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
            {busy ? 'Shooting the line…' : 'Shoot the line'}
          </button>
          <span className="ml-3 b-note" style={{ color: 'var(--era-ink-muted)' }}>
            One render.
          </span>
        </>
      )}

      {error && (
        <p className="mt-2 b-note" style={{ color: '#A8456E' }}>
          {error}
        </p>
      )}

      {url && (
        <figure className="mt-4 m-0">
          <div className="relative w-full aspect-[4/3] overflow-hidden" style={{ backgroundColor: 'var(--era-bg-deep)' }}>
            <PinButton url={url} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="The line" className="w-full h-full object-cover" />
          </div>
          <figcaption className="mt-1.5 b-note" style={{ color: 'var(--era-ink-muted)' }}>
            Generated. Not a photograph of garments that exist.
          </figcaption>
        </figure>
      )}
    </section>
  );
}
