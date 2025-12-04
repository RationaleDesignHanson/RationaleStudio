/**
 * Athletes First Design Tokens
 *
 * Centralized design system for the Athletes First presentation.
 * Use these tokens instead of hardcoded values for consistency.
 */

export const COLORS = {
  // Brand Identity
  brand: {
    primaryBlue: '#0066FF',
    cyan: '#00D9FF',
    green: '#00FF94',
    orange: '#FF6B00',
    purple: '#9D4EDD',
    terminalGold: '#FFD700',
  },

  // Semantic Usage (for consistency)
  semantic: {
    primary: '#00D9FF',      // Cyan - primary actions (buttons, links)
    secondary: '#0066FF',    // Blue - secondary actions
    success: '#00FF94',      // Green - success states
    warning: '#FF6B00',      // Orange - warning states
    error: '#EF4444',        // Red - error states
    info: '#0066FF',         // Blue - info messages
  },

  // UI Colors
  ui: {
    background: {
      base: '#000000',
      elevated1: 'rgba(255, 255, 255, 0.05)',
      elevated2: 'rgba(255, 255, 255, 0.10)',
      hover: 'rgba(255, 255, 255, 0.08)',
    },
    border: {
      default: 'rgba(255, 255, 255, 0.10)',
      hover: 'rgba(255, 255, 255, 0.20)',
      focus: 'rgba(0, 217, 255, 0.50)',
      accent: 'rgba(0, 217, 255, 0.30)',
    },
    text: {
      primary: 'rgba(255, 255, 255, 1)',
      secondary: 'rgba(255, 255, 255, 0.80)',
      tertiary: 'rgba(255, 255, 255, 0.60)',
      disabled: 'rgba(255, 255, 255, 0.40)',
    },
  },

  // Section Colors (for pitch deck navigation)
  sections: {
    opening: '#0066FF',
    solutionOverview: '#00D9FF',
    videoDigitalTwins: '#00FF94',
    nilPlatform: '#FF6B00',
    interactivePitch: '#9D4EDD',
    whyRationale: '#00D9FF',
    pilotDetails: '#0066FF',
  },
} as const;

export const TYPOGRAPHY = {
  fontFamily: {
    sans: 'var(--font-geist-sans)',
    mono: 'var(--font-geist-mono)',
    terminal: 'var(--font-ibm-plex-mono)',
  },

  fontSize: {
    // 5-tier system (as defined in globals.css)
    h1: '2rem',           // 32px - Hero, page titles
    h2: '1.5rem',         // 24px - Section headers
    h3: '1.25rem',        // 20px - Subsections
    body: '1rem',         // 16px - Body text
    caption: '0.875rem',  // 14px - Captions, metadata

    // Extended for flexibility
    xs: '0.75rem',        // 12px
    sm: '0.875rem',       // 14px
    base: '1rem',         // 16px
    lg: '1.125rem',       // 18px
    xl: '1.25rem',        // 20px
    '2xl': '1.5rem',      // 24px
    '3xl': '1.875rem',    // 30px
    '4xl': '2.25rem',     // 36px
    '5xl': '3rem',        // 48px
    '6xl': '3.75rem',     // 60px
    '7xl': '4.5rem',      // 72px
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900,
  },

  lineHeight: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 1.75,
  },
} as const;

export const SPACING = {
  // 6-tier system (as defined in globals.css)
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px

  // Semantic aliases
  xs: '0.25rem',
  sm: '0.5rem',
  md: '0.75rem',
  base: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
} as const;

export const BORDER_RADIUS = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px',   // Fully rounded
} as const;

export const SHADOWS = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',

  // Glow effects (for brand colors)
  glowCyan: '0 0 20px rgba(0, 217, 255, 0.4)',
  glowGold: '0 0 20px rgba(255, 215, 0, 0.3)',
} as const;

export const ANIMATION = {
  duration: {
    instant: 0,
    fast: 150,
    base: 200,
    slow: 300,
    slower: 500,
  },

  easing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
} as const;

export const BREAKPOINTS = {
  sm: '480px',    // 30rem
  md: '768px',    // 48rem
  lg: '1024px',   // 64rem
  xl: '1280px',   // 80rem
  '2xl': '1536px', // 96rem
} as const;

// Type exports for TypeScript support
export type ColorToken = keyof typeof COLORS.brand;
export type SemanticColor = keyof typeof COLORS.semantic;
export type SpacingToken = keyof typeof SPACING;
export type FontSizeToken = keyof typeof TYPOGRAPHY.fontSize;
export type FontWeightToken = keyof typeof TYPOGRAPHY.fontWeight;
