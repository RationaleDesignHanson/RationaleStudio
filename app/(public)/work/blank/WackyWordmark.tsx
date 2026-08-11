/**
 * Get wacky with the word.
 *
 * ARE THERE GOOD TEXT MODELS? Not for spelling, and there probably never will
 * be — it is why the sign panels in the catalogue come back deliberately empty
 * and the words get set in type afterwards. Ask a model for the word BLANK and
 * you will get BLAKN often enough to have to check every tile, which at six
 * tiles a round is a proofreading job rather than a design one.
 *
 * But that is not the only thing you can ask. Hand it a picture of the word,
 * already set correctly in real type, and ask it to REDRAW the letterforms —
 * and it is copying shapes rather than spelling. That works, it has worked in
 * the mark family for weeks, and it is what this does.
 *
 * The six pushes are deliberately further out than the mark's. The twelve CSS
 * treatments already cover sober — grotesque, serif, mono, condensed — so a
 * generative option that returned a slightly different grotesque would be six
 * renders for nothing. These are the things type in a browser cannot do:
 * chrome, torn paper, a loaded brush, extrusion, melting, chain stitch.
 *
 * Spelling is still not guaranteed. It is much better from a reference than
 * from a prompt, and the caption says to check it.
 */

'use client';

import { useRef, useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { useLine } from '@/lib/blank/lineState';
import { ALL_TREATMENTS, normalise } from '@/lib/blank/wordmark';
import { rasteriseWord, readFont } from '@/lib/blank/rasterise';
import { PinButton, PinShelf } from './Pins';

type Tile = { url?: string; error?: string; busy?: boolean };

export function WackyWordmark() {
  const { config, set } = useLine();
  const word = normalise(config.wordmark) || 'BLANK';
  const t = ALL_TREATMENTS.find((x) => x.id === config.wordmarkStyle) ?? ALL_TREATMENTS[0];
  const probeRef = useRef<HTMLSpanElement>(null);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [running, setRunning] = useState(false);

  const run = async () => {
    if (!probeRef.current) return;
    const image = rasteriseWord(word, readFont(probeRef.current));
    if (!image) return;
    setTiles(Array.from({ length: 6 }, () => ({ busy: true })));
    setRunning(true);
    await Promise.all(
      Array.from({ length: 6 }, async (_, i) => {
        try {
          const res = await fetch('/api/blank/bakeoff', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              kind: 'wordmark',
              image,
              variant: i,
              direction: config.artDirection,
            }),
          });
          const data = await res.json();
          setTiles((prev) =>
            prev.map((x, n) =>
              n === i
                ? { busy: false, url: res.ok ? data.imageUrl : undefined, error: res.ok ? undefined : data.error }
                : x,
            ),
          );
        } catch {
          setTiles((prev) => prev.map((x, n) => (n === i ? { busy: false, error: 'Network error' } : x)));
        }
      }),
    );
    setRunning(false);
  };

  return (
    <div className="my-2">
      {/* The probe the rasteriser measures the resolved webfont from. */}
      <span
        ref={probeRef}
        aria-hidden
        className="opacity-0 pointer-events-none absolute"
        style={{ ...t.css, left: -9999 }}
      >
        {word}
      </span>

      <div className="flex flex-wrap items-center gap-3 mb-3">
        <button
          onClick={run}
          disabled={running}
          className="inline-flex items-center gap-1.5 px-3 py-2 b-label border transition-colors disabled:opacity-40"
          style={{ borderColor: 'var(--accent)', color: 'var(--accent)', minHeight: 0 }}
        >
          {running ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
          {running ? 'Drawing six…' : 'Draw it six ways'}
        </button>
        <span className="b-note" style={{ color: 'var(--era-ink-muted)' }}>
          Redrawn from the type, not spelled by the model. Check the spelling anyway.
        </span>
      </div>

      {tiles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tiles.map((tile, i) => {
            const on = !!tile.url && config.customGraphic === tile.url;
            return (
              <div
                key={i}
                className="relative w-full aspect-[3/1] overflow-hidden"
                style={{
                  backgroundColor: 'var(--era-bg-deep)',
                  outline: on ? '2px solid var(--accent)' : 'none',
                  outlineOffset: 2,
                }}
              >
                {tile.url && <PinButton url={tile.url} />}
                {tile.url ? (
                  <button
                    onClick={() => set('customGraphic', tile.url!)}
                    aria-pressed={on}
                    aria-label={`Use wordmark ${i + 1}`}
                    className="absolute inset-0 w-full h-full"
                    style={{ minHeight: 0, padding: 0 }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={tile.url} alt="" className="w-full h-full object-contain" />
                  </button>
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center">
                    {tile.busy ? (
                      <Loader2 className="w-4 h-4 animate-spin" style={{ color: 'var(--era-ink-muted)' }} />
                    ) : (
                      <span className="b-note font-mono px-1 text-center" style={{ color: '#A8456E' }}>
                        {tile.error ?? '—'}
                      </span>
                    )}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      <PinShelf />
    </div>
  );
}
