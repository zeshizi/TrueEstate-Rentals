import { type NextRequest, NextResponse } from "next/server"

// Google Maps API integration for geocoding and mapping
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get("lat")
  const lng = searchParams.get("lng")
  const address = searchParams.get("address")
  const apiKey = process.env.GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: "Google Maps API key not configured" }, { status: 500 })
  }

  try {
    // Geocoding - address to coordinates
    if (address) {
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
      const response = await fetch(geocodeUrl)
      const data = await response.json()

      if (data.status === "OK" && data.results.length > 0) {
        const result = data.results[0]
        return NextResponse.json({
          results: [
            {
              address: result.formatted_address,
              lat: result.geometry.location.lat,
              lng: result.geometry.location.lng,
              confidence: 0.95,
              components: {
                street:
                  result.address_components.find((c: any) => c.types.includes("street_number"))?.long_name +
                  " " +
                  result.address_components.find((c: any) => c.types.includes("route"))?.long_name,
                city: result.address_components.find((c: any) => c.types.includes("locality"))?.long_name,
                state: result.address_components.find((c: any) => c.types.includes("administrative_area_level_1"))
                  ?.short_name,
                zipCode: result.address_components.find((c: any) => c.types.includes("postal_code"))?.long_name,
                country: result.address_components.find((c: any) => c.types.includes("country"))?.short_name,
              },
            },
          ],
        })
      }
    }

    // Reverse geocoding - coordinates to address
    if (lat && lng) {
      const reverseUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      const response = await fetch(reverseUrl)
      const data = await response.json()

      if (data.status === "OK" && data.results.length > 0) {
        const result = data.results[0]
        return NextResponse.json({
          address: result.formatted_address,
          components: {
            street:
              result.address_components.find((c: any) => c.types.includes("street_number"))?.long_name +
              " " +
              result.address_components.find((c: any) => c.types.includes("route"))?.long_name,
            city: result.address_components.find((c: any) => c.types.includes("locality"))?.long_name,
            state: result.address_components.find((c: any) => c.types.includes("administrative_area_level_1"))
              ?.short_name,
            zipCode: result.address_components.find((c: any) => c.types.includes("postal_code"))?.long_name,
            country: result.address_components.find((c: any) => c.types.includes("country"))?.short_name,
          },
          confidence: 0.98,
        })
      }
    }

    return NextResponse.json({ error: "No results found" }, { status: 404 })
  } catch (error) {
    console.error("Google Maps API error:", error)
    return NextResponse.json({ error: "API request failed" }, { status: 500 })
  }
}
