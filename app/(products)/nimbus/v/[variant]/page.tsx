/**
 * Nimbus Product Variant Page
 *
 * Dynamic variant page for A/B testing different value propositions.
 * Placeholder for future Nimbus product.
 */

export default async function NimbusVariantPage({
  params,
}: {
  params: Promise<{ variant: string }>;
}) {
  const resolvedParams = await params;
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Nimbus</h1>
        <p className="text-gray-400">Coming soon</p>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return [
    { variant: 'default' },
  ];
}

