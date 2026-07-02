/* ============================================================
   Skore Party — config.js
   Supabase client. The anon key is designed to be public;
   Row Level Security on the server is the real boundary.
   ============================================================ */
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://euieccuakerbgbheljqs.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qd2NhaHRlaHVudnJqdWxnemp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxODE5NDIsImV4cCI6MjA4OTc1Nzk0Mn0.zhXXVu43AY4DTjlLQC3TDZVdiLQ44tg1e4OBdfVhe-o';

export const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
