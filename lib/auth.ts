import { supabase } from "./supabase"

export interface User {
  id: string
  email: string
  role: "creator" | "admin" | "moderator"
}

export const signUp = async (email: string, password: string, role = "creator") => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: role,
      },
    },
  })

  if (error) throw error
  return data
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

export const getUserRole = async (userId: string) => {
  const { data, error } = await supabase.from("users").select("role").eq("id", userId).single()

  if (error) throw error
  return data.role
}
