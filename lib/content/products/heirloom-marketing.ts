/**
 * Heirloom Marketing Content
 *
 * Consumer-friendly marketing page content centered on JTBD:
 * "When I find a recipe I want to try, I need a single place to save,
 * organize, and access it—whether it's from Instagram, a text, or my mom's handwriting."
 */

import { ProductMarketingContent } from './types';

export const heirloomMarketingContent: ProductMarketingContent = {
  slug: 'heirloom',
  productName: 'Heirloom',
  category: 'consumer',

  jtbd: {
    functional: 'When I find a recipe I want to try, I need a single place to save, organize, and access it—whether it\'s from Instagram, a text, or my mom\'s handwriting.',
    emotional: 'I want to feel connected to family cooking traditions and proud of meals I create.',
    social: 'I want to be seen as someone who cooks with care and preserves family recipes.'
  },

  hero: {
    preHeadline: 'Recipe Management',
    headline: 'Save Every Recipe. Cook With Confidence.',
    subheadline: 'One place for all your recipes—from Instagram saves to grandma\'s handwritten cards. Import, organize, scale ingredients, and create shopping lists in seconds.',
    ctaPrimary: {
      text: 'Join Beta on TestFlight',
      href: 'https://testflight.apple.com/join/gs6EU81Z'
    },
    ctaSecondary: {
      text: 'Watch How It Works',
      href: '/work/heirloom/pitch'
    }
  },

  problem: {
    headline: 'The Problem: Recipe Chaos Across Apps',
    scenarios: [
      {
        scenario: 'You screenshot recipes from Instagram. Bookmark food blogs. Text yourself ingredient lists. Your mom emails you her lasagna recipe. Your friend sends you a Pinterest link. It\'s all scattered—phone photos, random bookmarks, sticky notes in the kitchen.'
      },
      {
        scenario: 'When you\'re ready to cook, you spend 10 minutes hunting for that one recipe you saved 3 weeks ago. Was it on your phone? In your email? On that piece of paper somewhere?'
      },
      {
        scenario: 'You find the recipe but it serves 4 and you need 8. Now you\'re doing mental math for every ingredient while trying to cook. Half the time, you mess up the measurements.'
      }
    ],
    transition: 'What if every recipe lived in one beautiful place, automatically organized and ready to cook?'
  },

  solution: {
    headline: 'How Heirloom Solves This',
    useCases: [
      {
        trigger: 'When you find a recipe online',
        action: 'Heirloom imports it with one tap—ingredients, steps, photos, all formatted beautifully',
        outcome: 'Save from any website or app. Everything auto-organized by meal type and cuisine.'
      },
      {
        trigger: 'When you need to scale servings',
        action: 'Heirloom recalculates every ingredient instantly',
        outcome: 'Tap "6 servings" instead of 4. All measurements update automatically. No math required.'
      },
      {
        trigger: 'When you\'re ready to shop',
        action: 'Heirloom generates a shopping list from your selected recipes',
        outcome: 'All ingredients combined and organized by store section. Check off items as you shop.'
      },
      {
        trigger: 'When you cook mom\'s handwritten recipe',
        action: 'Heirloom lets you snap a photo and save it alongside digital recipes',
        outcome: 'Handwritten cards preserved forever. Search by name, tag with family memories.'
      }
    ],
    visual: {
      type: 'screenshots',
      description: 'iOS app screenshots showing recipe import, scaling interface, shopping list, and vintage aesthetic'
    }
  },

  proof: {
    headline: 'What You Get',
    outcomes: [
      {
        metric: 'One place for everything',
        context: 'Import from any website. Snap photos of handwritten cards. Type in your own. All organized automatically.'
      },
      {
        metric: 'Scale ingredients instantly',
        context: 'Recipe serves 4 but you need 6? Tap once. Every measurement recalculates in real-time.'
      },
      {
        metric: 'Shopping lists in seconds',
        context: 'Pick 3 recipes for the week. Heirloom combines all ingredients into one organized list.'
      },
      {
        metric: 'iCloud sync across devices',
        context: 'Save on your phone, cook with your iPad. Your recipes are always with you, always in sync.'
      }
    ]
  },

  cta: {
    headline: 'Try Heirloom Free',
    subheadline: 'Join the beta—free on TestFlight for iOS. No credit card, no commitment.',
    buttonText: 'Download on TestFlight',
    trustSignal: 'Available for iPhone and iPad. iOS 16 or later.'
  },

  whoItsFor: {
    headline: 'Built For',
    personas: [
      'You save recipes from multiple sources (web, Instagram, texts, handwritten notes)',
      'You cook regularly and want a better system than scattered screenshots',
      'You want to preserve family recipes and pass them down',
      'You need to scale servings or create shopping lists without manual work'
    ],
    antiPersonas: [
      'You rarely cook and don\'t save recipes',
      'You prefer keeping recipes in physical cookbooks only'
    ]
  },

  howItWorks: {
    headline: 'How Heirloom Works',
    steps: [
      {
        title: 'Save Any Recipe',
        description: 'Import from websites with one tap. Snap photos of handwritten cards. Type in your own. Heirloom automatically extracts ingredients, steps, and photos.'
      },
      {
        title: 'Organize Automatically',
        description: 'Recipes are tagged by meal type (breakfast, dinner), cuisine (Italian, Mexican), and custom tags you create (quick meals, family favorites).'
      },
      {
        title: 'Scale & Shop',
        description: 'Change serving size—ingredients recalculate instantly. Select recipes for the week and generate a combined shopping list.'
      },
      {
        title: 'Cook With Confidence',
        description: 'Clean, distraction-free cooking mode. Step-by-step instructions. Photos for reference. Timer integration.'
      }
    ],
    techSidebar: 'Built with SwiftUI for iOS. iCloud sync keeps your recipes private and synced across all your Apple devices.',
    deepDiveLink: {
      text: 'View technical case study',
      href: '/work/heirloom'
    }
  },

  fullFeatureSet: {
    headline: 'Complete Feature Set',
    description: 'Heirloom includes powerful features beyond what\'s shown in the interactive demos.',
    demoedFeatures: {
      headline: 'Try These Features in the Demo',
      link: {
        text: 'Explore interactive demos',
        href: '/work/heirloom'
      },
      features: [
        {
          name: 'Smart Shopping Lists',
          description: 'Automatically consolidates ingredients from multiple recipes, groups by category, and supports metric/imperial conversion'
        },
        {
          name: 'Dinner Party Timeline',
          description: 'Intelligent recipe sequencing that calculates when to start each dish so everything finishes perfectly at meal time'
        }
      ]
    },
    additionalFeatures: {
      headline: 'Additional Features in the Full App',
      features: [
        {
          name: 'Recipe Card Personalization',
          description: 'Customize card layouts, fonts, and colors. Design beautiful recipe cards that reflect your style or family heritage'
        },
        {
          name: 'Social Sharing',
          description: 'Share recipes with family and friends. Send as beautifully formatted PDFs or invite others to collaborate on collections'
        },
        {
          name: 'Community Recommendations',
          description: 'Discover new recipes through comments and ratings. See what adaptations others have made to classic dishes'
        },
        {
          name: 'Advanced Search & Filters',
          description: 'Find recipes by ingredients you have on hand, dietary restrictions, prep time, or cuisine type'
        },
        {
          name: 'Photo Management',
          description: 'Add multiple photos per recipe. Preserve handwritten cards with OCR text extraction for searchability'
        },
        {
          name: 'Recipe Collections',
          description: 'Organize recipes into custom collections like "Weeknight Dinners", "Holiday Baking", or "Mom\'s Recipes"'
        }
      ]
    }
  },

  secondaryCTAs: {
    headline: 'More Ways to Engage',
    paths: [
      {
        label: 'View Product Pitch',
        description: 'See the full vision—design philosophy, UX principles, and roadmap for Heirloom.',
        href: '/work/heirloom/pitch'
      },
      {
        label: 'View Case Study',
        description: 'How Heirloom was built—technical architecture, design system, and SwiftUI implementation.',
        href: '/work/heirloom'
      },
      {
        label: 'Learn About Rationale',
        description: 'Heirloom is built by Rationale, a product studio that ships consumer products.',
        href: '/'
      }
    ]
  },

  seo: {
    title: 'Heirloom - Save Every Recipe, Cook With Confidence',
    description: 'Recipe management app for iPhone and iPad. Import from any website, scale ingredients, create shopping lists, and preserve family recipes. Free on TestFlight.',
    keywords: ['recipe app', 'recipe manager', 'cooking app', 'recipe organizer', 'iOS recipe app', 'family recipes', 'meal planning']
  }
};
