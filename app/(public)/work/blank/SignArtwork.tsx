/**
 * A generated sign panel with real type set into it.
 *
 * THE DIVISION OF LABOUR. A place graphic in the `sign` register comes back
 * deliberately blank — see the `place` kind in the bake-off route. Image models
 * cannot spell, and a catalogue is the worst possible place to find that out: a
 * misspelling you would catch once is a misspelling you would ship ninety-nine
 * times. So the model draws the OBJECT — the reflective field, the border, the
 * bolt heads, the post — and the words are set here, in type, from state.
 *
 * That means the lettering is always correctly spelled, costs nothing to change,
 * re-renders instantly for a different place, and travels in the share link as
 * text. It is the same argument the wordmark beats make, and it is the reason
 * the catalogue business is tractable at all: one generated panel plus a text
 * field is a hundred products.
 *
 * ON THE TYPEFACE. Real US guide signs are set in FHWA Series ("Highway
 * Gothic") or Clearview. This ships neither, so what follows is an
 * APPROXIMATION — a tight uppercase grotesque with the letterspacing opened up.
 * It reads right at a glance and it is not the real thing; anything going to
 * print should be reset in the actual face.
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { useLine } from '@/lib/blank/lineState';

/** `/` starts a new line, so "MOLLY PITCHER / NJ" is two lines. Max two. */
export function signLines(text: string): string[] {
  return text
    .split('/')
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, 2);
}

/**
 * A cap height, as a percent of panel width, that keeps the longest line inside
 * the sign face.
 *
 * A generated panel's green field is roughly two thirds of the frame, and a
 * grotesque at this tracking runs about 0.6em per character — so the widest cap
 * height that fits N characters is 62 / (N x 0.6), or ~103/N. Without this the
 * default of 11% put MOLLY PITCHER straight out over both edges of its own sign,
 * and every place name is a different length, so no single default works.
 */
export function fittedSize(text: string): number {
  const longest = signLines(text).reduce((n, l) => Math.max(n, l.length), 0);
  if (longest === 0) return 11;
  return Math.max(4, Math.min(20, Math.round(103 / longest)));
}

export function SignArtwork({
  url,
  text,
  size,
  y,
  /** Rendered width in px, so the type can scale with the container. */
  width,
}: {
  url: string;
  text: string;
  size: number;
  y: number;
  width: number;
}) {
  const lines = signLines(text);
  return (
    <span className="absolute inset-0 block">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt="" className="w-full h-full object-cover" />
      {lines.length > 0 && (
        <span
          className="absolute left-1/2 flex flex-col items-center"
          style={{
            top: `${y}%`,
            transform: 'translate(-50%, -50%)',
            // Sign lettering is white with a hairline of the panel's own dark
            // green behind it, which is what stops it dissolving into the field.
            color: '#FFFFFF',
            textShadow: '0 1px 2px rgba(0,0,0,0.45)',
            fontSize: (width * size) / 100,
            lineHeight: 1.05,
            letterSpacing: '0.04em',
            fontWeight: 600,
            textAlign: 'center',
            whiteSpace: 'pre',
          }}
        >
          {lines.map((l, i) => (
            <span key={i}>{l.toUpperCase()}</span>
          ))}
        </span>
      )}
    </span>
  );
}

/**
 * The controls. Deliberately three: the words, how big, how high. A sign panel
 * arrives at a different shape in every take of a round, so there is no single
 * correct position to compute — but there is one a person can find in two
 * seconds by dragging.
 */
export function SignComposer({ url }: { url: string }) {
  const { config, set, setImplied } = useLine();

  // Auto-fit until the size slider is touched, then never again — a place name
  // is a different length every time, so a fixed default is wrong for almost
  // all of them, but silently overriding a deliberate choice is worse.
  const [sized, setSized] = useState(false);
  const sizedRef = useRef(sized);
  sizedRef.current = sized;
  useEffect(() => {
    if (sizedRef.current) return;
    const fit = fittedSize(config.signText);
    if (fit !== config.signSize) setImplied('signSize', fit);
  }, [config.signText, config.signSize, setImplied]);

  return (
    <div className="mt-5 pt-5 border-t" style={{ borderColor: 'var(--era-hairline)' }}>
      <p
        className="b-label mb-2.5"
        style={{ color: 'var(--era-ink-muted)' }}
      >
        Set the type into it
      </p>

      <div className="grid gap-5 sm:grid-cols-[minmax(0,260px)_minmax(0,1fr)] items-start">
        <div
          className="relative w-full aspect-square overflow-hidden"
          style={{ backgroundColor: 'var(--era-bg-deep)' }}
        >
          <SignArtwork
            url={url}
            text={config.signText}
            size={config.signSize}
            y={config.signY}
            width={260}
          />
        </div>

        <div className="space-y-3">
          <label className="block">
            <span
              className="block b-label mb-1.5"
              style={{ color: 'var(--era-ink-muted)' }}
            >
              The words — a slash starts a new line
            </span>
            <input
              value={config.signText}
              onChange={(e) => set('signText', e.target.value.slice(0, 48))}
              placeholder="MOLLY PITCHER / NJ"
              size={1}
              className="tap w-full min-w-0 px-3 py-2.5 b-body bg-transparent border outline-none focus:border-[var(--accent)]"
              style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)' }}
            />
          </label>

          <Slider
            label="Size"
            value={config.signSize}
            min={4}
            max={30}
            onChange={(v) => {
              setSized(true);
              set('signSize', v);
            }}
            format={(v) => `${v}%`}
          />
          <Slider
            label="Height"
            value={config.signY}
            min={5}
            max={95}
            onChange={(v) => set('signY', v)}
            format={(v) => `${v}%`}
          />

          <p className="b-note max-w-md" style={{ color: 'var(--era-ink-muted)' }}>
            The face is an approximation of the real highway series — close enough to judge, not
            close enough to print.
          </p>
        </div>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  return (
    <label className="flex items-center gap-3">
      <span
        className="b-label shrink-0"
        style={{ color: 'var(--era-ink-muted)', width: '4rem' }}
      >
        {label}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="tap flex-1 min-w-0 accent-[var(--accent)]"
        style={{ minHeight: 0 }}
      />
      <span
        className="b-data shrink-0 text-right"
        style={{ color: 'var(--era-ink)', width: '2.5rem' }}
      >
        {format(value)}
      </span>
    </label>
  );
}
