/**
 * Beat 03 — how the name looks as a mark.
 *
 * Nine constructions, all drawn from the name in whichever treatment the wordmark
 * is using. Change the name or the face and every mark in the family changes with
 * it, because they are derived rather than chosen from a shelf.
 *
 * These are drawn in the browser from type and CSS, not generated. That is not a
 * compromise: generation cannot spell, costs money per roll, takes ten seconds and
 * gives a different result each time — so six generated marks are six unrelated
 * images, which is the opposite of a family. Constructions are deterministic,
 * instant, free, always correctly spelled, and related by construction.
 *
 * A GRID IS RIGHT HERE, unlike everywhere else on this page. The whole point is
 * that these are variations on one thing, and variations are judged against each
 * other — the same argument that keeps the direction bake-off a grid. They are
 * small, uniform and cheap to scan, which is what a comparison wants.
 */

'use client';

import { useLine } from '@/lib/blank/lineState';
import { STATES, tierIndex } from '@/lib/blank/line';
import { ALL_TREATMENTS, normalise } from '@/lib/blank/wordmark';
import { TIER_METHOD, METHOD_LABEL } from '@/lib/blank/producible';
import {
  constructionAvailable,
  constructionsFor,
  lettersFor,
  type Construction,
} from '@/lib/blank/markFamily';

const money = (n: number) => `$${(n / 1000).toFixed(0)}k`;

/**
 * One mark, drawn from the name. Exported because the lockup preview draws the
 * same mark beside the wordmark, and two implementations of the same glyph would
 * drift the moment either changed.
 */
export function Mark({
  c,
  word,
  css,
  size = 64,
}: {
  c: Construction;
  word: string;
  css: Record<string, string | number>;
  size?: number;
}) {
  const letters = lettersFor(word, c);
  const enclosed = c.enclosure !== 'none';
  // Filled enclosures knock the letter out; clip-path cannot be combined with
  // a border, because it clips the border too.
  const knockout = c.enclosure === 'square' || c.enclosure === 'shield';

  // The glyphs inherit the wordmark's face, weight and tracking. Enclosure and
  // colour are the construction's own.
  const glyphStyle: React.CSSProperties = {
    ...css,
    color: knockout ? 'var(--era-bg-deep)' : 'var(--era-ink)',
    fontSize: enclosed ? size * 0.42 : size * 0.62,
    lineHeight: c.stacked ? 0.82 : 1,
    // A construction's own geometry must win over the treatment's — a knockout
    // treatment inside a knockout block would draw a block on a block.
    backgroundColor: 'transparent',
    padding: 0,
    WebkitTextStroke: undefined,
    transform: undefined,
  };

  const glyphs = c.stacked ? (
    <span className="flex flex-col items-center" style={glyphStyle}>
      {letters.split('').map((l, i) => (
        <span key={i}>{l}</span>
      ))}
    </span>
  ) : c.mirrored ? (
    <span className="flex items-center" style={glyphStyle}>
      <span>{letters[0]}</span>
      <span style={{ transform: 'scaleX(-1)' }}>{letters[0]}</span>
    </span>
  ) : c.overlap ? (
    <span className="flex items-center" style={glyphStyle}>
      <span>{letters[0]}</span>
      <span style={{ marginLeft: '-0.32em' }}>{letters[1] ?? letters[0]}</span>
    </span>
  ) : (
    <span style={glyphStyle}>{letters}</span>
  );

  if (!enclosed) {
    return (
      <span className="flex items-center justify-center" style={{ width: size, height: size }}>
        {glyphs}
      </span>
    );
  }

  return (
    <span
      className="flex items-center justify-center relative"
      style={{
        width: size,
        height: size,
        border: knockout ? 'none' : `${Math.max(2, size * 0.055)}px solid var(--era-ink)`,
        backgroundColor: knockout ? 'var(--era-ink)' : 'transparent',
        borderRadius: c.enclosure === 'circle' ? '50%' : 0,
        // A shield is a square with its lower corners drawn to a point.
        clipPath:
          c.enclosure === 'shield'
            ? 'polygon(0% 0%, 100% 0%, 100% 62%, 50% 100%, 0% 62%)'
            : undefined,
        // The notch: a wedge removed from the upper right of the ring.
        maskImage: c.notched
          ? 'conic-gradient(from 18deg at 50% 50%, transparent 0deg 34deg, black 34deg 360deg)'
          : undefined,
        WebkitMaskImage: c.notched
          ? 'conic-gradient(from 18deg at 50% 50%, transparent 0deg 34deg, black 34deg 360deg)'
          : undefined,
      }}
    >
      {glyphs}
    </span>
  );
}

export function MarkFamily() {
  const { config, set } = useLine();
  const tier = tierIndex(config.budget);
  const method = TIER_METHOD[tier];
  const word = normalise(config.wordmark);

  const t = ALL_TREATMENTS.find((x) => x.id === config.wordmarkStyle) ?? ALL_TREATMENTS[0];
  const constructions = constructionsFor(word);
  const makeable = constructions.filter((c) => constructionAvailable(c, method).ok).length;
  const selected = constructions.find((c) => c.id === config.graphic);

  return (
    <div className="my-2">
      <p className="mb-5 text-[12px] font-mono" style={{ color: 'var(--era-ink-muted)' }}>
        Made from <span style={{ color: 'var(--accent)' }}>{word || 'BLANK'}</span> in{' '}
        <span style={{ color: 'var(--era-ink)' }}>{t.title}</span> —{' '}
        <span style={{ color: 'var(--era-ink)' }}>
          {makeable} of {constructions.length}
        </span>{' '}
        can be made in {METHOD_LABEL[method]} at {money(STATES[tier].budget)}.
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-x-3 gap-y-5">
        {constructions.map((c) => {
          const av = constructionAvailable(c, method);
          const on = config.graphic === c.id;
          return (
            <button
              key={c.id}
              onClick={() => set('graphic', on ? null : c.id)}
              aria-pressed={on}
              className="w-full min-w-0 flex flex-col p-2 border transition-colors [&_*]:text-left"
              style={{
                borderColor: on ? 'var(--accent)' : 'transparent',
                backgroundColor: on ? 'color-mix(in srgb, var(--accent) 5%, transparent)' : 'transparent',
                alignItems: 'stretch',
                justifyContent: 'flex-start',
                minHeight: 0,
              }}
            >
              <span
                className="flex items-center justify-center w-full"
                style={{
                  height: 88,
                  backgroundColor: 'var(--era-bg-deep)',
                  opacity: av.ok ? 1 : 0.25,
                  filter: av.ok ? 'none' : 'grayscale(1)',
                }}
              >
                <Mark c={c} word={word} css={t.css} />
              </span>
              <span
                className="text-[11px] mt-1.5"
                style={{ color: on ? 'var(--accent)' : av.ok ? 'var(--era-ink)' : 'var(--era-ink-muted)' }}
              >
                {c.title}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 max-w-2xl">
        {selected ? (
          <>
            <h4 className="font-display text-lg" style={{ color: 'var(--era-ink)' }}>
              {selected.title}
            </h4>
            <p
              className="text-[13px] mt-1"
              style={{
                color: constructionAvailable(selected, method).ok ? 'var(--era-ink-body)' : '#A8456E',
              }}
            >
              {constructionAvailable(selected, method).ok
                ? selected.note
                : constructionAvailable(selected, method).reason}
            </p>
          </>
        ) : (
          <p className="text-[13px]" style={{ color: 'var(--era-ink-muted)' }}>
            Pick one, or carry the wordmark alone. Every mark here is built from the name in the face
            you chose — change either and the whole family changes with it.
          </p>
        )}
      </div>
    </div>
  );
}
