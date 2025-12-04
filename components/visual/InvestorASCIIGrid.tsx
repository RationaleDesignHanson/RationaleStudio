/**
 * Investor Site ASCII Grid - Conservative, Static, Maximum Trust
 *
 * This wrapper enforces investor site constraints to maintain credibility:
 * - Max opacity: 0.05 (vs 0.08-0.12 on public site)
 * - Theme: terminalDark ONLY (pure black→gray, no gold)
 * - Animation: DISABLED (seriousness over flair)
 * - Characters: compute set (mathematical/technical aesthetic)
 *
 * Usage:
 * ```tsx
 * <InvestorASCIIGrid opacity={0.04} />
 * ```
 *
 * The wrapper prevents misuse - you cannot accidentally use gold theme
 * or exceed opacity limits on the investor site.
 */

'use client';

import { ASCIIUnifiedGrid } from './ASCIIUnifiedGrid';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';

interface InvestorASCIIGridProps {
  /** Opacity value (automatically capped at 0.05 for investor credibility) */
  opacity?: number;
  /** Optional className for positioning */
  className?: string;
}

export function InvestorASCIIGrid({
  opacity = 0.04,
  className
}: InvestorASCIIGridProps) {
  // Enforce investor site constraints
  const INVESTOR_MAX_OPACITY = 0.05;
  const cappedOpacity = Math.min(opacity, INVESTOR_MAX_OPACITY);

  // Log warning if trying to exceed limit
  if (opacity > INVESTOR_MAX_OPACITY) {
    console.warn(
      `[InvestorASCIIGrid] Opacity ${opacity} exceeds investor limit. ` +
      `Capping at ${INVESTOR_MAX_OPACITY} for credibility.`
    );
  }

  return (
    <ASCIIUnifiedGrid
      opacity={cappedOpacity}
      animated={false}  // Static grids for investor seriousness
      colorTheme={watercolorThemes.terminalDark}  // Conservative only
      charSet="compute"  // Mathematical/technical characters
      className={className}
    />
  );
}
