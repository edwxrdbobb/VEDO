import { mockAuth, type MockUser } from "./mock-data"

export interface User {
  id: string
  email: string
  role: "creator" | "admin" | "moderator"
}

export const signUp = async (email: string, password: string, role = "creator") => {
  // Mock implementation - in real app this would call the backend
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const newUser: MockUser = {
    id: `user-${Date.now()}`,
    email,
    password,
    role: role as any,
  }

  return { user: newUser }
}

export const signIn = async (email: string, password: string) => {
  const user = await mockAuth.signIn(email, password)
  return { user }
}

export const signOut = async () => {
  await mockAuth.signOut()
}

export const getCurrentUser = async () => {
  return mockAuth.currentUser
}

export const getUserRole = async (userId: string) => {
  const user = mockAuth.currentUser
  return user?.role || "creator"
}
