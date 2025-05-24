"use client"

import { useState } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Chrome, User, Shield, LogOut, TestTube } from "lucide-react"

export function AuthTest() {
  const { data: session, status } = useSession()
  const [testResults, setTestResults] = useState<any>(null)
  const [testing, setTesting] = useState(false)

  const runAuthTests = async () => {
    setTesting(true)
    const results = {
      googleOAuth: false,
      credentialsAuth: false,
      sessionPersistence: false,
      roleBasedAccess: false,
      databaseIntegration: false,
    }

    try {
      // Test 1: Check if Google OAuth is configured
      results.googleOAuth = !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)

      // Test 2: Test credentials auth (if not already signed in)
      if (!session) {
        try {
          const credResult = await signIn("credentials", {
            email: "test@trueestate.com",
            password: "demo",
            redirect: false,
          })
          results.credentialsAuth = !credResult?.error
        } catch (error) {
          results.credentialsAuth = false
        }
      } else {
        results.credentialsAuth = true
      }

      // Test 3: Session persistence
      results.sessionPersistence = !!session

      // Test 4: Role-based access
      results.roleBasedAccess = !!session?.user?.role

      // Test 5: Database integration (check if user data is stored)
      if (session?.user?.email) {
        try {
          const response = await fetch(`/api/users/${session.user.email}`)
          results.databaseIntegration = response.ok
        } catch (error) {
          results.databaseIntegration = false
        }
      }

      setTestResults(results)
    } catch (error) {
      console.error("Auth test error:", error)
    } finally {
      setTesting(false)
    }
  }

  const testGoogleAuth = () => {
    signIn("google", { callbackUrl: window.location.href })
  }

  const testCredentialsAuth = () => {
    signIn("credentials", {
      email: "admin@trueestate.com",
      password: "demo",
      callbackUrl: window.location.href,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5" />
            Authentication Testing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Session Status */}
          <div className="space-y-3">
            <h3 className="font-semibold">Current Session</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              {status === "loading" && <p className="text-sm">Loading session...</p>}
              {status === "unauthenticated" && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Not authenticated</p>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={testCredentialsAuth}>
                      <User className="h-4 w-4 mr-2" />
                      Test Demo Login
                    </Button>
                    <Button size="sm" variant="outline" onClick={testGoogleAuth}>
                      <Chrome className="h-4 w-4 mr-2" />
                      Test Google OAuth
                    </Button>
                  </div>
                </div>
              )}
              {status === "authenticated" && session && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Authenticated Successfully!</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium">Name:</span> {session.user.name}
                    </div>
                    <div>
                      <span className="font-medium">Email:</span> {session.user.email}
                    </div>
                    <div>
                      <span className="font-medium">Role:</span> <Badge variant="outline">{session.user.role}</Badge>
                    </div>
                    <div>
                      <span className="font-medium">Plan:</span>{" "}
                      <Badge variant="outline">{session.user.subscription?.plan}</Badge>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => signOut()}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Test Suite */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Authentication Test Suite</h3>
              <Button onClick={runAuthTests} disabled={testing} size="sm">
                {testing ? "Running Tests..." : "Run Tests"}
              </Button>
            </div>

            {testResults && (
              <div className="space-y-2">
                {Object.entries(testResults).map(([test, passed]) => (
                  <div key={test} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">
                      {test
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())
                        .replace("O Auth", "OAuth")}
                    </span>
                    <Badge variant={passed ? "default" : "destructive"}>{passed ? "✓ Pass" : "✗ Fail"}</Badge>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Demo Accounts */}
          <div className="space-y-3">
            <h3 className="font-semibold">Demo Accounts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="border rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-red-600" />
                  <span className="font-medium">Admin Account</span>
                </div>
                <div className="text-sm space-y-1">
                  <div>Email: admin@trueestate.com</div>
                  <div>Password: demo</div>
                  <div className="text-gray-600">Access: Full admin dashboard</div>
                </div>
                <Button
                  size="sm"
                  className="mt-2 w-full"
                  onClick={() =>
                    signIn("credentials", {
                      email: "admin@trueestate.com",
                      password: "demo",
                      callbackUrl: "/admin",
                    })
                  }
                >
                  Sign In as Admin
                </Button>
              </div>

              <div className="border rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">User Account</span>
                </div>
                <div className="text-sm space-y-1">
                  <div>Email: user@trueestate.com</div>
                  <div>Password: demo</div>
                  <div className="text-gray-600">Access: Basic user features</div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2 w-full"
                  onClick={() =>
                    signIn("credentials", {
                      email: "user@trueestate.com",
                      password: "demo",
                      callbackUrl: "/",
                    })
                  }
                >
                  Sign In as User
                </Button>
              </div>
            </div>
          </div>

          {/* OAuth Status */}
          <div className="space-y-3">
            <h3 className="font-semibold">OAuth Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Google Client ID</span>
                  <Badge variant={process.env.GOOGLE_CLIENT_ID ? "default" : "destructive"}>
                    {process.env.GOOGLE_CLIENT_ID ? "✓ Set" : "✗ Missing"}
                  </Badge>
                </div>
              </div>
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Google Client Secret</span>
                  <Badge variant={process.env.GOOGLE_CLIENT_SECRET ? "default" : "destructive"}>
                    {process.env.GOOGLE_CLIENT_SECRET ? "✓ Set" : "✗ Missing"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Success Alert */}
      {session && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            🎉 Authentication is working! You're signed in as <strong>{session.user.name}</strong> with{" "}
            <strong>{session.user.role}</strong> access.
            {session.user.role === "admin" && (
              <>
                {" "}
                You can now access the{" "}
                <a href="/admin" className="underline">
                  admin dashboard
                </a>
                .
              </>
            )}
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
