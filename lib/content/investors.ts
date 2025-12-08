/**
 * Investor Content Layer
 *
 * Business plan, financials, and strategic positioning for investor audiences.
 * Includes both public overview and protected detailed content.
 * Source: 100biz.txt from RationaleRevisions
 */

// ============================================================================
// TypeScript Interfaces
// ============================================================================

export interface InvestorOverview {
  tagline: string;
  problem: string;
  solution: string;
  opportunity: string;
  traction: string[];
  ask: string;
}

export interface BusinessModel {
  title: string;
  description: string;
  revenueStreams: {
    title: string;
    streams: {
      name: string;
      description: string;
      revenue: string;
    }[];
  };
  unitEconomics: {
    title: string;
    metrics: {
      value: string;
      label: string;
    }[];
  };
}

export interface MarketOpportunity {
  marketSize: {
    title: string;
    description: string;
    segments: {
      name: string;
      size: string;
    }[];
  };
  targetSegments: {
    title: string;
    segments: {
      name: string;
      description: string;
    }[];
  };
}

export interface CompetitivePosition {
  advantages: {
    title: string;
    points: string[];
  };
  differentiation: {
    title: string;
    description: string;
  };
}

// ============================================================================
// Public Investor Overview
// ============================================================================

export const investorOverview: InvestorOverview = {
  tagline: 'A boutique product studio with an internal IP lab, protecting founders from building the wrong thing fast',

  problem: 'AI has made execution cheap and fast, but it created a new existential risk: teams are building the wrong things faster than ever. The bottleneck has shifted from execution to conviction. Founders can ship in days, but if they\'re solving the wrong problem, speed accelerates waste.',

  solution: 'Rationale is a dual-engine studio: (1) Client Kits deliver fast, predictable conviction for high-stakes product decisions, and (2) an Internal IP Lab builds owned ventures with strict kill-fast discipline. We turn ambiguous opportunities into validated conviction and tangible intellectual property.',

  opportunity: 'The market for product studios is $50B+, but most agencies trade time for money. Rationale is built differently: we scale IP, not headcount. Our dual-engine model creates compounding value—client work funds the lab, and the lab builds assets that appreciate over time.',

  traction: [
    'Active equity partnerships with venture-backed startups',
    'Deployed AI-native prototypes across content, productivity, and B2B verticals',
    '4 ventures in active development with clear kill/hold/double-down gates',
    'Proven track record delivering conviction in 1-8 week sprints'
  ],

  ask: 'Raising $500K to fund engineering velocity and founder focus. This capital accelerates IP development, not headcount—allowing us to ship 2-3 validated prototypes with clear spinout potential within 12-14 months.'
};

// ============================================================================
// Business Model
// ============================================================================

export const businessModel: BusinessModel = {
  title: 'Dual-Engine Business Model',
  description: 'Two tightly integrated engines that create a virtuous cycle of revenue, insights, and long-term value.',

  revenueStreams: {
    title: 'Revenue Streams',
    streams: [
      {
        name: 'Rationale Kits (Engine 1)',
        description: 'Productized client engagements that solve high-stakes problems with predictable scope, timeline, and pricing.',
        revenue: '$25k-$150k'
      },
      {
        name: 'Build Partner (Equity Partnerships)',
        description: 'Long-term equity-bearing partnerships where Rationale acts as product co-founder, providing strategic + hands-on building.',
        revenue: 'Equity-based'
      },
      {
        name: 'Rationale Products (Engine 2 - IP Lab)',
        description: 'Internally originated ventures developed with strict kill-fast discipline. Designed for spinouts, licensing, or internal ownership.',
        revenue: 'Variable'
      }
    ]
  },

  unitEconomics: {
    title: 'Unit Economics',
    metrics: [
      {
        value: '$100k',
        label: 'Avg. Kit Revenue'
      },
      {
        value: '70%',
        label: 'Gross Margin'
      },
      {
        value: '1-8 wks',
        label: 'Avg. Engagement'
      }
    ]
  }
};

// ============================================================================
// Market Opportunity
// ============================================================================

export const marketOpportunity: MarketOpportunity = {
  marketSize: {
    title: 'Market Size',
    description: 'The product design and development market is massive and growing, but fragmented by outdated business models.',
    segments: [
      { name: 'TAM', size: '$50B+' },
      { name: 'SAM', size: '$5B' },
      { name: 'SOM', size: '$500M' }
    ]
  },
  targetSegments: {
    title: 'Target Segments',
    segments: [
      {
        name: 'Pre-seed to Series A Startups',
        description: 'Founders who need speed + clarity before accelerating execution'
      },
      {
        name: 'AI-native Product Teams',
        description: 'Teams building 0-1 products with AI, agents, or emerging tech'
      },
      {
        name: 'Strategic Product Leaders',
        description: 'Leaders navigating ambiguity and high-stakes product decisions'
      }
    ]
  }
};

// ============================================================================
// Competitive Positioning
// ============================================================================

export const competitivePosition: CompetitivePosition = {
  advantages: {
    title: 'Competitive Advantages',
    points: [
      'Dual-engine model: Client kits fund internal IP lab',
      'Productized offerings with fixed scope and pricing',
      'Kill-fast discipline (not a graveyard of half-built things)',
      'Founder-led with senior contractor network (lean, high-leverage)',
      'Specialization in AI, agentic UX, and 0-1 products',
      'IP ownership model aligned with long-term value'
    ]
  },
  differentiation: {
    title: 'What Makes Us Different',
    description: 'Rationale sits in a unique position: too craft-focused for venture studios, too strategic for design agencies, too disciplined for corporate labs. We combine strategic conviction with hands-on execution, operating in fast 1-8 week sprints while maintaining founder-level craft.'
  }
};

// ============================================================================
// Financial Projections
// ============================================================================

export const financialHighlights = [
  {
    value: '$150k+',
    metric: 'Avg. Kit Revenue',
    period: 'Per engagement'
  },
  {
    value: '70%',
    metric: 'Gross Margin',
    period: 'Target'
  },
  {
    value: '1-8 wks',
    metric: 'Engagement Length',
    period: 'Typical'
  },
  {
    value: '4-6',
    metric: 'IP Lab Concepts',
    period: 'Annually'
  }
];

// ============================================================================
// Why Now?
// ============================================================================

export const whyNow = {
  thesis: 'AI has inverted the bottleneck from execution to conviction. Founders can ship in days, but if they\'re solving the wrong problem, speed accelerates waste. The future belongs to studios that help teams build conviction before they accelerate.',
  catalysts: [
    'AI has made execution cheap, making conviction the new bottleneck',
    'Product complexity is increasing (AI-native experiences, agentic UX, AR/MR)',
    'IP ownership models are emerging as the future of studios',
    'Founders want speed + quality, not 6-month agency engagements',
    'Traditional agencies are misaligned (trade time for money, no skin in game)'
  ]
};

// ============================================================================
// Team
// ============================================================================

export const team = [
  {
    name: 'Matt Hanson',
    role: 'Founder',
    bio: 'Systems thinker, product architect, and builder. Background in AI-integrated UX, AR/MR platform design, and 0-1 product development.',
    experience: [
      'Patent holder in AI/UX systems',
      'Track record shipping products from concept to market-ready',
      'Specialized in AI-native experiences and agentic UX',
      'Full-stack technical capabilities'
    ]
  }
];

// ============================================================================
// Use of Funds
// ============================================================================

export const useOfFunds = {
  overview: 'Raising $500K to fund engineering velocity and founder focus while Rationale builds and validates a portfolio of high-leverage IP prototypes. This capital accelerates IP development, not headcount.',
  totalRaise: '$500K',
  runway: '18-24 months',
  monthlyBurn: '$20K-$25K',
  allocations: [
    {
      category: 'Engineering Acceleration',
      percentage: '60%',
      description: 'Contract engineers, prototyping agencies, and specialized technical talent. NOT full-time hires—flexible, capital-efficient engineering capacity for rapid prototyping and early MVP builds.'
    },
    {
      category: 'Founder Runway',
      percentage: '30%',
      description: 'Personal expenses to maintain full-time focus and ensure selectivity. Prevents chasing misaligned, low-margin work and allows optimization for equity ownership and IP generation.'
    },
    {
      category: 'Tools, Legal & Infrastructure',
      percentage: '10%',
      description: 'AI infrastructure, hosting, prototyping tools, IP legal support, and spinout structuring. Lightweight operational overhead.'
    }
  ]
};

// ============================================================================
// Capital Strategy
// ============================================================================

export const capitalStrategy = {
  title: 'Capital Strategy & Runway',
  overview: 'Rationale is deliberately small, high-leverage, and IP-focused. The constraint is not ideas, or demand, or design capacity. The constraint is engineering bandwidth and founder runway. This capital raise is designed to operate as a product lab, not a headcount-driven agency scale-up.',

  objectives: [
    {
      title: 'Accelerate IP Creation',
      description: 'Fund flexible engineering capacity (contractors and specialized agencies) to turn validated concepts into working prototypes and early MVPs. Remove engineering as the bottleneck so product ideas can be tested and iterated rapidly.'
    },
    {
      title: 'Protect Founder Focus',
      description: 'Cover founder living expenses so there is no pressure to chase misaligned, low-margin work. Allow the studio to optimize for equity, upside, and long-term product value—not just near-term cash flow.'
    },
    {
      title: 'Enable Selectivity',
      description: 'Give Rationale the ability to say "no" to projects that aren\'t strategically aligned, and "yes" to engagements and partners that strengthen the IP portfolio.'
    }
  ],

  raiseStructure: {
    instrument: 'SAFE',
    amount: '$500K',
    runway: '18-24 months',
    monthlyBurn: '$20K-$25K'
  },

  whatThisUnlocks: [
    '2-3 fully prototyped, user-tested product concepts with clear value propositions, UX systems, and early user feedback',
    '1-2 products with obvious spinout or licensing potential—either as independent entities, shared ventures with partners, or licensable engines',
    'A clear, documented IP pipeline with concepts at varying stages of maturity, frameworks, research, and design assets already in place',
    'Continued paid kits and strategic engagements to co-fund development, generate inbound deal flow, and deepen understanding of where IP should live'
  ]
};

// ============================================================================
// Operating Model
// ============================================================================

export const investorOperatingModel = {
  title: 'Operating Model',
  overview: 'This capital strategy is directly aligned with how Rationale operates: small and sharp, not bloated. We work with flexible engineering partners, not overbuilt teams. We remain founder-led with a strong point of view and taste. We optimize for equity, IP, and durable products—not just billable hours.',

  principles: [
    {
      title: 'Founder-Led Product Studio',
      description: 'Maintained by a solo founder with deep product, design, and technical expertise. Senior-level craft and decision-making at every layer.'
    },
    {
      title: 'Engineering via Senior Contractors',
      description: 'Partner with boutique engineering shops and specialized contractors—NOT building permanent payroll. Flexible, capital-efficient, and high-leverage spend where it matters most.'
    },
    {
      title: 'Concurrent Capacity',
      description: '2 concurrent sprints or 1 strategic engagement + 1 internal IP sprint. Structured to maintain momentum across both client work and internal ventures.'
    },
    {
      title: 'No Bloated Headcount',
      description: 'Zero agency sprawl or fixed overhead. Every dollar goes toward building, prototyping, and IP generation—not infrastructure or management layers.'
    }
  ],

  keyMetrics: [
    { label: 'Monthly Burn', value: '$20K-$25K' },
    { label: 'Engineering Spend', value: '$12K-$15K/mo' },
    { label: 'Founder Runway', value: '$6K-$8K/mo' },
    { label: 'Tools & Legal', value: '$2K/mo' }
  ]
};

// ============================================================================
// Roadmap
// ============================================================================

export const roadmap = {
  title: '18-Month Roadmap',
  overview: 'Clear milestones designed to yield 2-3 validated prototypes with obvious spinout potential.',

  phases: [
    {
      title: 'Months 0-3: Foundation',
      milestones: [
        'Solidify Rationale site, kits, and internal infrastructure',
        'Lock 1-2 strategically aligned client engagements',
        'Begin engineering on at least one internal product concept',
        'Establish contractor and agency partnerships'
      ]
    },
    {
      title: 'Months 3-9: Validation',
      milestones: [
        'Ship and iterate on 1-2 internal prototypes',
        'Run user tests and validation studies',
        'Package 1 prototype into a spinout-ready or license-ready asset',
        'Refine kill-fast discipline and portfolio approach'
      ]
    },
    {
      title: 'Months 9-18: Scale & Spinout',
      milestones: [
        'Finalize 2-3 product bets with clear go-to-market paths',
        'Advance 1-2 products into revenue or committed distribution',
        'Decide which products become standalone entities, remain Rationale IP, or become engines for future studio work',
        'Position for follow-on funding or strategic partnerships'
      ]
    }
  ],

  endGoal: 'At the end of this horizon, Rationale is no longer just a studio with great case studies—it\'s a studio with a growing portfolio of live, revenue-capable products.'
};

// ============================================================================
// Helper Functions
// ============================================================================

export function getInvestorOverview(): InvestorOverview {
  return investorOverview;
}

export function getBusinessModel(): BusinessModel {
  return businessModel;
}

export function getMarketOpportunity(): MarketOpportunity {
  return marketOpportunity;
}

export function getCompetitivePosition(): CompetitivePosition {
  return competitivePosition;
}

export function getFinancialHighlights() {
  return financialHighlights;
}

export function getWhyNow() {
  return whyNow;
}

export function getTeam() {
  return team;
}

export function getUseOfFunds() {
  return useOfFunds;
}

export function getCapitalStrategy() {
  return capitalStrategy;
}

export function getInvestorOperatingModel() {
  return investorOperatingModel;
}

export function getRoadmap() {
  return roadmap;
}

// ============================================================================
// Engagement Models
// ============================================================================

export const engagementModels = {
  title: 'Flexible Engagement Models',
  overview: 'Rationale offers multiple engagement structures to align with your capital strategy and risk tolerance. We believe the best partnerships are built on aligned incentives—whether that\'s cash, equity, or a hybrid approach.',

  options: [
    {
      model: 'Cash',
      icon: '$',
      description: 'Traditional fee-for-service model with fixed scope, timeline, and deliverables. Competitive rates for high-quality strategic work.',
      bestFor: 'Teams with allocated budget, needing fast execution and clear deliverables',
      structure: 'Fixed fee per kit or engagement'
    },
    {
      model: 'Cash + Equity',
      icon: '$+%',
      description: 'Hybrid model combining competitive cash rates with equity participation. Discounted cash component in exchange for meaningful equity stake and long-term alignment.',
      bestFor: 'Startups balancing cash preservation with partnership value, seeking co-builder relationship',
      structure: 'Reduced cash fee + equity (typically 0.5-2%)'
    },
    {
      model: 'All Equity',
      icon: '%',
      description: 'Full equity-based engagement where Rationale acts as fractional CPO or product co-founder. Maximum skin in the game, deeply aligned incentives.',
      bestFor: 'Pre-funding startups with strong vision, seeking true product co-founder with committed partnership',
      structure: 'Equity only (typically 2-5% depending on scope and stage)'
    }
  ],

  philosophy: 'We don\'t believe in one-size-fits-all. Some teams need speed and clarity with cash. Others need a true partner with aligned long-term incentives. We structure engagements based on what makes sense for your stage, goals, and capital strategy.'
};

export function getEngagementModels() {
  return engagementModels;
}
