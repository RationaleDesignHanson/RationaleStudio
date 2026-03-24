/**
 * Generate an image from a Dumb Questions round.
 * Step 1: GPT-4o-mini interprets the conversation into a visual scene description.
 * Step 2: Flux Dev renders it.
 */

import { NextResponse } from 'next/server';

export const maxDuration = 60;

const ART_STYLES = [
  'Thick impasto oil painting, visible palette knife strokes, saturated pigments, gallery-worthy',
  'Vintage 1960s psychedelic concert poster, swirling patterns, neon colors on dark background',
  'Japanese ukiyo-e woodblock print, bold outlines, flat color fields, dramatic composition',
  'Surrealist dreamscape, melting forms, impossible architecture, vivid twilight sky, Dali meets Miyazaki',
];

const ROUND_SYSTEM_PROMPT = `You are an art director for a party game. Given a silly debate question and the players' answers, describe a single vivid visual scene in 2-3 sentences that captures the spirit and humor of their conversation. Think about what the answers MEAN — if someone says a movie title, describe imagery from that movie. If someone names a food, show that food with personality. Be creative, funny, and surreal. Describe concrete visual elements only — what to paint, not what was said. Never include text, words, or speech bubbles in the scene.`;

const AGGREGATED_SYSTEM_PROMPT = `You are an art director creating a final masterpiece for a party game. You're given 4 rounds of a silly debate. Each round has a question and the players' answers. Describe ONE unified visual scene in 3-4 sentences that weaves ALL 4 rounds together into a single fantastical world. The key elements from each round should interact with each other — not just sit side by side. Think about what the answers MEAN and find surreal visual connections between them. Be creative, weird, and delightful. Describe concrete visual elements only. Never include text, words, or speech bubbles.`;

interface RoundData {
  question: string;
  answers: string[];
}

interface RequestBody {
  question?: string;
  answers?: string[];
  round?: number;
  rounds?: RoundData[];
  aggregated?: boolean;
}

async function interpretWithGPT(systemPrompt: string, userMessage: string): Promise<string> {
  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) throw new Error('OPENAI_API_KEY not configured');

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${openaiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      max_tokens: 200,
      temperature: 1.0,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('[dumbquestions] OpenAI error:', res.status, err);
    throw new Error(`OpenAI returned ${res.status}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() || '';
}

async function generateWithFlux(prompt: string): Promise<string> {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) throw new Error('REPLICATE_API_TOKEN not configured');

  const response = await fetch(
    'https://api.replicate.com/v1/models/black-forest-labs/flux-dev/predictions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Prefer: 'wait=55',
      },
      body: JSON.stringify({
        input: {
          prompt: prompt.slice(0, 1500),
          num_outputs: 1,
          num_inference_steps: 35,
          guidance: 4.0,
          aspect_ratio: '1:1',
          output_format: 'webp',
          output_quality: 90,
        },
      }),
    }
  );

  if (!response.ok) {
    const errBody = await response.text();
    console.error('[dumbquestions] Replicate error:', response.status, errBody);
    throw new Error(`Replicate returned ${response.status}`);
  }

  const result = await response.json();
  const output = result.output;
  const imageUrl = Array.isArray(output) ? output[0] : output;

  if (!imageUrl || typeof imageUrl !== 'string') {
    throw new Error('No image URL in Replicate response');
  }

  return imageUrl;
}

export async function POST(request: Request) {
  let body: RequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  try {
    let sceneDescription: string;

    if (body.aggregated && body.rounds) {
      // Aggregated image: all rounds combined
      const userMessage = body.rounds
        .map((r, i) => `Round ${i + 1}: "${r.question}" — Answers: ${r.answers.join(', ')}`)
        .join('\n');

      console.log('[dumbquestions] Interpreting aggregated scene...');
      sceneDescription = await interpretWithGPT(AGGREGATED_SYSTEM_PROMPT, userMessage);
    } else if (body.question) {
      // Per-round image
      const answers = body.answers || [];
      const userMessage = `Question: "${body.question}"\nAnswers: ${answers.join(', ')}`;

      console.log('[dumbquestions] Interpreting round scene...');
      sceneDescription = await interpretWithGPT(ROUND_SYSTEM_PROMPT, userMessage);
    } else {
      return NextResponse.json({ error: 'question or aggregated+rounds required' }, { status: 400 });
    }

    console.log('[dumbquestions] Scene description:', sceneDescription);

    // Add art style
    const round = body.round || 1;
    const style = body.aggregated
      ? 'Epic panoramic composition, rich detail, warm palette, studio Ghibli meets Hieronymus Bosch'
      : ART_STYLES[(round - 1) % ART_STYLES.length];

    const fullPrompt = `${sceneDescription} ${style}.`;
    console.log('[dumbquestions] Full prompt length:', fullPrompt.length);

    const imageUrl = await generateWithFlux(fullPrompt);
    console.log('[dumbquestions] Image generated successfully');

    return NextResponse.json({ url: imageUrl });
  } catch (err) {
    console.error('[dumbquestions] Generate image error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Image generation failed' },
      { status: 500 }
    );
  }
}
