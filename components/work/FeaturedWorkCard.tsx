/**
 * Featured Work Card Component
 *
 * Individual project card for featured work section
 * Displays project info, metrics, tags, and status badge
 *
 * Phase 4.2: Migrated to BaseCard universal foundation
 */

import Link from 'next/link';
import { ProjectStatus } from '@/lib/types/work';
import { Lock } from 'lucide-react';
import { ProjectStatusBadge } from '@/components/ui/Badge';
import { BaseCard, BaseCardHeader, BaseCardContent, BaseCardFooter } from '@/components/ui/BaseCard';
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
    <BaseCard
      href={href}
      variant="interactive"
      paddingSize="md"
      borderAccent="border-border"
      interactive
      className="group h-full"
      ariaLabel={`View project: ${title}`}
    >
      {/* Status Badge & Protected Icon */}
      <BaseCardHeader>
        <div className="flex items-center justify-between">
          <ProjectStatusBadge status={status as ProjectStatusKey} size="sm" />
          {isProtected && (
            <Lock className="w-4 h-4 text-muted" />
          )}
        </div>
      </BaseCardHeader>

      <BaseCardContent>
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
      </BaseCardContent>

      {/* Tags */}
      <BaseCardFooter>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 rounded text-xs bg-accent/10 text-accent font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </BaseCardFooter>

      {/* Hover Arrow */}
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </BaseCard>
  );
}
