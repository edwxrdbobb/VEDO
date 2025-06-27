import { supabase } from "./supabase"
import bcrypt from "bcryptjs"

export interface User {
  id: string
  email: string
  role: "creator" | "admin" | "moderator"
}

export const signUp = async (email: string, password: string, role = "creator") => {
  // Check if user already exists
  const { data: existingUser } = await supabase.from("users").select("id").eq("email", email.toLowerCase()).single()

  if (existingUser) {
    throw new Error("User already exists with this email")
  }

  // Hash password
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  // Insert new user
  const { data, error } = await supabase
    .from("users")
    .insert({
      email: email.toLowerCase(),
      password_hash: passwordHash,
      role: role,
    })
    .select()
    .single()

  if (error) throw new Error(error.message)

  return {
    user: {
      id: data.id,
      email: data.email,
      role: data.role,
    },
  }
}

export const signIn = async (email: string, password: string) => {
  // Get user from database
  const { data: user, error } = await supabase.from("users").select("*").eq("email", email.toLowerCase()).single()

  if (error || !user) {
    throw new Error("Invalid email or password")
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.password_hash)

  if (!isValidPassword) {
    throw new Error("Invalid email or password")
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  }
}

export const signOut = async () => {
  // Clear any stored session data
  if (typeof window !== "undefined") {
    localStorage.removeItem("vedo_user")
    sessionStorage.removeItem("vedo_user")
  }
}

export const getCurrentUser = async (): Promise<User | null> => {
  // Get user from local storage or session storage
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("vedo_user") || sessionStorage.getItem("vedo_user")
    if (storedUser) {
      try {
        return JSON.parse(storedUser)
      } catch {
        return null
      }
    }
  }
  return null
}

export const getUserRole = async (userId: string) => {
  const { data, error } = await supabase.from("users").select("role").eq("id", userId).single()

  if (error) throw error
  return data.role
}

export const storeUserSession = (user: User, remember = false) => {
  if (typeof window !== "undefined") {
    const storage = remember ? localStorage : sessionStorage
    storage.setItem("vedo_user", JSON.stringify(user))
  }
}

export const clearUserSession = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("vedo_user")
    sessionStorage.removeItem("vedo_user")
  }
}
