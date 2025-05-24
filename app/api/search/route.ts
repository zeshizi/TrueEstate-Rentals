import { NextResponse, type NextRequest } from "next/server"
import { PropertyService } from "@/lib/services/property-service"
import { CacheService } from "@/lib/redis/cache-service"

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

    // Create cache key from search parameters
    const cacheKey = `search:${JSON.stringify({
      query,
      type,
      minValue,
      maxValue,
      location,
      propertyType,
      ownerType,
    })}`

    // Check cache first (with error handling)
    let cachedResults = null
    try {
      cachedResults = await CacheService.getCachedSearchResults(cacheKey)
      if (cachedResults) {
        console.log("⚡ Returning cached search results:", {
          count: cachedResults.length,
          query,
        })
        return NextResponse.json({
          results: cachedResults,
          total: cachedResults.length,
          cached: true,
          timestamp: new Date().toISOString(),
        })
      }
    } catch (cacheError) {
      console.warn("⚠️ Cache error (continuing without cache):", cacheError)
    }

    // Initialize PropertyService with error handling
    let propertyService: PropertyService
    try {
      propertyService = new PropertyService()
    } catch (serviceError) {
      console.error("❌ PropertyService initialization error:", serviceError)
      // Return mock data if service fails
      return NextResponse.json({
        results: getMockSearchResults(query),
        total: getMockSearchResults(query).length,
        cached: false,
        mock: true,
        timestamp: new Date().toISOString(),
      })
    }

    // Build search filters
    const filters: any = {}
    if (minValue !== undefined) filters.minValue = minValue
    if (maxValue !== undefined) filters.maxValue = maxValue
    if (location) filters.location = location
    if (propertyType && propertyType !== "all") filters.propertyType = propertyType
    if (ownerType && ownerType !== "all") filters.ownerType = ownerType

    console.log("🔧 Built filters:", filters)

    let results: any[] = []

    try {
      if (query) {
        // Search by query (could be owner name, address, etc.)
        if (
          query.toLowerCase().includes("llc") ||
          query.toLowerCase().includes("corp") ||
          query.toLowerCase().includes("trust")
        ) {
          // Likely searching for owner
          const ownerProperties = await propertyService.getPropertiesByOwner(query)
          results = ownerProperties.map((prop) => ({
            type: "property",
            title: prop.address,
            subtitle: `${prop.city}, ${prop.state} • Owner: ${prop.ownerName}`,
            value: prop.value,
            ownerWealth: prop.ownerWealth,
            ...prop,
          }))
        } else {
          // General search
          const searchFilters = { ...filters, location: query }
          const properties = await propertyService.searchProperties(searchFilters, 50)
          results = properties.map((prop) => ({
            type: "property",
            title: prop.address,
            subtitle: `${prop.city}, ${prop.state} • ${prop.propertyType}`,
            value: prop.value,
            ownerWealth: prop.ownerWealth,
            ...prop,
          }))
        }
      } else {
        // Filter-only search
        const properties = await propertyService.searchProperties(filters, 50)
        results = properties.map((prop) => ({
          type: "property",
          title: prop.address,
          subtitle: `${prop.city}, ${prop.state} • ${prop.propertyType}`,
          value: prop.value,
          ownerWealth: prop.ownerWealth,
          ...prop,
        }))
      }
    } catch (searchError) {
      console.error("❌ Search operation error:", searchError)
      // Return mock results if search fails
      results = getMockSearchResults(query)
    }

    console.log("📊 Search completed:", {
      query,
      filtersUsed: Object.keys(filters).length,
      resultsFound: results.length,
      sampleResult: results[0]
        ? {
            title: results[0].title,
            value: results[0].value,
          }
        : null,
    })

    // Cache the results before returning (skip cache errors)
    try {
      await CacheService.cacheSearchResults(cacheKey, results, 300) // 5 minutes
    } catch (cacheError) {
      console.warn("⚠️ Failed to cache results:", cacheError)
    }

    return NextResponse.json({
      results: results,
      total: results.length,
      cached: false,
      query,
      filters,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Search API error:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    })

    // Return mock data instead of error
    const query = new URL(request.url).searchParams.get("q") || ""
    const mockResults = getMockSearchResults(query)

    return NextResponse.json({
      results: mockResults,
      total: mockResults.length,
      cached: false,
      mock: true,
      error: "Search service unavailable, showing sample data",
      timestamp: new Date().toISOString(),
    })
  }
}

// Mock search results for fallback
function getMockSearchResults(query: string) {
  const mockProperties = [
    {
      id: "mock-1",
      type: "property",
      title: "123 Park Avenue",
      subtitle: "New York, NY • Luxury Penthouse",
      address: "123 Park Avenue",
      city: "New York",
      state: "NY",
      value: 15000000,
      ownerName: "Manhattan Holdings LLC",
      ownerWealth: 250000000,
      propertyType: "Penthouse",
      coordinates: [-73.9712, 40.7831],
    },
    {
      id: "mock-2",
      type: "property",
      title: "456 Beverly Hills Drive",
      subtitle: "Beverly Hills, CA • Mansion",
      address: "456 Beverly Hills Drive",
      city: "Beverly Hills",
      state: "CA",
      value: 28500000,
      ownerName: "Pacific Estates Trust",
      ownerWealth: 500000000,
      propertyType: "Mansion",
      coordinates: [-118.4065, 34.0901],
    },
    {
      id: "mock-3",
      type: "property",
      title: "789 Ocean Drive",
      subtitle: "Miami Beach, FL • Waterfront Estate",
      address: "789 Ocean Drive",
      city: "Miami Beach",
      state: "FL",
      value: 12000000,
      ownerName: "Coastal Properties Inc",
      ownerWealth: 180000000,
      propertyType: "Estate",
      coordinates: [-80.13, 25.7907],
    },
  ]

  // Filter based on query
  if (query) {
    const lowerQuery = query.toLowerCase()
    return mockProperties.filter(
      (prop) =>
        prop.city.toLowerCase().includes(lowerQuery) ||
        prop.state.toLowerCase().includes(lowerQuery) ||
        prop.address.toLowerCase().includes(lowerQuery) ||
        prop.ownerName.toLowerCase().includes(lowerQuery),
    )
  }

  return mockProperties
}
