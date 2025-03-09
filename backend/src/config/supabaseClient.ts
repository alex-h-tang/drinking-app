import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://sjjpakzaemmfbljxkvga.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqanBha3phZW1tZmJsanhrdmdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0ODY0MjMsImV4cCI6MjA1NzA2MjQyM30.5Ny3-LaEl2bc2i8l0hnTsFr5euMoMa8ablOezX6cA28';

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };