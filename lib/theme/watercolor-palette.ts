/**
 * Computational ASCII Watercolor Color Palette
 *
 * Vibrant, harmonious colors for section-specific theming
 * Used by ASCII backgrounds, dividers, and UI accents
 */

export type WatercolorTheme = {
  name: string;
  colors: readonly string[];        // 2-3 colors that blend together
  primary: string;         // Main color for accents
  description: string;
};

/**
 * Predefined color themes for different sections
 */
export const watercolorThemes = {
  coolPurple: {
    name: 'Cool Purple',
    colors: ['#a855f7', '#6366f1', '#06b6d4'], // bright purple → indigo → cyan (wider range)
    primary: '#6366f1',
    description: 'Cool, professional, technical'
  },

  tealPink: {
    name: 'Teal Pink',
    colors: ['#0d9488', '#06b6d4', '#f472b6'], // deep teal → cyan → bright pink (more contrast)
    primary: '#14b8a6',
    description: 'Fresh, creative, energetic'
  },

  coralOrange: {
    name: 'Coral Orange',
    colors: ['#ea580c', '#fb923c', '#ec4899'], // deep orange → coral → pink (stronger orange)
    primary: '#f97316',
    description: 'Warm, inviting, action-oriented'
  },

  blueTeal: {
    name: 'Blue Teal',
    colors: ['#2563eb', '#06b6d4', '#10b981'], // deep blue → cyan → emerald (more diverse)
    primary: '#3b82f6',
    description: 'Trust, stability, innovation'
  },

  purplePink: {
    name: 'Purple Pink',
    colors: ['#7c3aed', '#c026d3', '#ec4899'], // deep violet → fuchsia → pink (richer purples)
    primary: '#a855f7',
    description: 'Creative, bold, expressive'
  },

  indigoBlue: {
    name: 'Indigo Blue',
    colors: ['#4f46e5', '#3b82f6', '#22d3ee'], // deep indigo → blue → bright cyan (wider spectrum)
    primary: '#6366f1',
    description: 'Deep, thoughtful, expansive'
  },

  emeraldGreen: {
    name: 'Emerald Green',
    colors: ['#059669', '#10b981', '#06b6d4'], // forest green → emerald → cyan (more varied)
    primary: '#10b981',
    description: 'Growth, balance, natural wisdom'
  },

  galaxy: {
    name: 'Galaxy',
    colors: ['#4A148C', '#1A237E', '#0D47A1'], // deep purple → deep blue → cosmic blue
    primary: '#1A237E',
    description: 'Deep space, cosmic, innovative'
  },

  // TODO: Consider reverting to galaxy theme if pure black is too stark
  darkGalaxy: {
    name: 'Dark Galaxy',
    colors: ['#000000', '#1A237E', '#0D47A1'], // pure black → deep blue → cosmic blue
    primary: '#0D47A1',
    description: 'Pure black background, deep space, Zero brand'
  }
} as const;

export type WatercolorThemeName = keyof typeof watercolorThemes;

/**
 * Section-to-theme mapping for homepage and key pages
 */
export const sectionThemeMap = {
  // Homepage sections
  hero: 'coolPurple',
  philosophy: 'emeraldGreen',
  services: 'coralOrange',
  featuredWork: 'blueTeal',
  process: 'purplePink',
  cta: 'indigoBlue',

  // About page sections
  aboutHero: 'coolPurple',
  principles: 'tealPink',
  philosophyGrid: 'blueTeal',
  inspiration: 'purplePink',
  values: 'coralOrange',
  founder: 'indigoBlue',
  operatingModel: 'tealPink',

  // Services page sections
  servicesHero: 'coolPurple',
  clarityKit: 'blueTeal',
  prototypeKit: 'purplePink',
  productDefinitionKit: 'coralOrange',
  validationKit: 'tealPink',
  buildPartner: 'indigoBlue',

  // Zero page sections (using darkGalaxy for pure black theme)
  zeroHero: 'darkGalaxy',
  zeroDashboard: 'darkGalaxy',
  zeroTools: 'darkGalaxy',
  zeroRoadmap: 'darkGalaxy',
  zeroCaseStudy: 'darkGalaxy',
  zeroContent: 'darkGalaxy',

  // Active Ventures section (homepage)
  activeVentures: 'indigoBlue',

  // Generic content sections
  content: 'blueTeal',

  // Default
  default: 'coolPurple'
} as const;

/**
 * Get theme by name
 */
export function getWatercolorTheme(name: WatercolorThemeName): WatercolorTheme {
  return watercolorThemes[name];
}

/**
 * Get theme for a specific section
 */
export function getSectionTheme(section: keyof typeof sectionThemeMap): WatercolorTheme {
  const themeName = sectionThemeMap[section] || sectionThemeMap.default;
  return watercolorThemes[themeName as WatercolorThemeName];
}

/**
 * Interpolate between colors based on a 0-1 value
 * Used for creating smooth gradients in ASCII backgrounds
 */
export function interpolateColors(colors: readonly string[], t: number): string {
  // Clamp t between 0 and 1
  t = Math.max(0, Math.min(1, t));

  // Find which two colors to interpolate between
  const segments = colors.length - 1;
  const segment = Math.floor(t * segments);
  const segmentT = (t * segments) - segment;

  const color1 = colors[segment];
  const color2 = colors[Math.min(segment + 1, colors.length - 1)];

  return lerpColor(color1, color2, segmentT);
}

/**
 * Linear interpolation between two hex colors
 */
function lerpColor(color1: string, color2: string, t: number): string {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * t);
  const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * t);
  const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * t);

  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}
