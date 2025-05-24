import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q") || ""
  const type = searchParams.get("type") || "all"
  const minValue = Number.parseInt(searchParams.get("minValue") || "0")
  const maxValue = Number.parseInt(searchParams.get("maxValue") || "10000000")
  const location = searchParams.get("location") || ""

  console.log("🔍 API Search received:", {
    query,
    type,
    minValue,
    maxValue,
    location,
    timestamp: new Date().toISOString(),
  })

  // Enhanced mock search results with more variety
  const allMockResults = [
    // New York properties
    {
      id: "ny1",
      type: "property",
      title: "Luxury Manhattan Penthouse",
      subtitle: "432 Park Avenue, New York, NY 10022 • $15M • Penthouse • 4 bed, 4 bath",
      value: 15000000,
      ownerWealth: 45000000,
      ownerName: "Smith Family Trust",
      location: "new york",
    },
    {
      id: "ny2",
      type: "owner",
      title: "Robert J. Smith",
      subtitle: "Real Estate Investor & Tech Entrepreneur • Est. Net Worth: $45M",
      properties: 12,
      totalValue: 85000000,
      wealthEstimate: 45000000,
      location: "new york",
    },
    {
      id: "ny3",
      type: "address",
      title: "Upper East Side District",
      subtitle: "Manhattan, New York, NY • Premium residential area",
      propertyCount: 2847,
      averageValue: 3200000,
      totalValue: 9100800000,
      location: "new york",
    },
    // Kansas properties
    {
      id: "ks1",
      type: "property",
      title: "Historic Kansas City Estate",
      subtitle: "1234 Country Club Plaza, Kansas City, KS 66211 • $2.5M • Estate • 6 bed, 5 bath",
      value: 2500000,
      ownerWealth: 8500000,
      ownerName: "Johnson Holdings LLC",
      location: "kansas",
    },
    {
      id: "ks2",
      type: "owner",
      title: "Michael Johnson",
      subtitle: "Agricultural & Commercial Real Estate • Est. Net Worth: $8.5M",
      properties: 8,
      totalValue: 12000000,
      wealthEstimate: 8500000,
      location: "kansas",
    },
    // California properties
    {
      id: "ca1",
      type: "property",
      title: "Beverly Hills Mansion",
      subtitle: "9876 Rodeo Drive, Beverly Hills, CA 90210 • $25M • Mansion • 8 bed, 10 bath",
      value: 25000000,
      ownerWealth: 150000000,
      ownerName: "Celebrity Holdings Inc",
      location: "california",
    },
    // Generic properties
    {
      id: "gen1",
      type: "property",
      title: "Modern Downtown Condo",
      subtitle: "123 Main Street • $850K • Condo • 2 bed, 2 bath",
      value: 850000,
      ownerWealth: 2500000,
      ownerName: "Local Investment Group",
      location: "generic",
    },
  ]

  // Filter results based on query
  let filteredResults = allMockResults

  if (query) {
    const queryLower = query.toLowerCase()
    filteredResults = allMockResults.filter(
      (item) =>
        item.title.toLowerCase().includes(queryLower) ||
        item.subtitle.toLowerCase().includes(queryLower) ||
        item.location.includes(queryLower) ||
        (item.ownerName && item.ownerName.toLowerCase().includes(queryLower)),
    )
  }

  // Filter by type
  if (type !== "all") {
    filteredResults = filteredResults.filter((item) => item.type === type)
  }

  // Filter by value range for properties
  if (type === "property" || type === "all") {
    filteredResults = filteredResults.filter(
      (item) => item.type !== "property" || (item.value >= minValue && item.value <= maxValue),
    )
  }

  const response = {
    query,
    results: filteredResults,
    total: filteredResults.length,
    filters: { type, minValue, maxValue, location },
    suggestions: ["Beverly Hills, CA", "Manhattan, NY", "Kansas City, KS", "Downtown", "Luxury properties"],
    timestamp: new Date().toISOString(),
  }

  console.log("📊 API Search returning:", {
    query: response.query,
    totalResults: response.total,
    resultTypes: response.results.map((r) => r.type),
    firstResult: response.results[0]?.title || "No results",
  })

  return NextResponse.json(response)
}
