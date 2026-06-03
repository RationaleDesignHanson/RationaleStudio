import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Athletes First · Confidential',
  description: 'NIL platform strategy pitch · 2024. Confidential.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Athletes First · Confidential — Matt Hanson',
    description: 'NIL platform strategy pitch · 2024. Confidential.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Athletes First · Confidential — Matt Hanson',
    description: 'NIL platform strategy pitch · 2024. Confidential.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
