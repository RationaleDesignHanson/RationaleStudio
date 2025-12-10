import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Mono, JetBrains_Mono, Caveat } from "next/font/google";
import { LayoutContent } from "@/components/layout";
import { AuthProvider } from "@/lib/auth/AuthContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap", // Ensures text is visible while font loads
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rationale.work'),
  title: {
    default: "Rationale — Product Studio Building AI-Powered Ventures",
    template: "%s — Rationale"
  },
  description: "Product studio building AI-powered ventures: Zero (AI email assistant), Heirloom (recipe management app). We build our own products and partner with companies for equity + cash.",
  keywords: [
    'product studio',
    'AI ventures',
    'email AI',
    'Zero Inbox',
    'Heirloom',
    'recipe app',
    'product development',
    'startup studio',
    'venture studio',
    'AI products',
    'product expertise',
    'iOS app development',
  ],
  authors: [{ name: 'Matt Hanson' }],
  creator: 'Rationale',
  publisher: 'Rationale',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rationale.work',
    title: "Rationale — Product Studio Building AI-Powered Ventures",
    description: "Product studio building AI-powered ventures. We build our own products (Zero, Heirloom) and partner with companies for equity + cash.",
    siteName: 'Rationale',
    images: [
      {
        url: 'https://rationale.work/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rationale Product Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Rationale — Product Studio Building AI-Powered Ventures",
    description: "Product studio building AI-powered ventures: Zero (AI email assistant), Heirloom (recipe management app).",
    images: ['https://rationale.work/og-image.png'],
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
      <body className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexMono.variable} ${jetBrainsMono.variable} ${caveat.variable} antialiased`}>
        <AuthProvider>
          <LayoutContent>{children}</LayoutContent>
        </AuthProvider>
      </body>
    </html>
  );
}
