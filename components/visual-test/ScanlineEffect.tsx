'use client';

import { cn } from '@/lib/utils/cn';

interface ScanlineEffectProps {
  intensity?: 'subtle' | 'medium' | 'strong';
  speed?: 'slow' | 'medium' | 'fast';
  className?: string;
}

export function ScanlineEffect({
  intensity = 'subtle',
  speed = 'medium',
  className,
}: ScanlineEffectProps) {
  const intensityOpacity = {
    subtle: 'opacity-10',
    medium: 'opacity-20',
    strong: 'opacity-30',
  };

  const speedDuration = {
    slow: 'animate-scanline-slow',
    medium: 'animate-scanline',
    fast: 'animate-scanline-fast',
  };

  return (
    <div
      className={cn(
        'absolute inset-0 pointer-events-none',
        'bg-[repeating-linear-gradient(0deg,_transparent_0px,_transparent_2px,_rgba(255,215,0,0.1)_2px,_rgba(255,215,0,0.1)_4px)]',
        intensityOpacity[intensity],
        speedDuration[speed],
        className
      )}
      aria-hidden="true"
    />
  );
}
