import { renderOgImage, SIZE, CONTENT_TYPE } from '@/lib/seo/og-image';

export const alt = 'Heirloom Recipe Box — iOS app preserving handwritten recipes with AI';
export const size = SIZE;
export const contentType = CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: 'NOW · iOS, live',
    title: 'Heirloom',
    tagline: 'Recipe preservation, social cookbooks. Solo build with AI as coding partner.',
    accent: '#A85A40',
  });
}
