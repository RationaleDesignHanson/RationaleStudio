/**
 * Utility functions for the Unhinged Text Game
 *
 * - Game ID generation
 * - Question selection with repeat prevention
 * - Supabase game helpers
 */

import { createClient } from '@/lib/supabase/client';
import { QUESTIONS, type Question } from './dumb-questions-data';

// ── Types ────────────────────────────────────────────────────

export type GameStatus = 'waiting' | 'active' | 'completed';
export type RoundState = 'waiting_for_first' | 'waiting_for_second' | 'round_complete';

export interface GameRow {
  id: string;
  player1_name: string;
  player2_name: string | null;
  status: GameStatus;
  current_round: number;
  starter_index: number; // 0 = player1 starts, 1 = player2
  current_question: string | null;
  current_category: string | null;
  answer1: string | null;
  answer2: string | null;
  used_question_indices: number[];
  round_state: RoundState;
  created_at: string;
  updated_at: string;
}

export type PlayerSlot = 'player1' | 'player2';

// ── ID Generation ────────────────────────────────────────────

const ID_CHARS = 'abcdefghjkmnpqrstuvwxyz23456789'; // no ambiguous chars
const ID_LENGTH = 6;

export function generateGameId(): string {
  let id = '';
  for (let i = 0; i < ID_LENGTH; i++) {
    id += ID_CHARS[Math.floor(Math.random() * ID_CHARS.length)];
  }
  return id;
}

// ── Question Selection ───────────────────────────────────────

/**
 * Pick a random question that hasn't been used yet.
 * Returns the question and its index in the QUESTIONS array.
 */
export function pickQuestion(usedIndices: number[]): { question: Question; index: number } | null {
  const available = QUESTIONS
    .map((q, i) => ({ question: q, index: i }))
    .filter(({ index }) => !usedIndices.includes(index));

  if (available.length === 0) return null;

  const pick = available[Math.floor(Math.random() * available.length)];
  return pick;
}

// ── Supabase Game Helpers ────────────────────────────────────

const supabase = createClient();

/** Create a new game and return the row */
export async function createGame(player1Name: string): Promise<GameRow> {
  const id = generateGameId();
  const firstQuestion = pickQuestion([]);
  if (!firstQuestion) throw new Error('No questions available');

  const { data, error } = await supabase
    .from('dumb_questions_games')
    .insert({
      id,
      player1_name: player1Name,
      status: 'waiting' as GameStatus,
      current_question: firstQuestion.question.text,
      current_category: firstQuestion.question.category,
      used_question_indices: [firstQuestion.index],
    })
    .select()
    .single();

  if (error) throw error;
  return data as GameRow;
}

/** Fetch a game by ID */
export async function fetchGame(gameId: string): Promise<GameRow | null> {
  const { data, error } = await supabase
    .from('dumb_questions_games')
    .select('*')
    .eq('id', gameId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // not found
    throw error;
  }
  return data as GameRow;
}

/** Player 2 joins a game */
export async function joinGame(gameId: string, player2Name: string): Promise<GameRow> {
  const { data, error } = await supabase
    .from('dumb_questions_games')
    .update({
      player2_name: player2Name,
      status: 'active' as GameStatus,
      updated_at: new Date().toISOString(),
    })
    .eq('id', gameId)
    .eq('status', 'waiting')
    .select()
    .single();

  if (error) throw error;
  return data as GameRow;
}

/** Submit an answer (answer1 = first responder, answer2 = second responder) */
export async function submitAnswer(
  gameId: string,
  answerSlot: 'answer1' | 'answer2',
  answer: string,
  nextRoundState: RoundState
): Promise<GameRow> {
  const { data, error } = await supabase
    .from('dumb_questions_games')
    .update({
      [answerSlot]: answer,
      round_state: nextRoundState,
      updated_at: new Date().toISOString(),
    })
    .eq('id', gameId)
    .select()
    .single();

  if (error) throw error;
  return data as GameRow;
}

/** Advance to next round: pick new question, swap starter, clear answers */
export async function advanceRound(game: GameRow): Promise<GameRow> {
  const nextRound = game.current_round + 1;
  const nextStarter = game.starter_index === 0 ? 1 : 0;
  const nextQuestion = pickQuestion(game.used_question_indices);

  // If we've exhausted all questions, reset the pool
  const usedIndices = nextQuestion
    ? [...game.used_question_indices, nextQuestion.index]
    : [nextQuestion ? nextQuestion.index : 0];

  const questionToUse = nextQuestion || pickQuestion([]);
  if (!questionToUse) throw new Error('No questions available');

  const finalUsedIndices = nextQuestion
    ? [...game.used_question_indices, questionToUse.index]
    : [questionToUse.index]; // reset if pool was exhausted

  const { data, error } = await supabase
    .from('dumb_questions_games')
    .update({
      current_round: nextRound,
      starter_index: nextStarter,
      current_question: questionToUse.question.text,
      current_category: questionToUse.question.category,
      answer1: null,
      answer2: null,
      round_state: 'waiting_for_first' as RoundState,
      used_question_indices: finalUsedIndices,
      updated_at: new Date().toISOString(),
    })
    .eq('id', game.id)
    .select()
    .single();

  if (error) throw error;
  return data as GameRow;
}

/** Get the Supabase client (for realtime subscriptions in components) */
export function getSupabaseClient() {
  return supabase;
}
