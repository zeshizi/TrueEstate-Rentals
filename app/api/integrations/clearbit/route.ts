import { type NextRequest, NextResponse } from "next/server"

// Clearbit API integration for company and person data
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const companyDomain = searchParams.get("domain")
  const personEmail = searchParams.get("email")
  const companyName = searchParams.get("company")
  const apiKey = process.env.CLEARBIT_API_KEY

  if (!apiKey) {
    // Fallback to mock data if no API key
    return getMockClearbitData(companyDomain, personEmail, companyName)
  }

  try {
    // Company enrichment
    if (companyDomain || companyName) {
      const domain = companyDomain || `${companyName?.toLowerCase().replace(/\s+/g, "")}.com`
      const response = await fetch(`https://company.clearbit.com/v2/companies/find?domain=${domain}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        return NextResponse.json({
          company: {
            name: data.name,
            domain: data.domain,
            industry: data.category?.industry,
            employees: data.metrics?.employees,
            revenue: data.metrics?.annualRevenue,
            founded: data.foundedYear,
            location: data.geo?.city + ", " + data.geo?.state,
            description: data.description,
            logo: data.logo,
            website: data.site?.url,
          },
        })
      }
    }

    // Person enrichment
    if (personEmail) {
      const response = await fetch(`https://person.clearbit.com/v2/people/find?email=${personEmail}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        return NextResponse.json({
          person: {
            name: data.name?.fullName,
            title: data.employment?.title,
            company: data.employment?.name,
            email: data.email,
            location: data.geo?.city + ", " + data.geo?.state,
            linkedin: data.linkedin?.handle ? `https://linkedin.com/in/${data.linkedin.handle}` : null,
            twitter: data.twitter?.handle ? `https://twitter.com/${data.twitter.handle}` : null,
            avatar: data.avatar,
          },
        })
      }
    }

    return NextResponse.json({ error: "No data found" }, { status: 404 })
  } catch (error) {
    console.error("Clearbit API error:", error)
    return getMockClearbitData(companyDomain, personEmail, companyName)
  }
}

function getMockClearbitData(companyDomain?: string | null, personEmail?: string | null, companyName?: string | null) {
  if (companyDomain || companyName) {
    return NextResponse.json({
      company: {
        name: companyName || "Smith Enterprises LLC",
        domain: companyDomain || "smithenterprises.com",
        industry: "Real Estate Investment",
        employees: 25,
        revenue: 50000000,
        founded: 2018,
        location: "Beverly Hills, CA",
        description: "Real estate investment and development company",
        website: "https://smithenterprises.com",
      },
    })
  }

  if (personEmail) {
    return NextResponse.json({
      person: {
        name: "John Smith",
        title: "Chief Executive Officer",
        company: "Smith Enterprises LLC",
        email: personEmail,
        location: "Beverly Hills, CA",
        linkedin: "https://linkedin.com/in/johnsmith",
      },
    })
  }

  return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
}
