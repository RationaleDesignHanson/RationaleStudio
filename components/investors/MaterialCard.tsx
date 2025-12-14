/**
 * MaterialCard Component
 *
 * Reusable card for investor materials library
 * Displays document/resource with icon, badge, and metadata
 */

'use client';

import Link from 'next/link';
import { GlassCard } from '@/components/visual/GlassCard';
import type { WatercolorTheme } from '@/lib/theme/watercolor-palette';

interface MaterialCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
  badge: string;
  badgeColor?: 'green' | 'yellow' | 'blue' | 'gray' | 'purple';
  metadata?: string;
  theme?: WatercolorTheme;
}

const badgeStyles = {
  green: 'bg-green-500/20 text-green-300 border-green-500/40',
  yellow: 'bg-amber-400/20 text-amber-300 border-amber-400/40',
  blue: 'bg-blue-500/20 text-blue-300 border-blue-400/40',
  gray: 'bg-gray-500/20 text-gray-300 border-gray-500/40',
  purple: 'bg-purple-500/20 text-purple-300 border-purple-400/40',
};

export function MaterialCard({
  icon,
  title,
  description,
  href,
  badge,
  badgeColor = 'gray',
  metadata,
  theme,
}: MaterialCardProps) {
  return (
    <Link href={href} className="block group">
      <GlassCard
        theme={theme}
        paddingSize="lg"
        borderRadius="1rem"
        className="h-full hover:scale-105 transition-all duration-200 hover:shadow-2xl"
      >
        <div className="flex flex-col h-full">
          {/* Header: Icon and Badge */}
          <div className="flex items-start justify-between mb-4">
            <span className="text-3xl sm:text-4xl">{icon}</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                badgeStyles[badgeColor]
              }`}
            >
              {badge}
            </span>
          </div>

          {/* Title */}
          <h4
            className="text-lg sm:text-xl font-bold mb-2 group-hover:text-accent transition-colors"
            style={{ color: theme?.foreground || '#f1f5f9' }}
          >
            {title}
          </h4>

          {/* Description */}
          <p
            className="text-sm leading-relaxed mb-4 flex-grow"
            style={{ color: theme?.muted || '#94a3b8' }}
          >
            {description}
          </p>

          {/* Metadata (optional) */}
          {metadata && (
            <div
              className="text-xs sm:text-sm font-semibold mb-3"
              style={{ color: theme?.accent || '#FFD700' }}
            >
              {metadata}
            </div>
          )}

          {/* CTA */}
          <div
            className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all"
            style={{ color: theme?.accent || '#FFD700' }}
          >
            <span>View Material</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
