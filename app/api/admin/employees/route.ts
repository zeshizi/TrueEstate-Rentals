import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase()

    // Mock employee data for demo
    const employees = [
      {
        id: "emp_1",
        email: "admin@company.com",
        firstName: "John",
        lastName: "Smith",
        role: "admin",
        status: "active",
        lastLogin: new Date(),
        invitedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        invitedBy: "system",
      },
      {
        id: "emp_2",
        email: "analyst@company.com",
        firstName: "Jane",
        lastName: "Doe",
        role: "analyst",
        status: "active",
        lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
        invitedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        invitedBy: "admin@company.com",
      },
      {
        id: "emp_3",
        email: "viewer@company.com",
        firstName: "Bob",
        lastName: "Johnson",
        role: "viewer",
        status: "pending",
        invitedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        invitedBy: "admin@company.com",
      },
    ]

    return NextResponse.json({ employees })
  } catch (error) {
    console.error("Failed to fetch employees:", error)
    return NextResponse.json({ error: "Failed to fetch employees" }, { status: 500 })
  }
}
