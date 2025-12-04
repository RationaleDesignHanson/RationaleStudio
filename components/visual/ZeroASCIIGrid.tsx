/**
 * Zero Product ASCII Grid - Brand Protection
 *
 * Zero is our flagship product and needs distinct visual identity.
 * This wrapper ensures Zero pages don't compete with Rationale's gold aesthetic.
 *
 * Constraints:
 * - Max opacity: 0.06 (subtle, never overwhelms product screenshots)
 * - Theme: darkGalaxy ONLY (pure black, protects Zero's modern app brand)
 * - Animation: ENABLED (dynamic but restrained)
 * - Characters: shapes set (circular, softer than Rationale's technical aesthetic)
 *
 * Usage:
 * ```tsx
 * <ZeroASCIIGrid opacity={0.04} />
 * ```
 *
 * Design principle: If visitors remember the grid more than Zero's interface → kill it.
 */

'use client';

import { ASCIIUnifiedGrid } from './ASCIIUnifiedGrid';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';

interface ZeroASCIIGridProps {
  /** Opacity value (automatically capped at 0.06 for Zero brand protection) */
  opacity?: number;
  /** Optional className for positioning */
  className?: string;
}

export function ZeroASCIIGrid({
  opacity = 0.04,
  className
}: ZeroASCIIGridProps) {
  // Enforce Zero brand protection constraints
  const ZERO_MAX_OPACITY = 0.06;
  const cappedOpacity = Math.min(opacity, ZERO_MAX_OPACITY);

  // Log warning if trying to exceed limit
  if (opacity > ZERO_MAX_OPACITY) {
    console.warn(
      `[ZeroASCIIGrid] Opacity ${opacity} exceeds Zero brand limit. ` +
      `Capping at ${ZERO_MAX_OPACITY} to protect product identity.`
    );
  }

  return (
    <ASCIIUnifiedGrid
      opacity={cappedOpacity}
      animated={true}  // Dynamic but subtle
      colorTheme={watercolorThemes.darkGalaxy}  // Pure black, not gold
      charSet="shapes"  // Circular shapes for modern app feel
      className={className}
    />
  );
}
