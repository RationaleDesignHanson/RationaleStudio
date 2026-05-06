/**
 * Plate — asymmetric asset composition.
 *
 * One protagonist + supporting cast, NOT an equal-weight grid.
 * Variants:
 *   • split    50/50 hero + supporting (small medium-up)
 *   • lead-2   2/3 hero + 1/3 column with stacked supporting
 *   • lead-3   1 hero + 3 supporting in a row below
 *   • triptych three equal images in a row, hairline-separated
 *
 *   <Plate variant="lead-2">
 *     <Plate.Lead>{...protagonist}</Plate.Lead>
 *     <Plate.Aside>{...supporting stack}</Plate.Aside>
 *   </Plate>
 */

import type { ReactNode } from 'react';

interface PlateProps {
  variant: 'split' | 'lead-2' | 'lead-3' | 'triptych';
  children: ReactNode;
  className?: string;
}

interface PlateSlotProps {
  children: ReactNode;
  className?: string;
}

function Lead({ children, className = '' }: PlateSlotProps) {
  return <div className={`plate-lead ${className}`}>{children}</div>;
}

function Aside({ children, className = '' }: PlateSlotProps) {
  return <div className={`plate-aside ${className}`}>{children}</div>;
}

function PlateRoot({ variant, children, className = '' }: PlateProps) {
  const layout = {
    split: 'grid md:grid-cols-2 gap-4 md:gap-6',
    'lead-2': 'grid md:grid-cols-3 gap-4 md:gap-6 [&>.plate-lead]:md:col-span-2',
    'lead-3': 'flex flex-col gap-4 md:gap-6',
    triptych: 'grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6',
  }[variant];

  return <div className={`${layout} ${className}`}>{children}</div>;
}

export const Plate = Object.assign(PlateRoot, {
  Lead,
  Aside,
});
