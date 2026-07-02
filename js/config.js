/* ============================================================
   Skore Party — config.js
   Supabase client. The anon key is designed to be public;
   Row Level Security on the server is the real boundary.
   ============================================================ */
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://euieccuakerbgbheljqs.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1aWVjY3Vha2VyYmdiaGVsanFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwMDA0NDQsImV4cCI6MjA5ODU3NjQ0NH0.xquURJT39TPE2O2B7DT1H4lRPICxa38W7y3XtrHKQPc';

export const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
