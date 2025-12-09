// Love Marks Generator
// Automatically generates coffee stains and worn edges based on timesCooked

import {
  type LoveMark,
  type CoffeeStain,
  type WornEdge,
  LOVE_MARKS_CONFIG,
} from './constants';

// ========== COFFEE STAIN GENERATION ==========

/**
 * Generates coffee stains based on how many times recipe has been cooked
 */
export function generateCoffeeStains(timesCooked: number, cardId: string): CoffeeStain[] {
  const stains: CoffeeStain[] = [];

  // Determine how many stains to add based on cook count
  let stainCount = 0;
  for (const threshold of LOVE_MARKS_CONFIG.coffeeStains) {
    if (timesCooked >= threshold.threshold) {
      stainCount = threshold.count;
    }
  }

  if (stainCount === 0) return [];

  // Use cardId as seed for consistent positioning across refreshes
  const seed = hashCode(cardId);
  const rng = seededRandom(seed);

  // Generate stains in predetermined "good" locations
  const stainLocations = [
    // Top right corner (from coffee mug)
    { x: 75, y: 15, sizeRange: [50, 70] },
    // Bottom left (from plate)
    { x: 20, y: 85, sizeRange: [60, 80] },
    // Middle right edge
    { x: 88, y: 50, sizeRange: [40, 60] },
    // Top left corner
    { x: 15, y: 20, sizeRange: [45, 65] },
    // Bottom right
    { x: 80, y: 80, sizeRange: [55, 75] },
  ];

  for (let i = 0; i < stainCount; i++) {
    const location = stainLocations[i % stainLocations.length];
    const [minSize, maxSize] = location.sizeRange;

    // Add slight randomness to position
    const x = location.x + (rng() * 10 - 5); // ±5%
    const y = location.y + (rng() * 10 - 5); // ±5%
    const size = minSize + rng() * (maxSize - minSize);
    const rotation = rng() * 360;

    // Intensity increases with cook count (0.3 to 0.7)
    const baseIntensity = 0.3;
    const maxIntensity = 0.7;
    const intensityFactor = Math.min(timesCooked / 50, 1.0);
    const intensity = baseIntensity + (intensityFactor * (maxIntensity - baseIntensity));

    stains.push({
      id: `coffee-stain-${i}`,
      type: 'coffee-stain',
      intensity,
      x,
      y,
      size,
      rotation,
    });
  }

  return stains;
}

// ========== WORN EDGE GENERATION ==========

/**
 * Generates worn edges based on how many times recipe has been cooked
 */
export function generateWornEdges(timesCooked: number): WornEdge[] {
  const threshold = LOVE_MARKS_CONFIG.wornEdges.threshold;
  const maxIntensity = LOVE_MARKS_CONFIG.wornEdges.maxIntensity;

  if (timesCooked < threshold) return [];

  // Calculate intensity (0 to maxIntensity)
  const intensityFactor = Math.min((timesCooked - threshold) / 40, 1.0); // Max at 50 cooks
  const intensity = intensityFactor * maxIntensity;

  return [
    {
      id: 'worn-edge',
      type: 'worn-edge',
      intensity,
      edges: ['top', 'bottom', 'left', 'right'],
    },
  ];
}

// ========== COMBINE ALL LOVE MARKS ==========

/**
 * Generates all love marks for a card based on timesCooked
 */
export function generateLoveMarks(timesCooked: number, cardId: string): LoveMark[] {
  const coffeeStains = generateCoffeeStains(timesCooked, cardId);
  const wornEdges = generateWornEdges(timesCooked);
  return [...coffeeStains, ...wornEdges];
}

// ========== HELPER FUNCTIONS ==========

/**
 * Simple hash function to convert string to number (for seeding)
 */
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Seeded random number generator (LCG algorithm)
 * Returns a function that generates numbers between 0 and 1
 */
function seededRandom(seed: number): () => number {
  let current = seed;
  return () => {
    current = (current * 9301 + 49297) % 233280;
    return current / 233280;
  };
}

// ========== LOVE MARKS DESCRIPTIONS ==========

/**
 * Get a human-readable description of love marks for a card
 */
export function describeLoveMarks(timesCooked: number): string {
  if (timesCooked === 0) {
    return 'Brand new recipe card';
  } else if (timesCooked < 5) {
    return 'Lightly used';
  } else if (timesCooked < 10) {
    return 'A few coffee stains from late-night cooking';
  } else if (timesCooked < 20) {
    return 'Well-loved with coffee stains and worn edges';
  } else if (timesCooked < 50) {
    return 'Heavily used - a family favorite!';
  } else {
    return 'Treasured heirloom with character';
  }
}

/**
 * Get the next love mark milestone
 */
export function getNextMilestone(timesCooked: number): { count: number; description: string } | null {
  const milestones = [
    { count: 5, description: 'First coffee stain!' },
    { count: 10, description: 'Second coffee stain + worn edges appear' },
    { count: 20, description: 'Third coffee stain - true family favorite!' },
    { count: 50, description: 'Maximum love marks - treasured heirloom status' },
  ];

  for (const milestone of milestones) {
    if (timesCooked < milestone.count) {
      return {
        count: milestone.count - timesCooked,
        description: milestone.description,
      };
    }
  }

  return null; // Already at max
}
