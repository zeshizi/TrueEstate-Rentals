import { type NextRequest, NextResponse } from "next/server"

// Helper route to check and validate environment variables
export async function GET(request: NextRequest) {
  const requiredEnvVars = {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    MONGODB_URI: process.env.MONGODB_URI,
  }

  const optionalEnvVars = {
    RAPIDAPI_KEY: process.env.RAPIDAPI_KEY,
    ZILLOW_API_KEY: process.env.ZILLOW_API_KEY,
    HUNTER_IO_API_KEY: process.env.HUNTER_IO_API_KEY,
    PEOPLE_DATA_LABS: process.env.PEOPLE_DATA_LABS,
    GLOBAL_COMPANY_DATA: process.env.GLOBAL_COMPANY_DATA,
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

  // Add specific recommendations based on missing keys
  if (!status.required.GOOGLE_CLIENT_ID || !status.required.GOOGLE_CLIENT_SECRET) {
    status.recommendations.push("Configure Google OAuth in Google Cloud Console")
  }
  if (!status.required.NEXTAUTH_SECRET) {
    status.recommendations.push("Generate NEXTAUTH_SECRET with: openssl rand -base64 32")
  }
  if (!status.required.NEXTAUTH_URL) {
    status.recommendations.push("Set NEXTAUTH_URL to your domain (e.g., https://yourdomain.com)")
  }
  if (!status.required.MONGODB_URI) {
    status.recommendations.push("Set MONGODB_URI from MongoDB Atlas")
  }

  return NextResponse.json(status)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { action } = body

  if (action === "validate-google-oauth") {
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET

    if (!clientId || !clientSecret) {
      return NextResponse.json({
        valid: false,
        error: "Google OAuth credentials not configured",
      })
    }

    return NextResponse.json({
      valid: true,
      message: "Google OAuth credentials are configured",
    })
  }

  if (action === "validate-nextauth") {
    const secret = process.env.NEXTAUTH_SECRET
    const url = process.env.NEXTAUTH_URL

    return NextResponse.json({
      secret: !!secret,
      url: !!url,
      valid: !!(secret && url),
    })
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 })
}
