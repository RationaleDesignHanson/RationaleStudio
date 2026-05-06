import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spark AR',
  description: "From four flagship effects at F8 2018 to a platform used by billions across Facebook, Instagram, and Messenger. Experiences team lead, 2017-2023.",
  openGraph: {
    title: 'Spark AR — Matt Hanson',
    description: "From four flagship effects at F8 2018 to a platform used by billions across Facebook, Instagram, and Messenger. Experiences team lead, 2017-2023.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spark AR — Matt Hanson',
    description: "From four flagship effects at F8 2018 to a platform used by billions across Facebook, Instagram, and Messenger. Experiences team lead, 2017-2023.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
