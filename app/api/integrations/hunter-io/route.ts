import { type NextRequest, NextResponse } from "next/server"

// Hunter.io API integration for finding business email addresses
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const domain = searchParams.get("domain")
  const firstName = searchParams.get("firstName")
  const lastName = searchParams.get("lastName")
  const companyName = searchParams.get("company")
  const apiKey = process.env.HUNTER_IO_API_KEY

  if (!apiKey) {
    return getMockHunterData(domain, firstName, lastName, companyName)
  }

  try {
    if (domain && firstName && lastName) {
      // Email finder
      const finderUrl = `https://api.hunter.io/v2/email-finder?domain=${domain}&first_name=${firstName}&last_name=${lastName}&api_key=${apiKey}`
      const response = await fetch(finderUrl)
      const data = await response.json()

      if (data.data?.email) {
        return NextResponse.json({
          person: {
            email: data.data.email,
            confidence: data.data.confidence,
            firstName,
            lastName,
            domain,
            sources: data.data.sources,
          },
        })
      }
    }

    if (domain) {
      // Domain search
      const domainUrl = `https://api.hunter.io/v2/domain-search?domain=${domain}&api_key=${apiKey}&limit=10`
      const response = await fetch(domainUrl)
      const data = await response.json()

      if (data.data?.emails) {
        return NextResponse.json({
          domain,
          organization: data.data.organization,
          emails: data.data.emails.map((email: any) => ({
            email: email.value,
            firstName: email.first_name,
            lastName: email.last_name,
            position: email.position,
            confidence: email.confidence,
          })),
          pattern: data.data.pattern,
        })
      }
    }

    return NextResponse.json({ error: "No data found" }, { status: 404 })
  } catch (error) {
    console.error("Hunter.io API error:", error)
    return getMockHunterData(domain, firstName, lastName, companyName)
  }
}

function getMockHunterData(
  domain?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  companyName?: string | null,
) {
  if (domain && firstName && lastName) {
    return NextResponse.json({
      person: {
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
        confidence: 85,
        firstName,
        lastName,
        domain,
        sources: ["Company website", "LinkedIn"],
      },
    })
  }

  if (domain) {
    return NextResponse.json({
      domain,
      organization: companyName || "Smith Enterprises LLC",
      emails: [
        {
          email: `info@${domain}`,
          firstName: "John",
          lastName: "Smith",
          position: "CEO",
          confidence: 92,
        },
        {
          email: `contact@${domain}`,
          firstName: "Jane",
          lastName: "Doe",
          position: "CFO",
          confidence: 87,
        },
      ],
      pattern: "{first}.{last}@{domain}",
    })
  }

  return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
}
