/**
 * Featured Work Card Component
 *
 * Individual project card for featured work section
 * Displays project info, metrics, tags, and status badge
 */

import Link from 'next/link';
import { ProjectStatus } from '@/lib/types/work';
import { Lock } from 'lucide-react';
import { GlassCard } from '@/components/visual';

interface FeaturedWorkCardProps {
  title: string;
  subtitle: string;
  metrics: string[];
  tags: string[];
  href: string;
  status: ProjectStatus;
  isProtected?: boolean;
}

const statusConfig = {
  live: { label: 'Live', color: 'bg-green-500/20 text-green-600 border-green-500/30' },
  beta: { label: 'Beta', color: 'bg-blue-500/20 text-blue-600 border-blue-500/30' },
  delivered: { label: 'Delivered', color: 'bg-accent/20 text-accent border-accent/30' },
  building: { label: 'Building', color: 'bg-orange-500/20 text-orange-600 border-orange-500/30' }
};

export function FeaturedWorkCard({
  title,
  subtitle,
  metrics,
  tags,
  href,
  status,
  isProtected = false
}: FeaturedWorkCardProps) {
  const statusStyle = statusConfig[status];

  return (
    <Link
      href={href}
      className="group block relative"
    >
      <GlassCard className="h-full p-6 hover:border-accent/50 transition-all duration-300" borderRadius="0.75rem">
        {/* Status Badge & Protected Icon */}
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusStyle.color}`}>
            {statusStyle.label}
          </span>
          {isProtected && (
            <Lock className="w-4 h-4 text-muted" />
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-400 mb-4">{subtitle}</p>

        {/* Metrics */}
        <div className="space-y-2 mb-4">
          {metrics.slice(0, 3).map((metric, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-sm text-gray-300">{metric}</span>
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
