"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Plus, X } from "lucide-react"

interface Owner {
  id: string
  name: string
  netWorth: number
  confidence: "High" | "Medium" | "Low"
  properties: number
  totalPropertyValue: number
  wealthBreakdown: {
    realEstate: number
    investments: number
    business: number
    other: number
  }
}

export function OwnerComparisonTool() {
  const [selectedOwners, setSelectedOwners] = useState<Owner[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  // Mock owner data
  const mockOwners: Owner[] = [
    {
      id: "1",
      name: "Harrison Sterling",
      netWorth: 125000000,
      confidence: "High",
      properties: 3,
      totalPropertyValue: 75000000,
      wealthBreakdown: { realEstate: 60, investments: 25, business: 10, other: 5 },
    },
    {
      id: "2",
      name: "Victoria Chen",
      netWorth: 85000000,
      confidence: "High",
      properties: 2,
      totalPropertyValue: 45000000,
      wealthBreakdown: { realEstate: 53, investments: 30, business: 12, other: 5 },
    },
    {
      id: "3",
      name: "Tech Ventures LLC",
      netWorth: 180000000,
      confidence: "Medium",
      properties: 5,
      totalPropertyValue: 95000000,
      wealthBreakdown: { realEstate: 53, investments: 20, business: 25, other: 2 },
    },
  ]

  const addOwner = (owner: Owner) => {
    if (selectedOwners.length >= 4) return
    if (selectedOwners.find((o) => o.id === owner.id)) return

    setSelectedOwners([...selectedOwners, owner])
    setSearchQuery("")
  }

  const removeOwner = (ownerId: string) => {
    setSelectedOwners(selectedOwners.filter((o) => o.id !== ownerId))
  }

  const filteredOwners = mockOwners.filter(
    (owner) =>
      owner.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedOwners.find((selected) => selected.id === owner.id),
  )

  const getPercentile = (netWorth: number) => {
    if (netWorth >= 100000000) return 99.9
    if (netWorth >= 50000000) return 99.5
    if (netWorth >= 25000000) return 99.0
    return 95.0
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Owner Wealth Comparison ({selectedOwners.length}/4)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Owner Search */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Search owners to compare..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {searchQuery && filteredOwners.length > 0 && (
            <div className="border rounded-lg p-2 bg-gray-50 max-h-32 overflow-y-auto">
              {filteredOwners.slice(0, 5).map((owner) => (
                <div
                  key={owner.id}
                  className="flex items-center justify-between p-2 hover:bg-white rounded cursor-pointer"
                  onClick={() => addOwner(owner)}
                >
                  <div>
                    <div className="font-medium text-sm">{owner.name}</div>
                    <div className="text-xs text-gray-600">
                      ${(owner.netWorth / 1000000).toFixed(1)}M • {owner.properties} properties
                    </div>
                  </div>
                  <Plus className="h-4 w-4 text-blue-600" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Owners Comparison */}
        {selectedOwners.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No owners selected for comparison</p>
            <p className="text-sm">Search and add owners to compare their wealth profiles</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Net Worth Comparison */}
            <div>
              <h3 className="font-semibold mb-3">Net Worth Comparison</h3>
              <div className="space-y-3">
                {selectedOwners.map((owner) => (
                  <div key={owner.id} className="flex items-center gap-3">
                    <div className="w-32 text-sm font-medium truncate">{owner.name}</div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>${(owner.netWorth / 1000000).toFixed(1)}M</span>
                        <Badge variant="outline" className="text-xs">
                          {getPercentile(owner.netWorth)}th percentile
                        </Badge>
                      </div>
                      <Progress
                        value={(owner.netWorth / Math.max(...selectedOwners.map((o) => o.netWorth))) * 100}
                        className="h-2"
                      />
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeOwner(owner.id)} className="text-red-600">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Property Portfolio Comparison */}
            <div>
              <h3 className="font-semibold mb-3">Property Portfolio</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedOwners.map((owner) => (
                  <div key={owner.id} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{owner.name}</h4>
                      <Badge
                        className={
                          owner.confidence === "High"
                            ? "bg-green-600"
                            : owner.confidence === "Medium"
                              ? "bg-yellow-600"
                              : "bg-red-600"
                        }
                      >
                        {owner.confidence}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Properties:</span>
                        <span className="font-medium">{owner.properties}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Value:</span>
                        <span className="font-medium">${(owner.totalPropertyValue / 1000000).toFixed(1)}M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg per Property:</span>
                        <span className="font-medium">
                          ${(owner.totalPropertyValue / owner.properties / 1000000).toFixed(1)}M
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wealth Composition */}
            <div>
              <h3 className="font-semibold mb-3">Wealth Composition</h3>
              <div className="space-y-4">
                {selectedOwners.map((owner) => (
                  <div key={owner.id}>
                    <h4 className="font-medium text-sm mb-2">{owner.name}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                      <div className="text-center">
                        <div className="font-medium">{owner.wealthBreakdown.realEstate}%</div>
                        <div className="text-gray-600">Real Estate</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{owner.wealthBreakdown.investments}%</div>
                        <div className="text-gray-600">Investments</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{owner.wealthBreakdown.business}%</div>
                        <div className="text-gray-600">Business</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{owner.wealthBreakdown.other}%</div>
                        <div className="text-gray-600">Other</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
