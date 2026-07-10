import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verify that the keys are configured and not placeholders
const isConfigured = 
  supabaseUrl && 
  supabaseUrl !== 'your_supabase_url_here' && 
  supabaseAnonKey && 
  supabaseAnonKey !== 'your_supabase_anon_key_here';

if (!isConfigured) {
  console.warn("Supabase is not configured yet. Received URL:", supabaseUrl, "Key length:", supabaseAnonKey ? supabaseAnonKey.length : 0);
}

export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;
