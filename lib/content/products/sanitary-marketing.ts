/**
 * Sanitary Waste System Marketing Content (040)
 *
 * Physical Product marketing page content centered on JTBD:
 * "When I manage pet waste, I need a solution that's hygienic, mess-free,
 * and doesn't require daily trips outside."
 */

import { ProductMarketingContent } from './types';

export const sanitaryMarketingContent: ProductMarketingContent = {
  slug: 'sanitary-system',
  productName: '040',
  category: 'physical',

  jtbd: {
    functional: 'When I manage pet waste, I need a solution that\'s hygienic, mess-free, and doesn\'t require daily trips outside.',
    emotional: 'I want to feel confident my home is clean and odor-free, without guilt about pet care shortcuts.',
    social: 'I want to be seen as a responsible pet owner who maintains a hygienic, welcoming home.'
  },

  hero: {
    preHeadline: 'Pet Care Innovation',
    headline: 'Hygienic Pet Care, Zero Daily Mess',
    subheadline: 'For pet owners tired of litter box odors and daily outdoor trips—an absorbent-lined containment system that lasts 7 days without emptying.',
    ctaPrimary: {
      text: 'Reserve Yours (Pre-Order)',
      href: '/contact?product=sanitary-system'
    },
    ctaSecondary: {
      text: 'See How It Works',
      href: '/clients/work/sanitary-waste-system/quick-overview'
    }
  },

  problem: {
    headline: 'The Problem: Litter Boxes Are Disgusting',
    scenarios: [
      {
        scenario: 'Your litter box smells. You scoop daily, but the odor lingers. Guests notice the second they walk in. You\'ve tried every "odor control" litter on the market. Nothing works perfectly.'
      },
      {
        scenario: 'It\'s winter. Your dog needs to go. You put on a coat, grab a bag, walk outside in 20°F weather at 11pm. You do this twice a day, every day. You\'re exhausted.'
      },
      {
        scenario: 'You travel for work 3 days per week. Your pet sitter handles waste, but you feel guilty about the mess they deal with. There has to be a better system.'
      }
    ],
    transition: 'What if pet waste management was hygienic, odor-free, and required zero daily effort?'
  },

  solution: {
    headline: 'How 040 Solves This',
    useCases: [
      {
        trigger: 'When your pet goes',
        action: '040 uses absorbent-lined, interfold bags that lock in moisture and odor instantly',
        outcome: 'No smell, no mess, no immediate cleanup required. Just dispose when the bag is full.'
      },
      {
        trigger: 'When you need to empty',
        action: '040\'s flat-pack format holds 7 days of waste—no daily trips outside, no scooping',
        outcome: 'Empty once per week. Seal the bag, toss it. Done in 30 seconds.'
      },
      {
        trigger: 'When you travel',
        action: '040 operates independently—no daily maintenance, no odor buildup',
        outcome: 'Leave for 4 days. Come home to zero mess. Your pet sitter thanks you.'
      },
      {
        trigger: 'When you want hygiene',
        action: '040 uses airlaid non-woven + PBAT/LDPE film for 95% odor reduction',
        outcome: 'Guests don\'t smell anything. Your home stays fresh without daily intervention.'
      }
    ],
    visual: {
      type: 'image',
      description: 'Product photos showing dispenser, flat-pack bags, and step-by-step usage'
    }
  },

  proof: {
    headline: 'What You Get',
    outcomes: [
      {
        metric: '95% odor reduction',
        context: 'Absorbent lining + sealed containment = no lingering smells between disposals.'
      },
      {
        metric: '7-day capacity',
        context: 'Average household: dispose once per week, not daily.'
      },
      {
        metric: 'Zero daily mess',
        context: 'No scooping, no outdoor trips, no immediate cleanup. Just weekly disposal.'
      },
      {
        metric: '$435M+ market',
        context: 'Pet waste management is a massive, underserved category ripe for innovation.'
      }
    ]
  },

  cta: {
    headline: 'Reserve Your System',
    subheadline: '040 is in prototyping. Pre-order now to lock in early pricing and be first in line for delivery.',
    buttonText: 'Pre-Order Now',
    formFields: ['email', 'pet_type', 'household_size', 'ship_date_preference'],
    trustSignal: 'Pre-orders ship Q2 2026. No charge until we ship. Cancel anytime before fulfillment.'
  },

  whoItsFor: {
    headline: 'Built For',
    personas: [
      'You\'re tired of daily litter box scooping and lingering odors',
      'You take your dog outside multiple times daily and want less frequent trips',
      'You travel regularly and need a low-maintenance system for pet sitters',
      'You care about hygiene and want a cleaner, more dignified waste solution'
    ],
    antiPersonas: [
      'You don\'t mind daily litter maintenance',
      'Your pet waste routine already works perfectly for you'
    ]
  },

  howItWorks: {
    headline: 'How 040 Works',
    steps: [
      {
        title: 'Install the Dispenser',
        description: 'Mount the proprietary dispenser in your home. Works for indoor pet areas or near outdoor access points.'
      },
      {
        title: 'Load Flat-Pack Bags',
        description: 'Interfold bags stack neatly in the dispenser. Pull one out as needed—just like tissue boxes.'
      },
      {
        title: 'Pet Uses System',
        description: 'When your pet goes, the absorbent lining locks in moisture and odor immediately. No scooping, no cleanup.'
      },
      {
        title: 'Dispose Weekly',
        description: 'Once per week (or when bag is full), seal it, toss it. Replace with a fresh bag from the dispenser.'
      }
    ],
    techSidebar: 'Built with airlaid non-woven fabric, PBAT/LDPE biodegradable film, and interfold dispensing technology.',
    deepDiveLink: {
      text: 'View full product overview',
      href: '/clients/work/sanitary-waste-system/full-overview'
    }
  },

  secondaryCTAs: {
    headline: 'More Ways to Engage',
    paths: [
      {
        label: 'View Product Overview',
        description: 'See the full product breakdown—design, materials, manufacturing strategy, and go-to-market plan.',
        href: '/clients/work/sanitary-waste-system/quick-overview'
      },
      {
        label: 'Explore Investment',
        description: '040 is raising pre-seed funding. See market opportunity, IP strategy, and retail beta plan.',
        href: '/contact?interest=investment'
      },
      {
        label: 'Learn About Rationale',
        description: '040 is developed by Rationale in partnership with domain experts and material scientists.',
        href: '/'
      }
    ]
  },

  seo: {
    title: '040 - Hygienic Pet Care, Zero Daily Mess',
    description: 'Revolutionary pet waste management system. 95% odor reduction, 7-day capacity, no daily maintenance. Pre-order for Q2 2026 delivery.',
    keywords: ['pet waste management', 'litter box alternative', 'pet hygiene', 'dog waste system', 'odor control', 'pet care innovation']
  }
};
