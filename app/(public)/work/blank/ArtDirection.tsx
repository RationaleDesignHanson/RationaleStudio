/**
 * How it should look — in your words, or from a picture.
 *
 * Every generator here had a FIXED voice. Six drawing styles for a mark, three
 * registers for a place, six angles for a graphic. That is the right shape for a
 * first round, because a spread of six pushed different ways tells you more than
 * six attempts at one thing — and it is useless the moment you know what you
 * want, which is when most people start caring.
 *
 * So this steers the drawing without replacing the brief. It is appended as a
 * style note AFTER the scene and the subject, never in front of them, which is
 * the mistake the custom-direction route makes: it puts the house clause first
 * and then the user's words never survive.
 *
 * It is part of the cache key, so a different direction is a different image and
 * the same one costs nothing twice.
 */

'use client';

import { useLine } from '@/lib/blank/lineState';

/** Starting points, because a blank direction field is worse than no field. */
const STARTERS = [
  'heavy and woodcut, thick black line',
  'thin technical line, drafting pen',
  'hand-painted signwriting, slight wobble',
  'faded and cracked, like an old press',
  'flat vector, two colours only',
];

export function ArtDirection() {
  const { config, set } = useLine();

  return (
    <div className="mb-5">
      <label className="block">
        <span
          className="block b-label mb-1.5"
          style={{ color: 'var(--era-ink-muted)' }}
        >
          How it should look
        </span>
        <input
          value={config.artDirection}
          onChange={(e) => set('artDirection', e.target.value.slice(0, 200))}
          placeholder={STARTERS[0]}
          size={1}
          className="tap w-full min-w-0 px-3 py-2.5 b-body bg-transparent border outline-none focus:border-[var(--accent)]"
          style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)' }}
        />
      </label>
      <div className="flex flex-wrap gap-1.5 mt-2">
        {STARTERS.map((x) => (
          <button
            key={x}
            onClick={() => set('artDirection', x)}
            className="tap px-2 py-1 b-note border transition-colors hover:border-[var(--accent)]"
            style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink-muted)', minHeight: 0 }}
          >
            {x.split(',')[0]}
          </button>
        ))}
        {config.artDirection && (
          <button
            onClick={() => set('artDirection', '')}
            className="tap px-2 py-1 b-note underline"
            style={{ color: 'var(--era-ink-muted)', minHeight: 0 }}
          >
            clear
          </button>
        )}
      </div>
      <p className="mt-2 b-note" style={{ color: 'var(--era-ink-muted)' }}>
        Applies to anything generated below. Or upload a reference further down and it gets read for
        you.
      </p>
    </div>
  );
}
