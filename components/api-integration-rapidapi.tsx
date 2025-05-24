"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, CheckCircle, Zap, Users, Building } from "lucide-react"

export function ApiIntegrationRapidAPI() {
  const rapidApiServices = [
    {
      category: "Person Enrichment",
      icon: <Users className="h-5 w-5" />,
      original: "Clearbit (Closed)",
      replacement: {
        name: "People Data Labs API",
        description: "Professional person enrichment via RapidAPI",
        url: "https://rapidapi.com/peopledatalabs/api/people-data-labs-api",
        cost: "$0.10 per enrichment",
        features: [
          "Email to full profile",
          "Professional experience",
          "Education history",
          "Social media profiles",
          "Company information",
          "Location data",
        ],
        coverage: "1.5B+ professional profiles",
        accuracy: "95%+ accuracy rate",
      },
    },
    {
      category: "Company Enrichment",
      icon: <Building className="h-5 w-5" />,
      original: "OpenCorporates (Needs Approval)",
      replacement: {
        name: "Global Company Data API",
        description: "Comprehensive company data via RapidAPI",
        url: "https://rapidapi.com/global-company-data/api/global-company-data-api",
        cost: "$0.05 per lookup",
        features: [
          "Company registration data",
          "Financial information",
          "Officer details",
          "Industry classification",
          "Contact information",
          "Business relationships",
        ],
        coverage: "300M+ companies worldwide",
        accuracy: "90%+ data accuracy",
      },
    },
    {
      category: "Business Registry",
      icon: <Building className="h-5 w-5" />,
      original: "Multiple Registry APIs",
      replacement: {
        name: "Business Registry API",
        description: "Multi-jurisdiction business lookup",
        url: "https://rapidapi.com/business-registry/api/business-registry-api",
        cost: "$0.03 per search",
        features: [
          "US state registrations",
          "International registries",
          "Real-time status",
          "Filing history",
          "Compliance data",
          "Ownership structure",
        ],
        coverage: "50+ jurisdictions",
        accuracy: "Official registry data",
      },
    },
  ]

  const setupSteps = [
    {
      step: 1,
      title: "Get RapidAPI Account",
      description: "Sign up for free at rapidapi.com (takes 2 minutes)",
      action: "Sign Up Free",
      url: "https://rapidapi.com/auth/sign-up",
    },
    {
      step: 2,
      title: "Subscribe to APIs",
      description: "Subscribe to People Data Labs and Global Company Data APIs",
      action: "Subscribe Now",
      url: "https://rapidapi.com/peopledatalabs/api/people-data-labs-api",
    },
    {
      step: 3,
      title: "Get API Key",
      description: "Copy your RapidAPI key from the dashboard",
      action: "Get Key",
      url: "https://rapidapi.com/developer/dashboard",
    },
    {
      step: 4,
      title: "Add to Vercel",
      description: "Add RAPIDAPI_KEY to your environment variables",
      action: "Configure",
      url: "#",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600" />
            RapidAPI Integration Solutions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {rapidApiServices.map((service) => (
            <div key={service.category}>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                {service.icon}
                {service.category}
                <span className="text-sm text-red-500 ml-2">(Replacing: {service.original})</span>
              </h3>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-lg">{service.replacement.name}</h4>
                    <Badge variant="outline" className="text-blue-600 border-blue-600">
                      {service.replacement.cost}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{service.replacement.description}</p>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-green-600 mb-2">
                        <strong>Coverage:</strong> {service.replacement.coverage}
                      </div>
                      <div className="text-xs text-blue-600 mb-3">
                        <strong>Accuracy:</strong> {service.replacement.accuracy}
                      </div>
                    </div>

                    <ul className="text-xs space-y-1">
                      {service.replacement.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {feature}
                        </li>
                      ))}
                      {service.replacement.features.length > 3 && (
                        <li className="text-gray-500">+{service.replacement.features.length - 3} more features</li>
                      )}
                    </ul>
                  </div>

                  <Button variant="outline" size="sm" asChild>
                    <a href={service.replacement.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View on RapidAPI
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Setup Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {setupSteps.map((step) => (
              <div key={step.step} className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {step.step}
                  </div>
                  <h4 className="font-medium text-sm">{step.title}</h4>
                </div>
                <p className="text-xs text-gray-600 mb-3">{step.description}</p>
                {step.url !== "#" ? (
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href={step.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      {step.action}
                    </a>
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="w-full">
                    {step.action}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">⚡ RapidAPI Benefits</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h5 className="font-medium mb-1">Cost Effective:</h5>
            <ul className="space-y-1 text-xs">
              <li>• Pay-per-use pricing</li>
              <li>• No monthly minimums</li>
              <li>• Free tier available</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-1">Reliable:</h5>
            <ul className="space-y-1 text-xs">
              <li>• 99.9% uptime SLA</li>
              <li>• Global CDN</li>
              <li>• Built-in rate limiting</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <h4 className="font-medium text-green-900 mb-2">✅ Already Configured</h4>
        <p className="text-sm text-green-800">
          Your platform is ready to use RapidAPI services. Just add your RAPIDAPI_KEY:
        </p>
        <div className="mt-2 p-2 bg-gray-100 rounded font-mono text-xs">RAPIDAPI_KEY=your_rapidapi_key_here</div>
      </div>
    </div>
  )
}
