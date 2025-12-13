/**
 * Shared Design Tokens for Rationale Presentations
 *
 * Unified Terminal Republic aesthetic across all client presentations.
 * Enforces brand consistency while allowing client-specific theming.
 */

// ============================================================================
// CORE BRAND COLORS
// ============================================================================

/**
 * Terminal Gold - Rationale's signature accent color
 * Used for: Shell chrome, progress bars, CTAs, navigation highlights
 */
export const RATIONALE_ACCENT = '#FFD700';

/**
 * Section Colors - Dynamic theming per presentation section
 * Default set: Can be overridden per client
 */
export const SECTION_COLORS = {
  diagnosis: '#3B82F6',    // Blue - Analytical, diagnostic
  decision: '#8B5CF6',      // Purple - Strategic, decisive
  implementation: '#10B981', // Green - Action, growth
  opening: '#0066FF',       // Bright blue - Introduction
  solution: '#00D9FF',      // Cyan - Innovation
  modules: '#00FF94',       // Emerald - Features
  impact: '#FF6B00',        // Orange - Results
  closing: '#9D4EDD',       // Violet - Next steps
} as const;

/**
 * Phase Badge Colors - Problem/Solution/Demo/Impact
 */
export const PHASE_COLORS = {
  problem: '#FF3366',       // Red - Problem identification
  solution: '#00D9FF',      // Cyan - Solution presentation
  demo: '#00FF94',          // Green - Interactive demonstration
  impact: '#FF6B00',        // Orange - Business impact
  strategic: '#8B5CF6',     // Purple - Strategic guidance
  technical: '#3B82F6',     // Blue - Technical details
} as const;

/**
 * Semantic Colors - Status indicators, alerts, success states
 */
export const SEMANTIC_COLORS = {
  success: '#10b981',       // Green
  error: '#ef4444',         // Red
  warning: '#f59e0b',       // Amber
  info: '#3b82f6',          // Blue
  neutral: '#6b7280',       // Gray
} as const;

// ============================================================================
// BACKGROUND COLORS
// ============================================================================

export const BACKGROUNDS = {
  primary: '#000000',       // Pure black
  elevated: '#0a0a0a',      // Off-black
  card: '#1a1a1a',          // Elevated black
  overlay: '#0F172A',       // Slate-950
} as const;

// ============================================================================
// TEXT COLORS
// ============================================================================

export const TEXT_COLORS = {
  primary: '#ffffff',       // White
  secondary: '#e5e5e5',     // Light gray
  tertiary: '#999999',      // Mid gray
  muted: '#666666',         // Dark gray
  accent: RATIONALE_ACCENT, // Terminal gold
} as const;

// ============================================================================
// ASCII GRID CONFIGURATION
// ============================================================================

/**
 * ASCII Grid Shader Configuration
 * Controls the terminal-style animated background
 */
export const SHADER_CONFIGS = {
  ambient: {
    opacity: 0.04,          // Barely visible, subliminal brand marker
    animated: true,
    charSet: 'depth' as const,
    theme: 'terminal-gold' as const,
  },
  standard: {
    opacity: 0.06,          // Noticeable but not distracting
    animated: true,
    charSet: 'depth' as const,
    theme: 'terminal-gold' as const,
  },
  emphasized: {
    opacity: 0.18,          // Prominent for section headers
    animated: true,
    charSet: 'compute' as const,
    theme: 'terminal-gold' as const,
  },
} as const;

// ============================================================================
// TYPOGRAPHY
// ============================================================================

/**
 * Type Scale - Fluid responsive sizing
 * Uses Tailwind's text-* classes
 */
export const TYPE_SCALE = {
  h1: 'text-5xl md:text-6xl lg:text-7xl',
  h2: 'text-4xl md:text-5xl lg:text-6xl',
  h3: 'text-3xl md:text-4xl lg:text-5xl',
  h4: 'text-2xl md:text-3xl lg:text-4xl',
  h5: 'text-xl md:text-2xl lg:text-3xl',
  body: 'text-base md:text-lg',
  caption: 'text-sm md:text-base',
  small: 'text-xs md:text-sm',
} as const;

/**
 * Font Families
 */
export const FONTS = {
  mono: 'JetBrains Mono, monospace',      // Terminal aesthetic
  sans: 'Inter, system-ui, sans-serif',    // Body text
  display: 'JetBrains Mono, monospace',    // Headers (mono for terminal feel)
} as const;

// ============================================================================
// SPACING
// ============================================================================

/**
 * Spacing Scale - 8px base unit
 */
export const SPACING = {
  xs: '0.5rem',    // 8px
  sm: '1rem',      // 16px
  md: '1.5rem',    // 24px
  lg: '2rem',      // 32px
  xl: '3rem',      // 48px
  '2xl': '4rem',   // 64px
  '3xl': '6rem',   // 96px
} as const;

// ============================================================================
// ANIMATION TIMING
// ============================================================================

/**
 * Animation Durations & Easing
 * Consistent motion language across all presentations
 */
export const ANIMATIONS = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  easing: {
    standard: 'ease-in-out',
    enter: 'ease-out',
    exit: 'ease-in',
  },
  transitions: {
    slide: 'all 300ms ease-in-out',
    fade: 'opacity 300ms ease-in-out',
    color: 'color 150ms ease-in-out',
    progress: 'width 500ms ease-in-out',
  },
} as const;

// ============================================================================
// BORDER STYLES
// ============================================================================

export const BORDERS = {
  thin: '1px',
  standard: '2px',
  thick: '4px',
  colors: {
    default: 'rgba(255, 255, 255, 0.1)',
    hover: 'rgba(255, 255, 255, 0.2)',
    active: 'rgba(255, 255, 255, 0.3)',
    accent: RATIONALE_ACCENT,
  },
} as const;

// ============================================================================
// SHADOWS & EFFECTS
// ============================================================================

export const SHADOWS = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  glow: `0 0 20px rgba(255, 215, 0, 0.2)`, // Terminal gold glow
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get section color by ID
 */
export const getSectionColor = (sectionId: string): string => {
  return SECTION_COLORS[sectionId as keyof typeof SECTION_COLORS] || SECTION_COLORS.opening;
};

/**
 * Get phase color by type
 */
export const getPhaseColor = (phaseType: string): string => {
  return PHASE_COLORS[phaseType as keyof typeof PHASE_COLORS] || PHASE_COLORS.solution;
};

/**
 * Convert hex to rgba
 */
export const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * Get gradient from color
 */
export const getGradient = (color: string, direction: 'to-r' | 'to-br' | 'to-b' = 'to-r'): string => {
  return `linear-gradient(${direction}, ${color}, ${hexToRgba(color, 0.5)})`;
};

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============================================================================
// EXPORT TYPES
// ============================================================================

export type SectionColor = keyof typeof SECTION_COLORS;
export type PhaseColor = keyof typeof PHASE_COLORS;
export type ShaderConfig = typeof SHADER_CONFIGS[keyof typeof SHADER_CONFIGS];
