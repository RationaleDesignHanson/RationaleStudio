/**
 * Sanitary Waste System Pitch Deck Component
 *
 * Interactive presentation deck for IP development fundraising
 * Linear slide-by-slide format with keyboard navigation
 * Following RationalePitchDeck pattern
 */

'use client';

import { useState, useEffect } from 'react';
import { sanitaryWasteSections, SECTION_COLORS, type SanitaryWasteSection, type SanitaryWasteSlide } from '@/lib/content/sanitary-waste-system';
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
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mb-4"></div>
      <p className="text-white/60 text-sm">Loading...</p>
    </div>
  </div>
);

// Dynamically import diagram components
const DIAGRAM_COMPONENTS: Record<string, React.ComponentType<any>> = {
  RollVsInterfoldedDiagram: dynamic(() => import('./diagrams/RollVsInterfoldedDiagram'), { loading: () => <LoadingComponent /> }),
  ProductSystemDiagram: dynamic(() => import('./diagrams/ProductSystemDiagram'), { loading: () => <LoadingComponent /> }),
  RazorBladeEconomicsDiagram: dynamic(() => import('./diagrams/RazorBladeEconomicsDiagram'), { loading: () => <LoadingComponent /> }),
  ManufacturingFlowDiagram: dynamic(() => import('./diagrams/ManufacturingFlowDiagram'), { loading: () => <LoadingComponent /> }),
  RetailBetaTimelineDiagram: dynamic(() => import('./diagrams/RetailBetaTimelineDiagram'), { loading: () => <LoadingComponent /> }),
};

export default function SanitaryWasteDeck() {
  const sections = sanitaryWasteSections;
  const [activeSection, setActiveSection] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [expandedDeepDive, setExpandedDeepDive] = useState<string | null>('expanded-by-default');

  const currentSection = sections[activeSection];
  const currentSlide = currentSection.slides[activeSlide];
  const totalSlides = currentSection.slides.length;
  const currentColor = currentSection.color;

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
            name: 'Sanitary System',
            colors: ['#000000', '#111827', '#1f2937'],
            primary: currentColor,
            description: 'Dark with green/mint accents'
          }}
          charSet="default"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation Bar */}
        <div className="fixed top-0 left-0 right-0 z-[100] bg-black/90 backdrop-blur-md border-b border-gray-800">
          <div className="px-4 sm:px-8 py-4">
            {/* Slide Controls */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <button
                  disabled={activeSlide === 0 && activeSection === 0}
                  onClick={previousSlide}
                  className="flex items-center gap-2 px-4 py-2 rounded border border-gray-700 hover:border-green-500 bg-gray-900/50 hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-700 disabled:hover:bg-gray-900/50 transition-all"
                  aria-label="Previous slide"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-sm hidden sm:inline">Previous</span>
                </button>

                <a
                  href="/clients/work"
                  className="flex items-center gap-2 px-4 py-2 rounded border border-gray-700 hover:border-green-500 bg-gray-900/50 hover:bg-gray-800 text-white/60 hover:text-white transition-all"
                  aria-label="Exit to work portfolio"
                  title="Exit and return to work portfolio"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-sm">Exit</span>
                </a>
              </div>

              <button
                disabled={activeSlide === sections[activeSection].slides.length - 1 && activeSection === sections.length - 1}
                onClick={nextSlide}
                className="flex items-center gap-2 px-4 py-2 rounded border border-gray-700 hover:border-green-500 bg-gray-900/50 hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-700 disabled:hover:bg-gray-900/50 transition-all"
                aria-label="Next slide"
              >
                <span className="text-sm hidden sm:inline">Next</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Section Navigation */}
            <div className="flex flex-wrap gap-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => goToSection(index)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                    index === activeSection
                      ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                      : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:border-green-500/50 hover:text-green-400'
                  }`}
                  style={{
                    borderColor: index === activeSection ? section.color : undefined,
                    color: index === activeSection ? section.color : undefined
                  }}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Slide Content */}
        <div className="flex-1 pt-32 pb-20 px-4 sm:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Slide Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="h-1 w-12 rounded-full"
                  style={{ backgroundColor: currentColor }}
                />
                <span className="text-sm text-gray-400">
                  {currentSection.title} • Slide {activeSlide + 1} of {totalSlides}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                {currentSlide.headline}
              </h1>

              {currentSlide.subheadline && (
                <p className="text-xl sm:text-2xl text-gray-400 mb-6">
                  {currentSlide.subheadline}
                </p>
              )}
            </div>

            {/* Slide Body */}
            <div className="space-y-6">
              {/* Content paragraphs */}
              {currentSlide.content && currentSlide.content.map((paragraph, index) => (
                <p key={index} className="text-lg text-gray-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}

              {/* Bullets */}
              {currentSlide.bullets && (
                <ul className="space-y-3 ml-6">
                  {currentSlide.bullets.map((bullet, index) => (
                    <li key={index} className="text-lg text-gray-300 flex items-start gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: currentColor }}
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Visual/Diagram */}
              {currentSlide.visual && (
                <div className="mt-8">
                  {currentSlide.visual.type === 'diagram' && currentSlide.visual.component && (
                    renderDiagram(currentSlide.visual.component)
                  )}
                  {currentSlide.visual.type === 'stat' && currentSlide.visual.data && (
                    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 text-center">
                      <div className="text-6xl font-bold mb-2" style={{ color: currentColor }}>
                        {currentSlide.visual.data.primary}
                      </div>
                      <div className="text-xl text-gray-400">
                        {currentSlide.visual.data.label}
                      </div>
                      {currentSlide.visual.data.secondary && (
                        <div className="text-sm text-gray-500 mt-4">
                          {currentSlide.visual.data.secondary}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Deep Dive Accordion */}
              {currentSlide.deepDive && (
                <div className="mt-8 border border-gray-800 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedDeepDive(expandedDeepDive === currentSlide.id ? null : currentSlide.id)}
                    className="w-full px-6 py-4 bg-gray-900/50 hover:bg-gray-900 flex items-center justify-between transition-all"
                  >
                    <span className="font-medium text-green-400">
                      {currentSlide.deepDive.title}
                    </span>
                    <svg
                      className={`w-5 h-5 text-green-400 transition-transform ${
                        expandedDeepDive === currentSlide.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {expandedDeepDive === currentSlide.id && (
                    <div className="px-6 py-6 bg-gray-950/50 space-y-6">
                      {currentSlide.deepDive.sections.map((section, index) => (
                        <div key={index}>
                          <h3 className="text-lg font-semibold text-green-400 mb-2">
                            {section.title}
                          </h3>
                          <p className="text-gray-300 leading-relaxed">
                            {section.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Notes */}
              {currentSlide.notes && (
                <div className="mt-6 text-sm text-gray-500 italic border-l-2 border-gray-800 pl-4">
                  {currentSlide.notes}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-[100] bg-black/90 backdrop-blur-md border-t border-gray-800">
          <div className="h-1 bg-gray-900">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${((activeSection * 100 + (activeSlide / totalSlides) * 100) / sections.length)}%`,
                backgroundColor: currentColor
              }}
            />
          </div>
          <div className="px-4 sm:px-8 py-3 flex items-center justify-between text-sm">
            <div className="text-gray-400">
              Section {activeSection + 1} of {sections.length}
            </div>
            <div className="text-gray-400">
              Use arrow keys to navigate • ← → for slides • ↑ ↓ for sections
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
