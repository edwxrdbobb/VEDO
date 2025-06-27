"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, FileText, TrendingUp, Clock, CheckCircle, XCircle, Eye, Shield, Settings, Bell } from "lucide-react"
import { mockAdmin } from "@/lib/mock-data"

export default function AdminDashboard() {
  const [applications, setApplications] = useState<any[]>([])
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [appsData, statsData] = await Promise.all([mockAdmin.getApplications(), mockAdmin.getSystemStats()])
        setApplications(appsData)
        setStats(statsData)
      } catch (error) {
        console.error("Error loading admin data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleApproveApplication = async (applicationId: string) => {
    try {
      await mockAdmin.approveApplication(applicationId)
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId
            ? {
                ...app,
                status: "approved",
                vedoId: `VEDO-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)
                  .toString()
                  .padStart(3, "0")}`,
              }
            : app,
        ),
      )
    } catch (error) {
      console.error("Error approving application:", error)
    }
  }

  const handleRejectApplication = async (applicationId: string) => {
    try {
      await mockAdmin.rejectApplication(applicationId)
      setApplications((prev) => prev.map((app) => (app.id === applicationId ? { ...app, status: "rejected" } : app)))
    } catch (error) {
      console.error("Error rejecting application:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <img src="/placeholder-logo.svg" alt="VEDO" className="h-8 w-8" />
              <h1 className="text-xl font-semibold text-gray-900">VEDO Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                <Shield className="w-3 h-3 mr-1" />
                Administrator
              </Badge>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Creators</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalCreators || 0}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />+{stats?.monthlyGrowth || 0}% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.pendingApplications || 0}</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Content</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalContent || 0}</div>
              <p className="text-xs text-muted-foreground">Published content pieces</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Healthy</div>
              <p className="text-xs text-muted-foreground">All systems operational</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="creators">Creators</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Creator Applications</CardTitle>
                <CardDescription>Review and manage creator verification applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.map((application) => (
                    <div key={application.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-lg">{application.name}</h3>
                            <Badge
                              variant={
                                application.status === "pending"
                                  ? "secondary"
                                  : application.status === "approved"
                                    ? "default"
                                    : "destructive"
                              }
                              className={
                                application.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : application.status === "approved"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                              }
                            >
                              {application.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                              {application.status === "approved" && <CheckCircle className="w-3 h-3 mr-1" />}
                              {application.status === "rejected" && <XCircle className="w-3 h-3 mr-1" />}
                              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                            </Badge>
                            {application.vedoId && <Badge variant="outline">{application.vedoId}</Badge>}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                              <p>
                                <strong>Email:</strong> {application.email}
                              </p>
                              <p>
                                <strong>Phone:</strong> {application.phone}
                              </p>
                              <p>
                                <strong>Location:</strong> {application.location}
                              </p>
                            </div>
                            <div>
                              <p>
                                <strong>Content Type:</strong> {application.contentType}
                              </p>
                              <p>
                                <strong>Experience:</strong> {application.experience}
                              </p>
                              <p>
                                <strong>Portfolio:</strong> {application.portfolio}
                              </p>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            Submitted: {new Date(application.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                        {application.status === "pending" && (
                          <div className="flex space-x-2 ml-4">
                            <Button
                              size="sm"
                              onClick={() => handleApproveApplication(application.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleRejectApplication(application.id)}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="creators" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Verified Creators</CardTitle>
                <CardDescription>Manage verified content creators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Creator Management</h3>
                  <p className="text-gray-600">Creator management tools will appear here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Moderation</CardTitle>
                <CardDescription>Review and moderate published content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Content Moderation</h3>
                  <p className="text-gray-600">Content moderation tools will appear here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Analytics</CardTitle>
                <CardDescription>Platform usage and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Dashboard</h3>
                  <p className="text-gray-600">Detailed analytics will be available here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure platform settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">System Configuration</h3>
                  <p className="text-gray-600">System settings will be available here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
