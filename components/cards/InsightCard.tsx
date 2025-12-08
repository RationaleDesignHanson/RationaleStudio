/**
 * InsightCard Component
 *
 * Displays blog/insight articles for /insights page.
 * Shows title, excerpt, category, read time, and publish date.
 */

import Link from 'next/link';
import { InsightArticle } from '@/lib/content/insights';
import { ResponsiveText, ResponsiveBox } from '@/lib/ui/responsive';

interface InsightCardProps {
  article: InsightArticle;
  featured?: boolean;
  className?: string;
}

const categoryColors = {
  'Product': 'bg-blue-100 text-blue-700',
  'AI': 'bg-purple-100 text-purple-700',
  'Design': 'bg-pink-100 text-pink-700',
  'Strategy': 'bg-green-100 text-green-700',
  'Process': 'bg-orange-100 text-orange-700',
};

export function InsightCard({ article, featured = false, className = '' }: InsightCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Link href={`/insights/${article.slug}`}>
      <ResponsiveBox
        className={`
          group relative overflow-hidden
          rounded-lg border border-border
          bg-background hover:bg-accent/5
          transition-all duration-300
          hover:border-accent hover:shadow-lg
          ${featured ? 'lg:col-span-2' : ''}
          ${className}
        `}
      >
        {/* Category Badge */}
        <div className="mb-4">
          <span
            className={`
              text-xs font-semibold px-3 py-1 rounded-full
              ${categoryColors[article.category]}
            `}
          >
            {article.category}
          </span>
        </div>

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

        {/* CTA */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-accent group-hover:underline">
            Read article
          </span>
          <span className="text-accent group-hover:translate-x-1 transition-transform">
            →
          </span>
        </div>
      </ResponsiveBox>
    </Link>
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
    <Link href={`/insights/${article.slug}`}>
      <div
        className={`
          group py-4 border-b border-border last:border-b-0
          hover:bg-accent/5 transition-colors
          ${className}
        `}
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
              <span className={`px-2 py-0.5 rounded ${categoryColors[article.category]}`}>
                {article.category}
              </span>
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
