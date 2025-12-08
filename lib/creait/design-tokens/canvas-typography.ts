/**
 * Canvas Typography System for CREaiT Diagrams
 *
 * Standardized typography tokens for canvas-based diagram rendering.
 * Aligned with CRE design system and McKinsey/BCG presentation standards.
 *
 * MINIMUM READABLE SIZE: 12px (for pitch deck viewing at 6-8 feet)
 * WCAG AA COMPLIANT: All text meets contrast ratio requirements
 */

export const CANVAS_TYPOGRAPHY = {
  // Font families (matches design system)
  fonts: {
    display: '"Libre Franklin", Inter, sans-serif',
    body: 'Inter, sans-serif',
    data: '"IBM Plex Mono", monospace',
  },

  // Font sizes (pitch deck optimized)
  sizes: {
    // Display sizes (diagram titles, hero metrics)
    displayLg: 48,      // Hero metrics (LTV, Ratios, ARR totals)
    displayMd: 40,      // Large data displays
    displaySm: 32,      // Prominent numbers

    // Heading sizes (section labels, primary text)
    headingLg: 24,      // Diagram titles
    headingMd: 20,      // Section headings
    headingSm: 18,      // Category labels

    // Body sizes (standard text)
    bodyLg: 16,         // Primary labels
    bodyMd: 14,         // Secondary labels
    bodySm: 13,         // Tertiary labels (minimum)

    // Data sizes (numbers, metrics)
    dataLg: 32,         // Large metrics (ARR values)
    dataMd: 24,         // Medium metrics (scores)
    dataSm: 18,         // Small metrics (counts)

    // Legacy minimum (deprecated - DO NOT USE)
    _deprecated_12px: 12,  // Only for extremely space-constrained contexts
  },

  // Font weights
  weights: {
    normal: 'normal',
    bold: 'bold',
  },

  // Opacity levels (WCAG AA compliant)
  opacity: {
    primary: 1.0,       // Primary text (always 100%)
    secondary: 0.9,     // Secondary text
    tertiary: 0.8,      // Tertiary text (minimum for body text)
    muted: 0.65,        // Muted text (13px+ only)
    disabled: 0.5,      // Disabled state (large text only, 18px+)
  },
} as const;

/**
 * Font preset builder for canvas context
 *
 * Usage:
 *   ctx.font = getCanvasFont('title');
 *   ctx.font = getCanvasFont('dataLarge');
 */
export function getCanvasFont(
  type: 'title' | 'heading' | 'label' | 'body' | 'caption' | 'dataLarge' | 'dataMedium' | 'dataSmall',
  weight: 'normal' | 'bold' = 'normal'
): string {
  const fontMap = {
    // Titles (Libre Franklin for brand personality)
    title: `${weight === 'bold' ? 'bold' : 'normal'} ${CANVAS_TYPOGRAPHY.sizes.headingLg}px ${CANVAS_TYPOGRAPHY.fonts.display}`,

    // Headings (Inter for clarity)
    heading: `${weight === 'bold' ? 'bold' : 'normal'} ${CANVAS_TYPOGRAPHY.sizes.headingSm}px ${CANVAS_TYPOGRAPHY.fonts.body}`,

    // Labels (primary text)
    label: `${weight === 'bold' ? 'bold' : 'normal'} ${CANVAS_TYPOGRAPHY.sizes.bodyLg}px ${CANVAS_TYPOGRAPHY.fonts.body}`,

    // Body text (secondary)
    body: `${weight === 'bold' ? 'bold' : 'normal'} ${CANVAS_TYPOGRAPHY.sizes.bodyMd}px ${CANVAS_TYPOGRAPHY.fonts.body}`,

    // Captions (tertiary - minimum readable)
    caption: `${weight === 'bold' ? 'bold' : 'normal'} ${CANVAS_TYPOGRAPHY.sizes.bodySm}px ${CANVAS_TYPOGRAPHY.fonts.body}`,

    // Data displays (IBM Plex Mono for financial clarity)
    dataLarge: `bold ${CANVAS_TYPOGRAPHY.sizes.dataLg}px ${CANVAS_TYPOGRAPHY.fonts.data}`,
    dataMedium: `bold ${CANVAS_TYPOGRAPHY.sizes.dataMd}px ${CANVAS_TYPOGRAPHY.fonts.data}`,
    dataSmall: `bold ${CANVAS_TYPOGRAPHY.sizes.dataSm}px ${CANVAS_TYPOGRAPHY.fonts.data}`,
  };

  return fontMap[type];
}

/**
 * Apply text with opacity
 *
 * Usage:
 *   setTextStyle(ctx, 'rgba(255, 255, 255, 1)', 'primary');
 */
export function setTextStyle(
  ctx: CanvasRenderingContext2D,
  baseColor: string,
  opacityLevel: keyof typeof CANVAS_TYPOGRAPHY.opacity
): void {
  const opacity = CANVAS_TYPOGRAPHY.opacity[opacityLevel];

  // Extract RGB from various formats and apply opacity
  if (baseColor.startsWith('rgba')) {
    // Replace existing alpha with new opacity
    ctx.fillStyle = baseColor.replace(/[\d.]+\)$/, `${opacity})`);
  } else if (baseColor.startsWith('rgb')) {
    // Convert rgb to rgba with opacity
    ctx.fillStyle = baseColor.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
  } else if (baseColor.startsWith('#')) {
    // Convert hex to rgba with opacity
    const hex = baseColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
  } else {
    // Fallback - assume white
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
  }
}

/**
 * Quick typography presets for common diagram elements
 */
export const DIAGRAM_TEXT_STYLES = {
  // Diagram title
  diagramTitle: {
    font: getCanvasFont('title', 'bold'),
    opacity: 'primary' as const,
  },

  // Hero metrics (ARR, LTV, ratios)
  heroMetric: {
    font: `bold ${CANVAS_TYPOGRAPHY.sizes.displayLg}px ${CANVAS_TYPOGRAPHY.fonts.display}`,
    opacity: 'primary' as const,
  },

  // Large data values
  dataValue: {
    font: getCanvasFont('dataLarge'),
    opacity: 'primary' as const,
  },

  // Primary labels
  primaryLabel: {
    font: getCanvasFont('label', 'bold'),
    opacity: 'secondary' as const,
  },

  // Secondary labels
  secondaryLabel: {
    font: getCanvasFont('body'),
    opacity: 'tertiary' as const,
  },

  // Metadata / captions
  metadata: {
    font: getCanvasFont('caption'),
    opacity: 'muted' as const,
  },
} as const;
