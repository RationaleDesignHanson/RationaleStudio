import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Silly Questions Case Study',
  description: "How a 2-player AI art party game shipped in weeks. Different tech stack, same one-builder-with-AI method.",
  openGraph: {
    title: 'Silly Questions Case Study — Matt Hanson',
    description: "How a 2-player AI art party game shipped in weeks. Different tech stack, same one-builder-with-AI method.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Silly Questions Case Study — Matt Hanson',
    description: "How a 2-player AI art party game shipped in weeks. Different tech stack, same one-builder-with-AI method.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
