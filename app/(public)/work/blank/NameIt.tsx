/**
 * NameIt — the first beat, and the masthead.
 *
 * The h1 IS the input. Naming opens the experience because it is the cheapest
 * interaction here (no generation, no latency, no spend), because it is what two
 * people actually argue about first, and because the word's LENGTH is a hard
 * production constraint — length x tracking is what clears the 14in platen, so
 * the name gates the treatments below it rather than following from them.
 *
 * It also removes an inconsistency: the title was hardcoded to "Blank" while a
 * section three chapters down invited you to type something else, so naming the
 * line ATLAS left the page still calling it Blank.
 *
 * Rendered as an <input> styled to look like the heading rather than a heading
 * with contentEditable: contentEditable has no accessible name, no value
 * semantics, fires no change event React can bind cleanly, and pastes markup.
 * An input is the honest control. It carries an <h1> beside it for document
 * structure, visually hidden, so the page still has exactly one real heading.
 */

'use client';

import { useLine } from '@/lib/blank/lineState';
import { normalise } from '@/lib/blank/wordmark';

export function NameIt() {
  const { config, set } = useLine();
  const shown = normalise(config.wordmark) || 'BLANK';

  return (
    <div>
      {/* Real heading for document structure and screen readers. The visible
          control below is an input, which cannot serve as the page heading. */}
      <h1 className="sr-only">{shown} — line plan</h1>

      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <label className="shrink-0">
          <span className="sr-only">The name of the line</span>
          <input
            value={config.wordmark}
            onChange={(e) => set('wordmark', e.target.value.slice(0, 18))}
            placeholder="BLANK"
            aria-label="Name of the line"
            spellCheck={false}
            autoComplete="off"
            className="font-display leading-none bg-transparent border-b outline-none transition-colors focus:border-[var(--accent)] w-[min(9ch,60vw)] sm:w-auto"
            style={{
              fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)',
              color: 'var(--era-ink)',
              borderColor: 'var(--era-hairline)',
              // Sized to the content so the rule under it reads as an edit
              // affordance rather than as a long empty field.
              width: `${Math.max(5, config.wordmark.length + 1)}ch`,
              maxWidth: '100%',
            }}
          />
        </label>

        <p className="text-sm md:text-base min-w-0" style={{ color: 'var(--era-ink-body)' }}>
          Name it, then price it.{' '}
          <span style={{ color: 'var(--era-ink-muted)' }}>
            Quiet is expensive to make and loud is cheap — and how long the word is decides what can
            be made at all.
          </span>
        </p>
      </div>
    </div>
  );
}
