"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Copy, CheckCircle, AlertCircle } from "lucide-react"
import { useState } from "react"

export function OAuthSetupGuide() {
  const [copiedText, setCopiedText] = useState("")

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(label)
    setTimeout(() => setCopiedText(""), 2000)
  }

  const currentDomain = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"
  const productionDomain = "https://your-app-name.vercel.app" // Replace with actual domain

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            Google OAuth Setup Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Step 1: Google Cloud Console</h3>
            <p className="text-blue-800 text-sm mb-3">
              Go to Google Cloud Console and navigate to APIs & Services → Credentials
            </p>
            <Button variant="outline" size="sm" asChild>
              <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Google Cloud Console
              </a>
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Step 2: Authorized JavaScript Origins</h3>
            <p className="text-sm text-gray-600">Add these URLs to your OAuth 2.0 Client ID configuration:</p>

            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">Development</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard("http://localhost:3000", "dev-origin")}
                  >
                    {copiedText === "dev-origin" ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <code className="text-sm bg-gray-100 p-2 rounded block">http://localhost:3000</code>
              </div>

              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">Production</Badge>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(productionDomain, "prod-origin")}>
                    {copiedText === "prod-origin" ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <code className="text-sm bg-gray-100 p-2 rounded block">{productionDomain}</code>
                <p className="text-xs text-gray-500 mt-1">Replace with your actual Vercel domain</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Step 3: Authorized Redirect URIs</h3>
            <p className="text-sm text-gray-600">Add these callback URLs:</p>

            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">Development</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard("http://localhost:3000/api/auth/callback/google", "dev-callback")}
                  >
                    {copiedText === "dev-callback" ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <code className="text-sm bg-gray-100 p-2 rounded block">
                  http://localhost:3000/api/auth/callback/google
                </code>
              </div>

              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">Production</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(`${productionDomain}/api/auth/callback/google`, "prod-callback")}
                  >
                    {copiedText === "prod-callback" ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <code className="text-sm bg-gray-100 p-2 rounded block">
                  {productionDomain}/api/auth/callback/google
                </code>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-900">Important Notes</h4>
                <ul className="text-yellow-800 text-sm mt-2 space-y-1">
                  <li>• Changes may take a few minutes to propagate</li>
                  <li>• Make sure to save your Client ID and Client Secret</li>
                  <li>• Test authentication in both development and production</li>
                  <li>• Update the production domain when you deploy</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Environment Variables</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">GOOGLE_CLIENT_ID</span>
                <Badge variant={process.env.GOOGLE_CLIENT_ID ? "default" : "destructive"}>
                  {process.env.GOOGLE_CLIENT_ID ? "Configured" : "Missing"}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">Your OAuth 2.0 Client ID from Google Cloud Console</p>
            </div>

            <div className="border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">GOOGLE_CLIENT_SECRET</span>
                <Badge variant={process.env.GOOGLE_CLIENT_SECRET ? "default" : "destructive"}>
                  {process.env.GOOGLE_CLIENT_SECRET ? "Configured" : "Missing"}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">Your OAuth 2.0 Client Secret from Google Cloud Console</p>
            </div>

            <div className="border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">NEXTAUTH_SECRET</span>
                <Badge variant="outline">Auto-generated</Badge>
              </div>
              <p className="text-sm text-gray-600">Random string for JWT encryption (auto-generated by Vercel)</p>
            </div>

            <div className="border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">NEXTAUTH_URL</span>
                <Badge variant="outline">Auto-detected</Badge>
              </div>
              <p className="text-sm text-gray-600">Your app URL (auto-detected by NextAuth.js)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
