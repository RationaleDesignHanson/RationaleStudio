/**
 * CREaiT Marketing Content (010)
 *
 * B2B-focused marketing page content centered on JTBD:
 * "When I manage 200+ CRE contacts, I need daily prioritization and
 * contextual deal insights so I don't lose deals to follow-up gaps."
 */

import { ProductMarketingContent } from './types';

export const creaitMarketingContent: ProductMarketingContent = {
  slug: 'creait',
  productName: 'CREaiT',
  category: 'b2b',

  jtbd: {
    functional: 'When I manage 200+ CRE contacts, I need daily prioritization and contextual deal insights so I don\'t lose deals to follow-up gaps.',
    emotional: 'I want to feel confident I\'m never missing opportunities or letting relationships go cold.',
    social: 'I want to be seen as the responsive, organized broker who always follows up at the right time.'
  },

  hero: {
    preHeadline: 'CRM Optimization for Commercial Real Estate',
    headline: 'Stop Managing Your CRM. Let It Manage Your Pipeline.',
    subheadline: 'For CRE brokers juggling 200+ contacts—AI synthesizes deal signals, prioritizes outreach, and drafts context-aware follow-ups daily.',
    ctaPrimary: {
      text: 'Request Demo',
      href: '/contact?product=creait'
    },
    ctaSecondary: {
      text: 'View Case Study',
      href: '/work/case-study-010'
    }
  },

  problem: {
    headline: 'The Problem: Your CRM Is a Data Graveyard',
    scenarios: [
      {
        scenario: 'You have 247 contacts in your CRM. Every morning, you stare at the list thinking "Who should I call today?" There\'s no clear priority. You pick someone randomly, hope it matters.'
      },
      {
        scenario: 'You spend 2+ hours daily logging notes, updating deal stages, and trying to remember who said what 3 weeks ago. Your CRM is a todo list you resent, not a tool that helps you win deals.'
      },
      {
        scenario: 'A deal slips through because you forgot to follow up after that casual "let me think about it" conversation. Two months later, you see they closed with your competitor. The relationship just went cold—you didn\'t realize it until too late.'
      }
    ],
    transition: 'What if your CRM told you exactly who to call, why, and what to say—every single day?'
  },

  solution: {
    headline: 'How CREaiT Solves This',
    useCases: [
      {
        trigger: 'When you start your day',
        action: 'CREaiT generates a prioritized list of who to contact—sorted by urgency, relationship temperature, and deal potential',
        outcome: 'Open your inbox, see 8 contacts ranked by priority. No guessing. Just act.'
      },
      {
        trigger: 'When you need to follow up',
        action: 'CREaiT drafts context-aware emails based on your last interaction and deal stage',
        outcome: 'Edit in 30 seconds, send. Every follow-up feels personal and timely.'
      },
      {
        trigger: 'When deal signals emerge',
        action: 'CREaiT monitors public records, ownership changes, and market activity—alerting you before opportunities become common knowledge',
        outcome: 'Get the heads-up 2 weeks before your competitors. First call wins.'
      },
      {
        trigger: 'When relationships go cold',
        action: 'CREaiT flags contacts you haven\'t touched in 60+ days with suggested re-engagement hooks',
        outcome: 'No more "I should have called them." You get reminded automatically.'
      }
    ],
    visual: {
      type: 'demo',
      description: 'Dashboard showing daily prioritized contact list, draft emails, and deal signal alerts'
    }
  },

  proof: {
    headline: 'What You Get',
    outcomes: [
      {
        metric: '2.5 hours saved daily',
        context: 'Stop manually triaging CRM data. AI does it for you every morning.'
      },
      {
        metric: 'Zero cold relationships',
        context: 'Automated re-engagement alerts keep your network warm year-round.'
      },
      {
        metric: 'First-mover advantage',
        context: 'Off-market opportunity alerts 2-4 weeks before public knowledge.'
      },
      {
        metric: 'Context-aware follow-ups',
        context: 'Every email references your last conversation. No more generic outreach.'
      }
    ]
  },

  cta: {
    headline: 'See CREaiT in Action',
    subheadline: 'Book a 20-minute demo to see how AI transforms your CRM from data graveyard to deal engine.',
    buttonText: 'Request Demo',
    formFields: ['email', 'company', 'crm_tool', 'team_size'],
    trustSignal: 'We\'ll reach out within 24 hours to schedule your personalized demo.'
  },

  whoItsFor: {
    headline: 'Built For',
    personas: [
      'You manage 100+ CRE contacts across multiple markets',
      'You spend 2+ hours daily updating your CRM instead of making deals',
      'You lose deals because follow-ups slip through the cracks',
      'Your team uses different systems and data gets duplicated or lost'
    ],
    antiPersonas: [
      'You have <25 active deals',
      'You prefer manual spreadsheet tracking'
    ]
  },

  howItWorks: {
    headline: 'How CREaiT Works',
    steps: [
      {
        title: 'Connect Your CRM',
        description: 'Integrate with Salesforce, HubSpot, or your existing system. We sync contact data, deal stages, and interaction history.'
      },
      {
        title: 'AI Learns Your Patterns',
        description: 'CREaiT analyzes your successful deals—who you called, when, and what messages worked. It builds a prioritization model unique to your business.'
      },
      {
        title: 'Daily Intelligence Briefs',
        description: 'Every morning: prioritized contact list, draft follow-ups, deal signal alerts, and relationship health scores.'
      },
      {
        title: 'Act, Track, Improve',
        description: 'Make calls, send emails, log outcomes. CREaiT refines its recommendations based on what drives your success.'
      }
    ],
    techSidebar: 'Privacy-first architecture. Your CRM data stays in your system—we analyze in place, never store contact details.',
    deepDiveLink: {
      text: 'View technical case study',
      href: '/work/case-study-010'
    }
  },

  secondaryCTAs: {
    headline: 'More Ways to Engage',
    paths: [
      {
        label: 'View Full Case Study',
        description: 'See the complete technical breakdown—architecture, AI intelligence layer, and CRM integrations.',
        href: '/work/case-study-010'
      },
      {
        label: 'Explore Partnership',
        description: 'Interested in co-developing CREaiT for your market or brokerage? Let\'s talk.',
        href: '/partnerships'
      },
      {
        label: 'Learn About Rationale',
        description: 'CREaiT is built by Rationale, a studio that partners with domain experts to build conviction-backed products.',
        href: '/'
      }
    ]
  },

  seo: {
    title: 'CREaiT - AI-Powered CRM for Commercial Real Estate Brokers',
    description: 'Stop managing your CRM. Let AI prioritize contacts, draft follow-ups, and surface deal signals daily. Built for CRE brokers managing 100+ contacts. Request demo.',
    keywords: ['CRE CRM', 'commercial real estate software', 'real estate AI', 'broker CRM', 'deal pipeline management', 'real estate tech']
  }
};
