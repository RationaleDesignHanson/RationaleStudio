'use client';

import { usePathname } from 'next/navigation';
import { Header, Footer } from "@/components/layout";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Check if we're on an archive page, overview presentation, or dumbquestions game
  if (pathname.startsWith('/clients/archive') || pathname === '/overview' || pathname.startsWith('/dumbquestions')) {
    // Full-screen pages - no header/footer
    return <>{children}</>;
  }

  // Regular pages - with header/footer
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}
