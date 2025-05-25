"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, RefreshCw, Database, TrendingUp, MapPin, DollarSign } from "lucide-react"

export function AttomIntegrationStatus() {
  const [status, setStatus] = useState<{
    connected: boolean
    endpoints: Record<string, boolean>
    lastChecked: string | null
    error: string | null
  }>({
    connected: false,
    endpoints: {},
    lastChecked: null,
    error: null,
  })
  const [loading, setLoading] = useState(false)

  const testEndpoints = [
    { key: "property-detail", name: "Property Details", icon: Database },
    { key: "avm", name: "Automated Valuation", icon: DollarSign },
    { key: "sales-history", name: "Sales History", icon: TrendingUp },
    { key: "market-snapshot", name: "Market Data", icon: MapPin },
  ]

  const checkAttomConnection = async () => {
    setLoading(true)
    const endpointResults: Record<string, boolean> = {}

    try {
      // Test each endpoint with sample data
      for (const endpoint of testEndpoints) {
        try {
          const response = await fetch(
            `/api/integrations/attom?endpoint=${endpoint.key}&address=123 Main St&city=Los Angeles&state=CA`,
          )
          endpointResults[endpoint.key] = response.ok
        } catch {
          endpointResults[endpoint.key] = false
        }
      }

      const allConnected = Object.values(endpointResults).some(Boolean)

      setStatus({
        connected: allConnected,
        endpoints: endpointResults,
        lastChecked: new Date().toISOString(),
        error: allConnected ? null : "Some ATTOM endpoints are not responding",
      })
    } catch (error) {
      setStatus({
        connected: false,
        endpoints: endpointResults,
        lastChecked: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Failed to test ATTOM connection",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAttomConnection()
  }, [])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            ATTOM Data Integration
          </CardTitle>
          <div className="flex items-center gap-2">
            {status.connected ? (
              <Badge variant="default" className="bg-green-500">
                <CheckCircle className="h-3 w-3 mr-1" />
                Connected
              </Badge>
            ) : (
              <Badge variant="destructive">
                <XCircle className="h-3 w-3 mr-1" />
                Disconnected
              </Badge>
            )}
            <Button variant="outline" size="sm" onClick={checkAttomConnection} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`} />
              Test
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Connection Status */}
        <div className="p-4 border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">API Connection</span>
            {status.connected ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
          {status.error && <p className="text-sm text-red-600">{status.error}</p>}
          {status.lastChecked && (
            <p className="text-xs text-gray-500">Last checked: {new Date(status.lastChecked).toLocaleString()}</p>
          )}
        </div>

        {/* Endpoint Status */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Available Endpoints:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {testEndpoints.map((endpoint) => {
              const Icon = endpoint.icon
              const isWorking = status.endpoints[endpoint.key]
              return (
                <div key={endpoint.key} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{endpoint.name}</span>
                  </div>
                  {isWorking ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">ATTOM Data Features:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>Property Details & Characteristics</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>Automated Valuation Models (AVM)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>Sales History & Transactions</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>Market Analytics & Trends</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>Comparable Sales (Comps)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>Property Risk Assessment</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
