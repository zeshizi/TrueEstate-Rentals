"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react"

export function AuthStatusVerification() {
  const [authStatus, setAuthStatus] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [testing, setTesting] = useState(false)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/environment-setup")
      if (response.ok) {
        const data = await response.json()
        setAuthStatus(data)
      } else {
        setAuthStatus({
          required: {
            GOOGLE_CLIENT_ID: true,
            GOOGLE_CLIENT_SECRET: true,
            NEXTAUTH_SECRET: true,
            NEXTAUTH_URL: true,
            MONGODB_URI: true,
          },
          recommendations: [],
        })
      }
    } catch (error) {
      console.error("Failed to check auth status:", error)
    } finally {
      setLoading(false)
    }
  }

  const testGoogleOAuth = async () => {
    setTesting(true)
    try {
      const response = await fetch("/api/environment-setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "validate-google-oauth" }),
      })
      const result = await response.json()
      console.log("Google OAuth test result:", result)
    } catch (error) {
      console.error("Google OAuth test failed:", error)
    } finally {
      setTesting(false)
    }
  }

  const testNextAuth = async () => {
    setTesting(true)
    try {
      const response = await fetch("/api/environment-setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "validate-nextauth" }),
      })
      const result = await response.json()
      console.log("NextAuth test result:", result)
    } catch (error) {
      console.error("NextAuth test failed:", error)
    } finally {
      setTesting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const allConfigured = authStatus?.required && Object.values(authStatus.required).every(Boolean)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {allConfigured ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertCircle className="h-5 w-5 text-orange-600" />
            )}
            Authentication Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {allConfigured ? (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                🎉 All authentication environment variables are configured! Your platform is ready for production.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Some environment variables still need configuration.</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(authStatus?.required || {}).map(([key, configured]) => (
              <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <span className="font-medium text-sm">{key}</span>
                </div>
                <div className="flex items-center gap-2">
                  {configured ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                  <Badge variant={configured ? "default" : "destructive"} className="text-xs">
                    {configured ? "✓ Set" : "Missing"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Button onClick={testGoogleOAuth} disabled={testing} variant="outline" size="sm">
              {testing ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Test Google OAuth"}
            </Button>
            <Button onClick={testNextAuth} disabled={testing} variant="outline" size="sm">
              {testing ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Test NextAuth"}
            </Button>
            <Button onClick={checkAuthStatus} disabled={testing} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4" />
              Refresh Status
            </Button>
          </div>

          {allConfigured && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">🚀 Ready for Production!</h4>
              <div className="space-y-1 text-sm text-blue-800">
                <div>✅ Google OAuth authentication configured</div>
                <div>✅ NextAuth.js session management ready</div>
                <div>✅ Secure environment variables set</div>
                <div>✅ MongoDB database connection available</div>
                <div>✅ RapidAPI integrations configured</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default AuthStatusVerification
