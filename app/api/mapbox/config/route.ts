import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Use a non-sensitive environment variable name
    const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN || process.env.MAPBOX_TOKEN

    if (!mapboxToken) {
      return NextResponse.json(
        {
          error: "Mapbox token not configured",
          configured: false,
          message: "Please add MAPBOX_ACCESS_TOKEN environment variable",
        },
        { status: 500 },
      )
    }

    // Validate token format
    if (!mapboxToken.startsWith("pk.")) {
      return NextResponse.json(
        {
          error: "Invalid Mapbox token format",
          configured: false,
          message: "Mapbox token should start with 'pk.'",
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      token: mapboxToken,
      configured: true,
      valid: true,
      message: "Mapbox configuration is valid",
    })
  } catch (error) {
    console.error("Mapbox config error:", error)
    return NextResponse.json(
      {
        error: "Failed to get Mapbox configuration",
        configured: false,
        message: "Server error while fetching configuration",
      },
      { status: 500 },
    )
  }
}
