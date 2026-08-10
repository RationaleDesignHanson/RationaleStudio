/**
 * The catalogue engine — artwork for one place, in one of three voices.
 *
 * The considered line has ONE mark, derived from the name, and beat 02 builds
 * it. The catalogue business does not work like that: its product is breadth,
 * a shirt per rest stop and per exit and per town, and the thing being designed
 * is not a mark but a FORMAT that can be run a hundred times without a human
 * inventing each one.
 *
 * So the place is the variable and the register is the editorial voice:
 *
 *   The sign  — the road furniture itself. Reproduce what is already at the
 *               roadside, straight.
 *   The joke  — the cliché everyone from there is sick of, played straight-faced.
 *   The song  — what was written about the place. There is a whole canon of
 *               turnpike songs and it is doing the same job a cliché does.
 *
 * WHAT THIS DOES NOT GENERATE: the words. Image models cannot spell, which is
 * why every wordmark in this tool is set in real type rather than rendered by a
 * model, and it matters far more here than it does for a single logo — a
 * misspelling you would catch once is a misspelling you would ship ninety-nine
 * times in a hundred-place catalogue. A generated sign panel comes back blank on
 * purpose and the place name gets set into it in type afterwards.
 */

'use client';

import { useCallback, useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { useLine } from '@/lib/blank/lineState';
import { PinButton, PinShelf } from './Pins';
import { SignComposer } from './SignArtwork';

type Tile = { url?: string; error?: string; busy?: boolean };

const REGISTERS = [
  {
    id: 'sign',
    label: 'The sign',
    hint: 'The road furniture itself, straight. Comes back blank — the words get set in type.',
  },
  {
    id: 'pun',
    label: 'The joke',
    hint: 'The cliché everyone from there is tired of, played straight-faced.',
  },
  {
    id: 'song',
    label: 'The song',
    hint: 'What was written about the place. Headlights, refineries, leaving.',
  },
] as const;

const EXAMPLES = ['Molly Pitcher, NJ', 'Exit 9, New Brunswick', 'Asbury Park', 'The Pine Barrens'];

export function PlaceGraphics() {
  const { config, set } = useLine();
  const place = config.place;
  const setPlace = (v: string) => set('place', v);
  const register = config.register;
  const setRegister = (v: string) => set('register', v);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [running, setRunning] = useState(false);

  const run = useCallback(async () => {
    const name = place.trim();
    if (name.length < 2) return;
    setTiles(Array.from({ length: 6 }, () => ({ busy: true })));
    setRunning(true);
    await Promise.all(
      Array.from({ length: 6 }, async (_, i) => {
        try {
          const res = await fetch('/api/blank/bakeoff', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ kind: 'place', place: name, register, variant: i }),
          });
          const data = await res.json();
          setTiles((prev) =>
            prev.map((t, n) =>
              n === i
                ? { busy: false, url: res.ok ? data.imageUrl : undefined, error: res.ok ? undefined : data.error }
                : t,
            ),
          );
        } catch {
          setTiles((prev) => prev.map((t, n) => (n === i ? { busy: false, error: 'Network error' } : t)));
        }
      }),
    );
    setRunning(false);
  }, [place, register]);

  const active = REGISTERS.find((r) => r.id === register) ?? REGISTERS[0];

  return (
    <div className="my-2">
      <p className="text-[13px] mb-4 max-w-2xl" style={{ color: 'var(--era-ink-muted)' }}>
        One place, one voice, six takes. This is the format you are designing, not a single graphic —
        whatever works here has to survive being run{' '}
        <strong style={{ color: 'var(--era-ink)' }}>{config.designs}</strong> times.
      </p>

      <div className="flex flex-wrap items-end gap-3 mb-3">
        <label className="min-w-0 flex-1" style={{ minWidth: '16rem' }}>
          <span
            className="block text-[11px] sm:text-[10px] font-mono uppercase tracking-[0.2em] mb-1.5"
            style={{ color: 'var(--era-ink-muted)' }}
          >
            The place
          </span>
          <input
            value={place}
            onChange={(e) => setPlace(e.target.value.slice(0, 120))}
            placeholder={EXAMPLES[0]}
            size={1}
            className="w-full min-w-0 px-3 py-2 text-[13px] bg-transparent border outline-none focus:border-[var(--accent)]"
            style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)' }}
          />
        </label>
        <button
          onClick={run}
          disabled={running || place.trim().length < 2}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-[12px] sm:text-[11px] font-mono uppercase tracking-wider border transition-colors disabled:opacity-40"
          style={{ borderColor: 'var(--accent)', color: 'var(--accent)', minHeight: 0 }}
        >
          {running ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
          {running ? 'Rendering six…' : 'Bake off six'}
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-1.5">
        {REGISTERS.map((r) => {
          const on = r.id === register;
          return (
            <button
              key={r.id}
              onClick={() => setRegister(r.id)}
              aria-pressed={on}
              className="tap px-2.5 py-1 text-[12px] sm:text-[11px] font-mono uppercase tracking-wider transition-colors border-b-2"
              style={{
                borderColor: on ? 'var(--accent)' : 'transparent',
                color: on ? 'var(--accent)' : 'var(--era-ink-muted)',
                minHeight: 0,
              }}
            >
              {r.label}
            </button>
          );
        })}
      </div>
      <p className="text-[12px] mb-4 max-w-2xl" style={{ color: 'var(--era-ink-muted)' }}>
        {active.hint}
      </p>

      <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4">
        {EXAMPLES.map((e) => (
          <button
            key={e}
            onClick={() => setPlace(e)}
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
            const on = !!tile.url && config.customGraphic === tile.url;
            return (
            // The pin is its own button, so the tile cannot also be one.
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
                  aria-label={`Use ${active.label.toLowerCase()}, take ${i + 1}`}
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
                    <span className="text-[10px] font-mono px-1 text-center" style={{ color: '#A8456E' }}>
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

      {/* The panel came back blank on purpose; this is where it gets its words. */}
      {config.customGraphic && register === 'sign' && <SignComposer url={config.customGraphic} />}

      {config.customGraphic && register !== 'sign' && (
        <p className="mt-3 text-[12px]" style={{ color: 'var(--accent)' }}>
          Kept. This is the artwork the applied views carry.
        </p>
      )}

      <PinShelf />
    </div>
  );
}
