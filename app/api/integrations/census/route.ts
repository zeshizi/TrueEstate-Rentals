import { type NextRequest, NextResponse } from "next/server"

// U.S. Census Bureau API integration for demographic and housing data
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const dataType = searchParams.get("type") || "demographics"
  const state = searchParams.get("state") || "36" // Default to NY
  const county = searchParams.get("county")
  const tract = searchParams.get("tract")
  const apiKey = process.env.CENSUS_API_KEY || "demo_key"

  try {
    let apiUrl = ""
    let variables = ""

    switch (dataType) {
      case "demographics":
        variables = "B19013_001E,B25077_001E,B25064_001E,B08303_001E,B15003_022E"
        // Median household income, median home value, median rent, commute time, bachelor's degree
        break

      case "housing":
        variables = "B25001_001E,B25002_001E,B25003_001E,B25004_001E"
        // Total housing units, occupancy status, tenure, vacancy status
        break

      case "population":
        variables = "B01003_001E,B25010_001E,B08301_001E"
        // Total population, average household size, means of transportation
        break

      default:
        variables = "B19013_001E,B25077_001E"
    }

    // Build API URL based on geographic level
    if (tract && county) {
      apiUrl = `https://api.census.gov/data/2021/acs/acs5?get=${variables}&for=tract:${tract}&in=state:${state}&in=county:${county}&key=${apiKey}`
    } else if (county) {
      apiUrl = `https://api.census.gov/data/2021/acs/acs5?get=${variables}&for=county:${county}&in=state:${state}&key=${apiKey}`
    } else {
      apiUrl = `https://api.census.gov/data/2021/acs/acs5?get=${variables}&for=county:*&in=state:${state}&key=${apiKey}`
    }

    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error(`Census API error: ${response.status}`)
    }

    const rawData = await response.json()
    const transformedData = transformCensusData(dataType, rawData)

    return NextResponse.json({
      dataType,
      source: "U.S. Census Bureau",
      data: transformedData,
      geography: { state, county, tract },
    })
  } catch (error) {
    console.error("Census API error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch Census data",
        fallback: getMockCensusData(dataType),
      },
      { status: 500 },
    )
  }
}

function transformCensusData(dataType: string, rawData: any[]) {
  if (!rawData || rawData.length < 2) return []

  const headers = rawData[0]
  const data = rawData.slice(1)

  return data.map((row) => {
    const item: any = {}

    headers.forEach((header: string, index: number) => {
      const value = row[index]

      switch (header) {
        case "B19013_001E":
          item.medianHouseholdIncome = Number.parseInt(value) || 0
          break
        case "B25077_001E":
          item.medianHomeValue = Number.parseInt(value) || 0
          break
        case "B25064_001E":
          item.medianRent = Number.parseInt(value) || 0
          break
        case "B08303_001E":
          item.averageCommuteTime = Number.parseInt(value) || 0
          break
        case "B15003_022E":
          item.bachelorsDegreeCount = Number.parseInt(value) || 0
          break
        case "B25001_001E":
          item.totalHousingUnits = Number.parseInt(value) || 0
          break
        case "B25002_001E":
          item.occupiedUnits = Number.parseInt(value) || 0
          break
        case "B01003_001E":
          item.totalPopulation = Number.parseInt(value) || 0
          break
        case "state":
          item.state = value
          break
        case "county":
          item.county = value
          break
        case "tract":
          item.tract = value
          break
      }
    })

    return item
  })
}

function getMockCensusData(dataType: string) {
  return [
    {
      medianHouseholdIncome: 75000,
      medianHomeValue: 650000,
      medianRent: 2500,
      totalPopulation: 50000,
      state: "36",
      county: "061",
    },
  ]
}
