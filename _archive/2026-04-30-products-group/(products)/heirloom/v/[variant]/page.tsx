/**
 * Heirloom Product Variant Page
 *
 * Dynamic variant page for A/B testing different value propositions.
 */

import HeirloomProductPage from '../../page';

export default async function HeirloomVariantPage({
  params,
}: {
  params: Promise<{ variant: string }>;
}) {
  const resolvedParams = await params;
  // For now, redirect to main product page
  // Variant-specific content can be added later
  return <HeirloomProductPage />;
}

export async function generateStaticParams() {
  return [
    { variant: 'preservation' },
    { variant: 'meal-planning' },
    { variant: 'family-sharing' },
  ];
}

