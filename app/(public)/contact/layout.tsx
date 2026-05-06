import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: "hanson@rationale.work. Selective partnership work. NYC area.",
  openGraph: {
    title: 'Contact — Matt Hanson',
    description: "hanson@rationale.work. Selective partnership work. NYC area.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact — Matt Hanson',
    description: "hanson@rationale.work. Selective partnership work. NYC area.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
