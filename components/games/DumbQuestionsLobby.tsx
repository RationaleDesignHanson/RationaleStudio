'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createGame } from '@/lib/games/dumb-questions-utils';

/**
 * DumbQuestionsLobby
 *
 * Landing screen where Player 1 enters their name and creates a game.
 * After creation, they're redirected to /dumbquestions/[gameId] to wait.
 */
export function DumbQuestionsLobby() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Enter your name first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const game = await createGame(trimmed);
      // Store that we're player1 for this game
      localStorage.setItem(`dq-role-${game.id}`, 'player1');
      localStorage.setItem(`dq-name-${game.id}`, trimmed);
      router.push(`/dumbquestions/${game.id}`);
    } catch (err) {
      console.error('Failed to create game:', err);
      setError('Something went wrong. Try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh bg-black flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm flex flex-col items-center gap-8"
      >
        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Dumb Questions
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            A game that makes two people argue about dumb things
          </p>
        </div>

        {/* Name input */}
        <div className="w-full flex flex-col gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError('');
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            placeholder="Your name"
            maxLength={20}
            autoFocus
            className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 text-white placeholder-gray-500 text-base outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            onClick={handleCreate}
            disabled={loading || !name.trim()}
            className="w-full py-3 rounded-xl bg-blue-500 text-white font-semibold text-base disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-600 active:bg-blue-700 transition-colors"
          >
            {loading ? 'Creating...' : 'Start Game'}
          </button>
        </div>

        {/* Subtle footer */}
        <p className="text-gray-600 text-xs text-center">
          You&apos;ll get a link to send to your friend
        </p>
      </motion.div>
    </div>
  );
}
