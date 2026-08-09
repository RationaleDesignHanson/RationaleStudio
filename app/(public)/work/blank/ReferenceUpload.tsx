/**
 * Drop a reference → get its cost, whether we can make it, and the nearest
 * variants we can actually execute.
 *
 * The image never leaves the browser except as a one-shot analysis request; it
 * is not stored anywhere. The analysis comes back in the cost model's own
 * vocabulary, so pricing happens locally against lib/blank/economics.ts —
 * the same tested function behind the budget lever.
 */

'use client';

import { useState, useRef } from 'react';
import { useLine } from '@/lib/blank/lineState';
import { tierIndex } from '@/lib/blank/line';
import { Loader2, Sparkles } from 'lucide-react';
import Image from 'next/image';
import {
  BLANKS,
  stage0Cogs,
  grossMargin,
  minRetailForFloor,
  MARGIN_FLOOR,
  type DecorationMethod,
  type RunSize,
} from '@/lib/blank/economics';

interface Analysis {
  garment: string;
  decoration: string;
  colors: number;
  sizeInches: number;
  placement: string;
  tonal: boolean;
  confidence: 'high' | 'medium' | 'low';
  notes: string;
}

/** Producibility rules from reference/streetweardrilldown.md PART 1. */
interface Verdict {
  ok: boolean;
  blockers: string[];
  warnings: string[];
}

function judge(a: Analysis): Verdict {
  const blockers: string[] = [];
  const warnings: string[] = [];

  // The trap that killed B3: discharge only attacks reactive dye, and AS Colour
  // caps faded goods at 132–140°C while discharge needs >=168°C to cure.
  if (a.decoration === 'discharge') {
    blockers.push(
      'Discharge cannot be run on a pigment- or garment-dyed blank — the dye will not discharge, and the cure temperature exceeds the blank’s ceiling. Needs a reactive-dyed blank, or re-spec as water-based over a blocker.',
    );
  }
  if (a.decoration === 'patch') {
    blockers.push('An applied patch adds a cut piece plus tack-down labour per unit — not a Stage 0 decoration.');
  }
  if (a.decoration === 'woven-label') {
    blockers.push('Woven labels carry a ~200-piece decorator minimum. Stage 1, not Stage 0.');
  }
  if (a.sizeInches > 16) {
    blockers.push(
      `At ~${a.sizeInches}in this exceeds the 14×16in standard platen. Jumbo frames are a specialist job most shops will decline.`,
    );
  } else if (a.sizeInches > 12) {
    warnings.push(`~${a.sizeInches}in is an oversized front hit. Confirm platen size before ordering.`);
  }
  if (a.colors > 3) {
    warnings.push(
      `${a.colors} spot colours means ${a.colors} screens and ${a.colors} passes. Each is a fixed setup — the cost cliff is real at 50 units.`,
    );
  }
  if (a.decoration === 'dtg') {
    warnings.push('DTG needs a light, smooth, cotton-rich surface — it fights garment dye and heather.');
  }
  if (a.decoration === 'embroidery' && a.sizeInches > 4) {
    warnings.push('Embroidery above ~4in climbs past 15,000 stitches, where per-unit cost stops being trivial.');
  }
  if (a.tonal && a.decoration === 'screen') {
    warnings.push('Tonal on a faded blank needs an underbase blocker — that is an extra screen and an extra pass.');
  }
  return { ok: blockers.length === 0, blockers, warnings };
}

/**
 * What to CALL each method on screen. The analyser returns trade enums and they
 * were being printed raw, so a reference came back headlined "dtf · 11in · 4
 * colours" — which reads as a typo unless you already know the trade.
 */
const DECORATION_READABLE: Record<string, string> = {
  screen: 'Screen print',
  discharge: 'Discharge print',
  dtf: 'Heat-press print',
  dtg: 'Direct-to-garment print',
  embroidery: 'Embroidery',
  patch: 'Applied patch',
  'woven-label': 'Woven label',
  none: 'No decoration',
  unclear: 'Method unclear',
};

const DECORATION_MAP: Record<string, DecorationMethod | null> = {
  screen: 'screen',
  discharge: 'discharge',
  dtf: 'dtf',
  dtg: 'dtg',
  embroidery: 'embroidery',
  none: 'none',
  patch: null,
  'woven-label': null,
  unclear: null,
};

/** Producible options from the graphics library, ranked by closeness. */
function nearestExecutable(a: Analysis): { id: string; title: string; why: string }[] {
  const out: { id: string; title: string; why: string }[] = [];
  if (a.decoration === 'discharge' || (a.tonal && a.decoration !== 'embroidery')) {
    out.push({ id: 'G-tonal-emboss', title: 'Tonal / no-contrast', why: 'Same quiet read, achievable with tonal ink over a blocker.' });
  }
  if (a.sizeInches > 12) {
    out.push({ id: 'G-back-panel', title: 'Back-panel graphic', why: 'Keeps the scale, inside the standard platen.' });
  }
  if (a.colors > 3) {
    out.push({ id: 'G-abstract-mark', title: 'Abstract mark', why: 'Reduce to one spot colour — one screen, one pass.' });
  }
  if (a.decoration === 'patch' || a.decoration === 'woven-label') {
    out.push({ id: 'G-embroidered-patch', title: 'Applied patch', why: 'The nearest costed equivalent — note the tack-down labour.' });
  }
  if (a.decoration === 'embroidery') {
    out.push({ id: 'G-pocket-hit', title: 'Pocket-scale hit', why: 'Small mark, well under the stitch-count cliff.' });
  }
  if (out.length === 0) {
    out.push({ id: 'G-abstract-mark', title: 'Abstract mark', why: 'Closest producible match at 1 colour.' });
  }
  return out.slice(0, 3);
}

const dollars = (n: number) => `$${n.toFixed(2)}`;
const pct = (n: number) => `${(n * 100).toFixed(1)}%`;

/**
 * Shrink to fit comfortably inside the request ceiling before upload.
 *
 * A phone photo is routinely 6MB+, which the server has to refuse. Downscaling
 * to 1600px and re-encoding as JPEG puts a typical reference at a few hundred
 * KB, so the size limit stops being something a partner ever meets. It also
 * cuts what leaves their machine, which matters because this image is going to
 * a third-party model.
 */
async function downscale(file: File, maxEdge = 1600, quality = 0.85): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not read that image.');
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close?.();
  return canvas.toDataURL('image/jpeg', quality);
}

export function ReferenceUpload() {
  const { config } = useLine();
  const [applied, setApplied] = useState<{ imageUrl: string; cached: boolean } | null>(null);
  const [applying, setApplying] = useState(false);
  const [applyError, setApplyError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError(null);
    setAnalysis(null);
    setApplied(null);
    setApplyError(null);

    let dataUrl: string;
    try {
      dataUrl = await downscale(file);
    } catch {
      setError('Could not read that image.');
      return;
    }
    setPreview(dataUrl);
    setBusy(true);
    try {
      const r = await fetch('/api/blank/analyze-reference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: { media_type: 'image/jpeg', data: dataUrl.split(',')[1] },
        }),
      });
      const json = await r.json();
      if (!r.ok) throw new Error(json.error ?? 'Analysis failed.');
      setAnalysis(json.analysis);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Analysis failed.');
    } finally {
      setBusy(false);
    }
  }

  async function applyToGarment() {
    if (!preview) return;
    setApplying(true);
    setApplyError(null);
    try {
      const r = await fetch('/api/blank/apply-reference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: preview,
          garment: config.garment,
          tier: tierIndex(config.budget) + 1,
          colorway: config.colorway || 'charcoal',
          graphic: config.graphic ?? 'G-abstract-mark',
          placement: config.placement || undefined,
          scale: config.scale || undefined,
          finish: config.finish || undefined,
        }),
      });
      const json = await r.json();
      if (!r.ok) throw new Error(json.error ?? 'Render failed.');
      setApplied({ imageUrl: json.imageUrl, cached: json.cached });
    } catch (e) {
      setApplyError(e instanceof Error ? e.message : 'Render failed.');
    } finally {
      setApplying(false);
    }
  }

  const verdict = analysis ? judge(analysis) : null;
  const method = analysis ? DECORATION_MAP[analysis.decoration] : null;

  // Price it on the recommended Stage 0 blank at 50 units.
  const priced =
    analysis && method
      ? (() => {
          const blank = analysis.garment === 'hoodie' ? BLANKS.as5166 : BLANKS.shakaSHGD;
          const cogs = stage0Cogs({
            blank,
            decoration: {
              method,
              colors: Math.max(1, analysis.colors),
              stitches: Math.round(analysis.sizeInches * 3000),
            },
            run: 50 as RunSize,
            relabel: 'printedNeck',
          });
          const retail = analysis.garment === 'hoodie' ? 110 : 55;
          return { blank, cogs, retail, gm: grossMargin(retail, cogs.landedCOGS) };
        })()
      : null;

  return (
    <div className="my-4 grid md:grid-cols-[280px_1fr] gap-5 items-start">
      {/* Drop zone */}
      <div>
        <button
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const f = e.dataTransfer.files?.[0];
            if (f) handleFile(f);
          }}
          className="w-full flex flex-col items-stretch border border-dashed rounded-md overflow-hidden transition-colors"
          style={{ borderColor: 'var(--era-hairline)' }}
        >
          <div
            className="relative w-full aspect-[4/5] flex items-center justify-center"
            style={{ backgroundColor: 'var(--era-bg-deep)' }}
          >
            {preview ? (
              <Image src={preview} alt="Your reference" fill className="object-cover" unoptimized />
            ) : (
              <span className="text-[12px] px-4 text-center" style={{ color: 'var(--era-ink-muted)' }}>
                Drop a reference, or click to choose
              </span>
            )}
          </div>
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          className="sr-only"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
        <p className="mt-2 text-[11px] leading-snug" style={{ color: 'var(--era-ink-muted)' }}>
          Analysed once and discarded — the image is never stored. Large files are resized in your browser before they leave it.
        </p>
      </div>

      {/* Result */}
      <div>
        {busy && (
          <p className="text-sm" style={{ color: 'var(--era-ink-muted)' }}>
            Reading the reference…
          </p>
        )}
        {error && (
          <p className="text-sm" style={{ color: '#A8456E' }}>
            {error}
          </p>
        )}
        {!busy && !error && !analysis && (
          <p className="text-sm max-w-xl" style={{ color: 'var(--era-ink-body)' }}>
            Upload a garment or graphic you like. It gets classified into the same vocabulary the
            cost model uses — technique, colour count, print size, placement — then priced against
            a real blank, with the producibility rules applied.
          </p>
        )}

        {preview && !busy && (
          <div className="mb-4 pb-4 border-b" style={{ borderColor: 'var(--era-hairline)' }}>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={applyToGarment}
                disabled={applying}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border transition-colors disabled:opacity-40"
                style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
              >
                {applying ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Sparkles className="w-3 h-3" />
                )}
                {applying ? 'Rendering…' : `Put it on the ${config.garment}`}
              </button>
              <span className="text-[11px] font-mono" style={{ color: 'var(--era-ink-muted)' }}>
                Uses the garment, colourway and axes set above
              </span>
            </div>

            {applyError && (
              <p className="mt-2 text-[12px]" style={{ color: '#A8456E' }}>
                {applyError}
              </p>
            )}

            {applied && (
              <figure className="mt-4 max-w-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={applied.imageUrl}
                  alt={`Your reference applied to a ${config.garment}`}
                  className="w-full"
                  style={{ backgroundColor: 'var(--era-bg-deep)' }}
                />
                <figcaption
                  className="mt-1.5 text-[11px] font-mono flex flex-wrap gap-x-3"
                  style={{ color: 'var(--era-ink-muted)' }}
                >
                  <span>Your reference · {config.garment}</span>
                  <span>Seedream 4</span>
                  <span>{applied.cached ? 'cached' : 'generated'}</span>
                  <span>AI-generated — not a photograph of product</span>
                </figcaption>
                <p className="mt-1.5 text-[11px]" style={{ color: 'var(--era-ink-muted)' }}>
                  Your upload is never stored — only a hash of it, so the same artwork
                  doesn&rsquo;t get charged twice.
                </p>
              </figure>
            )}
          </div>
        )}

        {analysis && verdict && (
          <>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-display text-xl" style={{ color: 'var(--era-ink)' }}>
                {DECORATION_READABLE[analysis.decoration] ?? analysis.decoration} · {analysis.sizeInches}in ·{' '}
                {analysis.colors === 0 ? 'no' : analysis.colors} colour
                {analysis.colors === 1 ? '' : 's'}
              </h3>
              <span className="text-[11px] font-mono uppercase tracking-wider" style={{ color: 'var(--era-ink-muted)' }}>
                {analysis.confidence} confidence
              </span>
            </div>
            <p className="mt-1 text-[13px]" style={{ color: 'var(--era-ink-body)' }}>
              {analysis.garment} · {analysis.placement}
              {analysis.tonal ? ' · tonal' : ''} — {analysis.notes}
            </p>

            {priced && (
              <dl className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2 font-mono text-[12px] tabular-nums">
                {[
                  ['On blank', priced.blank.name],
                  ['COGS @ 50u', dollars(priced.cogs.landedCOGS)],
                  [`Margin @ $${priced.retail}`, pct(priced.gm)],
                  ['Floor needs', dollars(minRetailForFloor(priced.cogs.landedCOGS))],
                ].map(([k, v], i) => (
                  <div key={k as string} className="border-b pb-1" style={{ borderColor: 'var(--era-hairline)' }}>
                    <dt className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--era-ink-muted)' }}>
                      {k}
                    </dt>
                    <dd style={{ color: i === 2 && priced.gm < MARGIN_FLOOR ? '#A8456E' : 'var(--era-ink)' }}>{v}</dd>
                  </div>
                ))}
              </dl>
            )}

            {verdict.blockers.map((b) => (
              <p key={b} className="mt-3 text-[13px] leading-snug" style={{ color: '#A8456E' }}>
                <strong>Can’t make this:</strong> {b}
              </p>
            ))}
            {verdict.warnings.map((w) => (
              <p key={w} className="mt-2 text-[12px] leading-snug" style={{ color: '#B07025' }}>
                {w}
              </p>
            ))}

            <div className="mt-5">
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--era-ink-muted)' }}>
                We can execute
              </p>
              <div className="grid grid-cols-3 gap-3">
                {nearestExecutable(analysis).map((v) => (
                  <figure key={v.id}>
                    <div
                      className="relative w-full aspect-[4/5] overflow-hidden rounded"
                      style={{ backgroundColor: 'var(--era-bg-deep)' }}
                    >
                      <Image src={`/blank/${v.id}.webp`} alt={v.title} fill sizes="20vw" className="object-cover" />
                    </div>
                    <figcaption className="mt-1.5">
                      <span className="block text-[11px]" style={{ color: 'var(--era-ink)' }}>
                        {v.title}
                      </span>
                      <span className="block text-[10px] leading-snug" style={{ color: 'var(--era-ink-muted)' }}>
                        {v.why}
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
