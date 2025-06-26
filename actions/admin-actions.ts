"use server"

import { createServerClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function getPendingApplications() {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("content_creators")
    .select("*")
    .in("verification_status", ["pending", "pending_review", "under_review", "pending_documents"])
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch applications: ${error.message}`)
  }

  return data
}

export async function getSystemStats() {
  const supabase = createServerClient()

  // Get total creators
  const { count: totalCreators } = await supabase.from("content_creators").select("*", { count: "exact", head: true })

  // Get pending applications
  const { count: pendingApplications } = await supabase
    .from("content_creators")
    .select("*", { count: "exact", head: true })
    .in("verification_status", ["pending", "pending_review", "under_review"])

  // Get verified content
  const { count: verifiedContent } = await supabase
    .from("content_submissions")
    .select("*", { count: "exact", head: true })
    .eq("verification_status", "verified")

  // Get flagged content
  const { count: flaggedContent } = await supabase
    .from("content_flags")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending")

  // Get monthly registrations (current month)
  const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM format
  const { count: monthlyRegistrations } = await supabase
    .from("content_creators")
    .select("*", { count: "exact", head: true })
    .gte("created_at", `${currentMonth}-01`)
    .lt("created_at", `${currentMonth}-32`)

  // Get active creators (verified)
  const { count: activeCreators } = await supabase
    .from("content_creators")
    .select("*", { count: "exact", head: true })
    .eq("verification_status", "verified")

  return {
    totalCreators: totalCreators || 0,
    pendingApplications: pendingApplications || 0,
    verifiedContent: verifiedContent || 0,
    flaggedContent: flaggedContent || 0,
    monthlyRegistrations: monthlyRegistrations || 0,
    activeCreators: activeCreators || 0,
  }
}

export async function approveCreatorApplication(creatorId: string, adminUserId: string) {
  const supabase = createServerClient()

  try {
    // Update creator status
    const { data: creatorData, error: updateError } = await supabase
      .from("content_creators")
      .update({
        verification_status: "verified",
        verification_date: new Date().toISOString(),
        verification_level: "bronze", // Default level
      })
      .eq("id", creatorId)
      .select()
      .single()

    if (updateError) {
      throw new Error(`Failed to approve application: ${updateError.message}`)
    }

    // Log the approval
    await supabase.from("system_logs").insert({
      action_type: "approval",
      description: `Application approved for ${creatorData.first_name} ${creatorData.last_name}`,
      user_id: adminUserId,
      creator_id: creatorId,
      metadata: {
        verification_level: "bronze",
        approved_by: adminUserId,
      },
    })

    revalidatePath("/admin")

    return {
      success: true,
      message: "Application approved successfully!",
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to approve application",
    }
  }
}

export async function rejectCreatorApplication(creatorId: string, adminUserId: string, reason: string) {
  const supabase = createServerClient()

  try {
    // Update creator status
    const { data: creatorData, error: updateError } = await supabase
      .from("content_creators")
      .update({
        verification_status: "rejected",
      })
      .eq("id", creatorId)
      .select()
      .single()

    if (updateError) {
      throw new Error(`Failed to reject application: ${updateError.message}`)
    }

    // Log the rejection
    await supabase.from("system_logs").insert({
      action_type: "rejection",
      description: `Application rejected for ${creatorData.first_name} ${creatorData.last_name}`,
      user_id: adminUserId,
      creator_id: creatorId,
      metadata: {
        rejection_reason: reason,
        rejected_by: adminUserId,
      },
    })

    revalidatePath("/admin")

    return {
      success: true,
      message: "Application rejected successfully!",
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to reject application",
    }
  }
}

export async function getRecentActivity() {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("system_logs")
    .select(`
      *,
      users!system_logs_user_id_fkey (email),
      content_creators!system_logs_creator_id_fkey (first_name, last_name, creator_name)
    `)
    .order("created_at", { ascending: false })
    .limit(10)

  if (error) {
    throw new Error(`Failed to fetch activity: ${error.message}`)
  }

  return data
}
