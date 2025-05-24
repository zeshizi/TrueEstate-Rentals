"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Building, Briefcase, PieChart } from "lucide-react"

interface WealthAnalysisProps {
  property: {
    ownerWealth: number
    ownerName: string
    confidence: "High" | "Medium" | "Low"
  }
}

export function WealthAnalysis({ property }: WealthAnalysisProps) {
  const wealthBreakdown = [
    { category: "Real Estate", percentage: 45, amount: property.ownerWealth * 0.45 },
    { category: "Investments", percentage: 30, amount: property.ownerWealth * 0.3 },
    { category: "Business Assets", percentage: 20, amount: property.ownerWealth * 0.2 },
    { category: "Other", percentage: 5, amount: property.ownerWealth * 0.05 },
  ]

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          Wealth Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Estimated Net Worth</span>
            <Badge
              className={
                property.confidence === "High"
                  ? "bg-green-600"
                  : property.confidence === "Medium"
                    ? "bg-yellow-600"
                    : "bg-red-600"
              }
            >
              {property.confidence}
            </Badge>
          </div>
          <div className="text-2xl font-bold">${(property.ownerWealth / 1000000).toFixed(1)}M</div>
          <div className="text-sm text-gray-600">Last updated: December 2024</div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">Wealth Composition</h4>
          <div className="space-y-3">
            {wealthBreakdown.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center">
                    {item.category === "Real Estate" && <Building className="h-4 w-4 mr-1" />}
                    {item.category === "Investments" && <TrendingUp className="h-4 w-4 mr-1" />}
                    {item.category === "Business Assets" && <Briefcase className="h-4 w-4 mr-1" />}
                    {item.category === "Other" && <PieChart className="h-4 w-4 mr-1" />}
                    {item.category}
                  </span>
                  <span className="font-medium">
                    ${(item.amount / 1000000).toFixed(1)}M ({item.percentage}%)
                  </span>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">Data Sources</h4>
          <div className="space-y-1 text-sm text-gray-600">
            <div>• Wealth Engine</div>
            <div>• PitchBook</div>
            <div>• Public Records</div>
            <div>• ZoomInfo</div>
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-600">
          <strong>Disclaimer:</strong> Wealth estimates are based on available public data and third-party sources.
          Actual net worth may vary significantly.
        </div>
      </CardContent>
    </Card>
  )
}
