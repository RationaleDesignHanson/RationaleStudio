/**
 * Constants for Heirloom Demo Component
 */

import { Generation } from './types';
import { DEMO_STICKERS } from '@/lib/heirloom/demo-stickers';

export { DEMO_STICKERS };

export const GENERATIONS: Generation[] = [
  { name: 'Grandma Kay', initials: 'GK', year: '1987' },
  { name: 'Mom', initials: 'M', year: '2015' },
  { name: 'You', initials: 'Y', year: '2025' },
];

export const COLORS = {
  // Browns (warm tones)
  primary: '#8b5a2b',
  primaryDark: '#5c4033',
  primaryDarkest: '#3d2914',
  primaryLight: '#c9a66b',

  // Greens (success/active states)
  green: '#2d5a27',
  greenLight: '#6b8b6b',

  // Backgrounds
  bgWarm: '#faf8f5',
  bgCard: '#fff',
  bgBack: '#f5f0e6',
  bgNote: '#fff8dc',
  bgYourNote: '#e8f4e8',

  // Neutrals
  grayLight: '#e8e0d5',
  grayMid: '#a89880',
  grayText: '#8b7355',
  grayTextDark: '#5c4033',

  // Badge colors
  badgeMom: '#fff3e0',
  badgeMomText: '#8b5a2b',
  badgeYou: '#e8f5e9',
  badgeYouText: '#2d5a27',
  badgeMultiple: '#f3e5f5',
  badgeMultipleText: '#6a3d7a',
} as const;

export const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
export const API_ENDPOINT = '/api/heirloom/extract-recipe';
