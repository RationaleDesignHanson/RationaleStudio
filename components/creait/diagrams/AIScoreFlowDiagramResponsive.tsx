'use client';

import { useIsMobile } from '@/hooks/useMediaQuery';
import dynamic from 'next/dynamic';

const DesktopDiagram = dynamic(() => import('./AIScoreFlowDiagram'), {
  ssr: false,
  loading: () => <DiagramSkeleton />,
});

const MobileDiagram = dynamic(() => import('./AIScoreFlowDiagramMobile'), {
  ssr: false,
  loading: () => <DiagramSkeleton />,
});

function DiagramSkeleton() {
  return (
    <div className="flex items-center justify-center min-h-[400px] bg-gray-900/50 rounded-lg">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-400 text-sm">Loading diagram...</p>
      </div>
    </div>
  );
}

export default function AIScoreFlowDiagramResponsive() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileDiagram /> : <DesktopDiagram />;
}
