import { type NextRequest, NextResponse } from "next/server"

// Smart wealth estimation based on property values and public data
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const propertyValue = Number.parseInt(searchParams.get("propertyValue") || "0")
  const ownerName = searchParams.get("ownerName")
  const propertyCount = Number.parseInt(searchParams.get("propertyCount") || "1")
  const location = searchParams.get("location") || ""

  if (!propertyValue || !ownerName) {
    return NextResponse.json({ error: "Property value and owner name are required" }, { status: 400 })
  }

  // Wealth estimation algorithm
  const estimatedNetWorth = calculateEstimatedNetWorth(propertyValue, propertyCount, location)
  const confidence = calculateConfidence(propertyValue, propertyCount, location)
  const wealthBreakdown = calculateWealthBreakdown(estimatedNetWorth, propertyValue, propertyCount)

  return NextResponse.json({
    person: {
      name: ownerName,
      estimatedNetWorth,
      confidence: confidence.level,
      confidenceScore: confidence.score,
      lastUpdated: new Date().toISOString().split("T")[0],
      methodology: "Property-based estimation with location multipliers",
      wealthSources: wealthBreakdown,
      assumptions: [
        "Real estate represents 30-60% of total wealth",
        "Higher-value areas indicate higher overall wealth",
        "Multiple properties indicate investment sophistication",
      ],
    },
  })
}

function calculateEstimatedNetWorth(propertyValue: number, propertyCount: number, location: string): number {
  // Base calculation: property value * multiplier
  let baseMultiplier = 2.5 // Conservative estimate that real estate is 40% of wealth

  // Location-based adjustments
  const locationMultipliers: Record<string, number> = {
    "beverly hills": 3.5,
    manhattan: 4.0,
    malibu: 3.2,
    miami: 2.8,
    "palo alto": 4.2,
    "san francisco": 3.8,
    aspen: 5.0,
    hamptons: 4.5,
  }

  const locationKey = location.toLowerCase()
  for (const [area, multiplier] of Object.entries(locationMultipliers)) {
    if (locationKey.includes(area)) {
      baseMultiplier = multiplier
      break
    }
  }

  // Property count adjustments
  const propertyMultiplier = Math.min(1 + (propertyCount - 1) * 0.3, 2.5)

  // Property value tiers (higher values suggest higher wealth ratios)
  let valueMultiplier = 1
  if (propertyValue > 5000000) valueMultiplier = 1.5
  else if (propertyValue > 2000000) valueMultiplier = 1.3
  else if (propertyValue > 1000000) valueMultiplier = 1.1

  const totalPropertyValue = propertyValue * propertyCount
  return Math.round(totalPropertyValue * baseMultiplier * propertyMultiplier * valueMultiplier)
}

function calculateConfidence(
  propertyValue: number,
  propertyCount: number,
  location: string,
): { level: string; score: number } {
  let score = 50 // Base confidence

  // Higher property values = more reliable data
  if (propertyValue > 2000000) score += 20
  else if (propertyValue > 1000000) score += 10
  else if (propertyValue > 500000) score += 5

  // Multiple properties = more data points
  score += Math.min(propertyCount * 5, 25)

  // High-value locations have more reliable records
  const highValueAreas = ["beverly hills", "manhattan", "malibu", "palo alto", "san francisco"]
  if (highValueAreas.some((area) => location.toLowerCase().includes(area))) {
    score += 10
  }

  score = Math.min(score, 95) // Cap at 95%

  let level = "Low"
  if (score >= 80) level = "High"
  else if (score >= 60) level = "Medium"

  return { level, score }
}

function calculateWealthBreakdown(totalWealth: number, propertyValue: number, propertyCount: number) {
  const totalPropertyValue = propertyValue * propertyCount
  const realEstatePercentage = Math.min((totalPropertyValue / totalWealth) * 100, 70)

  return [
    {
      category: "Real Estate",
      percentage: Math.round(realEstatePercentage),
      amount: totalPropertyValue,
    },
    {
      category: "Investments",
      percentage: Math.round((100 - realEstatePercentage) * 0.5),
      amount: Math.round(totalWealth * (100 - realEstatePercentage) * 0.005),
    },
    {
      category: "Business Assets",
      percentage: Math.round((100 - realEstatePercentage) * 0.3),
      amount: Math.round(totalWealth * (100 - realEstatePercentage) * 0.003),
    },
    {
      category: "Other",
      percentage: Math.round((100 - realEstatePercentage) * 0.2),
      amount: Math.round(totalWealth * (100 - realEstatePercentage) * 0.002),
    },
  ]
}
