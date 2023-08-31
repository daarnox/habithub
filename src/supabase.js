import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = import.meta.env.SUPABASE_URL
// const supabaseKey = import.meta.env.SUPABASE_ANON_KEY
const supabaseUrl = 'https://qufmupocybvlfnrfzpal.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1Zm11cG9jeWJ2bGZucmZ6cGFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMyNDU3OTAsImV4cCI6MjAwODgyMTc5MH0.NBdH4i8dnrfaa3t6gOvIhEI8erdtsR64idFX_4E9TMo'

export const supabase = createClient(supabaseUrl, supabaseKey)