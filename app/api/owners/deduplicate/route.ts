import { NextResponse } from "next/server"
import { ownerIdentificationAlgorithm, type OwnerRecord } from "@/lib/algorithms/owner-identification"

export async function POST(request: Request) {
  try {
    const { owners } = await request.json()

    if (!Array.isArray(owners)) {
      return NextResponse.json({ error: "Invalid input: owners must be an array" }, { status: 400 })
    }

    console.log(`🔍 Starting deduplication process for ${owners.length} owner records`)

    const startTime = Date.now()
    const result = await ownerIdentificationAlgorithm.batchDeduplication(owners)
    const processingTime = Date.now() - startTime

    console.log(`✅ Deduplication complete:`, {
      originalCount: owners.length,
      uniqueCount: result.uniqueOwners.length,
      duplicatesFound: result.duplicatesFound,
      processingTime: `${processingTime}ms`,
      deduplicationRate: `${((result.duplicatesFound / owners.length) * 100).toFixed(1)}%`,
    })

    return NextResponse.json({
      success: true,
      originalCount: owners.length,
      uniqueCount: result.uniqueOwners.length,
      duplicatesFound: result.duplicatesFound,
      deduplicationRate: (result.duplicatesFound / owners.length) * 100,
      processingTime,
      uniqueOwners: result.uniqueOwners,
      consolidationReport: result.consolidationReport,
      algorithm: {
        version: "1.0",
        confidenceThresholds: {
          exactMatch: 0.95,
          highConfidence: 0.85,
          mediumConfidence: 0.7,
          lowConfidence: 0.5,
        },
        fieldWeights: {
          ssn: 0.4,
          ein: 0.35,
          email: 0.25,
          phone: 0.2,
          name: 0.15,
          address: 0.15,
          dateOfBirth: 0.3,
          businessName: 0.2,
        },
      },
    })
  } catch (error) {
    console.error("❌ Owner deduplication error:", error)
    return NextResponse.json(
      {
        error: "Failed to process owner deduplication",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const testMode = searchParams.get("test") === "true"

  if (testMode) {
    // Generate test data for demonstration
    const testOwners: OwnerRecord[] = [
      {
        name: "John Smith",
        address: "123 Main Street",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90210",
        phone: "(555) 123-4567",
        email: "john.smith@email.com",
        ssn: "1234",
        businessType: "Individual",
        dataSource: "county_records",
        properties: ["prop_1", "prop_2"],
      },
      {
        name: "John A. Smith",
        address: "123 Main St",
        city: "Los Angeles",
        state: "California",
        zipCode: "90210",
        phone: "555-123-4567",
        email: "j.smith@email.com",
        ssn: "1234",
        businessType: "Individual",
        dataSource: "zillow",
        properties: ["prop_3"],
      },
      {
        name: "Smith Holdings LLC",
        businessName: "Smith Holdings LLC",
        address: "456 Business Ave",
        city: "Beverly Hills",
        state: "CA",
        zipCode: "90211",
        phone: "(555) 987-6543",
        email: "info@smithholdings.com",
        ein: "12-3456789",
        businessType: "LLC",
        dataSource: "secretary_of_state",
        properties: ["prop_4", "prop_5"],
      },
    ]

    const result = await ownerIdentificationAlgorithm.batchDeduplication(testOwners)

    return NextResponse.json({
      success: true,
      testMode: true,
      ...result,
      algorithm: "Owner Identification Algorithm v1.0",
    })
  }

  return NextResponse.json({
    message: "Owner Deduplication API",
    endpoints: {
      POST: "Process owner deduplication",
      "GET?test=true": "Run test deduplication",
    },
    algorithm: {
      name: "Market Standard Owner Identification",
      version: "1.0",
      features: [
        "Multi-field matching with weighted confidence",
        "Fuzzy name and address matching",
        "Business entity recognition",
        "SSN/EIN based exact matching",
        "Levenshtein distance calculation",
        "Batch processing with consolidation reports",
      ],
    },
  })
}
