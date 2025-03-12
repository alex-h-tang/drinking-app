import { createClient } from '@supabase/supabase-js';
import { LocalStorage } from 'node-localstorage';
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://sjjpakzaemmfbljxkvga.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqanBha3phZW1tZmJsanhrdmdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0ODY0MjMsImV4cCI6MjA1NzA2MjQyM30.5Ny3-LaEl2bc2i8l0hnTsFr5euMoMa8ablOezX6cA28';
const supabaseAdminKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const localStorage = new LocalStorage('./supabase-storage');

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: localStorage, // Store the session persistently
    autoRefreshToken: true, // Automatically refresh tokens
    persistSession: true, // Keeps user logged in
    detectSessionInUrl: false,
  },
});

if (!supabaseAdminKey) {
  throw new Error("Missing Supabase Service Role Key in environment variables.");
}

const supabaseAdmin = createClient(supabaseUrl, supabaseAdminKey);

export { supabase, supabaseAdmin };