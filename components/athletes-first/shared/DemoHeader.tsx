/**
 * DemoHeader Component
 *
 * Shared header component for all demo components.
 * Provides consistent styling and branding across all interactive demos.
 */

'use client';

import { COLORS } from '@/lib/athletes-first/design-tokens';

interface DemoHeaderProps {
  title: string;
  description: string;
  variant?: 'default' | 'success' | 'warning' | 'info';
}

export default function DemoHeader({
  title,
  description,
  variant = 'default'
}: DemoHeaderProps) {
  // Color mapping based on variant
  const variantColors = {
    default: 'from-blue-500/20 to-purple-500/10',
    success: 'from-green-500/20 to-cyan-500/10',
    warning: 'from-orange-500/20 to-yellow-500/10',
    info: 'from-cyan-500/20 to-blue-500/10',
  };

  return (
    <div
      className={`bg-gradient-to-br ${variantColors[variant]} border border-white/20 rounded-lg p-3 mb-3`}
    >
      <div className="text-sm md:text-base font-semibold text-white mb-0.5 leading-tight">
        {title}
      </div>
      <div className="text-xs md:text-sm text-white/60 leading-snug">
        {description}
      </div>
    </div>
  );
}
