"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, CheckCircle, AlertCircle, Loader2, Play } from "lucide-react"
import { mockSystem } from "@/lib/mock-data"
import { EnvironmentCheck } from "./environment-check"

const getDemoCredentials = () => [
  { email: "admin@vedo.gov.sl", password: "admin123", role: "admin" },
  { email: "sarah@techsarah.com", password: "sarah123", role: "creator" },
  { email: "mohamed@slblogger.com", password: "mohamed123", role: "creator" },
  { email: "moderator@vedo.gov.sl", password: "moderator123", role: "moderator" },
]

export function SystemInitializer() {
  const [isInitializing, setIsInitializing] = useState(false)
  const [systemStatus, setSystemStatus] = useState<{
    initialized: boolean
    demoUsersCount: number
    error?: string
  } | null>(null)
  const [initResult, setInitResult] = useState<{ success: boolean; message: string } | null>(null)

  const demoCredentials = getDemoCredentials()

  useEffect(() => {
    checkStatus()
  }, [])

  const checkStatus = async () => {
    try {
      const status = await mockSystem.getSystemStatus()
      setSystemStatus(status)
    } catch (error: any) {
      setSystemStatus({
        initialized: false,
        demoUsersCount: 0,
        error: `Failed to check status: ${error.message}`,
      })
    }
  }

  const handleInitialize = async () => {
    setIsInitializing(true)
    setInitResult(null)

    try {
      const result = await mockSystem.initializeSystem()
      setInitResult(result)
      if (result.success) {
        await checkStatus() // Refresh status after successful initialization
      }
    } catch (error: any) {
      setInitResult({
        success: false,
        message: `Initialization failed: ${error.message}`,
      })
    } finally {
      setIsInitializing(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold">VEDO System Setup</h1>
        </div>
        <p className="text-gray-600">Initialize the system with demo users and sample data</p>
      </div>

      {/* Environment Check */}
      <EnvironmentCheck />

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            System Status
          </CardTitle>
          <CardDescription>Current state of the VEDO system initialization</CardDescription>
        </CardHeader>
        <CardContent>
          {systemStatus ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>System Initialized:</span>
                <Badge variant={systemStatus.initialized ? "default" : "secondary"}>
                  {systemStatus.initialized ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Yes
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-3 w-3 mr-1" />
                      No
                    </>
                  )}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Demo Users Created:</span>
                <Badge variant="outline">{systemStatus.demoUsersCount}/4</Badge>
              </div>
              {systemStatus.error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{systemStatus.error}</AlertDescription>
                </Alert>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Checking system status...</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Initialization Button - Only show if not initialized */}
      {systemStatus && !systemStatus.initialized && !systemStatus.error && (
        <Card>
          <CardHeader>
            <CardTitle>Initialize System</CardTitle>
            <CardDescription>Create demo users and sample data to get started with the VEDO system</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleInitialize} disabled={isInitializing} className="w-full" size="lg">
              {isInitializing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Initializing System...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Initialize VEDO System
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Initialization Result */}
      {initResult && (
        <Alert variant={initResult.success ? "default" : "destructive"}>
          {initResult.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <AlertDescription>{initResult.message}</AlertDescription>
        </Alert>
      )}

      {/* Demo Credentials */}
      {systemStatus?.initialized && (
        <Card>
          <CardHeader>
            <CardTitle>Demo User Credentials</CardTitle>
            <CardDescription>Use these credentials to test different user roles in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {demoCredentials.map((cred, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{cred.email}</div>
                    <div className="text-sm text-gray-600">Password: {cred.password}</div>
                  </div>
                  <Badge
                    variant={cred.role === "admin" ? "default" : cred.role === "moderator" ? "secondary" : "outline"}
                  >
                    {cred.role}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> These are demo accounts for testing purposes. In production, use secure passwords
                and proper user management procedures.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Steps */}
      {systemStatus?.initialized && (
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>What you can do now that the system is initialized</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Visit the login page and sign in with any demo account</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Test the creator dashboard with sarah@techsarah.com</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Access the admin panel with admin@vedo.gov.sl</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Try the public verification system</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Register new creators to test the full workflow</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
