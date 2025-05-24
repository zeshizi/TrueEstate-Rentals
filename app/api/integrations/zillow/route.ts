import { type NextRequest, NextResponse } from "next/server"

// Mock Zillow API integration for property valuation data
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const address = searchParams.get("address")
  const zpid = searchParams.get("zpid")

  const mockPropertyData = {
    zpid: "12345678",
    address: address || "123 Luxury Ave, Beverly Hills, CA 90210",
    zestimate: 2600000,
    rentEstimate: 12000,
    priceHistory: [
      { date: "2024-01-01", price: 2500000, event: "Listed" },
      { date: "2022-01-15", price: 2250000, event: "Sold" },
      { date: "2021-12-01", price: 2200000, event: "Listed" },
    ],
    comparables: [
      {
        address: "125 Luxury Ave, Beverly Hills, CA",
        soldPrice: 2400000,
        soldDate: "2024-02-15",
        bedrooms: 4,
        bathrooms: 3,
        sqft: 3100,
      },
      {
        address: "121 Luxury Ave, Beverly Hills, CA",
        soldPrice: 2700000,
        soldDate: "2024-01-20",
        bedrooms: 4,
        bathrooms: 3.5,
        sqft: 3400,
      },
    ],
    marketTrends: {
      oneMonth: 2.5,
      threeMonth: 5.2,
      oneYear: 8.7,
      fiveYear: 45.3,
    },
    neighborhood: {
      medianPrice: 2800000,
      pricePerSqft: 875,
      daysOnMarket: 45,
    },
  }

  return NextResponse.json(mockPropertyData)
}
