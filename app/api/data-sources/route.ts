import { type NextRequest, NextResponse } from "next/server"

// API to list and manage available data sources
export async function GET(request: NextRequest) {
  const dataSources = [
    {
      id: "data-gov",
      name: "Data.gov",
      description: "U.S. Government's open data portal with 310,995+ datasets",
      url: "https://data.gov",
      categories: ["Property Assessments", "Real Estate Sales", "Demographics", "Building Permits"],
      status: "active",
      apiKey: !!process.env.DATA_GOV_API_KEY,
      cost: "Free",
      rateLimit: "1000 requests/hour",
    },
    {
      id: "census-bureau",
      name: "U.S. Census Bureau",
      description: "Demographic and housing statistics",
      url: "https://api.census.gov",
      categories: ["Demographics", "Housing", "Income", "Population"],
      status: "active",
      apiKey: !!process.env.CENSUS_API_KEY,
      cost: "Free",
      rateLimit: "500 requests/day",
    },
    {
      id: "openstreetmap",
      name: "OpenStreetMap",
      description: "Free, editable map of the world",
      url: "https://www.openstreetmap.org",
      categories: ["Mapping", "Geocoding", "Points of Interest"],
      status: "active",
      apiKey: false,
      cost: "Free",
      rateLimit: "Unlimited",
    },
    {
      id: "google-maps",
      name: "Google Maps",
      description: "Comprehensive mapping and geocoding services",
      url: "https://maps.googleapis.com",
      categories: ["Mapping", "Geocoding", "Places", "Directions"],
      status: process.env.GOOGLE_MAPS_API_KEY ? "active" : "inactive",
      apiKey: !!process.env.GOOGLE_MAPS_API_KEY,
      cost: "$2-7 per 1000 requests",
      rateLimit: "Varies by service",
    },
    {
      id: "clearbit",
      name: "Clearbit",
      description: "Company and person data enrichment",
      url: "https://clearbit.com",
      categories: ["Company Data", "Person Data", "Enrichment"],
      status: process.env.CLEARBIT_API_KEY ? "active" : "inactive",
      apiKey: !!process.env.CLEARBIT_API_KEY,
      cost: "Free tier: 50 requests/month",
      rateLimit: "600 requests/hour",
    },
  ]

  return NextResponse.json({
    sources: dataSources,
    summary: {
      total: dataSources.length,
      active: dataSources.filter((s) => s.status === "active").length,
      free: dataSources.filter((s) => s.cost === "Free").length,
      withApiKey: dataSources.filter((s) => s.apiKey).length,
    },
  })
}
