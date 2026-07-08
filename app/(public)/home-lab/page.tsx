/**
 * /home-lab — layout experiment (NOT linked in nav, not indexed).
 *
 * Renders the three era chapters as side-by-side columns instead of the
 * live home page's long vertical scroll, with an in-page toggle to compare
 * a few column treatments. Production `/` is untouched; both read the same
 * ERAS data from `lib/content/eras`.
 */

import type { Metadata } from 'next';
import { ERAS } from '@/lib/content/eras';
import { HomeLab } from './HomeLab';

export const metadata: Metadata = {
  title: 'Home layout lab',
  robots: { index: false, follow: false },
};

export default function HomeLabPage() {
  return <HomeLab eras={ERAS} />;
}
