// Initialize Supabase client for static HTML site
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

// Validate that placeholders have been replaced
if (SUPABASE_URL === 'YOUR_SUPABASE_URL' || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY') {
  console.warn('Supabase credentials not configured. Please update config.js with your actual credentials.');
}

// Initialize and export the Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
console.log('Supabase client initialized');

