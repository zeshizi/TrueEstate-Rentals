import { NextResponse } from "next/server"
import { PropertyService } from "@/lib/services/property-service"

const propertyService = new PropertyService()

// Sample properties across major US cities
const sampleProperties = [
  {
    id: "prop_manhattan_001",
    address: "432 Park Avenue, New York, NY 10022",
    lat: 40.7614,
    lng: -73.9776,
    value: 45000000,
    ownerName: "Harrison Sterling",
    ownerWealth: 125000000,
    ownerType: "individual",
    propertyType: "condo",
    bedrooms: 4,
    bathrooms: 5,
    sqft: 4500,
    yearBuilt: 2015,
    confidence: "High" as const,
    dataSource: "manual",
    isActive: true,
  },
  {
    id: "prop_beverly_hills_001",
    address: "1210 Benedict Canyon Drive, Beverly Hills, CA 90210",
    lat: 34.1184,
    lng: -118.4108,
    value: 28000000,
    ownerName: "Victoria Chen",
    ownerWealth: 85000000,
    ownerType: "individual",
    propertyType: "single-family",
    bedrooms: 6,
    bathrooms: 8,
    sqft: 12000,
    yearBuilt: 2018,
    confidence: "High" as const,
    dataSource: "manual",
    isActive: true,
  },
  {
    id: "prop_miami_001",
    address: "1425 Brickell Avenue, Miami, FL 33131",
    lat: 25.7617,
    lng: -80.1918,
    value: 15000000,
    ownerName: "Rodriguez Family Trust",
    ownerWealth: 45000000,
    ownerType: "trust",
    propertyType: "condo",
    bedrooms: 3,
    bathrooms: 4,
    sqft: 3200,
    yearBuilt: 2020,
    confidence: "Medium" as const,
    dataSource: "manual",
    isActive: true,
  },
  {
    id: "prop_chicago_001",
    address: "875 North Michigan Avenue, Chicago, IL 60611",
    lat: 41.8986,
    lng: -87.6233,
    value: 8500000,
    ownerName: "Michael Thompson",
    ownerWealth: 32000000,
    ownerType: "individual",
    propertyType: "condo",
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2800,
    yearBuilt: 2016,
    confidence: "High" as const,
    dataSource: "manual",
    isActive: true,
  },
  {
    id: "prop_san_francisco_001",
    address: "2712 Broadway Street, San Francisco, CA 94115",
    lat: 37.7749,
    lng: -122.4194,
    value: 22000000,
    ownerName: "Tech Ventures LLC",
    ownerWealth: 180000000,
    ownerType: "corporation",
    propertyType: "single-family",
    bedrooms: 5,
    bathrooms: 6,
    sqft: 8500,
    yearBuilt: 1925,
    confidence: "Medium" as const,
    dataSource: "manual",
    isActive: true,
  },
  {
    id: "prop_boston_001",
    address: "1 Beacon Street, Boston, MA 02108",
    lat: 42.3601,
    lng: -71.0589,
    value: 12000000,
    ownerName: "Elizabeth Whitmore",
    ownerWealth: 55000000,
    ownerType: "individual",
    propertyType: "townhouse",
    bedrooms: 4,
    bathrooms: 5,
    sqft: 5200,
    yearBuilt: 1890,
    confidence: "High" as const,
    dataSource: "manual",
    isActive: true,
  },
  {
    id: "prop_seattle_001",
    address: "2033 2nd Avenue, Seattle, WA 98121",
    lat: 47.6062,
    lng: -122.3321,
    value: 18000000,
    ownerName: "Pacific Holdings Group",
    ownerWealth: 95000000,
    ownerType: "corporation",
    propertyType: "condo",
    bedrooms: 4,
    bathrooms: 4,
    sqft: 4200,
    yearBuilt: 2019,
    confidence: "High" as const,
    dataSource: "manual",
    isActive: true,
  },
  {
    id: "prop_austin_001",
    address: "1717 West 6th Street, Austin, TX 78703",
    lat: 30.2672,
    lng: -97.7431,
    value: 6500000,
    ownerName: "James Morrison",
    ownerWealth: 28000000,
    ownerType: "individual",
    propertyType: "single-family",
    bedrooms: 5,
    bathrooms: 6,
    sqft: 7200,
    yearBuilt: 2021,
    confidence: "Medium" as const,
    dataSource: "manual",
    isActive: true,
  },
  {
    id: "prop_denver_001",
    address: "1350 Lawrence Street, Denver, CO 80204",
    lat: 39.7392,
    lng: -104.9903,
    value: 4200000,
    ownerName: "Mountain View Investments",
    ownerWealth: 15000000,
    ownerType: "corporation",
    propertyType: "condo",
    bedrooms: 2,
    bathrooms: 3,
    sqft: 2200,
    yearBuilt: 2017,
    confidence: "Low" as const,
    dataSource: "manual",
    isActive: true,
  },
  {
    id: "prop_nashville_001",
    address: "1212 Laurel Street, Nashville, TN 37203",
    lat: 36.1627,
    lng: -86.7816,
    value: 3800000,
    ownerName: "Sarah Williams",
    ownerWealth: 12000000,
    ownerType: "individual",
    propertyType: "single-family",
    bedrooms: 4,
    bathrooms: 4,
    sqft: 4800,
    yearBuilt: 2020,
    confidence: "Medium" as const,
    dataSource: "manual",
    isActive: true,
  },
  {
    id: "prop_atlanta_001",
    address: "3630 Peachtree Road NE, Atlanta, GA 30326",
    lat: 33.749,
    lng: -84.388,
    value: 5200000,
    ownerName: "Southern Capital Trust",
    ownerWealth: 22000000,
    ownerType: "trust",
    propertyType: "condo",
    bedrooms: 3,
    bathrooms: 4,
    sqft: 3600,
    yearBuilt: 2018,
    confidence: "High" as const,
    dataSource: "manual",
    isActive: true,
  },
  {
    id: "prop_phoenix_001",
    address: "7137 East Rancho Vista Drive, Scottsdale, AZ 85251",
    lat: 33.4484,
    lng: -111.926,
    value: 7800000,
    ownerName: "Desert Luxury Holdings",
    ownerWealth: 35000000,
    ownerType: "corporation",
    propertyType: "single-family",
    bedrooms: 6,
    bathrooms: 7,
    sqft: 9200,
    yearBuilt: 2019,
    confidence: "Medium" as const,
    dataSource: "manual",
    isActive: true,
  },
  {
    id: "prop_portland_001",
    address: "1420 NW Lovejoy Street, Portland, OR 97209",
    lat: 45.5152,
    lng: -122.6784,
    value: 3200000,
    ownerName: "Green Valley Investments",
    ownerWealth: 18000000,
    ownerType: "corporation",
    propertyType: "townhouse",
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2800,
    yearBuilt: 2016,
    confidence: "Low" as const,
    dataSource: "manual",
    isActive: true,
  },
  {
    id: "prop_las_vegas_001",
    address: "11835 Tevare Lane, Las Vegas, NV 89138",
    lat: 36.1699,
    lng: -115.1398,
    value: 9200000,
    ownerName: "Casino Royale Holdings",
    ownerWealth: 65000000,
    ownerType: "corporation",
    propertyType: "single-family",
    bedrooms: 7,
    bathrooms: 9,
    sqft: 11500,
    yearBuilt: 2020,
    confidence: "High" as const,
    dataSource: "manual",
    isActive: true,
  },
  {
    id: "prop_washington_dc_001",
    address: "2660 Connecticut Avenue NW, Washington, DC 20008",
    lat: 38.9072,
    lng: -77.0369,
    value: 14500000,
    ownerName: "Capital Elite Trust",
    ownerWealth: 78000000,
    ownerType: "trust",
    propertyType: "condo",
    bedrooms: 4,
    bathrooms: 5,
    sqft: 4800,
    yearBuilt: 2017,
    confidence: "High" as const,
    dataSource: "manual",
    isActive: true,
  },
]

export async function POST() {
  try {
    console.log("Starting to seed property data...")

    const results = []
    for (const property of sampleProperties) {
      try {
        // Check if property already exists
        const existing = await propertyService.getProperty(property.id)
        if (existing) {
          console.log(`Property ${property.id} already exists, skipping...`)
          results.push({ id: property.id, status: "exists" })
          continue
        }

        // Create new property
        const created = await propertyService.createProperty(property)
        console.log(`Created property: ${property.address}`)
        results.push({ id: property.id, status: "created", property: created })
      } catch (error) {
        console.error(`Failed to create property ${property.id}:`, error)
        results.push({ id: property.id, status: "error", error: error.message })
      }
    }

    return NextResponse.json({
      success: true,
      message: `Seeded ${results.filter((r) => r.status === "created").length} properties`,
      results,
      total: sampleProperties.length,
    })
  } catch (error) {
    console.error("Seed data error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to seed data",
        details: error.message,
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const stats = await propertyService.getMarketStats()
    const sampleProperty = await propertyService.getProperty("prop_manhattan_001")

    return NextResponse.json({
      message: "Seed data endpoint ready",
      sampleDataAvailable: sampleProperties.length,
      currentStats: stats,
      sampleProperty: sampleProperty ? "Found" : "Not found",
      instructions: "POST to this endpoint to seed the database with sample properties",
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: "Database connection issue",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
