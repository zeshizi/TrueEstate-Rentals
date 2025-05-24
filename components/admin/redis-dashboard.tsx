"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Database, Zap, Shield, TrendingUp, RefreshCw } from "lucide-react"

interface RedisMetrics {
  searches: {
    total: number
    today: number
    cached: number
  }
  users: {
    active: number
    signups: number
    logins: number
  }
  rateLimiting: {
    blocked: number
    searchBlocked: number
    apiBlocked: number
  }
  performance: {
    cacheHitRate: number
    avgResponseTime: number
  }
}

export function RedisDashboard() {
  const [metrics, setMetrics] = useState<RedisMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMetrics()
    const interval = setInterval(fetchMetrics, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchMetrics = async () => {
    try {
      const response = await fetch("/api/admin/analytics")
      const data = await response.json()
      setMetrics(data)
    } catch (error) {
      console.error("Failed to fetch Redis metrics:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">Loading Redis metrics...</div>
        </CardContent>
      </Card>
    )
  }

  if (!metrics) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-red-600">Failed to load Redis metrics</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Redis Performance Dashboard
            </CardTitle>
            <Button variant="outline" size="sm" onClick={fetchMetrics}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Cache Performance */}
            <div className="text-center p-4 border rounded-lg">
              <Zap className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{metrics.performance.cacheHitRate}%</div>
              <div className="text-sm text-gray-600">Cache Hit Rate</div>
              <Progress value={metrics.performance.cacheHitRate} className="mt-2" />
            </div>

            {/* Response Time */}
            <div className="text-center p-4 border rounded-lg">
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{metrics.performance.avgResponseTime}ms</div>
              <div className="text-sm text-gray-600">Avg Response Time</div>
              <Badge variant={metrics.performance.avgResponseTime < 300 ? "default" : "destructive"}>
                {metrics.performance.avgResponseTime < 300 ? "Fast" : "Slow"}
              </Badge>
            </div>

            {/* Rate Limiting */}
            <div className="text-center p-4 border rounded-lg">
              <Shield className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">{metrics.rateLimiting.blocked}</div>
              <div className="text-sm text-gray-600">Blocked Requests</div>
              <div className="text-xs text-gray-500 mt-1">
                Search: {metrics.rateLimiting.searchBlocked} | API: {metrics.rateLimiting.apiBlocked}
              </div>
            </div>

            {/* Active Users */}
            <div className="text-center p-4 border rounded-lg">
              <Database className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">{metrics.users.active}</div>
              <div className="text-sm text-gray-600">Active Users</div>
              <div className="text-xs text-gray-500 mt-1">
                Signups: {metrics.users.signups} | Logins: {metrics.users.logins}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Search Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{metrics.searches.total}</div>
              <div className="text-sm text-gray-600">Total Searches</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">{metrics.searches.today}</div>
              <div className="text-sm text-gray-600">Today's Searches</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{metrics.searches.cached}</div>
              <div className="text-sm text-gray-600">Cached Results</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rate Limiting Details */}
      <Card>
        <CardHeader>
          <CardTitle>Rate Limiting Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <div className="font-medium">Login Attempts</div>
                <div className="text-sm text-gray-600">5 attempts per minute</div>
              </div>
              <Badge variant="default">Active</Badge>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <div className="font-medium">Search Requests</div>
                <div className="text-sm text-gray-600">30 searches per minute</div>
              </div>
              <Badge variant="default">Active</Badge>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <div className="font-medium">API Calls</div>
                <div className="text-sm text-gray-600">100 calls per minute</div>
              </div>
              <Badge variant="default">Active</Badge>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <div className="font-medium">Data Exports</div>
                <div className="text-sm text-gray-600">5 exports per hour</div>
              </div>
              <Badge variant="default">Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
