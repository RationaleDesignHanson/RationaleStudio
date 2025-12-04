/**
 * ExecutiveCard Component
 *
 * Simplified card for executive view showing high-level summaries.
 * Hides technical details and focuses on business value.
 */

import { ReactNode } from 'react';
import { GlassCard } from '@/components/visual';
import { getSectionTheme } from '@/lib/theme/watercolor-palette';

interface ExecutiveCardProps {
  title: string;
  subtitle?: string;
  description: string;
  icon?: string;
  badge?: string;
  children?: ReactNode;
  className?: string;
}

export function ExecutiveCard({
  title,
  subtitle,
  description,
  icon,
  badge,
  children,
  className = '',
}: ExecutiveCardProps) {
  const theme = getSectionTheme('default');

  return (
    <GlassCard theme={theme} className={`p-6 sm:p-8 border-l-4 border-l-blue-500 ${className}`}>
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="text-2xl flex-shrink-0">👔</div>
        {icon && <div className="text-3xl flex-shrink-0">{icon}</div>}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-foreground">{title}</h3>
            {badge && (
              <span className="px-3 py-1 text-xs font-medium uppercase tracking-wide rounded-full bg-accent/10 text-accent">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <div className="text-sm font-medium text-muted mb-2">{subtitle}</div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-base text-muted leading-relaxed mb-4">{description}</p>

      {/* Additional content */}
      {children}
    </GlassCard>
  );
}

interface KeyPointsListProps {
  points: string[];
}

/**
 * List of key points for executive summary
 */
export function KeyPointsList({ points }: KeyPointsListProps) {
  return (
    <ul className="space-y-2">
      {points.map((point, idx) => (
        <li key={idx} className="flex items-start gap-2 text-sm">
          <span className="text-accent mt-1 flex-shrink-0">→</span>
          <span>{point}</span>
        </li>
      ))}
    </ul>
  );
}
