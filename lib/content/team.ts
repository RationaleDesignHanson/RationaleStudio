/**
 * Team Content Layer
 *
 * All team portal content for internal operations
 * Updated December 2024
 */

export const teamContent = {
  dashboard: {
    welcome: {
      title: "Team Operations Dashboard",
      subtitle: "Internal hub for projects, documentation, and system administration",
      description: "Access all active projects, internal documentation, and admin tools in one place. Team members have full visibility into portfolio development and operational processes.",
    },

    quickStats: [
      {
        label: "Active Projects",
        value: "3",
        subtext: "Zero, Atlas, Amplify",
        icon: "🚀",
        trend: "+1 this quarter",
      },
      {
        label: "Team Members",
        value: "4",
        subtext: "1 owner, 3 team",
        icon: "👥",
        trend: "Stable",
      },
      {
        label: "Documentation",
        value: "24",
        subtext: "Guides & playbooks",
        icon: "📚",
        trend: "+6 this month",
      },
      {
        label: "System Health",
        value: "100%",
        subtext: "All systems operational",
        icon: "✅",
        trend: "No incidents",
      },
    ],

    activeProjects: [
      {
        name: "Zero",
        status: "Beta · Dogfooding",
        progress: 85,
        owner: "Matt Hanson",
        nextMilestone: "Public launch prep",
        dueDate: "Q1 2025",
        priority: "high",
        team: ["Matt", "Design contractor", "QA contractor"],
      },
      {
        name: "Atlas",
        status: "Blueprint Complete",
        progress: 35,
        owner: "Matt Hanson",
        nextMilestone: "Strategic partner identification",
        dueDate: "Q1-Q2 2025",
        priority: "medium",
        team: ["Matt"],
      },
      {
        name: "Amplify",
        status: "Blueprint Complete",
        progress: 30,
        owner: "Matt Hanson",
        nextMilestone: "Sports agency partner outreach",
        dueDate: "Q1-Q2 2025",
        priority: "medium",
        team: ["Matt"],
      },
    ],

    recentActivity: [
      {
        date: "Dec 8, 2024",
        action: "Phase 6 Complete: Partner Portal launched",
        user: "Matt",
        type: "milestone",
      },
      {
        date: "Dec 8, 2024",
        action: "Phase 5 Complete: Investor Portal updated",
        user: "Matt",
        type: "milestone",
      },
      {
        date: "Dec 8, 2024",
        action: "Phase 4 Complete: Authentication security fixed",
        user: "Matt",
        type: "security",
      },
      {
        date: "Dec 6, 2024",
        action: "Phase 3 Complete: Content migration finished",
        user: "Matt",
        type: "milestone",
      },
      {
        date: "Dec 5, 2024",
        action: "Phase 2 Complete: Homepage restructured",
        user: "Matt",
        type: "milestone",
      },
    ],
  },

  projects: {
    hero: {
      title: "Active Projects",
      subtitle: "Portfolio development tracking and project management",
      description: "All active ventures with detailed status, milestones, and team assignments. Use this dashboard to track progress and coordinate across projects.",
    },

    projects: [
      {
        id: "zero",
        name: "Zero Inbox",
        tagline: "AI email triage for busy parents",
        status: "Beta · Dogfooding",
        stage: "Pre-Launch",
        progress: 85,

        team: {
          owner: "Matt Hanson",
          roles: [
            { role: "Product & Engineering", name: "Matt Hanson", type: "Full-time" },
            { role: "UI/UX Design", name: "Contract Designer", type: "Contract" },
            { role: "QA Testing", name: "Contract QA", type: "Contract" },
          ],
        },

        timeline: {
          started: "Aug 2024",
          betaLaunch: "Dec 2024",
          publicLaunch: "Q1 2025",
          targetMRR: "$50K by Jul 2025",
        },

        milestones: [
          { name: "iOS App Complete", status: "completed", date: "Nov 2024" },
          { name: "10 Microservices Live", status: "completed", date: "Nov 2024" },
          { name: "Beta Launch", status: "completed", date: "Dec 2024" },
          { name: "50 Beta Users", status: "in-progress", date: "Jan 2025" },
          { name: "Public Launch", status: "pending", date: "Q1 2025" },
          { name: "$10K MRR", status: "pending", date: "Q2 2025" },
          { name: "$50K MRR", status: "pending", date: "Q3 2025" },
        ],

        metrics: {
          architecture: "268 Swift files, 10 microservices",
          aiAccuracy: "91.7% classification accuracy",
          users: "15 beta users (target: 50)",
          retention: "TBD (launching soon)",
        },

        nextSteps: [
          "Expand beta to 50 users",
          "Collect 30+ feedback sessions",
          "Prepare App Store listing",
          "Set up Stripe billing",
          "Plan public launch campaign",
        ],

        links: {
          github: "#",
          figma: "#",
          notion: "#",
          linear: "#",
        },
      },
      {
        id: "atlas",
        name: "Project Atlas",
        tagline: "CRE intelligence platform",
        status: "Pipeline Q1-Q2 2025",
        stage: "Blueprint Complete",
        progress: 35,

        team: {
          owner: "Matt Hanson",
          roles: [
            { role: "Product Strategy", name: "Matt Hanson", type: "Full-time" },
            { role: "Strategic Partner", name: "TBD", type: "Partner" },
          ],
        },

        timeline: {
          blueprintComplete: "Nov 2024",
          partnerIdentification: "Q1 2025",
          buildStart: "Q1-Q2 2025",
          mvpLaunch: "Q2-Q3 2025",
        },

        milestones: [
          { name: "Technical Blueprint", status: "completed", date: "Nov 2024" },
          { name: "103KB Documentation", status: "completed", date: "Nov 2024" },
          { name: "CRE Partner Identified", status: "in-progress", date: "Q1 2025" },
          { name: "Pilot Customer Secured", status: "pending", date: "Q1 2025" },
          { name: "Build Kickoff", status: "pending", date: "Q1-Q2 2025" },
          { name: "MVP Launch", status: "pending", date: "Q2-Q3 2025" },
        ],

        metrics: {
          documentation: "103KB complete architecture",
          market: "Commercial real estate brokerages",
          budget: "$165K recommended MVP",
          timeline: "12 weeks to production",
        },

        nextSteps: [
          "Identify 2-3 CRE strategic partners",
          "Present partner opportunity to prospects",
          "Secure pilot customer commitments",
          "Finalize co-build partnership terms",
          "Schedule build kickoff",
        ],

        links: {
          blueprint: "#",
          figma: "#",
          notion: "#",
        },
      },
      {
        id: "amplify",
        name: "Project Amplify",
        tagline: "NIL + recruiting for sports agents",
        status: "Pipeline Q1-Q2 2025",
        stage: "Blueprint Complete",
        progress: 30,

        team: {
          owner: "Matt Hanson",
          roles: [
            { role: "Product Strategy", name: "Matt Hanson", type: "Full-time" },
            { role: "Sports Partner", name: "TBD", type: "Partner" },
          ],
        },

        timeline: {
          blueprintComplete: "Nov 2024",
          partnerIdentification: "Q1 2025",
          buildStart: "Q1-Q2 2025",
          mvpLaunch: "Q2-Q3 2025",
        },

        milestones: [
          { name: "Technical Blueprint", status: "completed", date: "Nov 2024" },
          { name: "129KB Documentation", status: "completed", date: "Nov 2024" },
          { name: "4-Module Architecture", status: "completed", date: "Nov 2024" },
          { name: "Sports Agency Partner", status: "in-progress", date: "Q1 2025" },
          { name: "Pilot Agency Secured", status: "pending", date: "Q1 2025" },
          { name: "Build Kickoff", status: "pending", date: "Q1-Q2 2025" },
        ],

        metrics: {
          documentation: "129KB complete blueprint",
          market: "Sports agencies, athlete management",
          budget: "$60-80K pilot, $200-250K full",
          timeline: "16 weeks to MVP",
        },

        nextSteps: [
          "Map sports agency partner network",
          "Present Amplify opportunity to agencies",
          "Secure 1-2 pilot agency commitments",
          "Finalize co-build + GTM partnership",
          "Schedule build kickoff",
        ],

        links: {
          blueprint: "#",
          figma: "#",
          notion: "#",
        },
      },
    ],

    statusLegend: {
      "completed": { color: "green", description: "Milestone achieved" },
      "in-progress": { color: "blue", description: "Currently working on" },
      "pending": { color: "gray", description: "Not yet started" },
      "blocked": { color: "red", description: "Waiting on dependency" },
    },
  },

  documentation: {
    hero: {
      title: "Internal Documentation",
      subtitle: "Playbooks, processes, and knowledge base for team operations",
      description: "Centralized repository of operational knowledge, development processes, and best practices.",
    },

    categories: [
      {
        name: "Development Processes",
        icon: "⚙️",
        description: "Engineering workflows, code standards, deployment procedures",
        docs: [
          { title: "Git Workflow & Branching Strategy", lastUpdated: "Dec 2024" },
          { title: "Code Review Guidelines", lastUpdated: "Nov 2024" },
          { title: "TypeScript Style Guide", lastUpdated: "Nov 2024" },
          { title: "Testing Standards (Unit/Integration/E2E)", lastUpdated: "Oct 2024" },
          { title: "Deployment Checklist (Netlify)", lastUpdated: "Dec 2024" },
          { title: "Firebase Admin SDK Setup", lastUpdated: "Dec 2024" },
        ],
      },
      {
        name: "Product Development",
        icon: "🚀",
        description: "Product strategy, roadmapping, and validation processes",
        docs: [
          { title: "Product Definition Template", lastUpdated: "Nov 2024" },
          { title: "User Research Guidelines", lastUpdated: "Oct 2024" },
          { title: "Feature Prioritization Framework", lastUpdated: "Oct 2024" },
          { title: "MVP Scoping Methodology", lastUpdated: "Sep 2024" },
          { title: "Beta Launch Checklist", lastUpdated: "Dec 2024" },
        ],
      },
      {
        name: "Operations",
        icon: "📊",
        description: "Business operations, finance, legal, HR processes",
        docs: [
          { title: "Quarterly Review Process", lastUpdated: "Dec 2024" },
          { title: "Partner Onboarding Checklist", lastUpdated: "Dec 2024" },
          { title: "Contractor Management Guide", lastUpdated: "Nov 2024" },
          { title: "Financial Reporting Schedule", lastUpdated: "Nov 2024" },
          { title: "Legal Document Templates", lastUpdated: "Oct 2024" },
        ],
      },
      {
        name: "Marketing & Sales",
        icon: "📈",
        description: "Marketing strategies, sales processes, customer success",
        docs: [
          { title: "Content Marketing Strategy", lastUpdated: "Nov 2024" },
          { title: "Sales Call Script (Kits)", lastUpdated: "Oct 2024" },
          { title: "Customer Onboarding Flow", lastUpdated: "Sep 2024" },
          { title: "Case Study Creation Process", lastUpdated: "Nov 2024" },
        ],
      },
      {
        name: "Design System",
        icon: "🎨",
        description: "Design standards, component library, brand guidelines",
        docs: [
          { title: "Brand Guidelines 2024", lastUpdated: "Dec 2024" },
          { title: "Component Library (Rationale Kits)", lastUpdated: "Nov 2024" },
          { title: "ASCII Component Standards", lastUpdated: "Dec 2024" },
          { title: "Color System & Theming", lastUpdated: "Nov 2024" },
          { title: "Typography Scale", lastUpdated: "Oct 2024" },
        ],
      },
      {
        name: "Security & Compliance",
        icon: "🔒",
        description: "Security protocols, compliance requirements, incident response",
        docs: [
          { title: "Security Best Practices", lastUpdated: "Dec 2024" },
          { title: "Firebase Security Rules", lastUpdated: "Dec 2024" },
          { title: "Data Privacy Policy", lastUpdated: "Nov 2024" },
          { title: "Incident Response Plan", lastUpdated: "Oct 2024" },
        ],
      },
    ],
  },

  admin: {
    hero: {
      title: "Admin Tools",
      subtitle: "User management and system administration",
      description: "Manage team members, access controls, and system settings. Owner and team roles only.",
    },

    userManagement: {
      title: "User Management",
      description: "Add, edit, or remove team members and manage role-based access",
      currentUsers: [
        {
          name: "Matt Hanson",
          email: "matt@rationale.work",
          role: "owner",
          status: "active",
          lastLogin: "Dec 8, 2024",
          joinedDate: "Jan 2024",
        },
      ],
      roles: [
        {
          name: "Owner",
          permissions: "Full access to all portals and admin functions",
          count: 1,
        },
        {
          name: "Team",
          permissions: "Access to team, partner, and investor portals. Can manage projects and documentation.",
          count: 0,
        },
        {
          name: "Partner",
          permissions: "Access to partner portal. Can view ventures, participate in voting, access resources.",
          count: 0,
        },
        {
          name: "Investor",
          permissions: "Access to investor portal. Can view investment opportunities and portfolio metrics.",
          count: 0,
        },
      ],
    },

    systemSettings: {
      title: "System Settings",
      categories: [
        {
          name: "Authentication",
          settings: [
            { name: "Firebase Admin SDK", status: "Requires Setup", action: "Configure" },
            { name: "Session Cookie Duration", value: "7 days", action: "Edit" },
            { name: "Password Policy", value: "Standard", action: "Edit" },
          ],
        },
        {
          name: "Email Notifications",
          settings: [
            { name: "Team Activity Digest", status: "Enabled", action: "Configure" },
            { name: "Project Milestone Alerts", status: "Enabled", action: "Configure" },
            { name: "Security Alerts", status: "Enabled", action: "Configure" },
          ],
        },
        {
          name: "Integrations",
          settings: [
            { name: "GitHub", status: "Connected", action: "Manage" },
            { name: "Figma", status: "Not Connected", action: "Connect" },
            { name: "Notion", status: "Not Connected", action: "Connect" },
            { name: "Linear", status: "Not Connected", action: "Connect" },
          ],
        },
      ],
    },

    analytics: {
      title: "System Analytics",
      description: "Platform usage and performance metrics",
      metrics: [
        {
          category: "Portal Usage",
          data: [
            { label: "Total Sessions (30d)", value: "127" },
            { label: "Unique Users (30d)", value: "4" },
            { label: "Avg Session Duration", value: "12m 34s" },
          ],
        },
        {
          category: "Project Activity",
          data: [
            { label: "Active Projects", value: "3" },
            { label: "Completed Milestones (30d)", value: "8" },
            { label: "Documentation Updates (30d)", value: "6" },
          ],
        },
        {
          category: "System Health",
          data: [
            { label: "Uptime (30d)", value: "100%" },
            { label: "API Response Time", value: "247ms" },
            { label: "Error Rate", value: "0.02%" },
          ],
        },
      ],
    },
  },
};
