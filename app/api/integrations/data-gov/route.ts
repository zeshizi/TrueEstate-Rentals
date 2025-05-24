import { type NextRequest, NextResponse } from "next/server"

// Enhanced Data.gov API integration with better error handling and fallbacks
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const dataset = searchParams.get("dataset") || "property-assessments"
  const query = searchParams.get("query")
  const location = searchParams.get("location")
  const limit = Number.parseInt(searchParams.get("limit") || "50")

  // Always use mock data - no external API calls
  console.log(`Using mock data for dataset: ${dataset}`)

  const mockData = getComprehensiveMockData(dataset, query, location, limit)

  return NextResponse.json({
    dataset,
    source: "mock-data",
    count: Array.isArray(mockData) ? mockData.length : 1,
    data: mockData,
    note: "Using comprehensive mock data for all US states",
    timestamp: new Date().toISOString(),
  })
}

function transformDataGovResponse(dataset: string, rawData: any) {
  if (!Array.isArray(rawData)) {
    console.warn("Expected array data, got:", typeof rawData)
    return []
  }

  switch (dataset) {
    case "property-assessments":
      return rawData.slice(0, 50).map((item: any, index: number) => ({
        id: item.bbl || item.parid || `prop_${index}`,
        address:
          `${item.housenum_lo || item.house_number || ""} ${item.street_name || item.street || ""}, ${item.boro || item.borough || ""}`.trim(),
        ownerName: item.owner_name || item.owner || "Unknown Owner",
        assessedValue:
          Number.parseFloat(item.av_total || item.assessed_value || "0") ||
          Math.floor(Math.random() * 2000000) + 500000,
        marketValue:
          Number.parseFloat(item.mkt_total || item.market_value || "0") || Math.floor(Math.random() * 2500000) + 600000,
        propertyType: item.bldgcl || item.building_class || "R4",
        yearBuilt: Number.parseInt(item.year_built || "2000") || Math.floor(Math.random() * 50) + 1970,
        lotSize: Number.parseFloat(item.lot_area || "0") || Math.floor(Math.random() * 5000) + 1000,
        buildingArea: Number.parseFloat(item.bld_area || "0") || Math.floor(Math.random() * 3000) + 800,
        borough: item.boro || item.borough || "MANHATTAN",
        block: item.block || Math.floor(Math.random() * 9999) + 1,
        lot: item.lot || Math.floor(Math.random() * 999) + 1,
      }))

    case "real-estate-sales":
      return rawData.slice(0, 50).map((item: any, index: number) => ({
        id: item.ease_ment || item.id || `sale_${index}`,
        address: item.address || `${Math.floor(Math.random() * 999) + 1} Sample St`,
        borough: item.borough || "MANHATTAN",
        neighborhood: item.neighborhood || "Midtown",
        buildingClassCategory: item.building_class_category || "RESIDENTIAL",
        salePrice: Number.parseFloat(item.sale_price || "0") || Math.floor(Math.random() * 3000000) + 500000,
        saleDate: item.sale_date || new Date().toISOString().split("T")[0],
        grossSqft: Number.parseFloat(item.gross_square_feet || "0") || Math.floor(Math.random() * 2000) + 800,
        landSqft: Number.parseFloat(item.land_square_feet || "0") || Math.floor(Math.random() * 3000) + 1000,
        yearBuilt: Number.parseInt(item.year_built || "2000") || Math.floor(Math.random() * 50) + 1970,
        buildingClass: item.building_class_at_sale || "R4",
      }))

    case "census-demographics":
      // Handle both array format and object format
      const dataArray = Array.isArray(rawData) ? rawData.slice(1) : [rawData] // Skip header if array
      return dataArray.slice(0, 20).map((item: any, index: number) => ({
        tract: Array.isArray(item) ? item[3] : item.tract || `${index + 1}`,
        state: Array.isArray(item) ? item[2] : item.state || "36",
        county: Array.isArray(item) ? item[4] : item.county || "061",
        medianHomeValue:
          Number.parseFloat(Array.isArray(item) ? item[0] : item.medianHomeValue || "0") ||
          Math.floor(Math.random() * 800000) + 400000,
        medianHouseholdIncome:
          Number.parseFloat(Array.isArray(item) ? item[1] : item.medianHouseholdIncome || "0") ||
          Math.floor(Math.random() * 80000) + 40000,
        medianRent:
          Number.parseFloat(Array.isArray(item) ? item[2] : item.medianRent || "0") ||
          Math.floor(Math.random() * 2000) + 1500,
        name: Array.isArray(item) ? item[5] : item.name || `Census Tract ${index + 1}`,
      }))

    default:
      return rawData.slice(0, 50)
  }
}

function getMockCensusData() {
  return [
    {
      tract: "001",
      state: "36",
      county: "061",
      medianHomeValue: 750000,
      medianHouseholdIncome: 85000,
      medianRent: 2800,
      name: "Census Tract 1, New York County, New York",
    },
    {
      tract: "002",
      state: "36",
      county: "061",
      medianHomeValue: 920000,
      medianHouseholdIncome: 95000,
      medianRent: 3200,
      name: "Census Tract 2, New York County, New York",
    },
  ]
}

function getComprehensiveMockData(dataset: string, query?: string | null, location?: string | null, limit = 50) {
  const allStatesMockData = {
    "property-assessments": generatePropertyAssessments(limit, query, location),
    "real-estate-sales": generateRealEstateSales(limit, location),
    "census-demographics": generateCensusDemographics(limit),
    "building-permits": generateBuildingPermits(limit, location),
    "housing-violations": generateHousingViolations(limit, location),
  }

  return allStatesMockData[dataset as keyof typeof allStatesMockData] || []
}

function generatePropertyAssessments(limit: number, query?: string | null, location?: string | null) {
  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
    "Washington DC",
  ]

  return Array.from({ length: Math.min(limit, 100) }, (_, i) => {
    const state = location || states[i % states.length]
    const ownerName = query || `${["Smith", "Johnson", "Williams", "Brown", "Davis", "Miller"][i % 6]} Holdings LLC`

    return {
      id: `prop_${state.toLowerCase().replace(/\s+/g, "_")}_${i + 1}`,
      address: `${100 + i * 10} ${["Main St", "Oak Ave", "Park Blvd", "First St", "Broadway"][i % 5]}, ${state}`,
      ownerName,
      assessedValue: Math.floor(Math.random() * 2000000) + 500000,
      marketValue: Math.floor(Math.random() * 2500000) + 600000,
      propertyType: ["R4", "R6", "C1", "C2", "O"][i % 5],
      yearBuilt: Math.floor(Math.random() * 50) + 1970,
      lotSize: Math.floor(Math.random() * 5000) + 1000,
      buildingArea: Math.floor(Math.random() * 3000) + 800,
      borough: state,
      block: Math.floor(Math.random() * 9999) + 1,
      lot: Math.floor(Math.random() * 999) + 1,
    }
  })
}

function generateRealEstateSales(limit: number, location?: string | null) {
  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
    "Washington DC",
  ]

  return Array.from({ length: Math.min(limit, 100) }, (_, i) => {
    const state = location || states[i % states.length]
    return {
      id: `sale_${state.toLowerCase().replace(/\s+/g, "_")}_${i + 1}`,
      address: `${200 + i * 15} ${["Central Ave", "Park St", "Main St", "Oak Rd"][i % 4]}, ${state}`,
      borough: state,
      neighborhood: ["Downtown", "Uptown", "Midtown", "Westside"][i % 4],
      buildingClassCategory: "RESIDENTIAL",
      salePrice: Math.floor(Math.random() * 4000000) + 1000000,
      saleDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      grossSqft: Math.floor(Math.random() * 2000) + 1000,
      landSqft: Math.floor(Math.random() * 2500) + 1200,
      yearBuilt: Math.floor(Math.random() * 40) + 1980,
      buildingClass: "R4",
    }
  })
}

function generateCensusDemographics(limit: number) {
  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
    "Washington DC",
  ]

  return Array.from({ length: Math.min(limit, 50) }, (_, i) => {
    const state = states[i % states.length]
    return {
      tract: String(i + 1).padStart(3, "0"),
      state: state,
      county: String(Math.floor(Math.random() * 100)).padStart(3, "0"),
      medianHomeValue: Math.floor(Math.random() * 800000) + 400000,
      medianHouseholdIncome: Math.floor(Math.random() * 80000) + 40000,
      medianRent: Math.floor(Math.random() * 2000) + 1500,
      name: `Census Tract ${i + 1}, ${state}`,
    }
  })
}

function generateBuildingPermits(limit: number, location?: string | null) {
  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
    "Washington DC",
  ]

  return Array.from({ length: Math.min(limit, 50) }, (_, i) => {
    const state = location || states[i % states.length]
    return {
      id: `permit_${state.toLowerCase().replace(/\s+/g, "_")}_${i + 1}`,
      address: `${300 + i * 20} Construction Ave, ${state}`,
      borough: state,
      workType: ["New Building", "Alteration", "Demolition", "Renovation"][i % 4],
      permitType: "NB",
      filingDate: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      issuedDate: new Date().toISOString().split("T")[0],
      jobDescription: `${["Residential", "Commercial", "Mixed Use"][i % 3]} construction project`,
      ownerName: `${["ABC", "XYZ", "DEF"][i % 3]} Development Corp`,
      ownerPhone: `555-${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
    }
  })
}

function generateHousingViolations(limit: number, location?: string | null) {
  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
    "Washington DC",
  ]

  return Array.from({ length: Math.min(limit, 50) }, (_, i) => {
    const state = location || states[i % states.length]
    return {
      id: `violation_${state.toLowerCase().replace(/\s+/g, "_")}_${i + 1}`,
      buildingId: String(Math.floor(Math.random() * 100000)),
      address: `${400 + i * 10} Elm St, ${state}`,
      violationDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      violationType: ["Plumbing", "Electrical", "Structural", "Sanitation"][i % 4],
      status: ["Open", "Closed"][i % 2],
      inspector: `${["John", "Jane"][i % 2]} Doe`,
      fineAmount: Math.floor(Math.random() * 500) + 100,
    }
  })
}
