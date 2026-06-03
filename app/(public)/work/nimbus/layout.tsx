import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nimbus · Confidential',
  description: 'Sanitary-waste system venture · in flight. Confidential.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Nimbus · Confidential — Matt Hanson',
    description: 'Sanitary-waste system venture · in flight. Confidential.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nimbus · Confidential — Matt Hanson',
    description: 'Sanitary-waste system venture · in flight. Confidential.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
