/**
 * Case Studies Content
 *
 * Complete case study data for Rationale portfolio work.
 * Includes both full content (for protected /cases/[slug] pages)
 * and teaser content (for public /work page).
 *
 * Source: 05csestudiesinschema.txt from RationaleRevisions
 */

// ============================================================================
// TypeScript Interfaces
// ============================================================================

export interface CaseStudyMedia {
  type: 'video' | 'image' | 'prototype' | 'artifact';
  label: string;
  url: string;
  caption?: string;
}

export interface CaseStudy {
  // Metadata
  slug: string;
  title: string;
  tagline: string;
  meta: {
    tags: string[];
    projectType: string;
    timeline: string;
    role: string;
    status: string;
  };

  // Core Content
  overview: string;
  problem: {
    description: string;
    painPoints: string[];
  };
  constraints: string[];

  // Our Approach & Solution
  ourRole: string[];
  approach: {
    title: string;
    description: string;
  }[];

  // System Details
  systemHighlights?: string[];
  uxHighlights?: string[];

  // What We Built
  deliverables: {
    title: string;
    description: string;
  }[];

  // Technical Stack
  technicalStack: {
    design?: string[];
    frontend?: string[];
    backend?: string[];
    infrastructure?: string[];
  };

  // Media
  media?: CaseStudyMedia[];

  // Outcomes
  outcomes: {
    metrics?: {
      label: string;
      value: string;
    }[];
    impact: string[];
    deliverables: string[];
  };

  // Insights
  lessons: {
    whatWorked: string[];
    challenges: string[];
    futureDirections: string[];
  };

  // Why It Matters
  impact: {
    forUsers: string[];
    forMarket: string[];
    forRationale: string[];
  };

  // Call to Action
  next: string;
}

export interface CaseStudyTeaser {
  slug: string;
  title: string;
  tagline: string;
  tags: string[];
  challenge: string;
  solution: string[];
  highlights: string[];
  impact: string[];
  tech: string;
}

// ============================================================================
// Case Study Data
// ============================================================================

export const caseStudies: CaseStudy[] = [
  // PROJECT COMPASS - AI Video Indexing
  {
    slug: 'compass',
    title: 'Project Compass',
    tagline: 'AI-native content understanding with cultural and emotional tagging',
    meta: {
      tags: ['AI', 'Agents', 'Content Discovery', 'Cultural Intelligence'],
      projectType: 'Prototype Partnership',
      timeline: '6 weeks',
      role: 'Product Design + System Architecture',
      status: 'In Development'
    },
    overview: 'AI agent watches video with you, indexes in real-time with cultural and emotional metadata',
    problem: {
      description: 'Content discovery relies on shallow metadata that misses cultural context',
      painPoints: [
        'Traditional taxonomies don\'t capture emotional resonance',
        'Cultural significance is invisible to algorithms',
        'Mood-based discovery doesn\'t exist',
        'Manual curation doesn\'t scale'
      ]
    },
    constraints: ['Real-time indexing', 'Progressive UI population', 'Multi-agent architecture', 'Browser-based deployment'],
    ourRole: ['Genre channel system design', 'Multi-agent deployment architecture', 'Cultural tagging taxonomy', 'Browser extension prototypes'],
    approach: [],
    deliverables: [],
    technicalStack: {},
    outcomes: {
      impact: ['Real-time content understanding', 'Cultural AI tagging system', 'Multi-agent architecture'],
      deliverables: ['Investor-ready prototype', 'PRD-ready system design', 'Multi-agent architecture']
    },
    lessons: { whatWorked: [], challenges: [], futureDirections: [] },
    impact: { forUsers: [], forMarket: [], forRationale: [] },
    next: 'Contact us to learn more'
  },

  // ZERO - AI Email Client
  {
    slug: 'zero',
    title: 'Zero Inbox',
    tagline: 'AI-powered email management with swipeable cards',
    meta: {
      tags: ['AI', 'Productivity', 'Email', 'Mobile', 'iOS'],
      projectType: 'Equity Partnership',
      timeline: '6 months (4 phases complete)',
      role: 'Product Design + Full-Stack Development + iOS',
      status: 'Production Ready'
    },
    overview: 'Zero is your intelligent email companion that helps you achieve and maintain inbox zero through the power of AI. Transform email chaos into clarity with 43 intent categories, 35+ automated actions, and a beautiful glassmorphic iOS interface.',
    problem: {
      description: 'Email overload is a universal problem. We set out to build an AI-powered email assistant that could intelligently categorize, prioritize, and act on emails automatically. The project grew organically, accumulating technical debt, fake handshakes, and unused code.',
      painPoints: [
        '1.9GB codebase with 63% legacy code',
        '11 microservices with code duplication',
        'Fake handshakes - services built but never connected',
        '39 .backup files creating confusion',
        '3-minute build times slowing development'
      ]
    },
    constraints: ['Mobile-first iOS app', 'Real-time AI classification', 'Multi-step action flows', 'Privacy-focused architecture', 'Production-ready quality'],
    ourRole: [
      'Complete clean-room migration from 1.9GB to 61MB',
      'AI classification system with 43 intent categories',
      '35+ automated actions with smart suggestions',
      'iOS native app with glassmorphic design (182 Swift files)',
      '26 interactive admin and demo tools',
      '8 connected microservices architecture'
    ],
    approach: [
      {
        title: 'Comprehensive Audit',
        description: 'Identified fake handshakes and legacy code through systematic review of all 11 microservices'
      },
      {
        title: 'Selective Migration',
        description: 'Only migrated proven, connected code - eliminated 1.84GB of bloat and technical debt'
      },
      {
        title: 'Shared Infrastructure',
        description: 'Created shared infrastructure to eliminate duplication across services'
      },
      {
        title: 'Phase-by-Phase Validation',
        description: 'Validated each phase (foundation, classification, automation, iOS) before moving forward'
      }
    ],
    systemHighlights: [
      '43 intelligent intent categories for email classification',
      '35+ automated actions that learn from preferences',
      'AI-powered email summaries and smart replies',
      'Shopping automation with order tracking',
      'Subscription management via Steel agent',
      'Calendar integration with auto-event creation',
      'Custom model tuning for personalized AI'
    ],
    uxHighlights: [
      'Swipe-based card interface for rapid triage',
      'Glassmorphic design with smooth animations',
      'Intuitive gesture controls with haptic feedback',
      'Multi-model support (OpenAI GPT, Google Gemini)',
      'Privacy-focused local processing'
    ],
    deliverables: [
      {
        title: 'iOS Application',
        description: 'Production-ready app with 182 Swift files across 8 modules, 28 test files, and App Store assets'
      },
      {
        title: 'Backend Microservices',
        description: '8 connected services: Gateway, Email, Classifier, Summarization, Shopping Agent, Scheduled Purchase, Smart Replies, Steel Agent'
      },
      {
        title: 'Admin Dashboard',
        description: '26 interactive tools including intent explorer, action modals, live classification, analytics, and design system renderer'
      },
      {
        title: 'Documentation',
        description: 'Complete technical documentation, migration guide, and product specifications'
      }
    ],
    technicalStack: {
      design: ['Figma', 'SwiftUI glassmorphic design', 'Custom design system', 'Animation framework'],
      frontend: ['SwiftUI', '182 Swift files', '8 modules', 'Gesture-based interactions', 'Haptic feedback'],
      backend: ['Node.js', 'Express', '8 microservices', 'Gmail API', 'OpenAI GPT', 'Google Gemini', 'Steel API'],
      infrastructure: ['Shared infrastructure layer', 'Token management', 'Session handling', 'Email corpus analytics']
    },
    media: [
      {
        type: 'prototype',
        label: 'App Demo',
        url: '/zero/demo/app-demo.html',
        caption: 'Interactive iOS app prototype'
      },
      {
        type: 'prototype',
        label: 'Intent Explorer',
        url: '/client/zero/dashboard/intent-explorer',
        caption: 'Browse 43 intent categories'
      },
      {
        type: 'prototype',
        label: 'Action Explorer',
        url: '/client/zero/dashboard/action-explorer',
        caption: 'Test 35+ action modals'
      },
      {
        type: 'artifact',
        label: 'Dashboard',
        url: '/client/zero/dashboard',
        caption: 'Full intelligence platform'
      }
    ],
    outcomes: {
      metrics: [
        { label: 'Size Reduction', value: '97%' },
        { label: 'Build Speed', value: '67% faster' },
        { label: 'Memory Usage', value: '60% less' },
        { label: 'Code Utilization', value: '100%' }
      ],
      impact: [
        'Zero legacy code - 100% active codebase',
        'Zero fake handshakes - all services verified',
        'Zero technical debt - no compromises',
        'Production-ready iOS app with App Store assets',
        '8 connected microservices with shared infrastructure',
        '26 interactive admin and demo tools',
        'Complete design system with Figma sync'
      ],
      deliverables: [
        'Eliminated 1.84GB of bloat (1.9GB → 61MB)',
        '67% faster builds (3min → 1min)',
        '60% reduced memory (2GB → 800MB)',
        '43 AI intent categories',
        '35+ automated actions',
        '182 Swift files across 8 modules',
        '28 comprehensive test files'
      ]
    },
    lessons: {
      whatWorked: [
        'Clean-room migration approach eliminated all technical debt',
        'Comprehensive audit caught fake handshakes before migration',
        'Shared infrastructure eliminated code duplication',
        'Phase-by-phase validation ensured quality at each step',
        'Interactive admin tools provided crucial debugging visibility'
      ],
      challenges: [
        'Identifying fake handshakes required manual service testing',
        'Balancing feature completeness with migration timeline',
        'Ensuring iOS app matched prototype fidelity',
        'Coordinating 8 microservices without orchestration overhead'
      ],
      futureDirections: [
        'Phase 5: Keyword intelligence with TF-IDF extraction',
        'Phase 6: ML intelligence with predictive classification',
        'Advanced model tuning based on user behavior',
        'Performance optimization for scale'
      ]
    },
    impact: {
      forUsers: [
        'Achieve inbox zero with AI-powered assistance',
        'Save hours per week with automated email actions',
        'Beautiful mobile experience makes email management enjoyable',
        'Personalized AI learns individual preferences over time'
      ],
      forMarket: [
        'Demonstrates viability of AI-first email management',
        'Proves clean-room migration can eliminate technical debt',
        'Shows how to build production-quality iOS apps with SwiftUI',
        'Validates microservices architecture for email intelligence'
      ],
      forRationale: [
        'Showcases full-stack capability (product, design, iOS, backend)',
        'Proves ability to rescue projects with technical debt',
        'Demonstrates commitment to production-ready quality',
        'Highlights interactive prototyping and admin tool development'
      ]
    },
    next: 'Explore the Zero dashboard at /client/zero/dashboard or view the public site at /zero'
  },

  // PROJECT AMPLIFY - NIL Platform
  {
    slug: 'amplify',
    title: 'Project Amplify',
    tagline: 'NIL & content engine for athlete brands',
    meta: {
      tags: ['AI', 'Generative Media', 'NIL', 'Sports'],
      projectType: 'Strategic Partnership',
      timeline: '8 weeks',
      role: 'Product Strategy + Prototype',
      status: 'In Development'
    },
    overview: 'AI and generative media platform scaling athlete brand content without constant photoshoots',
    problem: {
      description: 'Athletes need constant content but have limited production capacity',
      painPoints: [
        'Expensive photo/video shoots',
        'Time constraints during season',
        'Brand consistency challenges',
        'Scale limitations'
      ]
    },
    constraints: ['Brand authenticity', 'Legal compliance', 'Platform integrations', 'Content quality'],
    ourRole: ['Platform strategy', 'Content engine design', 'NIL workflow', 'Prototype development'],
    approach: [],
    deliverables: [],
    technicalStack: {},
    outcomes: {
      impact: ['Scaled athlete content', 'Reduced production costs', 'NIL-compliant workflows'],
      deliverables: ['Platform prototype', 'NIL + generative media model', 'Partnership framework']
    },
    lessons: { whatWorked: [], challenges: [], futureDirections: [] },
    impact: { forUsers: [], forMarket: [], forRationale: [] },
    next: 'Contact us to learn more'
  },

  // PROJECT ATLAS - CRE Intelligence
  {
    slug: 'atlas',
    title: 'Project Atlas',
    tagline: 'Commercial real estate intelligence platform',
    meta: {
      tags: ['AI', 'Real Estate', 'B2B', 'Intelligence'],
      projectType: 'Product Definition',
      timeline: '6 weeks',
      role: 'Product Strategy + System Design',
      status: 'In Development'
    },
    overview: 'Unified intelligence layer for commercial real estate brokers and investors',
    problem: {
      description: 'CRE data is scattered across platforms, hard to action',
      painPoints: [
        'Fragmented data sources',
        'Manual research workflows',
        'Missed opportunities',
        'Inefficient deal sourcing'
      ]
    },
    constraints: ['Data integration', 'Real-time updates', 'Privacy compliance', 'Broker workflows'],
    ourRole: ['Product positioning', 'Intelligence layer design', 'Workflow architecture', 'Investor-ready prototype'],
    approach: [],
    deliverables: [],
    technicalStack: {},
    outcomes: {
      impact: ['Unified CRE data access', 'Faster deal sourcing', 'Streamlined broker workflows'],
      deliverables: ['Product positioning', 'Intelligence system design', 'Investor-ready prototype']
    },
    lessons: { whatWorked: [], challenges: [], futureDirections: [] },
    impact: { forUsers: [], forMarket: [], forRationale: [] },
    next: 'Contact us to learn more'
  }
];

// ============================================================================
// Case Study Teasers (for /work page)
// ============================================================================

export const caseStudyTeasers: CaseStudyTeaser[] = [
  {
    slug: 'compass',
    title: 'Project Compass',
    tagline: 'AI-native content understanding',
    tags: ['AI', 'Agents', 'Content Discovery'],
    challenge: 'Content platforms use shallow metadata that doesn\'t capture emotional resonance or cultural significance',
    solution: ['Genre channel system with real-time indexing', 'AI cultural and emotional tagging', 'Multi-agent deployment architecture'],
    highlights: ['6-week prototype partnership', 'Real-time content indexing', 'Multi-agent system', 'Browser extension prototypes'],
    impact: ['Investor-ready prototype', 'Cultural AI understanding', 'Scalable architecture', 'PRD-ready system'],
    tech: 'JavaScript, Multi-agent architecture, Browser extensions'
  },
  {
    slug: 'zero',
    title: 'Zero',
    tagline: 'AI-powered email triage',
    tags: ['AI', 'Productivity', 'Email'],
    challenge: 'Email overload prevents fast, confident decisions. Context-switching creates friction.',
    solution: ['Swipe-based card interface', 'AI categorization', 'Customizable actions per email type', 'Multi-step flows'],
    highlights: ['Web + iOS native app', 'Equity partnership', '7+ action types', 'Haptic feedback system'],
    impact: ['3-5 second triage per email', 'Eliminated context-switching', 'Mobile-optimized', 'Active development'],
    tech: 'React, SwiftUI, Node.js, Gemini AI'
  },
  {
    slug: 'amplify',
    title: 'Project Amplify',
    tagline: 'NIL & content engine',
    tags: ['AI', 'Generative Media', 'Sports'],
    challenge: 'Athletes need constant brand content but have limited time and production capacity',
    solution: ['AI-powered content generation', 'Generative media platform', 'NIL compliance workflows', 'Brand consistency engine'],
    highlights: ['Platform prototype', 'NIL + AI model', '8-week delivery', 'Strategic partnership'],
    impact: ['Scales athlete presence', 'No constant shoots needed', 'NIL + generative media coexistence'],
    tech: 'Generative AI, Platform architecture'
  },
  {
    slug: 'atlas',
    title: 'Project Atlas',
    tagline: 'CRE intelligence platform',
    tags: ['AI', 'Real Estate', 'B2B'],
    challenge: 'Commercial real estate data is scattered across platforms, making it hard to find and act on opportunities',
    solution: ['Unified intelligence layer', 'Real-time data aggregation', 'Broker workflow integration', 'Opportunity detection'],
    highlights: ['Product positioning', 'Intelligence system design', '6-week sprint', 'Investor-ready prototype'],
    impact: ['Clear product positioning', 'Unified CRE data', 'Actionable workflows', 'Broker intelligence layer'],
    tech: 'Data aggregation, AI intelligence, B2B platform'
  }
];

// ============================================================================
// Helper Functions
// ============================================================================

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find(cs => cs.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return caseStudies.map(cs => cs.slug);
}

export function getCaseStudyTeasers(): CaseStudyTeaser[] {
  return caseStudyTeasers;
}

export function getCaseStudyTeaserBySlug(slug: string): CaseStudyTeaser | undefined {
  return caseStudyTeasers.find(cs => cs.slug === slug);
}

export function getFeaturedCaseStudies(limit?: number): CaseStudy[] {
  const featured = caseStudies;
  return limit ? featured.slice(0, limit) : featured;
}

export function getCaseStudiesByTag(tag: string): CaseStudy[] {
  return caseStudies.filter(cs => cs.meta.tags.includes(tag));
}

export function getAllCaseStudyTags(): string[] {
  const tags = caseStudies.flatMap(cs => cs.meta.tags);
  return Array.from(new Set(tags)).sort();
}
