/**
 * Heirloom Demo Sticker Configuration
 *
 * Maps the 6 demo stickers (originally emoji) to custom designed sticker assets
 */

export interface DemoSticker {
  id: string;
  label: string;
  imagePath: string;
  fallbackEmoji: string;
}

export const DEMO_STICKERS: DemoSticker[] = [
  {
    id: 'heart',
    label: 'Love it',
    imagePath: '/images/heirloom/stickers/emotions/sticker_emotion_heart.png',
    fallbackEmoji: '❤️',
  },
  {
    id: 'star',
    label: 'Family favorite',
    imagePath: '/images/heirloom/stickers/emotions/sticker_emotion_star.png',
    fallbackEmoji: '⭐',
  },
  {
    id: 'fire',
    label: 'So good',
    imagePath: '/images/heirloom/stickers/badges/sticker_badge_fivestars.png',
    fallbackEmoji: '🔥',
  },
  {
    id: 'check',
    label: 'Tried it',
    imagePath: '/images/heirloom/stickers/badges/sticker_badge_tested.png',
    fallbackEmoji: '✅',
  },
  {
    id: 'chef',
    label: 'Pro tip',
    imagePath: '/images/heirloom/stickers/tools/sticker_tools_apron.png',
    fallbackEmoji: '👨‍🍳',
  },
  {
    id: 'clock',
    label: 'Quick & easy',
    imagePath: '/images/heirloom/stickers/badges/sticker_badge_quick.png',
    fallbackEmoji: '⏱️',
  },
];
