import { type NextRequest, NextResponse } from "next/server"

// Helper route to check and validate environment variables
export async function GET(request: NextRequest) {
  const requiredEnvVars = {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    CLEARBIT_API_KEY: process.env.CLEARBIT_API_KEY,
    OPENCORPORATES_API_KEY: process.env.OPENCORPORATES_API_KEY,
    HUNTER_IO_API_KEY: process.env.HUNTER_IO_API_KEY,
    MONGODB_URI: process.env.MONGODB_URI,
  }

  const optionalEnvVars = {
    RAPIDAPI_KEY: process.env.RAPIDAPI_KEY,
    ZILLOW_API_KEY: process.env.ZILLOW_API_KEY,
  }

  const status = {
    required: {} as Record<string, boolean>,
    optional: {} as Record<string, boolean>,
    recommendations: [] as string[],
  }

  // Check required environment variables
  for (const [key, value] of Object.entries(requiredEnvVars)) {
    status.required[key] = !!value
    if (!value) {
      status.recommendations.push(`Set ${key} for full functionality`)
    }
  }

  // Check optional environment variables
  for (const [key, value] of Object.entries(optionalEnvVars)) {
    status.optional[key] = !!value
  }

  // Add recommendations based on missing keys
  if (!status.required.GOOGLE_MAPS_API_KEY) {
    status.recommendations.push("Get Google Maps API key from Google Cloud Console")
  }
  if (!status.required.CLEARBIT_API_KEY) {
    status.recommendations.push("Get Clearbit API key (free tier available) from clearbit.com")
  }
  if (!status.optional.RAPIDAPI_KEY) {
    status.recommendations.push("Consider RapidAPI key for additional real estate data sources")
  }

  return NextResponse.json(status)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { action } = body

  if (action === "validate-google-maps") {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY
    if (!apiKey) {
      return NextResponse.json({ valid: false, error: "API key not found" })
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${apiKey}`,
      )
      const data = await response.json()

      return NextResponse.json({
        valid: data.status === "OK",
        error: data.status !== "OK" ? data.error_message : null,
      })
    } catch (error) {
      return NextResponse.json({ valid: false, error: "Failed to validate API key" })
    }
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 })
}
