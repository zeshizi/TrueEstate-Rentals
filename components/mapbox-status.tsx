"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, MapPin, ExternalLink, Zap } from "lucide-react"

export function MapboxStatus() {
  const [mapboxStatus, setMapboxStatus] = useState<any>(null)
  const [testing, setTesting] = useState(false)

  useEffect(() => {
    checkMapboxStatus()
  }, [])

  const checkMapboxStatus = async () => {
    setTesting(true)
    try {
      // Check server-side configuration
      const configResponse = await fetch("/api/mapbox/config")
      const configData = await configResponse.json()

      // Test Mapbox GL JS loading
      let mapboxLoaded = false
      try {
        const mapboxgl = await import("mapbox-gl")
        mapboxLoaded = !!mapboxgl.default
      } catch (error) {
        mapboxLoaded = false
      }

      setMapboxStatus({
        tokenConfigured: configData.configured || false,
        tokenValid: configData.valid || false,
        libraryLoaded: mapboxLoaded,
        ready: configData.configured && configData.valid && mapboxLoaded,
        error: configData.error || null,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error("Mapbox status check failed:", error)
      setMapboxStatus({
        tokenConfigured: false,
        tokenValid: false,
        libraryLoaded: false,
        ready: false,
        error: "Failed to check Mapbox configuration",
        timestamp: new Date().toISOString(),
      })
    } finally {
      setTesting(false)
    }
  }

  if (!mapboxStatus) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <div className="text-sm text-gray-600">Checking Mapbox status...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Mapbox Integration Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          {mapboxStatus.ready ? (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>🎉 Mapbox is Ready!</strong> Your interactive wealth map is fully configured and ready to use.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Configuration Needed:</strong> {mapboxStatus.error || "Some Mapbox components need attention."}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Detailed Status */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-600" />
                <span className="font-medium">Mapbox Access Token</span>
              </div>
              <Badge variant={mapboxStatus.tokenConfigured ? "default" : "destructive"}>
                {mapboxStatus.tokenConfigured ? "✓ Configured" : "✗ Missing"}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-gray-600" />
                <span className="font-medium">Token Format Valid</span>
              </div>
              <Badge variant={mapboxStatus.tokenValid ? "default" : "destructive"}>
                {mapboxStatus.tokenValid ? "✓ Valid" : "✗ Invalid"}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-gray-600" />
                <span className="font-medium">Mapbox GL JS Library</span>
              </div>
              <Badge variant={mapboxStatus.libraryLoaded ? "default" : "destructive"}>
                {mapboxStatus.libraryLoaded ? "✓ Loaded" : "✗ Failed"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" onClick={checkMapboxStatus} disabled={testing}>
              {testing ? "Testing..." : "Recheck Status"}
            </Button>

            <Button asChild disabled={!mapboxStatus.ready}>
              <a href="/wealth-map">
                <MapPin className="h-4 w-4 mr-2" />
                Open Wealth Map
              </a>
            </Button>

            <Button variant="outline" asChild>
              <a href="https://account.mapbox.com/access-tokens/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Mapbox Dashboard
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Features Preview */}
      {mapboxStatus.ready && (
        <Card>
          <CardHeader>
            <CardTitle>Available Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium text-green-600">✓ Interactive Map</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Zoom, pan, rotate controls</li>
                  <li>• Multiple map styles</li>
                  <li>• Fullscreen mode</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-green-600">✓ Wealth Visualization</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Color-coded by wealth ranges</li>
                  <li>• Property clustering</li>
                  <li>• Interactive popups</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-green-600">✓ Data Layers</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Owner wealth analysis</li>
                  <li>• Confidence indicators</li>
                  <li>• Property type filtering</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-green-600">✓ Performance</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Vector tile rendering</li>
                  <li>• Smooth animations</li>
                  <li>• Mobile optimized</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
