import { Redis } from "@upstash/redis"

export class CacheService {
  private static redis = Redis.fromEnv()

  // Cache property search results
  static async cacheSearchResults(query: string, results: any[], ttl = 300) {
    const key = `search:${Buffer.from(query).toString("base64")}`
    await this.redis.setex(key, ttl, JSON.stringify(results))
    console.log(`🗄️ Cached search results for: ${query}`)
  }

  static async getCachedSearchResults(query: string): Promise<any[] | null> {
    const key = `search:${Buffer.from(query).toString("base64")}`
    const cached = await this.redis.get(key)

    if (cached) {
      console.log(`⚡ Retrieved cached results for: ${query}`)
      return JSON.parse(cached as string)
    }

    return null
  }

  // Cache user session data
  static async cacheUserSession(userId: string, sessionData: any, ttl = 3600) {
    const key = `session:${userId}`
    await this.redis.setex(key, ttl, JSON.stringify(sessionData))
  }

  static async getUserSession(userId: string): Promise<any | null> {
    const key = `session:${userId}`
    const session = await this.redis.get(key)
    return session ? JSON.parse(session as string) : null
  }

  // Cache property details
  static async cachePropertyDetails(propertyId: string, details: any, ttl = 1800) {
    const key = `property:${propertyId}`
    await this.redis.setex(key, ttl, JSON.stringify(details))
  }

  static async getCachedPropertyDetails(propertyId: string): Promise<any | null> {
    const key = `property:${propertyId}`
    const cached = await this.redis.get(key)
    return cached ? JSON.parse(cached as string) : null
  }

  // Cache API responses
  static async cacheApiResponse(endpoint: string, params: any, response: any, ttl = 600) {
    const key = `api:${endpoint}:${Buffer.from(JSON.stringify(params)).toString("base64")}`
    await this.redis.setex(key, ttl, JSON.stringify(response))
  }

  static async getCachedApiResponse(endpoint: string, params: any): Promise<any | null> {
    const key = `api:${endpoint}:${Buffer.from(JSON.stringify(params)).toString("base64")}`
    const cached = await this.redis.get(key)
    return cached ? JSON.parse(cached as string) : null
  }

  // Clear cache by pattern
  static async clearCache(pattern: string) {
    const keys = await this.redis.keys(pattern)
    if (keys.length > 0) {
      await this.redis.del(...keys)
      console.log(`🗑️ Cleared ${keys.length} cache entries matching: ${pattern}`)
    }
  }

  // Analytics and monitoring
  static async incrementCounter(key: string, ttl = 86400) {
    await this.redis.incr(key)
    await this.redis.expire(key, ttl)
  }

  static async getCounter(key: string): Promise<number> {
    const count = await this.redis.get(key)
    return count ? Number.parseInt(count as string) : 0
  }
}
