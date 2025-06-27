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

import { mockAdmin } from "@/lib/mock-data"

export default function AdminPage() {
  const [stats, setStats] = useState({
    totalCreators: 0,
    pendingApplications: 0,
    verifiedContent: 0,
    flaggedContent: 0,
    monthlyRegistrations: 0,
    activeCreators: 0,
  })

  const [pendingApplications, setPendingApplications] = useState([])
  const [recentActivity, setRecentActivity] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsData, applicationsData, activityData] = await Promise.all([
          mockAdmin.getSystemStats(),
          mockAdmin.getPendingApplications(),
          mockAdmin.getRecentActivity(),
        ])

        setStats(statsData)
        setPendingApplications(applicationsData)
        setRecentActivity(activityData)
      } catch (error) {
        console.error("Failed to load admin data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const handleApprove = async (creatorId: string) => {
    try {
      const result = await mockAdmin.approveApplication(creatorId, "current-admin-id")
      if (result.success) {
        // Refresh the data
        const applicationsData = await mockAdmin.getPendingApplications()
        setPendingApplications(applicationsData)
      }
    } catch (error) {
      console.error("Failed to approve application:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-8 w-8 text-blue-600 mx-auto mb-4 animate-spin" />
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    )
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
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export Data
              </Button>
              <Button size="sm">
                <AlertTriangle className="h-4 w-4 mr-1" />
                System Alerts
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
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  ))}
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
                        <p className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
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
                <p className="text-gray-600">Creator management interface would be implemented here...</p>
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
                <p className="text-gray-600">Content monitoring dashboard would be implemented here...</p>
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
                <p className="text-gray-600">Analytics dashboard would be implemented here...</p>
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
                <p className="text-gray-600">System administration panel would be implemented here...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
