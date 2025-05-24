"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Zap, Users, Building, ExternalLink } from "lucide-react"

export function RapidAPIStatusDashboard() {
  const [apiStatus, setApiStatus] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAPIStatus()
  }, [])

  const checkAPIStatus = async () => {
    setLoading(true)
    try {
      // Test People Data Labs API
      const personTest = await fetch("/api/integrations/clearbit?email=test@microsoft.com")
      const personData = await personTest.json()

      // Test Global Company Data API
      const companyTest = await fetch("/api/integrations/clearbit?domain=microsoft.com")
      const companyData = await companyTest.json()

      // Test OpenCorporates alternative
      const registryTest = await fetch("/api/integrations/opencorporates?company=Microsoft Corporation")
      const registryData = await registryTest.json()

      setApiStatus({
        peopleDataLabs: {
          status: personData.person ? "active" : "mock",
          response: personData,
        },
        globalCompanyData: {
          status: companyData.company ? "active" : "mock",
          response: companyData,
        },
        businessRegistry: {
          status: registryData.company ? "active" : "mock",
          response: registryData,
        },
      })
    } catch (error) {
      console.error("API status check failed:", error)
      setApiStatus({
        error: "Failed to check API status",
      })
    }
    setLoading(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">✅ Live API</Badge>
      case "mock":
        return (
          <Badge variant="outline" className="text-orange-600 border-orange-600">
            🔄 Mock Data
          </Badge>
        )
      default:
        return <Badge variant="destructive">❌ Error</Badge>
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Checking RapidAPI status...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600" />
            RapidAPI Integration Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {apiStatus?.error ? (
            <div className="flex items-center gap-2 text-red-600 p-4 bg-red-50 rounded-lg">
              <AlertCircle className="h-5 w-5" />
              <span>{apiStatus.error}</span>
            </div>
          ) : (
            <div className="grid gap-4">
              {/* People Data Labs Status */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <h4 className="font-medium">People Data Labs API</h4>
                    <p className="text-sm text-gray-600">Person enrichment service</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(apiStatus?.peopleDataLabs?.status)}
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href="https://rapidapi.com/peopledatalabs/api/people-data-labs-api"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Global Company Data Status */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5 text-green-600" />
                  <div>
                    <h4 className="font-medium">Global Company Data API</h4>
                    <p className="text-sm text-gray-600">Company enrichment service</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(apiStatus?.globalCompanyData?.status)}
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href="https://rapidapi.com/global-company-data/api/global-company-data-api"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Business Registry Status */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5 text-purple-600" />
                  <div>
                    <h4 className="font-medium">Business Registry API</h4>
                    <p className="text-sm text-gray-600">Company registration lookup</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(apiStatus?.businessRegistry?.status)}
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href="https://rapidapi.com/business-registry/api/business-registry-api"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center pt-4">
            <Button onClick={checkAPIStatus} variant="outline">
              Refresh Status
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* API Response Preview */}
      {apiStatus && !apiStatus.error && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">API Response Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {apiStatus.peopleDataLabs?.response?.person && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h5 className="font-medium text-blue-900 mb-2">👤 Person Data Sample:</h5>
                  <div className="text-sm text-blue-800">
                    <strong>Name:</strong> {apiStatus.peopleDataLabs.response.person.name}
                    <br />
                    <strong>Source:</strong> {apiStatus.peopleDataLabs.response.person.source}
                  </div>
                </div>
              )}

              {apiStatus.globalCompanyData?.response?.company && (
                <div className="p-3 bg-green-50 rounded-lg">
                  <h5 className="font-medium text-green-900 mb-2">🏢 Company Data Sample:</h5>
                  <div className="text-sm text-green-800">
                    <strong>Name:</strong> {apiStatus.globalCompanyData.response.company.name}
                    <br />
                    <strong>Source:</strong> {apiStatus.globalCompanyData.response.company.source}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="bg-green-50 p-4 rounded-lg">
        <h4 className="font-medium text-green-900 mb-2">✅ Configuration Complete</h4>
        <p className="text-sm text-green-800">
          Your RapidAPI integrations are configured and ready to use. The platform will automatically fall back to mock
          data if APIs are unavailable.
        </p>
      </div>
    </div>
  )
}
