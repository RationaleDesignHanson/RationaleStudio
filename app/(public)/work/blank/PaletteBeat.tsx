/**
 * Beat 03 — the line's palette, and the colour card.
 *
 * WHY THIS REPLACED A BAKE-OFF. Colour was six generated garments per round, and
 * every round cost six renders. The most important axis in the tool — the one
 * you are meant to play with hardest — was the only one you had to pay to touch,
 * and the six tiles arrived ten seconds later so you could not sweep a palette
 * and watch it move.
 *
 * A colour card is what a designer actually uses to choose colour: flat fields
 * of the real thing, the artwork on top, the whole range at once. It is instant,
 * it is free, and it is MORE honest than a render, because a generated
 * photograph of a colour is an interpretation of that colour and a hex value is
 * the colour. Generation stays for the hero look, one beat later, where the
 * question is what it feels like rather than what it is.
 *
 * THE PALETTE IS A PROPERTY OF THE LINE. Styles draw their colourways from it,
 * so the range coheres by construction rather than by discipline — and because a
 * colourway is a separate blank buy, the cost sheet can finally say what each
 * one costs. Stage 0 takes two per style; a third is a third buy.
 */

'use client';

import { useLine } from '@/lib/blank/lineState';
import { PALETTES, STAGE0_COLOURWAY_LIMIT, paletteById } from '@/lib/blank/palettes';
import { GARMENTS, blankFor, tierIndex } from '@/lib/blank/line';
import { clothNote, clothTexture, fabricFor, inkOn, onCloth } from '@/lib/blank/fabric';
import { ALL_TREATMENTS, normalise } from '@/lib/blank/wordmark';
import { constructionsFor, randomConstructions } from '@/lib/blank/markFamily';
import { Mark } from './MarkFamily';
import { SignArtwork } from './SignArtwork';

export function PaletteBeat() {
  const { config, set } = useLine();
  const word = normalise(config.wordmark);
  const t = ALL_TREATMENTS.find((x) => x.id === config.wordmarkStyle) ?? ALL_TREATMENTS[0];
  const tier = tierIndex(config.budget);

  const seed = Number(config.markSeed);
  const pool =
    config.markSeed !== '' && Number.isFinite(seed)
      ? randomConstructions(word, seed)
      : constructionsFor(word);
  const mark = pool.find((c) => c.id === config.mark) ?? null;

  const inPalette = (id: string) => config.palette.includes(id);
  const toggle = (id: string) =>
    set('palette', inPalette(id) ? config.palette.filter((p) => p !== id) : [...config.palette, id].slice(0, 6));

  const chosen = config.palette.map(paletteById).filter(Boolean) as ReturnType<typeof paletteById>[];

  return (
    <div className="my-2">
      <p className="b-body mb-4 max-w-2xl" style={{ color: 'var(--era-ink-muted)' }}>
        Pick the colours the line is made in. Each colourway is a separate buy of the blank.
      </p>

      {/* THE PALETTE. Swatches, not renders: instant, free, and a hex is the
          colour where a generated photograph is only an opinion about it. */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-x-2.5 gap-y-4 mb-8">
        {PALETTES.map((p) => {
          const on = inPalette(p.id);
          return (
            <button
              key={p.id}
              onClick={() => toggle(p.id)}
              aria-pressed={on}
              title={p.note}
              className="text-left"
              style={{ display: 'block', minHeight: 0 }}
            >
              <span
                className="block w-full aspect-[4/3]"
                style={{
                  backgroundColor: p.hex,
                  outline: on ? '2px solid var(--accent)' : '1px solid var(--era-hairline)',
                  outlineOffset: on ? '2px' : '-1px',
                }}
              />
              <span
                className="block mt-1.5 b-data"
                style={{ color: on ? 'var(--accent)' : 'var(--era-ink)' }}
              >
                {p.name}
              </span>
              {!p.stage0 && (
                <span
                  className="block b-label"
                  style={{ color: 'var(--era-ink-muted)' }}
                >
                  custom dye lot
                </span>
              )}
            </button>
          );
        })}
      </div>

      {chosen.length === 0 ? (
        <p className="b-body py-6" style={{ color: 'var(--accent)' }}>
          Pick a colour and the line appears here in it.
        </p>
      ) : (
        <>
          <p
            className="b-label mb-3"
            style={{ color: 'var(--era-ink-muted)' }}
          >
            The card · {chosen.length} {chosen.length === 1 ? 'colour' : 'colours'} ×{' '}
            {GARMENTS.length} styles
          </p>

          {/* THE COLOUR CARD. The whole range in every colour at once, which is
              the comparison colour actually needs and the one a six-tile
              bake-off of a single garment cannot make. */}
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: `7rem repeat(${chosen.length}, minmax(4.5rem, 10rem))`,
                minWidth: chosen.length > 3 ? `${chosen.length * 5 + 7}rem` : undefined,
              }}
            >
              <span />
              {chosen.map((c) => (
                <span
                  key={c!.id}
                  className="b-label self-end pb-1"
                  style={{ color: 'var(--era-ink-muted)' }}
                >
                  {c!.name}
                </span>
              ))}

              {GARMENTS.map((gm) => {
                // The blank changes with the tier, so the SAME palette is a
                // different line at a different budget — a 4.3oz jersey tee at
                // $3k and a garment-dyed heavy faded one at $12k.
                const blank = blankFor(gm.key, tier);
                const fabric = fabricFor(blank.id);
                return (
                <FragmentRow
                  key={gm.key}
                  label={gm.label}
                  sub={blank.name}
                  note={clothNote(fabric)}
                  colours={chosen.map((c) => c!)}
                  render={(swatchHex) => {
                    // What the cloth actually returns, not what the chip says.
                    const hex = onCloth(swatchHex, fabric);
                    const tex = clothTexture(hex, fabric);
                    return (
                    <span
                      className="relative flex w-full items-center justify-center"
                      style={{
                        backgroundColor: hex,
                        backgroundImage: tex.backgroundImage,
                        backgroundSize: tex.backgroundSize,
                        aspectRatio: gm.ratio,
                        maxHeight: '9rem',
                      }}
                    >
                      {config.customGraphic ? (
                        <span className="relative block" style={{ width: '58%', aspectRatio: '1' }}>
                          <SignArtwork
                            url={config.customGraphic}
                            text={config.register === 'sign' ? config.signText : ''}
                            size={config.signSize}
                            y={config.signY}
                            width={120}
                          />
                        </span>
                      ) : mark ? (
                        <span style={{ ['--era-ink' as string]: inkOn(hex) }}>
                          <Mark c={mark} word={word} css={t.css} size={54} />
                        </span>
                      ) : (
                        <span
                          className="font-display"
                          style={{ color: inkOn(hex), fontSize: '0.95rem' }}
                        >
                          {word || 'BLANK'}
                        </span>
                      )}
                    </span>
                    );
                  }}
                />
                );
              })}
            </div>
          </div>

          <p className="mt-4 b-note max-w-2xl" style={{ color: 'var(--era-ink-muted)' }}>
            <strong style={{ color: 'var(--era-ink)' }}>These are not the swatch colours.</strong>{' '}
            Each row shows the dye as that cloth returns it — brushed fleece reads deeper, twill
            reads cleaner, garment dye arrives already faded. Change the budget and the blanks change
            underneath you.
            {chosen.length > STAGE0_COLOURWAY_LIMIT && (
              <>
                {' '}
                <span style={{ color: 'var(--accent)' }}>
                  Stage 0 takes {STAGE0_COLOURWAY_LIMIT} colourways per style — a palette of{' '}
                  {chosen.length} means choosing which two each style gets, in 06.
                </span>
              </>
            )}
          </p>
        </>
      )}
    </div>
  );
}

/** A labelled row of the card. Kept separate so the grid stays one flat list. */
function FragmentRow({
  label,
  sub,
  note,
  colours,
  render,
}: {
  label: string;
  sub: string;
  note: string;
  colours: { id: string; hex: string }[];
  render: (hex: string) => React.ReactNode;
}) {
  return (
    <>
      <span className="self-center" title={note}>
        <span className="block b-note" style={{ color: 'var(--era-ink)' }}>
          {label}
        </span>
        <span
          className="block b-data leading-tight"
          style={{ color: 'var(--era-ink-muted)' }}
        >
          {sub}
        </span>
        <span
          className="block mt-1 b-note leading-snug"
          style={{ color: 'var(--era-ink-muted)' }}
        >
          {note}
        </span>
      </span>
      {colours.map((c) => (
        <span key={c.id} className="block">
          {render(c.hex)}
        </span>
      ))}
    </>
  );
}
