/**
 * CREaiT Strategic Roadmap Presentation
 *
 * Final strategic guidance for CREaiT team
 * Purpose: Help them understand where to focus, with or without Rationale
 * Tone: Strategic partner (collaborative, generous, vendor-neutral)
 * Date: December 2025
 */

'use client';

import React, { useState } from 'react';
import { strategicRoadmap, type Slide } from '@/lib/creait/strategic-roadmap-content';
import dynamic from 'next/dynamic';
import { Home } from 'lucide-react';
import Link from 'next/link';

// Dynamic import for ASCII grid background
const ASCIIUnifiedGrid = dynamic(
  () => import('@/components/visual/ASCIIUnifiedGrid').then(mod => mod.ASCIIUnifiedGrid),
  { ssr: false, loading: () => null }
);

// Dynamically import diagram components
const WhatYouveBuiltDiagram = dynamic(() => import('./diagrams/WhatYouveBuiltDiagram'), { ssr: false });
const CriticalGapDiagram = dynamic(() => import('./diagrams/CriticalGapDiagram'), { ssr: false });
const CriticalPathDiagram = dynamic(() => import('./diagrams/CriticalPathDiagram'), { ssr: false });
const DecisionFrameworkDiagram = dynamic(() => import('./diagrams/DecisionFrameworkDiagram'), { ssr: false });
const BuildItYourselfDiagram = dynamic(() => import('./diagrams/BuildItYourselfDiagram'), { ssr: false });

// Import CollapsibleSection component
const CollapsibleSection = dynamic(() => import('@/components/presentation/CollapsibleSection'), { ssr: false });

const DIAGRAM_COMPONENTS: Record<string, React.ComponentType> = {
  WhatYouveBuiltDiagram,
  CriticalGapDiagram,
  CriticalPathDiagram,
  DecisionFrameworkDiagram,
  BuildItYourselfDiagram,
};

export default function StrategicRoadmapPage() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slides = strategicRoadmap.slides;
  const currentSlide = slides[currentSlideIndex];
  const totalSlides = slides.length;

  const nextSlide = () => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const previousSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlideIndex(index);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') previousSlide();
  };

  // Keyboard navigation
  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown as any);
    return () => window.removeEventListener('keydown', handleKeyDown as any);
  }, [currentSlideIndex]);

  // Touch/swipe navigation
  React.useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      const swipeDistance = touchStartX - touchEndX;

      if (Math.abs(swipeDistance) < minSwipeDistance) return;

      if (swipeDistance > 0) {
        // Swiped left (next slide)
        nextSlide();
      } else {
        // Swiped right (previous slide)
        previousSlide();
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSlideIndex]);

  const renderDiagram = (diagramName?: string) => {
    if (!diagramName) return null;
    const DiagramComponent = DIAGRAM_COMPONENTS[diagramName];
    if (!DiagramComponent) return null;

    return (
      <div className="my-8">
        <DiagramComponent />
      </div>
    );
  };

  const renderEvidence = (slide: Slide) => {
    if (!slide.evidence || slide.evidence.length === 0) return null;

    return (
      <div className="mt-6 p-6 bg-gray-900/40 rounded-lg border border-gray-700">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
          Evidence
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {slide.evidence.map((evidence, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {evidence.status === 'exists' && (
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                )}
                {evidence.status === 'missing' && (
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                )}
                {evidence.status === 'broken' && (
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                )}
                {!evidence.status && (
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                )}
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                  {evidence.label}
                </div>
                <div className="text-sm text-gray-200 font-mono break-all">
                  {evidence.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderBullets = (bullets?: string[], slideId?: string) => {
    if (!bullets || bullets.length === 0) return null;

    // For "build-yourself" slide, group bullets into collapsible sections
    if (slideId === 'build-yourself') {
      const sections: { title: string; bullets: string[] }[] = [];
      let currentSection: { title: string; bullets: string[] } | null = null;

      bullets.forEach((bullet) => {
        // Check if this is a section header (starts with ** and contains "Weeks")
        if (bullet.startsWith('**') && bullet.includes('Weeks')) {
          // Save previous section if exists
          if (currentSection) {
            sections.push(currentSection);
          }
          // Start new section
          currentSection = {
            title: bullet.replace(/\*\*/g, ''),
            bullets: []
          };
        } else if (currentSection) {
          // Add bullet to current section (skip empty strings)
          if (bullet.trim() !== '') {
            currentSection.bullets.push(bullet);
          }
        }
      });

      // Add the last section
      if (currentSection) {
        sections.push(currentSection);
      }

      return (
        <div className="mt-6 space-y-4">
          {sections.map((section, sectionIndex) => (
            <CollapsibleSection
              key={sectionIndex}
              title={section.title}
              defaultExpanded={sectionIndex === 0}
              accentColor="#FFD700"
            >
              <div className="space-y-3">
                {section.bullets.map((bullet, bulletIndex) => {
                  const parts = bullet.split(/(\*\*.*?\*\*)/g);
                  return (
                    <div key={bulletIndex} className="flex items-start gap-3">
                      <div className="flex-shrink-0 text-[#FFD700] mt-1.5">•</div>
                      <div className="text-sm text-gray-300 leading-relaxed">
                        {parts.map((part, i) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return (
                              <span key={i} className="font-semibold text-white">
                                {part.replace(/\*\*/g, '')}
                              </span>
                            );
                          }
                          return <span key={i}>{part}</span>;
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CollapsibleSection>
          ))}
        </div>
      );
    }

    // Default rendering for other slides
    return (
      <div className="mt-6 space-y-3">
        {bullets.map((bullet, index) => {
          // Check if bullet is a header (starts with **)
          if (bullet.startsWith('**') && bullet.endsWith('**')) {
            return (
              <div key={index} className="text-base font-semibold text-white mt-6 first:mt-0">
                {bullet.replace(/\*\*/g, '')}
              </div>
            );
          }

          // Check if bullet is empty (spacing)
          if (bullet.trim() === '') {
            return <div key={index} className="h-2" />;
          }

          // Parse markdown bold within bullets
          const parts = bullet.split(/(\*\*.*?\*\*)/g);
          return (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 text-[#FFD700] mt-1.5">•</div>
              <div className="text-sm text-gray-300 leading-relaxed">
                {parts.map((part, i) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return (
                      <span key={i} className="font-semibold text-white">
                        {part.replace(/\*\*/g, '')}
                      </span>
                    );
                  }
                  return <span key={i}>{part}</span>;
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white relative">
      {/* ASCII Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <ASCIIUnifiedGrid
          opacity={0.04}
          animated={true}
          colorTheme={{
            colors: ['#FFD700', '#FFA500', '#FF8C00'], // Terminal Gold gradient
            name: 'terminal-gold',
            primary: '#FFD700',
            description: 'Terminal Republic gold theme'
          }}
          charSet="depth"
        />
      </div>

      {/* Header */}
      <div className="border-b border-gray-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">{strategicRoadmap.title}</h1>
              <p className="text-sm text-gray-400">{strategicRoadmap.subtitle}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-400">
                Slide {currentSlideIndex + 1} of {totalSlides}
              </div>
              <Link
                href="/work/creait/overview"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors text-sm text-gray-300 hover:text-white"
              >
                <Home className="w-4 h-4" />
                <span>Back</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Slide Content */}
        <div className="bg-slate-900/40 backdrop-blur-sm rounded-xl border border-gray-800 p-8 md:p-12 min-h-[600px]">
          <div key={currentSlideIndex} className="animate-fade-in">
          {/* Navigation Bar - Inside Content Area (Athletes First Style) */}
          <div className="mb-8 flex items-center gap-3 text-white/80 text-sm">
            <button
              onClick={previousSlide}
              disabled={currentSlideIndex === 0}
              className="p-3 rounded hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all min-w-[48px] min-h-[48px] flex items-center justify-center"
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-white/40">{currentSlide.id.replace(/-/g, ' ')}</span>
              <span className="text-white/40">·</span>
              <span className="text-white/60">{currentSlideIndex + 1} of {totalSlides}</span>
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlideIndex === totalSlides - 1}
              className="p-3 rounded hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all min-w-[48px] min-h-[48px] flex items-center justify-center"
              aria-label="Next slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Title - Athletes First Style */}
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: '#FFD700' }}>
              {currentSlide.title}
            </h2>
            {currentSlide.subtitle && (
              <p className="text-lg text-white/70 mt-3">
                {currentSlide.subtitle}
              </p>
            )}
          </div>

          {/* Content */}
          {currentSlide.content && (
            <div className="text-base text-gray-300 leading-relaxed mb-6 whitespace-pre-line">
              {currentSlide.content}
            </div>
          )}

          {/* Bullets */}
          {renderBullets(currentSlide.bullets, currentSlide.id)}

          {/* Diagram */}
          {renderDiagram(currentSlide.diagram)}

          {/* Evidence */}
          {renderEvidence(currentSlide)}

          {/* Note */}
          {currentSlide.note && (
            <div className="mt-8 p-4 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 text-[#FFD700] mt-0.5">💡</div>
                <div className="text-sm text-gray-300 italic">
                  {currentSlide.note}
                </div>
              </div>
            </div>
          )}
          </div>
        </div>

        {/* Slide Navigation (Footer) - Horizontal Section List */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-wrap items-center gap-3 justify-center">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  index === currentSlideIndex
                    ? 'bg-[#FFD700] text-black'
                    : 'bg-gray-800/40 text-gray-300 hover:bg-gray-700/40 border border-gray-700'
                }`}
              >
                {index + 1}. {slide.title}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              {strategicRoadmap.date} • Version {strategicRoadmap.version}
            </div>
            <div className="text-sm text-gray-500">
              Strategic guidance for CREaiT • Vendor-neutral • Evidence-based
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
