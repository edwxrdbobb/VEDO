// Mock Supabase client for frontend-only operation
class MockSupabaseAuth {
  private listeners: Array<(event: string, session: any) => void> = []
  private currentSession: any = null

  onAuthStateChange(callback: (event: string, session: any) => void) {
    this.listeners.push(callback)

    // Immediately call with current session
    setTimeout(() => {
      callback("INITIAL_SESSION", this.currentSession)
    }, 0)

    return {
      data: {
        subscription: {
          unsubscribe: () => {
            const index = this.listeners.indexOf(callback)
            if (index > -1) {
              this.listeners.splice(index, 1)
            }
          },
        },
      },
    }
  }

  async getSession() {
    return {
      data: {
        session: this.currentSession,
      },
      error: null,
    }
  }

  async signInWithPassword({ email, password }: { email: string; password: string }) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data
    const mockUser = {
      id: "123",
      email,
      user_metadata: { role: "creator" },
    }

    this.currentSession = {
      user: mockUser,
      access_token: "mock-token",
    }

    // Emit sign in event
    this.listeners.forEach((callback) => {
      callback("SIGNED_IN", this.currentSession)
    })

    return {
      data: {
        user: mockUser,
        session: this.currentSession,
      },
      error: null,
    }
  }

  async signUp({ email, password }: { email: string; password: string }) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      data: {
        user: { id: "123", email },
        session: null,
      },
      error: null,
    }
  }

  async signOut() {
    this.currentSession = null

    // Emit sign out event
    this.listeners.forEach((callback) => {
      callback("SIGNED_OUT", null)
    })

    return { error: null }
  }
}

class MockSupabaseClient {
  auth = new MockSupabaseAuth()

  from(table: string) {
    return {
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: null, error: null }),
        }),
      }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => Promise.resolve({ data: null, error: null }),
      delete: () => Promise.resolve({ data: null, error: null }),
    }
  }

  storage = {
    from: () => ({
      upload: () => Promise.resolve({ data: null, error: null }),
      getPublicUrl: () => ({ data: { publicUrl: "" } }),
    }),
  }
}

export const supabase = new MockSupabaseClient()
