-- Create beta_signups table for TestFlight beta program
-- Stores email signups for Heirloom and Zero apps

CREATE TABLE IF NOT EXISTS beta_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  app_name TEXT NOT NULL CHECK (app_name IN ('heirloom', 'zero')),

  -- Metadata
  signed_up_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  signup_source TEXT, -- e.g., 'hero_cta', 'footer_cta', 'demo_section'

  -- Email tracking
  email_sent BOOLEAN DEFAULT FALSE,
  email_sent_at TIMESTAMP WITH TIME ZONE,

  -- Prevent duplicate signups for same app
  UNIQUE(email, app_name)
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_beta_signups_app ON beta_signups(app_name);
CREATE INDEX IF NOT EXISTS idx_beta_signups_date ON beta_signups(signed_up_at DESC);
CREATE INDEX IF NOT EXISTS idx_beta_signups_email ON beta_signups(email);

-- Enable Row Level Security
ALTER TABLE beta_signups ENABLE ROW LEVEL SECURITY;

-- Policy: Allow insert for anyone (public beta signup)
CREATE POLICY "Allow public beta signups"
  ON beta_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Only service role can read/update (for API)
CREATE POLICY "Service role can read all"
  ON beta_signups
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can update"
  ON beta_signups
  FOR UPDATE
  TO service_role
  USING (true);

-- Add comment for documentation
COMMENT ON TABLE beta_signups IS 'Beta tester signups for Heirloom and Zero TestFlight programs';
