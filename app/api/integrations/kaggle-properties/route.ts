import { type NextRequest, NextResponse } from "next/server"

// Kaggle-style property dataset integration for market comparisons
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get("city")
  const state = searchParams.get("state")
  const zipCode = searchParams.get("zipCode")
  const propertyType = searchParams.get("propertyType") || "all"

  // This would normally connect to a Kaggle dataset or your own compiled dataset
  // For now, we'll simulate with realistic market data
  const marketData = getMarketData(city, state, zipCode, propertyType)

  return NextResponse.json(marketData)
}

function getMarketData(city?: string | null, state?: string | null, zipCode?: string | null, propertyType?: string) {
  // Simulate real market data that would come from Kaggle datasets
  const marketAreas = {
    "beverly hills": {
      medianPrice: 2800000,
      pricePerSqft: 875,
      daysOnMarket: 45,
      inventory: 234,
      yearOverYearChange: 8.5,
      luxury_threshold: 2000000,
    },
    manhattan: {
      medianPrice: 1900000,
      pricePerSqft: 1250,
      daysOnMarket: 62,
      inventory: 1567,
      yearOverYearChange: 5.2,
      luxury_threshold: 1500000,
    },
    miami: {
      medianPrice: 850000,
      pricePerSqft: 420,
      daysOnMarket: 38,
      inventory: 2341,
      yearOverYearChange: 12.3,
      luxury_threshold: 1000000,
    },
    "san francisco": {
      medianPrice: 1650000,
      pricePerSqft: 950,
      daysOnMarket: 28,
      inventory: 892,
      yearOverYearChange: 3.1,
      luxury_threshold: 1200000,
    },
  }

  const locationKey = city?.toLowerCase() || "default"
  const baseData = marketAreas[locationKey as keyof typeof marketAreas] || {
    medianPrice: 450000,
    pricePerSqft: 180,
    daysOnMarket: 55,
    inventory: 1200,
    yearOverYearChange: 4.5,
    luxury_threshold: 500000,
  }

  // Generate sample properties for comparisons
  const sampleProperties = generateSampleProperties(baseData, propertyType)

  return {
    location: {
      city: city || "Unknown",
      state: state || "Unknown",
      zipCode: zipCode || "Unknown",
    },
    marketStats: baseData,
    comparableProperties: sampleProperties,
    priceDistribution: {
      under500k: 25,
      "500k-1m": 35,
      "1m-2m": 25,
      "2m-5m": 12,
      over5m: 3,
    },
    trends: {
      priceGrowth: baseData.yearOverYearChange,
      inventoryChange: Math.random() * 20 - 10, // -10% to +10%
      demandIndex: Math.random() * 40 + 60, // 60-100
    },
  }
}

function generateSampleProperties(marketData: any, propertyType: string) {
  const properties = []
  const types = propertyType === "all" ? ["single-family", "condo", "townhouse"] : [propertyType]

  for (let i = 0; i < 10; i++) {
    const type = types[Math.floor(Math.random() * types.length)]
    const priceVariation = (Math.random() - 0.5) * 0.4 // ±20% variation
    const price = Math.round(marketData.medianPrice * (1 + priceVariation))
    const sqft = Math.round(price / marketData.pricePerSqft)

    properties.push({
      id: `comp_${i + 1}`,
      price,
      pricePerSqft: Math.round(price / sqft),
      sqft,
      bedrooms: Math.floor(Math.random() * 4) + 2, // 2-5 bedrooms
      bathrooms: Math.floor(Math.random() * 3) + 2, // 2-4 bathrooms
      propertyType: type,
      daysOnMarket: Math.floor(Math.random() * 90) + 10,
      soldDate: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    })
  }

  return properties.sort((a, b) => b.price - a.price)
}
