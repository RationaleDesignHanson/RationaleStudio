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
        headline: 'Most Teams Waste 6 Months',
        content: '(building the wrong thing)',
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
        content: 'Teams commit to production before validating how it will be used and what good looks like.',
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
              content: 'Users don\'t know what they want until they feel it. A 20-page spec describes an interaction. A prototype lets users experience it. Experience reveals problems specs can\'t predict. Example: Zero\'s prototype had cards users could swipe. Reality: Users tapped instead of swiping. We added tap affordances in Day 3, not Month 4.'
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
        content: 'Specs + build + testing = ~24 weeks at risk before user feedback. By the time you discover the UX doesn\'t work, you\'re too deep to pivot.',
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
        content: 'build for conviction',
        sectionNumber: 2
      },
      {
        id: 'build-to-think',
        type: 'solution',
        headline: 'Build-to-Think Methodology',
        content: 'Rationale\'s build-to-think methodology: Rapid prototypes answer binary questions. Each prototype tests one assumption. Not all products follow the same path—we adapt the framework to your specific validation needs. Zero guesswork.',
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
              content: 'Each prototype answers a binary question. Not "does this look good?" but "can users complete the core task?" Prototype 1: Can users understand the value proposition in 5 seconds? Pass → Build Prototype 2. Fail → Pivot concept or kill. Example: Zero tested tap vs. swipe interaction. Users tapped instead of swiping. We added tap affordances in Day 3, not Month 4.'
            },
            {
              title: 'Adaptive, Flexible Frameworks',
              content: 'Not random prototyping. Systematic: (1-2) Core interaction model, (3-4) Information architecture, (5-6) Edge cases and error states, (7) Polish and microinteractions. Each prototype has success criteria. Pass → Next prototype. Fail → Pivot or kill. Zero used this exact framework to go from concept to production-ready architecture in 2 weeks.'
            },
            {
              title: 'Why This Saves Time',
              content: 'Not linear. We don\'t always start at Prototype 1. Some projects begin at information architecture (3-4). Some skip edge cases (5-6) if the interaction model is proven. The framework adapts to your starting point and risk profile. What\'s consistent: Each prototype answers one question before moving to production. Zero had 0 architectural pivots during production because we validated assumptions in the high-speed phase, not the low-speed phase.'
            }
          ]
        }
      },
      {
        id: 'framework-stages',
        type: 'solution',
        headline: 'Spec vs Prototype',
        content: 'Specs describe what something should do. Prototypes show how it feels and what it needs to do. Example: A spec says "users can filter by category." A prototype reveals the interaction feels clunky and needs inline filtering, not a modal. We catch this in Day 2, not Week 16 of production.',
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
        content: 'Internal products test methodologies in production. Client partnerships apply proven patterns. Revenue from clients funds internal R&D. Each engine feeds the other—creating systematic competitive advantage.',
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
        content: 'We ship products people actually use',
        sectionNumber: 3
      },
      // TEMPORARILY HIDDEN - Needs refinement
      // {
      //   id: 'zero-metrics',
      //   type: 'impact',
      //   headline: 'Zero: Concept to App Store in 1 Month',
      //   content: 'Not a toy prototype. Not a demo. A production iOS app with real users, 10 microservices, and 182 Swift files. Achieved because we validated with 7 prototypes first.',
      //   visual: {
      //     type: 'component',
      //     component: 'ZeroMetricsDiagram' // Radial achievement with comparison anchors
      //   }
      // },
      {
        id: 'what-zero-proves',
        type: 'impact',
        headline: 'This Is the Proof',
        content: 'Zero and Heirloom aren\'t demos or prototypes—they\'re live products solving real problems for real users. One tackles inbox overload. The other preserves family recipes. Both shipped with systematic velocity and complete technical execution.',
        visual: {
          type: 'component',
          component: 'ProductRangeDiagram'
        },
        deepDive: {
          title: 'Products That Solve Real Problems',
          description: 'How we prove capability through shipped consumer products',
          sections: [
            {
              title: 'Zero: Email Triage for Busy Professionals',
              content: 'Problem: Professionals receive 200+ emails daily. Important items—flight confirmations, package tracking, meeting follow-ups—get buried in promotional noise. Users spend 45 minutes each morning just figuring out what needs attention. Solution: Zero uses AI to automatically categorize and extract actions from emails. Swipe to triage, tap to see what matters. Value: Users reduce email management from 45 minutes to 5 minutes daily. Never miss important deliveries or deadlines. Live on the App Store.'
            },
            {
              title: 'Heirloom: Recipe Preservation for Families',
              content: 'Problem: Recipes scattered everywhere—screenshots in camera rolls, bookmarks in Safari, texts from family members. Grandmother\'s handwritten recipe cards are fading. No single place to organize, preserve, or share family recipes. Solution: Heirloom scans recipes from photos using AI, organizes them in a beautiful vintage-inspired digital cookbook, syncs across devices with iCloud. Value: Preserve family recipe history. Find any recipe instantly. Share collections with loved ones. Beautiful design that honors the emotional value of recipes.'
            },
            {
              title: 'Proof of Range: Different Problems, Same Systematic Approach',
              content: 'We build different types of products—from productivity tools to lifestyle apps—proving our methodology works across problem spaces. Zero and Heirloom represent range: B2C vs. lifestyle, AI-powered vs. preservation-focused, time-saving vs. emotionally meaningful. Both shipped fast because we validated assumptions with prototypes before writing production code. The same systematic approach applies to client work: validate early, ship with confidence.'
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
        content: '4-Week Sprint validates your hypothesis with prototypes before you commit to production. 12+ Week Pilot delivers a complete product from concept to users. Both include clear checkpoints and exit options.',
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
        content: '4-Week Sprint: Prototypes + architecture, 10-15x ROI through avoided waste. 12+ Week Pilot: Sprint + full production build, 15-20x ROI with 6 months time saved.',
        visual: {
          type: 'component',
          component: 'ServiceOfferingBreakdown'
        }
      },
      {
        id: 'who-this-is-for',
        type: 'custom',
        headline: 'Who This Is For',
        content: 'Hands-on builders who need velocity. Founders with conviction but limited runway. Teams open to equity discussions (cash engagements welcome too). Partners who value systematic execution over vendor relationships.',
        visual: {
          type: 'component',
          component: 'WhoThisIsForInfographic'
        }
      },
      {
        id: 'final-cta',
        type: 'custom',
        headline: 'Ready to Build?',
        content: 'Explore our work, understand our thinking, or start a conversation about your project. Three paths forward.',
        visual: {
          type: 'component',
          component: 'ReadyToBuildInfographic'
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
