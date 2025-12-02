/**
 * Glass Card Component
 *
 * Simple CSS-based frosted glass effect with backdrop blur
 * Integrates with watercolor theme system
 * Now supports responsive padding through paddingSize prop
 */

'use client';

import { ReactNode } from 'react';
import type { WatercolorTheme } from '@/lib/theme/watercolor-palette';
import { RESPONSIVE_PADDING } from '@/lib/styles/responsive-patterns';

export type GlassCardPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  theme?: WatercolorTheme;
  paddingSize?: GlassCardPadding; // Responsive padding using predefined sizes
  padding?: string; // Legacy: inline padding (e.g., '3rem') - will be deprecated
  borderRadius?: string;
}

export function GlassCard({
  children,
  className = '',
  theme,
  paddingSize,
  padding,
  borderRadius = '1.5rem',
}: GlassCardProps) {
  // Determine padding class - paddingSize takes priority over inline padding
  const paddingClass = paddingSize ? RESPONSIVE_PADDING[paddingSize] : '';

  return (
    <div
      className={`relative overflow-hidden ${paddingClass} ${className}`}
      style={{
        // Only apply inline padding if paddingSize is not provided (legacy support)
        ...(padding && !paddingSize && { padding }),
        borderRadius,
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
      }}
    >
      {children}
    </div>
  );
}
