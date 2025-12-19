'use client';

import { useIsMobile, useIsTablet, useIsDesktop } from './useMediaQuery';

export type LayoutMode = 'mobile' | 'tablet' | 'desktop';

export interface ResponsiveLayoutResult {
  layout: LayoutMode;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

/**
 * Hook for detecting responsive layout breakpoints
 * Returns the current layout mode and boolean helpers
 *
 * Breakpoints:
 * - Mobile: < 768px
 * - Tablet: 768px - 1024px
 * - Desktop: > 1024px
 *
 * @example
 * const { layout, isMobile, isDesktop } = useResponsiveLayout();
 * if (layout === 'mobile') return <MobileView />;
 * if (layout === 'tablet') return <TabletView />;
 * return <DesktopView />;
 */
export function useResponsiveLayout(): ResponsiveLayoutResult {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();

  // Determine layout mode (priority: mobile > tablet > desktop)
  let layout: LayoutMode = 'desktop';
  if (isMobile) {
    layout = 'mobile';
  } else if (isTablet) {
    layout = 'tablet';
  }

  return {
    layout,
    isMobile,
    isTablet,
    isDesktop,
  };
}
