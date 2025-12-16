'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const AIIntelligenceSystemDiagram = dynamic(() => import('./AIIntelligenceSystemDiagram'), {
  ssr: false,
  loading: () => <DiagramSkeleton />
});

const AIIntelligenceSystemDiagramMobile = dynamic(() => import('./AIIntelligenceSystemDiagramMobile'), {
  ssr: false,
  loading: () => <DiagramSkeleton />
});

function DiagramSkeleton() {
  return (
    <div className="w-full h-96 bg-[#1A202C] rounded-lg border-2 border-[#4299E1]/30 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-[#4299E1] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Loading AI system...
        </p>
      </div>
    </div>
  );
}

export default function AIIntelligenceSystemDiagramResponsive() {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isClient) {
    return <DiagramSkeleton />;
  }

  return isMobile ? <AIIntelligenceSystemDiagramMobile /> : <AIIntelligenceSystemDiagram />;
}
