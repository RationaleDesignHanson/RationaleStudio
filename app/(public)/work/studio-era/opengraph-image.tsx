import { renderOgImage, SIZE, CONTENT_TYPE } from '@/lib/seo/og-image';

export const alt = 'Studio Era — Psyop, Imaginary Forces, Buck, Hush. Animation + creative direction';
export const size = SIZE;
export const contentType = CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: 'DIRECTOR · 2000–2015',
    title: 'Studio Era',
    tagline: 'Psyop, Imaginary Forces, Buck, Hush. Animation, creative direction, mixed-reality installations.',
    accent: '#846430',
  });
}
