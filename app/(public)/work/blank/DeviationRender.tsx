/**
 * "Put YOUR artwork on this garment, in this colour, this big, in this ink."
 *
 * This used to render one of twelve preset print languages, which made sense when
 * a preset was the only artwork the tool had. It is not any more: marks are built
 * from the name in beat 02 and graphics come from a prompt beside them, so a
 * control that could only render somebody else's twelve had become the odd one
 * out — a third way to put something on a garment, applying the wrong something.
 *
 * ONE OWNER PER PARAMETER. This control used to offer Garment, Colourway and
 * Budget as well, all three of which are owned elsewhere now — garment and budget
 * by the cost sheet, colour by the colour beat. Three surfaces able to set the
 * same value is how the tool ended up able to contradict itself: you could pick a
 * colourway in beat 03 and a different one here. It inherits them and offers only
 * what nothing else does.
 *
 * The AXES were always the valuable part and they stay: placement, scale and
 * finish are the production vocabulary, and they are what turns one mark into a
 * back print, a sleeve hit or a tonal chest. They now point at the artwork you
 * actually chose, and it renders through apply-reference — the same route the
 * colour round uses — so "render this mark" and "generate it on a garment"
 * stopped being two features that did almost the same thing.
 *
 * Every axis lives in the URL, so a partner opening a shared link sees the
 * exact variant, not an approximation of it.
 *
 * Two rules the controls enforce so nobody hits a dead end or a wasted render:
 *
 *  - Switching garment COERCES placement and scale onto something that garment
 *    actually has (a cap has no sleeve). Motif is never swapped silently —
 *    that would change the design the user asked for — so motifs the garment
 *    cannot carry are disabled instead.
 *  - The same validator the server runs is run here first, so an impossible
 *    combination is explained in place rather than returning a 422.
 *
 * Nothing renders without a click: the endpoint costs real money, and a control
 * that fired on every dropdown change would bill on browsing.
 */

'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { useLine } from '@/lib/blank/lineState';
import { constructionsFor, randomConstructions } from '@/lib/blank/markFamily';
import { ALL_TREATMENTS, normalise } from '@/lib/blank/wordmark';
import { rasteriseMark, readFont } from '@/lib/blank/rasterise';
import { artworkDataUrl } from '@/lib/blank/signComposite';
import { STATES, GARMENTS, tierIndex, type Garment } from '@/lib/blank/line';
import { COLORWAYS, resolveAxes, validateTuple } from '@/lib/blank/prompts';
import {
  MOTIFS,
  PLACEMENTS,
  SCALES,
  FINISHES,
  availableMotifs,
  axesValid,
  coerceAxesForGarment,
} from '@/lib/blank/axes';

interface Result {
  imageUrl: string;
  cached: boolean;
}

export function DeviationRender() {
  const { config, set } = useLine();
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const probeRef = useRef<HTMLSpanElement>(null);

  // The subject is whatever you chose: a kept prompt-graphic wins over a mark,
  // because keeping one is the more recent and more deliberate act.
  const word = normalise(config.wordmark);
  const face = ALL_TREATMENTS.find((x) => x.id === config.wordmarkStyle) ?? ALL_TREATMENTS[0];
  const seedNum = Number(config.markSeed);
  const markPool =
    config.markSeed !== '' && Number.isFinite(seedNum)
      ? randomConstructions(word, seedNum)
      : constructionsFor(word);
  const construction = markPool.find((c) => c.id === config.mark) ?? null;
  const subject = config.customGraphic ? 'graphic' : construction ? 'mark' : 'none';

  const tier = tierIndex(config.budget) + 1;
  // Falls back to a real preset rather than sitting disabled. The button used to
  // be dead until you had selected a print language in a grid three sections
  // away, with nothing on screen saying so — a generative tool that refuses to
  // generate until an unstated prerequisite is met just reads as broken.
  const graphic = config.graphic ?? 'G-abstract-mark';
  const colorway = config.colorway || 'charcoal';

  // Axes default from the preset and are overridden one at a time.
  const axes = useMemo(
    () =>
      resolveAxes(graphic ?? '', {
        motif: config.motif || undefined,
        placement: config.placement || undefined,
        scale: config.scale || undefined,
        finish: config.finish || undefined,
      }),
    [graphic, config.motif, config.placement, config.scale, config.finish],
  );

  const motifsHere = useMemo(() => availableMotifs(config.garment), [config.garment]);

  // Switching garment can strand a placement that garment doesn't have.
  // Repair placement and scale; never the motif.
  useEffect(() => {
    const fixed = coerceAxesForGarment(config.garment, axes);
    if (fixed.placement !== axes.placement) set('placement', fixed.placement);
    if (fixed.scale !== axes.scale) set('scale', fixed.scale);
  }, [config.garment, axes, set]);

  const tuple = graphic ? { garment: config.garment, tier, graphic, colorway, ...axes } : null;
  const check = tuple ? validateTuple(tuple) : null;
  const blocked = check && !check.ok ? check.errors[0].reason : null;

  useEffect(() => {
    setResult(null);
    setError(null);
  }, [config.garment, config.budget, graphic, colorway, axes]);

  const render = useCallback(async () => {
    if (blocked || subject === 'none') return;
    setBusy(true);
    setError(null);
    try {
      // Artwork as an image, so what lands on the garment is the thing you chose
      // rather than a text description of something like it.
      let image: string | null = null;
      if (config.customGraphic) {
        // Lettering baked in, not sent separately. A sign panel is generated
        // blank on purpose, so posting the raw file here bought a photograph of
        // an EMPTY sign — on the only beat that spends real money.
        image = await artworkDataUrl(
          config.customGraphic,
          config.register === 'sign' ? config.signText : '',
          config.signSize,
          config.signY,
        );
      } else if (construction && probeRef.current) {
        image = rasteriseMark(construction, word, readFont(probeRef.current));
      }
      if (!image) {
        setError('Could not prepare the artwork.');
        return;
      }
      const res = await fetch('/api/blank/apply-reference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image,
          garment: config.garment,
          tier,
          colorway,
          graphic: 'G-abstract-mark',
          placement: axes.placement,
          scale: axes.scale,
          finish: axes.finish,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Render failed.');
        return;
      }
      setResult({ imageUrl: data.imageUrl, cached: data.cached });
    } catch {
      setError('Network error — try again.');
    } finally {
      setBusy(false);
    }
  }, [blocked, subject, config.customGraphic, config.garment, construction, word, tier, colorway, axes]);

  const finish = FINISHES[axes.finish];

  return (
    <div className="mt-8 pt-8 border-t" style={{ borderColor: 'var(--era-hairline)' }}>
      <span
        ref={probeRef}
        aria-hidden
        className="opacity-0 pointer-events-none"
        style={{ ...face.css, position: 'absolute', left: -9999 }}
      >
        {word || 'BLANK'}
      </span>

      <h3 className="font-display text-lg mb-1" style={{ color: 'var(--era-ink)' }}>
        Put it somewhere else on the garment
      </h3>
      <p className="text-[13px] mb-4 max-w-2xl" style={{ color: 'var(--era-ink-muted)' }}>
        Colour is decided in 03. This is placement: the same artwork can go small on a sleeve in
        tonal ink or oversize on the back in puff, and the axes are the production vocabulary rather
        than a style picker.{' '}
        {subject === 'graphic'
          ? 'Rendering your kept graphic.'
          : subject === 'mark'
            ? 'Rendering your mark.'
            : 'Pick a mark or keep a graphic in 02 first — there is nothing to place yet.'}
      </p>

      {/* Inherited, not re-offered. Stated so it is obvious where to change them. */}
      <p className="text-[11px] font-mono mb-3" style={{ color: 'var(--era-ink-muted)' }}>
        {config.garment} · {colorway} · {STATES[tier - 1]?.label ?? ''} — set in the colour and cost
        beats
      </p>

      <div className="flex flex-wrap items-end gap-x-4 gap-y-3 mb-3">

        <Field label="Motif">
          <Select
            value={axes.motif}
            onChange={(v) => set('motif', v)}
            options={Object.entries(MOTIFS).map(([k, m]) => [k, m.title, !motifsHere.includes(k)])}
          />
        </Field>

        <Field label="Placement">
          <Select
            value={axes.placement}
            onChange={(v) => set('placement', v)}
            options={Object.entries(PLACEMENTS)
              .filter(([, p]) => p.garments.includes(config.garment))
              .map(([k, p]) => [k, p.title])}
          />
        </Field>

        <Field label="Scale">
          <Select
            value={axes.scale}
            onChange={(v) => set('scale', v)}
            options={Object.entries(SCALES).map(([k, s]) => [
              k,
              s.title,
              axesValid(config.garment, axes.motif, axes.placement, k, axes.finish).length > 0,
            ])}
          />
        </Field>

        <Field label="Finish">
          <Select
            value={axes.finish}
            onChange={(v) => set('finish', v)}
            options={Object.entries(FINISHES).map(([k, f]) => [k, f.title])}
          />
        </Field>



        <button
          onClick={render}
          disabled={!!blocked || busy || subject === 'none'}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border transition-colors disabled:opacity-40"
          style={{
            borderColor: blocked ? 'var(--era-hairline)' : 'var(--accent)',
            color: blocked ? 'var(--era-ink-muted)' : 'var(--accent)',
          }}
        >
          {busy ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
          {busy ? 'Rendering…' : 'Render it'}
        </button>
      </div>

      {/* Cost consequence at the point of choosing, not after. */}
      {finish && (
        <p className="text-[11px] mb-2" style={{ color: 'var(--era-ink-muted)' }}>
          <span style={{ color: 'var(--era-ink)' }}>{finish.title}:</span> {finish.costNote}
          {!finish.stage0 && <span style={{ color: '#A8456E' }}> Off the Stage 0 rate card.</span>}
        </p>
      )}

      {!graphic && (
        <p className="text-[12px]" style={{ color: 'var(--era-ink-muted)' }}>
          Choose a graphic above first.
        </p>
      )}

      {blocked && (
        <p className="text-[12px]" style={{ color: '#A8456E' }}>
          {blocked}. The line can&rsquo;t make that, so it isn&rsquo;t rendered.
        </p>
      )}

      {error && (
        <p className="text-[12px]" style={{ color: '#A8456E' }}>
          {error}
        </p>
      )}

      {result && (
        <figure className="mt-4 max-w-sm">
          {/* Plain <img>: renders are served from our own Supabase Storage
              bucket, so the URL is durable — but it stays unoptimised rather
              than going through next/image, because these are one-off
              deviations that no second visitor is likely to request. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={result.imageUrl}
            alt={`${MOTIFS[axes.motif]?.title} on a ${config.garment}, ${COLORWAYS[colorway]?.label}`}
            className="w-full"
            style={{ backgroundColor: 'var(--era-bg-deep)' }}
          />
          <figcaption
            className="mt-1.5 text-[11px] font-mono flex flex-wrap gap-x-3 gap-y-0.5"
            style={{ color: 'var(--era-ink-muted)' }}
          >
            <span>
              {MOTIFS[axes.motif]?.title} · {SCALES[axes.scale]?.title} ·{' '}
              {PLACEMENTS[axes.placement]?.title} · {FINISHES[axes.finish]?.title}
            </span>
            <span>{COLORWAYS[colorway]?.label}</span>
            <span>Imagen 4</span>
            <span>{result.cached ? 'cached' : 'generated'}</span>
            <span>AI-generated — not a photograph of product</span>
          </figcaption>
        </figure>
      )}
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  /** [value, label, disabled?] */
  options: (string | boolean | undefined)[][];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-transparent text-[12px] font-mono border px-2 py-1.5"
      style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)' }}
    >
      {options.map(([v, label, disabled]) => (
        <option key={String(v)} value={String(v)} disabled={Boolean(disabled)}>
          {String(label)}
          {disabled ? ' — n/a' : ''}
        </option>
      ))}
    </select>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span
        className="text-[11px] sm:text-[10px] font-mono uppercase tracking-[0.15em]"
        style={{ color: 'var(--era-ink-muted)' }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}
