"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/lib/auth-context"
import { supabase, type Creator } from "@/lib/supabase"
import { generateQRCode } from "@/lib/utils"
import { Users, Edit, Trash2, Send, Shield, QrCode, CheckCircle, XCircle, Clock } from "lucide-react"

export default function AdminDashboard() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminDashboardContent />
    </ProtectedRoute>
  )
}

function AdminDashboardContent() {
  const { user, signOut } = useAuth()
  const [creators, setCreators] = useState<Creator[]>([])
  const [stats, setStats] = useState({
    totalCreators: 0,
    pendingApprovals: 0,
    verifiedCreators: 0,
    rejectedCreators: 0
  })
  const [loading, setLoading] = useState(true)
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null)
  const [showAddCreator, setShowAddCreator] = useState(false)
  const [showSendMessage, setShowSendMessage] = useState(false)

  // Form states
  const [newCreator, setNewCreator] = useState({
    email: '',
    full_name: '',
    creator_name: '',
    bio: ''
  })
  const [message, setMessage] = useState({
    subject: '',
    content: ''
  })

  useEffect(() => {
    fetchCreators()
    fetchStats()
  }, [])

  const fetchCreators = async () => {
    try {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setCreators(data || [])
    } catch (error) {
      console.error('Error fetching creators:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('creators')
        .select('status, verification_status')

      if (error) throw error

      const stats = {
        totalCreators: data?.length || 0,
        pendingApprovals: data?.filter(c => c.status === 'pending').length || 0,
        verifiedCreators: data?.filter(c => c.verification_status === 'verified').length || 0,
        rejectedCreators: data?.filter(c => c.status === 'rejected').length || 0
      }

      setStats(stats)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const handleAddCreator = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const qrCode = generateQRCode(Date.now().toString())
      
      const { error } = await supabase
        .from('creators')
        .insert({
          ...newCreator,
          status: 'pending',
          verification_status: 'unverified',
          qr_code: qrCode
        })

      if (error) throw error

      setNewCreator({ email: '', full_name: '', creator_name: '', bio: '' })
      setShowAddCreator(false)
      fetchCreators()
      fetchStats()
    } catch (error) {
      console.error('Error adding creator:', error)
    }
  }

  const handleApproveCreator = async (creatorId: string) => {
    try {
      const { error } = await supabase
        .from('creators')
        .update({ 
          status: 'approved',
          verification_status: 'verified'
        })
        .eq('id', creatorId)

      if (error) throw error
      fetchCreators()
      fetchStats()
    } catch (error) {
      console.error('Error approving creator:', error)
    }
  }

  const handleRejectCreator = async (creatorId: string) => {
    try {
      const { error } = await supabase
        .from('creators')
        .update({ status: 'rejected' })
        .eq('id', creatorId)

      if (error) throw error
      fetchCreators()
      fetchStats()
    } catch (error) {
      console.error('Error rejecting creator:', error)
    }
  }

  const handleDeleteCreator = async (creatorId: string) => {
    if (!confirm('Are you sure you want to delete this creator?')) return

    try {
      const { error } = await supabase
        .from('creators')
        .delete()
        .eq('id', creatorId)

      if (error) throw error
      fetchCreators()
      fetchStats()
    } catch (error) {
      console.error('Error deleting creator:', error)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCreator) return

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          sender_id: user?.id,
          recipient_id: selectedCreator.id,
          subject: message.subject,
          content: message.content,
          read: false
        })

      if (error) throw error

      setMessage({ subject: '', content: '' })
      setShowSendMessage(false)
      setSelectedCreator(null)
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>
      case 'pending':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-blue-100 text-blue-800"><Shield className="h-3 w-3 mr-1" />Verified</Badge>
      case 'pending':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <span className="text-sm text-muted-foreground">
              Welcome, {user?.email}
            </span>
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="creators">Creators</TabsTrigger>
            <TabsTrigger value="add-creator">Add Creator</TabsTrigger>
            <TabsTrigger value="approvals">Approvals</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Creators</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalCreators}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Verified Creators</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.verifiedCreators}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.rejectedCreators}</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest creator registrations and status changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {creators.slice(0, 5).map((creator) => (
                    <div key={creator.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{creator.full_name}</p>
                        <p className="text-sm text-muted-foreground">{creator.creator_name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(creator.status)}
                        {getVerificationBadge(creator.verification_status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Current Creators Tab */}
          <TabsContent value="creators" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Creators</CardTitle>
                <CardDescription>Manage all registered creators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {creators.map((creator) => (
                    <div key={creator.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium">{creator.full_name}</p>
                            <p className="text-sm text-muted-foreground">{creator.creator_name}</p>
                            <p className="text-xs text-muted-foreground">{creator.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          {getStatusBadge(creator.status)}
                          {getVerificationBadge(creator.verification_status)}
                          {creator.qr_code && (
                            <Badge variant="outline">
                              <QrCode className="h-3 w-3 mr-1" />
                              QR Code
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Creator</DialogTitle>
                              <DialogDescription>
                                Update creator information
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label>Full Name</Label>
                                <Input defaultValue={creator.full_name} />
                              </div>
                              <div>
                                <Label>Creator Name</Label>
                                <Input defaultValue={creator.creator_name} />
                              </div>
                              <div>
                                <Label>Email</Label>
                                <Input defaultValue={creator.email} />
                              </div>
                              <div>
                                <Label>Bio</Label>
                                <Input defaultValue={creator.bio || ''} />
                              </div>
                              <Button className="w-full">Update Creator</Button>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedCreator(creator)
                            setShowSendMessage(true)
                          }}
                        >
                          <Send className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteCreator(creator.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Add Creator Tab */}
          <TabsContent value="add-creator" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Creator</CardTitle>
                <CardDescription>Create a new creator account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddCreator} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newCreator.email}
                        onChange={(e) => setNewCreator({ ...newCreator, email: e.target
