/**
 * CREaiT Design Tokens - Colors
 *
 * Color system for CREaiT pitch deck
 * Optimized for professional investor presentations
 */

export const CRE_COLORS = {
  // Primary brand colors
  primary: '#0ea5e9',      // Sky blue (opportunity focus)
  secondary: '#8b5cf6',    // Purple (relationships)
  accent: '#14b8a6',       // Teal (data quality)

  // Signal type colors (for timing signals)
  signal: {
    lease_expiry: '#ef4444',      // Red (urgent timing)
    debt_maturity: '#f97316',     // Orange (financial timing)
    ownership_change: '#a855f7',  // Purple (ownership event)
    market_event: '#06b6d4',      // Cyan (market activity)
    relationship: '#10b981',      // Green (engagement)
  },

  // Score range colors (opportunity scoring 0-100)
  score: {
    critical: '#ef4444',   // 80-100: Hot leads
    high: '#f97316',       // 60-79: High priority
    medium: '#f59e0b',     // 40-59: Medium priority
    low: '#3b82f6',        // 20-39: Low priority
    minimal: '#64748b',    // 0-19: Watch list
  },

  // Confidence levels (data quality)
  confidence: {
    high: '#10b981',       // Green
    medium: '#f59e0b',     // Amber
    low: '#ef4444',        // Red
  },

  // Section colors (pitch deck sections)
  section: {
    problem: '#0ea5e9',       // Sky blue
    solution: '#8b5cf6',      // Purple
    demo: '#14b8a6',          // Teal
    market: '#10b981',        // Green
    traction: '#f97316',      // Orange
    execution: '#3b82f6',     // Blue
    ask: '#06b6d4',           // Cyan
  },

  // Semantic colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#0ea5e9',

  // Text colors (on dark background)
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.80)',
    muted: 'rgba(255, 255, 255, 0.60)',
    disabled: 'rgba(255, 255, 255, 0.40)',
  },

  // Background colors
  bg: {
    primary: '#0f172a',      // Slate-950
    secondary: '#1e293b',    // Slate-900
    tertiary: '#334155',     // Slate-800
    card: 'rgba(255, 255, 255, 0.05)',
    cardHover: 'rgba(255, 255, 255, 0.08)',
  },

  // Border colors
  border: {
    default: 'rgba(255, 255, 255, 0.10)',
    hover: 'rgba(255, 255, 255, 0.15)',
    focus: 'rgba(255, 255, 255, 0.25)',
  },
} as const;

// Helper function to get score color based on value
export function getScoreColor(score: number): string {
  if (score >= 80) return CRE_COLORS.score.critical;
  if (score >= 60) return CRE_COLORS.score.high;
  if (score >= 40) return CRE_COLORS.score.medium;
  if (score >= 20) return CRE_COLORS.score.low;
  return CRE_COLORS.score.minimal;
}

// Helper function to get score label
export function getScoreLabel(score: number): string {
  if (score >= 80) return 'Hot';
  if (score >= 60) return 'High Priority';
  if (score >= 40) return 'Medium';
  if (score >= 20) return 'Low Priority';
  return 'Watch';
}

// Helper to convert hex to RGB for shadows
export function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0, 0, 0';

  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  return `${r}, ${g}, ${b}`;
}
