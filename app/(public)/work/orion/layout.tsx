import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Orion',
  description: "UX for Meta's first true AR glasses, in a regular glasses form factor. Experience Lead across Day-1 use cases and teams, 2023-2025.",
  openGraph: {
    title: 'Orion — Matt Hanson',
    description: "UX for Meta's first true AR glasses, in a regular glasses form factor. Experience Lead across Day-1 use cases and teams, 2023-2025.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orion — Matt Hanson',
    description: "UX for Meta's first true AR glasses, in a regular glasses form factor. Experience Lead across Day-1 use cases and teams, 2023-2025.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
