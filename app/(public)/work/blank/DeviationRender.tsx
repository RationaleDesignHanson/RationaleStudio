/**
 * "Put this graphic on this garment, in this colour."
 *
 * The canonical 15 plates cover garment x tier with the tier's own decoration.
 * Everything else — a specific graphic from the library, on a specific garment,
 * in a colourway other than charcoal — is 885 more images, so it renders on
 * demand and gets cached on the tuple.
 *
 * Nothing renders without a click. The endpoint costs real money and a control
 * that fires on every dropdown change would bill on browsing.
 */

'use client';

import { useCallback, useEffect, useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { useLine } from '@/lib/blank/lineState';
import { STATES, GARMENTS, tierIndex } from '@/lib/blank/line';
import { COLORWAYS, GRAPHIC_SPECS, validateTuple } from '@/lib/blank/prompts';

interface Result {
  imageUrl: string;
  cached: boolean;
  seed: number;
}

export function DeviationRender() {
  const { config, set } = useLine();
  const [colorway, setColorway] = useState('charcoal');
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tier = tierIndex(config.budget) + 1;
  const graphic = config.graphic;

  const tuple = graphic ? { garment: config.garment, tier, graphic, colorway } : null;
  const check = tuple ? validateTuple(tuple) : null;
  // Same validator the server runs, so an impossible combination is explained
  // here instead of coming back as a 422.
  const blocked = check && !check.ok ? check.errors[0].reason : null;

  // A new combination is a different image; drop the stale one rather than
  // showing the previous render under new labels.
  useEffect(() => {
    setResult(null);
    setError(null);
  }, [config.garment, config.budget, config.graphic, colorway]);

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
      setResult({ imageUrl: data.imageUrl, cached: data.cached, seed: data.seed });
    } catch {
      setError('Network error — try again.');
    } finally {
      setBusy(false);
    }
  }, [tuple, blocked]);

  return (
    <div className="mt-8 pt-8 border-t" style={{ borderColor: 'var(--era-hairline)' }}>
      <h3 className="font-display text-lg mb-1" style={{ color: 'var(--era-ink)' }}>
        See it on your garment
      </h3>
      <p className="text-[13px] mb-4 max-w-2xl" style={{ color: 'var(--era-ink-muted)' }}>
        The plates above are one garment in one colour. Pick a graphic, a garment and a colourway
        and it gets rendered from the same prompt library the line was generated with — so a
        variant looks like it belongs, not like a different brand.
      </p>

      <div className="flex flex-wrap items-end gap-4 mb-4">
        <Field label="Garment">
          <select
            value={config.garment}
            onChange={(e) => set('garment', e.target.value as typeof config.garment)}
            className="bg-transparent text-[12px] font-mono border px-2 py-1.5"
            style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)' }}
          >
            {GARMENTS.map((g) => (
              <option key={g.key} value={g.key}>
                {g.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Colourway">
          <select
            value={colorway}
            onChange={(e) => setColorway(e.target.value)}
            className="bg-transparent text-[12px] font-mono border px-2 py-1.5"
            style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)' }}
          >
            {Object.entries(COLORWAYS).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Budget">
          <select
            value={config.budget}
            onChange={(e) => set('budget', e.target.value)}
            className="bg-transparent text-[12px] font-mono border px-2 py-1.5"
            style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)' }}
          >
            {STATES.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.label}
              </option>
            ))}
          </select>
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
          {/* Deliberately a plain <img>: the source is a Replicate URL, which is
              remote, short-lived and not worth adding to next.config domains. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={result.imageUrl}
            alt={`${GRAPHIC_SPECS[graphic!]?.title} on a ${config.garment}, ${COLORWAYS[colorway].label}`}
            className="w-full"
            style={{ backgroundColor: 'var(--era-bg-deep)' }}
          />
          <figcaption
            className="mt-1.5 text-[11px] font-mono flex flex-wrap gap-x-3"
            style={{ color: 'var(--era-ink-muted)' }}
          >
            <span>
              {GRAPHIC_SPECS[graphic!]?.title} · {COLORWAYS[colorway].label} ·{' '}
              {STATES[tier - 1].label}
            </span>
            <span>Imagen 4</span>
            <span>{result.cached ? 'cached' : 'generated'}</span>
            <span>AI-generated — not a photograph of product</span>
          </figcaption>
          {GRAPHIC_SPECS[graphic!]?.renderCaveat && (
            <p className="mt-2 text-[11px]" style={{ color: '#A8456E' }}>
              {GRAPHIC_SPECS[graphic!].renderCaveat}
            </p>
          )}
        </figure>
      )}
    </div>
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
