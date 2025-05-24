import { type NextRequest, NextResponse } from "next/server"
import { UserService } from "@/lib/services/user-service"

const userService = new UserService()

export async function GET(request: NextRequest, { params }: { params: { email: string } }) {
  try {
    const email = decodeURIComponent(params.email)
    const user = await userService.getUserByEmail(email)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Return user data without sensitive information
    const { _id, ...userData } = user
    return NextResponse.json(userData)
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}
