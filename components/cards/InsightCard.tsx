/**
 * InsightCard Component
 *
 * Displays blog/insight articles for /insights page.
 * Shows title, excerpt, category, read time, and publish date.
 *
 * Phase 4.2: Migrated to BaseCard universal foundation
 */

import Link from 'next/link';
import { InsightArticle } from '@/lib/content/insights';
import { ResponsiveText } from '@/lib/ui/responsive';
import { CategoryBadge } from '@/components/ui/Badge';
import { BaseCard, BaseCardHeader, BaseCardContent, BaseCardFooter } from '@/components/ui/BaseCard';
import type { CategoryKey } from '@/lib/design-tokens/semantic-colors';

interface InsightCardProps {
  article: InsightArticle;
  featured?: boolean;
  className?: string;
}

export function InsightCard({ article, featured = false, className = '' }: InsightCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <BaseCard
      href={`/insights/${article.slug}`}
      variant="interactive"
      paddingSize="lg"
      borderAccent="border-border"
      interactive
      className={`group ${featured ? 'lg:col-span-2' : ''} ${className}`}
      ariaLabel={`Read article: ${article.title}`}
    >
      {/* Category Badge */}
      <BaseCardHeader>
        <CategoryBadge category={article.category as CategoryKey} size="md" />
      </BaseCardHeader>

      <BaseCardContent>
        {/* Title & Subtitle */}
        <div className="mb-4">
          <ResponsiveText
            variant={featured ? 'h2' : 'h3'}
            className="mb-2 group-hover:text-accent transition-colors"
          >
            {article.title}
          </ResponsiveText>
          <p className="text-sm sm:text-base text-muted font-medium">
            {article.subtitle}
          </p>
        </div>

        {/* Excerpt */}
        <p className={`text-sm sm:text-base text-muted leading-relaxed mb-4 sm:mb-6 ${featured ? '' : 'line-clamp-3'}`}>
          {article.excerpt}
        </p>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            {article.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-neutral-100 text-neutral-700 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Meta: Author, Date, Read Time */}
        <div className="flex items-center gap-4 text-xs text-muted pb-4 mb-4 border-b border-border">
          <span>{article.author.name}</span>
          <span>•</span>
          <span>{formattedDate}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>
      </BaseCardContent>

      {/* CTA */}
      <BaseCardFooter>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-accent group-hover:underline">
            Read article
          </span>
          <span className="text-accent group-hover:translate-x-1 transition-transform">
            →
          </span>
        </div>
      </BaseCardFooter>
    </BaseCard>
  );
}

/**
 * Compact List Variant for sidebars or related articles
 */
export function InsightCardList({ article, className = '' }: InsightCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  return (
    <BaseCard
      href={`/insights/${article.slug}`}
      variant="subtle"
      size="compact"
      paddingSize="sm"
      borderAccent="border-transparent"
      interactive
      className={`group border-b border-border last:border-b-0 rounded-none ${className}`}
      ariaLabel={`Read: ${article.title}`}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0 text-xs text-muted font-medium w-12">
          {formattedDate}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold mb-1 group-hover:text-accent transition-colors line-clamp-2">
            {article.title}
          </h4>
          <div className="flex items-center gap-2 text-xs text-muted">
            <CategoryBadge category={article.category as CategoryKey} size="sm" />
            <span>{article.readTime}</span>
          </div>
        </div>
      </div>
    </BaseCard>
  );
}
