"use client"

import type React from "react"

import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react"

export function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      console.log("🔐 Attempting sign in with:", email)

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      console.log("📋 Sign in result:", JSON.stringify(result, null, 2))

      if (result?.error) {
        setError(result.error)
        console.log("❌ Sign in error:", result.error)
      } else if (result?.ok) {
        console.log("✅ Sign in successful, getting session...")

        // Get the session to check user role
        const session = await getSession()
        console.log(
          "👤 Session after sign in:",
          JSON.stringify(
            {
              email: session?.user?.email,
              role: session?.user?.role,
              subscription: session?.user?.subscription,
              expires: session?.expires,
            },
            null,
            2,
          ),
        )

        // Redirect based on role
        if (session?.user?.role === "admin") {
          console.log("🔑 Redirecting to admin dashboard")
          router.push("/admin")
        } else {
          console.log("🏠 Redirecting to home")
          router.push("/")
        }
      }
    } catch (error) {
      console.error("💥 Sign in error:", error)
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
        <p className="text-sm text-gray-600 text-center">Enter your credentials to access TrueEstate</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 space-y-3">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Demo Accounts</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 text-xs">
            <div className="p-2 bg-gray-50 rounded">
              <strong>Admin:</strong> admin@trueestate.com / demo
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <strong>User:</strong> user@trueestate.com / demo
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <strong>Agent:</strong> agent@trueestate.com / demo
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
