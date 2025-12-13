/**
 * Section Header Component (Shared)
 * Displays section title, subtitle, and optional badge
 *
 * Features:
 * - Responsive typography (h1-h5 variants)
 * - Optional subtitle and badge
 * - Optional accent color for badge
 * - Terminal Republic styling
 */

'use client';

import { TYPE_SCALE, RATIONALE_ACCENT } from '@/lib/presentation/design-tokens';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  accentColor?: string;
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  level = 'h2',
  accentColor = RATIONALE_ACCENT,
  className = ''
}: SectionHeaderProps) {
  const titleSizeClass = TYPE_SCALE[level];

  return (
    <div className={className}>
      {/* Badge */}
      {badge && (
        <div className="mb-4">
          <div
            className="inline-block text-xs font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded"
            style={{
              border: `2px solid ${accentColor}`,
              backgroundColor: `${accentColor}15`,
              color: accentColor
            }}
          >
            {badge}
          </div>
        </div>
      )}

      {/* Title */}
      <h2 className={`${titleSizeClass} font-bold text-white mb-3`}>
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-xl text-gray-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}
