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
      query: query,
      type: type,
      minValue: minValue,
      maxValue: maxValue,
      location: location,
      propertyType: propertyType,
      ownerType: ownerType,
    })

    // Create cache key from search parameters
    const cacheKey = JSON.stringify({
      query,
      type,
      minValue,
      maxValue,
      location,
      propertyType,
      ownerType,
    })

    // Check cache first
    try {
      const cachedResults = await CacheService.getCachedSearchResults(cacheKey)
      if (cachedResults) {
        console.log("⚡ Returning cached search results:", {
          count: cachedResults.length,
          query: query,
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

    // Use PropertyService to search
    const propertyService = new PropertyService()

    // Build search filters
    const filters: any = {}
    if (minValue) filters.minValue = minValue
    if (maxValue) filters.maxValue = maxValue
    if (location) filters.location = location
    if (propertyType && propertyType !== "all") filters.propertyType = propertyType
    if (ownerType && ownerType !== "all") filters.ownerType = ownerType

    console.log("🔧 Built filters:", filters)

    let results: any[] = []

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

    console.log("📊 Search completed:", {
      query: query,
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
      query: query,
      filters: filters,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Search API error:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    })

    return NextResponse.json(
      {
        error: "Search failed",
        message: error instanceof Error ? error.message : "Unknown error",
        results: [],
        total: 0,
      },
      { status: 500 },
    )
  }
}
