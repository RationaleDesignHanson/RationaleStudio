/**
 * Factory function to create responsive diagram wrappers
 *
 * Replaces 28+ boilerplate responsive wrapper files with a single reusable pattern.
 * Automatically switches between desktop and mobile diagram variants based on screen size.
 *
 * @example
 * ```tsx
 * // Before (3 files):
 * // - AIScoreFlowDiagram.tsx (389 LOC)
 * // - AIScoreFlowDiagramMobile.tsx (290 LOC)
 * // - AIScoreFlowDiagramResponsive.tsx (30 LOC) ← ELIMINATED
 *
 * // After (2 files + factory):
 * export { default } from '@/components/diagrams/createResponsiveDiagram';
 * export { default as AIScoreFlowDiagramResponsive } from '@/components/diagrams/createResponsiveDiagram';
 *
 * // Or use directly in pages:
 * const AIScoreFlowDiagramResponsive = createResponsiveDiagram({
 *   name: 'AIScoreFlowDiagram',
 *   desktopPath: './AIScoreFlowDiagram',
 *   mobilePath: './AIScoreFlowDiagramMobile',
 * });
 * ```
 */

'use client';

import { useIsMobile } from '@/hooks/useMediaQuery';
import dynamic, { type DynamicOptions } from 'next/dynamic';
import type { ComponentType } from 'react';

interface ResponsiveDiagramConfig {
  /**
   * Display name for the diagram (used in loading states and debugging)
   */
  name: string;

  /**
   * Path to desktop diagram component (relative import path)
   * @example './AIScoreFlowDiagram' or '@/components/creait/diagrams/AIScoreFlowDiagram'
   */
  desktopPath: string;

  /**
   * Path to mobile diagram component (relative import path)
   * @example './AIScoreFlowDiagramMobile'
   */
  mobilePath: string;

  /**
   * Optional custom loading skeleton component
   * If not provided, uses default skeleton
   */
  LoadingSkeleton?: ComponentType;

  /**
   * Optional accent color for loading skeleton
   * @default '#4299E1' (blue)
   */
  accentColor?: string;

  /**
   * Optional custom dynamic options for Next.js dynamic imports
   */
  dynamicOptions?: Omit<DynamicOptions<any>, 'ssr' | 'loading'>;
}

/**
 * Default loading skeleton for diagrams
 */
function DefaultDiagramSkeleton({
  name = 'diagram',
  accentColor = '#4299E1'
}: {
  name?: string;
  accentColor?: string;
}) {
  return (
    <div className="flex items-center justify-center min-h-[400px] bg-gray-900/50 rounded-lg">
      <div className="text-center">
        <div
          className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 mb-4"
          style={{ borderBottomColor: accentColor }}
        ></div>
        <p className="text-gray-400 text-sm">Loading {name}...</p>
      </div>
    </div>
  );
}

/**
 * Creates a responsive diagram component that automatically switches between
 * desktop and mobile variants based on screen size.
 *
 * Features:
 * - Automatic code splitting via Next.js dynamic imports
 * - SSR disabled for canvas-based diagrams
 * - Loading states with customizable skeletons
 * - Mobile detection via useIsMobile hook
 * - Zero-bundle overhead (only loads needed variant)
 *
 * @param config - Configuration for the responsive diagram
 * @returns React component that renders desktop or mobile variant
 */
export function createResponsiveDiagram({
  name,
  desktopPath,
  mobilePath,
  LoadingSkeleton,
  accentColor = '#4299E1',
  dynamicOptions = {},
}: ResponsiveDiagramConfig): ComponentType {
  // Create loading skeleton function for Next.js dynamic()
  const loadingComponent = LoadingSkeleton
    ? () => <LoadingSkeleton />
    : () => <DefaultDiagramSkeleton name={name} accentColor={accentColor} />;

  // Dynamic import desktop variant
  const DesktopDiagram = dynamic(() => import(/* @vite-ignore */ desktopPath), {
    ssr: false,
    loading: loadingComponent,
    ...dynamicOptions,
  });

  // Dynamic import mobile variant
  const MobileDiagram = dynamic(() => import(/* @vite-ignore */ mobilePath), {
    ssr: false,
    loading: loadingComponent,
    ...dynamicOptions,
  });

  // Return responsive wrapper component
  function ResponsiveDiagram() {
    const isMobile = useIsMobile();
    return isMobile ? <MobileDiagram /> : <DesktopDiagram />;
  }

  // Set display name for debugging
  ResponsiveDiagram.displayName = `Responsive(${name})`;

  return ResponsiveDiagram;
}

/**
 * Helper function to quickly create a responsive diagram with default settings
 * Useful for simple diagrams that follow the standard naming convention
 *
 * @example
 * ```tsx
 * // Assumes ./DiagramName.tsx and ./DiagramNameMobile.tsx exist
 * export default quickResponsiveDiagram('AIScoreFlowDiagram');
 * ```
 */
export function quickResponsiveDiagram(
  baseName: string,
  basePath: string = '.',
  accentColor?: string
): ComponentType {
  return createResponsiveDiagram({
    name: baseName,
    desktopPath: `${basePath}/${baseName}`,
    mobilePath: `${basePath}/${baseName}Mobile`,
    accentColor,
  });
}

export default createResponsiveDiagram;
