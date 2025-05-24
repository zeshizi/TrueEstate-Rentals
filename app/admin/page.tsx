"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Header } from "@/components/header"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { AuthStatus } from "@/components/auth/auth-status"

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return // Still loading

    if (!session) {
      console.log("❌ No session found, redirecting to sign in")
      router.push("/auth/signin")
      return
    }

    if (session.user.role !== "admin") {
      console.log("🚫 User is not admin, redirecting to home")
      router.push("/")
      return
    }

    console.log("✅ Admin access granted for:", session.user.email)
  }, [session, status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session || session.user.role !== "admin") {
    return null
  }

  // Ensure subscription exists with defaults
  const userWithDefaults = {
    ...session.user,
    subscription: session.user.subscription || {
      plan: "enterprise",
      status: "active",
      features: ["all_access", "admin_panel", "analytics", "api_access"],
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage the TrueEstate platform and monitor system health</p>
          <div className="mt-2 text-sm text-gray-500">
            Welcome, {userWithDefaults.email} | Plan: {userWithDefaults.subscription.plan}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-1">
            <AuthStatus />
          </div>
          <div className="lg:col-span-3">
            <AdminDashboard />
          </div>
        </div>
      </div>
    </div>
  )
}
