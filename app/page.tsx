"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { QRScanner } from "@/components/qr-scanner"
import { useAuth } from "@/lib/auth-context"
import {
  Camera,
  Users,
  Shield,
  Scan,
  UserPlus,
  Settings,
  CheckCircle,
  Star,
  Zap,
  Globe,
  Award,
  ArrowRight,
  Play,
  Smartphone,
  BarChart3,
} from "lucide-react"

export default function HomePage() {
  const { user, userRole } = useAuth()
  const [showScanner, setShowScanner] = useState(false)
  const [scanResult, setScanResult] = useState<{ type: string; creatorId: string } | null>(null)

  const handleScan = (result: { type: string; creatorId: string }) => {
    setScanResult(result)
    setShowScanner(false)
  }

  const features = [
    {
      icon: Users,
      title: "Creator Management",
      description:
        "Comprehensive tools for managing creator accounts, profiles, and verification status with advanced filtering and search capabilities.",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Shield,
      title: "Role-Based Security",
      description:
        "Enterprise-grade security with granular role-based access control, ensuring data protection and proper authorization.",
      color: "text-green-600 dark:text-green-400",
    },
    {
      icon: Camera,
      title: "QR Code Verification",
      description:
        "Lightning-fast creator verification using advanced QR code technology with real-time validation and fraud detection.",
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description:
        "Powerful analytics and reporting tools with real-time insights, performance metrics, and customizable dashboards.",
      color: "text-orange-600 dark:text-orange-400",
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description:
        "Fully responsive design optimized for all devices with native mobile app performance and offline capabilities.",
      color: "text-pink-600 dark:text-pink-400",
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description:
        "Instant notifications and real-time synchronization across all devices with live status updates and messaging.",
      color: "text-yellow-600 dark:text-yellow-400",
    },
  ]

  const stats = [
    { number: "10K+", label: "Active Creators", icon: Users },
    { number: "99.9%", label: "Uptime", icon: CheckCircle },
    { number: "50M+", label: "QR Scans", icon: Scan },
    { number: "24/7", label: "Support", icon: Shield },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      content:
        "This platform has revolutionized how I manage my creator profile. The QR verification is incredibly fast and secure.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Platform Admin",
      content: "The admin dashboard is intuitive and powerful. Managing thousands of creators has never been easier.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Brand Manager",
      content:
        "The verification system gives us confidence when working with creators. It's a game-changer for our industry.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Shield className="h-10 w-10 text-primary" />
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CreatorHub
                </h1>
                <p className="text-xs text-muted-foreground">Professional Creator Management</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
                Features
              </Link>
              <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
                Testimonials
              </Link>
              <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
                Pricing
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              {user ? (
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="hidden sm:flex">
                    {userRole}
                  </Badge>
                  {userRole === "admin" && (
                    <Button asChild size="sm">
                      <Link href="/admin">
                        <Settings className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                    </Button>
                  )}
                  {userRole === "creator" && (
                    <Button asChild size="sm">
                      <Link href="/creator">
                        <Users className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                    </Button>
                  )}
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button variant="ghost" asChild size="sm">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/register">
                      Get Started
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto text-center relative">
            <div className="max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-6 px-4 py-2">
                <Star className="h-4 w-4 mr-2" />
                Trusted by 10,000+ Creators Worldwide
              </Badge>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent leading-tight">
                The Future of
                <br />
                <span className="relative">
                  Creator Management
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                Revolutionize your creator ecosystem with AI-powered verification, real-time analytics, and
                enterprise-grade security. Built for the modern digital economy.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
                  <Camera className="h-5 w-5 mr-2" />
                  Try QR Scanner
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-2">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-primary">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* QR Scanner Section */}
        <section className="py-16 px-4 bg-white/50 dark:bg-gray-900/50">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge variant="outline" className="mb-4">
                  <Zap className="h-4 w-4 mr-2" />
                  Try It Now
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience Lightning-Fast QR Verification</h2>
                <p className="text-lg text-muted-foreground">
                  See how our advanced QR code technology works in real-time
                </p>
              </div>

              <div className="max-w-md mx-auto">
                <Card className="border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                      <Camera className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">QR Code Scanner</CardTitle>
                    <CardDescription>Instantly verify creators with our advanced scanning technology</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    {!showScanner ? (
                      <Button
                        onClick={() => setShowScanner(true)}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        size="lg"
                      >
                        <Scan className="h-5 w-5 mr-2" />
                        Start Scanning
                      </Button>
                    ) : (
                      <QRScanner onScan={handleScan} onClose={() => setShowScanner(false)} />
                    )}

                    {scanResult && (
                      <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="flex items-center justify-center mb-2">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                          <span className="font-medium text-green-800 dark:text-green-200">
                            Verification Successful
                          </span>
                        </div>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          {scanResult.type}: {scanResult.creatorId}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                <Globe className="h-4 w-4 mr-2" />
                Features
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Everything You Need to
                <span className="text-primary"> Scale Your Platform</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Powerful tools and features designed to help you manage creators efficiently and grow your platform with
                confidence.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
                >
                  <CardHeader>
                    <div className={`mb-4 p-3 rounded-full w-fit ${feature.color} bg-current/10`}>
                      <feature.icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="py-20 px-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20"
        >
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">
                <Award className="h-4 w-4 mr-2" />
                Testimonials
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Loved by Creators
                <span className="text-primary"> Worldwide</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See what our community of creators and administrators have to say about their experience.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-0 hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Transform Your
                <br />
                Creator Management?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Join thousands of platforms already using CreatorHub to manage their creator ecosystems efficiently and
                securely.
              </p>

              {!user ? (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                    <UserPlus className="h-5 w-5 mr-2" />
                    Start Free Trial
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-6 bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Watch Demo
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {userRole === "admin" && (
                    <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
                      <Link href="/admin">
                        <Settings className="h-5 w-5 mr-2" />
                        Go to Dashboard
                      </Link>
                    </Button>
                  )}
                  {userRole === "creator" && (
                    <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
                      <Link href="/creator">
                        <Users className="h-5 w-5 mr-2" />
                        View Profile
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">CreatorHub</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                The most advanced creator management platform built for the modern digital economy.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Platform</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/features" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="hover:text-white transition-colors">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="hover:text-white transition-colors">
                    API
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/docs" className="hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white transition-colors">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-white transition-colors">
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-400">
              © 2024 CreatorHub. All rights reserved. Built with ❤️ for creators worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
