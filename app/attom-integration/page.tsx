"use client"

import { AttomIntegrationStatus } from "@/components/attom-integration-status"
import { AttomPropertyDetails } from "@/components/attom-property-details"
import { ProfessionalHeader } from "@/components/professional-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Search, Building } from "lucide-react"

export default function AttomIntegrationPage() {
  const [searchAddress, setSearchAddress] = useState("123 Main St")
  const [searchCity, setSearchCity] = useState("Los Angeles")
  const [searchState, setSearchState] = useState("CA")
  const [showDetails, setShowDetails] = useState(false)

  const handleSearch = () => {
    if (searchAddress && searchCity && searchState) {
      setShowDetails(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfessionalHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ATTOM Data Integration</h1>
          <p className="text-gray-600">
            Access comprehensive property data, valuations, and market intelligence powered by ATTOM Data
          </p>
        </div>

        <div className="space-y-8">
          {/* Integration Status */}
          <AttomIntegrationStatus />

          {/* Property Search */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Test Property Lookup
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={searchAddress}
                    onChange={(e) => setSearchAddress(e.target.value)}
                    placeholder="123 Main St"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    placeholder="Los Angeles"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={searchState}
                    onChange={(e) => setSearchState(e.target.value)}
                    placeholder="CA"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleSearch} className="w-full">
                    <Building className="h-4 w-4 mr-2" />
                    Get Property Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Details */}
          {showDetails && (
            <AttomPropertyDetails
              address={searchAddress}
              city={searchCity}
              state={searchState}
              onDataUpdate={(data) => console.log("ATTOM data updated:", data)}
            />
          )}

          {/* API Documentation */}
          <Card>
            <CardHeader>
              <CardTitle>ATTOM Data API Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Property Intelligence</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Detailed property characteristics</li>
                    <li>• Building and lot information</li>
                    <li>• Property history and ownership</li>
                    <li>• Tax assessment data</li>
                    <li>• Zoning and land use</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Market Analytics</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Automated Valuation Models (AVM)</li>
                    <li>• Comparable sales analysis</li>
                    <li>• Market trends and statistics</li>
                    <li>• Price appreciation data</li>
                    <li>• Neighborhood demographics</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
