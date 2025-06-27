// Mock data for the VEDO system

export interface MockUser {
  id: string
  email: string
  role: "admin" | "creator" | "moderator"
  name: string
  avatar?: string
  verified?: boolean
  vedoId?: string
}

export interface MockCreatorApplication {
  id: string
  name: string
  email: string
  phone: string
  location: string
  contentType: string
  experience: string
  portfolio: string
  status: "pending" | "approved" | "rejected"
  submittedAt: string
  vedoId?: string
}

export interface MockVerifiedCreator {
  id: string
  name: string
  username: string
  vedoId: string
  email: string
  phone: string
  location: string
  contentType: string
  followers: number
  verified: boolean
  joinedAt: string
  avatar?: string
}

// Mock users for authentication
export const mockUsers: MockUser[] = [
  {
    id: "admin-1",
    email: "admin@vedo.gov.sl",
    role: "admin",
    name: "Admin User",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "creator-1",
    email: "sarah@techsarah.com",
    role: "creator",
    name: "Sarah Kamara",
    verified: true,
    vedoId: "VEDO-2023-125",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "creator-2",
    email: "mohamed@slblogger.com",
    role: "creator",
    name: "Mohamed Bangura",
    verified: false,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "moderator-1",
    email: "moderator@vedo.gov.sl",
    role: "moderator",
    name: "Moderator User",
    avatar: "/placeholder-user.jpg",
  },
]

// Mock creator applications
export const mockCreatorApplications: MockCreatorApplication[] = [
  {
    id: "app-1",
    name: "Fatima Sesay",
    email: "fatima@example.com",
    phone: "+232 76 123 456",
    location: "Freetown",
    contentType: "Fashion & Lifestyle",
    experience: "3 years",
    portfolio: "instagram.com/fatima_style",
    status: "pending",
    submittedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "app-2",
    name: "Ibrahim Koroma",
    email: "ibrahim@example.com",
    phone: "+232 77 987 654",
    location: "Bo",
    contentType: "Music & Entertainment",
    experience: "5 years",
    portfolio: "youtube.com/ibrahimmusic",
    status: "pending",
    submittedAt: "2024-01-14T14:20:00Z",
  },
  {
    id: "app-3",
    name: "Aminata Jalloh",
    email: "aminata@example.com",
    phone: "+232 78 456 789",
    location: "Kenema",
    contentType: "Education & Tech",
    experience: "2 years",
    portfolio: "linkedin.com/in/aminata-jalloh",
    status: "approved",
    submittedAt: "2024-01-10T09:15:00Z",
    vedoId: "VEDO-2024-001",
  },
]

// Mock verified creators
export const mockVerifiedCreators: MockVerifiedCreator[] = [
  {
    id: "creator-1",
    name: "Sarah Kamara",
    username: "TechSarah",
    vedoId: "VEDO-2023-125",
    email: "sarah@techsarah.com",
    phone: "+232 76 555 123",
    location: "Freetown",
    contentType: "Technology & Innovation",
    followers: 15420,
    verified: true,
    joinedAt: "2023-08-15T00:00:00Z",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "creator-2",
    name: "Mohamed Bangura",
    username: "SLBlogger",
    vedoId: "VEDO-2023-089",
    email: "mohamed@slblogger.com",
    phone: "+232 77 444 567",
    location: "Bo",
    contentType: "Travel & Culture",
    followers: 8930,
    verified: true,
    joinedAt: "2023-06-20T00:00:00Z",
    avatar: "/placeholder-user.jpg",
  },
]

// Mock system statistics
export const mockSystemStats = {
  totalCreators: 247,
  pendingApplications: 23,
  totalContent: 1856,
  monthlyGrowth: 12.5,
  recentActivity: [
    {
      id: "1",
      type: "application",
      message: "New creator application from Fatima Sesay",
      timestamp: "2024-01-15T10:30:00Z",
    },
    {
      id: "2",
      type: "approval",
      message: "Aminata Jalloh approved as verified creator",
      timestamp: "2024-01-14T16:45:00Z",
    },
    {
      id: "3",
      type: "content",
      message: "Sarah Kamara published new tech tutorial",
      timestamp: "2024-01-14T14:20:00Z",
    },
  ],
}

// Mock authentication functions
export const mockAuth = {
  signIn: async (email: string, password: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = mockUsers.find((u) => u.email === email)
    if (user) {
      localStorage.setItem("vedo_user", JSON.stringify(user))
      return { success: true, user }
    }
    return { success: false, error: "Invalid credentials" }
  },

  signUp: async (userData: any) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const newUser: MockUser = {
      id: `user-${Date.now()}`,
      email: userData.email,
      role: "creator",
      name: userData.name,
      verified: false,
    }

    return {
      success: true,
      user: newUser,
      vedoId: `VEDO-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
    }
  },

  getCurrentUser: () => {
    const stored = localStorage.getItem("vedo_user")
    return stored ? JSON.parse(stored) : null
  },

  signOut: () => {
    localStorage.removeItem("vedo_user")
  },
}

// Mock admin functions
export const mockAdmin = {
  getApplications: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockCreatorApplications
  },

  approveApplication: async (applicationId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const app = mockCreatorApplications.find((a) => a.id === applicationId)
    if (app) {
      app.status = "approved"
      app.vedoId = `VEDO-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`
    }
    return { success: true }
  },

  rejectApplication: async (applicationId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const app = mockCreatorApplications.find((a) => a.id === applicationId)
    if (app) {
      app.status = "rejected"
    }
    return { success: true }
  },

  getSystemStats: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockSystemStats
  },
}

// Mock verification function
export const mockVerification = {
  searchCreator: async (query: string) => {
    await new Promise((resolve) => setTimeout(resolve, 800))

    const lowerQuery = query.toLowerCase()
    const creator = mockVerifiedCreators.find(
      (c) =>
        c.name.toLowerCase().includes(lowerQuery) ||
        c.username.toLowerCase().includes(lowerQuery) ||
        c.vedoId.toLowerCase().includes(lowerQuery),
    )

    return creator || null
  },
}
