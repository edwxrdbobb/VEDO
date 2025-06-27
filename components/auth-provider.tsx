"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { getCurrentUser, clearUserSession } from "@/lib/auth"

interface User {
  id: string
  email: string
  role: "creator" | "admin" | "moderator"
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
  setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  setUser: () => {},
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial user from storage
    const getInitialUser = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error("Failed to get current user:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getInitialUser()
  }, [])

  const signOut = async () => {
    clearUserSession()
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, loading, signOut, setUser }}>{children}</AuthContext.Provider>
}
