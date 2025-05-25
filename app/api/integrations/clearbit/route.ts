// This API uses mock data by default and falls back to RapidAPI only when RAPIDAPI_KEY is configured

import { type NextRequest, NextResponse } from "next/server"

// Using People Data Labs API via RapidAPI as Clearbit alternative
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const companyDomain = searchParams.get("domain")
  const personEmail = searchParams.get("email")
  const companyName = searchParams.get("company")

  try {
    // Company enrichment using Global Company Data API (RapidAPI)
    if (companyDomain || companyName) {
      const companyData = await enrichCompanyDataRapidAPI(companyDomain, companyName)
      if (companyData) {
        return NextResponse.json({ company: companyData })
      }
    }

    // Person enrichment using People Data Labs API (RapidAPI)
    if (personEmail) {
      const personData = await enrichPersonDataRapidAPI(personEmail)
      if (personData) {
        return NextResponse.json({ person: personData })
      }
    }

    return NextResponse.json({ error: "No data found" }, { status: 404 })
  } catch (error) {
    console.error("RapidAPI enrichment error:", error)
    return getMockEnrichmentData(companyDomain, personEmail, companyName)
  }
}

async function enrichCompanyDataRapidAPI(domain?: string | null, companyName?: string | null) {
  if (!process.env.RAPIDAPI_KEY) {
    console.warn("RAPIDAPI_KEY not found, using mock data")
    return getMockEnrichmentData(domain, null, companyName).then((res) => res.company || null)
  }
  try {
    // Global Company Data API via RapidAPI
    const searchQuery = domain || companyName
    if (!searchQuery) return null

    const response = await fetch(`https://global-company-data-api.p.rapidapi.com/company/search`, {
      method: "POST",
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
        "X-RapidAPI-Host": "global-company-data-api.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: searchQuery,
        limit: 1,
      }),
    })

    if (response.ok) {
      const data = await response.json()
      if (data.companies && data.companies.length > 0) {
        const company = data.companies[0]
        return {
          name: company.name,
          domain: company.domain || domain,
          industry: company.industry || "Unknown",
          employees: company.employee_count,
          revenue: company.annual_revenue,
          founded: company.founded_year,
          location: `${company.city}, ${company.country}`,
          description: company.description,
          website: company.website || `https://${domain}`,
          linkedin: company.linkedin_url,
          twitter: company.twitter_url,
          source: "Global Company Data API (RapidAPI)",
        }
      }
    }

    // Fallback to Company Enrichment API
    return await fallbackCompanyEnrichment(domain, companyName)
  } catch (error) {
    console.error("Global Company Data API failed:", error)
    return await fallbackCompanyEnrichment(domain, companyName)
  }
}

async function enrichPersonDataRapidAPI(email: string) {
  if (!process.env.RAPIDAPI_KEY) {
    console.warn("RAPIDAPI_KEY not found, using mock data")
    return getMockEnrichmentData(null, email, null).then((res) => res.person || null)
  }
  try {
    // People Data Labs API via RapidAPI
    const response = await fetch(`https://people-data-labs-api.p.rapidapi.com/person/enrich`, {
      method: "POST",
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
        "X-RapidAPI-Host": "people-data-labs-api.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })

    if (response.ok) {
      const data = await response.json()
      if (data.person) {
        const person = data.person
        console.log("✅ People Data Labs API successful:", { email, source: "People Data Labs" })
        return {
          name: `${person.first_name} ${person.last_name}`,
          email: email,
          title: person.job_title,
          company: person.job_company_name,
          industry: person.job_company_industry,
          location: `${person.location_city}, ${person.location_country}`,
          linkedin: person.linkedin_url,
          twitter: person.twitter_url,
          experience: person.experience?.map((exp: any) => ({
            company: exp.company_name,
            title: exp.title,
            duration: `${exp.start_date} - ${exp.end_date || "Present"}`,
          })),
          education: person.education?.map((edu: any) => ({
            school: edu.school_name,
            degree: edu.degree_name,
            field: edu.field_of_study,
          })),
          source: "People Data Labs API (RapidAPI)",
        }
      }
    }

    // Fallback to Hunter.io for basic email verification
    return await fallbackPersonEnrichment(email)
  } catch (error) {
    console.error("People Data Labs API failed:", error)
    return await fallbackPersonEnrichment(email)
  }
}

async function fallbackCompanyEnrichment(domain?: string | null, companyName?: string | null) {
  try {
    // Company Enrichment API via RapidAPI (alternative)
    const searchQuery = domain || companyName
    if (!searchQuery) return null

    const response = await fetch(`https://company-enrichment-api.p.rapidapi.com/enrich`, {
      method: "POST",
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
        "X-RapidAPI-Host": "company-enrichment-api.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        domain: domain || `${companyName?.toLowerCase().replace(/\s+/g, "")}.com`,
      }),
    })

    if (response.ok) {
      const data = await response.json()
      return {
        name: data.name || companyName,
        domain: data.domain || domain,
        industry: data.industry || "Technology",
        employees: data.employees,
        location: data.location,
        description: data.description,
        website: data.website,
        source: "Company Enrichment API (RapidAPI)",
      }
    }

    // Final fallback to basic analysis
    return await getBasicCompanyInfo(domain, companyName)
  } catch (error) {
    console.error("Fallback company enrichment failed:", error)
    return await getBasicCompanyInfo(domain, companyName)
  }
}

async function fallbackPersonEnrichment(email: string) {
  try {
    // Use Hunter.io API (already configured) for email verification
    const hunterResponse = await fetch(`/api/integrations/hunter-io?email=${encodeURIComponent(email)}&action=verify`)

    if (hunterResponse.ok) {
      const hunterData = await hunterResponse.json()
      return {
        name: extractNameFromEmail(email),
        email: email,
        company: hunterData.company || "Unknown",
        verified: hunterData.result === "deliverable",
        source: "Hunter.io + Analysis",
      }
    }

    return null
  } catch (error) {
    console.error("Fallback person enrichment failed:", error)
    return null
  }
}

async function getBasicCompanyInfo(domain?: string | null, companyName?: string | null) {
  // Basic company info extraction
  return {
    name: companyName || domain?.replace(/\.(com|org|net|io)$/, "") || "Unknown Company",
    domain: domain,
    industry: "Technology", // Default assumption
    source: "Basic Analysis",
    website: domain ? `https://${domain}` : undefined,
    description: `Company ${domain ? `operating at ${domain}` : companyName || ""}`,
  }
}

function extractNameFromEmail(email: string): string {
  const localPart = email.split("@")[0]
  return localPart
    .split(/[._-]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function getMockEnrichmentData(
  companyDomain?: string | null,
  personEmail?: string | null,
  companyName?: string | null,
) {
  const mockCompanyData = {
    name: companyName || "Smith Enterprises LLC",
    domain: companyDomain || "smithenterprises.com",
    industry: "Real Estate Investment",
    employees: 25,
    revenue: 50000000,
    founded: 2018,
    location: "Beverly Hills, CA",
    description: "Real estate investment and development company",
    website: "https://smithenterprises.com",
    linkedin: "https://linkedin.com/company/smith-enterprises",
    source: "Mock Data",
  }

  const mockPersonData = {
    name: personEmail ? extractNameFromEmail(personEmail) : "John Smith",
    title: "Chief Executive Officer",
    company: companyName || "Smith Enterprises LLC",
    email: personEmail || "john.smith@smithenterprises.com",
    location: "Beverly Hills, CA",
    linkedin: "https://linkedin.com/in/john-smith",
    experience: [
      {
        company: "Smith Enterprises LLC",
        title: "CEO",
        duration: "2018 - Present",
      },
    ],
    source: "Mock Data",
  }

  if (companyDomain || companyName) {
    return NextResponse.json({ company: mockCompanyData })
  }

  if (personEmail) {
    return NextResponse.json({ person: mockPersonData })
  }

  return NextResponse.json({
    company: mockCompanyData,
    person: mockPersonData,
  })
}
