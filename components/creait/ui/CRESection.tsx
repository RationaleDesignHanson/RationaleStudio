import { ReactNode } from 'react';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';
import { CRE_TYPOGRAPHY } from '@/lib/creait/design-tokens/typography';
import { CRE_SPACING } from '@/lib/creait/design-tokens/spacing';
import { withOpacity } from '@/lib/design-tokens/colors';

type CRESectionVariant =
  | 'problem'
  | 'solution'
  | 'demo'
  | 'market'
  | 'traction'
  | 'execution'
  | 'ask'
  | 'default';

interface CRESectionProps {
  title: string;
  subtitle?: string;
  variant?: CRESectionVariant;
  children: ReactNode;
  className?: string;
  /**
   * Custom title color (overrides variant color)
   */
  titleColor?: string;
  /**
   * Show radial glow background behind title
   * @default true
   */
  showGlow?: boolean;
}

const variantColors = {
  problem: CRE_COLORS.section.problem,
  solution: CRE_COLORS.section.solution,
  demo: CRE_COLORS.section.demo,
  market: CRE_COLORS.section.market,
  traction: CRE_COLORS.section.traction,
  execution: CRE_COLORS.section.execution,
  ask: CRE_COLORS.section.ask,
  default: CRE_COLORS.primary,
};

/**
 * CRESection - Full-height section container for pitch deck slides
 *
 * Features:
 * - Color-coded by pitch deck section
 * - Responsive typography using design tokens
 * - Optional radial glow background
 * - Smooth gradient transition at bottom
 *
 * @example
 * ```tsx
 * <CRESection
 *   title="The Problem"
 *   subtitle="Commercial real estate brokers are flying blind"
 *   variant="problem"
 * >
 *   <CRECard>Problem content...</CRECard>
 * </CRESection>
 * ```
 */
export default function CRESection({
  title,
  subtitle,
  variant = 'default',
  children,
  className = '',
  titleColor,
  showGlow = true,
}: CRESectionProps) {
  const sectionColor = titleColor || variantColors[variant];

  return (
    <section
      className={`
        relative
        min-h-screen
        flex flex-col
        bg-gradient-to-b from-slate-950 to-slate-900
        overflow-hidden
        ${CRE_SPACING.container}
        ${className}
      `}
    >
      {/* Radial glow behind title */}
      {showGlow && (
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${withOpacity(sectionColor, 12)} 0%, transparent 60%)`,
          }}
        />
      )}

      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col">
        {/* Section Header */}
        <header className={CRE_SPACING.margin.section}>
          <h1
            className={`${CRE_TYPOGRAPHY.display.lg} ${CRE_TYPOGRAPHY.font.display}`}
            style={{ color: sectionColor }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className={`${CRE_TYPOGRAPHY.body.lg} text-white/80 max-w-3xl mt-4`}>
              {subtitle}
            </p>
          )}
        </header>

        {/* Section Content */}
        <div className="flex-1">
          {children}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(15, 23, 42, 0.8))',
        }}
      />
    </section>
  );
}
