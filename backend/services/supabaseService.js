import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

// Admin client for backend operations
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL || 'placeholder',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder'
);