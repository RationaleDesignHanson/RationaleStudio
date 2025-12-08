/**
 * Canvas Spacing System for CREaiT Diagrams
 *
 * 8px baseline grid system for consistent spacing across all canvas diagrams.
 * Aligned with McKinsey/BCG presentation standards for professional deck aesthetics.
 *
 * GRID: All spacing should be multiples of 8px
 * RATIONALE: 8px grid ensures visual rhythm and scalability across screen sizes
 */

export const CANVAS_SPACING = {
  // Micro spacing (gaps, gutters)
  micro: {
    xxs: 4,   // Minimal gap (half grid unit)
    xs: 8,    // Tiny gap between related elements
    sm: 12,   // Small gap (use sparingly, prefer 8 or 16)
    md: 16,   // Standard gap between elements
    lg: 24,   // Medium gap between groups
    xl: 32,   // Large gap between major sections
  },

  // Padding (internal spacing)
  padding: {
    xs: 8,    // Minimal internal padding
    sm: 16,   // Small internal padding (cards, badges)
    md: 24,   // Medium internal padding
    lg: 32,   // Large internal padding
    xl: 40,   // Extra large internal padding
    xxl: 48,  // Spacious internal padding
  },

  // Margin (external spacing, canvas edges)
  margin: {
    xs: 16,   // Minimal canvas margin
    sm: 24,   // Small canvas margin
    md: 32,   // Medium canvas margin
    lg: 40,   // Standard canvas margin (compact)
    xl: 48,   // Large canvas margin
    xxl: 56,  // Extra large canvas margin
    xxxl: 64, // Maximum canvas margin (spacious)
    canvas: 80, // Standard canvas edge padding (10 grid units)
  },

  // Node/Element sizes (circular nodes, badges)
  node: {
    xs: 16,   // Tiny node/badge
    sm: 24,   // Small node/badge
    md: 32,   // Medium node (standard)
    lg: 40,   // Large node
    xl: 48,   // Extra large node
    xxl: 56,  // Very large node
  },

  // Line widths
  line: {
    hairline: 1,  // Minimal line
    thin: 2,      // Standard line
    medium: 3,    // Medium emphasis
    thick: 4,     // High emphasis
    bold: 6,      // Very bold line
  },

  // Border radius
  radius: {
    none: 0,
    sm: 4,    // Subtle rounding
    md: 6,    // Medium rounding
    lg: 8,    // Standard rounding
    xl: 12,   // Large rounding
    xxl: 16,  // Very rounded
    full: 9999, // Fully circular
  },

  // Common card/box dimensions
  card: {
    minWidth: 120,   // Minimum card width
    standardWidth: 160, // Standard card width
    wideWidth: 200,  // Wide card width
    minHeight: 48,   // Minimum card height
    standardHeight: 64, // Standard card height
    tallHeight: 80,  // Tall card height
  },

  // Gap between items in lists/grids
  gap: {
    tight: 8,    // Tight spacing
    normal: 16,  // Normal spacing
    relaxed: 24, // Relaxed spacing
    loose: 32,   // Loose spacing
  },
} as const;

/**
 * Helper: Round to nearest grid value
 */
export function toGrid(value: number, gridSize: number = 8): number {
  return Math.round(value / gridSize) * gridSize;
}

/**
 * Helper: Check if value is on grid
 */
export function isOnGrid(value: number, gridSize: number = 8): boolean {
  return value % gridSize === 0;
}

/**
 * Common spacing presets for diagram types
 */
export const DIAGRAM_SPACING = {
  // Standard diagram (like pie charts, simple flows)
  standard: {
    padding: CANVAS_SPACING.margin.canvas,
    gap: CANVAS_SPACING.gap.normal,
    nodeSize: CANVAS_SPACING.node.md,
  },

  // Timeline/Gantt diagram
  timeline: {
    padding: CANVAS_SPACING.margin.xl,
    rowHeight: 80, // 10 grid units
    columnWidth: 64, // 8 grid units
    gap: CANVAS_SPACING.gap.normal,
  },

  // Flow diagram (multi-step process)
  flow: {
    padding: CANVAS_SPACING.margin.xxxl,
    nodeGap: CANVAS_SPACING.gap.loose,
    nodeSize: CANVAS_SPACING.node.lg,
  },

  // Map/spatial diagram
  map: {
    padding: CANVAS_SPACING.margin.canvas,
    pinSize: CANVAS_SPACING.node.sm,
    gap: CANVAS_SPACING.gap.normal,
  },

  // Chart/graph
  chart: {
    padding: CANVAS_SPACING.margin.canvas,
    barGap: CANVAS_SPACING.gap.tight,
    labelOffset: CANVAS_SPACING.padding.md,
  },
} as const;
