import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

// Add Redis rate limiting
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "60 s"), // 5 login attempts per minute
  analytics: true,
})

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("🔐 Authorize called with:", { email: credentials?.email })

        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing credentials")
          return null
        }

        // Rate limiting for login attempts
        const identifier = `login:${credentials.email}`
        const { success, limit, reset, remaining } = await ratelimit.limit(identifier)

        if (!success) {
          console.log("🚫 Rate limit exceeded for:", credentials.email)
          throw new Error(`Too many login attempts. Try again in ${Math.round((reset - Date.now()) / 1000)} seconds.`)
        }

        console.log(`🔄 Rate limit: ${remaining}/${limit} attempts remaining`)

        // For demo purposes, we'll allow any email with password "demo"
        if (credentials.password === "demo") {
          console.log("✅ Demo login successful for:", credentials.email)
          const user = {
            id: credentials.email,
            email: credentials.email,
            name: credentials.email.split("@")[0],
            role: credentials.email.includes("admin") ? "admin" : "user",
          }
          console.log("👤 Returning user:", user)
          return user
        }

        console.log("❌ Invalid password for:", credentials.email)
        return null
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("🚪 SignIn callback:", { user: user?.email, account: account?.provider })

      // Always allow sign in for demo
      return true
    },
    async jwt({ token, user }) {
      console.log("🎫 JWT callback:", { tokenEmail: token.email, userEmail: user?.email })

      if (user) {
        token.role = user.role || (user.email?.includes("admin") ? "admin" : "user")
        token.userId = user.id
      }
      return token
    },
    async session({ session, token }) {
      console.log("📋 Session callback:", { sessionEmail: session.user?.email, tokenRole: token.role })

      if (session.user) {
        session.user.role = token.role as string
        session.user.userId = token.userId as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  debug: true, // Enable debug mode
}
