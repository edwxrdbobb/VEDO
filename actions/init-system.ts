"use server"

import { initializeDemoUsers, checkDemoUsersExist } from "@/lib/init-demo-users"

export async function initializeSystem() {
  try {
    console.log("🔧 Initializing VEDO system...")

    // Validate environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      throw new Error("NEXT_PUBLIC_SUPABASE_URL is not configured")
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured")
    }

    // Check if demo users already exist
    const usersExist = await checkDemoUsersExist()

    if (!usersExist) {
      console.log("👥 Creating demo users...")
      await initializeDemoUsers()
    } else {
      console.log("ℹ️  Demo users already exist, skipping initialization")
    }

    return {
      success: true,
      message: "System initialized successfully!",
    }
  } catch (error: any) {
    console.error("❌ System initialization failed:", error)
    return {
      success: false,
      message: error.message || "System initialization failed",
    }
  }
}

export async function getSystemStatus() {
  try {
    // Validate environment variables first
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return {
        initialized: false,
        demoUsersCount: 0,
        error: "NEXT_PUBLIC_SUPABASE_URL is not configured in environment variables",
      }
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return {
        initialized: false,
        demoUsersCount: 0,
        error: "SUPABASE_SERVICE_ROLE_KEY is not configured in environment variables",
      }
    }

    const usersExist = await checkDemoUsersExist()

    return {
      initialized: usersExist,
      demoUsersCount: usersExist ? 5 : 0,
    }
  } catch (error: any) {
    console.error("Error checking system status:", error)
    return {
      initialized: false,
      demoUsersCount: 0,
      error: `Failed to check system status: ${error.message}`,
    }
  }
}
