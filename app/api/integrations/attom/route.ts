import { NextResponse } from "next/server"

const ATTOM_API_KEY = process.env.ATTOM_API_KEY
const ATTOM_BASE_URL = "https://api.gateway.attomdata.com/propertyapi/v1.0.0"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const endpoint = searchParams.get("endpoint")
  const address = searchParams.get("address")
  const city = searchParams.get("city")
  const state = searchParams.get("state")
  const zipcode = searchParams.get("zipcode")
  const radius = searchParams.get("radius") || "1"
  const pagesize = searchParams.get("pagesize") || "50"

  if (!ATTOM_API_KEY) {
    return NextResponse.json({ error: "ATTOM API key not configured" }, { status: 500 })
  }

  try {
    let url = ""
    const headers = {
      Accept: "application/json",
      apikey: ATTOM_API_KEY,
    }

    switch (endpoint) {
      case "property-detail":
        // Get detailed property information
        url = `${ATTOM_BASE_URL}/property/detail?address1=${encodeURIComponent(address || "")}&address2=${encodeURIComponent(city || "")},${encodeURIComponent(state || "")}`
        break

      case "property-search":
        // Search properties by location
        if (zipcode) {
          url = `${ATTOM_BASE_URL}/property/basicprofile?postalcode=${zipcode}&radius=${radius}&pagesize=${pagesize}`
        } else if (city && state) {
          url = `${ATTOM_BASE_URL}/property/basicprofile?address2=${encodeURIComponent(city)},${encodeURIComponent(state)}&radius=${radius}&pagesize=${pagesize}`
        }
        break

      case "avm":
        // Automated Valuation Model
        url = `${ATTOM_BASE_URL}/avm?address1=${encodeURIComponent(address || "")}&address2=${encodeURIComponent(city || "")},${encodeURIComponent(state || "")}`
        break

      case "sales-history":
        // Property sales history
        url = `${ATTOM_BASE_URL}/saleshistory/detail?address1=${encodeURIComponent(address || "")}&address2=${encodeURIComponent(city || "")},${encodeURIComponent(state || "")}`
        break

      case "market-snapshot":
        // Market data for area
        url = `${ATTOM_BASE_URL}/market/snapshot?area=${encodeURIComponent(city || "")},${encodeURIComponent(state || "")}`
        break

      case "comparable-sales":
        // Comparable sales (comps)
        url = `${ATTOM_BASE_URL}/sale/snapshot?address1=${encodeURIComponent(address || "")}&address2=${encodeURIComponent(city || "")},${encodeURIComponent(state || "")}&radius=${radius}`
        break

      default:
        return NextResponse.json({ error: "Invalid endpoint specified" }, { status: 400 })
    }

    console.log(`🏠 ATTOM API Request: ${endpoint}`, {
      url: url.replace(ATTOM_API_KEY, "[REDACTED]"),
      address,
      city,
      state,
      zipcode,
    })

    const response = await fetch(url, { headers })
    const data = await response.json()

    if (!response.ok) {
      console.error("❌ ATTOM API Error:", {
        status: response.status,
        statusText: response.statusText,
        error: data,
      })
      return NextResponse.json({ error: data.message || "ATTOM API request failed" }, { status: response.status })
    }

    console.log(`✅ ATTOM API Success: ${endpoint}`, {
      recordCount: data.property?.length || data.sale?.length || 1,
      status: data.status,
    })

    return NextResponse.json({
      success: true,
      data: data,
      source: "attom_data",
      endpoint: endpoint,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ ATTOM API Integration Error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch data from ATTOM",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { properties } = body

    if (!ATTOM_API_KEY) {
      return NextResponse.json({ error: "ATTOM API key not configured" }, { status: 500 })
    }

    // Batch property enrichment
    const enrichedProperties = await Promise.all(
      properties.map(async (property: any) => {
        try {
          const detailUrl = `${ATTOM_BASE_URL}/property/detail?address1=${encodeURIComponent(property.address)}&address2=${encodeURIComponent(property.city)},${encodeURIComponent(property.state)}`

          const response = await fetch(detailUrl, {
            headers: {
              Accept: "application/json",
              apikey: ATTOM_API_KEY,
            },
          })

          if (response.ok) {
            const attomData = await response.json()
            return {
              ...property,
              attomData: attomData.property?.[0] || null,
              enriched: true,
            }
          }
        } catch (error) {
          console.error(`Failed to enrich property ${property.id}:`, error)
        }

        return {
          ...property,
          enriched: false,
        }
      }),
    )

    return NextResponse.json({
      success: true,
      properties: enrichedProperties,
      enrichedCount: enrichedProperties.filter((p) => p.enriched).length,
    })
  } catch (error) {
    console.error("❌ ATTOM Batch Enrichment Error:", error)
    return NextResponse.json(
      {
        error: "Failed to enrich properties with ATTOM data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
