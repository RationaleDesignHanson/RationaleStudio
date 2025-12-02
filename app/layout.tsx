import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rationale Studio — Ex-Meta. Building Zero.",
  description: "Product development studio. Ex-Meta Reality Labs (7 years). We build products to prove we can build yours. Zero went from concept to App Store in 1 month.",
};

function Navigation() {
  return (
    <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-foreground">
            Rationale
          </Link>
          <div className="flex gap-6">
            <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/#portfolio" className="text-sm text-muted hover:text-foreground transition-colors">
              Portfolio
            </Link>
            <Link href="/about" className="text-sm text-muted hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm text-muted hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
