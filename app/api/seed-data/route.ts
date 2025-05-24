import { NextResponse } from "next/server"
import { PropertyService } from "@/lib/services/property-service"
import { UserService } from "@/lib/services/user-service"
import { WealthService } from "@/lib/services/wealth-service"

const propertyService = new PropertyService()
const userService = new UserService()
const wealthService = new WealthService()

export async function POST() {
  try {
    console.log("🌱 Starting database seeding...")

    // Seed sample properties
    await propertyService.seedSampleData()

    // Create sample users
    const sampleUsers = [
      {
        id: "user_admin_1",
        email: "admin@trueestate.com",
        name: "Admin User",
        role: "admin" as const,
        company: "TrueEstate",
        preferences: {
          bookmarkedProperties: [],
          savedSearches: [],
          notifications: true,
        },
      },
      {
        id: "user_analyst_1",
        email: "analyst@trueestate.com",
        name: "Market Analyst",
        role: "analyst" as const,
        company: "TrueEstate",
        preferences: {
          bookmarkedProperties: [],
          savedSearches: [],
          notifications: true,
        },
      },
    ]

    for (const userData of sampleUsers) {
      try {
        const existingUser = await userService.getUserByEmail(userData.email)
        if (!existingUser) {
          await userService.createUser(userData)
          console.log(`✅ Created user: ${userData.email}`)
        }
      } catch (error) {
        console.log(`ℹ️ User ${userData.email} may already exist`)
      }
    }

    // Generate wealth analyses for sample properties
    const sampleOwners = [
      "Sarah Johnson",
      "Goldman Investment LLC",
      "Entertainment Mogul Trust",
      "Real Estate Dynasty Corp",
      "Hedge Fund Partners LLC",
    ]

    for (const ownerName of sampleOwners) {
      try {
        await wealthService.generateWealthAnalysis(ownerName)
        console.log(`✅ Generated wealth analysis for: ${ownerName}`)
      } catch (error) {
        console.log(`ℹ️ Wealth analysis for ${ownerName} may already exist`)
      }
    }

    console.log("🎉 Database seeding completed successfully!")

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      seeded: {
        properties: 5,
        users: sampleUsers.length,
        wealthAnalyses: sampleOwners.length,
      },
    })
  } catch (error) {
    console.error("❌ Seeding error:", error)
    return NextResponse.json(
      {
        error: "Failed to seed database",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Use POST to seed the database with sample data",
    endpoint: "/api/seed-data",
    method: "POST",
  })
}
