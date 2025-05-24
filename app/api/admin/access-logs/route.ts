import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const action = searchParams.get("action") || "all"
    const status = searchParams.get("status") || "all"
    const riskLevel = searchParams.get("riskLevel") || "all"
    const dateRange = searchParams.get("dateRange") || "24h"

    // Mock access logs for demo
    const mockLogs = [
      {
        id: "log_1",
        userId: "user_1",
        userEmail: "admin@company.com",
        action: "LOGIN",
        resource: "/auth/signin",
        ipAddress: "192.168.1.100",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        timestamp: new Date(),
        status: "success",
        riskLevel: "low",
      },
      {
        id: "log_2",
        userId: "user_2",
        userEmail: "analyst@company.com",
        action: "PROPERTY_SEARCH",
        resource: "/api/properties",
        ipAddress: "192.168.1.101",
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        timestamp: new Date(Date.now() - 300000),
        status: "success",
        riskLevel: "low",
      },
      {
        id: "log_3",
        userId: "unknown",
        userEmail: "suspicious@external.com",
        action: "FAILED_LOGIN",
        resource: "/auth/signin",
        ipAddress: "203.0.113.1",
        userAgent: "curl/7.68.0",
        timestamp: new Date(Date.now() - 600000),
        status: "failed",
        riskLevel: "high",
      },
      {
        id: "log_4",
        userId: "user_2",
        userEmail: "analyst@company.com",
        action: "DATA_EXPORT",
        resource: "/api/properties/export",
        ipAddress: "192.168.1.101",
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        timestamp: new Date(Date.now() - 900000),
        status: "success",
        riskLevel: "medium",
      },
    ]

    // Apply filters
    let filteredLogs = mockLogs

    if (search) {
      filteredLogs = filteredLogs.filter(
        (log) =>
          log.userEmail.toLowerCase().includes(search.toLowerCase()) ||
          log.action.toLowerCase().includes(search.toLowerCase()) ||
          log.ipAddress.includes(search),
      )
    }

    if (action !== "all") {
      filteredLogs = filteredLogs.filter((log) => log.action === action)
    }

    if (status !== "all") {
      filteredLogs = filteredLogs.filter((log) => log.status === status)
    }

    if (riskLevel !== "all") {
      filteredLogs = filteredLogs.filter((log) => log.riskLevel === riskLevel)
    }

    // Apply date range filter
    const now = Date.now()
    const ranges = {
      "1h": 60 * 60 * 1000,
      "24h": 24 * 60 * 60 * 1000,
      "7d": 7 * 24 * 60 * 60 * 1000,
      "30d": 30 * 24 * 60 * 60 * 1000,
    }

    const rangeMs = ranges[dateRange as keyof typeof ranges] || ranges["24h"]
    filteredLogs = filteredLogs.filter((log) => now - log.timestamp.getTime() <= rangeMs)

    return NextResponse.json({ logs: filteredLogs })
  } catch (error) {
    console.error("Failed to fetch access logs:", error)
    return NextResponse.json({ error: "Failed to fetch access logs" }, { status: 500 })
  }
}
