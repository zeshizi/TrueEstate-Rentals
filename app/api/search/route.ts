import { NextResponse, type NextRequest } from "next/server"

// Comprehensive property data for all accommodation types
const sampleProperties = [
  // ROOMS - Shared accommodations
  {
    id: "room_1",
    type: "property",
    category: "room",
    title: "Shared Room near Harvard University",
    subtitle: "Cambridge, MA • Shared Room • $750/month",
    address: "123 Harvard Street",
    city: "Cambridge",
    state: "MA",
    zipCode: "02138",
    value: 750,
    monthlyRent: 750,
    ownerName: "Student Housing Co-op",
    ownerWealth: 2500000,
    propertyType: "shared_room",
    coordinates: { lat: 42.3736, lng: -71.1097 },
    bedrooms: 1,
    bathrooms: 1,
    sqft: 200,
    images: ["/placeholder.svg?height=300&width=400&text=Harvard+Shared+Room"],
    features: ["WiFi", "Study Desk", "Shared Kitchen", "Laundry", "Near Campus"],
    amenities: ["WiFi", "Study Area", "Shared Kitchen", "Laundry"],
    studentFriendly: true,
    verified: true,
    rating: 4.3,
    roommates: 2,
    furnished: true,
  },
  {
    id: "room_2",
    type: "property",
    category: "room",
    title: "Cozy Room with Study Space",
    subtitle: "Austin, TX • Shared Apartment • $650/month",
    address: "456 University Avenue",
    city: "Austin",
    state: "TX",
    zipCode: "78705",
    value: 650,
    monthlyRent: 650,
    ownerName: "UT Student Housing",
    ownerWealth: 1800000,
    propertyType: "shared_room",
    coordinates: { lat: 30.2849, lng: -97.7341 },
    bedrooms: 1,
    bathrooms: 1,
    sqft: 180,
    images: ["/placeholder.svg?height=300&width=400&text=Austin+Study+Room"],
    features: ["WiFi", "Study Desk", "AC", "Parking", "Bus Route"],
    amenities: ["WiFi", "Study Desk", "AC", "Parking"],
    studentFriendly: true,
    verified: true,
    rating: 4.5,
    roommates: 3,
    furnished: true,
  },
  {
    id: "room_3",
    type: "property",
    category: "room",
    title: "Female-Only Shared Room",
    subtitle: "Boston, MA • Safe Environment • $800/month",
    address: "789 Commonwealth Ave",
    city: "Boston",
    state: "MA",
    zipCode: "02215",
    value: 800,
    monthlyRent: 800,
    ownerName: "Women's Housing Collective",
    ownerWealth: 3200000,
    propertyType: "shared_room",
    coordinates: { lat: 42.3505, lng: -71.0956 },
    bedrooms: 1,
    bathrooms: 1,
    sqft: 220,
    images: ["/placeholder.svg?height=300&width=400&text=Boston+Female+Room"],
    features: ["WiFi", "Security", "Study Area", "Female Only", "Near T-Station"],
    amenities: ["WiFi", "Security", "Study Area", "Female Only"],
    studentFriendly: true,
    verified: true,
    rating: 4.7,
    roommates: 2,
    furnished: true,
    genderSpecific: "female",
  },

  // HOSTELS - Budget accommodations
  {
    id: "hostel_1",
    type: "property",
    category: "hostel",
    title: "Modern Student Hostel",
    subtitle: "Austin, TX • Budget Friendly • $450/month",
    address: "321 Student Life Drive",
    city: "Austin",
    state: "TX",
    zipCode: "78712",
    value: 450,
    monthlyRent: 450,
    ownerName: "Campus Hostels Inc",
    ownerWealth: 5500000,
    propertyType: "hostel",
    coordinates: { lat: 30.2862, lng: -97.7394 },
    bedrooms: 1,
    bathrooms: 1,
    sqft: 150,
    images: ["/placeholder.svg?height=300&width=400&text=Austin+Modern+Hostel"],
    features: ["WiFi", "Common Kitchen", "Study Room", "Laundry", "24/7 Security"],
    amenities: ["WiFi", "Common Kitchen", "Study Room", "Security"],
    studentFriendly: true,
    verified: true,
    rating: 4.1,
    capacity: 8,
    furnished: true,
    meals: false,
  },
  {
    id: "hostel_2",
    type: "property",
    category: "hostel",
    title: "Budget Hostel near Campus",
    subtitle: "Atlanta, GA • Affordable • $380/month",
    address: "654 College Street",
    city: "Atlanta",
    state: "GA",
    zipCode: "30309",
    value: 380,
    monthlyRent: 380,
    ownerName: "Georgia Student Housing",
    ownerWealth: 4200000,
    propertyType: "hostel",
    coordinates: { lat: 33.7756, lng: -84.3963 },
    bedrooms: 1,
    bathrooms: 1,
    sqft: 120,
    images: ["/placeholder.svg?height=300&width=400&text=Atlanta+Budget+Hostel"],
    features: ["WiFi", "Shared Kitchen", "Study Area", "Bike Storage", "Metro Access"],
    amenities: ["WiFi", "Shared Kitchen", "Study Area", "Bike Storage"],
    studentFriendly: true,
    verified: true,
    rating: 3.9,
    capacity: 12,
    furnished: true,
    meals: false,
  },
  {
    id: "hostel_3",
    type: "property",
    category: "hostel",
    title: "International Student Hostel",
    subtitle: "Phoenix, AZ • Diverse Community • $520/month",
    address: "987 International Way",
    city: "Phoenix",
    state: "AZ",
    zipCode: "85281",
    value: 520,
    monthlyRent: 520,
    ownerName: "Global Student Living",
    ownerWealth: 6800000,
    propertyType: "hostel",
    coordinates: { lat: 33.4152, lng: -111.9315 },
    bedrooms: 1,
    bathrooms: 1,
    sqft: 160,
    images: ["/placeholder.svg?height=300&width=400&text=Phoenix+International+Hostel"],
    features: ["WiFi", "Common Areas", "Cultural Events", "Language Exchange", "Pool"],
    amenities: ["WiFi", "Common Areas", "Cultural Events", "Pool"],
    studentFriendly: true,
    verified: true,
    rating: 4.4,
    capacity: 15,
    furnished: true,
    meals: false,
    international: true,
  },

  // PGs - Paying Guest accommodations
  {
    id: "pg_1",
    type: "property",
    category: "pg",
    title: "Premium PG with Meals",
    subtitle: "Atlanta, GA • Full Service • $950/month",
    address: "234 Peachtree Street",
    city: "Atlanta",
    state: "GA",
    zipCode: "30308",
    value: 950,
    monthlyRent: 950,
    ownerName: "Premium Student Services",
    ownerWealth: 8500000,
    propertyType: "pg",
    coordinates: { lat: 33.7701, lng: -84.387 },
    bedrooms: 1,
    bathrooms: 1,
    sqft: 180,
    images: ["/placeholder.svg?height=300&width=400&text=Atlanta+Premium+PG"],
    features: ["Meals Included", "WiFi", "AC", "Housekeeping", "Security", "Study Room"],
    amenities: ["Meals Included", "WiFi", "AC", "Housekeeping"],
    studentFriendly: true,
    verified: true,
    rating: 4.6,
    furnished: true,
    meals: true,
    mealsPerDay: 3,
    housekeeping: true,
  },
  {
    id: "pg_2",
    type: "property",
    category: "pg",
    title: "Executive PG for Professionals",
    subtitle: "Denver, CO • Premium Service • $1200/month",
    address: "567 Executive Plaza",
    city: "Denver",
    state: "CO",
    zipCode: "80202",
    value: 1200,
    monthlyRent: 1200,
    ownerName: "Executive Living Solutions",
    ownerWealth: 12000000,
    propertyType: "pg",
    coordinates: { lat: 39.7392, lng: -104.9903 },
    bedrooms: 1,
    bathrooms: 1,
    sqft: 220,
    images: ["/placeholder.svg?height=300&width=400&text=Denver+Executive+PG"],
    features: ["Meals Included", "WiFi", "AC", "Gym", "Business Center", "Concierge"],
    amenities: ["Meals Included", "WiFi", "Gym", "Business Center"],
    studentFriendly: true,
    verified: true,
    rating: 4.8,
    furnished: true,
    meals: true,
    mealsPerDay: 2,
    housekeeping: true,
    businessCenter: true,
  },
  {
    id: "pg_3",
    type: "property",
    category: "pg",
    title: "Budget PG near University",
    subtitle: "Nashville, TN • Affordable • $750/month",
    address: "890 University Circle",
    city: "Nashville",
    state: "TN",
    zipCode: "37212",
    value: 750,
    monthlyRent: 750,
    ownerName: "Student Care PG",
    ownerWealth: 4500000,
    propertyType: "pg",
    coordinates: { lat: 36.1447, lng: -86.8027 },
    bedrooms: 1,
    bathrooms: 1,
    sqft: 160,
    images: ["/placeholder.svg?height=300&width=400&text=Nashville+Budget+PG"],
    features: ["Meals Included", "WiFi", "Study Area", "Laundry", "Security"],
    amenities: ["Meals Included", "WiFi", "Study Area", "Security"],
    studentFriendly: true,
    verified: true,
    rating: 4.2,
    furnished: true,
    meals: true,
    mealsPerDay: 2,
    housekeeping: false,
  },

  // APARTMENTS - Traditional rentals (existing data)
  {
    id: "apt_1",
    type: "property",
    category: "apartment",
    title: "Affordable Studio Apartment",
    subtitle: "Phoenix, AZ • Studio • $1200/month",
    address: "123 Phoenix Street",
    city: "Phoenix",
    state: "AZ",
    zipCode: "85001",
    value: 1200,
    monthlyRent: 1200,
    ownerName: "Phoenix Rentals LLC",
    ownerWealth: 3500000,
    propertyType: "apartment",
    coordinates: { lat: 33.4484, lng: -112.074 },
    bedrooms: 0,
    bathrooms: 1,
    sqft: 450,
    images: ["/placeholder.svg?height=300&width=400&text=Phoenix+Studio"],
    features: ["Pool", "Gym", "Parking", "AC"],
    amenities: ["Pool", "Gym", "Parking"],
    studentFriendly: false,
    verified: true,
    rating: 4.2,
    furnished: false,
  },
  {
    id: "apt_2",
    type: "property",
    category: "apartment",
    title: "Family Townhouse",
    subtitle: "Denver, CO • 3BR Townhouse • $2800/month",
    address: "456 Denver Avenue",
    city: "Denver",
    state: "CO",
    zipCode: "80202",
    value: 2800,
    monthlyRent: 2800,
    ownerName: "Mountain View Properties",
    ownerWealth: 8500000,
    propertyType: "apartment",
    coordinates: { lat: 39.7392, lng: -104.9903 },
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1400,
    images: ["/placeholder.svg?height=300&width=400&text=Denver+Townhouse"],
    features: ["Garage", "Garden", "Pet Friendly", "Fireplace"],
    amenities: ["Garage", "Garden", "Pet Friendly"],
    studentFriendly: false,
    verified: true,
    rating: 4.7,
    furnished: false,
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q") || ""
    const type = searchParams.get("type") || "all"
    const category = searchParams.get("category") || "all"
    const minValue = searchParams.get("minValue") ? Number.parseInt(searchParams.get("minValue")!) : undefined
    const maxValue = searchParams.get("maxValue") ? Number.parseInt(searchParams.get("maxValue")!) : undefined
    const location = searchParams.get("location") || ""
    const propertyType = searchParams.get("propertyType") || ""

    console.log("🔍 Search API request:", {
      query,
      type,
      category,
      minValue,
      maxValue,
      location,
      propertyType,
    })

    // Handle "browse all" queries
    let results = sampleProperties

    // Filter by category if specified
    if (category && category !== "all") {
      if (category === "apartments") {
        results = results.filter((r) => r.category === "apartment")
      } else {
        results = results.filter((r) => r.category === category)
      }
    }

    // Filter by search query
    if (query && !query.includes("all")) {
      const queryLower = query.toLowerCase()
      results = results.filter((property) => {
        const titleMatch = property.title.toLowerCase().includes(queryLower)
        const cityMatch = property.city.toLowerCase().includes(queryLower)
        const stateMatch = property.state.toLowerCase().includes(queryLower)
        const addressMatch = property.address.toLowerCase().includes(queryLower)
        return titleMatch || cityMatch || stateMatch || addressMatch
      })
    }

    // Filter by price range
    if (minValue) {
      results = results.filter((property) => property.monthlyRent >= minValue)
    }
    if (maxValue) {
      results = results.filter((property) => property.monthlyRent <= maxValue)
    }

    // Filter by location
    if (location) {
      const locationLower = location.toLowerCase()
      results = results.filter((property) => {
        const cityMatch = property.city.toLowerCase().includes(locationLower)
        const stateMatch = property.state.toLowerCase().includes(locationLower)
        return cityMatch || stateMatch
      })
    }

    // Sort by price (lowest first for student accommodations, highest first for apartments)
    if (category === "room" || category === "hostel" || category === "pg") {
      results.sort((a, b) => a.monthlyRent - b.monthlyRent)
    } else {
      results.sort((a, b) => b.monthlyRent - a.monthlyRent)
    }

    console.log("📊 Search completed:", {
      query,
      category,
      filtersUsed: [minValue, maxValue, location].filter(Boolean).length,
      resultsFound: results.length,
      sampleResult: results[0]
        ? {
            title: results[0].title,
            category: results[0].category,
            price: results[0].monthlyRent,
          }
        : null,
    })

    return NextResponse.json({
      results: results,
      total: results.length,
      cached: false,
      query,
      category,
      filters: { minValue, maxValue, location, category },
      timestamp: new Date().toISOString(),
      dataSource: "mock_data_student_accommodations",
      message: "Using comprehensive mock data for all accommodation types",
    })
  } catch (error) {
    console.error("❌ Search API error:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    })

    // Return sample data instead of error
    return NextResponse.json({
      results: sampleProperties.slice(0, 6),
      total: 6,
      cached: false,
      mock: true,
      error: "Search service using mock data for all accommodation types",
      timestamp: new Date().toISOString(),
      dataSource: "mock_data_student_accommodations",
    })
  }
}
