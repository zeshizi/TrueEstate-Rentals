"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, Download, AlertTriangle } from "lucide-react"

interface AccessLog {
  id: string
  userId: string
  userEmail: string
  action: string
  resource: string
  ipAddress: string
  userAgent: string
  timestamp: Date
  status: "success" | "failed" | "blocked"
  riskLevel: "low" | "medium" | "high"
}

export function AccessLogging() {
  const [logs, setLogs] = useState<AccessLog[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: "",
    action: "all",
    status: "all",
    riskLevel: "all",
    dateRange: "24h",
  })

  useEffect(() => {
    fetchAccessLogs()
  }, [filters])

  const fetchAccessLogs = async () => {
    try {
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== "all" && value !== "") {
          params.append(key, value)
        }
      })

      const response = await fetch(`/api/admin/access-logs?${params}`)
      const data = await response.json()
      setLogs(data.logs || [])
    } catch (error) {
      console.error("Failed to fetch access logs:", error)
    } finally {
      setLoading(false)
    }
  }

  const exportLogs = async () => {
    try {
      const response = await fetch("/api/admin/access-logs/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      })

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `access-logs-${new Date().toISOString().split("T")[0]}.csv`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Failed to export logs:", error)
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-600"
      case "failed":
        return "bg-red-600"
      case "blocked":
        return "bg-orange-600"
      default:
        return "bg-gray-600"
    }
  }

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-600"
      case "medium":
        return "bg-yellow-600"
      case "high":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  const mockLogs: AccessLog[] = [
    {
      id: "1",
      userId: "user1",
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
      id: "2",
      userId: "user2",
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
      id: "3",
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
  ]

  const displayLogs = logs.length > 0 ? logs : mockLogs

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Access Logs & Security Monitoring
          </CardTitle>
          <Button onClick={exportLogs} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Security Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {displayLogs.filter((log) => log.status === "success").length}
            </div>
            <div className="text-sm text-gray-600">Successful Actions</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {displayLogs.filter((log) => log.status === "failed").length}
            </div>
            <div className="text-sm text-gray-600">Failed Attempts</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {displayLogs.filter((log) => log.riskLevel === "high").length}
            </div>
            <div className="text-sm text-gray-600">High Risk Events</div>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {new Set(displayLogs.map((log) => log.ipAddress)).size}
            </div>
            <div className="text-sm text-gray-600">Unique IP Addresses</div>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <Input
              placeholder="Search logs..."
              value={filters.search}
              onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
              className="w-full"
            />
          </div>
          <Select value={filters.action} onValueChange={(value) => setFilters((prev) => ({ ...prev, action: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              <SelectItem value="LOGIN">Login</SelectItem>
              <SelectItem value="LOGOUT">Logout</SelectItem>
              <SelectItem value="PROPERTY_SEARCH">Property Search</SelectItem>
              <SelectItem value="DATA_EXPORT">Data Export</SelectItem>
              <SelectItem value="ADMIN_ACTION">Admin Action</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filters.status} onValueChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={filters.riskLevel}
            onValueChange={(value) => setFilters((prev) => ({ ...prev, riskLevel: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Risk Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risk Levels</SelectItem>
              <SelectItem value="low">Low Risk</SelectItem>
              <SelectItem value="medium">Medium Risk</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={filters.dateRange}
            onValueChange={(value) => setFilters((prev) => ({ ...prev, dateRange: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* High Risk Alerts */}
        {displayLogs.some((log) => log.riskLevel === "high") && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-800 font-medium mb-2">
              <AlertTriangle className="h-5 w-5" />
              Security Alerts
            </div>
            <div className="space-y-1 text-sm text-red-700">
              {displayLogs
                .filter((log) => log.riskLevel === "high")
                .slice(0, 3)
                .map((log) => (
                  <div key={log.id}>
                    • {log.action} from {log.ipAddress} - {log.userEmail}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Access Logs Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Risk Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="text-sm">{log.timestamp.toLocaleDateString()}</div>
                    <div className="text-xs text-gray-600">{log.timestamp.toLocaleTimeString()}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium">{log.userEmail}</div>
                    <div className="text-xs text-gray-600">{log.userId}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium">{log.action}</div>
                    <div className="text-xs text-gray-600">{log.resource}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{log.ipAddress}</div>
                    <div className="text-xs text-gray-600 truncate max-w-32">{log.userAgent.split(" ")[0]}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(log.status)}>
                      {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRiskBadgeColor(log.riskLevel)}>
                      {log.riskLevel.charAt(0).toUpperCase() + log.riskLevel.slice(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {displayLogs.length === 0 && (
          <div className="text-center py-8 text-gray-600">No access logs found for the selected criteria.</div>
        )}
      </CardContent>
    </Card>
  )
}
