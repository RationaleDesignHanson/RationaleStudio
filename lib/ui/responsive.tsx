/**
 * Responsive Component Library
 *
 * Type-safe, reusable responsive components for consistent design across all projects.
 * Based on the responsive patterns established in the Rationale homepage.
 *
 * Usage:
 * <ResponsiveText variant="h2">Section Title</ResponsiveText>
 * <ResponsiveBox padding="lg" gap="md">Content</ResponsiveBox>
 * <ResponsiveButton size="lg">Click Me</ResponsiveButton>
 */

import React from 'react';

// ============================================================================
// ResponsiveText Component
// ============================================================================

export type TextVariant =
  | 'display'  // Hero/largest text
  | 'h1'       // Page titles
  | 'h2'       // Section titles
  | 'h3'       // Subsection titles
  | 'h4'       // Card titles
  | 'large'    // Large body text
  | 'body'     // Standard body text
  | 'small';   // Small text

export interface ResponsiveTextProps {
  variant: TextVariant;
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

const textVariants: Record<TextVariant, string> = {
  display: 'text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight',
  h1: 'text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight',
  h2: 'text-2xl sm:text-3xl lg:text-4xl font-bold',
  h3: 'text-xl sm:text-2xl lg:text-3xl font-bold',
  h4: 'text-lg sm:text-xl font-semibold',
  large: 'text-base sm:text-lg lg:text-xl',
  body: 'text-sm sm:text-base lg:text-lg leading-relaxed',
  small: 'text-xs sm:text-sm',
};

export function ResponsiveText({
  variant,
  children,
  className = '',
  as
}: ResponsiveTextProps) {
  const Component = as || getDefaultElement(variant);
  const variantClasses = textVariants[variant];

  return (
    <Component className={`${variantClasses} ${className}`}>
      {children}
    </Component>
  );
}

function getDefaultElement(variant: TextVariant): 'h1' | 'h2' | 'h3' | 'h4' | 'p' {
  switch (variant) {
    case 'display':
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'h4':
      return 'h4';
    default:
      return 'p';
  }
}

// ============================================================================
// ResponsiveBox Component
// ============================================================================

export type PaddingSize = 'none' | 'sm' | 'md' | 'lg';
export type GapSize = 'none' | 'sm' | 'md' | 'lg';
export type MarginSize = 'none' | 'sm' | 'md' | 'lg';

export interface ResponsiveBoxProps {
  children: React.ReactNode;
  padding?: PaddingSize;
  gap?: GapSize;
  marginBottom?: MarginSize;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'main';
}

const paddingSizes: Record<PaddingSize, string> = {
  none: '',
  sm: 'p-4 sm:p-6',
  md: 'p-6 sm:p-8',
  lg: 'p-6 sm:p-8 lg:p-12',
};

const gapSizes: Record<GapSize, string> = {
  none: '',
  sm: 'gap-2 sm:gap-3 lg:gap-4',
  md: 'gap-4 sm:gap-6 lg:gap-8',
  lg: 'gap-6 sm:gap-8 lg:gap-12',
};

const marginBottomSizes: Record<MarginSize, string> = {
  none: '',
  sm: 'mb-4 sm:mb-6',
  md: 'mb-8 sm:mb-10 lg:mb-12',
  lg: 'mb-12 sm:mb-16 lg:mb-20',
};

export function ResponsiveBox({
  children,
  padding = 'none',
  gap = 'none',
  marginBottom = 'none',
  className = '',
  as = 'div'
}: ResponsiveBoxProps) {
  const Component = as;
  const paddingClass = paddingSizes[padding];
  const gapClass = gapSizes[gap];
  const marginClass = marginBottomSizes[marginBottom];

  return (
    <Component className={`${paddingClass} ${gapClass} ${marginClass} ${className}`}>
      {children}
    </Component>
  );
}

// ============================================================================
// ResponsiveButton Component
// ============================================================================

export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonVariant = 'primary' | 'secondary';

export interface ResponsiveButtonProps {
  children: React.ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm',
  md: 'px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base',
  lg: 'px-8 py-3 sm:px-10 sm:py-4 text-base sm:text-lg',
};

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'text-white bg-accent hover:bg-accent/90',
  secondary: 'text-foreground bg-transparent border border-border hover:bg-accent/10',
};

export function ResponsiveButton({
  children,
  size = 'md',
  variant = 'primary',
  href,
  onClick,
  className = '',
  type = 'button',
  disabled = false
}: ResponsiveButtonProps) {
  const sizeClasses = buttonSizes[size];
  const variantClasses = buttonVariants[variant];
  const baseClasses = 'inline-block font-medium rounded-md transition-colors';
  const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`;

  if (href) {
    // Render as link
    return (
      <a href={href} className={combinedClasses}>
        {children}
      </a>
    );
  }

  // Render as button
  return (
    <button type={type} onClick={onClick} className={combinedClasses} disabled={disabled}>
      {children}
    </button>
  );
}

// ============================================================================
// ResponsiveGrid Component
// ============================================================================

export type GridCols = '1' | '2' | '3' | '4';

export interface ResponsiveGridProps {
  children: React.ReactNode;
  cols?: GridCols;
  gap?: GapSize;
  className?: string;
}

const gridCols: Record<GridCols, string> = {
  '1': 'grid-cols-1',
  '2': 'sm:grid-cols-2',
  '3': 'sm:grid-cols-2 lg:grid-cols-3',
  '4': 'sm:grid-cols-2 lg:grid-cols-4',
};

export function ResponsiveGrid({
  children,
  cols = '3',
  gap = 'md',
  className = ''
}: ResponsiveGridProps) {
  const colsClass = gridCols[cols];
  const gapClass = gapSizes[gap];

  return (
    <div className={`grid ${colsClass} ${gapClass} ${className}`}>
      {children}
    </div>
  );
}

// ============================================================================
// ResponsiveStack Component (Flex column with gap)
// ============================================================================

export interface ResponsiveStackProps {
  children: React.ReactNode;
  gap?: GapSize;
  className?: string;
}

export function ResponsiveStack({
  children,
  gap = 'md',
  className = ''
}: ResponsiveStackProps) {
  const gapClass = gapSizes[gap];

  return (
    <div className={`flex flex-col ${gapClass} ${className}`}>
      {children}
    </div>
  );
}
