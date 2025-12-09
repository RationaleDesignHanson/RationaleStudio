import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Heirloom: iOS Recipe App Case Study | Rationale Studios',
  description: 'How we built Heirloom, a native iOS app that preserves family recipes as beautiful, shareable artifacts. Complete product design and development in 5 weeks.',
  keywords: ['iOS app development', 'recipe app', 'SwiftUI', 'product design', 'native app', 'CloudKit', 'Rationale Studios'],
  openGraph: {
    title: 'Heirloom: Recipes Worth Passing Down',
    description: 'Native iOS recipe app with smart shopping lists, card personalization, and dinner party mode. Built by Rationale Studios.',
    images: [
      {
        url: '/images/work/heirloom/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Heirloom iOS App',
      },
    ],
    url: 'https://rationale.work/work/heirloom',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Heirloom Case Study | Rationale Studios',
    description: 'How we built a native iOS recipe app in 5 weeks with SwiftUI, CloudKit, and OCR.',
    images: ['/images/work/heirloom/twitter-card.png'],
  },
}

export default function HeirloomLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
