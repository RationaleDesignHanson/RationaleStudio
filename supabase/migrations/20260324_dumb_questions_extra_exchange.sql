-- Add extra exchange (answer3, answer4) and round image for Dumb Questions game
-- Flow: answer1 → answer2 → answer3 (exchange) → answer4 (exchange) → generate image → next question
--
-- IMPORTANT: Run this in the Supabase SQL Editor.
-- If the constraint step (block 2/3) fails, run the diagnostic below first:
--
--   SELECT conname, pg_get_constraintdef(oid)
--   FROM pg_constraint
--   WHERE conrelid = 'dumb_questions_games'::regclass AND contype = 'c';
--
-- Then drop whichever constraint name appears for round_state manually.

-- 1. Add columns
ALTER TABLE dumb_questions_games ADD COLUMN IF NOT EXISTS answer3 TEXT;
ALTER TABLE dumb_questions_games ADD COLUMN IF NOT EXISTS answer4 TEXT;
ALTER TABLE dumb_questions_games ADD COLUMN IF NOT EXISTS round_image_url TEXT;

-- 2. Drop ALL check constraints on round_state (handles any auto-generated name)
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
    EXECUTE format('ALTER TABLE dumb_questions_games DROP CONSTRAINT %I', con.conname);
  END LOOP;
END $$;

-- 3. Add new round_state check with all required states
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
