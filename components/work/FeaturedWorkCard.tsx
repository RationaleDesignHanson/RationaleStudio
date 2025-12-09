/**
 * Featured Work Card Component
 *
 * Individual project card for featured work section
 * Displays project info, metrics, tags, and status badge
 *
 * Phase 4.2: Migrated to use Badge component from design system
 */

import Link from 'next/link';
import { ProjectStatus } from '@/lib/types/work';
import { Lock } from 'lucide-react';
import { GlassCard } from '@/components/visual';
import { ProjectStatusBadge } from '@/components/ui/Badge';
import type { ProjectStatusKey } from '@/lib/design-tokens/semantic-colors';

interface FeaturedWorkCardProps {
  title: string;
  subtitle: string;
  metrics: string[];
  tags: string[];
  href: string;
  status: ProjectStatus;
  isProtected?: boolean;
}

export function FeaturedWorkCard({
  title,
  subtitle,
  metrics,
  tags,
  href,
  status,
  isProtected = false
}: FeaturedWorkCardProps) {

  return (
    <Link
      href={href}
      className="group block relative"
    >
      <GlassCard className="h-full p-6 hover:border-accent/50 transition-all duration-300" borderRadius="0.75rem">
        {/* Status Badge & Protected Icon */}
        <div className="flex items-center justify-between mb-4">
          <ProjectStatusBadge status={status as ProjectStatusKey} size="sm" />
          {isProtected && (
            <Lock className="w-4 h-4 text-muted" />
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-accent transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{subtitle}</p>

        {/* Metrics */}
        <div className="space-y-2 mb-4 min-h-[72px]">
          {metrics.slice(0, 3).map((metric, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
              <span className="text-sm text-gray-300 line-clamp-1">{metric}</span>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 rounded text-xs bg-accent/10 text-accent font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Hover Arrow */}
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </GlassCard>
    </Link>
  );
}
