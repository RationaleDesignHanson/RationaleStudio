/**
 * Utility functions for the Unhinged Text Game
 *
 * 4 rounds, 4 turns each: starter→second→starter→second
 * starter_index flips each round so turns alternate who goes first
 */

import { createClient } from '@/lib/supabase/client';
import { QUESTIONS, type Question } from './dumb-questions-data';

// ── Types ────────────────────────────────────────────────────

export type GameStatus = 'waiting' | 'active' | 'completed';
export type RoundState =
  | 'waiting_for_turn1'
  | 'waiting_for_turn2'
  | 'waiting_for_turn3'
  | 'waiting_for_turn4'
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
  last_prompt: string | null;
  used_question_indices: number[];
  round_state: RoundState;
  round_history: RoundHistoryEntry[];
  aggregated_image_url: string | null;
  player1_has_passed: boolean;
  player2_has_passed: boolean;
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
  prompt: string;
}

// ── Constants ────────────────────────────────────────────────

export const MAX_ROUNDS = 4;

/**
 * Turn order within a round (4 turns): starter, second, starter, second
 * Returns the PlayerSlot for a given turn number (1-4) based on starter_index.
 */
export function whosTurn(game: GameRow, turnNum: 1 | 2 | 3 | 4): PlayerSlot {
  const starter: PlayerSlot = game.starter_index === 0 ? 'player1' : 'player2';
  const second: PlayerSlot = game.starter_index === 0 ? 'player2' : 'player1';
  return turnNum % 2 === 1 ? starter : second;
}

// ── ID Generation ────────────────────────────────────────────

const ID_CHARS = 'abcdefghjkmnpqrstuvwxyz23456789';
const ID_LENGTH = 6;

export function generateGameId(): string {
  let id = '';
  for (let i = 0; i < ID_LENGTH; i++) {
    id += ID_CHARS[Math.floor(Math.random() * ID_CHARS.length)];
  }
  return id;
}

// ── Question Selection ───────────────────────────────────────

export function pickQuestion(usedIndices: number[]): { question: Question; index: number } | null {
  const available = QUESTIONS
    .map((q, i) => ({ question: q, index: i }))
    .filter(({ index }) => !usedIndices.includes(index));

  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
}

// ── Image Prompt: Concept Extraction ─────────────────────────

const FILLER = new Set([
  'i', 'the', 'a', 'an', 'is', 'are', 'was', 'were', 'it', 'its',
  'that', 'this', 'but', 'and', 'or', 'so', 'like', 'just', 'really',
  'definitely', 'probably', 'maybe', 'nah', 'yeah', 'yes', 'no',
  'think', 'would', 'could', 'should', 'for', 'sure', 'way', 'because',
  'they', 'them', 'their', 'you', 'your', 'me', 'my', 'we', 'our',
  'to', 'of', 'in', 'on', 'at', 'be', 'do', 'does', 'did', 'has', 'have',
  'not', 'dont', "don't", 'one', 'got', 'get', 'know', 'about', 'with',
  'its', 'than', 'been', 'who', 'what', 'when', 'where', 'how', 'which',
  'will', 'can', 'all', 'each', 'every', 'both', 'few', 'more', 'most',
  'some', 'any', 'much', 'many', 'too', 'also', 'only', 'own', 'same',
  'very', 'even', 'still', 'back', 'well', 'then', 'here', 'there',
  'why', 'lol', 'lmao', 'haha', 'omg', 'idk',
]);

function extractConcepts(answers: string[]): string[] {
  const words = answers.join(' ').toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2 && !FILLER.has(w));

  const freq = new Map<string, number>();
  for (const w of words) freq.set(w, (freq.get(w) || 0) + 1);

  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([w]) => w);
}

// ── Image Prompt: Art Styles ─────────────────────────────────

const ART_STYLES = [
  'retrofuturist oil painting',
  '80s airbrush concert poster',
  'Dutch Golden Age still life with anachronistic objects',
  'Japanese woodblock print meets vaporwave',
  'Soviet propaganda poster reimagined as a fever dream',
  'macro nature photography of impossible miniature worlds',
  '1970s Italian horror movie poster',
  'Hieronymus Bosch triptych detail',
];

const PROMPT_SUFFIX = 'no text, no letters, no speech bubbles, no dialogue, no captions, photorealistic details mixed with surrealism, award-winning composition';

function pickStyle(gameId: string, round: number): string {
  let hash = 0;
  const key = `${gameId}-${round}`;
  for (let i = 0; i < key.length; i++) {
    hash = ((hash << 5) - hash + key.charCodeAt(i)) | 0;
  }
  return ART_STYLES[Math.abs(hash) % ART_STYLES.length];
}

// ── Image Prompt Builders ────────────────────────────────────

export function buildImagePrompt(game: GameRow): string {
  const question = game.current_question || 'a silly debate';
  const answers = [game.answer1, game.answer2, game.answer3, game.answer4].filter(Boolean) as string[];
  const concepts = extractConcepts(answers);
  const style = pickStyle(game.id, game.current_round);
  const conceptStr = concepts.length > 0 ? concepts.join(', ') : 'absurdity';

  return `Surreal scene depicting the essence of "${question}", featuring ${conceptStr}, rendered as ${style}, dramatic cinematic lighting, highly detailed, ${PROMPT_SUFFIX}`;
}

export function buildAggregatedPrompt(roundHistory: RoundHistoryEntry[], gameId: string): string {
  const allConcepts = roundHistory.flatMap((r) => {
    const answers = [r.answer1, r.answer2, r.answer3, r.answer4].filter(Boolean) as string[];
    return extractConcepts(answers);
  });
  const uniqueConcepts = [...new Set(allConcepts)].slice(0, 12);
  const themes = roundHistory.map(r => r.question).join('; ');

  return `A single sprawling surreal panorama combining: ${themes}. Key elements: ${uniqueConcepts.join(', ')}. Hieronymus Bosch triptych reimagined as a modern fever dream, every element interacts with the others, richly detailed, impossible architecture, dramatic scale shifts, cinematic lighting, ${PROMPT_SUFFIX}`;
}

// ── Supabase Game Helpers ────────────────────────────────────

const supabase = createClient();

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
      round_state: 'waiting_for_turn1',
    })
    .select()
    .single();

  if (error) throw error;
  return data as GameRow;
}

export async function fetchGame(gameId: string): Promise<GameRow | null> {
  const { data, error } = await supabase
    .from('dumb_questions_games')
    .select('*')
    .eq('id', gameId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data as GameRow;
}

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

  if (error) {
    console.error('[dumbquestions] submitAnswer failed:', error);
    throw error;
  }
  return data as GameRow;
}

export async function storeRoundImage(
  gameId: string,
  imageUrl: string | null,
  prompt: string
): Promise<GameRow> {
  const { data, error } = await supabase
    .from('dumb_questions_games')
    .update({
      round_image_url: imageUrl || null,
      last_prompt: prompt,
      round_state: 'round_complete' as RoundState,
      updated_at: new Date().toISOString(),
    })
    .eq('id', gameId)
    .select()
    .single();

  if (error) throw error;
  return data as GameRow;
}

function appendRoundToHistory(game: GameRow, prompt: string): RoundHistoryEntry[] {
  const history = [...(game.round_history ?? [])] as RoundHistoryEntry[];
  history.push({
    question: game.current_question ?? '',
    answer1: game.answer1,
    answer2: game.answer2,
    answer3: game.answer3,
    answer4: game.answer4,
    round_image_url: game.round_image_url,
    prompt,
  });
  return history;
}

export async function advanceRound(game: GameRow): Promise<GameRow> {
  const updatedHistory = appendRoundToHistory(game, game.last_prompt ?? '');
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
      last_prompt: null,
      round_state: 'waiting_for_turn1' as RoundState,
      used_question_indices: finalUsedIndices,
      updated_at: new Date().toISOString(),
    })
    .eq('id', game.id)
    .select()
    .single();

  if (error) throw error;
  return data as GameRow;
}

export async function completeGame(game: GameRow): Promise<GameRow> {
  const fullHistory = appendRoundToHistory(game, game.last_prompt ?? '');
  const prompt = buildAggregatedPrompt(fullHistory, game.id);

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
      last_prompt: null,
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

export async function passQuestion(game: GameRow, playerSlot: PlayerSlot): Promise<GameRow> {
  const passField = playerSlot === 'player1' ? 'player1_has_passed' : 'player2_has_passed';
  if (game[passField]) throw new Error('Already used pass');
  if (game.round_state !== 'waiting_for_turn1') throw new Error('Can only pass on first turn');

  const next = pickQuestion(game.used_question_indices);
  let questionToUse: { question: Question; index: number };
  let finalUsedIndices: number[];

  if (next) {
    questionToUse = next;
    finalUsedIndices = [...game.used_question_indices, next.index];
  } else {
    const fresh = pickQuestion([]);
    if (!fresh) throw new Error('No questions available');
    questionToUse = fresh;
    finalUsedIndices = [fresh.index];
  }

  const { data, error } = await supabase
    .from('dumb_questions_games')
    .update({
      [passField]: true,
      current_question: questionToUse.question.text,
      current_category: questionToUse.question.category,
      used_question_indices: finalUsedIndices,
      updated_at: new Date().toISOString(),
    })
    .eq('id', game.id)
    .select()
    .single();

  if (error) throw error;
  return data as GameRow;
}

export function getSupabaseClient() {
  return supabase;
}
