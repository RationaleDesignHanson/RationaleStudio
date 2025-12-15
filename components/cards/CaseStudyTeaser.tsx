/**
 * CaseStudyTeaser Component
 *
 * Public-facing case study preview for /work page.
 * Shows challenge, solution highlights, and impact without revealing full details.
 *
 * Phase 4.2: Migrated to BaseCard universal foundation
 */

import Link from 'next/link';
import { CaseStudyTeaser as CaseStudyTeaserType } from '@/lib/content/case-studies';
import { ResponsiveText } from '@/lib/ui/responsive';
import { BaseCard, BaseCardHeader, BaseCardContent, BaseCardFooter } from '@/components/ui/BaseCard';

interface CaseStudyTeaserProps {
  caseStudy: CaseStudyTeaserType;
  className?: string;
}

export function CaseStudyTeaser({ caseStudy, className = '' }: CaseStudyTeaserProps) {
  // Special routing for sanitary-waste-system
  const href = caseStudy.slug === 'sanitary-waste-system'
    ? '/clients/work/sanitary-waste-system/quick-overview'
    : `/clients/work/${caseStudy.slug}`;

  return (
    <BaseCard
      href={href}
      variant="interactive"
      paddingSize="lg"
      borderAccent="border-border"
      interactive
      className={`group ${className}`}
      ariaLabel={`View case study: ${caseStudy.title}`}
    >
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-start justify-between mb-2">
            <ResponsiveText variant="h3" className="group-hover:text-accent transition-colors">
              {caseStudy.title}
            </ResponsiveText>
            <span className="ml-2 px-2 py-1 text-xs font-mono bg-accent/10 text-accent rounded shrink-0">
              CASE
            </span>
          </div>
          <p className="text-muted text-sm sm:text-base">{caseStudy.tagline}</p>
        </div>

        {/* Challenge */}
        <div className="mb-4 sm:mb-6">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-accent mb-2">
            Challenge
          </h4>
          <p className="text-sm text-muted leading-relaxed">{caseStudy.challenge}</p>
        </div>

        {/* Solution Highlights */}
        <div className="mb-4 sm:mb-6">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-accent mb-3">
            Our Approach
          </h4>
          <ul className="space-y-2">
            {caseStudy.solution.map((item, index) => (
              <li key={index} className="flex gap-2 text-sm text-muted">
                <span className="text-accent mt-1">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Impact */}
        <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-border">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-accent mb-3">
            Impact
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {caseStudy.impact.slice(0, 4).map((item, index) => (
              <div key={index} className="flex gap-2 text-xs sm:text-sm text-muted">
                <span className="text-accent">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        {caseStudy.tech && (
          <div className="mb-4">
            <p className="text-xs text-muted">
              <span className="font-semibold">Tech:</span> {caseStudy.tech}
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-accent group-hover:underline">
              View full case study
            </span>
            <span className="text-accent group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </div>
    </BaseCard>
  );
}

/**
 * Grid Variant - More compact for multi-column layouts
 */
export function CaseStudyTeaserGrid({ caseStudy, className = '' }: CaseStudyTeaserProps) {
  return (
    <BaseCard
      href={`/cases/${caseStudy.slug}`}
      variant="interactive"
      size="compact"
      paddingSize="md"
      borderAccent="border-border"
      interactive
      className={`group ${className}`}
      ariaLabel={`View case study: ${caseStudy.title}`}
    >
      <ResponsiveText variant="h4" className="mb-2 group-hover:text-accent transition-colors">
        {caseStudy.title}
      </ResponsiveText>
      <p className="text-sm text-muted mb-4">{caseStudy.tagline}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {caseStudy.tags.slice(0, 3).map((tag, index) => (
          <span key={index} className="text-xs px-2 py-1 bg-accent/10 text-accent rounded">
            {tag}
          </span>
        ))}
      </div>

      <p className="text-sm text-muted line-clamp-3 mb-4">{caseStudy.challenge}</p>

      <div className="text-sm font-medium text-accent group-hover:underline">
        View case study →
      </div>
    </BaseCard>
  );
}
