"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertCircle, RefreshCw, ExternalLink } from "lucide-react"

interface APIStatus {
  name: string
  endpoint: string
  status: "active" | "inactive" | "error" | "testing"
  lastChecked: string
  responseTime?: number
  alternative?: string
  description: string
}

export function APIStatusDashboard() {
  const [apiStatuses, setApiStatuses] = useState<APIStatus[]>([
    {
      name: "People Data Labs API",
      endpoint: "/api/integrations/people-data-labs",
      status: "testing",
      lastChecked: "",
      alternative: "Clearbit (Closed for new accounts)",
      description: "Person and company enrichment via RapidAPI",
    },
    {
      name: "Global Company Data API",
      endpoint: "/api/integrations/global-company-data",
      status: "testing",
      lastChecked: "",
      alternative: "OpenCorporates (Needs approval)",
      description: "Company registry and business data via RapidAPI",
    },
    {
      name: "Hunter.io API",
      endpoint: "/api/integrations/hunter-io",
      status: "testing",
      lastChecked: "",
      description: "Email verification and domain search",
    },
    {
      name: "Google Maps API",
      endpoint: "/api/integrations/google-maps",
      status: "testing",
      lastChecked: "",
      description: "Location services and geocoding",
    },
    {
      name: "Zillow API",
      endpoint: "/api/integrations/zillow",
      status: "testing",
      lastChecked: "",
      description: "Property data and market information",
    },
    {
      name: "Census API",
      endpoint: "/api/integrations/census",
      status: "testing",
      lastChecked: "",
      description: "Demographic and economic data",
    },
  ])

  const [isRefreshing, setIsRefreshing] = useState(false)

  const checkAPIStatus = async (api: APIStatus) => {
    try {
      const startTime = Date.now()
      const response = await fetch(`${api.endpoint}?test=true`)
      const endTime = Date.now()

      return {
        ...api,
        status: response.ok ? "active" : "error",
        lastChecked: new Date().toLocaleTimeString(),
        responseTime: endTime - startTime,
      }
    } catch (error) {
      return {
        ...api,
        status: "error" as const,
        lastChecked: new Date().toLocaleTimeString(),
        responseTime: undefined,
      }
    }
  }

  const refreshAllStatuses = async () => {
    setIsRefreshing(true)

    const updatedStatuses = await Promise.all(apiStatuses.map((api) => checkAPIStatus(api)))

    setApiStatuses(updatedStatuses)
    setIsRefreshing(false)
  }

  useEffect(() => {
    refreshAllStatuses()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "inactive":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      error: "destructive",
      inactive: "secondary",
      testing: "outline",
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const activeCount = apiStatuses.filter((api) => api.status === "active").length
  const errorCount = apiStatuses.filter((api) => api.status === "error").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">API Integration Status</h2>
          <p className="text-gray-600">Monitor the health of all external API integrations</p>
        </div>
        <Button onClick={refreshAllStatuses} disabled={isRefreshing}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh All
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active APIs</p>
                <p className="text-2xl font-bold text-green-600">{activeCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed APIs</p>
                <p className="text-2xl font-bold text-red-600">{errorCount}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total APIs</p>
                <p className="text-2xl font-bold">{apiStatuses.length}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API Status List */}
      <Card>
        <CardHeader>
          <CardTitle>API Endpoints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apiStatuses.map((api, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(api.status)}
                  <div>
                    <h3 className="font-medium">{api.name}</h3>
                    <p className="text-sm text-gray-600">{api.description}</p>
                    {api.alternative && (
                      <p className="text-xs text-orange-600 mt-1">Alternative to: {api.alternative}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {api.responseTime && <span className="text-sm text-gray-500">{api.responseTime}ms</span>}
                  {api.lastChecked && <span className="text-sm text-gray-500">{api.lastChecked}</span>}
                  {getStatusBadge(api.status)}
                  <Button variant="outline" size="sm" onClick={() => window.open(api.endpoint, "_blank")}>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* RapidAPI Setup Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>RapidAPI Setup Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Required Environment Variables:</h4>
            <code className="text-sm bg-white p-2 rounded block">RAPIDAPI_KEY=your_rapidapi_key_here</code>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">API Alternatives in Use:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              <li>
                <strong>People Data Labs API</strong> - Replaces Clearbit (closed for new accounts)
              </li>
              <li>
                <strong>Global Company Data API</strong> - Replaces OpenCorporates (needs approval)
              </li>
              <li>
                <strong>Business Registry API</strong> - Additional fallback for company data
              </li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Setup Steps:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-green-800">
              <li>
                Sign up for RapidAPI at{" "}
                <a href="https://rapidapi.com" className="underline" target="_blank" rel="noreferrer">
                  rapidapi.com
                </a>
              </li>
              <li>Subscribe to People Data Labs API and Global Company Data API</li>
              <li>Copy your RapidAPI key from the dashboard</li>
              <li>Add RAPIDAPI_KEY to your environment variables</li>
              <li>Refresh this dashboard to test the connections</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
