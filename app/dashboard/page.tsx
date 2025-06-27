"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  User,
  FileText,
  TrendingUp,
  Globe,
  DollarSign,
  Eye,
  Heart,
  Award,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { QRScanner } from "@/components/qr-scanner"
import { ThemeToggle } from "@/components/theme-toggle"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  // Mock creator data based on logged in user
  const [creator] = useState({
    id: "VEDO-2024-001247",
    name: user?.name || "Content Creator",
    creatorName: user?.email?.includes("sarah") ? "TechSarah" : "Creator",
    email: user?.email || "",
    status: "verified",
    joinDate: "2024-01-15",
    contentType: "Technology Blog",
    verificationLevel: "Gold",
    totalContent: 156,
    totalViews: 45230,
    totalEngagement: 3420,
    monthlyEarnings: 2500,
  })

  const recentContent = [
    {
      id: 1,
      title: "AI in Sierra Leone: Opportunities and Challenges",
      platform: "Personal Blog",
      publishDate: "2024-01-20",
      views: 1250,
      engagement: 89,
      status: "verified",
    },
    {
      id: 2,
      title: "Digital Payment Solutions for Small Businesses",
      platform: "Medium",
      publishDate: "2024-01-18",
      views: 890,
      engagement: 67,
      status: "pending",
    },
    {
      id: 3,
      title: "Cybersecurity Best Practices for Content Creators",
      platform: "YouTube",
      publishDate: "2024-01-15",
      views: 2340,
      engagement: 156,
      status: "verified",
    },
  ]

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-8 w-8 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="dark:text-white">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-blue-600" />
                <span className="font-bold dark:text-white">VEDO Dashboard</span>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified Creator
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">ID: {creator.id}</span>
              <QRScanner />
              <ThemeToggle />
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-1" />
                Profile
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  localStorage.removeItem("vedo_user")
                  sessionStorage.removeItem("vedo_user")
                  router.push("/login")
                }}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, {creator.name}!</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your content, track performance, and maintain your verification status.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Content</p>
                  <p className="text-2xl font-bold dark:text-white">{creator.totalContent}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Views</p>
                  <p className="text-2xl font-bold dark:text-white">{creator.totalViews.toLocaleString()}</p>
                </div>
                <Eye className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Engagement</p>
                  <p className="text-2xl font-bold dark:text-white">{creator.totalEngagement}</p>
                </div>
                <Heart className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Earnings</p>
                  <p className="text-2xl font-bold dark:text-white">Le {creator.monthlyEarnings.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 dark:bg-gray-800">
            <TabsTrigger value="overview" className="dark:data-[state=active]:bg-gray-700">
              Overview
            </TabsTrigger>
            <TabsTrigger value="content" className="dark:data-[state=active]:bg-gray-700">
              Content
            </TabsTrigger>
            <TabsTrigger value="analytics" className="dark:data-[state=active]:bg-gray-700">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="verification" className="dark:data-[state=active]:bg-gray-700">
              Verification
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Profile Summary */}
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Profile Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold dark:text-white">{creator.creatorName}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{creator.contentType}</p>
                      <Badge variant="outline" className="mt-1">
                        <Award className="h-3 w-3 mr-1" />
                        {creator.verificationLevel} Verified
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="dark:text-gray-400">Profile Completion</span>
                      <span className="dark:text-gray-400">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Submit New Content
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Shield className="h-4 w-4 mr-2" />
                    Update Verification
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Globe className="h-4 w-4 mr-2" />
                    Share Profile
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Recent Activity</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Your latest content submissions and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentContent.map((content) => (
                    <div
                      key={content.id}
                      className="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium dark:text-white">{content.title}</h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                          <span>{content.platform}</span>
                          <span>{content.publishDate}</span>
                          <Badge
                            variant={content.status === "verified" ? "default" : "secondary"}
                            className={
                              content.status === "verified"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : ""
                            }
                          >
                            {content.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                          <Eye className="h-3 w-3" />
                          {content.views}
                        </div>
                        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                          <Heart className="h-3 w-3" />
                          {content.engagement}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Content Management</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Manage and track all your submitted content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Content Management</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    This section would contain tools to manage your content submissions, track verification status, and
                    update content details.
                  </p>
                  <Button>
                    <FileText className="h-4 w-4 mr-2" />
                    Submit New Content
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Performance Analytics</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Detailed insights into your content performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Analytics Dashboard</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    This section would contain detailed analytics about your content performance, audience engagement,
                    and revenue insights.
                  </p>
                  <Button>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Detailed Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verification">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Verification Status</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Manage your verification documents and status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg bg-green-50 dark:bg-green-900/20">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium dark:text-white">Identity Verification</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Completed on Jan 15, 2024</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Verified
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg bg-green-50 dark:bg-green-900/20">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium dark:text-white">Content Portfolio</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Last updated Jan 20, 2024</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Approved
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="font-medium dark:text-white">Annual Review</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Due in 11 months</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Upcoming</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
