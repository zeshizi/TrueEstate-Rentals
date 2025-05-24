"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, CheckCircle, ExternalLink, MapPin, Key, RefreshCw } from "lucide-react"
import { useState, useEffect } from "react"

export function MapboxSetupGuide() {
  const [copiedText, setCopiedText] = useState("")
  const [mapboxStatus, setMapboxStatus] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkMapboxStatus()
  }, [])

  const checkMapboxStatus = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/mapbox/config")
      const data = await response.json()
      setMapboxStatus(data)
    } catch (error) {
      setMapboxStatus({
        configured: false,
        error: "Failed to check status",
        message: "Network error while checking configuration",
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(label)
    setTimeout(() => setCopiedText(""), 2000)
  }

  const sampleToken = "pk.eyJ1IjoidHJ1ZWVzdGF0ZSIsImEiOiJjbTVxdGZxZGcwMGNzMmxzYWRqZWZqZjVzIn0.KqQGXqOqJhKGvVhJhGJhGw"

  return (
    <div className="space-y-6">
      <Alert>
        <MapPin className="h-4 w-4" />
        <AlertDescription>
          <strong>Mapbox Integration Setup!</strong> Follow these steps to enable the interactive wealth map with
          professional mapping features.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Mapbox Access Token Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Get Token */}
          <div className="space-y-3">
            <h3 className="font-semibold">Step 1: Get Your Mapbox Access Token</h3>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800 text-sm mb-3">
                Mapbox provides 50,000 free map loads per month. Perfect for development and small-scale production.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href="https://account.mapbox.com/access-tokens/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Get Free Mapbox Token
                </a>
              </Button>
            </div>
          </div>

          {/* Step 2: Add to Environment */}
          <div className="space-y-3">
            <h3 className="font-semibold">Step 2: Add to Environment Variables</h3>
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">MAPBOX_ACCESS_TOKEN</span>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard("MAPBOX_ACCESS_TOKEN", "env-name")}>
                    {copiedText === "env-name" ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <code className="text-sm break-all">{sampleToken}</code>
                </div>
                <p className="text-xs text-gray-500 mt-2">Sample token for testing (replace with your own)</p>
              </div>
            </div>
          </div>

          {/* Step 3: Deployment */}
          <div className="space-y-3">
            <h3 className="font-semibold">Step 3: Add to Vercel</h3>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">Vercel Dashboard Method:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-800">
                <li>Go to your Vercel project dashboard</li>
                <li>Navigate to Settings → Environment Variables</li>
                <li>
                  Add: <code>MAPBOX_ACCESS_TOKEN</code>
                </li>
                <li>Set value to your Mapbox access token</li>
                <li>Redeploy your application</li>
              </ol>
            </div>
          </div>

          {/* Current Status */}
          <div className="space-y-3">
            <h3 className="font-semibold">Current Status</h3>
            <div className="border rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Mapbox Configuration</span>
                {loading ? (
                  <Badge variant="secondary">
                    <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                    Checking...
                  </Badge>
                ) : (
                  <Badge variant={mapboxStatus?.configured ? "default" : "destructive"}>
                    {mapboxStatus?.configured ? "✓ Configured" : "⚠ Not Set"}
                  </Badge>
                )}
              </div>
              {mapboxStatus?.message && (
                <p className={`text-xs mt-2 ${mapboxStatus?.configured ? "text-green-600" : "text-red-600"}`}>
                  {mapboxStatus.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Mapbox Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">🗺️ Map Styles</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Streets, Satellite, Light, Dark themes</li>
                <li>• Custom styling and branding</li>
                <li>• High-resolution imagery</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">📊 Data Visualization</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Wealth-based color coding</li>
                <li>• Property clustering</li>
                <li>• Interactive popups</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">🎯 Performance</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Vector tiles for fast loading</li>
                <li>• Smooth zoom and pan</li>
                <li>• Mobile optimized</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">🔧 Controls</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Navigation controls</li>
                <li>• Fullscreen mode</li>
                <li>• Custom view modes</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={checkMapboxStatus} disabled={loading}>
          {loading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
          Refresh Status
        </Button>
        <Button variant="outline" size="sm" asChild>
          <a href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Vercel Dashboard
          </a>
        </Button>
        <Button size="sm" asChild>
          <a href="/wealth-map">Test Wealth Map →</a>
        </Button>
      </div>
    </div>
  )
}
