/**
 * Sanitary Waste System Marketing Content (Nimbus)
 *
 * Physical Product marketing page content centered on JTBD:
 * "When I pick up after my dog, I need a bag that eliminates the disgusting
 * sensory experience of warmth and texture so I can enjoy walks without dread."
 */

import { ProductMarketingContent } from './types';

export const sanitaryMarketingContent: ProductMarketingContent = {
  slug: 'nimbus',
  productName: 'Nimbus',
  category: 'physical',

  jtbd: {
    functional: 'When I pick up after my dog, I need a bag that eliminates the disgusting sensory experience so I can walk without dread.',
    emotional: 'I want to stop feeling grossed out every time I have to pick up after my dog, especially when it\'s not solid.',
    social: 'I want to be a responsible dog owner who picks up without the visible hesitation or disgust that other people notice.'
  },

  hero: {
    preHeadline: 'Dog Waste Pickup Innovation',
    headline: 'Pickup Without the Gross Part',
    subheadline: 'Absorbent-lined pickup bags that eliminate the warmth, texture, and unpredictability—so every walk is worry-free.',
    ctaPrimary: {
      text: 'Join the Waitlist',
      href: '/contact?product=nimbus'
    },
    ctaSecondary: {
      text: 'See How It Works',
      href: '/clients/work/sanitary-waste-system/quick-overview'
    }
  },

  problem: {
    headline: 'Every Dog Owner Knows This Feeling',
    scenarios: [
      {
        scenario: 'You reach down with a thin plastic bag. The second you pick it up, you feel it—the warmth, the texture transmitting through the film. You hate this moment. Every single walk, you dread it.'
      },
      {
        scenario: 'Your dog has loose stool. Your stomach drops. You know the bag might tear, might leak, might smear. You use two bags, maybe three. You feel disgusting. You can\'t wait to get home and wash your hands.'
      },
      {
        scenario: 'You see other dog owners hesitate, grimace, double-bag. Everyone hates this. It\'s the worst part of dog ownership. And nobody has solved it—until now.'
      }
    ],
    transition: 'What if pickup felt clean, dry, and insulated—no matter what consistency you\'re dealing with?'
  },

  solution: {
    headline: 'How Nimbus Solves This',
    useCases: [
      {
        trigger: 'When you pick up (even loose stool)',
        action: 'Absorbent liner instantly wicks moisture and blocks heat transfer—40-60x thicker than standard bags',
        outcome: 'You feel insulation, not warmth. Dryness, not moisture. Confidence, not disgust.'
      },
      {
        trigger: 'When you worry about tears or leaks',
        action: 'Three-layer construction (absorbent core + film barrier) handles liquid and prevents breakthrough',
        outcome: 'No more double-bagging. No more anxiety. Just grab one bag and go.'
      },
      {
        trigger: 'When you want one-handed convenience',
        action: 'Pop-up dispensing format auto-presents the next bag—clips to your leash like a premium accessory',
        outcome: 'Same familiar invert-and-tie motion. Zero learning curve. Massively better experience.'
      },
      {
        trigger: 'When you care about the planet',
        action: 'Available in compostable PBAT/PLA or recycled LDPE—both more sustainable than single-use plastic',
        outcome: 'Feel good about pickup in every way: hygiene, convenience, and environmental impact.'
      }
    ],
    visual: {
      type: 'screenshots',
      description: 'Product photos showing material cross-section, dispenser, and in-use shots during walks'
    }
  },

  proof: {
    headline: 'What Makes It Work',
    outcomes: [
      {
        metric: '600-1000 microns',
        context: 'Absorbent liner is 40-60x thicker than standard bags—you feel insulation, not waste.'
      },
      {
        metric: 'Instant wicking',
        context: 'Airlaid non-woven fabric absorbs moisture in seconds—handles loose stool without breakthrough.'
      },
      {
        metric: 'Pop-up dispensing',
        context: 'Interfolded format means next bag auto-presents after every pull—just like premium tissues.'
      },
      {
        metric: '90M dog owners',
        context: 'Every single one faces this problem daily. Nobody has solved the disgust barrier—until now.'
      }
    ]
  },

  cta: {
    headline: 'Be First to Try It',
    subheadline: 'Nimbus is in beta testing with select dog owners. Join the waitlist to get early access and exclusive launch pricing.',
    buttonText: 'Join Waitlist',
    formFields: ['email', 'dog_breed', 'walk_frequency', 'biggest_pain_point'],
    trustSignal: 'Beta launches Q2 2025. No payment required to join waitlist. Cancel anytime.'
  },

  whoItsFor: {
    headline: 'Built For',
    personas: [
      'You walk your dog daily and dread the pickup moment every single time',
      'You\'ve dealt with loose stool and the anxiety of bag failure—you want confidence',
      'You double-bag or use leaves/grass to avoid the gross feeling—there has to be a better way',
      'You want premium products for your dog but pickup bags haven\'t innovated in 30 years'
    ],
    antiPersonas: [
      'You only walk your dog occasionally and pickup isn\'t a pain point',
      'You genuinely don\'t mind the current bag experience (if this is you, we\'re jealous)'
    ]
  },

  howItWorks: {
    headline: 'How Nimbus Works',
    steps: [
      {
        title: 'Clip to Your Leash',
        description: 'Premium leash-mounted dispenser with soft-touch neoprene. Looks like a high-end dog accessory, not a poop bag holder.'
      },
      {
        title: 'Pop Out a Bag',
        description: 'Pull one bag, next one auto-presents. Interfolded flat-pack format—no fumbling with rolls or perforations.'
      },
      {
        title: 'Pick Up (Without the Gross Part)',
        description: 'Same invert-and-tie motion you know. But now you feel insulation and dryness—the absorbent liner blocks heat and moisture.'
      },
      {
        title: 'Dispose & Refill',
        description: 'Toss the bag. Reload the dispenser with a fresh flat-pack when empty. Available in subscription or one-time purchase.'
      }
    ],
    techSidebar: 'Built with airlaid non-woven absorbent core, compostable PBAT/PLA outer film, and zone bonding for flexibility. Manufactured using interfold converting lines (same tech as premium tissues).',
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
        description: 'See the full product breakdown—material science, manufacturing strategy, and go-to-market plan.',
        href: '/clients/work/sanitary-waste-system/quick-overview'
      },
      {
        label: 'Explore Investment',
        description: 'Nimbus is raising pre-seed funding. See market opportunity, IP strategy, and retail beta plan.',
        href: '/contact?interest=investment'
      },
      {
        label: 'Learn About Rationale',
        description: 'Nimbus is developed by Rationale Studio in partnership with material scientists and pet industry experts.',
        href: '/'
      }
    ]
  },

  seo: {
    title: 'Nimbus - Pickup Without the Gross Part | Absorbent Dog Waste Bags',
    description: 'Revolutionary dog waste pickup bags with absorbent lining. Eliminates warmth and texture, handles loose stool without tears. Premium dispensing for modern dog owners.',
    keywords: ['dog waste bags', 'absorbent poop bags', 'premium dog waste', 'loose stool bags', 'dog walk accessories', 'sanitary pet waste', 'nimbus']
  }
};
