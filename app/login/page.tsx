"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Shield, Eye, EyeOff, User, Crown, Settings } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { ThemeToggle } from "@/components/theme-toggle"

const demoAccounts = [
  {
    email: "admin@vedo.gov.sl",
    password: "password123",
    role: "admin",
    name: "System Administrator",
    icon: Crown,
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  },
  {
    email: "sarah@techsarah.com",
    password: "password123",
    role: "creator",
    name: "Sarah Kamara (Verified Creator)",
    icon: Shield,
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
  {
    email: "mohamed@slblogger.com",
    password: "password123",
    role: "creator",
    name: "Mohamed Bangura (Pending)",
    icon: User,
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  },
  {
    email: "moderator@vedo.gov.sl",
    password: "password123",
    role: "moderator",
    name: "Content Moderator",
    icon: Settings,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
]

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await signIn(email, password)
      if (success) {
        // Redirect based on role
        const user = JSON.parse(localStorage.getItem("vedo_user") || "{}")
        if (user.role === "admin") {
          router.push("/admin")
        } else {
          router.push("/dashboard")
        }
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async (demoAccount: (typeof demoAccounts)[0]) => {
    setEmail(demoAccount.email)
    setPassword(demoAccount.password)
    setError("")
    setIsLoading(true)

    try {
      const success = await signIn(demoAccount.email, demoAccount.password)
      if (success) {
        if (demoAccount.role === "admin") {
          router.push("/admin")
        } else {
          router.push("/dashboard")
        }
      }
    } catch (err) {
      setError("Demo login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">VEDO</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">Verified Digital Creators</p>
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <ThemeToggle />
          </div>
        </div>

        {/* Login Form */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Sign In</CardTitle>
            <CardDescription className="dark:text-gray-400">
              Access your VEDO account to manage your verification status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="dark:text-gray-200">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="dark:text-gray-200">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                  <AlertDescription className="text-red-800 dark:text-red-200">{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">Demo Accounts (Click to login):</p>
                {demoAccounts.map((account) => (
                  <Button
                    key={account.email}
                    variant="outline"
                    className="w-full justify-start text-left h-auto p-3 dark:border-gray-600 dark:hover:bg-gray-700 bg-transparent"
                    onClick={() => handleDemoLogin(account)}
                    disabled={isLoading}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <account.icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate dark:text-white">{account.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{account.email}</p>
                      </div>
                      <Badge className={`text-xs ${account.color}`}>{account.role}</Badge>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link href="/register" className="text-blue-600 hover:underline dark:text-blue-400">
                  Apply for verification
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 dark:text-gray-400">
          <p>© 2024 VEDO - Government of Sierra Leone</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link href="#" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="hover:underline">
              Help
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
