/**
 * CREaiT MVP Documentation Content
 *
 * Comprehensive content structure for the CREaiT documentation portal.
 * Transforms 5 markdown documents into structured, queryable data.
 *
 * Source documents:
 * - MVP_User_Stories_And_Workflows.md
 * - Technical_Specifications_MVP.md
 * - Data_Requirements_And_Sources.md
 * - Week_By_Week_Execution_Checklist.md
 * - CEO_Checkpoint_Review_Template.md
 */

// ============================================================================
// PROJECT OVERVIEW
// ============================================================================

export const projectOverview = {
  name: "CREaiT",
  tagline: "AI-Powered Intelligence Platform for Commercial Real Estate",
  vision: "Synthesize timing signals, relationship context, and property data to help brokers identify and execute high-probability outreach opportunities.",

  timeline: {
    duration: "12 weeks",
    startDate: "2025-11-25",
    targetLaunch: "2026-02-17",
    phases: 4,
  },

  budget: {
    development: {
      min: 90000,
      max: 240000,
      breakdown: "1200-1600 contractor hours @ $75-150/hr",
    },
    infrastructure: {
      monthly: "100-250",
      description: "AWS/GCP hosting, databases, caching",
    },
    dataServices: {
      monthly: "50-200",
      description: "OpenAI API, potential data providers",
    },
    total: {
      min: 92000,
      max: 247000,
    },
    recommended: {
      min: 165000,
      max: 205000,
      note: "Includes 15% contingency and covers realistic contractor rates",
    },
  },

  team: {
    ceo: {
      role: "Product Owner & Strategic Lead",
      responsibilities: [
        "Product vision and strategy",
        "User research and validation",
        "CEO checkpoint reviews",
        "Stakeholder communication",
      ],
    },
    contractors: {
      role: "Part-time Engineering Team",
      commitment: "20-30 hours/week per contractor",
      skills: ["Frontend (React/Next.js)", "Backend (Python/FastAPI)", "Data Engineering", "UI/UX Design"],
    },
  },

  status: {
    currentPhase: "Planning",
    currentWeek: 0,
    completedCheckpoints: 0,
    nextMilestone: "Week 2: UX Design Approval",
  },
};

// ============================================================================
// EXECUTIVE SUMMARY
// ============================================================================

export const executiveSummary = {
  goals: [
    {
      id: "goal-1",
      title: "Launch Working MVP in 16 Weeks",
      description: "Ship a production-ready MVP that brokers use daily for prioritization and outreach",
      success: "5-10 active users completing workflows without constant support",
    },
    {
      id: "goal-2",
      title: "Prevent Wrong Build",
      description: "Ensure engineering builds for broker workflows, not data models or technology showcases",
      success: "Brokers say 'this matches how I work' not 'this is technically impressive'",
    },
    {
      id: "goal-3",
      title: "Establish Data Foundation",
      description: "Build reliable data pipeline with 70%+ completeness on critical fields",
      success: "Priority rankings feel credible and data gaps are surfaced clearly",
    },
    {
      id: "goal-4",
      title: "Validate Product-Market Fit",
      description: "Prove brokers will use this daily and it saves them significant time",
      success: "70%+ daily active usage rate among pilot users",
    },
  ],

  risks: [
    {
      id: "risk-1",
      risk: "Building technically correct but unusable product",
      impact: "High",
      probability: "Medium",
      mitigation: "UX-first development, 6 CEO checkpoints, broker user testing",
      owner: "CEO",
    },
    {
      id: "risk-2",
      risk: "Data quality too low for credible rankings",
      impact: "High",
      probability: "Medium",
      mitigation: "Early data validation checkpoint, clear quality thresholds, manual enrichment fallback",
      owner: "Data Lead",
    },
    {
      id: "risk-3",
      risk: "Part-time contractors unavailable or inconsistent",
      impact: "High",
      probability: "Low",
      mitigation: "Document all decisions, cross-train, clear weekly commitments",
      owner: "CEO",
    },
    {
      id: "risk-4",
      risk: "AI draft quality poor or costs excessive",
      impact: "Medium",
      probability: "Medium",
      mitigation: "Template fallbacks, rate limiting, monitoring costs, can defer if needed",
      owner: "Backend Lead",
    },
  ],

  milestones: [
    { week: 2, name: "UX Designs Approved", critical: true },
    { week: 5, name: "Data Foundation Validated", critical: true },
    { week: 7, name: "Dashboard Approved", critical: true },
    { week: 9, name: "AI Drafts Approved", critical: false },
    { week: 11, name: "Go/No-Go Pilot Launch", critical: true },
    { week: 12, name: "MVP Launch & Review", critical: true },
  ],

  checkpoints: [
    { id: 1, week: 2, name: "UX Design Approval", type: "design" },
    { id: 2, week: 5, name: "Data Quality Validation", type: "data" },
    { id: 3, week: 7, name: "Dashboard Validation", type: "product" },
    { id: 4, week: 9, name: "AI Draft Generation Approval", type: "feature" },
    { id: 5, week: 11, name: "Go/No-Go Pilot Launch", type: "launch" },
    { id: 6, week: 12, name: "MVP Launch Review", type: "retrospective" },
  ],
};

// ============================================================================
// USER STORIES & WORKFLOWS
// ============================================================================

export const userStories = {
  persona: {
    name: "Sarah",
    role: "Commercial Real Estate Broker",
    experience: "5 years",
    portfolio: {
      owners: 200,
      properties: 500,
      submarkets: "Multiple",
    },
    currentTools: ["CRM", "Email", "Excel", "CoStar", "Various data sources"],
    painPoints: [
      "Spends 2-3 hours daily gathering data before outreach",
      "Switches between 5+ tools constantly",
      "Manual cross-referencing of lease dates with CRM notes",
      "Feels like spending more time on prep than action",
      "Misses timing opportunities due to information overload",
    ],
    goals: [
      "Start workday knowing exactly what deserves attention",
      "Understand why opportunities are urgent right now",
      "Access full context without switching tools",
      "Accelerate outreach preparation while maintaining quality",
    ],
  },

  jobsToBeDone: [
    {
      id: "jtbd-1",
      when: "When I start my workday",
      want: "See a prioritized list of opportunities ranked by timing urgency",
      so: "I can focus on what matters most without manually cross-referencing multiple systems",
    },
    {
      id: "jtbd-2",
      when: "When I see an opportunity",
      want: "Understand why it surfaced today with clear timing signals",
      so: "I can make informed judgments about which to pursue",
    },
    {
      id: "jtbd-3",
      when: "When I decide to pursue an opportunity",
      want: "All relevant context (owner portfolio, property details, market conditions) in one place",
      so: "I can prepare intelligent outreach without switching between tools",
    },
    {
      id: "jtbd-4",
      when: "When I craft outreach",
      want: "AI assistance with draft suggestions I can edit",
      so: "I can accelerate preparation while maintaining my personal voice",
    },
    {
      id: "jtbd-5",
      when: "When I'm ready to send",
      want: "Senior team review when required",
      so: "We can maintain quality without creating bottlenecks",
    },
  ],

  epics: [
    {
      id: "epic-1",
      name: "Morning Prioritization Dashboard",
      description: "Broker's daily starting point for understanding what deserves attention",
      priority: "P0 - Critical Path",
      stories: [
        {
          id: "story-1-1",
          title: "Daily Prioritized Opportunity List",
          asA: "broker starting my workday",
          iWant: "see a prioritized list of 15-20 opportunities ranked by timing urgency and relationship fit",
          soThat: "I can immediately understand where to focus without manually reviewing multiple data sources",
          acceptanceCriteria: [
            "Dashboard loads within 2 seconds of login",
            "Shows 15-20 opportunities ranked by composite score",
            "Each opportunity displays: Property name/address, Owner name, Primary timing signal, Score/rank",
            "List updates daily (overnight batch refresh acceptable for MVP)",
            "Can filter by property type, submarket, or owner tier",
            "Can manually dismiss opportunities with reason tracking",
          ],
          priority: "P0",
        },
        {
          id: "story-1-2",
          title: "Timing Signal Explanations",
          asA: "broker reviewing prioritized opportunities",
          iWant: "see clear explanations of why each opportunity surfaced today",
          soThat: "I can validate the system's reasoning and apply my professional judgment",
          acceptanceCriteria: [
            "Each opportunity has expandable 'Why now?' explanation",
            "Explanation uses plain English, not data jargon or scores",
            "Highlights 1-3 primary timing signals driving the ranking",
            "Shows data freshness: 'Updated 12 hours ago' or 'Last verified: Nov 20'",
            "Flags conflicting or uncertain data: 'Lease date unconfirmed'",
            "Links to source data when available",
          ],
          priority: "P0",
        },
        {
          id: "story-1-3",
          title: "Quick Filters and Segmentation",
          asA: "broker with different focus areas",
          iWant: "filter opportunities by property type, geography, or owner tier",
          soThat: "I can focus on my current priorities without noise",
          acceptanceCriteria: [
            "Filter by property type: Office, Retail, Industrial, Multifamily, Mixed-Use",
            "Filter by submarket/geography (based on property location)",
            "Filter by owner tier: Tier 1 (high value), Tier 2 (medium), Tier 3 (low/new)",
            "Filters are persistent across sessions",
            "Can combine multiple filters (AND logic)",
            "Shows count of opportunities matching each filter before applying",
          ],
          priority: "P1",
        },
      ],
    },
    {
      id: "epic-2",
      name: "Opportunity Research & Context",
      description: "Deep context views for properties and owners to inform outreach strategy",
      priority: "P0 - Critical Path",
      stories: [
        {
          id: "story-2-1",
          title: "Property Context View",
          asA: "broker researching an opportunity",
          iWant: "see comprehensive property information in one place",
          soThat: "I can understand the asset without switching to other tools",
          acceptanceCriteria: [
            "Click property from dashboard opens detailed context view",
            "Shows property basics: Address, size, type, year built, zoning",
            "Shows ownership: Current owner, acquisition date, ownership structure",
            "Shows financial: Last sale price, estimated value, tax assessment",
            "Shows timing: Lease maturities (tenant list if available), debt maturity",
            "Shows market: Submarket trends, comparable sales, vacancy rates",
            "Loads within 3 seconds",
          ],
          priority: "P0",
        },
        {
          id: "story-2-2",
          title: "Owner/Relationship Context View",
          asA: "broker researching an opportunity",
          iWant: "see comprehensive owner information and relationship history",
          soThat: "I can understand the relationship and identify other opportunities",
          acceptanceCriteria: [
            "Click owner name opens detailed relationship view",
            "Shows owner basics: Name/entity, contact info, entity type, portfolio size",
            "Shows portfolio: All properties owned, total value, geographic distribution",
            "Shows history: Communication log, past deals, engagement level",
            "Shows signals: Recent transactions, portfolio changes, activity patterns",
            "Shows relationship context: How we know them, last contact, sentiment",
            "Loads within 3 seconds",
          ],
          priority: "P0",
        },
        {
          id: "story-2-3",
          title: "Quick Context Modal (Hover/Quick View)",
          asA: "broker scanning through opportunities",
          iWant: "preview basic context without leaving the main list",
          soThat: "I can quickly evaluate multiple opportunities before deep diving",
          acceptanceCriteria: [
            "Hover over opportunity shows quick context tooltip/popover",
            "Shows: Property photo, key details (size, type), primary timing signal, owner name",
            "Appears within 0.5 seconds of hover",
            "Can click through to full property or owner view",
            "Works on both property name and owner name",
          ],
          priority: "P2",
        },
      ],
    },
    {
      id: "epic-3",
      name: "Outreach Preparation & Execution",
      description: "AI-assisted draft generation and email composition with human oversight",
      priority: "P0 - Critical Path",
      stories: [
        {
          id: "story-3-1",
          title: "AI-Assisted Draft Generation",
          asA: "broker preparing outreach",
          iWant: "generate AI-assisted email drafts based on opportunity context",
          soThat: "I can accelerate preparation while maintaining personalization",
          acceptanceCriteria: [
            "'Draft Email' button on property/owner context view",
            "AI generates draft using: Property details, owner info, timing signals, relationship history",
            "Draft includes: Personalized greeting, reason for outreach (timing), property-specific details, clear CTA",
            "Generated draft appears in editable text field",
            "Can regenerate with different tone/length options",
            "Tone options: Professional, Casual, Urgent",
            "Length options: Brief (3-4 sentences), Standard (2 paragraphs), Detailed (3+ paragraphs)",
          ],
          priority: "P0",
        },
        {
          id: "story-3-2",
          title: "Manual Email Composition",
          asA: "broker who prefers writing my own emails",
          iWant: "compose outreach manually with context readily available",
          soThat: "I can craft personalized communication without AI assistance",
          acceptanceCriteria: [
            "Option to skip AI generation and compose manually",
            "Rich text editor with formatting tools",
            "Side panel or reference section showing key property/owner facts",
            "Email templates library for common scenarios",
            "Save draft capability",
            "Subject line suggestions based on opportunity type",
          ],
          priority: "P1",
        },
        {
          id: "story-3-3",
          title: "Review and Approval Workflow",
          asA: "junior broker requiring oversight",
          iWant: "submit drafts for senior review before sending",
          soThat: "we maintain quality standards and catch errors",
          acceptanceCriteria: [
            "'Submit for Review' button on draft editor",
            "Draft enters review queue for designated reviewer",
            "Reviewer sees: Draft, full context, reason for outreach",
            "Reviewer can: Approve, Request Changes (with comments), Reject",
            "Author gets notification of review status",
            "Can see review comments inline",
            "Can make edits and resubmit",
          ],
          priority: "P1",
        },
        {
          id: "story-3-4",
          title: "Send and Track",
          asA: "broker sending outreach",
          iWant: "send emails directly from the platform and track engagement",
          soThat: "I can close the loop and understand what's working",
          acceptanceCriteria: [
            "'Send' button integrates with email delivery service (SendGrid/SES)",
            "Confirmation modal before sending (prevent accidental sends)",
            "Email sent from broker's actual email address (not no-reply)",
            "Tracks: Sent, Opened, Clicked, Replied",
            "Updates opportunity status automatically: 'Outreach sent', 'Owner engaged'",
            "Logs communication in owner relationship history",
          ],
          priority: "P0",
        },
        {
          id: "story-3-5",
          title: "Offering Memorandum Generation",
          asA: "broker with an engaged prospect",
          iWant: "generate professional offering memorandums using property data and AI",
          soThat: "I can quickly create polished marketing materials for serious opportunities",
          acceptanceCriteria: [
            "'Generate OM' button on property context view (available after owner shows interest)",
            "AI generates structured OM content using: Property details, financial data, market analysis, comparable properties",
            "OM includes standard sections: Executive Summary, Property Overview, Location & Market, Financial Analysis, Investment Highlights",
            "Template-based PDF generation with professional formatting",
            "Editable sections before final generation",
            "Option to select from multiple OM templates (Investment, Tenant, Listing)",
            "Generated OM includes property photos and maps if available",
            "Can regenerate sections with AI if needed",
            "Download as PDF, preview before download",
            "Logs OM generation in property activity history",
            "Saves generated OMs for future reference and iteration",
          ],
          priority: "P1",
        },
      ],
    },
    {
      id: "epic-4",
      name: "Data Quality and System Health",
      description: "Transparent data quality indicators and manual override capabilities",
      priority: "P1 - High Priority",
      stories: [
        {
          id: "story-4-1",
          title: "Data Completeness Indicators",
          asA: "broker relying on platform data",
          iWant: "see clear indicators of data quality and completeness",
          soThat: "I can trust the information and know when to verify externally",
          acceptanceCriteria: [
            "Data quality badge on every property and owner: 'High', 'Medium', 'Low'",
            "Specific missing fields flagged: 'Lease expiry date unknown'",
            "Last updated timestamps on all data sections",
            "Option to report incorrect data",
            "Admin dashboard showing overall data completeness metrics",
          ],
          priority: "P0",
        },
        {
          id: "story-4-2",
          title: "Manual Data Override",
          asA: "broker with better information",
          iWant: "add or correct data manually",
          soThat: "the platform becomes more accurate over time",
          acceptanceCriteria: [
            "'Edit' button on property and owner detail views",
            "Can update specific fields with manual entry",
            "Manual overrides take precedence over automated data",
            "Tracks who made change and when",
            "Option to add notes explaining the change",
          ],
          priority: "P2",
        },
      ],
    },
  ],

  antiPatterns: [
    {
      wrong: "Build for data models",
      example: "Creating admin screens to manage 'Property Table', 'Owner Table', 'Engagement Table' instead of broker workflows",
      right: "Build for workflows",
      solution: "Creating 'Morning Prioritization', 'Opportunity Research', 'Outreach Prep' that happen to use those data models",
    },
    {
      wrong: "Hide missing data",
      example: "Showing empty fields or 'N/A' without explanation when data is missing",
      right: "Surface data quality",
      solution: "Clearly showing 'Lease expiry date unknown - last verified 90 days ago' so broker can make informed decisions",
    },
    {
      wrong: "AI makes decisions",
      example: "System automatically sends emails or updates CRM without human approval",
      right: "AI assists humans",
      solution: "System generates suggestions that humans review, edit, and explicitly approve before action",
    },
    {
      wrong: "Build for technical users",
      example: "Using jargon like 'ML confidence score: 0.87' or exposing database IDs in UI",
      right: "Build for brokers",
      solution: "Using plain English like 'High priority - lease expires in 90 days' and hiding technical details",
    },
  ],

  definitionOfDone: [
    "Feature works in production-like environment",
    "Tested by real broker (not just engineers)",
    "Broker can complete workflow without engineer guidance",
    "No critical bugs blocking core functionality",
    "Data quality flags working correctly",
    "Error states handled gracefully (not crashes)",
    "Mobile responsive (doesn't break layout)",
    "Performance meets requirements (load times specified)",
    "Code reviewed and approved",
    "Documented in user guide or tooltip",
  ],
};

// ============================================================================
// TECHNICAL ARCHITECTURE
// ============================================================================

export const technicalArchitecture = {
  overview: {
    philosophy: "CREaiT is a synthesis and intelligence layer that sits on top of existing CRM and data systems. It does NOT replace these systems but rather aggregates, enriches, and presents data in a workflow-optimized way.",
    principles: [
      "Workflow-Led Design: UI organizes around broker workflows, not data models",
      "Human-in-the-Loop: AI assists but never bypasses human judgment",
      "Transparent Data Quality: Surface data gaps and conflicts, don't hide them",
      "Separation of Concerns: Data ingestion, processing, intelligence, and presentation are decoupled",
      "Fail Gracefully: System remains functional when AI or external services fail",
    ],
  },

  techStack: {
    frontend: {
      framework: "Next.js 14+ (App Router)",
      language: "TypeScript",
      styling: "Tailwind CSS 3+",
      stateManagement: "Zustand or Context API",
      dataFetching: "React Query (TanStack Query)",
      uiComponents: "Radix UI or Headless UI",
      formHandling: "React Hook Form",
      richTextEditor: "Tiptap or Lexical",
      rationale: "Large talent pool, mature ecosystem, excellent TypeScript support, rapid development",
    },
    backend: {
      language: "Python 3.11+",
      framework: "FastAPI",
      taskQueue: "Celery with Redis broker",
      dataProcessing: "Pandas + dbt",
      workflowOrchestration: "Apache Airflow",
      pdfGeneration: "WeasyPrint or ReportLab",
      rationale: "Best ML/AI ecosystem, team familiarity, async support, auto-generated docs",
    },
    databases: {
      primary: {
        type: "PostgreSQL 14+ with TimescaleDB extension",
        useCases: "Properties, owners, relationships, transactions, time-series signals",
        rationale: "Strong relational model, time-series support, JSON flexibility",
      },
      documentStore: {
        type: "MongoDB (Optional for MVP)",
        useCases: "Email content, scraped data, raw API responses",
        rationale: "Flexible schema for unstructured data",
      },
      cache: {
        type: "Redis",
        useCases: "Session management, API response caching, real-time data, Celery broker",
        rationale: "Fast, simple, multi-purpose",
      },
      search: {
        type: "Elasticsearch (Deferred to Post-MVP)",
        useCases: "Full-text search, faceted search for properties/owners",
        mvpAlternative: "Postgres full-text search (adequate for < 10K records)",
      },
    },
    aiML: {
      llm: {
        service: "OpenAI GPT-4 (via API)",
        framework: "LangChain",
        useCases: "Email draft generation, offering memorandum content generation, content summarization, entity extraction",
        rationale: "Best-in-class text generation, stable API, good documentation",
      },
      classicalML: {
        library: "scikit-learn",
        useCases: "Lead scoring, classification, regression if needed",
        rationale: "Best for tabular data, simple to deploy",
      },
    },
    infrastructure: {
      cloudProvider: "AWS (preferred) or GCP",
      hosting: "Docker + AWS ECS or GCP Cloud Run",
      cicd: "GitHub Actions",
      monitoring: "Sentry (errors) + CloudWatch/Stackdriver (infrastructure)",
      documentStorage: "AWS S3 or local filesystem (MVP)",
      rationale: "Mature services, auto-scaling, managed infrastructure, good Python SDKs",
    },
    thirdPartyServices: {
      email: "SendGrid or AWS SES (with tracking)",
      auth: "Auth0 or AWS Cognito",
      sms: "Twilio (future)",
      eSignature: "DocuSign (future)",
      payments: "Stripe (future)",
    },
  },

  coreDataModels: [
    {
      name: "owners",
      description: "Owner/entity information and portfolio",
      keyFields: [
        "owner_id (UUID, PK)",
        "name (VARCHAR)",
        "entity_type (VARCHAR)",
        "email, phone, address",
        "portfolio_size (INT)",
        "total_portfolio_value (DECIMAL)",
        "tier (VARCHAR: Tier1/Tier2/Tier3)",
        "relationship_strength (VARCHAR)",
        "last_contact_date (TIMESTAMP)",
        "data_quality_score (INT 0-100)",
      ],
    },
    {
      name: "properties",
      description: "Property information and characteristics",
      keyFields: [
        "property_id (UUID, PK)",
        "owner_id (UUID, FK)",
        "address, city, state, zip",
        "property_type (VARCHAR)",
        "square_footage, year_built, zoning",
        "last_sale_date, last_sale_price",
        "estimated_value, tax_assessment",
        "data_quality_score (INT 0-100)",
      ],
    },
    {
      name: "timing_signals",
      description: "Time-series signals for opportunity detection (TimescaleDB hypertable)",
      keyFields: [
        "signal_id (UUID, PK)",
        "property_id, owner_id (FK)",
        "signal_type (lease_expiry, debt_maturity, ownership_change, market_event)",
        "signal_date (DATE)",
        "signal_strength (INT 1-10)",
        "signal_description (TEXT)",
        "detected_at (TIMESTAMP)",
      ],
    },
    {
      name: "communications",
      description: "Engagement log and tracking",
      keyFields: [
        "communication_id (UUID, PK)",
        "owner_id, property_id, user_id (FK)",
        "communication_type (email, call, meeting, sms)",
        "subject, content",
        "sent_at, opened_at, clicked_at, replied_at",
        "sentiment, status",
      ],
    },
    {
      name: "opportunities",
      description: "Daily ranked opportunities",
      keyFields: [
        "opportunity_id (UUID, PK)",
        "property_id, owner_id (FK)",
        "priority_score (DECIMAL 0-100)",
        "rank (INT)",
        "primary_signal_type",
        "explanation (TEXT)",
        "status (new, researched, outreach_sent, engaged, dismissed)",
        "date (DATE)",
      ],
    },
    {
      name: "documents",
      description: "Generated offering memorandums and marketing materials",
      keyFields: [
        "document_id (UUID, PK)",
        "property_id, created_by_user_id (FK)",
        "document_type (offering_memorandum, listing_package, investment_summary)",
        "template_id (VARCHAR)",
        "content (JSONB - structured content sections)",
        "file_path (VARCHAR - S3 or local path to PDF)",
        "status (draft, final)",
        "created_at, updated_at",
        "version (INT)",
      ],
    },
  ],

  apiEndpoints: {
    authentication: [
      { method: "POST", path: "/api/auth/login", description: "User login" },
      { method: "POST", path: "/api/auth/logout", description: "User logout" },
      { method: "GET", path: "/api/auth/me", description: "Get current user" },
    ],
    opportunities: [
      { method: "GET", path: "/api/opportunities/daily", description: "Get daily ranked opportunities", params: "date, filters, limit" },
      { method: "POST", path: "/api/opportunities/:id/dismiss", description: "Dismiss opportunity with reason" },
      { method: "POST", path: "/api/opportunities/:id/update-status", description: "Update opportunity status" },
    ],
    properties: [
      { method: "GET", path: "/api/properties/:id", description: "Get property details" },
      { method: "GET", path: "/api/properties/:id/timeline", description: "Get property event timeline" },
    ],
    owners: [
      { method: "GET", path: "/api/owners/:id", description: "Get owner/relationship details" },
      { method: "GET", path: "/api/owners/:id/portfolio", description: "Get owner's property portfolio" },
      { method: "GET", path: "/api/owners/:id/communications", description: "Get communication history" },
    ],
    ai: [
      { method: "POST", path: "/api/ai/generate-draft", description: "Generate AI email draft", body: "opportunity_id, tone, length, context" },
      { method: "POST", path: "/api/ai/regenerate-draft", description: "Regenerate draft with new parameters" },
      { method: "POST", path: "/api/ai/generate-om-content", description: "Generate AI offering memorandum content", body: "property_id, template_type, sections" },
    ],
    outreach: [
      { method: "POST", path: "/api/outreach/send", description: "Send email", body: "opportunity_id, to, subject, content" },
      { method: "GET", path: "/api/outreach/:communication_id/status", description: "Get email tracking status" },
    ],
    documents: [
      { method: "POST", path: "/api/documents/generate-om", description: "Generate offering memorandum PDF", body: "property_id, content, template_id" },
      { method: "GET", path: "/api/documents/:document_id", description: "Get generated document" },
      { method: "GET", path: "/api/documents/templates", description: "List available OM templates" },
      { method: "GET", path: "/api/properties/:id/documents", description: "Get all documents for property" },
    ],
    reviews: [
      { method: "GET", path: "/api/reviews/queue", description: "Get pending draft reviews" },
      { method: "POST", path: "/api/reviews/:draft_id/approve", description: "Approve draft" },
      { method: "POST", path: "/api/reviews/:draft_id/request-changes", description: "Request changes to draft" },
    ],
  },

  performanceTargets: {
    dashboardLoad: "< 2 seconds (p95)",
    propertyOwnerDetail: "< 3 seconds (p95)",
    aiDraftGeneration: "< 5 seconds (async acceptable)",
    emailSend: "< 2 seconds (confirmation, actual send async)",
  },

  securityRequirements: [
    "JWT-based authentication with access tokens (15 min) and refresh tokens (7 days)",
    "Role-based access control (junior_broker, senior_broker, admin)",
    "TLS 1.3 for all API communication",
    "Encryption at rest for sensitive fields (email, phone)",
    "SQL injection prevention via parameterized queries",
    "XSS prevention via React escaping and DOMPurify",
    "CSRF protection with tokens",
    "Rate limiting: 100 req/min standard, 10 req/min AI generation, 20 emails/hour",
  ],
};

// ============================================================================
// DATA STRATEGY
// ============================================================================

export const dataStrategy = {
  requirements: {
    critical: [
      { field: "address", completeness: "95%", source: "CRM, Public Records" },
      { field: "owner_id", completeness: "95%", source: "CRM, Deed Records" },
      { field: "property_type", completeness: "90%", source: "CRM, Manual" },
      { field: "lease_expiry", completeness: "60%", source: "CoStar, CRM, Manual" },
      { field: "owner_email", completeness: "50%", source: "CRM, ZoomInfo" },
    ],
    high: [
      { field: "square_footage", completeness: "70%", source: "Public Records, CoStar" },
      { field: "estimated_value", completeness: "60%", source: "Zillow, CoStar, Manual" },
      { field: "last_sale_price", completeness: "50%", source: "Deed Records" },
    ],
    medium: [
      { field: "tax_assessment", completeness: "40%", source: "County Assessor" },
      { field: "parking_spaces", completeness: "30%", source: "CoStar, Manual" },
      { field: "building_class", completeness: "30%", source: "CoStar" },
    ],
  },

  sources: [
    {
      name: "Internal CRM",
      type: "Primary",
      data: "Owner/contact records, property ownership, communication logs",
      accessMethod: "REST API (preferred) or CSV export",
      quality: "70-80% complete, updated daily by brokers",
      cost: "Included (existing system)",
    },
    {
      name: "Public Property Records",
      type: "Primary",
      data: "Deed transfers, tax assessments, mortgage/lien records",
      accessMethod: "County websites (scraping) or DataTree API",
      quality: "90%+ complete, updated weekly to monthly",
      cost: "$200-500/month (DataTree) or free (scraping)",
    },
    {
      name: "CoStar",
      type: "Optional Premium",
      data: "Property details, lease data, comp sales, market reports",
      accessMethod: "API (requires enterprise subscription)",
      quality: "Comprehensive for covered properties",
      cost: "$2,000-5,000/month",
      mvpAlternative: "LoopNet listings + manual entry",
    },
    {
      name: "Contact Enrichment (ZoomInfo/Apollo)",
      type: "Optional",
      data: "Business contact emails, phone numbers, company info",
      accessMethod: "API",
      quality: "Varies by contact",
      cost: "ZoomInfo: $10K-30K/year, Apollo: $50-100/month",
      mvpDecision: "Defer to post-MVP, rely on CRM data initially",
    },
    {
      name: "SendGrid",
      type: "Required",
      data: "Email delivery and tracking",
      accessMethod: "API + Webhooks",
      quality: "Real-time tracking",
      cost: "$15-20/month for 50K emails",
    },
  ],

  pipeline: {
    schedule: "Daily at 2:00 AM",
    phases: [
      {
        phase: "Extract",
        duration: "1-2 hours",
        tasks: [
          "Pull from CRM API (30 min)",
          "Scrape county deed transfers (45 min)",
          "Pull CoStar/Crexi data if available (30 min)",
          "Sync SendGrid tracking events (15 min)",
        ],
      },
      {
        phase: "Transform",
        duration: "30-60 min",
        tasks: [
          "Deduplicate entities (15 min)",
          "Standardize addresses, geocode (15 min)",
          "Calculate derived fields and scores (20 min)",
          "Run data quality validations (10 min)",
        ],
      },
      {
        phase: "Load",
        duration: "15-30 min",
        tasks: [
          "Upsert to PostgreSQL (20 min)",
          "Update Redis cache for hot data (5 min)",
          "Trigger opportunity re-ranking (5 min)",
        ],
      },
      {
        phase: "Post-Process",
        duration: "15 min",
        tasks: [
          "Calculate daily priority scores (10 min)",
          "Generate data quality report (5 min)",
        ],
      },
    ],
    tools: "Apache Airflow for orchestration, Pandas for processing, dbt for transformations",
  },

  qualityScoring: {
    formula: "Completeness (40%) + Freshness (30%) + Source Reliability (30%)",
    thresholds: {
      high: "80-100 (Green badge)",
      medium: "50-79 (Yellow badge)",
      low: "0-49 (Red badge)",
    },
  },

  costs: {
    required: {
      monthly: "$85-211",
      breakdown: "AWS/GCP infrastructure + SendGrid + Auth",
    },
    optional: {
      monthly: "$3,050-8,200",
      breakdown: "CoStar API + ZoomInfo + DataTree + OpenAI API",
    },
    mvpRecommendation: "Start lean ($100-250/month), add premium data post-MVP",
  },
};

// ============================================================================
// EXECUTION PLAN (12-Week Timeline)
// ============================================================================

export const executionPlan = {
  totalWeeks: 12,
  estimatedHours: {
    min: 1200,
    max: 1600,
    perWeek: "100-130 hours (parallel execution with overlapping phases)",
  },

  phases: [
    {
      id: "phase-1",
      name: "Foundation & UX Design",
      weekRange: "1-3",
      description: "Set up infrastructure, validate workflows, approve designs before building",
      weeks: [
        {
          week: 1,
          name: "Project Kickoff & Discovery",
          goal: "Align team on vision, validate workflows, set up infrastructure foundation",
          ceoTasks: [
            "Kickoff meeting with full team (2 hours)",
            "Share user stories and technical specs",
            "Identify 3-5 brokers for user testing/feedback",
            "Decide on data source priorities (CoStar vs. free alternatives)",
            "Set up project management tool",
          ],
          engineeringTasks: [
            "Set up GitHub repo with branching strategy",
            "Configure CI/CD pipeline (GitHub Actions)",
            "Initialize FastAPI project + Next.js project",
            "Set up PostgreSQL (local and cloud)",
            "Create initial database schema",
            "Set up authentication scaffolding",
            "Create first API endpoint (health check)",
            "Set up error monitoring (Sentry)",
          ],
          designTasks: [
            "Review user stories, identify key screens",
            "Create low-fidelity wireframes for dashboard",
            "Create wireframes for property detail view",
            "Create wireframes for email composition flow",
            "Get CEO/user feedback on wireframes",
          ],
          deliverables: [
            "Development environment running for all contractors",
            "Database schema v1 created and documented",
            "Basic API and frontend communicating",
            "Wireframes for 3 core screens",
            "Project plan and task assignments documented",
          ],
        },
        {
          week: 2,
          name: "UX Design & Data Foundation",
          goal: "Complete high-fidelity designs, build data pipeline foundation",
          checkpoint: {
            id: 1,
            name: "UX Design Approval",
            description: "CEO approves designs before feature development begins",
            critical: true,
          },
          ceoTasks: [
            "Review high-fidelity designs with brokers (user testing)",
            "Finalize authentication approach (Auth0 vs. Cognito)",
            "Decide on CoStar alternative if not subscribing",
            "Document feedback from broker user testing",
            "Approve final designs for development",
          ],
          designTasks: [
            "Create high-fidelity mockups for dashboard (desktop)",
            "Create mockups for property detail view",
            "Create mockups for owner profile view",
            "Create mockups for email composer",
            "Design component library (buttons, badges, cards, tooltips)",
            "Document design system (colors, typography, spacing)",
            "Create interactive prototype (Figma or similar)",
          ],
          engineeringTasks: [
            "Build property and owner API endpoints",
            "Build opportunity ranking algorithm (rule-based)",
            "Create timing signal ingestion logic",
            "Set up Redis for caching",
            "Build reusable UI components",
            "Create dashboard page layout (empty state)",
            "Set up routing between pages",
            "Write unit tests for scoring algorithm",
          ],
          dataTasks: [
            "Build ETL pipeline for CRM data",
            "Scrape first public records source (deed transfers)",
            "Create data deduplication logic",
            "Geocode addresses using Google Maps API",
            "Load sample data into database (50-100 properties)",
            "Run data quality checks (Great Expectations)",
          ],
          deliverables: [
            "High-fidelity designs approved by CEO and test brokers",
            "Interactive prototype clickable for all core workflows",
            "API endpoints returning real data from database",
            "Sample dataset of 50-100 properties loaded",
            "Component library documented and usable",
          ],
        },
        {
          week: 3,
          name: "Core Dashboard Development",
          goal: "Build working prioritization dashboard with real data",
          ceoTasks: [
            "Review daily standup notes and unblock contractors",
            "Test working dashboard with sample data",
            "Document any UX issues discovered during testing",
          ],
          engineeringTasks: [
            "Build opportunity ranking endpoint",
            "Implement opportunity dismissal",
            "Build filter logic (property type, submarket, owner tier)",
            "Calculate data quality scores",
            "Implement explanation generation",
            "Build OpportunityCard and OpportunityList components",
            "Implement filters UI",
            "Build data quality badge component",
            "Add loading states and error handling",
          ],
          dataTasks: [
            "Expand dataset to 200-300 properties",
            "Add timing signals for 60% of properties",
            "Calculate priority scores for all opportunities",
            "Create daily opportunity ranking job",
            "Set up data refresh schedule (nightly)",
            "Monitor data quality metrics",
          ],
          deliverables: [
            "Dashboard loads with real ranked opportunities",
            "Filters work and update list",
            "Explanations display for each opportunity",
            "Data quality badges show on all records",
            "Performance: Dashboard loads in < 3 seconds",
          ],
        },
      ],
    },
    {
      id: "phase-2",
      name: "Data Foundation Validation",
      weekRange: "4-5",
      description: "Ensure data quality is sufficient before building more features",
      weeks: [
        {
          week: 4,
          name: "Data Quality Focus",
          goal: "Ensure data foundation is reliable before building more features",
          ceoTasks: [
            "Review data quality report with team",
            "Prioritize data enrichment efforts",
            "Test end-to-end workflow: Dashboard → Property → Owner",
            "Document data gaps that block use cases",
          ],
          engineeringTasks: [
            "Automate daily ETL pipeline (Airflow)",
            "Add 2-3 additional data sources",
            "Implement entity resolution (merge duplicate owners)",
            "Improve address standardization and geocoding",
            "Set up data quality monitoring dashboard",
            "Create alerting for data pipeline failures",
            "Optimize slow database queries",
            "Implement Redis caching for hot data",
          ],
          deliverables: [
            "Data pipeline runs automatically every night",
            "Data quality metrics tracked and visible",
            "70%+ of properties have timing signals",
            "80%+ of owners have contact info",
            "No critical bugs blocking workflows",
          ],
        },
        {
          week: 5,
          name: "Data Validation & Performance",
          goal: "Prove data quality is sufficient to build on",
          checkpoint: {
            id: 2,
            name: "Data Quality Validation",
            description: "CEO validates data foundation before feature development continues",
            critical: true,
          },
          ceoTasks: [
            "Review data quality report in detail",
            "Test opportunity ranking with brokers",
            "Validate timing signals are accurate",
            "Approve data foundation for feature build",
          ],
          engineeringTasks: [
            "Write unit tests (30% coverage minimum)",
            "Write integration tests for API endpoints",
            "Set up E2E testing framework (Playwright)",
            "Write E2E test for critical path",
            "Load testing (simulate 20 concurrent users)",
            "Profile slow queries and optimize",
            "Optimize image loading",
            "Reduce API payload sizes",
          ],
          dataTasks: [
            "Validate timing signal accuracy (manual spot checks)",
            "Improve relationship strength calculation",
            "Add data lineage tracking",
            "Document data dictionary",
            "Create data quality SLA document",
          ],
          deliverables: [
            "Data quality report shows 70%+ completeness on critical fields",
            "Sample of 20 opportunities validated by broker",
            "Dashboard loads in < 2 seconds consistently",
            "Unit test coverage > 30%",
            "E2E test passes for critical path",
          ],
        },
      ],
    },
    {
      id: "phase-3",
      name: "Core Features",
      weekRange: "6-9",
      description: "Build AI draft generation, email composition, and tracking",
      weeks: [
        {
          week: 6,
          name: "AI Draft Generation Setup",
          goal: "Integrate OpenAI API and build draft generation",
          ceoTasks: [
            "Set up OpenAI API account",
            "Define tone and length options",
            "Write example prompts for different signal types",
            "Test drafts with brokers (quality check)",
          ],
          engineeringTasks: [
            "Integrate OpenAI API (GPT-4)",
            "Build LangChain prompt templates",
            "Create draft generation endpoint",
            "Implement tone and length parameters",
            "Build fallback template system",
            "Add retry logic and error handling",
            "Implement rate limiting",
            "Build draft generation UI",
            "Build rich text editor",
          ],
          deliverables: [
            "'Generate Draft' produces email draft in < 5 seconds",
            "Drafts are relevant to property and timing signal",
            "Tone and length options change output",
            "Fallback templates work when API unavailable",
            "Text editor supports formatting",
          ],
        },
        {
          week: 7,
          name: "Email Composition & Editing",
          goal: "Build full email composition experience",
          ceoTasks: [
            "Test email composition workflow end-to-end",
            "Review draft quality with brokers",
            "Document common edits needed",
            "Decide on review workflow requirements",
          ],
          engineeringTasks: [
            "Build draft save/retrieve endpoints",
            "Implement auto-save (every 30 seconds)",
            "Build email validation",
            "Set up SendGrid integration",
            "Implement email sending endpoint",
            "Build SendGrid webhook handler",
            "Implement draft auto-save",
            "Build send confirmation modal",
          ],
          deliverables: [
            "Complete workflow: Generate draft → Edit → Send",
            "Drafts auto-save and persist",
            "Emails send successfully via SendGrid",
            "Tracking works (opens and clicks recorded)",
            "Errors are handled gracefully",
          ],
        },
        {
          week: 8,
          name: "Dashboard Refinement & Testing",
          goal: "Polish dashboard based on real usage",
          checkpoint: {
            id: 3,
            name: "Dashboard Validation",
            description: "CEO validates dashboard matches broker mental model",
            critical: true,
          },
          ceoTasks: [
            "Use product daily yourself (dogfood)",
            "Collect feedback from pilot broker if available",
            "Document usability issues",
            "Prioritize top 5 issues to fix",
          ],
          engineeringTasks: [
            "Fix top usability bugs",
            "Improve loading states and spinners",
            "Add empty states",
            "Improve error messages",
            "Add keyboard shortcuts",
            "Polish visual design",
            "Optimize opportunity ranking algorithm",
            "Improve explanation clarity",
          ],
          dataTasks: [
            "Expand dataset to 1,000+ properties",
            "Improve timing signal coverage (80%+)",
            "Add more market context data",
            "Fix data quality issues discovered",
          ],
          deliverables: [
            "Dashboard feels polished and professional",
            "All major usability issues fixed",
            "Loading and error states are clear",
            "Opportunity ranking feels credible",
            "Dataset is comprehensive enough for daily use",
          ],
        },
        {
          week: 9,
          name: "Review/Approval Workflow, Email Tracking & OM Generation",
          goal: "Build oversight workflow, close tracking loop, and enable offering memorandum generation",
          checkpoint: {
            id: 4,
            name: "AI Draft Generation Approval",
            description: "CEO validates AI draft quality and approach",
            critical: false,
          },
          ceoTasks: [
            "Define review requirements",
            "Document approval process",
            "Simplify for MVP",
            "Define success metrics for email performance",
            "Review tracking implementation",
            "Test engagement data accuracy",
            "Select OM template designs (3 types: Investment, Tenant, Listing)",
            "Define required OM sections and content structure",
            "Provide sample OMs for reference",
            "Test AI-generated OM content quality",
          ],
          engineeringTasks: [
            "Build review queue endpoint",
            "Implement review actions",
            "Add role-based permissions",
            "Create notification system",
            "Track review SLA",
            "Build review queue dashboard",
            "Build 'Submit for Review' flow",
            "Implement review modal",
            "Process SendGrid webhooks for all events",
            "Build engagement tracking endpoints",
            "Update opportunity status based on engagement",
            "Calculate engagement metrics",
            "Build communication history view",
            "Build email activity timeline",
            "Show engagement status on opportunities",
            "Integrate PDF generation library (ReportLab or WeasyPrint)",
            "Build OM content generation endpoint with LangChain",
            "Create OM template system (HTML/CSS templates)",
            "Build OM editing interface",
            "Implement PDF generation endpoint",
            "Add document storage (S3 or local for MVP)",
            "Build document history tracking",
            "Create 'Generate OM' UI on property view",
            "Implement template selection",
          ],
          dataTasks: [
            "Backfill communication history from CRM",
            "Calculate relationship strength from engagement",
            "Track email performance by signal type",
            "Monitor bounce and unsubscribe rates",
            "Gather property photos and images for OMs",
            "Compile comparable sales data for OM market analysis",
            "Prepare financial templates (NOI, Cap Rate, IRR calculations)",
          ],
          deliverables: [
            "Junior broker can submit draft for review",
            "Senior broker sees pending drafts",
            "Approval/rejection works with comments",
            "Notifications sent",
            "Nothing can be sent without approval if required",
            "Emails tracked for opens, clicks, replies",
            "Engagement data shows in owner profiles",
            "Opportunity status updates when owner responds",
            "Communication timeline visible",
            "Unsubscribes honored immediately",
            "Broker can generate AI-powered OM content in < 10 seconds",
            "OM templates render professionally with property data",
            "Generated OMs are editable before final PDF creation",
            "PDF download works and formatting is professional",
            "OM generation logged in property history",
          ],
        },
      ],
    },
    {
      id: "phase-4",
      name: "Integration & Launch Prep",
      weekRange: "10-12",
      description: "Testing, documentation, pilot launch, and MVP review",
      weeks: [
        {
          week: 10,
          name: "Integration Testing & Bug Fixes",
          goal: "Test everything working together, aggressive bug fixing",
          ceoTasks: [
            "Complete end-to-end testing yourself",
            "Create punch list of must-fix bugs",
            "Triage bugs (critical, high, medium, low)",
            "Recruit 1-2 pilot users for Week 14",
          ],
          engineeringTasks: [
            "Write E2E tests for all core workflows",
            "Run regression testing",
            "Load testing (20 concurrent users)",
            "Cross-browser testing",
            "Mobile responsive testing",
            "Security testing (OWASP top 10)",
            "Fix all critical bugs",
            "Fix high-priority bugs",
          ],
          deliverables: [
            "All critical bugs fixed",
            "E2E tests pass for all core workflows",
            "Performance meets targets",
            "Mobile responsive (no broken layouts)",
            "Punch list of remaining issues documented",
          ],
        },
        {
          week: 11,
          name: "Documentation & Pilot Launch Preparation",
          goal: "Prepare materials for user onboarding and final prep for pilot users",
          checkpoint: {
            id: 5,
            name: "Go/No-Go Pilot Launch",
            description: "CEO decides if product is ready for pilot users",
            critical: true,
          },
          ceoTasks: [
            "Write user guide",
            "Create video walkthrough (5-10 minutes)",
            "Prepare onboarding checklist",
            "Document FAQ",
            "Onboard 1-2 pilot users",
            "Walk through product with each pilot user",
            "Set expectations (MVP, bugs expected)",
            "Create feedback collection process",
          ],
          engineeringTasks: [
            "Write technical documentation",
            "Document API endpoints",
            "Create troubleshooting guide",
            "Write runbook for operations",
            "Set up monitoring dashboards",
            "Configure alerting rules",
            "Set up log aggregation",
            "Test alerting",
            "Deploy to staging environment",
            "Run full smoke test on staging",
            "Set up production environment",
            "Configure database backups",
            "Test disaster recovery",
            "Create deployment checklist",
            "Security audit (OWASP top 10)",
            "Penetration testing",
          ],
          deliverables: [
            "User guide completed and reviewed",
            "Video walkthrough recorded",
            "Technical documentation complete",
            "Monitoring and alerting operational",
            "Staging environment fully functional",
            "Production environment ready",
            "1-2 pilot users onboarded and trained",
            "Security audit passed",
            "Final bug list triaged",
          ],
        },
        {
          week: 12,
          name: "Pilot Launch & MVP Review",
          goal: "Launch with pilot users, monitor, evaluate success",
          checkpoint: {
            id: 6,
            name: "MVP Launch Review",
            description: "Evaluate MVP success and plan next iteration",
            critical: true,
          },
          ceoTasks: [
            "Daily check-ins with pilot users",
            "Collect feedback (what works, what doesn't)",
            "Triage new bugs discovered",
            "Document feature requests",
            "Monitor usage analytics",
            "Synthesize pilot feedback",
            "Create launch communication plan",
            "Schedule retrospective meeting",
            "Plan next iteration priorities",
          ],
          engineeringTasks: [
            "Monitor error logs daily",
            "Respond to bug reports within 4 hours",
            "Fix critical bugs immediately (hot fixes)",
            "Triage and schedule non-critical bugs",
            "Monitor performance and uptime",
            "Implement quick wins (easy UX improvements)",
            "Optimize based on real usage patterns",
            "Monitor system performance under increased load",
            "Scale infrastructure if needed",
            "Optimize slow queries discovered under load",
            "Improve caching for frequently accessed data",
            "Build usage analytics dashboard",
            "Track key metrics",
            "Calculate success metrics",
            "Create weekly reports for CEO",
          ],
          dataTasks: [
            "Monitor data pipeline for failures",
            "Ensure daily data refresh completes",
            "Improve data quality based on user feedback",
            "Expand data coverage if gaps identified",
          ],
          deliverables: [
            "Pilot users actively using product daily",
            "System stable (uptime > 99%)",
            "Critical bugs fixed within 24 hours",
            "Positive feedback from pilot users",
            "Documented learnings for broader launch",
            "5-10 users actively using product daily",
            "System stable under real load",
            "Usage metrics being tracked",
            "Post-MVP roadmap documented",
            "Success criteria evaluated",
          ],
        },
      ],
    },
  ],
};

// ============================================================================
// CEO CHECKPOINTS
// ============================================================================

export const checkpoints = [
  {
    id: 1,
    week: 2,
    name: "UX Design Approval",
    type: "design",
    purpose: "Prevent building the wrong thing by validating designs before development",
    deliverables: [
      "Clickable wireframe prototype showing daily dashboard, context views, and review workflow",
      "3-5 user stories tested with real brokers with recorded feedback",
      "Technical architecture diagram validated against workflow needs",
      "Resource allocation plan with contractor hours committed",
    ],
    successCriteria: [
      "Brokers can navigate prototype without confusion",
      "All core workflows (prioritize → research → draft → review → send) feel natural",
      "No 'that's not how I work' feedback from users",
      "Technical stack choices justified by user needs, not engineer preferences",
    ],
    redFlags: [
      "Engineers pushing to start coding before designs are validated",
      "Designs that organize around data models instead of workflows",
      "Missing the 'why now' signal explanation that brokers need",
      "Over-complex navigation requiring too many clicks",
    ],
    criticalQuestions: [
      {
        q: "Walk me through how this organizes around the broker's workflow, not the data model.",
        good: "The dashboard shows opportunities in priority order based on timing urgency. Brokers scan this list first thing to decide what to focus on.",
        bad: "The dashboard has tabs for Properties, Owners, Communications, and Settings. Brokers can browse the property table here.",
      },
      {
        q: "Show me 3 examples of timing signal explanations. Read them out loud.",
        good: "Lease expires in 90 days. Owner recently sold another property, suggesting liquidity.",
        bad: "ML Score: 0.87 | Timing Index: 3.2 | Engagement Factor: High",
      },
      {
        q: "Show me what happens when the lease expiry date is missing for a property.",
        good: "Screen shows 'Lease expiry date unknown - last verified 90 days ago' with option to add manually",
        bad: "Field is blank or shows 'N/A' without explanation",
      },
    ],
  },
  {
    id: 2,
    week: 6,
    name: "Data Quality Validation",
    type: "data",
    purpose: "Validate data quality is sufficient to build features on top of",
    deliverables: [
      "Working demo showing real property and owner data flowing through system",
      "Data quality report: what % of records have complete information",
      "Clear documentation of what data exists vs. what's missing",
      "Sample prioritization list ranked by timing signals",
    ],
    successCriteria: [
      "Can generate a ranked list of 20+ opportunities with real data",
      "Missing data is surfaced clearly, not hidden",
      "Property and owner lookups return in < 2 seconds",
      "Team has plan for handling data gaps without blocking launch",
    ],
    redFlags: [
      "'We'll fix data quality later' attitude",
      "Building ML models before basic data pipeline works",
      "No clear ownership of data integrity",
      "Engineers assuming data without validating with sources",
    ],
    criticalQuestions: [
      {
        q: "What percentage of properties have the critical fields needed for prioritization?",
        good: "70% of properties have lease expiry dates, 80% have owner contact info",
        bad: "We don't track that' or percentages < 50%",
      },
      {
        q: "Show me a property. Let's verify the details are correct.",
        good: "Pick a property you know personally (if possible) and verify all details match reality",
        bad: "Unable to verify or obvious errors found",
      },
      {
        q: "Generate a ranked list of 20 opportunities. Do these feel like the right priorities?",
        good: "Top 5 make intuitive sense to a broker",
        bad: "Rankings feel random or don't match urgency",
      },
    ],
  },
  {
    id: 3,
    week: 9,
    name: "Dashboard Validation",
    type: "product",
    purpose: "Validate that prioritization dashboard matches broker mental model",
    deliverables: [
      "Working dashboard showing ranked opportunities (even if incomplete data)",
      "Explanation system showing 'why this property, why now'",
      "Click through from dashboard to full property/owner context",
      "Demo with real broker doing their morning routine in the tool",
    ],
    successCriteria: [
      "Broker can start their day and immediately understand where to focus",
      "Explanations are in plain English, not data jargon",
      "Can drill into property details without losing place in workflow",
      "Ranking feels credible compared to broker's intuition",
    ],
    redFlags: [
      "Dashboard organized by data tables instead of priority",
      "Explanations that say 'ML score: 0.87' instead of 'lease expires in 90 days'",
      "Requiring 5+ clicks to see basic property information",
      "UI that looks like a CRM instead of a decision-support tool",
    ],
    criticalQuestions: [
      {
        q: "Time me: From login, how long until I understand what to focus on and why?",
        good: "< 1 minute to scan dashboard and understand top 3 priorities",
        bad: "> 2 minutes or confusion about what's important",
      },
      {
        q: "Read the explanation for the #1 opportunity out loud.",
        good: "Sounds natural, explains timing in plain English",
        bad: "Technical jargon, awkward phrasing, vague",
      },
    ],
  },
  {
    id: 4,
    week: 11,
    name: "AI Draft Generation Approval",
    type: "feature",
    purpose: "Approve AI content generation approach before integrating",
    deliverables: [
      "Sample AI-generated drafts for 5 different opportunity types",
      "Side-by-side comparison: AI draft vs. broker-written email",
      "Demo of editing interface with full override capability",
      "Error handling when AI service is down or fails",
    ],
    successCriteria: [
      "AI drafts save time but don't feel robotic",
      "Brokers can easily edit to add personal touch",
      "Never sends anything without explicit human approval",
      "Gracefully falls back when AI unavailable",
    ],
    redFlags: [
      "'AI knows best' attitude bypassing human judgment",
      "Generated text that sounds like marketing spam",
      "Difficult-to-edit interface that discourages changes",
      "No fallback plan when API fails",
    ],
    criticalQuestions: [
      {
        q: "Read these 3 AI-generated drafts. Would you send them with minor edits?",
        good: "Sound human, personalized, avoid spam language",
        bad: "Robotic, generic, salesy",
      },
      {
        q: "Disconnect the OpenAI API. Now generate a draft. What happens?",
        good: "Clear message that AI is unavailable, template-based fallback offered",
        bad: "Crash, unhelpful error, or no fallback option",
      },
    ],
  },
  {
    id: 5,
    week: 14,
    name: "Go/No-Go Pilot Launch",
    type: "launch",
    purpose: "Decide if product is ready for pilot users",
    deliverables: [
      "End-to-end demo without errors",
      "Bug list with severity ratings and resolution plan",
      "Onboarding plan for first 3-5 pilot users",
      "Support plan: who answers questions, how to escalate",
    ],
    successCriteria: [
      "Complete workflow works without engineers present",
      "Critical bugs fixed, minor issues documented for post-launch",
      "Pilot users selected and onboarded",
      "Clear escalation path when things break",
    ],
    redFlags: [
      "'Just one more feature' before launch",
      "Unfixed bugs that block core workflows",
      "No plan for user training and support",
      "Engineers uncomfortable with users touching the product",
    ],
    criticalQuestions: [
      {
        q: "Run the full workflow 3 times in a row. Any errors?",
        good: "Works consistently every time",
        bad: "Fails > 20% of the time",
      },
      {
        q: "It's Monday at 9 AM, a pilot user emails that they can't log in. What happens?",
        good: "Clear escalation path, response within 1-2 hours",
        bad: "Um, they could email us?' or no clear process",
      },
    ],
  },
  {
    id: 6,
    week: 16,
    name: "MVP Launch Review",
    type: "retrospective",
    purpose: "Evaluate MVP success and prioritize next iteration",
    deliverables: [
      "Usage analytics: are pilot users logging in daily?",
      "User feedback synthesis: what's working, what's broken",
      "Technical health: uptime, performance, error rates",
      "Roadmap for next 8 weeks based on learnings",
    ],
    successCriteria: [
      "Users completing core workflows without constant support",
      "Positive feedback on time savings and workflow fit",
      "System stable with < 5% error rate",
      "Clear priorities for iteration based on real usage",
    ],
    redFlags: [
      "Users abandon after initial login",
      "No one sends emails (research but don't act)",
      "Frequent errors or crashes",
      "Negative feedback on data quality or ranking",
    ],
    criticalQuestions: [
      {
        q: "Did any users incorporate this into their daily routine?",
        good: "User A checks it every morning before calls",
        bad: "Most tried it a couple times then forgot",
      },
      {
        q: "What specific value did users get? Any examples?",
        good: "User B found a property they didn't know was expiring, sent outreach, got a meeting",
        bad: "They said it was nice' or no concrete examples",
      },
    ],
  },
];

// ============================================================================
// FLOWS & PROTOTYPES (Structure for Future Implementation)
// ============================================================================

export const flows = {
  userWorkflows: [
    {
      id: "flow-morning-routine",
      name: "Broker Morning Routine",
      description: "Sarah's complete morning workflow from login to first outreach",
      category: "user",
      steps: [
        {
          id: "step-1",
          name: "Login",
          actor: "Broker",
          action: "Opens dashboard",
          system: "Frontend loads priorities",
          data: ["User session", "Daily opportunities"],
          timing: "< 2 seconds",
        },
        {
          id: "step-2",
          name: "Scan Priorities",
          actor: "Broker",
          action: "Reviews top 15-20 opportunities",
          system: "Display ranked list with timing signals",
          data: ["Priority scores", "Timing signals", "Property names"],
          timing: "30-60 seconds",
        },
        {
          id: "step-3",
          name: "Understand Why Now",
          actor: "Broker",
          action: "Expands explanation for top opportunity",
          system: "Show timing signal details",
          data: ["Lease expiry date", "Owner activity", "Market context"],
          timing: "10 seconds",
        },
        {
          id: "step-4",
          name: "Research Property",
          actor: "Broker",
          action: "Clicks into property details",
          system: "Load comprehensive property context",
          data: ["Property details", "Ownership", "Financial", "Market"],
          timing: "< 3 seconds",
        },
        {
          id: "step-5",
          name: "Review Owner Context",
          actor: "Broker",
          action: "Views owner profile",
          system: "Load owner portfolio and relationship history",
          data: ["Portfolio", "Communication log", "Relationship strength"],
          timing: "< 3 seconds",
        },
        {
          id: "step-6",
          name: "Generate Draft",
          actor: "Broker",
          action: "Clicks 'Generate Draft'",
          system: "AI generates personalized email",
          data: ["Property context", "Owner context", "Timing signal"],
          timing: "< 5 seconds",
        },
        {
          id: "step-7",
          name: "Edit & Personalize",
          actor: "Broker",
          action: "Edits draft to add personal touch",
          system: "Rich text editor with auto-save",
          data: ["Draft text", "Auto-saved state"],
          timing: "1-2 minutes",
        },
        {
          id: "step-8",
          name: "Send",
          actor: "Broker",
          action: "Reviews and sends email",
          system: "SendGrid delivery + tracking setup",
          data: ["Email content", "Tracking ID"],
          timing: "< 2 seconds",
        },
      ],
      totalTiming: "5-10 minutes (vs. 30+ minutes without CREaiT)",
      value: "Reduces morning prep time by 70-80%",
    },
    // Additional flows can be added here
  ],

  systemFlows: [
    {
      id: "flow-data-ingestion",
      name: "Data Ingestion Pipeline",
      description: "Daily ETL process for property and owner data",
      category: "system",
      steps: [
        // Will be populated with ETL steps
      ],
    },
    // Additional system flows
  ],

  integrationFlows: [
    {
      id: "flow-email-tracking",
      name: "Email Tracking Flow",
      description: "SendGrid webhook processing for engagement tracking",
      category: "integration",
      steps: [
        // Will be populated with integration steps
      ],
    },
    // Additional integration flows
  ],
};

export const prototypes = {
  mvpScreens: [
    {
      id: "proto-dashboard",
      name: "Morning Prioritization Dashboard",
      description: "Main dashboard showing ranked opportunities",
      status: "draft", // draft | in-review | approved | built
      figmaUrl: null,
      screenshots: [],
      annotations: [],
      linkedStories: ["story-1-1", "story-1-2"],
    },
    {
      id: "proto-property-detail",
      name: "Property Context View",
      description: "Comprehensive property information page",
      status: "draft",
      figmaUrl: null,
      screenshots: [],
      annotations: [],
      linkedStories: ["story-2-1"],
    },
    {
      id: "proto-draft-composer",
      name: "AI Draft Generation & Editing",
      description: "Email composition interface with AI assistance",
      status: "draft",
      figmaUrl: null,
      screenshots: [],
      annotations: [],
      linkedStories: ["story-3-1", "story-3-2"],
    },
    // Additional prototypes to be added during design phase
  ],
};

// ============================================================================
// COMPREHENSIVE BUDGET BREAKDOWN
// ============================================================================

export const budgetBreakdown = {
  summary: {
    total: {
      min: 87000,
      max: 145000,
      recommended: {
        min: 110000,
        max: 125000,
      },
      currency: "USD",
    },
    duration: "12 weeks (3 months)",
    monthlyBurnRate: {
      min: 29000,
      max: 48000,
      average: 38500,
    },
    planningBenefits: {
      timeReduction: "25% (16 weeks → 12 weeks)",
      costReduction: "27.5% from comprehensive planning",
      savings: [
        "Reduced rework through clear specifications",
        "Prevented scope creep with defined boundaries",
        "Minimized Q&A overhead with detailed docs",
        "Enabled parallel work through modular design",
      ],
    },
  },

  scenarios: [
    {
      name: "Optimistic",
      total: 87000,
      probability: "25%",
      assumptions: [
        "Efficient execution at $100/hr with comprehensive planning benefits",
        "Minimal infrastructure costs ($300 over 3 months)",
        "Use all free/cheap data sources",
        "No major delays due to clear specifications",
        "Full 27.5% savings realized from documentation",
      ],
    },
    {
      name: "Realistic",
      total: {
        min: 110000,
        max: 125000,
      },
      probability: "60%",
      assumptions: [
        "Realistic contractor rates ($100-125/hr) with phased hiring",
        "Standard infrastructure ($525 over 3 months)",
        "MVP data sources only, defer premium services",
        "Minor scope adjustments within documented boundaries",
        "Planning benefits reduce rework by 20-25%",
      ],
    },
    {
      name: "Conservative",
      total: 135000,
      probability: "15%",
      assumptions: [
        "Higher rates ($125/hr) or extended hours (1,160 total)",
        "Maximum infrastructure usage ($750 over 3 months)",
        "Some premium data needed earlier than planned",
        "Some delays despite comprehensive documentation",
        "Partial planning benefits (~20% savings vs no planning)",
      ],
    },
  ],

  laborCosts: {
    total: {
      min: 87000,
      max: 145000,
    },
    hours: {
      min: 870,
      max: 1160,
      total: "870-1,160 hours over 12 weeks",
      savings: "27.5% reduction from comprehensive planning (was 1,200-1,600 hrs)",
    },
    rates: {
      min: 100,
      max: 125,
      unit: "per hour",
      rationale: "Realistic mid-market rates for skilled contractors",
    },
    phasedHiring: {
      description: "Contractors ramp up/down based on phase needs, not all working simultaneously",
      weeklyAllocation: [
        {
          weekRange: "1-2",
          focus: "Setup & UX Design",
          hoursPerWeek: 55,
          totalHours: 110,
          breakdown: "Designer 30 hrs, Backend 15 hrs, Data 10 hrs",
        },
        {
          weekRange: "3-5",
          focus: "Foundation Development",
          hoursPerWeek: 75,
          totalHours: 225,
          breakdown: "Frontend 25 hrs, Backend 25 hrs, Data 20 hrs, Designer 5 hrs",
        },
        {
          weekRange: "6-9",
          focus: "Core Features (Peak)",
          hoursPerWeek: 90,
          totalHours: 360,
          breakdown: "Frontend 30 hrs, Backend 30 hrs, Data 20 hrs, QA 10 hrs",
        },
        {
          weekRange: "10-12",
          focus: "Testing & Launch",
          hoursPerWeek: 85,
          totalHours: 255,
          breakdown: "Frontend 25 hrs, Backend 25 hrs, Data 10 hrs, QA 20 hrs, Designer 5 hrs",
        },
      ],
      grandTotal: "950 hours (midpoint of 870-1,160 range)",
    },
    ceoTime: {
      commitment: "50% time (~20 hours/week)",
      totalHours: "240 hours over 12 weeks",
      costModel: "Not included in contractor budget (opportunity cost)",
      criticalWindows: [
        "Weeks 1-2: UX design review and approval (10-15 hrs/week)",
        "Week 4-5: Data strategy validation (5-10 hrs/week)",
        "Week 6, 9: Feature checkpoint reviews (5-8 hrs/week)",
        "Week 11-12: Launch prep and pilot user onboarding (15-20 hrs/week)",
      ],
      recommendation: "Block calendar in advance for checkpoint meetings. Use async tools (Loom, Figma comments) to reduce sync time.",
      timeTracking: "CRITICAL: Track CEO hours weekly to ensure 50% commitment is sustainable. Budget can slip if CEO availability becomes bottleneck.",
    },
    byRole: [
      {
        role: "Frontend Engineer",
        percentage: 35,
        hours: { min: 305, max: 406 },
        cost: { min: 30500, max: 50750 },
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
        focus: "Dashboard, property views, email composer, rich text editor",
        peakWeeks: "6-9 (30 hrs/wk)",
      },
      {
        role: "Backend Engineer",
        percentage: 35,
        hours: { min: 305, max: 406 },
        cost: { min: 30500, max: 50750 },
        skills: ["Python", "FastAPI", "PostgreSQL", "Redis"],
        focus: "API endpoints, business logic, AI integration, email sending",
        peakWeeks: "6-9 (30 hrs/wk)",
      },
      {
        role: "Data Engineer",
        percentage: 20,
        hours: { min: 174, max: 232 },
        cost: { min: 17400, max: 29000 },
        skills: ["Python", "Pandas", "Airflow", "ETL"],
        focus: "ETL pipelines, data quality, source integrations",
        peakWeeks: "4-9 (20 hrs/wk)",
      },
      {
        role: "UI/UX Designer",
        percentage: 5,
        hours: { min: 44, max: 58 },
        cost: { min: 4400, max: 7250 },
        skills: ["Figma", "User Research", "Prototyping"],
        focus: "UX design, prototypes, design system (heavy Weeks 1-2: 30 hrs/wk)",
        peakWeeks: "1-2 (30 hrs/wk), then 5 hrs/wk",
      },
      {
        role: "Testing & QA",
        percentage: 5,
        hours: { min: 44, max: 58 },
        cost: { min: 4400, max: 7250 },
        skills: ["Jest", "Playwright", "Performance Testing"],
        focus: "Unit tests, E2E tests, bug fixes, performance optimization",
        peakWeeks: "10-12 (20 hrs/wk)",
      },
    ],
  },

  infrastructureCosts: {
    monthly: {
      min: 100,
      max: 250,
    },
    twelveWeekTotal: {
      min: 300,
      max: 750,
      note: "3 months of infrastructure costs during MVP development",
    },
    annual: {
      min: 1200,
      max: 3000,
    },
    services: [
      {
        name: "AWS RDS PostgreSQL",
        purpose: "Primary database (db.t3.micro, 20GB)",
        monthly: { min: 50, max: 100 },
        required: true,
      },
      {
        name: "AWS ElastiCache Redis",
        purpose: "Caching layer",
        monthly: { min: 20, max: 40 },
        required: true,
      },
      {
        name: "SendGrid",
        purpose: "Email delivery & tracking (50K emails)",
        monthly: { min: 15, max: 20 },
        required: true,
      },
      {
        name: "AWS Cognito",
        purpose: "Authentication",
        monthly: { min: 0, max: 25 },
        required: true,
      },
      {
        name: "Sentry",
        purpose: "Error monitoring",
        monthly: { min: 0, max: 26 },
        required: true,
      },
      {
        name: "AWS ECS/Fargate",
        purpose: "Container hosting",
        monthly: { min: 30, max: 50 },
        required: true,
      },
      {
        name: "CloudFront + S3",
        purpose: "Static assets & CDN",
        monthly: { min: 5, max: 10 },
        required: true,
      },
    ],
    scalingAssumptions: [
      "Database: < 10K properties, < 5K owners",
      "Concurrent users: < 20 simultaneous",
      "Daily API requests: < 50K requests/day",
      "Email volume: < 200 emails/day",
    ],
  },

  dataServicesCosts: {
    monthly: {
      min: 50,
      max: 200,
    },
    twelveWeekTotal: {
      min: 150,
      max: 600,
      note: "3 months of MVP data services (OpenAI API + Google Maps)",
    },
    mvpServices: [
      {
        name: "OpenAI API",
        purpose: "AI draft generation (pay-as-you-go)",
        monthly: { min: 50, max: 200 },
        required: true,
        notes: "Rate limiting: 10 requests/min per user",
      },
      {
        name: "Google Maps API",
        purpose: "Address geocoding",
        monthly: { min: 0, max: 50 },
        required: true,
        notes: "Free tier sufficient for MVP",
      },
    ],
    deferredPremiumSources: [
      {
        name: "CoStar API",
        purpose: "Property details, lease data",
        monthly: { min: 2000, max: 5000 },
        decision: "Defer to post-MVP",
      },
      {
        name: "ZoomInfo",
        purpose: "Contact enrichment",
        monthly: { min: 800, max: 2500 },
        decision: "Defer to post-MVP",
      },
      {
        name: "DataTree",
        purpose: "Deed records",
        monthly: { min: 200, max: 500 },
        decision: "Use free county sources for MVP",
      },
      {
        name: "Apollo.io",
        purpose: "Contact enrichment (cheaper alternative)",
        monthly: { min: 50, max: 100 },
        decision: "Consider post-MVP",
      },
    ],
  },

  phaseBreakdown: [
    {
      phase: 1,
      name: "Foundation & UX Design",
      weekRange: "1-3",
      duration: "3 weeks (compressed from 4)",
      labor: { min: 18500, max: 23125 },
      infrastructure: { min: 200, max: 500 },
      dataServices: { min: 100, max: 400 },
      total: { min: 18800, max: 24025 },
      engineeringLabor: { min: 15000, max: 20000, hours: "150-200 hrs @ $100/hr", description: "Frontend React components, database setup, basic CRUD operations" },
      totalWithEngineering: { min: 33800, max: 44025 },
      contractorHours: "185 hours (55 hrs/wk Weeks 1-2, 75 hrs/wk Week 3)",
      ceoHours: "30-45 hours (10-15 hrs/wk for UX review)",
      keyDeliverables: [
        "Development environment setup",
        "Database schema v1",
        "UX designs approved by CEO",
        "Sample dataset (50-100 properties)",
        "Component library foundations",
      ],
      criticalCheckpoint: "Week 2 - UX Design Approval (CEO required)",
    },
    {
      phase: 2,
      name: "Data Foundation Validation",
      weekRange: "4-5",
      duration: "2 weeks",
      labor: { min: 15000, max: 18750 },
      infrastructure: { min: 200, max: 500 },
      dataServices: { min: 100, max: 400 },
      total: { min: 15300, max: 19650 },
      engineeringLabor: { min: 12000, max: 16000, hours: "120-160 hrs @ $100/hr", description: "ETL pipeline, data quality monitoring, performance optimization" },
      totalWithEngineering: { min: 27300, max: 35650 },
      contractorHours: "150 hours (75 hrs/wk)",
      ceoHours: "10-20 hours (5-10 hrs/wk for data validation)",
      keyDeliverables: [
        "Automated ETL pipeline",
        "Data quality monitoring",
        "70%+ data completeness on critical fields",
        "Dashboard loading in < 2 seconds",
        "500+ properties in database",
      ],
      criticalCheckpoint: "Week 5 - Data Quality Validation (CEO required)",
    },
    {
      phase: 3,
      name: "Core Features Development",
      weekRange: "6-9",
      duration: "4 weeks (compressed from 5)",
      labor: { min: 36000, max: 45000 },
      infrastructure: { min: 400, max: 1000 },
      dataServices: { min: 200, max: 800 },
      total: { min: 36600, max: 46800 },
      engineeringLabor: { min: 28000, max: 36000, hours: "280-360 hrs @ $100/hr", description: "AI integration, email composition, tracking system, review/approval workflow" },
      totalWithEngineering: { min: 64600, max: 82800 },
      contractorHours: "360 hours (90 hrs/wk peak capacity)",
      ceoHours: "10-16 hours (5-8 hrs/wk for feature checkpoints)",
      keyDeliverables: [
        "AI draft generation working",
        "Email composition & sending",
        "Tracking (opens, clicks, replies)",
        "Review/approval workflow",
        "1,000+ properties in database",
      ],
      criticalCheckpoints: [
        "Week 6 - Dashboard Feature Review (CEO required)",
        "Week 9 - AI Draft Generation Approval (CEO required)",
      ],
    },
    {
      phase: 4,
      name: "Integration & Launch Prep",
      weekRange: "10-12",
      duration: "3 weeks (compressed from 5)",
      labor: { min: 25500, max: 31875 },
      infrastructure: { min: 200, max: 500 },
      dataServices: { min: 100, max: 400 },
      total: { min: 25800, max: 32775 },
      engineeringLabor: { min: 20000, max: 28000, hours: "200-280 hrs @ $100/hr", description: "E2E testing, bug fixes, deployment, documentation, pilot support" },
      totalWithEngineering: { min: 45800, max: 60775 },
      contractorHours: "255 hours (85 hrs/wk with heavy QA focus)",
      ceoHours: "45-60 hours (15-20 hrs/wk for launch prep and pilot onboarding)",
      keyDeliverables: [
        "Full E2E testing complete",
        "Documentation complete",
        "1-2 pilot users onboarded (Week 11)",
        "5-10 users ready for MVP launch (Week 12)",
        "System stable with 99% uptime",
      ],
      criticalCheckpoints: [
        "Week 11 - Go/No-Go for Pilot Launch (CEO required)",
        "Week 12 - MVP Launch Review (CEO required)",
      ],
    },
  ],

  monthlyBurnRate: [
    {
      month: 1,
      weekRange: "1-4",
      phase: "Phase 1 complete + Phase 2 start",
      labor: { min: 26000, max: 32500 },
      infrastructure: { min: 200, max: 500 },
      dataServices: { min: 100, max: 400 },
      total: { min: 26300, max: 33400 },
      contractorHours: "260 hours (ramp-up phase)",
      ceoHours: "30-55 hours",
      note: "Lower contractor hours during setup and design phase",
    },
    {
      month: 2,
      weekRange: "5-8",
      phase: "Phase 2 complete + Phase 3 peak begins",
      labor: { min: 34500, max: 43125 },
      infrastructure: { min: 200, max: 500 },
      dataServices: { min: 100, max: 400 },
      total: { min: 34800, max: 44025 },
      contractorHours: "345 hours (peak capacity)",
      ceoHours: "15-26 hours",
      note: "Peak contractor hours during core feature development",
    },
    {
      month: 3,
      weekRange: "9-12",
      phase: "Phase 3 complete + Phase 4 launch prep",
      labor: { min: 34500, max: 43125 },
      infrastructure: { min: 200, max: 500 },
      dataServices: { min: 100, max: 400 },
      total: { min: 34800, max: 44025 },
      contractorHours: "345 hours (sustained with QA focus)",
      ceoHours: "55-76 hours",
      note: "High CEO involvement for launch prep and pilot onboarding",
    },
  ],

  budgetGaps: [
    {
      item: "CEO Time Commitment",
      estimated: "50% time (~20 hours/week × 12 weeks = 240 hours)",
      status: "Not included in contractor budget (opportunity cost)",
      impact: "CRITICAL - CEO availability is the #1 risk. Checkpoints require CEO review, pilot onboarding needs CEO engagement.",
      recommendation: "Protect CEO calendar in advance. Use async tools (Loom, Figma) to reduce sync time. Track hours weekly - if CEO drops below 50%, timeline will slip.",
      risk: "If CEO time falls below 15 hrs/week, expect 2-4 week delays and $17K-27K additional costs",
    },
    {
      item: "Legal/Compliance Review",
      estimated: "$2,000 - $5,000 one-time",
      status: "Not budgeted",
      impact: "Required for Terms of Service, Privacy Policy, CAN-SPAM compliance before pilot launch",
      recommendation: "Budget for Week 10-11 legal review (before pilot users)",
    },
    {
      item: "User Research Incentives",
      estimated: "$500 - $1,000",
      status: "Not budgeted",
      impact: "Needed to incentivize broker participation in Week 11-12 pilot testing",
      recommendation: "Budget for gift cards ($50-100 per pilot user × 5-10 users)",
    },
    {
      item: "Contingency Buffer",
      estimated: "15-20% of total ($13K - $29K)",
      status: "Not explicitly included in $110-125K target",
      impact: "Cover unknowns, scope changes, delays. Realistic projects need 15-20% buffer.",
      recommendation: "Add $13K-$18K buffer to realistic scenario → $123K-$143K total",
    },
    {
      item: "Post-MVP Support (Week 13+)",
      estimated: "$10,000 - $21,000/month",
      status: "Not included in 12-week budget",
      impact: "Ongoing maintenance, support, iterations, bug fixes after launch",
      recommendation: "Plan separate budget. Consider transitioning 1-2 contractors to ongoing support (20-30 hrs/wk).",
    },
  ],

  costOptimization: [
    {
      category: "Comprehensive Planning (REALIZED)",
      strategy: "Detailed specs and documentation reduce waste",
      savings: { min: 23900, max: 102000, period: "total project" },
      realized: true,
      details: [
        "27.5% labor reduction: 1,200-1,600 hrs → 870-1,160 hrs",
        "Saved 330-440 hours of rework through clear specifications",
        "Prevented scope creep with defined phase boundaries",
        "Reduced Q&A overhead with comprehensive docs",
        "Enabled 25% timeline compression (16 weeks → 12 weeks)",
      ],
      note: "These savings are ALREADY APPLIED to the $87K-$145K budget",
    },
    {
      category: "Data Sources",
      strategy: "Start lean with free sources",
      savings: { min: 2250, max: 6000, period: "MVP period (3 months)" },
      details: [
        "Use free county websites and manual entry initially",
        "Defer CoStar ($2K-5K/month) until post-MVP validation",
        "Defer ZoomInfo ($800-2.5K/month) until post-MVP",
        "Evaluate premium sources only after MVP proves value",
      ],
    },
    {
      category: "Phased Hiring (REALIZED)",
      strategy: "Ramp contractors based on actual phase needs",
      savings: { min: 9000, max: 30000, period: "total project" },
      realized: true,
      details: [
        "Don't hire full team Day 1 - ramp up over 3-5 weeks",
        "Designer heavy in Weeks 1-2 (30 hrs/wk), then 5 hrs/wk",
        "QA starts Week 6, ramps to 20 hrs/wk in Weeks 10-12",
        "Avoid paying idle contractors during setup phases",
      ],
      note: "Already modeled in the phased hiring breakdown",
    },
    {
      category: "CEO Technical Contribution",
      strategy: "CEO absorbs some technical work with 50% time",
      savings: { min: 2000, max: 6250, period: "total project" },
      details: [
        "CEO can handle 20-50 hours of technical work themselves",
        "Product decisions, copywriting, basic testing, pilot onboarding",
        "Saves $100-125/hr contractor rates on these tasks",
        "Requires careful time tracking to avoid bottlenecks",
      ],
      note: "Optional optimization - CEO should track if they're taking on technical tasks",
    },
    {
      category: "Infrastructure",
      strategy: "Right-size and optimize",
      savings: { min: 150, max: 300, period: "MVP period (3 months)" },
      details: [
        "Use AWS Cognito instead of Auth0 (save $25/month)",
        "Use Sentry free tier initially (save $26/month)",
        "Start with smaller instances, scale as needed",
        "Implement auto-scaling to match actual usage",
      ],
    },
  ],

  postMvpProjections: {
    monthly: {
      engineering: { min: 9000, max: 18000, description: "Bug fixes (10-20 hrs/wk) + features (20-30 hrs/wk)" },
      infrastructure: { min: 200, max: 500, description: "Scaled for more users and data" },
      premiumData: { min: 550, max: 2500, description: "CoStar or alternatives + contact enrichment" },
      total: { min: 10000, max: 21000 },
    },
    considerations: [
      "May need full-time hire instead of contractors",
      "Premium data sources become necessary at scale",
      "Support and training costs increase with user base",
      "Infrastructure costs scale with usage",
    ],
  },

  recommendations: [
    {
      priority: "Critical",
      recommendation: "Target $110,000 - $125,000 base budget (realistic scenario)",
      rationale: "12-week timeline with phased hiring and 27.5% savings from comprehensive planning. Add $13K-18K contingency for total of $123K-143K.",
      action: "Secure $125K minimum to cover realistic scenario + legal + incentives + small buffer",
    },
    {
      priority: "Critical",
      recommendation: "Protect CEO 50% time commitment (20 hrs/week minimum)",
      rationale: "CEO is the #1 project risk. Need 240 hours over 12 weeks for checkpoints, decisions, pilot onboarding. If CEO drops below 15 hrs/week, expect 2-4 week delays and $17K-27K extra costs.",
      action: "Block CEO calendar NOW for critical windows: Weeks 1-2 (design), 5 (data), 6 & 9 (features), 11-12 (launch). Track hours weekly.",
    },
    {
      priority: "Critical",
      recommendation: "Implement hour tracking from Day 1",
      rationale: "Both CEO and contractors must track hours weekly. Early warning system for budget/timeline slippage. CEO time shortage is highest risk.",
      action: "Set up Toggl/Harvest for contractors. CEO tracks in calendar/spreadsheet. Review hours every Friday. Red flag if CEO < 15 hrs or contractors > 100 hrs/wk.",
    },
    {
      priority: "High",
      recommendation: "Hire contractors in phases, not all at once",
      rationale: "Phased hiring saves $9K-30K. Week 1-2: Designer only. Week 3-5: Add Frontend/Backend. Week 6+: Full team. Week 10-12: Ramp up QA.",
      action: "Negotiate flexible contracts with 2-week notice. Hire Designer first (Week 1), Backend/Data next (Week 2-3), Frontend Week 3, QA Week 6.",
    },
    {
      priority: "High",
      recommendation: "Start lean on data sources",
      rationale: "Use free sources initially ($100-250/month). Defer CoStar ($2K-5K/month) and ZoomInfo ($800-2.5K/month) until post-MVP. Saves $2K-6K during MVP.",
      action: "Manual entry from free county sites for MVP. Evaluate premium sources only after 10+ pilot users validate product-market fit.",
    },
    {
      priority: "Medium",
      recommendation: "Budget for gaps: Legal ($2-5K), Incentives ($0.5-1K), Contingency ($13-18K)",
      rationale: "Legal review required before pilot (Week 10-11). Pilot user incentives needed. 15% contingency is industry standard for unknowns.",
      action: "Add $15-24K to base budget for total of $125K-149K all-in",
    },
    {
      priority: "Medium",
      recommendation: "Plan post-MVP support budget separately",
      rationale: "After Week 12 launch, need $10K-21K/month for maintenance, iterations, support. Different financial model than MVP build.",
      action: "Transition 1-2 contractors to ongoing support (20-30 hrs/wk). Budget separately from MVP. Consider full-time hire at Month 6.",
    },
  ],

  serviceTierComparison: {
    description: "Compare Rationale's service tier options for CREaiT MVP delivery",
    tiers: [
      {
        name: "Rationale Planning + Integration Support",
        recommended: false,
        timeline: "12 weeks",
        totalCost: {
          min: 75000,
          max: 80000,
          note: "Includes product strategy, design, planning, and integration support",
        },
        rationaleScope: {
          hours: "400-500 hours across strategy, design, planning, and integration",
          team: "Product strategist, UX designer, technical architect, and senior integration engineers",
          deliverables: [
            "Product roadmap",
            "UX/UI design and design system",
            "16-week execution plan with 4 phases and CEO checkpoints",
            "Complete user stories with personas, workflows, and acceptance criteria",
            "Technical architecture specification (tech stack, data models, API design)",
            "Data strategy with ETL pipeline design and quality metrics",
            "Detailed budget breakdown with phased hiring model",
            "User flow diagrams and prototype mockups",
            "System integration engineering (API connections, data flow)",
            "Last-mile polish (performance optimization, edge cases)",
            "Production deployment and infrastructure setup",
            "Code review and architectural guidance",
            "QA oversight and testing strategy",
            "Technical documentation and risk analysis",
          ],
        },
        creaitRequirements: {
          team: "Internal engineering team or contractors",
          hours: "Significant core development work (hours vary by scope)",
          skills: "Full-stack development (React, Python, PostgreSQL), CRE domain knowledge",
        },
        breakdown: {
          rationaleLabor: { min: 75000, max: 80000, hours: "400-500 hrs @ $150-200/hr for strategy, design, planning, and integration" },
          creaitLabor: { min: 60000, max: 100000, hours: "Substantial engineering capacity (CREaiT hires separately)", note: "Not included in Rationale cost" },
          infrastructure: { min: 450, max: 1000, note: "CREaiT manages" },
          dataServices: { min: 300, max: 800, note: "CREaiT manages" },
        },
        pros: [
          "Lower Rationale cost: $75-80K (vs $110-125K full-service)",
          "Includes comprehensive product strategy, design, and planning",
          "CREaiT builds internal product knowledge and ownership through development",
          "More control over day-to-day development decisions",
          "Rationale provides critical strategy, design, planning, and integration expertise",
        ],
        cons: [
          "CREaiT must have or hire significant engineering capacity",
          "Higher total cost when including CREaiT's engineering: $135-180K",
          "Higher risk if CREaiT's team quality varies",
          "No parallel execution if CREaiT has small team",
          "CREaiT handles core development and project management",
          "Requires strong internal project coordination",
        ],
        risks: [
          "CREaiT's engineering team availability and skill level",
          "Integration complexity if architecture differs from plan",
          "Timeline delays if CREaiT team encounters technical challenges",
          "Quality inconsistency without full Rationale oversight",
          "Potential rework if CREaiT's code doesn't meet standards",
        ],
        outcome: "MVP in 12 weeks with variable quality depending on CREaiT's team. Requires CREaiT to have strong engineering capacity and project management.",
      },
      {
        name: "Rationale w/Additional Engineering",
        recommended: false,
        timeline: "12 weeks",
        totalCost: {
          min: 120000,
          max: 135000,
        },
        rationaleScope: {
          hours: "270-360 hours of additional engineering (beyond planning/integration)",
          team: "Engineering Integration Team",
          deliverables: [
            "Architecture design and technical documentation",
            "Full implementation of all MVP features",
            "UI/UX design system and all screens",
            "Data pipeline and ETL implementation",
            "Comprehensive testing (unit, integration, E2E)",
            "Production deployment and infrastructure setup",
            "Code review and quality assurance",
          ],
        },
        creaitRequirements: {
          team: "Minimal internal resources needed",
          hours: "~20 hrs/week for product oversight and checkpoint reviews",
          skills: "Product vision, domain expertise, user access",
        },
        breakdown: {
          rationaleLabor: { min: 87000, max: 145000, hours: "870-1,160 hrs @ $100-125/hr" },
          infrastructure: { min: 300, max: 750, note: "Managed by Rationale" },
          dataServices: { min: 150, max: 600, note: "Managed by Rationale" },
        },
        pros: [
          "Fastest time to market: 12 weeks to production-ready MVP",
          "Professional quality across all disciplines (frontend, backend, data, design, QA)",
          "Proven delivery process with comprehensive planning",
          "Parallel execution: multiple engineers working simultaneously",
          "Minimal CREaiT internal resources required",
          "Lower risk: Rationale has delivered similar projects",
          "Turnkey solution: CREaiT focuses on product and business",
        ],
        cons: [
          "Higher upfront investment: $110-125K",
          "Less day-to-day control over implementation details",
          "CREaiT team has less hands-on codebase knowledge initially",
        ],
        risks: [
          "CREaiT availability for checkpoints (need ~20 hrs/week)",
          "Scope changes during development",
          "Integration with CREaiT's existing systems",
        ],
        outcome: "Production-ready MVP in 12 weeks with professional quality. CREaiT can immediately begin pilot program with 5-10 users and start fundraising/sales.",
      },
    ],
    comparison: {
      title: "Service Tier Value Analysis",
      costDelta: {
        rationaleInvoice: {
          fullService: "$120-135K",
          supportOnly: "$75-80K (strategy, design, planning, integration)",
          difference: "$40-60K less for support tier",
          note: "Support tier includes full strategy/design/planning but CREaiT handles core development",
        },
        totalValue: {
          fullService: "$120-135K (planning + engineering + integration)",
          supportOnly: "$75-80K (strategy + design + planning + integration)",
          difference: "Lower Rationale cost, but full-service includes all development",
        },
        trueProjectCost: {
          fullService: "$120-135K (Rationale handles everything)",
          supportOnly: "$135-180K (Rationale strategy/design/planning/integration + CREaiT engineering $60-100K)",
          difference: "Full-service comparable cost but significantly faster and lower risk",
        },
      },
      timelineDelta: {
        fullService: "12 weeks",
        supportOnly: "12 weeks",
        difference: "Same timeline with both options",
      },
      workload: {
        fullService: "CREaiT: ~240 hrs oversight | Rationale: 870-1,160 hrs delivery",
        supportOnly: "CREaiT: Substantial core development work | Rationale: 400-500 hrs strategy/design/planning/integration",
      },
      valueProp: [
        "Full-service includes 470-660 more hours of specialized engineering",
        "Both options target same 12-week timeline",
        "Full-service reduces risk through proven delivery process and direct oversight",
        "Support-only requires CREaiT to find, manage, and coordinate substantial engineering capacity",
        "Support-only total project cost ($135-180K) may exceed full-service ($120-135K)",
      ],
      recommendation: {
        scenario: "Choose Full-Service if...",
        conditions: [
          "CREaiT lacks internal engineering capacity",
          "CREaiT wants to minimize risk and maximize quality",
          "CREaiT prefers to focus on product and business vs managing contractors",
          "Lower total project cost is priority ($120-135K vs $135-180K)",
        ],
      },
      alternativeScenario: {
        scenario: "Choose Integration Support if...",
        conditions: [
          "CREaiT has proven internal engineering team or trusted contractors",
          "CREaiT wants maximum control and internal knowledge",
          "Building internal product expertise is priority",
          "Lower Rationale invoice is priority ($75-80K vs $120-135K)",
        ],
      },
    },
  },
};

// ============================================================================
// FLOW DIAGRAMS (Mermaid.js)
// ============================================================================

export const flowDiagrams = {
  morningRoutine: `
    flowchart TD
      A[Broker Logs In] --> B[Dashboard Loads<br/>Prioritized Opportunities]
      B --> C{Scan Top 15-20<br/>Opportunities}
      C --> D[Click Opportunity]
      D --> E[Expand 'Why Now?'<br/>Explanation]
      E --> F[View Property Details<br/>3 seconds]
      F --> G[View Owner Context<br/>3 seconds]
      G --> H{Decide to<br/>Pursue?}
      H -->|No| C
      H -->|Yes| I[Click 'Generate Draft']
      I --> J[AI Generates Email<br/>5 seconds]
      J --> K[Edit & Personalize<br/>1-2 minutes]
      K --> L{Review<br/>Required?}
      L -->|Yes| M[Submit for Review]
      L -->|No| N[Send Email]
      M --> O[Senior Reviews]
      O --> P{Approved?}
      P -->|Yes| N
      P -->|No| Q[Request Changes]
      Q --> K
      N --> R[Track Engagement<br/>Opens, Clicks, Replies]

      style A fill:#E0E7FF
      style B fill:#DBEAFE
      style I fill:#FEF3C7
      style J fill:#FEF3C7
      style N fill:#D1FAE5
      style R fill:#D1FAE5
  `,

  dataIngestion: `
    flowchart LR
      A[Daily Trigger<br/>2:00 AM] --> B[Extract Phase<br/>1-2 hours]
      B --> B1[Pull CRM Data<br/>30 min]
      B --> B2[Scrape County Records<br/>45 min]
      B --> B3[Pull CoStar/Crexi<br/>30 min]
      B --> B4[Sync Email Tracking<br/>15 min]

      B1 --> C[Transform Phase<br/>30-60 min]
      B2 --> C
      B3 --> C
      B4 --> C

      C --> C1[Deduplicate Entities<br/>15 min]
      C --> C2[Standardize Addresses<br/>15 min]
      C --> C3[Calculate Scores<br/>20 min]
      C --> C4[Quality Validation<br/>10 min]

      C1 --> D[Load Phase<br/>15-30 min]
      C2 --> D
      C3 --> D
      C4 --> D

      D --> D1[Upsert PostgreSQL<br/>20 min]
      D --> D2[Update Redis Cache<br/>5 min]
      D --> D3[Re-rank Opportunities<br/>5 min]

      D1 --> E[Post-Process<br/>15 min]
      D2 --> E
      D3 --> E

      E --> E1[Calculate Priority Scores<br/>10 min]
      E --> E2[Generate Quality Report<br/>5 min]

      E1 --> F[Dashboard Ready<br/>by 6:00 AM]
      E2 --> F

      style A fill:#FEF3C7
      style B fill:#DBEAFE
      style C fill:#E0E7FF
      style D fill:#FDE68A
      style E fill:#FCA5A5
      style F fill:#D1FAE5
  `,

  reviewApproval: `
    flowchart TD
      A[Junior Broker<br/>Drafts Email] --> B{Needs<br/>Review?}
      B -->|No| C[Send Directly]
      B -->|Yes| D[Click 'Submit<br/>for Review']
      D --> E[Draft Enters<br/>Review Queue]
      E --> F[Senior Notified<br/>Slack + Email]
      F --> G[Senior Opens<br/>Review Modal]
      G --> H[See Draft +<br/>Full Context]
      H --> I{Decision}
      I -->|Approve| J[Notification to Author]
      I -->|Request Changes| K[Add Comments]
      I -->|Reject| L[Add Rejection Reason]
      J --> M[Author Can Send]
      K --> N[Author Sees Comments]
      L --> O[Author Notified]
      N --> P[Make Edits]
      P --> Q[Resubmit]
      Q --> E
      M --> R[Email Sent]
      R --> S[Track in History]

      style A fill:#E0E7FF
      style D fill:#FEF3C7
      style F fill:#FCA5A5
      style J fill:#D1FAE5
      style K fill:#FED7AA
      style L fill:#FECACA
      style R fill:#D1FAE5
  `,

  dataQualityAssessment: `
    flowchart TD
      A[Property Record] --> B{Completeness<br/>Check}
      B --> B1[Critical Fields<br/>40% weight]
      B --> B2[Standard Fields<br/>30% weight]
      B --> B3[Optional Fields<br/>30% weight]

      B1 --> C1{Has Address?}
      B1 --> C2{Has Owner?}
      B1 --> C3{Has Property Type?}

      B2 --> D1{Has Lease Data?}
      B2 --> D2{Has Contact Info?}
      B2 --> D3{Has Last Sale?}

      B3 --> E1{Has Property Photo?}
      B3 --> E2{Has Market Data?}
      B3 --> E3{Has Comps?}

      C1 --> F[Calculate Score]
      C2 --> F
      C3 --> F
      D1 --> F
      D2 --> F
      D3 --> F
      E1 --> F
      E2 --> F
      E3 --> F

      F --> G{Score<br/>Range?}
      G -->|80-100| H[High Quality<br/>Green Badge]
      G -->|50-79| I[Medium Quality<br/>Yellow Badge]
      G -->|0-49| J[Low Quality<br/>Red Badge]

      H --> K[Calculate<br/>Freshness]
      I --> K
      J --> K

      K --> L{Updated<br/>When?}
      L -->|< 30 days| M[Fresh +10]
      L -->|30-90 days| N[Stale +0]
      L -->|> 90 days| O[Old -10]

      M --> P[Final Score]
      N --> P
      O --> P

      P --> Q[Display Badge<br/>on Property]

      style A fill:#E0E7FF
      style H fill:#D1FAE5
      style I fill:#FEF3C7
      style J fill:#FECACA
      style Q fill:#DBEAFE
  `,

  omGeneration: `
    flowchart TD
      A[Broker Clicks<br/>'Generate OM'] --> B[Select OM Type]
      B --> C{Type?}
      C -->|Investment| D[Investment Template]
      C -->|Tenant| E[Tenant Template]
      C -->|Listing| F[Listing Template]

      D --> G[Gather Property Data]
      E --> G
      F --> G

      G --> G1[Property Details<br/>Size, Type, Location]
      G --> G2[Financial Data<br/>NOI, Cap Rate, IRR]
      G --> G3[Market Analysis<br/>Comps, Trends]
      G --> G4[Photos & Maps]

      G1 --> H[AI Content Generation<br/>LangChain + GPT-4]
      G2 --> H
      G3 --> H
      G4 --> H

      H --> I[Generate Sections]
      I --> I1[Executive Summary]
      I --> I2[Property Overview]
      I --> I3[Location & Market]
      I --> I4[Financial Analysis]
      I --> I5[Investment Highlights]

      I1 --> J[Show Preview<br/>Editable Interface]
      I2 --> J
      I3 --> J
      I4 --> J
      I5 --> J

      J --> K{Review<br/>Content}
      K -->|Edit Sections| L[Make Changes]
      L --> J
      K -->|Regenerate Section| M[AI Re-generates]
      M --> J
      K -->|Approve| N[Generate PDF<br/>ReportLab/WeasyPrint]

      N --> O[Apply Template<br/>Styling]
      O --> P[Insert Photos<br/>& Maps]
      P --> Q[Add Branding]
      Q --> R[Final PDF Ready]
      R --> S[Download PDF]
      S --> T[Save to History]

      style A fill:#E0E7FF
      style H fill:#FEF3C7
      style J fill:#DBEAFE
      style N fill:#FED7AA
      style S fill:#D1FAE5
  `,
};

// ============================================================================
// EXPORT ALL
// ============================================================================

export const creaitDocs = {
  project: projectOverview,
  summary: executiveSummary,
  userStories,
  architecture: technicalArchitecture,
  data: dataStrategy,
  execution: executionPlan,
  checkpoints,
  flows,
  prototypes,
  budget: budgetBreakdown,
};
