// Athletes First V2 - Pilot-Focused Modular Content
// Restructured: Problem → Solution → Demo narrative flow
// Updated: NIL positioned as trust-building guidance platform

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
  contentBullets?: string[];
  visual?: {
    type: 'icon' | 'diagram' | 'chart' | 'stat' | 'image' | 'component';
    name?: string;
    data?: any;
    component?: string;
  };
  // For demo slides with multiple tabs
  demos?: DemoTab[];
  // For optional deep dive accordion after this slide
  deepDive?: DeepDive;
  // For section header slides
  sectionNumber?: number;
  terminalCommand?: string;
}

export interface Section {
  id: string;
  title: string;
  navLabel: string;
  slides: Slide[];
}

export const AF_SECTIONS_V2: Record<string, Section> = {
  // OPENING SECTION: Welcome (1 slide)
  opening: {
    id: 'opening',
    title: 'Welcome',
    navLabel: 'Start',
    slides: [
      {
        id: 'welcome',
        type: 'custom',
        headline: 'Athletes First × Rationale',
        content: 'Thanks for the opportunity. Excited to show you how AI can scale your agency systematically.',
        visual: {
          type: 'component',
          component: 'WelcomeSlide'
        }
      }
    ]
  },

  // NEW SECTION: THE INDUSTRY PROBLEM (3 slides)
  industryProblem: {
    id: 'industry-problem',
    title: 'The Industry Problem',
    navLabel: 'The Problem',
    slides: [
      {
        id: 'section-header-problem',
        type: 'section-header',
        headline: 'The Problem',
        content: 'Why agencies hit growth ceilings',
        sectionNumber: 1,
        terminalCommand: '$ run diagnosis.analyze()'
      },
      {
        id: 'agency-paradox',
        type: 'problem',
        headline: 'The Innovation Window: 12-24 Month AI Advantage',
        content: 'Agencies deploying AI today gain competitive advantages before capabilities become industry standard. Early movers win systematically. The window is closing fast.',
        visual: {
          type: 'component',
          component: 'AIAdoptionCurveDiagram'
        },
        deepDive: {
          title: 'Competitive Landscape',
          description: 'Market dynamics driving consolidation and the need for systematic advantages',
          sections: [
            {
              title: 'Saturation Economics',
              content: '800+ certified NFL agents compete for ~250 draft picks annually. College athlete market is even more crowded with NIL opportunities.\n\nResult: Price competition, service differentiation battles, and relationship intensity wars.\n\nTraditional competitive advantages (relationships, reputation) are table stakes—no longer differentiators.'
            },
            {
              title: 'The Scale Advantage',
              content: 'Large agencies (CAA, Wasserman, WME) leverage technology, brand partnerships, and operational systems to serve 50-200+ athletes efficiently. Mid-size and boutique agencies (10-30 athletes) can\'t match this systematically—they rely on heroic individual effort from agents. This creates unsustainable workload and limits growth.'
            },
            {
              title: 'The Innovation Window',
              content: 'AI adoption in sports representation is accelerating.\n\nAgencies deploying AI-powered tools TODAY gain 12-24 month competitive advantages before these capabilities become industry standard.\n\nEarly movers are already using AI for content generation, compliance analysis, and interactive pitching. The window for differentiation is closing fast.'
            }
          ]
        }
      },
      {
        id: 'three-bottlenecks',
        type: 'problem',
        headline: 'Three Bottlenecks Limiting Growth',
        content: 'Physical availability caps content revenue. NIL complexity creates trust deficits. Static pitches fail to build confidence. These aren\'t process problems—they\'re systematic constraints.',
        visual: {
          type: 'component',
          component: 'ThreeBottlenecksDiagram'
        },
        deepDive: {
          title: 'The Systematic Constraints',
          description: 'Why traditional agency models hit growth ceilings at 30-50 athletes',
          sections: [
            {
              title: 'Bottleneck 1: Physical Availability',
              content: 'Athletes train 6-8 hours daily. Brand shoots require 4-8 hour blocks. Regional brands want 10-15 localized campaigns, but athletes can only deliver 1-2 per year. Premium fan content market ($500-2K per personalized video) goes untapped.\n\nRevenue ceiling: Can\'t scale content without scaling athlete time.'
            },
            {
              title: 'Bottleneck 2: NIL Compliance Complexity',
              content: '50 state frameworks, NCAA policy, conference rules, and institutional requirements create legal landmines. Manual compliance review takes 1-2 weeks. Viral moments have 48-72 hour windows.\n\nAthletes choose agents who can move fast WITHOUT taking shortcuts.\n\nTrust deficit: Families fear one bad deal destroys eligibility.'
            },
            {
              title: 'Bottleneck 3: Static Pitch Materials',
              content: 'PowerPoint decks can\'t answer family questions in real-time. "What if I get injured in year 2?" "How do bonus structures work if I\'m traded?" Static materials force families to IMAGINE scenarios instead of SEEING them. Confidence deficit: Athletes sign with agents who reduce uncertainty, not add polish to presentations.'
            }
          ]
        }
      },
      {
        id: 'status-quo-wont-scale',
        type: 'problem',
        headline: 'The Status Quo Won\'t Get You There',
        content: 'Hiring more agents doesn\'t fix systematic bottlenecks. Manual processes cap portfolio size at 30-50 athletes. AI-enabled agencies are pulling ahead RIGHT NOW.',
        visual: {
          type: 'component',
          component: 'StatusQuoCeilingDiagram'
        },
        deepDive: {
          title: 'Why "Business as Usual" is a Losing Strategy',
          description: 'The compounding disadvantage of delayed AI adoption',
          sections: [
            {
              title: 'Linear Growth Hits Walls',
              content: 'Adding agents scales linearly: 10 agents can serve ~50 athletes at high quality.\n\nBut systematic bottlenecks remain: content generation still requires athlete time, compliance still requires manual review, pitches still use static decks. Linear growth strategies hit quality walls at 50-100 athletes—exactly where CAA, Wasserman, and WME are deploying AI to break through.'
            },
            {
              title: 'The Competitive Clock is Ticking',
              content: 'Large agencies are already piloting AI tools.\n\nEarly adopters gain data advantages: more training examples, better models, faster iteration.\n\nIn 12-24 months, AI-powered content, compliance, and pitching will be TABLE STAKES—not differentiators.\n\nAgencies that move now gain first-mover advantages.\n\nAgencies that wait play catch-up with worse data and fewer resources.'
            },
            {
              title: 'The Cost of Inaction',
              content: 'What you lose by waiting: (1) Recruitment deals to AI-enabled competitors with interactive pitches. (2) Brand partnership revenue because you can\'t scale content fast enough. (3) Trust from families who see competitors moving faster on NIL guidance. (4) Agency valuation as AI-adoption becomes investor requirement. Doing nothing isn\'t neutral—it\'s falling behind.'
            }
          ]
        }
      }
    ]
  },

  // SOLUTION OVERVIEW: The Full Platform (5 slides)
  solutionOverview: {
    id: 'solution-overview',
    title: 'Solution Overview',
    navLabel: 'The Solution',
    slides: [
      {
        id: 'section-header-solution',
        type: 'section-header',
        headline: 'The Solution',
        content: 'AI-powered modules that scale systematically',
        sectionNumber: 2,
        terminalCommand: '$ run solution.deploy()'
      },
      {
        id: 'four-modules',
        type: 'solution',
        headline: 'Athletes First AI-Enabled Platform',
        content: 'Pick 2-3 modules for your 90 day pilot.',
        visual: {
          type: 'component',
          component: 'FourModulesSystemDiagram'
        },
        deepDive: {
          title: 'Module Descriptions',
          description: 'Detailed breakdown of each module and what it delivers',
          sections: [
            {
              title: 'NIL Guidance Platform',
              content: 'AI-powered strategic oversight for deal analysis. High-level pattern recognition and red flag detection in seconds. Educational transparency builds trust with athletes and families. Positions you as the benevolent protector and trusted advisor.\n\nNOTE: Provides strategic guidance to inform your legal counsel—not legal advice.'
            },
            {
              title: 'Interactive Pitch',
              content: 'Real-time contract modeling and scenario exploration. Interactive visualizations answer family questions live.\n\nAthletes explore scenarios and see the math instantly. Measured close rate improvement tracked in pilot vs. traditional pitch materials with control groups.'
            },
            {
              title: 'Video & Digital Twins',
              content: 'Scalable deployment from one capture session. One 4-hour session (varies by athlete) captures voice, likeness, and mannerisms. Generate hundreds of authorized content variations. Built-in rights verification ensures brand safety.\n\nRevenue opportunities: Regional brand campaigns typically pay $10K-$50K each (Source: OpenSponsorship 2024), and premium fan content commands $300-$2,000 per video on platforms like Cameo (Source: FinanceBuzz 2024).'
            },
            {
              title: 'AmplifyAI',
              content: '48-72 hour brand-safe content for cultural moments.\n\nWhen cultural moments happen (game-winning plays, viral tweets), athletes need content FAST. AmplifyAI generates brand-safe campaigns in 48-72 hours vs 2-3 weeks. Capture trending moments before they pass.\n\nResult: 3-5x more brand deals per athlete without agent burnout.'
            }
          ]
        }
      },
      {
        id: 'section-header-modules',
        type: 'section-header',
        headline: 'Our Modules',
        content: 'Four AI-powered tools that scale your agency',
        sectionNumber: 3
      },
      {
        id: 'modules-intro',
        type: 'custom',
        headline: 'Four AI-Powered Modules',
        content: 'Each module solves a systematic bottleneck. Pick 2-3 modules for your 90 day pilot.',
        visual: {
          type: 'component',
          component: 'ModulesIntroSlide'
        }
      }
    ]
  },

  // MODULE A: Video & Digital Twins (4 slides)
  videoDigitalTwins: {
    id: 'video-digital-twins',
    title: 'Video & Digital Twins',
    navLabel: 'Video & Digital Twins',
    slides: [
      {
        id: 'problem',
        type: 'problem',
        headline: 'Physical Availability Caps Revenue',
        content: '800+ agents, 250 draft spots. Demanding schedules limit shoots. Can\'t meet brand demand for regional, personalized content.',
        deepDive: {
          title: 'The Revenue Ceiling Problem',
          description: 'How physical availability limits brand partnership potential and caps athlete earning power.',
          sections: [
            {
              title: 'The Scheduling Bottleneck',
              content: 'Elite athletes train 6-8 hours daily during season. Travel schedules are non-negotiable. Brand shoots require 4-8 hour blocks that don\'t exist. Result: Brands want 10-15 regional campaigns, but athletes can only deliver 1-2 per year.'
            },
            {
              title: 'Regional Deal Revenue Loss',
              content: 'Regional brands pay $10K-$50K per campaign for localized content. Athletes with national reach could do 20+ regional campaigns per year if availability wasn\'t constrained. Current model: Maybe capture 2-3 of these deals. Digital twins: All 20+.'
            },
            {
              title: 'The Premium Fan Market',
              content: 'High-net-worth fans will pay $500-$2,000 for personalized video messages from their favorite athletes.\n\nTraditional model: Maybe 10-20 per year due to time constraints. Digital twins: 1,000+ personalized messages = $500K+ in new revenue.'
            }
          ]
        }
      },
      {
        id: 'solution',
        type: 'solution',
        headline: 'One Session → Infinite Deployment',
        content: 'One 4-hour capture session. Unlimited authorized content variations with instant rights verification.',
        visual: {
          type: 'component',
          component: 'InfiniteDeploymentDiagram'
        },
        deepDive: {
          title: 'Technical Deep Dive: How Digital Twins Work',
          description: 'Understand the 4-step process and see real-world precedents from FanDuel and Nike.',
          sections: [
            {
              title: '4-Step Digital Twin Process',
              content: '(1) Capture - One 4-hour studio session captures voice, likeness, movement patterns, and expressions.\n\n(2) Train - AI models learn speech patterns, mannerisms, and authentic delivery style.\n\n(3) Generate - Produce unlimited variations of approved content with guaranteed brand safety.\n\n(4) Deploy - Instant distribution across channels with built-in rights verification.'
            },
            {
              title: 'Industry Precedent: Charles Barkley × FanDuel',
              content: 'FanDuel created AI-powered Charles Barkley experiences including an interactive ChuckGPT chatbot and deepfake "Young Chuck" TV spots for regional NBA playoff campaigns. The AI system authentically mirrored Barkley\'s speech patterns and personality, demonstrating how digital twins can maintain authentic voice across scalable content. (Source: FanDuel Press Release, April 2023; TechCrunch, August 2024)'
            },
            {
              title: 'Industry Precedent: Nike A.I.R. Project',
              content: 'Nike\'s Athlete Imagined Revolution (A.I.R.) project uses proprietary AI models trained on exclusive athlete data to design personalized products in hours instead of months. The system combines performance data from elite athletes like LeBron James with 3D printing technology—demonstrating how AI can scale personalized athlete experiences at production quality. (Source: Nike Innovation Center, May 2024)'
            },
            {
              title: 'Rights Infrastructure',
              content: 'Every piece of generated content includes cryptographic proof of authorization. Brands can instantly verify usage rights. Unauthorized use is automatically detected and flagged.\n\nAthletes maintain complete control with real-time approval dashboards. Smart contracts enforce geographic restrictions, time limits, and content categories automatically.'
            }
          ]
        }
      },
      {
        id: 'demo',
        type: 'demo',
        headline: 'Video & Digital Twins Demos',
        demos: [
          {
            id: 'digital-twins',
            label: 'Digital Twins & Rights',
            description: 'Infinite Deployment',
            component: 'DigitalTwinsDemo'
          },
          {
            id: 'brand-campaign',
            label: '1:1 Fan Content',
            description: 'Regional, Personalized & Seasonal',
            component: 'BrandCampaignDemo'
          },
          {
            id: 'roster-campaign',
            label: 'Roster-Wide Activations',
            description: 'One Brief → Entire Roster',
            component: 'RosterCampaignDemo'
          }
        ]
      },
      {
        id: 'impact',
        type: 'impact',
        headline: 'Revenue Unlock: $150K-$500K+ Per Athlete',
        content: '20 regional spots. 1,000 personalized messages. Instant post-game content. All from one 4-hour session.\n\nAthletes First is perfectly positioned to drive the revolution of digital twins and consent-based likeness management.',
        visual: {
          type: 'component',
          component: 'RevenueUnlockDiagram'
        }
      }
    ]
  },

  // MODULE B: NIL GUIDANCE PLATFORM (4 slides) - REPOSITIONED AS TRUST-BUILDING TOOL
  nilPlatform: {
    id: 'nil-platform',
    title: 'NIL Guidance Platform',
    navLabel: 'NIL Guidance',
    slides: [
      {
        id: 'problem',
        type: 'problem',
        headline: 'Athletes and Families Need Trusted Guidance Through NIL Complexity',
        content: 'NIL deals are confusing and high-stakes. One bad deal can destroy eligibility. Families don\'t know what "good" looks like. They choose agents they trust to protect them.',
        visual: {
          type: 'component',
          component: 'NILComplexityDiagram'
        },
        deepDive: {
          title: 'The Trust Deficit in NIL Deals',
          description: 'Why families need transparent, educational guidance—not just contract execution',
          sections: [
            {
              title: 'The Confusion Problem',
              content: 'Athletes and families face overwhelming complexity: 50 state frameworks, NCAA rules, conference regulations, and institutional policies. Most don\'t understand the difference between "deal value" and "guaranteed money." They can\'t assess if a $50K NIL deal with 5-year IP rights is good or predatory. They need an EDUCATOR, not just an executor.'
            },
            {
              title: 'The Fear Problem',
              content: 'One improperly structured deal can cost an athlete their entire college eligibility. Families hear horror stories about athletes losing scholarships over technical violations. They\'re terrified of making mistakes they can\'t undo. Result: They delay decisions, pass on deals, or choose conservative agents who say "no" to everything. Trust equation: Can this agent protect us WITHOUT being too cautious?'
            },
            {
              title: 'The Advisory Gap',
              content: 'Athletes need someone who explains the landscape, identifies red flags, and helps them understand trade-offs—BEFORE involving lawyers.\n\nTraditional model: Agent negotiates, then legal reviews (expensive, slow). Modern model: Agent provides strategic guidance UP FRONT, then legal confirms (faster, educational, trust-building).\n\nFamilies want transparency: "Show us WHY this is risky" not just "Trust us, it is."'
            }
          ]
        }
      },
      {
        id: 'solution',
        type: 'solution',
        headline: 'AI-Powered Guidance Platform: Strategic Oversight, Not Legal Advice',
        content: 'High-level deal analysis spots patterns and red flags in seconds. Educational transparency shows families the "why" behind recommendations. Position yourself as the benevolent protector who helps them understand, not just the salesperson pushing deals.',
        visual: {
          type: 'component',
          component: 'NILPlatformFlowDiagram'
        },
        deepDive: {
          title: 'How the NIL Guidance Platform Works',
          description: 'Understanding the strategic guidance model and important disclaimers',
          sections: [
            {
              title: 'What It Does: High-Level Pattern Recognition',
              content: 'AI analyzes deal structures against 50+ state NIL frameworks, NCAA policy, conference rules, and best practices from 1,000+ deals. Identifies red flags: perpetual IP rights, one-sided termination clauses, deferred compensation risks, geographic conflicts. Provides educational explanations: "This clause is risky because..." with market comparables and negotiation suggestions. Generates transparency reports families can understand without legal training.'
            },
            {
              title: 'What It Doesn\'t Do: Legal Advice',
              content: 'IMPORTANT DISCLAIMER: This platform provides strategic guidance and educational oversight to inform your decision-making. It is NOT legal advice. Always consult qualified legal counsel for legal review and final contract approval. The platform helps you understand WHAT to ask your lawyer and WHY certain terms matter—it doesn\'t replace professional legal counsel.'
            },
            {
              title: 'The Trust-Building Model',
              content: 'Traditional: "Trust me, I\'ve been doing this 20 years." (Opaque, relationship-dependent)\n\nModern: "Here\'s the AI analysis showing 3 red flags in this deal, with market comparables and suggested terms. Let\'s review together before involving your lawyer." (Transparent, educational, empowering)\n\nResult: Athletes feel PROTECTED and INFORMED. Families see you as advisor, not just salesperson. You become the agent families RECOMMEND to other athletes.'
            },
            {
              title: 'Positioning: Benevolent Goodwill Platform',
              content: 'This isn\'t a "compliance product" you sell. It\'s a GOODWILL GESTURE that builds trust: "We built this AI tool because we want you to understand every deal you sign. No surprises, no regrets. Our job is to protect you—and that starts with education."\n\nMessage to athletes: "This tool is here to make you smarter about your deals. Use it as much as you want, no cost, no pressure. We succeed when you feel confident and protected."\n\nCompetitive advantage: Other agents say "trust me." You say "let me SHOW you why this is good/bad, then decide for yourself." Transparency wins.'
            }
          ]
        }
      },
      {
        id: 'demo',
        type: 'demo',
        headline: 'NIL Guidance Platform Demo',
        demos: [
          {
            id: 'nil-analyzer',
            label: 'NIL Deal Analyzer',
            description: 'Strategic Guidance & Red Flags',
            component: 'NILAnalyzerDemo'
          }
        ]
      },
      {
        id: 'impact',
        type: 'impact',
        headline: 'Become the Trusted Advisor Families Recommend',
        content: 'Educational transparency builds trust. Athletes feel protected, not pressured. Families see you as the benevolent guide, not just the dealmaker. Trust drives referrals.',
        deepDive: {
          title: 'Measuring Trust and Impact',
          description: 'How strategic guidance translates to competitive advantage',
          sections: [
            {
              title: 'Trust Metrics That Matter',
              content: 'Family satisfaction scores: 9+/10 "We felt informed and protected"\nReferral rate: 40-60% of athletes recommend you to teammates (vs industry avg 20-30%)\nDeal confidence: Athletes proceed with deals 30% faster because they understand the terms\nZero eligibility violations: Perfect compliance record builds reputation with families and schools'
            },
            {
              title: 'The Referral Flywheel',
              content: 'Trust-based positioning creates compounding advantages:\n\nAthlete 1 signs → Feels protected and informed → Recommends you to 2-3 teammates\n\nThose athletes experience same transparency → Families talk to other families → "Athletes First uses AI to explain every deal—no other agent does that"\n\nResult: Recruiting becomes easier because your reputation precedes you.\n\nFamilies SEEK YOU OUT instead of you chasing them.'
            },
            {
              title: 'Competitive Positioning: The Benevolent Protector',
              content: 'Most agents position as deal-closers: "I got this athlete $500K"\n\nYou position as protector: "I helped 50 athletes understand their deals and avoid 12 that would have cost them eligibility"\n\nWhich agent do parents trust? The one bragging about money or the one preventing disasters?\n\nBonus: When you DO close big deals, the trust foundation makes them easier.\n\nAthletes know you\'re optimizing for their protection, not your commission.'
            },
            {
              title: 'Important Reminder: This is Strategic Guidance',
              content: 'Every interaction reinforces: "This platform provides strategic guidance to help you understand your options. Always review final contracts with qualified legal counsel. We\'re here to help you ask the right questions and understand the trade-offs—your lawyer confirms everything is correct."\n\nThis disclaimer protects you AND builds trust. It shows you\'re not cutting corners or overpromising. Families appreciate the honesty and transparency.'
          }
          ]
        }
      }
    ]
  },

  // MODULE C: Interactive Pitch (4 slides) - UNCHANGED
  interactivePitch: {
    id: 'interactive-pitch',
    title: 'Interactive Pitch',
    navLabel: 'Interactive Pitch',
    slides: [
      {
        id: 'problem',
        type: 'problem',
        headline: 'Static Presentations Create Uncertainty',
        content: 'Families have questions your deck doesn\'t answer. Athletes choose agents who make decisions clearer.',
        deepDive: {
          title: 'How Athletes Actually Choose Agents',
          description: 'Understanding the trust equation and why static materials fail in high-stakes signing decisions.',
          sections: [
            {
              title: 'The Trust Equation',
              content: 'Athletes aren\'t hiring a business partner—they\'re adding someone to their inner circle for 10-20 years. They\'re trusting an agent with their financial future, reputation, and entire career trajectory. This isn\'t a B2B software sale, it\'s a life decision. Static pitch decks fundamentally misunderstand what\'s being evaluated: Can I trust this person with my life?'
            },
            {
              title: 'The Real-Time Question Problem',
              content: 'During presentations, families interrupt with questions that reveal their actual priorities—often different from what was prepared. "What happens if I get injured in year 2?" "How do bonus structures work if I\'m traded?" "What if my social following explodes?" The ability to handle these curveballs with confidence is what seals deals.'
            },
            {
              title: 'The Clarity Deficit',
              content: 'Athletes want to explore scenarios: guaranteed money vs performance upside, signing bonus timing, endorsement deal structures. Static presentations force them to imagine these scenarios. Interactive tools let them SEE the math in real-time. Clarity replaces uncertainty.\n\nConfidence replaces hesitation.'
            }
          ]
        }
      },
      {
        id: 'solution',
        type: 'solution',
        headline: 'Real-Time Contract Modeling',
        content: 'Interactive visualizations. Live NIL calculations. Families explore scenarios and see the full picture instantly.',
        visual: {
          type: 'component',
          component: 'InteractivePitchInterfaceDiagram'
        },
        contentBullets: [
          'Compare 3-5 contract offers side-by-side with instant AI analysis',
          'Live NIL projections based on real market data—adjust variables in real-time',
          'Visualize 3-year career trajectories with different choices',
          'Instant risk analysis identifies contract red flags as families ask questions'
        ],
        deepDive: {
          title: 'What Makes Interactive Pitching Work',
          description: 'Understanding the technology and psychology behind real-time contract modeling',
          sections: [
            {
              title: 'Core Capabilities',
              content: 'Contract Modeling: Compare guaranteed money, total value, bonus structures, years, and escalators across 3-5 offers simultaneously.\n\nAI highlights key differences and flags unusual terms.\n\nNIL Calculator: Real-time projections for endorsements, social media, appearances, and content deals. Adjust follower count, engagement rate, or market tier—see updated projections instantly.\n\nCareer Pathways: Visualize different scenarios: "What if I take the bigger signing bonus?" "What if I wait a year?" "How does injury protection work?" Athletes explore safely.\n\nRisk Analysis: Automatically identifies red flags like offset language, guarantees tied to roster status, or unusual performance escalators. Explains implications in plain language.'
            },
            {
              title: 'The Psychology: Why It Works',
              content: 'Decision paralysis is common when families face complex, high-stakes choices with incomplete information. Static presentations force them to IMAGINE scenarios. Interactive tools let them SEE scenarios.\n\nWhen athletes can manipulate variables and watch numbers update in real-time, three things happen:\n\n1. Clarity replaces uncertainty—they understand the math\n2.\n\nConfidence replaces hesitation—they see the full picture\n3.\n\nTrust increases—you\'re showing, not telling\n\nResult: Families make decisions 30% faster and with 20-30 points higher close rates because they feel informed, not pressured.'
            },
            {
              title: 'Technical Implementation',
              content: 'Built on proven contract modeling algorithms used by NFL teams and agents. Real-time calculation engine handles complex bonus structures, escalators, and guarantees.\n\nData sources: Historical contract database (5,000+ deals), current market comps, position-specific benchmarks, NIL market rates by sport/position/following.\n\nResponsive visualizations update as agents adjust inputs. Works on iPad in living rooms or projected during family meetings. No internet required after initial data sync.\n\nAgent training: 2-hour workshop covers core scenarios, common questions, and how to guide exploration without overwhelming families.'
            }
          ]
        }
      },
      {
        id: 'demo',
        type: 'demo',
        headline: 'Interactive Pitch Demo',
        demos: [
          {
            id: 'contract-modeling',
            label: 'Contract Modeling',
            description: 'Real-Time Comparison',
            component: 'ContractModelingCanvas'
          },
          {
            id: 'immersive-pitch',
            label: 'Full Experience',
            description: 'Interactive Visualizations',
            component: 'ImmersivePitchDemo'
          },
          {
            id: 'vision-pro-spatial',
            label: 'Spatial Computing',
            description: 'Apple Vision Pro',
            component: 'VisionProSpatialDemo'
          }
        ]
      },
      {
        id: 'impact',
        type: 'impact',
        headline: '20-30 Point Close Rate Improvement',
        content: 'Confident decisions replace hesitation. Questions answered in real-time. Athletes see you as the strategic partner.',
        visual: {
          type: 'component',
          component: 'CloseRateImprovementDiagram'
        }
      }
    ]
  },

  // MODULE D: AmplifyAI (4 slides)
  amplifyAI: {
    id: 'amplify-ai',
    title: 'AmplifyAI',
    navLabel: 'AmplifyAI',
    slides: [
      {
        id: 'problem',
        type: 'problem',
        headline: 'Cultural Moments Have 48-72 Hour Windows',
        content: 'Viral plays, trending topics, cultural moments—they fade fast. Traditional content workflows take 2-3 weeks. By the time you execute, the moment is gone.',
        visual: {
          type: 'component',
          component: 'AmplifyAITimingDiagram'
        },
        deepDive: {
          title: 'The Speed Problem',
          description: 'Why slow execution kills brand opportunities',
          sections: [
            {
              title: 'The Timing Window',
              content: 'Game-winning touchdown on Monday night. Social media explodes. Brands want to capitalize.\n\nTraditional workflow: Creative brief (2 days), athlete scheduling (3-5 days), shoot coordination (1 week), editing and approval (3-5 days), distribution (2 days). Total: 2-3 weeks. Problem: The cultural moment peaked Tuesday morning. By Friday, it\'s old news.'
            },
            {
              title: 'Revenue Left on the Table',
              content: 'Brands pay premium rates for real-time cultural activation. Quick-turnaround campaigns command 2-3x standard rates because of timing value.\n\nAthletes with fast execution capabilities secure 3-5x more brand deals than those limited to traditional workflows. Every missed moment is $10K-$50K in lost opportunity.'
            },
            {
              title: 'Competitive Disadvantage',
              content: 'Athletes who can execute in 48-72 hours become brand favorites. They get recurring partnerships because brands know they can capitalize on moments.\n\nAgencies that enable this speed become preferred partners. Those that can\'t lose deals to faster competitors—even with less famous athletes.'
            }
          ]
        }
      },
      {
        id: 'solution',
        type: 'solution',
        headline: '48-72 Hour Brand-Safe Content Generation',
        content: 'AI-powered content creation captures cultural moments before they fade. Monitor trends, generate brand-aligned content, get agent approval, execute—all within 48-72 hours.',
        visual: {
          type: 'component',
          component: 'AmplifyAIProcessDiagram'
        },
        deepDive: {
          title: 'How AmplifyAI Works',
          description: 'The 4-step rapid execution process',
          sections: [
            {
              title: '4-Step Rapid Execution',
              content: '(1) Detect - AI monitors athlete performance, social trends, and cultural moments in real-time.\n\n(2) Generate - Create brand-aligned content in multiple formats (video, social posts, campaign concepts) using athlete digital twins and brand guidelines.\n\n(3) Review - Agent approval dashboard with one-click edits and brand safety checks.\n\n(4) Execute - Automated multi-platform distribution and brand outreach within hours of approval.'
            },
            {
              title: 'Brand Safety Built In',
              content: 'Every piece of generated content runs through automated brand safety checks: sentiment analysis, compliance verification, rights confirmation. Agents review and approve before distribution. One-click editing for tone adjustments. Built-in guardrails prevent off-brand or controversial content. All content traceable to original approval chain.'
            },
            {
              title: 'The Speed Advantage',
              content: 'Before AmplifyAI: 2-3 weeks from moment to activation, 70% of opportunities missed. After AmplifyAI: 24-48 hours from moment to activation, 90% capture rate. This speed difference translates to 3-5x more brand deals per athlete without additional agent workload.'
            }
          ]
        }
      },
      {
        id: 'demo',
        type: 'demo',
        headline: 'AmplifyAI Demo',
        demos: [
          {
            id: 'amplify-ai',
            label: 'Rapid Brand Activation',
            description: '48-72 Hour Execution',
            component: 'AmplifyAIDemo'
          }
        ]
      },
      {
        id: 'impact',
        type: 'impact',
        headline: '3-5x More Brand Deals Per Athlete',
        content: 'Speed enables more opportunities. Same agent workload, 4x more revenue capture.',
        visual: {
          type: 'component',
          component: 'DealMultiplierDiagram'
        },
        deepDive: {
          title: 'The Economics of Cultural Timing',
          description: 'Why speed unlocks exponentially more brand value',
          sections: [
            {
              title: 'The 48-72 Hour Window',
              content: 'Cultural moments—game-winning plays, viral social posts, trending topics—have extremely short half-lives. By day 3, engagement drops 80%. By week 2, the moment is forgotten.\n\nTraditional workflows:\n- Day 1-3: Agent notices moment, reaches out to athlete\n- Day 4-7: Brief creative team, discuss concepts\n- Day 8-14: Create content, get approvals\n- Day 15-21: Execute campaign\n\nBy day 21, the moment is dead. The deal never happens.\n\nAmplifyAI workflow:\n- Hour 1: AI detects moment + athlete performance spike\n- Hour 2-12: Generate brand-aligned content variations\n- Hour 13-24: Agent reviews, makes edits, approves\n- Hour 25-48: Multi-platform activation + brand outreach\n\nBy hour 48, you\'re live. The moment is still hot. The deal closes.'
            },
            {
              title: 'The Math: Why 3-5x',
              content: 'Traditional approach: 10 cultural moments per year, 3 captured (30% due to slow execution) = 3 brand deals\n\nAmplifyAI approach: 10 cultural moments per year, 9 captured (90% due to rapid execution) = 9 brand deals\n\nThat\'s 3x more deals from timing alone.\n\nBut it compounds:\n- Brands see you\'re FAST → They come to you first → You get better deals\n- Athletes with momentum are worth 2x more to brands → Premium pricing\n- Multiple simultaneous campaigns possible (not bottlenecked on manual work)\n\nResult: 3-5x total deal volume AND higher average deal value, without agents working nights and weekends.'
            },
            {
              title: 'What This Unlocks',
              content: 'Regional brand campaigns: Local businesses want to capitalize on athlete moments but can\'t wait 3 weeks. With 48-hour turnaround, you can capture 20+ regional deals per athlete per year.\n\nSocial media sponsorships: Brands pay premium ($10K-$50K) for posts during peak engagement windows. Miss the window = no deal.\n\nEvent-driven campaigns: Playoffs, rivalry games, milestone moments—these drive 5-10x normal engagement. Speed = capturing this premium.\n\nAthletes become brand-safe because you can respond to cultural moments faster than competitors. This becomes your recruiting advantage: "We move at the speed of culture."'
            }
          ]
        }
      }
    ]
  },

  // WHY RATIONALE (6 slides) - EXPANDED
  whyRationale: {
    id: 'why-rationale',
    title: 'Why Rationale',
    navLabel: 'Why Rationale',
    slides: [
      {
        id: 'section-header-credibility',
        type: 'section-header',
        headline: 'Why Rationale',
        content: 'Track record, team, and proven results',
        sectionNumber: 4
      },
      {
        id: 'about-us',
        type: 'solution',
        headline: 'About Us: Meta AI + FUBO Sports Tech + Builder Mentality',
        content: 'Former Meta FAIR AI leaders and FUBO sports product experts. 20+ teams led from 0-1. We build AI-powered experiences for millions of users—now focused on sports representation.',
        deepDive: {
          title: 'Our Background & Expertise',
          description: 'The team building the Athletes First platform',
          sections: [
            {
              title: 'Leadership: Matt Hanson',
              content: 'VP Product Design at FUBO (2024-Present). Senior Product Design Manager at Meta FAIR + Reality Labs (2018-2024). Led AR platform teams shipping Spark AR (400K+ creators, used billions of times by hundreds of millions of users; Source: Meta Spark Blog 2020-2022), Instagram Shopping AR, Quest MR Mode, and contributed to Orion AR Glasses. Patent holder for "Interactive Avatars in Artificial Reality." 20+ teams led from 0-1.'
            },
            {
              title: 'AI-Integrated UX Expertise',
              content: 'At Meta FAIR, led design for embodied AI agents and multi-modal AI systems. Built Zero Inbox (AI-powered email triage with swipeable cards, multi-step flows). Designed Rumi (AI video indexing with agentic remote control). We understand how to design for uncertainty, agency, and AI-human collaboration.'
            },
            {
              title: 'Sports Industry Experience',
              content: 'Currently VP Product Design at FUBO, leading product design across all streaming platforms. Designed AI thumbnail generator processing 200+ teams across 8 leagues with 3-5 second generation time. Deep understanding of sports viewing behavior, real-time content, and multi-surface experiences. We live and breathe sports technology.'
            },
            {
              title: 'Builder DNA',
              content: '20+ teams led from 0-1 at Meta across AR, AI, and commerce. We don\'t just design—we ship working software. Prototyped Zero Inbox in 6 weeks (web + iOS). Delivered FUBO AI thumbnails in 2-week sprint. We move fast, validate with users, and iterate based on real feedback. This is how we approach Athletes First: working prototypes, real user testing, measurable results.'
            }
          ]
        }
      },
      {
        id: 'our-philosophy',
        type: 'solution',
        headline: 'Our Philosophy: Prototypes Before Commitment',
        content: 'We build working software in 2-12 week sprints to create conviction before you commit engineering resources. Transparency, speed, and athlete-centric design drive everything we do.',
        deepDive: {
          title: 'Why This Approach Works',
          description: 'How we de-risk product development and accelerate learning',
          sections: [
            {
              title: 'Conviction Before Code',
              content: 'Most product failures happen because teams commit to building before they understand what to build. We get you to 80% conviction through working prototypes that users can touch, not documents they have to imagine. At 80% conviction, engineering becomes execution, not exploration. This saves months and millions.'
            },
            {
              title: 'Fast Validation Cycles',
              content: 'Documents take weeks to write and months to get feedback. Prototypes create shared reality in days. We ship working software in 2-4 weeks, test with real users (your agents and athletes), and iterate based on actual behavior—not hypotheticals. This accelerates learning by 10x compared to traditional product development.'
            },
            {
              title: 'Athlete-Centric Design',
              content: 'We design for the END USER (athletes and families), not just the buyer (agencies). If athletes don\'t adopt it, it fails—no matter how good the agency dashboard looks. Every prototype gets tested with real athletes to ensure it solves their problems, not just yours. This user-first approach is why our products get adopted, not shelved.'
            },
            {
              title: 'Transparency as a Value',
              content: 'We show you everything: working code, user test recordings, success metrics, failure analysis. No black boxes. No "trust us, it\'s working." You see the data, understand the trade-offs, and make informed decisions. This extends to how we work: weekly check-ins, open Notion docs, shared roadmaps. Full transparency, always.'
            }
          ]
        }
      },
      {
        id: 'why-hire-rationale',
        type: 'solution',
        headline: 'Why Hire Rationale vs. Alternatives?',
        content: 'In-house build takes 18+ months and $1M-$3M+. Generic AI vendors don\'t understand sports. Dev shops lack AI expertise. Rationale delivers 90-day results with proven sports AI systems at 1/3 the cost.',
        visual: {
          type: 'component',
          component: 'CompetitiveComparisonMatrix'
        },
        deepDive: {
          title: 'Build vs. Buy: Complete Comparison',
          description: 'Understanding your alternatives and why Rationale is the optimal choice',
          sections: [
            {
              title: 'Option 1: Build In-House',
              content: 'Timeline: 18-24+ months\nCost: $1M-$3M+ (hiring ML engineers, infrastructure, ongoing maintenance)\nPros: Full control, owns IP, custom to your exact needs\nCons: Requires hiring specialized ML engineers (scarce, expensive, $200-400K/year). No sports AI expertise—your team will learn from scratch. Ongoing maintenance costs. No proven track record.\n\nRationale Advantage: 90 days vs 18-24 months. $100-250K vs $1M-$3M. Proven Meta FAIR + FUBO sports tech expertise. Working systems from day one.'
            },
            {
              title: 'Option 2: Enterprise Vendor (Salesforce, Microsoft, Oracle)',
              content: 'Timeline: 6-12 months\nCost: $500K-$1M+ annually\nPros: Enterprise trust, dedicated support, proven at scale\nCons: No sports-specific features. Generic AI (not tuned for NIL rules, athlete contracts, sports content). Expensive. Slow implementation with complex change management.\n\nRationale Advantage: Sports-specific AI built FOR athlete representation. 90 days vs 6-12 months. 1/3 the cost. Fast iteration based on your feedback, not enterprise roadmaps.'
            },
            {
              title: 'Option 3: Generic Dev Shop',
              content: 'Timeline: 4-8 months\nCost: $50-100K\nPros: Cheaper upfront, flexible scope\nCons: No AI/ML expertise (they\'ll hire contractors or use generic APIs). No sports domain knowledge. Building from scratch, not leveraging proven systems. Quality and delivery timeline unknown.\n\nRationale Advantage: Meta + FUBO AI leaders with deep sports experience. Proven track record shipping to millions. Not building from scratch—adapting proven AI systems to sports representation.'
            },
            {
              title: 'Option 4: Do Nothing (Status Quo)',
              content: 'Timeline: N/A\nCost: $0\nPros: No risk, no cost, no change management\nCons: Fall behind AI-enabled competitors. Lose recruitment deals to agents with interactive tools. Miss 12-24 month first-mover advantage window. Watch as AI becomes table stakes and you play expensive catch-up.\n\nRationale Advantage: 90-day pilot de-risks experimentation. $100-250K validates approach before committing to full build.\n\nEarly adopters gain data advantages and competitive positioning before AI becomes commoditized.'
            }
          ]
        }
      },
      {
        id: 'competitive-positioning',
        type: 'solution',
        headline: 'Why Not Build In-House or Use Someone Else?',
        content: 'Rationale delivers 90-day results with proven AI expertise at 1/3 the cost and 5x faster than alternatives.',
        deepDive: {
          title: 'Why the 90-Day Pilot De-Risks Everything',
          description: 'Understanding the pilot-first approach and exit criteria',
          sections: [
            {
              title: 'Validation Before Long-Term Commitment',
              content: 'Instead of committing $1M+ and 18+ months upfront, validate the approach in 90 days for $100-250K. Choose 2-3 modules based on your priorities. See measurable results at 30, 60, and 90 days. Exit criteria at Week 4, 8, and 12 checkpoints. If it works, scale it. If not, you learned for 1/10th the cost of building in-house.'
            },
            {
              title: 'After the Pilot: You Decide',
              content: 'Pilot completes → You own all the code and IP → Choose your path:\n\n(1) SaaS Subscription: $500-1K/agent/month for full platform access\n(2) Revenue Share: 2-5% of new revenue, no monthly fees\n(3) Bring In-House: Transition code to your team ($50-100K licensing)\n(4) Equity Partnership: Long-term collaboration at reduced fees\n\nNo pressure. No lock-in. You make the call based on REAL results, not sales promises.'
            },
            {
              title: 'Risk Mitigation Built In',
              content: 'Week 4 Checkpoint: Scope misalignment? Exit with 25% refund.\nWeek 8 Checkpoint: Technical concerns? Exit with 10% refund, keep all code.\nWeek 12: Standard completion, full deliverables, choose next steps.\n\nYou\'re protected. We\'re accountable. This is how pilot-first partnerships should work.'
            }
          ]
        }
      },
      {
        id: 'who-we-are',
        type: 'solution',
        headline: 'Who is Rationale?',
        content: 'Former Meta + FUBO product leaders who build working software to create conviction before you commit resources.',
        deepDive: {
          title: 'Track Record & Proof Points',
          description: 'Recent projects demonstrating our capabilities',
          sections: [
            {
              title: 'Zero Inbox: AI Email Client',
              content: 'Built AI-powered email triage with swipeable cards, 7+ action types, multi-step flows. Web + iOS native app. Delivered in 6-week equity partnership. Demonstrates: AI-integrated UX, mobile-first design, complex workflow management.'
            },
            {
              title: 'Rumi: AI Video Indexing',
              content: 'Multi-surface AI system with real-time indexing, agentic remote control, genre channels. Browser extension + agent deployment. 6-week prototype enabled fundraising. Demonstrates: Agentic AI, cross-surface design, real-time processing.'
            },
            {
              title: 'FUBO: AI Thumbnail Generator',
              content: '2-week sprint: 24 styles, 200+ teams, 8 leagues. 100% style success, 3-5 sec generation. Shipped to production. Demonstrates: Sports expertise, AI content generation, rapid delivery.'
            },
            {
              title: 'Meta: AR Commerce Platform',
              content: 'Led 0-1 AR commerce from prototype to production. 10+ retailers, 200+ AR products, 150% YoY growth. Demonstrates: Platform thinking, enterprise partnerships, scale.'
            }
          ]
        }
      },
      {
        id: 'relevant-work',
        type: 'impact',
        headline: 'Relevant Case Studies',
        content: 'Track record building AI-powered platforms, sports experiences, and 0-1 products. Meta scale. FUBO sports focus. Startup speed.',
        deepDive: {
          title: 'Case Studies & Proof Points',
          description: 'Projects demonstrating AI, sports, and 0-1 capabilities',
          sections: [
            {
              title: 'Meta: Spark AR Platform (400K+ Creators)',
              content: 'Led AR creation platform used by 400K+ creators, deployed billions of times to hundreds of millions of users. Built creator tools, commerce integrations, and developer ecosystem. Demonstrates: Platform thinking, creator economy expertise, massive scale.'
            },
            {
              title: 'FUBO: Multi-League AI Thumbnail System',
              content: 'Delivered production AI system in 2-week strategic sprint. 200+ teams across 8 leagues. 3-5 second generation time. 100% style success rate. Shows: Sports domain expertise, AI execution speed, production-ready delivery.'
            },
            {
              title: 'Zero Inbox: AI-Powered Email (6 Weeks)',
              content: 'Built complete AI email client (web + iOS) in 6-week equity partnership. Swipeable cards, multi-step agentic flows, smart triage. Shows: AI-integrated UX, mobile design, fast validation cycles.'
            },
            {
              title: 'Instagram Shopping AR',
              content: 'Led AR commerce features for Instagram with 10+ major retail partnerships. Virtual try-on for cosmetics, accessories, furniture. Shipped to 1B+ users. Shows: Consumer product expertise, retail partnerships, AR/AI integration.'
            }
          ]
        }
      }
    ]
  },

  // PILOT DETAILS (5 slides) - ADDED URGENCY SLIDE
  pilotDetails: {
    id: 'pilot-details',
    title: 'Pilot Details',
    navLabel: 'Pilot Details',
    slides: [
      {
        id: 'section-header-next-steps',
        type: 'section-header',
        headline: 'Next Steps',
        content: 'How to pilot and scale with Rationale',
        sectionNumber: 5
      },
      {
        id: 'ai-adoption-window',
        type: 'problem',
        headline: 'The AI Adoption Window is Closing',
        content: 'Early movers gain 12-24 months of competitive advantage. Move now for data advantages and market positioning, or wait and play catch-up in 2026.',
        visual: {
          type: 'component',
          component: 'AdoptionWindowDiagram'
        },
        deepDive: {
          title: 'Why Timing Matters: The First-Mover Advantage',
          description: 'Understanding the AI adoption S-curve and the cost of delay',
          sections: [
            {
              title: 'The Innovation S-Curve',
              content: 'Technology adoption follows predictable patterns:\n\nInnovators: Move first, shape market expectations, gain maximum advantage\nEarly Adopters: Move now, capture competitive edge before mainstream\nMajority: Adopt when proven—miss the differentiation window\nLaggards: Forced to adopt just to survive, play permanent catch-up\n\nAI in sports representation is in the Early Adopter phase today. Moving now = 12-24 month lead. Waiting = catch-up mode in 2026 with worse economics.'
            },
            {
              title: 'What Early Movers Capture',
              content: 'Data compounding: More athlete interactions → better AI models → better results → more athletes sign. Competitors without this flywheel can\'t catch up.\n\nMarket positioning: "First agency with AI-powered NIL tools" is a recruiting story for 18-24 months. "Me-too AI" in 2026 is table stakes, not differentiation.\n\nEconomic moat: Lock in 50-100 athletes before AI becomes commoditized. Build advantage while competitors are still debating whether to move.'
            },
            {
              title: 'What Late Movers Pay',
              content: 'Higher costs, worse models: Competitors already trained better AI from 24 months of athlete data. You pay more for "proven" vendor solutions that lag their custom-trained tools.\n\nLost recruitment momentum: Athletes you would have signed in 2025-2026 went to AI-enabled competitors. You lose 2 years of compounding growth.\n\nCommoditization trap: By 2027, AI tools are baseline expectations. You pay to catch up to table stakes, but gain zero competitive advantage.'
            },
            {
              title: 'The Decision',
              content: 'Option 1: Pilot in Q1 2025\n90 days, $100-250K investment, measurable results. Gain 12-24 month competitive window before AI becomes table stakes.\n\nOption 2: Wait and watch\nCompetitors gain data advantages and recruiting stories. You pay more in 2026 to catch up to baseline with no differentiation and lost deals.\n\nEarly movers in sports tech win. Late movers explain.'
            }
          ]
        }
      },
      {
        id: 'modules-overview',
        type: 'custom',
        headline: 'Athletes First AI Platform, Wave 1',
        content: 'Choose 2-3 modules to pilot. See your custom platform roadmap.',
        visual: {
          type: 'component',
          component: 'ModulesOverviewSlide'
        }
      },
      {
        id: 'pilot-strategy',
        type: 'solution',
        headline: 'Pilot 2-3 Modules. See Results in 90 Days.',
        content: 'De-risked, phased approach. Start with 2 modules for quick wins (8-10 weeks). Add 3rd module once first two are validated. Each module proves value before expanding.',
        deepDive: {
          title: 'Why Start Small?',
          description: 'Understanding the pilot-to-platform approach and how it reduces risk',
          sections: [
            {
              title: 'Validation Before Scale',
              content: 'Most platform failures happen when teams try to build everything at once. Starting with 2 modules lets you validate the workflow, measure real results, and build internal champions before expanding. Your agents see wins early, which drives adoption for later modules.'
            },
            {
              title: 'Resource Management',
              content: 'Pilots require 4-6 hours per week from 1-2 agents. Starting with 2 modules keeps this manageable while still delivering impact. Adding a 3rd module after validation ensures you have the bandwidth and process in place to succeed.'
            },
            {
              title: 'Quick Wins Drive Momentum',
              content: 'Module 1 delivers results in 6-8 weeks. These early wins create organizational momentum and executive buy-in for expanding the pilot. Success breeds success—proven results make budget conversations for full platform deployment much easier.'
            }
          ]
        }
      },
      {
        id: 'timeline',
        type: 'solution',
        headline: '90-Day Pilot Timeline',
        content: '',
        visual: {
          type: 'component',
          component: 'PilotTimelineSlide'
        },
        deepDive: {
          title: 'Implementation Timeline by Module',
          description: 'Understand what happens in each phase and when you will see results.',
          sections: [
            {
              title: 'Video & Digital Twins: 8 Weeks',
              content: 'Week 1-2: Capture session + data collection. Week 3-5: AI training + quality validation. Week 6-7: First campaign deployment. Week 8: Results analysis + scale planning. Quick win: Week 6 (first regional campaign live).'
            },
            {
              title: 'NIL Guidance Platform: 10 Weeks',
              content: 'Week 1-3: Rules engine setup + compliance framework. Week 4-6: Agent training + deal template library. Week 7-9: Live deal analysis + marketplace integration. Week 10: Results + optimization. Quick win: Week 4 (first deal analyzed).'
            },
            {
              title: 'Interactive Pitch: 6 Weeks',
              content: 'Week 1-2: Contract data collection + scenario modeling. Week 3-4: Interactive tool development + agent training. Week 5-6: Live pitches with prospects. Quick win: Week 3 (first interactive pitch).'
            },
            {
              title: 'Phased Rollout Strategy',
              content: 'Start with highest-impact module for quick wins. Add second module once first is validated. Scale third module when team is comfortable. Each module proves value before expanding. De-risked approach maximizes success probability.'
            }
          ]
        }
      },
      {
        id: 'metrics',
        type: 'impact',
        headline: 'Success Metrics Per Module',
        content: 'Clear KPIs define pilot success. Measurable outcomes at 30, 60, and 90 days.',
        visual: {
          type: 'component',
          component: 'SuccessMetricsDiagram'
        },
        deepDive: {
          title: 'How We Measure Pilot Success',
          description: 'Quantitative and qualitative metrics for each module with 30/60/90-day checkpoints.',
          sections: [
            {
              title: 'Video & Digital Twins Metrics',
              content: '30 days: First capture session complete, 5 variations generated. 60 days: 2 brand campaigns deployed, early revenue tracked. 90 days: $50K-$150K in new deal revenue, 10+ regional campaigns live, agent satisfaction score 8+/10.'
            },
            {
              title: 'NIL Guidance Platform Metrics',
              content: '30 days: 10 deals analyzed, compliance framework validated. 60 days: 25 deals scored, 0 eligibility violations. 90 days: 50+ deals processed, 2-3 week reduction in deal cycle time, 95%+ compliance accuracy rate, trust scores from families 9+/10.'
            },
            {
              title: 'Interactive Pitch Metrics',
              content: '30 days: Tool deployed, 3 live pitches completed. 60 days: 10 pitches, qualitative feedback collected. 90 days: 20+ pitches, 15-25 point improvement in close rate vs control group, 9+/10 agent satisfaction.'
            },
            {
              title: 'Exit Checkpoints',
              content: 'Week 4: Kickoff review (go/no-go on scope). Week 8: Mid-pilot assessment (scale or pivot). Week 12: Final results (expand modules or conclude). Each checkpoint = clear decision criteria.'
            }
          ]
        }
      },
      {
        id: 'investment',
        type: 'solution',
        headline: 'Your Investment',
        content: 'Time: 4-6 hours per week from 1-2 agents. Data: Deal templates, prospect lists, compliance docs. Resources: Access to 5-10 prospects for validation.',
        deepDive: {
          title: 'What Athletes First Needs to Provide',
          description: 'Detailed breakdown of time, data, and resource requirements for pilot success.',
          sections: [
            {
              title: 'Time Commitment by Week',
              content: 'Week 1-2: 8-10 hours (kickoff, data collection, training). Week 3-6: 3-4 hours (feedback sessions, adjustments). Week 7-12: 2-3 hours (monitoring, optimization). Total: ~40-50 hours over 12 weeks from 1-2 designated agents.'
            },
            {
              title: 'Data Requirements',
              content: 'Video & Digital Twins: Athlete bios, sample content, brand partner list. NIL Guidance Platform: Deal templates (10-15 examples), compliance guidelines, rejected deal examples. Interactive Pitch: Contract templates, compensation models, FAQ from recent pitches.'
            },
            {
              title: 'Access Requirements',
              content: 'Access to 5-10 prospects for pilot testing (preferably mix of junior and senior athletes). Permission to observe 3-5 live agent-athlete interactions. Weekly 30-minute check-ins with designated A1 champion. Month-end stakeholder reviews (60 minutes).'
            },
            {
              title: 'Integration Requirements',
              content: 'Video & Digital Twins: None (standalone system). NIL Guidance Platform: Optional integration with CRM (Salesforce, HubSpot). Interactive Pitch: Contract data exports (PDF or structured data). No major IT lift required—designed for pilot simplicity.'
            }
          ]
        }
      },
      {
        id: 'next-steps',
        type: 'custom',
        headline: 'Next Steps',
        content: 'Step 1: Schedule 45-minute deep dive to choose modules → https://calendly.com/hanson-rationale/45\n\nStep 2: Review custom pilot plan + budget.\n\nStep 3: Sign pilot agreement. Start in 2 weeks.'
      }
    ]
  }
};

// Helper to get all active sections in order (ATHLETE LIFECYCLE ORDER)
export const ACTIVE_SECTIONS_V2 = [
  'opening',             // Opening: Welcome & Thank You
  'industryProblem',     // Section 1: The Problem
  'solutionOverview',    // Section 2: The Solution (modular approach)
  'nilPlatform',         // Section 3: Module 1 - NIL Guidance Platform (Amateur → Pro Transition)
  'interactivePitch',    // Section 3: Module 2 - Interactive Pitch (Recruitment & Closing)
  'videoDigitalTwins',   // Section 3: Module 3 - Video & Digital Twins (Content Creation)
  'amplifyAI',           // Section 3: Module 4 - AmplifyAI (Viral Distribution)
  'whyRationale',        // Section 4: Why Rationale (credibility)
  'pilotDetails'         // Section 5: Next Steps (pilot details)
];

// Helper to get section by ID
export function getSectionV2(id: string): Section | undefined {
  return AF_SECTIONS_V2[id];
}

// Helper to get all sections
export function getAllSectionsV2(): Section[] {
  return ACTIVE_SECTIONS_V2.map(id => AF_SECTIONS_V2[id]).filter(Boolean);
}
