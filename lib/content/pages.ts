/**
 * Pages Content Layer
 *
 * Centralized content for all public-facing pages.
 * Keeps copy separate from components for easier maintenance and updates.
 */

/**
 * Home Page Content
 */
export const homeContent = {
  hero: {
    title: "Rationale: Conviction-First Venture Studio",
    subtitle: "Two engines. One system. Systematic IP.",
    description: "We build conviction-backed IP through Rationale Kits (productized client engagements) and Portfolio IP (ventures we originate and own). Zero shows what we build when we believe—same speed, same rigor we bring to every partnership.",
    cta: {
      primary: { text: "Book a Partnership Call", href: "/contact" },
      secondary: { text: "See Zero: Our Proof", href: "/ventures/zero" }
    }
  },

  tagline: "Where preparation meets opportunity.",

  philosophy: {
    title: "How We Think",
    description: "Five principles that guide every product we touch.",
    pillars: [
      {
        title: "Clarity is the First Deployment",
        description: "Teams don't move fast because they lack resources: they move fast when they know what they're doing. Clarity turns uncertainty into direction, direction into prototypes, prototypes into conviction."
      },
      {
        title: "Systems Create Possibility",
        description: "Products are not collections of screens: they are systems of mental models, loops, tokens, patterns, and incentives. When the system is right, everything built on top becomes right."
      },
      {
        title: "Prototype Function Over Form",
        description: "Prototypes don't show what something looks like. They show what something works like. Working software is the most honest form of thinking."
      },
      {
        title: "Intelligence Over Intuition",
        description: "Intuition gets you to the starting line. Intelligence carries you across the finish line. Good design feels intuitive. Great design is the result of disciplined, structured intelligence."
      },
      {
        title: "Own the IP You Create",
        description: "The future belongs to studios that originate and own the IP they design. We build IP for others, build IP for ourselves, and participate in the upside."
      }
    ]
  },

  credentials: {
    title: "Shipped at Meta & FUBO",
    subtitle: "7 years at Meta, VP at FUBO—building products used by billions",
    companies: [
      { name: "FUBO", role: "VP of Design — Led product, growth, and AI features across all platforms (2024-2025)" },
      { name: "Meta", role: "7 Years · 3 Divisions — FAIR Embodied AI, Reality Labs (Orion Glasses, Quest MR), Messenger (F8 2018 presenter)" },
      { name: "Meta Reality Labs", role: "AR Shopping — Beat video ad ROI, drove 100%+ inventory growth for retailers" },
      { name: "Meta FAIR", role: "Embodied AI — Led 4+ teams on socially intelligent robots and behavioral models" }
    ],
    highlights: [
      {
        metric: "Beat video ROI",
        label: "Instagram AR Shopping",
        description: "AR commerce exceeded baseline video ads, 100%+ inventory growth"
      },
      {
        metric: "60% faster",
        label: "Prototype Velocity",
        description: "Pioneered mobile AR prototyping role, 60% speed increase"
      },
      {
        metric: "F8 2018",
        label: "Live Presenter",
        description: "Demoed flagship Messenger Camera features with Nike, Target, Sephora"
      },
      {
        metric: "1 Patent",
        label: "Innovation",
        description: "Interactive Avatars in Artificial Reality (USPTO 2021)"
      }
    ]
  },

  process: {
    title: "Our Process",
    subtitle: "Data-driven and iterative",
    description: "We cycle through these phases rapidly, learning from each iteration. Real user feedback and tested prototypes inform every decision. Strategy emerges from what we build and validate, not just what we document.",
    steps: [
      "Align",
      "Prototype",
      "Test",
      "Refine",
      "Systemize",
      "Define",
      "Support"
    ]
  }
};

/**
 * About Page Content
 */
export const aboutContent = {
  hero: {
    title: "",
    subtitle: "",
    description: "Rationale is a strategy-led product design studio founded on the belief that a focused effort applied correctly can drive outsized impact."
  },

  // The Whiteboard Moment - Origin Story
  originStory: {
    title: "The Whiteboard Moment",
    subtitle: "The Origin Story",
    content: [
      "When I worked at Meta, right after they acquired Oculus, I wanted to create a vision video for our augmented reality platform. I went to my skip manager (who would later form Reality Labs) to request budget approval.",
      "He stopped me and told me this story: Someone once came to his office asking for a few million dollars to finish a feature film about virtual reality. It was impressive, expensive, but the entire film only had about 10 minutes of actual in-headset product experience. You couldn't really understand what it did.",
      "He went to the whiteboard. On the left, he drew a lightbulb (an idea). On the right, a ship (a shipping product). He drew a line connecting them.",
      "He made a checkmark close to the lightbulb and said, \"This is where vision videos are.\" Then he walked to the right side and made a mark close to the ship: \"This is where you want to be. Get the work so close to shipping that all you need is engineering resources to make it real.\"",
      "Anything to the left of that mark doesn't get you much value.",
      "That conversation changed everything for me. It's why I founded Rationale: to help teams get to that critical point before committing resources."
    ]
  },

  // Core Principles
  principles: {
    title: "Core Principles",
    items: [
      {
        number: "01",
        title: "Usage is the oxygen for ideas",
        description: "Ideas suffocate in documents and Figma files. They need real users, real interactions, real feedback to survive. We build functional prototypes because anything less doesn't tell you what you need to know. Can people use it? Do they want to? Will they come back? You can't answer those questions with slides. You need usage."
      },
      {
        number: "02",
        title: "Get to conviction before you commit engineering",
        description: "Most teams start building with incomplete clarity. They think they'll \"figure it out\" during development. This is expensive and demoralizing. The goal isn't perfection: it's conviction. Conviction means you've validated the core idea, refined the UX, tested with users, and know what you're building and why. With conviction, engineering becomes execution, not exploration. That's when you move fast."
      },
      {
        number: "03",
        title: "Design value is upstream",
        description: "The biggest impact isn't making things pretty. It's clarifying what to build and why it matters before anyone writes production code. This requires systems thinking, strategic prototyping, and rapid iteration. It's part strategy, part design, part product, all focused on one thing: getting you to conviction. Upstream clarity compounds downstream. Bad decisions made early cost 10x later."
      }
    ]
  },

  // Philosophy Sections
  philosophy: {
    sections: [
      {
        title: "Usage is the oxygen for ideas",
        description: "Documents and vision videos rely on everyone seeing, thinking, and understanding the same thing without actually using it. Functional prototypes get everyone on the same page immediately. By building something real as soon as possible, you can make progress faster than endless decks ever could."
      },
      {
        title: "Focused effort drives impact",
        description: "Inspired by Buckminster Fuller's philosophy that one dedicated individual can create meaningful change, we apply that principle to focused teams. It's not about size: it's about concentration. A small, nimble studio with the right tools and dedication can bring clarity to complex problems faster than large teams."
      },
      {
        title: "Understand what not to do",
        description: "Charlie Munger said: \"All I want to know is where I'm going to die, so I'll never go there.\" We help teams look around corners and avoid pitfalls before they commit resources. Understanding what doesn't work is just as valuable as knowing what does."
      },
      {
        title: "Design value is upstream",
        description: "The real value of design today isn't in making things pretty: it's in clarifying the why and defining the what before anyone builds the how. We help teams get conviction fast so they can move forward confidently."
      }
    ]
  },

  // Inspiration / Quotes
  inspiration: [
    {
      author: "Buckminster Fuller",
      quote: "You never change things by fighting the existing reality. To change something, build a new model that makes the existing model obsolete.",
      interpretation: "Don't argue about whether something will work. Build it and show people. Functional prototypes are the ultimate argument."
    },
    {
      author: "Charlie Munger",
      quote: "It is remarkable how much long-term advantage people like us have gotten by trying to be consistently not stupid, instead of trying to be very intelligent.",
      interpretation: "Most product failures aren't from lack of ideas: they're from building the wrong thing. Avoid obvious mistakes by validating early and often."
    },
    {
      author: "Steve Jobs",
      quote: "You've got to start with the customer experience and work back toward the technology, not the other way around.",
      interpretation: "Start with usage. What will people actually do? How will it feel? Prototype that experience first, then figure out how to build it."
    }
  ],

  // Values and Antivalues
  values: {
    title: "Values & Antivalues",
    values: [
      "Functional prototypes over static mocks",
      "User testing over internal opinions",
      "Iteration speed over perfect first drafts",
      "Conviction over consensus",
      "Shipping over theorizing",
      "Clarity over complexity"
    ],
    antivalues: [
      "Long strategy decks that never get validated",
      "Pixel-perfect designs with no user feedback",
      "Building before we know what to build",
      "Consensus-driven mediocrity",
      "Analysis paralysis and endless research",
      "Features that solve problems nobody has"
    ],
    // Alternative format (from about page)
    valuesList: [
      { text: "Focused and strategic" },
      { text: "Fast and decisive" },
      { text: "Practical and actionable" },
      { text: "Transparent and direct" },
      { text: "Collaborative and adaptable" },
      { text: "Rigorous and validating" }
    ],
    antivaluesList: [
      { text: "Overly technical or academic" },
      { text: "Stuck in endless discovery" },
      { text: "Making decks instead of prototypes" },
      { text: "Imposing rigid processes" },
      { text: "Working in isolation" },
      { text: "Guessing without validation" }
    ]
  },

  // Founder Story
  founder: {
    name: "Matt Hanson",
    title: "Founder",
    role: "VP Product Design at FUBO | Founder, Rationale",

    bio: "Shipped 20+ products from 0→1 at Meta FAIR, Meta Reality Labs, FUBO, and venture-backed startups. Patent holder in AR/AI. Built products used by millions at scale. Now helping technical founders build conviction through working software before they burn runway.",

    personalStory: [
      "Twelve years ago, I went bankrupt. That experience taught me brutal lessons about focus, resource allocation, and understanding what not to do. Those lessons shaped how I approach product design today: with rigor, clarity, and an eye for what can go wrong before it does.",
      "I founded Rationale to help teams avoid the mistakes I've made, and to prove that a small, focused effort can create outsized impact when applied at the right moment."
    ],

    capabilities: [
      "Shipped 20+ products from 0→1 across AI, AR, and platform systems",
      "Patent holder: Interactive Avatars in Artificial Reality (USPTO, 2021)",
      "Built products used by millions at Meta FAIR & Reality Labs (10+ years)",
      "AI-integrated UX and agentic AI experiences (Zero, Athletes First, CREaiT)",
      "AR/MR platform design (Meta Spark AR, Orion Glasses prototype work)"
    ],

    trackRecord: [
      "20+ products shipped from 0→1",
      "10+ years at Meta building products used by millions",
      "Patent holder in AR/AI interaction systems",
      "Led teams at FUBO, Meta FAIR, Meta Reality Labs, Facebook Messenger, Framestore, VIACOM"
    ],

    patent: {
      title: "Interactive Avatars in Artificial Reality",
      description: "Patent for avatars which respond to contextual signals in the real world",
      url: "https://patents.google.com/patent/US11295503B1",
      year: "2021"
    }
  },

  operatingModel: {
    title: "Two Engines, One Studio",
    description: "Rationale operates through two complementary engines that fuel each other.",

    engines: [
      {
        title: "Rationale Products",
        subtitle: "Internal IP",
        description: "Originate and prototype our own products. Focus: AI, agentic UX, AR, multi-surface systems.",
        outcomes: "Spinouts, licensing, revenue-sharing, internal products"
      },
      {
        title: "Rationale Kits",
        subtitle: "Client Acceleration",
        description: "Packaged, time-boxed product definition work. Outputs: clarity, prototypes, PRDs, validation.",
        outcomes: "Revenue, deal-flow, real-world data"
      }
    ]
  }
};

/**
 * Services Page Content
 */
export const servicesContent = {
  hero: {
    title: "How We Partner",
    subtitle: "Fee-based sprints or equity partnerships",
    description: "We build alongside you through focused sprints that create conviction. Pay with fees, or when we believe in what you're building, we invest our expertise for equity. Either way, you get working demos that prove what's worth building. We work with 2-3 clients at a time to ensure deep, focused engagement."
  },

  guide: {
    title: "How to Choose",
    description: "Not sure which kit is right for you? Here's a quick guide.",

    sections: [
      {
        kitSlug: "clarity-kit",
        when: "You need fast conviction (1-2 weeks)",
        needs: ["Go/no-go decision", "Feature roadmap", "Strategic validation", "Investment pitch support"]
      },
      {
        kitSlug: "prototype-kit",
        when: "You need a working prototype (2-4 weeks)",
        needs: ["User testing & validation", "Technical architecture", "Engineering handoff", "Investor demo"]
      },
      {
        kitSlug: "product-definition-kit",
        when: "You need complete product specification (6-8 weeks)",
        needs: ["Full design system", "Engineering-ready PRDs", "MVP definition", "Technical architecture"]
      },
      {
        kitSlug: "validation-kit",
        when: "You need to test and validate (2-6 weeks)",
        needs: ["User testing", "Market signals", "Go/no-go recommendation", "Assumption validation"]
      },
      {
        kitSlug: "build-partner",
        when: "You need long-term collaboration",
        needs: ["Hands-on building", "Strategic + tactical support", "Aligned incentives", "Co-builder relationship"]
      }
    ]
  },

  comparison: {
    title: "Why Rationale?",
    subtitle: "We're builders, not advisors",
    categories: [
      {
        aspect: "What you get",
        rationale: "Working software & demos",
        agencies: "Designs & mockups",
        consultants: "Strategy decks"
      },
      {
        aspect: "Proof of execution",
        rationale: "3 ventures, 350KB+ docs, 1 mo from concept to plan",
        agencies: "Case studies",
        consultants: "White papers"
      },
      {
        aspect: "Alignment",
        rationale: "Fee + equity options (0.5-3% typical)",
        agencies: "Hourly rates",
        consultants: "Project fees"
      },
      {
        aspect: "Outcome",
        rationale: "Conviction to ship",
        agencies: "Pixel-perfect designs",
        consultants: "Recommendations"
      },
      {
        aspect: "Speed",
        rationale: "2-6 week sprints (like Zero: 1 month)",
        agencies: "3-6 month projects",
        consultants: "6-12 week studies"
      },
      {
        aspect: "Focus",
        rationale: "Build & validate",
        agencies: "Design & polish",
        consultants: "Analyze & advise"
      },
      {
        aspect: "Partnership",
        rationale: "Skin in the game (see our ventures)",
        agencies: "Service provider",
        consultants: "Advisor"
      }
    ]
  },

  cta: {
    title: "Ready to get started?",
    description: "Let's talk about how Rationale can help you build conviction before you ship.",
    buttonText: "Contact Us",
    buttonHref: "/contact"
  }
};

/**
 * Work Page Content
 */
export const workContent = {
  hero: {
    title: "Selected Work",
    subtitle: "Complex systems, multiple surfaces, emerging technology, high stakes.",
    description: "We've done this before. At Meta FAIR, Meta Reality Labs, FUBO, and now Rationale. We know how to navigate ambiguity, build conviction, and ship products that matter."
  },

  cta: {
    title: "Have a similar challenge?",
    description: "Let's talk about how Rationale can help bring your product vision to life.",
    buttonText: "Contact Us",
    buttonHref: "/contact"
  }
};

/**
 * Contact Page Content
 */
export const contactContent = {
  hero: {
    title: "Let's Talk",
    subtitle: "Have a product challenge? Need conviction fast?",
    description: "Tell us about your project and we'll get back to you within 24 hours."
  },

  form: {
    fields: [
      {
        name: "name",
        label: "Name",
        type: "text",
        required: true,
        placeholder: "Your name"
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        required: true,
        placeholder: "your@email.com"
      },
      {
        name: "company",
        label: "Company",
        type: "text",
        required: false,
        placeholder: "Your company (optional)"
      },
      {
        name: "projectType",
        label: "What are you interested in?",
        type: "select",
        required: true,
        options: [
          { value: "", label: "Select an option" },
          { value: "clarity-kit", label: "Clarity Kit (1-2 weeks)" },
          { value: "prototype-kit", label: "Prototype Kit (2-4 weeks)" },
          { value: "product-definition-kit", label: "Product Definition Kit (6-8 weeks)" },
          { value: "validation-kit", label: "Validation Kit (2-6 weeks)" },
          { value: "build-partner", label: "Build Partner (Ongoing)" },
          { value: "not-sure", label: "Not sure / Just exploring" }
        ]
      },
      {
        name: "message",
        label: "Tell us about your project",
        type: "textarea",
        required: true,
        placeholder: "What are you building? What challenge are you facing? What stage are you at?",
        rows: 6
      }
    ],
    submitText: "Send Message",
    successMessage: "Thanks! We'll get back to you within 24 hours.",
    errorMessage: "Something went wrong. Please try emailing us directly at hello@rationale.studio"
  },

  contact: {
    email: "hello@rationale.studio",
    social: [
      { platform: "LinkedIn", url: "https://linkedin.com/in/matthansonstudio" },
      { platform: "Twitter", url: "https://twitter.com/rationale_studio" }
    ]
  }
};

/**
 * Insights Page Content (placeholder for future blog)
 */
export const insightsContent = {
  hero: {
    title: "Insights",
    subtitle: "Thoughts on product development, AI, and building the future.",
    description: "Coming soon."
  }
};

/**
 * Global site content
 */
export const siteContent = {
  name: "Rationale",
  tagline: "Conviction first, IP always",
  description: "Conviction-first venture studio building IP through Rationale Kits (client engagements) and Portfolio IP (ventures we own). Systematic execution that compounds value.",
  url: "https://rationale.studio",

  navigation: {
    primary: [
      { label: "Home", href: "/" },
      { label: "Overview", href: "/overview" },
      {
        label: "Portfolio",
        href: "#",
        disabled: true,
        dropdown: [
          { label: "Coming Soon", href: "#", disabled: true },
          { label: "Projects", href: "/#portfolio", disabled: true }
        ]
      },
      { label: "About", href: "/about" },
      { label: "Clients", href: "/clients/login" },
      { label: "Contact", href: "/contact" }
    ]
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} Rationale Studio. All rights reserved.`,
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Zero", href: "/work/zero" },
      { label: "Compass", href: "/work/compass" }
    ],
    social: [
      { platform: "LinkedIn", url: "https://linkedin.com/in/matthansonstudio" },
      { platform: "Twitter", url: "https://twitter.com/rationale_studio" }
    ]
  }
};
