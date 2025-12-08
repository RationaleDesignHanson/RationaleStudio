/**
 * Partner Content Layer
 *
 * All partner portal content for active collaboration
 * Updated December 2024
 */

export const partnerContent = {
  dashboard: {
    welcome: {
      title: "Welcome to the Partner Portal",
      subtitle: "Your hub for active collaboration with Rationale Studio",
      description: "As a strategic partner, you help shape our venture roadmap, provide industry expertise, and accelerate go-to-market for portfolio companies.",
    },

    quickStats: [
      {
        label: "Active Ventures",
        value: "3",
        subtext: "Zero, Atlas, Amplify",
        icon: "📊",
      },
      {
        label: "Next Quarterly Vote",
        value: "Q1 2025",
        subtext: "Jan 15-31",
        icon: "🗳️",
      },
      {
        label: "Resources Available",
        value: "12",
        subtext: "Templates & guides",
        icon: "📚",
      },
      {
        label: "Partner Tier",
        value: "Strategic",
        subtext: "Advisory board seat",
        icon: "⭐",
      },
    ],

    activeOpportunities: [
      {
        venture: "Zero",
        status: "Beta · Dogfooding",
        opportunity: "Early user feedback",
        description: "Help test our AI email triage platform before public launch. Provide feedback on UX, accuracy, and value proposition.",
        action: "Join Beta Program",
        timeline: "Now - Q1 2025",
      },
      {
        venture: "Atlas",
        status: "Pipeline Q1-Q2 2025",
        opportunity: "CRE industry intros",
        description: "We're seeking commercial real estate brokerages interested in AI-powered intelligence platform. Help us identify pilot customers.",
        action: "Introduce Prospects",
        timeline: "Q1 2025",
      },
      {
        venture: "Amplify",
        status: "Pipeline Q1-Q2 2025",
        opportunity: "Sports agency connections",
        description: "Looking for sports agencies and athlete management firms interested in NIL + recruiting platform. Strategic partnership opportunities available.",
        action: "Facilitate Intros",
        timeline: "Q1-Q2 2025",
      },
    ],

    upcomingEvents: [
      {
        date: "Jan 15, 2025",
        event: "Q1 Venture Review Opens",
        description: "Matt presents 3-5 new venture concepts for partner feedback and voting",
        type: "review",
      },
      {
        date: "Jan 31, 2025",
        event: "Q1 Vote Closes",
        description: "Final day to submit feedback and votes on Q1 venture prioritization",
        type: "deadline",
      },
      {
        date: "Feb 7, 2025",
        event: "Q1 Decisions Announced",
        description: "Matt announces which ventures will be built in Q1 based on partner input",
        type: "announcement",
      },
    ],
  },

  engagementModels: {
    hero: {
      title: "How We Work with Partners",
      subtitle: "Flexible engagement models for rapid product development",
      description: "Rationale Kits are our systematic approach to building and validating products fast. Partners can introduce clients or co-build ventures together.",
    },

    kits: [
      {
        name: "Clarity Kit",
        duration: "1-2 weeks",
        price: "$15-30K",
        description: "Transform fuzzy ideas into concrete product vision with market validation and strategic roadmap.",
        deliverables: [
          "Market landscape analysis",
          "Competitive positioning",
          "User persona development",
          "Product vision document",
          "Go-to-market strategy",
        ],
        idealFor: "Early-stage concepts needing strategic direction",
      },
      {
        name: "Prototype Kit",
        duration: "3-4 weeks",
        price: "$30-50K",
        description: "Build high-fidelity prototypes that look and feel real. Perfect for fundraising, user testing, or stakeholder buy-in.",
        deliverables: [
          "Interactive Figma prototypes",
          "User flow diagrams",
          "Visual design system",
          "Clickable demo",
          "User testing plan",
        ],
        idealFor: "Validating concepts before development investment",
      },
      {
        name: "Validation Sprint",
        duration: "3 weeks",
        price: "$30-50K",
        description: "Rapid hypothesis testing with real users. Ship functional prototype and validate core assumptions fast.",
        deliverables: [
          "Functional MVP",
          "User testing (10-20 interviews)",
          "Validation report",
          "Pivot recommendations",
          "Next steps roadmap",
        ],
        idealFor: "Testing market fit before scaling",
      },
      {
        name: "Product Definition Kit",
        duration: "2-3 weeks",
        price: "$20-40K",
        description: "Complete technical specification for development teams. Architecture, API design, data models, and 12-week roadmap.",
        deliverables: [
          "Technical architecture (100KB+ docs)",
          "API specifications",
          "Data models",
          "12-week dev roadmap",
          "Budget breakdown",
        ],
        idealFor: "Preparing for development with external team",
      },
      {
        name: "Build Ship Run Kit",
        duration: "12 weeks",
        price: "$150-250K",
        description: "Full product build from concept to live production. End-to-end development, launch, and 30-day post-launch support.",
        deliverables: [
          "Production-ready product",
          "Infrastructure setup",
          "Launch strategy execution",
          "User onboarding",
          "30-day post-launch support",
        ],
        idealFor: "Committed to building and launching",
      },
      {
        name: "Build Partner Kit",
        duration: "6-12 months",
        price: "Equity-based",
        description: "Fractional CPO model. Matt joins as equity partner, leading product strategy and execution as part of your team.",
        deliverables: [
          "Fractional CPO leadership",
          "Product strategy & roadmap",
          "Team augmentation",
          "Continuous iteration",
          "Strategic guidance",
        ],
        idealFor: "Long-term partnership with equity alignment",
      },
    ],

    paymentModels: [
      {
        type: "Cash",
        description: "Standard cash payment for services",
        structure: "50% upfront, 50% on delivery",
        idealFor: "Established companies with budget",
        terms: "Net 30 payment terms",
      },
      {
        type: "Equity",
        description: "Take equity instead of cash payment",
        structure: "Services rendered at $250K valuation equivalent",
        idealFor: "Early-stage startups without cash",
        terms: "Preferred equity, board observer seat typical",
      },
      {
        type: "Hybrid",
        description: "Mix of cash + equity",
        structure: "Reduced cash + equity upside",
        idealFor: "Balanced risk/reward partnership",
        terms: "Negotiable based on stage and strategic value",
      },
    ],

    partnerValue: {
      title: "How Partners Add Value",
      opportunities: [
        {
          type: "Client Introductions",
          description: "Introduce clients who need rapid product development. You get referral fee or co-investment opportunity.",
          example: "CRE partner introduces brokerage firm → Atlas pilot engagement → Partner gets 10% referral fee",
        },
        {
          type: "Co-Build Ventures",
          description: "Co-create ventures in your domain. You bring industry expertise + distribution, we build the product.",
          example: "Sports agency partner co-builds Amplify → Equity split based on contribution → Partner becomes VP Sales",
        },
        {
          type: "Strategic Guidance",
          description: "Provide industry expertise, customer insights, and GTM feedback for portfolio companies.",
          example: "Real estate partner advises on Atlas feature prioritization → Early access to product → Strategic investment opportunity",
        },
      ],
    },
  },

  portfolio: {
    ventures: [
      {
        name: "Zero",
        status: "Beta · Dogfooding",
        tagline: "AI email triage for busy parents",
        stage: "Pre-Launch (Q1 2025)",
        opportunity: "Beta testing & early user feedback",
        partnerValue: "Test product, provide UX feedback, introduce pilot users",
        metrics: {
          architecture: "268 Swift files, 10 microservices",
          aiAccuracy: "91.7% classification accuracy",
          market: "$28B productivity software TAM",
        },
        nextSteps: [
          "Join beta program (rolling invites)",
          "Provide feedback on core workflows",
          "Introduce 5-10 target users for pilot",
        ],
      },
      {
        name: "Atlas",
        status: "Pipeline Q1-Q2 2025",
        tagline: "CRE intelligence platform",
        stage: "Blueprint Complete (103KB docs)",
        opportunity: "Strategic partner with CRE industry access",
        partnerValue: "Co-build opportunity, introduce pilot customers, advisory role",
        metrics: {
          documentation: "103KB complete technical architecture",
          market: "Commercial real estate brokerages",
          budget: "$165K recommended for full MVP",
          timeline: "12 weeks to production-ready",
        },
        nextSteps: [
          "Review technical blueprint",
          "Identify 2-3 pilot customers",
          "Discuss co-build partnership terms",
        ],
      },
      {
        name: "Amplify",
        status: "Pipeline Q1-Q2 2025",
        tagline: "NIL + recruiting for sports agents",
        stage: "Blueprint Complete (129KB docs)",
        opportunity: "Strategic partner with sports agency network",
        partnerValue: "Co-build opportunity, leverage agency relationships, GTM partnership",
        metrics: {
          documentation: "129KB complete blueprint",
          market: "Sports agencies, athlete management",
          budget: "$60-80K pilot, $200-250K full platform",
          timeline: "16 weeks to MVP",
        },
        nextSteps: [
          "Review 4-module platform architecture",
          "Map sports agency network for distribution",
          "Explore co-build + equity partnership",
        ],
      },
    ],

    upcomingConcepts: {
      title: "Q1 2025 Venture Concepts Preview",
      description: "These concepts will be presented for partner vote in January 2025. Full briefs available during Q1 review period.",
      concepts: [
        {
          name: "Project Echo",
          category: "B2B SaaS",
          oneLiner: "AI-powered meeting intelligence for remote teams",
          problem: "Too much time in meetings, not enough action",
        },
        {
          name: "Project Horizon",
          category: "Consumer App",
          oneLiner: "Personalized learning paths using AI tutoring",
          problem: "One-size-fits-all education doesn't work",
        },
        {
          name: "Project Nexus",
          category: "Vertical Software",
          oneLiner: "Practice management for independent therapists",
          problem: "Current EMR systems are too complex and expensive",
        },
      ],
    },
  },

  governance: {
    hero: {
      title: "How Partnership Works",
      subtitle: "Transparent process for venture decisions and strategic input",
      description: "Strategic partners participate in quarterly venture reviews, provide feedback on roadmap prioritization, and help shape which products we build together.",
    },

    quarterlyProcess: {
      title: "Quarterly Venture Review Process",
      phases: [
        {
          name: "Venture Review Opens",
          duration: "Week 1 (Q1: Jan 1-7)",
          description: "Matt presents 3-5 new venture concepts with detailed briefs",
          details: [
            "Market analysis & TAM sizing",
            "Competitive landscape",
            "Technical feasibility assessment",
            "Budget & timeline estimates",
            "Strategic fit with portfolio",
          ],
          deliverables: "Full venture briefs (20-30 pages each)",
        },
        {
          name: "Partner Feedback Period",
          duration: "Weeks 2-3 (Q1: Jan 8-31)",
          description: "Partners review briefs and provide structured feedback",
          details: [
            "Ask questions via partner portal",
            "Submit feedback on concept prioritization",
            "Vote on which ventures to pursue",
            "Indicate interest in co-building",
            "Suggest modifications or pivots",
          ],
          deliverables: "Partner votes & feedback submissions",
        },
        {
          name: "Decision & Announcement",
          duration: "Week 4 (Q1: Feb 1-7)",
          description: "Matt makes final call incorporating partner input",
          details: [
            "Weighted voting results shared",
            "Final decisions announced",
            "Build timeline & resource allocation",
            "Co-build partnerships confirmed",
            "Next quarter preview",
          ],
          deliverables: "Q1 venture roadmap published",
        },
        {
          name: "Build & Launch",
          duration: "Following 8-12 weeks",
          description: "Ventures are built with partner involvement",
          details: [
            "Bi-weekly progress updates",
            "Partner advisory calls",
            "Customer intro opportunities",
            "Beta testing participation",
            "GTM strategy refinement",
          ],
          deliverables: "Launched ventures, partner impact reports",
        },
      ],
    },

    partnerRights: {
      title: "Strategic Partner Rights",
      description: "What strategic partners get in exchange for capital + strategic value",
      rights: [
        {
          right: "Quarterly Voting",
          description: "Vote on which venture concepts to prioritize each quarter",
          weight: "Votes weighted by equity stake + strategic value contribution",
          example: "$250K strategic partner with CRE expertise = 1.5x voting weight on Atlas-related concepts",
        },
        {
          right: "Detailed Venture Briefs",
          description: "Access to full venture documentation before launch decisions",
          includes: "Market analysis, technical architecture, budget breakdowns, competitive landscape",
          timing: "2 weeks before quarterly vote closes",
        },
        {
          right: "Advisory Board Seat",
          description: "Optional advisory board seat for $250K+ strategic partners",
          commitment: "Quarterly meetings, strategic guidance, industry connections",
          compensation: "Additional equity grant or board fee",
        },
        {
          right: "Right of First Refusal",
          description: "Opportunity to lead or participate in portfolio company rounds",
          terms: "30-day ROFR on Series A+ rounds",
          example: "Zero raises Series A → Strategic partner gets first right to invest",
        },
        {
          right: "Quarterly Dashboard Access",
          description: "Real-time visibility into portfolio company metrics",
          metrics: "Revenue, users, burn rate, runway, key milestones",
          frequency: "Updated monthly, detailed reports quarterly",
        },
        {
          right: "Co-Build Opportunities",
          description: "Participate directly in venture development",
          structure: "Equity-based partnerships for strategic partners bringing distribution/expertise",
          example: "Sports partner co-builds Amplify → Becomes VP Sales with equity package",
        },
      ],
    },

    votingMechanics: {
      title: "How Voting Works",
      description: "Transparent, weighted voting system based on equity stake and strategic value",
      process: [
        "Each partner receives 3-5 venture concept briefs",
        "Partners rank concepts 1-5 (1 = highest priority)",
        "Votes weighted by: 70% equity stake + 30% strategic value contribution",
        "Strategic value assessed by: Industry expertise, distribution access, customer intros, advisory contributions",
        "Final decision made by founder incorporating partner input + portfolio strategy",
        "Results shared with all partners (anonymized vote breakdown)",
      ],
      example: {
        scenario: "Q1 2025 Vote Example",
        concepts: ["Project Echo (Meeting Intelligence)", "Project Horizon (AI Tutoring)", "Project Nexus (Therapist EMR)"],
        partners: [
          { name: "Partner A", equity: "5%", strategic: "High (B2B SaaS expertise)", weight: "1.4x", vote: "Echo #1" },
          { name: "Partner B", equity: "3%", strategic: "Medium (Capital only)", weight: "1.0x", vote: "Horizon #1" },
          { name: "Partner C", equity: "10%", strategic: "High (Healthcare network)", weight: "1.5x", vote: "Nexus #1" },
        ],
        result: "Nexus wins (Partner C's high weight + strategic fit) → Becomes Q1 build priority",
      },
    },
  },

  resources: {
    hero: {
      title: "Partner Resources",
      subtitle: "Templates, guides, and tools for effective collaboration",
      description: "Everything you need to introduce clients, provide strategic feedback, and accelerate portfolio ventures.",
    },

    templates: [
      {
        name: "Client Introduction Email",
        description: "Template for introducing potential clients to Rationale for Kits engagements",
        format: "Email template",
        downloadUrl: "#",
      },
      {
        name: "Venture Feedback Form",
        description: "Structured feedback template for quarterly venture reviews",
        format: "Google Form",
        downloadUrl: "#",
      },
      {
        name: "Customer Intro Process",
        description: "Step-by-step guide for introducing pilot customers to portfolio companies",
        format: "Process doc",
        downloadUrl: "#",
      },
      {
        name: "Advisory Call Agenda",
        description: "Standard agenda template for partner advisory calls",
        format: "Meeting template",
        downloadUrl: "#",
      },
    ],

    calendar: {
      title: "2025 Quarterly Review Calendar",
      quarters: [
        {
          quarter: "Q1 2025",
          reviewOpen: "Jan 1-7",
          feedbackPeriod: "Jan 8-31",
          announcement: "Feb 1-7",
          buildPhase: "Feb 8 - Apr 30",
        },
        {
          quarter: "Q2 2025",
          reviewOpen: "Apr 1-7",
          feedbackPeriod: "Apr 8-30",
          announcement: "May 1-7",
          buildPhase: "May 8 - Jul 31",
        },
        {
          quarter: "Q3 2025",
          reviewOpen: "Jul 1-7",
          feedbackPeriod: "Jul 8-31",
          announcement: "Aug 1-7",
          buildPhase: "Aug 8 - Oct 31",
        },
        {
          quarter: "Q4 2025",
          reviewOpen: "Oct 1-7",
          feedbackPeriod: "Oct 8-31",
          announcement: "Nov 1-7",
          buildPhase: "Nov 8 - Jan 31, 2026",
        },
      ],
    },

    contact: {
      title: "Get in Touch",
      founder: {
        name: "Matt Hanson",
        role: "Founder, Rationale Studio",
        email: "matt@rationale.work",
        calendly: "calendly.com/rationale",
      },
      support: {
        general: "hello@rationale.work",
        partnerships: "partners@rationale.work",
        technical: "tech@rationale.work",
      },
    },

    faq: [
      {
        question: "How often do quarterly votes happen?",
        answer: "Four times per year (Jan, Apr, Jul, Oct). Each review period lasts 2 weeks for feedback and voting.",
      },
      {
        question: "What if I disagree with a venture decision?",
        answer: "Matt makes final decisions but incorporates weighted partner input. If a concept you opposed gets built, you can choose not to participate in that venture's advisory capacity.",
      },
      {
        question: "Can I invest more to increase my voting weight?",
        answer: "Yes. Additional capital commitments increase equity stake, which affects voting weight. Strategic value contributions (intros, expertise) also increase weight.",
      },
      {
        question: "Do I have to participate in every quarterly review?",
        answer: "No. Participation is optional but encouraged. Non-voting partners receive decisions via email.",
      },
      {
        question: "How do co-build partnerships work?",
        answer: "If you want to co-build a venture, we negotiate equity split based on capital + strategic value + time commitment. Typical structure: You (20-40%), Rationale (40-60%), Future investors (20-40%).",
      },
      {
        question: "Can I introduce clients for Kits engagements?",
        answer: "Absolutely! You receive 10% referral fee for successful engagements, or option to co-invest in equity-based engagements.",
      },
    ],
  },
};
