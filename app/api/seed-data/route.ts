import { NextResponse } from "next/server"

export async function POST() {
  try {
    console.log("🎭 Seed Data API - Using mock data mode")

    // Mock seeding response
    return NextResponse.json({
      success: true,
      message: "Mock data mode - no seeding required",
      dataSource: "mock_data_all_states",
      propertiesCount: 120,
      statesCount: 51, // 50 states + DC
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Seed data error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Mock data seeding failed",
        dataSource: "mock_data_all_states",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Mock data seeding endpoint",
    dataSource: "mock_data_all_states",
    status: "ready",
  })
}
