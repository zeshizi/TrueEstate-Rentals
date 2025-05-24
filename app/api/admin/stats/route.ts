import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase()

    // Get collection stats
    const [propertiesCount, usersCount, wealthAnalysesCount] = await Promise.all([
      db.collection("properties").countDocuments({ isActive: true }),
      db.collection("users").countDocuments({ isActive: true }),
      db.collection("wealth_analyses").countDocuments({ isActive: true }),
    ])

    // Get recent activity (mock data for now)
    const stats = {
      properties: {
        total: propertiesCount,
        addedToday: Math.floor(Math.random() * 10),
        highValue: Math.floor(propertiesCount * 0.15),
      },
      users: {
        total: usersCount,
        active: Math.floor(usersCount * 0.8),
        premium: Math.floor(usersCount * 0.2),
      },
      wealthAnalyses: {
        total: wealthAnalysesCount,
        highConfidence: Math.floor(wealthAnalysesCount * 0.6),
        generated: Math.floor(Math.random() * 5),
      },
      searches: {
        today: Math.floor(Math.random() * 100),
        thisWeek: Math.floor(Math.random() * 500),
        thisMonth: Math.floor(Math.random() * 2000),
      },
      apiCalls: {
        today: Math.floor(Math.random() * 200),
        thisWeek: Math.floor(Math.random() * 1000),
        thisMonth: Math.floor(Math.random() * 5000),
      },
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Admin stats error:", error)
    return NextResponse.json(
      {
        properties: { total: 0, addedToday: 0, highValue: 0 },
        users: { total: 0, active: 0, premium: 0 },
        wealthAnalyses: { total: 0, highConfidence: 0, generated: 0 },
        searches: { today: 0, thisWeek: 0, thisMonth: 0 },
        apiCalls: { today: 0, thisWeek: 0, thisMonth: 0 },
      },
      { status: 500 },
    )
  }
}
