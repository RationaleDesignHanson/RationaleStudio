import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blank · Confidential',
  description: 'Streetwear line planned by pipeline · in flight. Confidential.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Blank · Confidential — Matt Hanson',
    description: 'Streetwear line planned by pipeline · in flight. Confidential.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blank · Confidential — Matt Hanson',
    description: 'Streetwear line planned by pipeline · in flight. Confidential.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
