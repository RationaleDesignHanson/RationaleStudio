/**
 * Service Kits Content Layer
 *
 * Structured data for Rationale's service offerings (kits).
 * Aligns with the business model defined in the philosophy documents.
 */

export type ServiceKit = {
  slug: string;                // URL slug: "clarity-kit", "prototype-kit"
  name: string;                // Display name: "Clarity Kit"
  tagline: string;             // Brief description
  duration: string;            // Timeline: "1-2 weeks", "2-4 weeks"
  pricing: string;             // Price range or "Contact for pricing"

  // Core content
  description: string;         // What this kit is for
  whatYouGet: string[];        // Bulleted list of deliverables
  deliverables: string[];      // Specific outputs

  // Details
  process?: string[];          // Step-by-step process
  perfectFor: string[];        // Ideal use cases

  // ICP Targeting
  idealFor?: string[];         // Who should choose this kit
  notIdealFor?: string[];      // Who shouldn't choose this kit

  // Social proof
  caseStudy?: {
    title: string;
    description: string;
    outcome: string;
    link?: string;
  };
};

export const serviceKits: ServiceKit[] = [
  {
    slug: "clarity-kit",
    name: "Clarity Kit",
    tagline: "Fast conviction for critical decisions",
    duration: "2-4 weeks",
    pricing: "2-week sprint · Cash or equity",

    description:
      "Know if your idea will work before committing your seed round. In 2-4 weeks, we validate your core assumptions, identify the hardest technical risks, and deliver a go/no-go recommendation based on real analysis—not intuition. You get the clarity to move forward confidently or pivot intelligently, saving months of wasted runway.",

    whatYouGet: [
      "Vision, user types, mental models",
      "Experience architecture",
      "Early prototype & success metrics",
      "Problem space analysis & opportunity mapping",
      "Competitive landscape & strategic positioning",
      "Go/no-go recommendation with rationale"
    ],

    deliverables: [
      "Strategy document with clear recommendations",
      "Feature roadmap with effort estimates",
      "Technical architecture overview",
      "Risk assessment & mitigation plan",
      "Next steps & resource requirements"
    ],

    process: [
      "Week 1: Discovery, analysis, strategy",
      "Week 2: Validation, documentation, presentation"
    ],

    perfectFor: [
      "New feature validation",
      "Product direction decisions",
      "Strategic pivots",
      "Investment proposals",
      "Fast decision-making needs"
    ],

    idealFor: [
      "Pre-seed founders with <18 months runway who need fast validation",
      "Product leaders evaluating new feature investments",
      "Technical founders facing strategic product decisions",
      "Teams preparing investment proposals or board presentations"
    ],

    notIdealFor: [
      "Teams ready to build (you need engineering, not validation)",
      "Enterprise teams requiring lengthy procurement processes",
      "Projects needing ongoing support or maintenance"
    ],

    caseStudy: {
      title: "FUBO AI Thumbnail Generator",
      description: "2-week strategic sprint delivered feature roadmap, technical specifications, and working system with 24 styles",
      outcome: "100% style success rate, 3-5 second generation time, bulk processing for 200+ teams across 8 leagues",
      link: "/cases/fubo"
    }
  },

  {
    slug: "prototype-kit",
    name: "Prototype Kit",
    tagline: "Working prototypes that demonstrate your vision",
    duration: "4-6 weeks",
    pricing: "4-6 week engagement · Cash or equity",

    description:
      "Walk into your Series A pitch with a working demo, not slides. In 4-6 weeks, we build high-fidelity prototypes that demonstrate your vision in ways decks never could. Investors, internal stakeholders, and early users get to experience your product before you've written production code—creating momentum, conviction, and tangible proof of concept.",

    whatYouGet: [
      "High-fidelity interactive prototype",
      "Motion & interaction design",
      "Narrative for fundraising / internal buy-in",
      "User flows and interaction patterns",
      "Visual design aligned with brand",
      "Prototype refinement and iteration"
    ],

    deliverables: [
      "Working prototype (clickable or functional)",
      "Interaction specification document",
      "Visual design system foundations",
      "Presentation narrative and demo flow",
      "Prototype handoff for engineering"
    ],

    process: [
      "Week 1: Discovery, flows, wireframes",
      "Weeks 2-3: Prototype development & iteration",
      "Week 4: Refinement, polish, handoff"
    ],

    perfectFor: [
      "Investor demonstrations and fundraising",
      "Internal stakeholder buy-in",
      "Complex interaction visualization",
      "Novel product concepts requiring clarity",
      "Creating momentum and conviction"
    ],

    idealFor: [
      "Seed-stage founders preparing to raise Series A",
      "Teams needing to demonstrate novel interactions or AI experiences",
      "Product leaders seeking internal buy-in for ambitious initiatives",
      "Founders with technical validation who need tangible demos"
    ],

    notIdealFor: [
      "Teams needing production-ready code (this is demo-quality)",
      "Projects with well-understood, conventional UX patterns",
      "Teams requiring full technical specifications (see Product Definition Kit)"
    ],

    caseStudy: {
      title: "Project Compass: AI Video Indexing",
      description: "6-week prototype partnership delivered genre channel system with real-time indexing and multi-agent deployment architecture",
      outcome: "Working prototype enabled fundraising conversations and internal buy-in for agentic remote concept",
      link: "/cases/rumi"
    }
  },

  {
    slug: "validation-kit",
    name: "Validation Kit",
    tagline: "Test, learn, and decide with confidence",
    duration: "2-6 weeks",
    pricing: "Scoped validation · Cash or equity",

    description:
      "Don't build for 6 months only to discover users don't want it. If you have a prototype or concept, we test it with real users in your target market. In 2-6 weeks, you get hard data on whether your assumptions hold up, what needs to change, and a clear go/no-go/pivot recommendation. Make your next major investment decision based on evidence, not hope.",

    whatYouGet: [
      "Structured user testing with target audience",
      "User behavior analysis & insights report",
      "Market signal analysis & competitive assessment",
      "Go / no-go / pivot recommendation",
      "Testing protocol design and execution",
      "Risk assessment with validated assumptions"
    ],

    deliverables: [
      "Comprehensive user testing insights report",
      "Validated (or invalidated) assumptions",
      "Go/no-go recommendation with evidence",
      "Pivot opportunities (if relevant)",
      "Strategic next steps with priorities",
      "Market validation summary and signals"
    ],

    process: [
      "Week 1: Testing protocol design & user recruitment",
      "Weeks 2-4: User testing execution & observation",
      "Weeks 5-6: Analysis, synthesis, strategic recommendations"
    ],

    perfectFor: [
      "Pre-launch validation and risk assessment",
      "Strategic assumption testing",
      "Investment diligence and decision support",
      "Market signal gathering before full build",
      "Pivot evaluation with user evidence"
    ],

    idealFor: [
      "Founders with working prototypes who need real user feedback",
      "Series A+ teams validating major feature investments",
      "VCs conducting product diligence on portfolio companies",
      "Product teams evaluating pivot vs. persevere decisions"
    ],

    notIdealFor: [
      "Teams without an existing prototype or concept to test",
      "Projects where the problem space itself needs exploration first",
      "Teams not prepared to act on negative validation results"
    ]
  },

  {
    slug: "product-definition-kit",
    name: "Product Definition Kit",
    tagline: "From concept to engineering-ready specification",
    duration: "6-12 weeks",
    pricing: "Multi-phase build · Cash or equity",

    description:
      "Stop losing engineers to ambiguity and scope creep. In 6-12 weeks, we deliver complete engineering-ready specifications: full design system, technical architecture, detailed PRDs, and MVP scope. Your eng team gets everything they need to build without guessing, reducing rework and keeping your timeline predictable. Start building when you're ready to ship, not when you're still figuring it out.",

    whatYouGet: [
      "Full UX/UI system + design tokens",
      "Engineering-ready PRD",
      "MVP scope + roadmap",
      "Product definition & user flows",
      "Technical architecture & stack recommendations",
      "Handoff documentation for engineering"
    ],

    deliverables: [
      "Complete UI component library",
      "Design system with tokens and guidelines",
      "Detailed product requirements document",
      "Technical architecture specification",
      "MVP feature list with priorities",
      "3-6 month product roadmap",
      "Engineering handoff package"
    ],

    process: [
      "Weeks 1-2: Discovery, definition, flows",
      "Weeks 3-5: Design system & component development",
      "Weeks 6-7: Documentation & specification",
      "Week 8: Engineering handoff & support"
    ],

    perfectFor: [
      "0-1 product launches",
      "Pre-engineering product definition",
      "Design system needs",
      "Technical architecture planning",
      "Engineering team onboarding"
    ],

    idealFor: [
      "Seed to Series A teams with eng resources but no product definition",
      "Technical founders who've validated the idea and need build specs",
      "Product teams starting major platform initiatives",
      "Companies hiring engineering teams who need detailed handoff docs"
    ],

    notIdealFor: [
      "Teams without validated product-market fit signals",
      "Projects requiring ongoing design partnership (see Build Partner)",
      "Early-stage exploration (start with Clarity or Prototype Kit)"
    ]
  },

  {
    slug: "build-ship-run",
    name: "Build, Ship & Run",
    tagline: "From concept to market-ready product and beyond",
    duration: "6-18 months",
    pricing: "Long-term partnership · Equity preferred",

    description:
      "Don't hire a team, hire a product partner. From 6-18 months, we take you from concept through launch and into sustained growth—strategy, design, engineering, and post-launch iteration. You get a fully functioning product in market, not just documentation. We stay with you through real users, real feedback, and real iteration until you have product-market fit signals. No handoff until you're ready to scale.",

    whatYouGet: [
      "Full product definition and design system",
      "Engineering and technical implementation",
      "Launch strategy and go-to-market planning",
      "Post-launch iteration and optimization",
      "Ongoing strategic guidance and feature development",
      "Quality assurance and performance monitoring"
    ],

    deliverables: [
      "Shipped product in production",
      "Complete design system and component library",
      "Technical infrastructure and architecture",
      "User testing and validation reports",
      "Go-to-market strategy and execution",
      "Post-launch performance metrics",
      "Ongoing iteration and support"
    ],

    process: [
      "Months 1-3: Product definition, design system, technical foundation",
      "Months 4-6: Development, testing, iteration",
      "Months 7-9: Launch preparation, go-to-market, deployment",
      "Months 10+: Post-launch optimization, feature development, growth"
    ],

    perfectFor: [
      "Pre-seed to Series A startups",
      "Ambitious 0-1 product launches",
      "Teams needing both strategy and execution",
      "Long-term product vision with near-term milestones",
      "Market-ready products requiring ongoing iteration"
    ],

    idealFor: [
      "Pre-seed to Series A founders who need full product delivery",
      "Technical co-founders who need a product partner, not just contractors",
      "Teams with runway for 6-18 month product development cycles",
      "Ambitious 0-1 launches requiring strategy + design + engineering"
    ],

    notIdealFor: [
      "Teams needing quick validation only (see Clarity or Prototype Kit)",
      "Projects with tight <3 month timelines",
      "Maintenance or incremental feature work"
    ]
  },

  {
    slug: "build-partner",
    name: "Build Partner",
    tagline: "Fractional CPO with equity alignment",
    duration: "Ongoing",
    pricing: "Equity alignment · Highly selective",

    description:
      "Get the product co-founder you couldn't find or afford. We act as your fractional CPO with equity alignment—making product decisions, owning the roadmap, and building alongside your team. Not consulting, not contracting: true partnership where we only win when you win. We're highly selective (2-3 clients at a time) and selectively partner with equity where our expertise creates strategic advantage in AI, AR, or 0-1 products.",

    whatYouGet: [
      "Fractional CPO / product co-founder",
      "Strategic product roadmap & vision",
      "Product decision-making partner",
      "Team hiring & mentorship guidance",
      "Design reviews & technical architecture oversight",
      "Equity stake alignment for long-term commitment"
    ],

    deliverables: [
      "Product strategy & vision document",
      "Quarterly roadmap planning",
      "Design & technical decision support",
      "Hiring guidance for product/design/eng",
      "Weekly strategic sessions",
      "Ongoing product leadership"
    ],

    process: [
      "Months 1-3: Product vision, roadmap, team structure",
      "Months 4-6: Strategic guidance, decision-making, hiring",
      "Months 7+: Ongoing leadership, scale planning, optimization"
    ],

    perfectFor: [
      "Early-stage startups (pre-seed to Series A)",
      "Technical co-founder needs",
      "Long-term product vision",
      "Hands-on building + strategic guidance",
      "Aligned incentives & skin in the game"
    ],

    idealFor: [
      "Pre-seed founders who need a fractional CPO with equity alignment",
      "Technical founders building in AI, AR, or novel product spaces",
      "Teams where Rationale's expertise = strategic advantage",
      "Founders willing to give equity for truly aligned partnership"
    ],

    notIdealFor: [
      "Teams seeking traditional fee-for-service work",
      "Projects outside our expertise (AI, AR, 0-1 products)",
      "Short-term engagements or quick turnarounds",
      "Teams not ready for significant equity dilution"
    ],

    caseStudy: {
      title: "Zero: AI-Powered Email Client",
      description: "Active equity partnership building AI-powered email triage with swipeable card interface and multi-step flows",
      outcome: "Web prototype + iOS native app delivered, ongoing product development with aligned equity stake",
      link: "/cases/zero"
    }
  }
];

/**
 * Helper function to get a kit by slug
 */
export function getKitBySlug(slug: string): ServiceKit | undefined {
  return serviceKits.find(kit => kit.slug === slug);
}

/**
 * Helper function to get all kit slugs (for static generation)
 */
export function getAllKitSlugs(): string[] {
  return serviceKits.map(kit => kit.slug);
}

/**
 * Expertise areas for services page
 */
export const expertiseAreas = [
  {
    title: "AI-Integrated UX",
    description: "Agentic AI experiences, multi-modal interactions, uncertainty & probabilistic design, AI-powered workflows",
    icon: "brain" // or actual icon component reference
  },
  {
    title: "AR/MR Platform Design",
    description: "Spatial computing, mixed reality experiences, Meta Spark AR, Quest, Orion, physical-digital intersections",
    icon: "cube"
  },
  {
    title: "0-1 Product Design",
    description: "Ambiguous problem spaces, rapid prototyping, user testing & validation, engineering handoff",
    icon: "rocket"
  },
  {
    title: "Full-Stack Development",
    description: "React, Next.js, TypeScript, Node.js, Python, SwiftUI, iOS native, Cloud infrastructure",
    icon: "code"
  }
];

/**
 * Service selection guide
 */
export const selectionGuide = {
  clarityKit: {
    when: "You need fast conviction (1-2 weeks)",
    needs: ["Go/no-go decision", "Feature roadmap", "Strategic validation", "Investment pitch support"]
  },
  prototypeKit: {
    when: "You need a working prototype (2-4 weeks)",
    needs: ["User testing & validation", "Technical architecture", "Engineering handoff", "Investor demo"]
  },
  productDefinitionKit: {
    when: "You need complete product specification (6-8 weeks)",
    needs: ["Full design system", "Engineering-ready PRDs", "MVP definition", "Technical architecture"]
  },
  buildShipRun: {
    when: "You need complete product delivery (6-18 months)",
    needs: ["Full product development", "Launch and go-to-market", "Post-launch iteration", "Strategic + execution partnership"]
  },
  validationKit: {
    when: "You need to test and validate (2-6 weeks)",
    needs: ["User testing", "Market signals", "Go/no-go recommendation", "Assumption validation"]
  },
  buildPartner: {
    when: "You need long-term collaboration",
    needs: ["Hands-on building", "Strategic + tactical support", "Aligned incentives", "Co-builder relationship"]
  }
};

/**
 * Payment flexibility for all kits
 */
export const paymentFlexibility = {
  title: 'Flexible Payment Models',
  subtitle: 'We structure engagements to align with your stage and capital strategy',
  description: 'Every kit can be structured as cash, cash + equity, or all equity. We believe the best partnerships are built on aligned incentives.',

  models: [
    {
      type: 'Cash',
      icon: '$',
      label: 'Traditional Fee-for-Service',
      description: 'Fixed fee with clear scope and deliverables. Most common for quick sprints and validations. Best for teams with allocated budget.',
      availability: 'All kits available',
      ventureLink: '/ventures'
    },
    {
      type: 'Cash + Equity',
      icon: '$+%',
      label: 'Hybrid Partnership',
      description: 'Reduced cash rate + meaningful equity stake. Most common for 3-12 month builds. Best for startups balancing cash preservation with partnership.',
      availability: 'Available for multi-week engagements',
      ventureLink: '/ventures'
    },
    {
      type: 'All Equity',
      icon: '%',
      label: 'True Co-Builder',
      description: 'Like Zero—we\'re building it because we believe. 0.5-3% typical for 6-18 month partnerships. Full equity engagement with maximum alignment.',
      availability: 'Build Partner & long-term engagements',
      ventureLink: '/ventures/zero'
    }
  ],

  note: 'Exact pricing shared on call after scope is defined. Every kit can be structured as cash, cash + equity, or equity-only based on your stage and capital strategy.',
  venturesNote: 'See our ventures for examples of equity partnerships in action.'
};
