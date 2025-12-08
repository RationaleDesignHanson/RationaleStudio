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
import { ChevronLeft, ChevronRight, Download, Home } from 'lucide-react';
import Link from 'next/link';

// Dynamically import diagram components
const WhatYouveBuiltDiagram = dynamic(() => import('./diagrams/WhatYouveBuiltDiagram'), { ssr: false });
const CriticalGapDiagram = dynamic(() => import('./diagrams/CriticalGapDiagram'), { ssr: false });
const CriticalPathDiagram = dynamic(() => import('./diagrams/CriticalPathDiagram'), { ssr: false });
const DecisionFrameworkDiagram = dynamic(() => import('./diagrams/DecisionFrameworkDiagram'), { ssr: false });
const BuildItYourselfDiagram = dynamic(() => import('./diagrams/BuildItYourselfDiagram'), { ssr: false });

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

  const renderBullets = (bullets?: string[]) => {
    if (!bullets || bullets.length === 0) return null;

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
              <div className="flex-shrink-0 text-blue-400 mt-1.5">•</div>
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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
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
                href="/clients/creait"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors text-sm"
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
        {/* Slide Progress Bar */}
        <div className="mb-8">
          <div className="flex gap-1">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                  index === currentSlideIndex
                    ? 'bg-blue-500'
                    : index < currentSlideIndex
                    ? 'bg-blue-500/50'
                    : 'bg-gray-700'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Slide Content */}
        <div className="bg-slate-900/40 backdrop-blur-sm rounded-xl border border-gray-800 p-8 md:p-12 min-h-[600px]">
          {/* Title */}
          <div className="mb-8">
            <div className="inline-block px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
              {currentSlide.id.replace(/-/g, ' ')}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {currentSlide.title}
            </h2>
            {currentSlide.subtitle && (
              <p className="text-xl text-gray-400">
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
          {renderBullets(currentSlide.bullets)}

          {/* Diagram */}
          {renderDiagram(currentSlide.diagram)}

          {/* Evidence */}
          {renderEvidence(currentSlide)}

          {/* Note */}
          {currentSlide.note && (
            <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 text-blue-400 mt-0.5"></div>
                <div className="text-sm text-gray-300 italic">
                  {currentSlide.note}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={previousSlide}
            disabled={currentSlideIndex === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-700 hover:border-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 font-semibold"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          <div className="text-sm text-gray-500">
            Use arrow keys to navigate
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlideIndex === totalSlides - 1}
            className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-blue-500 hover:border-blue-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-blue-400"
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Navigation (Footer) */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
            Jump to Slide
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`p-3 rounded-lg border text-left transition-all duration-300 ${
                  index === currentSlideIndex
                    ? 'border-2 border-blue-500 bg-blue-500/10'
                    : 'border-gray-800 hover:border-gray-700 bg-slate-900/40'
                }`}
              >
                <div className="text-xs text-gray-500 mb-1">
                  {index + 1}. {slide.id.replace(/-/g, ' ')}
                </div>
                <div className="text-sm font-semibold text-white line-clamp-2">
                  {slide.title}
                </div>
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
