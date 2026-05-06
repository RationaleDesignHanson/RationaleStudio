import { notFound } from 'next/navigation';
import { UnlockGate } from '@/components/unlock/UnlockGate';
import { DeckViewer } from '@/components/decks/DeckViewer';
import { getDeck, listDeckSlugs } from '@/lib/decks';

export function generateStaticParams() {
  return listDeckSlugs().map((slug) => ({ slug }));
}

export default async function DeckPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const deck = getDeck(slug);
  if (!deck) notFound();

  // Public decks bypass UnlockGate entirely.
  if (deck.gated === false) {
    return <DeckViewer deck={deck} />;
  }

  return (
    <UnlockGate
      scope={`deck-${deck.slug}`}
      project="vault"
      era={deck.era}
      title={deck.title}
      subtitle={deck.subtitle}
      meta={deck.meta}
    >
      <DeckViewer deck={deck} />
    </UnlockGate>
  );
}
