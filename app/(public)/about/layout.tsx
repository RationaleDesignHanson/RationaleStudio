import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: "Designer-engineer. Ex-Meta AR (Spark, Orion, FAIR Embodied AI). Currently building Heirloom and writing at matthanson.substack.com.",
  openGraph: {
    title: 'About — Matt Hanson',
    description: "Designer-engineer. Ex-Meta AR (Spark, Orion, FAIR Embodied AI). Currently building Heirloom and writing at matthanson.substack.com.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About — Matt Hanson',
    description: "Designer-engineer. Ex-Meta AR (Spark, Orion, FAIR Embodied AI). Currently building Heirloom and writing at matthanson.substack.com.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
