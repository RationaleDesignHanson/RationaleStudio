/**
 * Container Component
 *
 * Max-width wrapper with responsive padding.
 * Used throughout the site for consistent content width.
 */

import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide' | 'full';
}

const sizeClasses = {
  narrow: 'max-w-3xl',   // ~768px
  default: 'max-w-6xl',  // ~1152px
  wide: 'max-w-7xl',     // ~1280px
  full: 'max-w-none',    // No max-width
};

export function Container({
  children,
  className = '',
  size = 'default',
}: ContainerProps) {
  return (
    <div className={`mx-auto px-6 sm:px-8 lg:px-12 ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
}
