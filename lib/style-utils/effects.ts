/**
 * Style Utility Functions
 *
 * Provides reusable functions for common visual effects like glows,
 * borders, backgrounds, and shadows.
 *
 * Usage:
 *   import { textGlow, cardGlow, borderGlow } from '@/lib/style-utils/effects'
 *
 *   style={textGlow(color)}
 */

import { withOpacity } from '@/lib/design-tokens/colors';

/**
 * Text glow effect with multi-layered shadow
 * Used for glowing text like the banner title
 *
 * @param color - Base color for the glow
 * @param intensity - Glow intensity: 'subtle' | 'medium' | 'strong' (default: 'medium')
 * @returns Style object with textShadow
 *
 * @example
 * style={textGlow(COLORS.cyan[400])}
 * style={textGlow(currentColor, 'strong')}
 */
export function textGlow(
  color: string,
  intensity: 'subtle' | 'medium' | 'strong' = 'medium'
): React.CSSProperties {
  const intensityMap = {
    subtle: `0 0 10px ${color}, 0 0 20px ${withOpacity(color, 60)}, 0 0 30px ${withOpacity(color, 30)}`,
    medium: `0 0 20px ${color}, 0 0 40px ${withOpacity(color, 80)}, 0 0 60px ${withOpacity(color, 40)}`,
    strong: `0 0 30px ${color}, 0 0 60px ${withOpacity(color, 90)}, 0 0 90px ${withOpacity(color, 50)}, 0 0 120px ${withOpacity(color, 30)}`,
  };

  return {
    textShadow: intensityMap[intensity],
  };
}

/**
 * Card/box glow effect
 * Used for glowing borders and cards
 *
 * @param color - Base color for the glow
 * @param intensity - Glow intensity: 'subtle' | 'medium' | 'strong' (default: 'medium')
 * @returns Style object with boxShadow
 *
 * @example
 * style={cardGlow(COLORS.cyan[400])}
 * style={cardGlow(SECTION_COLORS[sectionIndex], 'strong')}
 */
export function cardGlow(
  color: string,
  intensity: 'subtle' | 'medium' | 'strong' = 'medium'
): React.CSSProperties {
  const intensityMap = {
    subtle: `0 0 8px ${withOpacity(color, 20)}`,
    medium: `0 0 12px ${withOpacity(color, 30)}, 0 0 24px ${withOpacity(color, 10)}`,
    strong: `0 0 20px ${withOpacity(color, 40)}, 0 0 40px ${withOpacity(color, 20)}, 0 0 60px ${withOpacity(color, 10)}`,
  };

  return {
    boxShadow: intensityMap[intensity],
  };
}

/**
 * Border glow effect
 * Used for glowing borders on navigation, cards, etc.
 *
 * @param color - Base color for the border
 * @param opacity - Border opacity (0-100, default: 40)
 * @returns Style object with borderColor
 *
 * @example
 * style={borderGlow(COLORS.cyan[400])}
 * style={borderGlow(currentColor, 30)}
 */
export function borderGlow(
  color: string,
  opacity: number = 40
): React.CSSProperties {
  return {
    borderColor: withOpacity(color, opacity),
  };
}

/**
 * Combined border and glow effect
 * Used for cards/containers with both border and shadow
 *
 * @param color - Base color for border and glow
 * @param borderOpacity - Border opacity (0-100, default: 40)
 * @param glowIntensity - Glow intensity: 'subtle' | 'medium' | 'strong' (default: 'medium')
 * @returns Style object with borderColor and boxShadow
 *
 * @example
 * style={borderWithGlow(COLORS.cyan[400])}
 * style={borderWithGlow(currentColor, 30, 'strong')}
 */
export function borderWithGlow(
  color: string,
  borderOpacity: number = 40,
  glowIntensity: 'subtle' | 'medium' | 'strong' = 'medium'
): React.CSSProperties {
  return {
    ...borderGlow(color, borderOpacity),
    ...cardGlow(color, glowIntensity),
  };
}

/**
 * Radial gradient background glow
 * Used for subtle background glows behind sections
 *
 * @param color - Base color for the glow
 * @param opacity - Glow opacity at center (0-100, default: 30)
 * @param position - Glow position (default: 'center')
 * @returns Style object with background gradient
 *
 * @example
 * style={radialGlow(COLORS.cyan[400])}
 * style={radialGlow(currentColor, 20, '50% 0%')}
 */
export function radialGlow(
  color: string,
  opacity: number = 30,
  position: string = 'center'
): React.CSSProperties {
  return {
    background: `radial-gradient(ellipse at ${position}, ${withOpacity(color, opacity)} 0%, transparent 70%)`,
  };
}

/**
 * Linear gradient background
 * Used for gradient backgrounds on cards, sections, etc.
 *
 * @param colorFrom - Starting color
 * @param colorTo - Ending color
 * @param direction - Gradient direction (default: 'to bottom right')
 * @param opacityFrom - Starting opacity (0-100, default: 10)
 * @param opacityTo - Ending opacity (0-100, default: 5)
 * @returns Style object with background gradient
 *
 * @example
 * style={linearGradient(COLORS.cyan[400], COLORS.purple[500])}
 * style={linearGradient(COLORS.blue[500], COLORS.black, 'to right', 20, 0)}
 */
export function linearGradient(
  colorFrom: string,
  colorTo: string,
  direction: string = 'to bottom right',
  opacityFrom: number = 10,
  opacityTo: number = 5
): React.CSSProperties {
  return {
    background: `linear-gradient(${direction}, ${withOpacity(colorFrom, opacityFrom)}, ${withOpacity(colorTo, opacityTo)})`,
  };
}

/**
 * Scanline background pattern
 * Used for terminal/tech aesthetic
 *
 * @param color - Color of the scanlines
 * @param opacity - Scanline opacity (0-100, default: 25)
 * @returns Style object with repeating linear gradient
 *
 * @example
 * style={scanlinePattern(COLORS.cyan[400])}
 * style={scanlinePattern(currentColor, 50)}
 */
export function scanlinePattern(
  color: string,
  opacity: number = 25
): React.CSSProperties {
  const colorWithOpacity = withOpacity(color, opacity);
  return {
    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, ${colorWithOpacity} 1px, ${colorWithOpacity} 2px)`,
  };
}

/**
 * Progress bar glow effect
 * Used for progress bars with trailing glow
 *
 * @param color - Base color for the progress bar
 * @param width - Width percentage (0-100)
 * @returns Style object with width, backgroundColor, and boxShadow
 *
 * @example
 * style={progressGlow(COLORS.cyan[400], 75)}
 * style={progressGlow(currentColor, progressPercent)}
 */
export function progressGlow(
  color: string,
  width: number
): React.CSSProperties {
  return {
    width: `${width}%`,
    backgroundColor: color,
    boxShadow: `0 0 8px ${withOpacity(color, 40)}`,
  };
}

/**
 * Pagination dot style
 * Used for section navigation dots
 *
 * @param color - Dot color
 * @param isActive - Whether dot is active
 * @returns Style object for pagination dot
 *
 * @example
 * style={paginationDot(COLORS.cyan[400], true)}
 * style={paginationDot(currentColor, index === activeSection)}
 */
export function paginationDot(
  color: string,
  isActive: boolean
): React.CSSProperties {
  if (isActive) {
    return {
      backgroundColor: color,
      boxShadow: `0 0 8px ${color}`,
    };
  }
  return {
    backgroundColor: withOpacity('#ffffff', 30),
  };
}

/**
 * Backdrop blur with border
 * Used for navigation bars, modals, etc.
 *
 * @param color - Border color
 * @param borderOpacity - Border opacity (0-100, default: 40)
 * @param bgOpacity - Background opacity (0-100, default: 80)
 * @returns Style object with background, border, and backdrop
 *
 * @example
 * style={backdropBlur(COLORS.cyan[400])}
 * style={backdropBlur(currentColor, 30, 60)}
 */
export function backdropBlur(
  color: string,
  borderOpacity: number = 40,
  bgOpacity: number = 80
): React.CSSProperties {
  return {
    borderColor: withOpacity(color, borderOpacity),
    backgroundColor: withOpacity('#000000', bgOpacity),
    backdropFilter: 'blur(8px)',
  };
}

/**
 * Divider line with gradient
 * Used for section dividers
 *
 * @param color - Divider color
 * @param direction - Gradient direction: 'horizontal' | 'vertical' (default: 'horizontal')
 * @param opacityCenter - Opacity at center (0-100, default: 50)
 * @returns Style object with background gradient
 *
 * @example
 * style={dividerGradient(COLORS.cyan[400])}
 * style={dividerGradient(currentColor, 'vertical', 70)}
 */
export function dividerGradient(
  color: string,
  direction: 'horizontal' | 'vertical' = 'horizontal',
  opacityCenter: number = 50
): React.CSSProperties {
  const gradientDirection = direction === 'horizontal' ? 'to right' : 'to bottom';
  return {
    background: `linear-gradient(${gradientDirection}, transparent, ${withOpacity(color, opacityCenter)}, transparent)`,
  };
}

/**
 * Hover glow effect (for interactive elements)
 * Returns an object with base and hover styles
 *
 * @param color - Glow color
 * @returns Object with base and hover style properties
 *
 * @example
 * const styles = hoverGlow(COLORS.cyan[400])
 * <button style={styles.base} onMouseEnter={e => Object.assign(e.currentTarget.style, styles.hover)}>
 */
export function hoverGlow(color: string): {
  base: React.CSSProperties;
  hover: React.CSSProperties;
} {
  return {
    base: {
      transition: 'all 0.2s ease',
      borderColor: withOpacity(color, 30),
    },
    hover: {
      borderColor: withOpacity(color, 50),
      boxShadow: `0 0 12px ${withOpacity(color, 30)}`,
    },
  };
}

/**
 * Background color with opacity
 * Used for semi-transparent backgrounds
 *
 * @param color - Base color
 * @param opacity - Opacity (0-100, default: 15)
 * @returns Style object with backgroundColor
 *
 * @example
 * style={bgWithOpacity(COLORS.cyan[400])}
 * style={bgWithOpacity(currentColor, 20)}
 */
export function bgWithOpacity(
  color: string,
  opacity: number = 15
): React.CSSProperties {
  return {
    backgroundColor: withOpacity(color, opacity),
  };
}

/**
 * Solid color linear gradient
 * Used for progress bars, dividers, etc. with full opacity colors
 *
 * @param colorFrom - Starting color
 * @param colorTo - Ending color
 * @param direction - CSS gradient direction (default: '90deg')
 * @returns Style object with background gradient
 *
 * @example
 * style={solidGradient(AF_COLORS.primary, AF_COLORS.secondary)}
 * style={solidGradient(color1, color2, 'to right')}
 */
export function solidGradient(
  colorFrom: string,
  colorTo: string,
  direction: string = '90deg'
): React.CSSProperties {
  return {
    background: `linear-gradient(${direction}, ${colorFrom}, ${colorTo})`,
  };
}
