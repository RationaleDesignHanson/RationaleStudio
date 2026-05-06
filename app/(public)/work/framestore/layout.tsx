import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Framestore VR Studio · Confidential',
  description: "Creative Director · 2017. VR/AR pitch portfolio. Confidential — password required.",
  openGraph: {
    title: 'Framestore VR Studio · Confidential — Matt Hanson',
    description: "Creative Director · 2017. VR/AR pitch portfolio. Confidential — password required.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Framestore VR Studio · Confidential — Matt Hanson',
    description: "Creative Director · 2017. VR/AR pitch portfolio. Confidential — password required.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
