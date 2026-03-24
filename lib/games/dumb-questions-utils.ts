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
export type RoundState =
  | 'waiting_for_first'
  | 'waiting_for_second'
  | 'waiting_for_exchange_first'
  | 'waiting_for_exchange_second'
  | 'generating_image'
  | 'round_complete';

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
  answer3: string | null;
  answer4: string | null;
  round_image_url: string | null;
  used_question_indices: number[];
  round_state: RoundState;
  round_history: RoundHistoryEntry[];
  aggregated_image_url: string | null;
  created_at: string;
  updated_at: string;
}

export type PlayerSlot = 'player1' | 'player2';

export interface RoundHistoryEntry {
  question: string;
  answer1: string | null;
  answer2: string | null;
  answer3: string | null;
  answer4: string | null;
  round_image_url: string | null;
}

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

/** Submit an answer (answer1–4) */
export async function submitAnswer(
  gameId: string,
  answerSlot: 'answer1' | 'answer2' | 'answer3' | 'answer4',
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

// ── Image Prompt Generation ─────────────────────────────────

const ART_STYLES = [
  'Thick impasto oil painting, visible palette knife strokes, saturated pigments, gallery-worthy',
  'Vintage 1960s psychedelic concert poster, swirling patterns, neon colors on dark background, hand-lettered feel',
  'Japanese ukiyo-e woodblock print, bold outlines, flat color fields, dramatic composition',
  'Surrealist dreamscape, melting forms, impossible architecture, vivid twilight sky, Dali meets Miyazaki',
];

/** Build per-round image prompt. Question = scene concept, answers = elements, style rotates. */
export function buildImagePrompt(game: GameRow): string {
  const q = game.current_question || 'a strange debate between two friends';
  const answers = [game.answer1, game.answer2, game.answer3, game.answer4]
    .filter(Boolean) as string[];
  const answerScene = answers.length > 0
    ? ` Featuring: ${answers.join(', ')}.`
    : '';
  const style = ART_STYLES[(game.current_round - 1) % ART_STYLES.length];
  return `${q}${answerScene} ${style}.`;
}

const MAX_ROUNDS = 4;

/** Build aggregated prompt combining all 4 rounds into one unified scene. */
export function buildAggregatedPrompt(roundHistory: RoundHistoryEntry[]): string {
  if (roundHistory.length === 0) {
    return 'Epic panoramic mural of a fantastical world. Rich detail, warm palette, studio Ghibli meets Hieronymus Bosch.';
  }

  const themes = roundHistory.map((r) => {
    const answers = [r.answer1, r.answer2, r.answer3, r.answer4]
      .filter(Boolean) as string[];
    const elements = answers.length > 0 ? `: ${answers.join(', ')}` : '';
    return `${r.question}${elements}`;
  });

  return `Epic panoramic mural combining four scenes into one unified world. ${themes.join(' — ')} — All elements woven together in the same fantastical landscape. Rich detail, warm palette, cohesive composition, studio Ghibli meets Hieronymus Bosch.`;
}

/** Store generated round image and mark round complete (pass null if image gen failed) */
export async function storeRoundImage(
  gameId: string,
  imageUrl: string | null
): Promise<GameRow> {
  const { data, error } = await supabase
    .from('dumb_questions_games')
    .update({
      round_image_url: imageUrl || null,
      round_state: 'round_complete' as RoundState,
      updated_at: new Date().toISOString(),
    })
    .eq('id', gameId)
    .select()
    .single();

  if (error) throw error;
  return data as GameRow;
}

/** Append current round to history. Returns the new history array. */
function appendRoundToHistory(game: GameRow): RoundHistoryEntry[] {
  const history = (game.round_history ?? []) as RoundHistoryEntry[];
  history.push({
    question: game.current_question ?? '',
    answer1: game.answer1,
    answer2: game.answer2,
    answer3: game.answer3,
    answer4: game.answer4,
    round_image_url: game.round_image_url,
  });
  return history;
}

/** Advance to next round: append current to history, pick new question, swap starter, clear answers */
export async function advanceRound(game: GameRow): Promise<GameRow> {
  const updatedHistory = appendRoundToHistory(game);
  const nextRound = game.current_round + 1;
  const nextStarter = game.starter_index === 0 ? 1 : 0;
  const nextQuestion = pickQuestion(game.used_question_indices);

  let questionToUse: { question: Question; index: number };
  let finalUsedIndices: number[];

  if (nextQuestion) {
    questionToUse = nextQuestion;
    finalUsedIndices = [...game.used_question_indices, nextQuestion.index];
  } else {
    const fresh = pickQuestion([]);
    if (!fresh) throw new Error('No questions available');
    questionToUse = fresh;
    finalUsedIndices = [fresh.index];
  }

  const { data, error } = await supabase
    .from('dumb_questions_games')
    .update({
      round_history: updatedHistory,
      current_round: nextRound,
      starter_index: nextStarter,
      current_question: questionToUse.question.text,
      current_category: questionToUse.question.category,
      answer1: null,
      answer2: null,
      answer3: null,
      answer4: null,
      round_image_url: null,
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

/** Complete game after round 4: append round 4, generate aggregated image, set status completed */
export async function completeGame(game: GameRow): Promise<GameRow> {
  const fullHistory = appendRoundToHistory(game);
  const prompt = buildAggregatedPrompt(fullHistory);

  // Store round 4 in history and set status to completed (before image, so we can show "generating")
  const { data: updated, error: updateError } = await supabase
    .from('dumb_questions_games')
    .update({
      round_history: fullHistory,
      status: 'completed' as GameStatus,
      answer1: null,
      answer2: null,
      answer3: null,
      answer4: null,
      round_image_url: null,
      round_state: 'round_complete' as RoundState,
      updated_at: new Date().toISOString(),
    })
    .eq('id', game.id)
    .select()
    .single();

  if (updateError) throw updateError;

  try {
    const res = await fetch(
      `${typeof window !== 'undefined' ? window.location.origin : ''}/api/dumbquestions/generate-image`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      }
    );
    const json = await res.json();
    if (json.url) {
      const { data: final, error: finalError } = await supabase
        .from('dumb_questions_games')
        .update({
          aggregated_image_url: json.url,
          updated_at: new Date().toISOString(),
        })
        .eq('id', game.id)
        .select()
        .single();
      if (finalError) throw finalError;
      return final as GameRow;
    }
  } catch (err) {
    console.error('Aggregated image generation failed:', err);
  }

  return updated as GameRow;
}

export { MAX_ROUNDS };

/** Get the Supabase client (for realtime subscriptions in components) */
export function getSupabaseClient() {
  return supabase;
}
