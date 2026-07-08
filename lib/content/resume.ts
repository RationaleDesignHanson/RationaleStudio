/**
 * RESUME — canonical résumé content ("Product Architect" v2), the single
 * source of truth for the /resume page and the downloadable PDF (which is
 * printed from that page). Keep this in sync with any external copies.
 */

export interface ResumeEntry {
  role: string;
  org?: string;
  meta: string; // location · dates
  intro?: string;
  points?: string[];
}

export interface PortfolioItem {
  name: string;
  summary: string;
  points: string[];
}

export const RESUME = {
  name: 'Matt Hanson',
  title: 'Founder · Product Architect · AI Systems Leader',
  contact: {
    location: 'NYC Area',
    phone: '(516) 857.0151',
    email: 'hanson@rationale.work',
    portfolioLabel: 'rationale.work',
    portfolioUrl: 'https://rationale.work',
    linkedinUrl: 'https://www.linkedin.com/in/thematthanson',
  },

  summary: [
    'Product Architect with 25+ years building consumer products, emerging technology systems, AI-enabled experiences, and product organizations.',
    'Over that time, product strategy, design, engineering, research, and organizational leadership have become one continuous practice. Matt’s work is defined by the ability to move from ambiguity to coherent product: defining the strategy, shaping the experience, understanding the technical architecture, guiding execution, validating with evidence, and evolving the system over time.',
    'At Meta, Messenger, Reality Labs, FAIR, fuboTV, and now as founder of Rationale, Matt has led work across large-scale consumer products, AR and mixed reality platforms, AI research translation, design systems, streaming, growth, and AI-native software development. His current work uses AI to accelerate product architecture rather than replace expertise: compressing the distance between vision, prototype, implementation, evidence, and iteration.',
  ],

  current: {
    role: 'Founder / Product Architect',
    org: 'Rationale',
    meta: 'NYC · 2025 – Present',
    intro: [
      'Founded Rationale as an independent product architecture practice built around a simple operating principle: vision bears the burden of proof. The work combines product strategy, UX, interface design, software architecture, AI-assisted implementation, validation, and platform development into a single end-to-end practice.',
      'Rationale is organized as a portfolio: products validate platform ideas; platform capabilities are extracted from products. The current portfolio includes Heirloom, Mise, Grim, and WORLD.',
    ],
    portfolio: [
      {
        name: 'Heirloom',
        summary:
          'Product architecture and implementation for a family knowledge and recipe preservation product across iOS, Android, and web.',
        points: [
          'Designed and built a production consumer product for preserving recipes, family food knowledge, attribution, lineage, and cultural memory.',
          'Developed AI-assisted recipe import across multiple input types, including photos, video, voice, web pages, and printed materials.',
          'Built around multilingual use, creator attribution, knowledge preservation, and the social context surrounding recipes rather than recipes as isolated content.',
          'Uses product behavior to test larger questions about memory, authorship, personal archives, structured knowledge, and long-lived consumer data.',
        ],
      },
      {
        name: 'Mise',
        summary: 'Active product work in development.',
        points: [
          'Exploring how AI-native product architecture can support high-frequency personal and consumer workflows.',
          'Used as a proving ground for interaction models, structured task flows, product reasoning, and implementation patterns.',
          'Presented as current work in progress rather than a finished public platform.',
        ],
      },
      {
        name: 'Grim',
        summary: 'Knowledge product and collaborative thinking system in development.',
        points: [
          'Focused on how people structure, evolve, and collaborate around ideas before those ideas become formal work.',
          'Tests patterns for shared reasoning, knowledge capture, synthesis, and the transition from loose thinking to executable product direction.',
          'Architecture is intentionally evolving through use, evidence, and implementation rather than fixed in advance.',
        ],
      },
      {
        name: 'WORLD',
        summary:
          'Ongoing architectural work for preserving reasoning, provenance, evidence, and implementation knowledge across AI-assisted software development.',
        points: [
          'Not positioned as a finished commercial platform.',
          'Developed as a deeper architectural layer emerging from product work.',
          'Explores how product decisions, research evidence, implementation choices, code context, and design reasoning can remain connected over time.',
          'Intended to reduce the loss of context that typically occurs between strategy, design, engineering, research, and iteration.',
          'Uses real products as evidence for platform capabilities instead of relying on abstract platform claims.',
        ],
      },
    ] as PortfolioItem[],
  },

  experience: [
    {
      role: 'VP of Design',
      org: 'fuboTV',
      meta: 'New Features, Growth, Design Systems · Hybrid NYC · 2025',
      intro:
        'Led product design across fuboTV, with responsibility for growth, new feature development, design systems, and cross-platform user experience.',
      points: [
        'Led design across TV, mobile, and web surfaces for a live streaming product serving sports fans and entertainment audiences.',
        'Defined product design strategy to unify experience quality across platforms and use cases.',
        'Partnered with Product, Engineering, and Data Science leadership to connect design priorities to growth, retention, conversion, and engagement.',
        'Drove initiatives across content placement, onboarding, discovery, and user engagement.',
        'Established design systems, processes, and practices intended to help the organization move faster without fragmenting the customer experience.',
        'Extended executive design leadership into AI feature development and product quality systems.',
      ],
    },
    {
      role: 'Senior Product Design Manager',
      org: 'Meta · FAIR (Fundamental AI Research) — Embodied AI',
      meta: 'Remote · 2023 – 2025',
      intro:
        'Led design across AI research initiatives translating embodied intelligence, agentic systems, robotics, and behavioral models into usable product and research workflows.',
      points: [
        'Led 4+ teams developing end-to-end experiences for AI agents spanning physical, virtual, digital, and wearable domains.',
        'Helped define user-facing experiences that also served as realistic modeling targets for AI development.',
        'Led design for socially intelligent robots for human-assistive tasks and behavioral foundation model work, including SIRo and Motivo.',
        'Developed strategy and workflow improvements for model development pipelines supporting agentic AI experiences in robotics and real/virtual world contexts.',
        'Improved annotation systems, benchmarking workflows, and research tooling to accelerate model evaluation and quality.',
        'Introduced demo-driven workflows to improve alignment, make research progress legible, and create stronger connections between research, design, engineering, and product direction.',
      ],
    },
    {
      role: 'Senior Product Design Manager',
      org: 'Meta · Reality Labs — AR / MR Glasses + Mobile',
      meta: 'Remote · 2018 – 2023',
      intro:
        'Established and scaled design teams and management practices across a portfolio of AR, mixed reality, mobile, creator, commerce, and wearable product initiatives.',
      points: [
        'Led design strategy and execution for emerging use cases across Meta’s apps, Spark AR, Meta’s AR platform, Quest mixed reality experiences, and Orion glasses.',
        'Worked within and across a 400+ person cross-functional AR organization spanning product, design, engineering, research, creators, commerce, and platform capabilities.',
        'Pioneered mobile AR prototyping practices and introduced the Product Design Prototyper role within Spark AR, increasing prototype velocity by more than 60%.',
        'Launched AR-enabled Shopping in Instagram and Facebook Ads, exceeding baseline ROI against video in key verticals and supporting more than 100% inventory growth for business and product catalogs.',
        'Defined design strategy for advanced technical capabilities including depth, body tracking, and avatars.',
        'Helped standardize camera functionality across Facebook’s family of apps, reaching more than 1 billion users.',
        'Built teams and operating models for products where product definition, interaction design, technical feasibility, research, and platform strategy had to evolve together.',
      ],
    },
    {
      role: 'Art Director',
      org: 'Facebook Messenger',
      meta: 'Bay Area, CA · 2017 – 2018',
      intro: 'Built and led the team responsible for AR-enabled communication experiences within Messenger.',
      points: [
        'Led work on novel, shareable AR formats for communication use cases.',
        'Pioneered flagship Messenger Camera features shown at F8 2018 with Nike, Target, Sephora, and ASUS.',
        'Introduced new creative and technical techniques during a live event demo.',
        'Collaborated with the Portal team to design and launch Story Time, a flagship AR communication feature that outperformed standard video calls in engagement and retention.',
        'Helped translate AR from novelty into a social communication layer inside a major consumer messaging product.',
      ],
    },
    {
      role: 'Creative Director',
      org: 'Framestore VR Studio / Framestore Labs',
      meta: 'NYC · 2017',
      intro: 'Led creative development for location-based VR experiences and large-scale architectural installations.',
      points: [
        'Established artistic vision, UX definition, and product direction for immersive experiences.',
        'Worked closely with multidisciplinary teams across concept development, prototyping, design, engineering, narrative, motion, and production.',
        'Developed and delivered creative pitches, treatments, previsualization, scripts, storyboards, prototypes, and design tests.',
        'Operated across early-stage concept definition and practical delivery for spatial computing and immersive experience work.',
      ],
    },
    {
      role: 'Director, Screen Content',
      org: 'Viacom',
      meta: 'NYC · 2015 – 2017',
      intro:
        'Led the transformation of major areas of Viacom’s global headquarters into dynamic, real-time media and mixed reality experiences.',
      points: [
        'Directed work across stakeholders, vendors, design, technology, content, and physical space.',
        'Translated broad organizational goals into a coherent environmental media experience.',
        'Envisioned and executed the “History of Viacom” installation, a first-of-its-kind mixed reality interactive exploration of the company’s pop culture contributions.',
        'Directed 9+ design, technology, and art disciplines across strategy, content, creative direction, software, motion, installation, and delivery.',
        'Built work that connected brand history, physical space, interactive technology, and large-scale storytelling.',
      ],
    },
  ] as ResumeEntry[],

  earlier: {
    role: 'Product Design, Interaction, Creative Technology, and Software-Adjacent Product Work',
    meta: '2000 – 2015',
    intro: 'Built the foundation for a career at the intersection of product, design, technology, storytelling, and implementation.',
    points: [
      'Developed early expertise across interaction design, visual systems, motion, digital products, creative technology, and experience design.',
      'Worked on ambiguous projects that required translating abstract ideas into concrete interfaces, prototypes, systems, and shipped experiences.',
      'Built the pattern that now defines the work: understand the problem, shape the product, design the experience, work through implementation constraints, and deliver something real.',
      'Developed the operating range that later became product architecture: moving between concept, system, interface, prototype, technical execution, user experience, and organizational alignment.',
    ],
  } as ResumeEntry,

  patent: {
    title: 'Interactive Avatars in Artificial Reality',
    meta: 'Spark AR · 2021',
    note: 'Avatars that respond to contextual signals in the real world.',
  },

  education: {
    degree: 'Bachelor of Fine Arts, Computer Art',
    meta: 'SUNY Buffalo · 1996 – 2000',
  },

  areas: [
    'Product architecture', 'AI-native product development', 'AI-assisted software implementation',
    'Consumer product strategy', '0→1 product development', 'UX architecture', 'Interaction design',
    'Design systems', 'Mobile product development', 'Web product development', 'Platform thinking',
    'Emerging technology', 'AR / MR', 'Embodied AI', 'Research translation', 'Product prototyping',
    'Engineering collaboration', 'Founder-led product development', 'Design leadership',
    'Cross-functional operating models', 'Executive communication', 'Organizational design',
    'Growth and engagement', 'Knowledge systems', 'Provenance', 'Evidence-driven product development',
  ],

  operatingPattern: [
    'Identify an ambiguous opportunity.',
    'Define the product strategy.',
    'Design the experience.',
    'Understand the architecture.',
    'Guide or build the implementation.',
    'Ship the product.',
    'Observe the evidence.',
    'Extract reusable capabilities.',
    'Evolve the system.',
  ],
} as const;
