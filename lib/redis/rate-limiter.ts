import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

export class RateLimiter {
  private static redis = Redis.fromEnv()

  // Different rate limits for different operations
  static loginAttempts = new Ratelimit({
    redis: this.redis,
    limiter: Ratelimit.slidingWindow(5, "60 s"), // 5 attempts per minute
    analytics: true,
  })

  static searchRequests = new Ratelimit({
    redis: this.redis,
    limiter: Ratelimit.slidingWindow(30, "60 s"), // 30 searches per minute
    analytics: true,
  })

  static apiCalls = new Ratelimit({
    redis: this.redis,
    limiter: Ratelimit.slidingWindow(100, "60 s"), // 100 API calls per minute
    analytics: true,
  })

  static dataExports = new Ratelimit({
    redis: this.redis,
    limiter: Ratelimit.slidingWindow(5, "3600 s"), // 5 exports per hour
    analytics: true,
  })

  // Check rate limit for specific operation
  static async checkLimit(
    operation: "login" | "search" | "api" | "export",
    identifier: string,
  ): Promise<{
    success: boolean
    limit: number
    remaining: number
    reset: number
    error?: string
  }> {
    let ratelimit: Ratelimit
    let key: string

    switch (operation) {
      case "login":
        ratelimit = this.loginAttempts
        key = `login:${identifier}`
        break
      case "search":
        ratelimit = this.searchRequests
        key = `search:${identifier}`
        break
      case "api":
        ratelimit = this.apiCalls
        key = `api:${identifier}`
        break
      case "export":
        ratelimit = this.dataExports
        key = `export:${identifier}`
        break
      default:
        throw new Error(`Unknown operation: ${operation}`)
    }

    const result = await ratelimit.limit(key)

    if (!result.success) {
      const resetInSeconds = Math.round((result.reset - Date.now()) / 1000)
      return {
        ...result,
        error: `Rate limit exceeded. Try again in ${resetInSeconds} seconds.`,
      }
    }

    return result
  }

  // Get analytics for rate limiting
  static async getAnalytics(operation: string, start: Date, end: Date) {
    // This would integrate with Upstash Analytics
    // For now, return mock data
    return {
      operation,
      period: { start, end },
      totalRequests: 1250,
      blockedRequests: 45,
      successRate: 96.4,
    }
  }
}
