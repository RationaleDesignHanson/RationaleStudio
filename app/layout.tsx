import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { LayoutContent } from "@/components/layout";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { PostHogProvider } from "@/components/analytics/PostHogProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { generatePersonJsonLd, generateWebSiteJsonLd } from "@/lib/seo/jsonld";
import { generateOrganizationStructuredData } from "@/lib/seo/metadata";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

export const viewport = {
  width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://rationale.work'),
  title: {
    default: "Matt Hanson",
    template: "%s — Matt Hanson"
  },
  description: "Designer-engineer. Creative direction and visual effects, spatial experiences and interactive systems, AR at billion-user scale, and consumer apps shipped solo with AI. Heirloom, Silly Questions, and the work that led here.",
  keywords: [
    'Matt Hanson',
    'product design',
    'AR',
    'Spark AR',
    'Meta',
    'Orion',
    'FAIR',
    'Embodied AI',
    'Heirloom',
    'Silly Questions',
    'iOS',
    'consumer software',
    'solo founder',
    'AI coding partner',
    'Rationale',
  ],
  authors: [{ name: 'Matt Hanson' }],
  creator: 'Matt Hanson',
  publisher: 'Matt Hanson',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rationale.work',
    title: "Matt Hanson",
    description: "Designer-engineer. Creative direction and visual effects, spatial experiences and interactive systems, AR at billion-user scale, consumer apps shipped solo with AI.",
    siteName: 'Matt Hanson',
    images: [
      {
        url: 'https://rationale.work/og.png',
        width: 1200,
        height: 630,
        alt: 'Matt Hanson',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Matt Hanson",
    description: "Designer-engineer. Heirloom, Silly Questions, and the work that led here.",
    images: ['https://rationale.work/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://rationale.work',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Note: We can't use usePathname in server components, so we handle archive page layout removal in the client
  return (
    <html lang="en">
      <head>
        {/*
          Site-wide JSON-LD. Person + WebSite + Organization render here
          so they appear on every route in the initial HTML response —
          per-route Article / BreadcrumbList schemas are mounted by each
          page individually and reference these via @id.
        */}
        <JsonLd
          dataBlocks={[
            generatePersonJsonLd(),
            generateWebSiteJsonLd(),
            generateOrganizationStructuredData(),
          ]}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} antialiased`}>
        <PostHogProvider>
          <AuthProvider>
            <LayoutContent>{children}</LayoutContent>
          </AuthProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
