/**
 * FullBleed — escapes the page max-width for a hero asset moment.
 *
 * Use sparingly: one hero per page is the ceiling. Captions render
 * inside the constrained content rail to hold the reader's eye.
 *
 *   <FullBleed>
 *     <Image src="..." alt="..." width={2400} height={1200} />
 *   </FullBleed>
 */

import type { ReactNode } from 'react';

interface FullBleedProps {
  children: ReactNode;
  /** Optional figure caption rendered below the asset. */
  caption?: ReactNode;
  /** Caption number, e.g. "FIG. 02". */
  figNumber?: string;
  className?: string;
}

export function FullBleed({ children, caption, figNumber, className = '' }: FullBleedProps) {
  return (
    <figure className={`relative w-full ${className}`}>
      <div className="relative w-full overflow-hidden">{children}</div>
      {(caption || figNumber) && (
        <figcaption className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 mt-3 text-xs md:text-sm text-gray-400 leading-snug flex flex-wrap items-baseline gap-2">
          {figNumber && (
            <span className="font-mono text-gray-500 tracking-widest uppercase">{figNumber}</span>
          )}
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
