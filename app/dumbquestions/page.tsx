import type { Metadata } from 'next';
import { DumbQuestionsLobby } from '@/components/games/DumbQuestionsLobby';

export const metadata: Metadata = {
  title: 'Dumb Questions — The Unhinged Text Game',
  description: 'A tiny iMessage-style game that makes two people argue about dumb things.',
  robots: { index: false, follow: false },
};

export default function DumbQuestionsPage() {
  return <DumbQuestionsLobby />;
}
