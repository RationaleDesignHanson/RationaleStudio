import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Heirloom — Evolution',
  description: 'From a weekend pottery site to a 24-package iOS app, via three web demos and a video pipeline. The four-phase build journey behind Heirloom.',
  openGraph: {
    title: 'Heirloom — Evolution · Matt Hanson',
    description: 'The four-phase build journey: Pottery → Shopping Lab → OCR → Video Lab → Native iOS.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Heirloom — Evolution · Matt Hanson',
    description: 'The four-phase build journey behind Heirloom.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
