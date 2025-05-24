"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, DollarSign, Bookmark, Download, ExternalLink } from "lucide-react"

interface PropertyDetailsProps {
  property: {
    id: string
    address: string
    value: number
    ownerWealth: number
    ownerName: string
    confidence: "High" | "Medium" | "Low"
  }
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  const handleBookmark = () => {
    // Implement bookmark functionality
    console.log("Bookmarking property:", property.id)
  }

  const handleExport = () => {
    // Implement export functionality
    console.log("Exporting property data:", property.id)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">Property Details</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleBookmark}>
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{property.address}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <DollarSign className="h-4 w-4 mr-1" />
              <span className="font-semibold">${(property.value / 1000000).toFixed(2)}M</span>
            </div>
            <Badge
              className={
                property.confidence === "High"
                  ? "bg-green-600"
                  : property.confidence === "Medium"
                    ? "bg-yellow-600"
                    : "bg-red-600"
              }
            >
              {property.confidence} Confidence
            </Badge>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">Property Information</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Property Type:</span>
              <span>Single Family</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Square Feet:</span>
              <span>3,200 sqft</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Bedrooms:</span>
              <span>4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Bathrooms:</span>
              <span>3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Year Built:</span>
              <span>2018</span>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">Ownership History</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span>Current Owner</span>
              <span className="font-medium">{property.ownerName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Purchase Date</span>
              <span>Jan 2022</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Purchase Price</span>
              <span>${((property.value * 0.9) / 1000000).toFixed(2)}M</span>
            </div>
          </div>
        </div>

        <Button className="w-full" variant="outline">
          <ExternalLink className="h-4 w-4 mr-2" />
          View Full Report
        </Button>
      </CardContent>
    </Card>
  )
}
