/**
 * The wordmark you drew on 01, shown at the top of 02.
 *
 * WHY IT IS HERE AND NOT ONLY IN MarkFamily. MarkFamily carries its own copy of
 * this strip, with a button that redraws the mark from the wordmark — but on the
 * catalogue path MarkFamily sits inside a closed disclosure, so that copy is in
 * the DOM and invisible. Putting the fix somewhere the user has to open a
 * disclosure to find is not fixing it.
 *
 * So the catalogue path gets this: display only, at the top, above everything.
 * It answers the question the beat opens with — what did I bring with me — and
 * says plainly where the image is being used, because the previous behaviour
 * was to carry it silently or lose it silently, and both read the same from the
 * outside.
 */

'use client';

import { useLine } from '@/lib/blank/lineState';

export function InheritedWordmark() {
  const { config } = useLine();
  const url = config.art.wordmark;
  if (!url) return null;

  return (
    <div
      className="flex items-center gap-3 mb-5 p-2 border"
      style={{ borderColor: 'var(--era-hairline)' }}
    >
      <span className="block shrink-0" style={{ width: '3.5rem', aspectRatio: '1', background: '#000' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt="The wordmark you drew" className="w-full h-full object-contain" />
      </span>
      <span className="min-w-0">
        <span className="block b-label" style={{ color: 'var(--era-ink)' }}>
          your wordmark, from 01
        </span>
        <span className="block b-note" style={{ color: 'var(--era-ink-muted)' }}>
          {config.art.graphic
            ? 'kept. The graphics below are what goes on the chest.'
            : 'kept — and on the chest until a graphic replaces it.'}
        </span>
      </span>
    </div>
  );
}
