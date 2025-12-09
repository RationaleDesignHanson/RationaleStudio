// Heirloom Shared Constants
// Design system values extracted from iOS app

// ========== VINTAGE BACKGROUND COLORS ==========
// From CardStyle.swift - 8 vintage paper colors
export const VINTAGE_COLORS = {
  cream: '#FEFDFB',
  warmWhite: '#FFF9E6',
  vanilla: '#FFF4E0',
  linen: '#F8F3E8',
  peach: '#FFE5D9',
  lightBlue: '#E8F2F7',
  mint: '#F0F7E8',
  tan: '#FCF0E3',
} as const;

export const VINTAGE_COLOR_NAMES = [
  'cream',
  'warmWhite',
  'vanilla',
  'linen',
  'peach',
  'lightBlue',
  'mint',
  'tan',
] as const;

// ========== BRAND COLORS ==========
export const BRAND_COLORS = {
  tomatoRed: '#E74C3C',
  amberGold: '#F39C12',
  sageGreen: '#8BA888',
  burntSienna: '#8B4513',
  cream: '#F5F5DC',
} as const;

// ========== CARD DIMENSIONS ==========
export const CARD_CONFIG = {
  aspectRatio: 3 / 4, // 3:4 portrait
  cornerRadius: 16,
  defaultWidth: 400,
  defaultHeight: 533, // 400 * (4/3)
  shadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  padding: 24,
} as const;

// ========== STICKER METADATA ==========
export interface Sticker {
  id: string;
  name: string;
  category: 'food' | 'love' | 'endorsements' | 'occasions';
  filename: string;
  path: string;
  description: string;
}

export const STICKERS: Sticker[] = [
  {
    id: 'garlic',
    name: 'Garlic',
    category: 'food',
    filename: 'sticker_food_garlic.png',
    path: '/heirloom/stickers/sticker_food_garlic.png',
    description: 'Garlic bulb with personality',
  },
  {
    id: 'heart',
    name: 'Heart',
    category: 'love',
    filename: 'sticker_love_heart.png',
    path: '/heirloom/stickers/sticker_love_heart.png',
    description: 'Hand-drawn red heart',
  },
  {
    id: 'pie',
    name: 'Pie Slice',
    category: 'food',
    filename: 'sticker_food_pie.png',
    path: '/heirloom/stickers/sticker_food_pie.png',
    description: 'Slice of homemade pie',
  },
  {
    id: 'kiss',
    name: 'Lipstick Kiss',
    category: 'love',
    filename: 'sticker_love_kiss.png',
    path: '/heirloom/stickers/sticker_love_kiss.png',
    description: 'Red lipstick kiss mark',
  },
  {
    id: 'made-with-love',
    name: 'Made With Love',
    category: 'love',
    filename: 'sticker_love_badge.png',
    path: '/heirloom/stickers/sticker_love_badge.png',
    description: 'Made with love badge',
  },
  {
    id: 'gift',
    name: 'Gift Box',
    category: 'love',
    filename: 'sticker_love_gift.png',
    path: '/heirloom/stickers/sticker_love_gift.png',
    description: 'Wrapped gift with bow',
  },
  {
    id: 'five-stars',
    name: 'Five Stars',
    category: 'endorsements',
    filename: 'sticker_endorse_fivestars.png',
    path: '/heirloom/stickers/sticker_endorse_fivestars.png',
    description: 'Five gold stars rating',
  },
  {
    id: 'chefs-kiss',
    name: "Chef's Kiss",
    category: 'endorsements',
    filename: 'sticker_endorse_chefskiss.png',
    path: '/heirloom/stickers/sticker_endorse_chefskiss.png',
    description: "Chef's kiss hand gesture",
  },
  {
    id: 'family-recipe',
    name: 'Family Recipe',
    category: 'occasions',
    filename: 'sticker_occasion_family.png',
    path: '/heirloom/stickers/sticker_occasion_family.png',
    description: 'Family recipe badge',
  },
  {
    id: 'grandmas-secret',
    name: "Grandma's Secret",
    category: 'occasions',
    filename: 'sticker_occasion_grandma.png',
    path: '/heirloom/stickers/sticker_occasion_grandma.png',
    description: "Grandma's secret recipe badge",
  },
];

// ========== LOVE MARKS ==========
export interface LoveMark {
  id: string;
  type: 'coffee-stain' | 'worn-edge';
  intensity: number; // 0.0 to 1.0
}

export interface CoffeeStain extends LoveMark {
  type: 'coffee-stain';
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  size: number; // px
  rotation: number; // degrees
}

export interface WornEdge extends LoveMark {
  type: 'worn-edge';
  edges: ('top' | 'bottom' | 'left' | 'right')[];
}

// ========== ANNOTATIONS ==========
export interface Annotation {
  id: string;
  text: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  rotation: number; // degrees -15 to 15
  fontSize: number; // px
  color: string;
}

// ========== PLACED STICKERS ==========
export interface PlacedSticker {
  id: string;
  stickerId: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  rotation: number; // degrees -30 to 30
  scale: number; // 0.5 to 2.0
}

// ========== CARD DATA ==========
export interface RecipeCard {
  id: string;
  recipeName: string;
  backgroundColor: keyof typeof VINTAGE_COLORS;
  stickers: PlacedSticker[];
  annotations: Annotation[];
  loveMarks: LoveMark[];
  timesCooked: number;
}

// ========== TYPOGRAPHY ==========
export const TYPOGRAPHY = {
  title: {
    fontFamily: 'var(--font-serif)',
    fontSize: {
      large: '34px',
      medium: '28px',
      small: '22px',
    },
    lineHeight: 1.2,
  },
  body: {
    fontFamily: 'var(--font-sans)',
    fontSize: {
      large: '17px',
      medium: '16px',
      small: '15px',
    },
    lineHeight: 1.4,
  },
  handwritten: {
    fontFamily: "'Caveat', cursive", // Google Font
    fontSize: {
      large: '24px',
      medium: '20px',
      small: '18px',
    },
    lineHeight: 1.3,
  },
} as const;

// ========== ANIMATION PRESETS ==========
export const ANIMATION = {
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  },
  smooth: {
    duration: 0.3,
    ease: 'easeInOut',
  },
  bounce: {
    type: 'spring',
    stiffness: 400,
    damping: 10,
  },
} as const;

// ========== LOVE MARKS THRESHOLDS ==========
// Based on timesCooked, automatically add love marks
export const LOVE_MARKS_CONFIG = {
  coffeeStains: [
    { threshold: 5, count: 1 },
    { threshold: 10, count: 2 },
    { threshold: 20, count: 3 },
  ],
  wornEdges: {
    threshold: 10, // Start showing worn edges after 10 cooks
    maxIntensity: 0.5, // At 50+ cooks
  },
} as const;

// ========== SAMPLE RECIPES (for demos) ==========
export const SAMPLE_RECIPES = {
  lasagna: {
    name: 'Classic Lasagna',
    prepTime: 30,
    cookTime: 60,
    servings: 8,
    ingredients: [
      '1 lb ground beef',
      '1 onion, diced',
      '3 cloves garlic, minced',
      '2 cans (28 oz) crushed tomatoes',
      '2 tbsp tomato paste',
      '2 tsp dried basil',
      '1 tsp dried oregano',
      '1/2 tsp salt',
      '1/4 tsp black pepper',
      '12 lasagna noodles',
      '15 oz ricotta cheese',
      '2 cups shredded mozzarella',
      '1/2 cup grated parmesan',
      '1 egg',
      '2 tbsp fresh parsley, chopped',
    ],
  },
  chocolate_chip_cookies: {
    name: 'Chocolate Chip Cookies',
    prepTime: 15,
    cookTime: 12,
    servings: 24,
    ingredients: [
      '2 1/4 cups all-purpose flour',
      '1 tsp baking soda',
      '1 tsp salt',
      '1 cup butter, softened',
      '3/4 cup granulated sugar',
      '3/4 cup packed brown sugar',
      '2 large eggs',
      '2 tsp vanilla extract',
      '2 cups chocolate chips',
    ],
  },
  chicken_soup: {
    name: "Grandma's Chicken Soup",
    prepTime: 20,
    cookTime: 45,
    servings: 6,
    ingredients: [
      '1 whole chicken (3-4 lbs)',
      '8 cups water',
      '3 carrots, sliced',
      '3 celery stalks, sliced',
      '1 onion, diced',
      '3 cloves garlic, minced',
      '2 bay leaves',
      '1 tsp dried thyme',
      '1 tsp salt',
      '1/2 tsp black pepper',
      '2 cups egg noodles',
      '2 tbsp fresh parsley, chopped',
    ],
  },
} as const;
