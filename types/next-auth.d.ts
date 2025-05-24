declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      image?: string
      role: "user" | "agent" | "admin"
      subscription: {
        plan: "free" | "basic" | "premium" | "enterprise"
        status: "active" | "inactive" | "cancelled"
        features: string[]
      }
      userId: string
    }
  }

  interface User {
    role?: "user" | "agent" | "admin"
    subscription?: {
      plan: "free" | "basic" | "premium" | "enterprise"
      status: "active" | "inactive" | "cancelled"
      features: string[]
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string
    subscription?: any
    userId?: string
  }
}
