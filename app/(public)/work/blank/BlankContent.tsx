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
import { PlaceGraphics } from './PlaceGraphics';
import { BlankShell, sectionMeta } from './BlankShell';
import { Disclosure } from './Disclosure';
import { LineProvider, useLine } from '@/lib/blank/lineState';
import { normalise } from '@/lib/blank/wordmark';
import { DIRECTION_LABELS } from './BrandBakeoff';

function Standing({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3
        className="text-[11px] font-mono uppercase tracking-[0.2em] pb-2 mb-3 border-b"
        style={{ color: 'var(--era-ink)', borderColor: 'var(--era-hairline)' }}
      >
        {title}
      </h3>
      <ul className="space-y-2.5 text-[13px]" style={{ color: 'var(--era-ink-body)' }}>
        {children}
      </ul>
    </div>
  );
}

/**
 * The close. Read this before believing any number in the beats above.
 *
 * It was a static literal, which made it wrong in three ways at once: it never
 * mentioned the catalogue business or that setup does not amortise — the one
 * fact the whole fork exists to establish — it listed the brand direction as
 * undecided while the rail two inches above had been showing one since load, and
 * it hardcoded "Blank" as the name on the one page whose first control is a name
 * field. A standings board that does not read the state is a decoration.
 */
function Standings() {
  const { config, skus } = useLine();
  const scale = config.strategy === 'scale';
  const name = normalise(config.wordmark) || 'BLANK';
  const direction = DIRECTION_LABELS[config.direction] ?? config.direction;

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <Standing title="Settled">
        <li>
          Quiet costs more to make than loud. The mechanism is fixed costs and minimums, not taste —
          strip them out and ink is what&rsquo;s left.
        </li>
        <li>
          {scale ? (
            <>
              This is costed as a <strong style={{ color: 'var(--era-ink)' }}>catalogue</strong> —{' '}
              {config.designs} places. Setup is paid per design and never amortises, so the wide
              line is only possible on the cheapest decoration. That is the same argument as the
              line above, pointed at variety instead of finish.
            </>
          ) : (
            <>
              This is costed as a <strong style={{ color: 'var(--era-ink)' }}>considered line</strong>{' '}
              — one artwork, so setup is paid once and spreads across the buy.
            </>
          )}
        </li>
        <li>
          Stage 0 is decorated blanks. A cut-and-sew hero needs 86 pre-orders, or 72 if the coat and
          trousers share one cloth.
        </li>
        <li>
          The pipeline renders garment <em>categories</em>, not garment specs. Tech packs stay text
          and vector.
        </li>
      </Standing>

      <Standing title="Open">
        <li>
          Brand direction is on <strong style={{ color: 'var(--era-ink)' }}>{direction}</strong> —
          the default rather than a decision, unless you changed it in beat 05. Six are live.
        </li>
        <li>
          Retail price. It&rsquo;s the largest single margin lever in the model at 35.9 points, and
          the tray still uses tier defaults unless you override a SKU.
        </li>
        <li>
          The name is narrowed, not settled:{' '}
          <strong style={{ color: 'var(--era-ink)' }}>{name}</strong> is what beat 01 currently
          carries. A longer one is constrained by the 14in platen before it is by taste.
        </li>
        <li>
          {skus.length === 0
            ? 'Nothing specced yet — beat 06 is empty, so every figure above is a preview.'
            : 'No inventory ordered, no tech pack, no supplier contacted.'}
        </li>
      </Standing>

      <Standing title="Unverified">
        <li>
          37 of 44 load-bearing figures are single-source or derived. The confidence marks sit on the
          numbers themselves, not in a footnote.
        </li>
        <li>
          The relabel line may be underbudgeted 3&ndash;5&times; (SR&nbsp;T15). It is exposed as a
          toggle rather than buried.
        </li>
        <li>Every image here is generated. None is a photograph of product that exists.</li>
      </Standing>
    </div>
  );
}

/**
 * The controls, as sidebar sections.
 *
 * These are the seven beats, unchanged in content and no longer alone on a
 * screen. Every component was already self-contained, so the restructure moves
 * them rather than rewriting them — and `config.step` still names the open one,
 * so links written under the stepper still land where they meant to.
 */
function Sections() {
  const { config } = useLine();
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
              <PlaceGraphics />
              <Disclosure
                summary="And the house mark that goes on every one"
                hint="the neck label and the hem tag — one identity behind the catalogue"
              >
                <MarkFamily />
                <LockupStep />
              </Disclosure>
            </>
          ) : (
            <>
              <MarkFamily />
              <LockupStep />
              <Disclosure
                summary="Or artwork that has nothing to do with the name"
                hint="describe it, or upload it — seasonal, silly, one-off"
              >
                <GraphicBakeoff />
                <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--era-hairline)' }}>
                  <ReferenceUpload />
                </div>
              </Disclosure>
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
                hint="six generated garments — this one spends"
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
        { id: '07', ...meta('07'), body: <Standings /> },
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
