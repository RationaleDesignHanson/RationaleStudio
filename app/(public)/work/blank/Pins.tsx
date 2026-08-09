/**
 * The keeps shelf.
 *
 * Bake-off rounds were disposable — every round replaced the last — so the tool
 * generated a great deal and accumulated nothing. The output of an exploration is
 * a SHORTLIST, and there was nowhere for one to exist: you could look at six
 * colourways, like two of them, run another round, and lose both.
 *
 * Pinning survives the round, survives moving between beats, and travels in the
 * share link as repeated `pin` params, so "here are the four I like" is a thing
 * you can send rather than a thing you have to describe.
 *
 * Only our own Storage host is accepted on read, so a pasted link cannot inject
 * arbitrary remote images into someone else's shelf.
 */

'use client';

import { X } from 'lucide-react';
import { useLine } from '@/lib/blank/lineState';

export function usePins() {
  const { config, set } = useLine();
  const pins = config.pins;
  const isPinned = (url: string) => pins.includes(url);
  const toggle = (url: string) =>
    set('pins', isPinned(url) ? pins.filter((u) => u !== url) : [...pins, url].slice(0, 24));
  return { pins, isPinned, toggle };
}

/** A small pin control to sit on a bake-off tile. */
export function PinButton({ url }: { url: string }) {
  const { isPinned, toggle } = usePins();
  const on = isPinned(url);
  return (
    <button
      onClick={(e) => {
        // The tile itself usually selects; pinning must not also select.
        e.stopPropagation();
        toggle(url);
      }}
      aria-pressed={on}
      aria-label={on ? 'Unpin' : 'Pin this'}
      title={on ? 'Unpin' : 'Keep this'}
      className="tap absolute top-1 right-1 z-10 px-2 py-1 text-[11px] sm:text-[10px] font-mono uppercase tracking-wider border backdrop-blur"
      style={{
        minHeight: 0,
        borderColor: on ? 'var(--accent)' : 'var(--era-hairline)',
        color: on ? 'var(--accent)' : 'var(--era-ink)',
        backgroundColor: 'color-mix(in srgb, var(--era-bg) 75%, transparent)',
      }}
    >
      {on ? 'kept' : 'keep'}
    </button>
  );
}

/** The shelf itself. Renders nothing when empty rather than an empty box. */
export function PinShelf() {
  const { pins, toggle } = usePins();
  if (pins.length === 0) return null;

  return (
    <div className="mt-8 pt-5 border-t" style={{ borderColor: 'var(--era-hairline)' }}>
      <p
        className="text-[10px] font-mono uppercase tracking-[0.2em] mb-2.5"
        style={{ color: 'var(--era-ink-muted)' }}
      >
        Kept · {pins.length}
        <span style={{ color: 'var(--era-ink-muted)', opacity: 0.7 }}>
          {' '}
          — survives the round and travels in the link
        </span>
      </p>
      <div className="flex flex-wrap gap-2">
        {pins.map((url) => (
          <div key={url} className="relative" style={{ width: 84 }}>
            <div
              className="relative w-full aspect-square overflow-hidden"
              style={{ backgroundColor: 'var(--era-bg-deep)' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="Kept" className="w-full h-full object-cover" />
            </div>
            <button
              onClick={() => toggle(url)}
              aria-label="Remove from keeps"
              className="absolute -top-1.5 -right-1.5 p-0.5 border"
              style={{
                minHeight: 0,
                borderColor: 'var(--era-hairline)',
                backgroundColor: 'var(--era-bg)',
                color: 'var(--era-ink-muted)',
              }}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
