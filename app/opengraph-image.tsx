/**
 * Root OG image — default for every route that doesn't ship its own
 * opengraph-image.tsx. Renders the brand card with the canonical
 * positioning tagline.
 */

import { renderOgImage, SIZE, CONTENT_TYPE } from '@/lib/seo/og-image';

export const alt = 'Matt Hanson — designer-engineer (AR, AI, experiential)';
export const size = SIZE;
export const contentType = CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: 'rationale.work',
    title: 'Matt Hanson',
    tagline:
      'Designer-engineer. 25 years across animation, mixed-reality, AR platforms (Spark/Orion/FAIR), and AI. Now solo, shipping consumer products with AI as a coding partner.',
  });
}
