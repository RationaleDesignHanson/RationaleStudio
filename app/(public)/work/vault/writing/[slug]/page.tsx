import { notFound } from 'next/navigation';
import { UnlockGate } from '@/components/unlock/UnlockGate';
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

  return (
    <UnlockGate
      scope="vault"
      project="vault"
      era="now"
      title={essay.title}
      subtitle={essay.subtitle}
      meta="Writing · in vetting"
    >
      <VaultEssayReader essay={essay} />
    </UnlockGate>
  );
}
