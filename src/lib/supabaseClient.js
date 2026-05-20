import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bpbjzdzpgpqqvqsclyge.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwYmp6ZHpwZ3BxcXZxc2NseWdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MTU1MjEsImV4cCI6MjA2MzQ5MTUyMX0.iPiJQiEWnbQ_9jhhc5C47qxpulBjpqQ5GnmAtaf1d74';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);