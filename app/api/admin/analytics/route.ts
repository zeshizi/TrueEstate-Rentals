import { type NextRequest, NextResponse } from "next/server"
import { CacheService } from "@/lib/redis/cache-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "24h"

    // Get analytics from Redis counters
    const analytics = {
      searches: {
        total: await CacheService.getCounter("analytics:searches:total"),
        today: await CacheService.getCounter(`analytics:searches:${new Date().toDateString()}`),
        cached: await CacheService.getCounter("analytics:searches:cached"),
      },
      users: {
        active: await CacheService.getCounter("analytics:users:active"),
        signups: await CacheService.getCounter(`analytics:signups:${new Date().toDateString()}`),
        logins: await CacheService.getCounter(`analytics:logins:${new Date().toDateString()}`),
      },
      rateLimiting: {
        blocked: await CacheService.getCounter("analytics:blocked:total"),
        searchBlocked: await CacheService.getCounter("analytics:blocked:search"),
        apiBlocked: await CacheService.getCounter("analytics:blocked:api"),
      },
      performance: {
        cacheHitRate: await calculateCacheHitRate(),
        avgResponseTime: await getAverageResponseTime(),
      },
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}

async function calculateCacheHitRate(): Promise<number> {
  const hits = await CacheService.getCounter("analytics:cache:hits")
  const misses = await CacheService.getCounter("analytics:cache:misses")
  const total = hits + misses
  return total > 0 ? Math.round((hits / total) * 100) : 0
}

async function getAverageResponseTime(): Promise<number> {
  // This would be calculated from response time tracking
  return 245 // Mock value in milliseconds
}
