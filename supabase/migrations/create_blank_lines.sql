-- Blank — durable lines.
--
-- WHAT THIS FIXES. Every choice in Blank lived in the query string and nowhere
-- else. That made sharing trivial and made the work disposable: closing the tab
-- lost it, there was no undo (the provider uses replaceState precisely so the
-- back button does not fill with budget-slider steps), and two people editing
-- the same link overwrote each other silently with no record of what changed.
--
-- A realistically specced line was measured at 637 characters bare and 3,925
-- with a full keeps shelf, so the feature built for sharing a shortlist was the
-- one that broke sharing — messaging apps truncate around 2,000.
--
-- The fix is the standard one: the URL IDENTIFIES the document rather than
-- containing it. /work/blank/k3n8xp is stable, short, and survives a closed tab,
-- a crash and a different machine.
--
-- The encoded URL does not go away — it becomes a SNAPSHOT link: frozen,
-- self-contained, still nice to paste into a message. It stops being the only
-- copy, which is all that was wrong with it.
--
-- CONCURRENCY IS OPTIMISTIC, NOT CRDT. Two people making chunky edits — pick a
-- colour, set a price — do not need character-level merge, and Yjs or Automerge
-- would be a large dependency buying nothing. A write based on a stale version
-- is REJECTED and the client is shown what changed. Eliminating silent
-- last-write-wins is the goal; real-time multiplayer is not.
--
-- Written with the service-role key from a route handler gated on the unlock
-- cookie, exactly like blank_renders. RLS is on with no policies, so the anon
-- key can neither read nor write.

CREATE TABLE IF NOT EXISTS blank_lines (
  -- Short and URL-safe. Generated server-side; not guessable enough to be a
  -- capability on its own, which is why the unlock cookie still gates access.
  id           TEXT PRIMARY KEY,
  title        TEXT,
  -- The whole document: LineConfig plus the SKU list. JSONB rather than columns
  -- because the shape is still moving weekly and every field is already
  -- validated on read by lib/blank/lineState.tsx.
  state        JSONB NOT NULL,
  -- Optimistic concurrency. A save carries the version it was based on; the
  -- UPDATE matches on it, and zero rows affected means someone else got there
  -- first. That is a 409 and a diff, not a silent overwrite.
  version      INTEGER NOT NULL DEFAULT 1,
  -- Single initial from lib/blank/who.ts. Not an account — there is no login,
  -- only a shared password — so this is a claim, not an identity.
  updated_by   TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- "What have we got on the go" — the recent-lines list.
CREATE INDEX IF NOT EXISTS blank_lines_updated_at_idx ON blank_lines (updated_at DESC);

ALTER TABLE blank_lines ENABLE ROW LEVEL SECURITY;
-- No policies on purpose: service-role only.

-- Append-only history.
--
-- Buys the three things a single mutable row cannot: undo, "what did my partner
-- change since I last looked", and recovery from a bad overwrite. One insert per
-- save is cheap; the state is a few kilobytes of JSON.
CREATE TABLE IF NOT EXISTS blank_line_revisions (
  line_id     TEXT NOT NULL REFERENCES blank_lines (id) ON DELETE CASCADE,
  version     INTEGER NOT NULL,
  state       JSONB NOT NULL,
  saved_by    TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (line_id, version)
);

CREATE INDEX IF NOT EXISTS blank_line_revisions_line_idx
  ON blank_line_revisions (line_id, version DESC);

ALTER TABLE blank_line_revisions ENABLE ROW LEVEL SECURITY;
-- No policies on purpose: service-role only.

-- Retention. A line edited hard for a week is a few hundred revisions of a few
-- kilobytes each, which is nothing — but unbounded history on a table nobody
-- prunes is how a small tool quietly becomes a large bill. Keeps the most recent
-- 100 per line, which is far more undo than anyone reaches for.
CREATE OR REPLACE FUNCTION blank_prune_revisions() RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM blank_line_revisions
  WHERE line_id = NEW.line_id
    AND version <= NEW.version - 100;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS blank_line_revisions_prune ON blank_line_revisions;
CREATE TRIGGER blank_line_revisions_prune
  AFTER INSERT ON blank_line_revisions
  FOR EACH ROW EXECUTE FUNCTION blank_prune_revisions();
