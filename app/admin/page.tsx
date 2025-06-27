"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Shield,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Download,
  Eye,
  UserCheck,
  FileCheck,
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"

// Mock data
const mockStats = {
  totalCreators: 247,
  pendingApplications: 12,
  verifiedContent: 1856,
  flaggedContent: 3,
  monthlyRegistrations: 28,
  activeCreators: 189,
}

const mockPendingApplications = [
  {
    id: "app_001",
    name: "John Doe",
    creatorName: "TechJohn",
    contentType: "Technology Blog",
    submissionDate: "2024-01-22",
    status: "pending_review",
    documentsComplete: true,
  },
  {
    id: "app_002",
    name: "Jane Smith",
    creatorName: "ArtisticJane",
    contentType: "Digital Art",
    submissionDate: "2024-01-21",
    status: "under_review",
    documentsComplete: false,
  },
  {
    id: "app_003",
    name: "Mike Johnson",
    creatorName: "MusicMike",
    contentType: "Music",
    submissionDate: "2024-01-20",
    status: "pending",
    documentsComplete: true,
  },
]

const mockRecentActivity = [
  {
    id: 1,
    description: "New creator registration: John Doe",
    timestamp: "2 hours ago",
    status: "pending",
  },
  {
    id: 2,
    description: "Application approved: Sarah Kamara",
    timestamp: "4 hours ago",
    status: "completed",
  },
  {
    id: 3,
    description: "Content flagged for review",
    timestamp: "6 hours ago",
    status: "pending",
  },
  {
    id: 4,
    description: "System backup completed",
    timestamp: "1 day ago",
    status: "completed",
  },
]

export default function AdminPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState(mockStats)
  const [pendingApplications, setPendingApplications] = useState(mockPendingApplications)
  const [recentActivity, setRecentActivity] = useState(mockRecentActivity)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/login")
    }
  }, [user, loading, router])

  const handleApprove = async (applicationId: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update the application status
    setPendingApplications((prev) => prev.filter((app) => app.id !== applicationId))

    // Add to recent activity
    setRecentActivity((prev) => [
      {
        id: Date.now(),
        description: `Application approved: ${pendingApplications.find((app) => app.id === applicationId)?.name}`,
        timestamp: "Just now",
        status: "completed",
      },
      ...prev,
    ])

    // Update stats
    setStats((prev) => ({
      ...prev,
      pendingApplications: prev.pendingApplications - 1,
      activeCreators: prev.activeCreators + 1,
    }))

    setIsLoading(false)
  }

  const handleReject = async (applicationId: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update the application status
    setPendingApplications((prev) => prev.filter((app) => app.id !== applicationId))

    // Add to recent activity
    setRecentActivity((prev) => [
      {
        id: Date.now(),
        description: `Application rejected: ${pendingApplications.find((app) => app.id === applicationId)?.name}`,
        timestamp: "Just now",
        status: "completed",
      },
      ...prev,
    ])

    // Update stats
    setStats((prev) => ({
      ...prev,
      pendingApplications: prev.pendingApplications - 1,
    }))

    setIsLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-8 w-8 text-blue-600 mx-auto mb-4 animate-spin" />
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-blue-600" />
                <span className="font-bold">VEDO Admin Panel</span>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Government Access
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Welcome, {user.name}</span>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export Data
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
        {/* Dashboard Overview */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">VEDO Administration Dashboard</h1>
          <p className="text-gray-600">
            Monitor and manage the digital content creator registration system for Sierra Leone.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Total Creators</p>
                  <p className="text-xl font-bold">{stats.totalCreators}</p>
                </div>
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Pending Apps</p>
                  <p className="text-xl font-bold text-orange-600">{stats.pendingApplications}</p>
                </div>
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Verified Content</p>
                  <p className="text-xl font-bold text-green-600">{stats.verifiedContent}</p>
                </div>
                <FileCheck className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Flagged Content</p>
                  <p className="text-xl font-bold text-red-600">{stats.flaggedContent}</p>
                </div>
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Monthly Registrations</p>
                  <p className="text-xl font-bold">{stats.monthlyRegistrations}</p>
                </div>
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Active Creators</p>
                  <p className="text-xl font-bold text-cyan-600">{stats.activeCreators}</p>
                </div>
                <UserCheck className="h-6 w-6 text-cyan-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="creators">Creators</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-6">
            {/* Pending Applications */}
            <Card>
              <CardHeader>
                <CardTitle>Pending Applications</CardTitle>
                <CardDescription>Review and process new creator registration applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApplications.map((application) => (
                    <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <div>
                            <h4 className="font-medium">{application.name}</h4>
                            <p className="text-sm text-gray-600">
                              {application.creatorName} • {application.contentType}
                            </p>
                            <p className="text-xs text-gray-500">ID: {application.id}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span>Submitted: {application.submissionDate}</span>
                          <Badge
                            variant={application.status === "pending_review" ? "default" : "secondary"}
                            className={
                              application.status === "pending_review"
                                ? "bg-blue-100 text-blue-800"
                                : application.status === "under_review"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                            }
                          >
                            {application.status.replace("_", " ")}
                          </Badge>
                          {!application.documentsComplete && (
                            <Badge variant="outline" className="text-red-600 border-red-200">
                              Missing Documents
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApprove(application.id)}
                          disabled={isLoading}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleReject(application.id)}
                          disabled={isLoading}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                  {pendingApplications.length === 0 && (
                    <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">All Caught Up!</h3>
                      <p className="text-gray-600">No pending applications to review at this time.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest system activities and administrative actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          activity.status === "completed" ? "bg-green-500" : "bg-yellow-500"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.description}</p>
                        <p className="text-xs text-gray-500">{activity.timestamp}</p>
                      </div>
                      <Badge
                        variant={activity.status === "completed" ? "default" : "secondary"}
                        className={activity.status === "completed" ? "bg-green-100 text-green-800" : ""}
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="creators">
            <Card>
              <CardHeader>
                <CardTitle>Creator Management</CardTitle>
                <CardDescription>Search, filter, and manage registered creators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <Input placeholder="Search creators..." />
                  </div>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Creators</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-1" />
                    More Filters
                  </Button>
                </div>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Creator Management</h3>
                  <p className="text-gray-600">
                    This section would contain a comprehensive list of all registered creators with search, filter, and
                    management capabilities.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Content Monitoring</CardTitle>
                <CardDescription>Monitor and moderate creator content across platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Content Monitoring</h3>
                  <p className="text-gray-600">
                    This section would contain tools for monitoring and moderating content submissions, flagged content,
                    and verification workflows.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>System Analytics</CardTitle>
                <CardDescription>Comprehensive analytics and reporting for the VEDO system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">System Analytics</h3>
                  <p className="text-gray-600">
                    This section would contain detailed analytics, charts, and reports about system usage, creator
                    activity, and content performance.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>System Administration</CardTitle>
                <CardDescription>System settings, user management, and configuration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">System Administration</h3>
                  <p className="text-gray-600">
                    This section would contain system configuration options, user role management, and administrative
                    tools.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
