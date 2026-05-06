import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AR for IP Partners · Confidential',
  description: "Disney, location-based AR strategy, and other partner pitches at Meta. Confidential — login required.",
  openGraph: {
    title: 'AR for IP Partners · Confidential — Matt Hanson',
    description: "Disney, location-based AR strategy, and other partner pitches at Meta. Confidential — login required.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AR for IP Partners · Confidential — Matt Hanson',
    description: "Disney, location-based AR strategy, and other partner pitches at Meta. Confidential — login required.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
