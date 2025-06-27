"use client"

import { useState } from "react"
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

export default function DashboardPage() {
  const [creator] = useState({
    id: "VEDO-2024-001247",
    name: "Sarah Kamara",
    creatorName: "TechSarah",
    email: "sarah@techsarah.com",
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-blue-600" />
                <span className="font-bold">VEDO Dashboard</span>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified Creator
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">ID: {creator.id}</span>
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-1" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {creator.name}!</h1>
          <p className="text-gray-600">
            Manage your content, track performance, and maintain your verification status.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Content</p>
                  <p className="text-2xl font-bold">{creator.totalContent}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold">{creator.totalViews.toLocaleString()}</p>
                </div>
                <Eye className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Engagement</p>
                  <p className="text-2xl font-bold">{creator.totalEngagement}</p>
                </div>
                <Heart className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Monthly Earnings</p>
                  <p className="text-2xl font-bold">Le {creator.monthlyEarnings.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Profile Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{creator.creatorName}</h3>
                      <p className="text-sm text-gray-600">{creator.contentType}</p>
                      <Badge variant="outline" className="mt-1">
                        <Award className="h-3 w-3 mr-1" />
                        {creator.verificationLevel} Verified
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Profile Completion</span>
                      <span>95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
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
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest content submissions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentContent.map((content) => (
                    <div key={content.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{content.title}</h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          <span>{content.platform}</span>
                          <span>{content.publishDate}</span>
                          <Badge
                            variant={content.status === "verified" ? "default" : "secondary"}
                            className={content.status === "verified" ? "bg-green-100 text-green-800" : ""}
                          >
                            {content.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Eye className="h-3 w-3" />
                          {content.views}
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
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
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>Manage and track all your submitted content</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Content management interface would be implemented here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>Detailed insights into your content performance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Analytics dashboard would be implemented here...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verification">
            <Card>
              <CardHeader>
                <CardTitle>Verification Status</CardTitle>
                <CardDescription>Manage your verification documents and status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Identity Verification</p>
                        <p className="text-sm text-gray-600">Completed on Jan 15, 2024</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Verified</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Content Portfolio</p>
                        <p className="text-sm text-gray-600">Last updated Jan 20, 2024</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Approved</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="font-medium">Annual Review</p>
                        <p className="text-sm text-gray-600">Due in 11 months</p>
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
