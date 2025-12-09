/**
 * Unified Color Design Token System for Athletes First
 *
 * This consolidates three parallel color systems:
 * 1. CSS custom properties from globals.css
 * 2. AF_COLORS from lib/athletes-first/content.ts
 * 3. SECTION_COLORS from components/athletes-first/AthletesFirstPitchV2.tsx
 *
 * Usage:
 *   import { COLORS, SECTION_COLORS, AF_COLORS } from '@/lib/design-tokens/colors'
 *
 *   // For inline styles with dynamic colors:
 *   style={{ color: COLORS.cyan[400] }}
 *
 *   // For section-based coloring:
 *   style={{ borderColor: SECTION_COLORS[sectionIndex] }}
 *
 *   // For Athletes First brand colors (backwards compatibility):
 *   style={{ color: AF_COLORS.primary }}
 */

/**
 * Base color palette - maps to CSS custom properties in globals.css
 */
export const COLORS = {
  // Cyan shades (primary accent)
  cyan: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee', // Primary cyan
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
    950: '#083344',
  },

  // Blue shades
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // Primary blue
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },

  // Green shades
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#10b981', // Primary green
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },

  // Purple shades
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7', // Primary purple
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
    950: '#3b0764',
  },

  // Orange shades
  orange: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316', // Primary orange
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
    950: '#431407',
  },

  // Indigo shades
  indigo: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1', // Primary indigo
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
    950: '#1e1b4b',
  },

  // Neutral shades (grays/blacks)
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },

  // Semantic colors
  white: '#ffffff',
  black: '#000000',

  // White opacity variants
  whiteOpacity: {
    5: 'rgba(255, 255, 255, 0.05)',
    10: 'rgba(255, 255, 255, 0.10)',
    20: 'rgba(255, 255, 255, 0.20)',
    30: 'rgba(255, 255, 255, 0.30)',
    40: 'rgba(255, 255, 255, 0.40)',
    50: 'rgba(255, 255, 255, 0.50)',
    60: 'rgba(255, 255, 255, 0.60)',
    70: 'rgba(255, 255, 255, 0.70)',
    80: 'rgba(255, 255, 255, 0.80)',
    90: 'rgba(255, 255, 255, 0.90)',
  },

  // Black opacity variants
  blackOpacity: {
    5: 'rgba(0, 0, 0, 0.05)',
    10: 'rgba(0, 0, 0, 0.10)',
    20: 'rgba(0, 0, 0, 0.20)',
    30: 'rgba(0, 0, 0, 0.30)',
    40: 'rgba(0, 0, 0, 0.40)',
    50: 'rgba(0, 0, 0, 0.50)',
    60: 'rgba(0, 0, 0, 0.60)',
    70: 'rgba(0, 0, 0, 0.70)',
    80: 'rgba(0, 0, 0, 0.80)',
    90: 'rgba(0, 0, 0, 0.90)',
  },
} as const;

/**
 * Section-specific color themes
 * Used for progressive color changes as users navigate through sections
 */
export const SECTION_COLORS = [
  COLORS.cyan[400],    // Opening - Cyan
  COLORS.blue[500],    // Win More Athletes - Blue
  COLORS.green[500],   // Close More Deals - Green
  COLORS.purple[500],  // Capture Every Moment - Purple
  COLORS.orange[500],  // Scale Infinitely - Orange
  COLORS.indigo[500],  // Path Forward - Indigo
] as const;

/**
 * Athletes First brand color system
 * Provides semantic naming for brand-specific colors
 *
 * Backwards compatible with existing AF_COLORS from content.ts
 * Phase 4.3: Migrated gold to terminal-gold token
 */
export const AF_COLORS = {
  // Primary brand colors
  primary: COLORS.cyan[400],     // Main brand color
  secondary: COLORS.blue[500],   // Secondary brand color
  accent: COLORS.purple[500],    // Accent/highlight color

  // Special colors
  gold: 'rgb(255 215 0)',        // terminal-gold for special moments/emphasis

  // Semantic UI colors
  success: COLORS.green[500],
  warning: COLORS.orange[500],
  error: '#ef4444',              // Red-500
  info: COLORS.cyan[400],

  // Text colors
  textPrimary: COLORS.white,
  textSecondary: COLORS.whiteOpacity[80],
  textMuted: COLORS.whiteOpacity[60],
  textDisabled: COLORS.whiteOpacity[40],

  // Background colors
  bgPrimary: COLORS.black,
  bgSecondary: COLORS.neutral[950],
  bgTertiary: COLORS.neutral[900],

  // Border colors
  borderPrimary: COLORS.whiteOpacity[10],
  borderSecondary: COLORS.whiteOpacity[20],
  borderAccent: COLORS.cyan[400],

  // State colors
  hover: COLORS.whiteOpacity[10],
  active: COLORS.whiteOpacity[20],
  disabled: COLORS.whiteOpacity[5],

  // Section-specific colors (for convenience)
  section: {
    opening: COLORS.cyan[400],
    winAthletes: COLORS.blue[500],
    closeDeals: COLORS.green[500],
    captureMoments: COLORS.purple[500],
    scaleInfinitely: COLORS.orange[500],
    pathForward: COLORS.indigo[500],
  },
} as const;

/**
 * Helper function to create color with opacity
 *
 * @param color - Base color hex code
 * @param opacity - Opacity value (0-100)
 * @returns CSS rgba color string
 *
 * @example
 * withOpacity(COLORS.cyan[400], 20) // 'rgba(34, 211, 238, 0.20)'
 */
export function withOpacity(color: string, opacity: number): string {
  // Remove # from hex color
  const hex = color.replace('#', '');

  // Parse hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Convert opacity to decimal (0-1)
  const a = opacity / 100;

  return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
}

/**
 * Type definitions for type safety
 */
export type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
export type ColorName = keyof typeof COLORS;
export type SectionColorIndex = 0 | 1 | 2 | 3 | 4 | 5;
