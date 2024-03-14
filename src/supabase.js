
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://lwaknrisovgsgaostfpq.supabase.co'
const supabaseKey = " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3YWtucmlzb3Znc2dhb3N0ZnBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgzNTQ2NTAsImV4cCI6MjAyMzkzMDY1MH0.mQiDtMWfe2J6WayhPI4YxbYlFwH-2-A811oSYi0jqsU";
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase;