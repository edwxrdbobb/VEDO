"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Shield,
  Search,
  CheckCircle,
  XCircle,
  User,
  Calendar,
  Globe,
  Award,
  FileText,
  AlertTriangle,
} from "lucide-react"
import { QRScanner } from "@/components/qr-scanner"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock database of verified creators
const verifiedCreators = [
  {
    id: "INFLO-2024-001247",
    name: "Sarah Kamara",
    creatorName: "TechSarah",
    email: "sarah@techsarah.com",
    status: "verified",
    verificationLevel: "Gold",
    joinDate: "2024-01-15",
    contentType: "Technology Blog",
    platforms: ["Personal Blog", "YouTube", "LinkedIn"],
    followers: 15420,
    contentCount: 156,
    lastVerified: "2024-01-20",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "INFLO-2024-001248",
    name: "Mohamed Bangura",
    creatorName: "SL Blogger",
    email: "mohamed@slblogger.com",
    status: "pending",
    verificationLevel: "Bronze",
    joinDate: "2024-01-18",
    contentType: "Lifestyle Blog",
    platforms: ["Instagram", "TikTok"],
    followers: 8930,
    contentCount: 89,
    lastVerified: "2024-01-19",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "INFLO-2024-001249",
    name: "Fatima Sesay",
    creatorName: "EduSL",
    email: "fatima@edusl.com",
    status: "verified",
    verificationLevel: "Silver",
    joinDate: "2024-01-10",
    contentType: "Educational Content",
    platforms: ["YouTube", "Facebook", "WhatsApp"],
    followers: 22100,
    contentCount: 203,
    lastVerified: "2024-01-21",
    avatar: "/placeholder-user.jpg",
  },
]

export default function VerifyPage() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get("search") || ""

  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [searchResult, setSearchResult] = useState<(typeof verifiedCreators)[0] | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setError("")
    setSearchResult(null)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Search in mock database
    const result = verifiedCreators.find(
      (creator) =>
        creator.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.email.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    if (result) {
      setSearchResult(result)
    } else {
      setError("Creator not found in INFLO database")
    }

    setIsSearching(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "pending":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  const getVerificationLevelColor = (level: string) => {
    switch (level) {
      case "Gold":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Silver":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
      case "Bronze":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-600" />
              <div>
                <span className="font-bold text-gray-900 dark:text-white">INFLO</span>
                <p className="text-xs text-gray-600 dark:text-gray-400">Verify Creators</p>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <QRScanner />
              <Link href="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Verify Digital Creator</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Search for a creator to verify their INFLO status and authenticity
            </p>
          </div>

          {/* Search Form */}
          <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <Search className="h-5 w-5" />
                Creator Search
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Enter creator ID, name, or username to verify their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., INFLO-2024-001247 or TechSarah"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <Button type="submit" disabled={isSearching}>
                    {isSearching ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <p className="mb-1">Try searching for:</p>
                  <div className="flex flex-wrap gap-2">
                    {["INFLO-2024-001247", "TechSarah", "SL Blogger", "EduSL"].map((example) => (
                      <Button
                        key={example}
                        variant="outline"
                        size="sm"
                        type="button"
                        onClick={() => setSearchQuery(example)}
                        className="text-xs dark:border-gray-600 dark:hover:bg-gray-700"
                      >
                        {example}
                      </Button>
                    ))}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Error Message */}
          {error && (
            <Alert className="mb-8 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
              <XCircle className="h-4 w-4" />
              <AlertDescription className="text-red-800 dark:text-red-200">{error}</AlertDescription>
            </Alert>
          )}

          {/* Search Result */}
          {searchResult && (
            <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 dark:text-white">
                    {getStatusIcon(searchResult.status)}
                    Verification Result
                  </CardTitle>
                  <Badge className={getStatusColor(searchResult.status)}>
                    {searchResult.status.charAt(0).toUpperCase() + searchResult.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Creator Info */}
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{searchResult.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">@{searchResult.creatorName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">{searchResult.email}</p>
                  </div>
                </div>

                {/* Verification Details */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">INFLO ID</span>
                      <span className="font-mono text-sm dark:text-white">{searchResult.id}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Verification Level</span>
                      <Badge className={getVerificationLevelColor(searchResult.verificationLevel)}>
                        <Award className="h-3 w-3 mr-1" />
                        {searchResult.verificationLevel}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Content Type</span>
                      <span className="text-sm font-medium dark:text-white">{searchResult.contentType}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Join Date</span>
                      <span className="text-sm font-medium flex items-center gap-1 dark:text-white">
                        <Calendar className="h-3 w-3" />
                        {searchResult.joinDate}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Content Count</span>
                      <span className="text-sm font-medium flex items-center gap-1 dark:text-white">
                        <FileText className="h-3 w-3" />
                        {searchResult.contentCount}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Last Verified</span>
                      <span className="text-sm font-medium dark:text-white">{searchResult.lastVerified}</span>
                    </div>
                  </div>
                </div>

                {/* Platforms */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Active Platforms</h4>
                  <div className="flex flex-wrap gap-2">
                    {searchResult.platforms.map((platform) => (
                      <Badge key={platform} variant="outline" className="text-xs">
                        <Globe className="h-3 w-3 mr-1" />
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Verification Certificate */}
                {searchResult.status === "verified" && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h4 className="font-medium text-green-800 dark:text-green-200">Verification Certificate</h4>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      This creator has been officially verified by INFLO and meets all authenticity requirements. Their
                      content and identity have been validated by Sierra Leone's digital creator verification system.
                    </p>
                  </div>
                )}

                {searchResult.status === "pending" && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Verification Pending</h4>
                    </div>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      This creator's verification is currently under review. Please check back later for updated status.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Additional Info */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">About INFLO Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">What is INFLO?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    INFLO is Sierra Leone's official verification system for digital content creators, ensuring
                    authenticity and building trust in the digital space.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Verification Levels</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs">
                        Gold
                      </Badge>
                      <span className="text-xs text-gray-600 dark:text-gray-400">Premium verified creators</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 text-xs">
                        Silver
                      </Badge>
                      <span className="text-xs text-gray-600 dark:text-gray-400">Standard verified creators</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 text-xs">
                        Bronze
                      </Badge>
                      <span className="text-xs text-gray-600 dark:text-gray-400">Basic verified creators</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
