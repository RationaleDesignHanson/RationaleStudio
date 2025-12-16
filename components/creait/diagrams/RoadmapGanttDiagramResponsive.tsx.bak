'use client';

import { useIsMobile } from '@/hooks/useMediaQuery';
import dynamic from 'next/dynamic';

// Dynamic imports for code splitting
const DesktopDiagram = dynamic(() => import('./RoadmapGanttDiagram'), {
  ssr: false,
  loading: () => <DiagramSkeleton />,
});

const MobileDiagram = dynamic(() => import('./RoadmapGanttDiagramMobile'), {
  ssr: false,
  loading: () => <DiagramSkeleton />,
});

function DiagramSkeleton() {
  return (
    <div className="flex items-center justify-center min-h-[400px] bg-gray-900/50 rounded-lg">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-terminal-gold mb-4"></div>
        <p className="text-gray-400 text-sm">Loading diagram...</p>
      </div>
    </div>
  );
}

/**
 * Responsive wrapper for RoadmapGanttDiagram
 * Automatically switches between desktop (canvas Gantt chart) and mobile (step-by-step wizard) versions
 */
export default function RoadmapGanttDiagramResponsive() {
  const isMobile = useIsMobile();

  return isMobile ? <MobileDiagram /> : <DesktopDiagram />;
}
