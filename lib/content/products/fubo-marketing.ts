/**
 * Fubo Thumbnail System Marketing Content (030)
 *
 * Partnership marketing page content centered on JTBD:
 * "When I stream live sports across 200+ teams and 8 leagues, I need
 * compelling, brand-consistent thumbnails generated at scale so viewers
 * can discover the right content."
 */

import { ProductMarketingContent } from './types';

export const fuboMarketingContent: ProductMarketingContent = {
  slug: 'fubo',
  productName: 'Fubo Thumbnail System',
  category: 'partnership',

  jtbd: {
    functional: 'When I stream live sports across 200+ teams and 8 leagues, I need compelling, brand-consistent thumbnails generated at scale so viewers can discover the right content.',
    emotional: 'I want to feel confident our thumbnails look professional and match our brand, not generic or off-brand.',
    social: 'I want our platform to be seen as polished and premium, with visual quality that matches ESPN or DAZN.'
  },

  hero: {
    preHeadline: 'AI Thumbnail Generation',
    headline: 'Brand-Consistent Thumbnails for 200+ Teams, Generated in Seconds',
    subheadline: 'For streaming platforms managing thousands of live sports events—AI-powered thumbnail generation with 24 visual styles, built and deployed in 2 weeks.',
    ctaPrimary: {
      text: 'See the System',
      href: '/contact?product=fubo-thumbnails'
    },
    ctaSecondary: {
      text: 'View Case Study',
      href: '/work/fubo'
    }
  },

  problem: {
    headline: "The Problem: Thumbnails Don't Scale",
    scenarios: [
      {
        scenario: "You stream 200+ live sports games per week. Each needs a thumbnail. Your design team can produce 10-15 per day manually. You fall behind within hours. Generic thumbnails go live. Viewers scroll past."
      },
      {
        scenario: "Your brand guidelines require specific team colors, logo placement, and typography. Manual creation means inconsistency—some thumbnails look premium, others look rushed. Brand integrity suffers at scale."
      },
      {
        scenario: "A marquee game goes live in 30 minutes. The thumbnail isn't ready. You scramble, upload something generic, hope it doesn't hurt viewership. This happens weekly."
      }
    ],
    transition: "What if every thumbnail was brand-perfect, auto-generated, and ready before the event went live?"
  },

  solution: {
    headline: 'How Fubo Thumbnail System Solves This',
    useCases: [
      {
        trigger: 'When a new game is scheduled',
        action: 'System auto-generates thumbnails using team colors, logos, and 24 visual style templates',
        outcome: 'Every event has a polished, on-brand thumbnail—no designer intervention needed.'
      },
      {
        trigger: 'When you need brand consistency',
        action: 'System enforces typography, spacing, and color rules across all 200+ teams',
        outcome: 'Every thumbnail looks like it came from the same premium design system.'
      },
      {
        trigger: 'When games go live unexpectedly',
        action: 'System generates thumbnails in under 10 seconds—faster than manual approval cycles',
        outcome: 'No more scrambling. Thumbnails are ready before the event even starts.'
      },
      {
        trigger: 'When you want to test styles',
        action: 'System supports 24 visual variants (bold, minimal, retro, neon, etc.) per event',
        outcome: 'A/B test thumbnail styles to optimize click-through rates across leagues.'
      }
    ],
    visual: {
      type: 'screenshots',
      description: 'Grid showing thumbnails across 8 leagues, 24 visual styles, all brand-consistent'
    }
  },

  proof: {
    headline: 'What Fubo Got',
    outcomes: [
      {
        metric: '200+ teams',
        context: 'Full coverage across MLB, NBA, NFL, NHL, MLS, Liga MX, and more.'
      },
      {
        metric: '24 visual styles',
        context: 'From bold and dramatic to clean and minimal—all brand-compliant.'
      },
      {
        metric: '2-week sprint',
        context: 'From kickoff to production deployment. No 6-month design cycles.'
      },
      {
        metric: 'Zero manual work',
        context: 'Thumbnails generated, approved, and published—fully automated.'
      }
    ]
  },

  cta: {
    headline: 'Get a System Like This',
    subheadline: 'Need thumbnail generation, asset pipelines, or brand-at-scale solutions? We build partnership systems fast.',
    buttonText: 'Start a Conversation',
    trustSignal: 'Built and deployed in 2 weeks for Fubo. Can do the same for your platform.'
  },

  whoItsFor: {
    headline: 'Built For',
    personas: [
      "You manage a streaming platform with hundreds or thousands of live events",
      "Your design team can't keep up with thumbnail demand at scale",
      "You need brand consistency across leagues, teams, and visual styles",
      "You want to ship fast—weeks, not quarters"
    ],
    antiPersonas: [
      "You only have 5-10 events per month (manual thumbnails work fine)",
      "You don't care about brand consistency or visual quality"
    ]
  },

  howItWorks: {
    headline: 'How It Works',
    steps: [
      {
        title: 'Ingest Team Data',
        description: 'System pulls team names, logos, colors, and league metadata from your CMS or API.'
      },
      {
        title: 'Apply Visual Templates',
        description: '24 pre-built styles (bold, minimal, retro, neon) adapt to each team\'s brand colors and logos.'
      },
      {
        title: 'Generate Thumbnails',
        description: 'AI-powered composition engine creates thumbnails in under 10 seconds per event.'
      },
      {
        title: 'Deploy to Production',
        description: 'Thumbnails auto-publish to your CMS or CDN—no manual upload required.'
      }
    ],
    techSidebar: 'Built with AI image generation, brand rule engines, and real-time asset pipelines. Deployed on Fubo\'s infrastructure in 2 weeks.',
    deepDiveLink: {
      text: 'View full case study',
      href: '/work/fubo'
    }
  },

  secondaryCTAs: {
    headline: 'More Ways to Engage',
    paths: [
      {
        label: 'View Case Study',
        description: 'See how we built and shipped the Fubo thumbnail system in a 2-week sprint.',
        href: '/work/fubo'
      },
      {
        label: 'Explore Partnerships',
        description: 'Need custom systems for your platform? We specialize in fast, high-impact partnership builds.',
        href: '/partnerships'
      },
      {
        label: 'Learn About Rationale',
        description: 'Fubo is one of many partnership products we\'ve shipped at speed.',
        href: '/'
      }
    ]
  },

  seo: {
    title: 'Fubo Thumbnail System - AI-Generated Sports Thumbnails at Scale',
    description: 'AI thumbnail generation for live sports streaming. 200+ teams, 24 visual styles, built in 2 weeks. Brand-consistent thumbnails for Fubo.',
    keywords: ['sports thumbnails', 'AI image generation', 'live sports streaming', 'thumbnail automation', 'brand consistency', 'Fubo']
  }
};
