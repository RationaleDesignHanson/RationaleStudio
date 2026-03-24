import { createBrowserClient } from '@supabase/ssr'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dgbhtedawigjimbvmllr.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnYmh0ZWRhd2lnamltYnZtbGxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyOTQ3MzQsImV4cCI6MjA4MDg3MDczNH0.cM-WUIiTmMHYLfvihv0UAWdcQKC6xfP4Va0M_ZD7qhU'

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}
