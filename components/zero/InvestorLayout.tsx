/**
 * Zero Investor Layout
 *
 * Shared layout for investor portal pages with navigation
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { getSectionTheme } from '@/lib/theme/watercolor-palette';
import { ReactNode } from 'react';

interface InvestorLayoutProps {
  children: ReactNode;
}

export function InvestorLayout({ children }: InvestorLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const theme = getSectionTheme('hero');

  useEffect(() => {
    // Check authentication (allow ZERO or GLOBAL)
    const auth = sessionStorage.getItem('client-auth');
    if (auth !== 'ZERO' && auth !== 'GLOBAL') {
      router.push('/clients/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gray-400">Verifying access...</p>
      </div>
    );
  }

  const navItems = [
    { label: 'Overview', href: '/clients/zero/investor' },
    { label: 'Business Model', href: '/clients/zero/investor/business' },
    { label: 'Technical', href: '/clients/zero/investor/technical' },
    { label: 'Roadmap', href: '/clients/zero/investor/roadmap' }
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Header */}
      <Section spacing="large" background="transparent" colorTheme={theme}>
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <Link href="/work/zero" className="text-accent hover:underline text-sm">
                ← Public Zero Page
              </Link>
              <span className="text-sm text-muted">Investor Access</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Zero Investor Portal
            </h1>
            <p className="text-lg text-muted mb-8">
              Complete business plan, technical architecture, financials, and roadmap for Rationale's AI email intelligence product.
            </p>

            {/* Navigation */}
            <div className="grid sm:grid-cols-4 gap-4 mb-12">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`p-4 rounded-lg border transition-colors text-center ${
                    isActive(item.href)
                      ? 'border-accent bg-accent/10 text-accent font-medium'
                      : 'border-border bg-background/80 hover:bg-accent/10'
                  }`}
                >
                  <div className="text-sm font-medium">{item.label}</div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Page Content */}
      {children}
    </>
  );
}
