import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rationale Studio — Ex-Meta. Building Zero.",
  description: "Product development studio. Ex-Meta Reality Labs (7 years). We build products to prove we can build yours. Zero went from concept to App Store in 1 month.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
