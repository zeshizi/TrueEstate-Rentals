"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, CheckCircle, Info } from "lucide-react"

export function ApiIntegrationAlternatives() {
  const freeAlternatives = [
    {
      category: "Company Data",
      original: "Clearbit",
      alternatives: [
        {
          name: "SEC EDGAR",
          description: "Free US public company data",
          url: "https://www.sec.gov/edgar",
          cost: "Free",
          features: ["Company filings", "Financial data", "Officer information"],
        },
        {
          name: "Companies House UK",
          description: "Free UK company registry",
          url: "https://developer.company-information.service.gov.uk/",
          cost: "Free (1000 requests/day)",
          features: ["Company details", "Filing history", "Officer data"],
        },
        {
          name: "Hunter.io",
          description: "Email verification & company data",
          url: "https://hunter.io/",
          cost: "Free (25 requests/month)",
          features: ["Email verification", "Company domains", "Contact finding"],
        },
      ],
    },
    {
      category: "Business Registry",
      original: "OpenCorporates",
      alternatives: [
        {
          name: "OpenCorporates Free",
          description: "Limited free tier",
          url: "https://opencorporates.com/",
          cost: "Free (500 requests/month)",
          features: ["Global company search", "Basic company data", "Registry links"],
        },
        {
          name: "State Business Registries",
          description: "Direct state registry access",
          url: "https://www.sos.ca.gov/",
          cost: "Free",
          features: ["Official state data", "Real-time updates", "Filing documents"],
        },
        {
          name: "D&B Hoovers Free",
          description: "Basic business information",
          url: "https://www.dnb.com/",
          cost: "Free tier available",
          features: ["Company profiles", "Industry data", "Contact information"],
        },
      ],
    },
  ]

  const setupInstructions = [
    {
      service: "Companies House UK API",
      steps: [
        "Visit https://developer.company-information.service.gov.uk/",
        "Create a free account",
        "Generate API key (1000 requests/day free)",
        "Add COMPANIES_HOUSE_API_KEY to environment variables",
      ],
    },
    {
      service: "SEC EDGAR",
      steps: [
        "No API key required",
        "Rate limited to 10 requests/second",
        "Must include User-Agent header",
        "Already configured in the platform",
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Free API Alternatives
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {freeAlternatives.map((category) => (
            <div key={category.category}>
              <h3 className="font-semibold mb-3">
                {category.category}
                <span className="text-sm text-gray-500 ml-2">(Alternative to {category.original})</span>
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {category.alternatives.map((alt) => (
                  <Card key={alt.name} className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{alt.name}</h4>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          {alt.cost}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{alt.description}</p>
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
                          Setup
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
          <CardTitle>Quick Setup Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {setupInstructions.map((instruction) => (
            <div key={instruction.service} className="border-l-4 border-l-blue-500 pl-4">
              <h4 className="font-medium mb-2">{instruction.service}</h4>
              <ol className="text-sm space-y-1 list-decimal list-inside">
                {instruction.steps.map((step, idx) => (
                  <li key={idx} className="text-gray-600">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="bg-green-50 p-4 rounded-lg">
        <h4 className="font-medium text-green-900 mb-2">✅ Already Configured</h4>
        <p className="text-sm text-green-800">
          Your platform now uses free alternatives that provide excellent data coverage:
        </p>
        <ul className="text-sm text-green-800 mt-2 space-y-1">
          <li>• SEC EDGAR for US public companies (completely free)</li>
          <li>• Hunter.io for email verification (25 free requests/month)</li>
          <li>• OpenCorporates free tier (500 requests/month)</li>
          <li>• State registry integration for official business data</li>
        </ul>
      </div>
    </div>
  )
}
