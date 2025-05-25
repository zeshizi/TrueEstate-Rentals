"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, DollarSign, Bookmark, Download, ExternalLink, History, Camera, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface EnhancedPropertyDetailsProps {
  property: {
    id: string
    address: string
    value: number
    ownerWealth: number
    ownerName: string
    confidence: "High" | "Medium" | "Low"
    propertyType?: string
    bedrooms?: number
    bathrooms?: number
    sqft?: number
    yearBuilt?: number
    images?: string[]
  }
}

export function EnhancedPropertyDetails({ property }: EnhancedPropertyDetailsProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Check if property is already bookmarked
    const bookmarks = JSON.parse(localStorage.getItem("property-bookmarks") || "[]")
    setIsBookmarked(bookmarks.some((b: any) => b.id === property.id))
  }, [property.id])

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("property-bookmarks") || "[]")

    if (isBookmarked) {
      // Remove bookmark
      const updated = bookmarks.filter((b: any) => b.id !== property.id)
      localStorage.setItem("property-bookmarks", JSON.stringify(updated))
      setIsBookmarked(false)
      toast({
        title: "Bookmark Removed",
        description: "Property removed from your bookmarks",
      })
    } else {
      // Add bookmark
      const bookmark = {
        ...property,
        bookmarkedAt: new Date(),
      }
      bookmarks.push(bookmark)
      localStorage.setItem("property-bookmarks", JSON.stringify(bookmarks))
      setIsBookmarked(true)
      toast({
        title: "Property Bookmarked",
        description: "Property added to your bookmarks",
      })
    }
  }

  const handleExport = () => {
    const exportData = {
      address: property.address,
      value: property.value,
      owner: property.ownerName,
      ownerWealth: property.ownerWealth,
      confidence: property.confidence,
      exportedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `property-${property.id}-report.json`
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Export Complete",
      description: "Property report has been downloaded",
    })
  }

  // Mock data for enhanced features
  const ownershipHistory = [
    { date: "2022-01-15", owner: property.ownerName, price: property.value, type: "Purchase" },
    { date: "2019-06-20", owner: "Previous Owner LLC", price: property.value * 0.85, type: "Sale" },
    { date: "2015-03-10", owner: "Original Developer", price: property.value * 0.65, type: "Construction" },
  ]

  const transactionRecords = [
    { date: "2022-01-15", type: "Purchase", amount: property.value, description: "Property acquisition" },
    { date: "2022-02-01", type: "Renovation", amount: 250000, description: "Kitchen and bathroom upgrade" },
    { date: "2023-01-01", type: "Assessment", amount: property.value * 1.1, description: "Annual tax assessment" },
  ]

  const propertyImages = property.images || [
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">Property Details</CardTitle>
          <div className="flex space-x-2">
            <Button variant={isBookmarked ? "default" : "outline"} size="sm" onClick={handleBookmark}>
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
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
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Property Type:</span>
                  <span>{property.propertyType || "Single Family"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Square Feet:</span>
                  <span>{property.sqft?.toLocaleString() || "3,200"} sqft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bedrooms:</span>
                  <span>{property.bedrooms || 4}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bathrooms:</span>
                  <span>{property.bathrooms || 3}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Year Built:</span>
                  <span>{property.yearBuilt || 2018}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per sqft:</span>
                  <span>${Math.round(property.value / (property.sqft || 3200))}</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Current Owner</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Owner Name</span>
                  <span className="font-medium">{property.ownerName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Estimated Net Worth</span>
                  <span className="font-medium">${(property.ownerWealth / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Ownership Since</span>
                  <span>Jan 2022</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="images" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Camera className="h-5 w-5" />
              <h4 className="font-medium">Property Images</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {propertyImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Property view ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                    View {index + 1}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-600">
              Images are sourced from public records and real estate listings. Last updated:{" "}
              {new Date().toLocaleDateString()}
            </p>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <History className="h-5 w-5" />
              <h4 className="font-medium">Ownership & Transaction History</h4>
            </div>

            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-sm mb-2">Ownership History</h5>
                <div className="space-y-2">
                  {ownershipHistory.map((record, index) => (
                    <div key={index} className="flex justify-between items-center p-2 border rounded">
                      <div>
                        <div className="font-medium text-sm">{record.owner}</div>
                        <div className="text-xs text-gray-600">
                          {record.type} • {record.date}
                        </div>
                      </div>
                      <div className="text-sm font-medium">${(record.price / 1000000).toFixed(1)}M</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-medium text-sm mb-2">Transaction Records</h5>
                <div className="space-y-2">
                  {transactionRecords.map((transaction, index) => (
                    <div key={index} className="flex justify-between items-center p-2 border rounded">
                      <div>
                        <div className="font-medium text-sm">{transaction.type}</div>
                        <div className="text-xs text-gray-600">{transaction.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">${(transaction.amount / 1000000).toFixed(1)}M</div>
                        <div className="text-xs text-gray-600">{transaction.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5" />
              <h4 className="font-medium">Market Analysis</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-3">
                <h5 className="font-medium text-sm mb-2">Market Trends</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>1-Year Change:</span>
                    <span className="text-green-600 font-medium">+12.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>5-Year Change:</span>
                    <span className="text-green-600 font-medium">+45.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Market Status:</span>
                    <span className="font-medium">Appreciating</span>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-3">
                <h5 className="font-medium text-sm mb-2">Comparable Properties</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Neighborhood Avg:</span>
                    <span className="font-medium">${((property.value * 0.9) / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price Rank:</span>
                    <span className="font-medium">Top 15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Investment Grade:</span>
                    <span className="text-green-600 font-medium">A-</span>
                  </div>
                </div>
              </div>
            </div>

            <Button className="w-full" variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Full Market Analysis Report
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
