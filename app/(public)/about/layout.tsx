import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: "Designer-engineer. Ex-Meta AR (Spark, Orion, FAIR Embodied AI). Currently building Heirloom and writing at rationaledesign.substack.com.",
  openGraph: {
    title: 'About — Matt Hanson',
    description: "Designer-engineer. Ex-Meta AR (Spark, Orion, FAIR Embodied AI). Currently building Heirloom and writing at rationaledesign.substack.com.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About — Matt Hanson',
    description: "Designer-engineer. Ex-Meta AR (Spark, Orion, FAIR Embodied AI). Currently building Heirloom and writing at rationaledesign.substack.com.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
