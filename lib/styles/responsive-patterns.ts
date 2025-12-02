/**
 * Responsive Pattern Constants
 *
 * Centralized responsive class strings for use in components that can't use
 * the ResponsiveText/ResponsiveBox components directly.
 *
 * These are the same patterns used by the responsive components,
 * exported as constants for flexibility.
 */

// ============================================================================
// Typography Patterns
// ============================================================================

export const RESPONSIVE_TEXT = {
  // Display / Hero text (largest)
  display: 'text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight',

  // Headings
  h1: 'text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight',
  h2: 'text-2xl sm:text-3xl lg:text-4xl font-bold',
  h3: 'text-xl sm:text-2xl lg:text-3xl font-bold',
  h4: 'text-lg sm:text-xl font-semibold',
  h5: 'text-base sm:text-lg font-semibold',
  h6: 'text-sm sm:text-base font-semibold',

  // Body text
  large: 'text-base sm:text-lg lg:text-xl',
  body: 'text-sm sm:text-base lg:text-lg leading-relaxed',
  small: 'text-xs sm:text-sm',
  tiny: 'text-xs',
} as const;

// ============================================================================
// Spacing Patterns
// ============================================================================

export const RESPONSIVE_PADDING = {
  // Component padding (cards, containers)
  none: '',
  xs: 'p-2 sm:p-3',
  sm: 'p-4 sm:p-6',
  md: 'p-6 sm:p-8',
  lg: 'p-6 sm:p-8 lg:p-12',
  xl: 'p-8 sm:p-12 lg:p-16',
} as const;

export const RESPONSIVE_PADDING_X = {
  none: '',
  xs: 'px-2 sm:px-3',
  sm: 'px-4 sm:px-6',
  md: 'px-6 sm:px-8',
  lg: 'px-6 sm:px-8 lg:px-12',
  xl: 'px-8 sm:px-12 lg:px-16',
} as const;

export const RESPONSIVE_PADDING_Y = {
  none: '',
  xs: 'py-2 sm:py-3',
  sm: 'py-4 sm:py-6',
  md: 'py-6 sm:py-8',
  lg: 'py-6 sm:py-8 lg:py-12',
  xl: 'py-8 sm:py-12 lg:py-16',
} as const;

export const RESPONSIVE_GAP = {
  none: '',
  xs: 'gap-1 sm:gap-2',
  sm: 'gap-2 sm:gap-3 lg:gap-4',
  md: 'gap-4 sm:gap-6 lg:gap-8',
  lg: 'gap-6 sm:gap-8 lg:gap-12',
  xl: 'gap-8 sm:gap-12 lg:gap-16',
} as const;

export const RESPONSIVE_MARGIN_BOTTOM = {
  none: '',
  xs: 'mb-2 sm:mb-3',
  sm: 'mb-4 sm:mb-6',
  md: 'mb-8 sm:mb-10 lg:mb-12',
  lg: 'mb-12 sm:mb-16 lg:mb-20',
  xl: 'mb-16 sm:mb-20 lg:mb-24',
} as const;

export const RESPONSIVE_MARGIN_TOP = {
  none: '',
  xs: 'mt-2 sm:mt-3',
  sm: 'mt-4 sm:mt-6',
  md: 'mt-8 sm:mt-10 lg:mt-12',
  lg: 'mt-12 sm:mt-16 lg:mt-20',
  xl: 'mt-16 sm:mt-20 lg:mt-24',
} as const;

// ============================================================================
// Section Padding Patterns
// ============================================================================

export const RESPONSIVE_SECTION_PADDING = {
  sm: 'pt-8 sm:pt-12',
  md: 'pt-12 sm:pt-16',
  lg: 'pt-16 sm:pt-20',
  xl: 'pt-20 sm:pt-24 lg:pt-32',
} as const;

// ============================================================================
// Button Patterns
// ============================================================================

export const RESPONSIVE_BUTTON = {
  sm: 'px-4 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm',
  md: 'px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base',
  lg: 'px-8 py-3 sm:px-10 sm:py-4 text-base sm:text-lg',
} as const;

export const RESPONSIVE_BUTTON_VARIANTS = {
  primary: 'text-white bg-accent hover:bg-accent/90',
  secondary: 'text-foreground bg-transparent border border-border hover:bg-accent/10',
  outline: 'text-accent bg-transparent border border-accent hover:bg-accent hover:text-white',
} as const;

// ============================================================================
// Grid Patterns
// ============================================================================

export const RESPONSIVE_GRID_COLS = {
  1: 'grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
  auto: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
} as const;

// ============================================================================
// Layout Patterns
// ============================================================================

export const RESPONSIVE_CONTAINER = {
  default: 'mx-auto px-6 sm:px-8 lg:px-12',
  narrow: 'mx-auto px-6 sm:px-8 lg:px-12 max-w-3xl',
  wide: 'mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl',
} as const;

// ============================================================================
// Component-Specific Patterns
// ============================================================================

export const RESPONSIVE_CARD = {
  padding: 'p-4 sm:p-6 lg:p-8',
  title: 'text-lg sm:text-xl font-semibold',
  description: 'text-sm sm:text-base text-muted',
} as const;

export const RESPONSIVE_ACCORDION = {
  headerPadding: 'px-4 py-3 sm:px-6 sm:py-4',
  contentPadding: 'px-6 sm:px-8 pb-6 sm:pb-8 pt-2 mx-2',
  title: 'text-lg sm:text-xl',
  text: 'text-sm sm:text-base',
} as const;

export const RESPONSIVE_FORM = {
  input: 'px-4 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base',
  label: 'text-sm sm:text-base font-medium',
  helper: 'text-xs sm:text-sm text-muted',
} as const;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Combine multiple responsive class strings
 */
export function combineResponsiveClasses(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Get responsive text class by variant name
 */
export function getResponsiveText(variant: keyof typeof RESPONSIVE_TEXT): string {
  return RESPONSIVE_TEXT[variant];
}

/**
 * Get responsive padding class by size
 */
export function getResponsivePadding(size: keyof typeof RESPONSIVE_PADDING): string {
  return RESPONSIVE_PADDING[size];
}

/**
 * Get responsive gap class by size
 */
export function getResponsiveGap(size: keyof typeof RESPONSIVE_GAP): string {
  return RESPONSIVE_GAP[size];
}
