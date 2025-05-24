"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Database,
  Users,
  Building,
  TrendingUp,
  Settings,
  Key,
  Globe,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle,
} from "lucide-react"

export function AdminDashboard() {
  const [stats, setStats] = useState<any>(null)
  const [apiStatus, setApiStatus] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [statsRes, apiRes] = await Promise.all([fetch("/api/admin/stats"), fetch("/api/environment-setup")])

      const statsData = await statsRes.json()
      const apiData = await apiRes.json()

      setStats(statsData)
      setApiStatus(apiData)
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const seedDatabase = async () => {
    try {
      const response = await fetch("/api/seed-data", { method: "POST" })
      const result = await response.json()
      console.log("Database seeded:", result)
      fetchDashboardData() // Refresh stats
    } catch (error) {
      console.error("Failed to seed database:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Properties</p>
                <p className="text-2xl font-bold">{stats?.properties?.total || 0}</p>
              </div>
              <Building className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">{stats?.users?.total || 0}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Wealth Analyses</p>
                <p className="text-2xl font-bold">{stats?.wealthAnalyses?.total || 0}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">API Status</p>
                <p className="text-2xl font-bold">
                  {apiStatus?.summary?.active || 0}/{apiStatus?.summary?.total || 0}
                </p>
              </div>
              <Database className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="apis">API Status</TabsTrigger>
          <TabsTrigger value="data">Data Management</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Platform Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Properties Added Today</span>
                    <Badge variant="outline">{stats?.properties?.addedToday || 0}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Users</span>
                    <Badge variant="outline">{stats?.users?.active || 0}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Searches Today</span>
                    <Badge variant="outline">{stats?.searches?.today || 0}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>API Calls Today</span>
                    <Badge variant="outline">{stats?.apiCalls?.today || 0}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Database Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>MongoDB Connection</span>
                    <Badge className="bg-green-600">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Properties Collection</span>
                    <Badge className="bg-green-600">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Users Collection</span>
                    <Badge className="bg-green-600">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Wealth Analyses</span>
                    <Badge className="bg-green-600">Healthy</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="apis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Integration Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {apiStatus?.sources?.map((source: any) => (
                    <div key={source.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{source.name}</h3>
                        <Badge className={source.status === "active" ? "bg-green-600" : "bg-gray-600"}>
                          {source.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{source.description}</p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Cost:</span>
                          <span>{source.cost}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rate Limit:</span>
                          <span>{source.rateLimit}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>API Key:</span>
                          <span className="flex items-center gap-1">
                            {source.apiKey ? (
                              <CheckCircle className="h-3 w-3 text-green-600" />
                            ) : (
                              <AlertCircle className="h-3 w-3 text-red-600" />
                            )}
                            {source.apiKey ? "Configured" : "Missing"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button onClick={seedDatabase} className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Seed Sample Data
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Properties
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Sync Data.gov
                </Button>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Data Sources</h4>
                <div className="space-y-2 text-sm text-blue-800">
                  <div>• Data.gov: 310,995+ government datasets</div>
                  <div>• U.S. Census Bureau: Demographics and housing</div>
                  <div>• NYC Open Data: Property assessments and sales</div>
                  <div>• OpenStreetMap: Free mapping data</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{stats?.users?.total || 0}</div>
                    <div className="text-sm text-gray-600">Total Users</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{stats?.users?.active || 0}</div>
                    <div className="text-sm text-gray-600">Active Users</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{stats?.users?.premium || 0}</div>
                    <div className="text-sm text-gray-600">Premium Users</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Platform Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Maintenance Mode</h4>
                    <p className="text-sm text-gray-600">Temporarily disable public access</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Disabled
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">API Rate Limiting</h4>
                    <p className="text-sm text-gray-600">Control API request limits</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Data Refresh</h4>
                    <p className="text-sm text-gray-600">Automatic data synchronization</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Daily
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
