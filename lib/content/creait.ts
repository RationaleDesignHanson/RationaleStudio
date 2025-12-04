/**
 * CREaiT Content
 *
 * Content for CREaiT client portal based on product roadmap.
 */

export const creaitContent = {
  // Product Vision
  vision: {
    title: "CREaiT Product Vision",
    tagline: "Commercial Real Estate Intelligence Platform",
    description: "CREaiT is a commercial real estate intelligence platform designed to synthesize timing signals, relationship context, and property data to help brokers identify and execute high-probability outreach opportunities. The platform functions as a synthesis layer that sits atop existing CRM and data systems, providing daily clarity on what deserves attention and why.",
  },

  // Core Features
  features: [
    {
      title: "Daily Prioritization Dashboard",
      description: "Ranked opportunities based on timing signals including lease maturity, debt timing, ownership changes, and market activity.",
      status: "MVP Focus",
    },
    {
      title: "Contextual Insight Views",
      description: "Relationship and asset detail views consolidating fragmented information from multiple systems.",
      status: "MVP Focus",
    },
    {
      title: "AI-Assisted Outreach",
      description: "Draft guidance for outreach communications with full human editability and control.",
      status: "MVP Focus",
    },
    {
      title: "Review & Approval Workflow",
      description: "Lightweight oversight for senior team members to review communications before sending.",
      status: "MVP Focus",
    },
  ],

  // Jobs to Be Done
  jtbd: {
    primary: "When I start my workday as a CRE broker, I want to immediately understand which opportunities deserve my attention and why, so I can focus my limited time on the highest-probability outreach activities without manually gathering context from multiple systems.",
    supporting: [
      "When a timing signal indicates an opportunity window, I want to see consolidated relationship and property context in one place, so I can prepare informed, personalized outreach without switching between tools.",
      "When I prepare to contact a property owner, I want AI-assisted draft guidance based on market conditions and relationship history, so I can accelerate my outreach while maintaining quality.",
      "When I need senior oversight on my communications, I want a lightweight review workflow that preserves context and enables quick edits.",
      "When market conditions or property details change, I want to understand how this affects my outreach strategy.",
    ],
  },

  // Technical Architecture
  architecture: {
    title: "Technical Stack",
    description: "CREaiT is built as a synthesis layer integrating with existing core systems.",
    components: [
      {
        category: "Data Sources",
        items: ["MLS & Public Records", "Bloomberg & Financial Feeds", "CRM Integration", "Web Scraping (Social/News)"],
      },
      {
        category: "Storage",
        items: ["PostgreSQL + TimescaleDB", "MongoDB/Cassandra", "Snowflake Analytics", "Elasticsearch Search"],
      },
      {
        category: "Processing",
        items: ["Apache Airflow", "Spark (PySpark)", "dbt Transformations", "Great Expectations Validation"],
      },
      {
        category: "AI/ML Stack",
        items: ["OpenAI GPT-4", "LangChain", "scikit-learn", "XGBoost/LightGBM"],
      },
      {
        category: "Backend",
        items: ["FastAPI", "Python 3.11+", "Celery Task Queues"],
      },
      {
        category: "Frontend",
        items: ["React/Next.js", "Tailwind CSS", "Redux/Zustand State Management"],
      },
    ],
  },

  // Roadmap Phases
  roadmap: {
    title: "Implementation Roadmap",
    description: "16-week MVP timeline with post-launch iteration",
    phases: [
      {
        name: "Phase 1: Foundation & Alignment",
        weeks: "1-2",
        milestones: [
          "Technical Architecture Validation",
          "Data Pipeline Proof of Concept",
        ],
        status: "In Progress",
      },
      {
        name: "Phase 2: Core UX Design",
        weeks: "3-5",
        milestones: [
          "High-Fidelity Design System",
          "Interactive Prototype",
        ],
        status: "Upcoming",
      },
      {
        name: "Phase 3: MVP Feature Development",
        weeks: "6-12",
        milestones: [
          "Prioritization Engine & Dashboard",
          "Contextual Insight Views",
          "AI-Assisted Outreach",
          "Review & Oversight Workflow",
        ],
        status: "Upcoming",
      },
      {
        name: "Phase 4: MVP Refinement & Launch",
        weeks: "13-16",
        milestones: [
          "Integration Testing & Bug Fixes",
          "Documentation & Training",
          "MVP Launch",
        ],
        status: "Upcoming",
      },
      {
        name: "Phase 5: Post-MVP Iteration",
        weeks: "17-24",
        milestones: [
          "Usage Analytics & Feedback",
          "Refinement Sprint",
          "Three-Sided Platform Roadmap",
        ],
        status: "Future",
      },
    ],
  },

  // User Personas
  personas: [
    {
      name: "Commercial Real Estate Broker",
      role: "Primary User",
      description: "Managing high-volume, timing-dependent outreach across fragmented data landscape. Currently operates across multiple systems including CRM, email, spreadsheets, and market research tools.",
      painPoints: [
        "Spending significant time gathering context before each outreach",
        "Missing time-sensitive opportunities due to information overload",
        "Switching between multiple tools to piece together full picture",
      ],
    },
    {
      name: "Senior Team Member",
      role: "Secondary User",
      description: "Reviews and approves communications before they reach property owners, ensuring accuracy and strategic alignment.",
      painPoints: [
        "Becoming a bottleneck in the outreach process",
        "Lacking context when reviewing drafts",
        "Difficulty tracking quality over time",
      ],
    },
  ],

  // MVP Scope
  scope: {
    inScope: [
      "Daily prioritization dashboard with synthesized timing signals",
      "Contextual insight views for relationships and assets",
      "AI-assisted draft guidance (fully editable)",
      "Basic oversight and review workflow",
      "Integration with existing CRM",
      "Manual override capabilities for all suggestions",
    ],
    outOfScope: [
      "Full transactional workflows and deal management",
      "Automated outreach bypassing human validation",
      "Complex versioning and complete audit trails",
      "Buyer-side functionality (post-MVP)",
      "Advanced collaboration features",
      "Real-time streaming updates (batch processing for MVP)",
      "Mobile-optimized experiences (desktop-first MVP)",
    ],
  },

  // Key Principles
  principles: [
    {
      title: "Human-in-the-Loop Validation",
      description: "All automated outputs must allow explicit human validation before execution. No communications sent without user review.",
    },
    {
      title: "Transparent Data Quality",
      description: "Missing, conflicting, or incomplete data surfaced transparently rather than hidden or assumed.",
    },
    {
      title: "Workflow-Led Design",
      description: "Interface organized around broker workflows rather than feature lists or technical data structures.",
    },
    {
      title: "Synthesis Layer Philosophy",
      description: "Functions as synthesis layer atop existing systems rather than replacing them.",
    },
  ],
};

// Helper functions
export function getPhaseByWeek(week: number) {
  return creaitContent.roadmap.phases.find(phase => {
    const [start, end] = phase.weeks.split('-').map(w => parseInt(w));
    return week >= start && week <= end;
  });
}

export function getMVPFeatures() {
  return creaitContent.features.filter(f => f.status === "MVP Focus");
}
