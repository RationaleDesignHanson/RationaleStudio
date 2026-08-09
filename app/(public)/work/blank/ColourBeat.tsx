/**
 * The colour beat — a palette bake-off.
 *
 * Colour was the biggest hole in the tool. Five colourways existed in the model
 * and there was exactly ONE place in the entire interface to choose one: a
 * dropdown buried in the deviation renderer. You could not set a colour on the
 * identity, the marks, the applied garments or the line, and you could not add
 * one. For a clothing line, that is not a missing control, it is a missing
 * decision.
 *
 * It is a bake-off because that is the mechanic: generate several, compare, keep
 * one, iterate. Six colourways of the SAME garment carrying the SAME mark, so
 * colour is the only variable and the comparison means something — the same
 * discipline as "one fixed seed across all eighteen cells" in the direction rack.
 *
 * Each tile carries its production cost, because colour is where a small line
 * quietly gets expensive: Stage 0 allows two colourways per style, garment dye
 * means a shade band rather than a Pantone, and a true black or a saturated shade
 * is a custom dye lot at 800-1,000m — roughly 300-500 garments in one colour.
 */

'use client';

import { useCallback, useRef, useState } from 'react';
import { Loader2, Shuffle, Sparkles } from 'lucide-react';
import { useLine } from '@/lib/blank/lineState';
import { GARMENTS } from '@/lib/blank/line';
import { ALL_TREATMENTS, normalise } from '@/lib/blank/wordmark';
import { constructionsFor, randomConstructions } from '@/lib/blank/markFamily';
import { PALETTES, STAGE0_COLOURWAY_LIMIT, paletteRound, type Palette } from '@/lib/blank/palettes';
import { rasteriseMark, readFont } from '@/lib/blank/rasterise';

type Tile = { palette: Palette; url?: string; error?: string; busy?: boolean };

export function ColourBeat() {
  const { config, set } = useLine();
  const word = normalise(config.wordmark);
  const t = ALL_TREATMENTS.find((x) => x.id === config.wordmarkStyle) ?? ALL_TREATMENTS[0];

  const seedNum = Number(config.markSeed);
  const pool =
    config.markSeed !== '' && Number.isFinite(seedNum)
      ? randomConstructions(word, seedNum)
      : constructionsFor(word);
  const mark = pool.find((c) => c.id === config.mark) ?? null;

  const [round, setRound] = useState(1);
  const [tiles, setTiles] = useState<Tile[]>(() =>
    paletteRound(1).map((palette) => ({ palette })),
  );
  const [running, setRunning] = useState(false);
  const probeRef = useRef<HTMLSpanElement>(null);

  const chosen = config.colorway;

  const runRound = useCallback(
    async (seed: number) => {
      const picks = paletteRound(seed);
      setTiles(picks.map((palette) => ({ palette, busy: true })));
      setRunning(true);

      // The mark travels as artwork so every tile carries the SAME mark and only
      // the colour moves. Without it the round would compare six blank garments,
      // which is a swatch card, not a bake-off.
      const image =
        mark && probeRef.current ? rasteriseMark(mark, word, readFont(probeRef.current)) : null;

      // Fanned out, not sequential: six renders one after another is a minute of
      // staring at nothing, and each tile caches on its own key anyway.
      await Promise.all(
        picks.map(async (palette, i) => {
          try {
            const res = await fetch('/api/blank/bakeoff', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                kind: 'colour',
                garment: config.garment,
                palette: palette.id,
                variant: i,
                ...(image ? { image } : {}),
              }),
            });
            const data = await res.json();
            setTiles((prev) =>
              prev.map((tile, n) =>
                n === i
                  ? { ...tile, busy: false, url: res.ok ? data.imageUrl : undefined, error: res.ok ? undefined : data.error }
                  : tile,
              ),
            );
          } catch {
            setTiles((prev) =>
              prev.map((tile, n) => (n === i ? { ...tile, busy: false, error: 'Network error' } : tile)),
            );
          }
        }),
      );
      setRunning(false);
    },
    [config.garment, mark, word],
  );

  return (
    <div className="my-2">
      <span
        ref={probeRef}
        aria-hidden
        className="opacity-0 pointer-events-none"
        style={{ ...t.css, position: 'absolute', left: -9999 }}
      >
        {word || 'BLANK'}
      </span>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
        <div className="flex gap-1.5">
          {GARMENTS.map((g) => (
            <button
              key={g.key}
              onClick={() => set('garment', g.key)}
              aria-pressed={config.garment === g.key}
              className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider border-b-2 transition-colors"
              style={{
                borderColor: config.garment === g.key ? 'var(--accent)' : 'transparent',
                color: config.garment === g.key ? 'var(--accent)' : 'var(--era-ink-muted)',
                minHeight: 0,
              }}
            >
              {g.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => runRound(round)}
          disabled={running}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border transition-colors disabled:opacity-40"
          style={{ borderColor: 'var(--accent)', color: 'var(--accent)', minHeight: 0 }}
        >
          {running ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
          {running ? 'Rendering six…' : 'Render this round'}
        </button>

        <button
          onClick={() => {
            const next = round + 1;
            setRound(next);
            setTiles(paletteRound(next).map((palette) => ({ palette })));
          }}
          disabled={running}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-colors disabled:opacity-40"
          style={{ color: 'var(--era-ink-muted)', minHeight: 0 }}
        >
          <Shuffle className="w-3.5 h-3.5" /> Different six
        </button>

        <span className="text-[11px] font-mono" style={{ color: 'var(--era-ink-muted)' }}>
          {mark ? 'carrying your mark' : 'plain garments — pick a mark in 03 to carry it'} · six
          renders per round
        </span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-x-2.5 gap-y-4">
        {tiles.map((tile) => {
          const on = chosen === tile.palette.id;
          return (
            <button
              key={tile.palette.id}
              onClick={() => set('colorway', tile.palette.id)}
              aria-pressed={on}
              className="w-full min-w-0 flex flex-col text-left [&_*]:text-left"
              style={{ alignItems: 'stretch', justifyContent: 'flex-start', minHeight: 0 }}
            >
              <div
                className="relative w-full overflow-hidden flex items-center justify-center"
                style={{
                  aspectRatio: '1/1',
                  backgroundColor: tile.palette.hex,
                  outline: on ? '2px solid var(--accent)' : 'none',
                  outlineOffset: '2px',
                }}
              >
                {tile.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={tile.url} alt={`${tile.palette.name} colourway`} className="w-full h-full object-cover" />
                ) : tile.busy ? (
                  <Loader2 className="w-5 h-5 animate-spin" style={{ color: 'rgba(255,255,255,0.7)' }} />
                ) : (
                  <span
                    className="text-[10px] font-mono uppercase tracking-wider px-2 text-center"
                    style={{ color: 'rgba(255,255,255,0.75)' }}
                  >
                    {tile.error ?? 'swatch — not rendered yet'}
                  </span>
                )}
              </div>

              <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2">
                <span
                  className="text-[12px]"
                  style={{ color: on ? 'var(--accent)' : 'var(--era-ink)' }}
                >
                  {tile.palette.name}
                </span>
                {!tile.palette.stage0 && (
                  <span
                    className="text-[9px] font-mono uppercase tracking-wider"
                    style={{ color: '#A8456E' }}
                  >
                    custom dye lot
                  </span>
                )}
              </div>
              {on && (
                <span className="text-[11px]" style={{ color: 'var(--era-ink-muted)' }}>
                  {tile.palette.note}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-[13px] max-w-2xl" style={{ color: 'var(--era-ink-body)' }}>
        Six colourways of the same garment carrying the same mark, so colour is the only variable.
        Stage 0 allows <strong style={{ color: 'var(--era-ink)' }}>{STAGE0_COLOURWAY_LIMIT}</strong>{' '}
        colourways per style — a third is a third buy of every blank, at a worse price break on each.
        Garment dye means you approve a shade band, not a Pantone: piece-to-piece variation is
        inherent, not a defect. The ones marked custom dye lot need 800–1,000m in one colour, which
        is 300–500 garments before you have made anything else.
      </p>
      <p className="mt-2 text-[12px]" style={{ color: 'var(--era-ink-muted)' }}>
        {PALETTES.length} colourways in the set; six are drawn per round.
      </p>
    </div>
  );
}
