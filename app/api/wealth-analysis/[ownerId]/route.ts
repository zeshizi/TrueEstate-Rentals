import { type NextRequest, NextResponse } from "next/server"
import { WealthService } from "@/lib/services/wealth-service"

const wealthService = new WealthService()

export async function GET(request: NextRequest, { params }: { params: { ownerId: string } }) {
  try {
    let analysis = await wealthService.getWealthAnalysis(params.ownerId)

    // If no analysis exists, try to generate one
    if (!analysis) {
      const { searchParams } = new URL(request.url)
      const ownerName = searchParams.get("ownerName")

      if (ownerName) {
        try {
          analysis = await wealthService.generateWealthAnalysis(ownerName)
        } catch (error) {
          console.error("Failed to generate wealth analysis:", error)
          return NextResponse.json({ error: "No wealth data available for this owner" }, { status: 404 })
        }
      } else {
        return NextResponse.json({ error: "Owner not found" }, { status: 404 })
      }
    }

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Wealth analysis error:", error)
    return NextResponse.json({ error: "Failed to fetch wealth analysis" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { ownerId: string } }) {
  try {
    const { ownerName } = await request.json()

    if (!ownerName) {
      return NextResponse.json({ error: "Owner name is required" }, { status: 400 })
    }

    const analysis = await wealthService.generateWealthAnalysis(ownerName)
    return NextResponse.json(analysis, { status: 201 })
  } catch (error) {
    console.error("Generate wealth analysis error:", error)
    return NextResponse.json({ error: "Failed to generate wealth analysis" }, { status: 500 })
  }
}
