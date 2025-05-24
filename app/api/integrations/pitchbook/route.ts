import { type NextRequest, NextResponse } from "next/server"

// Mock PitchBook API integration for company and investor data
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const companyName = searchParams.get("company")
  const personName = searchParams.get("person")

  if (companyName) {
    return NextResponse.json({
      company: {
        name: companyName,
        industry: "Technology",
        founded: 2015,
        employees: 250,
        revenue: 50000000,
        valuation: 200000000,
        investors: [
          { name: "Venture Capital Fund A", stake: 25 },
          { name: "Angel Investor Group", stake: 15 },
        ],
        executives: [{ name: "John Smith", title: "CEO", equity: 35 }],
      },
    })
  }

  if (personName) {
    return NextResponse.json({
      person: {
        name: personName,
        title: "CEO",
        companies: [{ name: "Smith Enterprises LLC", role: "Founder & CEO", equity: 100 }],
        investments: [{ company: "Tech Startup Inc", stake: 15, value: 1000000 }],
        netWorth: 15000000,
        confidence: "High",
      },
    })
  }

  return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
}
