import { renderOgImage, SIZE, CONTENT_TYPE } from '@/lib/seo/og-image';

export const alt = 'Matt Hanson — Founder, Product Architect, AI Systems Leader';
export const size = SIZE;
export const contentType = CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: 'RÉSUMÉ',
    title: 'Matt Hanson',
    tagline: 'Founder · Product Architect · AI Systems Leader. 25+ years from thesis to shipped software.',
    accent: '#B5179E',
  });
}
