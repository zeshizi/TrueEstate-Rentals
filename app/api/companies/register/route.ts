import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const db = await getDatabase()

    // Create company record
    const company = {
      id: `company_${Date.now()}`,
      name: data.companyName,
      industry: data.industry,
      size: data.companySize,
      website: data.website,
      address: {
        street: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
      },
      businessLicense: data.businessLicense,
      taxId: data.taxId,
      description: data.description,
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const companyResult = await db.collection("companies").insertOne(company)

    // Create admin user
    const adminUser = {
      id: `user_${Date.now()}`,
      email: data.adminEmail,
      firstName: data.adminFirstName,
      lastName: data.adminLastName,
      phone: data.adminPhone,
      title: data.adminTitle,
      role: "admin",
      companyId: company.id,
      status: "active",
      preferences: {
        notifications: true,
        emailUpdates: true,
        savedSearches: [],
        bookmarkedProperties: [],
      },
      subscription: {
        plan: "enterprise",
        status: "active",
        features: ["unlimited_searches", "data_export", "api_access", "priority_support"],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    }

    const userResult = await db.collection("users").insertOne(adminUser)

    // Log the registration
    await db.collection("access_logs").insertOne({
      id: `log_${Date.now()}`,
      userId: adminUser.id,
      userEmail: adminUser.email,
      action: "COMPANY_REGISTRATION",
      resource: "/api/companies/register",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
      timestamp: new Date(),
      status: "success",
      riskLevel: "low",
      details: {
        companyId: company.id,
        companyName: company.name,
      },
    })

    return NextResponse.json({
      success: true,
      company: { id: company.id, name: company.name },
      admin: { id: adminUser.id, email: adminUser.email },
      message: "Company registered successfully. Admin account created.",
    })
  } catch (error) {
    console.error("Company registration error:", error)
    return NextResponse.json({ error: "Failed to register company" }, { status: 500 })
  }
}
