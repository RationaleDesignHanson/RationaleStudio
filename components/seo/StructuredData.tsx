/**
 * Structured Data Component
 *
 * Injects JSON-LD structured data into the page for enhanced SEO
 * Use this in client components where you can't directly add metadata
 */

'use client';

// JSON-LD must be in the server-rendered HTML. next/script with
// strategy="afterInteractive" injects only after hydration, so crawlers
// reading the raw response never see it. Plain <script> renders into SSR.

interface StructuredDataProps {
  data: Record<string, any>;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Multiple Structured Data blocks
 */
interface MultipleStructuredDataProps {
  dataBlocks: Array<Record<string, any>>;
}

export function MultipleStructuredData({ dataBlocks }: MultipleStructuredDataProps) {
  return (
    <>
      {dataBlocks.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
