/**
 * Diagram Design Tokens
 *
 * Centralized typography, spacing, and color system for all Athletes First diagrams.
 * Based on Terminal Republic aesthetic with WCAG AA accessibility compliance.
 *
 * USAGE:
 * import { TYPE, SPACING, COLORS } from '@/lib/athletes-first/diagram-tokens';
 * ctx.font = `${TYPE.body.weight} ${TYPE.body.size} ${TYPE.body.family}`;
 */

// ============================================================================
// TYPOGRAPHY SCALE (7 levels - down from 21)
// ============================================================================

export const TYPE = {
  /**
   * Hero size - Large metrics and hero numbers
   * Use for: Primary KPIs, main statistics, "wow" numbers
   * Example: "$500K" revenue, "65%" close rate
   */
  hero: {
    size: '48px',
    sizeNum: 48,
    weight: 'bold',
    family: 'monospace',
    lineHeight: 1.1,
  },

  /**
   * H1 size - Main diagram titles
   * Use for: Diagram headers, section titles
   * Example: "REAL-TIME CONTRACT COMPARISON"
   */
  h1: {
    size: '32px',
    sizeNum: 32,
    weight: 'bold',
    family: 'monospace',
    lineHeight: 1.2,
  },

  /**
   * H2 size - Section headings and subheadings
   * Use for: Module names, step headers, subsection titles
   * Example: "Step 1: Upload", "NIL Guidance Platform"
   */
  h2: {
    size: '20px',
    sizeNum: 20,
    weight: 'bold',
    family: 'monospace',
    lineHeight: 1.3,
  },

  /**
   * Body size - Primary labels and content
   * Use for: Main text labels, descriptions, card content
   * Example: Most text in diagrams should use this size
   * NOTE: Uses 600 weight for better canvas rendering, especially on mobile
   */
  body: {
    size: '14px',
    sizeNum: 14,
    weight: '600',
    family: 'monospace',
    lineHeight: 1.4,
  },

  /**
   * Caption size - Secondary labels
   * Use for: Metadata, timestamps, sublabels
   * Example: "Updated 2m ago", axis labels
   * NOTE: Uses 600 weight for better canvas rendering, especially on mobile
   */
  caption: {
    size: '12px',
    sizeNum: 12,
    weight: '600',
    family: 'monospace',
    lineHeight: 1.5,
  },

  /**
   * Micro size - Minimum accessible size (WCAG AA compliant)
   * Use for: Tertiary info, legal text, very minor labels
   * Example: Footnotes, disclaimers
   * WARNING: Do not go below this size - accessibility failure
   * NOTE: Uses 600 weight for better canvas rendering, especially on mobile
   */
  micro: {
    size: '11px',
    sizeNum: 11,
    weight: '600',
    family: 'monospace',
    lineHeight: 1.5,
  },
} as const;

// Convenience function for canvas font strings
export function getFont(
  type: keyof typeof TYPE,
  weight?: 'normal' | 'bold' | '600'
): string {
  const t = TYPE[type];
  const w = weight || t.weight;
  return `${w} ${t.size} ${t.family}`;
}

// ============================================================================
// SPACING SCALE (8px grid system)
// ============================================================================

export const SPACING = {
  /** 4px - Tightest spacing */
  xs: 4,
  /** 8px - Compact spacing */
  sm: 8,
  /** 12px - Comfortable spacing */
  md: 12,
  /** 16px - Standard spacing (base unit) */
  base: 16,
  /** 24px - Generous spacing */
  lg: 24,
  /** 32px - Section spacing */
  xl: 32,
  /** 48px - Major section breaks */
  xxl: 48,
  /** 64px - Page-level spacing */
  xxxl: 64,
  mobile: {
    xs: 3,
    sm: 6,
    md: 10,
    base: 14,
    lg: 18,
    xl: 24,
    xxl: 36,
    xxxl: 48,
  },
  mobileContext: {
    touchTarget: 44,
    cardGap: 12,
    sectionGap: 24,
    edgePadding: 16,
    inlineGap: 8,
    textGap: 6,
  },
} as const;

export const BREAKPOINTS = {
  mobile: { xs: 320, sm: 375, md: 390, lg: 430 },
  tablet: { sm: 768, md: 820, lg: 1024 },
  desktop: { sm: 1280, md: 1440, lg: 1920, xl: 2560 },
} as const;

export type DeviceCategory = 'mobile' | 'tablet' | 'desktop';
export type DeviceSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// ============================================================================
// COLOR PALETTE (WCAG AA verified)
// ============================================================================

export const COLORS = {
  // Brand Identity Colors
  brand: {
    /** Primary Blue - #0066FF */
    primaryBlue: '#0066FF',
    /** Cyan - #00D9FF */
    cyan: '#00D9FF',
    /** Green - #00FF94 */
    green: '#00FF94',
    /** Orange - #FF6B00 */
    orange: '#FF6B00',
    /** Purple - #9D4EDD */
    purple: '#9D4EDD',
    /** Terminal Gold - #FFD700 */
    terminalGold: '#FFD700',
    /** Pink/Red - #FF3366 */
    pink: '#FF3366',
  },

  // Semantic Colors
  semantic: {
    /** Success state - Green */
    success: '#00FF94',
    /** Warning state - Orange */
    warning: '#FF6B00',
    /** Error state - Red */
    error: '#EF4444',
    /** Info state - Cyan */
    info: '#00D9FF',
  },

  // Monochrome Palette
  mono: {
    /** Pure black background */
    black: '#000000',
    /** Pure white text */
    white: '#FFFFFF',
    /** Gray text - primary (80% opacity) - WCAG AA: 13.6:1 */
    gray80: 'rgba(255, 255, 255, 0.8)',
    /** Gray text - secondary (70% opacity) - Better mobile rendering - WCAG AA: 11.9:1 */
    gray70: 'rgba(255, 255, 255, 0.7)',
    /** Gray text - tertiary (60% opacity) - WCAG AA: 10.2:1 */
    gray60: 'rgba(255, 255, 255, 0.6)',
    /** Gray text - quaternary (40% opacity) - Use sparingly */
    gray40: 'rgba(255, 255, 255, 0.4)',
    /** Gray text - disabled (30% opacity) - Decorative only */
    gray30: 'rgba(255, 255, 255, 0.3)',
  },

  // Color with Opacity (for backgrounds/highlights)
  alpha: {
    /** Gold at 30% - Highlighted backgrounds */
    gold30: 'rgba(255, 215, 0, 0.3)',
    /** Gold at 20% - Subtle highlights */
    gold20: 'rgba(255, 215, 0, 0.2)',
    /** Gold at 10% - Very subtle tints */
    gold10: 'rgba(255, 215, 0, 0.1)',

    /** Cyan at 30% */
    cyan30: 'rgba(0, 217, 255, 0.3)',
    /** Cyan at 20% */
    cyan20: 'rgba(0, 217, 255, 0.2)',
    /** Cyan at 10% */
    cyan10: 'rgba(0, 217, 255, 0.1)',

    /** Green at 30% */
    green30: 'rgba(0, 255, 148, 0.3)',
    /** Green at 20% */
    green20: 'rgba(0, 255, 148, 0.2)',
    /** Green at 10% */
    green10: 'rgba(0, 255, 148, 0.1)',

    /** Orange at 30% */
    orange30: 'rgba(255, 107, 0, 0.3)',
    /** Orange at 20% */
    orange20: 'rgba(255, 107, 0, 0.2)',
    /** Orange at 10% */
    orange10: 'rgba(255, 107, 0, 0.1)',

    /** Purple at 30% */
    purple30: 'rgba(157, 78, 221, 0.3)',
    /** Purple at 20% */
    purple20: 'rgba(157, 78, 221, 0.2)',
    /** Purple at 10% */
    purple10: 'rgba(157, 78, 221, 0.1)',

    /** Red at 30% */
    red30: 'rgba(239, 68, 68, 0.3)',
    /** Red at 20% */
    red20: 'rgba(239, 68, 68, 0.2)',
    /** Red at 10% */
    red10: 'rgba(239, 68, 68, 0.1)',
  },
} as const;

// ============================================================================
// SHADOWS & EFFECTS
// ============================================================================

export const EFFECTS = {
  // Glow effects for terminal aesthetic
  glow: {
    gold: {
      color: COLORS.brand.terminalGold,
      blur: 15,
    },
    cyan: {
      color: COLORS.brand.cyan,
      blur: 15,
    },
    green: {
      color: COLORS.brand.green,
      blur: 15,
    },
  },

  // Scanline overlay (for canvas overlays)
  scanline: {
    image: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 215, 0, 0.1) 2px, rgba(255, 215, 0, 0.1) 4px)',
    opacity: 0.05,
  },
} as const;

// ============================================================================
// CANVAS HELPERS
// ============================================================================

/**
 * Apply glow effect to canvas context
 */
export function applyGlow(
  ctx: CanvasRenderingContext2D,
  color: string,
  blur: number = 15
) {
  ctx.shadowColor = color;
  ctx.shadowBlur = blur;
}

/**
 * Clear glow effect from canvas context
 */
export function clearGlow(ctx: CanvasRenderingContext2D) {
  ctx.shadowBlur = 0;
  ctx.shadowColor = 'transparent';
}

/**
 * Set text style on canvas context using tokens
 */
export function setTextStyle(
  ctx: CanvasRenderingContext2D,
  type: keyof typeof TYPE,
  color: string,
  align: CanvasTextAlign = 'left',
  baseline: CanvasTextBaseline = 'top'
) {
  ctx.font = getFont(type);
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
}

// ============================================================================
// MIGRATION GUIDE
// ============================================================================

/**
 * OLD → NEW FONT SIZE MAPPING
 *
 * Use this guide when refactoring existing diagrams:
 *
 * 48px → TYPE.hero      (no change)
 * 36px → TYPE.hero      (consolidate up)
 * 32px → TYPE.h1        (no change)
 * 28px → TYPE.h1        (consolidate down)
 * 24px → TYPE.h2        (consolidate up)
 * 20px → TYPE.h2        (no change)
 * 18px → TYPE.h2        (consolidate down)
 * 16px → TYPE.body      (consolidate up)
 * 14px → TYPE.body      (no change)
 * 12px → TYPE.caption   (no change)
 * 11px → TYPE.micro     (no change)
 * 10px → TYPE.micro     (upgrade for accessibility)
 * 9px  → TYPE.micro     (upgrade for accessibility - REQUIRED)
 * 8px  → TYPE.micro     (upgrade for accessibility - REQUIRED)
 *
 * IMPORTANT: All 8px, 9px, 10px text MUST be upgraded to 11px minimum
 */

// ============================================================================
// RESPONSIVE CANVAS UTILITIES
// ============================================================================

/**
 * Responsive canvas sizing with mobile optimization
 * Automatically scales canvas based on container size and device pixel ratio
 *
 * @param canvas - The canvas element
 * @param ctx - The canvas 2D context
 * @param container - The parent container element
 * @returns Object with width, height, device info, and scale
 */
export function setupResponsiveCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  container: HTMLElement
): { width: number; height: number; deviceCategory: DeviceCategory; deviceSize: DeviceSize; isMobile: boolean; isTablet: boolean; isLandscape: boolean; shouldUseMobileLayout: boolean; scale: number; dpr: number } {
  const rect = container.getBoundingClientRect();
  const width = rect.width || 1000;
  const height = rect.height || 600;

  // Detect device categories
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1280;

  // Detect landscape orientation (mobile landscape is problematic)
  const isLandscape = width > height && width < 1024;

  // Determine if mobile layout should be used
  // Use mobile layout for: true mobile portrait OR landscape with constrained height
  const shouldUseMobileLayout = (isMobile && !isLandscape) || (isLandscape && height < 500);

  // Determine device category
  const deviceCategory: DeviceCategory =
    width < 768 ? 'mobile' :
    width < 1280 ? 'tablet' :
    'desktop';

  // Determine device size
  let deviceSize: DeviceSize;
  if (deviceCategory === 'mobile') {
    if (width < BREAKPOINTS.mobile.sm) deviceSize = 'xs';
    else if (width < BREAKPOINTS.mobile.md) deviceSize = 'sm';
    else if (width < BREAKPOINTS.mobile.lg) deviceSize = 'md';
    else deviceSize = 'lg';
  } else if (deviceCategory === 'tablet') {
    if (width < BREAKPOINTS.tablet.md) deviceSize = 'sm';
    else if (width < BREAKPOINTS.tablet.lg) deviceSize = 'md';
    else deviceSize = 'lg';
  } else {
    if (width < BREAKPOINTS.desktop.md) deviceSize = 'sm';
    else if (width < BREAKPOINTS.desktop.lg) deviceSize = 'md';
    else if (width < BREAKPOINTS.desktop.xl) deviceSize = 'lg';
    else deviceSize = 'xl';
  }

  // Use lower DPR on mobile to improve performance
  const dpr = isMobile ? Math.min(window.devicePixelRatio || 1, 2) : (window.devicePixelRatio || 1);

  // Calculate responsive scale factor - only scale down on very small mobile
  const scale = width < 390 ? Math.max(0.85, width / 430) : 1;

  // Reset transform before setting new dimensions
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  return { width, height, deviceCategory, deviceSize, isMobile, isTablet, isLandscape, shouldUseMobileLayout, scale, dpr };
}

/**
 * Get responsive font size based on viewport
 * Scales down text sizes on mobile while maintaining readability
 *
 * @param type - Typography scale type
 * @param isMobile - Whether the viewport is mobile (deprecated, use deviceCategory)
 * @param deviceCategory - Optional device category for more granular control
 * @param deviceSize - Optional device size for progressive scaling
 * @returns Scaled font size number
 */
export function getResponsiveFontSize(
  type: keyof typeof TYPE,
  isMobile: boolean,
  deviceCategory?: DeviceCategory,
  deviceSize?: DeviceSize
): number {
  const baseSize = TYPE[type].sizeNum;

  // Desktop: use full size
  if (deviceCategory === 'desktop' || (!isMobile && !deviceCategory)) {
    return baseSize;
  }

  // Tablet: slight reduction
  if (deviceCategory === 'tablet') {
    switch (type) {
      case 'hero':
        return Math.max(36, baseSize * 0.85);
      case 'h1':
        return Math.max(28, baseSize * 0.875);
      case 'h2':
        return Math.max(18, baseSize * 0.9);
      case 'body':
        return 14; // Preserve body text
      case 'caption':
      case 'micro':
        return baseSize;
      default:
        return baseSize;
    }
  }

  // Mobile: preserve body text, scale headers progressively
  switch (type) {
    case 'hero':
      // Progressive scaling based on device size
      if (deviceSize === 'xs') return 28;
      if (deviceSize === 'sm') return 32;
      if (deviceSize === 'md') return 34;
      return Math.max(32, baseSize * 0.7);
    case 'h1':
      if (deviceSize === 'xs') return 22;
      if (deviceSize === 'sm') return 24;
      if (deviceSize === 'md') return 26;
      return Math.max(24, baseSize * 0.75);
    case 'h2':
      if (deviceSize === 'xs') return 16;
      if (deviceSize === 'sm') return 17;
      if (deviceSize === 'md') return 18;
      return Math.max(16, baseSize * 0.8);
    case 'body':
      return 14; // Preserve body text at 14px on all mobile
    case 'caption':
      return Math.max(11, baseSize * 0.9);
    case 'micro':
      return baseSize; // Never scale down micro - it's already minimum
    default:
      return baseSize;
  }
}

/**
 * Get responsive spacing based on viewport
 * Now uses explicit mobile tokens instead of multiplier
 *
 * @param spacing - Spacing scale value or key
 * @param isMobile - Whether the viewport is mobile
 * @param deviceCategory - Optional device category for more control
 * @returns Scaled spacing number
 */
export function getResponsiveSpacing(
  spacing: number,
  isMobile: boolean,
  deviceCategory?: DeviceCategory
): number {
  // For numeric values, use mobile tokens when available
  if (deviceCategory === 'mobile' || isMobile) {
    // Map desktop values to closest mobile equivalents
    if (spacing <= 4) return SPACING.mobile.xs;
    if (spacing <= 8) return SPACING.mobile.sm;
    if (spacing <= 12) return SPACING.mobile.md;
    if (spacing <= 16) return SPACING.mobile.base;
    if (spacing <= 24) return SPACING.mobile.lg;
    if (spacing <= 32) return SPACING.mobile.xl;
    if (spacing <= 48) return SPACING.mobile.xxl;
    return SPACING.mobile.xxxl;
  }

  return spacing;
}

/**
 * Get mobile-specific spacing for context-aware layouts
 *
 * @param context - The spacing context (touchTarget, cardGap, etc.)
 * @returns Mobile spacing value
 */
export function getMobileSpacing(context: keyof typeof SPACING.mobileContext): number {
  return SPACING.mobileContext[context];
}

/**
 * Calculate minimum canvas height based on complexity and device
 *
 * @param complexity - Diagram complexity level
 * @param deviceCategory - Device category (mobile/tablet/desktop)
 * @param viewportHeight - Current viewport height
 * @param isLandscape - Whether in landscape orientation
 * @returns Minimum height in pixels
 */
export function getCanvasMinHeight(
  complexity: 'simple' | 'medium' | 'complex' | 'detailed',
  deviceCategory: DeviceCategory,
  viewportHeight: number,
  isLandscape: boolean = false
): number {
  // Landscape mode: constrain height more aggressively
  if (isLandscape && viewportHeight < 600) {
    return { simple: 300, medium: 350, complex: 380, detailed: 420 }[complexity];
  }

  if (deviceCategory === 'desktop') {
    return { simple: 450, medium: 550, complex: 650, detailed: 750 }[complexity];
  }
  if (deviceCategory === 'tablet') {
    return { simple: 380, medium: 470, complex: 550, detailed: 640 }[complexity];
  }
  // Mobile: use viewport-relative heights with sensible bounds
  const vhMultipliers = { simple: 0.70, medium: 0.80, complex: 0.90, detailed: 1.00 };
  const calculatedHeight = viewportHeight * vhMultipliers[complexity];
  return Math.max(400, Math.min(calculatedHeight, viewportHeight * 0.9));
}

/**
 * Adjust spacing for landscape orientation to prevent content overflow
 *
 * @param baseSpacing - The base spacing value
 * @param isLandscape - Whether in landscape orientation
 * @param viewportHeight - Current viewport height
 * @returns Adjusted spacing value
 */
export function getLandscapeSpacing(
  baseSpacing: number,
  isLandscape: boolean,
  viewportHeight: number
): number {
  if (!isLandscape || viewportHeight >= 600) {
    return baseSpacing;
  }
  // In constrained landscape, reduce vertical spacing by 30-40%
  return Math.max(4, Math.round(baseSpacing * 0.65));
}

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type TypeScale = keyof typeof TYPE;
export type SpacingScale = keyof typeof SPACING;
export type BrandColor = keyof typeof COLORS.brand;
export type MonoColor = keyof typeof COLORS.mono;
export type AlphaColor = keyof typeof COLORS.alpha;
