'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  fetchGame,
  getSupabaseClient,
  type GameRow,
  type PlayerSlot,
} from '@/lib/games/dumb-questions-utils';
import { DumbQuestionsJoin } from '@/components/games/DumbQuestionsJoin';
import { DumbQuestionsGame } from '@/components/games/DumbQuestionsGame';

type PageState =
  | { kind: 'loading' }
  | { kind: 'not_found' }
  | { kind: 'waiting'; game: GameRow }       // Player 1 waiting for Player 2
  | { kind: 'join'; game: GameRow }           // Player 2 needs to enter name
  | { kind: 'playing'; game: GameRow; mySlot: PlayerSlot };

export default function GameRoomPage() {
  const params = useParams<{ gameId: string }>();
  const gameId = params.gameId;
  const [state, setState] = useState<PageState>({ kind: 'loading' });
  const [copied, setCopied] = useState(false);

  // ── Load game on mount ────────────────────────────────────
  useEffect(() => {
    if (!gameId) return;

    async function load() {
      try {
        const game = await fetchGame(gameId);
        if (!game) {
          setState({ kind: 'not_found' });
          return;
        }

        let savedRole: PlayerSlot | null = null;
        try {
          savedRole = localStorage.getItem(`dq-role-${gameId}`) as PlayerSlot | null;
        } catch {
          // localStorage can throw on iOS private browsing, cross-origin iframes, etc.
        }

        if (game.status === 'waiting') {
          if (savedRole === 'player1') {
            setState({ kind: 'waiting', game });
          } else {
            setState({ kind: 'join', game });
          }
        } else if (game.status === 'active') {
          if (savedRole) {
            setState({ kind: 'playing', game, mySlot: savedRole });
          } else {
            setState({ kind: 'not_found' });
          }
        } else {
          setState({ kind: 'not_found' });
        }
      } catch (err) {
        console.error('[DumbQuestions] Load failed:', err);
        setState({ kind: 'not_found' });
      }
    }

    load();
  }, [gameId]);

  // ── Realtime: while waiting, listen for player2 to join ──
  useEffect(() => {
    if (state.kind !== 'waiting') return;

    const supabase = getSupabaseClient();
    const channel = supabase
      .channel(`waiting-${gameId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'dumb_questions_games',
          filter: `id=eq.${gameId}`,
        },
        (payload) => {
          const updated = payload.new as GameRow;
          if (updated.status === 'active') {
            setState({ kind: 'playing', game: updated, mySlot: 'player1' });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [state.kind, gameId]);

  // ── Copy link helper ──────────────────────────────────────
  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/dumbquestions/${gameId}`
    : '';

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select a hidden input
    }
  };

  // ── Render states ─────────────────────────────────────────

  if (state.kind === 'loading') {
    return (
      <div className="min-h-dvh bg-black flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-gray-400 text-sm"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  if (state.kind === 'not_found') {
    return (
      <div className="min-h-dvh bg-black flex flex-col items-center justify-center px-6 gap-4">
        <p className="text-gray-400 text-base">Game not found or already finished.</p>
        <a
          href="/dumbquestions"
          className="text-blue-400 text-sm hover:underline"
        >
          Start a new game
        </a>
      </div>
    );
  }

  if (state.kind === 'join') {
    return (
      <DumbQuestionsJoin
        game={state.game}
        onJoined={(updated) =>
          setState({ kind: 'playing', game: updated, mySlot: 'player2' })
        }
      />
    );
  }

  if (state.kind === 'waiting') {
    return (
      <div className="min-h-dvh bg-black flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm flex flex-col items-center gap-6"
        >
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">Waiting for your friend</h1>
            <p className="text-gray-400 text-sm mt-2">
              Share this link to start playing
            </p>
          </div>

          {/* Share link card */}
          <div className="w-full bg-gray-900 rounded-xl border border-gray-800 p-4 flex flex-col gap-3">
            <p className="text-gray-300 text-sm font-mono break-all text-center">
              {shareUrl}
            </p>
            <button
              onClick={copyLink}
              className="w-full py-2.5 rounded-lg bg-blue-500 text-white font-semibold text-sm hover:bg-blue-600 active:bg-blue-700 transition-colors"
            >
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>

          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-2 text-gray-500 text-xs"
          >
            <div className="w-2 h-2 rounded-full bg-green-500" />
            Listening for your friend to join…
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // state.kind === 'playing'
  return <DumbQuestionsGame initialGame={state.game} mySlot={state.mySlot} />;
}
