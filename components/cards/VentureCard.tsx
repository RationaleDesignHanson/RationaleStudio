/**
 * VentureCard Component
 *
 * Displays internal IP lab ventures for /ventures page.
 * Shows problem, solution, and current status.
 *
 * Phase 4.2: Migrated to use Badge component from design system
 */

import Link from 'next/link';
import { Venture } from '@/lib/content/ventures';
import { ResponsiveText, ResponsiveBox } from '@/lib/ui/responsive';
import { StatusBadge } from '@/components/ui/Badge';
import type { StatusKey } from '@/lib/design-tokens/semantic-colors';

interface VentureCardProps {
  venture: Venture;
  className?: string;
}

export function VentureCard({ venture, className = '' }: VentureCardProps) {
  // Check if this venture has a dedicated product page
  const hasProductPage = venture.slug === 'zero';
  const productPageUrl = '/zero';

  return (
    <div className="relative">
      <Link href={`/ventures/${venture.slug}`}>
        <ResponsiveBox
          className={`
            group relative overflow-hidden
            rounded-lg border border-border
            bg-background hover:bg-accent/5
            transition-all duration-300
            hover:border-accent hover:shadow-lg
            ${className}
          `}
        >
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <StatusBadge status={venture.status as StatusKey} size="md" />
        </div>

        {/* Header */}
        <div className="mb-4 sm:mb-6 pr-24">
          <ResponsiveText variant="h3" className="mb-2 group-hover:text-accent transition-colors">
            {venture.title}
          </ResponsiveText>
          <p className="text-muted text-sm sm:text-base">{venture.tagline}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
          {venture.meta.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-accent/10 text-accent rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Problem */}
        <div className="mb-4 sm:mb-6">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-accent mb-2">
            The Problem
          </h4>
          <p className="text-sm text-muted leading-relaxed">
            {venture.problem.description}
          </p>
        </div>

        {/* Solution Highlights */}
        <div className="mb-4 sm:mb-6">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-accent mb-3">
            Our Solution
          </h4>
          <ul className="space-y-2">
            {venture.solution.approach.slice(0, 3).map((item, index) => (
              <li key={index} className="flex gap-2 text-sm text-muted">
                <span className="text-accent mt-1">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Highlights */}
        {venture.tech.highlights.length > 0 && (
          <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-border">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-accent mb-3">
              Technical Highlights
            </h4>
            <div className="flex flex-wrap gap-2">
              {venture.tech.highlights.map((highlight, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-neutral-100 text-neutral-700 rounded"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-accent group-hover:underline">
              Learn more about {venture.title}
            </span>
            <span className="text-accent group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </div>
      </ResponsiveBox>
    </Link>

    {/* Additional Product Page Link for Zero */}
    {hasProductPage && (
      <div className="mt-3">
        <Link
          href={productPageUrl}
          className="block px-4 py-2 text-center text-sm font-medium text-white bg-accent rounded-md hover:bg-accent/90 transition-colors"
        >
          Visit Product Page →
        </Link>
      </div>
    )}
  </div>
  );
}

/**
 * Compact Venture Card for grids
 */
export function VentureCardCompact({ venture, className = '' }: VentureCardProps) {
  return (
    <Link href={`/ventures/${venture.slug}`}>
      <div
        className={`
          group p-6
          rounded-lg border border-border
          bg-background hover:bg-accent/5
          transition-all duration-300
          hover:border-accent
          ${className}
        `}
      >
        <div className="flex items-start justify-between mb-3">
          <ResponsiveText variant="h4" className="group-hover:text-accent transition-colors">
            {venture.title}
          </ResponsiveText>
          <StatusBadge status={venture.status as StatusKey} size="sm" className="shrink-0 ml-2" />
        </div>

        <p className="text-sm text-muted mb-4 line-clamp-2">{venture.tagline}</p>

        <div className="flex flex-wrap gap-2">
          {venture.meta.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="text-xs px-2 py-1 bg-accent/10 text-accent rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
