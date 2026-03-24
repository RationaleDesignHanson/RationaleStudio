-- Dumb Questions: simplify to 2 turns per round + image generation
-- Removes exchange phase (answer3/answer4). Adds round_image_url, last_prompt,
-- round_history, aggregated_image_url. Updates round_state constraint.

-- 1. Add columns needed for image generation and round history
ALTER TABLE dumb_questions_games ADD COLUMN IF NOT EXISTS round_image_url TEXT;
ALTER TABLE dumb_questions_games ADD COLUMN IF NOT EXISTS last_prompt TEXT;
ALTER TABLE dumb_questions_games ADD COLUMN IF NOT EXISTS round_history JSONB NOT NULL DEFAULT '[]';
ALTER TABLE dumb_questions_games ADD COLUMN IF NOT EXISTS aggregated_image_url TEXT;

-- 2. Add pass tracking (one pass per player per game)
ALTER TABLE dumb_questions_games ADD COLUMN IF NOT EXISTS player1_has_passed BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE dumb_questions_games ADD COLUMN IF NOT EXISTS player2_has_passed BOOLEAN NOT NULL DEFAULT FALSE;

-- 3. Drop answer3/answer4 if they exist (leftover from exchange phase)
ALTER TABLE dumb_questions_games DROP COLUMN IF EXISTS answer3;
ALTER TABLE dumb_questions_games DROP COLUMN IF EXISTS answer4;

-- 4. Drop all round_state CHECK constraints (handles auto-generated names)
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

-- 5. Add clean round_state constraint: 4 states only
ALTER TABLE dumb_questions_games
  ADD CONSTRAINT dumb_questions_games_round_state_check
  CHECK (round_state IN (
    'waiting_for_first',
    'waiting_for_second',
    'generating_image',
    'round_complete'
  ));
