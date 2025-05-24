import { type NextRequest, NextResponse } from "next/server"

// Mock Wealth Engine API integration for net worth estimates
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const personName = searchParams.get("person")
  const address = searchParams.get("address")

  if (personName) {
    return NextResponse.json({
      person: {
        name: personName,
        estimatedNetWorth: 15000000,
        confidence: "High",
        confidenceScore: 85,
        lastUpdated: "2024-12-01",
        wealthSources: [
          { category: "Real Estate", amount: 6750000, percentage: 45 },
          { category: "Investments", amount: 4500000, percentage: 30 },
          { category: "Business Assets", amount: 3000000, percentage: 20 },
          { category: "Other", amount: 750000, percentage: 5 },
        ],
        demographics: {
          ageRange: "45-55",
          education: "Graduate Degree",
          occupation: "Business Executive",
        },
      },
    })
  }

  if (address) {
    return NextResponse.json({
      address: address,
      residents: [
        {
          name: "John Smith",
          estimatedNetWorth: 15000000,
          confidence: "High",
          relationship: "Owner",
        },
      ],
      neighborhoodWealth: {
        medianNetWorth: 2500000,
        averageNetWorth: 4200000,
        percentile90: 8500000,
      },
    })
  }

  return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
}
