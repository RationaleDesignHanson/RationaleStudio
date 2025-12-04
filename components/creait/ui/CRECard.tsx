import { ReactNode } from 'react';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';
import { CRE_SPACING, CRE_RADIUS, CRE_SHADOWS } from '@/lib/creait/design-tokens/spacing';
import { cardGlow } from '@/lib/style-utils/effects';
import { withOpacity } from '@/lib/design-tokens/colors';

type CRECardVariant =
  | 'primary'      // Sky blue
  | 'secondary'    // Purple
  | 'accent'       // Teal
  | 'critical'     // Hot lead (red)
  | 'high'         // High priority (orange)
  | 'medium'       // Medium priority (amber)
  | 'neutral';     // Default card

type CRECardSize = 'compact' | 'default' | 'large';

interface CRECardProps {
  variant?: CRECardVariant;
  size?: CRECardSize;
  children: ReactNode;
  className?: string;
  /**
   * Enable hover effect for interactive cards
   * @default false
   */
  interactive?: boolean;
  /**
   * Show colored left border accent
   * @default true
   */
  showBorder?: boolean;
}

const variantColors = {
  primary: CRE_COLORS.primary,           // Sky blue
  secondary: CRE_COLORS.secondary,       // Purple
  accent: CRE_COLORS.accent,             // Teal
  critical: CRE_COLORS.score.critical,   // Red
  high: CRE_COLORS.score.high,           // Orange
  medium: CRE_COLORS.score.medium,       // Amber
  neutral: withOpacity(CRE_COLORS.text.primary, 20),
};

const sizeClasses = {
  compact: CRE_SPACING.cardCompact,
  default: CRE_SPACING.card,
  large: 'p-8 md:p-10',
};

/**
 * CRECard - Base card component for CREaiT pitch deck
 *
 * Features:
 * - Glassmorphism design with backdrop blur
 * - Responsive padding using design tokens
 * - Color-coded variants for different priorities
 * - Optional glow effects and interactive states
 *
 * @example
 * ```tsx
 * <CRECard variant="critical" interactive>
 *   <h3>Hot Lead Opportunity</h3>
 *   <p>Score: 95</p>
 * </CRECard>
 * ```
 */
export default function CRECard({
  variant = 'neutral',
  size = 'default',
  children,
  className = '',
  interactive = false,
  showBorder = true,
}: CRECardProps) {
  const accentColor = variantColors[variant];
  const sizeClass = sizeClasses[size];

  // Glassmorphism background with dark slate tones
  const backgroundStyle = {
    background: `linear-gradient(135deg, ${withOpacity('#1e293b', 90)} 0%, ${withOpacity('#0f172a', 95)} 100%)`,
  };

  return (
    <div
      className={`
        relative overflow-hidden
        ${CRE_RADIUS.md}
        ${sizeClass}
        ${showBorder ? 'border-l-4' : ''}
        ${interactive ? CRE_SHADOWS.cardHover : CRE_SHADOWS.card}
        backdrop-blur-sm
        ${className}
      `}
      style={{
        ...backgroundStyle,
        ...(showBorder && {
          borderColor: accentColor,
          ...cardGlow(accentColor, 'subtle'),
        }),
      }}
    >
      {/* Subtle glassmorphism overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${withOpacity(accentColor, 8)} 0%, transparent 50%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
