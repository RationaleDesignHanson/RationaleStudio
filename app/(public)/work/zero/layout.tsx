import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zero — AI Inbox Management | Rationale',
  description: 'Zero intelligently processes your inbox, surfacing what matters and handling routine tasks automatically. Built by Rationale to demonstrate AI-powered email management at scale.',
  openGraph: {
    title: 'Zero — AI Inbox Management | Rationale',
    description: 'Zero intelligently processes your inbox, surfacing what matters and handling routine tasks automatically.',
    type: 'website',
  },
}

export default function ZeroLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
