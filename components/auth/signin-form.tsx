"use client"

import type React from "react"

import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Building2, Mail, Lock, Chrome } from "lucide-react"

export function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    console.log("Attempting sign in with:", email)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      console.log("Sign in result:", {
        ok: result?.ok,
        error: result?.error,
        status: result?.status,
        url: result?.url,
      })

      if (result?.error) {
        console.error("Sign in error:", result.error)
        setError(`Sign in failed: ${result.error}. Use 'demo' as password for any email.`)
      } else if (result?.ok) {
        console.log("Sign in successful, getting session...")
        const session = await getSession()
        console.log("Session after sign in:", {
          user: session?.user?.email,
          role: session?.user?.role,
          expires: session?.expires,
        })

        if (session?.user?.role === "admin") {
          console.log("Redirecting to admin")
          router.push("/admin")
        } else {
          console.log("Redirecting to home")
          router.push("/")
        }
      } else {
        setError("Unknown error occurred during sign in")
      }
    } catch (error) {
      console.error("Sign in exception:", error)
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Building2 className="h-12 w-12 text-gray-900" />
          </div>
          <CardTitle className="text-2xl font-bold">Sign in to TrueEstate</CardTitle>
          <p className="text-gray-600">Access your wealth insights dashboard</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <Button variant="outline" onClick={handleGoogleSignIn} className="w-full">
            <Chrome className="h-5 w-5 mr-2" />
            Sign in with Google
          </Button>

          <div className="bg-blue-50 p-4 rounded-lg text-sm">
            <div className="font-medium text-blue-900 mb-2">Demo Credentials:</div>
            <div className="text-blue-800 space-y-1">
              <div>• Email: admin@trueestate.com (Admin access)</div>
              <div>• Email: user@trueestate.com (User access)</div>
              <div>• Password: demo (for any email)</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
