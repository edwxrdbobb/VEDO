"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { QRScanner } from "@/components/qr-scanner"
import { useAuth } from "@/lib/auth-context"
import { Camera, Users, Shield, Scan, UserPlus, Settings } from "lucide-react"

export default function HomePage() {
  const { user, userRole } = useAuth()
  const [showScanner, setShowScanner] = useState(false)
  const [scanResult, setScanResult] = useState<{ type: string; creatorId: string } | null>(null)

  const handleScan = (result: { type: string; creatorId: string }) => {
    setScanResult(result)
    setShowScanner(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Creator Management</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Welcome, {user.email}</span>
                {userRole === "admin" && (
                  <Button asChild>
                    <Link href="/admin">Admin Dashboard</Link>
                  </Button>
                )}
                {userRole === "creator" && (
                  <Button asChild>
                    <Link href="/creator">Creator Dashboard</Link>
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Creator Management System</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A comprehensive platform for managing creators with QR code verification, role-based access control, and
            powerful admin tools.
          </p>
        </div>

        {/* QR Scanner Section */}
        <div className="mb-12">
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Camera className="h-5 w-5" />
                QR Code Scanner
              </CardTitle>
              <CardDescription>Scan QR codes to verify creators instantly</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              {!showScanner ? (
                <Button onClick={() => setShowScanner(true)} className="w-full">
                  <Scan className="h-4 w-4 mr-2" />
                  Start Scanning
                </Button>
              ) : (
                <QRScanner onScan={handleScan} onClose={() => setShowScanner(false)} />
              )}

              {scanResult && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    Scan Result: {scanResult.type} - {scanResult.creatorId}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Creator Management</CardTitle>
              <CardDescription>Comprehensive tools for managing creator accounts and verification</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Role-Based Access</CardTitle>
              <CardDescription>Secure access control with creator and admin roles</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Camera className="h-8 w-8 text-primary mb-2" />
              <CardTitle>QR Code Verification</CardTitle>
              <CardDescription>Quick and secure creator verification using QR codes</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Settings className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Admin Dashboard</CardTitle>
              <CardDescription>Powerful admin tools for managing the entire system</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <UserPlus className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Creator Onboarding</CardTitle>
              <CardDescription>Streamlined process for new creator registration and approval</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Scan className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Mobile Responsive</CardTitle>
              <CardDescription>Optimized experience across all devices and screen sizes</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        {!user && (
          <div className="text-center">
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Get Started Today</CardTitle>
                <CardDescription>Join our platform as a creator or admin</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-4">
                <Button asChild className="flex-1">
                  <Link href="/register">Register</Link>
                </Button>
                <Button variant="outline" asChild className="flex-1 bg-transparent">
                  <Link href="/login">Login</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
