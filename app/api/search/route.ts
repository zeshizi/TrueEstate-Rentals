import { NextResponse, type NextRequest } from "next/server"
import properties from "./data.json"
import { CacheService } from "@/lib/redis/cache-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q") || ""
    const location = searchParams.get("location") || ""
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const propertyType = searchParams.get("propertyType") || ""

    console.log("🔍 Search request:", { query, location, minPrice, maxPrice, propertyType })

    // Create cache key from search parameters
    const cacheKey = JSON.stringify({ query, location, minPrice, maxPrice, propertyType })

    // Check cache first
    const cachedResults = await CacheService.getCachedSearchResults(cacheKey)
    if (cachedResults) {
      console.log("⚡ Returning cached search results")
      return NextResponse.json({
        properties: cachedResults,
        total: cachedResults.length,
        cached: true,
        timestamp: new Date().toISOString(),
      })
    }

    let filteredProperties = properties

    if (query) {
      filteredProperties = filteredProperties.filter((property) =>
        property.title.toLowerCase().includes(query.toLowerCase()),
      )
    }

    if (location) {
      filteredProperties = filteredProperties.filter((property) =>
        property.location.toLowerCase().includes(location.toLowerCase()),
      )
    }

    if (minPrice) {
      filteredProperties = filteredProperties.filter((property) => property.price >= Number(minPrice))
    }

    if (maxPrice) {
      filteredProperties = filteredProperties.filter((property) => property.price <= Number(maxPrice))
    }

    if (propertyType) {
      filteredProperties = filteredProperties.filter(
        (property) => property.propertyType.toLowerCase() === propertyType.toLowerCase(),
      )
    }

    // Cache the results before returning
    await CacheService.cacheSearchResults(cacheKey, filteredProperties, 300) // 5 minutes

    return NextResponse.json({
      properties: filteredProperties,
      total: filteredProperties.length,
      cached: false,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}
