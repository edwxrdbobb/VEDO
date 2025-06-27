import bcrypt from "bcryptjs"

export interface User {
  id: string
  email: string
  role: "creator" | "admin" | "moderator"
  name?: string
}

// Mock users database
const mockUsers = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    email: "admin@vedo.gov.sl",
    password_hash: "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password123
    role: "admin" as const,
    name: "Admin User",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    email: "sarah@techsarah.com",
    password_hash: "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password123
    role: "creator" as const,
    name: "Sarah Kamara",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    email: "mohamed@slblogger.com",
    password_hash: "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password123
    role: "creator" as const,
    name: "Mohamed Sesay",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    email: "moderator@vedo.gov.sl",
    password_hash: "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password123
    role: "moderator" as const,
    name: "Moderator User",
  },
]

export const signUp = async (email: string, password: string, role = "creator") => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check if user already exists
  const existingUser = mockUsers.find((user) => user.email === email.toLowerCase())
  if (existingUser) {
    throw new Error("User already exists with this email")
  }

  // Hash password
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  // Create new user
  const newUser = {
    id: `user_${Date.now()}`,
    email: email.toLowerCase(),
    password_hash: passwordHash,
    role: role as "creator" | "admin" | "moderator",
    name: email.split("@")[0],
  }

  // Add to mock database
  mockUsers.push(newUser)

  return {
    user: {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      name: newUser.name,
    },
  }
}

export const signIn = async (email: string, password: string) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Get user from mock database
  const user = mockUsers.find((u) => u.email === email.toLowerCase())

  if (!user) {
    throw new Error("Invalid email or password")
  }

  // For demo purposes, accept "password123" for all users
  const isValidPassword = password === "password123" || (await bcrypt.compare(password, user.password_hash))

  if (!isValidPassword) {
    throw new Error("Invalid email or password")
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
  }
}

export const signOut = async () => {
  // Clear any stored session data
  if (typeof window !== "undefined") {
    localStorage.removeItem("vedo_user")
    sessionStorage.removeItem("vedo_user")
  }
}

export const getCurrentUser = async (): Promise<User | null> => {
  // Get user from local storage or session storage
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("vedo_user") || sessionStorage.getItem("vedo_user")
    if (storedUser) {
      try {
        return JSON.parse(storedUser)
      } catch {
        return null
      }
    }
  }
  return null
}

export const getUserRole = async (userId: string) => {
  const user = mockUsers.find((u) => u.id === userId)
  return user?.role || "creator"
}

export const storeUserSession = (user: User, remember = false) => {
  if (typeof window !== "undefined") {
    const storage = remember ? localStorage : sessionStorage
    storage.setItem("vedo_user", JSON.stringify(user))
  }
}

export const clearUserSession = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("vedo_user")
    sessionStorage.removeItem("vedo_user")
  }
}
