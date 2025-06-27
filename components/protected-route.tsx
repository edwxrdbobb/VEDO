"use client"

import type React from "react"

import { useAuth } from "./auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Shield } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "creator" | "admin" | "moderator"
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      // router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-8 w-8 text-blue-600 mx-auto mb-4 animate-spin" />
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  // if (!user) {
  //   return null
  // }

  return <>{children}</>
}
