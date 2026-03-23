-- Create dumb_questions_games table for the Unhinged Text Game
-- Stores game sessions for real-time two-player question game

CREATE TABLE IF NOT EXISTS dumb_questions_games (
  id TEXT PRIMARY KEY,                              -- short ID for URLs (e.g. "xk9f2m")
  player1_name TEXT NOT NULL,
  player2_name TEXT,
  status TEXT NOT NULL DEFAULT 'waiting'             -- waiting | active | completed
    CHECK (status IN ('waiting', 'active', 'completed')),
  current_round INTEGER NOT NULL DEFAULT 1,
  starter_index INTEGER NOT NULL DEFAULT 0,          -- 0=player1 starts, 1=player2
  current_question TEXT,
  current_category TEXT,
  answer1 TEXT,                                      -- answer from whoever goes first this round
  answer2 TEXT,                                      -- answer from whoever goes second
  used_question_indices JSONB NOT NULL DEFAULT '[]', -- track used questions to prevent repeats
  round_state TEXT NOT NULL DEFAULT 'waiting_for_first'
    CHECK (round_state IN ('waiting_for_first', 'waiting_for_second', 'round_complete')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_dumb_questions_games_status ON dumb_questions_games(status);
CREATE INDEX IF NOT EXISTS idx_dumb_questions_games_created ON dumb_questions_games(created_at DESC);

-- Enable Row Level Security
ALTER TABLE dumb_questions_games ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can create a game
CREATE POLICY "Allow public game creation"
  ON dumb_questions_games
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Anyone can read games (needed for joining + realtime)
CREATE POLICY "Allow public game reads"
  ON dumb_questions_games
  FOR SELECT
  TO anon
  USING (true);

-- Policy: Anyone can update games (for joining, answering, advancing rounds)
CREATE POLICY "Allow public game updates"
  ON dumb_questions_games
  FOR UPDATE
  TO anon
  USING (true);

-- Enable realtime for this table
ALTER PUBLICATION supabase_realtime ADD TABLE dumb_questions_games;

-- Add comment for documentation
COMMENT ON TABLE dumb_questions_games IS 'Game sessions for the Unhinged Text Game (dumbquestions)';
