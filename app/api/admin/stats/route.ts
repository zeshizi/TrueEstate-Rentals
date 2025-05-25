import { NextResponse } from "next/server"

export async function GET() {
  try {
    console.log("📊 Admin Stats API - Using comprehensive mock data")

    // Generate realistic admin statistics
    const mockStats = {
      totalUsers: 15847,
      totalProperties: 250,
      totalSearches: 89234,
      totalRevenue: 2847392,
      activeUsers: 3421,
      newUsersToday: 127,
      propertiesAddedToday: 23,
      searchesToday: 1847,

      // Geographic distribution
      topStates: [
        { state: "California", properties: 45, users: 2847 },
        { state: "Texas", properties: 38, users: 2134 },
        { state: "New York", properties: 32, users: 1923 },
        { state: "Florida", properties: 28, users: 1654 },
        { state: "Illinois", properties: 22, users: 1234 },
      ],

      // Price segments
      priceDistribution: [
        { range: "$0-$250K", count: 62, percentage: 25 },
        { range: "$250K-$500K", count: 88, percentage: 35 },
        { range: "$500K-$1M", count: 63, percentage: 25 },
        { range: "$1M-$3M", count: 25, percentage: 10 },
        { range: "$3M+", count: 12, percentage: 5 },
      ],

      // Property types
      propertyTypes: [
        { type: "Single Family", count: 89, percentage: 36 },
        { type: "Condo", count: 67, percentage: 27 },
        { type: "Townhouse", count: 45, percentage: 18 },
        { type: "Multi-Family", count: 28, percentage: 11 },
        { type: "Luxury Estate", count: 21, percentage: 8 },
      ],

      // Recent activity
      recentActivity: [
        { action: "New Property Listed", location: "Beverly Hills, CA", value: "$4.5M", time: "2 minutes ago" },
        { action: "User Registered", location: "Austin, TX", value: "Premium Plan", time: "5 minutes ago" },
        { action: "Search Performed", location: "Miami, FL", value: "Luxury Condos", time: "8 minutes ago" },
        { action: "Property Sold", location: "Manhattan, NY", value: "$2.1M", time: "12 minutes ago" },
        { action: "New Property Listed", location: "Seattle, WA", value: "$850K", time: "15 minutes ago" },
      ],

      // Performance metrics
      performance: {
        avgResponseTime: 245,
        uptime: 99.97,
        errorRate: 0.03,
        cacheHitRate: 94.2,
      },

      // Revenue breakdown
      revenue: {
        subscriptions: 1847392,
        premiumFeatures: 567234,
        apiAccess: 234567,
        partnerships: 198199,
      },

      dataSource: "comprehensive_mock_data",
      timestamp: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: mockStats,
      message: "Admin statistics loaded successfully",
    })
  } catch (error) {
    console.error("❌ Admin stats error:", error)

    // Return fallback stats even on error
    return NextResponse.json(
      {
        success: false,
        data: {
          totalUsers: 15000,
          totalProperties: 200,
          totalSearches: 85000,
          totalRevenue: 2500000,
          dataSource: "fallback_mock_data",
          error: "Using fallback statistics",
        },
        error: "Failed to load admin statistics",
      },
      { status: 200 },
    ) // Return 200 to prevent UI errors
  }
}
