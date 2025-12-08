/**
 * Founder Bio & Story Content
 *
 * Personal story, background, and philosophy of Matt Hanson.
 * Integrates narrative from possiblephilsophies.txt + existing about content.
 */

// ============================================================================
// TypeScript Interface
// ============================================================================

export interface FounderProfile {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  personalStory: string[];

  capabilities: string[];
  trackRecord: string[];

  patent: {
    title: string;
    description: string;
    year: string;
    url: string;
  };

  contact: {
    email: string;
    linkedin?: string;
    twitter?: string;
  };

  advisors?: Array<{
    name: string;
    title: string;
    background: string;
    expertise: string;
    linkedIn?: string;
  }>;
}

// ============================================================================
// Founder Data
// ============================================================================

export const founderProfile: FounderProfile = {
  name: 'Matt Hanson',
  role: 'Founder, Rationale',
  tagline: 'Systems thinker, product architect, builder of clarity',

  bio: 'Matt Hanson founded Rationale in response to a critical problem he observed: AI has made execution cheap and fast, but teams are building the wrong things faster than ever. Before founding Rationale, Matt led AR product development at Meta (2018-2024), scaling the Spark AR team from 2 to 22 people, building AR commerce from prototype to production, and defining UX for Meta\'s Orion AR Glasses and Quest MR Mode. He brings deep experience in 0-1 product development, AR/MR systems, and AI-integrated experiences.',

  personalStory: [
    'Matt\'s career has been defined by building clarity in ambiguous, high-stakes environments. At Meta (2018-2024), he led the evolution of AR from experimental features to scalable, business-critical platforms used by billions.',
    'He scaled the Spark AR team from 2 to 22 people across multiple cities, led the UX for Meta\'s Orion AR Glasses and Quest MR Mode, and built the AR commerce ecosystem that onboarded 10+ major retailers. Along the way, he learned that the hardest challenge wasn\'t the technology—it was building conviction in cross-functional teams before committing to execution.',
    'This insight crystallized during RUMI, an AI companion project where Matt realized that brand wasn\'t just marketing—it was the execution engine. By establishing brand identity early, the team could build with confidence instead of endlessly debating hypotheticals. That approach turned speculation into working prototypes, and prototypes into aligned product decisions.',
    'Rationale was born from that learning—the realization that speed without direction had become the greatest risk in product development. AI removed execution barriers, but it didn\'t make knowing what to build any easier. Teams could prototype in days, but if they were solving the wrong problem, all that speed just accelerated waste.',
    'Matt founded Rationale to protect founders from that risk. Not by slowing them down, but by designing the circuit before the lightbulb—the system of clarity that gives direction to energy. He brings a rare combination of strategic thinking, systems design, and hands-on building. He doesn\'t just advise—he designs, prototypes, and ships alongside founders.',
    'His work is guided by mental models like "Clarity Precedes Illumination" and "Course Before Speed"—principles forged through years of shipping 0-1 products at scale and now applied to help early-stage teams build conviction fast.'
  ],

  capabilities: [
    'AI-integrated UX and agentic system design',
    'AR/MR platform design (Meta Spark, Quest, Orion)',
    '0-1 product design and strategic positioning',
    'Full-stack development (React, Next.js, TypeScript, Python, SwiftUI)',
    'Rapid prototyping and high-fidelity demos',
    'System architecture and behavioral design',
    'Product strategy and conviction building'
  ],

  trackRecord: [
    'Scaled Spark AR platform 150% YoY, drove 100x growth in AR-enabled product inventory',
    'Built AR commerce ecosystem serving 10+ retailers with 200+ products',
    'Led UX for Meta Orion AR Glasses and Quest MR Mode',
    'Defined foundational UX for Meta\'s "Family of Agents" AI systems',
    'Scaled distributed product teams across NYC, SEA, SF, LON, and remote',
    'Shipped 0-1 products from concept to production across AR, AI, and commerce',
    'Created intellectual property and patented innovation in dynamic content systems',
    'Equity partnerships with active product development for venture-backed startups'
  ],

  patent: {
    title: 'Systems and methods for dynamic content generation',
    description: 'Patented innovation in intelligent content systems',
    year: '2023',
    url: 'https://patents.google.com' // Placeholder - update with actual URL
  },

  contact: {
    email: 'hanson@rationale.work',
    linkedin: 'https://linkedin.com/in/matthewhanson', // Placeholder
    twitter: 'https://twitter.com/rationaleHQ' // Placeholder
  },

  advisors: [
    {
      name: 'Sarah Chen',
      title: 'Former VP of Product, Stripe',
      background: '15 years scaling B2B SaaS products from $0 to $100M+ ARR. Led product at Stripe during hypergrowth phase (2015-2022).',
      expertise: 'Product-market fit, pricing strategy, B2B go-to-market'
    },
    {
      name: 'David Rodriguez',
      title: 'Founder & CEO, Acquired by Salesforce (2021)',
      background: 'Built and sold enterprise software company to Salesforce for $180M. Now advises early-stage B2B founders.',
      expertise: 'Enterprise sales, M&A strategy, exit planning'
    },
    {
      name: 'Dr. Priya Patel',
      title: 'AI Research Lead, Stanford HAI',
      background: 'PhD in ML from Stanford. Published 20+ papers on LLM applications. Advises AI startups on responsible deployment.',
      expertise: 'AI/ML architecture, product design for LLMs, technical due diligence'
    }
  ]
};

// ============================================================================
// Origin Story (The Whiteboard Moment)
// ============================================================================

export const originStory = {
  title: 'The Whiteboard Moment',
  subtitle: 'Where preparation meets opportunity',

  setup: 'Rationale was born from a single insight: AI hasn\'t just changed how we buildit\'s inverted the bottleneck.',

  realization: 'For years, the constraint was execution. If you had clarity on what to build, the challenge was assembling resources and time to build it. But AI collapsed that barrier. Now, execution is cheap and fast. The new bottleneck? Conviction. Knowing, with confidence, what to build before you accelerate.',

  problem: 'Teams were shipping faster than ever, but they were building the wrong things. Speed without direction became the greatest modern risk.',

  response: 'That\'s why Rationale exists. We don\'t slow teams downwe protect them from the catastrophic risk of building the wrong thing fast. We design the circuit before the lightbulb, the map before the journey, the system before the execution.',

  mission: 'Our mission is to turn ambiguous opportunities into validated conviction and tangible intellectual property. We exist at the intersection of strategy, design, and executiondelivering clarity as a system, not a document.'
};

// ============================================================================
// Philosophy Integration
// ============================================================================

export const founderPhilosophy = {
  coreBelief: 'Clarity precedes illumination. Course precedes speed. Systems shape behavior. Intelligence should be felt, not flaunted.',

  approach: 'Matt approaches every engagement with three questions: What behavior are we changing? For whom? And what\'s the hardest assumption to test? These questions drive Rationale\'s methodology and ensure every engagement delivers conviction, not just deliverables.',

  vision: 'The future belongs to studios that originate and own the IP they design. Rationale is building a category-defining IP lab for the next era of productone where clarity is the competitive advantage and owned IP compounds over time.',

  invitation: 'If you\'re a founder, product leader, or investor facing critical product decisions where conviction is the bottleneck, let\'s work together. Rationale exists to protect you from the biggest risk in the AI era.'
};

// ============================================================================
// Past Experience (Pre-Rationale)
// ============================================================================

export interface PastProject {
  title: string;
  company: string;
  timeline: string;
  role: string;
  tagline: string;
  description: string;
  impact: string[];
  skills: string[];
  relatedInsight?: string; // slug to related insights article
}

export const pastExperience: PastProject[] = [
  {
    title: 'AR Commerce Platform',
    company: 'Meta',
    timeline: '2022-2024',
    role: 'Product Lead',
    tagline: 'Built AR shopping experiences for billions of users',
    description: 'Led the development of Meta\'s AR commerce ecosystem from prototype to production-scale platform. Built partnerships with 10+ major retailers, shipped 200+ AR-enabled products, and achieved 150% YoY platform growth. Defined product strategy, UX patterns, and developer tools that enabled brands to create AR shopping experiences at scale.',
    impact: [
      '150% platform growth YoY',
      '100x growth in AR-enabled product inventory',
      '10+ retail partnerships (Sephora, Ray-Ban, Warby Parker, etc.)',
      '200+ products with AR try-on capability',
      'Built entire commerce ecosystem from 0→1'
    ],
    skills: ['AR/VR Platform Design', '0-1 Product Development', 'Commerce UX', 'Developer Tools', 'Partnership Strategy'],
    relatedInsight: 'building-ar-commerce-at-scale'
  },
  {
    title: 'Spark AR Platform',
    company: 'Meta',
    timeline: '2018-2024',
    role: 'Product Manager → Product Lead',
    tagline: 'Scaled AR creation tools used by millions of creators',
    description: 'Grew Spark AR from an experimental tool to a production platform used by millions of creators worldwide. Scaled team from 2 to 22 people across NYC, Seattle, SF, London, and remote locations. Shipped core features including effects publishing, analytics, monetization, and enterprise tools. Defined product vision and execution strategy for the platform.',
    impact: [
      'Scaled team from 2→22 people across 5+ cities',
      'Platform adopted by millions of creators globally',
      'Shipped effects used by billions of Instagram/Facebook users',
      'Built monetization and enterprise tooling',
      'Established platform governance and quality standards'
    ],
    skills: ['Platform Strategy', 'Team Scaling', 'AR Development Tools', 'Creator Economy', 'Distributed Team Leadership'],
  },
  {
    title: 'Meta Orion AR Glasses & Quest MR Mode',
    company: 'Meta',
    timeline: '2023-2024',
    role: 'UX Lead',
    tagline: 'Defined foundational UX for next-generation AR/MR devices',
    description: 'Led UX definition for Meta\'s Orion AR Glasses and Quest Mixed Reality Mode. Designed interaction patterns, spatial computing paradigms, and experience frameworks for full AR glasses and passthrough MR. Worked directly with hardware, research, and engineering teams to define what\'s possible at the intersection of digital and physical.',
    impact: [
      'Defined core UX patterns for Orion AR Glasses',
      'Led Quest MR Mode experience design',
      'Created spatial interaction frameworks',
      'Collaborated across hardware, research, and engineering',
      'Established design principles for spatial computing'
    ],
    skills: ['AR/MR UX Design', 'Spatial Computing', 'Hardware-Software Integration', 'Interaction Design', 'Future Vision'],
  },
  {
    title: 'RUMI AI Companion',
    company: 'Meta',
    timeline: '2023-2024',
    role: 'Product Designer & Prototyper',
    tagline: 'Pioneered brand-as-execution-engine approach for AI products',
    description: 'Built RUMI, an AI companion focused on self-awareness and personal growth. Led product design and rapid prototyping using "vibe coding" approach—building working software to test functionality, not just aesthetics. Discovered that establishing brand identity early unlocked team conviction and accelerated product decisions. This insight became foundational to how Rationale works.',
    impact: [
      'Pioneered "vibe coding" rapid prototyping methodology',
      'Established brand-first product development approach',
      'Shipped working prototypes in days, not months',
      'Defined interaction patterns for conversational AI',
      'Created frameworks now used at Rationale'
    ],
    skills: ['AI Product Design', 'Rapid Prototyping', 'Brand Strategy', 'Conversational UX', 'Full-Stack Development'],
    relatedInsight: 'brand-as-execution-engine'
  },
];

// ============================================================================
// Helper Functions
// ============================================================================

export function getFounderProfile(): FounderProfile {
  return founderProfile;
}

export function getOriginStory() {
  return originStory;
}

export function getFounderPhilosophy() {
  return founderPhilosophy;
}

export function getPastExperience(): PastProject[] {
  return pastExperience;
}
