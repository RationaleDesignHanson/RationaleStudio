/**
 * KitCard Component
 *
 * Displays service kit offerings with pricing, duration, and key details.
 * Used on /services page and individual kit pages.
 */

import Link from 'next/link';
import { ServiceKit } from '@/lib/content/kits';
import { ResponsiveText, ResponsiveBox } from '@/lib/ui/responsive';

interface KitCardProps {
  kit: ServiceKit;
  featured?: boolean;
  className?: string;
}

export function KitCard({ kit, featured = false, className = '' }: KitCardProps) {
  return (
    <Link href={`/services/${kit.slug}`}>
      <ResponsiveBox
        className={`
          group relative overflow-hidden
          rounded-lg border border-border
          bg-background hover:bg-accent/5
          transition-all duration-300
          hover:border-accent hover:shadow-lg
          ${featured ? 'ring-2 ring-accent' : ''}
          ${className}
        `}
      >
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-accent text-white text-xs font-semibold uppercase tracking-wide rounded-full">
            Popular
          </div>
        )}

        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <ResponsiveText variant="h3" className="mb-2 group-hover:text-accent transition-colors">
            {kit.name}
          </ResponsiveText>
          <p className="text-muted text-sm sm:text-base">{kit.tagline}</p>
        </div>

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

        {/* CTA */}
        <div className="pt-4 sm:pt-6 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-accent group-hover:underline">
              Learn more
            </span>
            <span className="text-accent group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </div>
      </ResponsiveBox>
    </Link>
  );
}

/**
 * Compact Kit Card Variant
 * For use in grid layouts or sidebars
 */
export function KitCardCompact({ kit, className = '' }: KitCardProps) {
  return (
    <Link href={`/services/${kit.slug}`}>
      <div
        className={`
          group p-4 sm:p-6
          rounded-lg border border-border
          bg-background hover:bg-accent/5
          transition-all duration-300
          hover:border-accent
          ${className}
        `}
      >
        <ResponsiveText variant="h4" className="mb-2 group-hover:text-accent transition-colors">
          {kit.name}
        </ResponsiveText>
        <p className="text-sm text-muted mb-3">{kit.tagline}</p>
        <div className="flex items-baseline justify-between">
          <span className="text-lg font-bold text-foreground">{kit.pricing}</span>
          <span className="text-xs text-muted">{kit.duration}</span>
        </div>
      </div>
    </Link>
  );
}
