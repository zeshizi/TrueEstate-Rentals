import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const filters = Object.fromEntries(searchParams)

  function generateComprehensiveMockData(filters: any = {}) {
    const states = [
      "Alabama",
      "Alaska",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "Florida",
      "Georgia",
      "Hawaii",
      "Idaho",
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Maine",
      "Maryland",
      "Massachusetts",
      "Michigan",
      "Minnesota",
      "Mississippi",
      "Missouri",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "New York",
      "North Carolina",
      "North Dakota",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Pennsylvania",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Vermont",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming",
      "Washington DC",
    ]

    const cities = {
      California: ["Los Angeles", "San Francisco", "San Diego", "Sacramento", "Oakland", "Beverly Hills"],
      Texas: ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth", "El Paso"],
      "New York": ["New York City", "Buffalo", "Rochester", "Syracuse", "Albany", "Yonkers"],
      Florida: ["Miami", "Orlando", "Tampa", "Jacksonville", "Fort Lauderdale", "Tallahassee"],
      Illinois: ["Chicago", "Aurora", "Rockford", "Joliet", "Naperville", "Springfield"],
      Pennsylvania: ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading", "Scranton"],
      Ohio: ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron", "Dayton"],
      Georgia: ["Atlanta", "Augusta", "Columbus", "Savannah", "Athens", "Sandy Springs"],
      "North Carolina": ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem", "Fayetteville"],
      Michigan: ["Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Lansing", "Ann Arbor"],
    }

    const propertyTypes = [
      "Single Family",
      "Condo",
      "Townhouse",
      "Multi-Family",
      "Luxury Estate",
      "Shared Room",
      "Studio",
      "Hostel",
    ]
    const ownerTypes = ["Individual", "LLC", "Corporation", "Trust", "Investment Group", "REIT"]

    // Generate 200+ properties across all states
    const properties = []

    for (let i = 0; i < 250; i++) {
      const state = states[i % states.length]
      const stateCities = cities[state] || [state + " City"]
      const city = stateCities[i % stateCities.length]

      // Create diverse price segments
      const priceSegments = [
        { min: 80000, max: 250000, weight: 0.25, type: "affordable" },
        { min: 250000, max: 500000, weight: 0.35, type: "middle" },
        { min: 500000, max: 1000000, weight: 0.25, type: "upper-middle" },
        { min: 1000000, max: 3000000, weight: 0.1, type: "luxury" },
        { min: 3000000, max: 15000000, weight: 0.05, type: "ultra-luxury" },
      ]

      const getRandomPrice = () => {
        const random = Math.random()
        let cumulativeWeight = 0
        for (const segment of priceSegments) {
          cumulativeWeight += segment.weight
          if (random <= cumulativeWeight) {
            return Math.floor(Math.random() * (segment.max - segment.min) + segment.min)
          }
        }
        return 400000
      }

      const price = getRandomPrice()
      const isRental = i % 4 === 0 // 25% rentals
      const finalPrice = isRental ? Math.floor(price / 200) : price // Convert to monthly rent

      const property = {
        id: `prop_${state.toLowerCase().replace(/\s+/g, "_")}_${i + 1}`,
        address: `${100 + i * 10} ${["Main St", "Oak Ave", "Park Blvd", "First St", "Broadway", "Elm St", "Pine Ave", "Cedar Rd"][i % 8]}`,
        city: city,
        state: state,
        zipCode: String(10000 + ((i * 123) % 90000)),
        price: finalPrice,
        bedrooms: Math.floor(Math.random() * 5) + 1,
        bathrooms: Math.floor(Math.random() * 4) + 1,
        squareFootage: Math.floor(Math.random() * 3000) + 800,
        propertyType: propertyTypes[i % propertyTypes.length],
        yearBuilt: Math.floor(Math.random() * 50) + 1970,
        description: `Beautiful ${propertyTypes[i % propertyTypes.length].toLowerCase()} in ${city}, ${state}. Features modern amenities and great location.`,
        imageUrl: `/placeholder.svg?height=300&width=400&query=${propertyTypes[i % propertyTypes.length]} in ${city}`,
        ownerId: `owner_${i + 1}`,
        ownerName: `${["Smith", "Johnson", "Williams", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson"][i % 10]} ${ownerTypes[i % ownerTypes.length]}`,
        ownerWealth: Math.floor(Math.random() * 10000000) + 500000,
        listingType: isRental ? "rent" : "buy",
        createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        features: ["Parking", "Garden", "Pool", "Gym", "Security", "Balcony"].slice(
          0,
          Math.floor(Math.random() * 4) + 2,
        ),
        coordinates: {
          lat: 25 + Math.random() * 25, // Rough US latitude range
          lng: -125 + Math.random() * 50, // Rough US longitude range
        },
      }

      properties.push(property)
    }

    return properties
  }

  const allProperties = generateComprehensiveMockData()

  // Enhanced filtering logic
  const filteredProperties = allProperties.filter((property) => {
    // Location filtering
    if (filters.query) {
      const query = filters.query.toLowerCase()
      const matchesLocation =
        property.city.toLowerCase().includes(query) ||
        property.state.toLowerCase().includes(query) ||
        property.address.toLowerCase().includes(query) ||
        property.zipCode.includes(query)
      if (!matchesLocation) return false
    }

    // Location filter (separate from query)
    if (filters.location) {
      const location = filters.location.toLowerCase()
      const matchesLocation =
        property.city.toLowerCase().includes(location) || property.state.toLowerCase().includes(location)
      if (!matchesLocation) return false
    }

    // Type filtering (rent/buy)
    if (filters.type && filters.type !== "all") {
      if (filters.type !== property.listingType) return false
    }

    // Price range filtering
    if (filters.minValue && property.price < Number.parseInt(filters.minValue)) return false
    if (filters.maxValue && property.price > Number.parseInt(filters.maxValue)) return false

    // Property type filtering
    if (filters.propertyType && filters.propertyType !== "all") {
      if (!property.propertyType.toLowerCase().includes(filters.propertyType.toLowerCase())) return false
    }

    // Bedrooms filtering
    if (filters.bedrooms && Number.parseInt(filters.bedrooms) > 0) {
      if (property.bedrooms < Number.parseInt(filters.bedrooms)) return false
    }

    // Bathrooms filtering
    if (filters.bathrooms && Number.parseInt(filters.bathrooms) > 0) {
      if (property.bathrooms < Number.parseInt(filters.bathrooms)) return false
    }

    return true
  })

  console.log(`🔍 Search API: Found ${filteredProperties.length} properties matching filters:`, {
    query: filters.query,
    location: filters.location,
    type: filters.type,
    priceRange: `$${filters.minValue} - $${filters.maxValue}`,
    propertyType: filters.propertyType,
    bedrooms: filters.bedrooms,
    bathrooms: filters.bathrooms,
  })

  return NextResponse.json(filteredProperties)
}
