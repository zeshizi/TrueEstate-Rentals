"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertCircle, Settings } from "lucide-react"
import Link from "next/link"

export function AuthStatus() {
  const { data: session, status } = useSession()

  const authConfig = {
    googleClientId: !!process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    nextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    nextAuthUrl: !!process.env.NEXTAUTH_URL,
  }

  const allConfigured = Object.values(authConfig).every(Boolean)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Authentication Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Session Status</span>
            <Badge variant={status === "authenticated" ? "default" : "outline"}>
              {status === "loading" ? "Loading..." : status === "authenticated" ? "Authenticated" : "Not Authenticated"}
            </Badge>
          </div>

          {session && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm">User Role</span>
                <Badge variant="outline">{session.user.role}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Subscription</span>
                <Badge variant="outline">{session.user.subscription.plan}</Badge>
              </div>
            </>
          )}

          <div className="border-t pt-3 space-y-2">
            <h4 className="font-medium text-sm">OAuth Configuration</h4>
            {Object.entries(authConfig).map(([key, configured]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm">
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                </span>
                <div className="flex items-center gap-1">
                  {configured ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                  <span className="text-xs">{configured ? "OK" : "Missing"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {!allConfigured && (
          <div className="bg-yellow-50 p-3 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-900">Setup Required</p>
                <p className="text-yellow-800">Some OAuth configuration is missing.</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/auth/setup">Setup Guide</Link>
          </Button>
          {!session && (
            <Button size="sm" asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
