/**
 * Rumi Marketing Content (030)
 *
 * Consumer/Partnership marketing page content centered on JTBD:
 * "When I want to watch live sports with friends remotely, I need instant
 * sync and zero setup so we can experience the game together."
 */

import { ProductMarketingContent } from './types';

export const rumiMarketingContent: ProductMarketingContent = {
  slug: 'rumi',
  productName: 'Rumi',
  category: 'consumer',

  jtbd: {
    functional: 'When I want to watch live sports with friends remotely, I need instant sync and zero setup so we can experience the game together.',
    emotional: 'I want to feel connected to friends during big moments, not isolated watching alone.',
    social: 'I want to be the person who brings everyone together for game day, even when we\'re miles apart.'
  },

  hero: {
    preHeadline: 'Live Sports Streaming',
    headline: 'Watch Live Sports Together, From Anywhere',
    subheadline: 'For sports fans with friends in different cities—instant watch parties, perfect sync, no app downloads. Just send a link and watch together.',
    ctaPrimary: {
      text: 'Start a Watch Party',
      href: 'https://rumi.tv'
    },
    ctaSecondary: {
      text: 'See How It Works',
      href: '/work/case-study-030'
    }
  },

  problem: {
    headline: 'The Problem: Watching Alone Feels Lonely',
    scenarios: [
      {
        scenario: 'Your friends are scattered across 3 cities. Game starts in 20 minutes. You try to coordinate on a video call, but everyone\'s stream is 15-45 seconds out of sync. Someone texts about the goal before you see it. Moment: ruined.'
      },
      {
        scenario: 'You want to watch with your college roommates like old times. But setting up a watch party requires: accounts, downloads, logins, invites, permissions. By the time it works, you\'ve missed the first quarter.'
      },
      {
        scenario: 'You\'re watching on your TV. Your friend is on their laptop. Your cousin is on their phone. Everyone\'s at different moments in the game. There\'s no shared experience—just three people watching alone while texting about it.'
      }
    ],
    transition: 'What if watch parties were as easy as sending a link—and everyone stayed perfectly synced?'
  },

  solution: {
    headline: 'How Rumi Solves This',
    useCases: [
      {
        trigger: 'When game day arrives',
        action: 'Rumi generates a watch party link—no signups, no downloads, just open and watch',
        outcome: 'Send the link. Friends join. Everyone\'s ready in under 30 seconds.'
      },
      {
        trigger: 'When you need perfect sync',
        action: 'Rumi keeps all viewers within 5 seconds of real-time—no spoilers, no lag',
        outcome: 'Everyone sees the goal at the same moment. Reactions happen together, not staggered.'
      },
      {
        trigger: 'When you watch on any device',
        action: 'Rumi works on phones, tablets, laptops, TVs—without platform restrictions',
        outcome: 'Watch however you want. Everyone stays synced regardless of device.'
      },
      {
        trigger: 'When new friends want to join mid-game',
        action: 'Rumi allows instant entry—no permissions, no host approval',
        outcome: 'Share the link anytime. Friends jump in without disrupting the party.'
      }
    ],
    visual: {
      type: 'video',
      description: 'Video showing watch party creation, link sharing, and multi-device sync'
    }
  },

  proof: {
    headline: 'What You Get',
    outcomes: [
      {
        metric: 'Sub-5-second sync',
        context: 'Everyone experiences big moments together. No more spoiled goals via text.'
      },
      {
        metric: 'Zero setup friction',
        context: 'No accounts, no downloads, no permissions. Just click the link and watch.'
      },
      {
        metric: 'Works on any device',
        context: 'Phone, tablet, laptop, smart TV. Everyone watches however they want.'
      },
      {
        metric: '1M+ watch party minutes',
        context: 'Fans around the world using Rumi to stay connected during live games.'
      }
    ]
  },

  cta: {
    headline: 'Start Your Watch Party',
    subheadline: 'Free to use. No credit card. No account required. Just create a link and share.',
    buttonText: 'Create Watch Party Link',
    trustSignal: 'Works with any live stream. Your friends don\'t need Rumi—just the link.'
  },

  whoItsFor: {
    headline: 'Built For',
    personas: [
      'You have friends/family in different cities who share your team fandom',
      'You watch games regularly and want a social experience, not solo viewing',
      'You\'ve tried video calls during games but sync issues ruined the experience',
      'You want to recreate the sports bar atmosphere from home'
    ],
    antiPersonas: [
      'You always watch games alone by choice',
      'You don\'t have friends interested in the same sports'
    ]
  },

  howItWorks: {
    headline: 'How Rumi Works',
    steps: [
      {
        title: 'Create a Watch Party',
        description: 'Go to Rumi, paste your stream link, generate a watch party URL. Takes 10 seconds.'
      },
      {
        title: 'Share the Link',
        description: 'Text, email, or post the link. Your friends click and join—no signup required.'
      },
      {
        title: 'Everyone Stays Synced',
        description: 'Rumi monitors playback across all viewers and keeps everyone within 5 seconds of each other.'
      },
      {
        title: 'Watch Together',
        description: 'React in real-time. Text, video call, or just watch knowing you\'re all experiencing the same moment.'
      }
    ],
    techSidebar: 'Sub-5-second latency ensures you\'re never more than one play behind real-time. Works with most streaming platforms.',
    deepDiveLink: {
      text: 'View technical case study',
      href: '/work/case-study-030'
    }
  },

  secondaryCTAs: {
    headline: 'More Ways to Engage',
    paths: [
      {
        label: 'View Case Study',
        description: 'See how Rumi was built—technical architecture, AI thumbnail generation, and 2-week sprint execution.',
        href: '/work/case-study-030'
      },
      {
        label: 'Partner With Us',
        description: 'League, team, or platform interested in integrated watch parties? Let\'s talk.',
        href: '/partnerships'
      },
      {
        label: 'Learn About Rationale',
        description: 'Rumi is built by Rationale, a studio that ships consumer products fast.',
        href: '/'
      }
    ]
  },

  seo: {
    title: 'Rumi - Watch Live Sports Together, From Anywhere',
    description: 'Instant watch parties for live sports. Perfect sync, no downloads, works on any device. Create a link, share with friends, watch together. Free.',
    keywords: ['watch party', 'sports streaming', 'live sports together', 'watch sports with friends', 'synchronized streaming', 'sports watch party']
  }
};
