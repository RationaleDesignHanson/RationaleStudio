import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Heirloom',
  description: 'Recipe preservation, social cookbooks. iOS, live on the App Store. Built solo with AI as a coding partner. 24 SPM packages, Swift 6, AI-assisted import across five formats.',
  openGraph: {
    title: 'Heirloom — Matt Hanson',
    description: 'Recipe preservation, social cookbooks, AI-assisted import. Built solo, with AI as a coding partner.',
    url: 'https://rationale.work/work/heirloom',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Heirloom — Matt Hanson',
    description: 'Native iOS recipe app, built solo. The validator before the features.',
  },
};

export default function HeirloomLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
