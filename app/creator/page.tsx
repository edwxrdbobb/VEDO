"use client"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/lib/auth-context"
import { supabase, type Creator } from "@/lib/supabase"
import { Shield, QrCode, Mail, User, Settings, LogOut } from "lucide-react"

export default function CreatorDashboard() {
  return (
    <ProtectedRoute requiredRole="creator">
      <CreatorDashboardContent />
    </ProtectedRoute>
  )
}

function CreatorDashboardContent() {
  const { user, signOut } = useAuth()
  const [creator, setCreator] = useState<Creator | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchCreatorProfile()
      fetchMessages()
    }
  }, [user])

  const fetchCreatorProfile = async () => {
    try {
      const { data, error } = await supabase.from("creators").select("*").eq("email", user?.email).single()

      if (error) throw error
      setCreator(data)
    } catch (error) {
      console.error("Error fetching creator profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async () => {
    if (!creator) return

    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("recipient_id", creator.id)
        .order("created_at", { ascending: false })

      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      console.error("Error fetching messages:", error)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-blue-100 text-blue-800">Verified</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Creator Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <span className="text-sm text-muted-foreground">Welcome, {creator?.creator_name || user?.email}</span>
            <Button variant="outline" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile
              </CardTitle>
              <CardDescription>Your creator profile information</CardDescription>
            </CardHeader>
            <CardContent>
              {creator ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">{creator.full_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Creator Name</p>
                    <p className="font-medium">{creator.creator_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{creator.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bio</p>
                    <p className="font-medium">{creator.bio || "No bio provided"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">Status:</p>
                    {getStatusBadge(creator.status)}
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">Verification:</p>
                    {getVerificationBadge(creator.verification_status)}
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              ) : (
                <p className="text-muted-foreground">Profile not found</p>
              )}
            </CardContent>
          </Card>

          {/* QR Code Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                Your QR Code
              </CardTitle>
              <CardDescription>Use this for verification</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              {creator?.qr_code ? (
                <>
                  <div className="bg-white p-4 rounded-lg mb-4">
                    {/* This would be a real QR code in production */}
                    <div className="w-48 h-48 border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <QrCode className="h-24 w-24 text-primary" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Show this QR code for verification at events
                  </p>
                </>
              ) : (
                <p className="text-muted-foreground">No QR code available</p>
              )}
            </CardContent>
          </Card>

          {/* Messages Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Messages
              </CardTitle>
              <CardDescription>Recent messages from admins</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages.length > 0 ? (
                  messages.map((message) => (
                    <div key={message.id} className="p-3 border rounded-lg">
                      <p className="font-medium">{message.subject}</p>
                      <p className="text-sm text-muted-foreground">{message.content}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(message.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No messages</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
