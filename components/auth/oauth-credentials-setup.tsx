"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, CheckCircle, Key, ExternalLink, AlertTriangle } from "lucide-react"

export function OAuthCredentialsSetup() {
  const [copiedText, setCopiedText] = useState("")

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(label)
    setTimeout(() => setCopiedText(""), 2000)
  }

  const credentials = {
    clientId: "152465971264-k4qtsn0jdgg87rsjenra7ov9fm6t1ih5.apps.googleusercontent.com",
    clientSecret: "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",
  }

  return (
    <div className="space-y-6">
      <Alert>
        <Key className="h-4 w-4" />
        <AlertDescription>
          <strong>Google OAuth Credentials Ready!</strong> Add these to your environment variables to enable Google
          authentication.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Environment Variables Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Client ID */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">GOOGLE_CLIENT_ID</h3>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(credentials.clientId, "clientId")}>
                {copiedText === "clientId" ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <code className="text-sm break-all">{credentials.clientId}</code>
            </div>
          </div>

          {/* Client Secret */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">GOOGLE_CLIENT_SECRET</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(credentials.clientSecret, "clientSecret")}
              >
                {copiedText === "clientSecret" ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <code className="text-sm break-all">{credentials.clientSecret}</code>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-3">How to Add Environment Variables:</h4>

            <div className="space-y-4 text-sm text-blue-800">
              <div>
                <h5 className="font-medium mb-2">Option 1: Vercel Dashboard (Recommended)</h5>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>Go to your Vercel project dashboard</li>
                  <li>Navigate to Settings → Environment Variables</li>
                  <li>Add both variables with their values</li>
                  <li>Redeploy your application</li>
                </ol>
              </div>

              <div>
                <h5 className="font-medium mb-2">Option 2: Local Development (.env.local)</h5>
                <div className="bg-white p-3 rounded border">
                  <code className="text-xs">
                    GOOGLE_CLIENT_ID={credentials.clientId}
                    <br />
                    GOOGLE_CLIENT_SECRET={credentials.clientSecret}
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Current Status */}
          <div className="space-y-3">
            <h4 className="font-semibold">Current Configuration Status</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Google Client ID</span>
                  <Badge variant={process.env.GOOGLE_CLIENT_ID ? "default" : "destructive"}>
                    {process.env.GOOGLE_CLIENT_ID ? "✓ Configured" : "⚠ Not Set"}
                  </Badge>
                </div>
              </div>
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Google Client Secret</span>
                  <Badge variant={process.env.GOOGLE_CLIENT_SECRET ? "default" : "destructive"}>
                    {process.env.GOOGLE_CLIENT_SECRET ? "✓ Configured" : "⚠ Not Set"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Vercel Dashboard
              </a>
            </Button>
            <Button size="sm" asChild>
              <a href="/auth/test">Test Authentication →</a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Security Notice:</strong> These credentials are now visible in this chat. For production use, consider
          regenerating them in Google Cloud Console after testing.
        </AlertDescription>
      </Alert>

      {/* OAuth URLs Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>OAuth URLs Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">Required OAuth URLs in Google Cloud Console:</h4>
            <div className="space-y-3 text-sm text-yellow-800">
              <div>
                <h5 className="font-medium">Authorized JavaScript Origins:</h5>
                <div className="bg-white p-2 rounded border mt-1">
                  <code>http://localhost:3000</code>
                  <br />
                  <code>https://your-vercel-app.vercel.app</code>
                </div>
              </div>
              <div>
                <h5 className="font-medium">Authorized Redirect URIs:</h5>
                <div className="bg-white p-2 rounded border mt-1">
                  <code>http://localhost:3000/api/auth/callback/google</code>
                  <br />
                  <code>https://your-vercel-app.vercel.app/api/auth/callback/google</code>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
