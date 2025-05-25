import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const domain = searchParams.get("domain")
  const email = searchParams.get("email")

  console.log("🏢 Clearbit API - Using comprehensive mock data")

  // Generate realistic company and person data
  const mockCompanyData = {
    name: domain
      ? `${domain.split(".")[0].charAt(0).toUpperCase() + domain.split(".")[0].slice(1)} Corp`
      : "Sample Company",
    domain: domain || "example.com",
    category: {
      sector: "Technology",
      industryGroup: "Software & Services",
      industry: "Software",
      subIndustry: "Application Software",
    },
    metrics: {
      employees: Math.floor(Math.random() * 10000) + 100,
      employeesRange: "100-500",
      marketCap: Math.floor(Math.random() * 10000000000) + 1000000000,
      raised: Math.floor(Math.random() * 100000000) + 10000000,
      annualRevenue: Math.floor(Math.random() * 500000000) + 50000000,
    },
    location: {
      city: "San Francisco",
      state: "California",
      country: "United States",
      streetNumber: "123",
      streetName: "Market Street",
      postalCode: "94105",
    },
    tech: ["React", "Node.js", "AWS", "MongoDB", "TypeScript"],
    founded: Math.floor(Math.random() * 30) + 1990,
    description: "Leading technology company focused on innovative solutions.",
    logo: `/placeholder.svg?height=100&width=100&query=company logo`,
    website: domain || "https://example.com",
    phone: "+1-555-123-4567",
    emailProvider: false,
    type: "private",
  }

  const mockPersonData = email
    ? {
        email: email,
        name: {
          fullName: "John Smith",
          givenName: "John",
          familyName: "Smith",
        },
        location: {
          city: "San Francisco",
          state: "California",
          country: "United States",
        },
        employment: {
          name: mockCompanyData.name,
          title: "Software Engineer",
          role: "engineering",
          seniority: "senior",
        },
        social: {
          linkedin: {
            handle: "johnsmith",
          },
          twitter: {
            handle: "johnsmith",
          },
        },
        avatar: `/placeholder.svg?height=150&width=150&query=professional headshot`,
        bio: "Experienced software engineer with expertise in full-stack development.",
      }
    : null

  return NextResponse.json({
    success: true,
    company: mockCompanyData,
    person: mockPersonData,
    dataSource: "clearbit_mock_data",
    timestamp: new Date().toISOString(),
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  const { emails } = body

  console.log("🏢 Clearbit Bulk API - Using mock data for", emails?.length || 0, "emails")

  const mockBulkData =
    emails?.map((email: string, index: number) => ({
      email,
      person: {
        name: {
          fullName: `Person ${index + 1}`,
          givenName: `First${index + 1}`,
          familyName: `Last${index + 1}`,
        },
        employment: {
          name: `Company ${index + 1}`,
          title: ["CEO", "CTO", "VP Engineering", "Director", "Manager"][index % 5],
          role: "engineering",
          seniority: ["executive", "senior", "mid", "junior"][index % 4],
        },
        location: {
          city: ["San Francisco", "New York", "Austin", "Seattle", "Boston"][index % 5],
          state: ["California", "New York", "Texas", "Washington", "Massachusetts"][index % 5],
          country: "United States",
        },
        netWorth: Math.floor(Math.random() * 5000000) + 500000,
        avatar: `/placeholder.svg?height=100&width=100&query=person ${index + 1}`,
      },
      company: {
        name: `Company ${index + 1}`,
        domain: `company${index + 1}.com`,
        employees: Math.floor(Math.random() * 1000) + 50,
        industry: ["Technology", "Finance", "Healthcare", "Real Estate", "Manufacturing"][index % 5],
        revenue: Math.floor(Math.random() * 100000000) + 10000000,
      },
    })) || []

  return NextResponse.json({
    success: true,
    results: mockBulkData,
    count: mockBulkData.length,
    dataSource: "clearbit_bulk_mock_data",
    timestamp: new Date().toISOString(),
  })
}
