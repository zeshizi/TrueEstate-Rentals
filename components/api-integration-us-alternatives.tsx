"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, CheckCircle, Flag } from "lucide-react"

export function ApiIntegrationUSAlternatives() {
  const usAlternatives = [
    {
      category: "US Company Data",
      alternatives: [
        {
          name: "SEC EDGAR",
          description: "Official US public company database",
          url: "https://www.sec.gov/edgar",
          cost: "100% Free",
          apiKey: "None Required",
          features: ["All public companies", "Financial filings", "Officer data", "Real-time updates"],
          coverage: "13,000+ public companies",
        },
        {
          name: "IRS Business Master File",
          description: "IRS business registration data",
          url: "https://www.irs.gov/charities-non-profits/exempt-organizations-business-master-file-extract-eo-bmf",
          cost: "Free via Data.gov",
          apiKey: "DATA_GOV_API_KEY (already configured)",
          features: ["Tax-exempt organizations", "EIN numbers", "Business addresses", "Organization types"],
          coverage: "1.8M+ organizations",
        },
        {
          name: "OpenCorporates Free",
          description: "Global company database with US focus",
          url: "https://opencorporates.com/",
          cost: "Free (500 requests/month)",
          apiKey: "None Required",
          features: ["US state registrations", "Basic company info", "Officer data", "Filing links"],
          coverage: "200M+ companies worldwide",
        },
      ],
    },
    {
      category: "US State Registries",
      alternatives: [
        {
          name: "California SOS",
          description: "Official California business registry",
          url: "https://bizfileonline.sos.ca.gov/",
          cost: "100% Free",
          apiKey: "None Required",
          features: ["LLC/Corp search", "Agent info", "Status updates", "Filing history"],
          coverage: "4M+ CA entities",
        },
        {
          name: "Delaware Division of Corps",
          description: "Official Delaware corporate registry",
          url: "https://icis.corp.delaware.gov/",
          cost: "100% Free",
          apiKey: "None Required",
          features: ["Corporate search", "Franchise status", "Registered agents", "Annual reports"],
          coverage: "1.5M+ DE entities",
        },
        {
          name: "Texas Comptroller",
          description: "Official Texas business registry",
          url: "https://mycpa.cpa.state.tx.us/",
          cost: "100% Free",
          apiKey: "None Required",
          features: ["Entity search", "Tax status", "Registered agents", "Filing documents"],
          coverage: "3M+ TX entities",
        },
      ],
    },
  ]

  const stateRegistries = [
    { state: "California", code: "CA", url: "https://bizfileonline.sos.ca.gov/search/business" },
    { state: "New York", code: "NY", url: "https://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_SEARCH_ENTRY" },
    { state: "Texas", code: "TX", url: "https://mycpa.cpa.state.tx.us/coa/" },
    { state: "Florida", code: "FL", url: "https://search.sunbiz.org/Inquiry/CorporationSearch/ByName" },
    { state: "Delaware", code: "DE", url: "https://icis.corp.delaware.gov/Ecorp/EntitySearch/NameSearch.aspx" },
    { state: "Nevada", code: "NV", url: "https://esos.nv.gov/EntitySearch/OnlineEntitySearch" },
    { state: "Illinois", code: "IL", url: "https://www.ilsos.gov/corporatellc/" },
    { state: "Washington", code: "WA", url: "https://ccfs.sos.wa.gov/" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-blue-600" />
            US-Focused Free API Alternatives
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {usAlternatives.map((category) => (
            <div key={category.category}>
              <h3 className="font-semibold mb-3 text-blue-900">{category.category}</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {category.alternatives.map((alt) => (
                  <Card key={alt.name} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{alt.name}</h4>
                        <Badge variant="outline" className="text-blue-600 border-blue-600">
                          {alt.cost}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{alt.description}</p>
                      <div className="text-xs text-blue-600 mb-3">
                        <strong>API Key:</strong> {alt.apiKey}
                      </div>
                      <div className="text-xs text-green-600 mb-3">
                        <strong>Coverage:</strong> {alt.coverage}
                      </div>
                      <ul className="text-xs space-y-1 mb-3">
                        {alt.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button variant="outline" size="sm" asChild>
                        <a href={alt.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Explore
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>US State Business Registries (All Free)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {stateRegistries.map((registry) => (
              <div key={registry.code} className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{registry.state}</h4>
                  <Badge variant="secondary">{registry.code}</Badge>
                </div>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <a href={registry.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Search
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">🇺🇸 US-Focused Data Coverage</h4>
        <p className="text-sm text-blue-800 mb-2">
          Your platform now uses the best US government and official data sources:
        </p>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>
            • <strong>SEC EDGAR:</strong> All 13,000+ US public companies (100% free)
          </li>
          <li>
            • <strong>IRS BMF:</strong> 1.8M+ tax-exempt organizations (free via Data.gov)
          </li>
          <li>
            • <strong>State Registries:</strong> 15M+ businesses across all 50 states (free)
          </li>
          <li>
            • <strong>OpenCorporates:</strong> 200M+ global companies (500 free/month)
          </li>
        </ul>
        <div className="mt-3 p-2 bg-green-100 rounded">
          <p className="text-xs text-green-800">
            <strong>✅ Zero API costs</strong> - All sources are free or use your existing DATA_GOV_API_KEY
          </p>
        </div>
      </div>
    </div>
  )
}
