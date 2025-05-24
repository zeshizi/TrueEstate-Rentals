"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Loader2, User, Building, CheckCircle, AlertCircle } from "lucide-react"

export function RapidAPITestDashboard() {
  const [personEmail, setPersonEmail] = useState("")
  const [companyDomain, setCompanyDomain] = useState("")
  const [personResult, setPersonResult] = useState<any>(null)
  const [companyResult, setCompanyResult] = useState<any>(null)
  const [personLoading, setPersonLoading] = useState(false)
  const [companyLoading, setCompanyLoading] = useState(false)

  const testPersonEnrichment = async () => {
    if (!personEmail) return

    setPersonLoading(true)
    try {
      const response = await fetch(`/api/integrations/clearbit?email=${encodeURIComponent(personEmail)}`)
      const data = await response.json()
      setPersonResult(data)
    } catch (error) {
      setPersonResult({ error: "Failed to fetch person data" })
    }
    setPersonLoading(false)
  }

  const testCompanyEnrichment = async () => {
    if (!companyDomain) return

    setCompanyLoading(true)
    try {
      const response = await fetch(`/api/integrations/clearbit?domain=${encodeURIComponent(companyDomain)}`)
      const data = await response.json()
      setCompanyResult(data)
    } catch (error) {
      setCompanyResult({ error: "Failed to fetch company data" })
    }
    setCompanyLoading(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            Test People Data Labs API
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter email address (e.g., john@example.com)"
              value={personEmail}
              onChange={(e) => setPersonEmail(e.target.value)}
              className="flex-1"
            />
            <Button onClick={testPersonEnrichment} disabled={personLoading || !personEmail}>
              {personLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Test"}
            </Button>
          </div>

          {personResult && (
            <div className="mt-4 p-4 border rounded-lg">
              {personResult.error ? (
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span>{personResult.error}</span>
                </div>
              ) : personResult.person ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-green-600 mb-3">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-medium">Person Data Found!</span>
                    <Badge variant="outline">{personResult.person.source}</Badge>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Name:</strong> {personResult.person.name}
                    </div>
                    <div>
                      <strong>Title:</strong> {personResult.person.title || "N/A"}
                    </div>
                    <div>
                      <strong>Company:</strong> {personResult.person.company || "N/A"}
                    </div>
                    <div>
                      <strong>Location:</strong> {personResult.person.location || "N/A"}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-gray-600">No person data found</div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-green-600" />
            Test Global Company Data API
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter company domain (e.g., microsoft.com)"
              value={companyDomain}
              onChange={(e) => setCompanyDomain(e.target.value)}
              className="flex-1"
            />
            <Button onClick={testCompanyEnrichment} disabled={companyLoading || !companyDomain}>
              {companyLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Test"}
            </Button>
          </div>

          {companyResult && (
            <div className="mt-4 p-4 border rounded-lg">
              {companyResult.error ? (
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span>{companyResult.error}</span>
                </div>
              ) : companyResult.company ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-green-600 mb-3">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-medium">Company Data Found!</span>
                    <Badge variant="outline">{companyResult.company.source}</Badge>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Name:</strong> {companyResult.company.name}
                    </div>
                    <div>
                      <strong>Industry:</strong> {companyResult.company.industry || "N/A"}
                    </div>
                    <div>
                      <strong>Employees:</strong> {companyResult.company.employees || "N/A"}
                    </div>
                    <div>
                      <strong>Location:</strong> {companyResult.company.location || "N/A"}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-gray-600">No company data found</div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">🧪 Test Examples</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h5 className="font-medium mb-1">Person Enrichment:</h5>
            <ul className="space-y-1 text-xs">
              <li>• john@microsoft.com</li>
              <li>• sarah@google.com</li>
              <li>• Any professional email</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-1">Company Enrichment:</h5>
            <ul className="space-y-1 text-xs">
              <li>• microsoft.com</li>
              <li>• google.com</li>
              <li>• Any company domain</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
