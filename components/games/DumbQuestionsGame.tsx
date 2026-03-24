'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  type GameRow,
  type PlayerSlot,
  type RoundState,
  submitAnswer,
  advanceRound,
  completeGame,
  fetchGame,
  passQuestion,
  getSupabaseClient,
  buildImagePrompt,
  storeRoundImage,
  MAX_ROUNDS,
} from '@/lib/games/dumb-questions-utils';

interface DumbQuestionsGameProps {
  initialGame: GameRow;
  mySlot: PlayerSlot;
}

// ── Helpers ──────────────────────────────────────────────────

function getMyName(game: GameRow, slot: PlayerSlot) {
  return slot === 'player1' ? game.player1_name : game.player2_name ?? '';
}

function getOpponentName(game: GameRow, slot: PlayerSlot) {
  return slot === 'player1' ? game.player2_name ?? '' : game.player1_name;
}

function starterSlot(game: GameRow): PlayerSlot {
  return game.starter_index === 0 ? 'player1' : 'player2';
}

function secondSlot(game: GameRow): PlayerSlot {
  return game.starter_index === 0 ? 'player2' : 'player1';
}

// ── Component ────────────────────────────────────────────────

export function DumbQuestionsGame({ initialGame, mySlot }: DumbQuestionsGameProps) {
  const [game, setGame] = useState<GameRow>(initialGame);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [advancing, setAdvancing] = useState(false);
  const [passing, setPassing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const myName = getMyName(game, mySlot);
  const opponentName = getOpponentName(game, mySlot);

  // ── Realtime subscription ────────────────────────────────
  useEffect(() => {
    const supabase = getSupabaseClient();

    const channel = supabase
      .channel(`game-${game.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'dumb_questions_games',
          filter: `id=eq.${game.id}`,
        },
        (payload) => {
          setGame(payload.new as GameRow);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [game.id]);

  // ── Auto-scroll ──────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [game.round_state, game.answer1, game.answer2, game.round_image_url, game.current_round]);

  // ── Turn logic: starter alternates each round ────────────
  const isMyTurnFirst = starterSlot(game) === mySlot && game.round_state === 'waiting_for_first';
  const isMyTurnSecond = secondSlot(game) === mySlot && game.round_state === 'waiting_for_second';
  const isMyTurn = isMyTurnFirst || isMyTurnSecond;
  const isRoundComplete = game.round_state === 'round_complete';
  const isGeneratingImage = game.round_state === 'generating_image';
  const isGameComplete = game.status === 'completed';

  const myPassUsed = mySlot === 'player1' ? game.player1_has_passed : game.player2_has_passed;
  const canPass = isMyTurnFirst && !myPassUsed;

  // ── Submit answer ────────────────────────────────────────
  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || sending) return;

    setSending(true);

    try {
      let answerSlot: 'answer1' | 'answer2';
      let nextState: RoundState;

      if (isMyTurnFirst) {
        answerSlot = 'answer1';
        nextState = 'waiting_for_second';
      } else {
        answerSlot = 'answer2';
        nextState = 'generating_image';
      }

      const updated = await submitAnswer(game.id, answerSlot, trimmed, nextState);
      setGame(updated);
      setInput('');

      if (answerSlot === 'answer2') {
        const prompt = buildImagePrompt(updated);
        try {
          const res = await fetch('/api/dumbquestions/generate-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
          });
          const json = await res.json();
          await storeRoundImage(game.id, json.url || null, prompt);
        } catch (err) {
          console.error('Image generation failed:', err);
          await storeRoundImage(game.id, null, prompt);
        }
        const fresh = await fetchGame(game.id);
        if (fresh) setGame(fresh);
      }
    } catch (err) {
      console.error('Failed to send:', err);
    } finally {
      setSending(false);
    }
  }, [input, sending, isMyTurnFirst, game.id, game]);

  // ── Pass: swap the question (first player only, once per game) ──
  const handlePass = useCallback(async () => {
    if (!canPass || passing) return;
    setPassing(true);
    try {
      const updated = await passQuestion(game, mySlot);
      setGame(updated);
    } catch (err) {
      console.error('Failed to pass:', err);
    } finally {
      setPassing(false);
    }
  }, [canPass, passing, game, mySlot]);

  // ── Next round or complete game ──────────────────────────
  const handleNextRound = async () => {
    if (advancing) return;
    setAdvancing(true);
    try {
      if (game.current_round === MAX_ROUNDS) {
        const updated = await completeGame(game);
        setGame(updated);
      } else {
        const updated = await advanceRound(game);
        setGame(updated);
      }
    } catch (err) {
      console.error('Failed to advance:', err);
    } finally {
      setAdvancing(false);
    }
  };

  // ── Name mapping ─────────────────────────────────────────
  const firstAnswererName = starterSlot(game) === 'player1' ? game.player1_name : (game.player2_name ?? '');
  const secondAnswererName = secondSlot(game) === 'player1' ? game.player1_name : (game.player2_name ?? '');
  const firstAnswererIsMe = starterSlot(game) === mySlot;
  const secondAnswererIsMe = secondSlot(game) === mySlot;

  // ── Game complete view ───────────────────────────────────
  if (isGameComplete) {
    return (
      <div className="min-h-dvh bg-black flex flex-col">
        <div className="flex-shrink-0 bg-gray-950 border-b border-gray-800 px-4 py-3 text-center">
          <h1 className="text-base font-semibold text-white">Dumb Questions</h1>
          <p className="text-sm text-gray-400 mt-0.5">Game complete</p>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col items-center gap-4">
          <p className="text-white text-center text-lg">
            Your combined creation from {MAX_ROUNDS} rounds
          </p>
          {game.aggregated_image_url ? (
            <motion.img
              key="aggregated"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              src={game.aggregated_image_url}
              alt="Combined creation from all rounds"
              className="rounded-2xl w-full max-w-md border border-gray-800 shadow-lg"
            />
          ) : (
            <div className="bg-gray-800 rounded-2xl px-6 py-4">
              <span className="text-gray-400 text-sm">Generating your combined image…</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-black flex flex-col">
      {/* ── Top bar ─────────────────────────────────────── */}
      <div className="flex-shrink-0 bg-gray-950 border-b border-gray-800 px-4 py-3 text-center">
        <h1 className="text-base font-semibold text-white">Dumb Questions</h1>
        <div className="flex items-center justify-center gap-3 mt-0.5">
          <span className="text-xs text-gray-400">Round {game.current_round}/{MAX_ROUNDS}</span>
          <span className="text-gray-700">·</span>
          <span className="text-xs text-gray-400">
            {firstAnswererName} starts
          </span>
        </div>
      </div>

      {/* ── Message thread ──────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {/* System question bubble */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`q-${game.current_round}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="self-center max-w-[85%]"
          >
            <div className="bg-gray-800 rounded-2xl px-4 py-3 text-center">
              <p className="text-white text-[15px] leading-snug">
                {game.current_question}
              </p>
              {game.current_category && (
                <p className="text-gray-500 text-xs mt-1.5 uppercase tracking-wider">
                  {game.current_category}
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Answer 1 bubble */}
        <AnimatePresence>
          {game.answer1 && (
            <motion.div
              key={`a1-${game.current_round}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex flex-col max-w-[80%] ${
                firstAnswererIsMe ? 'self-end items-end' : 'self-start items-start'
              }`}
            >
              <span className="text-[11px] text-gray-500 mb-1 px-1">
                {firstAnswererName}
              </span>
              <div
                className={`rounded-2xl px-4 py-2.5 ${
                  firstAnswererIsMe
                    ? 'bg-blue-500 text-white rounded-br-md'
                    : 'bg-gray-700 text-white rounded-bl-md'
                }`}
              >
                <p className="text-[15px] leading-snug">{game.answer1}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Answer 2 bubble */}
        <AnimatePresence>
          {game.answer2 && (
            <motion.div
              key={`a2-${game.current_round}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex flex-col max-w-[80%] ${
                secondAnswererIsMe ? 'self-end items-end' : 'self-start items-start'
              }`}
            >
              <span className="text-[11px] text-gray-500 mb-1 px-1">
                {secondAnswererName}
              </span>
              <div
                className={`rounded-2xl px-4 py-2.5 ${
                  secondAnswererIsMe
                    ? 'bg-blue-500 text-white rounded-br-md'
                    : 'bg-gray-700 text-white rounded-bl-md'
                }`}
              >
                <p className="text-[15px] leading-snug">{game.answer2}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Round image + collapsible prompt */}
        <AnimatePresence>
          {game.round_image_url && (
            <motion.div
              key={`img-${game.current_round}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="self-center max-w-[90%] flex flex-col gap-2"
            >
              <img
                src={game.round_image_url}
                alt="Generated round illustration"
                className="rounded-2xl w-full border border-gray-800 shadow-lg"
              />
              {game.last_prompt && (
                <details className="text-gray-500">
                  <summary className="text-xs cursor-pointer hover:text-gray-300 transition-colors px-1">
                    Show FLUX prompt
                  </summary>
                  <p className="text-xs mt-1.5 px-2 py-2 bg-gray-900 rounded-lg leading-relaxed break-words">
                    {game.last_prompt}
                  </p>
                </details>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Waiting indicator */}
        <AnimatePresence>
          {!isMyTurn && !isRoundComplete && !isGeneratingImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`flex flex-col max-w-[80%] ${
                game.round_state === 'waiting_for_first'
                  ? starterSlot(game) !== mySlot
                    ? 'self-start items-start'
                    : 'self-end items-end'
                  : secondSlot(game) !== mySlot
                    ? 'self-start items-start'
                    : 'self-end items-end'
              }`}
            >
              <div className="bg-gray-800 rounded-2xl px-4 py-2.5 rounded-bl-md">
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-400 text-sm">
                    Waiting for {opponentName}
                  </span>
                  <motion.span
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-gray-400"
                  >
                    ...
                  </motion.span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Generating image indicator */}
        <AnimatePresence>
          {isGeneratingImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="self-center"
            >
              <div className="bg-gray-800 rounded-2xl px-4 py-2.5">
                <span className="text-gray-400 text-sm">Generating image…</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* ── Bottom input area ───────────────────────────── */}
      <div className="flex-shrink-0 bg-gray-950 border-t border-gray-800 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {isGeneratingImage ? (
          <div className="flex items-center justify-center gap-2 py-2">
            <span className="text-gray-400 text-sm">Generating image…</span>
          </div>
        ) : isRoundComplete ? (
          <div className="flex flex-col gap-2">
            <button
              onClick={handleNextRound}
              disabled={advancing}
              className="w-full py-3 rounded-xl bg-blue-500 text-white font-semibold text-base disabled:opacity-40 hover:bg-blue-600 active:bg-blue-700 transition-colors"
            >
              {advancing
                ? (game.current_round === MAX_ROUNDS ? 'Creating combined image…' : 'Loading...')
                : game.current_round === MAX_ROUNDS
                  ? 'See combined creation'
                  : 'Next Question'}
            </button>
          </div>
        ) : isMyTurn ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isMyTurnFirst ? 'Your answer…' : 'Reply…'}
                maxLength={280}
                autoFocus
                className="flex-1 px-4 py-2.5 rounded-full bg-gray-900 border border-gray-800 text-white placeholder-gray-500 text-[15px] outline-none focus:border-blue-500 transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={sending || !input.trim()}
                className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center disabled:opacity-40 hover:bg-blue-600 active:bg-blue-700 transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-white"
                >
                  <path
                    d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
            {canPass && (
              <button
                onClick={handlePass}
                disabled={passing}
                className="self-start text-xs text-gray-500 hover:text-gray-300 transition-colors px-2 py-1 disabled:opacity-40"
              >
                {passing ? 'Changing question…' : 'Pass (new question)'}
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="flex-1 px-4 py-2.5 rounded-full bg-gray-900 border border-gray-800">
              <span className="text-gray-600 text-[15px]">
                Waiting for {opponentName}…
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
