/**
 * Athletes First - Agency Executive Persona
 *
 * For use with Prospective Client Agent to simulate
 * how a sports agency executive would evaluate the pitch deck
 */

export interface AgencyPersona {
  id: string;
  name: string;
  role: string;
  company: string;
  companyStage: string;
  budget: string;
  timeline: string;
  projectType: string;
  sophistication: 'low' | 'medium' | 'high';
  priorities: string[];
  concerns: string[];
  referenceStyle: string[];
}

/**
 * Alex Thompson - Managing Partner at Athletes First
 *
 * Profile: Top 5 sports agency with 800+ agents competing for talent.
 * Looking to pilot AI modules to gain competitive advantage in recruitment.
 */
export const AGENCY_ALEX_PERSONA: AgencyPersona = {
  id: 'agency-alex',
  name: 'Alex Thompson',
  role: 'Managing Partner',
  company: 'Athletes First (Top 5 Sports Agency)',
  companyStage: 'mature',
  budget: '$100-250k for 90-day pilot',
  timeline: '90 days to results',
  projectType: 'pilot',
  sophistication: 'high',

  priorities: [
    'Proven AI/ML capability (not vaporware)',
    'Sports industry understanding',
    'Fast time to value (90 days or less)',
    'Module flexibility (choose 2-3, not all-or-nothing)',
    'Integration with existing agent workflow',
    'Measurable ROI (athlete conversion, deal speed)',
    'Athlete adoption (will they actually use it?)',
    'Competitive advantage (early AI adoption among agencies)'
  ],

  concerns: [
    'Is this real technology or just a pitch deck?',
    'Can they actually ship working software in 90 days?',
    'Will athletes adopt digital twins / NIL tools?',
    'What happens after the pilot? (pricing, commitment)',
    'Do they understand the sports agent business?',
    'Why not build in-house with our existing tech team?',
    'What if the pilot fails—am I stuck in a contract?',
    'Can they integrate with our CRM (Salesforce)?',
    'Will this distract our agents from their core job?',
    'Is $100-250k the real cost or just the starting price?'
  ],

  referenceStyle: [
    'Enterprise software (Salesforce, HubSpot, Microsoft Dynamics)',
    'Sports tech (Catapult Sports, WHOOP, Hudl, TeamSnap)',
    'Clean dashboards with real-time data',
    'Mobile-first for athletes (iOS/Android)',
    'B2B SaaS with proven track record',
    'Demo-first selling (show, don\'t just tell)',
    'Clear pricing and implementation timelines',
    'References from similar industries (entertainment, talent)'
  ]
};

/**
 * Evaluation Criteria for Agency Executives
 *
 * What Alex cares about when evaluating a vendor:
 */
export const AGENCY_EVALUATION_CRITERIA = {
  technical_credibility: {
    weight: 9,  // out of 10
    signals: [
      'Team background (Meta, FUBO, big tech)',
      'Working demos (not just mockups)',
      'Technical architecture explained',
      'Integration capabilities (APIs, webhooks)',
      'Security / compliance considerations'
    ]
  },

  sports_domain_knowledge: {
    weight: 8,
    signals: [
      'Understanding of agent business model',
      'Knowledge of NIL regulations',
      'Athlete recruitment process insights',
      'References from sports/entertainment clients',
      'Sports-specific use cases'
    ]
  },

  speed_to_value: {
    weight: 10,  // Critical for pilot success
    signals: [
      '90-day timeline clearly defined',
      'Phased approach (not big bang)',
      'Module selection flexibility',
      'Quick wins identified upfront',
      'Clear success metrics'
    ]
  },

  risk_mitigation: {
    weight: 9,
    signals: [
      'Pilot structure (not full commitment)',
      'Choose 2-3 modules (not forced to take all)',
      'Clear exit criteria if pilot fails',
      'No long-term contract lock-in',
      'References / case studies from pilots'
    ]
  },

  business_model_clarity: {
    weight: 7,
    signals: [
      'Pilot pricing transparent',
      'Full platform pricing ballpark',
      'What happens after pilot?',
      'Ongoing support / maintenance costs',
      'Training / onboarding included?'
    ]
  },

  competitive_differentiation: {
    weight: 8,
    signals: [
      'Early AI adoption among sports agencies is accelerating',
      'Why not build in-house?',
      'Why Rationale vs generic dev shop?',
      'Unique capabilities (AI, sports, speed)',
      'First-mover advantage framing (12-24 month window)'
    ]
  }
};

/**
 * Questions Alex Will Ask
 *
 * These should be preemptively addressed in the deck:
 */
export const ALEX_QUESTIONS = [
  // Technical
  'Can I see a live demo of the digital twins technology?',
  'How does this integrate with our existing Salesforce CRM?',
  'What happens if an athlete's likeness is misused?',
  'How do you handle data security and GDPR compliance?',

  // Business Model
  'What\'s the total cost if we go beyond the pilot?',
  'Is this a one-time build or ongoing SaaS subscription?',
  'Can we own the code / IP after the pilot?',
  'What does "equity partnership" mean for a mature company like ours?',

  // Implementation
  'How much time do our agents need to dedicate to this?',
  'What happens in weeks 1-4 of the pilot?',
  'Do you provide training for our agent team?',
  'How do we measure success—what are the KPIs?',

  // Risk
  'What if the pilot doesn\'t hit the 20-30% conversion lift?',
  'Can we pause or cancel if it\'s not working?',
  'Have you done this for other sports agencies?',
  'Why should we trust a small studio over an enterprise vendor?',

  // Athlete-Facing
  'Will athletes actually use digital twins or is this a gimmick?',
  'How do we explain this to athletes without overwhelming them?',
  'What if an athlete says no to digital twin capture?',
  'Is this mobile-friendly? (Athletes live on their phones)'
];

/**
 * Objections to Surface
 *
 * Common objections agency executives raise:
 */
export const ALEX_OBJECTIONS = {
  blocker_level: [
    {
      objection: 'Why not build this in-house?',
      rationale: 'We have a tech team. Why pay $100-250k when we could build it ourselves?',
      counter: 'Building comparable AI infrastructure in-house typically requires hiring specialized ML engineers, 18-24+ months of development, and $1M-$3M+ in costs depending on scope—plus ongoing maintenance. Rationale delivers working systems in 90 days with proven AI/ML expertise from Meta FAIR and FUBO sports technology.'
    },
    {
      objection: 'I need references from other sports agencies',
      rationale: 'We can\'t be the first. Too risky without proof.',
      counter: 'AI adoption among sports agencies is accelerating but still nascent. Early movers are gaining competitive advantage in recruitment and athlete services. The 12-24 month window for differentiation is narrowing. Pilot structure de-risks: 90-day validation with clear exit criteria at Week 4, 8, and 12 checkpoints.'
    }
  ],

  hesitation_level: [
    {
      objection: 'What\'s the real total cost?',
      rationale: '$100-250k sounds like a starting price. What\'s the full commitment?',
      counter: 'Pilot is fixed-price. Full platform is $X/agent/month OR revenue share model. Your choice.'
    },
    {
      objection: 'Will athletes actually adopt this?',
      rationale: 'We\'ve tried tech before and agents/athletes ignored it.',
      counter: 'Mobile-first design + 1:1 fan revenue ($500-$2K per message) = built-in incentive for adoption.'
    },
    {
      objection: 'This feels like a science project',
      rationale: 'Cool demos but can you actually ship production-ready software?',
      counter: 'FUBO AI system shipped to production. Meta AR commerce scaled to millions. We ship, not just prototype.'
    }
  ],

  minor_level: [
    {
      objection: 'You\'re a small team',
      rationale: 'What if you get hit by a bus or take another client?',
      counter: 'All code documented, handoff-ready. Equity partnership aligns incentives long-term.'
    },
    {
      objection: 'I don\'t see other sports clients in your portfolio',
      rationale: 'Have you done this before in sports?',
      counter: 'FUBO = sports streaming. Meta = content platforms. We understand high-stakes media + tech.'
    }
  ]
};

/**
 * What Would Change Alex's Mind
 *
 * If Alex scores likelihood_to_reach_out at 6-7, what gets him to 9-10?
 */
export const WHAT_WOULD_SEAL_THE_DEAL = [
  'Add a competitive positioning slide: "Build in-house (18-24+ months, $1M-$3M+) vs Rationale (90 days, $100-250K)"',
  'Show beta pilot results if available (even 1-2 agents using it)',
  'Add business model clarity: "Pilot → Platform: The 12-Month Roadmap"',
  'Include a "What if pilot fails?" slide (exit criteria, money-back, etc.)',
  'Add testimonial from someone in sports/entertainment (even adjacent)',
  'Show mobile mockups (athletes use phones 90% of the time)',
  'Add a "Day 1-90: What Happens" timeline so he knows what to expect',
  'Include integration diagram (how this fits into existing workflow)'
];

/**
 * Competitive Comparison
 *
 * Who else is Alex considering?
 */
export const ALEX_ALTERNATIVES = {
  build_in_house: {
    name: 'Build In-House',
    pros: ['Full control', 'Owns IP', 'Custom to our needs'],
    cons: ['18-24+ months', '$1M-$3M+ investment depending on scope', 'Requires hiring specialized ML engineers', 'No sports AI expertise', 'Ongoing maintenance costs'],
    rationale_advantage: '90 days vs 18-24+ months. $100-250K vs $1M-$3M+. Proven sports tech expertise from Meta FAIR and FUBO.'
  },

  enterprise_vendor: {
    name: 'Salesforce / Microsoft / Oracle',
    pros: ['Enterprise trust', 'Support team', 'Proven at scale'],
    cons: ['No sports-specific features', 'Generic AI (not tuned)', 'Expensive ($500K-1M)', 'Slow implementation (6-12 months)'],
    rationale_advantage: 'Sports-specific AI. 90 days to value. 1/3 the cost. Fast iteration.'
  },

  dev_shop: {
    name: 'Generic Dev Shop',
    pros: ['Cheaper ($50-100K)', 'Flexible scope'],
    cons: ['No AI expertise', 'No sports domain knowledge', 'Build from scratch', 'Quality unknown'],
    rationale_advantage: 'Meta+FUBO AI leaders. Sports industry experience. Proven track record shipping.'
  },

  do_nothing: {
    name: 'Do Nothing (Status Quo)',
    pros: ['No risk', 'No cost', 'No change management'],
    cons: ['Fall behind competitors', 'Lose deals to AI-enabled agencies', 'Miss first-mover advantage'],
    rationale_advantage: 'AI adoption among agencies is accelerating. 12-24 month window for differentiation. Early movers gaining advantage in recruitment and athlete services.'
  }
};

export default AGENCY_ALEX_PERSONA;
