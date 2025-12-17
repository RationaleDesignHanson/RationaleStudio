/**
 * Zero Marketing Content
 *
 * Consumer-friendly marketing page content centered on JTBD:
 * "When I have 50+ emails daily, I need to find urgent actions fast,
 * so I can respond without reading everything."
 */

import { ProductMarketingContent } from './types';

export const zeroMarketingContent: ProductMarketingContent = {
  slug: 'zero',
  productName: 'Zero',
  category: 'consumer',

  jtbd: {
    functional: 'When I have 50+ unread emails, I want to find urgent actions fast, so I can respond without reading everything.',
    emotional: 'I want to feel in control instead of overwhelmed.',
    social: 'I want to be seen as responsive and organized.'
  },

  hero: {
    preHeadline: 'Email Management',
    headline: 'Turn Email Into Actions, Not Homework',
    subheadline: 'For busy professionals drowning in 50+ daily emails—AI extracts the bills, packages, RSVPs, and forms you need to act on. Swipe to complete. Done.',
    ctaPrimary: {
      text: 'Join Beta Waitlist',
      href: '/contact?product=zero'
    },
    ctaSecondary: {
      text: 'Watch 60s Demo',
      href: '/work/zero/demo'
    }
  },

  problem: {
    headline: 'The Problem: Your Inbox Is Full of Hidden Work',
    scenarios: [
      {
        scenario: 'You get 47 emails today. Somewhere in there: a bill due tomorrow, a package arriving in an hour, a form your kid needs signed. But to find them, you have to read everything.'
      },
      {
        scenario: 'You spend 20 minutes triaging email every morning. By noon, 15 more arrived. By 5pm, you\'re behind again. It never ends.'
      },
      {
        scenario: 'You miss a payment deadline because the bill was buried under newsletters. Late fee: $35. Time wasted: 40 minutes on hold with customer service.'
      }
    ],
    transition: 'What if your inbox only showed you what needed action?'
  },

  solution: {
    headline: 'How Zero Solves This',
    useCases: [
      {
        trigger: 'When a bill arrives',
        action: 'Zero extracts due date, amount, payment link',
        outcome: 'Swipe right, tap "Pay Now," done in 15 seconds'
      },
      {
        trigger: 'When a package ships',
        action: 'Zero detects tracking number and carrier',
        outcome: 'See delivery time without opening the email'
      },
      {
        trigger: 'When you need to RSVP',
        action: 'Zero surfaces event details and response options',
        outcome: 'Swipe to RSVP, auto-adds to calendar'
      },
      {
        trigger: 'When newsletters pile up',
        action: 'Zero sorts into "Ads" category',
        outcome: 'Swipe left to bulk archive. Inbox: clear'
      }
    ],
    visual: {
      type: 'demo',
      description: 'Interactive card swipe interface showing email triage in action'
    }
  },

  proof: {
    headline: 'What You Get',
    outcomes: [
      {
        metric: '2-3 hours saved per week',
        context: 'Stop reading 200+ emails. Act on the 12 that matter.'
      },
      {
        metric: 'Zero missed deadlines',
        context: 'Bills, RSVPs, forms surface automatically. Never miss another due date.'
      },
      {
        metric: 'Inbox zero in under 5 minutes',
        context: 'Swipe through actions, archive the rest. Start your day clear.'
      },
      {
        metric: 'Privacy-first AI',
        context: 'We never store email content. Only action metadata. Gmail OAuth keeps credentials secure.'
      }
    ],
    testimonial: {
      quote: 'I used to spend an hour every morning on email. Now it\'s 10 minutes. Zero finds everything I need to do.',
      author: 'Sarah T.',
      role: 'Marketing Director'
    }
  },

  cta: {
    headline: 'Try Zero Free',
    subheadline: 'Join 500+ beta users testing Zero. No credit card, invite-only access.',
    buttonText: 'Request Beta Access',
    formFields: ['email', 'biggest_email_pain'],
    trustSignal: 'You\'ll hear from us within 48 hours with your beta invite.'
  },

  whoItsFor: {
    headline: 'Built For',
    personas: [
      'You get 30+ emails per day and struggle to find urgent items',
      'You\'ve missed bill payments or RSVPs because they were buried',
      'You spend 20+ minutes daily just organizing your inbox',
      'You want email to work for you, not the other way around'
    ],
    antiPersonas: [
      'You get <10 emails per day',
      'You prefer reading every email in full (that\'s valid!)'
    ]
  },

  howItWorks: {
    headline: 'How Zero Works',
    steps: [
      {
        title: 'Connect Your Email',
        description: 'Zero securely syncs with Gmail (OAuth, view-only). We never store your email content.'
      },
      {
        title: 'AI Reads Incoming Mail',
        description: 'Every email is analyzed for actions: bills, packages, RSVPs, forms, calendar events.'
      },
      {
        title: 'Actions Appear as Cards',
        description: 'Swipe right to act, left to archive, up to see details, down to snooze.'
      },
      {
        title: 'You\'re Done',
        description: 'No reading 47 emails. Just act on what matters.'
      }
    ],
    techSidebar: 'We use Google Gemini 2.0 + OpenAI GPT-4 for classification. 95%+ accuracy on action detection.',
    deepDiveLink: {
      text: 'Developers: See technical architecture',
      href: '/work/zero'
    }
  },

  secondaryCTAs: {
    headline: 'More Ways to Engage',
    paths: [
      {
        label: 'View Case Study',
        description: 'See how Zero was built—technical architecture, AI system, and execution timeline.',
        href: '/work/zero'
      },
      {
        label: 'Learn About Rationale',
        description: 'Zero is built by Rationale, a product studio that builds conviction-backed ventures.',
        href: '/'
      },
      {
        label: 'Download Media Kit',
        description: 'Logos, screenshots, founder bios for press.',
        href: '/contact'
      }
    ]
  },

  seo: {
    title: 'Zero - Turn Email Into Actions, Not Homework',
    description: 'AI-powered email triage for busy professionals. Extract bills, packages, and RSVPs from 50+ daily emails. Swipe to complete. Join free beta.',
    keywords: ['email management', 'AI email', 'inbox zero', 'email triage', 'productivity app', 'email assistant']
  }
};
