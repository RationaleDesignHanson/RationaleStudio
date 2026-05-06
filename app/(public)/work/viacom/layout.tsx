import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Viacom',
  description: "Mixed-reality work at Viacom's Times Square HQ. Past Present and Future, Outrage Machine billboards, MTV Open Your Eyes Tilt Brush at the White House. 2015-2017.",
  openGraph: {
    title: 'Viacom — Matt Hanson',
    description: "Mixed-reality work at Viacom's Times Square HQ. Past Present and Future, Outrage Machine billboards, MTV Open Your Eyes Tilt Brush at the White House. 2015-2017.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Viacom — Matt Hanson',
    description: "Mixed-reality work at Viacom's Times Square HQ. Past Present and Future, Outrage Machine billboards, MTV Open Your Eyes Tilt Brush at the White House. 2015-2017.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
