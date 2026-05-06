import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAIR Embodied AI · Confidential',
  description: "Built and led 4+ teams on AI agents for glasses, headsets, and robotics at Meta's research org. SIRo + Motivo. Confidential — login required.",
  openGraph: {
    title: 'FAIR Embodied AI · Confidential — Matt Hanson',
    description: "Built and led 4+ teams on AI agents for glasses, headsets, and robotics at Meta's research org. SIRo + Motivo. Confidential — login required.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAIR Embodied AI · Confidential — Matt Hanson',
    description: "Built and led 4+ teams on AI agents for glasses, headsets, and robotics at Meta's research org. SIRo + Motivo. Confidential — login required.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
