/**
 * CREaiT Pitch Deck Component
 *
 * Interactive presentation deck for CREaiT platform
 * Mirrors Athletes First format with presentation/demo toggle
 * Focus on Jobs to Be Done and user flows with backend architecture mapping
 */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Section colors for visual theming
const SECTION_COLORS = {
  intro: '#6366f1',      // Indigo
  problem: '#ef4444',    // Red
  solution: '#10b981',   // Green
  architecture: '#8b5cf6', // Purple
  flows: '#06b6d4',      // Cyan
  roadmap: '#f59e0b',    // Amber
};

type SlideType = 'title' | 'content' | 'demo' | 'architecture' | 'flow';

interface Slide {
  type: SlideType;
  title: string;
  subtitle?: string;
  content?: string[];
  bullets?: string[];
  image?: string;
  demo?: string;
  architectureLayer?: string;
  flowStep?: number;
}

interface Section {
  id: string;
  title: string;
  color: string;
  slides: Slide[];
}

const sections: Section[] = [
  {
    id: 'intro',
    title: 'Introduction',
    color: SECTION_COLORS.intro,
    slides: [
      {
        type: 'title',
        title: 'CREaiT',
        subtitle: 'Commercial Real Estate Intelligence Platform',
        content: [
          'Two-sided marketplace connecting sellers with brokers through AI-powered market intelligence',
        ],
      },
    ],
  },
  {
    id: 'problem',
    title: 'The Problem',
    color: SECTION_COLORS.problem,
    slides: [
      {
        type: 'content',
        title: 'The Broker\'s Daily Challenge',
        subtitle: 'Too much noise, not enough signal',
        bullets: [
          'Multiple disconnected systems: CRM, email, spreadsheets, market research tools',
          'Timing-dependent opportunities buried in data overload',
          'Manual context gathering before each outreach activity',
          'Missing high-probability opportunities due to information fragmentation',
        ],
      },
      {
        type: 'content',
        title: 'Jobs to Be Done',
        subtitle: 'Primary JTBD',
        content: [
          'When I start my workday as a CRE broker, I want to immediately understand which opportunities deserve my attention and why, so I can focus my limited time on the highest-probability outreach activities without manually gathering context from multiple systems.',
        ],
      },
      {
        type: 'content',
        title: 'Supporting Jobs',
        bullets: [
          'See consolidated relationship and property context in one place when timing signals indicate an opportunity',
          'Get AI-assisted draft guidance based on market conditions and relationship history',
          'Enable senior oversight with lightweight review workflow that preserves context',
          'Understand how market or property changes affect my outreach strategy',
        ],
      },
    ],
  },
  {
    id: 'solution',
    title: 'The Solution',
    color: SECTION_COLORS.solution,
    slides: [
      {
        type: 'content',
        title: 'Two-Sided Marketplace',
        subtitle: 'Connecting sellers and brokers with intelligence',
        bullets: [
          'Sellers Side: Property owners looking for the right time and broker to engage',
          'Broker Side: Agents seeking high-probability opportunities with perfect timing',
          'Intelligence Layer: AI-powered synthesis of timing signals, market data, and relationships',
          'Future: Three-sided platform adding buyers to complete transaction workflows',
        ],
      },
      {
        type: 'content',
        title: 'Core Platform Features (MVP)',
        subtitle: 'Broker-focused to start',
        bullets: [
          'Daily Prioritization Dashboard: Ranked opportunities based on timing signals',
          'Contextual Insight Views: Relationship and asset details consolidated',
          'AI-Assisted Outreach: Draft guidance with full human editability',
          'Review & Approval Workflow: Lightweight oversight for quality control',
        ],
      },
      {
        type: 'content',
        title: 'Core Principles',
        bullets: [
          'Human-in-the-Loop: All outputs require explicit validation before execution',
          'Transparent Data Quality: Missing or conflicting data surfaced clearly',
          'Workflow-Led Design: Organized around how brokers actually work',
          'Synthesis Layer: Sits atop existing systems rather than replacing them',
        ],
      },
    ],
  },
  {
    id: 'architecture',
    title: 'Technical Architecture',
    color: SECTION_COLORS.architecture,
    slides: [
      {
        type: 'architecture',
        title: 'Tech Stack Overview',
        subtitle: 'Full stack from data ingestion to user interface',
        image: '/workflow-1-3-stack.jpg',
        content: [
          'Python 3.11+ backend with FastAPI',
          'React/Next.js frontend with Tailwind CSS',
          'PostgreSQL + TimescaleDB for relational & time-series',
          'OpenAI GPT-4 + LangChain for AI features',
          'Apache Airflow for workflow orchestration',
        ],
        architectureLayer: 'Full Stack',
      },
      {
        type: 'architecture',
        title: 'Data Pipeline Architecture',
        subtitle: '6-layer data flow from sources to UI',
        image: '/workflow-1-6-pipeline.png',
        bullets: [
          '1.1 Data Sources & Ingestion: MLS, CRM, Bloomberg, web scraping',
          '1.2 Storage: PostgreSQL, MongoDB, S3, Elasticsearch',
          '1.3 Processing & ETL: Spark, dbt, Great Expectations',
          '1.4 Enrichment: Census data, Google Places API, valuations',
          '1.5 Infrastructure: AWS/GCP, Docker, Kubernetes',
          '1.6 Governance & Security: Vault, encryption, RBAC, compliance',
        ],
        architectureLayer: 'Data Engineering',
      },
      {
        type: 'content',
        title: 'AI/ML Stack',
        subtitle: 'Powering prioritization and content generation',
        bullets: [
          'OpenAI API (GPT-4): Text generation and NLP',
          'LangChain: LLM application development',
          'scikit-learn: Classical ML models',
          'XGBoost/LightGBM: Gradient boosting for scoring',
          'Feature Engineering: Engagement tracking, sentiment analysis, lead scoring',
        ],
        architectureLayer: 'AI/ML Layer',
      },
    ],
  },
  {
    id: 'flows',
    title: 'User Flows',
    color: SECTION_COLORS.flows,
    slides: [
      {
        type: 'flow',
        title: 'Flow 1: Morning Dashboard',
        subtitle: 'Broker starts their day',
        flowStep: 1,
        bullets: [
          '1. Login to CREaiT platform',
          '2. View prioritized opportunity list (ranked by timing signals)',
          '3. See clear explanations for why each opportunity surfaced',
          '4. Click on opportunity to view full context',
        ],
        content: [
          'Backend: Prioritization algorithm runs overnight via Airflow',
          'Data: Pulls from PostgreSQL (properties, owners) + Elasticsearch (search)',
          'ML: XGBoost scoring model weights multiple signals',
          'Cache: Redis for real-time dashboard performance',
        ],
      },
      {
        type: 'flow',
        title: 'Flow 2: Contextual Research',
        subtitle: 'Broker investigates an opportunity',
        flowStep: 2,
        bullets: [
          '1. Broker clicks on high-priority property opportunity',
          '2. Quick-view modal shows essential context without page navigation',
          '3. Relationship profile: owner portfolio, timing windows, past interactions',
          '4. Asset details: property facts, lease/debt timing, market context',
        ],
        content: [
          'Backend: FastAPI serves aggregated data from multiple sources',
          'Data: MongoDB for relationship graphs + PostgreSQL for structured data',
          'Enrichment: Census Bureau API, Google Places API for demographics',
          'UI: React components with lazy-loaded detail panels',
        ],
      },
      {
        type: 'flow',
        title: 'Flow 3: AI-Assisted Outreach',
        subtitle: 'Broker prepares communication',
        flowStep: 3,
        bullets: [
          '1. Broker clicks "Prepare Outreach" on opportunity',
          '2. AI generates draft email based on context and timing signals',
          '3. Broker edits draft in rich text editor (full control)',
          '4. Optional: Submit for senior team member review',
        ],
        content: [
          'Backend: Celery async task queue for AI generation',
          'AI: OpenAI GPT-4 with LangChain for context assembly',
          'Data: Pulls property, owner, market data for prompt context',
          'Review: PostgreSQL stores draft versions and approval states',
        ],
      },
      {
        type: 'flow',
        title: 'Flow 4: Review & Approval',
        subtitle: 'Senior oversight workflow',
        flowStep: 4,
        bullets: [
          '1. Senior team member sees pending communications in review queue',
          '2. Views full context: opportunity, draft, data sources',
          '3. Adds comments or light edits directly',
          '4. Approves or requests changes',
        ],
        content: [
          'Backend: Review workflow state machine in PostgreSQL',
          'Notifications: SendGrid for review request emails',
          'Audit: TimescaleDB for tracking review history over time',
          'UI: Real-time updates via WebSocket or polling',
        ],
      },
      {
        type: 'flow',
        title: 'Flow 5: Send & Track',
        subtitle: 'Communication execution',
        flowStep: 5,
        bullets: [
          '1. Approved outreach sent via SendGrid/AWS SES',
          '2. Engagement tracked: opens, clicks, replies',
          '3. Outcomes logged back to CRM',
          '4. Data feeds back into prioritization algorithm for continuous improvement',
        ],
        content: [
          'Backend: Celery for async email sending',
          'Email: SendGrid API with tracking pixels and click tracking',
          'Analytics: Elasticsearch for engagement metrics',
          'ML: Feature engineering captures engagement for future scoring',
        ],
      },
    ],
  },
  {
    id: 'roadmap',
    title: 'Roadmap',
    color: SECTION_COLORS.roadmap,
    slides: [
      {
        type: 'content',
        title: 'Implementation Timeline',
        subtitle: '16-week MVP, 24-week post-launch iteration',
        bullets: [
          'Phase 1 (Weeks 1-2): Foundation & Alignment: Architecture validation, data pipeline POC',
          'Phase 2 (Weeks 3-5): Core UX Design: Design system, interactive prototype',
          'Phase 3 (Weeks 6-12): MVP Development: All 4 core features',
          'Phase 4 (Weeks 13-16): Refinement & Launch: Testing, documentation, go-live',
          'Phase 5 (Weeks 17-24): Post-MVP Iteration: Analytics, refinements, roadmap for 3-sided platform',
        ],
      },
      {
        type: 'content',
        title: 'MVP Scope',
        subtitle: 'What\'s In and What\'s Out',
        content: [
          'In Scope: Daily dashboard, contextual views, AI drafts, review workflow, CRM integration',
          'Out of Scope: Full transactional workflows, automated outreach, buyer-side features, mobile-first (desktop MVP)',
        ],
      },
      {
        type: 'title',
        title: 'Let\'s Build This',
        subtitle: 'CREaiT: Clarity, Context, Conviction',
        content: [
          'A synthesis-first approach to commercial real estate intelligence',
        ],
      },
    ],
  },
];

export default function CREaiTPitchDeck() {
  const [activeSection, setActiveSection] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [viewMode, setViewMode] = useState<'presentation' | 'architecture'>('presentation');

  const currentSection = sections[activeSection];
  const currentSlide = currentSection.slides[activeSlide];
  const totalSlides = currentSection.slides.length;

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
  }, [activeSection, activeSlide]);

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

  return (
    <div className="min-h-screen bg-neutral-950 text-white relative overflow-hidden">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${((activeSection * 100) / sections.length) + ((activeSlide / totalSlides) * (100 / sections.length))}%`,
            backgroundColor: currentSection.color,
          }}
        />
      </div>

      {/* Header with section navigation */}
      <div className="fixed top-4 left-0 right-0 z-40 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between bg-black/80 backdrop-blur-sm rounded-lg border border-white/10 px-6 py-3">
            {/* Title */}
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold">CREaiT</h1>
              <span className="text-sm text-gray-400">
                {currentSection.title} · {activeSlide + 1}/{totalSlides}
              </span>
            </div>

            {/* Section dots */}
            <div className="flex gap-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => goToSection(index)}
                  className="w-3 h-3 rounded-full transition-all"
                  style={{
                    backgroundColor: index === activeSection ? section.color : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>

            {/* View mode toggle - only show on architecture section */}
            {currentSection.id === 'architecture' && (
              <div className="flex gap-2 bg-white/5 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('presentation')}
                  className={`px-4 py-1 rounded text-sm transition-all ${
                    viewMode === 'presentation'
                      ? 'bg-white/20 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Presentation
                </button>
                <button
                  onClick={() => setViewMode('architecture')}
                  className={`px-4 py-1 rounded text-sm transition-all ${
                    viewMode === 'architecture'
                      ? 'bg-white/20 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Architecture
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Slide content */}
          {currentSlide.type === 'title' && (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
              <h2 className="text-6xl sm:text-7xl font-black mb-6" style={{ color: currentSection.color }}>
                {currentSlide.title}
              </h2>
              {currentSlide.subtitle && (
                <p className="text-2xl sm:text-3xl text-gray-300 mb-8">
                  {currentSlide.subtitle}
                </p>
              )}
              {currentSlide.content && currentSlide.content.map((text, i) => (
                <p key={i} className="text-xl text-gray-400 max-w-3xl">
                  {text}
                </p>
              ))}
            </div>
          )}

          {currentSlide.type === 'content' && (
            <div className="min-h-[70vh] flex flex-col justify-center">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: currentSection.color }}>
                {currentSlide.title}
              </h2>
              {currentSlide.subtitle && (
                <p className="text-xl text-gray-400 mb-8">{currentSlide.subtitle}</p>
              )}
              {currentSlide.content && currentSlide.content.map((text, i) => (
                <p key={i} className="text-lg text-gray-300 leading-relaxed mb-6 max-w-4xl">
                  {text}
                </p>
              ))}
              {currentSlide.bullets && (
                <ul className="space-y-4 mt-6">
                  {currentSlide.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-4 text-lg text-gray-300">
                      <span style={{ color: currentSection.color }}>•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {currentSlide.type === 'architecture' && (
            <div className="min-h-[70vh]">
              <h2 className="text-4xl font-bold mb-4" style={{ color: currentSection.color }}>
                {currentSlide.title}
              </h2>
              {currentSlide.subtitle && (
                <p className="text-xl text-gray-400 mb-8">{currentSlide.subtitle}</p>
              )}

              {viewMode === 'architecture' && currentSlide.image && (
                <div className="rounded-lg border border-white/10 overflow-hidden mb-6 bg-white p-6">
                  <Image
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
              )}

              {viewMode === 'presentation' && (
                <>
                  {currentSlide.content && (
                    <ul className="space-y-3 mb-6">
                      {currentSlide.content.map((text, i) => (
                        <li key={i} className="flex gap-3 text-lg text-gray-300">
                          <span style={{ color: currentSection.color }}>→</span>
                          <span>{text}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {currentSlide.bullets && (
                    <ul className="space-y-3">
                      {currentSlide.bullets.map((bullet, i) => (
                        <li key={i} className="flex gap-3 text-base text-gray-300">
                          <span style={{ color: currentSection.color }}>•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {currentSlide.architectureLayer && (
                    <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
                      <span className="text-sm font-semibold text-gray-400">Architecture Layer: </span>
                      <span className="text-sm" style={{ color: currentSection.color }}>
                        {currentSlide.architectureLayer}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {currentSlide.type === 'flow' && (
            <div className="min-h-[70vh]">
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold"
                  style={{ backgroundColor: currentSection.color }}
                >
                  {currentSlide.flowStep}
                </div>
                <div>
                  <h2 className="text-4xl font-bold mb-2" style={{ color: currentSection.color }}>
                    {currentSlide.title}
                  </h2>
                  {currentSlide.subtitle && (
                    <p className="text-xl text-gray-400">{currentSlide.subtitle}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mt-8">
                {/* User Flow */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-300">User Flow</h3>
                  <ul className="space-y-3">
                    {currentSlide.bullets?.map((bullet, i) => (
                      <li key={i} className="flex gap-3 text-gray-300">
                        <span style={{ color: currentSection.color }}>→</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Backend Architecture */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-300">Backend Architecture</h3>
                  <div className="space-y-2">
                    {currentSlide.content?.map((text, i) => (
                      <div key={i} className="p-3 rounded bg-white/5 border border-white/10 text-sm text-gray-300">
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="fixed bottom-8 left-0 right-0 z-40">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
          <button
            onClick={previousSlide}
            disabled={activeSection === 0 && activeSlide === 0}
            className="p-4 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="text-sm text-gray-400">
            Use arrow keys to navigate
          </div>

          <button
            onClick={nextSlide}
            disabled={activeSection === sections.length - 1 && activeSlide === totalSlides - 1}
            className="p-4 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
