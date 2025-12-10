/**
 * KitCard Component
 *
 * Displays service kit offerings with pricing, duration, and key details.
 * Used on /services page and individual kit pages.
 *
 * Phase 4.2: Migrated to BaseCard universal foundation
 */

import Link from 'next/link';
import { ServiceKit } from '@/lib/content/kits';
import { ResponsiveText } from '@/lib/ui/responsive';
import { BaseCard, BaseCardHeader, BaseCardContent, BaseCardFooter } from '@/components/ui/BaseCard';

interface KitCardProps {
  kit: ServiceKit;
  featured?: boolean;
  className?: string;
}

export function KitCard({ kit, featured = false, className = '' }: KitCardProps) {
  return (
    <BaseCard
      href={`/services/${kit.slug}`}
      variant={featured ? 'featured' : 'interactive'}
      paddingSize="lg"
      borderAccent="border-border"
      interactive
      className={`group ${featured ? 'ring-2 ring-accent' : ''} ${className}`}
      ariaLabel={`Learn more about ${kit.name}`}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-accent text-white text-xs font-semibold uppercase tracking-wide rounded-full">
          Popular
        </div>
      )}

      {/* Header */}
      <BaseCardHeader>
        <ResponsiveText variant="h3" className="mb-2 group-hover:text-accent transition-colors">
          {kit.name}
        </ResponsiveText>
        <p className="text-muted text-sm sm:text-base">{kit.tagline}</p>
      </BaseCardHeader>

      <BaseCardContent>
        {/* Pricing & Duration */}
        <div className="flex items-baseline gap-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-border">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-foreground">
              {kit.pricing}
            </div>
            <div className="text-xs sm:text-sm text-muted mt-1">{kit.duration}</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-muted leading-relaxed mb-4 sm:mb-6">
          {kit.description}
        </p>

        {/* What You Get */}
        <div className="mb-4 sm:mb-6">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-accent mb-3">
            What You Get
          </h4>
          <ul className="space-y-2">
            {kit.whatYouGet.slice(0, 4).map((item, index) => (
              <li key={index} className="flex gap-2 text-sm sm:text-base text-muted">
                <span className="text-accent mt-1">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Perfect For */}
        {kit.perfectFor && kit.perfectFor.length > 0 && (
          <div className="mb-4 sm:mb-6">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-accent mb-3">
              Perfect For
            </h4>
            <div className="flex flex-wrap gap-2">
              {kit.perfectFor.slice(0, 3).map((use, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-accent/10 text-accent rounded"
                >
                  {use}
                </span>
              ))}
            </div>
          </div>
        )}
      </BaseCardContent>

      {/* CTA */}
      <BaseCardFooter>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-accent group-hover:underline">
            Learn more
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
 * Compact Kit Card Variant
 * For use in grid layouts or sidebars
 */
export function KitCardCompact({ kit, className = '' }: KitCardProps) {
  return (
    <BaseCard
      href={`/services/${kit.slug}`}
      variant="interactive"
      size="compact"
      paddingSize="md"
      borderAccent="border-border"
      interactive
      className={`group ${className}`}
      ariaLabel={`View ${kit.name} service`}
    >
      <ResponsiveText variant="h4" className="mb-2 group-hover:text-accent transition-colors">
        {kit.name}
      </ResponsiveText>
      <p className="text-sm text-muted mb-3">{kit.tagline}</p>
      <div className="flex items-baseline justify-between">
        <span className="text-lg font-bold text-foreground">{kit.pricing}</span>
        <span className="text-xs text-muted">{kit.duration}</span>
      </div>
    </BaseCard>
  );
}
