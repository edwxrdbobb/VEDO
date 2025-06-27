// Mock data store to simulate backend functionality
export interface MockUser {
  id: string
  email: string
  password: string
  role: "creator" | "admin" | "moderator"
  firstName?: string
  lastName?: string
  creatorName?: string
  verified?: boolean
}

export interface MockCreatorApplication {
  id: string
  name: string
  creatorName: string
  email: string
  contentType: string
  status: "pending_review" | "under_review" | "approved" | "rejected"
  submissionDate: string
  documentsComplete: boolean
  vedo_id?: string
  first_name: string
  last_name: string
  verification_status: string
  verification_level: string
  created_at: string
  content_type: string
  primary_platform: string
  updated_at: string
  website_url?: string
  twitter_url?: string
  linkedin_url?: string
  content_submissions?: any[]
}

export interface MockSystemStats {
  totalCreators: number
  pendingApplications: number
  verifiedContent: number
  flaggedContent: number
  monthlyRegistrations: number
  activeCreators: number
}

export interface MockActivity {
  id: string
  description: string
  timestamp: string
  status: "completed" | "pending"
}

// Mock users
export const mockUsers: MockUser[] = [
  {
    id: "admin-1",
    email: "admin@vedo.gov.sl",
    password: "admin123",
    role: "admin",
  },
  {
    id: "creator-1",
    email: "sarah@techsarah.com",
    password: "sarah123",
    role: "creator",
    firstName: "Sarah",
    lastName: "Kamara",
    creatorName: "TechSarah",
    verified: true,
  },
  {
    id: "creator-2",
    email: "mohamed@slblogger.com",
    password: "mohamed123",
    role: "creator",
    firstName: "Mohamed",
    lastName: "Sesay",
    creatorName: "SL Blogger",
    verified: false,
  },
  {
    id: "moderator-1",
    email: "moderator@vedo.gov.sl",
    password: "moderator123",
    role: "moderator",
  },
]

// Mock creator applications
export const mockApplications: MockCreatorApplication[] = [
  {
    id: "VEDO-2024-001",
    name: "John Doe",
    creatorName: "JohnTech SL",
    email: "john@johntech.sl",
    contentType: "Technology Blog",
    status: "pending_review",
    submissionDate: "2024-01-15",
    documentsComplete: true,
    first_name: "John",
    last_name: "Doe",
    verification_status: "pending",
    verification_level: "bronze",
    created_at: "2024-01-15T10:00:00Z",
    content_type: "blog",
    primary_platform: "website",
    updated_at: "2024-01-15T10:00:00Z",
    website_url: "https://johntech.sl",
    content_submissions: [],
  },
  {
    id: "VEDO-2024-002",
    name: "Fatima Bangura",
    creatorName: "Fatima Creates",
    email: "fatima@creates.sl",
    contentType: "Digital Art",
    status: "under_review",
    submissionDate: "2024-01-12",
    documentsComplete: false,
    first_name: "Fatima",
    last_name: "Bangura",
    verification_status: "under_review",
    verification_level: "bronze",
    created_at: "2024-01-12T14:30:00Z",
    content_type: "art",
    primary_platform: "instagram",
    updated_at: "2024-01-16T09:15:00Z",
    website_url: "https://fatimaart.com",
    content_submissions: [],
  },
]

// Mock verified creators for search
export const mockVerifiedCreators: MockCreatorApplication[] = [
  {
    id: "VEDO-2023-125",
    name: "Sarah Kamara",
    creatorName: "TechSarah",
    email: "sarah@techsarah.com",
    contentType: "Technology Content",
    status: "approved",
    submissionDate: "2023-08-15",
    documentsComplete: true,
    vedo_id: "VEDO-2023-125",
    first_name: "Sarah",
    last_name: "Kamara",
    verification_status: "verified",
    verification_level: "gold",
    created_at: "2023-08-15T10:00:00Z",
    content_type: "Technology Blog & Videos",
    primary_platform: "YouTube",
    updated_at: "2024-01-10T15:30:00Z",
    website_url: "https://techsarah.com",
    twitter_url: "@techsarah_sl",
    linkedin_url: "linkedin.com/in/sarahkamara",
    content_submissions: [
      { title: "AI in Sierra Leone", verified: true },
      { title: "Tech Education Series", verified: true },
      { title: "Digital Innovation Guide", verified: true },
    ],
  },
]

// Mock system stats
export const mockStats: MockSystemStats = {
  totalCreators: 156,
  pendingApplications: 12,
  verifiedContent: 1247,
  flaggedContent: 3,
  monthlyRegistrations: 23,
  activeCreators: 89,
}

// Mock recent activity
export const mockRecentActivity: MockActivity[] = [
  {
    id: "act-1",
    description: "Creator application approved: John Doe (JohnTech SL)",
    timestamp: "2024-01-16T09:30:00Z",
    status: "completed",
  },
  {
    id: "act-2",
    description: "New content submitted for verification by Sarah Kamara",
    timestamp: "2024-01-16T08:15:00Z",
    status: "pending",
  },
  {
    id: "act-3",
    description: "System backup completed successfully",
    timestamp: "2024-01-16T02:00:00Z",
    status: "completed",
  },
  {
    id: "act-4",
    description: "New creator registration: Fatima Bangura",
    timestamp: "2024-01-15T16:45:00Z",
    status: "completed",
  },
]

// Mock authentication functions
export const mockAuth = {
  currentUser: null as MockUser | null,

  signIn: async (email: string, password: string): Promise<MockUser> => {
    const user = mockUsers.find((u) => u.email === email && u.password === password)
    if (!user) {
      throw new Error("Invalid email or password")
    }
    mockAuth.currentUser = user
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return user
  },

  signOut: async (): Promise<void> => {
    mockAuth.currentUser = null
    await new Promise((resolve) => setTimeout(resolve, 500))
  },

  register: async (formData: any): Promise<{ success: boolean; message: string; vedoId?: string }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate mock VEDO ID
    const vedoId = `VEDO-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`

    // Add to applications (simulate pending registration)
    const newApplication: MockCreatorApplication = {
      id: vedoId,
      name: `${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`,
      creatorName: formData.creatorInfo.creatorName,
      email: formData.personalInfo.email,
      contentType: formData.creatorInfo.contentType,
      status: "pending_review",
      submissionDate: new Date().toISOString().split("T")[0],
      documentsComplete: true,
      vedo_id: vedoId,
      first_name: formData.personalInfo.firstName,
      last_name: formData.personalInfo.lastName,
      verification_status: "pending",
      verification_level: "bronze",
      created_at: new Date().toISOString(),
      content_type: formData.creatorInfo.contentType,
      primary_platform: formData.creatorInfo.primaryPlatform,
      updated_at: new Date().toISOString(),
      website_url: formData.creatorInfo.websiteUrl,
      content_submissions: [],
    }

    mockApplications.push(newApplication)

    return {
      success: true,
      message: "Registration submitted successfully! You will receive a confirmation email within 24 hours.",
      vedoId,
    }
  },

  searchCreator: async (query: string): Promise<MockCreatorApplication | null> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const creator = mockVerifiedCreators.find(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.creatorName.toLowerCase().includes(query.toLowerCase()) ||
        c.email.toLowerCase().includes(query.toLowerCase()) ||
        c.vedo_id?.toLowerCase().includes(query.toLowerCase()) ||
        c.website_url?.toLowerCase().includes(query.toLowerCase()),
    )

    return creator || null
  },
}

// Mock admin functions
export const mockAdmin = {
  getSystemStats: async (): Promise<MockSystemStats> => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    return mockStats
  },

  getPendingApplications: async (): Promise<MockCreatorApplication[]> => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    return mockApplications.filter((app) => app.status === "pending_review" || app.status === "under_review")
  },

  getRecentActivity: async (): Promise<MockActivity[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockRecentActivity
  },

  approveApplication: async (creatorId: string, adminId: string): Promise<{ success: boolean; message: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const application = mockApplications.find((app) => app.id === creatorId)
    if (application) {
      application.status = "approved"
      application.verification_status = "verified"
      application.updated_at = new Date().toISOString()

      // Add to verified creators
      mockVerifiedCreators.push(application)

      // Add activity
      mockRecentActivity.unshift({
        id: `act-${Date.now()}`,
        description: `Creator application approved: ${application.name} (${application.creatorName})`,
        timestamp: new Date().toISOString(),
        status: "completed",
      })

      return { success: true, message: "Application approved successfully" }
    }

    return { success: false, message: "Application not found" }
  },
}

// Mock system initialization
export const mockSystem = {
  getSystemStatus: async (): Promise<{ initialized: boolean; demoUsersCount: number; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return {
      initialized: true,
      demoUsersCount: mockUsers.length,
    }
  },

  initializeSystem: async (): Promise<{ success: boolean; message: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 3000))
    return {
      success: true,
      message: "System initialized successfully with demo users and sample data!",
    }
  },
}
