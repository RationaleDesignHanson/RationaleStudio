/**
 * The line, always on screen.
 *
 * WHY THIS EXISTS. The tool was seven pages and you could only ever see one.
 * That made sense when it was a document being read — an audit found 9.2
 * viewports and 56 buttons, and one-decision-per-screen was the fix. It stopped
 * making sense the moment the artefact became live and instant: marks drawn from
 * type, colour on real cloth, artwork composited onto garments. Paging now costs
 * you the one thing worth having, which is that you cannot see the line while
 * you change the costs.
 *
 * So the controls moved to a sidebar and this is the canvas. Every garment, in
 * every colourway it is made in, carrying the artwork at the placement and the
 * scale it is actually printed at, on the cloth the current budget buys. It
 * updates as you touch anything.
 *
 * Nothing here spends. It is CSS, type and a composited image — which is what
 * makes it usable as a live surface rather than something you wait ten seconds
 * and a render budget for.
 */

'use client';

import { useLine } from '@/lib/blank/lineState';
import { GARMENTS, blankFor, tierIndex } from '@/lib/blank/line';
import { paletteById } from '@/lib/blank/palettes';
import { clothTexture, fabricFor, inkOn, onCloth } from '@/lib/blank/fabric';
import { ALL_TREATMENTS, normalise } from '@/lib/blank/wordmark';
import { constructionsFor, randomConstructions } from '@/lib/blank/markFamily';
import { Mark } from './MarkFamily';
import { SignArtwork } from './SignArtwork';

/** Placement as a fraction of the garment, mirroring beat 04's real geometry. */
const PLACEMENT_FRAC: Record<string, number> = {
  'chest-centre': 0.5,
  'left-chest': 0.1,
  'upper-back': 0.6,
  sleeve: 0.075,
};

export function LineCanvas({ compact = false }: { compact?: boolean }) {
  const { config, skus } = useLine();
  const tier = tierIndex(config.budget);
  const word = normalise(config.wordmark);
  const t = ALL_TREATMENTS.find((x) => x.id === config.wordmarkStyle) ?? ALL_TREATMENTS[0];

  const seed = Number(config.markSeed);
  const pool =
    config.markSeed !== '' && Number.isFinite(seed)
      ? randomConstructions(word, seed)
      : constructionsFor(word);
  const mark = pool.find((c) => c.id === config.mark) ?? null;

  const frac = PLACEMENT_FRAC[config.placement] ?? 0.5;

  /**
   * What the canvas shows when nothing is specced yet.
   *
   * A line is the SKUs you have ticked; before that there is still something
   * worth drawing, because seeing the three garments in the palette is how you
   * decide whether to tick any of them. So: the specced line if there is one,
   * otherwise all three garments in the palette.
   */
  const rows =
    skus.length > 0
      ? skus.map((s) => ({ garment: s.garment, colours: s.colours }))
      : GARMENTS.map((g) => ({
          garment: g.key,
          colours: config.palette.length ? config.palette : ['faded-charcoal'],
        }));

  const empty = config.palette.length === 0 && skus.length === 0;

  return (
    <div className="w-full">
      {empty && (
        <p
          className="text-[12px] mb-3"
          style={{ color: 'var(--era-ink-muted)' }}
        >
          Pick colours and artwork on the left — this updates as you go.
        </p>
      )}

      <div className="space-y-4">
        {rows.map((row) => {
          const gm = GARMENTS.find((g) => g.key === row.garment);
          if (!gm) return null;
          const blank = blankFor(row.garment, tier);
          const fabric = fabricFor(blank.id);
          // A cap has no back and no sleeve; it takes the front panel only.
          const capOffAxis = row.garment === 'cap' && config.placement !== 'chest-centre'
            && config.placement !== '';

          return (
            <div key={row.garment}>
              <p
                className="text-[11px] sm:text-[10px] font-mono uppercase tracking-[0.15em] mb-1.5"
                style={{ color: 'var(--era-ink-muted)' }}
              >
                {gm.label} · {blank.name}
              </p>
              <div className="flex flex-wrap gap-2">
                {row.colours.map((id) => {
                  const pal = paletteById(id);
                  if (!pal) return null;
                  const hex = onCloth(pal.hex, fabric);
                  const tex = clothTexture(hex, fabric);
                  return (
                    <figure
                      key={id}
                      className="m-0"
                      style={{ width: compact ? 96 : 132 }}
                      title={`${gm.label} · ${pal.name} · ${blank.name}`}
                    >
                      <span
                        className="relative flex w-full items-center justify-center overflow-hidden"
                        style={{
                          aspectRatio: gm.ratio,
                          backgroundColor: hex,
                          backgroundImage: tex.backgroundImage,
                          backgroundSize: tex.backgroundSize,
                        }}
                      >
                        {capOffAxis ? (
                          <span
                            className="text-[10px] font-mono uppercase tracking-wider px-1 text-center"
                            style={{ color: inkOn(hex), opacity: 0.6 }}
                          >
                            not on a cap
                          </span>
                        ) : config.customGraphic ? (
                          <span
                            className="relative block"
                            style={{ width: `${Math.min(0.8, frac + 0.1) * 100}%`, aspectRatio: '1' }}
                          >
                            <SignArtwork
                              url={config.customGraphic}
                              text={config.register === 'sign' ? config.signText : ''}
                              size={config.signSize}
                              y={config.signY}
                              width={(compact ? 96 : 132) * frac}
                            />
                          </span>
                        ) : mark ? (
                          <span style={{ ['--era-ink' as string]: inkOn(hex) }}>
                            <Mark
                              c={mark}
                              word={word}
                              css={t.css}
                              size={(compact ? 96 : 132) * Math.max(0.22, frac)}
                            />
                          </span>
                        ) : (
                          <span
                            className="font-display"
                            style={{ color: inkOn(hex), fontSize: compact ? '0.8rem' : '1rem' }}
                          >
                            {word || 'BLANK'}
                          </span>
                        )}
                      </span>
                      <figcaption
                        className="mt-1 text-[11px] sm:text-[10px] font-mono"
                        style={{ color: 'var(--era-ink-muted)' }}
                      >
                        {pal.name}
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-[11px] max-w-sm" style={{ color: 'var(--era-ink-muted)' }}>
        Drawn, not rendered — instant and free, and the colour is the dye as this cloth returns it.
        For a photograph, generate one.
      </p>
    </div>
  );
}
