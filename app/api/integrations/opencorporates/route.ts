import { type NextRequest, NextResponse } from "next/server"

// Using Global Company Data API via RapidAPI as OpenCorporates alternative
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const companyName = searchParams.get("company")
  const state = searchParams.get("state") || "CA"
  const country = searchParams.get("country") || "US"

  if (!companyName) {
    return NextResponse.json({ error: "Company name is required" }, { status: 400 })
  }

  try {
    // Try Global Company Data API via RapidAPI
    const companyData = await searchGlobalCompanyDataAPI(companyName, state, country)

    if (companyData) {
      return NextResponse.json({ company: companyData })
    }

    return NextResponse.json({ error: "Company not found" }, { status: 404 })
  } catch (error) {
    console.error("Global company registry search error:", error)
    return getMockRegistryData(companyName, state, country)
  }
}

async function searchGlobalCompanyDataAPI(companyName: string, state: string, country: string) {
  try {
    // Global Company Data API via RapidAPI
    const response = await fetch(`https://global-company-data-api.p.rapidapi.com/company/search`, {
      method: "POST",
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
        "X-RapidAPI-Host": "global-company-data-api.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: companyName,
        country: country,
        state: state,
        limit: 5,
      }),
    })

    if (response.ok) {
      const data = await response.json()
      if (data.companies && data.companies.length > 0) {
        const company = data.companies[0]
        return {
          name: company.name,
          companyNumber: company.registration_number || company.company_id,
          jurisdiction: `${country}-${state}`.toUpperCase(),
          companyType: company.company_type || "Corporation",
          status: company.status || "Active",
          incorporationDate: company.incorporation_date,
          address: `${company.address || company.city}, ${company.state || state} ${company.postal_code || ""}`,
          industry: company.industry,
          employees: company.employee_count,
          revenue: company.annual_revenue,
          website: company.website,
          phone: company.phone,
          officers:
            company.officers?.map((officer: any) => ({
              name: officer.name,
              position: officer.title,
              appointedDate: officer.start_date,
            })) || [],
          source: "Global Company Data API (RapidAPI)",
          registryUrl: company.registry_url,
        }
      }
    }

    // Fallback to Business Registry API
    return await searchBusinessRegistryAPI(companyName, state, country)
  } catch (error) {
    console.error("Global Company Data API failed:", error)
    return await searchBusinessRegistryAPI(companyName, state, country)
  }
}

async function searchBusinessRegistryAPI(companyName: string, state: string, country: string) {
  try {
    // Business Registry API via RapidAPI (alternative)
    const response = await fetch(`https://business-registry-api.p.rapidapi.com/search`, {
      method: "POST",
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
        "X-RapidAPI-Host": "business-registry-api.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: companyName,
        jurisdiction: `${country}-${state}`,
        limit: 1,
      }),
    })

    if (response.ok) {
      const data = await response.json()
      if (data.results && data.results.length > 0) {
        const company = data.results[0]
        return {
          name: company.name,
          companyNumber: company.number,
          jurisdiction: company.jurisdiction,
          companyType: company.type,
          status: company.status,
          incorporationDate: company.incorporation_date,
          address: company.address,
          source: "Business Registry API (RapidAPI)",
          registryUrl: company.url,
        }
      }
    }

    // Final fallback to free US registries
    return await searchFreeUSRegistries(companyName, state)
  } catch (error) {
    console.error("Business Registry API failed:", error)
    return await searchFreeUSRegistries(companyName, state)
  }
}

async function searchFreeUSRegistries(companyName: string, state: string) {
  // 1. Try SEC EDGAR for US public companies (completely free)
  const secData = await searchSECEdgar(companyName)
  if (secData) return secData

  // 2. Use business name analysis for basic info
  const basicData = await analyzeBusinessName(companyName, state)
  return basicData
}

async function searchSECEdgar(companyName: string) {
  try {
    // SEC EDGAR company tickers (completely free, no API key needed)
    const response = await fetch(`https://www.sec.gov/files/company_tickers.json`, {
      headers: {
        "User-Agent": "TrueEstate Platform contact@trueestate.com",
      },
    })

    if (response.ok) {
      const data = await response.json()
      const company = Object.values(data).find((c: any) =>
        c.title?.toLowerCase().includes(companyName.toLowerCase()),
      ) as any

      if (company) {
        return {
          name: company.title,
          companyNumber: company.cik_str,
          jurisdiction: "US-SEC",
          companyType: "Public Corporation",
          status: "Active",
          ticker: company.ticker,
          source: "SEC EDGAR",
          registryUrl: `https://www.sec.gov/cgi-bin/browse-edgar?CIK=${company.cik_str}`,
        }
      }
    }
  } catch (error) {
    console.error("SEC EDGAR search failed:", error)
  }
  return null
}

async function analyzeBusinessName(companyName: string, state: string) {
  // Business name analysis for entity type detection
  const entityTypes = {
    LLC: "Limited Liability Company",
    Inc: "Corporation",
    Corp: "Corporation",
    Ltd: "Limited Company",
    LP: "Limited Partnership",
    LLP: "Limited Liability Partnership",
  }

  let companyType = "Unknown"
  for (const [suffix, type] of Object.entries(entityTypes)) {
    if (companyName.toUpperCase().includes(suffix)) {
      companyType = type
      break
    }
  }

  return {
    name: companyName,
    companyNumber: "Analysis Required",
    jurisdiction: `US-${state.toUpperCase()}`,
    companyType: companyType,
    status: "Search Required",
    source: "Business Name Analysis + RapidAPI Fallback",
    stateRegistryUrls: getStateRegistryUrls(state),
    note: `Manual verification recommended in ${state} state registry`,
  }
}

function getStateRegistryUrls(state: string) {
  const registryUrls: Record<string, string> = {
    CA: "https://bizfileonline.sos.ca.gov/search/business",
    NY: "https://appext20.dos.ny.gov/corp_public/CORPSEARCH.ENTITY_SEARCH_ENTRY",
    TX: "https://mycpa.cpa.state.tx.us/coa/",
    FL: "https://search.sunbiz.org/Inquiry/CorporationSearch/ByName",
    DE: "https://icis.corp.delaware.gov/Ecorp/EntitySearch/NameSearch.aspx",
    NV: "https://esos.nv.gov/EntitySearch/OnlineEntitySearch",
    IL: "https://www.ilsos.gov/corporatellc/",
    WA: "https://ccfs.sos.wa.gov/",
    OR: "https://egov.sos.state.or.us/br/pkg_web_name_srch_inq.login",
    CO: "https://www.sos.state.co.us/biz/BusinessEntityCriteriaExt.do",
  }

  return registryUrls[state.toUpperCase()] || "https://www.sos.state.gov/"
}

function getMockRegistryData(companyName: string, state: string, country: string) {
  return NextResponse.json({
    company: {
      name: companyName,
      companyNumber: "LLC123456789",
      jurisdiction: `${country}-${state}`.toUpperCase(),
      companyType: "Limited Liability Company",
      status: "Active",
      incorporationDate: "2018-01-15",
      address: `123 Business Ave, ${getStateName(state)} ${getRandomZip(state)}`,
      industry: "Real Estate Investment",
      employees: 25,
      revenue: 5000000,
      officers: [
        {
          name: "John Smith",
          position: "Manager",
          appointedDate: "2018-01-15",
        },
      ],
      source: "Mock Data (RapidAPI Alternative)",
      registryUrl: getStateRegistryUrls(state),
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
  return stateNames[stateCode.toUpperCase()] || "Unknown State"
}

function getRandomZip(stateCode: string): string {
  const zipRanges: Record<string, string> = {
    CA: "90210",
    NY: "10001",
    TX: "75201",
    FL: "33101",
    DE: "19801",
    NV: "89101",
    IL: "60601",
    WA: "98101",
    OR: "97201",
    CO: "80201",
  }
  return zipRanges[stateCode.toUpperCase()] || "00000"
}
