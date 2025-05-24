import { type NextRequest, NextResponse } from "next/server"

// Mock property data for demonstration
const mockProperties = [
  {
    id: "prop_1",
    address: "123 Park Avenue",
    city: "New York",
    state: "NY",
    zipCode: "10016",
    price: 2500000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1800,
    propertyType: "Condo",
    yearBuilt: 2015,
    lotSize: 0,
    owner: {
      name: "Manhattan Holdings LLC",
      type: "LLC" as const,
      estimatedNetWorth: 15000000,
    },
    lastSaleDate: "2023-06-15",
    lastSalePrice: 2300000,
    images: ["/placeholder.svg?height=300&width=400&text=NYC+Condo"],
    features: ["Doorman", "Gym", "Rooftop Deck"],
    isActive: true,
    dataSource: "manual",
  },
  {
    id: "prop_2",
    address: "456 Beverly Hills Drive",
    city: "Beverly Hills",
    state: "CA",
    zipCode: "90210",
    price: 8500000,
    bedrooms: 5,
    bathrooms: 6,
    squareFeet: 4500,
    propertyType: "Single Family",
    yearBuilt: 2018,
    lotSize: 12000,
    owner: {
      name: "Sarah Johnson",
      type: "Individual" as const,
      estimatedNetWorth: 45000000,
    },
    lastSaleDate: "2022-03-20",
    lastSalePrice: 7800000,
    images: ["/placeholder.svg?height=300&width=400&text=Beverly+Hills+Mansion"],
    features: ["Pool", "Wine Cellar", "Home Theater"],
    isActive: true,
    dataSource: "manual",
  },
  {
    id: "prop_3",
    address: "789 Lakeshore Boulevard",
    city: "Chicago",
    state: "IL",
    zipCode: "60611",
    price: 1200000,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1400,
    propertyType: "Townhouse",
    yearBuilt: 2020,
    lotSize: 2000,
    owner: {
      name: "Chicago Investment Trust",
      type: "Trust" as const,
      estimatedNetWorth: 25000000,
    },
    lastSaleDate: "2023-01-10",
    lastSalePrice: 1150000,
    images: ["/placeholder.svg?height=300&width=400&text=Chicago+Townhouse"],
    features: ["Garage", "Fireplace", "Balcony"],
    isActive: true,
    dataSource: "manual",
  },
  {
    id: "prop_4",
    address: "321 Ocean Drive",
    city: "Miami",
    state: "FL",
    zipCode: "33139",
    price: 3200000,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2800,
    propertyType: "Condo",
    yearBuilt: 2019,
    lotSize: 0,
    owner: {
      name: "Global Properties Corp",
      type: "Corporate" as const,
      estimatedNetWorth: 120000000,
    },
    lastSaleDate: "2023-08-05",
    lastSalePrice: 3000000,
    images: ["/placeholder.svg?height=300&width=400&text=Miami+Oceanfront"],
    features: ["Ocean View", "Concierge", "Spa"],
    isActive: true,
    dataSource: "manual",
  },
  {
    id: "prop_5",
    address: "654 Tech Valley Road",
    city: "Austin",
    state: "TX",
    zipCode: "78701",
    price: 950000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 2200,
    propertyType: "Single Family",
    yearBuilt: 2021,
    lotSize: 8000,
    owner: {
      name: "Michael Chen",
      type: "Individual" as const,
      estimatedNetWorth: 8500000,
    },
    lastSaleDate: "2023-04-12",
    lastSalePrice: 920000,
    images: ["/placeholder.svg?height=300&width=400&text=Austin+Modern+Home"],
    features: ["Smart Home", "Solar Panels", "EV Charging"],
    isActive: true,
    dataSource: "manual",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Extract filter parameters
    const minValue = searchParams.get("minValue") ? Number.parseInt(searchParams.get("minValue")!) : 0
    const maxValue = searchParams.get("maxValue")
      ? Number.parseInt(searchParams.get("maxValue")!)
      : Number.MAX_SAFE_INTEGER
    const propertyType = searchParams.get("propertyType") || "all"
    const ownerType = searchParams.get("ownerType") || "all"
    const wealthRange = searchParams.get("wealthRange") || "all"
    const location = searchParams.get("search") || searchParams.get("location") || ""
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const skip = Number.parseInt(searchParams.get("skip") || "0")

    console.log("🔍 Properties API - Filters:", {
      minValue,
      maxValue,
      propertyType,
      ownerType,
      wealthRange,
      location,
      limit,
      skip,
    })

    // Filter properties based on criteria
    const filteredProperties = mockProperties.filter((property) => {
      // Price range filter
      if (property.price < minValue || property.price > maxValue) {
        return false
      }

      // Property type filter
      if (propertyType !== "all" && propertyType !== "all") {
        const normalizedPropertyType = property.propertyType.toLowerCase().replace(/\s+/g, "-")
        const normalizedFilterType = propertyType.toLowerCase()
        if (normalizedPropertyType !== normalizedFilterType) {
          return false
        }
      }

      // Owner type filter
      if (ownerType !== "all") {
        const normalizedOwnerType = property.owner.type.toLowerCase()
        const normalizedFilterType = ownerType.toLowerCase()
        if (
          normalizedOwnerType !== normalizedFilterType &&
          !(normalizedFilterType === "corporation" && normalizedOwnerType === "corporate")
        ) {
          return false
        }
      }

      // Wealth range filter
      if (wealthRange !== "all" && property.owner.estimatedNetWorth) {
        const netWorth = property.owner.estimatedNetWorth
        switch (wealthRange) {
          case "1m-5m":
            if (netWorth < 1000000 || netWorth >= 5000000) return false
            break
          case "5m-10m":
            if (netWorth < 5000000 || netWorth >= 10000000) return false
            break
          case "10m-50m":
            if (netWorth < 10000000 || netWorth >= 50000000) return false
            break
          case "50m+":
            if (netWorth < 50000000) return false
            break
        }
      }

      // Location filter
      if (location) {
        const searchTerm = location.toLowerCase()
        const addressMatch = property.address.toLowerCase().includes(searchTerm)
        const cityMatch = property.city.toLowerCase().includes(searchTerm)
        const stateMatch = property.state.toLowerCase().includes(searchTerm)
        if (!addressMatch && !cityMatch && !stateMatch) {
          return false
        }
      }

      return true
    })

    // Apply pagination
    const paginatedProperties = filteredProperties.slice(skip, skip + limit)

    // Generate market stats
    const marketStats = {
      averagePrice:
        filteredProperties.length > 0
          ? Math.round(filteredProperties.reduce((sum, p) => sum + p.price, 0) / filteredProperties.length)
          : 0,
      totalProperties: filteredProperties.length,
      priceRange:
        filteredProperties.length > 0
          ? {
              min: Math.min(...filteredProperties.map((p) => p.price)),
              max: Math.max(...filteredProperties.map((p) => p.price)),
            }
          : { min: 0, max: 0 },
    }

    console.log("📊 Properties API - Results:", {
      total: filteredProperties.length,
      returned: paginatedProperties.length,
      marketStats,
    })

    return NextResponse.json({
      properties: paginatedProperties,
      total: filteredProperties.length,
      marketStats,
      filters: {
        minValue,
        maxValue,
        propertyType,
        ownerType,
        wealthRange,
        location,
      },
    })
  } catch (error) {
    console.error("❌ Properties API error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch properties",
        details: error instanceof Error ? error.message : "Unknown error",
        properties: [],
        total: 0,
        marketStats: {
          averagePrice: 0,
          totalProperties: 0,
          priceRange: { min: 0, max: 0 },
        },
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
    propertyData.isActive = true
    propertyData.dataSource = "manual"

    console.log("✅ Property created:", propertyData.id)

    return NextResponse.json(propertyData, { status: 201 })
  } catch (error) {
    console.error("❌ Create property error:", error)
    return NextResponse.json(
      {
        error: "Failed to create property",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
