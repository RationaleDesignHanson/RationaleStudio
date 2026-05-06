import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Writing',
  description: "Notes on building solo, AI as a coding partner, and what I've learned across the work. Twice a month at matthanson.substack.com.",
  openGraph: {
    title: 'Writing — Matt Hanson',
    description: "Notes on building solo, AI as a coding partner, and what I've learned across the work. Twice a month at matthanson.substack.com.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Writing — Matt Hanson',
    description: "Notes on building solo, AI as a coding partner, and what I've learned across the work. Twice a month at matthanson.substack.com.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
