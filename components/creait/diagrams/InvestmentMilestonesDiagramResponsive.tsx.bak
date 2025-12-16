'use client';

import { useIsMobile } from '@/hooks/useMediaQuery';
import dynamic from 'next/dynamic';
import DiagramSkeleton from '@/components/diagrams/DiagramSkeleton';

// Dynamically import diagrams to avoid SSR issues
const InvestmentMilestonesDiagram = dynamic(() => import('./InvestmentMilestonesDiagram'), {
  loading: () => <DiagramSkeleton />,
  ssr: false,
});

const InvestmentMilestonesDiagramMobile = dynamic(() => import('./InvestmentMilestonesDiagramMobile'), {
  loading: () => <DiagramSkeleton />,
  ssr: false,
});

/**
 * InvestmentMilestonesDiagramResponsive - Responsive wrapper for funding roadmap
 *
 * - Desktop: Canvas-based timeline with animated funding stages
 * - Mobile: Step-by-step wizard showing each stage's details
 *
 * Switches at 768px breakpoint using useIsMobile() hook
 */
export default function InvestmentMilestonesDiagramResponsive() {
  const isMobile = useIsMobile();

  return isMobile ? <InvestmentMilestonesDiagramMobile /> : <InvestmentMilestonesDiagram />;
}
