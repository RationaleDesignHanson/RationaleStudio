/**
 * CREaiT Pitch Deck Component
 *
 * Consulting proposal deck showing CREaiT team:
 * - Current state assessment (what they have)
 * - Highest leverage opportunities (what matters most)
 * - 12-week engagement plan (how we'll get them market-ready)
 */

'use client';

import { useState, useEffect } from 'react';
import { getAllSections, Section, Slide } from '@/lib/creait/pitch-deck-content';
import dynamic from 'next/dynamic';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';
import { DisplayLG, BodyLG } from '@/components/creait/typography/Typography';

// Loading component for dynamic imports
const LoadingComponent = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-sky-400 mb-4"></div>
      <p className="text-white/60 text-sm">Loading...</p>
    </div>
  </div>
);

// Dynamic import for ASCII Unified Grid
const ASCIIUnifiedGrid = dynamic(
  () => import('@/components/visual/ASCIIUnifiedGrid').then(mod => mod.ASCIIUnifiedGrid),
  { ssr: false, loading: () => null }
);

// Dynamically import diagram components
const DIAGRAM_COMPONENTS: Record<string, React.ComponentType<any>> = {
  // Existing CREaiT diagrams
  BrokerDayDiagram: dynamic(() => import('./diagrams/BrokerDayDiagram'), { loading: () => <LoadingComponent /> }),
  AIScoreFlowDiagram: dynamic(() => import('./diagrams/AIScoreFlowDiagram'), { loading: () => <LoadingComponent /> }),
  TimingWindowDiagram: dynamic(() => import('./diagrams/TimingWindowDiagram'), { loading: () => <LoadingComponent /> }),
  ValidationMapDiagram: dynamic(() => import('./diagrams/ValidationMapDiagram'), { loading: () => <LoadingComponent /> }),
  TAMFunnelDiagram: dynamic(() => import('./diagrams/TAMFunnelDiagram'), { loading: () => <LoadingComponent /> }),
  CompetitiveLandscapeDiagram: dynamic(() => import('./diagrams/CompetitiveLandscapeDiagram'), { loading: () => <LoadingComponent /> }),
  UnitEconomicsFlowDiagram: dynamic(() => import('./diagrams/UnitEconomicsFlowDiagram'), { loading: () => <LoadingComponent /> }),
  RevenueRampDiagram: dynamic(() => import('./diagrams/RevenueRampDiagram'), { loading: () => <LoadingComponent /> }),
  RoadmapGanttDiagram: dynamic(() => import('./diagrams/RoadmapGanttDiagramResponsive'), { loading: () => <LoadingComponent /> }),
  InvestmentMilestonesDiagram: dynamic(() => import('./diagrams/InvestmentMilestonesDiagram'), { loading: () => <LoadingComponent /> }),
  // Welcome slide
  CREWelcomeSlide: dynamic(() => import('./CREWelcomeSlide'), { loading: () => <LoadingComponent /> }),
};

// Section colors (CRE brand palette)
const SECTION_COLORS: Record<string, string> = {
  'opening': CRE_COLORS.primary,      // Sky blue
  'problem': CRE_COLORS.score.critical, // Red
  'solution': CRE_COLORS.secondary,   // Purple
  'execution': CRE_COLORS.accent,     // Orange
  'market': CRE_COLORS.primary,       // Sky blue
  'business': CRE_COLORS.success,     // Green
  'roadmap': CRE_COLORS.secondary,    // Purple
  'engagement': CRE_COLORS.accent,    // Orange
};

export default function CREaiTPitchDeck() {
  const sections = getAllSections();
  const [activeSection, setActiveSection] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [expandedDeepDive, setExpandedDeepDive] = useState<string | null>('expanded-by-default');

  const currentSection = sections[activeSection];
  const currentSlide = currentSection.slides[activeSlide];
  const totalSlides = currentSection.slides.length;
  const currentColor = SECTION_COLORS[currentSection.id] || CRE_COLORS.primary;

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

  // Render assessment callout
  const renderAssessment = () => {
    if (!currentSlide.assessment) return null;

    const { working, focus, recommendation } = currentSlide.assessment;

    return (
      <div className="mt-8 p-6 rounded-lg border-2 bg-gray-900/60 backdrop-blur-sm"
           style={{
             borderColor: `${currentColor}40`,
             backgroundColor: `${currentColor}08`
           }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="px-3 py-1 rounded-md border font-mono text-xs font-bold uppercase tracking-wider"
               style={{
                 borderColor: currentColor,
                 backgroundColor: `${currentColor}15`,
                 color: currentColor
               }}>
            💡 Rationale's Assessment
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <span className="text-green-400 font-bold text-lg flex-shrink-0">✅</span>
            <div>
              <span className="font-semibold text-white">What's working:</span>
              <span className="text-gray-300 ml-2">{working}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-yellow-400 font-bold text-lg flex-shrink-0">⚠️</span>
            <div>
              <span className="font-semibold text-white">What needs focus:</span>
              <span className="text-gray-300 ml-2">{focus}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-sky-400 font-bold text-lg flex-shrink-0">🎯</span>
            <div>
              <span className="font-semibold text-white">Our recommendation:</span>
              <span className="text-gray-300 ml-2">{recommendation}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render deep dive accordion
  const renderDeepDive = () => {
    if (!currentSlide.deepDive) return null;

    const { title, description, sections: deepDiveSections } = currentSlide.deepDive;
    const isExpanded = expandedDeepDive !== null;

    return (
      <div className="mt-8">
        <button
          onClick={() => setExpandedDeepDive(isExpanded ? null : 'expanded')}
          className="w-full p-4 rounded-lg border-2 bg-gray-900/40 hover:bg-gray-900/60 transition-all duration-300 text-left"
          style={{
            borderColor: `${currentColor}40`
          }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-white mb-1">{title}</div>
              <div className="text-sm text-gray-400">{description}</div>
            </div>
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ color: currentColor }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {isExpanded && (
          <div className="mt-4 p-6 rounded-lg border bg-gray-900/40"
               style={{ borderColor: `${currentColor}20` }}>
            <div className="space-y-6">
              {deepDiveSections.map((section, index) => (
                <div key={index}>
                  <h4 className="font-semibold text-white mb-2">{section.title}</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render section indicator
  const renderSectionIndicator = () => {
    // Calculate overall slide number
    let overallSlideNumber = 0;
    let totalSlidesCount = 0;

    for (let i = 0; i < sections.length; i++) {
      if (i < activeSection) {
        overallSlideNumber += sections[i].slides.length;
      }
      totalSlidesCount += sections[i].slides.length;
    }
    overallSlideNumber += activeSlide + 1;

    return (
      <div className="flex flex-col gap-3 mb-8">
        <div className="flex items-center gap-3">
          <div className="text-sm font-mono text-white/40">
            Section {activeSection + 1}/{sections.length}
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
          <div className="text-sm font-mono text-white/40">
            Slide {overallSlideNumber}/{totalSlidesCount}
          </div>
        </div>

        {/* Section progress bar */}
        <div className="flex gap-1">
          {sections.map((_, index) => (
            <div
              key={index}
              className="h-1 flex-1 rounded-full transition-all duration-300 cursor-pointer"
              style={{
                backgroundColor: index === activeSection
                  ? currentColor
                  : index < activeSection
                    ? `${currentColor}60`
                    : 'rgba(255,255,255,0.1)'
              }}
              onClick={() => goToSection(index)}
            />
          ))}
        </div>
      </div>
    );
  };

  // Render visual
  const renderVisual = () => {
    if (!currentSlide.visual) return null;

    const { type, component } = currentSlide.visual;

    if (type === 'component' && component) {
      const VisualComponent = DIAGRAM_COMPONENTS[component];
      if (VisualComponent) {
        return (
          <div className="my-8">
            <VisualComponent />
          </div>
        );
      }
      return (
        <div className="my-8 p-8 rounded-lg border-2 border-dashed border-gray-700 text-center text-gray-500">
          Component: {component} (not found)
        </div>
      );
    }

    if (type === 'diagram' && component) {
      const DiagramComponent = DIAGRAM_COMPONENTS[component];
      if (DiagramComponent) {
        return (
          <div className="my-8 p-6 rounded-lg border-2 bg-gray-900/40"
               style={{ borderColor: `${currentColor}40` }}>
            <DiagramComponent />
          </div>
        );
      }
      return (
        <div className="my-8 p-8 rounded-lg border-2 border-dashed border-gray-700 text-center text-gray-500">
          Diagram: {component} (not found)
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 relative">
      {/* ASCII Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <ASCIIUnifiedGrid
          opacity={0.03}
          animated={true}
          colorTheme={{
            name: 'CREaiT Theme',
            colors: [currentColor],
            primary: currentColor,
            description: 'CRE pitch deck theme'
          }}
          charSet="default"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Section Indicator */}
        {renderSectionIndicator()}

        {/* Section Title */}
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-wider mb-2"
               style={{ color: currentColor }}>
            {currentSection.navLabel}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{currentSection.title}</h2>
          <p className="text-sm text-gray-400">{currentSection.description}</p>
        </div>

        {/* Slide Content */}
        <div className="bg-gray-900/40 backdrop-blur-sm rounded-lg border-2 p-8 mb-8"
             style={{ borderColor: `${currentColor}30` }}>

          {/* Slide Headline */}
          <h1 className="text-4xl font-bold text-white mb-3">
            {currentSlide.headline}
          </h1>

          {/* Slide Subheadline */}
          {currentSlide.subheadline && (
            <p className="text-xl text-gray-400 mb-6">
              {currentSlide.subheadline}
            </p>
          )}

          {/* Slide Content */}
          {currentSlide.content && (
            <p className="text-base text-gray-300 leading-relaxed mb-6">
              {currentSlide.content}
            </p>
          )}

          {/* Content Bullets */}
          {currentSlide.contentBullets && (
            <ul className="space-y-3 mb-6">
              {currentSlide.contentBullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3">
                  {bullet && (
                    <>
                      <span className="text-sky-400 mt-1">•</span>
                      <span className="text-gray-300">{bullet}</span>
                    </>
                  )}
                  {!bullet && <div className="h-3" />}
                </li>
              ))}
            </ul>
          )}

          {/* Visual (diagram or component) */}
          {renderVisual()}

          {/* Assessment Callout */}
          {renderAssessment()}

          {/* Deep Dive Accordion */}
          {renderDeepDive()}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={previousSlide}
            disabled={activeSection === 0 && activeSlide === 0}
            className="px-6 py-3 rounded-lg border-2 font-semibold transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              borderColor: currentColor,
              color: currentColor,
              backgroundColor: `${currentColor}10`
            }}>
            ← Previous
          </button>

          <div className="text-sm text-gray-500 font-mono">
            Use arrow keys to navigate
          </div>

          <button
            onClick={nextSlide}
            disabled={activeSection === sections.length - 1 && activeSlide === totalSlides - 1}
            className="px-6 py-3 rounded-lg border-2 font-semibold transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              borderColor: currentColor,
              color: currentColor,
              backgroundColor: `${currentColor}10`
            }}>
            Next →
          </button>
        </div>

        {/* Section Navigation (Footer) */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="text-xs font-mono text-gray-500 mb-4 uppercase tracking-wider">
            Jump to Section
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => goToSection(index)}
                className={`p-3 rounded-lg border text-left transition-all duration-300 ${
                  index === activeSection
                    ? 'border-2'
                    : 'border hover:border-2'
                }`}
                style={{
                  borderColor: index === activeSection ? currentColor : 'rgba(255,255,255,0.1)',
                  backgroundColor: index === activeSection ? `${currentColor}10` : 'rgba(0,0,0,0.2)'
                }}>
                <div className="text-xs font-mono text-gray-500 mb-1">
                  {section.navLabel}
                </div>
                <div className="text-sm font-semibold text-white">
                  {section.title}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
