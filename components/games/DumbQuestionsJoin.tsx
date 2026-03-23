'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { joinGame, type GameRow } from '@/lib/games/dumb-questions-utils';

interface DumbQuestionsJoinProps {
  game: GameRow;
  onJoined: (updatedGame: GameRow) => void;
}

/**
 * DumbQuestionsJoin
 *
 * Shown to Player 2 when they open a shared game link.
 * They see Player 1's name, enter their own name, and tap "Join Game".
 */
export function DumbQuestionsJoin({ game, onJoined }: DumbQuestionsJoinProps) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleJoin = async () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Enter your name first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const updated = await joinGame(game.id, trimmed);
      // Store that we're player2 for this game
      localStorage.setItem(`dq-role-${game.id}`, 'player2');
      localStorage.setItem(`dq-name-${game.id}`, trimmed);
      onJoined(updated);
    } catch (err) {
      console.error('Failed to join game:', err);
      setError('Couldn\'t join. The game may have already started.');
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
          <p className="text-gray-400 text-sm mt-3">
            <span className="text-white font-medium">{game.player1_name}</span>{' '}
            is waiting for you
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
            onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
            placeholder="Your name"
            maxLength={20}
            autoFocus
            className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 text-white placeholder-gray-500 text-base outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            onClick={handleJoin}
            disabled={loading || !name.trim()}
            className="w-full py-3 rounded-xl bg-blue-500 text-white font-semibold text-base disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-600 active:bg-blue-700 transition-colors"
          >
            {loading ? 'Joining...' : 'Join Game'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
