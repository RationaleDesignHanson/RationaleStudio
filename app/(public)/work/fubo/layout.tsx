import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Streaming · Confidential',
  description: "VP of Design at a streaming entertainment platform · 2025-26. Confidential — password required.",
  openGraph: {
    title: 'Streaming · Confidential — Matt Hanson',
    description: "VP of Design at a streaming entertainment platform · 2025-26. Confidential — password required.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Streaming · Confidential — Matt Hanson',
    description: "VP of Design at a streaming entertainment platform · 2025-26. Confidential — password required.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
