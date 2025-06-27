"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Settings } from "lucide-react"

interface EnvironmentStatus {
  supabaseUrl: boolean
  supabaseAnonKey: boolean
  hasRequiredVars: boolean
}

export function EnvironmentCheck() {
  const [envStatus, setEnvStatus] = useState<EnvironmentStatus | null>(null)

  useEffect(() => {
    // Check client-side environment variables
    const supabaseUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    setEnvStatus({
      supabaseUrl,
      supabaseAnonKey,
      hasRequiredVars: supabaseUrl && supabaseAnonKey,
    })
  }, [])

  if (!envStatus) {
    return null
  }

  if (envStatus.hasRequiredVars) {
    return (
      <Alert className="mb-6">
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>Environment variables are properly configured.</AlertDescription>
      </Alert>
    )
  }

  return (
    <Card className="mb-6 border-red-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-800">
          <AlertTriangle className="h-5 w-5" />
          Environment Configuration Required
        </CardTitle>
        <CardDescription>Missing required environment variables for Supabase integration</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">NEXT_PUBLIC_SUPABASE_URL</span>
            <Badge variant={envStatus.supabaseUrl ? "default" : "destructive"}>
              {envStatus.supabaseUrl ? "✓ Set" : "✗ Missing"}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
            <Badge variant={envStatus.supabaseAnonKey ? "default" : "destructive"}>
              {envStatus.supabaseAnonKey ? "✓ Set" : "✗ Missing"}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">SUPABASE_SERVICE_ROLE_KEY</span>
            <Badge variant="secondary">Server-side only</Badge>
          </div>
        </div>

        <Alert variant="destructive">
          <Settings className="h-4 w-4" />
          <AlertDescription>
            <strong>Action Required:</strong> Please configure the missing environment variables in your Vercel
            deployment settings:
            <ul className="mt-2 ml-4 list-disc space-y-1">
              <li>Go to your Vercel project dashboard</li>
              <li>Navigate to Settings → Environment Variables</li>
              <li>Add the missing Supabase configuration variables</li>
              <li>Redeploy your application</li>
            </ul>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}
