/**
 * Section Component
 *
 * Vertical spacing primitive for page sections.
 * Provides consistent spacing between major page sections.
 * Now with computational watercolor theming support.
 * Performance: Only animates when visible in viewport.
 */

'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { type WatercolorTheme } from '@/lib/theme/watercolor-palette';

interface SectionProps {
  children: ReactNode;
  className?: string;
  spacing?: 'small' | 'default' | 'large';
  background?: 'default' | 'muted' | 'accent' | 'transparent';
  colorTheme?: WatercolorTheme;
  noPaddingBottom?: boolean; // Remove bottom padding
  noPaddingTop?: boolean; // Remove top padding
  allowOverflow?: boolean; // Allow content to overflow section bounds (for badges, tooltips, etc)
}

const spacingClasses = {
  small: 'py-6 sm:py-8',         // ~24-32px (tightened)
  default: 'py-8 sm:py-10',      // ~32-40px (tightened)
  large: 'py-10 sm:py-12 lg:py-16', // ~40-64px (tightened)
};

const spacingTopOnlyClasses = {
  small: 'pt-6 sm:pt-8',         // Top only
  default: 'pt-8 sm:pt-10',      // Top only
  large: 'pt-10 sm:pt-12 lg:pt-16', // Top only
};

const spacingBottomOnlyClasses = {
  small: 'pb-6 sm:pb-8',         // Bottom only
  default: 'pb-8 sm:pb-10',      // Bottom only
  large: 'pb-10 sm:pb-12 lg:pb-16', // Bottom only
};

const backgroundClasses = {
  default: 'bg-background',
  muted: 'bg-neutral-50',
  accent: 'bg-gradient-to-br from-accent/5 to-transparent',
  transparent: 'bg-transparent', // For sections with ASCII shader backgrounds
};

export function Section({
  children,
  className = '',
  spacing = 'default',
  background = 'default',
  colorTheme,
  noPaddingBottom = false,
  noPaddingTop = false,
  allowOverflow = false,
}: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Only animate when section is visible in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2, // Trigger when 20% visible
        rootMargin: '0px', // Only animate when in viewport
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Determine padding class based on props
  let paddingClass = spacingClasses[spacing];
  if (noPaddingBottom && noPaddingTop) {
    paddingClass = ''; // No padding at all
  } else if (noPaddingBottom) {
    paddingClass = spacingTopOnlyClasses[spacing];
  } else if (noPaddingTop) {
    paddingClass = spacingBottomOnlyClasses[spacing];
  }

  return (
    <section
      ref={sectionRef}
      className={`${paddingClass} ${backgroundClasses[background]} ${className} relative ${allowOverflow ? 'overflow-visible' : 'overflow-hidden'}`}
    >
      {children}
    </section>
  );
}
