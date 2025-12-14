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
  green: 'bg-green-500/10 text-green-400 border-green-500/30',
  yellow: 'bg-amber-400/10 text-amber-400 border-amber-400/30',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  gray: 'bg-gray-500/10 text-gray-400 border-gray-500/30',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
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
        className="h-full hover:scale-[1.02] transition-all duration-300 hover:shadow-xl"
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
          <h4 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
            {title}
          </h4>

          {/* Description */}
          <p className="text-sm text-gray-300 mb-4 leading-relaxed flex-grow">
            {description}
          </p>

          {/* Metadata (optional) */}
          {metadata && (
            <div className="text-xs text-accent font-semibold mb-3">
              {metadata}
            </div>
          )}

          {/* CTA */}
          <div className="flex items-center gap-2 text-sm text-accent font-semibold group-hover:gap-3 transition-all">
            <span>View Material</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
