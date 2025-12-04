'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface OS8WindowProps {
  title: string;
  children: ReactNode;
  variant?: 'default' | 'yellow' | 'minimal' | 'featured' | 'body' | 'subtle' | 'cta' | 'interactive';
  className?: string;
  titleClassName?: string;
  animateIn?: boolean;
  delay?: number;
}

export function OS8Window({
  title,
  children,
  variant = 'default',
  className,
  titleClassName,
  animateIn = true,
  delay = 0,
}: OS8WindowProps) {
  const variantStyles = {
    // Legacy variants (kept for backward compatibility)
    default: {
      window: 'bg-white border-gray-300',
      titleBar: 'bg-gradient-to-b from-gray-200 to-gray-100 border-b border-gray-300',
      title: 'text-gray-900',
      content: 'bg-white',
    },
    yellow: {
      window: 'bg-black border-[#FFD700]',
      titleBar: 'bg-black border-b border-[#FFD700]',
      title: 'text-[#FFD700]',
      content: 'bg-white',
    },
    minimal: {
      window: 'bg-white border-gray-800',
      titleBar: 'bg-gray-900 border-b border-gray-800',
      title: 'text-gray-100',
      content: 'bg-white',
    },

    // NEW: Dark-optimized variants for improved readability
    featured: {
      window: 'bg-gray-900 border-[#FFD700] border-2 shadow-lg shadow-[#FFD700]/20',
      titleBar: 'bg-black border-b-2 border-[#FFD700]',
      title: 'text-[#FFD700] font-bold',
      content: 'bg-gray-900 text-gray-100',
    },
    body: {
      window: 'bg-gray-800 border-gray-600 shadow-md',
      titleBar: 'bg-gray-900 border-b border-gray-600',
      title: 'text-gray-100 font-semibold',
      content: 'bg-gray-800 text-gray-100',
    },
    subtle: {
      window: 'bg-gray-800/60 border-gray-700 backdrop-blur-sm',
      titleBar: 'bg-gray-900/80 border-b border-gray-700',
      title: 'text-gray-400 font-medium',
      content: 'bg-gray-800/60 text-gray-400',
    },
    cta: {
      window: 'bg-black border-[#FFD700] border-2 shadow-xl shadow-[#FFD700]/40',
      titleBar: 'bg-black border-b-2 border-[#FFD700]',
      title: 'text-[#FFD700] font-bold',
      content: 'bg-black text-[#FFD700]',
    },
    interactive: {
      window: 'bg-gray-900/90 backdrop-blur-md border-gray-500 hover:border-[#FFD700] hover:shadow-lg hover:shadow-[#FFD700]/10 transition-all duration-300',
      titleBar: 'bg-black/80 border-b border-gray-500',
      title: 'text-gray-100',
      content: 'bg-gray-900/90 backdrop-blur-md text-gray-100',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        'border overflow-hidden',
        'transition-all duration-400',
        styles.window,
        animateIn && 'animate-window-boot',
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Title Bar - Refined */}
      <div className={cn('px-3 py-2 flex items-center', styles.titleBar)}>
        {/* Window Indicator - Single Minimal Dot */}
        <div className="flex items-center gap-2 mr-3">
          <div className={cn(
            'w-1.5 h-1.5 rounded-full',
            (variant === 'yellow' || variant === 'featured' || variant === 'cta') ? 'bg-[#FFD700]' : 'bg-gray-400'
          )} />
        </div>

        {/* Title */}
        <div className={cn('flex-1 text-xs font-bold font-mono', styles.title, titleClassName)}>
          {title}
        </div>
      </div>

      {/* Window Content */}
      <div className={cn('p-6', styles.content)}>
        {children}
      </div>
    </div>
  );
}

// Add CSS for boot animation to globals.css
