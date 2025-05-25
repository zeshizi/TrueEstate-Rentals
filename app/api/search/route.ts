export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q") || ""
  const type = searchParams.get("type") || "all"
  const category = searchParams.get("category") || "all"

  try {
    // Enhanced mock data for different categories
    const mockProperties = [
      // Buy properties
      {
        id: 1,
        title: "Starter Home in Phoenix",
        location: "Phoenix, AZ",
        price: 285000,
        beds: 3,
        baths: 2,
        sqft: 1450,
        type: "property",
        category: "buy",
        investmentGrade: "B+",
        ownerWealth: "Middle Class",
      },
      // Rent - Apartments
      {
        id: 2,
        title: "Modern Apartment",
        location: "Austin, TX",
        price: 1800,
        beds: 2,
        baths: 2,
        sqft: 900,
        type: "property",
        category: "apartment",
        verified: true,
        amenities: ["Pool", "Gym", "Parking"],
      },
      // Rent - Rooms
      {
        id: 3,
        title: "Shared Room near Campus",
        location: "Boston, MA",
        price: 750,
        beds: 1,
        baths: 1,
        sqft: 200,
        type: "property",
        category: "rooms",
        studentFriendly: true,
        roommates: 2,
        amenities: ["WiFi", "Study Desk", "Shared Kitchen"],
      },
      // Rent - Hostels
      {
        id: 4,
        title: "Student Hostel",
        location: "Atlanta, GA",
        price: 450,
        beds: 1,
        baths: 1,
        sqft: 150,
        type: "property",
        category: "hostels",
        studentFriendly: true,
        capacity: 8,
        amenities: ["WiFi", "Common Kitchen", "Study Room"],
      },
      // Rent - PGs
      {
        id: 5,
        title: "Premium PG with Meals",
        location: "Nashville, TN",
        price: 950,
        beds: 1,
        baths: 1,
        sqft: 180,
        type: "property",
        category: "pgs",
        studentFriendly: true,
        meals: true,
        amenities: ["Meals Included", "WiFi", "AC", "Housekeeping"],
      },
    ]

    let filteredResults = mockProperties

    // Filter by type (rent/buy)
    if (type === "buy") {
      filteredResults = filteredResults.filter((p) => p.category === "buy")
    } else if (type === "rent") {
      filteredResults = filteredResults.filter((p) => p.category !== "buy")
    }

    // Filter by specific category for rent
    if (category !== "all" && category !== "apartments") {
      filteredResults = filteredResults.filter((p) => p.category === category)
    } else if (category === "apartments") {
      filteredResults = filteredResults.filter((p) => p.category === "apartment")
    }

    // Filter by search query
    if (query && !query.toLowerCase().includes("all")) {
      filteredResults = filteredResults.filter(
        (property) =>
          property.title.toLowerCase().includes(query.toLowerCase()) ||
          property.location.toLowerCase().includes(query.toLowerCase()),
      )
    }

    return Response.json({
      results: filteredResults,
      total: filteredResults.length,
      query,
      type,
      category,
    })
  } catch (error) {
    console.error("Search API error:", error)
    return Response.json({ error: "Failed to search properties" }, { status: 500 })
  }
}
