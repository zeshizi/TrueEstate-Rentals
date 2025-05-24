"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertCircle, ExternalLink } from "lucide-react"

export function ApiIntegrationStatus() {
  const [status, setStatus] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStatus()
  }, [])

  const fetchStatus = async () => {
    try {
      const response = await fetch("/api/environment-setup")
      const data = await response.json()
      setStatus(data)
    } catch (error) {
      console.error("Failed to fetch API status:", error)
    } finally {
      setLoading(false)
    }
  }

  const validateGoogleMaps = async () => {
    try {
      const response = await fetch("/api/environment-setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "validate-google-maps" }),
      })
      const data = await response.json()
      console.log("Google Maps validation:", data)
    } catch (error) {
      console.error("Failed to validate Google Maps:", error)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">Loading API status...</div>
        </CardContent>
      </Card>
    )
  }

  if (!status) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-red-600">Failed to load API status</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          API Integration Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Required APIs</h3>
          <div className="space-y-2">
            {Object.entries(status.required).map(([key, isConfigured]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm">{key.replace(/_/g, " ")}</span>
                <div className="flex items-center gap-2">
                  {isConfigured ? (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Configured
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-red-600 border-red-600">
                      <XCircle className="h-3 w-3 mr-1" />
                      Missing
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Optional APIs</h3>
          <div className="space-y-2">
            {Object.entries(status.optional).map(([key, isConfigured]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm">{key.replace(/_/g, " ")}</span>
                <div className="flex items-center gap-2">
                  {isConfigured ? (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Configured
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-gray-600 border-gray-600">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Optional
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {status.recommendations.length > 0 && (
          <div>
            <h3 className="font-semibold mb-3">Recommendations</h3>
            <div className="space-y-2">
              {status.recommendations.map((rec: string, index: number) => (
                <div key={index} className="text-sm text-gray-600 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  {rec}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Button onClick={validateGoogleMaps} variant="outline" size="sm">
            Test Google Maps API
          </Button>
          <div className="text-xs text-gray-500">The platform will work with mock data even without API keys</div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">API Setup Guide</h4>
          <div className="space-y-2 text-sm text-blue-800">
            <div className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              <a
                href="https://console.cloud.google.com/apis"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Google Maps API Console
              </a>
            </div>
            <div className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              <a href="https://clearbit.com/pricing" target="_blank" rel="noopener noreferrer" className="underline">
                Clearbit API (Free Tier)
              </a>
            </div>
            <div className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              <a href="https://hunter.io/pricing" target="_blank" rel="noopener noreferrer" className="underline">
                Hunter.io API (Free Tier)
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
