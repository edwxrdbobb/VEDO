"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Upload, User, Globe, FileText, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      nationalId: "",
      dateOfBirth: "",
      address: "",
    },
    creatorInfo: {
      creatorName: "",
      bio: "",
      contentType: "",
      primaryPlatform: "",
      websiteUrl: "",
      socialMedia: {
        facebook: "",
        twitter: "",
        instagram: "",
        youtube: "",
        tiktok: "",
      },
    },
    verification: {
      agreesToTerms: false,
      agreesToIPPolicy: false,
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string; vedoId?: string } | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.verification.agreesToTerms || !formData.verification.agreesToIPPolicy) {
      setSubmitResult({
        success: false,
        message: "Please agree to the Terms of Service and IP Policy to continue.",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate mock VEDO ID
    const vedoId = `VEDO-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999999)).padStart(6, "0")}`

    setSubmitResult({
      success: true,
      message: `Registration submitted successfully! Your application is now under review. You will receive an email notification once approved.`,
      vedoId: vedoId,
    })

    setIsSubmitting(false)

    // Redirect to login after 3 seconds
    setTimeout(() => {
      router.push("/login")
    }, 3000)
  }

  if (submitResult?.success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <Card className="text-center">
            <CardContent className="pt-6">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
              <p className="text-gray-600 mb-4">{submitResult.message}</p>
              {submitResult.vedoId && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-blue-800">
                    Your VEDO ID: <span className="font-mono font-bold">{submitResult.vedoId}</span>
                  </p>
                </div>
              )}
              <p className="text-sm text-gray-500">Redirecting to login page...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold">VEDO Registration</h1>
          </div>
          <p className="text-gray-600">Register as a verified digital content creator in Sierra Leone</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Provide your personal details for identity verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.personalInfo.firstName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, firstName: e.target.value },
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.personalInfo.lastName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, lastName: e.target.value },
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, email: e.target.value },
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.personalInfo.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, phone: e.target.value },
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nationalId">National ID Number *</Label>
                  <Input
                    id="nationalId"
                    value={formData.personalInfo.nationalId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, nationalId: e.target.value },
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.personalInfo.dateOfBirth}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, dateOfBirth: e.target.value },
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  value={formData.personalInfo.address}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, address: e.target.value },
                    })
                  }
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Creator Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Creator Information
              </CardTitle>
              <CardDescription>Tell us about your content creation activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="creatorName">Creator/Brand Name *</Label>
                <Input
                  id="creatorName"
                  value={formData.creatorInfo.creatorName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      creatorInfo: { ...formData.creatorInfo, creatorName: e.target.value },
                    })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="bio">Bio/Description *</Label>
                <Textarea
                  id="bio"
                  placeholder="Describe your content creation activities, expertise, and goals..."
                  value={formData.creatorInfo.bio}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      creatorInfo: { ...formData.creatorInfo, bio: e.target.value },
                    })
                  }
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contentType">Primary Content Type *</Label>
                  <Select
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        creatorInfo: { ...formData.creatorInfo, contentType: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blog">Blog Writing</SelectItem>
                      <SelectItem value="video">Video Content</SelectItem>
                      <SelectItem value="podcast">Podcast</SelectItem>
                      <SelectItem value="photography">Photography</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="art">Digital Art</SelectItem>
                      <SelectItem value="education">Educational Content</SelectItem>
                      <SelectItem value="news">News/Journalism</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="primaryPlatform">Primary Platform *</Label>
                  <Select
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        creatorInfo: { ...formData.creatorInfo, primaryPlatform: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Personal Website</SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                      <SelectItem value="twitter">Twitter/X</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="websiteUrl">Website/Portfolio URL</Label>
                <Input
                  id="websiteUrl"
                  type="url"
                  placeholder="https://your-website.com"
                  value={formData.creatorInfo.websiteUrl}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      creatorInfo: { ...formData.creatorInfo, websiteUrl: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <Label>Social Media Profiles</Label>
                <div className="grid md:grid-cols-2 gap-4 mt-2">
                  <Input
                    placeholder="Facebook URL"
                    value={formData.creatorInfo.socialMedia.facebook}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        creatorInfo: {
                          ...formData.creatorInfo,
                          socialMedia: { ...formData.creatorInfo.socialMedia, facebook: e.target.value },
                        },
                      })
                    }
                  />
                  <Input
                    placeholder="Twitter/X URL"
                    value={formData.creatorInfo.socialMedia.twitter}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        creatorInfo: {
                          ...formData.creatorInfo,
                          socialMedia: { ...formData.creatorInfo.socialMedia, twitter: e.target.value },
                        },
                      })
                    }
                  />
                  <Input
                    placeholder="Instagram URL"
                    value={formData.creatorInfo.socialMedia.instagram}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        creatorInfo: {
                          ...formData.creatorInfo,
                          socialMedia: { ...formData.creatorInfo.socialMedia, instagram: e.target.value },
                        },
                      })
                    }
                  />
                  <Input
                    placeholder="YouTube URL"
                    value={formData.creatorInfo.socialMedia.youtube}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        creatorInfo: {
                          ...formData.creatorInfo,
                          socialMedia: { ...formData.creatorInfo.socialMedia, youtube: e.target.value },
                        },
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verification Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Verification Documents
              </CardTitle>
              <CardDescription>Upload required documents for identity and content verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="idDocument">National ID/Passport Copy *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PDF, JPG, PNG up to 5MB</p>
                  <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                </div>
              </div>
              <div>
                <Label>Portfolio Samples (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Upload up to 5 content samples</p>
                  <p className="text-xs text-gray-500">Images, videos, documents up to 10MB each</p>
                  <input type="file" className="hidden" multiple accept="image/*,video/*,.pdf,.doc,.docx" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms and Conditions */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.verification.agreesToTerms}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        verification: { ...formData.verification, agreesToTerms: checked as boolean },
                      })
                    }
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I agree to the{" "}
                    <Link href="/terms" className="text-blue-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and understand that providing false information may result in legal action under Sierra Leone's
                    Cybercrime Law.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="ipPolicy"
                    checked={formData.verification.agreesToIPPolicy}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        verification: { ...formData.verification, agreesToIPPolicy: checked as boolean },
                      })
                    }
                  />
                  <Label htmlFor="ipPolicy" className="text-sm leading-relaxed">
                    I acknowledge the{" "}
                    <Link href="/ip-policy" className="text-blue-600 hover:underline">
                      Intellectual Property Policy
                    </Link>{" "}
                    and agree to respect copyright laws and content ownership rights.
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button type="button" variant="outline" asChild className="flex-1 bg-transparent">
              <Link href="/">Cancel</Link>
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={!formData.verification.agreesToTerms || !formData.verification.agreesToIPPolicy || isSubmitting}
            >
              {isSubmitting ? "Submitting Registration..." : "Submit Registration"}
            </Button>
          </div>
        </form>

        {submitResult && !submitResult.success && (
          <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200">
            <Alert variant="destructive">
              <AlertDescription>{submitResult.message}</AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </div>
  )
}
