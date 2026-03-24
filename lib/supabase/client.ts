import { createBrowserClient } from '@supabase/ssr'

// Hardcoded for dumbquestions game - anon key is public, env vars unreliable on Netlify
const SUPABASE_URL = 'https://dgbhtedawigjimbvmllr.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnYmh0ZWRhd2lnamltYnZtbGxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyOTQ3MzQsImV4cCI6MjA4MDg3MDczNH0.cM-WUIiTmMHYLfvihv0UAWdcQKC6xfP4Va0M_ZD7qhU'

let client: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  if (!client) {
    client = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  }
  return client
}
