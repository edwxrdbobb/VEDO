import { createServerClient } from "./supabase"

interface DemoUser {
  id: string
  email: string
  password: string
  role: "admin" | "creator" | "moderator"
  profile?: {
    firstName?: string
    lastName?: string
    creatorName?: string
  }
}

const DEMO_USERS: DemoUser[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    email: "admin@vedo.gov.sl",
    password: "admin123",
    role: "admin",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    email: "sarah@techsarah.com",
    password: "sarah123",
    role: "creator",
    profile: {
      firstName: "Sarah",
      lastName: "Kamara",
      creatorName: "TechSarah",
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    email: "mohamed@slblogger.com",
    password: "mohamed123",
    role: "creator",
    profile: {
      firstName: "Mohamed",
      lastName: "Sesay",
      creatorName: "SL_Blogger",
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    email: "fatima@fashionfreetown.com",
    password: "fatima123",
    role: "creator",
    profile: {
      firstName: "Fatima",
      lastName: "Koroma",
      creatorName: "FashionFreetown",
    },
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    email: "moderator@vedo.gov.sl",
    password: "moderator123",
    role: "moderator",
  },
]

export async function initializeDemoUsers() {
  const supabase = createServerClient()

  console.log("🚀 Initializing demo users...")

  for (const user of DEMO_USERS) {
    try {
      // Check if user already exists in auth.users
      const { data: existingAuthUser } = await supabase.auth.admin.getUserById(user.id)

      if (!existingAuthUser.user) {
        // Create user in Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          user_id: user.id,
          email: user.email,
          password: user.password,
          email_confirm: true,
          user_metadata: {
            role: user.role,
            ...user.profile,
          },
        })

        if (authError) {
          console.error(`❌ Failed to create auth user ${user.email}:`, authError.message)
          continue
        }

        console.log(`✅ Created auth user: ${user.email}`)
      } else {
        console.log(`ℹ️  Auth user already exists: ${user.email}`)
      }

      // Check if user exists in users table
      const { data: existingUser, error: checkError } = await supabase
        .from("users")
        .select("id")
        .eq("id", user.id)
        .single()

      if (checkError && checkError.code === "PGRST116") {
        // User doesn't exist in users table, create it
        const { error: userError } = await supabase.from("users").insert({
          id: user.id,
          email: user.email,
          role: user.role,
        })

        if (userError) {
          console.error(`❌ Failed to create user record ${user.email}:`, userError.message)
          continue
        }

        console.log(`✅ Created user record: ${user.email}`)
      } else if (!checkError) {
        console.log(`ℹ️  User record already exists: ${user.email}`)
      }

      // For creators, check if content_creator record exists
      if (user.role === "creator" && user.profile) {
        const { data: existingCreator, error: creatorCheckError } = await supabase
          .from("content_creators")
          .select("id")
          .eq("user_id", user.id)
          .single()

        if (creatorCheckError && creatorCheckError.code === "PGRST116") {
          // Creator doesn't exist, create it
          const { error: creatorError } = await supabase.from("content_creators").insert({
            user_id: user.id,
            first_name: user.profile.firstName || "Demo",
            last_name: user.profile.lastName || "User",
            email: user.email,
            phone: "+232-XX-XXX-XXXX",
            national_id: `SL-ID-${user.id.slice(-6)}`,
            date_of_birth: "1990-01-01",
            address: "Freetown, Sierra Leone",
            creator_name: user.profile.creatorName || "Demo Creator",
            bio: `Demo creator account for ${user.email}`,
            content_type: "Technology",
            primary_platform: "Website",
            website_url: `https://${user.profile.creatorName?.toLowerCase()}.com`,
            verification_status: user.email === "sarah@techsarah.com" ? "verified" : "pending",
            verification_level: user.email === "sarah@techsarah.com" ? "gold" : "bronze",
            verification_date: user.email === "sarah@techsarah.com" ? new Date().toISOString() : null,
            terms_agreed: true,
            ip_policy_agreed: true,
          })

          if (creatorError) {
            console.error(`❌ Failed to create creator record ${user.email}:`, creatorError.message)
            continue
          }

          console.log(`✅ Created creator record: ${user.email}`)
        } else if (!creatorCheckError) {
          console.log(`ℹ️  Creator record already exists: ${user.email}`)
        }
      }
    } catch (error) {
      console.error(`❌ Error processing user ${user.email}:`, error)
    }
  }

  console.log("🎉 Demo user initialization complete!")
}

export async function checkDemoUsersExist(): Promise<boolean> {
  const supabase = createServerClient()

  try {
    const { data, error } = await supabase
      .from("users")
      .select("email")
      .in(
        "email",
        DEMO_USERS.map((u) => u.email),
      )

    if (error) {
      console.error("Error checking demo users:", error)
      return false
    }

    return data.length === DEMO_USERS.length
  } catch (error) {
    console.error("Error checking demo users:", error)
    return false
  }
}

export function getDemoCredentials() {
  return DEMO_USERS.map((user) => ({
    email: user.email,
    password: user.password,
    role: user.role,
  }))
}
