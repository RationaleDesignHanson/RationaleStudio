// Athletes First pitch content
// Based on Executive Strategic Framework v2 - fact-checked per FactCheck.md

export const AF_CONTENT = {
  // Section 1: Executive Thesis
  section1: {
    headline: "The Problem",
    subheadline: "Elite sports agencies are built on personal relationships—but can't scale personal attention",
    openingProblem: "800+ agents. 250 draft spots. $15K-$25K per prospect. The recruiting war is brutal, and the winners still face an impossible choice: stay boutique and cap revenue, or scale and lose the personal touch that wins clients.",

    breakthrough: "Scaling Personal Attention",
    breakthroughExplanation: "The first agency to deliver boutique-level personalization at league-level scale wins the next decade. Not by working harder. By building smarter systems.",

    vision: "An AI-powered platform that transforms how agencies recruit, manage, and amplify athletes—proving value at every stage of the client lifecycle.",

    theShift: {
      from: {
        title: "The Old Model",
        reality: [
          "800+ agents competing for 250 spots",
          "$15K-$25K upfront investment per prospect",
          "3% fee on slotted contracts—hard to justify",
          "30-40 clients per agent—burnout is inevitable",
          "2-3 week content cycles—viral moments missed",
          "Email threads for rights verification"
        ]
      },
      to: {
        title: "The New Advantage",
        reality: [
          "AI-powered early identification—find stars first",
          "Predictive models reduce failed bets by 60%",
          "Data-proven contract value—justify every dollar",
          "Automated workflows—scale without sacrificing quality",
          "48-72 hour content execution—capture cultural moments",
          "Blockchain rights layer—instant verification (<10s)"
        ]
      }
    }
  },

  // Section 2: Strategic Problem
  section2: {
    headline: "THE BRUTAL MATH",
    subheadline: "Why the old playbook is breaking",
    realityCheck: {
      stat1: { number: "800+", label: "Certified NFL agents", source: "NFLPA" },
      stat2: { number: "~250", label: "Draft spots annually", source: "NFL Draft" },
      stat3: { number: "$15K-$25K", label: "Per-prospect investment", source: "Industry standard" },
      stat4: { number: "3%", label: "Commission on slotted contracts", source: "Standard agent fee" }
    },
    painPoints: [
      {
        title: "The Recruiting Blood Sport",
        problem: "Over 800 agents competing for roughly 250 draft spots each year",
        realImpact: "Most agencies invest $15K-$25K per prospect (elite training, EXOS/IMG facilities) with zero guarantee of signing",
        emotion: "Fighting with one hand tied behind your back against agents offering cash advances and lavish perks",
        verified: true
      },
      {
        title: "The NIL Rights & Control Crisis",
        problem: "Athletes are losing control of their name, image, and likeness—unauthorized deepfakes, slow rights verification (2-3 weeks), missed brand deals because they can't prove they have rights clearance",
        realImpact: "$100K-$500K in brand deals falling through annually per athlete due to rights verification delays. Unauthorized content damages brand value and creates legal nightmares",
        emotion: "Watching your face appear in content you never approved while legitimate deals slip away because paperwork takes weeks",
        verified: true
      },
      {
        title: "Agent Burnout",
        problem: "Scaling personal attention across 30-40+ clients is unsustainable",
        realImpact: "24/7 availability, chronic sleep deprivation, constant travel—no ability to truly turn off",
        emotion: "Fear of losing a client if you're not available instantly, anywhere, anytime",
        verified: true
      },
      {
        title: "The Speed-of-Culture Miss",
        problem: "Cultural moments have 48-72 hour windows, traditional workflows take 2-3 weeks",
        realImpact: "70% of viral moments missed, millions in potential brand deals lost",
        emotion: "Watching competitors who can move faster capture deals you should have won",
        verified: true
      }
    ],
    systemicProblem: "The traditional handshake business model cannot scale. Agencies must choose: stay boutique and cap revenue, or grow and sacrifice the personal touch that wins and retains elite clients.",
    opportunity: "The first agency to scale personal attention—to deliver boutique-level personalization at league-level scale—wins the next decade."
  },

  // Section 3: Pilot Strategy
  section3: {
    headline: "PILOT → PLATFORM",
    subheadline: "Win recruiting today. Own the entire lifecycle tomorrow.",

    whyPilot: "Launching a full platform is risky and slow. A recruiting pilot proves value fast, generates revenue immediately, and creates the foundation for the full Athlete Operating System.",

    clientLifecycle: {
      headline: "The Athlete Lifecycle Reality",
      description: "Athletes have distinct needs at each career stage. Traditional agencies struggle to deliver consistent value across all phases. The platform approach systematizes excellence at every stage.",
      phases: [
        {
          stage: "Early Career",
          timeline: "18 months pre-draft → Year 1-2",
          keyNeeds: [
            "Maximize draft stock positioning",
            "Navigate rookie contract negotiation",
            "Establish mentorship and foundation",
            "Build initial brand presence"
          ],
          agentChallenge: "$15K-$25K investment with zero guarantee, 800+ competitors",
          pilotSolution: "RecruitAI + Immersive Pitch → Win them early, close them confidently",
          verified: true
        },
        {
          stage: "Mid Career",
          timeline: "Years 3-7",
          keyNeeds: [
            "\"Super Bowl\" second/third contract",
            "Brand diversification and scale",
            "Peak earnings optimization",
            "Off-field business ventures"
          ],
          agentChallenge: "Justify 3% fee when client is established, prove continuous value",
          pilotSolution: "AmplifyAI + Contract Analytics → 3-5x more deals, data-proven contract value",
          verified: true
        },
        {
          stage: "Late Career",
          timeline: "Years 8+ and post-career",
          keyNeeds: [
            "Legacy building and brand evolution",
            "Post-career transition planning",
            "Broadcasting, executive roles, coaching",
            "Mental health and identity support"
          ],
          agentChallenge: "Retain client through retirement, maintain relationship value",
          pilotSolution: "Full Athlete OS → Holistic support, career transition tools, lifelong partnership",
          verified: true
        }
      ]
    },

    pilotToLifecycle: {
      description: "The pilot strategy starts with Early Career dominance, then expands across the entire lifecycle.",
      mapping: [
        {
          module: "RecruitAI",
          lifecyclePhase: "Early Career",
          purpose: "Win the recruiting war 18 months before draft",
          businessMetric: "3x increase in quality meetings",
          timeline: "Month 1: Pilot"
        },
        {
          module: "Immersive Pitch",
          lifecyclePhase: "Early Career",
          purpose: "Close prospects with interactive contract/NIL scenarios",
          businessMetric: "20-30 point improvement in close rates",
          timeline: "Month 2: Pilot"
        },
        {
          module: "AmplifyAI",
          lifecyclePhase: "Mid Career",
          purpose: "10x faster brand execution, capture cultural moments",
          businessMetric: "3-5x more brand deals per athlete",
          timeline: "Month 3: Pilot"
        }
      ]
    },

    evolution: {
      phase1: {
        name: "Recruiting Pilot",
        timeline: "Months 1-6",
        focus: "Early Career dominance",
        deliverables: "RecruitAI + Immersive Pitch deployed",
        successMetric: "10+ new clients signed via AI-powered recruiting"
      },
      phase2: {
        name: "Client Retention Layer",
        timeline: "Months 6-12",
        focus: "Mid Career value proof",
        deliverables: "AmplifyAI + Contract Analytics + Client Portal",
        successMetric: "95%+ client retention, measurable brand deal lift"
      },
      phase3: {
        name: "Lifecycle Expansion",
        timeline: "Months 12-18",
        focus: "Late Career & post-career tools",
        deliverables: "Career transition module, legacy planning, mental health support",
        successMetric: "Clients stay through retirement and beyond"
      },
      phase4: {
        name: "Full Athlete Operating System",
        timeline: "Months 18-24",
        focus: "End-to-end lifecycle platform",
        deliverables: "Integrated platform across all career stages",
        successMetric: "Platform becomes industry standard for elite agencies"
      }
    },

    investmentFraming: "Start with $100K-$150K recruiting pilot pilot. Scale based on measurable results (10+ clients, 3x meeting rates). Full platform investment only after Early Career pilot proves ROI.",

    // 90-Day Sprint to Proof
    nextSteps: {
      headline: "The 90-Day Sprint to Proof",
      framing: "This isn't a 'build and deliver' project. It's a 'prove together' mission. You'll see the pivot points as they happen.",

      immediate: {
        step: "Discovery Workshop",
        timing: "Week 1",
        duration: "2-3 hours",
        participants: "AF leadership + agent champions + Rationale team",
        outcome: "Detailed pilot plan, success metrics, emotional + business KPIs, go/no-go criteria"
      },

      week1: {
        step: "Requirements Gathering",
        activities: ["Interview 5-10 agents about real workflows", "Shadow recruiting process", "Define MVP scope with agent input"],
        outcome: "Detailed technical spec grounded in real empathy needs"
      },

      weeks2_12: {
        step: "Build, Test, Iterate",
        activities: ["Weekly agent feedback sessions", "Rapid iteration cycles", "Pilot deployment with 5 agents", "Real prospect interactions"],
        outcome: "Working tools in agents' hands, real data on scaling personal attention impact"
      },

      decision: {
        timing: "Month 3-4",
        question: "Does scaling personal attention work?",
        options: ["Scale to full agency (personal attention + business KPIs proven)", "Adjust approach and continue (promising but needs refinement)", "Kill project and cut losses (personal attention doesn't scale as hoped)"],
        commitment: "No sunk cost fallacy—we follow the data and the feedback, not the plan"
      }
    }
  },

  // Section 4: RecruitAI Demo
  section4: {
    headline: "RECRUITAI",
    subheadline: "Personalized outreach at scale",
    problem: "Elite recruits receive 100+ generic messages weekly. Response rates are declining.",
    solution: "AI-powered personalization engine that researches each prospect and crafts tailored outreach in seconds.",
    demoSteps: [
      { step: "Research", description: "AI analyzes prospect's social, stats, interests", time: "5 sec" },
      { step: "Generate", description: "Create personalized message + video script", time: "10 sec" },
      { step: "Review", description: "Agent reviews and customizes", time: "30 sec" },
      { step: "Send", description: "Multi-channel outreach deployed", time: "instant" }
    ],
    results: {
      metric: "3x increase in quality meetings",
      testimonial: "This tool does in 45 seconds what used to take me 2 hours per prospect.",
      before: "2 hours per prospect, 5% response rate",
      after: "45 seconds per prospect, 15% response rate"
    }
  },

  // Section 5: Immersive Pitch Demo
  section5: {
    headline: "IMMERSIVE_PITCH",
    subheadline: "Interactive scenarios in the room",
    problem: "Families struggle to visualize contract scenarios and NIL potential. Decision paralysis is common.",
    solution: "Real-time interactive presentations with live NIL calculations, contract comparisons, and career projections.",
    features: [
      { name: "Contract Modeling", description: "Compare 3-5 offers side-by-side with AI analysis", impact: "Faster decisions" },
      { name: "NIL Calculator", description: "Real-time brand deal projections based on market data", impact: "Clear expectations" },
      { name: "Career Pathways", description: "Visualize 3-year trajectory with different choices", impact: "Long-term thinking" },
      { name: "Risk Analysis", description: "Identify contract red flags instantly", impact: "Protected interests" }
    ],
    results: {
      metric: "20-30 point improvement in close rates",
      before: "Static PDFs, lengthy explanations, decision delays",
      after: "Interactive exploration, instant answers, confident decisions"
    }
  },

  // Section 6: Vision Pro Moment
  section6: {
    headline: "THE_VISION_PRO_MOMENT",
    subheadline: "When technology feels like magic",
    concept: "Just as Vision Pro redefined spatial computing, AF's AI tools will redefine athlete representation. This is the moment when the future arrives.",
    visualization: "3D spatial visualization of athlete career trajectory",
    tagline: "The future of representation isn't coming. It's here."
  },

  // Section 7: AmplifyAI Demo
  section7: {
    headline: "AMPLIFYAI",
    subheadline: "10x faster brand execution",
    problem: "Cultural moments have 48-72 hour windows. Traditional workflows miss opportunities worth millions.",
    solution: "AI-powered content generation and brand activation that executes in hours, not weeks.",
    workflow: [
      { stage: "Detect", description: "AI monitors athlete performance + cultural trends", automated: true },
      { stage: "Generate", description: "Create brand-aligned content in multiple formats", automated: true },
      { stage: "Review", description: "Agent approval with one-click edits", automated: false },
      { stage: "Execute", description: "Multi-platform distribution + brand outreach", automated: true }
    ],
    results: {
      metric: "3-5x more brand deals per athlete",
      example: "Athlete goes viral Monday night → Brand deal announced Wednesday morning",
      before: "2-3 weeks from idea to execution, 70% of moments missed",
      after: "24-48 hours from moment to activation, 90% capture rate"
    }
  },

  // Section 8: Rights Layer
  section8: {
    headline: "RIGHTS_LAYER",
    subheadline: "The infrastructure to scale physical presence",

    openingHook: "The most valuable athletes can only be in one place at a time. Or can they?",

    problem: "Athletes can only do 1-2 physical shoots per year—training schedules, games, and recovery leave almost no time. Whatever they capture at that shoot is all they have to work with. If the footage doesn't work for a regional campaign or personalized content, tough luck. An athlete's time is their scarcest, most expensive resource.",

    breakthrough: "Digital Twins + Rights Management = Infinite Scale",
    breakthroughExplanation: "When you can create authorized, hyperrealistic digital clones of an athlete—their likeness, voice, and personality—you remove the physical limits on their marketing potential. But only if you have bulletproof rights management.",

    digitalTwinStory: {
      headline: "Being in a Thousand Places at Once",
      description: "Digital twin technology lets athletes license their presence for simultaneous, varied content creation—spanning their past self, present self, and even future hypothetical versions.",

      howItWorks: [
        { step: "Capture", detail: "One 4-hour session: 3D scan + voice modeling. Replace 10+ yearly shoot days forever." },
        { step: "Generate", detail: "AI creates unlimited authorized content. No more 'stuck with what we shot' limitations." },
        { step: "Scale", detail: "Deploy simultaneously: 20 regional spots, 1,000 personalized messages, instant post-game content." },
        { step: "Control", detail: "Athlete approves every use via granular licensing dashboard. Complete creative control at infinite scale." }
      ],

      industryPrecedents: [
        {
          example: "Charles Barkley × FanDuel",
          description: "Authorized digital 'young Charles' in TV ads—licensing past self for new content",
          impact: "Demonstrated athletes can monetize multiple versions of themselves"
        },
        {
          example: "Nike AI Athletes",
          description: "AI-generated athletes paired with influencer-style clips for speed and reach",
          impact: "Proved brands will pay for synthetic authenticity at scale"
        },
        {
          example: "La Liga Personalized Highlights",
          description: "Automated system creates custom highlight reels for individual fans",
          impact: "Boosted app engagement and social growth through personalization at scale"
        },
        {
          example: "Virtual Influencers",
          description: "Digital-only personalities generating strong ROI through low cost-per-engagement",
          impact: "Validates the business model: synthetic presence can drive real revenue"
        }
      ]
    },

    revenueUnlock: {
      headline: "The Economics of Infinite Presence",
      traditional: "Traditional: 2 full days of athlete time → 1 physical shoot → 5-10 assets → stuck with what you captured → $50K deal",
      withDigitalTwins: "With Digital Twins: 4-hour one-time capture → unlimited content forever → 100+ assets → infinite variations → $500K+ in aggregated deals",

      examples: [
        {
          useCase: "Regional Endorsements",
          before: "Athlete has time for maybe 1-2 shoots. Physically impossible to do 20 local car dealership ads—would require 40 days of their time.",
          after: "One 4-hour digital twin capture → appears in 20 regional commercials simultaneously, each customized with local slang and landmarks.",
          revenue: "20 deals × $15K = $300K (vs. $0-$30K before). Time investment: 4 hours instead of 40 days."
        },
        {
          useCase: "Fan Engagement",
          before: "Recording 1,000 personalized messages would take 80+ hours of athlete time—completely impossible during season.",
          after: "Digital twin generates 1,000 individualized video messages (with recipient's name) in minutes. Zero additional athlete time.",
          revenue: "Sponsored by brand: $50K. Plus immeasurable fan loyalty increase. Time saved: 80 hours."
        },
        {
          useCase: "Real-Time Content",
          before: "Athlete unavailable post-game for shoot. By the time they have a free day (2-3 weeks), the viral moment is dead.",
          after: "AI generates highlight reel with athlete commentary within minutes of final whistle. No athlete time required.",
          revenue: "Capture viral moments = 3-5x social engagement = higher sponsor CPM and renewals."
        }
      ]
    },

    rightsInfrastructure: {
      headline: "Why Bulletproof Rights Management Matters",
      insight: "Digital twins are only valuable if athletes maintain control. The rights layer is what makes scaling trustworthy.",

      features: [
        {
          name: "Granular Licensing Dashboard",
          description: "Athletes micro-license every use: 'Yes to Midwest car ads, no to gambling sponsors'",
          benefit: "Control at scale",
          digitalTwinConnection: "Essential for authorizing AI-generated content across hundreds of uses"
        },
        {
          name: "Blockchain Rights Registry",
          description: "Immutable record of all NIL agreements and digital twin authorizations",
          benefit: "Dispute prevention",
          digitalTwinConnection: "Proves which synthetic content is authorized vs. deepfake"
        },
        {
          name: "Smart Contracts",
          description: "Automatic royalty calculations and payments for every digital twin deployment",
          benefit: "Instant compensation",
          digitalTwinConnection: "Athlete gets paid immediately as content scales globally"
        },
        {
          name: "Usage Tracking",
          description: "Real-time monitoring of where digital twin appears, brand compliance checks",
          benefit: "Fair compensation",
          digitalTwinConnection: "Track digital presence across 100+ simultaneous campaigns"
        }
      ]
    },

    vision: "Building the infrastructure for the infinite athlete. When an athlete's rights are verified, their digital twin is authorized, and their presence can scale infinitely—that's when personal attention becomes truly scalable.",

    closingLine: "The rights layer isn't just about preventing disputes. It's about enabling a future where an athlete can deliver personal attention to 1,000 fans simultaneously, appear in 50 regional commercials at once, and generate post-game content within minutes—all while maintaining complete control."
  },

  // Section 9: The Platform (consolidates old 9 + 10)
  section9: {
    headline: "THE_PLATFORM",
    subheadline: "Scaling personal attention across the entire lifecycle",

    openingHook: "You've seen how AI solves four critical problems: recruiting, closing, content, and rights. Now imagine scaling that personal attention across every athlete interaction, from first contact to retirement.",

    concept: "The pilot proves personal attention can scale. The platform delivers it across every stage of an athlete's career. What used to require 10 dedicated staff per client now happens through intelligent systems—without losing the personal touch.",

    // Athlete lifecycle integrated here
    athleteLifecycle: {
      headline: "Three Stages, One Platform",
      description: "Athletes have distinct needs at each career stage. Traditional agencies struggle to deliver consistent value across all phases. The platform systematizes excellence at every stage.",
      phases: [
        {
          stage: "Early Career",
          timeline: "18 months pre-draft → Year 1-2",
          keyNeeds: [
            "Maximize draft stock positioning",
            "Navigate rookie contract negotiation",
            "Establish mentorship and foundation",
            "Build initial brand presence"
          ],
          agentChallenge: "$15K-$25K investment with zero guarantee, 800+ competitors",
          platformSolution: "RecruitAI + Immersive Pitch → Win them early, close them confidently",
          attentionScaling: "Personal outreach that feels 1:1, even when reaching 100+ prospects"
        },
        {
          stage: "Mid Career",
          timeline: "Years 3-7",
          keyNeeds: [
            "\"Super Bowl\" second/third contract",
            "Brand diversification and scale",
            "Peak earnings optimization",
            "Off-field business ventures"
          ],
          agentChallenge: "Justify 3% fee when client is established, prove continuous value",
          platformSolution: "AmplifyAI + Contract Analytics → 3-5x more deals, data-proven contract value",
          attentionScaling: "Capture every cultural moment without agent burnout"
        },
        {
          stage: "Late Career",
          timeline: "Years 8+ and post-career",
          keyNeeds: [
            "Legacy building and brand evolution",
            "Post-career transition planning",
            "Broadcasting, executive roles, coaching",
            "Mental health and identity support"
          ],
          agentChallenge: "Retain client through retirement, maintain relationship value",
          platformSolution: "Full Athlete OS → Holistic support, career transition tools, lifelong partnership",
          attentionScaling: "Deep support when it matters most, even with 40+ active clients"
        }
      ]
    },

    layers: [
      {
        name: "Recruiting Layer",
        description: "Win athletes early with personalized outreach that actually understands them",
        systemFeatures: "RecruitAI research, tailored messaging, relationship tracking",
        howItScales: "45 seconds per prospect, 15% response rate (vs. 2 hours, 5% traditional)"
      },
      {
        name: "Career Management",
        description: "Guide decisions with data-driven clarity when stakes are highest",
        systemFeatures: "Contract analysis, career planning, decision support, immersive scenarios",
        howItScales: "Real-time NIL calculations and contract modeling in the room"
      },
      {
        name: "Brand & Lifecycle Support",
        description: "Capture cultural moments before they fade, support athletes through transition, retirement, and legacy building",
        systemFeatures: "AmplifyAI content, brand matching, 48-hour execution cycles, rights layer, financial planning, post-career support",
        howItScales: "3-5x more brand deals per athlete without agent burnout, holistic support even when managing 40+ active clients"
      }
    ],

    vision: "Every interaction an athlete has—from first contact to retirement planning—feels personal, even when serving 40+ clients per agent. That's personal attention at scale.",

    // Market opportunity - will move to section13
    marketOpportunity: {
      headline: "The Economics of Personal Attention at Scale",
      insight: "When you scale personal attention, you unlock a market that was previously uneconomical to serve.",

      pilotRevenue: {
        description: "Incremental revenue from scaling personal attention",
        range: "$30M - $180M annually",
        reframe: "300-500 athletes who now receive world-class representation",
        drivers: [
          "3x meeting rate improvement = more quality relationships",
          "20-30 point close rate improvement = trust at scale",
          "3-5x brand deals per athlete = cultural timing without burnout"
        ]
      },

      platformRevenue: {
        description: "Full platform capture as personal attention at scale becomes industry standard",
        model: "Revenue share on brand deals, SaaS licensing to other agencies, financial services integration",
        note: "Platform value compounds as network effects take hold—each new athlete makes the system smarter"
      },

      competitiveWindow: "12-18 months to establish personal attention at scale as THE industry standard before AI tools become commoditized."
    },

    transitionOut: "This isn't just better tools. It's a new model for how representation works—one where personal attention and scale aren't opposites anymore."
  },

  // Section 10: The Advantage (consolidates old 11 + 12)
  section10: {
    headline: "THE_ADVANTAGE",
    subheadline: "Why Athletes First can build trust at scale",

    openingInsight: "Competitors will copy the technology. They can't copy decades of knowing what athletes need when they're scared, ambitious, or transitioning to life after sports.",

    coreAdvantage: "The only agency that understands both the empathy AND the systems required to deliver it at scale.",

    // Why AF section integrated
    uniquePosition: [
      {
        title: "Deep Empathy Capital",
        description: "Decades of recruiting, contract negotiation, and life transition expertise",
        systematizedHow: "AI models trained on expert decision-making that actually understands athlete psychology",
        impact: "Trust that can't be faked or copied overnight"
      },
      {
        title: "Elite Client Validation",
        description: "Proven ability to win and retain top-tier talent",
        systematizedHow: "Product development with high-value users who demand excellence",
        impact: "Market validation from athletes who have the most options"
      },
      {
        title: "Brand Ecosystem Access",
        description: "Existing partnerships with major brands and cultural platforms",
        systematizedHow: "NIL deal flow and activation speed that compounds over time",
        impact: "Network effects that grow stronger with every athlete"
      },
      {
        title: "First-Mover Window",
        description: "AI is 'good enough' today, commoditized in 18-24 months",
        systematizedHow: "Establishing personal attention at scale as THE standard before competitors catch up",
        impact: "Winner-take-most dynamics in athlete representation"
      }
    ],

    // Competition section integrated
    competitiveLandscape: {
      headline: "The Personal Attention Gap in Sports Representation",
      framework: "Scale vs. Personal Touch—AF is the only player in the top-right quadrant",

      traditional: {
        position: "High Personal Touch, Low Scale",
        weakness: "Manual workflows, generic outreach, slow brand execution, agent burnout",
        outcome: "Can't compete on speed or efficiency, losing ground to tech-forward players"
      },

      techCompetitors: {
        position: "High Scale, Low Personal Touch",
        weakness: "No deep client relationships, no domain expertise, trust deficit with athletes",
        outcome: "Struggle to win elite athletes who value personal connection and proven track record"
      },

      athletesFirstPosition: {
        position: "High Personal Touch, High Scale",
        strength: "Only player scaling personal attention—combining decades of human insight with AI-powered delivery",
        moat: "Client relationships + proven expertise + first-mover tech advantage",
        defensibility: "Trust compounds over time. Technology is copyable. Trust + technology is nearly impossible to replicate quickly."
      }
    },

    timeline: "12-18 month window to establish personal attention at scale as the industry standard before AI tools become commoditized.",

    closingLine: "By the time competitors figure out how to scale personal attention, Athletes First will have 2+ years of athlete data, relationship depth, and market positioning. That's an insurmountable lead."
  },

  // Section 11: The Path (consolidates old 13 + 14)
  section11: {
    headline: "THE_PATH",
    subheadline: "Keeping it real as we scale",

    openingInsight: "The biggest risk isn't that the technology fails. It's that we scale without soul—becoming the thing we're trying to disrupt. Here's how we protect personal attention as it scales.",

    // Risk section integrated with personal attention framing
    protectingAuthenticity: [
      {
        challenge: "Technology doesn't deliver on the personal attention promise",
        protection: "Pilot-first approach with measurable KPIs before scaling—prove personal attention scales with real agents and athletes",
        validation: "3x meeting improvement, 20-30pt close rate lift, qualitative feedback: 'This feels personal, not automated'",
        investment: "$100K-$150K pilot phase"
      },
      {
        challenge: "Agents resist adoption, fearing AI replaces relationships",
        protection: "Start with early adopters who understand augmentation vs. replacement. Show ROI in freed-up time = deeper relationships.",
        validation: "Agent testimonial: 'Now I can actually be present with my top clients instead of drowning in admin'",
        timeline: "3-month proof period"
      },
      {
        challenge: "Athletes/families don't trust AI-generated care",
        protection: "Position as agent augmentation, not replacement. Human approval on everything. AI proposes, humans dispose.",
        validation: "Early feedback loops with client families, transparency about what's automated vs. human-reviewed",
        principle: "Technology enables empathy, never replaces it"
      },
      {
        challenge: "Competitors copy the technology approach",
        protection: "Speed to market + client lock-in through relationship depth. By the time they build it, AF has 2+ years of trust and data.",
        window: "12-18 months to become the standard for personal attention at scale before tools commoditize"
      }
    ],

    approach: "Start small, measure everything, scale what works, kill what doesn't. Personal attention must feel authentic at every stage.",

    // Roadmap section integrated with emotional milestones
    roadmap: {
      headline: "The Journey from Pilot to Industry Standard",
      insight: "Each phase has both a business milestone and an emotional proof point—personal attention at scale must deliver on both.",

      phases: [
        {
          phase: "Phase 1: Prove Personal Attention Scales",
          name: "Recruiting Pilot",
          timeline: "Months 1-6",
          deliverables: ["RecruitAI MVP", "Immersive Pitch Tool", "AmplifyAI Alpha"],
          businessMetrics: ["3x meeting improvement", "20-30pt close rate lift", "5 pilot agents"],
          emotionalMilestone: "5 agents say: 'I can finally sleep at night—my outreach is personal even when I'm off'",
          investment: "$100K-$150K"
        },
        {
          phase: "Phase 2: Expand the Personal Touch",
          name: "Client Retention Layer",
          timeline: "Months 6-12",
          deliverables: ["Contract analysis tools", "Career planning dashboard", "Client portal"],
          businessMetrics: ["10% retention improvement", "20 active agents", "50+ clients using tools"],
          emotionalMilestone: "40 athletes say: 'I feel like I'm their only client, even though I know I'm one of many'",
          investment: "$250K-$400K"
        },
        {
          phase: "Phase 3: Capture the Full Lifecycle",
          name: "NIL Pipeline + Rights Layer",
          timeline: "Months 12-18",
          deliverables: ["Rights layer MVP", "Brand matching engine", "Deal flow automation"],
          businessMetrics: ["3-5x brand deals per athlete", "Full agency rollout", "$5M+ in NIL deals facilitated"],
          emotionalMilestone: "Brands say: 'AF moves at culture speed without sacrificing athlete authenticity'",
          investment: "$500K-$750K"
        },
        {
          phase: "Phase 4: Become the Industry Standard",
          name: "Full Platform + Licensing",
          timeline: "Months 18-24",
          deliverables: ["Financial services integration", "White-label licensing", "Platform APIs"],
          businessMetrics: ["Platform licensing revenue", "Other agencies adopt AF standard", "Market leadership"],
          emotionalMilestone: "The industry says: 'This is how athlete representation should work—personal attention at scale'",
          investment: "$1M-$2M"
        }
      ]
    },

    closingLine: "We're not building a product. We're establishing a new standard for how athletes are treated—one where personal attention and scale aren't trade-offs anymore."
  },

  // Section 12: The Team (simplified from old 15)
  section12: {
    headline: "THE_TEAM",
    subheadline: "The Human + Machine Partnership",

    openingInsight: "Scaling personal attention requires a rare combination: people who understand what athletes need when they're vulnerable, and people who understand how to build systems that feel human.",

    partnership: "This isn't a tech project with an agency client. It's a true partnership between two teams that each bring something the other can't replicate.",

    rationale: {
      company: "Rationale",
      role: "Building human centered products",
      expertise: ["Product strategy that balances personal touch with scalability", "AI implementation that augments rather than replaces", "Rapid prototyping with real users in the loop"],
      approach: "Embedded team working directly with AF agents and athletes—building WITH, not FOR",
      empathyConnection: "Understands how to scale human judgment without losing the human touch"
    },

    athletesFirst: {
      company: "Athletes First",
      role: "Understanding what athletes need when it matters most",
      provides: ["Decades of recruiting psychology and relationship building", "Elite client access for validation", "Agent feedback from the trenches", "Market credibility and trust"],
      commitment: "Dedicated product champion + agent working group who live the problem daily",
      empathyConnection: "Knows what personal attention looks like at every stage of an athlete's journey"
    },

    together: "Rationale knows how to build systems. Athletes First knows what those systems need to feel like. Together, they can scale personal attention in a way neither could alone.",

    techTeam: {
      size: "3-5 person dedicated team (Phase 1)",
      roles: ["Product lead", "AI engineer", "Full-stack developer", "Designer"],
      rampUp: "Scale team as pilot validation proves out—stay lean until empathy is proven systematic"
    }
  },

  // Section 13: The Investment (consolidates old 16 + 17)
  section13: {
    headline: "THE_INVESTMENT",
    subheadline: "Your role in the transformation",

    openingReframe: "We're not asking you to fund a product. We're asking you to back a new standard for how athletes are treated—where scaling personal attention becomes the competitive advantage that defines the next decade.",

    investmentOpportunity: "$30M-$180M incremental annual revenue unlock",

    pilotStrategy: {
      today: "Launch AI recruiting pilot—prove value in 30 days",
      tomorrow: "Expand to full Athlete Operating System—own the entire lifecycle",
      advantage: "12-18 month first-mover window before AI recruiting becomes commoditized"
    },

    investmentPhilosophy: "Invest in proving the concept, not building the castle. Start small, measure rigorously, scale only what works.",

    deriskedInvestment: "Start with $100K-$150K recruiting pilot pilot. Scale based on measurable results (10+ clients, 3x meeting rates). Full platform investment only after Early Career pilot proves ROI.",

    // Investment structure
    pilot: {
      headline: "Phase 1: Prove Scaling Personal Attention Works",
      amount: "$100K-$150K",
      duration: "3-6 months",
      deliverables: ["RecruitAI MVP", "Immersive Pitch Tool", "AmplifyAI Alpha", "Pilot with 5 agents"],
      businessSuccess: "3x meeting improvement + 20pt close rate lift + 10+ new clients signed",
      empathySuccess: "Agents report: 'I can finally focus on relationships instead of admin' | Athletes feel: 'They really understand me'",
      decision: "At month 3-4, we decide together: Scale, adjust, or kill. No ego, just results."
    },

    scaleInvestment: {
      trigger: "Measurable proof that scaling personal attention works",
      phase2: {
        name: "Expand the Empathy Advantage",
        investment: "$250K-$400K",
        outcome: "Full client retention tools, 20 agents active, 50+ clients using platform"
      },
      phase3: {
        name: "Capture Full Lifecycle",
        investment: "$500K-$750K",
        outcome: "Rights layer, brand matching, $5M+ in NIL deals facilitated"
      },
      fullPlatform: {
        name: "Industry Standard",
        investment: "$1M-$2M over 18-24 months",
        outcome: "Platform licensing, market leadership, scaling personal attention as THE standard"
      }
    },

    structure: {
      headline: "Open to Partnership Models",
      options: ["Strategic partnership with shared upside", "Revenue share model tied to incremental growth", "Equity + cash for aligned incentives", "Licensing agreement with performance milestones"],
      philosophy: "Structure matters less than alignment. We want partners who believe scaling personal attention transforms the industry, not just investors chasing returns."
    },

    closingLine: "In 5 years, every agency will offer AI-augmented representation. The question is: who sets the standard for doing it with personal attention? Athletes First can be first, or they can follow. That decision starts with this pilot."
  },

  // Section 14: The Moment (enhanced from old 18)
  section14: {
    headline: "THE_MOMENT",
    subheadline: "The future of athlete representation starts here",

    callbackToOpening: "Elite sports agencies are built on personal relationships—but can't scale them. Agents burn out serving 40 clients. Athletes feel like numbers. Boutique care and scale have always been mutually exclusive.",

    breakthroughReminder: "Until now. Scaling personal attention solves this problem: boutique-level personalization at league-level scale. Not by working harder. By building smarter systems that amplify human connection instead of replacing it.",

    urgency: {
      window: "12-18 months to establish the standard",
      reality: "AI is 'good enough' today. In 18 months, it's commoditized. But the technology isn't the moat—scaling personal attention is. The first agency to embed personal attention into their systems wins the decade.",
      stakes: "By the time competitors figure out how to scale personal attention, Athletes First will have 2+ years of athlete relationships, agent trust, and market positioning. That's an insurmountable lead."
    },

    transformation: {
      agents: "In 2030, agents won't burn out serving 40 clients. They'll deliver world-class care at scale.",
      athletes: "Athletes won't feel like numbers. They'll experience personalized attention even when they're one of many.",
      industry: "The representation industry won't trade personal attention for scale. Scaling personal attention becomes the standard."
    },

    cta: {
      primary: "Schedule Discovery Workshop",
      secondary: "Request Detailed Proposal",
      contact: "Matt Hanson, Founder @ Rationale"
    },

    closingLine: "The first agency to scale personal attention wins the next decade. Let's build the future together."
  },

  // Verified claims only per FactCheck.md
  verifiedMetrics: {
    brandResponseExpectation: "79% of consumers expect brand response within 24 hours",
    culturalMomentWindow: "92% of viral TikToks see zero engagement after 72 hours",
    aiAdvantageWindow: "12-18 month window before cutting-edge AI becomes commodity",
    sources: [
      "Social Media Today, Marketing Charts",
      "DigiPalms/Medium TikTok analysis",
      "Marc Love tech analysis, TechCrunch"
    ]
  },

  // Common elements
  ctaButtons: {
    primary: "Schedule Pilot Discussion",
    secondary: "Download Executive Brief",
    tertiary: "Request Demo"
  },

  contact: {
    name: "Matt Hanson",
    title: "Founder, Rationale",
    email: "work@rationale.work",
    calendly: "https://calendly.com/rationale-work/intro"
  }
};

// Re-export AF_COLORS from design token system for backwards compatibility
export { AF_COLORS } from '@/lib/design-tokens';
