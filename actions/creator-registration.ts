"use server"

import { createServerClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export interface CreatorRegistrationData {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    nationalId: string
    dateOfBirth: string
    address: string
  }
  creatorInfo: {
    creatorName: string
    bio: string
    contentType: string
    primaryPlatform: string
    websiteUrl: string
    socialMedia: {
      facebook: string
      twitter: string
      instagram: string
      youtube: string
      tiktok: string
    }
  }
  verification: {
    agreesToTerms: boolean
    agreesToIPPolicy: boolean
  }
}

export async function submitCreatorRegistration(formData: CreatorRegistrationData) {
  const supabase = createServerClient()

  try {
    // Generate a temporary password for the user
    const tempPassword = "temp_" + Math.random().toString(36).substring(7)

    // Hash the password
    const bcrypt = require("bcryptjs")
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(tempPassword, saltRounds)

    // Insert user record directly
    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert({
        email: formData.personalInfo.email,
        password_hash: passwordHash,
        role: "creator",
      })
      .select()
      .single()

    if (userError) {
      throw new Error(`User creation error: ${userError.message}`)
    }

    // Insert content creator record
    const { data: creatorData, error: creatorError } = await supabase
      .from("content_creators")
      .insert({
        user_id: userData.id,
        first_name: formData.personalInfo.firstName,
        last_name: formData.personalInfo.lastName,
        email: formData.personalInfo.email,
        phone: formData.personalInfo.phone,
        national_id: formData.personalInfo.nationalId,
        date_of_birth: formData.personalInfo.dateOfBirth,
        address: formData.personalInfo.address,
        creator_name: formData.creatorInfo.creatorName,
        bio: formData.creatorInfo.bio,
        content_type: formData.creatorInfo.contentType,
        primary_platform: formData.creatorInfo.primaryPlatform,
        website_url: formData.creatorInfo.websiteUrl,
        facebook_url: formData.creatorInfo.socialMedia.facebook,
        twitter_url: formData.creatorInfo.socialMedia.twitter,
        instagram_url: formData.creatorInfo.socialMedia.instagram,
        youtube_url: formData.creatorInfo.socialMedia.youtube,
        tiktok_url: formData.creatorInfo.socialMedia.tiktok,
        terms_agreed: formData.verification.agreesToTerms,
        ip_policy_agreed: formData.verification.agreesToIPPolicy,
        verification_status: "pending",
      })
      .select()
      .single()

    if (creatorError) {
      throw new Error(`Creator registration error: ${creatorError.message}`)
    }

    // Log the registration
    await supabase.from("system_logs").insert({
      action_type: "registration",
      description: `New creator registration: ${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`,
      user_id: userData.id,
      creator_id: creatorData.id,
      metadata: {
        content_type: formData.creatorInfo.contentType,
        primary_platform: formData.creatorInfo.primaryPlatform,
        temp_password: tempPassword, // Store temp password for admin to share
      },
    })

    revalidatePath("/admin")

    return {
      success: true,
      message: `Registration submitted successfully! Your temporary password is: ${tempPassword}. Please change it after your first login.`,
      vedoId: creatorData.vedo_id,
      tempPassword: tempPassword,
    }
  } catch (error: any) {
    console.error("Registration error:", error)
    return {
      success: false,
      message: error.message || "Registration failed. Please try again.",
    }
  }
}

export async function getCreatorByVedoId(vedoId: string) {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("content_creators")
    .select(`
      *,
      content_submissions (
        id,
        title,
        platform,
        views_count,
        engagement_count,
        verification_status,
        published_at
      )
    `)
    .eq("vedo_id", vedoId)
    .eq("verification_status", "verified")
    .single()

  if (error) {
    return null
  }

  return data
}

export async function searchCreator(query: string) {
  const supabase = createServerClient()

  // Try to find by VEDO ID first
  let { data, error } = await supabase
    .from("content_creators")
    .select("*")
    .eq("vedo_id", query.toUpperCase())
    .eq("verification_status", "verified")
    .single()

  if (!data && !error) {
    // Try to find by email
    const result = await supabase
      .from("content_creators")
      .select("*")
      .eq("email", query.toLowerCase())
      .eq("verification_status", "verified")
      .single()

    data = result.data
    error = result.error
  }

  if (!data && !error) {
    // Try to find by creator name
    const result = await supabase
      .from("content_creators")
      .select("*")
      .ilike("creator_name", `%${query}%`)
      .eq("verification_status", "verified")
      .single()

    data = result.data
    error = result.error
  }

  if (!data && !error) {
    // Try to find by website URL
    const result = await supabase
      .from("content_creators")
      .select("*")
      .ilike("website_url", `%${query}%`)
      .eq("verification_status", "verified")
      .single()

    data = result.data
    error = result.error
  }

  return data
}
