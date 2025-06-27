import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, TrendingUp, FileCheck, Globe, Award } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">VEDO</h1>
              <p className="text-xs text-gray-600">Verification & Digital Oversight</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/register" className="text-gray-600 hover:text-blue-600">
              Register
            </Link>
            <Link href="/verify" className="text-gray-600 hover:text-blue-600">
              Verify Creator
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">
              Dashboard
            </Link>
            <Link href="/admin" className="text-gray-600 hover:text-blue-600">
              Admin
            </Link>
          </nav>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-6">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Government of Sierra Leone Initiative
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Digital Content Creator
            <span className="text-blue-600"> Registration System</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Protecting intellectual property rights, promoting digital recognition, and supporting fair monetization for
            Sierra Leone's content creators and bloggers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/register">Register as Creator</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/verify">Verify a Creator</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">System Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools for registration, verification, and management of digital content creators
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Creator Registration</CardTitle>
                <CardDescription>
                  Secure registration system for bloggers and content creators with profile management
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-green-600 mb-2" />
                <CardTitle>IP Protection</CardTitle>
                <CardDescription>
                  Protect intellectual property rights under Sierra Leone's IT and Cybercrime Laws
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <FileCheck className="h-10 w-10 text-purple-600 mb-2" />
                <CardTitle>Content Verification</CardTitle>
                <CardDescription>
                  Track and verify published content across multiple platforms and channels
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-orange-600 mb-2" />
                <CardTitle>Analytics & Metrics</CardTitle>
                <CardDescription>
                  Monitor engagement metrics, platform usage, and earnings for registered creators
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Globe className="h-10 w-10 text-cyan-600 mb-2" />
                <CardTitle>Public Verification</CardTitle>
                <CardDescription>
                  Enable businesses and the public to easily verify registered content creators
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Award className="h-10 w-10 text-red-600 mb-2" />
                <CardTitle>Digital Recognition</CardTitle>
                <CardDescription>
                  Official recognition and certification for verified digital content creators
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">1,247</div>
              <div className="text-gray-600">Registered Creators</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">3,892</div>
              <div className="text-gray-600">Verified Contents</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">156</div>
              <div className="text-gray-600">Partner Organizations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-gray-600">Verification Success</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join Sierra Leone's official digital content creator registry and protect your intellectual property today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register">Register Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
              asChild
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6" />
                <span className="font-bold">VEDO</span>
              </div>
              <p className="text-gray-400 text-sm">
                Official digital content creator registration system for Sierra Leone.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/register" className="hover:text-white">
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/verify" className="hover:text-white">
                    Verify
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-white">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/ip-policy" className="hover:text-white">
                    IP Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cybercrime" className="hover:text-white">
                    Cybercrime Law
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Ministry of Information</li>
                <li>Freetown, Sierra Leone</li>
                <li>info@vedo.gov.sl</li>
                <li>+232 XX XXX XXXX</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Government of Sierra Leone. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
