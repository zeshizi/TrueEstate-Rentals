"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2, Database, AlertCircle, CheckCircle, RefreshCw } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface DataGovData {
  dataset: string
  source: string
  count: number
  data: any[]
  error?: string
  errorDetails?: string
  note?: string
  timestamp?: string
  apiUrl?: string
}

export function DataGovIntegration() {
  const [selectedDataset, setSelectedDataset] = useState("property-assessments")
  const [query, setQuery] = useState("")
  const [location, setLocation] = useState("")
  const [data, setData] = useState<DataGovData | null>(null)
  const [loading, setLoading] = useState(false)
  const [lastFetch, setLastFetch] = useState<string>("")

  const datasets = [
    { value: "property-assessments", label: "Property Assessments", description: "NYC property assessment data" },
    { value: "real-estate-sales", label: "Real Estate Sales", description: "Recent property sales data" },
    { value: "census-demographics", label: "Census Demographics", description: "Population and income data" },
    { value: "building-permits", label: "Building Permits", description: "Construction permits and violations" },
    { value: "housing-violations", label: "Housing Violations", description: "Housing code violations" },
  ]

  const fetchData = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        dataset: selectedDataset,
        limit: "20",
      })

      if (query.trim()) params.append("query", query.trim())
      if (location.trim()) params.append("location", location.trim())

      const response = await fetch(`/api/integrations/data-gov?${params}`)
      const result = await response.json()

      setData(result)
      setLastFetch(new Date().toLocaleTimeString())
    } catch (error) {
      console.error("Error fetching data:", error)
      setData({
        dataset: selectedDataset,
        source: "error",
        count: 0,
        data: [],
        error: "Network error occurred",
        errorDetails: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [selectedDataset])

  const getStatusColor = (source: string) => {
    switch (source) {
      case "data.gov":
        return "bg-green-500"
      case "census-mock":
        return "bg-blue-500"
      case "fallback":
        return "bg-yellow-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (source: string) => {
    switch (source) {
      case "data.gov":
        return <CheckCircle className="h-4 w-4" />
      case "census-mock":
      case "fallback":
        return <AlertCircle className="h-4 w-4" />
      case "error":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Database className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data.gov Integration
          </CardTitle>
          <CardDescription>Access government datasets for property and demographic information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Dataset</label>
              <Select value={selectedDataset} onValueChange={setSelectedDataset}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {datasets.map((dataset) => (
                    <SelectItem key={dataset.value} value={dataset.value}>
                      <div>
                        <div className="font-medium">{dataset.label}</div>
                        <div className="text-xs text-muted-foreground">{dataset.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Search Query</label>
              <Input
                placeholder="Owner name, address..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchData()}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Location</label>
              <Input
                placeholder="Manhattan, Brooklyn..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchData()}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={fetchData} disabled={loading} className="flex-1">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Fetching Data...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Fetch Data
                </>
              )}
            </Button>
          </div>

          {lastFetch && <p className="text-xs text-muted-foreground">Last updated: {lastFetch}</p>}
        </CardContent>
      </Card>

      {data && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {getStatusIcon(data.source)}
                Results ({data.count} records)
              </CardTitle>
              <Badge className={`${getStatusColor(data.source)} text-white`}>
                {data.source === "data.gov"
                  ? "Live Data"
                  : data.source === "census-mock"
                    ? "Census Mock"
                    : data.source === "fallback"
                      ? "Fallback Data"
                      : "Error"}
              </Badge>
            </div>
            <CardDescription>
              Dataset: {data.dataset} | Source: {data.source}
              {data.timestamp && ` | ${new Date(data.timestamp).toLocaleString()}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.error && (
              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>API Error:</strong> {data.error}
                  {data.errorDetails && (
                    <div className="mt-1 text-xs text-muted-foreground">Details: {data.errorDetails}</div>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {data.note && (
              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{data.note}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {data.data.map((item, index) => (
                <Card key={item.id || index} className="p-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                    {Object.entries(item).map(([key, value]) => (
                      <div key={key}>
                        <span className="font-medium text-muted-foreground">
                          {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}:
                        </span>
                        <span className="ml-1">
                          {(typeof value === "number" && key.includes("Value")) ||
                          key.includes("Price") ||
                          key.includes("Income") ||
                          key.includes("Rent")
                            ? `$${value.toLocaleString()}`
                            : String(value || "N/A")}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            {data.apiUrl && (
              <div className="mt-4 p-2 bg-muted rounded text-xs">
                <strong>API Endpoint:</strong> {data.apiUrl}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
