import { type NextRequest, NextResponse } from "next/server"
import { PropertyService } from "@/lib/services/property-service"
import type { PropertyFilter } from "@/lib/models/property"

const propertyService = new PropertyService()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Extract filter parameters
    const filters: PropertyFilter = {
      minValue: searchParams.get("minValue") ? Number.parseInt(searchParams.get("minValue")!) : undefined,
      maxValue: searchParams.get("maxValue") ? Number.parseInt(searchParams.get("maxValue")!) : undefined,
      propertyType: searchParams.get("propertyType") || undefined,
      ownerType: searchParams.get("ownerType") || undefined,
      wealthRange: searchParams.get("wealthRange") || undefined,
      location: searchParams.get("search") || searchParams.get("location") || undefined,
      bedrooms: searchParams.get("bedrooms") ? Number.parseInt(searchParams.get("bedrooms")!) : undefined,
      bathrooms: searchParams.get("bathrooms") ? Number.parseInt(searchParams.get("bathrooms")!) : undefined,
      minSqft: searchParams.get("minSqft") ? Number.parseInt(searchParams.get("minSqft")!) : undefined,
      maxSqft: searchParams.get("maxSqft") ? Number.parseInt(searchParams.get("maxSqft")!) : undefined,
    }

    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const skip = Number.parseInt(searchParams.get("skip") || "0")

    console.log("🔍 Properties API - Using MongoDB with filters:", filters)

    // Try to get data from MongoDB first
    let properties = await propertyService.searchProperties(filters, limit, skip)

    // If no data in MongoDB, seed sample data and try again
    if (properties.length === 0 && !filters.location && !filters.propertyType) {
      console.log("📦 No data found, seeding sample data...")
      await propertyService.seedSampleData()
      properties = await propertyService.searchProperties(filters, limit, skip)
    }

    const marketStats = await propertyService.getMarketStats(filters.location)

    console.log("📊 MongoDB Results:", {
      total: properties.length,
      marketStats,
    })

    return NextResponse.json({
      properties,
      total: properties.length,
      marketStats,
      filters,
      dataSource: "mongodb",
    })
  } catch (error) {
    console.error("❌ MongoDB Properties API error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch properties from MongoDB",
        details: error instanceof Error ? error.message : "Unknown error",
        dataSource: "error",
      },
      { status: 500 },
    )
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
