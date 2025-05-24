import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName, role } = await request.json()
    const db = await getDatabase()

    // Create employee invitation
    const invitation = {
      id: `inv_${Date.now()}`,
      email,
      firstName,
      lastName,
      role,
      status: "pending",
      invitedAt: new Date(),
      invitedBy: "admin@company.com", // Should come from session
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    }

    await db.collection("employee_invitations").insertOne(invitation)

    // Log the invitation
    await db.collection("access_logs").insertOne({
      id: `log_${Date.now()}`,
      userId: "admin@company.com",
      userEmail: "admin@company.com",
      action: "EMPLOYEE_INVITATION",
      resource: "/api/admin/employees/invite",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
      timestamp: new Date(),
      status: "success",
      riskLevel: "low",
      details: {
        invitedEmail: email,
        role,
      },
    })

    // In a real app, send email invitation here
    console.log(`Invitation sent to ${email} for role ${role}`)

    return NextResponse.json({
      success: true,
      message: "Invitation sent successfully",
      invitation: { id: invitation.id, email, role },
    })
  } catch (error) {
    console.error("Failed to send invitation:", error)
    return NextResponse.json({ error: "Failed to send invitation" }, { status: 500 })
  }
}
