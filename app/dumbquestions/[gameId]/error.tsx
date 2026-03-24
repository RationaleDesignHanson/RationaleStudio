'use client';

import { useEffect } from 'react';

export default function GameRoomError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[DumbQuestions] Game room error:', error);
  }, [error]);

  return (
    <div className="min-h-dvh bg-black flex flex-col items-center justify-center px-6 gap-6">
      <div className="text-center">
        <h1 className="text-xl font-bold text-white">Something went wrong</h1>
        <p className="text-gray-400 text-sm mt-2">
          Try refreshing the page or start a new game.
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-4 py-2.5 rounded-xl bg-blue-500 text-white font-semibold text-sm hover:bg-blue-600"
        >
          Try again
        </button>
        <a
          href="/dumbquestions"
          className="px-4 py-2.5 rounded-xl bg-gray-800 text-white font-semibold text-sm hover:bg-gray-700 border border-gray-700"
        >
          New game
        </a>
      </div>
    </div>
  );
}
