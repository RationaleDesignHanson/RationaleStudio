'use client';

import { Section, Slide } from '@/lib/athletes-first/content-v2';
import {
  ProblemSlide,
  SolutionSlide,
  DemoSlide,
  ImpactSlide,
  CustomSlide
} from './slides';
import TabbedDemo from './TabbedDemo';
import DeepDiveAccordion from './DeepDiveAccordion';
import ImageCarousel from './ImageCarousel';
import AgencyParadoxMatrix from './diagrams/AgencyParadoxMatrix';
import BreakthroughDiagram from './diagrams/BreakthroughDiagram';
import ModulesOverviewSlide from './ModulesOverviewSlide';
import PilotTimelineSlide from './PilotTimelineSlide';
import AgencyParadoxDiagram from './diagrams/AgencyParadoxDiagram';
import ThreeBottlenecksDiagram from './diagrams/ThreeBottlenecksDiagram';
import StatusQuoCeilingDiagram from './diagrams/StatusQuoCeilingDiagram';
import NILComplexityDiagram from './diagrams/NILComplexityDiagram';
import DigitalTwinFlowDiagram from './diagrams/DigitalTwinFlowDiagram';

// Import existing demo components (we'll need to map these)
// These will be dynamically imported based on the component name
const DEMO_COMPONENTS: Record<string, React.ComponentType<any>> = {
  AgencyParadoxMatrix,
  BreakthroughDiagram,
  ModulesOverviewSlide,
  PilotTimelineSlide,
  AgencyParadoxDiagram,
  ThreeBottlenecksDiagram,
  StatusQuoCeilingDiagram,
  NILComplexityDiagram,
  DigitalTwinFlowDiagram,
};

interface SectionRendererProps {
  section: Section;
}

function renderVisual(visual: Slide['visual']) {
  if (!visual) return null;

  switch (visual.type) {
    case 'stat':
      return (
        <div className="text-center">
          <div className="text-6xl md:text-8xl font-bold text-blue-400 mb-4">
            {visual.data?.value}
          </div>
          <div className="text-xl text-white/60">{visual.data?.label}</div>
        </div>
      );

    case 'icon':
      return (
        <div className="flex justify-center">
          <div className="w-32 h-32 md:w-48 md:h-48 bg-blue-500/10 border-2 border-blue-500/30 rounded-lg flex items-center justify-center">
            <span className="text-blue-400 text-sm">{visual.name}</span>
          </div>
        </div>
      );

    case 'diagram':
    case 'chart':
      // Map diagram names to actual image paths
      const diagramPaths: Record<string, string> = {
        'amplify-ai-flow': '/athletes-first/diagrams/AmplifyAI Flow.png',
        'digital-twin-flow': '/athletes-first/diagrams/Digital Twin Flow.png',
      };
      const imageSrc = diagramPaths[visual.name || ''];

      if (imageSrc) {
        return (
          <div className="flex justify-center">
            <img
              src={imageSrc}
              alt={visual.name?.replace(/-/g, ' ') || 'Diagram'}
              className="w-full h-auto rounded-lg"
            />
          </div>
        );
      }

      return (
        <div className="bg-neutral-900 border border-white/10 rounded-lg p-8">
          <div className="text-center text-white/40 text-sm">
            {visual.type.toUpperCase()}: {visual.name}
          </div>
          <div className="text-xs text-white/20 mt-2 text-center">
            (Visual placeholder - to be replaced with actual {visual.type})
          </div>
        </div>
      );

    case 'component':
      // Render demo component
      const DemoComponent = visual.component ? DEMO_COMPONENTS[visual.component] : null;
      if (DemoComponent) {
        return <DemoComponent />;
      }
      return (
        <div className="bg-neutral-900 border border-cyan-500/30 rounded-lg p-8">
          <div className="text-center text-cyan-400 text-sm">
            INTERACTIVE DEMO: {visual.component}
          </div>
          <div className="text-xs text-white/20 mt-2 text-center">
            (Demo component to be integrated)
          </div>
        </div>
      );

    case 'image':
      const imageFullPath = `/athletes-first/diagrams/${visual.name}`;

      return (
        <div className="flex justify-center">
          <img
            src={imageFullPath}
            alt={visual.name?.replace(/\.[^/.]+$/, '').replace(/-/g, ' ')}
            className="w-full h-auto rounded-lg"
          />
        </div>
      );

    default:
      return null;
  }
}

function renderSlide(slide: Slide, index: number, totalSlides: number) {
  const visual = renderVisual(slide.visual);

  switch (slide.type) {
    case 'problem':
      return (
        <ProblemSlide
          key={slide.id}
          headline={slide.headline}
          content={slide.content || ''}
          visual={visual}
          slideIndex={index}
          totalSlides={totalSlides}
        />
      );

    case 'solution':
      return (
        <SolutionSlide
          key={slide.id}
          headline={slide.headline}
          content={slide.content || ''}
          visual={visual}
          slideIndex={index}
          totalSlides={totalSlides}
        />
      );

    case 'demo':
      return (
        <DemoSlide key={slide.id}>
          {/* Use TabbedDemo if slide has demos array, otherwise use old visual logic */}
          {slide.demos && slide.demos.length > 0 ? (
            <TabbedDemo demos={slide.demos} headline={slide.headline} />
          ) : (
            <div className="flex items-start justify-center px-6 md:px-12 pt-4 lg:pt-0 pb-12 md:pb-16">
              <div className="max-w-6xl w-full">
                {visual}
              </div>
            </div>
          )}
        </DemoSlide>
      );

    case 'impact':
      return (
        <ImpactSlide
          key={slide.id}
          headline={slide.headline}
          content={slide.content || ''}
          visual={visual}
          slideIndex={index}
          totalSlides={totalSlides}
        />
      );

    case 'custom':
      return (
        <CustomSlide key={slide.id} label={slide.type.toUpperCase()}>
          <div className="flex items-start justify-center px-6 md:px-12 pt-4 lg:pt-0 pb-12 md:pb-16">
            <div className="max-w-5xl w-full">
              {slide.content && (
                <p className="text-xl md:text-2xl text-white/80 mb-8 md:mb-12">
                  {slide.content}
                </p>
              )}
              {visual}
            </div>
          </div>
        </CustomSlide>
      );

    default:
      return null;
  }
}

// Helper function to check if a slide has an image with caption
// Excludes slides with deep dives and demo slides - they should render individually
function isImageSlide(slide: Slide): boolean {
  // Don't group demo slides into carousels
  if (slide.type === 'demo') {
    return false;
  }

  // Don't group slides that have deep dives - they need to render individually
  if (slide.deepDive) {
    return false;
  }

  return (
    (slide.visual?.type === 'image' || slide.visual?.type === 'diagram' || slide.visual?.type === 'chart') &&
    !!slide.content
  );
}

// Helper function to group consecutive image slides
function groupSlides(slides: Slide[]): Array<Slide | Slide[]> {
  const grouped: Array<Slide | Slide[]> = [];
  let currentGroup: Slide[] = [];

  for (const slide of slides) {
    if (isImageSlide(slide)) {
      currentGroup.push(slide);
    } else {
      // Non-image slide: flush any current group
      if (currentGroup.length > 1) {
        grouped.push(currentGroup);
        currentGroup = [];
      } else if (currentGroup.length === 1) {
        grouped.push(currentGroup[0]);
        currentGroup = [];
      }
      grouped.push(slide);
    }
  }

  // Flush any remaining group
  if (currentGroup.length > 1) {
    grouped.push(currentGroup);
  } else if (currentGroup.length === 1) {
    grouped.push(currentGroup[0]);
  }

  return grouped;
}

// Helper to get image path
function getImagePath(slide: Slide): string {
  if (slide.visual?.type === 'image') {
    return `/athletes-first/diagrams/${slide.visual.name}`;
  } else if (slide.visual?.type === 'diagram' || slide.visual?.type === 'chart') {
    const diagramPaths: Record<string, string> = {
      'amplify-ai-flow': '/athletes-first/diagrams/AmplifyAI Flow.png',
      'digital-twin-flow': '/athletes-first/diagrams/Digital Twin Flow.png',
    };
    return diagramPaths[slide.visual.name || ''] || '';
  }
  return '';
}

export default function SectionRenderer({ section }: SectionRendererProps) {
  // Find any deep dive content in the section
  const deepDiveContent = section.slides.find(slide => slide.deepDive)?.deepDive;

  // Get all slides that should be in carousel (have images and content, excluding demos)
  const carouselSlides = section.slides.filter(slide =>
    slide.visual &&
    slide.content &&
    slide.type !== 'demo' &&
    (slide.visual.type === 'image' || slide.visual.type === 'diagram' || slide.visual.type === 'chart')
  );

  // Get demo slides
  const demoSlides = section.slides.filter(slide => slide.type === 'demo');

  return (
    <section id={section.id} className="relative pt-36 lg:pt-40">
      {/* Carousel - always show if available */}
      {carouselSlides.length > 0 && (
        <div className="relative px-6 md:px-12 pb-8">
          <div className="max-w-5xl mx-auto">
            <ImageCarousel slides={carouselSlides.map(slide => ({
              imageSrc: getImagePath(slide),
              caption: slide.content || '',
              alt: slide.visual?.name?.replace(/\.[^/.]+$/, '').replace(/-/g, ' ') || 'Diagram'
            }))} />
          </div>
        </div>
      )}

      {/* Deep Dive Accordion - always show if available, after carousel */}
      {deepDiveContent && (
        <div className="px-6 md:px-12 pb-8">
          <div className="max-w-5xl mx-auto">
            <DeepDiveAccordion content={deepDiveContent} />
          </div>
        </div>
      )}

      {/* Demo slides - always show if available, after content */}
      {demoSlides.length > 0 && (
        <>
          {/* Divider before demos */}
          <div className="px-6 md:px-12 pb-4">
            <div className="max-w-5xl mx-auto">
              <div className="border-t border-white/10 mb-8"></div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                  <span className="text-cyan-400 font-terminal font-bold text-xs">INTERACTIVE DEMOS</span>
                </div>
              </div>
            </div>
          </div>

          {demoSlides.map((slide, index) => (
            <div key={slide.id} className="relative">
              {renderSlide(slide, index, section.slides.length)}
            </div>
          ))}
        </>
      )}
    </section>
  );
}
