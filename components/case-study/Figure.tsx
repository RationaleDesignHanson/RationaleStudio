/**
 * Figure — captioned asset wrapper. Replaces the italic gray-400
 * caption pattern with a proper editorial caption (small caps mono
 * fig number + body caption).
 *
 *   <Figure figNumber="FIG. 03" caption="AR Commerce funnel — entry strategies">
 *     <Image src="..." alt="..." width={1600} height={900} />
 *   </Figure>
 */

import type { ReactNode } from 'react';

interface FigureProps {
  children: ReactNode;
  figNumber?: string;
  caption?: ReactNode;
  /** Removes the border on the asset (use for transparent or already-framed content). */
  borderless?: boolean;
  className?: string;
}

export function Figure({
  children,
  figNumber,
  caption,
  borderless = false,
  className = '',
}: FigureProps) {
  return (
    <figure className={className}>
      <div
        className={`relative w-full overflow-hidden rounded-md ${borderless ? '' : 'border'}`}
        style={borderless ? undefined : { borderColor: 'var(--era-hairline)', backgroundColor: 'color-mix(in oklab, var(--era-bg-deep) 60%, transparent)' }}
      >
        {children}
      </div>
      {(figNumber || caption) && (
        <figcaption
          className="mt-2 text-xs md:text-sm leading-snug flex flex-wrap items-baseline gap-2"
          style={{ color: 'var(--era-ink-muted)' }}
        >
          {figNumber && (
            <span className="font-mono tracking-widest uppercase" style={{ color: 'var(--era-ink-muted)', opacity: 0.7 }}>
              {figNumber}
            </span>
          )}
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
