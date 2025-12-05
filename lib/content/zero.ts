/**
 * Zero Inbox Content Layer
 *
 * Content for Zero marketing pages, dashboard, case study, and tools.
 * Extracted from /Users/matthanson/Zer0_Inbox documentation.
 */

export type ZeroFeature = {
  title: string;
  description: string;
  icon?: string;
};

export type ZeroTool = {
  name: string;
  slug: string;
  description: string;
  filename: string;
  category: 'explorer' | 'analytics' | 'design';
};

export type ZeroMetric = {
  label: string;
  value: string;
  improvement: string;
  description: string;
};

export type ZeroRoadmapPhase = {
  phase: number;
  title: string;
  status: 'completed' | 'in-progress' | 'planned';
  description: string;
  deliverables: string[];
};

/**
 * Hero content for public marketing page
 */
export const zeroHero = {
  title: 'Zero Inbox',
  subtitle: 'AI-Powered Email Management',
  tagline: 'Transform your inbox chaos into clarity',
  description: 'Zero is your intelligent email companion that helps you achieve and maintain inbox zero through the power of AI. Say goodbye to email overwhelm and hello to a streamlined, stress-free inbox experience.',
  portalUrl: '/clients/zero/investor',
  appStoreUrl: 'https://apps.apple.com/us/app/zer0-inbox/id6754212668'
};

/**
 * App Store submission content
 */
export const zeroMarketing = {
  promotional: 'Transform your inbox chaos into clarity with AI-powered email management. Achieve inbox zero effortlessly with smart categorization and personalized actions.',

  description: `Zero is your intelligent email companion that helps you achieve and maintain inbox zero through the power of AI. Say goodbye to email overwhelm and hello to a streamlined, stress-free inbox experience.

**SMART EMAIL MANAGEMENT**
Zero uses advanced AI to understand your email patterns and automatically categorize incoming messages. Whether it's a newsletter, a task, or an important message that needs your attention, Zero knows exactly how to handle it.

**AI-POWERED ACTIONS**
Train Zero to take actions on your behalf. Archive newsletters, create calendar events, add tasks to your to-do list, or flag important messages – all automatically. Zero learns from your preferences and gets smarter over time.

**PERSONALIZED INTELLIGENCE**
With built-in model tuning, Zero adapts to your unique email habits. Teach the AI about your categories and preferred actions, and watch as it becomes your perfect email assistant.

**BEAUTIFUL DESIGN**
Experience email management through a stunning glassmorphic interface with smooth animations and intuitive gestures. Zero makes inbox management not just efficient, but enjoyable.`,

  keywords: 'email,inbox,productivity,AI,zero,management,organize,assistant,automation,smart,mail,task,efficient',

  category: 'Productivity',
  ageRating: '4+',

  perfectFor: [
    'Professionals managing high email volumes',
    'Anyone struggling with inbox overload',
    'People who value their time and mental clarity',
    'Users seeking an intelligent email solution'
  ]
};

/**
 * Key product features
 */
export const zeroFeatures: ZeroFeature[] = [
  {
    title: 'AI-Powered Action Extraction',
    description: 'AI reads your emails and automatically extracts actions: RSVPs, bills, packages, forms, and more.'
  },
  {
    title: 'Mail and Ads Categories',
    description: 'Simple, clean organization. Your emails are sorted into Mail and Ads—no complicated systems.'
  },
  {
    title: 'Email Summarization',
    description: 'Get instant summaries of long emails and threads with AI-powered intelligence.'
  },
  {
    title: 'Smart Replies',
    description: 'Generate contextually appropriate responses with AI assistance.'
  },
  {
    title: 'Shopping Automation',
    description: 'Automatically detect, track, and manage shopping-related emails and orders.'
  },
  {
    title: 'Subscription Management',
    description: 'Identify and manage subscriptions with intelligent steel agent integration.'
  },
  {
    title: 'Calendar Integration',
    description: 'Automatically create calendar events from email content and suggestions.'
  },
  {
    title: 'Swipe-Based Interface',
    description: 'Intuitive card-based triage system with quick action gestures.'
  },
  {
    title: 'Custom Model Tuning',
    description: 'Train the AI on your specific email patterns and preferences.'
  },
  {
    title: 'Privacy-Focused',
    description: 'Your data stays secure with privacy-first architecture and local processing.'
  },
  {
    title: 'Glassmorphic Design',
    description: 'Beautiful, modern interface with smooth animations and intuitive UX.'
  },
  {
    title: 'Multi-Model Support',
    description: 'Works with OpenAI GPT and Google Gemini for flexible AI integration.'
  }
];

/**
 * Success metrics from migration
 */
export const zeroMetrics: ZeroMetric[] = [
  {
    label: 'Size Reduction',
    value: '97%',
    improvement: '1.9GB → 61MB',
    description: 'Eliminated 1.84GB of bloat and legacy code'
  },
  {
    label: 'Build Speed',
    value: '67%',
    improvement: '3min → 1min',
    description: 'Faster builds mean faster iteration and development'
  },
  {
    label: 'Memory Usage',
    value: '60%',
    improvement: '2GB → 800MB',
    description: 'Reduced memory footprint for better performance'
  },
  {
    label: 'Code Utilization',
    value: '100%',
    improvement: 'Zero unused code',
    description: 'Every line of code serves a purpose'
  }
];

/**
 * Interactive admin tools
 */
export const zeroTools: ZeroTool[] = [
  {
    name: 'Intent-Action Explorer',
    slug: 'intent-explorer',
    description: 'Browse 43 intent categories and map intents to actions. Explore the complete classification system.',
    filename: 'intent-action-explorer.html',
    category: 'explorer'
  },
  {
    name: 'Action Modal Explorer',
    slug: 'action-explorer',
    description: 'Test all 35+ action modals interactively. See how each action type works in practice.',
    filename: 'action-modal-explorer.html',
    category: 'explorer'
  },
  {
    name: 'Live Classification Dashboard',
    slug: 'classification',
    description: 'Real-time email classification with confidence scores. See the AI classify emails as they arrive.',
    filename: 'live-classification-dashboard.html',
    category: 'analytics'
  },
  {
    name: 'Zero Sequence Live',
    slug: 'sequences',
    description: 'Action sequence testing and flow visualization. Build and test complex email workflows.',
    filename: 'zero-sequence-live.html',
    category: 'explorer'
  },
  {
    name: 'Analytics Dashboard',
    slug: 'analytics',
    description: 'System analytics and performance metrics. Monitor usage patterns and system health.',
    filename: 'analytics-dashboard.html',
    category: 'analytics'
  },
  {
    name: 'Design System Renderer',
    slug: 'design-system',
    description: 'Full design system component explorer. Browse tokens, components, and design patterns.',
    filename: 'design-system-renderer.html',
    category: 'design'
  }
];

/**
 * Product roadmap phases
 */
export const zeroRoadmap: ZeroRoadmapPhase[] = [
  {
    phase: 1,
    title: 'Foundation & Email Corpus',
    status: 'completed',
    description: 'Email infrastructure, corpus analytics, and classification foundation',
    deliverables: [
      'Email service integration (Gmail API)',
      'Corpus analytics database and tracking',
      'Email card data model',
      'Saved mail folder structure',
      'Token management system'
    ]
  },
  {
    phase: 2,
    title: 'Classification System',
    status: 'completed',
    description: 'AI-powered intent classification and category management',
    deliverables: [
      '43 intent categories defined',
      'OpenAI and Gemini integration',
      'Classification confidence scoring',
      'Model tuning interface',
      'Live classification dashboard'
    ]
  },
  {
    phase: 3,
    title: 'Action Automation',
    status: 'completed',
    description: '35+ automated actions and workflow engine',
    deliverables: [
      'Action modal system',
      'Shopping agent integration',
      'Smart replies generation',
      'Calendar event creation',
      'Subscription management (Steel)',
      'Action sequence builder'
    ]
  },
  {
    phase: 4,
    title: 'iOS Application',
    status: 'completed',
    description: 'Production-ready iOS app with glassmorphic design',
    deliverables: [
      '182 Swift files across 8 modules',
      'Swipe-based triage interface',
      'Model tuning screens',
      'Settings and configuration',
      '28 comprehensive test files',
      'App Store ready assets'
    ]
  },
  {
    phase: 5,
    title: 'Keyword Intelligence',
    status: 'planned',
    description: 'TF-IDF keyword extraction and intelligent tagging',
    deliverables: [
      'Keyword extraction service',
      'Dynamic keyword management',
      'Tag suggestion system',
      'Keyword-based filtering'
    ]
  },
  {
    phase: 6,
    title: 'ML Intelligence',
    status: 'planned',
    description: 'Advanced ML features and predictive intelligence',
    deliverables: [
      'Predictive classification',
      'Behavioral learning',
      'Advanced model tuning',
      'Performance optimization'
    ]
  }
];

/**
 * Backend services architecture
 */
export const zeroServices = {
  count: 8,
  services: [
    { name: 'Gateway', port: 3001, description: 'API routing & authentication' },
    { name: 'Email', port: 8081, description: 'Gmail integration' },
    { name: 'Classifier', port: 8082, description: 'Intent classification' },
    { name: 'Summarization', port: 8083, description: 'Email summaries' },
    { name: 'Shopping Agent', port: 8084, description: 'Product search' },
    { name: 'Scheduled Purchase', port: 8085, description: 'Automated buying' },
    { name: 'Smart Replies', port: 8086, description: 'AI responses' },
    { name: 'Steel Agent', port: 8087, description: 'Subscription management' }
  ]
};

/**
 * Case study content
 */
export const zeroCaseStudy = {
  title: 'Zero Inbox: Building an AI-Powered Email Assistant',
  subtitle: 'From 1.9GB of bloat to 61MB of production-ready code',

  challenge: {
    title: 'The Challenge',
    description: 'Email overload is a universal problem. We set out to build an AI-powered email assistant that could intelligently categorize, prioritize, and act on emails automatically. The project grew organically, accumulating technical debt, fake handshakes, and unused code.',
    problems: [
      '1.9GB codebase with 63% legacy code',
      '11 microservices with code duplication',
      'Fake handshakes - services built but never connected',
      '39 .backup files creating confusion',
      '3-minute build times slowing development'
    ]
  },

  solution: {
    title: 'The Solution',
    description: 'A complete clean-room migration that eliminated technical debt while preserving all working features. We audited every service, extracted shared infrastructure, and consolidated to 8 connected microservices.',
    approach: [
      'Comprehensive audit to identify fake handshakes',
      'Selective migration of only proven, connected code',
      'Shared infrastructure to eliminate duplication',
      'Phase-by-phase validation',
      'Comprehensive documentation throughout'
    ]
  },

  results: {
    title: 'The Results',
    metrics: zeroMetrics,
    impact: [
      'Zero legacy code - 100% active codebase',
      'Zero fake handshakes - all services verified',
      'Zero technical debt - no compromises',
      'Production-ready iOS app with App Store assets',
      '8 connected microservices with shared infrastructure',
      '26 interactive admin and demo tools',
      'Complete design system with Figma sync'
    ]
  },

  technicalDetails: {
    architecture: '8 microservices + shared infrastructure',
    frontend: '182 Swift files, glassmorphic design',
    ai: 'OpenAI GPT and Google Gemini integration',
    features: '43 intent categories, 35+ action types',
    testing: '28 comprehensive test files',
    devExperience: '67% faster builds, 60% less memory'
  }
};

/**
 * Dashboard welcome content
 */
export const zeroDashboard = {
  welcome: {
    title: 'Welcome to Zero Dashboard',
    subtitle: 'Your complete intelligence and analytics platform',
    description: 'Explore the full capabilities of Zero with interactive tools, real-time analytics, and comprehensive product documentation.'
  },

  sections: [
    {
      title: 'Interactive Explorers',
      description: 'Browse intents, actions, and sequences',
      tools: zeroTools.filter(t => t.category === 'explorer')
    },
    {
      title: 'Analytics & Monitoring',
      description: 'Real-time classification and system health',
      tools: zeroTools.filter(t => t.category === 'analytics')
    },
    {
      title: 'Design System',
      description: 'Component library and design tokens',
      tools: zeroTools.filter(t => t.category === 'design')
    }
  ]
};

/**
 * Helper functions
 */
export function getToolBySlug(slug: string): ZeroTool | undefined {
  return zeroTools.find(tool => tool.slug === slug);
}

export function getToolsByCategory(category: ZeroTool['category']): ZeroTool[] {
  return zeroTools.filter(tool => tool.category === category);
}

export function getRoadmapPhasesByStatus(status: ZeroRoadmapPhase['status']): ZeroRoadmapPhase[] {
  return zeroRoadmap.filter(phase => phase.status === status);
}
