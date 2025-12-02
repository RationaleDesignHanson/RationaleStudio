/**
 * Section Marker Component
 *
 * ASCII-style section markers for headings.
 * Part of Creative-Intelligent Futurism aesthetic.
 * Now with optional color override for watercolor theming.
 */

interface SectionMarkerProps {
  children: React.ReactNode;
  symbol?: string;
  position?: 'left' | 'both';
  className?: string;
  color?: string; // Optional color override (e.g., from watercolor theme)
}

export function SectionMarker({
  children,
  symbol = '/',
  position = 'left',
  className = '',
  color
}: SectionMarkerProps) {
  return (
    <div className={`flex items-center gap-2 sm:gap-3 lg:gap-4 ${className}`}>
      <span
        className={`font-mono text-2xl sm:text-3xl lg:text-4xl select-none opacity-70 ${color ? '' : 'text-accent'}`}
        style={color ? { color } : undefined}
      >
        {symbol}
      </span>
      <span>{children}</span>
      {position === 'both' && (
        <span
          className={`font-mono text-2xl sm:text-3xl lg:text-4xl select-none opacity-70 ${color ? '' : 'text-accent'}`}
          style={color ? { color } : undefined}
        >
          {symbol}
        </span>
      )}
    </div>
  );
}
