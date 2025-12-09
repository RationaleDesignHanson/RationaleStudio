/**
 * Rationale Overview Pitch Deck Component
 *
 * Interactive presentation deck for Rationale methodology
 * Linear slide-by-slide format with keyboard navigation
 * Following Athletes First deck pattern
 */

'use client';

import { useState, useEffect } from 'react';
import { getAllSectionsV2, Section, Slide } from '@/lib/rationale-overview/content-v2';
import dynamic from 'next/dynamic';

// Dynamic import for ASCII Unified Grid
const ASCIIUnifiedGrid = dynamic(
  () => import('@/components/visual/ASCIIUnifiedGrid').then(mod => mod.ASCIIUnifiedGrid),
  { ssr: false, loading: () => null }
);

// Loading component for dynamic imports
const LoadingComponent = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFD700] mb-4"></div>
      <p className="text-white/60 text-sm">Loading...</p>
    </div>
  </div>
);

// Dynamically import diagram components
const DIAGRAM_COMPONENTS: Record<string, React.ComponentType<any>> = {
  TraditionalVsRationaleDiagram: dynamic(() => import('./diagrams/TraditionalVsRationaleDiagram'), { loading: () => <LoadingComponent /> }),
  SevenPrototypeFramework: dynamic(() => import('./diagrams/SevenPrototypeFramework'), { loading: () => <LoadingComponent /> }),
  ZeroMetricsDiagram: dynamic(() => import('./diagrams/ZeroMetricsDiagram'), { loading: () => <LoadingComponent /> }),
  CheckpointTimelineDiagram: dynamic(() => import('./diagrams/CheckpointTimelineDiagram'), { loading: () => <LoadingComponent /> }),
  SpecVsPrototypeDiagram: dynamic(() => import('./diagrams/SpecVsPrototypeDiagram'), { loading: () => <LoadingComponent /> }),
  CostComparisonChart: dynamic(() => import('./diagrams/CostComparisonChart'), { loading: () => <LoadingComponent /> }),
  DecisionPressureDiagram: dynamic(() => import('./diagrams/DecisionPressureDiagram'), { loading: () => <LoadingComponent /> }),
  ZeroArchitectureDiagram: dynamic(() => import('./diagrams/ZeroArchitectureDiagram'), { loading: () => <LoadingComponent /> }),
  EngagementModelsGrid: dynamic(() => import('./diagrams/EngagementModelsGrid'), { loading: () => <LoadingComponent /> }),
  ServiceOfferingBreakdown: dynamic(() => import('./diagrams/ServiceOfferingBreakdown'), { loading: () => <LoadingComponent /> }),
  DualEngineModel: dynamic(() => import('./diagrams/DualEngineModel'), { loading: () => <LoadingComponent /> }),
  HeroAnimation: dynamic(() => import('./diagrams/HeroAnimation'), { loading: () => <LoadingComponent /> }),
  MethodologyOriginShowcase: dynamic(() => import('./diagrams/MethodologyOriginShowcase'), { loading: () => <LoadingComponent /> }),
  ProofDiversityInfographic: dynamic(() => import('./diagrams/ProofDiversityInfographic'), { loading: () => <LoadingComponent /> }),
  WhoThisIsForInfographic: dynamic(() => import('./diagrams/WhoThisIsForInfographic'), { loading: () => <LoadingComponent /> }),
  ReadyToBuildInfographic: dynamic(() => import('./diagrams/ReadyToBuildInfographic'), { loading: () => <LoadingComponent /> }),
};

// Section colors - Terminal Republic palette
const SECTION_COLORS: Record<string, string> = {
  'opening': '#FFD700',
  'problem': '#FF4444',
  'solution': '#00D9FF',
  'proof': '#00FF94',
  'de-risk': '#FFD700',
};

export default function RationalePitchDeck() {
  const sections = getAllSectionsV2();
  const [activeSection, setActiveSection] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [expandedDeepDive, setExpandedDeepDive] = useState<string | null>('expanded-by-default');

  const currentSection = sections[activeSection];
  const currentSlide = currentSection.slides[activeSlide];
  const totalSlides = currentSection.slides.length;
  const currentColor = SECTION_COLORS[currentSection.id] || SECTION_COLORS['opening'];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        previousSlide();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        nextSection();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        previousSection();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const nextSlide = () => {
    if (activeSlide < totalSlides - 1) {
      setActiveSlide(activeSlide + 1);
      setExpandedDeepDive('expanded-by-default');
    } else {
      nextSection();
    }
  };

  const previousSlide = () => {
    if (activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
      setExpandedDeepDive('expanded-by-default');
    } else {
      previousSection();
    }
  };

  const nextSection = () => {
    if (activeSection < sections.length - 1) {
      setActiveSection(activeSection + 1);
      setActiveSlide(0);
      setExpandedDeepDive('expanded-by-default');
    }
  };

  const previousSection = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
      setActiveSlide(0);
      setExpandedDeepDive('expanded-by-default');
    }
  };

  const goToSection = (index: number) => {
    setActiveSection(index);
    setActiveSlide(0);
    setExpandedDeepDive('expanded-by-default');
  };

  // Render diagram component
  const renderDiagram = (componentName: string) => {
    const DiagramComponent = DIAGRAM_COMPONENTS[componentName];
    if (!DiagramComponent) {
      return (
        <div className="p-8 bg-gray-800/50 border border-gray-700 rounded-lg text-center">
          <p className="text-gray-400">Diagram: {componentName}</p>
          <p className="text-xs text-gray-500 mt-2">Coming soon</p>
        </div>
      );
    }
    return <DiagramComponent />;
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <ASCIIUnifiedGrid
          opacity={0.04}
          animated={true}
          colorTheme={{
            name: 'Terminal Republic',
            colors: ['#000000', '#111827', '#1f2937'],
            primary: currentColor,
            description: 'Dark with section-based accent'
          }}
          charSet="default"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation Bar */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
          <div className="px-4 sm:px-8 py-4">
            {/* Section Navigation */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => goToSection(index)}
                    className={`px-3 py-1 text-xs font-mono rounded transition-all ${
                      activeSection === index
                        ? 'bg-white/10 text-white'
                        : 'text-white/40 hover:text-white/70'
                    }`}
                    style={{
                      borderLeft: activeSection === index ? `3px solid ${SECTION_COLORS[section.id]}` : 'none'
                    }}
                  >
                    {section.navLabel}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <div className="text-xs text-white/40 font-mono hidden sm:block">
                  Click anywhere or use arrow keys
                </div>
                <a
                  href="/"
                  className="flex items-center gap-2 px-3 py-2 rounded border border-gray-700 hover:border-[#FFD700] bg-gray-900/50 hover:bg-gray-800 text-white/60 hover:text-white transition-colors"
                  aria-label="Exit overview"
                  title="Exit and return to homepage"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-sm hidden md:inline">Exit</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Content */}
        <div className="flex-1 pt-24 pb-12 cursor-pointer" onClick={nextSlide}>
          <div className="px-4 sm:px-8 max-w-6xl mx-auto">
            {/* Slide Controls */}
            <div className="flex items-center justify-between gap-3 mb-8" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-2">
                <button
                  disabled={activeSlide === 0 && activeSection === 0}
                  onClick={previousSlide}
                  className="flex items-center gap-2 px-4 py-2 rounded border border-gray-700 hover:border-[#FFD700] bg-gray-900/50 hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-700 disabled:hover:bg-gray-900/50 transition-all"
                  aria-label="Previous slide"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-sm hidden sm:inline">Previous</span>
                </button>

                <a
                  href="/"
                  className="flex items-center gap-2 px-4 py-2 rounded border border-gray-700 hover:border-[#FFD700] bg-gray-900/50 hover:bg-gray-800 text-white/60 hover:text-white transition-all"
                  aria-label="Exit overview"
                  title="Exit and return to homepage"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-sm">Exit</span>
                </a>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-white/40">{currentSection.title}</span>
                <span className="text-white/40">·</span>
                <span className="text-white/60">
                  {activeSlide + 1} of {totalSlides}
                </span>
              </div>

              <button
                disabled={activeSlide === totalSlides - 1 && activeSection === sections.length - 1}
                onClick={nextSlide}
                className="flex items-center gap-2 px-4 py-2 rounded border border-gray-700 hover:border-[#FFD700] bg-gray-900/50 hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-700 disabled:hover:bg-gray-900/50 transition-all"
                aria-label="Next slide"
              >
                <span className="text-sm hidden sm:inline">Next</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Slide Render */}
            {currentSlide.type === 'section-header' ? (
              // Section Header Slide
              <div className="flex flex-col items-center justify-center min-h-[calc(70vh-4rem)]">
                <div
                  className="mb-6 px-4 py-2 border-2 font-mono text-sm backdrop-blur-sm bg-black/20"
                  style={{ borderColor: currentColor, color: currentColor }}
                >
                  SECTION {currentSlide.sectionNumber}
                </div>
                <h2
                  className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 text-center px-4"
                  style={{ color: currentColor }}
                >
                  {currentSlide.headline}
                </h2>
                <p className="text-2xl text-white/70 max-w-2xl text-center font-light">
                  {currentSlide.content}
                </p>
              </div>
            ) : (
              // Content Slide
              <div className="space-y-8">
                {/* Headline */}
                <div className="text-center">
                  <h2 className="text-4xl sm:text-5xl font-bold mb-4">{currentSlide.headline}</h2>
                  {currentSlide.content && (
                    <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
                      {currentSlide.content}
                    </p>
                  )}
                </div>

                {/* Visual/Diagram */}
                {currentSlide.visual && (
                  <div className="mt-8" onClick={(e) => e.stopPropagation()}>
                    {currentSlide.visual.type === 'component' && currentSlide.visual.component && (
                      renderDiagram(currentSlide.visual.component)
                    )}
                    {currentSlide.visual.type === 'stat' && (
                      <div className="p-8 bg-gray-800/50 border border-gray-700 rounded-lg">
                        <p className="text-center text-gray-400">Stats visualization coming soon</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Deep Dive Accordion */}
                {currentSlide.deepDive && (
                  <details
                    className="mt-8 border-t border-gray-700 pt-6"
                    open={expandedDeepDive === 'expanded-by-default'}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <summary
                      className="text-sm font-mono uppercase tracking-wide cursor-pointer hover:text-[#FFE34D] transition-colors"
                      style={{ color: currentColor }}
                    >
                      Deep Dive: {currentSlide.deepDive.title} →
                    </summary>
                    <div className="mt-6 space-y-5">
                      {currentSlide.deepDive.sections.map((section, idx) => (
                        <div key={idx} className="border-l-2 pl-4" style={{ borderColor: currentColor }}>
                          <h4 className="text-sm font-semibold mb-2" style={{ color: currentColor }}>
                            {section.title}
                          </h4>
                          <p className="text-sm text-white leading-relaxed">
                            {section.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </details>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="fixed bottom-0 left-0 right-0 h-1 bg-gray-900">
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${((activeSection * 10 + activeSlide + 1) / (sections.length * 10)) * 100}%`,
              backgroundColor: currentColor
            }}
          />
        </div>
      </div>
    </div>
  );
}
