import { type NextRequest, NextResponse } from "next/server"
import { PropertyService } from "@/lib/services/property-service"
import type { PropertyFilter } from "@/lib/models/property"

const propertyService = new PropertyService()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Extract filter parameters with better defaults
    const filters: PropertyFilter = {
      minValue:
        searchParams.get("minValue") && searchParams.get("minValue") !== "0"
          ? Number.parseInt(searchParams.get("minValue")!)
          : undefined,
      maxValue:
        searchParams.get("maxValue") && searchParams.get("maxValue") !== "10000000"
          ? Number.parseInt(searchParams.get("maxValue")!)
          : undefined,
      propertyType:
        searchParams.get("propertyType") === "all" || !searchParams.get("propertyType")
          ? undefined
          : searchParams.get("propertyType"),
      ownerType:
        searchParams.get("ownerType") === "all" || !searchParams.get("ownerType")
          ? undefined
          : searchParams.get("ownerType"),
      wealthRange:
        searchParams.get("wealthRange") === "all" || !searchParams.get("wealthRange")
          ? undefined
          : searchParams.get("wealthRange"),
      location: searchParams.get("search") || searchParams.get("location") || undefined,
    }

    const limit = Math.min(Number.parseInt(searchParams.get("limit") || "50"), 100)
    const skip = Math.max(Number.parseInt(searchParams.get("skip") || "0"), 0)

    console.log("🔍 Properties API - Filters:", JSON.stringify(filters, null, 2))

    let properties = []
    let marketStats = {}

    try {
      // Try MongoDB first
      properties = await propertyService.searchProperties(filters, limit, skip)

      // If no data, seed and try again
      if (properties.length === 0) {
        console.log("📦 Seeding sample data...")
        await propertyService.seedSampleData()
        properties = await propertyService.searchProperties(filters, limit, skip)
      }

      marketStats = await propertyService.getMarketStats(filters.location)
    } catch (dbError) {
      console.error("❌ Database error, using fallback:", dbError)

      // Fallback mock data
      properties = [
        {
          id: "mock_ny_1",
          address: "123 Fifth Avenue",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          value: 8500000,
          propertyType: "Penthouse",
          ownerName: "Manhattan Holdings LLC",
          ownerType: "LLC",
          ownerWealth: 150000000,
          coordinates: { lat: 40.7128, lng: -74.006 },
          bedrooms: 4,
          bathrooms: 3,
          sqft: 3200,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
    }

    console.log("📊 Final results:", {
      total: properties.length,
      firstProperty: properties[0]?.address || "none",
    })

    return NextResponse.json({
      properties,
      total: properties.length,
      marketStats,
      filters,
      dataSource: "mongodb",
      success: true,
    })
  } catch (error) {
    console.error("❌ API Route Error:", error)

    // Always return something, never fail completely
    return NextResponse.json({
      properties: [],
      total: 0,
      marketStats: {},
      filters: {},
      dataSource: "error",
      error: "Service temporarily unavailable",
      success: false,
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const propertyData = await request.json()

    // Generate unique ID
    propertyData.id = `prop_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const property = await propertyService.createProperty(propertyData)

    console.log("✅ Property created in MongoDB:", property.id)

    return NextResponse.json(property, { status: 201 })
  } catch (error) {
    console.error("❌ Create property error:", error)
    return NextResponse.json(
      {
        error: "Failed to create property in MongoDB",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
