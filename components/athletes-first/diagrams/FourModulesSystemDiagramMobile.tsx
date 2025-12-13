'use client';

import { useState, useRef, useEffect } from 'react';

interface Module {
  id: string;
  title: string;
  summary: string;
  details: string[];
}

const modules: Module[] = [
  {
    id: 'nil',
    title: 'NIL Platform',
    summary: 'NCAA compliance & agency trust',
    details: [
      '95%+ compliance rate (vs. 60% industry avg)',
      'Automated NIL deal tracking and reporting',
      'NCAA rule interpretation and guidance',
      'Real-time compliance monitoring',
      'Risk assessment and alerts',
      'Agency trust verification',
    ],
  },
  {
    id: 'pitch',
    title: 'Interactive Pitch',
    summary: 'Vision Pro spatial experiences',
    details: [
      '65% close rate (vs. 25% with PDFs)',
      '3D athlete presentations in spatial computing',
      'Interactive deal scenario modeling',
      'Virtual facility and venue tours',
      'Spatial storytelling with volumetric video',
      'Multi-user collaborative viewing',
    ],
  },
  {
    id: 'twins',
    title: 'Video Twins',
    summary: 'One session → infinite assets',
    details: [
      '$150K-$500K per athlete annually',
      'Single capture session generates unlimited content',
      'AI-powered video synthesis',
      'Personalized brand content at scale',
      'Multi-platform format optimization',
      'Continuous asset generation from one shoot',
    ],
  },
  {
    id: 'amplify',
    title: 'Amplify AI',
    summary: 'Posted content → closed deals',
    details: [
      '3-5x velocity (48 hours vs. 2 weeks)',
      'AI-powered content distribution',
      'Automated brand matching and outreach',
      'Performance tracking and optimization',
      'Deal closing automation',
      'Revenue attribution and analytics',
    ],
  },
];

/**
 * Mobile-optimized Four Modules System Diagram
 *
 * Direct carousel view for Athletes First presentation
 * Shows athlete lifecycle journey: NIL → Pitch → Twins → Amplify
 * Swipeable cards with pagination dots
 */
export default function FourModulesSystemDiagramMobile() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentModule = modules[currentIndex];
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left - next
      if (currentIndex < modules.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }

    if (touchStartX.current - touchEndX.current < -50) {
      // Swipe right - previous
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  return (
    <div className="pb-6">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold mb-1">4 Integrated Modules</h2>
        <p className="text-xs text-gray-500">
          From amateur compliance to professional viral distribution
        </p>
      </div>

      <div className="space-y-6">
        {/* Module Detail Card - Swipeable */}
        <div
          className="bg-gray-900/70 border border-terminal-gold/30 rounded-lg p-6"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <h3 className="text-2xl font-bold text-center mb-2">
            {currentModule.title}
          </h3>
          <p className="text-gray-300 text-center mb-6">
            {currentModule.summary}
          </p>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-terminal-gold uppercase tracking-wide">
              Key Features
            </h4>
            {currentModule.details.map((detail, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="text-terminal-gold text-lg mt-0.5" aria-hidden="true">
                  ✓
                </div>
                <div className="text-base text-gray-200">{detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-1.5">
          {modules.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-terminal-gold w-4'
                  : 'bg-gray-700 w-1.5'
              }`}
            />
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between">
          {currentIndex > 0 && (
            <button
              onClick={() => setCurrentIndex(currentIndex - 1)}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors"
              aria-label={`Previous: ${modules[currentIndex - 1].title}`}
            >
              ← Previous
            </button>
          )}
          <div className="flex-1" />
          {currentIndex < modules.length - 1 && (
            <button
              onClick={() => setCurrentIndex(currentIndex + 1)}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors"
              aria-label={`Next: ${modules[currentIndex + 1].title}`}
            >
              Next →
            </button>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="text-center text-sm text-gray-400">
          {currentIndex + 1} of {modules.length}
        </div>
      </div>
    </div>
  );
}
