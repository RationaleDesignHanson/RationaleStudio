import { renderOgImage, SIZE, CONTENT_TYPE } from '@/lib/seo/og-image';

export const alt = 'Zero — shortform email with AI-extracted action items';
export const size = SIZE;
export const contentType = CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: 'NOW · deprioritized',
    title: 'Zero',
    tagline: 'Shortform email. Swipe-first triage. The post-mortem of an app that shipped, then got pulled.',
    accent: '#4A6172',
  });
}
