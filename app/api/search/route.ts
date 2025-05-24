import { NextResponse, type NextRequest } from "next/server"

// Use the same sample data from properties API
const sampleProperties = [
  // Sample data for search (subset for faster response)
  {
    id: "search_ny_1",
    type: "property",
    title: "123 Park Avenue Penthouse",
    subtitle: "New York, NY • Luxury Penthouse",
    address: "123 Park Avenue",
    city: "New York",
    state: "NY",
    zipCode: "10016",
    value: 28500000,
    ownerName: "Wall Street Titan",
    ownerWealth: 1200000000,
    propertyType: "penthouse",
    coordinates: { lat: 40.7505, lng: -73.9934 },
    bedrooms: 6,
    bathrooms: 8,
    sqft: 10000,
    images: ["/placeholder.svg?height=300&width=400&text=Manhattan+Penthouse"],
    features: ["Central Park Views", "Rooftop Deck", "Wine Cellar", "Concierge"],
  },
  {
    id: "search_ca_1",
    type: "property",
    title: "456 Beverly Hills Drive Mansion",
    subtitle: "Beverly Hills, CA • Luxury Mansion",
    address: "456 Beverly Hills Drive",
    city: "Beverly Hills",
    state: "CA",
    zipCode: "90210",
    value: 25000000,
    ownerName: "Entertainment Mogul Inc",
    ownerWealth: 450000000,
    propertyType: "mansion",
    coordinates: { lat: 34.0736, lng: -118.4004 },
    bedrooms: 12,
    bathrooms: 15,
    sqft: 25000,
    images: ["/placeholder.svg?height=300&width=400&text=Beverly+Hills+Mansion"],
    features: ["Pool", "Wine Cellar", "Home Theater", "Tennis Court"],
  },
  {
    id: "search_fl_1",
    type: "property",
    title: "567 Miami Beach Ocean Drive",
    subtitle: "Miami Beach, FL • Oceanfront Penthouse",
    address: "567 Miami Beach Ocean Drive",
    city: "Miami Beach",
    state: "FL",
    zipCode: "33139",
    value: 9800000,
    ownerName: "International Real Estate Mogul",
    ownerWealth: 340000000,
    propertyType: "penthouse",
    coordinates: { lat: 25.7907, lng: -80.13 },
    bedrooms: 5,
    bathrooms: 6,
    sqft: 8500,
    images: ["/placeholder.svg?height=300&width=400&text=Miami+Beach+Penthouse"],
    features: ["Ocean View", "Private Beach", "Rooftop Pool", "Concierge"],
  },
  {
    id: "search_co_1",
    type: "property",
    title: "654 Aspen Mountain Road Lodge",
    subtitle: "Aspen, CO • Ski Lodge",
    address: "654 Aspen Mountain Road",
    city: "Aspen",
    state: "CO",
    zipCode: "81611",
    value: 15200000,
    ownerName: "Alpine Holdings Group",
    ownerWealth: 280000000,
    propertyType: "lodge",
    coordinates: { lat: 39.1911, lng: -106.8175 },
    bedrooms: 8,
    bathrooms: 9,
    sqft: 16000,
    images: ["/placeholder.svg?height=300&width=400&text=Aspen+Ski+Lodge"],
    features: ["Ski Access", "Hot Tub", "Fireplace", "Mountain Views"],
  },
  {
    id: "search_tx_1",
    type: "property",
    title: "987 Dallas Oil Empire Estate",
    subtitle: "Dallas, TX • Oil Executive Mansion",
    address: "987 Dallas Oil Empire Estate",
    city: "Dallas",
    state: "TX",
    zipCode: "75201",
    value: 12500000,
    ownerName: "Texas Oil Dynasty",
    ownerWealth: 850000000,
    propertyType: "mansion",
    coordinates: { lat: 32.7767, lng: -96.797 },
    bedrooms: 8,
    bathrooms: 10,
    sqft: 16000,
    images: ["/placeholder.svg?height=300&width=400&text=Texas+Oil+Mansion"],
    features: ["Pool", "Tennis Court", "Wine Cellar", "Guest House"],
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q") || ""
    const type = searchParams.get("type") || "all"
    const minValue = searchParams.get("minValue") ? Number.parseInt(searchParams.get("minValue")!) : undefined
    const maxValue = searchParams.get("maxValue") ? Number.parseInt(searchParams.get("maxValue")!) : undefined
    const location = searchParams.get("location") || ""
    const propertyType = searchParams.get("propertyType") || ""
    const ownerType = searchParams.get("ownerType") || ""

    console.log("🔍 Search API request:", {
      query,
      type,
      minValue,
      maxValue,
      location,
      propertyType,
      ownerType,
    })

    // Filter sample properties based on search criteria
    const results = sampleProperties.filter((property) => {
      // Query filter
      if (query) {
        const queryLower = query.toLowerCase()
        const titleMatch = property.title.toLowerCase().includes(queryLower)
        const cityMatch = property.city.toLowerCase().includes(queryLower)
        const stateMatch = property.state.toLowerCase().includes(queryLower)
        const ownerMatch = property.ownerName.toLowerCase().includes(queryLower)
        if (!titleMatch && !cityMatch && !stateMatch && !ownerMatch) return false
      }

      // Value range filter
      if (minValue && property.value < minValue) return false
      if (maxValue && property.value > maxValue) return false

      // Property type filter
      if (propertyType && propertyType !== "all") {
        if (!property.propertyType.toLowerCase().includes(propertyType.toLowerCase())) return false
      }

      // Location filter
      if (location) {
        const locationLower = location.toLowerCase()
        const cityMatch = property.city.toLowerCase().includes(locationLower)
        const stateMatch = property.state.toLowerCase().includes(locationLower)
        if (!cityMatch && !stateMatch) return false
      }

      return true
    })

    // Sort by value (highest first)
    results.sort((a, b) => b.value - a.value)

    console.log("📊 Search completed:", {
      query,
      filtersUsed: [minValue, maxValue, propertyType, location].filter(Boolean).length,
      resultsFound: results.length,
      sampleResult: results[0]
        ? {
            title: results[0].title,
            value: results[0].value,
          }
        : null,
    })

    return NextResponse.json({
      results: results,
      total: results.length,
      cached: false,
      query,
      filters: { minValue, maxValue, propertyType, location },
      timestamp: new Date().toISOString(),
      dataSource: "sample",
    })
  } catch (error) {
    console.error("❌ Search API error:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    })

    // Return sample data instead of error
    return NextResponse.json({
      results: sampleProperties.slice(0, 3),
      total: 3,
      cached: false,
      mock: true,
      error: "Search service unavailable, showing sample data",
      timestamp: new Date().toISOString(),
      dataSource: "sample",
    })
  }
}
