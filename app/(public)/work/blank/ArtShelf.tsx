/**
 * Everything you drew, in one place, for nothing.
 *
 * WHY IT EXISTS. Artwork made in an early beat had no presence in any later one
 * — a wordmark drawn on 01 was invisible from 02 onward, and a place graphic
 * kept on 02 only ever appeared as whatever happened to be on the chest. So the
 * end of the run showed a lookbook and no evidence of the work that produced it.
 *
 * This is deliberately NOT a render. It costs nothing, needs no model and no
 * network — it is the images already made, laid out. The lookbook underneath is
 * the expensive shot; this is the receipt.
 *
 * It also does the honest arithmetic on a catalogue. `designs` is what the cost
 * sheet is built on, and a line can plan twenty-four and have drawn three; the
 * difference is stated rather than left to be assumed away.
 */

'use client';

import { useLine, allArt } from '@/lib/blank/lineState';

const ROLE_NOTE: Record<string, string> = {
  wordmark: 'the name',
  mark: 'at the neck',
  graphic: 'front print',
};

export function ArtShelf() {
  const { config } = useLine();
  const made = allArt(config);
  const variants = config.variants.filter((v) => v.graphic);
  if (made.length === 0 && variants.length === 0) return null;

  return (
    <section className="mb-8">
      <h3
        className="b-label pb-2 mb-3 border-b"
        style={{ color: 'var(--era-ink)', borderColor: 'var(--era-hairline)' }}
      >
        What you drew
      </h3>

      {made.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {made.map((a) => (
            <figure key={a.role} className="m-0" style={{ width: '7rem' }}>
              <span
                className="block relative"
                style={{
                  aspectRatio: '1',
                  background: 'var(--era-bg-deep)',
                  outline: config.frontPrint === a.role ? '2px solid var(--accent)' : 'none',
                  outlineOffset: '2px',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.url} alt={a.role} className="w-full h-full object-contain" />
              </span>
              <figcaption className="mt-1.5">
                <span className="block b-label" style={{ color: 'var(--era-ink)' }}>
                  {a.role}
                </span>
                <span className="block b-note" style={{ color: 'var(--era-ink-muted)' }}>
                  {config.frontPrint === a.role ? 'on the chest' : ROLE_NOTE[a.role]}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {variants.length > 0 && (
        <div className="mt-4">
          <p className="b-label mb-2" style={{ color: 'var(--era-ink-muted)' }}>
            The catalogue — {variants.length} drawn
            {config.designs > variants.length ? ` of ${config.designs} planned` : ''}
          </p>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => (
              <figure key={v.label} className="m-0" style={{ width: '4.5rem' }}>
                <span className="block" style={{ aspectRatio: '1', background: 'var(--era-bg-deep)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={v.graphic!} alt={v.label} className="w-full h-full object-cover" />
                </span>
                <figcaption
                  className="mt-1 b-note truncate"
                  style={{ color: 'var(--era-ink-muted)' }}
                  title={v.label}
                >
                  {v.label}
                </figcaption>
              </figure>
            ))}
          </div>
          {config.designs > variants.length && (
            <p className="mt-2 b-note" style={{ color: 'var(--era-ink-muted)' }}>
              The costing assumes {config.designs}. The other{' '}
              {config.designs - variants.length} still have to be drawn.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
