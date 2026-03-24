-- Add extra exchange (answer3, answer4) and round image for Dumb Questions game
-- Flow: answer1 → answer2 → answer3 (exchange) → answer4 (exchange) → generate image → next question
-- Run each block separately if you hit errors (Supabase SQL Editor).

-- 1. Add columns (run one at a time if needed)
ALTER TABLE dumb_questions_games ADD COLUMN IF NOT EXISTS answer3 TEXT;
ALTER TABLE dumb_questions_games ADD COLUMN IF NOT EXISTS answer4 TEXT;
ALTER TABLE dumb_questions_games ADD COLUMN IF NOT EXISTS round_image_url TEXT;

-- 2. Drop old round_state check (inline CHECK may have auto-generated name)
DO $$
DECLARE
  con RECORD;
BEGIN
  FOR con IN
    SELECT c.conname
    FROM pg_constraint c
    JOIN pg_class t ON c.conrelid = t.oid
    WHERE t.relname = 'dumb_questions_games'
      AND c.contype = 'c'
      AND pg_get_constraintdef(c.oid) LIKE '%round_state%'
  LOOP
    EXECUTE format('ALTER TABLE dumb_questions_games DROP CONSTRAINT IF EXISTS %I', con.conname);
  END LOOP;
END $$;

-- 3. Add new round_state check with extra states
ALTER TABLE dumb_questions_games
  ADD CONSTRAINT dumb_questions_games_round_state_check
  CHECK (round_state IN (
    'waiting_for_first',
    'waiting_for_second',
    'waiting_for_exchange_first',
    'waiting_for_exchange_second',
    'generating_image',
    'round_complete'
  ));

-- 4. Optional comments
COMMENT ON COLUMN dumb_questions_games.answer3 IS 'First reply in extra exchange (after answer2)';
COMMENT ON COLUMN dumb_questions_games.answer4 IS 'Second reply in extra exchange';
COMMENT ON COLUMN dumb_questions_games.round_image_url IS 'AI-generated image URL from question + conversation';
