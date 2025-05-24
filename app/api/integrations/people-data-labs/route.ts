import { type NextRequest, NextResponse } from "next/server"

// People Data Labs API via RapidAPI (Clearbit alternative)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get("email")
  const company = searchParams.get("company")
  const name = searchParams.get("name")

  if (!email && !company && !name) {
    return NextResponse.json({ error: "Email, company, or name is required" }, { status: 400 })
  }

  try {
    // Person enrichment
    if (email) {
      const personData = await enrichPersonData(email)
      if (personData) {
        return NextResponse.json({ person: personData })
      }
    }

    // Company enrichment
    if (company) {
      const companyData = await enrichCompanyData(company)
      if (companyData) {
        return NextResponse.json({ company: companyData })
      }
    }

    return NextResponse.json({ error: "No data found" }, { status: 404 })
  } catch (error) {
    console.error("People Data Labs API error:", error)
    return getMockData(email, company, name)
  }
}

async function enrichPersonData(email: string) {
  if (!process.env.RAPIDAPI_KEY) {
    console.warn("RAPIDAPI_KEY not found, using mock data")
    return null
  }

  try {
    const response = await fetch("https://people-data-labs-api.p.rapidapi.com/person/enrich", {
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
        console.log("✅ People Data Labs API successful for:", email)

        return {
          name: `${person.first_name || ""} ${person.last_name || ""}`.trim(),
          email: email,
          title: person.job_title,
          company: person.job_company_name,
          industry: person.job_company_industry,
          location: person.location_name || `${person.location_city || ""}, ${person.location_country || ""}`,
          linkedin: person.linkedin_url,
          twitter: person.twitter_url,
          phone: person.phone_numbers?.[0],
          experience: person.experience?.slice(0, 3).map((exp: any) => ({
            company: exp.company?.name,
            title: exp.title?.name,
            duration: `${exp.start_date || ""} - ${exp.end_date || "Present"}`,
          })),
          education: person.education?.slice(0, 2).map((edu: any) => ({
            school: edu.school?.name,
            degree: edu.degree?.name,
            field: edu.field_of_study,
          })),
          skills: person.skills?.slice(0, 10),
          interests: person.interests?.slice(0, 5),
          source: "People Data Labs API",
          confidence: data.likelihood || 0.8,
        }
      }
    }

    console.log("❌ People Data Labs API failed for:", email)
    return null
  } catch (error) {
    console.error("People Data Labs API error:", error)
    return null
  }
}

async function enrichCompanyData(companyName: string) {
  if (!process.env.RAPIDAPI_KEY) {
    console.warn("RAPIDAPI_KEY not found, using mock data")
    return null
  }

  try {
    // Use Global Company Data API via RapidAPI
    const response = await fetch("https://global-company-data-api.p.rapidapi.com/company/search", {
      method: "POST",
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
        "X-RapidAPI-Host": "global-company-data-api.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: companyName,
        limit: 1,
      }),
    })

    if (response.ok) {
      const data = await response.json()
      if (data.companies && data.companies.length > 0) {
        const company = data.companies[0]
        console.log("✅ Global Company Data API successful for:", companyName)

        return {
          name: company.name,
          domain: company.domain,
          industry: company.industry,
          employees: company.employee_count,
          revenue: company.annual_revenue,
          founded: company.founded_year,
          location: `${company.city || ""}, ${company.country || ""}`,
          description: company.description,
          website: company.website,
          linkedin: company.linkedin_url,
          twitter: company.twitter_url,
          phone: company.phone,
          address: company.address,
          source: "Global Company Data API",
          confidence: 0.9,
        }
      }
    }

    console.log("❌ Global Company Data API failed for:", companyName)
    return null
  } catch (error) {
    console.error("Global Company Data API error:", error)
    return null
  }
}

function getMockData(email?: string | null, company?: string | null, name?: string | null) {
  if (email) {
    return NextResponse.json({
      person: {
        name: extractNameFromEmail(email),
        email: email,
        title: "Senior Executive",
        company: "Premium Holdings LLC",
        industry: "Real Estate Investment",
        location: "Beverly Hills, CA",
        linkedin: "https://linkedin.com/in/executive",
        experience: [
          {
            company: "Premium Holdings LLC",
            title: "Senior Executive",
            duration: "2020 - Present",
          },
        ],
        source: "Mock Data (People Data Labs Alternative)",
        confidence: 0.7,
      },
    })
  }

  if (company) {
    return NextResponse.json({
      company: {
        name: company,
        domain: `${company.toLowerCase().replace(/\s+/g, "")}.com`,
        industry: "Real Estate",
        employees: 150,
        revenue: 25000000,
        founded: 2015,
        location: "Los Angeles, CA",
        description: `${company} is a leading real estate investment company.`,
        website: `https://${company.toLowerCase().replace(/\s+/g, "")}.com`,
        source: "Mock Data (Global Company Data Alternative)",
        confidence: 0.7,
      },
    })
  }

  return NextResponse.json({ error: "No data available" }, { status: 404 })
}

function extractNameFromEmail(email: string): string {
  const localPart = email.split("@")[0]
  return localPart
    .split(/[._-]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}
