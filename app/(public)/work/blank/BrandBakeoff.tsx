/**
 * Brand bake-off — six directions, judged on the rack.
 *
 * A single nice tee proves nothing. The comparison that matters is four pieces
 * hanging together, so the racks lead and the garments are secondary.
 * Source: ~/Developer/skreet/bakeoff (six directions x three garments,
 * Flux 1.1 Pro at one fixed seed — the direction is the only variable).
 */

'use client';

import { useCallback, useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';

import { useLine } from '@/lib/blank/lineState';
import Image from 'next/image';

interface Direction {
  key: string;
  label: string;
  thesis: string;
  cost: string;
  /** Can this direction's mark be made at Stage 0 money? */
  affordable: boolean;
  /**
   * What it costs to reach, for the ones that are not Stage 0.
   *
   * NOT "over budget". The budget is chosen two beats after this one, so calling
   * a direction over budget here is a verdict against a number the reader has not
   * set — and the flag was hardcoded, so it was not even a verdict, it was an
   * assertion. A requirement is true whatever they choose later.
   */
  needs?: string;
  control?: boolean;
  /** Directly visualises the lot-as-edition mechanic the $150 test is for. */
  testsHypothesis?: boolean;
}

/** Slug → label, for the chapter rail's state summary. */
export const DIRECTION_LABELS: Record<string, string> = {
  'quiet-flex': 'Quiet flex',
  workwear: 'Workwear utility',
  technical: 'Technical minimal',
  issue: 'Issue',
  brutalist: 'Brutalist graphic',
  naturals: 'Japanese naturals',
};

export const DIRECTIONS: Direction[] = [
  {
    key: 'quiet-flex',
    label: 'Quiet flex',
    thesis: 'Status through construction, not logos.',
    cost: 'Embroidery ~6k stitches. Needs the premium blank to read.',
    affordable: false,
    needs: 'needs $12k',
    control: true,
  },
  {
    key: 'workwear',
    label: 'Workwear utility',
    thesis: 'Function as the aesthetic. Bar tacks, contrast stitch, honest hardware.',
    cost: 'Bar tacks are near-free — the factory already sews them.',
    affordable: true,
  },
  {
    key: 'technical',
    label: 'Technical minimal',
    thesis: 'Mature gorpcore. Restraint borrowed from technical outerwear.',
    cost: 'Heat-pressed tab, no minimum. Cheapest mark in the set.',
    affordable: true,
  },
  {
    key: 'issue',
    label: 'Issue',
    thesis: 'Institutional uniform. Every piece stamped with its lot number.',
    cost: 'One-colour stencil. Near-free.',
    affordable: true,
    testsHypothesis: true,
  },
  {
    key: 'brutalist',
    label: 'Brutalist graphic',
    thesis: 'Stark, high-contrast, type-led. The loud option, done well.',
    cost: 'One-colour screen. Cheapest to produce, loudest to wear.',
    affordable: true,
  },
  {
    key: 'naturals',
    label: 'Japanese naturals',
    thesis: 'Undyed, mended, boro. Value in the cloth and the repair.',
    cost: 'Hand stitch. The most expensive labour here.',
    affordable: false,
    needs: 'needs $20k',
  },
];

const CUSTOM = 'custom';

export function BrandBakeoff() {
  // Shared config — which direction won is the whole point of sending the link.
  const { config, set } = useLine();
  const sel = config.direction;
  const setSel = (v: string) => set('direction', v);
  const d = DIRECTIONS.find((x) => x.key === sel) ?? DIRECTIONS[0];
  const isCustom = sel === CUSTOM;

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [custom, setCustom] = useState<string | null>(null);

  const renderCustom = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch('/api/blank/custom-direction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: config.directionPrompt }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Render failed.');
        return;
      }
      setCustom(data.imageUrl);
    } catch {
      setError('Network error — try again.');
    } finally {
      setBusy(false);
    }
  }, [config.directionPrompt]);

  return (
    /* MASTER-DETAIL, not a grid over a panel.
     *
     * The 3x2 grid put the six racks above the fold and the close-up of whichever
     * you picked below it, so choosing meant scrolling away from the thing you
     * were choosing between and the comparison broke at the moment of deciding.
     * A scrolling column of candidates beside a large detail keeps both on screen:
     * you can see what you rejected while you look at what you picked.
     *
     * The racks stay the comparison instrument the caption claims they are —
     * "judge the racks, not the tees" — they are just stacked instead of tiled. */
    <div className="my-4">
      <div className="grid lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] gap-5 items-start">
        {/* Left: the six, scrolling. Capped to the detail panel's height on
            desktop so the column scrolls rather than stretching the whole beat. */}
        <div
          className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-y-auto lg:pr-2 [scrollbar-width:thin]"
          style={{ maxHeight: 'min(62vh, 560px)', overscrollBehavior: 'contain' }}
        >
          {DIRECTIONS.map((dir) => {
            const on = dir.key === sel;
            return (
              <button
                key={dir.key}
                onClick={() => setSel(dir.key)}
                aria-pressed={on}
                className="shrink-0 lg:shrink text-left w-[190px] lg:w-full min-w-0 flex flex-col items-stretch"
                style={{ minHeight: 0 }}
              >
                <div
                  className="relative w-full aspect-[3/2] overflow-hidden rounded-md border transition-all"
                  style={{
                    borderColor: on ? 'var(--accent)' : 'transparent',
                    opacity: on ? 1 : 0.5,
                  }}
                >
                  <Image
                    src={`/blank/bakeoff/${dir.key}-rack.webp`}
                    alt={`${dir.label} — rack test`}
                    fill
                    sizes="(max-width: 1024px) 190px, 260px"
                    className="object-cover"
                  />
                </div>
                <div className="mt-1 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 min-w-0">
                  <span
                    className="b-label"
                    style={{ color: on ? 'var(--accent)' : 'var(--era-ink-muted)' }}
                  >
                    {dir.label}
                  </span>
                  {dir.control && (
                    <span
                      className="b-label text-[var(--era-ink-muted)]"
                      title="The thesis the current plan rests on."
                    >
                      current plan
                    </span>
                  )}
                  {dir.testsHypothesis && (
                    <span
                      className="b-label"
                      style={{ color: '#4F7A3F' }}
                      title="The only direction that makes the lot system visible."
                    >
                      $150 test
                    </span>
                  )}
                  {!dir.affordable && (
                    <span
                      className="b-label"
                      style={{ color: 'var(--era-ink-muted)' }}
                    >
                      {dir.needs}
                    </span>
                  )}
                </div>
              </button>
            );
          })}

          {/* The seventh: yours. The six are somebody else's six, and a tool for
              deciding what a brand is has to let you write the one that is not
              on the list. */}
          <button
            onClick={() => setSel(CUSTOM)}
            aria-pressed={isCustom}
            className="shrink-0 lg:shrink text-left w-[190px] lg:w-full min-w-0 flex flex-col items-stretch"
            style={{ minHeight: 0 }}
          >
            <div
              className="relative w-full aspect-[3/2] overflow-hidden rounded-md border transition-all flex items-center justify-center"
              style={{
                borderColor: isCustom ? 'var(--accent)' : 'var(--era-hairline)',
                backgroundColor: 'var(--era-bg-deep)',
                opacity: isCustom ? 1 : 0.6,
              }}
            >
              {custom && isCustom ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={custom} alt="Your direction" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <span className="b-label" style={{ color: 'var(--era-ink-muted)' }}>
                  + write your own
                </span>
              )}
            </div>
            <span
              className="mt-1 b-label"
              style={{ color: isCustom ? 'var(--accent)' : 'var(--era-ink-muted)' }}
            >
              Custom
            </span>
          </button>
        </div>

        {/* Right: the one you picked, large. */}
        <div
          className="rounded-md border px-4 sm:px-5 py-5 min-w-0"
          style={{ borderColor: 'var(--era-hairline)', backgroundColor: 'var(--era-bg-deep)' }}
        >
        {isCustom ? (
          <>
            <h3 className="font-display text-2xl md:text-3xl leading-tight" style={{ color: 'var(--era-ink)' }}>
              Your direction
            </h3>
            <p className="mt-1.5 text-sm max-w-xl" style={{ color: 'var(--era-ink-body)' }}>
              Describe the aesthetic in a sentence. It renders as the same rack of four as the six
              above.
            </p>

            <textarea
              value={config.directionPrompt}
              onChange={(e) => set('directionPrompt', e.target.value.slice(0, 240))}
              placeholder="e.g. sun-bleached surf utility — salt-worn cotton, faded rope tones, nothing new-looking"
              rows={3}
              className="mt-3 w-full bg-transparent border px-3 py-2 b-body outline-none focus:border-[var(--accent)] resize-y"
              style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)' }}
            />

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={renderCustom}
                disabled={busy || config.directionPrompt.trim().length < 3}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 b-label border transition-colors disabled:opacity-40"
                style={{ borderColor: 'var(--accent)', color: 'var(--accent)', minHeight: 0 }}
              >
                {busy ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                {busy ? 'Rendering…' : 'Render this direction'}
              </button>
              <span className="b-data" style={{ color: 'var(--era-ink-muted)' }}>
                {config.directionPrompt.length}/240 · spends
              </span>
            </div>

            {error && (
              <p className="mt-2 b-note" style={{ color: '#A8456E' }}>
                {error}
              </p>
            )}

            {custom && (
              <div className="relative w-full aspect-[3/2] mt-4 overflow-hidden rounded" style={{ backgroundColor: 'var(--era-bg)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={custom} alt="Your direction, rendered" className="w-full h-full object-cover" />
              </div>
            )}
          </>
        ) : (
          <>
          <h3
            className="font-display text-2xl md:text-3xl leading-tight"
            style={{ color: 'var(--era-ink)' }}
          >
            {d.label}
          </h3>
          <p className="mt-1.5 text-sm max-w-xl" style={{ color: 'var(--era-ink-body)' }}>
            {d.thesis}
          </p>
          <p
            className="mt-2 b-data leading-snug max-w-xl"
            style={{ color: d.affordable ? '#B07025' : '#A8456E' }}
          >
            {d.cost}
          </p>

          <div className="grid grid-cols-2 gap-3 mt-4">
            {(['tee', 'hoodie'] as const).map((g) => (
              <div
                key={g}
                className="relative aspect-[4/5] overflow-hidden rounded"
                style={{ backgroundColor: 'var(--era-bg)' }}
              >
                <Image
                  src={`/blank/bakeoff/${d.key}-${g}.webp`}
                  alt={`${d.label} — ${g}`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 30vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {d.control && (
            <p className="mt-3 b-note italic text-[var(--era-ink-muted)] leading-snug max-w-xl">
              The thesis the current plan rests on.
            </p>
          )}
          {d.testsHypothesis && (
            <p className="mt-3 b-note italic text-[var(--era-ink-muted)] leading-snug max-w-xl">
              The only direction that makes the lot system visible.
            </p>
          )}
          </>
        )}
        </div>
      </div>

      <p className="mt-3 b-note italic text-[var(--era-ink-muted)]">
        One fixed seed across all eighteen cells — the direction is the only variable. Judge the
        racks, not the tees.
      </p>
    </div>
  );
}
