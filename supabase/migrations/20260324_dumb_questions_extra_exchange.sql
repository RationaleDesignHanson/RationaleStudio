-- Dumb Questions: 4 turns per round (starter→second→starter→second)
-- 4 rounds total, starter alternates each round.
-- Adds image gen columns, pass tracking, round history.

-- 1. Ensure answer columns exist
ALTER TABLE dumb_questions_games ADD COLUMN IF NOT EXISTS answer3 TEXT;
ALTER TABLE dumb_questions_games ADD COLUMN IF NOT EXISTS answer4 TEXT;

-- 2. Add image + history columns
ALTER TABLE dumb_questions_games ADD COLUMN IF NOT EXISTS round_image_url TEXT;
ALTER TABLE dumb_questions_games ADD COLUMN IF NOT EXISTS last_prompt TEXT;
ALTER TABLE dumb_questions_games ADD COLUMN IF NOT EXISTS round_history JSONB NOT NULL DEFAULT '[]';
ALTER TABLE dumb_questions_games ADD COLUMN IF NOT EXISTS aggregated_image_url TEXT;

-- 3. Add pass tracking
ALTER TABLE dumb_questions_games ADD COLUMN IF NOT EXISTS player1_has_passed BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE dumb_questions_games ADD COLUMN IF NOT EXISTS player2_has_passed BOOLEAN NOT NULL DEFAULT FALSE;

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

-- 5. Add clean round_state constraint
ALTER TABLE dumb_questions_games
  ADD CONSTRAINT dumb_questions_games_round_state_check
  CHECK (round_state IN (
    'waiting_for_first',
    'waiting_for_second',
    'waiting_for_turn1',
    'waiting_for_turn2',
    'waiting_for_turn3',
    'waiting_for_turn4',
    'generating_image',
    'round_complete'
  ));

-- 6. Update default to new turn1 state
ALTER TABLE dumb_questions_games ALTER COLUMN round_state SET DEFAULT 'waiting_for_turn1';
