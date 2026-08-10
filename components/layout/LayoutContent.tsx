'use client';

import { usePathname } from 'next/navigation';
import { Header, Footer } from "@/components/layout";

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Full-screen pages: no site header, no footer, no way out.
  //
  // /work/blank is sealed deliberately. It is unlocked by a password and shared
  // with one person, and that password should buy them the tool and nothing
  // else — not the nav, not the vault, not the rest of the practice. Site chrome
  // on a private tool is both an access leak and, on a page whose whole brief is
  // "make this less complicated", five navigation items in front of the work.
  if (
    pathname.startsWith('/clients/archive') ||
    pathname === '/overview' ||
    pathname.startsWith('/dumbquestions') ||
    pathname.startsWith('/work/blank')
  ) {
    // Full-screen pages - no header/footer
    return <>{children}</>;
  }

  // Regular pages - with header/footer
  return (
    <>
      <Header pathname={pathname} />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}
