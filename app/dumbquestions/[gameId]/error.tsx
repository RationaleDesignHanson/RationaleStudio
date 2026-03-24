'use client';

import { useEffect, useState } from 'react';

export default function GameRoomError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);

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
      <div className="flex flex-col gap-3 w-full max-w-sm">
        <div className="flex gap-3">
          <button
            onClick={reset}
            className="flex-1 py-2.5 rounded-xl bg-blue-500 text-white font-semibold text-sm hover:bg-blue-600"
          >
            Try again
          </button>
          <a
            href="/dumbquestions"
            className="flex-1 py-2.5 rounded-xl bg-gray-800 text-white font-semibold text-sm hover:bg-gray-700 border border-gray-700 text-center"
          >
            New game
          </a>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-gray-500 text-xs"
        >
          {showDetails ? 'Hide' : 'Show'} error details
        </button>
        {showDetails && (
          <p className="text-red-400 text-xs font-mono break-all bg-gray-900 p-3 rounded">
            {error.message}
          </p>
        }
      </div>
    </div>
  );
}
