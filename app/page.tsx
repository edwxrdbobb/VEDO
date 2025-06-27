"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Shield,
  Search,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  QrCode,
  Camera,
  Smartphone,
  Moon,
  Sun,
} from "lucide-react"
import { QRScanner } from "@/components/qr-scanner"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/verify?search=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">VEDO</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Verified Digital Creators</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <QRScanner />
              <Link href="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button>Get Verified</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Sierra Leone's Official Creator Verification System
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Verify Digital Creators
            <span className="block text-blue-600">Build Trust Online</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            VEDO is Sierra Leone's official platform for verifying digital content creators. Ensure authenticity, build
            trust, and support genuine local creators.
          </p>

          {/* Quick Verification Search */}
          <div className="max-w-md mx-auto mb-8">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                placeholder="Search creator ID or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Try: "VEDO-2024-001247" or "TechSarah"</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/register">
              <Button size="lg" className="gap-2">
                <Shield className="h-5 w-5" />
                Apply for Verification
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/verify">
              <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                <Search className="h-5 w-5" />
                Verify a Creator
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* New Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">New Features</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Enhanced verification tools and improved user experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <QrCode className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>QR Code Scanner</CardTitle>
                    <CardDescription>Instant verification</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Scan QR codes to instantly verify creator authenticity. Perfect for events, collaborations, and quick
                  verification checks.
                </p>
                <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                  <Camera className="h-4 w-4" />
                  <span>Camera-based scanning</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 dark:border-purple-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <Moon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle>Dark Mode</CardTitle>
                    <CardDescription>Enhanced viewing</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Switch between light and dark themes for comfortable viewing in any lighting condition. Automatic
                  system theme detection included.
                </p>
                <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400">
                  <Sun className="h-4 w-4" />
                  <span>System theme sync</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 dark:border-green-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Smartphone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle>Mobile Optimized</CardTitle>
                    <CardDescription>On-the-go verification</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Fully responsive design optimized for mobile devices. Verify creators anywhere, anytime with our
                  mobile-first approach.
                </p>
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <CheckCircle className="h-4 w-4" />
                  <span>Touch-friendly interface</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose VEDO?</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The most trusted verification system for Sierra Leone's digital creators
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Official Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Government-backed verification system ensuring authenticity and credibility.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Community Trust</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Build trust with your audience through verified creator status.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Award className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Recognition</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Get recognized for your authentic content and creative contributions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Growth Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Access resources and opportunities to grow your digital presence.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 dark:bg-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1,247</div>
              <div className="text-blue-100">Verified Creators</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98.5%</div>
              <div className="text-blue-100">Verification Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">System Availability</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15min</div>
              <div className="text-blue-100">Average Verification Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Get Verified?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join Sierra Leone's verified creator community and build trust with your audience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="gap-2">
                <Shield className="h-5 w-5" />
                Start Verification Process
              </Button>
            </Link>
            <Link href="/verify">
              <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                <Search className="h-5 w-5" />
                Verify Existing Creator
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-blue-400" />
                <span className="font-bold">VEDO</span>
              </div>
              <p className="text-gray-400">Sierra Leone's official digital creator verification system.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/verify" className="hover:text-white">
                    Verify Creator
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-white">
                    Get Verified
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white">
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Guidelines
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 VEDO - Government of Sierra Leone. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
