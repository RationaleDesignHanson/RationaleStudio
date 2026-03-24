-- 4-round game with aggregated final image
-- round_history stores each completed round; aggregated_image_url = final combined image

ALTER TABLE dumb_questions_games ADD COLUMN IF NOT EXISTS round_history JSONB NOT NULL DEFAULT '[]';
ALTER TABLE dumb_questions_games ADD COLUMN IF NOT EXISTS aggregated_image_url TEXT;

COMMENT ON COLUMN dumb_questions_games.round_history IS 'Array of {question, answer1, answer2, answer3, answer4, round_image_url} per completed round';
COMMENT ON COLUMN dumb_questions_games.aggregated_image_url IS 'Final combined image after 4 rounds';
