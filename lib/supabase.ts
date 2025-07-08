import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client for admin operations
export const createServerClient = () => {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

// Database types
export interface Creator {
  id: string
  email: string
  full_name: string
  creator_name: string
  bio?: string
  avatar_url?: string
  status: "pending" | "approved" | "rejected"
  verification_status: "unverified" | "pending" | "verified"
  created_at: string
  updated_at: string
  qr_code?: string
}

export interface User {
  id: string
  email: string
  role: "creator" | "admin"
  created_at: string
}

export interface Message {
  id: string
  sender_id: string
  recipient_id: string
  subject: string
  content: string
  read: boolean
  created_at: string
}
