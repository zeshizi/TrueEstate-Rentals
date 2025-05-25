import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const company = searchParams.get("company")
  const domain = searchParams.get("domain")
  const country = searchParams.get("country") || "United States"

  console.log("🌍 Global Company Data API - Using comprehensive mock data")

  const mockCompanyData = {
    company_id: `gcd_${Math.random().toString(36).substr(2, 9)}`,
    name: company || "Global Enterprises Inc",
    legal_name: `${company || "Global Enterprises Inc"} Corporation`,
    domain: domain || "globalenterprises.com",

    industry: {
      primary: "Technology",
      secondary: "Software Development",
      naics_code: "541511",
      sic_code: "7372",
    },

    location: {
      headquarters: {
        country: country,
        state: country === "United States" ? "California" : null,
        city: country === "United States" ? "San Francisco" : "London",
        address: "123 Business Plaza",
        postal_code: country === "United States" ? "94105" : "SW1A 1AA",
      },
      offices: [
        {
          country: "United States",
          city: "New York",
          type: "Regional Office",
        },
        {
          country: "United Kingdom",
          city: "London",
          type: "European Headquarters",
        },
        {
          country: "Singapore",
          city: "Singapore",
          type: "Asia Pacific Office",
        },
      ],
    },

    financials: {
      annual_revenue: Math.floor(Math.random() * 500000000) + 50000000,
      revenue_range: "$50M - $500M",
      funding_total: Math.floor(Math.random() * 100000000) + 10000000,
      funding_rounds: Math.floor(Math.random() * 5) + 1,
      valuation: Math.floor(Math.random() * 1000000000) + 100000000,
      profit_margin: (Math.random() * 20 + 5).toFixed(2) + "%",
    },

    employees: {
      total: Math.floor(Math.random() * 5000) + 100,
      range: "100-5000",
      growth_rate: (Math.random() * 30 + 5).toFixed(1) + "%",
      departments: {
        engineering: Math.floor(Math.random() * 200) + 50,
        sales: Math.floor(Math.random() * 100) + 20,
        marketing: Math.floor(Math.random() * 50) + 10,
        operations: Math.floor(Math.random() * 80) + 15,
      },
    },

    executives: [
      {
        name: "John Smith",
        title: "Chief Executive Officer",
        linkedin: "https://linkedin.com/in/johnsmith-ceo",
        tenure: "5 years",
        previous_companies: ["TechCorp", "InnovateLabs"],
      },
      {
        name: "Sarah Johnson",
        title: "Chief Technology Officer",
        linkedin: "https://linkedin.com/in/sarahjohnson-cto",
        tenure: "3 years",
        previous_companies: ["Google", "Microsoft"],
      },
      {
        name: "Michael Brown",
        title: "Chief Financial Officer",
        linkedin: "https://linkedin.com/in/michaelbrown-cfo",
        tenure: "2 years",
        previous_companies: ["Goldman Sachs", "JPMorgan"],
      },
    ],

    technology_stack: [
      "React",
      "Node.js",
      "Python",
      "AWS",
      "Docker",
      "Kubernetes",
      "MongoDB",
      "PostgreSQL",
      "Redis",
      "Elasticsearch",
    ],

    competitors: ["CompetitorA Corp", "TechRival Inc", "InnovateNow LLC", "FutureTech Solutions"],

    social_media: {
      linkedin: `https://linkedin.com/company/${(company || "global-enterprises").toLowerCase().replace(/\s+/g, "-")}`,
      twitter: `https://twitter.com/${(company || "globalenterprises").toLowerCase().replace(/\s+/g, "")}`,
      facebook: `https://facebook.com/${(company || "globalenterprises").toLowerCase().replace(/\s+/g, "")}`,
      instagram: `https://instagram.com/${(company || "globalenterprises").toLowerCase().replace(/\s+/g, "")}`,
    },

    founded: Math.floor(Math.random() * 30) + 1990,
    company_type: "Private",
    status: "Active",

    description: `${company || "Global Enterprises Inc"} is a leading technology company specializing in innovative software solutions. We help businesses transform their operations through cutting-edge technology and exceptional service.`,

    recent_news: [
      {
        title: `${company || "Global Enterprises"} Announces Major Product Launch`,
        date: "2024-01-15",
        source: "TechCrunch",
      },
      {
        title: `${company || "Global Enterprises"} Raises $50M Series B Funding`,
        date: "2023-11-20",
        source: "VentureBeat",
      },
    ],

    certifications: ["ISO 27001", "SOC 2 Type II", "GDPR Compliant", "PCI DSS"],

    real_estate_holdings: {
      properties_owned: Math.floor(Math.random() * 10) + 1,
      total_value: Math.floor(Math.random() * 50000000) + 5000000,
      primary_markets: ["San Francisco", "New York", "London", "Singapore"],
    },
  }

  return NextResponse.json({
    status: "success",
    data: mockCompanyData,
    dataSource: "global_company_data_mock",
    timestamp: new Date().toISOString(),
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  const { companies } = body

  console.log("🌍 Global Company Data Bulk API - Processing", companies?.length || 0, "companies")

  const mockBulkResults =
    companies?.map((companyName: string, index: number) => ({
      company_id: `gcd_bulk_${index}_${Math.random().toString(36).substr(2, 9)}`,
      name: companyName,
      industry: ["Technology", "Finance", "Healthcare", "Manufacturing", "Retail"][index % 5],
      employees: Math.floor(Math.random() * 2000) + 100,
      revenue: Math.floor(Math.random() * 200000000) + 20000000,
      location: {
        country: "United States",
        city: ["San Francisco", "New York", "Chicago", "Austin", "Seattle"][index % 5],
      },
      founded: Math.floor(Math.random() * 30) + 1990,
      status: "Active",
    })) || []

  return NextResponse.json({
    status: "success",
    results: mockBulkResults,
    count: mockBulkResults.length,
    dataSource: "global_company_data_bulk_mock",
    timestamp: new Date().toISOString(),
  })
}
