import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, FileCheck, Globe, Award, CheckCircle, Search, UserPlus } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold">VEDO</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/verify">
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-1" />
                  Verify Creator
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">
                  <UserPlus className="h-4 w-4 mr-1" />
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Verified Digital Content Creator Registry</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Official registration and verification system for digital content creators in Sierra Leone
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <UserPlus className="h-5 w-5 mr-2" />
                  Register as Creator
                </Button>
              </Link>
              <Link href="/verify">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Verify a Creator
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose VEDO?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              VEDO provides official government verification for digital content creators, ensuring authenticity and
              compliance with Sierra Leone's digital content laws.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Official Verification</CardTitle>
                <CardDescription>
                  Government-backed verification system ensuring creator authenticity and legal compliance.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <FileCheck className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Content Protection</CardTitle>
                <CardDescription>
                  Protect your intellectual property rights with official documentation and legal backing.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Globe className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Global Recognition</CardTitle>
                <CardDescription>
                  Internationally recognized verification that opens doors to global partnerships and opportunities.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Community Access</CardTitle>
                <CardDescription>
                  Join a verified community of content creators with networking and collaboration opportunities.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Award className="h-12 w-12 text-yellow-600 mb-4" />
                <CardTitle>Tiered Verification</CardTitle>
                <CardDescription>
                  Bronze, Silver, and Gold verification levels based on your content portfolio and achievements.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-cyan-600 mb-4" />
                <CardTitle>Legal Compliance</CardTitle>
                <CardDescription>
                  Ensure compliance with Sierra Leone's cybercrime laws and intellectual property regulations.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">247</div>
              <div className="text-gray-600">Verified Creators</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">1,856</div>
              <div className="text-gray-600">Verified Content Pieces</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">15</div>
              <div className="text-gray-600">Content Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-gray-600">Approval Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Levels */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Verification Levels</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the verification level that best fits your content creation goals and requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <Badge variant="outline" className="w-fit mx-auto mb-4">
                  Bronze
                </Badge>
                <CardTitle>Basic Verification</CardTitle>
                <CardDescription>Perfect for new content creators</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Identity verification
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Basic profile listing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Legal compliance certificate
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="text-center">
                <Badge className="bg-gray-100 text-gray-800 w-fit mx-auto mb-4">Silver</Badge>
                <CardTitle>Enhanced Verification</CardTitle>
                <CardDescription>For established content creators</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Everything in Bronze
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Portfolio verification
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Enhanced profile features
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Priority support
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Badge className="bg-yellow-100 text-yellow-800 w-fit mx-auto mb-4">Gold</Badge>
                <CardTitle>Premium Verification</CardTitle>
                <CardDescription>For professional content businesses</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Everything in Silver
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Business registration
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Advanced analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Partnership opportunities
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Verified?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of verified content creators in Sierra Leone and take your digital presence to the next level.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="h-5 w-5 mr-2" />
              Start Your Application
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
                <span className="font-bold">VEDO</span>
              </div>
              <p className="text-gray-600 text-sm">
                Official digital content creator verification system for Sierra Leone.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/register" className="hover:text-blue-600">
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/verify" className="hover:text-blue-600">
                    Verify Creator
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-blue-600">
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/terms" className="hover:text-blue-600">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-blue-600">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/ip-policy" className="hover:text-blue-600">
                    IP Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Email: info@vedo.gov.sl</li>
                <li>Phone: +232 (0) 76 123 456</li>
                <li>Address: Freetown, Sierra Leone</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 Government of Sierra Leone. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
