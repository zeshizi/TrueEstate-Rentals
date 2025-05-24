"use client"

import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

export function AuthDebug() {
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testCredentials = async () => {
    setLoading(true)
    try {
      console.log("Testing credentials...")

      const result = await signIn("credentials", {
        email: "admin@trueestate.com",
        password: "demo",
        redirect: false,
      })

      console.log("Sign in result:", result)

      const session = await getSession()
      console.log("Session:", session)

      setDebugInfo({
        signInResult: result,
        session: session,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error("Auth error:", error)
      setDebugInfo({
        error: error,
        timestamp: new Date().toISOString(),
      })
    } finally {
      setLoading(false)
    }
  }

  const testSession = async () => {
    const session = await getSession()
    console.log("Current session:", session)
    setDebugInfo({
      currentSession: session,
      timestamp: new Date().toISOString(),
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Authentication Debug Tool</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button onClick={testCredentials} disabled={loading}>
              {loading ? "Testing..." : "Test Admin Login"}
            </Button>
            <Button variant="outline" onClick={testSession}>
              Check Current Session
            </Button>
          </div>

          {debugInfo && (
            <Alert>
              <AlertDescription>
                <pre className="text-xs overflow-auto">{JSON.stringify(debugInfo, null, 2)}</pre>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Environment Check</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Badge variant={process.env.NEXTAUTH_URL ? "default" : "destructive"}>
                NEXTAUTH_URL: {process.env.NEXTAUTH_URL ? "Set" : "Missing"}
              </Badge>
            </div>
            <div>
              <Badge variant={process.env.NEXTAUTH_SECRET ? "default" : "destructive"}>
                NEXTAUTH_SECRET: {process.env.NEXTAUTH_SECRET ? "Set" : "Missing"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
