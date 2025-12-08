/**
 * Structured Data Component
 *
 * Injects JSON-LD structured data into the page for enhanced SEO
 * Use this in client components where you can't directly add metadata
 */

'use client';

import Script from 'next/script';

interface StructuredDataProps {
  data: Record<string, any>;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      strategy="afterInteractive"
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
        <Script
          key={index}
          id={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          strategy="afterInteractive"
        />
      ))}
    </>
  );
}
