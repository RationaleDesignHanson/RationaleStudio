'use client';

import { cn } from '@/lib/utils/cn';

interface GridShaderProps {
  variant?: 'dots' | 'lines' | 'ascii';
  intensity?: 'subtle' | 'medium' | 'strong';
  animate?: boolean;
  className?: string;
}

export function GridShader({
  variant = 'dots',
  intensity = 'medium',
  animate = false,
  className,
}: GridShaderProps) {
  const intensityOpacity = {
    subtle: 'opacity-20',
    medium: 'opacity-40',
    strong: 'opacity-60',
  };

  const variantStyles = {
    dots: 'bg-[radial-gradient(circle,_#FFD700_1px,_transparent_1px)] bg-[length:20px_20px]',
    lines: 'bg-[linear-gradient(0deg,_#FFD700_1px,_transparent_1px),_linear-gradient(90deg,_#FFD700_1px,_transparent_1px)] bg-[length:20px_20px]',
    ascii: 'bg-[repeating-linear-gradient(0deg,_#FFD700_0px,_#FFD700_1px,_transparent_1px,_transparent_8px),_repeating-linear-gradient(90deg,_#FFD700_0px,_#FFD700_1px,_transparent_1px,_transparent_8px)]',
  };

  return (
    <div
      className={cn(
        'absolute inset-0 pointer-events-none',
        variantStyles[variant],
        intensityOpacity[intensity],
        animate && 'animate-grid-float',
        className
      )}
      aria-hidden="true"
    />
  );
}
