import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Mono, JetBrains_Mono } from "next/font/google";
import { LayoutContent } from "@/components/layout";
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

export const metadata: Metadata = {
  metadataBase: new URL('https://rationale.design'),
  title: {
    default: "Rationale Studio",
    template: "%s — Rationale"
  },
  description: "Product development studio. Ex-Meta Reality Labs (7 years). We build products to prove we can build yours. Zero went from concept to App Store in 1 month.",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rationale.design',
    title: "Rationale Studio",
    description: "Product development studio. We build products to prove we can build yours.",
    siteName: 'Rationale',
  },
  robots: {
    index: true,
    follow: true,
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
      <body className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexMono.variable} ${jetBrainsMono.variable} antialiased`}>
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
