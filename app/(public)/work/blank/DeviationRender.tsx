/**
 * "Put this graphic on this garment, in this colour, this big, in this ink."
 *
 * The library grid picks a PRESET. These controls then move each axis
 * independently — motif, placement, scale, finish, colourway — which is what
 * turns 12 fixed graphics into ~48,000 reachable variants.
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

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { useLine } from '@/lib/blank/lineState';
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

  const tier = tierIndex(config.budget) + 1;
  const graphic = config.graphic;
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
    if (!tuple || blocked) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch('/api/blank/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tuple),
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
  }, [tuple, blocked]);

  const finish = FINISHES[axes.finish];

  return (
    <div className="mt-8 pt-8 border-t" style={{ borderColor: 'var(--era-hairline)' }}>
      <h3 className="font-display text-lg mb-1" style={{ color: 'var(--era-ink)' }}>
        See it on your garment
      </h3>
      <p className="text-[13px] mb-4 max-w-2xl" style={{ color: 'var(--era-ink-muted)' }}>
        The grid above picks a starting point. Move any axis from there — the same mark can go
        small on a sleeve in tonal ink, or oversize on the back in puff. Rendered from the prompt
        library the line was generated with, so a variant looks like it belongs.
      </p>

      <div className="flex flex-wrap items-end gap-x-4 gap-y-3 mb-3">
        <Field label="Garment">
          <Select
            value={config.garment}
            onChange={(v) => set('garment', v as Garment)}
            options={GARMENTS.map((g) => [g.key, g.label])}
          />
        </Field>

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

        <Field label="Colourway">
          <Select
            value={colorway}
            onChange={(v) => set('colorway', v)}
            options={Object.entries(COLORWAYS).map(([k, c]) => [k, c.label])}
          />
        </Field>

        <Field label="Budget">
          <Select
            value={config.budget}
            onChange={(v) => set('budget', v)}
            options={STATES.map((s) => [s.slug, s.label])}
          />
        </Field>

        <button
          onClick={render}
          disabled={!graphic || !!blocked || busy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border transition-colors disabled:opacity-40"
          style={{
            borderColor: !graphic || blocked ? 'var(--era-hairline)' : 'var(--accent)',
            color: !graphic || blocked ? 'var(--era-ink-muted)' : 'var(--accent)',
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
          {/* Plain <img>: a remote, short-lived Replicate URL isn't worth adding
              to next.config remotePatterns. */}
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
        className="text-[10px] font-mono uppercase tracking-[0.15em]"
        style={{ color: 'var(--era-ink-muted)' }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}
