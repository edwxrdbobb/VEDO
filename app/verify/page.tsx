"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Shield, Search, CheckCircle, AlertCircle, Globe, Calendar, Award } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { mockAuth } from "@/lib/mock-data"

export default function VerifyPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResult, setSearchResult] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)
    setError("")
    setSearchResult(null)

    try {
      const result = await mockAuth.searchCreator(searchQuery)

      if (result) {
        setSearchResult({
          id: result.vedo_id,
          name: `${result.first_name} ${result.last_name}`,
          creatorName: result.creatorName,
          email: result.email,
          status: result.verification_status,
          verificationLevel: result.verification_level,
          joinDate: result.created_at,
          contentType: result.content_type,
          platforms: [result.primary_platform],
          totalContent: result.content_submissions?.length || 0,
          lastActive: result.updated_at,
          website: result.website_url,
          socialMedia: {
            twitter: result.twitter_url,
            linkedin: result.linkedin_url,
          },
        })
      } else {
        setSearchResult("not_found")
      }
    } catch (error) {
      setError("Search failed. Please try again.")
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold">Creator Verification</h1>
          </div>
          <p className="text-gray-600">
            Verify the authenticity of digital content creators registered in Sierra Leone
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Creator
            </CardTitle>
            <CardDescription>
              Enter creator name, VEDO ID, email, or website URL to verify their registration status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <Label htmlFor="search">Search Query</Label>
                <Input
                  id="search"
                  placeholder="Enter creator name, VEDO ID, email, or website..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" disabled={isSearching} className="w-full">
                {isSearching ? "Searching..." : "Verify Creator"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchResult && (
          <Card>
            <CardHeader>
              <CardTitle>Verification Results</CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {searchResult === "not_found" ? (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Creator Not Found</h3>
                  <p className="text-gray-600 mb-4">
                    No verified creator found matching your search query. This creator may not be registered with VEDO.
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left">
                    <h4 className="font-medium text-yellow-800 mb-2">What this means:</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• The creator is not registered in the VEDO system</li>
                      <li>• The search information may be incorrect</li>
                      <li>• The creator's registration may be pending approval</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Verification Status */}
                  <div className="flex items-center justify-center p-6 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-green-900">Verified Creator</h3>
                      <p className="text-green-700">This creator is officially registered and verified with VEDO</p>
                    </div>
                  </div>

                  {/* Creator Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-500">VEDO ID</Label>
                        <p className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{searchResult.id}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Full Name</Label>
                        <p className="font-medium">{searchResult.name}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Creator/Brand Name</Label>
                        <p className="font-medium">{searchResult.creatorName}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Content Type</Label>
                        <p>{searchResult.contentType}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Verification Level</Label>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <Award className="h-3 w-3 mr-1" />
                          {searchResult.verificationLevel}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Registration Date</Label>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>{new Date(searchResult.joinDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Total Content</Label>
                        <p>{searchResult.totalContent} verified pieces</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Last Active</Label>
                        <p>{new Date(searchResult.lastActive).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Platforms</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {searchResult.platforms.map((platform, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="border-t pt-6">
                    <h4 className="font-medium mb-4">Verified Contact Information</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Website</Label>
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-gray-400" />
                          <a
                            href={searchResult.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {searchResult.website}
                          </a>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Social Media</Label>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-400">Twitter:</span>
                            <span>{searchResult.socialMedia.twitter}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-400">LinkedIn:</span>
                            <span>{searchResult.socialMedia.linkedin}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Verification Certificate */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Verification Certificate</h4>
                    <p className="text-sm text-blue-800 mb-3">
                      This creator has been verified by the Government of Sierra Leone's VEDO system and is authorized
                      to create and monetize digital content under Sierra Leone's IT and Cybercrime Laws.
                    </p>
                    <Button variant="outline" size="sm" className="bg-white">
                      Download Certificate
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Information Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>About VEDO Verification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">What does verification mean?</h4>
              <p className="text-sm text-gray-600">
                VEDO verification confirms that a content creator is officially registered with the Government of Sierra
                Leone, has provided valid identification, and agrees to comply with intellectual property and cybercrime
                laws.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Verification Levels</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Bronze</Badge>
                  <span className="text-sm text-gray-600">Basic identity verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-gray-100 text-gray-800">Silver</Badge>
                  <span className="text-sm text-gray-600">Identity + content portfolio verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-yellow-100 text-yellow-800">Gold</Badge>
                  <span className="text-sm text-gray-600">Full verification with business registration</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">For Businesses and Organizations</h4>
              <p className="text-sm text-gray-600">
                Use this verification system to confirm the authenticity of content creators before partnerships,
                collaborations, or content licensing agreements.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
