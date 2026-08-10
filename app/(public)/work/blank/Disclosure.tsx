/**
 * Progressive disclosure for the material that is reference rather than decision.
 *
 * The page's IA problem was that everything sat at one level: a 22-plate archive
 * got the same visual weight as the mark you actually have to choose, so nothing
 * announced what was being decided. Provenance and escape hatches go in here.
 *
 * Native <details>, deliberately. It is keyboard accessible, announces its state
 * to screen readers, survives find-in-page (browsers expand a closed details to
 * reveal a match), works with JS off, and needs no state. A div with a useState
 * toggle would be worse in all four ways.
 */

'use client';

export function Disclosure({
  summary,
  hint,
  children,
  defaultOpen = false,
}: {
  summary: string;
  hint?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details open={defaultOpen} className="group mt-8 border-t pt-5" style={{ borderColor: 'var(--era-hairline)' }}>
      <summary
        className="cursor-pointer list-none flex items-baseline gap-2 select-none"
        style={{ color: 'var(--era-ink)' }}
      >
        <span
          className="b-data transition-transform group-open:rotate-90 shrink-0"
          style={{ color: 'var(--accent)' }}
          aria-hidden
        >
          ▸
        </span>
        <span className="font-display text-lg">{summary}</span>
        {hint && (
          <span className="b-data" style={{ color: 'var(--era-ink-muted)' }}>
            {hint}
          </span>
        )}
      </summary>
      <div className="mt-4">{children}</div>
    </details>
  );
}
