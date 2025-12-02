/**
 * ASCII Divider Component
 *
 * Subtle ASCII pattern dividers for section breaks.
 * Part of Creative-Intelligent Futurism aesthetic.
 */

interface ASCIIDividerProps {
  pattern?: 'forward' | 'lateral' | 'foundation' | 'focus' | 'structure' | 'synthesis' | 'clarity';
  opacity?: number;
  className?: string;
}

const patterns = {
  forward: '/ / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / /',
  lateral: '\\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\',
  foundation: '— — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — —',
  focus: '| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |',
  structure: '+ + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +',
  synthesis: '× × × × × × × × × × × × × × × × × × × × × × × × × × × × × × × × × × × × × × × ×',
  clarity: '• • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •',
};

export function ASCIIDivider({
  pattern = 'foundation',
  opacity = 0.8,
  className = ''
}: ASCIIDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden text-center text-2xl sm:text-3xl tracking-[1em] font-mono select-none text-accent ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {patterns[pattern]}
    </div>
  );
}
