# Diagram Mobile Strategy
## Comprehensive Treatment Plan for All 47 Presentation Diagrams

**Generated:** December 10, 2025
**Objective:** Define production-ready mobile implementations for every diagram component with zero technical debt and optimal UX

---

## Executive Summary

### Challenge

**47 diagram components** across the site, categorized by complexity:
- **Simple (2-4 elements):** 10 diagrams - Can be responsive with minor tweaks
- **Medium (5-10 elements):** 19 diagrams - Need mobile variants with progressive disclosure
- **Complex (10+ elements):** 18 diagrams - Require complete mobile redesign

**Critical Issue:** Most diagrams are unreadable on mobile devices:
- Text too small (<12px)
- Landscape orientation doesn't fit portrait mobile screens
- Too much information density
- No touch-friendly interactions

### Solution Framework

**5 Treatment Patterns:**
1. **Responsive SVG** - For simple diagrams (enlarge text, simplify)
2. **Progressive Disclosure** - For medium diagrams (tap to expand details)
3. **Step-by-Step Wizard** - For complex flows (show one step at a time)
4. **Swipeable Carousel** - For multi-module comparisons (swipe between items)
5. **Accordion/Tabs** - For hierarchical information (collapse/expand sections)

**Principles:**
- **Mobile-first:** Design for touch, then enhance for desktop
- **Content parity:** Mobile shows same information, just reorganized
- **Progressive enhancement:** Basic functionality works without JavaScript
- **Zero technical debt:** Reusable patterns, no one-off hacks
- **Performance:** Lazy load diagram components, optimize SVG file sizes

---

## Part 1: Treatment Pattern Library

### Pattern 1: Responsive SVG (Simple Diagrams)

**When to use:**
- 2-4 visual elements
- Minimal text labels
- Clear visual hierarchy
- No complex interactions

**Implementation:**

```typescript
// components/diagrams/ResponsiveDiagram.tsx

interface ResponsiveDiagramProps {
  desktopViewBox: string;  // "0 0 1200 600"
  mobileViewBox: string;   // "0 0 400 600"
  title: string;
  description: string;
  children: React.ReactNode;
}

export function ResponsiveDiagram({
  desktopViewBox,
  mobileViewBox,
  title,
  description,
  children
}: ResponsiveDiagramProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <svg
      viewBox={isMobile ? mobileViewBox : desktopViewBox}
      className="w-full h-auto"
      role="img"
      aria-labelledby="diagram-title diagram-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="diagram-title">{title}</title>
      <desc id="diagram-desc">{description}</desc>

      {/* Render children with mobile-adjusted styles */}
      <g className="diagram-content">
        {children}
      </g>

      <style>{`
        @media (max-width: 768px) {
          /* Increase text size */
          .diagram-text {
            font-size: 16px;  /* Was 12px on desktop */
          }

          /* Increase icon size */
          .diagram-icon {
            transform: scale(1.5);
          }

          /* Simplify colors (fewer variations) */
          .diagram-element-secondary {
            display: none;  /* Hide decorative elements */
          }
        }
      `}</style>
    </svg>
  );
}
```

**Example Usage:**

```typescript
export function SimpleComparisonDiagram() {
  return (
    <ResponsiveDiagram
      desktopViewBox="0 0 1200 400"
      mobileViewBox="0 0 400 600"
      title="Before vs After Comparison"
      description="Side-by-side comparison showing current state versus improved state"
    >
      {/* Desktop: Side-by-side */}
      {/* Mobile: Stacked vertically (via viewBox change) */}
      <g className="before-state" transform="translate(0, 0)">
        <rect className="diagram-element" x="50" y="50" width="200" height="200" />
        <text className="diagram-text" x="150" y="150">Before</text>
      </g>

      <g className="after-state" transform="translate(0, 350)">
        <rect className="diagram-element" x="50" y="50" width="200" height="200" />
        <text className="diagram-text" x="150" y="150">After</text>
      </g>
    </ResponsiveDiagram>
  );
}
```

---

### Pattern 2: Progressive Disclosure (Medium Diagrams)

**When to use:**
- 5-10 visual elements
- Each element has detailed information
- User may want to explore specific parts
- Diagram tells a story with hierarchy

**Implementation:**

```typescript
// components/diagrams/ProgressiveDisclosureDiagram.tsx

interface DiagramElement {
  id: string;
  icon: string;
  title: string;
  summary: string;
  details: string[];
}

interface ProgressiveDisclosureDiagramProps {
  elements: DiagramElement[];
  title: string;
  layout: 'grid' | 'flow';
}

export function ProgressiveDisclosureDiagram({
  elements,
  title,
  layout = 'grid'
}: ProgressiveDisclosureDiagramProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedElement = elements.find(el => el.id === selectedId);

  if (selectedElement) {
    // Detail view
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedId(null)}
          className="flex items-center text-terminal-gold text-sm"
        >
          ← Back to overview
        </button>

        <div className="bg-gray-900/70 border border-terminal-gold/30 rounded-lg p-6">
          <div className="text-6xl text-center mb-4">{selectedElement.icon}</div>
          <h3 className="text-2xl font-bold text-center mb-2">{selectedElement.title}</h3>
          <p className="text-gray-300 text-center mb-6">{selectedElement.summary}</p>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-terminal-gold uppercase tracking-wide">
              Key Features
            </h4>
            {selectedElement.details.map((detail, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="text-terminal-gold text-lg mt-0.5">✓</div>
                <div className="text-base text-gray-200">{detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation to next/prev element */}
        <div className="flex justify-between">
          {elements.indexOf(selectedElement) > 0 && (
            <button
              onClick={() => setSelectedId(elements[elements.indexOf(selectedElement) - 1].id)}
              className="px-4 py-2 bg-gray-800 rounded"
            >
              ← Previous
            </button>
          )}
          <div className="flex-1" />
          {elements.indexOf(selectedElement) < elements.length - 1 && (
            <button
              onClick={() => setSelectedId(elements[elements.indexOf(selectedElement) + 1].id)}
              className="px-4 py-2 bg-gray-800 rounded"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    );
  }

  // Overview grid
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-gray-400">Tap any item to learn more</p>
      </div>

      <div className={cn(
        "grid gap-4",
        layout === 'grid' ? "grid-cols-2" : "grid-cols-1"
      )}>
        {elements.map((element) => (
          <button
            key={element.id}
            onClick={() => setSelectedId(element.id)}
            className="bg-gray-900/70 border border-gray-700 hover:border-terminal-gold/50 rounded-lg p-6 text-center space-y-3 transition-all duration-200 min-h-[200px]"
          >
            <div className="text-5xl">{element.icon}</div>
            <div className="text-lg font-semibold">{element.title}</div>
            <div className="text-sm text-gray-400 line-clamp-2">
              {element.summary}
            </div>
            <div className="text-xs text-terminal-gold">Tap for details →</div>
          </button>
        ))}
      </div>
    </div>
  );
}
```

---

### Pattern 3: Step-by-Step Wizard (Complex Diagrams)

**When to use:**
- 10+ elements with sequential flow
- Process diagram (multi-step)
- Timeline or roadmap
- User needs to understand sequence

**Implementation:**

```typescript
// components/diagrams/StepByStepDiagram.tsx

interface Step {
  id: string;
  title: string;
  description: string;
  visual: React.ReactNode;  // SVG or image
  metrics?: { label: string; value: string }[];
}

interface StepByStepDiagramProps {
  steps: Step[];
  title: string;
  allowNonLinear?: boolean;  // Can jump to any step
}

export function StepByStepDiagram({
  steps,
  title,
  allowNonLinear = false
}: StepByStepDiagramProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = steps[currentStep];

  return (
    <div className="flex flex-col h-full">
      {/* Progress indicator */}
      <div className="sticky top-0 bg-black/90 backdrop-blur-md border-b border-gray-800 p-4 z-10">
        <h2 className="text-lg font-semibold text-center mb-3">{title}</h2>

        {/* Step dots */}
        <div className="flex justify-center gap-2">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => allowNonLinear && setCurrentStep(i)}
              disabled={!allowNonLinear && i !== currentStep}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                i === currentStep ? "w-8 bg-terminal-gold" : "bg-gray-700",
                allowNonLinear && "cursor-pointer hover:bg-gray-500"
              )}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>

        <div className="text-xs text-gray-400 text-center mt-2">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
          <p className="text-base text-gray-300 mb-6">{step.description}</p>

          {/* Visual */}
          <div className="bg-gray-900/50 rounded-lg p-4 mb-6">
            {step.visual}
          </div>

          {/* Metrics (if any) */}
          {step.metrics && step.metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {step.metrics.map((metric, i) => (
                <div key={i} className="bg-gray-900/70 border border-gray-800 rounded-lg p-4">
                  <div className="text-2xl font-bold text-terminal-gold">{metric.value}</div>
                  <div className="text-sm text-gray-400">{metric.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky bottom-0 bg-black/90 backdrop-blur-md border-t border-gray-800 p-4">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <button
            onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
            disabled={currentStep === 0}
            className="px-6 py-3 bg-gray-800 rounded disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
          >
            ← Previous
          </button>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep(0)}
              className="px-6 py-3 bg-terminal-gold text-black rounded min-w-[120px]"
            >
              Start Over
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep(s => Math.min(steps.length - 1, s + 1))}
              className="px-6 py-3 bg-terminal-gold text-black rounded min-w-[120px]"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

### Pattern 4: Swipeable Carousel (Multi-Module Diagrams)

**When to use:**
- Multiple items to compare (modules, products, options)
- Each item is self-contained
- User may want to swipe through quickly
- Touch-friendly interaction desired

**Implementation:**

```typescript
// components/diagrams/SwipeableDiagram.tsx

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface DiagramSlide {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface SwipeableDiagramProps {
  slides: DiagramSlide[];
  title: string;
}

export function SwipeableDiagram({ slides, title }: SwipeableDiagramProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center">{title}</h2>

      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={16}
        slidesPerView={1}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={true}
        className="rounded-lg"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="bg-gray-900/70 border border-gray-700 rounded-lg p-6 min-h-[400px]">
              <h3 className="text-2xl font-bold mb-4 text-center">{slide.title}</h3>
              {slide.content}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <p className="text-sm text-gray-400 text-center">
        Swipe or use arrows to navigate
      </p>
    </div>
  );
}
```

---

### Pattern 5: Accordion/Tabs (Hierarchical Information)

**When to use:**
- Multiple sections of related information
- User doesn't need to see all at once
- Reduce scroll depth
- Clear information hierarchy

**Implementation:**

```typescript
// components/diagrams/AccordionDiagram.tsx

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  icon?: string;
  content: React.ReactNode;
}

interface AccordionDiagramProps {
  sections: Section[];
  title: string;
  defaultOpen?: string;  // ID of section to open by default
}

export function AccordionDiagram({
  sections,
  title,
  defaultOpen
}: AccordionDiagramProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center">{title}</h2>

      <Accordion.Root
        type="single"
        collapsible
        defaultValue={defaultOpen}
        className="space-y-3"
      >
        {sections.map((section) => (
          <Accordion.Item
            key={section.id}
            value={section.id}
            className="bg-gray-900/70 border border-gray-700 rounded-lg overflow-hidden"
          >
            <Accordion.Header>
              <Accordion.Trigger className="flex justify-between items-center w-full p-6 text-left hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  {section.icon && (
                    <span className="text-3xl">{section.icon}</span>
                  )}
                  <span className="text-xl font-semibold">{section.title}</span>
                </div>
                <ChevronDown
                  className="w-5 h-5 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180"
                  aria-hidden
                />
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content className="p-6 pt-0">
              {section.content}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}
```

---

## Part 2: Diagram-by-Diagram Implementation Guide

### 2.1 Athletes First Diagrams (19 diagrams) ⭐ **PRIORITY 0**

#### AF-01: FourModulesSystemDiagram ⭐ **MOST CRITICAL**

**Current State:**
- Desktop: 4 modules in 2×2 grid with connecting lines
- Complex interconnections showing data flow
- ~40+ elements total

**Complexity:** Complex (10+ elements per module)

**Treatment:** Progressive Disclosure Pattern

**Mobile Implementation:**

```typescript
// components/athletes-first/diagrams/FourModulesSystemDiagramMobile.tsx

const modules = [
  {
    id: 'digital-twins',
    icon: '📱',
    title: 'Digital Twins',
    summary: 'AI-powered athlete profiles',
    details: [
      'Automated profile generation from social data',
      'Real-time stats integration (sports APIs)',
      'NIL deal history and brand partnerships',
      'Performance metrics tracking',
      'Media kit generation',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'immersive-pitch',
    icon: '🎥',
    title: 'Immersive Pitch',
    summary: 'Vision Pro spatial experiences',
    details: [
      '3D athlete presentations in spatial computing',
      'Interactive deal scenario modeling',
      'Virtual facility and venue tours',
      'Spatial storytelling with volumetric video',
      'Multi-user collaborative viewing',
    ],
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'recruit-ai',
    icon: '🤖',
    title: 'RecruitAI',
    summary: 'Intelligent deal matching',
    details: [
      'AI-powered brand-athlete compatibility scoring',
      'Automated market rate analysis',
      'Deal structure optimization',
      'Predictive ROI modeling',
      'Smart outreach automation',
    ],
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'analytics',
    icon: '📊',
    title: 'Analytics Suite',
    summary: 'Performance tracking & ROI',
    details: [
      'Campaign performance dashboards',
      'Social engagement metrics',
      'Revenue tracking and attribution',
      'Competitive benchmarking',
      'Custom reporting and exports',
    ],
    color: 'from-yellow-500 to-orange-500',
  },
];

export function FourModulesSystemDiagramMobile() {
  return (
    <ProgressiveDisclosureDiagram
      elements={modules}
      title="4 Integrated Modules"
      layout="grid"
    />
  );
}
```

**Effort:** 2 hours
**Priority:** P0 - Critical (Sales tool)

---

#### AF-02: AgencyParadoxDiagram

**Current State:**
- Side-by-side comparison (Current vs Breakthrough)
- Lists of pain points vs solutions

**Complexity:** Medium (6-8 elements)

**Treatment:** Responsive SVG (stack vertically on mobile)

**Mobile Implementation:**

```typescript
export function AgencyParadoxDiagramMobile() {
  return (
    <div className="space-y-8">
      {/* Current State */}
      <div className="bg-red-900/20 border-2 border-red-500/50 rounded-lg p-6">
        <div className="text-center mb-4">
          <div className="text-5xl mb-2">⚠️</div>
          <h3 className="text-2xl font-bold text-red-400">Current State</h3>
          <p className="text-sm text-gray-400">The Agency Paradox</p>
        </div>

        <ul className="space-y-3">
          {[
            'Manual outreach takes 40+ hours per deal',
            'Generic pitch decks fail to convert',
            'No data on athlete brand fit',
            'Agencies hit revenue ceiling at $2-3M',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-red-500 text-lg mt-0.5">✗</span>
              <span className="text-base">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Arrow */}
      <div className="text-center">
        <div className="text-4xl">↓</div>
        <p className="text-sm text-terminal-gold font-semibold mt-2">
          The Breakthrough
        </p>
      </div>

      {/* Breakthrough State */}
      <div className="bg-terminal-gold/20 border-2 border-terminal-gold/50 rounded-lg p-6">
        <div className="text-center mb-4">
          <div className="text-5xl mb-2">✨</div>
          <h3 className="text-2xl font-bold text-terminal-gold">New Reality</h3>
          <p className="text-sm text-gray-400">AI-Powered NIL Platform</p>
        </div>

        <ul className="space-y-3">
          {[
            'Automated athlete discovery and matching',
            'Immersive Vision Pro pitch experiences',
            'AI-powered deal recommendations',
            'Scale to $10M+ with same team size',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-terminal-gold text-lg mt-0.5">✓</span>
              <span className="text-base">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

**Effort:** 1 hour
**Priority:** P0

---

#### AF-03 through AF-19: Remaining Athletes First Diagrams

**Apply Appropriate Pattern Based on Complexity:**

| Diagram | Pattern | Effort | Priority |
|---------|---------|--------|----------|
| AIAdoptionCurveDiagram | Responsive SVG | 30 min | P1 |
| AmplifyAIProcessDiagram | Step-by-Step | 1.5 hours | P0 |
| AmplifyAITimingDiagram | Swipeable (timeline) | 1 hour | P1 |
| BreakthroughDiagram | Responsive SVG | 30 min | P1 |
| CloseRateImprovementDiagram | Responsive SVG (chart) | 30 min | P1 |
| DealMultiplierDiagram | Responsive SVG | 30 min | P1 |
| DigitalTwinFlowDiagram | Step-by-Step | 2 hours | P0 |
| InfiniteDeploymentDiagram | Responsive SVG | 30 min | P2 |
| InteractivePitchInterfaceDiagram | Swipeable (screenshots) | 1 hour | P1 |
| MarketSaturationDiagram | Responsive SVG (chart) | 30 min | P2 |
| NILComplexityDiagram | Accordion | 1 hour | P1 |
| NILPlatformFlowDiagram | Step-by-Step | 1.5 hours | P1 |
| RevenueUnlockDiagram | Responsive SVG (chart) | 30 min | P2 |
| StatusQuoCeilingDiagram | Responsive SVG | 30 min | P2 |
| SuccessMetricsDiagram | Progressive Disclosure (KPIs) | 1 hour | P0 |
| ThreeBottlenecksDiagram | Accordion | 1 hour | P1 |
| AdoptionWindowDiagram | Responsive SVG (timeline) | 30 min | P2 |

**Total Effort:** 16-18 hours for all Athletes First diagrams

---

### 2.2 CREaiT Diagrams (10 diagrams) ⭐ **PRIORITY 0**

#### CR-01: RoadmapGanttDiagram ⭐ **MOST COMPLEX**

**Current State:**
- Gantt chart with 12+ tasks across 4 quarters
- Dependencies, milestones, phases
- Color-coded by team/category

**Complexity:** Complex (40+ elements)

**Treatment:** Step-by-Step Wizard (by phase)

**Mobile Implementation:**

```typescript
// components/creait/diagrams/RoadmapGanttDiagramMobile.tsx

const phases = [
  {
    id: 'q1-foundation',
    title: 'Q1: Foundation',
    description: 'Core platform development and MVP launch',
    visual: <FoundationPhaseVisual />,  // Simplified SVG
    metrics: [
      { label: 'Tasks', value: '8' },
      { label: 'Duration', value: '12 weeks' },
      { label: 'Team', value: '4 engineers' },
    ],
  },
  {
    id: 'q2-growth',
    title: 'Q2: Growth',
    description: 'User acquisition and feature expansion',
    visual: <GrowthPhaseVisual />,
    metrics: [
      { label: 'Tasks', value: '10' },
      { label: 'Duration', value: '12 weeks' },
      { label: 'Team', value: '6 engineers' },
    ],
  },
  {
    id: 'q3-scale',
    title: 'Q3: Scale',
    description: 'Enterprise features and infrastructure',
    visual: <ScalePhaseVisual />,
    metrics: [
      { label: 'Tasks', value: '12' },
      { label: 'Duration', value: '12 weeks' },
      { label: 'Team', value: '8 engineers' },
    ],
  },
  {
    id: 'q4-revenue',
    title: 'Q4: Revenue',
    description: 'Monetization and partnership integrations',
    visual: <RevenuePhaseVisual />,
    metrics: [
      { label: 'Tasks', value: '9' },
      { label: 'Duration', value: '12 weeks' },
      { label: 'Team', value: '8 engineers' },
    ],
  },
];

export function RoadmapGanttDiagramMobile() {
  return (
    <StepByStepDiagram
      steps={phases}
      title="Product Roadmap"
      allowNonLinear={true}  // Can jump to any quarter
    />
  );
}
```

**Effort:** 2-3 hours
**Priority:** P0 - Critical (Investor pitch)

---

#### CR-02 through CR-10: Remaining CREaiT Diagrams

| Diagram | Pattern | Effort | Priority |
|---------|---------|--------|----------|
| AIScoreFlowDiagram | Step-by-Step | 1.5 hours | P0 |
| BrokerDayDiagram | Swipeable (timeline) | 1 hour | P1 |
| CompetitiveLandscapeDiagram | Progressive Disclosure (2×2 matrix) | 1.5 hours | P1 |
| InvestmentMilestonesDiagram | Responsive SVG (timeline) | 30 min | P1 |
| RevenueRampDiagram | Responsive SVG (chart) | 30 min | P0 |
| TAMFunnelDiagram | Responsive SVG (funnel) | 1 hour | P0 |
| TimingWindowDiagram | Responsive SVG | 30 min | P1 |
| UnitEconomicsFlowDiagram | Step-by-Step | 1.5 hours | P0 |
| ValidationMapDiagram | Progressive Disclosure | 1 hour | P1 |

**Total Effort:** 11-13 hours for all CREaiT diagrams

---

### 2.3 Other Diagram Collections

#### Zero Diagrams (5 diagrams) - **Priority 2**

| Diagram | Pattern | Effort |
|---------|---------|--------|
| AIIntelligenceSystemDiagram | Step-by-Step | 1.5 hours |
| BetaRoadmapTimelineDiagram | Responsive SVG | 30 min |
| InboxJourneyDiagram | Swipeable | 1 hour |
| MicroservicesArchitectureDiagram | Accordion (by layer) | 2 hours |
| SwipeTriageTreeDiagram | Progressive Disclosure | 1 hour |

**Total:** 6 hours

---

#### Heirloom Diagrams (4 diagrams) - **Priority 2**

| Diagram | Pattern | Effort |
|---------|---------|--------|
| IOSFlowDiagram | Step-by-Step | 1 hour |
| ProblemRadialDiagram | Responsive SVG | 30 min |
| TechnicalArchitectureDiagram | Accordion | 1.5 hours |
| UserJourneyDiagram | Swipeable | 1 hour |

**Total:** 4 hours

---

#### Rationale Overview Diagrams (6 diagrams) - **Priority 3**

| Diagram | Pattern | Effort |
|---------|---------|--------|
| CheckpointTimelineDiagram | Responsive SVG | 30 min |
| DecisionPressureDiagram | Responsive SVG | 30 min |
| SpecVsPrototypeDiagram | Responsive SVG (comparison) | 30 min |
| TraditionalVsRationaleDiagram | Accordion | 1 hour |
| ZeroArchitectureDiagram | Accordion | 1 hour |
| ZeroMetricsDiagram | Progressive Disclosure | 1 hour |

**Total:** 4.5 hours

---

## Part 3: Implementation Timeline

### Week 1: Pattern Library + P0 Critical (18-22 hours)

**Day 1-2: Foundation (6-8 hours)**
- [ ] Create pattern library components:
  - ResponsiveDiagram
  - ProgressiveDisclosureDiagram
  - StepByStepDiagram
  - SwipeableDiagram
  - AccordionDiagram
- [ ] Set up Swiper.js (for carousels)
- [ ] Set up Radix UI Accordion
- [ ] Create shared hooks (useMediaQuery)
- [ ] Test patterns with mock data

**Day 3-4: Athletes First Critical (8-10 hours)**
- [ ] FourModulesSystemDiagramMobile (2 hours) ⭐
- [ ] AgencyParadoxDiagramMobile (1 hour) ⭐
- [ ] AmplifyAIProcessDiagramMobile (1.5 hours)
- [ ] DigitalTwinFlowDiagramMobile (2 hours)
- [ ] SuccessMetricsDiagramMobile (1 hour) ⭐

**Day 5: CREaiT Critical (4-5 hours)**
- [ ] RoadmapGanttDiagramMobile (2.5 hours) ⭐
- [ ] UnitEconomicsFlowDiagramMobile (1.5 hours) ⭐
- [ ] RevenueRampDiagramMobile (30 min)

---

### Week 2: Remaining P0 + P1 (16-20 hours)

**Day 1-2: Athletes First Remaining (8-10 hours)**
- [ ] Complete remaining 11 Athletes First diagrams
- [ ] Test all on iPhone SE, iPhone 14, Pixel 7
- [ ] Verify swipe gestures working
- [ ] Check accessibility (screen reader)

**Day 3-4: CREaiT Remaining (6-8 hours)**
- [ ] Complete remaining 7 CREaiT diagrams
- [ ] Integration testing with pitch deck slides
- [ ] Verify navigation between diagrams
- [ ] Performance testing (lazy loading)

**Day 5: Polish (2-3 hours)**
- [ ] Add loading states
- [ ] Add error boundaries
- [ ] Optimize SVG file sizes
- [ ] Add analytics tracking (diagram interactions)

---

### Week 3: P2 Diagrams + Documentation (10-12 hours)

**Day 1-2: Zero + Heirloom (10 hours)**
- [ ] All Zero diagrams (6 hours)
- [ ] All Heirloom diagrams (4 hours)

**Day 3: Rationale Overview (4-5 hours)**
- [ ] All 6 overview diagrams

**Day 4-5: Documentation (4-6 hours)**
- [ ] Component Storybook documentation
- [ ] Developer usage guide
- [ ] Diagram design guidelines (for future diagrams)
- [ ] Accessibility checklist
- [ ] Performance optimization guide

---

## Part 4: Testing & Quality Assurance

### 4.1 Functional Testing Checklist

Per diagram:

- [ ] **Renders correctly on mobile** (375px, 390px, 428px)
- [ ] **Touch interactions work** (tap, swipe, accordion expand)
- [ ] **Navigation functional** (prev/next, back to overview)
- [ ] **Content parity** (same information as desktop)
- [ ] **Performance** (<3s load time, smooth animations)
- [ ] **Accessibility** (keyboard nav, screen reader, ARIA labels)
- [ ] **Error handling** (graceful failure if data missing)

---

### 4.2 Accessibility Requirements

**Keyboard Navigation:**
- Tab through interactive elements
- Enter/Space to activate buttons
- Arrow keys to navigate steps (where applicable)
- Escape to close detail views

**Screen Reader:**
- Meaningful ARIA labels on all interactive elements
- `role="img"` on SVG diagrams with title/desc
- Announce state changes ("Expanded", "Step 2 of 5")
- Skip links to bypass complex diagrams

**Example:**

```typescript
<button
  onClick={() => setSelectedId(element.id)}
  aria-label={`View details for ${element.title}`}
  aria-expanded={selectedId === element.id}
>
  {element.title}
</button>

<div
  role="region"
  aria-live="polite"
  aria-label="Diagram details"
>
  {selectedElement && <DetailView />}
</div>
```

---

### 4.3 Performance Optimization

**Lazy Loading:**

```typescript
// Only load diagram when scrolled into view
const DiagramMobile = dynamic(
  () => import('./FourModulesSystemDiagramMobile'),
  {
    loading: () => <DiagramSkeleton />,
    ssr: false,  // Skip SSR for complex diagrams
  }
);

export function AthleteFirstPitchMobile() {
  return (
    <div>
      {/* ... other content ... */}

      <IntersectionObserver>
        {(inView) => inView && <DiagramMobile />}
      </IntersectionObserver>
    </div>
  );
}
```

**SVG Optimization:**
- Run SVGO on all SVG diagrams
- Remove unused definitions
- Minify paths
- Use symbols for repeated elements

**Bundle Size:**
- Swiper.js: ~20KB (gzipped)
- Radix Accordion: ~5KB (gzipped)
- Custom diagram components: ~30-40KB total (gzipped)
- Target: <100KB additional JS for all diagram patterns

---

## Part 5: Maintenance & Scaling

### 5.1 Adding New Diagrams

**Process:**
1. Determine complexity (simple/medium/complex)
2. Choose appropriate pattern from library
3. Create mobile component in `/diagrams/`
4. Add to presentation page with conditional rendering
5. Test on 3 device sizes
6. Add to Storybook documentation

**Template:**

```typescript
// New diagram template
import { ProgressiveDisclosureDiagram } from '@/components/diagrams/ProgressiveDisclosureDiagram';

const elements = [
  // Define diagram elements
];

export function NewDiagramMobile() {
  return (
    <ProgressiveDisclosureDiagram
      elements={elements}
      title="Diagram Title"
      layout="grid"
    />
  );
}

// Wrapper with device detection
export function NewDiagram() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return isMobile ? <NewDiagramMobile /> : <NewDiagramDesktop />;
}
```

---

### 5.2 Pattern Library Evolution

**When to Create New Pattern:**
- Existing patterns don't fit diagram type
- Similar diagram type appears 3+ times
- User research suggests better interaction model

**Pattern Review Cadence:**
- Quarterly review of diagram analytics
- Monitor user engagement (which patterns used most)
- A/B test alternative patterns
- Gather feedback from sales team (presentation effectiveness)

---

## Part 6: Success Metrics

### 6.1 Quantitative Metrics

**Performance:**
- [ ] All diagrams render in <2s on 3G connection
- [ ] Zero CLS (Cumulative Layout Shift) issues
- [ ] <100KB additional JS bundle size

**Usage:**
- [ ] 80%+ users interact with mobile diagrams (tap to expand)
- [ ] Average engagement time >30s per diagram
- [ ] <5% bounce rate on diagram-heavy pages

**Accessibility:**
- [ ] 100% keyboard navigable
- [ ] Zero critical WAVE errors
- [ ] Screen reader compatible (tested with VoiceOver)

---

### 6.2 Qualitative Metrics

**User Feedback:**
- Sales team feedback: "Are mobile presentations effective?"
- User testing: Can users understand diagrams on phone?
- Analytics: Do users complete mobile presentations?

**Before/After Comparison:**
- Screenshot mobile diagrams before (broken/unreadable)
- Screenshot after (clean, interactive)
- Present to stakeholders for approval

---

## Conclusion

This comprehensive diagram strategy provides:

1. **5 reusable patterns** - Cover all complexity levels
2. **47 diagram implementations** - Complete treatment plan for every diagram
3. **Zero technical debt** - Component library approach, no one-off hacks
4. **Accessibility-first** - WCAG compliant, keyboard navigable
5. **Performance-optimized** - Lazy loading, code splitting
6. **Future-proof** - Easy to add new diagrams using existing patterns

**Total Implementation Effort:** 44-52 hours
- Week 1: Pattern library + P0 critical (18-22 hours)
- Week 2: Remaining P0 + P1 (16-20 hours)
- Week 3: P2 + documentation (10-12 hours)

**ROI:** Enables mobile sales presentations (potentially 50% of pitch views), improves conversion rates for mobile prospects, demonstrates technical sophistication

**Long-term Value:** Any future diagram added to site automatically has mobile support via pattern library (estimate 20x time savings over custom implementations)
