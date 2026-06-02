import { notFound } from 'next/navigation';
import { getVaultEssay, listVaultEssays } from '@/lib/content/vault-writing';
import { VaultEssayReader } from './VaultEssayReader';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return listVaultEssays().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const essay = getVaultEssay(slug);
  // Confidential while in partner vetting: do not index.
  return {
    title: essay ? `${essay.title} · Vault` : 'Vault Writing',
    robots: { index: false, follow: false },
  };
}

export default async function VaultWritingPage({ params }: Props) {
  const { slug } = await params;
  const essay = getVaultEssay(slug);
  if (!essay) notFound();

  return <VaultEssayReader essay={essay} />;
}
