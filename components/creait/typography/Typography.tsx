import { ReactNode, ComponentPropsWithoutRef, ElementType } from 'react';
import { CRE_TYPOGRAPHY, TEXT_PATTERNS } from '@/lib/creait/design-tokens/typography';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';

interface BaseTypographyProps<T extends ElementType = 'div'> {
  as?: T;
  children: ReactNode;
  className?: string;
  color?: string;
  style?: React.CSSProperties;
}

type TypographyProps<T extends ElementType = 'div'> = BaseTypographyProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof BaseTypographyProps<T>>;

/**
 * Base Typography Component
 * Internal utility component for building typography variants
 */
function BaseTypography<T extends ElementType = 'div'>({
  as,
  children,
  className = '',
  color,
  style,
  ...props
}: TypographyProps<T>) {
  const Component = as || 'div';
  const inlineStyles = {
    ...(color && { color }),
    ...style,
  };

  return (
    <Component className={className} style={inlineStyles} {...props}>
      {children}
    </Component>
  );
}

/**
 * Display Components - For hero statements and large headlines
 */

export function DisplayXL({ as = 'h1', className = '', color, ...props }: TypographyProps<'h1'>) {
  return (
    <BaseTypography
      as={as}
      className={`${CRE_TYPOGRAPHY.display.xl} ${CRE_TYPOGRAPHY.font.display} ${className}`}
      color={color || CRE_COLORS.text.primary}
      {...props}
    />
  );
}

export function DisplayLG({ as = 'h1', className = '', color, ...props }: TypographyProps<'h1'>) {
  return (
    <BaseTypography
      as={as}
      className={`${CRE_TYPOGRAPHY.display.lg} ${CRE_TYPOGRAPHY.font.display} ${className}`}
      color={color || CRE_COLORS.text.primary}
      {...props}
    />
  );
}

export function DisplayMD({ as = 'h2', className = '', color, ...props }: TypographyProps<'h2'>) {
  return (
    <BaseTypography
      as={as}
      className={`${CRE_TYPOGRAPHY.display.md} ${CRE_TYPOGRAPHY.font.display} ${className}`}
      color={color || CRE_COLORS.text.primary}
      {...props}
    />
  );
}

/**
 * Heading Components - For section titles and card headers
 */

export function H1({ as = 'h1', className = '', color, ...props }: TypographyProps<'h1'>) {
  return (
    <BaseTypography
      as={as}
      className={`${CRE_TYPOGRAPHY.heading.h1} ${className}`}
      color={color || CRE_COLORS.text.primary}
      {...props}
    />
  );
}

export function H2({ as = 'h2', className = '', color, ...props }: TypographyProps<'h2'>) {
  return (
    <BaseTypography
      as={as}
      className={`${CRE_TYPOGRAPHY.heading.h2} ${className}`}
      color={color || CRE_COLORS.text.primary}
      {...props}
    />
  );
}

export function H3({ as = 'h3', className = '', color, ...props }: TypographyProps<'h3'>) {
  return (
    <BaseTypography
      as={as}
      className={`${CRE_TYPOGRAPHY.heading.h3} ${className}`}
      color={color || CRE_COLORS.text.primary}
      {...props}
    />
  );
}

export function H4({ as = 'h4', className = '', color, ...props }: TypographyProps<'h4'>) {
  return (
    <BaseTypography
      as={as}
      className={`${CRE_TYPOGRAPHY.heading.h4} ${className}`}
      color={color || CRE_COLORS.text.primary}
      {...props}
    />
  );
}

/**
 * Body Text Components - For paragraphs and body copy
 */

export function BodyXL({ as = 'p', className = '', color, ...props }: TypographyProps<'p'>) {
  return (
    <BaseTypography
      as={as}
      className={`${CRE_TYPOGRAPHY.body.xl} ${CRE_TYPOGRAPHY.font.sans} ${className}`}
      color={color || CRE_COLORS.text.secondary}
      {...props}
    />
  );
}

export function BodyLG({ as = 'p', className = '', color, ...props }: TypographyProps<'p'>) {
  return (
    <BaseTypography
      as={as}
      className={`${CRE_TYPOGRAPHY.body.lg} ${CRE_TYPOGRAPHY.font.sans} ${className}`}
      color={color || CRE_COLORS.text.secondary}
      {...props}
    />
  );
}

export function BodyMD({ as = 'p', className = '', color, ...props }: TypographyProps<'p'>) {
  return (
    <BaseTypography
      as={as}
      className={`${CRE_TYPOGRAPHY.body.md} ${CRE_TYPOGRAPHY.font.sans} ${className}`}
      color={color || CRE_COLORS.text.secondary}
      {...props}
    />
  );
}

export function BodySM({ as = 'p', className = '', color, ...props }: TypographyProps<'p'>) {
  return (
    <BaseTypography
      as={as}
      className={`${CRE_TYPOGRAPHY.body.sm} ${CRE_TYPOGRAPHY.font.sans} ${className}`}
      color={color || CRE_COLORS.text.muted}
      {...props}
    />
  );
}

/**
 * Label Components - For metadata and section labels
 */

export function LabelLG({ as = 'span', className = '', color, ...props }: TypographyProps<'span'>) {
  return (
    <BaseTypography
      as={as}
      className={`${CRE_TYPOGRAPHY.label.lg} ${CRE_TYPOGRAPHY.font.sans} ${className}`}
      color={color || CRE_COLORS.text.secondary}
      {...props}
    />
  );
}

export function LabelMD({ as = 'span', className = '', color, ...props }: TypographyProps<'span'>) {
  return (
    <BaseTypography
      as={as}
      className={`${CRE_TYPOGRAPHY.label.md} ${CRE_TYPOGRAPHY.font.sans} ${className}`}
      color={color || CRE_COLORS.text.muted}
      {...props}
    />
  );
}

export function LabelSM({ as = 'span', className = '', color, ...props }: TypographyProps<'span'>) {
  return (
    <BaseTypography
      as={as}
      className={`${CRE_TYPOGRAPHY.label.sm} ${CRE_TYPOGRAPHY.font.sans} ${className}`}
      color={color || CRE_COLORS.text.muted}
      {...props}
    />
  );
}

/**
 * Data/Metric Components - For numbers, scores, and tabular data
 */

export function DataXL({ as = 'div', className = '', color, ...props }: TypographyProps<'div'>) {
  return (
    <BaseTypography
      as={as}
      className={`${CRE_TYPOGRAPHY.data.xl} ${CRE_TYPOGRAPHY.font.display} ${className}`}
      color={color || CRE_COLORS.text.primary}
      {...props}
    />
  );
}

export function DataLG({ as = 'div', className = '', color, ...props }: TypographyProps<'div'>) {
  return (
    <BaseTypography
      as={as}
      className={`${CRE_TYPOGRAPHY.data.lg} ${CRE_TYPOGRAPHY.font.mono} ${className}`}
      color={color || CRE_COLORS.text.primary}
      {...props}
    />
  );
}

export function DataMD({ as = 'div', className = '', color, ...props }: TypographyProps<'div'>) {
  return (
    <BaseTypography
      as={as}
      className={`${CRE_TYPOGRAPHY.data.md} ${CRE_TYPOGRAPHY.font.mono} ${className}`}
      color={color || CRE_COLORS.text.primary}
      {...props}
    />
  );
}

export function DataSM({ as = 'span', className = '', color, ...props }: TypographyProps<'span'>) {
  return (
    <BaseTypography
      as={as}
      className={`${CRE_TYPOGRAPHY.data.sm} ${CRE_TYPOGRAPHY.font.mono} ${className}`}
      color={color || CRE_COLORS.text.secondary}
      {...props}
    />
  );
}

/**
 * Pre-composed Pattern Components
 * Using TEXT_PATTERNS from design tokens
 */

export function SlideHeadline({ as = 'h1', className = '', color, ...props }: TypographyProps<'h1'>) {
  return (
    <BaseTypography
      as={as}
      className={`${TEXT_PATTERNS.slideHeadline} ${className}`}
      color={color || CRE_COLORS.text.primary}
      {...props}
    />
  );
}

export function CardTitle({ as = 'h3', className = '', color, ...props }: TypographyProps<'h3'>) {
  return (
    <BaseTypography
      as={as}
      className={`${TEXT_PATTERNS.cardTitle} ${className}`}
      color={color || CRE_COLORS.text.primary}
      {...props}
    />
  );
}

export function SectionLabel({ as = 'span', className = '', color, ...props }: TypographyProps<'span'>) {
  return (
    <BaseTypography
      as={as}
      className={`${TEXT_PATTERNS.sectionLabel} ${className}`}
      color={color || CRE_COLORS.text.muted}
      {...props}
    />
  );
}

export function MetricValue({ as = 'div', className = '', color, ...props }: TypographyProps<'div'>) {
  return (
    <BaseTypography
      as={as}
      className={`${TEXT_PATTERNS.metricValue} ${className}`}
      color={color || CRE_COLORS.text.primary}
      {...props}
    />
  );
}

/**
 * Utility: Score Display with Color Coding
 * Automatically applies color based on score value
 */
interface ScoreDisplayProps {
  score: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
  className?: string;
}

export function ScoreDisplay({
  score,
  label,
  size = 'lg',
  showLabel = true,
  className = '',
}: ScoreDisplayProps) {
  const scoreColor = CRE_COLORS.score.critical; // Default, but will be calculated
  let color = CRE_COLORS.score.minimal;

  if (score >= 80) color = CRE_COLORS.score.critical;
  else if (score >= 60) color = CRE_COLORS.score.high;
  else if (score >= 40) color = CRE_COLORS.score.medium;
  else if (score >= 20) color = CRE_COLORS.score.low;

  const DataComponent = {
    xl: DataXL,
    lg: DataLG,
    md: DataMD,
    sm: DataSM,
  }[size];

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <DataComponent color={color}>{Math.round(score)}</DataComponent>
      {showLabel && label && (
        <LabelSM className="mt-2" color={CRE_COLORS.text.muted}>
          {label}
        </LabelSM>
      )}
    </div>
  );
}
