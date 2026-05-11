import { renderOgImage, SIZE, CONTENT_TYPE } from '@/lib/seo/og-image';

export const alt = 'FAIR Embodied AI — SIRo + Motivo. Embodied agent UX at Meta';
export const size = SIZE;
export const contentType = CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: 'LEADER · 2023–2025',
    title: 'FAIR Embodied AI',
    tagline: 'SIRo + Motivo. Embodied agent UX. Built and led 4+ teams across simulation and real-world environments.',
    accent: '#4F7A3F',
  });
}
