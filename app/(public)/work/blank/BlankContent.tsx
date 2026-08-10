/**
 * BLANK — the tool is the page, and it is now a stepper.
 *
 * WHY. The density audit measured 8294px, 9.2 viewports, 38 images, 56 buttons
 * and 1625 words, using ONE interaction pattern eight times: a simultaneous grid
 * asking "compare N things and pick". Chapter 04 alone put 19 choices in 2669px.
 * Trimming that page still asks for the most expensive cognitive mode there is,
 * eight times, with no rest and no change of register.
 *
 * The honest reframe is that this stopped being a page and became an instrument.
 * A reader wants overview; two people operating something across sessions want
 * ONE decision in front of them plus a record of what is settled. Review 10
 * defended the grids as comparison instruments, which was right for a document
 * and wrong for a tool. The record it needs already exists — the progress rail.
 *
 * ONE DELIBERATE EXCEPTION: the direction bake-off keeps its 6-up grid, because
 * its own caption says "judge the racks, not the tees" and comparison genuinely
 * is the task there. Everything else shows one thing at a time.
 */

'use client';

import { ProjectScope } from '@/components/case-study/ProjectScope';
import { ReferenceUpload } from './ReferenceUpload';
import { BrandBakeoff } from './BrandBakeoff';
import { ShareLine } from './ShareLine';
import { DeviationRender } from './DeviationRender';
import { NameStep, LockupStep } from './Identity';
import { MarkFamily } from './MarkFamily';
import { Applied } from './Applied';
import { ColourBeat } from './ColourBeat';
import { PaletteBeat } from './PaletteBeat';
import { CostSheet } from './CostSheet';
import { GraphicBakeoff } from './GraphicBakeoff';
import { NameIt } from './NameIt';
import { StrategyStep } from './StrategyStep';
import { Standing } from './Standing';
import { ArtDirection } from './ArtDirection';
import { PlaceGraphics } from './PlaceGraphics';
import { BlankShell, sectionMeta } from './BlankShell';
import { Disclosure } from './Disclosure';
import { useEffect } from 'react';
import { LineProvider, useLine } from '@/lib/blank/lineState';
import { normalise } from '@/lib/blank/wordmark';
import { DIRECTION_LABELS } from './BrandBakeoff';

/**
 * The controls, as sidebar sections.
 *
 * These are the seven beats, unchanged in content and no longer alone on a
 * screen. Every component was already self-contained, so the restructure moves
 * them rather than rewriting them — and `config.step` still names the open one,
 * so links written under the stepper still land where they meant to.
 */
function Sections() {
  const { config, setImplied, skus } = useLine();

  /**
   * Keep the render colourway pointed at the line.
   *
   * `config.colorway` is what every GENERATED image is rendered in, and the only
   * thing that ever wrote it was the paid colour round — which now sits behind a
   * disclosure. So picking a palette and speccing colourways, which is the
   * normal path, left it on its default: you chose bone and olive and every
   * render came back charcoal.
   *
   * Implied rather than set, because it is a consequence of the line rather than
   * a decision of its own.
   */
  const leading = skus[0]?.colours[0] ?? config.palette[0];
  useEffect(() => {
    if (leading && leading !== config.colorway) setImplied('colorway', leading);
  }, [leading, config.colorway, setImplied]);
  const scale = config.strategy === 'scale';
  const meta = (n: string) => sectionMeta(n, config.strategy);

  return (
    <BlankShell
      sections={[
        {
          id: '01',
          ...meta('01'),
          body: (
            <>
              <StrategyStep />
              <NameStep />
            </>
          ),
        },
        {
          id: '02',
          ...meta('02'),
          body: scale ? (
            <>
              <ArtDirection />
              <PlaceGraphics />
              <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--era-hairline)' }}>
                <ReferenceUpload />
              </div>
              <Disclosure
                summary="And the house mark that goes on every one"
                hint="the neck label and the hem tag"
              >
                <MarkFamily />
                <LockupStep />
              </Disclosure>
            </>
          ) : (
            <>
              <ArtDirection />
              <MarkFamily />
              <LockupStep />
              {/* Out of the disclosure. Describing an image and bringing your own
                  are first-class ways in, not footnotes to the name-derived mark
                  — and the tool never said it made images at all. */}
              <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--era-hairline)' }}>
                <GraphicBakeoff />
              </div>
              <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--era-hairline)' }}>
                <ReferenceUpload />
              </div>
            </>
          ),
        },
        {
          id: '03',
          ...meta('03'),
          body: (
            <>
              <PaletteBeat />
              <Disclosure
                summary="Or render a colourway as a photograph"
                hint="six renders — this one spends"
              >
                <ColourBeat />
              </Disclosure>
            </>
          ),
        },
        { id: '04', ...meta('04'), body: <Applied /> },
        {
          id: '05',
          ...meta('05'),
          body: (
            <>
              <BrandBakeoff />
              <DeviationRender />
            </>
          ),
        },
        { id: '06', ...meta('06'), body: <CostSheet /> },
        { id: '07', ...meta('07'), body: <Standing /> },
      ]}
    />
  );
}

export function BlankContent() {
  return (
    <ProjectScope project="blank">
      <LineProvider>
      <main
        className="era-now min-h-screen"
        style={{ backgroundColor: 'var(--era-bg)', color: 'var(--era-ink-body)' }}
      >
        {/* Masthead — and the first beat. The h1 IS the naming input, because
            naming is where the experience starts: it is the cheapest interaction
            on the page, it is the thing two founders argue about first, and the
            word's LENGTH is a production constraint that gates everything below
            it. A hardcoded title here while chapter 3 invited you to type a name
            was also simply inconsistent — name it ATLAS and the page still said
            Blank. */}
        <header className="px-4 sm:px-6 md:px-8 pt-4 pb-2.5">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-1">
              <ShareLine />
            </div>
            <NameIt />
          </div>
        </header>

        {/* Progress, state, and the only navigation. */}
        <Sections />
      </main>
      </LineProvider>
    </ProjectScope>
  );
}
