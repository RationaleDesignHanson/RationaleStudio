'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const TraditionalVsRationaleDiagram = dynamic(() => import('./TraditionalVsRationaleDiagram'), {
  ssr: false,
  loading: () => <DiagramSkeleton />
});

const TraditionalVsRationaleDiagramMobile = dynamic(() => import('./TraditionalVsRationaleDiagramMobile'), {
  ssr: false,
  loading: () => <DiagramSkeleton />
});

function DiagramSkeleton() {
  return (
    <div className="w-full h-64 bg-gray-900/50 border border-gray-700 rounded-lg flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-terminal-gold border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-400">Loading comparison...</p>
      </div>
    </div>
  );
}

export default function TraditionalVsRationaleDiagramResponsive() {
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

  return isMobile ? <TraditionalVsRationaleDiagramMobile /> : <TraditionalVsRationaleDiagram />;
}
