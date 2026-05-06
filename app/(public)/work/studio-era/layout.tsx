import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Studio Era',
  description: "Animation, creative direction, mixed-reality installations. Psyop, Imaginary Forces, Buck, Hush. NYC, 2000–2015.",
  openGraph: {
    title: 'Studio Era — Matt Hanson',
    description: "Animation, creative direction, mixed-reality installations. Psyop, Imaginary Forces, Buck, Hush. NYC, 2000–2015.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio Era — Matt Hanson',
    description: "Animation, creative direction, mixed-reality installations. Psyop, Imaginary Forces, Buck, Hush. NYC, 2000–2015.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
