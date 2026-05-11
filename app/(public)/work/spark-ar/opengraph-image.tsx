import { renderOgImage, SIZE, CONTENT_TYPE } from '@/lib/seo/og-image';

export const alt = 'Spark AR — Meta creator platform across Facebook, Instagram, Messenger';
export const size = SIZE;
export const contentType = CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: 'LEADER · 2017–2023',
    title: 'Spark AR',
    tagline: 'Scaling Meta\'s AR effect platform from flagship moments into a creator ecosystem.',
    accent: '#1F6F66',
  });
}
