import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stealth · Confidential',
  description: "Design engine for an AI media companion startup. 2024 · Head of Design. Confidential — password required.",
  openGraph: {
    title: 'Stealth · Confidential — Matt Hanson',
    description: "Design engine for an AI media companion startup. 2024 · Head of Design. Confidential — password required.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stealth · Confidential — Matt Hanson',
    description: "Design engine for an AI media companion startup. 2024 · Head of Design. Confidential — password required.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
