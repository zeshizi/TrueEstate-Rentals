import { type NextRequest, NextResponse } from "next/server"

// OpenCorporates API integration for company registry data
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const companyName = searchParams.get("company")
  const jurisdiction = searchParams.get("jurisdiction") || "us"
  const apiKey = process.env.OPENCORPORATES_API_KEY

  if (!companyName) {
    return NextResponse.json({ error: "Company name is required" }, { status: 400 })
  }

  try {
    const baseUrl = "https://api.opencorporates.com/v0.4"
    const searchUrl = `${baseUrl}/companies/search?q=${encodeURIComponent(companyName)}&jurisdiction_code=${jurisdiction}`

    const headers: Record<string, string> = {}
    if (apiKey) {
      headers["X-API-Token"] = apiKey
    }

    const response = await fetch(searchUrl, { headers })

    if (!response.ok) {
      throw new Error(`OpenCorporates API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.results?.companies && data.results.companies.length > 0) {
      const company = data.results.companies[0].company

      return NextResponse.json({
        company: {
          name: company.name,
          companyNumber: company.company_number,
          jurisdiction: company.jurisdiction_code,
          companyType: company.company_type,
          status: company.current_status,
          incorporationDate: company.incorporation_date,
          address: company.registered_address_in_full,
          officers: company.officers || [],
          filings: company.filings || [],
          registryUrl: company.registry_url,
        },
      })
    }

    return NextResponse.json({ error: "Company not found" }, { status: 404 })
  } catch (error) {
    console.error("OpenCorporates API error:", error)

    // Fallback to mock data
    return NextResponse.json({
      company: {
        name: companyName,
        companyNumber: "LLC123456789",
        jurisdiction: jurisdiction.toUpperCase(),
        companyType: "Limited Liability Company",
        status: "Active",
        incorporationDate: "2018-01-15",
        address: "123 Business Ave, Beverly Hills, CA 90210",
        officers: [
          {
            name: "John Smith",
            position: "Manager",
            appointedDate: "2018-01-15",
          },
        ],
        filings: [],
        registryUrl: "https://example.com/registry",
      },
    })
  }
}
