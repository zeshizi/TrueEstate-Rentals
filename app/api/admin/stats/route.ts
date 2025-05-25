import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    console.log("📊 Admin stats API called - using mock data")

    // Mock stats data - no database required
    const stats = {
      properties: {
        total: 24,
        addedToday: 3,
        highValue: 8,
      },
      users: {
        total: 1247,
        active: 998,
        premium: 249,
      },
      wealthAnalyses: {
        total: 156,
        highConfidence: 94,
        generated: 12,
      },
      searches: {
        today: 89,
        thisWeek: 456,
        thisMonth: 1834,
      },
      apiCalls: {
        today: 234,
        thisWeek: 1567,
        thisMonth: 6789,
      },
    }

    console.log("✅ Admin stats generated successfully")
    return NextResponse.json(stats)
  } catch (error) {
    console.error("❌ Admin stats error:", error)

    // Return mock data even on error
    const fallbackStats = {
      properties: { total: 0, addedToday: 0, highValue: 0 },
      users: { total: 0, active: 0, premium: 0 },
      wealthAnalyses: { total: 0, highConfidence: 0, generated: 0 },
      searches: { today: 0, thisWeek: 0, thisMonth: 0 },
      apiCalls: { today: 0, thisWeek: 0, thisMonth: 0 },
    }

    return NextResponse.json(fallbackStats, { status: 200 })
  }
}
