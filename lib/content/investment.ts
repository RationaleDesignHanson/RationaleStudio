/**
 * Investment Content Layer
 *
 * All investment-related content for the investor portal
 * Updated December 2024 with current metrics
 */

export const investmentContent = {
  overview: {
    hero: {
      title: "Investment Opportunities",
      subtitle: "Two ways to participate: Zero direct equity or Studio portfolio exposure",
      description: "We're raising capital to accelerate systematic portfolio building. Path 1: Invest directly in Zero ($600K for 10% equity) for concentrated exposure to our AI email platform launching Q1 2025. Path 2: Invest in Rationale studio for diversified exposure across Zero, Atlas, Amplify, and future ventures—partners help decide which bets we make together."
    },

    model: {
      title: "The Dual-Engine Model",
      subtitle: "$900K run rate + 90% margin = Self-Funded Portfolio Growth",
      description: "Rationale Kits generate ~$900K annual revenue at 90%+ margins, providing $500K+ per year for systematic venture building. This enables 2-3 new ventures annually without dilution pressure.",
      metrics: [
        { label: "Annual Revenue", value: "$900K", subtext: "From client services" },
        { label: "Margin", value: "90%", subtext: "Lean operating model" },
        { label: "Venture Capital", value: "$500K+", subtext: "Available annually" },
        { label: "Launch Rate", value: "2-3/year", subtext: "Systematic execution" }
      ]
    },

    aiAcceleration: {
      title: "AI-Enabled Velocity",
      subtitle: "What took teams months now takes weeks",
      points: [
        "Zero: Complete iOS app + 10 microservices in 3 months",
        "Atlas: Complete 103KB roadmap in 3 weeks",
        "Amplify: 129KB blueprint + $60-250K budget in 2 weeks",
        "This speed compounds: 10 ventures over 5 years is achievable"
      ]
    },

    portfolioStructure: {
      title: "Portfolio Structure",
      subtitle: "Clear ownership through holding company",
      description: "Rationale owns majority stakes in each portfolio company. Studio investors get Rationale equity for diversified exposure. Zero investors get direct Zero equity for concentrated exposure.",
      diagram: {
        holdingCompany: {
          name: "Rationale Inc.",
          type: "Holding Company",
          owner: "Matt Hanson (Founder)",
          role: "Owns & operates portfolio companies"
        },
        portfolioCompanies: [
          {
            name: "Zero",
            status: "Q1 2025 LAUNCH",
            ownership: "80% owned by Rationale",
            stage: "Seed Round Open ($600K for 10%)",
            investors: "Founder + Seed investors"
          },
          {
            name: "Atlas",
            status: "Q2 2025",
            ownership: "80-90% owned by Rationale",
            stage: "Blueprint complete",
            investors: "Rationale-funded"
          },
          {
            name: "Amplify",
            status: "Q2 2025",
            ownership: "80-90% owned by Rationale",
            stage: "Blueprint complete",
            investors: "Rationale-funded"
          },
          {
            name: "Future Ventures",
            status: "2025-2030",
            ownership: "50-90% owned by Rationale",
            stage: "Portfolio plan: 10 ventures over 5 years",
            investors: "Mix of Rationale + strategic partners"
          }
        ]
      }
    }
  },

  tiers: [
    {
      id: "zero-seed",
      title: "Zero Seed Round",
      tagline: "$600K for 10% equity",
      status: "OPEN NOW",
      highlight: "Highest Return Concentration",
      description: "Direct investment in Zero Inbox, our AI email triage platform launching Q1 2025 with production-ready infrastructure and sophisticated architecture.",

      keyMetrics: [
        { label: "Status", value: "Pre-Launch", trend: "Beta Q1 2025" },
        { label: "Architecture", value: "268 Swift files", subtext: "iOS app complete" },
        { label: "Backend", value: "10 microservices", subtext: "Production-ready" },
        { label: "Market", value: "$28B+ TAM", subtext: "Email productivity" }
      ],

      investment: {
        amount: "$600,000",
        equity: "10%",
        valuation: "$6M post-money",
        use: "18-month runway to $50K MRR"
      },

      urgency: {
        title: "Round Status",
        committed: "$150,000",
        target: "$600,000",
        remaining: "$450,000",
        note: "Rolling close structure—lock in your allocation now. First close at $300K committed."
      },

      why: [
        "Production-ready app with sophisticated AI classification (91.7% accuracy)",
        "Clear path to profitability ($50K MRR target)",
        "Solo founder = no partner dilution",
        "Total control over execution and exits",
        "Potential liquidity within 24-36 months"
      ],

      cta: {
        primary: "View Zero Investment Case",
        href: "/investors/zero"
      }
    },

    {
      id: "studio-investment",
      title: "Studio Investment",
      tagline: "Equity in Rationale + Portfolio Exposure",
      status: "OPEN — FLEXIBLE ENTRY POINTS",
      highlight: "Partners Help Decide Which Bets We Make",
      description: "Invest in Rationale (the holding company) for equity exposure across the entire portfolio: Zero, Atlas, Amplify, and future ventures. Studio partners participate in decision-making on which bets to pursue and bring strategic value through domain expertise, distribution, or operational support.",

      entryPoints: {
        title: "Three Ways to Participate in Studio",
        description: "We're flexible on how partners engage with the studio:",
        options: [
          {
            type: "Strategic Partner (Preferred)",
            description: "Capital + domain expertise + distribution. You help us decide which ventures to build and bring GTM acceleration.",
            ideal: "Operators with sector expertise (CRE, sports tech, B2B SaaS), strategic acquirers, platform companies",
            involvement: "Active: help shape roadmap, introduce customers, advise on GTM",
            equity: "Negotiable based on strategic value beyond capital"
          },
          {
            type: "Capital Partner",
            description: "Pure capital investment in Rationale for diversified portfolio exposure without hands-on involvement.",
            ideal: "Investors seeking systematic venture building exposure, family offices, angels",
            involvement: "Passive: quarterly updates, portfolio visibility",
            equity: "Standard terms based on capital committed"
          },
          {
            type: "Future Fund (Late 2025/2026)",
            description: "Wait for formal studio fundraise after we prove repeatability (Zero $50K MRR + Atlas/Amplify launches).",
            ideal: "VCs and institutional investors who want proof of systematic model before investing",
            involvement: "Passive: fund structure with portfolio-wide exposure",
            equity: "Fund economics (carry structure, management fee)"
          }
        ]
      },

      governance: {
        title: "How Studio Partnership Works",
        subtitle: "Concrete decision-making process",
        description: "Studio partners participate in quarterly votes on venture roadmap and resource allocation. Strategic partners get advisory board seats with input on sector selection and GTM strategy.",
        process: [
          {
            phase: "Quarterly Venture Review",
            description: "Every quarter, Matt presents 3-5 venture concepts with detailed briefs (market, TAM, differentiation, budget, timeline).",
            timeline: "Q1: Jan, Q2: Apr, Q3: Jul, Q4: Oct"
          },
          {
            phase: "Partner Input Period",
            description: "Strategic partners have 2 weeks to provide feedback, ask questions, and vote on which concepts to prioritize. Input weighted by equity stake and strategic value.",
            timeline: "2-week feedback window"
          },
          {
            phase: "Final Decision & Allocation",
            description: "Matt makes final call on which ventures to build, incorporating partner feedback. Capital allocated from studio reserves ($500K+ annual budget from Kits revenue).",
            timeline: "Announced end of each quarter"
          },
          {
            phase: "Build & Launch",
            description: "Ventures are built using studio resources. Strategic partners can opt in for deeper involvement (pilot customers, GTM feedback, industry intros).",
            timeline: "2-6 month builds"
          }
        ],
        rights: {
          title: "Strategic Partner Rights",
          items: [
            "Quarterly vote on venture roadmap (weighted by equity + strategic value)",
            "Access to detailed venture briefs before launch decisions",
            "Optional advisory board seat (for $250K+ strategic partners)",
            "Right of first refusal on leading rounds in portfolio companies",
            "Quarterly financials & metrics dashboard access"
          ]
        },
        example: {
          title: "Example: Q1 2025 Venture Vote",
          scenario: "Matt presents 4 concepts: (1) B2B Compliance SaaS, (2) Consumer Health App, (3) Real Estate PropTech, (4) AI Code Review Tool. Strategic partner in CRE sector votes to prioritize #3, provides customer intros. Matt incorporates feedback, builds #3 as Q1 venture with partner's pilot commitment."
        }
      },

      portfolio: {
        title: "Current Portfolio Companies",
        description: "Studio owns equity in these ventures:",
        ventures: [
          {
            name: "Zero Inbox",
            stage: "Pre-Launch",
            status: "Beta Q1 2025, 268 Swift files + 10 microservices ready",
            market: "AI email triage & productivity",
            ownership: "Rationale owns majority equity"
          },
          {
            name: "Atlas CRM",
            stage: "Blueprint Complete",
            status: "103KB docs, $165K budget, Q2 2025 target",
            market: "B2B CRE intelligence platform",
            ownership: "Will be owned by Rationale upon build"
          },
          {
            name: "Amplify Athletes",
            stage: "Blueprint Complete",
            status: "129KB docs, $60-250K tiered, Q2 2025 pilot",
            market: "NIL marketplace & athlete tools",
            ownership: "Will be owned by Rationale upon build"
          }
        ]
      },

      vision: {
        title: "Portfolio Expansion Roadmap",
        description: "Our systematic model enables 2-3 ventures per year:",
        timeline: [
          { year: "2024-2025", ventures: "Zero (launching), Atlas, Amplify", count: 3 },
          { year: "2026", ventures: "+2 new ventures", count: 5 },
          { year: "2027", ventures: "+2 new ventures", count: 7 },
          { year: "2028", ventures: "+2 new ventures", count: 9 },
          { year: "2029", ventures: "+1 new venture", count: 10 }
        ],
        sectors: "SaaS, AI/ML, B2B Tools, Consumer Apps, Vertical Software—partners help choose focus areas"
      },

      structure: {
        title: "Studio Economics",
        model: [
          "Rationale is the holding company that owns equity in all portfolio ventures",
          "Kits generate $900K+ annually at 90% margin (funds operations + ventures)",
          "Studio invests $200-300K per venture (capital efficient)",
          "Retain majority equity in each venture (50-80% typical)",
          "Portfolio compounds: 10 ventures × $5-50M exits = $50-500M portfolio value"
        ]
      },

      cta: {
        primary: "Discuss Studio Partnership",
        href: "/investors/studio"
      }
    }
  ],

  // Four detailed opportunities (alternative view)
  opportunities: [
    {
      id: "studio",
      title: 'Rationale Studio',
      subtitle: '$500K SAFE · 18-24 Month Runway',
      description: 'Back the systematic venture creation engine. Dual-engine model: Rationale Kits (80% revenue) + Portfolio IP (appreciation over time). Lowest risk, diversified across sectors.',
      highlights: [
        'Founder: Ex-Meta Reality Labs (7 years), FUBO VP',
        'Model: Kits fund Portfolio exploration',
        'Outcome: 2-3 ventures/year, 1-2 commercialized in 12-18 months',
      ],
      href: '/investors/studio',
      badge: 'Lowest Risk',
      badgeColor: 'green',
      icon: '🏢',
    },
    {
      id: "zero",
      title: 'Zero',
      subtitle: '$600K Seed Round · Pre-Launch Product',
      description: 'AI email intelligence for busy parents. Beta launching Q1 2025. Production-ready infrastructure with structured traction milestones.',
      highlights: [
        'Status: 268 Swift files, 10 microservices ready',
        'Market: $28B+ productivity software TAM',
        'Architecture: 91.7% AI classification accuracy',
        'Economics: 6:1 LTV:CAC ratio target',
      ],
      href: '/investors/zero',
      badge: 'Pre-Launch',
      badgeColor: 'blue',
      icon: '📧',
    },
    {
      id: "atlas",
      title: 'Project Atlas',
      subtitle: 'Partnership + Capital Opportunity',
      description: 'CRE intelligence platform with complete 12-week roadmap. Seeking strategic partner with industry distribution + execution capital.',
      highlights: [
        'Documentation: 103KB complete technical architecture',
        'Market: Commercial real estate brokerages',
        'Budget: $165K recommended for full MVP',
        'Timeline: 12 weeks to production-ready',
      ],
      href: '/investors/atlas',
      badge: 'Pre-Build',
      badgeColor: 'yellow',
      icon: '🏢',
    },
    {
      id: "amplify",
      title: 'Project Amplify',
      subtitle: 'Partnership + Capital Opportunity',
      description: 'NIL + recruiting platform for sports agents. Complete 16-week roadmap with 4 integrated modules. Seeking agency partner network + capital.',
      highlights: [
        'Documentation: 129KB complete blueprint',
        'Market: Sports agencies, athlete management',
        'Budget: $60-80K pilot, $200-250K full platform',
        'Timeline: 16 weeks to MVP',
      ],
      href: '/investors/amplify',
      badge: 'Pre-Build',
      badgeColor: 'yellow',
      icon: '🏈',
    },
  ],

  comparison: {
    title: "Investment Path Comparison",
    description: "Two clear paths with different risk/return profiles:",
    options: [
      {
        name: "Zero Direct Equity",
        investment: "$600K for 10% equity in Zero",
        risk: "Single product (concentrated)",
        return: "Highest upside concentration",
        timeline: "24-36 months to liquidity",
        involvement: "Passive (optional advisory)",
        best: "Investors seeking near-term liquidity in production-ready product with clear path to market"
      },
      {
        name: "Studio Investment (Rationale Equity)",
        investment: "Flexible ($100K-$1M+, negotiable)",
        risk: "Diversified across portfolio (3 now, 10 over 5 years)",
        return: "Portfolio appreciation + decision rights",
        timeline: "5-7 years portfolio building",
        involvement: "Flexible: Strategic (active) or Capital (passive)",
        best: "Partners who bring strategic value, want portfolio exposure, help decide which bets to make"
      }
    ]
  },

  faq: [
    {
      question: "Why should I invest in Zero vs. the studio (Rationale)?",
      answer: "Zero offers concentrated exposure to a production-ready AI platform launching Q1 2025 with clear near-term liquidity potential (24-36 months). Studio investment (Rationale equity) offers diversified exposure across the entire portfolio: Zero, Atlas, Amplify, and future ventures—plus you help decide which bets we make together."
    },
    {
      question: "What is Rationale and how does it relate to the ventures?",
      answer: "Rationale is the holding company (the studio) that owns equity in all portfolio ventures: Zero, Atlas, Amplify, and future companies. When you invest in the studio, you're buying Rationale equity, which gives you exposure to the entire portfolio. When you invest in Zero directly, you own Zero equity specifically."
    },
    {
      question: "Can I invest in Atlas or Amplify directly, not through the studio?",
      answer: "Atlas and Amplify are built and owned by Rationale (the studio). You invest in the studio to get exposure to them. If you bring exceptional strategic value (CRE relationships for Atlas, NIL expertise for Amplify), we may negotiate direct equity or preferential studio terms based on your strategic contribution beyond capital."
    },
    {
      question: "What makes this different from other venture studios?",
      answer: "Three things: (1) We're self-funded through client services ($900K run rate), removing dilution pressure. (2) AI acceleration enables 2-3 ventures per year instead of 1 every 2 years. (3) Solo founder model means no partner conflicts and total execution control. (4) Studio partners actively help decide which bets to pursue—not passive LPs."
    },
    {
      question: "How do you build so capital-efficiently?",
      answer: "AI tooling + 7 years at Meta + solo founder model. Zero production infrastructure took 3 months (268 Swift files, 10 microservices). Atlas roadmap took 3 weeks (103KB docs). Amplify blueprint took 2 weeks (129KB docs). We leverage AI for architecture, code generation, and planning, then add Meta-grade execution discipline for production quality."
    },
    {
      question: "What's the exit strategy?",
      answer: "For Zero: Target $50K MRR ($600K ARR) in 18 months, then either (1) strategic acquisition by email/productivity companies or (2) continue growing to profitability. For portfolio ventures: Mix of strategic acquisitions, revenue-based exits, and long-term holds. Studio model isn't built for quick flips—we build businesses that compound and appreciate."
    },
    {
      question: "Are both Zero and Studio raising simultaneously?",
      answer: "Yes. Priority is to secure BOTH: (1) $600K for Zero to fund 18-month runway to $50K MRR, and (2) studio partners to secure operating budget, hire engineers, and fund Atlas/Amplify builds. We're flexible on studio terms based on strategic value partners bring."
    }
  ]
};
