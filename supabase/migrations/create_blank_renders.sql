-- Blank — deviation render cache and spend ceiling.
--
-- Two jobs, both about money:
--
--  1. CACHE. A render tuple is deterministic (same tuple -> same prompt, same
--     seed), so the second person to ask for a combination must never pay for
--     it again. The tuple key is the primary key, which makes the cache lookup
--     and the insert the same statement.
--
--  2. CEILING. Module-scope counters in a serverless route are per-instance and
--     reset on cold start, so they are not a spend guarantee — they are a
--     speed bump. Counting rows in this table is a real one.
--
-- Everything is written with the service-role key from the API route. RLS is on
-- with no policies, so the anon key cannot read or write it.

CREATE TABLE IF NOT EXISTS blank_renders (
  tuple_key    TEXT PRIMARY KEY,                     -- garment.tier.graphic.colorway
  garment      TEXT NOT NULL CHECK (garment IN ('tee', 'hoodie', 'cap')),
  tier         INTEGER NOT NULL CHECK (tier BETWEEN 1 AND 5),
  graphic      TEXT NOT NULL,
  colorway     TEXT NOT NULL,
  seed         INTEGER NOT NULL,                     -- derived from the tuple, stored for reproducibility
  image_url    TEXT NOT NULL,                        -- Replicate output URL
  prompt       TEXT NOT NULL,                        -- composed server-side; kept for auditability
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- The ceiling query: how many renders were paid for today.
CREATE INDEX IF NOT EXISTS blank_renders_created_at_idx ON blank_renders (created_at DESC);

ALTER TABLE blank_renders ENABLE ROW LEVEL SECURITY;
-- No policies on purpose: service-role only.
