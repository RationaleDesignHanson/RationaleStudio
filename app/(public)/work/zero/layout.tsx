import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zero',
  description: "A working email-triage prototype that didn't ship. Why self-selection is part of the method.",
  openGraph: {
    title: 'Zero — Matt Hanson',
    description: "A working email-triage prototype that didn't ship. Trust ceiling, dependencies, and the method behind not shipping.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zero — Matt Hanson',
    description: "A working prototype that didn't ship. Why self-selection is part of the method.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
