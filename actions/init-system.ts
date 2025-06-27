"use server"

import { initializeDemoUsers, checkDemoUsersExist } from "@/lib/init-demo-users"

export async function initializeSystem() {
  try {
    console.log("🔧 Initializing VEDO system...")

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
    const usersExist = await checkDemoUsersExist()

    return {
      initialized: usersExist,
      demoUsersCount: usersExist ? 5 : 0,
    }
  } catch (error) {
    return {
      initialized: false,
      demoUsersCount: 0,
      error: "Failed to check system status",
    }
  }
}
