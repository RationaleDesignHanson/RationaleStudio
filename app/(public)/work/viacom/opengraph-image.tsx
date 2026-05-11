import { renderOgImage, SIZE, CONTENT_TYPE } from '@/lib/seo/og-image';

export const alt = 'Viacom — Director, Screen Content. Past Present and Future, MTV Open Your Eyes';
export const size = SIZE;
export const contentType = CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: 'DIRECTOR · 2015–2017',
    title: 'Viacom',
    tagline: 'Director, Screen Content. Past Present and Future. MTV Open Your Eyes at the White House.',
    accent: '#6E3F84',
  });
}
