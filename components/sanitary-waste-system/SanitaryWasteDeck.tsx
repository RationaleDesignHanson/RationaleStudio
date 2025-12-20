/**
 * Sanitary Waste System Pitch Deck Component
 *
 * Interactive presentation deck for IP development fundraising
 * Linear slide-by-slide format with keyboard navigation
 * Following RationalePitchDeck pattern
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { sanitaryWasteSections, SECTION_COLORS, type SanitaryWasteSection, type SanitaryWasteSlide } from '@/lib/content/sanitary-waste-system';
import dynamic from 'next/dynamic';
import { logger } from '@/lib/utils/logger';

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
  ProductSystemDiagram: dynamic(() => import('./diagrams/ProductSystemDiagram'), { loading: () => <LoadingComponent /> }),
  DisgustBarrierDiagram: dynamic(() => import('./diagrams/DisgustBarrierDiagram'), { loading: () => <LoadingComponent /> }),
  DispenserFlowDemo: dynamic(() => import('./diagrams/DispenserFlowDemo'), { loading: () => <LoadingComponent /> }),
  RazorBladeEconomicsDiagram: dynamic(() => import('./diagrams/RazorBladeEconomicsDiagram'), { loading: () => <LoadingComponent /> }),
  ManufacturingFlowDiagram: dynamic(() => import('./diagrams/ManufacturingFlowDiagram'), { loading: () => <LoadingComponent /> }),
  SupplyChainEconomicsDiagram: dynamic(() => import('./diagrams/SupplyChainEconomicsDiagram'), { loading: () => <LoadingComponent /> }),
  CompetitivePositioningDiagram: dynamic(() => import('./diagrams/CompetitivePositioningDiagram'), { loading: () => <LoadingComponent /> }),
  RetailBetaTimelineDiagram: dynamic(() => import('./diagrams/RetailBetaTimelineDiagram'), { loading: () => <LoadingComponent /> }),
  UnitEconomicsDetailDiagram: dynamic(() => import('./diagrams/UnitEconomicsDetailDiagram'), { loading: () => <LoadingComponent /> }),
  RoadmapTimelineDiagram: dynamic(() => import('./diagrams/RoadmapTimelineDiagram'), { loading: () => <LoadingComponent /> }),
  SeedMetricsDashboard: dynamic(() => import('./diagrams/SeedMetricsDashboard'), { loading: () => <LoadingComponent /> }),
  StagedFundingDiagram: dynamic(() => import('./diagrams/StagedFundingDiagram'), { loading: () => <LoadingComponent /> }),
};

export default function SanitaryWasteDeck() {
  const sections = sanitaryWasteSections;
  const [activeSection, setActiveSection] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSectionMenu, setShowSectionMenu] = useState(false);
  const slideContainerRef = useRef<HTMLDivElement>(null);

  const currentSection = sections[activeSection];
  const currentSlide = currentSection.slides[activeSlide];
  const totalSlides = currentSection.slides.length;
  const currentColor = currentSection.color;

  // Calculate global slide position
  const getGlobalSlideIndex = () => {
    let index = 0;
    for (let i = 0; i < activeSection; i++) {
      index += sections[i].slides.length;
    }
    return index + activeSlide;
  };

  const getTotalSlideCount = () => {
    return sections.reduce((sum, section) => sum + section.slides.length, 0);
  };

  // Load state from localStorage on mount
  useEffect(() => {
    const savedSection = localStorage.getItem('sanitaryWasteDeck_section');
    const savedSlide = localStorage.getItem('sanitaryWasteDeck_slide');

    if (savedSection !== null) setActiveSection(parseInt(savedSection, 10));
    if (savedSlide !== null) setActiveSlide(parseInt(savedSlide, 10));
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sanitaryWasteDeck_section', activeSection.toString());
    localStorage.setItem('sanitaryWasteDeck_slide', activeSlide.toString());
  }, [activeSection, activeSlide]);

  // Scroll to top on slide change
  useEffect(() => {
    slideContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSlide, activeSection]);

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
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'Escape' && isFullscreen) {
        e.preventDefault();
        exitFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Touch/swipe gesture support with improved detection and haptic feedback
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    const minSwipeDistance = 50;
    const maxSwipeTime = 300; // ms
    const verticalScrollThreshold = 30; // px

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
      touchStartTime = Date.now();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const touchEndTime = Date.now();

      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      const deltaTime = touchEndTime - touchStartTime;

      // Only trigger if:
      // 1. Horizontal swipe is dominant (2:1 ratio)
      // 2. Meets distance threshold
      // 3. Fast swipe (not slow drag)
      // 4. Not vertical scroll attempt
      const isHorizontalDominant = Math.abs(deltaX) > Math.abs(deltaY) * 2;
      const meetsDistance = Math.abs(deltaX) > minSwipeDistance;
      const isFastSwipe = deltaTime < maxSwipeTime;
      const notVerticalScroll = Math.abs(deltaY) < verticalScrollThreshold;

      if (isHorizontalDominant && meetsDistance && isFastSwipe && notVerticalScroll) {
        // Haptic feedback
        if ('vibrate' in navigator) {
          navigator.vibrate(10);
        }

        // Trigger slide change
        if (deltaX > 0) {
          previousSlide();
        } else {
          nextSlide();
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  });

  const nextSlide = () => {
    if (activeSlide < totalSlides - 1) {
      setActiveSlide(activeSlide + 1);
    } else {
      nextSection();
    }
  };

  const previousSlide = () => {
    if (activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
    } else {
      previousSection();
    }
  };

  const nextSection = () => {
    if (activeSection < sections.length - 1) {
      setActiveSection(activeSection + 1);
      setActiveSlide(0);
    }
  };

  const previousSection = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
      setActiveSlide(0);
    }
  };

  const goToSection = (index: number) => {
    setActiveSection(index);
    setActiveSlide(0);
  };

  // Fullscreen functionality
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        logger.log('Error attempting to enable fullscreen:', err);
      });
    } else {
      exitFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    } else {
      setIsFullscreen(false);
    }
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
    <div className="min-h-screen bg-[#F5F1E8] text-[#2D2D2D] overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <ASCIIUnifiedGrid
          opacity={0.11}
          animated={true}
          colorTheme={{
            name: 'Sanitary System',
            colors: ['#F4A261', '#E76F51', '#E85D42'],
            primary: '#E85D42',
            description: 'Warm orange with tomato accents'
          }}
          charSet="shapes"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation Bar - Desktop */}
        <div className="hidden md:block fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              {/* Left: Exit */}
              <a
                href="/clients/work"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[#2D2D2D]/60 hover:text-[#E85D42] transition-all group"
                aria-label="Exit to work portfolio"
              >
                <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-medium">Work</span>
              </a>

              {/* Center: Slide counter & pagination dots */}
              <div className="flex items-center gap-4">
                {/* Section Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowSectionMenu(!showSectionMenu)}
                    onBlur={() => setTimeout(() => setShowSectionMenu(false), 200)}
                    className="flex items-center gap-1.5 text-xs font-medium text-[#2D2D2D]/50 uppercase tracking-wider hover:text-[#E85D42] transition-colors"
                  >
                    {currentSection.title}
                    <svg className={`w-3 h-3 transition-transform ${showSectionMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showSectionMenu && (
                    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[200px] z-50">
                      {sections.map((section, index) => (
                        <button
                          key={section.id}
                          onClick={() => {
                            goToSection(index);
                            setShowSectionMenu(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                            index === activeSection
                              ? 'bg-[#E85D42]/10 text-[#E85D42] font-medium'
                              : 'text-[#2D2D2D]/70 hover:bg-gray-50'
                          }`}
                        >
                          {section.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="h-3 w-px bg-gray-200"></div>
                <div className="flex items-center gap-1.5">
                  {sections[activeSection].slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSlide(index)}
                      className={`transition-all ${
                        index === activeSlide
                          ? 'h-1.5 w-6 bg-[#E85D42] rounded-full'
                          : 'h-1.5 w-1.5 bg-gray-300 rounded-full hover:bg-[#E85D42]/50'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="h-3 w-px bg-gray-200"></div>
                <div className="text-xs font-medium text-[#2D2D2D]/40 tabular-nums">
                  {getGlobalSlideIndex() + 1} / {getTotalSlideCount()}
                </div>
              </div>

              {/* Right: Controls */}
              <div className="flex items-center gap-2">
                <button
                  disabled={activeSlide === 0 && activeSection === 0}
                  onClick={previousSlide}
                  className="p-1.5 rounded-lg text-[#2D2D2D]/60 hover:text-[#E85D42] hover:bg-[#E85D42]/5 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-[#2D2D2D]/60 disabled:hover:bg-transparent transition-all"
                  aria-label="Previous slide"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  disabled={activeSlide === sections[activeSection].slides.length - 1 && activeSection === sections.length - 1}
                  onClick={nextSlide}
                  className="p-1.5 rounded-lg text-[#2D2D2D]/60 hover:text-[#E85D42] hover:bg-[#E85D42]/5 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-[#2D2D2D]/60 disabled:hover:bg-transparent transition-all"
                  aria-label="Next slide"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <div className="h-4 w-px bg-gray-200 mx-1"></div>

                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded-lg text-[#2D2D2D]/60 hover:text-[#E85D42] hover:bg-[#E85D42]/5 transition-all"
                  aria-label={isFullscreen ? "Exit fullscreen (Esc)" : "Enter fullscreen (F)"}
                  title={isFullscreen ? "Exit fullscreen (Esc)" : "Fullscreen (F)"}
                >
                  {isFullscreen ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Minimal */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-[100] bg-white backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="px-4 py-2 flex items-center justify-between">
            <a
              href="/clients/work"
              className="p-3 -ml-3 text-[#2D2D2D]/60 hover:text-[#E85D42] transition-colors"
              aria-label="Exit to work portfolio"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </a>

            {/* Mobile Section Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSectionMenu(!showSectionMenu)}
                onBlur={() => setTimeout(() => setShowSectionMenu(false), 200)}
                className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-xs font-medium text-[#2D2D2D]/70 uppercase tracking-wider active:bg-gray-200 transition-colors"
                aria-label="Open section menu"
              >
                <span className="text-[#2D2D2D]/50">Sections</span>
                <span className="text-[#E85D42] font-bold">{getGlobalSlideIndex() + 1} / {getTotalSlideCount()}</span>
                <svg className={`w-3 h-3 transition-transform ${showSectionMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showSectionMenu && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[180px] z-50">
                  {sections.map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        goToSection(index);
                        setShowSectionMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                        index === activeSection
                          ? 'bg-[#E85D42]/10 text-[#E85D42] font-medium'
                          : 'text-[#2D2D2D]/70'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={toggleFullscreen}
              className="p-3 -mr-3 text-[#2D2D2D]/60 hover:text-[#E85D42] transition-colors"
              aria-label="Toggle fullscreen"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Slide Content */}
        <div ref={slideContainerRef} className="flex-1 pt-16 md:pt-20 lg:pt-24 pb-16 md:pb-20 px-4 sm:px-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            {/* Slide Header */}
            <div className={`${currentSlide.slideNumber === 1 ? 'mb-8 md:mb-12 text-center' : 'mb-6 md:mb-8'}`}>
              {/* Navigation Chevrons + Header - Hide on opening slide for cleaner look */}
              {currentSlide.slideNumber !== 1 && (
                <div className="hidden md:flex items-center gap-6 mb-4">
                  {/* Left Chevron */}
                  <button
                    disabled={activeSlide === 0 && activeSection === 0}
                    onClick={previousSlide}
                    className="flex-shrink-0 p-3 rounded-full text-[#2D2D2D]/60 hover:text-[#E85D42] hover:bg-[#E85D42]/5 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:text-[#2D2D2D]/60 disabled:hover:bg-transparent transition-all"
                    aria-label="Previous slide"
                  >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Slide Info */}
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className="h-1 w-12 rounded-full bg-[#E85D42]"
                    />
                    <span className="text-sm text-[#2D2D2D]/60 font-medium">
                      {currentSection.title} • Slide {activeSlide + 1} of {totalSlides}
                    </span>
                  </div>

                  {/* Right Chevron */}
                  <button
                    disabled={activeSlide === sections[activeSection].slides.length - 1 && activeSection === sections.length - 1}
                    onClick={nextSlide}
                    className="flex-shrink-0 p-3 rounded-full text-[#2D2D2D]/60 hover:text-[#E85D42] hover:bg-[#E85D42]/5 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:text-[#2D2D2D]/60 disabled:hover:bg-transparent transition-all"
                    aria-label="Next slide"
                  >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Mobile: Original header without chevrons - Hide on opening slide */}
              {currentSlide.slideNumber !== 1 && (
                <div className="md:hidden flex items-center gap-3 mb-3">
                  <div
                    className="h-1 w-12 rounded-full bg-[#E85D42]"
                  />
                  <span className="text-xs md:text-sm text-[#2D2D2D]/60 font-medium">
                    {currentSection.title} • Slide {activeSlide + 1} of {totalSlides}
                  </span>
                </div>
              )}

              {/* Opening slide - Special treatment */}
              {currentSlide.slideNumber === 1 ? (
                <>
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-[0.9] mb-6 sm:mb-8 text-[#E85D42] mx-auto">
                    {currentSlide.headline}
                  </h1>
                  {currentSlide.subheadline && (
                    <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-medium leading-tight text-[#2D2D2D] mb-10 sm:mb-14 max-w-4xl mx-auto">
                      {currentSlide.subheadline}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold tracking-tight leading-[1.1] mb-6 sm:mb-8 text-[#2D2D2D]">
                    {currentSlide.headline}
                  </h1>
                  {currentSlide.subheadline && (
                    <p className="text-lg sm:text-xl lg:text-2xl font-normal leading-snug text-[#2D2D2D]/70 mb-10 sm:mb-12">
                      {currentSlide.subheadline}
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Slide Body */}
            <div className={`space-y-8 sm:space-y-10 ${currentSlide.slideNumber === 1 ? 'text-center' : ''}`}>
              {/* Content paragraphs */}
              {currentSlide.content && currentSlide.content.map((paragraph, index) => (
                <p key={index} className={`text-base sm:text-lg text-[#2D2D2D]/80 leading-snug mb-4 last:mb-0 ${currentSlide.slideNumber === 1 ? 'text-lg sm:text-xl lg:text-2xl mx-auto max-w-4xl' : 'max-w-3xl'}`}>
                  {paragraph}
                </p>
              ))}

              {/* Bullets */}
              {currentSlide.bullets && (
                <div className="mt-8 sm:mt-10">
                  <ul className="space-y-3 sm:space-y-4 ml-0">
                    {currentSlide.bullets.map((bullet, index) => (
                      <li key={index} className="text-base sm:text-lg text-[#2D2D2D]/80 leading-snug flex items-start gap-4">
                        <span
                          className="mt-1.5 h-2 w-2 rounded-full flex-shrink-0 bg-[#E85D42] ring-2 ring-[#E85D42]/20"
                        />
                        <span className="flex-1">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Visual/Diagram */}
              {currentSlide.visual && (
                <div className={`mt-8 space-y-6 ${currentSlide.slideNumber === 1 ? 'mx-auto' : ''}`}>
                  {currentSlide.visual.type === 'diagram' && currentSlide.visual.component && (
                    <>
                      {renderDiagram(currentSlide.visual.component)}

                      {/* Supplementary image for diagram slides */}
                      {currentSlide.visual.data?.supplementaryImage && (
                        <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                          <img
                            src={currentSlide.visual.data.supplementaryImage.src}
                            alt={currentSlide.visual.data.supplementaryImage.alt}
                            className="w-full h-auto"
                            style={{ maxHeight: '500px', objectFit: 'contain' }}
                          />
                          {currentSlide.visual.data.supplementaryImage.caption && (
                            <div className="px-6 py-4 bg-[#F5F1E8] border-t-2 border-gray-200">
                              <p className="text-sm sm:text-base text-[#2D2D2D]/70 text-center">{currentSlide.visual.data.supplementaryImage.caption}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Product or retail image for diagram slides */}
                      {(currentSlide.visual.data?.productImage || currentSlide.visual.data?.retailImage) && (
                        <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                          <img
                            src={(currentSlide.visual.data?.productImage || currentSlide.visual.data?.retailImage).src}
                            alt={(currentSlide.visual.data?.productImage || currentSlide.visual.data?.retailImage).alt}
                            className="w-full h-auto"
                            style={{ maxHeight: '500px', objectFit: 'contain' }}
                          />
                          {(currentSlide.visual.data?.productImage || currentSlide.visual.data?.retailImage).caption && (
                            <div className="px-6 py-4 bg-[#F5F1E8] border-t-2 border-gray-200">
                              <p className="text-sm sm:text-base text-[#2D2D2D]/70 text-center">{(currentSlide.visual.data?.productImage || currentSlide.visual.data?.retailImage).caption}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                  {currentSlide.visual.type === 'stat' && currentSlide.visual.data && (
                    <div
                      className="bg-white border border-[#E85D42]/20 rounded-2xl p-6 sm:p-8 lg:p-12 text-center"
                      style={{ boxShadow: '0 4px 16px rgba(232,93,66,0.08), 0 0 1px rgba(45,45,45,0.08)' }}
                    >
                      <div className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-3 text-[#E85D42]">
                        {currentSlide.visual.data.primary}
                      </div>
                      <div className="text-lg sm:text-xl text-[#2D2D2D]/80 font-medium">
                        {currentSlide.visual.data.label}
                      </div>
                      {currentSlide.visual.data.secondary && (
                        <div className="text-xs sm:text-sm text-[#2D2D2D]/60 mt-5 pt-5 border-t border-[#2D2D2D]/8">
                          {currentSlide.visual.data.secondary}
                        </div>
                      )}
                    </div>
                  )}
                  {currentSlide.visual.type === 'image' && currentSlide.visual.data && (
                    <>
                      {/* Gallery of images */}
                      {currentSlide.visual.data.gallery ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                          {currentSlide.visual.data.gallery.map((image: any, index: number) => (
                            <div
                              key={index}
                              className="bg-white border border-[#2D2D2D]/8 md:border-2 rounded-xl md:rounded-2xl overflow-hidden transition-[border-color,box-shadow,transform] duration-300 ease-out hover:border-[#E85D42]/40 hover:translate-y-[-2px] group"
                              style={{ boxShadow: '0 2px 8px rgba(45,45,45,0.08), 0 0 1px rgba(45,45,45,0.12)' }}
                            >
                              <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-auto transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                                style={{ maxHeight: '300px', objectFit: 'cover' }}
                              />
                              {image.caption && (
                                <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-b from-[#F5F1E8]/80 to-[#F5F1E8] border-t border-[#2D2D2D]/5">
                                  <p className="text-xs sm:text-sm text-[#2D2D2D]/70 text-center leading-relaxed font-medium">{image.caption}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        /* Single image */
                        <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                          {currentSlide.visual.data.src ? (
                            <img
                              src={currentSlide.visual.data.src}
                              alt={currentSlide.visual.data.alt || currentSlide.visual.data.description || 'Product image'}
                              className="w-full h-auto"
                              style={{ maxHeight: '600px', objectFit: 'contain' }}
                            />
                          ) : (
                            <div className="p-8 text-center">
                              <p className="text-[#2D2D2D]/70 mb-2">{currentSlide.visual.data.description}</p>
                              {currentSlide.visual.data.note && (
                                <p className="text-xs text-[#2D2D2D]/50">{currentSlide.visual.data.note}</p>
                              )}
                            </div>
                          )}
                          {currentSlide.visual.data.caption && (
                            <div className="px-6 py-4 bg-[#F5F1E8] border-t-2 border-gray-200">
                              <p className="text-sm sm:text-base text-[#2D2D2D]/70 text-center">{currentSlide.visual.data.caption}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Deep Dive Content - Integrated as Info Cards */}
              {currentSlide.deepDive && (
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="h-0.5 w-8 rounded-full bg-[#E85D42]"
                    />
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[#E85D42]">
                      {currentSlide.deepDive.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    {currentSlide.deepDive.sections.map((section, index) => {
                      // Check if content looks like a bulleted list (has multiple sentences with colons/periods)
                      const hasBulletStructure = section.content.includes(': $') || section.content.split('. ').length > 2;
                      const bulletItems = hasBulletStructure ? section.content.split('. ').filter(item => item.trim()) : [];

                      return (
                        <div
                          key={index}
                          className="bg-white/95 backdrop-blur-sm border border-[#E85D42]/20 rounded-xl p-4 md:p-5 lg:p-6 transition-[border-color,background-color,transform] duration-300 ease-out hover:bg-white hover:border-[#E85D42]/40 hover:translate-y-[-2px]"
                          style={{ boxShadow: '0 2px 8px rgba(45,45,45,0.08), 0 0 1px rgba(45,45,45,0.12)' }}
                        >
                          <h4 className="text-sm md:text-base font-semibold text-[#2D2D2D] mb-2 flex items-center gap-2.5">
                            <span
                              className="h-2 w-2 rounded-full flex-shrink-0 bg-[#E85D42] ring-2 ring-[#E85D42]/20"
                            />
                            {section.title}
                          </h4>
                          {hasBulletStructure && bulletItems.length > 1 ? (
                            <ul className="space-y-1.5">
                              {bulletItems.map((item, i) => (
                                <li key={i} className="text-sm md:text-base text-[#2D2D2D]/70 leading-snug flex items-start gap-2">
                                  <span className="mt-1.5 h-1 w-1 rounded-full flex-shrink-0 bg-[#E85D42]" />
                                  <span className="flex-1">{item.trim()}{i < bulletItems.length - 1 ? '.' : ''}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm md:text-base text-[#2D2D2D]/70 leading-snug">
                              {section.content}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Notes */}
              {currentSlide.notes && (
                <div className="mt-6 text-sm text-[#2D2D2D]/60 italic border-l-2 border-[#E85D42] pl-4">
                  {currentSlide.notes}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar - Desktop */}
        <div className="hidden md:block fixed bottom-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-md border-t border-gray-200/50">
          <div className="h-0.5 bg-gray-100">
            <div
              className="h-full transition-all duration-300 bg-[#E85D42]"
              style={{
                width: `${((activeSection * 100 + (activeSlide / totalSlides) * 100) / sections.length)}%`
              }}
            />
          </div>
          <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between text-xs">
            <div className="text-[#2D2D2D]/50 font-medium">
              {currentSection.title} • Slide {activeSlide + 1} of {totalSlides}
            </div>
            <div className="text-[#2D2D2D]/40 font-medium">
              ← → slides • ↑ ↓ sections • F fullscreen
            </div>
          </div>
        </div>

        {/* Mobile Bottom Bar - Visual Pagination */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white backdrop-blur-md border-t border-gray-200 shadow-lg">
          <div className="h-1 bg-gray-100">
            <div
              className="h-full transition-all duration-300 bg-[#E85D42]"
              style={{
                width: `${((activeSection * 100 + (activeSlide / totalSlides) * 100) / sections.length)}%`
              }}
            />
          </div>
          <div className="px-4 py-3 flex items-center justify-between gap-4">
            {/* PREV BUTTON */}
            <button
              disabled={activeSlide === 0 && activeSection === 0}
              onClick={previousSlide}
              className="flex-shrink-0 p-3 rounded-full text-[#2D2D2D]/60 hover:text-[#E85D42] active:bg-[#E85D42]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* CENTER: Visual pagination + section info */}
            <div className="flex-1 flex flex-col items-center gap-2">
              {/* Visual pagination dots - non-interactive, elegant */}
              <div className="flex items-center justify-center gap-2">
                {sections[activeSection].slides.slice(0, 7).map((_, index) => (
                  <div
                    key={index}
                    className={`transition-all ${
                      index === activeSlide
                        ? 'h-1.5 w-6 bg-[#E85D42] rounded-full'
                        : 'h-1.5 w-1.5 bg-gray-300 rounded-full'
                    }`}
                    aria-hidden="true"
                  />
                ))}
                {sections[activeSection].slides.length > 7 && (
                  <span className="text-gray-400 text-xs">+{sections[activeSection].slides.length - 7}</span>
                )}
              </div>

              {/* Section title + hint */}
              <div className="flex items-center justify-between w-full text-xs text-[#2D2D2D]/50 uppercase tracking-wide">
                <span className="font-medium">{currentSection.title}</span>
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  Swipe
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </div>

            {/* NEXT BUTTON */}
            <button
              disabled={activeSlide === sections[activeSection].slides.length - 1 && activeSection === sections.length - 1}
              onClick={nextSlide}
              className="flex-shrink-0 p-3 rounded-full text-[#2D2D2D]/60 hover:text-[#E85D42] active:bg-[#E85D42]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
