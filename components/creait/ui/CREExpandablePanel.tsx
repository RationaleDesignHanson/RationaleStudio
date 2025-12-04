'use client';

import { ReactNode } from 'react';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';
import { CRE_TYPOGRAPHY } from '@/lib/creait/design-tokens/typography';
import { CRE_SPACING, CRE_RADIUS, CRE_ANIMATIONS } from '@/lib/creait/design-tokens/spacing';
import { cardGlow } from '@/lib/style-utils/effects';
import { withOpacity } from '@/lib/design-tokens/colors';

type CREPanelVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'critical'
  | 'high'
  | 'medium'
  | 'neutral';

interface CREExpandablePanelProps {
  index: number;
  label: string;
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  variant?: CREPanelVariant;
  children: ReactNode;
  /**
   * Show numbered badge
   * @default true
   */
  showNumber?: boolean;
}

const variantColors = {
  primary: CRE_COLORS.primary,
  secondary: CRE_COLORS.secondary,
  accent: CRE_COLORS.accent,
  critical: CRE_COLORS.score.critical,
  high: CRE_COLORS.score.high,
  medium: CRE_COLORS.score.medium,
  neutral: withOpacity(CRE_COLORS.text.primary, 30),
};

/**
 * CREExpandablePanel - Collapsible panel for deep-dive content
 *
 * Features:
 * - Accordion-style expand/collapse animation
 * - Color-coded by priority/variant
 * - Large number badge background
 * - Smooth transitions using design token animations
 * - Accessible button with keyboard support
 *
 * @example
 * ```tsx
 * const [expanded, setExpanded] = useState(false);
 *
 * <CREExpandablePanel
 *   index={0}
 *   label="DEEP DIVE"
 *   title="How We Calculate Opportunity Score"
 *   isExpanded={expanded}
 *   onToggle={() => setExpanded(!expanded)}
 *   variant="primary"
 * >
 *   <p>Our scoring algorithm considers...</p>
 * </CREExpandablePanel>
 * ```
 */
export default function CREExpandablePanel({
  index,
  label,
  title,
  isExpanded,
  onToggle,
  variant = 'primary',
  children,
  showNumber = true,
}: CREExpandablePanelProps) {
  const color = variantColors[variant];
  const numberDisplay = String(index + 1).padStart(2, '0');

  const backgroundStyle = {
    background: `linear-gradient(135deg, ${withOpacity('#1e293b', 90)} 0%, ${withOpacity('#0f172a', 95)} 100%)`,
  };

  return (
    <button
      onClick={onToggle}
      className={`
        relative w-full text-left overflow-hidden
        ${CRE_RADIUS.md}
        border-l-4
        backdrop-blur-sm
        ${CRE_ANIMATIONS.duration.normal}
        ${CRE_ANIMATIONS.ease.default}
        hover:shadow-xl
        group
        flex flex-col items-start
      `}
      style={{
        ...backgroundStyle,
        borderColor: color,
        ...cardGlow(color, 'subtle'),
        minHeight: '48px',
        boxShadow: isExpanded
          ? `0 20px 40px -10px ${withOpacity(color, 20)}`
          : `0 10px 25px -5px rgba(0, 0, 0, 0.3)`,
      }}
      aria-expanded={isExpanded}
      aria-controls={`panel-content-${index}`}
    >
      {/* Large background number */}
      {showNumber && (
        <div
          className={`absolute -top-4 -right-4 font-bold opacity-5 pointer-events-none select-none ${CRE_ANIMATIONS.duration.normal}`}
          style={{
            fontSize: 'clamp(5rem, 12vw, 9rem)',
            color: color,
            opacity: isExpanded ? 0.08 : 0.05,
            fontFamily: 'var(--font-ibm-plex-mono)',
          }}
        >
          {numberDisplay}
        </div>
      )}

      {/* Radial glow when expanded */}
      {isExpanded && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at top left, ${withOpacity(color, 10)} 0%, transparent 60%)`,
          }}
        />
      )}

      <div className={`relative z-10 ${CRE_SPACING.card} w-full`}>
        {/* Header - Always Visible */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Label */}
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`${CRE_TYPOGRAPHY.label.sm} tracking-wider`}
                style={{ color }}
              >
                {label}
              </span>
            </div>

            {/* Title */}
            <h4 className={`${CRE_TYPOGRAPHY.heading.h3} text-white`}>
              {title}
            </h4>
          </div>

          {/* Chevron Icon */}
          <div
            className={`
              flex-shrink-0 w-8 h-8 flex items-center justify-center
              ${CRE_RADIUS.sm}
              bg-white/5 group-hover:bg-white/10
              ${CRE_ANIMATIONS.duration.normal}
            `}
            style={{
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            <svg
              className="w-5 h-5"
              style={{ color }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Expandable Content */}
        <div
          id={`panel-content-${index}`}
          className={`overflow-hidden ${CRE_ANIMATIONS.duration.normal}`}
          style={{
            maxHeight: isExpanded ? '2000px' : '0px',
            opacity: isExpanded ? 1 : 0,
          }}
        >
          <div className={`${CRE_SPACING.stack.comfortable} pt-6 border-t border-white/10 mt-6`}>
            {children}
          </div>
        </div>
      </div>
    </button>
  );
}
