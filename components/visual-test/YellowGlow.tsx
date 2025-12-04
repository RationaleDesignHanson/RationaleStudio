'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface YellowGlowProps {
  children: ReactNode;
  intensity?: 'subtle' | 'medium' | 'strong';
  pulse?: boolean;
  hoverOnly?: boolean;
  className?: string;
}

export function YellowGlow({
  children,
  intensity = 'medium',
  pulse = false,
  hoverOnly = false,
  className,
}: YellowGlowProps) {
  const glowIntensity = {
    subtle: 'shadow-[0_0_10px_rgba(255,215,0,0.3)]',
    medium: 'shadow-[0_0_20px_rgba(255,215,0,0.5)]',
    strong: 'shadow-[0_0_30px_rgba(255,215,0,0.7)]',
  };

  const glowClass = glowIntensity[intensity];
  const pulseClass = pulse ? 'animate-yellow-pulse' : '';
  const hoverClass = hoverOnly ? 'hover:' + glowClass : glowClass;

  return (
    <div
      className={cn(
        'transition-all duration-300',
        !hoverOnly && glowClass,
        pulseClass,
        hoverOnly && `hover:${glowClass}`,
        className
      )}
    >
      {children}
    </div>
  );
}

// Utility for inline glow styles
export function yellowGlowStyle(intensity: 'subtle' | 'medium' | 'strong' = 'medium') {
  const shadows = {
    subtle: '0 0 10px rgba(255, 215, 0, 0.3)',
    medium: '0 0 20px rgba(255, 215, 0, 0.5)',
    strong: '0 0 30px rgba(255, 215, 0, 0.7)',
  };
  return { boxShadow: shadows[intensity] };
}
