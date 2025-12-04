/**
 * Athletes First Pitch Deck Component
 *
 * Interactive presentation deck for Athletes First pilot program
 * Linear slide-by-slide format with keyboard navigation
 * Now using content-v2.ts as single source of truth
 */

'use client';

import { useState, useEffect } from 'react';
import { getAllSectionsV2, Section, Slide, DemoTab } from '@/lib/athletes-first/content-v2';
import dynamic from 'next/dynamic';
import PhaseBadge from './PhaseBadge';
import ModuleFlowProgress from './ModuleFlowProgress';

// Loading component for dynamic imports
const LoadingComponent = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mb-4"></div>
      <p className="text-white/60 text-sm">Loading...</p>
    </div>
  </div>
);

// Dynamic import for ASCII Unified Grid (only load when needed)
const ASCIIUnifiedGrid = dynamic(
  () => import('@/components/visual/ASCIIUnifiedGrid').then(mod => mod.ASCIIUnifiedGrid),
  { ssr: false, loading: () => null }
);

// Dynamically import demo components for code splitting
const DEMO_COMPONENTS: Record<string, React.ComponentType<any>> = {
  // Interactive Demos
  DigitalTwinsDemo: dynamic(() => import('./demos/DigitalTwinsDemo'), { loading: () => <LoadingComponent /> }),
  BrandCampaignDemo: dynamic(() => import('./demos/BrandCampaignDemo'), { loading: () => <LoadingComponent /> }),
  RosterCampaignDemo: dynamic(() => import('./demos/RosterCampaignDemo'), { loading: () => <LoadingComponent /> }),
  NILAnalyzerDemo: dynamic(() => import('./demos/NILAnalyzerDemo'), { loading: () => <LoadingComponent /> }),
  ImmersivePitchDemo: dynamic(() => import('./demos/ImmersivePitchDemo'), { loading: () => <LoadingComponent /> }),
  ContractModelingCanvas: dynamic(() => import('./demos/ContractModelingCanvas'), { loading: () => <LoadingComponent /> }),
  VisionProSpatialDemo: dynamic(() => import('./demos/VisionProSpatialDemo'), { loading: () => <LoadingComponent /> }),
  RecruitAIDemo: dynamic(() => import('./demos/RecruitAIDemo'), { loading: () => <LoadingComponent /> }),
  AgentToolkitDemo: dynamic(() => import('./demos/AgentToolkitDemo'), { loading: () => <LoadingComponent /> }),
  AISTSimulatorDemo: dynamic(() => import('./demos/AISTSimulatorDemo'), { loading: () => <LoadingComponent /> }),
  AmplifyAIDemo: dynamic(() => import('./demos/AmplifyAIDemo'), { loading: () => <LoadingComponent /> }),
  // Platform Demos
  PlatformWalkthroughDemo: dynamic(() => import('./demos/PlatformWalkthroughDemo'), { loading: () => <LoadingComponent /> }),
  AthleteDashboardDemo: dynamic(() => import('./demos/AthleteDashboardDemo'), { loading: () => <LoadingComponent /> }),
  SystemArchitectureDemo: dynamic(() => import('./demos/SystemArchitectureDemo'), { loading: () => <LoadingComponent /> }),
  // Diagram Components
  AgencyParadoxDiagram: dynamic(() => import('./diagrams/AgencyParadoxDiagram'), { loading: () => <LoadingComponent /> }),
  ThreeBottlenecksDiagram: dynamic(() => import('./diagrams/ThreeBottlenecksDiagram'), { loading: () => <LoadingComponent /> }),
  StatusQuoCeilingDiagram: dynamic(() => import('./diagrams/StatusQuoCeilingDiagram'), { loading: () => <LoadingComponent /> }),
  NILComplexityDiagram: dynamic(() => import('./diagrams/NILComplexityDiagram'), { loading: () => <LoadingComponent /> }),
  DigitalTwinFlowDiagram: dynamic(() => import('./diagrams/DigitalTwinFlowDiagram'), { loading: () => <LoadingComponent /> }),
  BreakthroughDiagram: dynamic(() => import('./diagrams/BreakthroughDiagram'), { loading: () => <LoadingComponent /> }),
  InfiniteDeploymentDiagram: dynamic(() => import('./diagrams/InfiniteDeploymentDiagram'), { loading: () => <LoadingComponent /> }),
  RevenueUnlockDiagram: dynamic(() => import('./diagrams/RevenueUnlockDiagram'), { loading: () => <LoadingComponent /> }),
  CloseRateImprovementDiagram: dynamic(() => import('./diagrams/CloseRateImprovementDiagram'), { loading: () => <LoadingComponent /> }),
  AIAdoptionCurveDiagram: dynamic(() => import('./diagrams/AIAdoptionCurveDiagram'), { loading: () => <LoadingComponent /> }),
  SuccessMetricsDiagram: dynamic(() => import('./diagrams/SuccessMetricsDiagram'), { loading: () => <LoadingComponent /> }),
  FourModulesSystemDiagram: dynamic(() => import('./diagrams/FourModulesSystemDiagram'), { loading: () => <LoadingComponent /> }),
  // Phase 1: Critical visuals
  AmplifyAITimingDiagram: dynamic(() => import('./diagrams/AmplifyAITimingDiagram'), { loading: () => <LoadingComponent /> }),
  AmplifyAIProcessDiagram: dynamic(() => import('./diagrams/AmplifyAIProcessDiagram'), { loading: () => <LoadingComponent /> }),
  NILPlatformFlowDiagram: dynamic(() => import('./diagrams/NILPlatformFlowDiagram'), { loading: () => <LoadingComponent /> }),
  InteractivePitchInterfaceDiagram: dynamic(() => import('./diagrams/InteractivePitchInterfaceDiagram'), { loading: () => <LoadingComponent /> }),
  DealMultiplierDiagram: dynamic(() => import('./diagrams/DealMultiplierDiagram'), { loading: () => <LoadingComponent /> }),
  AdoptionWindowDiagram: dynamic(() => import('./diagrams/AdoptionWindowDiagram'), { loading: () => <LoadingComponent /> }),
  CompetitiveComparisonMatrix: dynamic(() => import('./diagrams/CompetitiveComparisonMatrix'), { loading: () => <LoadingComponent /> }),
  MarketSaturationDiagram: dynamic(() => import('./diagrams/MarketSaturationDiagram'), { loading: () => <LoadingComponent /> }),
  // Supporting Components
  WelcomeSlide: dynamic(() => import('./WelcomeSlide'), { loading: () => <LoadingComponent /> }),
  ModulesOverviewSlide: dynamic(() => import('./ModulesOverviewSlide'), { loading: () => <LoadingComponent /> }),
  PilotTimelineSlide: dynamic(() => import('./PilotTimelineSlide'), { loading: () => <LoadingComponent /> }),
  ModulesIntroSlide: dynamic(() => import('./ModulesIntroSlide'), { loading: () => <LoadingComponent /> }),
};

// Section colors matching Athletes First branding
const SECTION_COLORS: Record<string, string> = {
  'opening': '#0066FF',
  'solution-overview': '#00D9FF',
  'video-digital-twins': '#00FF94',
  'nil-platform': '#FF6B00',
  'interactive-pitch': '#9D4EDD',
  'amplify-ai': '#FF3366',
  'why-rationale': '#00D9FF',
  'pilot-details': '#0066FF',
};

// Module metadata for intro and breadcrumbs (ATHLETE LIFECYCLE ORDER)
const MODULES = [
  { id: 'nil-platform', name: 'NIL Guidance Platform', color: '#FF6B00' },
  { id: 'interactive-pitch', name: 'Interactive Pitch', color: '#9D4EDD' },
  { id: 'video-digital-twins', name: 'Video & Digital Twins', color: '#00FF94' },
  { id: 'amplify-ai', name: 'AmplifyAI', color: '#FF3366' }
];

type SlideType = 'problem' | 'solution' | 'demo' | 'impact' | 'custom';

export default function AthletesFirstPitchDeck() {
  const sections = getAllSectionsV2();
  const [activeSection, setActiveSection] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [expandedDeepDive, setExpandedDeepDive] = useState<string | null>('expanded-by-default');
  const [activeDemoTab, setActiveDemoTab] = useState<string | null>(null);

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
      setActiveDemoTab(null);
    } else {
      nextSection();
    }
  };

  const previousSlide = () => {
    if (activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
      setExpandedDeepDive('expanded-by-default');
      setActiveDemoTab(null);
    } else {
      previousSection();
    }
  };

  const nextSection = () => {
    if (activeSection < sections.length - 1) {
      setActiveSection(activeSection + 1);
      setActiveSlide(0);
      setExpandedDeepDive('expanded-by-default');
      setActiveDemoTab(null);
    }
  };

  const previousSection = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
      setActiveSlide(0);
      setExpandedDeepDive('expanded-by-default');
      setActiveDemoTab(null);
    }
  };

  const goToSection = (index: number) => {
    setActiveSection(index);
    setActiveSlide(0);
    setExpandedDeepDive('expanded-by-default');
    setActiveDemoTab(null);
  };

  // Auto-select first demo tab when demos change
  useEffect(() => {
    if (currentSlide.demos && currentSlide.demos.length > 0 && !activeDemoTab) {
      setActiveDemoTab(currentSlide.demos[0].id);
    }
  }, [currentSlide.id, currentSlide.demos, activeDemoTab]);

  // Render demo component
  const renderDemo = (demos: DemoTab[]) => {
    if (!demos || demos.length === 0) return null;

    const activeDemo = demos.find(d => d.id === activeDemoTab) || demos[0];
    const DemoComponent = DEMO_COMPONENTS[activeDemo.component];

    return (
      <div className="space-y-6 relative">
        {/* LIVE DEMO Badge - Holographic with animated gradient */}
        <div className="absolute -top-3 right-4 z-20">
          <div className="relative flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-sm border-2 rounded-lg overflow-hidden"
               style={{
                 borderColor: currentColor,
                 boxShadow: `0 0 30px ${currentColor}60, 0 0 15px ${currentColor}40 inset`
               }}>
            {/* Holographic animated background using pure CSS classes */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `linear-gradient(90deg, transparent, ${currentColor}40, transparent)`,
                backgroundSize: '200% 100%',
                animation: 'shimmer 3s linear infinite'
              }}
            />

            <div className="w-2.5 h-2.5 rounded-full animate-pulse relative z-10"
                 style={{
                   backgroundColor: currentColor,
                   boxShadow: `0 0 10px ${currentColor}`
                 }}
            />
            <span className="text-sm font-mono font-bold tracking-wider uppercase relative z-10"
                  style={{
                    color: currentColor,
                    textShadow: `0 0 10px ${currentColor}60`
                  }}>
              Live Demo
            </span>
          </div>
        </div>

        {/* Demo tabs - Enhanced with Terminal Republic styling */}
        {demos.length > 1 && (
          <div className="flex gap-2 border-b-2 flex-wrap pb-2"
               style={{ borderColor: `${currentColor}30` }}>
            {demos.map((demo) => (
              <button
                key={demo.id}
                onClick={() => setActiveDemoTab(demo.id)}
                className={`px-4 py-2 font-mono text-sm font-semibold transition-all duration-300
                           border-2 border-transparent rounded-t ${
                  activeDemoTab === demo.id
                    ? 'shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/5 hover:border-white/20'
                }`}
                style={activeDemoTab === demo.id ? {
                  borderColor: currentColor,
                  backgroundColor: `${currentColor}10`,
                  color: currentColor,
                  boxShadow: `0 0 15px ${currentColor}30`
                } : {}}
              >
                {demo.label}
              </button>
            ))}
          </div>
        )}

        {/* Demo content - Terminal Republic featured variant */}
        <div className="rounded-lg border-2 shadow-lg p-4 md:p-8 min-h-[400px] bg-gray-900
                        hover:shadow-xl transition-all duration-300"
             style={{
               borderColor: `${currentColor}80`,
               boxShadow: `0 0 20px ${currentColor}20, 0 10px 40px rgba(0,0,0,0.3)`
             }}>
          {DemoComponent ? (
            <DemoComponent />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <h3 className="text-2xl font-bold mb-2" style={{ color: currentColor }}>
                {activeDemo.label}
              </h3>
              <p className="text-white/60 mb-2">{activeDemo.description}</p>
              <p className="text-sm text-white/40 font-mono">Demo: {activeDemo.component}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render section indicator with navigation
  const renderSectionIndicator = () => {
    const isFirstSlide = activeSection === 0 && activeSlide === 0;
    const isLastSlide = activeSection === sections.length - 1 && activeSlide === totalSlides - 1;

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

    // Check if we're in a module section
    const currentModule = MODULES.find(m => m.id === currentSection.id);

    return (
      <div className="flex flex-col gap-3 mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={previousSlide}
            disabled={isFirstSlide}
            className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-white/40">{currentSection.navLabel}</span>
            <span className="text-white/40">·</span>
            <span className="text-white/60">{overallSlideNumber} of {totalSlidesCount}</span>
          </div>

          <button
            onClick={nextSlide}
            disabled={isLastSlide}
            className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Module breadcrumbs - only show when in a module section */}
        {currentModule && (
          <div className="flex items-center gap-3">
            {MODULES.map((module) => {
              const isActive = module.id === currentSection.id;
              return (
                <div
                  key={module.id}
                  className="px-4 py-2 rounded text-base font-semibold transition-all"
                  style={{
                    backgroundColor: isActive ? `${module.color}20` : 'transparent',
                    borderLeft: `4px solid ${isActive ? module.color : 'transparent'}`,
                    opacity: isActive ? 1 : 0.5,
                    color: isActive ? module.color : '#ffffff'
                  }}
                >
                  {module.name}
                </div>
              );
            })}
          </div>
        )}

        {/* Within-module progress - only show on problem/solution/demo/impact slides */}
        {currentModule && currentSlide.type !== 'section-header' && currentSlide.type !== 'custom' && (
          <div className="flex items-center gap-3 pl-2">
            <ModuleFlowProgress
              currentPhase={
                currentSlide.type === 'problem' ? 1 :
                currentSlide.type === 'solution' ? 2 :
                currentSlide.type === 'demo' ? 3 :
                currentSlide.type === 'impact' ? 4 : 1
              }
              moduleColor={currentColor}
            />
          </div>
        )}
      </div>
    );
  };

  // Helper to render text with clickable URLs
  const renderTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 underline transition-colors"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  // Render slide content based on type
  const renderSlideContent = (slide: Slide) => {
    // Parse content for bullet points if it includes emoji bullets
    const contentBullets = slide.content?.includes('🎬') || slide.content?.includes('⚖️') || slide.content?.includes('🎯')
      ? slide.content.split(/(?=[🎬⚖️🎯])/).filter(Boolean).map(s => s.trim())
      : null;

    // Check if slide type should use title format
    const isTitleSlide = slide.type === 'impact' && slide.id === 'hook';

    // Section header slides - Terminal Republic style with emphasized ASCII background
    if (slide.type === 'section-header') {
      return (
        <div className="min-h-[50vh] md:min-h-[70vh] relative -mx-4 sm:-mx-8">
          {/* Enhanced ASCII Grid Background - Full width edge-to-edge */}
          <div className="absolute inset-0">
            <ASCIIUnifiedGrid
              opacity={0.18}
              animated={true}
              colorTheme={{
                colors: ['#FFD700', '#FFA500', '#FF8C00'], // Terminal Gold gradient
                name: 'terminal-gold',
                primary: '#FFD700',
                description: 'Terminal Republic gold theme'
              }}
              charSet="compute"
            />
          </div>

          {/* Content overlay - keep centered with padding */}
          <div className="relative z-10 px-4 sm:px-8">
            {renderSectionIndicator()}
            <div className="flex flex-col items-center justify-center min-h-[calc(70vh-4rem)]">
              {/* Section number badge */}
              <div className="mb-6 px-4 py-2 border-2 font-mono text-sm backdrop-blur-sm bg-black/20" style={{
                borderColor: currentColor,
                color: currentColor
              }}>
                SECTION {slide.sectionNumber}
              </div>

              {/* Main headline */}
              <h2 className="text-5xl sm:text-6xl font-black mb-4 text-center" style={{ color: currentColor }}>
                {slide.headline}
              </h2>

              {/* Subtitle/description */}
              {slide.content && (
                <p className="text-lg text-white/70 max-w-2xl text-center font-light">
                  {slide.content}
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (isTitleSlide) {
      return (
        <div className="min-h-[50vh] md:min-h-[70vh]">
          {renderSectionIndicator()}
          <div className="flex flex-col items-center justify-center text-center min-h-[calc(70vh-4rem)]">
            <h2 className="text-4xl sm:text-5xl font-black mb-4" style={{ color: currentColor }}>
              {slide.headline}
            </h2>
            {slide.content && (
              <p className="text-lg sm:text-xl text-white/80 max-w-3xl mb-6">
                {slide.content}
              </p>
            )}
          </div>
        </div>
      );
    }

    if (slide.type === 'demo') {
      return (
        <div className="min-h-[50vh] md:min-h-[70vh]">
          {renderSectionIndicator()}
          <div className="min-h-[calc(70vh-4rem)]">
            <h2 className="text-3xl font-bold mb-3" style={{ color: currentColor }}>
              {slide.headline}
            </h2>
            {slide.demos && renderDemo(slide.demos)}
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-[50vh] md:min-h-[70vh]">
        {renderSectionIndicator()}
        <div className="flex flex-col justify-center min-h-[calc(70vh-3rem)] relative">
          {/* Phase badge - only show for problem/solution/impact slides */}
          {(slide.type === 'problem' || slide.type === 'solution' || slide.type === 'impact') && (
            <div className="absolute top-0 right-0">
              <PhaseBadge phase={slide.type} color={currentColor} />
            </div>
          )}

          <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: currentColor }}>
            {slide.headline}
          </h2>
        {slide.content && !contentBullets && (
          <p className="text-lg text-white/80 mb-6 max-w-4xl leading-relaxed whitespace-pre-line">
            {renderTextWithLinks(slide.content)}
          </p>
        )}
        {contentBullets && (
          <div className="grid gap-3 mb-8 max-w-4xl">
            {contentBullets.map((bullet, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 bg-gray-800 border border-gray-600 rounded-lg
                           hover:border-gray-500 transition-colors"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2"
                     style={{
                       backgroundColor: `${currentColor}10`,
                       borderColor: `${currentColor}30`
                     }}>
                  <span className="text-xs font-mono font-bold" style={{ color: currentColor }}>
                    {i + 1}
                  </span>
                </div>
                <span className="text-base text-gray-100 leading-relaxed">{bullet}</span>
              </div>
            ))}
          </div>
        )}

        {/* Impact metric box */}
        {slide.type === 'impact' && slide.visual?.type === 'stat' && (
          <div className="mt-6 p-6 rounded-lg bg-white/5 border border-white/10">
            <div className="text-5xl font-bold mb-2" style={{ color: currentColor }}>
              {slide.visual.data?.value}
            </div>
            <div className="text-white/60">{slide.visual.data?.label}</div>
          </div>
        )}

        {/* Diagram/Component rendering */}
        {slide.visual?.type === 'component' && slide.visual.component && (
          <div className="mt-8">
            {(() => {
              const Component = DEMO_COMPONENTS[slide.visual.component];
              if (!Component) {
                return (
                  <div className="p-6 rounded-lg bg-white/5 border border-white/10 text-center">
                    <div className="text-white/60">Component: {slide.visual.component}</div>
                  </div>
                );
              }

              // Pass navigation props to ModulesIntroSlide
              if (slide.visual.component === 'ModulesIntroSlide') {
                const handleModuleClick = (moduleId: string) => {
                  const moduleToSectionIndex: Record<string, number> = {
                    'nil-platform': 3,
                    'interactive-pitch': 4,
                    'video-digital-twins': 2,
                    'amplify-ai': 5
                  };
                  const sectionIndex = moduleToSectionIndex[moduleId];
                  if (sectionIndex !== undefined) {
                    goToSection(sectionIndex);
                  }
                };
                return <Component onModuleClick={handleModuleClick} />;
              }

              return <Component />;
            })()}
          </div>
        )}

        {/* Deep Dive Content - Terminal Republic card styling */}
        {slide.deepDive && (
          <div className={slide.visual ? "mt-8" : "mt-12"}>
            {/* Wrap in body-variant card - matching exact style from screenshot */}
            <div className="bg-[#1e293b] border border-[#334155] rounded-lg p-6 shadow-md w-full">
              {/* Header with terminal styling */}
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-[#334155]">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wide">
                  {slide.deepDive.title}
                </h3>
              </div>

              {/* Sections with comfortable spacing */}
              <div className="space-y-5">
                {slide.deepDive.sections.map((section, i) => (
                  <div key={i} className="border-l-2 pl-4"
                       style={{ borderColor: `${currentColor}40` }}>
                    <h4 className="text-base font-semibold mb-2" style={{ color: currentColor }}>
                      {section.title}
                    </h4>
                    <p className="text-sm text-white leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Global ASCII Grid Background - Subtle on all slides */}
      <div className="fixed inset-0 pointer-events-none">
        <ASCIIUnifiedGrid
          opacity={0.04}
          animated={true}
          colorTheme={{
            colors: [currentColor, currentColor, currentColor],
            name: 'current-section',
            primary: currentColor,
            description: 'Current section color theme'
          }}
          charSet="depth"
        />
      </div>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-[100]">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${((activeSection * 100) / sections.length) + ((activeSlide / totalSlides) * (100 / sections.length))}%`,
            backgroundColor: currentColor,
          }}
        />
      </div>

      {/* Main content area - full width, centered content with max-width */}
      <div className="relative pt-8 pb-16 z-10">
        <div className="px-2 sm:px-8 max-w-6xl mx-auto">
          {renderSlideContent(currentSlide)}
        </div>
      </div>

    </div>
  );
}
