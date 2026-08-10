/**
 * Graphics from a prompt — the part of a line that is not the identity.
 *
 * The mark family is built from the name and is deliberately disciplined. That
 * is right for a mark and wrong for everything else a line puts on a garment: a
 * seasonal joke, a tour-style back print, something silly that has nothing to do
 * with the wordmark. Those come from a description, not from the letters in the
 * brand name, and no amount of construction geometry produces one.
 *
 * Six per round, each pushed a different way — bold, technical, hand-drawn,
 * blocky, sparse, dense — so a round is a spread rather than six attempts at the
 * same image. Keep one and it becomes the artwork the applied views carry.
 *
 * Spends. Six renders a round, cached per prompt and angle, so re-running the
 * same words is free and changing one word is a new round.
 */

'use client';

import { useCallback, useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { useLine } from '@/lib/blank/lineState';
import { PinButton, PinShelf } from './Pins';

type Tile = { url?: string; error?: string; busy?: boolean };

const EXAMPLES = [
  'a dog wearing sunglasses, drawn badly on purpose',
  'a cross-section diagram of a sandwich, exploded like an engine',
  'a very serious flaming skull, but the flames are little hearts',
];

export function GraphicBakeoff() {
  const { config, set } = useLine();
  const [prompt, setPrompt] = useState('');
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [running, setRunning] = useState(false);

  const run = useCallback(async () => {
    const text = prompt.trim();
    if (text.length < 3) return;
    setTiles(Array.from({ length: 6 }, () => ({ busy: true })));
    setRunning(true);
    await Promise.all(
      Array.from({ length: 6 }, async (_, i) => {
        try {
          const res = await fetch('/api/blank/bakeoff', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ kind: 'graphic', prompt: text, variant: i }),
          });
          const data = await res.json();
          setTiles((prev) =>
            prev.map((tile, n) =>
              n === i
                ? { busy: false, url: res.ok ? data.imageUrl : undefined, error: res.ok ? undefined : data.error }
                : tile,
            ),
          );
        } catch {
          setTiles((prev) => prev.map((tile, n) => (n === i ? { busy: false, error: 'Network error' } : tile)));
        }
      }),
    );
    setRunning(false);
  }, [prompt]);

  return (
    <div className="my-2">
      <p className="text-[13px] mb-3 max-w-2xl" style={{ color: 'var(--era-ink-muted)' }}>
        Describe a graphic and get six takes. Keep one and the applied views carry it.
      </p>

      <div className="flex flex-wrap items-end gap-3 mb-3">
        <label className="min-w-0 flex-1" style={{ minWidth: '18rem' }}>
          <span
            className="block text-[10px] font-mono uppercase tracking-[0.2em] mb-1.5"
            style={{ color: 'var(--era-ink-muted)' }}
          >
            The graphic
          </span>
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value.slice(0, 240))}
            placeholder={EXAMPLES[0]}
            className="w-full min-w-0 px-3 py-2 text-[13px] bg-transparent border outline-none focus:border-[var(--accent)]"
            style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)' }}
          />
        </label>
        <button
          onClick={run}
          disabled={running || prompt.trim().length < 3}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-[11px] font-mono uppercase tracking-wider border transition-colors disabled:opacity-40"
          style={{ borderColor: 'var(--accent)', color: 'var(--accent)', minHeight: 0 }}
        >
          {running ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
          {running ? 'Rendering six…' : 'Bake off six'}
        </button>
      </div>

      <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4">
        {EXAMPLES.map((e) => (
          <button
            key={e}
            onClick={() => setPrompt(e)}
            className="tap text-[12px] sm:text-[11px] underline"
            style={{ color: 'var(--era-ink-muted)', minHeight: 0 }}
          >
            {e}
          </button>
        ))}
      </div>

      {tiles.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5">
          {tiles.map((tile, i) => {
            const on = config.customGraphic === tile.url && !!tile.url;
            return (
              // The pin is its own button, so the tile CANNOT be one — a button
              // inside a button is invalid HTML and the inner one stops being
              // reachable. Outer div, inner select button, pin on top.
              <div
                key={i}
                className="relative w-full aspect-square overflow-hidden"
                style={{
                  backgroundColor: 'var(--era-bg-deep)',
                  outline: on ? '2px solid var(--accent)' : 'none',
                  outlineOffset: '2px',
                }}
              >
                {tile.url && <PinButton url={tile.url} />}
                {tile.url ? (
                  <button
                    onClick={() => set('customGraphic', tile.url!)}
                    aria-pressed={on}
                    aria-label={`Use take ${i + 1}`}
                    className="absolute inset-0 w-full h-full"
                    style={{ minHeight: 0, padding: 0 }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={tile.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center">
                    {tile.busy ? (
                      <Loader2 className="w-4 h-4 animate-spin" style={{ color: 'var(--era-ink-muted)' }} />
                    ) : (
                      <span className="text-[9px] font-mono px-1 text-center" style={{ color: '#A8456E' }}>
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

      {config.customGraphic && (
        <p className="mt-3 text-[12px]" style={{ color: 'var(--accent)' }}>
          Kept — the applied views carry it.
        </p>
      )}
    </div>
  );
}
