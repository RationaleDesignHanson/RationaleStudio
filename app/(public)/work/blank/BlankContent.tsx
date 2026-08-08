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

import Link from 'next/link';
import Image from 'next/image';
import { ProjectScope } from '@/components/case-study/ProjectScope';
import { ArrowRight } from 'lucide-react';
import { BudgetLever } from './BudgetLever';
import { GraphicsLibrary } from './GraphicsLibrary';
import { ReferenceUpload } from './ReferenceUpload';
import { BrandBakeoff } from './BrandBakeoff';
import { PlateGallery } from './PlateGallery';
import { ShareLine } from './ShareLine';
import { LineTray } from './LineTray';
import { DeviationRender } from './DeviationRender';
import { NameStep, FaceStep, LockupStep } from './Identity';
import { MarkFamily } from './MarkFamily';
import { NameIt } from './NameIt';
import { Stepper, StepFooter, BEATS, clampStep } from './Stepper';
import { MarkExpansions } from './MarkExpansions';
import { Disclosure } from './Disclosure';
import { LineProvider, useLine } from '@/lib/blank/lineState';

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

/** The close. Read this before believing any number in the beats above. */
function Standings() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <Standing title="Settled">
        <li>
          Quiet costs more to make than loud. The mechanism is fixed costs and minimums, not taste —
          strip them out and ink is what&rsquo;s left.
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
        <li>Which brand direction. Six are still live in beat 03 and none has been chosen.</li>
        <li>
          Retail price. It&rsquo;s the largest single margin lever in the model at 35.9 points, and
          the tray still uses tier defaults unless you override a SKU.
        </li>
        <li>
          The name is narrowed, not settled:{' '}
          <strong style={{ color: 'var(--era-ink)' }}>Blank</strong> is the working name and the only
          placeholder anyone is comfortable with. Beat 01 takes any word, and a longer one is
          constrained by the platen before it is by taste.
        </li>
        <li>No inventory ordered, no tech pack, no supplier contacted.</li>
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
 * One beat. Sized to fill the screen under the site header and the stepper so a
 * beat reads as a screen rather than as a section, but allowed to grow past it —
 * forcing every beat into a fixed height is what would shrink the garment and the
 * marks back down to thumbnails, which is the problem this is solving.
 */
function Beat({
  n,
  title,
  note,
  children,
}: {
  n: string;
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={`beat-${n}`}
      aria-labelledby={`beat-${n}-h`}
      className="px-4 sm:px-6 md:px-8 py-8"
      style={{ minHeight: 'calc(100vh - 210px)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline gap-3 mb-1">
          <span className="text-[11px] font-mono tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
            {n}
          </span>
          <h2
            id={`beat-${n}-h`}
            className="font-display"
            style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)', color: 'var(--era-ink)' }}
          >
            {title}
          </h2>
        </div>
        <p className="text-[13px] mb-6 max-w-2xl" style={{ color: 'var(--era-ink-muted)' }}>
          {note}
        </p>
        {children}
        <StepFooter />
      </div>
    </section>
  );
}

/**
 * Only the current beat is rendered — not hidden, absent. A screen reader is
 * never walked through seven irrelevant sections, and the ~30 images belonging to
 * other beats are never requested. The cost is that find-in-page only searches
 * the beat you are on, which is the right trade for an instrument.
 */
function Beats() {
  const { config } = useLine();
  const i = clampStep(config.step);
  const b = BEATS[i];

  return (
    <Beat n={b.n} title={b.title} note={b.note}>
      {i === 0 && <NameStep />}
      {i === 1 && <FaceStep />}
      {i === 2 && (
        <>
          <MarkFamily />
          <LockupStep />
        </>
      )}
      {i === 3 && (
        <>
          <MarkExpansions />
          <BrandBakeoff />
        </>
      )}
      {i === 4 && (
        <>
          <div className="max-w-[1500px] -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8">
            <BudgetLever />
          </div>
          <div className="mt-10 pt-8 border-t" style={{ borderColor: 'var(--era-hairline)' }}>
            <LineTray />
          </div>
          <Disclosure
            summary="How a mark gets printed"
            hint="twelve print languages — vocabulary, not a decision"
          >
            <GraphicsLibrary />
          </Disclosure>
        </>
      )}
      {i === 5 && <Standings />}
    </Beat>
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
              <Link
                href="/work/vault"
                className="shrink-0 text-[11px] font-mono uppercase tracking-[0.2em] transition-colors hover:text-[var(--accent)]"
                style={{ color: 'var(--era-ink-muted)' }}
              >
                ← Vault
              </Link>
              <ShareLine />
            </div>
            <NameIt />
          </div>
        </header>

        {/* Progress, state, and the only navigation. */}
        <Stepper />

        <Beats />

        <footer className="px-4 sm:px-6 md:px-8 py-8 border-t" style={{ borderColor: 'var(--era-hairline)' }}>
          <div className="max-w-6xl mx-auto flex items-baseline justify-between gap-3">
            <p className="text-[11px] font-mono tracking-[0.2em] uppercase" style={{ color: 'var(--era-ink-muted)' }}>
              ✱ · Vault · Working name
            </p>
            <Link
              href="/work/vault"
              className="inline-flex items-center gap-2 font-display italic text-lg transition-colors"
              style={{ color: 'var(--accent)' }}
            >
              Back to the Vault <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </footer>
      </main>
      </LineProvider>
    </ProjectScope>
  );
}
