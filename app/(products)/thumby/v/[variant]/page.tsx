/**
 * Thumby Product Variant Page
 *
 * Dynamic variant page for A/B testing different value propositions.
 */

import ThumbyProductPage from '../../page';

export default async function ThumbyVariantPage({
  params,
}: {
  params: Promise<{ variant: string }>;
}) {
  const resolvedParams = await params;
  // For now, redirect to main product page
  // Variant-specific content can be added later
  return <ThumbyProductPage />;
}

export async function generateStaticParams() {
  return [
    { variant: 'scale' },
    { variant: 'brand-consistency' },
    { variant: 'rapid-deployment' },
  ];
}

