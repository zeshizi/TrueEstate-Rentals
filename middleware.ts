import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { RateLimiter } from "@/lib/redis/rate-limiter"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ip = request.ip ?? request.headers.get("x-forwarded-for") ?? "127.0.0.1"

  // Apply rate limiting to specific routes
  if (pathname.startsWith("/api/search")) {
    const result = await RateLimiter.checkLimit("search", ip)

    if (!result.success) {
      return new NextResponse(
        JSON.stringify({
          error: result.error,
          retryAfter: Math.round((result.reset - Date.now()) / 1000),
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "X-RateLimit-Limit": result.limit.toString(),
            "X-RateLimit-Remaining": result.remaining.toString(),
            "X-RateLimit-Reset": result.reset.toString(),
          },
        },
      )
    }

    // Add rate limit headers to successful requests
    const response = NextResponse.next()
    response.headers.set("X-RateLimit-Limit", result.limit.toString())
    response.headers.set("X-RateLimit-Remaining", result.remaining.toString())
    response.headers.set("X-RateLimit-Reset", result.reset.toString())

    return response
  }

  if (pathname.startsWith("/api/") && !pathname.startsWith("/api/auth")) {
    const result = await RateLimiter.checkLimit("api", ip)

    if (!result.success) {
      return new NextResponse(
        JSON.stringify({
          error: result.error,
          retryAfter: Math.round((result.reset - Date.now()) / 1000),
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "X-RateLimit-Limit": result.limit.toString(),
            "X-RateLimit-Remaining": result.remaining.toString(),
            "X-RateLimit-Reset": result.reset.toString(),
          },
        },
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/api/search/:path*", "/api/properties/:path*", "/api/wealth-analysis/:path*", "/api/integrations/:path*"],
}
