/**
 * Ventures Content Layer
 *
 * Public-facing information about Rationale's internal IP lab ventures.
 * These are condensed versions suitable for /ventures/[slug] marketing pages.
 * Full case studies with detailed outcomes are password-protected.
 *
 * Source: RationaleRevisions case studies + business plan
 */

// ============================================================================
// TypeScript Interfaces
// ============================================================================

export interface Venture {
  slug: string;
  title: string;
  tagline: string;
  status: 'In Development' | 'Active' | 'Spinout' | 'Archived';

  // Hero content
  heroDescription: string;

  // Problem & Solution
  problem: {
    title: string;
    description: string;
    painPoints: string[];
  };

  solution: {
    title: string;
    description: string;
    approach: string[];
  };

  // What We're Building
  building: {
    title: string;
    features: {
      title: string;
      description: string;
    }[];
  };

  // Technology
  tech: {
    title: string;
    stack: string[];
    highlights: string[];
  };

  // Vision
  vision: {
    title: string;
    description: string;
    futureState: string[];
  };

  // Metadata
  meta: {
    tags: string[];
    timeline: string;
    type: string;
  };

  // Metrics (optional - for showcasing results)
  metrics?: {
    [key: string]: {
      label: string;
      value: string;
      description: string;
    };
  };

  // CTA
  cta: {
    title: string;
    description: string;
    action: string;
  };
}

// ============================================================================
// Venture Data
// ============================================================================

export const ventures: Venture[] = [
  // PROJECT COMPASS - AI Video Indexing
  {
    slug: 'compass',
    title: 'Project Compass',
    tagline: 'AI-native content understanding with cultural and emotional intelligence',
    status: 'In Development',

    heroDescription: 'An AI agent that watches video with you, indexing content in real-time with cultural context, emotional resonance, and mood-based discovery. Content platforms use shallow metadataProject Compass understands what makes content meaningful.',

    problem: {
      title: 'The Problem',
      description: 'Content discovery today relies on shallow metadata that completely misses emotional resonance and cultural significance.',
      painPoints: [
        'Traditional taxonomies don\'t capture why content resonates emotionally',
        'Cultural significance and context are invisible to current algorithms',
        'Mood-based discovery doesn\'t exist in any meaningful way',
        'Manual curation is expensive and doesn\'t scale',
        'Creators can\'t find their audience beyond basic demographic targeting'
      ]
    },

    solution: {
      title: 'Our Approach',
      description: 'AI agents that understand content the way humans dothrough cultural context, emotional impact, and thematic resonance.',
      approach: [
        'Real-time video indexing as content plays',
        'Cultural and emotional metadata tagging',
        'Genre channel system for thematic discovery',
        'Multi-agent architecture for progressive UI population',
        'Browser-based deployment for universal access'
      ]
    },

    building: {
      title: 'What We\'re Building',
      features: [
        {
          title: 'AI-Native Indexing',
          description: 'Agents watch content in real-time, extracting cultural context, emotional beats, thematic elements, and mood signatures that traditional metadata misses entirely.'
        },
        {
          title: 'Genre Channel System',
          description: 'Discover content through thematic channels like "late-night introspection," "urban resilience," or "nostalgic summer"not just "drama" or "comedy."'
        },
        {
          title: 'Cultural Intelligence',
          description: 'Understands cultural references, historical context, and subcultural significance to surface content that resonates with specific communities.'
        },
        {
          title: 'Progressive Population',
          description: 'Multi-agent system populates the UI progressively as insights emerge, creating a responsive, real-time experience.'
        }
      ]
    },

    tech: {
      title: 'Technology',
      stack: [
        'Multi-agent AI architecture',
        'Real-time video processing',
        'Browser extension framework',
        'Cultural tagging taxonomy',
        'Progressive UI rendering'
      ],
      highlights: [
        'Real-time indexing without latency',
        'Scalable multi-agent deployment',
        'Browser-native implementation',
        'Cultural context awareness'
      ]
    },

    vision: {
      title: 'The Vision',
      description: 'A world where content discovery feels intuitive, culturally aware, and emotionally intelligentwhere you can find exactly what resonates with you, even if you don\'t know how to describe it.',
      futureState: [
        'Mood-based discovery as natural as genre browsing',
        'Cultural context as a standard metadata layer',
        'Creators finding their true audience through thematic resonance',
        'AI that understands "vibe" as well as humans do'
      ]
    },

    meta: {
      tags: ['AI', 'Agents', 'Content Discovery', 'Cultural Intelligence'],
      timeline: '6-week prototype sprint',
      type: 'Prototype Partnership'
    },

    cta: {
      title: 'Interested in Project Compass?',
      description: 'We\'re exploring partnership opportunities for early deployment and further development.',
      action: 'Get in touch'
    }
  },

  // ZERO - AI Email Client
  {
    slug: 'zero',
    title: 'Zero',
    tagline: 'AI-powered email triage that eliminates decision paralysis',
    status: 'In Development',

    heroDescription: 'Swipeable cards meet intelligent categorization. Zero transforms email from an overwhelming inbox into fast, confident decisions. Built for mobile-first triage with multi-step flows and customizable actions.',

    problem: {
      title: 'The Problem',
      description: 'Email overload creates decision paralysis. Volume, context-switching, and mobile limitations prevent fast, confident action.',
      painPoints: [
        'Decision paralysis from sheer email volume',
        'Context-switching friction kills productivity',
        'Mobile triage is painfully limited',
        'Important information gets lost in the noise',
        'No intelligent prioritization beyond basic rules'
      ]
    },

    solution: {
      title: 'Our Approach',
      description: 'Short-form email with AI categorization and swipe-based triage. Make decisions in 3-5 seconds per email without losing context.',
      approach: [
        'Swipeable card interface for instant decisions',
        'AI categorization by email type and intent',
        'Customizable actions per category',
        'Multi-step flows for complex actions',
        'Mobile-first with iOS native app'
      ]
    },

    building: {
      title: 'What We\'re Building',
      features: [
        {
          title: 'Swipe-Based Triage',
          description: 'Cards you can swipe through like a dating app. Each email becomes a single, focused decision with immediate action routing.'
        },
        {
          title: 'AI Categorization',
          description: 'Intelligent categorization understands email type, urgency, and required actionsuggesting the right flow before you think about it.'
        },
        {
          title: 'Multi-Step Flows',
          description: 'Complex actions broken into fast, sequential decisions. Schedule, delegate, or save for later without leaving the card interface.'
        },
        {
          title: 'Action System',
          description: '7+ customizable action types per email category. Reply, schedule, delegate, archive, or create custom workflows.'
        },
        {
          title: 'Haptic Feedback',
          description: 'iOS native haptics make every decision feel tactile and confident, reinforcing the speed of your workflow.'
        }
      ]
    },

    tech: {
      title: 'Technology',
      stack: [
        'React web app',
        'SwiftUI iOS native',
        'Node.js backend',
        'Gemini AI categorization',
        'Real-time sync engine'
      ],
      highlights: [
        '3-5 second triage per email',
        'Offline-capable iOS app',
        'Real-time AI categorization',
        'Multi-step flow engine'
      ]
    },

    vision: {
      title: 'The Vision',
      description: 'Email that feels effortless. A world where inbox zero isn\'t a choreit\'s the default outcome of a well-designed system.',
      futureState: [
        'Email triage as fast as scrolling social media',
        'Mobile-first workflows that actually work',
        'AI that understands your email behavior and adapts',
        'Zero decision fatigue from email overload'
      ]
    },

    meta: {
      tags: ['AI', 'Productivity', 'Email', 'Mobile'],
      timeline: 'Ongoing equity partnership',
      type: 'Equity Partnership'
    },

    metrics: {
      development: {
        label: 'MVP Timeline',
        value: '6 weeks',
        description: 'From concept to functional MVP with iOS app and web interface'
      },
      triage: {
        label: 'Avg. Triage Speed',
        value: '3-5 seconds',
        description: 'Per email decision time with swipe interface'
      },
      categorization: {
        label: 'AI Accuracy',
        value: '90%+',
        description: 'Email categorization accuracy with Gemini AI'
      },
      engagement: {
        label: 'Daily Active Use',
        value: 'Active testing',
        description: 'Internal team and early access users'
      }
    },

    cta: {
      title: 'Want Early Access?',
      description: 'Zero is in active development. We\'re exploring early access opportunities for select users.',
      action: 'Join the waitlist'
    }
  },

  // ATHLETES FIRST - NIL Platform
  {
    slug: 'amplify',
    title: 'Project Amplify',
    tagline: 'NIL compliance meets AI-powered content generation',
    status: 'In Development',

    heroDescription: 'A platform that scales athlete brand content without constant photoshoots. Combines NIL compliance workflows with generative media to create authentic, legally compliant content at scale.',

    problem: {
      title: 'The Problem',
      description: 'Athletes need constant brand content, but production capacity is severely limited by time, cost, and compliance complexity.',
      painPoints: [
        'Expensive photo and video shoots for every campaign',
        'Severe time constraints during competitive seasons',
        'Brand consistency challenges across platforms',
        'NIL compliance complexity and legal risk',
        'Can\'t scale presence without scaling production costs'
      ]
    },

    solution: {
      title: 'Our Approach',
      description: 'AI-powered content generation with built-in NIL compliance. One photoshoot creates hundreds of variationsauthentic, brand-consistent, and legally sound.',
      approach: [
        'Generative media from minimal source content',
        'NIL compliance workflows built into platform',
        'Brand consistency engine across all outputs',
        'Platform integrations for distribution',
        'Athlete-controlled content approval flow'
      ]
    },

    building: {
      title: 'What We\'re Building',
      features: [
        {
          title: 'Content Engine',
          description: 'Transform a single photoshoot into hundreds of brand-consistent variations. Change backgrounds, outfits, settings, and contexts while maintaining authenticity.'
        },
        {
          title: 'NIL Compliance Workflow',
          description: 'Built-in legal compliance checks, rights management, and approval flows. Never worry about NIL violations or unauthorized content usage.'
        },
        {
          title: 'Brand Consistency',
          description: 'AI-powered style guide enforcement ensures every generated asset matches the athlete\'s brand identity and visual language.'
        },
        {
          title: 'Platform Integrations',
          description: 'One-click distribution to Instagram, TikTok, Twitter, and brand partner platforms. Content goes from generation to publication seamlessly.'
        }
      ]
    },

    tech: {
      title: 'Technology',
      stack: [
        'Generative AI (image/video)',
        'NIL compliance engine',
        'Brand consistency models',
        'Platform API integrations',
        'Content approval workflows'
      ],
      highlights: [
        'Generative media at scale',
        'Built-in legal compliance',
        'Brand authenticity preservation',
        'Athlete-controlled workflows'
      ]
    },

    vision: {
      title: 'The Vision',
      description: 'Athletes own and scale their brand presence without being constrained by production logistics or legal complexity.',
      futureState: [
        'Athletes produce content as easily as posting a photo',
        'NIL compliance becomes invisible infrastructure',
        'Brand partnerships scale without production bottlenecks',
        'Generative media and authenticity coexist seamlessly'
      ]
    },

    meta: {
      tags: ['AI', 'Generative Media', 'NIL', 'Sports'],
      timeline: '8-week strategic partnership',
      type: 'Strategic Partnership'
    },

    cta: {
      title: 'Partner With Us',
      description: 'We\'re working with select athletes and agencies to pilot the platform.',
      action: 'Learn more'
    }
  },

  // CREAIT - CRE Intelligence
  {
    slug: 'atlas',
    title: 'Project Atlas',
    tagline: 'Unified intelligence layer for commercial real estate',
    status: 'In Development',

    heroDescription: 'Commercial real estate data is scattered across dozens of platforms. Project Atlas creates a unified intelligence layer that surfaces opportunities, automates research, and turns fragmented data into actionable insights for brokers and investors.',

    problem: {
      title: 'The Problem',
      description: 'CRE data is fragmented across platforms, making research inefficient and deal sourcing reactive instead of proactive.',
      painPoints: [
        'Data scattered across 10+ platforms and sources',
        'Manual research workflows waste hours daily',
        'Opportunities slip through the cracks',
        'No unified view of market intelligence',
        'Inefficient deal sourcing and qualification'
      ]
    },

    solution: {
      title: 'Our Approach',
      description: 'A unified intelligence layer that aggregates, analyzes, and surfaces CRE opportunities in real-time, integrated directly into broker workflows.',
      approach: [
        'Real-time data aggregation from multiple sources',
        'AI-powered opportunity detection',
        'Broker workflow integration',
        'Privacy-compliant data handling',
        'Automated market intelligence reports'
      ]
    },

    building: {
      title: 'What We\'re Building',
      features: [
        {
          title: 'Unified Intelligence Layer',
          description: 'Aggregates data from CoStar, LoopNet, public records, market reports, and proprietary sources into a single, queryable intelligence platform.'
        },
        {
          title: 'Opportunity Detection',
          description: 'AI identifies off-market opportunities, distressed properties, ownership changes, and market signals before they become common knowledge.'
        },
        {
          title: 'Broker Workflows',
          description: 'Integrates directly into existing CRE workflows, surfacing intelligence at the moment of need without requiring platform switching.'
        },
        {
          title: 'Market Intelligence',
          description: 'Automated reports on market trends, comp analysis, property history, and ownership structuresgenerated in seconds, not hours.'
        }
      ]
    },

    tech: {
      title: 'Technology',
      stack: [
        'Data aggregation pipelines',
        'AI intelligence analysis',
        'Privacy-compliant architecture',
        'Real-time update engine',
        'CRE platform integrations'
      ],
      highlights: [
        'Real-time market intelligence',
        'Multi-source data unification',
        'Privacy and compliance built-in',
        'Broker workflow integration'
      ]
    },

    vision: {
      title: 'The Vision',
      description: 'CRE brokers and investors operate with perfect market intelligencenever missing an opportunity, never wasting time on manual research.',
      futureState: [
        'Real-time opportunity alerts before market awareness',
        'Research workflows reduced from hours to minutes',
        'Unified market intelligence as standard infrastructure',
        'Data fragmentation becomes a solved problem'
      ]
    },

    meta: {
      tags: ['AI', 'Real Estate', 'B2B', 'Intelligence'],
      timeline: '6-week product definition sprint',
      type: 'Product Definition'
    },

    cta: {
      title: 'Interested in Project Atlas?',
      description: 'We\'re exploring partnerships with CRE firms and investors.',
      action: 'Schedule a demo'
    }
  }
];

// ============================================================================
// Helper Functions
// ============================================================================

export function getVentureBySlug(slug: string): Venture | undefined {
  return ventures.find(v => v.slug === slug);
}

export function getAllVentureSlugs(): string[] {
  return ventures.map(v => v.slug);
}

export function getVenturesByTag(tag: string): Venture[] {
  return ventures.filter(v => v.meta.tags.includes(tag));
}

export function getFeaturedVentures(limit?: number): Venture[] {
  const featured = ventures.filter(v => v.status === 'In Development' || v.status === 'Active');
  return limit ? featured.slice(0, limit) : featured;
}

// Filter out client projects (private) for public display
export function getPublicVentures(): Venture[] {
  return ventures.filter(v => !['amplify', 'atlas'].includes(v.slug));
}

export function getFeaturedPublicVentures(limit?: number): Venture[] {
  const publicVentures = getPublicVentures();
  const featured = publicVentures.filter(v => v.status === 'In Development' || v.status === 'Active');
  return limit ? featured.slice(0, limit) : featured;
}

export function getAllVentureTags(): string[] {
  const tags = ventures.flatMap(v => v.meta.tags);
  return Array.from(new Set(tags)).sort();
}
