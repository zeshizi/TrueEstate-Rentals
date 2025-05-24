import { type NextRequest, NextResponse } from "next/server"

// Mock search functionality
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q") || ""
  const type = searchParams.get("type") || "all" // properties, owners, addresses

  // Mock search results
  const mockResults = {
    properties: [
      {
        id: "1",
        type: "property",
        title: "123 Luxury Ave, Beverly Hills, CA",
        subtitle: "$2.5M • Single Family • 4 bed, 3 bath",
        value: 2500000,
        ownerWealth: 15000000,
      },
      {
        id: "2",
        type: "property",
        title: "456 Park Place, Manhattan, NY",
        subtitle: "$1.8M • Condo • 2 bed, 2 bath",
        value: 1800000,
        ownerWealth: 8000000,
      },
    ],
    owners: [
      {
        id: "owner1",
        type: "owner",
        title: "John Smith",
        subtitle: "Individual • Est. Net Worth: $15M",
        properties: 2,
        totalValue: 6750000,
      },
      {
        id: "owner2",
        type: "owner",
        title: "Miami Holdings LLC",
        subtitle: "Corporation • Est. Net Worth: $25M",
        properties: 5,
        totalValue: 12000000,
      },
    ],
    addresses: [
      {
        id: "addr1",
        type: "address",
        title: "Beverly Hills, CA 90210",
        subtitle: "1,234 properties • Avg. value: $3.2M",
        propertyCount: 1234,
        averageValue: 3200000,
      },
    ],
  }

  // Filter results based on query
  const filteredResults = {
    properties: mockResults.properties.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())),
    owners: mockResults.owners.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())),
    addresses: mockResults.addresses.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())),
  }

  // Combine results based on type filter
  let results = []
  if (type === "all" || type === "properties") {
    results = [...results, ...filteredResults.properties]
  }
  if (type === "all" || type === "owners") {
    results = [...results, ...filteredResults.owners]
  }
  if (type === "all" || type === "addresses") {
    results = [...results, ...filteredResults.addresses]
  }

  return NextResponse.json({
    query,
    results,
    total: results.length,
    suggestions: ["Beverly Hills, CA", "Manhattan, NY", "Miami, FL", "John Smith", "Luxury properties"],
  })
}
