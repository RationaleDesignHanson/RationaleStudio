/**
 * Philosophy & Core Principles Content
 *
 * Mental models, core beliefs, and philosophical frameworks that guide Rationale's work.
 * Source: possiblephilsophies.txt + existing about content
 */

// ============================================================================
// TypeScript Interfaces
// ============================================================================

export interface MentalModel {
  name: string;
  tagline: string;
  description: string;
  analogy: {
    setup: string;
    problem: string;
    solution: string;
  };
  application: string[];
}

export interface PhilosophySection {
  title: string;
  subtitle?: string;
  description: string;
  principles?: string[];
}

export interface ValuePair {
  value: string; // What we value
  over: string;  // Over what
}

// ============================================================================
// Core Mental Models
// ============================================================================

export const mentalModels: MentalModel[] = [
  {
    name: 'Clarity Precedes Illumination',
    tagline: 'Design the circuit before the lightbulb',
    description: 'The most elegant execution is meaningless without an underlying system of clarity, behavior, and intent.',
    analogy: {
      setup: 'A lightbulb is a brilliant invention, but it only works because a circuit directs energy with intent.',
      problem: 'Modern product teams rush to be the lightbulbthe visible execution. They skip the essential work of designing the circuit.',
      solution: 'Rationale designs the circuit. We typically start with claritythe system that gives shape to energy and ensures the right experience is illuminated for the right people.'
    },
    application: [
      'Map the problem space before the solution space',
      'Define behavior change, not features',
      'Create legible systems and narratives',
      'Build conviction before execution'
    ]
  },
  {
    name: 'Course Before Speed',
    tagline: 'Direction is the new bottleneck',
    description: 'AI has given everyone unprecedented speed. But without clear direction, more speed only gets you lost faster.',
    analogy: {
      setup: 'A ship moving slowly in the wrong direction is a problem. A ship moving at high speed toward disaster is a catastrophe.',
      problem: 'The rise of AI has accelerated everyone\'s engines, but this has created a new bottleneck. Speed is no longer the primary constraint; direction is.',
      solution: 'Rationale serves as the navigator. We chart the map, reveal the unmapped waters, and provide a clear bearing before the engines ignite.'
    },
    application: [
      'Validate assumptions before scaling execution',
      'Test the hardest risks first',
      'Protect against directional failure',
      'Build the map before accelerating'
    ]
  },
  {
    name: 'Environment Shapes Behavior',
    tagline: 'Build systems where better outcomes are the default',
    description: 'To change something, you don\'t fight the existing system. You build a new one that renders the old one obsolete.',
    analogy: {
      setup: 'Buckminster Fuller taught us that lasting change comes from designing new environments, not fighting old systems.',
      problem: 'Most products try to change user behavior through friction, forcing functions, or persuasion.',
      solution: 'We build new environmentsworkflows, behavioral systems, and mental models where better outcomes happen naturally.'
    },
    application: [
      'Design workflows that make good choices easy',
      'Remove friction from desired behaviors',
      'Build systems that adapt to users',
      'Shape the environment, not just the interface'
    ]
  },
  {
    name: 'Intelligence Felt, Not Flaunted',
    tagline: 'AI should make users feel more capable',
    description: 'The best AI experiences don\'t announce their intelligence. They demonstrate it by making users feel smarter, faster, and more confident.',
    analogy: {
      setup: 'Intelligence is invisible until you try to do the task without itthen you realize how much cognitive load it was carrying.',
      problem: 'Most products treat AI like a trophy to show off, forcing users to think about the AI instead of thinking with it.',
      solution: 'We embed intelligence in the flow. The AI works invisibly in the background, and users feel more capable as a result.'
    },
    application: [
      'Embed intelligence in the flow, not as separate features',
      'Make AI actions legible and predictable',
      'Give users agency to override AI decisions',
      'Optimize for confidence, not just speed',
      'Show intelligence through outcomes, not process'
    ]
  }
];

// ============================================================================
// Philosophy Sections (for About page)
// ============================================================================

export const philosophySections: PhilosophySection[] = [
  {
    title: 'We design systems, not screens',
    description: 'Our work is governed by foundational mental models that constitute Rationale\'s operating system. Before a single pixel is placed, we design the invisible systems that make an experience feel coherent, intelligent, and inevitable.'
  },
  {
    title: 'Conviction is the scarcest resource',
    description: 'AI has made execution cheap and fast. But knowing what to build? That\'s harder than ever. The primary bottleneck has shifted from execution to conviction. Speed without clarity accelerates waste.'
  },
  {
    title: 'We protect against the biggest risk',
    description: 'In the AI era, the greatest risk isn\'t execution failureit\'s building the wrong thing faster than ever. Our mission is to turn ambiguous opportunities into validated conviction and tangible intellectual property.'
  },
  {
    title: 'IP is the highest-leverage output',
    description: 'The most durable value a studio can create isn\'t deliverables that trade time for money, but intellectual property that compounds over time. We originate and own the IP we design.'
  }
];

// ============================================================================
// Values & Antivalues
// ============================================================================

export const values: ValuePair[] = [
  { value: 'Clarity', over: 'cleverness' },
  { value: 'Conviction', over: 'consensus' },
  { value: 'Systems thinking', over: 'feature lists' },
  { value: 'Behavior change', over: 'interface design' },
  { value: 'Intellectual property', over: 'deliverables' },
  { value: 'Kill-fast discipline', over: 'endless exploration' },
  { value: 'Speed with direction', over: 'speed without purpose' }
];

export const antivalues: string[] = [
  'Generic design agencies trading time for money',
  'Outsourced dev shops executing fixed specs',
  'Corporate moonshot labs detached from market realities',
  'High-volume venture builders prioritizing quantity',
  'Clever solutions that lack clarity',
  'Speed without conviction',
  'Features without behavior change',
  'Deliverables without durable IP'
];

// ============================================================================
// Narrative Frames (from possiblephilsophies.txt)
// ============================================================================

export const narrativeFrames = {
  architect: {
    title: 'The Architect\'s Vision',
    subtitle: 'Building the System Behind the Solution',
    intro: 'In an era where execution has become cheap and fast, the true challenge is no longer what you build, but how it is designed. We don\'t approach our work as designers of screens, but as architects of systems.',
    core: 'The most elegant user interface is meaningless without an underlying structure of clarity, behavior, and intent. Before a single pixel is placed, we design the invisible systems that make an experience feel coherent, intelligent, and inevitable.'
  },

  founder: {
    title: 'The Founder\'s Journey',
    subtitle: 'A Response to the Modern Risk',
    intro: 'Rationale was not founded in a vacuum. It is a direct and deliberate response to a new, critical problem that has emerged in the world of product development.',
    paradox: 'AI has made execution cheap, fast, and abundant. However, this acceleration has created a new and existential risk: building the wrong thing faster than ever.',
    mission: 'Our mission is to protect founders and product teams from the risk of speed without direction. We exist to turn ambiguous opportunities into validated conviction and tangible intellectual property.'
  },

  studio: {
    title: 'The Studio as a Product',
    subtitle: 'An Operating System for Innovation',
    intro: 'Rationale itself is a thoughtfully designed product. The studio\'s processes, structure, and offerings are core components of a deliberate operating system engineered to produce high-quality IP with discipline and repeatability.',
    engines: {
      client: 'Client work funds our research, brings in real-world insights, generates deal-flow, and occasionally seeds concepts for future IP.',
      lab: 'Our internal lab develops the assets that define our futureexploring 4-6 new concepts annually with strict kill-fast discipline.'
    }
  },

  futurist: {
    title: 'The Futurist\'s Manifesto',
    subtitle: 'A Thesis for the Next Era of Product',
    intro: 'Rationale is built on a clear thesis about where product development is heading and our role in shaping that future. We believe the old playbooks are breaking, and a new approach is required.',
    thesis: [
      'Intelligence must be felt, not flaunted',
      'The future is owned IP, not traded time',
      'Systems thinking beats feature lists',
      'Conviction is the new competitive advantage'
    ]
  }
};

// ============================================================================
// Operating Model
// ============================================================================

export const operatingModel = {
  title: 'A Dual-Engine Model',
  description: 'We operate on two tightly integrated engines that create a virtuous cycle of real-world insight and long-term value creation.',
  engines: [
    {
      subtitle: 'Engine 1',
      title: 'Rationale Kits',
      description: 'Client Acceleration through structured, productized engagements. These solve high-stakes problems with predictable scope and cost, fund the studio, and generate insights that seed future IP.',
      outcomes: 'Revenue, real-world insights, deal-flow, concept validation'
    },
    {
      subtitle: 'Engine 2',
      title: 'Rationale Products',
      description: 'Internal IP Lab exploring 4-6 concepts annually with strict kill-fast discipline. We identify the hardest risk first, test it in 6-8 weeks, then decide: Kill, Hold, or Double Down.',
      outcomes: 'Owned IP, spinouts, licensing opportunities, internal products'
    }
  ]
};

// ============================================================================
// The Paradox (Founder Story)
// ============================================================================

export const paradox = {
  title: 'The Paradox of Speed',
  subtitle: 'Building the Wrong Thing, Faster',
  problem: 'AI has made execution cheap, fast, and abundant. Code generation, advanced prototyping tools, and instant infrastructure have removed many of the old barriers to building. However, this acceleration has created a new, far more dangerous risk: building the wrong thing faster than ever.',
  insight: 'The primary bottleneck for product teams has shifted from execution to conviction. The hardest questions are no longer about how to build, but what to build, for whom, and with what intended behavior change.',
  solution: 'Rationale protects founders from the biggest risk in the AI era: building the wrong thing fast.'
};

// ============================================================================
// Practical Frameworks & Playbooks
// ============================================================================

export interface Framework {
  name: string;
  tagline: string;
  description: string;
  whenToUse: string[];
  howItWorks: {
    step: string;
    description: string;
  }[];
  outcomes: string[];
}

export const frameworks: Framework[] = [
  {
    name: 'Hardest Risk First',
    tagline: 'Test the thing that could kill the idea before building everything else',
    description: 'Most teams build the easy parts first and discover deal-breaking problems late. We identify the single biggest risk to the concept and test it in isolation within 1-2 weeks.',
    whenToUse: [
      'You have a promising idea but unclear viability',
      'Multiple unknowns but limited time/budget',
      'Stakeholders need proof before committing resources',
      'Technical feasibility is uncertain'
    ],
    howItWorks: [
      {
        step: 'Identify the fatal assumption',
        description: 'What single thing, if proven wrong, would kill the entire concept? Technical feasibility? User behavior? Market appetite?'
      },
      {
        step: 'Design the minimum test',
        description: 'What\'s the smallest, fastest experiment that could validate or invalidate this assumption?'
      },
      {
        step: 'Build just enough to learn',
        description: 'Create the absolute minimum artifact needed to test the assumption—often a focused prototype or wizard-of-oz demo.'
      },
      {
        step: 'Kill, hold, or double down',
        description: 'Based on results, make a clear decision: abandon the concept, shelve it for later, or commit full resources.'
      }
    ],
    outcomes: [
      'Fast failure saves months of wasted effort',
      'Clear go/no-go decision in 1-2 weeks',
      'Team alignment around validated direction',
      'Reduced risk before major investment'
    ]
  },
  {
    name: 'Behavior-First Design',
    tagline: 'Define the behavior change before designing the interface',
    description: 'Instead of starting with features or UI, we begin by mapping the exact behavior change we want to create. The interface becomes the tool to enable that behavior.',
    whenToUse: [
      'Starting a new product or major feature',
      'User adoption is low despite good UI',
      'Feature requests are piling up without clear priority',
      'Product feels like a collection of features, not a system'
    ],
    howItWorks: [
      {
        step: 'Map current state behavior',
        description: 'Document exactly how users behave today, including workarounds, pain points, and existing mental models.'
      },
      {
        step: 'Define target behavior',
        description: 'Describe the specific behavior change you want to create. Be concrete: what will users do differently?'
      },
      {
        step: 'Identify behavioral barriers',
        description: 'What prevents users from the target behavior? Lack of information? Friction? Habit? Unclear value?'
      },
      {
        step: 'Design the enablement system',
        description: 'Build the interface, flows, and intelligence needed to remove barriers and make the target behavior the default.'
      }
    ],
    outcomes: [
      'Features aligned to clear behavior goals',
      'Higher adoption through reduced friction',
      'Product feels cohesive, not fragmented',
      'Clear success metrics tied to behavior'
    ]
  },
  {
    name: 'Progressive Conviction',
    tagline: 'Build conviction in stages, not all at once',
    description: 'Instead of trying to validate everything in one big effort, we break conviction-building into discrete stages—each with specific questions, tests, and decision points.',
    whenToUse: [
      'Complex product with multiple unknowns',
      'Stakeholders need different levels of proof',
      'Budget constraints require staged investment',
      'Long-term vision needs near-term validation'
    ],
    howItWorks: [
      {
        step: 'Stage 1: Concept conviction',
        description: 'Is this problem worth solving? Does the solution direction make sense? Validate through research, competitive analysis, and stakeholder interviews.'
      },
      {
        step: 'Stage 2: Technical conviction',
        description: 'Can we actually build this? Test the hardest technical risk with a spike or proof-of-concept.'
      },
      {
        step: 'Stage 3: Behavioral conviction',
        description: 'Will users change their behavior? Test with interactive prototypes that simulate the core experience.'
      },
      {
        step: 'Stage 4: Market conviction',
        description: 'Will customers pay? Validate pricing, positioning, and go-to-market through pilots or pre-orders.'
      }
    ],
    outcomes: [
      'Clear decision gates at each stage',
      'Efficient use of time and budget',
      'Incremental risk reduction',
      'Stakeholder alignment through proof'
    ]
  },
  {
    name: 'Circuit Before Lightbulb',
    tagline: 'Design the system that gives shape to the experience',
    description: 'Before designing the visible interface (the lightbulb), we design the underlying system of logic, data flow, and intent (the circuit). This ensures the experience is coherent and scalable.',
    whenToUse: [
      'Starting a new product or platform',
      'Scaling from MVP to full product',
      'Interface feels inconsistent across surfaces',
      'Technical debt is slowing development'
    ],
    howItWorks: [
      {
        step: 'Map the data model',
        description: 'What entities exist? How do they relate? What are the core objects and their attributes?'
      },
      {
        step: 'Define behavioral logic',
        description: 'What rules govern how things work? When do actions trigger? What are the state transitions?'
      },
      {
        step: 'Design information architecture',
        description: 'How is information structured, categorized, and accessed? What taxonomies make sense?'
      },
      {
        step: 'Build the interface layer',
        description: 'Now design the UI as a reflection of the underlying system—making the circuit visible and actionable.'
      }
    ],
    outcomes: [
      'Consistent experience across surfaces',
      'Faster development through clear structure',
      'Scalable architecture for future features',
      'Reduced technical debt'
    ]
  }
];

// ============================================================================
// Helper Functions
// ============================================================================

export function getMentalModelByName(name: string): MentalModel | undefined {
  return mentalModels.find(model => model.name === name);
}

export function getAllMentalModels(): MentalModel[] {
  return mentalModels;
}

export function getPhilosophySections(): PhilosophySection[] {
  return philosophySections;
}

export function getValues(): ValuePair[] {
  return values;
}

export function getAntivalues(): string[] {
  return antivalues;
}

export function getAllFrameworks(): Framework[] {
  return frameworks;
}

export function getFrameworkByName(name: string): Framework | undefined {
  return frameworks.find(fw => fw.name === name);
}
