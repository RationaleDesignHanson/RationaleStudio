/**
 * ASCII Bracket Component
 *
 * Computational bracket annotations for labels and markers.
 * Part of Creative-Intelligent Futurism aesthetic.
 * Now with optional color override for watercolor theming.
 */

interface ASCIIBracketProps {
  children: React.ReactNode;
  variant?: 'square' | 'curly' | 'angle';
  className?: string;
  color?: string; // Optional color override (e.g., from watercolor theme)
}

export function ASCIIBracket({
  children,
  variant = 'square',
  className = '',
  color
}: ASCIIBracketProps) {
  const brackets = {
    square: { open: '[', close: ']' },
    curly: { open: '{', close: '}' },
    angle: { open: '<', close: '>' },
  };

  const { open, close } = brackets[variant];

  return (
    <span className={`font-mono text-sm sm:text-base ${className}`}>
      <span
        className={color ? '' : 'text-accent opacity-70'}
        style={color ? { color, opacity: 0.7 } : undefined}
      >
        {open}
      </span>
      <span className="mx-1">{children}</span>
      <span
        className={color ? '' : 'text-accent opacity-70'}
        style={color ? { color, opacity: 0.7 } : undefined}
      >
        {close}
      </span>
    </span>
  );
}
