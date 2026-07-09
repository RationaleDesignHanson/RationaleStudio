import { renderOgImage, SIZE, CONTENT_TYPE } from '@/lib/seo/og-image';

export const alt = 'Silly Questions — 2-player AI art party game on the web';
export const size = SIZE;
export const contentType = CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: 'NOW · web, live',
    title: 'Silly Questions',
    tagline: 'A 2-player AI art party game. Eight art styles. No app download required.',
    accent: '#A8456E',
  });
}
