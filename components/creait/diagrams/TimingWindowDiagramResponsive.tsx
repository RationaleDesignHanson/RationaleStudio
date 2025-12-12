'use client';

import { useIsMobile } from '@/hooks/useMediaQuery';
import dynamic from 'next/dynamic';
import DiagramSkeleton from '@/components/diagrams/DiagramSkeleton';

// Dynamically import diagrams to avoid SSR issues
const TimingWindowDiagram = dynamic(() => import('./TimingWindowDiagram'), {
  loading: () => <DiagramSkeleton />,
  ssr: false,
});

const TimingWindowDiagramMobile = dynamic(() => import('./TimingWindowDiagramMobile'), {
  loading: () => <DiagramSkeleton />,
  ssr: false,
});

/**
 * TimingWindowDiagramResponsive - Responsive wrapper for timing window visualization
 *
 * - Desktop: Canvas-based timeline with animated property cards
 * - Mobile: Swipeable property cards with detailed outcomes
 *
 * Switches at 768px breakpoint using useIsMobile() hook
 */
export default function TimingWindowDiagramResponsive() {
  const isMobile = useIsMobile();

  return isMobile ? <TimingWindowDiagramMobile /> : <TimingWindowDiagram />;
}
