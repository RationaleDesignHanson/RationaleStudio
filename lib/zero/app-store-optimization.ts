/**
 * Zero App Store Optimization (ASO)
 *
 * Optimized metadata, copy, and keywords for Zero's App Store presence
 * Based on ASO best practices and competitive analysis
 */

export interface AppStoreMetadata {
  appName: string;
  subtitle: string;
  promotionalText: string;
  description: string;
  keywords: string[];
  whatsNew: string;
  categories: {
    primary: string;
    secondary: string;
  };
  screenshots: {
    title: string;
    description: string;
    callout: string;
  }[];
  searchKeywords: string[];
}

/**
 * Primary App Store Metadata (Character limits enforced)
 */
export const appStoreMetadata: AppStoreMetadata = {
  // App Name (30 characters max) - Includes main keyword
  appName: "Zero: AI Email Actions",

  // Subtitle (30 characters max) - Secondary keywords + value prop
  subtitle: "Inbox Zero, No Reading",

  // Promotional Text (170 characters max) - Seasonal/timely messaging
  promotionalText: "Beta: Join early testers using AI to achieve Inbox Zero. Extract actions from emails automatically. Limited spots available for systematic beta rollout.",

  // Description (4000 characters max)
  description: `STOP READING EMAILS. START ACTING ON THEM.

Your inbox has 47 emails. Buried inside: a bill due tomorrow, a package arriving today, and a permission slip you need to sign. Zero's AI finds these actions automatically and puts them in swipeable cards.

No more scanning through emails. No more missing deadlines. Just swipe and act.

HOW ZERO WORKS

Zero connects to your Gmail with read-only access. Our AI processes your emails and extracts actionable items:

→ Bills to pay
→ Packages to track
→ Forms to sign
→ Events to RSVP
→ Appointments to confirm
→ Deadlines to remember

Everything appears in swipeable cards, sorted into Mail and Ads. Swipe right to act, left to archive, down to snooze.

CORE FEATURES

• AI Action Extraction - 43 intent categories across 7 domains
• Gmail Integration - Secure OAuth 2.0, read-only access
• Swipeable Cards - Tinder-like interface for email triage
• Smart Sorting - Automatic Mail vs Ads classification
• Action Tracking - See what needs your attention right now
• Privacy First - No email content stored on servers
• Native iOS - Built for iPhone with dark mode support

WHAT MAKES ZERO DIFFERENT

Email apps organize your inbox. Zero extracts what matters. We use advanced AI to understand email intent and pull out actionable items automatically.

You don't need to read promotional emails to know there's a package arriving. You don't need to scan newsletters to find event RSVPs. Zero does this for you.

BUILT FOR BUSY PROFESSIONALS

→ Parents: Permission slips, school updates, activity schedules
→ Executives: Meeting requests, approvals, contract reviews
→ Shoppers: Order confirmations, shipping updates, delivery notices
→ Travelers: Booking confirmations, check-in reminders, itinerary changes

PRIVACY & SECURITY

• Read-only Gmail access via OAuth 2.0
• No email content stored on our servers
• All data encrypted in transit and at rest
• GDPR and CCPA compliant
• Revoke access anytime from Gmail settings

SYSTEMATIC BETA PROGRAM

Zero is in systematic beta testing with 4-cohort rollout strategy. We're scaling carefully to ensure 95%+ AI accuracy before public launch.

Early beta testers get:
→ Direct feedback channel to product team
→ Influence on feature development
→ Early access to new capabilities
→ Beta pricing lock-in for first year

AI ACCURACY COMMITMENT

We're committed to 95%+ accuracy across:
• Email classification (Mail vs Ads)
• Intent recognition (43 categories)
• Action extraction (dates, amounts, tracking numbers)
• Smart replies and suggestions

Beta program includes systematic AI tuning based on real user feedback.

WHO BUILT THIS

Zero is built by Rationale, a product studio with 7+ years of AR/AI experience from Meta Reality Labs. Same technical depth and execution speed we bring to enterprise clients.

We built Zero to prove we can ship conviction-backed products at speed. This is how we work.

REQUIREMENTS

• iPhone running iOS 15 or later
• Active Gmail account
• Internet connection for AI processing

WHAT'S NEXT

After beta validation:
→ Android support
→ Outlook/Exchange integration
→ Calendar integration for automatic event adding
→ Contact management
→ Smart reply suggestions
→ Custom action workflows

Download Zero and join our beta program. Help us build the future of email management.

---

Questions or feedback? Email us at hello@rationale.work

Beta spots are limited. Download now to secure your place in Cohort 1.`,

  // Keywords (100 characters max, comma-separated)
  keywords: [
    "email",
    "inbox zero",
    "gmail",
    "productivity",
    "AI",
    "tasks",
    "actions",
    "mail",
    "organizer",
    "triage",
    "automation",
    "assistant"
  ],

  // What's New (4000 characters max) - Update with each version
  whatsNew: `Welcome to Zero Beta v1.0!

BETA PROGRAM LAUNCH
→ Systematic 4-cohort rollout starting with Friends & Family
→ Direct feedback channel to product team
→ 8-week checkpoint for quality validation

CORE FEATURES
→ AI action extraction from Gmail
→ 43 intent categories across 7 domains
→ Swipeable card interface (right=act, left=archive, down=snooze)
→ Automatic Mail vs Ads classification
→ Read-only Gmail OAuth integration

WHAT TO EXPECT
→ 85% baseline AI accuracy (improving to 95%+ through your feedback)
→ Regular updates based on beta tester input
→ Some emails may be misclassified during early beta
→ Response times under 5 seconds for most operations

KNOWN LIMITATIONS
→ iOS only (Android coming in future)
→ Gmail only (Outlook support planned)
→ English language only (internationalization planned)
→ Limited action types (expanding based on feedback)

YOUR FEEDBACK MATTERS
Use the in-app feedback button to report:
→ Misclassified emails
→ Incorrect action extraction
→ Feature requests
→ UX improvements

Thank you for being an early tester. Your feedback directly shapes Zero's development.

---

Next Update: Week 4
→ Improved classification accuracy
→ Additional intent categories
→ Performance optimizations
→ Bug fixes from beta feedback`,

  // Categories
  categories: {
    primary: "Productivity",
    secondary: "Business"
  },

  // Screenshot Metadata (for 6.7" iPhone)
  screenshots: [
    {
      title: "Actions From Your Inbox",
      description: "AI extracts bills, packages, events, and deadlines",
      callout: "No reading required"
    },
    {
      title: "Swipe to Act",
      description: "Right to complete, left to archive, down to snooze",
      callout: "Tinder-like simplicity"
    },
    {
      title: "Smart Classification",
      description: "Automatic Mail vs Ads sorting with 43 intent categories",
      callout: "95% accuracy target"
    },
    {
      title: "Privacy First",
      description: "Read-only Gmail access, no content stored",
      callout: "OAuth 2.0 secure"
    },
    {
      title: "Native iOS Design",
      description: "Dark mode, smooth animations, iPhone optimized",
      callout: "Built for iOS"
    },
    {
      title: "Track Everything",
      description: "Bills, packages, events, appointments—all in one place",
      callout: "Never miss deadlines"
    }
  ],

  // Search Optimization Keywords (100 max, ranked by priority)
  searchKeywords: [
    // Primary (High volume, high relevance)
    "email",
    "inbox zero",
    "gmail",
    "productivity",
    "ai email",
    "email manager",
    "email organizer",

    // Secondary (Medium volume, high relevance)
    "email assistant",
    "email automation",
    "inbox management",
    "email triage",
    "email ai",
    "smart inbox",
    "email productivity",

    // Long-tail (Lower volume, high intent)
    "inbox zero app",
    "gmail organizer",
    "email action tracker",
    "email task manager",
    "swipe email",
    "ai inbox",
    "email intelligence",

    // Action-specific
    "bill tracker",
    "package tracker",
    "email reminders",
    "email deadlines",
    "rsvp manager",

    // Competitor terms
    "superhuman alternative",
    "hey email alternative",
    "spark email alternative",
    "mail app",
    "better gmail"
  ]
};

/**
 * App Store Connect Checklist
 */
export const appStoreChecklist = {
  metadata: [
    "App name optimized with primary keyword (30 chars)",
    "Subtitle includes value prop + keyword (30 chars)",
    "Promotional text updated for beta program (170 chars)",
    "Full description with keywords naturally integrated",
    "Keywords field maximized (100 characters)",
    "What's New section updated with version details",
    "Support URL points to help documentation",
    "Marketing URL points to main product page",
    "Privacy policy URL active and accessible"
  ],

  visuals: [
    "6 App Store screenshots (6.7\" iPhone Pro Max)",
    "5 Additional screenshots (5.5\" iPhone 8 Plus)",
    "App icon 1024x1024 PNG (no alpha channel)",
    "Optional: App Preview video (15-30 seconds)",
    "Optional: iPad screenshots if supporting iPad",
    "Screenshots show key features in order",
    "Text overlays readable at thumbnail size",
    "Consistent visual style across all assets"
  ],

  appInfo: [
    "Age rating set (likely 4+)",
    "Primary category: Productivity",
    "Secondary category: Business",
    "Copyright information accurate",
    "Developer name: Rationale",
    "Bundle ID matches Xcode project"
  ],

  pricing: [
    "Beta: Free with potential for paid features",
    "Consider: Freemium model post-beta",
    "Future: Subscription for power features",
    "In-app purchases configured if needed"
  ],

  betaTesting: [
    "TestFlight build uploaded",
    "Beta tester groups configured (Cohort 1-4)",
    "Feedback email prominently displayed",
    "Beta disclaimer in promotional text",
    "Limited availability messaging"
  ]
};

/**
 * Keyword Optimization Strategy
 */
export const keywordStrategy = {
  primary: {
    keywords: ["email", "inbox zero", "gmail", "productivity", "AI"],
    rationale: "High search volume, directly describe core functionality"
  },

  secondary: {
    keywords: ["email manager", "inbox management", "email organizer", "email assistant"],
    rationale: "Medium volume, high relevance, strong intent"
  },

  longTail: {
    keywords: ["inbox zero app", "gmail organizer app", "email action tracker", "swipe email"],
    rationale: "Lower volume but very high conversion intent"
  },

  competitor: {
    keywords: ["superhuman alternative", "hey email alternative", "better gmail"],
    rationale: "Target users searching for specific competitor alternatives"
  },

  avoid: {
    keywords: ["free email", "email client", "iphone email", "best email app"],
    reasons: [
      "too generic, wrong audience",
      "too technical",
      "iOS default makes this less valuable",
      "too competitive, generic"
    ]
  }
};

/**
 * A/B Testing Recommendations
 */
export const abTestingPlan = {
  screenshotVariants: [
    {
      variant: "A",
      approach: "Feature-focused (show UI, technical capabilities)",
      hypothesis: "Technical users want to see actual interface"
    },
    {
      variant: "B",
      approach: "Benefit-focused (show outcomes, text overlays)",
      hypothesis: "Busy professionals care more about results than UI"
    }
  ],

  iconVariants: [
    {
      variant: "A",
      approach: "Zero logo (minimalist)",
      hypothesis: "Simple, recognizable brand mark"
    },
    {
      variant: "B",
      approach: "Inbox icon (literal)",
      hypothesis: "Immediately communicates email functionality"
    }
  ],

  titleVariants: [
    {
      variant: "Current",
      title: "Zero: AI Email Actions",
      hypothesis: "Balanced brand + function + differentiator"
    },
    {
      variant: "B",
      title: "Zero: Inbox Zero AI",
      hypothesis: "Double 'Zero' reinforces concept"
    },
    {
      variant: "C",
      title: "Zero Email: AI Actions",
      hypothesis: "Email first, then differentiator"
    }
  ]
};
