/**
 * Front-end ONLY mock of the Supabase client.
 *
 * It fulfils the minimal surface that the rest of the app expects
 * (auth helpers + dumb query builder) without ever contacting a backend.
 */
type SupabaseResponse<T> = Promise<{ data: T; error: null }>

interface Session {
  user: { id: string; email: string }
}

type AuthChangeHandler = (event: string, session: Session | null) => void

class MockAuth {
  // ------------------------------------------------------------------ state
  private user: Session["user"] | null = null
  private listeners: Set<AuthChangeHandler> = new Set()

  // ----------------------------------------------------------- event helpers
  private emit(event: "SIGNED_IN" | "SIGNED_OUT") {
    const session = this.user ? { user: this.user } : null
    this.listeners.forEach((cb) => cb(event, session))
  }

  // -------------------------------------------------------------- api match
  async signInWithPassword({
    email,
    password,
  }: {
    email: string
    password: string
  }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _pwd = password // we never validate in the mock
    this.user = { id: `user-${Date.now()}`, email }
    this.emit("SIGNED_IN")
    return { data: { user: this.user }, error: null }
  }

  async signUp({
    email,
    password,
    options,
  }: {
    email: string
    password: string
    options?: { data?: Record<string, unknown> }
  }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _unused = password || options
    this.user = { id: `user-${Date.now()}`, email }
    this.emit("SIGNED_IN")
    return { data: { user: this.user }, error: null }
  }

  async signOut() {
    this.user = null
    this.emit("SIGNED_OUT")
    return { error: null }
  }

  async getSession(): SupabaseResponse<{ session: Session | null }> {
    return { data: { session: this.user ? { user: this.user } : null }, error: null }
  }

  /**
   * Mimics `supabase.auth.onAuthStateChange`.
   * Returns `{ data: { subscription } }` where subscription has `unsubscribe`.
   */
  onAuthStateChange(callback: AuthChangeHandler) {
    this.listeners.add(callback)
    // Immediately fire the current state so UI gets initial user (like real SDK)
    callback(this.user ? "SIGNED_IN" : "SIGNED_OUT", this.user ? { user: this.user } : null)

    const subscription = {
      unsubscribe: () => this.listeners.delete(callback),
    }

    return { data: { subscription }, error: null }
  }
}

class MockQueryBuilder {
  // Chainable no-ops for `.select().eq().single()…`
  select() {
    return this
  }
  insert() {
    return this
  }
  update() {
    return this
  }
  delete() {
    return this
  }
  eq() {
    return this
  }
  single() {
    return Promise.resolve({ data: null, error: null })
  }
}

export const supabase = {
  auth: new MockAuth(),
  from(_table: string) {
    return new MockQueryBuilder()
  },
}
