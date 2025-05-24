import { type NextRequest, NextResponse } from "next/server"

// Global Company Data API via RapidAPI (OpenCorporates alternative)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const companyName = searchParams.get("company")
  const domain = searchParams.get("domain")
  const country = searchParams.get("country") || "US"
  const state = searchParams.get("state") || "CA"

  if (!companyName && !domain) {
    return NextResponse.json({ error: "Company name or domain is required" }, { status: 400 })
  }

  try {
    const companyData = await searchGlobalCompanyData(companyName, domain, country, state)

    if (companyData) {
      return NextResponse.json({ company: companyData })
    }

    return NextResponse.json({ error: "Company not found" }, { status: 404 })
  } catch (error) {
    console.error("Global Company Data API error:", error)
    return getMockCompanyData(companyName, domain, country, state)
  }
}

async function searchGlobalCompanyData(
  companyName?: string | null,
  domain?: string | null,
  country?: string,
  state?: string,
) {
  if (!process.env.RAPIDAPI_KEY) {
    console.warn("RAPIDAPI_KEY not found, using mock data")
    return null
  }

  try {
    const searchQuery = companyName || domain
    if (!searchQuery) return null

    const response = await fetch("https://global-company-data-api.p.rapidapi.com/company/search", {
      method: "POST",
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
        "X-RapidAPI-Host": "global-company-data-api.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: searchQuery,
        country: country,
        state: state,
        limit: 5,
      }),
    })

    if (response.ok) {
      const data = await response.json()
      if (data.companies && data.companies.length > 0) {
        const company = data.companies[0]
        console.log("✅ Global Company Data API successful for:", searchQuery)

        return {
          name: company.name,
          registrationNumber: company.registration_number || company.company_id,
          domain: company.domain || domain,
          jurisdiction: `${country}-${state}`.toUpperCase(),
          companyType: company.company_type || "Corporation",
          status: company.status || "Active",
          incorporationDate: company.incorporation_date,
          industry: company.industry,
          employees: company.employee_count,
          revenue: company.annual_revenue,
          address: company.address || `${company.city}, ${company.state} ${company.postal_code}`,
          website: company.website,
          phone: company.phone,
          email: company.email,
          linkedin: company.linkedin_url,
          twitter: company.twitter_url,
          officers:
            company.officers?.map((officer: any) => ({
              name: officer.name,
              position: officer.title || officer.position,
              appointedDate: officer.start_date,
            })) || [],
          financials: {
            revenue: company.annual_revenue,
            employees: company.employee_count,
            fundingRounds: company.funding_rounds,
            totalFunding: company.total_funding,
          },
          source: "Global Company Data API",
          confidence: 0.9,
          lastUpdated: new Date().toISOString(),
        }
      }
    }

    // Fallback to Business Registry API
    return await searchBusinessRegistryFallback(searchQuery, country, state)
  } catch (error) {
    console.error("Global Company Data API failed:", error)
    return await searchBusinessRegistryFallback(companyName || domain, country, state)
  }
}

async function searchBusinessRegistryFallback(searchQuery?: string | null, country?: string, state?: string) {
  try {
    // Try alternative Business Registry API
    const response = await fetch("https://business-registry-api.p.rapidapi.com/search", {
      method: "POST",
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
        "X-RapidAPI-Host": "business-registry-api.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: searchQuery,
        jurisdiction: `${country}-${state}`,
        limit: 1,
      }),
    })

    if (response.ok) {
      const data = await response.json()
      if (data.results && data.results.length > 0) {
        const company = data.results[0]
        console.log("✅ Business Registry API fallback successful for:", searchQuery)

        return {
          name: company.name,
          registrationNumber: company.number,
          jurisdiction: company.jurisdiction,
          companyType: company.type,
          status: company.status,
          incorporationDate: company.incorporation_date,
          address: company.address,
          source: "Business Registry API (Fallback)",
          confidence: 0.8,
        }
      }
    }

    console.log("❌ All company data APIs failed for:", searchQuery)
    return null
  } catch (error) {
    console.error("Business Registry API fallback failed:", error)
    return null
  }
}

function getMockCompanyData(companyName?: string | null, domain?: string | null, country?: string, state?: string) {
  const name = companyName || domain?.split(".")[0] || "Unknown Company"

  return NextResponse.json({
    company: {
      name: name,
      registrationNumber: "LLC123456789",
      domain: domain || `${name.toLowerCase().replace(/\s+/g, "")}.com`,
      jurisdiction: `${country}-${state}`.toUpperCase(),
      companyType: "Limited Liability Company",
      status: "Active",
      incorporationDate: "2018-01-15",
      industry: "Real Estate Investment",
      employees: 25,
      revenue: 5000000,
      address: `123 Business Ave, ${getStateName(state || "CA")} 90210`,
      website: `https://${domain || `${name.toLowerCase().replace(/\s+/g, "")}.com`}`,
      officers: [
        {
          name: "John Smith",
          position: "Chief Executive Officer",
          appointedDate: "2018-01-15",
        },
        {
          name: "Jane Doe",
          position: "Chief Financial Officer",
          appointedDate: "2018-03-01",
        },
      ],
      financials: {
        revenue: 5000000,
        employees: 25,
        fundingRounds: 2,
        totalFunding: 2000000,
      },
      source: "Mock Data (Global Company Data Alternative)",
      confidence: 0.7,
      lastUpdated: new Date().toISOString(),
    },
  })
}

function getStateName(stateCode: string): string {
  const stateNames: Record<string, string> = {
    CA: "California",
    NY: "New York",
    TX: "Texas",
    FL: "Florida",
    DE: "Delaware",
    NV: "Nevada",
    IL: "Illinois",
    WA: "Washington",
    OR: "Oregon",
    CO: "Colorado",
  }
  return stateNames[stateCode.toUpperCase()] || "California"
}
