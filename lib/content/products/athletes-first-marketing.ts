/**
 * Athletes-First Marketing Content (020)
 *
 * Partnership/Complex Systems marketing page content centered on JTBD:
 * "When I represent 50+ athletes, I need to scale personal attention
 * without hiring 10 more staff—AI helps me stay connected and responsive at scale."
 */

import { ProductMarketingContent } from './types';

export const athletesFirstMarketingContent: ProductMarketingContent = {
  slug: 'athletes-first',
  productName: 'Athletes-First',
  category: 'partnership',

  jtbd: {
    functional: 'When I represent 50+ athletes, I need to scale personal attention without hiring 10 more staff so athletes feel supported at every stage.',
    emotional: 'I want to feel confident every athlete gets the attention they deserve, not just the top earners.',
    social: 'I want to be known as the agent who never drops the ball and treats every athlete like they matter.'
  },

  hero: {
    preHeadline: 'Sports & Entertainment Platform',
    headline: 'Scale Personal Attention Across 50+ Athletes',
    subheadline: 'For sports agents juggling dozens of relationships—AI-powered tools for recruitment, NIL compliance, immersive pitches, and content generation at scale.',
    ctaPrimary: {
      text: 'Explore Partnership',
      href: '/contact?product=athletes-first'
    },
    ctaSecondary: {
      text: 'View Platform Demo',
      href: '/work/athletes-first/overview'
    }
  },

  problem: {
    headline: 'The Problem: You Can\'t Be Everywhere',
    scenarios: [
      {
        scenario: 'You represent 47 athletes. Five are in contract negotiations. Twelve need NIL deals reviewed. Eight want brand partnerships. Three have injury concerns. You have 24 hours in a day. Someone always feels neglected.'
      },
      {
        scenario: 'Your best pitch is in a 60-slide deck. You delivered it in person to your top 3 clients. The other 44? They got the email version. Engagement: terrible. You know you need scale, but you can\'t clone yourself.'
      },
      {
        scenario: 'NIL compliance is a legal minefield. Every deal needs review. Your compliance officer is buried. Athletes are frustrated by delays. Deals fall through because you couldn\'t move fast enough.'
      }
    ],
    transition: 'What if AI helped you be in 10 places at once—without sacrificing quality or personal touch?'
  },

  solution: {
    headline: 'How Athletes-First Solves This',
    useCases: [
      {
        trigger: 'When you need to pitch remotely',
        action: 'Athletes-First creates immersive, interactive pitch experiences—3D walkthroughs, Vision Pro spatial presentations, and personalized video messages',
        outcome: 'Athletes engage with your pitch on their terms, on their devices. You get analytics on what they watched.'
      },
      {
        trigger: 'When NIL deals need review',
        action: 'Athletes-First automates compliance checks—flagging red flags, suggesting edits, routing approvals',
        outcome: 'Deals reviewed in hours, not weeks. Athletes stay compliant without legal bottlenecks.'
      },
      {
        trigger: 'When athletes need brand content',
        action: 'Athletes-First generates on-brand imagery, video, and social posts using AI—one photoshoot creates hundreds of variations',
        outcome: 'Athletes maintain social presence without constant production. Brand deals scale effortlessly.'
      },
      {
        trigger: 'When recruiting top talent',
        action: 'Athletes-First provides data-driven insights on athlete fit, market value, and career trajectory',
        outcome: 'Recruit smarter, faster. Know who to pursue and what to offer before your competitors.'
      }
    ],
    visual: {
      type: 'demo',
      description: 'Platform dashboard showing RecruitAI, Immersive Pitch, NIL Compliance, and AmplifyAI modules'
    }
  },

  proof: {
    headline: 'What You Get',
    outcomes: [
      {
        metric: '15 hours saved per week',
        context: 'Automate NIL reviews, content generation, and compliance workflows.'
      },
      {
        metric: '3x faster athlete responses',
        context: 'Immersive pitches and AI-drafted communications keep athletes engaged.'
      },
      {
        metric: 'Scale without hiring',
        context: 'Manage 50+ athletes with the same team size. AI handles the repetitive work.'
      },
      {
        metric: '40+ interactive demos',
        context: 'Vision Pro experiences, 3D walkthroughs, and personalized pitch decks already built.'
      }
    ]
  },

  cta: {
    headline: 'Explore Partnership Opportunities',
    subheadline: 'Athletes-First is in active development. We\'re partnering with select agencies to pilot the platform.',
    buttonText: 'Schedule Strategic Call',
    formFields: ['email', 'agency_name', 'athlete_count', 'partnership_interest'],
    trustSignal: 'We\'ll reach out within 48 hours to discuss partnership terms and pilot access.'
  },

  whoItsFor: {
    headline: 'Built For',
    personas: [
      'You represent 20+ athletes and struggle to give everyone equal attention',
      'You need NIL compliance workflows that don\'t bottleneck your deals',
      'You want to scale brand content without constant photoshoots',
      'You pitch remotely and need more engaging presentation tools'
    ],
    antiPersonas: [
      'You represent <10 athletes',
      'You don\'t see AI as relevant to athlete representation'
    ]
  },

  howItWorks: {
    headline: 'How Athletes-First Works',
    steps: [
      {
        title: 'Four Integrated Modules',
        description: 'RecruitAI (data-driven recruiting), Immersive Pitch (3D/Vision Pro presentations), NIL Compliance (automated legal review), AmplifyAI (content generation at scale).'
      },
      {
        title: 'Customized to Your Agency',
        description: 'We configure the platform for your brand, compliance requirements, and athlete roster.'
      },
      {
        title: 'Pilot with Select Athletes',
        description: 'Start with 5-10 athletes. Test workflows, gather feedback, refine before full rollout.'
      },
      {
        title: 'Scale Across Your Roster',
        description: 'Once proven, expand to your entire athlete network. AI adapts to your agency\'s unique needs.'
      }
    ],
    techSidebar: 'Built with Vision Pro spatial computing, generative AI for content, and privacy-first compliance architecture.',
    deepDiveLink: {
      text: 'View full platform overview',
      href: '/work/athletes-first/overview'
    }
  },

  secondaryCTAs: {
    headline: 'More Ways to Engage',
    paths: [
      {
        label: 'View Platform Demo',
        description: '40+ interactive demos showcasing RecruitAI, Immersive Pitch, NIL tools, and AmplifyAI.',
        href: '/work/athletes-first/overview'
      },
      {
        label: 'Explore Investment',
        description: 'Athletes-First is raising a strategic round. See roadmap, traction, and financials.',
        href: '/contact?interest=investment'
      },
      {
        label: 'Learn About Rationale',
        description: 'Athletes-First is built by Rationale, a studio that partners with industry experts to build complex systems.',
        href: '/'
      }
    ]
  },

  seo: {
    title: 'Athletes-First - Scale Personal Attention Across 50+ Athletes',
    description: 'AI-powered platform for sports agents. RecruitAI, Immersive Pitch, NIL Compliance, and content generation at scale. Explore partnership opportunities.',
    keywords: ['sports agent software', 'NIL compliance platform', 'athlete management', 'sports tech', 'athlete representation platform']
  }
};
