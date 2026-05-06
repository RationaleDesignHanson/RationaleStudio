/**
 * Product Pages Layout
 *
 * Different header/footer than main Rationale site.
 * These are product brands, not Rationale portfolio pages.
 * Minimal navigation - focus on product experience.
 */

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}

