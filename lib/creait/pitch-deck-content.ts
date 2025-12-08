// CREaiT Pitch Deck Content - Consulting Proposal Format
// Purpose: Show what Rationale will build for CREaiT in 12 weeks
// Audience: CREaiT founders/team (NOT investors)
// The Ask: CREaiT pays Rationale for consulting services

export interface Assessment {
  working: string;    // ✅ What's working
  focus: string;      // ⚠️ What needs focus
  recommendation: string; // 🎯 Our recommendation
}

export interface DeepDiveSection {
  title: string;
  content: string;
}

export interface DeepDive {
  title: string;
  description: string;
  sections: DeepDiveSection[];
}

export interface Slide {
  id: string;
  type: 'assessment' | 'current-state' | 'gaps' | 'deliverable' | 'custom';
  headline: string;
  subheadline?: string;
  content?: string;
  contentBullets?: string[];
  assessment?: Assessment;
  visual?: {
    type: 'diagram' | 'component';
    component?: string;
  };
  deepDive?: DeepDive;
}

export interface Section {
  id: string;
  title: string;
  navLabel: string;
  description: string;
  slides: Slide[];
}

export const CREAIT_SECTIONS: Record<string, Section> = {
  // SECTION 1: OPENING
  opening: {
    id: 'opening',
    title: 'Engagement Proposal',
    navLabel: 'Start',
    description: 'What we\'re here to do',
    slides: [
      {
        id: 'welcome',
        type: 'custom',
        headline: 'Rationale × CREaiT',
        subheadline: '12-Week Plan to Get Your Product Market-Ready',
        visual: {
          type: 'component',
          component: 'CREWelcomeSlide'
        }
      },
      {
        id: 'methodology',
        type: 'assessment',
        headline: 'How We Assessed Your Product',
        subheadline: 'Backend code review + frontend audit + gap analysis',
        contentBullets: [
          'Code review: Backend infrastructure (Flask, Celery, Supabase), frontend (React/Vite)',
          'Gap analysis: What\'s built vs. what\'s needed for MVP launch',
          'Competitive landscape: CRE AI opportunity window',
          'Execution plan: Highest-leverage work for next 12 weeks'
        ],
        assessment: {
          working: 'You\'ve made strong progress on backend infrastructure',
          focus: 'Missing critical scoring algorithm and production-ready broker dashboard',
          recommendation: 'We\'ll focus on the 20% of work that delivers 80% of value'
        }
      }
    ]
  },

  // SECTION 2: CURRENT STATE
  currentState: {
    id: 'current-state',
    title: 'What You\'ve Built',
    navLabel: 'Current State',
    description: 'Acknowledging your progress',
    slides: [
      {
        id: 'backend-infrastructure',
        type: 'current-state',
        headline: 'Backend Infrastructure: Production-Ready',
        subheadline: 'Strong foundation for MVP launch',
        contentBullets: [
          'Email generation: Anthropic Claude integration with context-aware prompting',
          'Delivery system: SendGrid integration with tracking and bounce handling',
          'Data architecture: Supabase (PostgreSQL) schema optimized for CRE data',
          'API layer: RESTful endpoints with authentication and rate limiting',
          'Task queue: Celery + Redis for async processing',
          'Infrastructure: Docker + Kubernetes deployment ready'
        ],
        assessment: {
          working: 'Backend is production-grade (Flask, Celery, Supabase). Solid foundation.',
          focus: 'Scoring engine and broker-facing dashboard are the gaps preventing launch',
          recommendation: 'Rationale delivers the missing components in 12 weeks'
        }
      },
      {
        id: 'frontend-early-stage',
        type: 'current-state',
        headline: 'Frontend: Early-Stage ConversationDashboard',
        subheadline: 'React UI exists but needs architectural refactoring',
        contentBullets: [
          'Existing: ConversationDashboard (React, Vite, TypeScript, Tailwind)',
          'Existing: Email conversation management, campaign tracking',
          'Gap: Direct Supabase calls (bypasses backend business logic)',
          'Gap: No state management (local useState only)',
          'Gap: No opportunity scoring UI (scoring engine doesn\'t exist yet)'
        ],
        assessment: {
          working: 'UI foundation exists. Not starting from zero.',
          focus: 'Needs refactoring (API client layer, state management) + scoring UI',
          recommendation: 'Rationale refactors architecture + builds scoring dashboard in Weeks 5-8'
        }
      },
      {
        id: 'competitive-positioning',
        type: 'current-state',
        headline: 'First-Mover Advantage in CRE AI',
        subheadline: 'No direct competitors in CRE-specific opportunity intelligence',
        content: 'General CRMs (Salesforce), generic AI tools (ChatGPT), and CRE data platforms (CoStar) all exist, but none combine CRE domain expertise with AI-powered opportunity scoring. You have a 12-18 month first-mover window.',
        visual: {
          type: 'diagram',
          component: 'CompetitiveLandscapeDiagram'
        },
        assessment: {
          working: 'You\'ve identified a real market gap. First-mover advantage is real.',
          focus: 'Window closes in 12-18 months as horizontal AI tools add CRE features',
          recommendation: 'Speed to market is your biggest competitive advantage'
        }
      }
    ]
  },

  // SECTION 3: GAPS ANALYSIS
  gaps: {
    id: 'gaps',
    title: 'What\'s Missing to Launch',
    navLabel: 'Gaps',
    description: 'Honest assessment of what prevents launch',
    slides: [
      {
        id: 'gap-scoring',
        type: 'gaps',
        headline: 'Critical Gap #1: Opportunity Scoring Engine',
        subheadline: 'Backend can store data, but can\'t tell brokers WHO to contact TODAY',
        content: 'The scoring engine is your differentiator. It needs to convert property data, timing signals, and market dynamics into actionable 0-100 scores that tell brokers which opportunities to prioritize.',
        contentBullets: [
          '6 timing signals: lease expiry, debt maturity, ownership change, etc.',
          'Property characteristics: size, location, condition, cap rate',
          'Market dynamics: vacancy trends, comp sales, absorption rates',
          'Historical engagement: email opens, responses, meeting conversions'
        ],
        assessment: {
          working: 'You have all the data inputs needed for scoring',
          focus: 'Missing the ML logic that converts data into actionable 0-100 scores',
          recommendation: 'Weeks 1-4: Rationale builds scoring engine with explainable ML model'
        }
      },
      {
        id: 'gap-dashboard',
        type: 'gaps',
        headline: 'Critical Gap #2: Scoring Dashboard UI',
        subheadline: 'ConversationDashboard exists, but lacks opportunity scoring interface',
        content: 'You have an early-stage ConversationDashboard for email management, but it needs refactoring + the opportunity scoring UI hasn\'t been built yet. Brokers need to see prioritized opportunities, timing alerts, and AI-generated outreach.',
        contentBullets: [
          'Refactor needed: API client layer (stop direct Supabase calls), add state management',
          'Add scoring UI: Daily prioritized list (Top 10 opportunities ranked by score)',
          'Add timing alerts: "Lease expires in 60 days" notifications',
          'Enhance email workflow: AI-generated drafts with personalization'
        ],
        assessment: {
          working: 'ConversationDashboard foundation exists. Not starting from zero.',
          focus: 'Needs architectural refactoring + opportunity scoring UI layer',
          recommendation: 'Weeks 5-8: Rationale refactors architecture + builds scoring dashboard'
        }
      },
      {
        id: 'gap-nice-to-have',
        type: 'gaps',
        headline: 'Nice-to-Have: CRM Integration',
        subheadline: 'What can wait - Salesforce/HubSpot connectors',
        content: 'CRM connectors add polish but not core value. Pilots can launch with manual CSV import for first 90 days. Integration can wait until after pilot validation.',
        assessment: {
          working: 'CRM sync is valuable long-term',
          focus: 'Building it now delays MVP by 4-6 weeks',
          recommendation: 'Skip for MVP. Add in Month 6 based on pilot feedback.'
        }
      }
    ]
  },

  // SECTION 4: EXECUTION PLAN
  execution: {
    id: 'execution',
    title: 'What Rationale Will Build',
    navLabel: 'Execution',
    description: '12-week deliverables with crisp milestones',
    slides: [
      {
        id: 'execution-overview',
        type: 'deliverable',
        headline: '12-Week Plan: Highest-Leverage Work Only',
        subheadline: 'Scoring Engine → Dashboard Refactor + Scoring UI → Pilot Launch',
        content: 'Focus on 3 deliverables. Cut everything else. Ship MVP, launch pilots, test economics.',
        contentBullets: [
          'Weeks 1-4: Scoring Engine (0-100 algorithm with timing signals)',
          'Weeks 5-8: Dashboard Refactor + Scoring UI (fix architecture, add scoring interface)',
          'Weeks 9-12: Pilot Launch Support (onboarding, training, success measurement)'
        ],
        visual: {
          type: 'diagram',
          component: 'RoadmapGanttDiagram'
        },
        assessment: {
          working: '12-week timeline is realistic with focused scope',
          focus: 'Risk is scope creep. Every "nice-to-have" adds 2 weeks.',
          recommendation: 'Ruthlessly cut features. Score + Dashboard + Pilots = MVP.'
        }
      },
      {
        id: 'execution-scoring',
        type: 'deliverable',
        headline: 'Weeks 1-4: Build the Scoring Engine',
        subheadline: 'ML model for opportunity ranking',
        content: 'Turn data into 0-100 scores that tell brokers WHO to contact.',
        contentBullets: [
          'Week 1: Define scoring logic (6 timing signals + property factors)',
          'Week 2: Build ML pipeline (Python, explainable model)',
          'Week 3: API integration (scoring endpoint, real-time ranking)',
          'Week 4: Testing & validation (does model match broker intuition?)'
        ],
        assessment: {
          working: 'Data inputs exist. Backend is ready for scoring integration.',
          focus: 'Model must be explainable (brokers need to trust scores)',
          recommendation: 'Rationale delivers working scoring API by Week 4'
        }
      },
      {
        id: 'execution-dashboard',
        type: 'deliverable',
        headline: 'Weeks 5-8: Refactor + Build Scoring Dashboard',
        subheadline: 'Refactor ConversationDashboard + add opportunity scoring UI',
        content: 'Fix architectural anti-patterns + build scoring interface.',
        contentBullets: [
          'Week 5: Refactor architecture (API client layer, Zustand state management)',
          'Week 6: Scoring UI (prioritized opportunity list, score visualization)',
          'Week 7: Timing alerts (lease expiry notifications, deal stage tracking)',
          'Week 8: Polish + testing (responsive design, performance, QA)'
        ],
        assessment: {
          working: 'ConversationDashboard foundation exists. API layer is complete.',
          focus: 'Refactoring first, then add scoring UI layer',
          recommendation: 'Rationale delivers production-ready scoring dashboard by Week 8'
        }
      },
      {
        id: 'execution-pilots',
        type: 'deliverable',
        headline: 'Weeks 9-12: Launch Pilot Customers',
        subheadline: 'Pilot onboarding + success measurement',
        content: 'Test product-market fit with real brokers.',
        contentBullets: [
          'Week 9-10: Pilot onboarding (setup, training, data import)',
          'Week 11: Feedback loops (bug fixes, feature requests)',
          'Week 12: Success metrics (time saved, deals closed, retention)'
        ],
        assessment: {
          working: 'Pilot customers will provide real-world feedback on product-market fit',
          focus: 'Pilots need white-glove support in first 90 days',
          recommendation: 'Rationale provides onboarding playbook + metrics dashboard'
        }
      }
    ]
  },

  // SECTION 5: DELIVERABLES
  deliverables: {
    id: 'deliverables',
    title: 'What You\'ll Receive',
    navLabel: 'Deliverables',
    description: 'Concrete outputs you can hold us accountable to',
    slides: [
      {
        id: 'deliverables-technical',
        type: 'deliverable',
        headline: 'Technical Deliverables',
        subheadline: 'Code, documentation, deployment',
        contentBullets: [
          'Scoring Engine: Python/Node.js ML model with API integration',
          'Dashboard UI: React frontend with responsive design',
          'Documentation: API docs, setup guides, architecture diagrams',
          'Deployment: Staging + production environments',
          'Testing: Unit tests, integration tests, end-to-end suite',
          'Code transfer: GitHub repo with full commit history'
        ],
        assessment: {
          working: 'You\'ll own all code. No vendor lock-in.',
          focus: 'Ongoing maintenance is your responsibility post-engagement',
          recommendation: 'Rationale trains your team on codebase during Week 12'
        }
      },
      {
        id: 'deliverables-business',
        type: 'deliverable',
        headline: 'Business Deliverables',
        subheadline: 'Pilot support + seed positioning',
        contentBullets: [
          'Pilot onboarding playbook (step-by-step customer success guide)',
          'Metrics dashboard (track MRR, churn, engagement, deal flow)',
          'Investor readiness: Pitch deck refresh with pilot data',
          'Fundraising positioning: How to tell the story to seed investors'
        ],
        assessment: {
          working: 'These deliverables position you for seed round',
          focus: 'We don\'t do fundraising - you execute the raise yourself',
          recommendation: 'Rationale gets you investor-ready. You pitch and close.'
        }
      }
    ]
  },

  // SECTION 6: TIMELINE & MILESTONES
  timeline: {
    id: 'timeline',
    title: 'Week-by-Week Accountability',
    navLabel: 'Timeline',
    description: 'Clear milestones with measurable progress',
    slides: [
      {
        id: 'milestones',
        type: 'deliverable',
        headline: '12-Week Milestone Calendar',
        subheadline: 'Weekly check-ins + monthly gates',
        contentBullets: [
          'Week 2: Scoring logic defined (gate: CREaiT approval)',
          'Week 4: Scoring API deployed (gate: API tests pass)',
          'Week 6: Dashboard mockups (gate: CREaiT approval)',
          'Week 8: Dashboard production-ready (gate: QA sign-off)',
          'Week 10: Pilots onboarded (gate: all customers trained)',
          'Week 12: Success metrics measured (gate: engagement data)'
        ],
        assessment: {
          working: 'Bi-weekly gates keep us accountable',
          focus: 'Gate approvals must happen within 3 days (no bottlenecks)',
          recommendation: 'Weekly standups (30 min) to track progress'
        }
      },
      {
        id: 'risk-mitigation',
        type: 'deliverable',
        headline: 'Risk Mitigation: What Could Go Wrong',
        subheadline: 'Contingency plans for common blockers',
        contentBullets: [
          'Risk #1: Scope creep → Solution: Fixed scope contract, change request process',
          'Risk #2: Data quality issues → Solution: Week 1 data audit, cleanup if needed',
          'Risk #3: Pilot onboarding delays → Solution: Self-serve setup guides, async training'
        ],
        assessment: {
          working: 'Most risks are manageable with clear communication',
          focus: 'Biggest risk: CREaiT team unavailability for approvals',
          recommendation: 'Rationale needs 1 technical stakeholder responsive within 24 hrs'
        }
      }
    ]
  },

  // SECTION 7: INVESTMENT TERMS
  investment: {
    id: 'investment',
    title: 'Engagement Terms',
    navLabel: 'The Ask',
    description: 'Cost and equity options for this engagement',
    slides: [
      {
        id: 'cost',
        type: 'custom',
        headline: 'Rationale\'s Fee: $24K or Equity Equivalent',
        subheadline: '12 weeks, 3 deliverables, fixed price',
        contentBullets: [
          '',
          'Pricing Options:',
          '  • Option A: $24K cash (50% upfront, 50% at Week 6)',
          '  • Option B: Equity equivalent (1.5-2.5% based on valuation)',
          '  • Option C: Hybrid ($12K cash + 1% equity)',
          '',
          'What\'s Included:',
          '  • 2 engineers (1 senior, 1 mid-level) for 12 weeks',
          '  • 1 product lead (10 hrs/week for planning + pilots)',
          '  • Unlimited revisions within agreed scope',
          '  • Weekly standups + Slack support'
        ],
        assessment: {
          working: '$24K is efficient vs hiring engineers or delaying MVP',
          focus: 'Equity option assumes $1-2M pre-money valuation (discuss)',
          recommendation: 'We\'re flexible on structure. Goal: Get you to MVP launch.'
        }
      },
      {
        id: 'roi',
        type: 'custom',
        headline: 'Why This Investment Makes Sense',
        subheadline: 'Speed to market = first-mover advantage = investor interest',
        contentBullets: [
          'Value Drivers:',
          '  • Pilot launch → Tests product-market fit with real brokers',
          '  • MVP launch → Enables seed fundraising',
          '  • 12-week delivery vs 6-month DIY timeline',
          '',
          'Alternative Costs:',
          '  • Hiring 2 engineers: $50K+ (salary + benefits + recruiting)',
          '  • Freelancer coordination: $40K+ (multiple contractors, quality risk)',
          '  • Delay cost: 3-month delay = first-mover advantage decay'
        ],
        assessment: {
          working: '$24K is efficient vs hiring or delaying',
          focus: 'Equity option makes sense if cash-constrained',
          recommendation: 'Rationale\'s focus: Get you market-ready, not maximize our fee'
        }
      },
      {
        id: 'next-steps',
        type: 'custom',
        headline: 'How to Begin: Kick-off in 2 Weeks',
        subheadline: 'Sign SOW → Kick-off → Week 1 scoring engine work',
        contentBullets: [
          'Timeline to Start:',
          '  • Today: Discuss terms, answer questions',
          '  • Week 0: Sign SOW, set up comms (Slack, GitHub)',
          '  • Week 1: Kick-off meeting, technical onboarding',
          '  • Week 2: First deliverable (scoring logic)',
          '',
          'What We Need from You:',
          '  • 1 technical stakeholder (10 hrs/week availability)',
          '  • Access: GitHub, staging environment, API docs',
          '  • Decision authority: Can approve designs/milestones'
        ],
        assessment: {
          working: '2-week start time is realistic (onboarding + setup)',
          focus: 'Need fast decision-making from CREaiT side',
          recommendation: 'Rationale ready to start as soon as you are'
        }
      }
    ]
  }
};

// Helper functions
export function getAllSections(): Section[] {
  return [
    CREAIT_SECTIONS.opening,
    CREAIT_SECTIONS.currentState,
    CREAIT_SECTIONS.gaps,
    CREAIT_SECTIONS.execution,
    CREAIT_SECTIONS.deliverables,
    CREAIT_SECTIONS.timeline,
    CREAIT_SECTIONS.investment
  ];
}

export function getSectionById(id: string): Section | undefined {
  return CREAIT_SECTIONS[id];
}

export function getTotalSlideCount(): number {
  return getAllSections().reduce((total, section) => total + section.slides.length, 0);
}
