// gpt-directory/src/supabase/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rynawgsuxptcnzkiumyu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5bmF3Z3N1eHB0Y256a2l1bXl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAyOTU3NDcsImV4cCI6MjAxNTg3MTc0N30.B8lqVDRzsptHqyBRva7rM70k_dZHR1fAWc6UgA0c6Zs';

// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
