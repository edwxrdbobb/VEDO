// Mock data for the VEDO system

export const mockUsers = [
  {
    id: "admin-001",
    email: "admin@vedo.gov.sl",
    password: "admin123",
    role: "admin",
    name: "Admin User",
    verified: true,
  },
  {
    id: "creator-001",
    email: "sarah@techsarah.com",
    password: "sarah123",
    role: "creator",
    name: "Sarah Kamara",
    creatorName: "TechSarah",
    verified: true,
    vedoId: "VEDO-2023-125",
  },
  {
    id: "creator-002",
    email: "mohamed@slblogger.com",
    password: "mohamed123",
    role: "creator",
    name: "Mohamed Sesay",
    creatorName: "SLBlogger",
    verified: false,
    vedoId: "VEDO-2024-001",
  },
  {
    id: "moderator-001",
    email: "moderator@vedo.gov.sl",
    password: "moderator123",
    role: "moderator",
    name: "Moderator User",
    verified: true,
  },
]

export const mockVerifiedCreators = [
  {
    id: "VEDO-2023-125",
    name: "Sarah Kamara",
    creatorName: "TechSarah",
    email: "sarah@techsarah.com",
    contentType: "Technology Blog",
    verificationDate: "2023-12-15",
    status: "verified",
    verificationLevel: "Gold",
    platforms: ["Personal Blog", "Medium", "YouTube"],
    totalContent: 156,
    totalViews: 45230,
    totalEngagement: 3420,
    monthlyEarnings: 2500,
  },
  {
    id: "VEDO-2023-089",
    name: "Ibrahim Koroma",
    creatorName: "SierraVlogger",
    email: "ibrahim@sierravlogger.com",
    contentType: "Travel & Culture Vlog",
    verificationDate: "2023-11-20",
    status: "verified",
    verificationLevel: "Silver",
    platforms: ["YouTube", "Instagram", "TikTok"],
    totalContent: 89,
    totalViews: 32100,
    totalEngagement: 2890,
    monthlyEarnings: 1800,
  },
]

export const mockPendingApplications = [
  {
    id: "VEDO-2024-001247",
    name: "Aminata Bangura",
    creatorName: "AmiCreates",
    email: "aminata@amicreates.com",
    contentType: "Fashion & Lifestyle",
    submissionDate: "2024-01-20",
    status: "pending_review",
    documentsComplete: true,
    platforms: ["Instagram", "TikTok"],
  },
  {
    id: "VEDO-2024-001248",
    name: "Joseph Mansaray",
    creatorName: "JoeTech",
    email: "joseph@joetech.sl",
    contentType: "Technology Reviews",
    submissionDate: "2024-01-18",
    status: "under_review",
    documentsComplete: false,
    platforms: ["YouTube", "Personal Blog"],
  },
  {
    id: "VEDO-2024-001249",
    name: "Fatima Conteh",
    creatorName: "FatimaFoodie",
    email: "fatima@fatimafoodie.com",
    contentType: "Food & Cooking",
    submissionDate: "2024-01-15",
    status: "pending_review",
    documentsComplete: true,
    platforms: ["YouTube", "Instagram", "Facebook"],
  },
]

export const mockSystemStats = {
  totalCreators: 1247,
  pendingApplications: 23,
  verifiedContent: 8934,
  flaggedContent: 12,
  monthlyRegistrations: 156,
  activeCreators: 892,
}

export const mockRecentActivity = [
  {
    id: "activity-001",
    description: "New creator application submitted by Aminata Bangura",
    timestamp: "2024-01-20T10:30:00Z",
    status: "completed",
    type: "application",
  },
  {
    id: "activity-002",
    description: "Content verification completed for TechSarah",
    timestamp: "2024-01-20T09:15:00Z",
    status: "completed",
    type: "verification",
  },
  {
    id: "activity-003",
    description: "System backup initiated",
    timestamp: "2024-01-20T08:00:00Z",
    status: "in_progress",
    type: "system",
  },
  {
    id: "activity-004",
    description: "Monthly analytics report generated",
    timestamp: "2024-01-19T23:30:00Z",
    status: "completed",
    type: "report",
  },
]

// Mock authentication functions
export const mockAuth = {
  async login(email: string, password: string) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = mockUsers.find((u) => u.email === email && u.password === password)
    if (user) {
      localStorage.setItem("mockUser", JSON.stringify(user))
      return { success: true, user, error: null }
    }
    return { success: false, user: null, error: "Invalid credentials" }
  },

  async register(userData: any) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const vedoId = `VEDO-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999999)).padStart(6, "0")}`

    return {
      success: true,
      vedoId,
      message: "Registration submitted successfully",
    }
  },

  getCurrentUser() {
    const userStr = localStorage.getItem("mockUser")
    return userStr ? JSON.parse(userStr) : null
  },

  logout() {
    localStorage.removeItem("mockUser")
  },
}

// Mock admin functions
export const mockAdmin = {
  async getSystemStats() {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockSystemStats
  },

  async getPendingApplications() {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockPendingApplications
  },

  async getRecentActivity() {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockRecentActivity
  },

  async approveApplication(creatorId: string, adminId: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { success: true, message: "Application approved successfully" }
  },
}

// Mock verification function
export const mockVerification = {
  async searchCreator(query: string) {
    await new Promise((resolve) => setTimeout(resolve, 800))

    const creator = mockVerifiedCreators.find(
      (c) =>
        c.id.toLowerCase().includes(query.toLowerCase()) ||
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.creatorName.toLowerCase().includes(query.toLowerCase()),
    )

    return creator || null
  },
}
