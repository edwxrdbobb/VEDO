import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let browserClient: SupabaseClient | null = null;

export function getBrowserClient(): SupabaseClient {
  if (!browserClient) {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set");
    }
    browserClient = createClient(supabaseUrl, supabaseAnonKey);
  }
  return browserClient;
}

export function createServerClient() {
  if (!supabaseUrl || !supabaseAnonKey || !serviceKey) {
    console.warn("Missing Supabase environment variables");
  }

  return createClient(supabaseUrl || "", serviceKey || "", {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
