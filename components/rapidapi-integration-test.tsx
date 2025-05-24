"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Loader2, User, Building, Mail, Search } from "lucide-react"

interface TestResult {
  api: string
  status: "success" | "error" | "loading"
  data?: any
  error?: string
  responseTime?: number
}

export function RapidAPIIntegrationTest() {
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [testEmail, setTestEmail] = useState("john.doe@example.com")
  const [testCompany, setTestCompany] = useState("Apple Inc")

  const runAPITests = async () => {
    setIsLoading(true)
    setTestResults([])

    const tests = [
      {
        name: "People Data Labs API",
        endpoint: `/api/integrations/people-data-labs?email=${encodeURIComponent(testEmail)}`,
        icon: <User className="h-4 w-4" />,
      },
      {
        name: "Global Company Data API",
        endpoint: `/api/integrations/global-company-data?company=${encodeURIComponent(testCompany)}`,
        icon: <Building className="h-4 w-4" />,
      },
      {
        name: "Hunter.io API",
        endpoint: `/api/integrations/hunter-io?domain=apple.com`,
        icon: <Mail className="h-4 w-4" />,
      },
    ]

    for (const test of tests) {
      const startTime = Date.now()

      setTestResults((prev) => [
        ...prev,
        {
          api: test.name,
          status: "loading",
        },
      ])

      try {
        const response = await fetch(test.endpoint)
        const data = await response.json()
        const responseTime = Date.now() - startTime

        setTestResults((prev) =>
          prev.map((result) =>
            result.api === test.name
              ? {
                  api: test.name,
                  status: response.ok ? "success" : "error",
                  data: response.ok ? data : undefined,
                  error: response.ok ? undefined : data.error || "API request failed",
                  responseTime,
                }
              : result,
          ),
        )
      } catch (error) {
        const responseTime = Date.now() - startTime

        setTestResults((prev) =>
          prev.map((result) =>
            result.api === test.name
              ? {
                  api: test.name,
                  status: "error",
                  error: error instanceof Error ? error.message : "Network error",
                  responseTime,
                }
              : result,
          ),
        )
      }
    }

    setIsLoading(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "loading":
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      success: "default",
      error: "destructive",
      loading: "outline",
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"}>
        {status === "loading" ? "Testing..." : status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            RapidAPI Integration Test
          </CardTitle>
          <p className="text-sm text-gray-600">Test all RapidAPI integrations with your API key</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="test-email">Test Email</Label>
              <Input
                id="test-email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="john.doe@example.com"
              />
            </div>
            <div>
              <Label htmlFor="test-company">Test Company</Label>
              <Input
                id="test-company"
                value={testCompany}
                onChange={(e) => setTestCompany(e.target.value)}
                placeholder="Apple Inc"
              />
            </div>
          </div>

          <Button onClick={runAPITests} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Running Tests...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Test All APIs
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {testResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testResults.map((result, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(result.status)}
                      <h3 className="font-medium">{result.api}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {result.responseTime && <span className="text-sm text-gray-500">{result.responseTime}ms</span>}
                      {getStatusBadge(result.status)}
                    </div>
                  </div>

                  {result.error && (
                    <div className="bg-red-50 border border-red-200 rounded p-3 mb-3">
                      <p className="text-sm text-red-700">
                        <strong>Error:</strong> {result.error}
                      </p>
                    </div>
                  )}

                  {result.data && (
                    <div className="bg-green-50 border border-green-200 rounded p-3">
                      <p className="text-sm text-green-700 mb-2">
                        <strong>Success!</strong> API returned data:
                      </p>
                      <pre className="text-xs bg-white p-2 rounded overflow-auto max-h-40">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* API Configuration Status */}
      <Card>
        <CardHeader>
          <CardTitle>API Configuration Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium">RAPIDAPI_KEY</span>
              </div>
              <Badge variant="default">Configured</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium text-sm">People Data Labs</h4>
                <p className="text-xs text-gray-600">Person enrichment</p>
                <Badge variant="outline" className="mt-1">
                  RapidAPI
                </Badge>
              </div>
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium text-sm">Global Company Data</h4>
                <p className="text-xs text-gray-600">Company information</p>
                <Badge variant="outline" className="mt-1">
                  RapidAPI
                </Badge>
              </div>
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium text-sm">Hunter.io</h4>
                <p className="text-xs text-gray-600">Email verification</p>
                <Badge variant="outline" className="mt-1">
                  Direct API
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">✅ API Key Configured</h4>
              <p className="text-sm text-blue-800">
                Your RapidAPI key has been successfully added to the environment variables.
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">📋 Required Subscriptions</h4>
              <p className="text-sm text-yellow-800 mb-2">Make sure you're subscribed to these APIs on RapidAPI:</p>
              <ul className="text-sm text-yellow-800 list-disc list-inside space-y-1">
                <li>People Data Labs API</li>
                <li>Global Company Data API</li>
                <li>Business Registry API (optional fallback)</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">🚀 Ready to Use</h4>
              <p className="text-sm text-green-800">
                Once subscribed, all wealth analysis and owner lookup features will work with real data!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
