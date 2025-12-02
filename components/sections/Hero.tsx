/**
 * Hero Section Component
 * Reusable hero for page headers
 */

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
}

export function Hero({ title, subtitle, description, centered = true }: HeroProps) {
  const alignClass = centered ? 'text-center' : 'text-left';

  return (
    <div className={alignClass}>
      {subtitle && (
        <p className="text-sm sm:text-base font-semibold text-accent uppercase tracking-wide mb-3">
          {subtitle}
        </p>
      )}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
        {title}
      </h1>
      {description && (
        <p className="text-base sm:text-lg text-muted max-w-3xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
