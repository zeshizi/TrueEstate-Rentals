import { type NextRequest, NextResponse } from "next/server"

// Mock ZoomInfo API integration for business contact information
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const personName = searchParams.get("person")
  const companyName = searchParams.get("company")

  if (personName) {
    return NextResponse.json({
      person: {
        name: personName,
        title: "Chief Executive Officer",
        company: "Smith Enterprises LLC",
        email: "john.smith@smithenterprises.com",
        phone: "+1-555-123-4567",
        linkedin: "https://linkedin.com/in/johnsmith",
        location: "Beverly Hills, CA",
        experience: [
          {
            company: "Smith Enterprises LLC",
            title: "CEO",
            startDate: "2018-01-01",
            current: true,
          },
          {
            company: "Previous Company Inc",
            title: "VP of Operations",
            startDate: "2015-03-01",
            endDate: "2017-12-31",
          },
        ],
        education: [
          {
            school: "Stanford University",
            degree: "MBA",
            field: "Business Administration",
            year: 2014,
          },
        ],
      },
    })
  }

  if (companyName) {
    return NextResponse.json({
      company: {
        name: companyName,
        industry: "Real Estate Investment",
        employees: 25,
        revenue: 50000000,
        headquarters: "Beverly Hills, CA",
        founded: 2018,
        website: "https://smithenterprises.com",
        executives: [
          {
            name: "John Smith",
            title: "CEO",
            email: "john.smith@smithenterprises.com",
          },
          {
            name: "Jane Doe",
            title: "CFO",
            email: "jane.doe@smithenterprises.com",
          },
        ],
      },
    })
  }

  return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
}
