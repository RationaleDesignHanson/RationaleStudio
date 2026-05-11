import { renderOgImage, SIZE, CONTENT_TYPE } from '@/lib/seo/og-image';

export const alt = 'Orion — Meta\'s first true AR glasses in a regular glasses form factor';
export const size = SIZE;
export const contentType = CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: 'LEADER · 2023–2025',
    title: 'Orion',
    tagline: 'UX for Meta\'s first true AR glasses. Senior Product Design Manager across Day-1 use cases.',
    accent: '#2E5C8A',
  });
}
