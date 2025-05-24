import { NextResponse } from "next/server"

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")

  console.log("🔍 Searching for:", query)

  // Simulate a database query
  await sleep(1500)

  let results: any[] = []

  // After the database search attempt, if results are empty, add:
  if (results.length === 0 && query) {
    console.log("📝 Generating mock results for query:", query)

    // Generate location-based mock results
    const mockResults = []

    if (query.toLowerCase().includes("new york") || query.toLowerCase().includes("ny")) {
      mockResults.push(
        {
          type: "property",
          title: "Luxury Manhattan Penthouse",
          subtitle: "432 Park Avenue, New York, NY 10022",
          value: 15000000,
          ownerWealth: 45000000,
          ownerName: "Smith Family Trust",
        },
        {
          type: "owner",
          title: "Robert J. Smith",
          subtitle: "Real Estate Investor & Entrepreneur",
          properties: 12,
          totalValue: 85000000,
          wealthEstimate: 120000000,
        },
        {
          type: "address",
          title: "Upper East Side District",
          subtitle: "Manhattan, New York, NY",
          propertyCount: 2847,
          averageValue: 3200000,
          totalValue: 9100800000,
        },
      )
    } else if (query.toLowerCase().includes("kansas") || query.toLowerCase().includes("ks")) {
      mockResults.push(
        {
          type: "property",
          title: "Historic Kansas City Estate",
          subtitle: "1234 Country Club Plaza, Kansas City, KS 66211",
          value: 2500000,
          ownerWealth: 8500000,
          ownerName: "Johnson Holdings LLC",
        },
        {
          type: "owner",
          title: "Michael Johnson",
          subtitle: "Agricultural & Commercial Real Estate",
          properties: 8,
          totalValue: 12000000,
          wealthEstimate: 15000000,
        },
        {
          type: "address",
          title: "Johnson County",
          subtitle: "Kansas City Metro Area, KS",
          propertyCount: 1247,
          averageValue: 450000,
          totalValue: 561150000,
        },
      )
    } else {
      // Generic results for any other search
      mockResults.push(
        {
          type: "property",
          title: `Premium Property in ${query}`,
          subtitle: `123 Main Street, ${query}`,
          value: 1200000,
          ownerWealth: 3500000,
          ownerName: "Local Investment Group",
        },
        {
          type: "owner",
          title: "Investment Properties LLC",
          subtitle: `Real Estate Holdings in ${query}`,
          properties: 5,
          totalValue: 6000000,
          wealthEstimate: 8500000,
        },
      )
    }

    results = mockResults
    console.log("✅ Generated mock results:", results)
  }

  return NextResponse.json(results)
}
