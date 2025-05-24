"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertCircle, RefreshCw, TestTube, Chrome } from "lucide-react"

export function AuthStatusEnhanced() {
  const { data: session, status } = useSession()
  const [envStatus, setEnvStatus] = useState<any>(null)
  const [testing, setTesting] = useState(false)

  useEffect(() => {
    checkEnvironmentStatus()
  }, [])

  const checkEnvironmentStatus = async () => {
    try {
      const response = await fetch("/api/environment-setup")
      const data = await response.json()
      setEnvStatus(data)
    } catch (error) {
      console.error("Failed to check environment status:", error)
    }
  }

  const testGoogleAuth = async () => {
    setTesting(true)
    try {
      // This will test if Google OAuth is properly configured
      const { signIn } = await import("next-auth/react")
      await signIn("google", { callbackUrl: "/auth/success" })
    } catch (error) {
      console.error("Google auth test failed:", error)
    } finally {
      setTesting(false)
    }
  }

  const isGoogleConfigured = envStatus?.required?.GOOGLE_CLIENT_ID && envStatus?.required?.GOOGLE_CLIENT_SECRET

  return (
    <div className="space-y-6">
      {/* Current Session */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5" />
            Authentication Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold mb-2">
                {status === "authenticated" ? (
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto" />
                ) : (
                  <XCircle className="h-8 w-8 text-red-600 mx-auto" />
                )}
              </div>
              <div className="text-sm font-medium">Session Status</div>
              <Badge variant={status === "authenticated" ? "default" : "outline"}>{status}</Badge>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold mb-2">
                {isGoogleConfigured ? (
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto" />
                ) : (
                  <AlertCircle className="h-8 w-8 text-yellow-600 mx-auto" />
                )}
              </div>
              <div className="text-sm font-medium">Google OAuth</div>
              <Badge variant={isGoogleConfigured ? "default" : "destructive"}>
                {isGoogleConfigured ? "Ready" : "Setup Needed"}
              </Badge>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold mb-2">
                {session?.user?.role ? (
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto" />
                ) : (
                  <XCircle className="h-8 w-8 text-gray-400 mx-auto" />
                )}
              </div>
              <div className="text-sm font-medium">User Role</div>
              <Badge variant="outline">{session?.user?.role || "None"}</Badge>
            </div>
          </div>

          {session && (
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">✅ Authenticated Successfully!</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-green-800">
                <div>
                  <strong>Name:</strong> {session.user.name}
                </div>
                <div>
                  <strong>Email:</strong> {session.user.email}
                </div>
                <div>
                  <strong>Role:</strong> {session.user.role}
                </div>
                <div>
                  <strong>Plan:</strong> {session.user.subscription?.plan}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Google OAuth Test */}
      {isGoogleConfigured && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Chrome className="h-5 w-5" />
              Google OAuth Test
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">🎉 Google OAuth is Configured!</h4>
              <p className="text-blue-800 text-sm mb-3">
                Your Google Client ID and Secret are properly set. You can now test Google authentication.
              </p>
              <Button onClick={testGoogleAuth} disabled={testing} className="w-full">
                <Chrome className="h-4 w-4 mr-2" />
                {testing ? "Testing..." : "Test Google Sign-In"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Environment Variables Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Environment Variables</span>
            <Button variant="ghost" size="sm" onClick={checkEnvironmentStatus}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {envStatus ? (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(envStatus.required || {}).map(([key, configured]) => (
                  <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">{key}</span>
                    <Badge variant={configured ? "default" : "destructive"}>{configured ? "✓ Set" : "✗ Missing"}</Badge>
                  </div>
                ))}
              </div>

              {envStatus.recommendations?.length > 0 && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Setup needed:</strong> {envStatus.recommendations.join(", ")}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="outline" asChild>
          <a href="/auth/credentials">View Credentials</a>
        </Button>
        <Button variant="outline" asChild>
          <a href="/auth/test">Run Full Tests</a>
        </Button>
        <Button asChild>
          <a href="/auth/signin">Try Sign In</a>
        </Button>
      </div>
    </div>
  )
}
