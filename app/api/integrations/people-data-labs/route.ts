import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get("email")
  const name = searchParams.get("name")
  const company = searchParams.get("company")

  console.log("👥 People Data Labs API - Using comprehensive mock data")

  const mockPersonData = {
    id: `pdl_${Math.random().toString(36).substr(2, 9)}`,
    full_name: name || "Sarah Johnson",
    first_name: name?.split(" ")[0] || "Sarah",
    last_name: name?.split(" ")[1] || "Johnson",
    emails: [email || "sarah.johnson@example.com"],
    phone_numbers: ["+1-555-987-6543"],

    job_title: "Senior Vice President",
    job_title_role: "executive",
    job_title_sub_role: "senior_vice_president",
    job_title_levels: ["senior", "executive"],

    job_company_name: company || "TechCorp Industries",
    job_company_size: "1001-5000",
    job_company_industry: "Technology",
    job_company_location_name: "San Francisco, California, United States",

    location_names: ["San Francisco, California, United States"],
    location_country: "United States",
    location_region: "California",
    location_metro: "San Francisco Bay Area",

    linkedin_url: "https://linkedin.com/in/sarahjohnson",
    linkedin_username: "sarahjohnson",

    github_url: "https://github.com/sarahjohnson",
    github_username: "sarahjohnson",

    twitter_url: "https://twitter.com/sarahjohnson",
    twitter_username: "sarahjohnson",

    facebook_url: "https://facebook.com/sarah.johnson",
    facebook_username: "sarah.johnson",

    work_email: email || "sarah.johnson@techcorp.com",
    personal_emails: ["sarah.j.personal@gmail.com"],

    mobile_phone: "+1-555-987-6543",

    birth_year: 1985,
    birth_date: "1985-03-15",

    gender: "female",

    location_address_line_2: "Suite 400",
    location_address_line_1: "123 Market Street",
    location_postal_code: "94105",

    summary:
      "Experienced technology executive with over 15 years in software development and team leadership. Specializes in scaling engineering organizations and driving product innovation.",

    experience: [
      {
        company: {
          name: company || "TechCorp Industries",
          size: "1001-5000",
          industry: "Technology",
          location: {
            name: "San Francisco, California, United States",
          },
        },
        title: {
          name: "Senior Vice President of Engineering",
          role: "executive",
          sub_role: "senior_vice_president",
        },
        start_date: "2020-01-01",
        end_date: null,
        is_primary: true,
      },
      {
        company: {
          name: "InnovateTech Solutions",
          size: "501-1000",
          industry: "Technology",
        },
        title: {
          name: "Director of Engineering",
          role: "management",
          sub_role: "director",
        },
        start_date: "2017-06-01",
        end_date: "2019-12-31",
      },
    ],

    education: [
      {
        school: {
          name: "Stanford University",
          type: "university",
        },
        degrees: ["Master of Science"],
        majors: ["Computer Science"],
        start_date: "2005-09-01",
        end_date: "2007-06-01",
      },
      {
        school: {
          name: "UC Berkeley",
          type: "university",
        },
        degrees: ["Bachelor of Science"],
        majors: ["Computer Science"],
        start_date: "2001-09-01",
        end_date: "2005-06-01",
      },
    ],

    skills: [
      "JavaScript",
      "Python",
      "React",
      "Node.js",
      "AWS",
      "Docker",
      "Kubernetes",
      "Team Leadership",
      "Product Management",
      "Agile",
    ],

    interests: [
      "Artificial Intelligence",
      "Machine Learning",
      "Startups",
      "Venture Capital",
      "Open Source",
      "Women in Tech",
    ],

    industry: "Technology",

    net_worth: Math.floor(Math.random() * 5000000) + 1000000,

    likelihood: 0.95,

    data_addendum: {
      real_estate_properties: Math.floor(Math.random() * 5) + 1,
      estimated_property_value: Math.floor(Math.random() * 3000000) + 500000,
      investment_portfolio_size: Math.floor(Math.random() * 2000000) + 200000,
    },
  }

  return NextResponse.json({
    status: 200,
    data: mockPersonData,
    dataSource: "people_data_labs_mock",
    timestamp: new Date().toISOString(),
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  const { requests } = body

  console.log("👥 People Data Labs Bulk API - Processing", requests?.length || 0, "requests")

  const mockBulkResults =
    requests?.map((req: any, index: number) => ({
      status: 200,
      data: {
        id: `pdl_bulk_${index}_${Math.random().toString(36).substr(2, 9)}`,
        full_name: req.params?.name || `Person ${index + 1}`,
        emails: [req.params?.email || `person${index + 1}@example.com`],
        job_title: ["CEO", "CTO", "VP Engineering", "Director", "Senior Manager"][index % 5],
        job_company_name: req.params?.company || `Company ${index + 1}`,
        location_names: ["San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA"][index % 4],
        linkedin_url: `https://linkedin.com/in/person${index + 1}`,
        net_worth: Math.floor(Math.random() * 3000000) + 500000,
        likelihood: 0.8 + Math.random() * 0.2,
      },
    })) || []

  return NextResponse.json({
    status: 200,
    results: mockBulkResults,
    count: mockBulkResults.length,
    dataSource: "people_data_labs_bulk_mock",
    timestamp: new Date().toISOString(),
  })
}
