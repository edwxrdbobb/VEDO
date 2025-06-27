"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

interface FormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  nationalId: string
  dateOfBirth: string
  address: string

  // Creator Information
  creatorName: string
  bio: string
  contentType: string
  primaryPlatform: string
  websiteUrl: string
  socialMedia: {
    facebook: string
    twitter: string
    instagram: string
    youtube: string
    tiktok: string
  }

  // Verification
  agreesToTerms: boolean
  agreesToIPPolicy: boolean
}

const contentTypes = [
  "Technology Blog",
  "Lifestyle Blog",
  "Educational Content",
  "Entertainment",
  "News & Politics",
  "Business & Finance",
  "Health & Wellness",
  "Travel & Tourism",
  "Food & Cooking",
  "Fashion & Beauty",
  "Sports & Fitness",
  "Music & Arts",
  "Gaming",
  "Other",
]

const platforms = [
  "Personal Website",
  "YouTube",
  "Instagram",
  "TikTok",
  "Facebook",
  "Twitter",
  "LinkedIn",
  "Medium",
  "Substack",
  "Podcast Platform",
  "Other",
]

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [generatedInfloId, setGeneratedInfloId] = useState("")
  const router = useRouter()

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nationalId: "",
    dateOfBirth: "",
    address: "",
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
    agreesToTerms: false,
    agreesToIPPolicy: false,
  })

  const updateFormData = (field: string, value: any) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof FormData],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.phone &&
          formData.nationalId &&
          formData.dateOfBirth &&
          formData.address
        )
      case 2:
        return formData.creatorName && formData.bio && formData.contentType && formData.primaryPlatform
      case 3:
        return formData.agreesToTerms && formData.agreesToIPPolicy
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
      setError("")
    } else {
      setError("Please fill in all required fields")
    }
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
    setError("")
  }

  const generateInfloId = () => {
    const year = new Date().getFullYear()
    const randomNum = Math.floor(Math.random() * 900000) + 100000
    return `INFLO-${year}-${randomNum}`
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) {
      setError("Please accept all terms and policies")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate mock INFLO ID
      const infloId = generateInfloId()
      setGeneratedInfloId(infloId)
      setSuccess(true)

      // Auto-redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (error) {
      setError("Registration failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStepProgress = () => {
    return (currentStep / 3) * 100
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Registration Successful!</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Your INFLO creator account has been submitted for review.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                  <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">Your INFLO ID:</p>
                  <p className="font-mono text-lg font-bold text-blue-900 dark:text-blue-100">{generatedInfloId}</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  You will receive an email with login credentials once your application is approved.
                </p>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-500">Redirecting to login page in 3 seconds...</div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm mb-8">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-600" />
              <div>
                <span className="font-bold text-gray-900 dark:text-white">INFLO</span>
                <p className="text-xs text-gray-600 dark:text-gray-400">Creator Registration</p>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link href="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Creator Registration</h1>
            <Badge variant="outline" className="dark:border-gray-600">
              Step {currentStep} of 3
            </Badge>
          </div>
          <Progress value={getStepProgress()} className="h-2" />
        </div>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">
              {currentStep === 1 && "Personal Information"}
              {currentStep === 2 && "Creator Profile"}
              {currentStep === 3 && "Terms & Verification"}
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              {currentStep === 1 && "Provide your personal details for identity verification"}
              {currentStep === 2 && "Tell us about your content and online presence"}
              {currentStep === 3 && "Review and accept the terms of service"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="dark:text-white">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateFormData("firstName", e.target.value)}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="dark:text-white">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateFormData("lastName", e.target.value)}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="dark:text-white">
                    Email Address *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="dark:text-white">
                    Phone Number *
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="+232 XX XXX XXXX"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="nationalId" className="dark:text-white">
                    National ID Number *
                  </Label>
                  <Input
                    id="nationalId"
                    value={formData.nationalId}
                    onChange={(e) => updateFormData("nationalId", e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="dateOfBirth" className="dark:text-white">
                    Date of Birth *
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                      className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address" className="dark:text-white">
                    Address *
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => updateFormData("address", e.target.value)}
                      className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      rows={3}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Creator Profile */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="creatorName" className="dark:text-white">
                    Creator/Brand Name *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="creatorName"
                      value={formData.creatorName}
                      onChange={(e) => updateFormData("creatorName", e.target.value)}
                      className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Your creator name or brand"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio" className="dark:text-white">
                    Bio/Description *
                  </Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => updateFormData("bio", e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    rows={4}
                    placeholder="Tell us about yourself and your content..."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contentType" className="dark:text-white">
                    Content Type *
                  </Label>
                  <Select value={formData.contentType} onValueChange={(value) => updateFormData("contentType", value)}>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue placeholder="Select your content type" />
                    </SelectTrigger>
                    <SelectContent>
                      {contentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="primaryPlatform" className="dark:text-white">
                    Primary Platform *
                  </Label>
                  <Select
                    value={formData.primaryPlatform}
                    onValueChange={(value) => updateFormData("primaryPlatform", value)}
                  >
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue placeholder="Select your main platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {platforms.map((platform) => (
                        <SelectItem key={platform} value={platform}>
                          {platform}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="websiteUrl" className="dark:text-white">
                    Website URL
                  </Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="websiteUrl"
                      type="url"
                      value={formData.websiteUrl}
                      onChange={(e) => updateFormData("websiteUrl", e.target.value)}
                      className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                <div>
                  <Label className="dark:text-white">Social Media Links (Optional)</Label>
                  <div className="space-y-3 mt-2">
                    <Input
                      placeholder="Facebook URL"
                      value={formData.socialMedia.facebook}
                      onChange={(e) => updateFormData("socialMedia.facebook", e.target.value)}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <Input
                      placeholder="Twitter URL"
                      value={formData.socialMedia.twitter}
                      onChange={(e) => updateFormData("socialMedia.twitter", e.target.value)}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <Input
                      placeholder="Instagram URL"
                      value={formData.socialMedia.instagram}
                      onChange={(e) => updateFormData("socialMedia.instagram", e.target.value)}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <Input
                      placeholder="YouTube URL"
                      value={formData.socialMedia.youtube}
                      onChange={(e) => updateFormData("socialMedia.youtube", e.target.value)}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <Input
                      placeholder="TikTok URL"
                      value={formData.socialMedia.tiktok}
                      onChange={(e) => updateFormData("socialMedia.tiktok", e.target.value)}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Terms & Verification */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Registration Summary</h3>
                  <div className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
                    <p>
                      <strong>Name:</strong> {formData.firstName} {formData.lastName}
                    </p>
                    <p>
                      <strong>Creator Name:</strong> {formData.creatorName}
                    </p>
                    <p>
                      <strong>Email:</strong> {formData.email}
                    </p>
                    <p>
                      <strong>Content Type:</strong> {formData.contentType}
                    </p>
                    <p>
                      <strong>Primary Platform:</strong> {formData.primaryPlatform}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={formData.agreesToTerms}
                      onCheckedChange={(checked) => updateFormData("agreesToTerms", checked)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white"
                      >
                        I agree to the Terms of Service *
                      </Label>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        By checking this box, you agree to INFLO's terms of service and user agreement.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="ipPolicy"
                      checked={formData.agreesToIPPolicy}
                      onCheckedChange={(checked) => updateFormData("agreesToIPPolicy", checked)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="ipPolicy"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white"
                      >
                        I agree to the Intellectual Property Policy *
                      </Label>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        You acknowledge that you will respect intellectual property rights and comply with Sierra
                        Leone's IP laws.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Important Notice</h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                        Your application will be reviewed by the INFLO team. You will receive an email notification once
                        your verification is complete. This process typically takes 3-5 business days.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <Alert variant="destructive" className="dark:border-red-800 dark:bg-red-900/20">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="dark:text-red-200">{error}</AlertDescription>
              </Alert>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <div>
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="dark:border-gray-600 dark:hover:bg-gray-700 bg-transparent"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                )}
              </div>
              <div>
                {currentStep < 3 ? (
                  <Button onClick={nextStep}>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        Submitting...
                      </div>
                    ) : (
                      <>
                        Submit Registration
                        <CheckCircle className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline dark:text-blue-400">
              Sign in here
            </Link>
          </p>
          <p className="mt-2">
            <Link href="/" className="hover:underline">
              Back to home
            </Link>
            {" • "}
            <Link href="/verify" className="hover:underline">
              Verify a creator
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
