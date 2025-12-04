// Rationale Overview V2 - Methodology Deck
// Structure: Opening → Problem → Solution → Proof → De-Risk
// Pattern: Following Athletes First slide deck architecture

export interface DemoTab {
  id: string;
  label: string;
  description: string;
  component: string;
}

export interface DeepDiveSection {
  title: string;
  content: string | React.ReactNode;
}

export interface DeepDive {
  title: string;
  description: string;
  sections: DeepDiveSection[];
}

export interface Slide {
  id: string;
  type: 'problem' | 'solution' | 'demo' | 'impact' | 'custom' | 'section-header';
  headline: string;
  content?: string;
  visual?: {
    type: 'icon' | 'diagram' | 'chart' | 'stat' | 'image' | 'component';
    name?: string;
    data?: any;
    component?: string;
  };
  demos?: DemoTab[];
  deepDive?: DeepDive;
  sectionNumber?: number;
  terminalCommand?: string;
}

export interface Section {
  id: string;
  title: string;
  navLabel: string;
  slides: Slide[];
}

export const RATIONALE_SECTIONS_V2: Record<string, Section> = {

  // SECTION 1: OPENING (1 slide)
  opening: {
    id: 'opening',
    title: 'Opening',
    navLabel: 'Start',
    slides: [
      {
        id: 'opening-headline',
        type: 'section-header',
        headline: 'Why Most Teams Waste 6 Months',
        content: 'Building the Wrong Thing',
        sectionNumber: 0,
        visual: {
          type: 'component',
          component: 'HeroAnimation'
        }
      }
    ]
  },

  // SECTION 2: THE PROBLEM (3 slides)
  problem: {
    id: 'problem',
    title: 'The Problem',
    navLabel: 'The Problem',
    slides: [
      {
        id: 'section-header-problem',
        type: 'section-header',
        headline: 'The Problem',
        content: 'Building before you know what works',
        sectionNumber: 1
      },
      {
        id: 'build-first-trap',
        type: 'problem',
        headline: 'The Build-First Trap',
        content: 'Most teams commit to production architecture before validating core assumptions. By the time users see it, you\'re 3-6 months in. Pivoting means throwing away weeks of work. Killing means political fallout.',
        visual: {
          type: 'component',
          component: 'TraditionalVsRationaleDiagram' // Dual-track Gantt timeline
        },
        deepDive: {
          title: 'Why This Pattern Fails',
          description: 'The systematic problems with specs-first development',
          sections: [
            {
              title: 'Why Specs Fail',
              content: 'Users don\'t know what they want until they feel it. A 20-page spec describes an interaction. A prototype lets users experience it. Experience reveals problems specs can\'t predict. Example: Zero\'s spec said "swipe left to archive." Prototype testing: 73% of users expected swipe right. We pivoted in Day 3, not Month 4.'
            },
            {
              title: 'The Sunk Cost Problem',
              content: '12 weeks into development, you discover the core UX doesn\'t work. Pivoting means throwing away weeks of engineering work. Politically, it\'s a failure. Financially, it\'s a write-off. Teams double down on bad UX to avoid admitting the sunk cost. Result: Ship subpar product to "not waste the investment."'
            }
          ]
        }
      },
      {
        id: 'cost-of-waiting',
        type: 'problem',
        headline: 'The Cost of Waiting',
        content: 'Traditional approach: 4w specs + 16w build + 4w testing = 24 weeks at risk before first user feedback. When you finally discover the UX doesn\'t work, you\'re too deep to pivot.',
        visual: {
          type: 'component',
          component: 'CostComparisonChart'
        }
      }
    ]
  },

  // SECTION 3: THE SOLUTION (4 slides)
  solution: {
    id: 'solution',
    title: 'The Solution',
    navLabel: 'The Solution',
    slides: [
      {
        id: 'section-header-solution',
        type: 'section-header',
        headline: 'The Solution',
        content: '7 prototypes before production',
        sectionNumber: 2
      },
      {
        id: 'build-to-think',
        type: 'solution',
        headline: 'Build-to-Think Methodology',
        content: 'Rationale\'s build-to-think methodology: Rapid prototypes answer binary questions. Each prototype tests one assumption. 7 prototypes = 7 validated decisions before production. Zero guesswork.',
        visual: {
          type: 'component',
          component: 'SevenPrototypeFramework' // Horizontal process flow with gates
        },
        deepDive: {
          title: 'How Build-to-Think Works in Practice',
          description: 'The systematic framework for de-risking development',
          sections: [
            {
              title: 'Prototypes as Decision Tools',
              content: 'Traditional: Write 20-page spec, debate for weeks, build, discover issues in production. Rationale: Build Prototype 1 in 2 days, put in user hands, get answer. Example: Zero Prototype 3 tested swipe direction. 73% of users expected opposite of our hypothesis. We pivoted immediately—before writing any production code. Cost: 2 days. Savings: 2 weeks of rework.'
            },
            {
              title: 'The Systematic Framework',
              content: 'Not random prototyping. Systematic: (1-2) Core interaction model, (3-4) Information architecture, (5-6) Edge cases and error states, (7) Polish and microinteractions. Each prototype has success criteria. Pass → Next prototype. Fail → Pivot or kill. Zero used this exact framework to go from concept to production-ready architecture in 2 weeks.'
            },
            {
              title: 'Why This Saves Time',
              content: 'Counterintuitive: "7 prototypes sounds slow." Reality: Prototype 1 takes 2 days. Finding the same issue in production takes 2 weeks to fix. Prototypes are low-fidelity, high-speed. Production is high-fidelity, low-speed. We de-risk the high-speed phase so production is single-pass, not iterative guessing. Zero had 0 architectural pivots during production because we validated with 7 prototypes first.'
            }
          ]
        }
      },
      {
        id: 'framework-stages',
        type: 'solution',
        headline: 'Spec vs Prototype',
        content: 'Specs describe interactions. Prototypes reveal behavior. Example: Zero\'s spec said "swipe left to archive." Prototype 3 showed 73% of users expected swipe right. We pivoted in 2 days instead of discovering this in Week 16 of production.',
        visual: {
          type: 'component',
          component: 'SpecVsPrototypeDiagram'
        }
      },
      {
        id: 'methodology-origin',
        type: 'solution',
        headline: 'Where This Comes From',
        content: '7 years at Meta Reality Labs shipping AR/AI products to billions taught us: specs fail, prototypes work. Spark AR Platform (Instagram/Facebook AR), AR Commerce strategy (Nike, Target, Sephora), 15+ patents filed—all built with rapid prototyping. That experience isn\'t decoration—it\'s the methodology we bring to every Rationale engagement.',
        visual: {
          type: 'component',
          component: 'MethodologyOriginShowcase'
        }
      },
      {
        id: 'dual-engine-model',
        type: 'solution',
        headline: 'Why We Build Our Own Products',
        content: 'Internal products (Zero, Rationale Site) test methodologies in production. Client partnerships apply proven patterns. Revenue from clients funds internal R&D. Each engine feeds the other—creating systematic competitive advantage.',
        visual: {
          type: 'component',
          component: 'DualEngineModel'
        }
      }
    ]
  },

  // SECTION 4: THE PROOF (4 slides)
  proof: {
    id: 'proof',
    title: 'The Proof',
    navLabel: 'The Proof',
    slides: [
      {
        id: 'section-header-proof',
        type: 'section-header',
        headline: 'The Proof',
        content: 'Zero went concept to App Store in 1 month',
        sectionNumber: 3
      },
      {
        id: 'zero-metrics',
        type: 'impact',
        headline: 'Zero: Concept to App Store in 1 Month',
        content: 'Not a toy prototype. Not a demo. A production iOS app with real users, 10 microservices, and 182 Swift files. Achieved because we validated with 7 prototypes first. Same systematic velocity for every Rationale engagement.',
        visual: {
          type: 'component',
          component: 'ZeroMetricsDiagram' // Radial achievement with comparison anchors
        }
      },
      {
        id: 'what-zero-proves',
        type: 'impact',
        headline: 'What Zero Proves About Rationale',
        content: 'Technical execution: 10 microservices in production. Systematic velocity: 0 architectural pivots during production. Product thinking: Live on App Store with 4-cohort beta rollout strategy, complete financial model, 24-week roadmap.',
        visual: {
          type: 'component',
          component: 'ZeroArchitectureDiagram'
        },
        deepDive: {
          title: 'Zero\'s Complete Technical Breakdown',
          description: 'Architecture, velocity, and product strategy proof',
          sections: [
            {
              title: 'Architecture Proof',
              content: '10 microservices: Gateway (routing), Email (IMAP/SMTP), Classifier (AI categorization), Summarization (AI summaries), Shopping Agent (deal detection), Steel Agent (action execution), Scheduled Purchase (recurring orders), Smart Replies (AI suggestions), Actions (workflow), Analytics (telemetry). 182 Swift files organized with MVVM pattern, SwiftUI views, Combine publishers, async/await concurrency. A+ architecture reviewed by senior iOS engineers.'
            },
            {
              title: 'Velocity Proof',
              content: 'Week 1-2: 7 prototypes built and tested. Prototype 3 pivot on swipe direction. Week 3-4: Production development with 0 architectural changes (prototypes validated everything). Week 5: App Store submission and approval. Total: Concept to live product in 30 days. Same velocity model available for client partnerships via Rationale Kits.'
            },
            {
              title: 'Product Thinking Proof',
              content: 'Not just engineering. Complete product strategy: 4-cohort beta rollout (friends → power users → general → scale), progressive quality scaling from 85% to 95%+ AI accuracy through structured user feedback, 8-week go/no-go checkpoint with clear metrics, 24-week roadmap with bootstrap and funded scenarios, complete financial model with TAM/SAM/SOM analysis. This is what working software with validated execution plans looks like.'
            }
          ]
        }
      },
      {
        id: 'zero-timeline',
        type: 'impact',
        headline: 'The Sunk Cost Trap',
        content: 'Week 4: Capital invested, UX issue found. Week 8: More sunk, core interaction failing tests. Week 12: Months wasted, user feedback confirms it\'s wrong. Week 16: Too deep to pivot—launch with known problems or kill the project. Rationale avoids this with early validation.',
        visual: {
          type: 'component',
          component: 'DecisionPressureDiagram'
        }
      }
    ]
  },

  // SECTION 5: DE-RISK (3 slides)
  deRisk: {
    id: 'de-risk',
    title: 'De-Risk Your Investment',
    navLabel: 'De-Risk',
    slides: [
      {
        id: 'section-header-derisk',
        type: 'section-header',
        headline: 'De-Risk Your Investment',
        content: 'Clear checkpoints, low commitment',
        sectionNumber: 4
      },
      {
        id: 'engagement-models',
        type: 'custom',
        headline: 'Two Ways to Engage',
        content: '3-Week Sprint validates your hypothesis with prototypes before you commit to production. 12-Week Pilot delivers a complete product from concept to users. Both include clear checkpoints and exit options.',
        visual: {
          type: 'component',
          component: 'EngagementModelsGrid'
        }
      },
      {
        id: 'checkpoint-timeline',
        type: 'custom',
        headline: 'How We De-Risk Your Investment',
        content: 'Most agencies ask for 3-6 month commitments. Rationale works in 2-week sprints with clear go/no-go checkpoints. Low commitment, high confidence.',
        visual: {
          type: 'component',
          component: 'CheckpointTimelineDiagram' // Timeline with risk decay curve
        }
      },
      {
        id: 'checkpoint-details',
        type: 'custom',
        headline: 'Service Offerings',
        content: '3-Week Sprint: 7 prototypes + architecture, 10-15x ROI through avoided waste. 12-Week Pilot: Sprint + full production build, 15-20x ROI with 6 months time saved.',
        visual: {
          type: 'component',
          component: 'ServiceOfferingBreakdown'
        }
      },
      {
        id: 'cta',
        type: 'custom',
        headline: 'Start Your 3-Week Validation Sprint',
        content: 'No long-term commitment. Clear checkpoints. Pivot-friendly. Traditional 6-month build: significant capital at risk. Rationale 3-week sprint: clear exit points and controlled investment.',
        visual: {
          type: 'icon',
          name: 'cta'
        }
      }
    ]
  }
};

export function getAllSectionsV2(): Section[] {
  return [
    RATIONALE_SECTIONS_V2.opening,
    RATIONALE_SECTIONS_V2.problem,
    RATIONALE_SECTIONS_V2.solution,
    RATIONALE_SECTIONS_V2.proof,
    RATIONALE_SECTIONS_V2.deRisk
  ];
}
