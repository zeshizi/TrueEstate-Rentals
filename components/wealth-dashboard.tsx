"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Building, MapPin, DollarSign, PieChart, BarChart3, Download, Share2 } from "lucide-react"

interface WealthDashboardProps {
  ownerId: string
  ownerName: string
  totalNetWorth: number
  realEstateValue: number
  liquidAssets: number
  investments: number
  businessAssets: number
  properties: Array<{
    id: string
    address: string
    value: number
    region: string
    propertyType: string
    acquisitionDate: string
    currentROI: number
  }>
}

export function WealthDashboard({
  ownerId,
  ownerName,
  totalNetWorth,
  realEstateValue,
  liquidAssets,
  investments,
  businessAssets,
  properties,
}: WealthDashboardProps) {
  // Calculate regional breakdown
  const regionalBreakdown = properties.reduce(
    (acc, property) => {
      if (!acc[property.region]) {
        acc[property.region] = { value: 0, count: 0 }
      }
      acc[property.region].value += property.value
      acc[property.region].count += 1
      return acc
    },
    {} as Record<string, { value: number; count: number }>,
  )

  // Calculate property type breakdown
  const propertyTypeBreakdown = properties.reduce(
    (acc, property) => {
      if (!acc[property.propertyType]) {
        acc[property.propertyType] = { value: 0, count: 0 }
      }
      acc[property.propertyType].value += property.value
      acc[property.propertyType].count += 1
      return acc
    },
    {} as Record<string, { value: number; count: number }>,
  )

  const assetBreakdown = [
    {
      category: "Real Estate",
      value: realEstateValue,
      percentage: (realEstateValue / totalNetWorth) * 100,
      icon: Building,
      color: "bg-blue-500",
    },
    {
      category: "Investments",
      value: investments,
      percentage: (investments / totalNetWorth) * 100,
      icon: TrendingUp,
      color: "bg-green-500",
    },
    {
      category: "Business Assets",
      value: businessAssets,
      percentage: (businessAssets / totalNetWorth) * 100,
      icon: BarChart3,
      color: "bg-purple-500",
    },
    {
      category: "Liquid Assets",
      value: liquidAssets,
      percentage: (liquidAssets / totalNetWorth) * 100,
      icon: DollarSign,
      color: "bg-orange-500",
    },
  ]

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(1)}B`
    } else if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`
    }
    return `$${amount.toLocaleString()}`
  }

  const handleExportDashboard = () => {
    const dashboardData = {
      owner: ownerName,
      totalNetWorth,
      assetBreakdown,
      regionalBreakdown,
      propertyTypeBreakdown,
      properties,
      exportedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(dashboardData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `wealth-dashboard-${ownerName.replace(/[^a-zA-Z0-9]/g, "-")}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{ownerName}</h1>
          <p className="text-gray-600">Wealth Portfolio Dashboard</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportDashboard}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Net Worth Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Total Net Worth
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-5xl font-bold text-green-600 mb-2">{formatCurrency(totalNetWorth)}</div>
            <div className="flex justify-center gap-4 text-sm text-gray-600">
              <span>Last updated: {new Date().toLocaleDateString()}</span>
              <Badge className="bg-green-100 text-green-800">+12.5% YoY</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Asset Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Asset Allocation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Asset Categories */}
            <div className="space-y-4">
              {assetBreakdown.map((asset, index) => {
                const Icon = asset.icon
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${asset.color}`} />
                        <Icon className="h-4 w-4" />
                        <span className="font-medium">{asset.category}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{formatCurrency(asset.value)}</div>
                        <div className="text-sm text-gray-600">{asset.percentage.toFixed(1)}%</div>
                      </div>
                    </div>
                    <Progress value={asset.percentage} className="h-2" />
                  </div>
                )
              })}
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Portfolio Highlights</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Properties:</span>
                    <span className="font-semibold">{properties.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Real Estate %:</span>
                    <span className="font-semibold">{((realEstateValue / totalNetWorth) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Property Value:</span>
                    <span className="font-semibold">{formatCurrency(realEstateValue / properties.length)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Portfolio Diversity:</span>
                    <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regional Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Regional Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(regionalBreakdown)
                .sort(([, a], [, b]) => b.value - a.value)
                .map(([region, data], index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{region}</span>
                      <span className="text-gray-600">
                        {data.count} properties • {formatCurrency(data.value)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(data.value / realEstateValue) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Property Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(propertyTypeBreakdown)
                .sort(([, a], [, b]) => b.value - a.value)
                .map(([type, data], index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{type}</span>
                      <span className="text-gray-600">
                        {data.count} properties • {formatCurrency(data.value)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${(data.value / realEstateValue) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Property Portfolio */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Property Portfolio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {properties
              .sort((a, b) => b.value - a.value)
              .map((property, index) => (
                <div key={property.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{property.address}</div>
                    <div className="text-sm text-gray-600">
                      {property.propertyType} • {property.region} • Acquired {property.acquisitionDate}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatCurrency(property.value)}</div>
                    <div className="text-sm text-green-600">ROI: {property.currentROI}%</div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">+12.5%</div>
              <div className="text-sm text-gray-600">YoY Growth</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">18.7%</div>
              <div className="text-sm text-gray-600">Avg ROI</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">4.2</div>
              <div className="text-sm text-gray-600">Diversity Score</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">A+</div>
              <div className="text-sm text-gray-600">Credit Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
