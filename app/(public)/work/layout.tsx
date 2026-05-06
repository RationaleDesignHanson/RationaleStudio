import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work',
  description: "Work, organized chronologically. Now, Meta, Maker. Public cases, gated cases, and a quiet partnership door.",
  openGraph: {
    title: 'Work — Matt Hanson',
    description: "Work, organized chronologically. Now, Meta, Maker. Public cases, gated cases, and a quiet partnership door.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work — Matt Hanson',
    description: "Work, organized chronologically. Now, Meta, Maker. Public cases, gated cases, and a quiet partnership door.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
