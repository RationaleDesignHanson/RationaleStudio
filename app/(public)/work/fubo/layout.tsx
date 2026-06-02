import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Streaming · Confidential',
  description: "VP of Design at a streaming entertainment platform · 2025-26. Confidential.",
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Streaming · Confidential — Matt Hanson',
    description: "VP of Design at a streaming entertainment platform · 2025-26. Confidential.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Streaming · Confidential — Matt Hanson',
    description: "VP of Design at a streaming entertainment platform · 2025-26. Confidential.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
