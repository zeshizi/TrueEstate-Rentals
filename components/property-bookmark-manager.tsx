"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bookmark, Trash2, Download, Share2, MapPin, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface BookmarkedProperty {
  id: string
  address: string
  value: number
  ownerName: string
  ownerWealth: number
  confidence: "High" | "Medium" | "Low"
  bookmarkedAt: string | Date
  title?: string
  location?: string
  propertyType?: string
  bedrooms?: number
  bathrooms?: number
  sqft?: number
}

export function PropertyBookmarkManager() {
  const [bookmarks, setBookmarks] = useState<BookmarkedProperty[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Load bookmarks from localStorage
    try {
      const saved = localStorage.getItem("property-bookmarks")
      console.log("Raw localStorage data:", saved) // Debug log

      if (saved) {
        const parsedBookmarks = JSON.parse(saved)
        console.log("Parsed bookmarks:", parsedBookmarks) // Debug log

        // Ensure all bookmarks have required fields
        const validBookmarks = parsedBookmarks.filter(
          (bookmark: any) => bookmark.id && (bookmark.address || bookmark.title),
        )

        setBookmarks(validBookmarks)
      }
    } catch (error) {
      console.error("Error loading bookmarks:", error)
      // Clear corrupted data
      localStorage.removeItem("property-bookmarks")
    }
    setIsLoading(false)
  }, [])

  const removeBookmark = (propertyId: string) => {
    const updated = bookmarks.filter((b) => b.id !== propertyId)
    setBookmarks(updated)
    localStorage.setItem("property-bookmarks", JSON.stringify(updated))

    // Dispatch custom event for header counter update
    window.dispatchEvent(new CustomEvent("bookmarkChanged"))

    toast({
      title: "Bookmark Removed",
      description: "Property removed from your bookmarks",
    })
  }

  const exportBookmarks = () => {
    if (bookmarks.length === 0) {
      toast({
        title: "No Bookmarks",
        description: "You don't have any bookmarks to export",
        variant: "destructive",
      })
      return
    }

    const data = bookmarks.map((b) => ({
      Address: b.address || b.title || "Unknown",
      Value: `$${(b.value / 1000000).toFixed(1)}M`,
      Owner: b.ownerName || "Unknown",
      "Owner Wealth": `$${(b.ownerWealth / 1000000).toFixed(1)}M`,
      Confidence: b.confidence || "Unknown",
      "Bookmarked Date": new Date(b.bookmarkedAt).toLocaleDateString(),
    }))

    const csv = [Object.keys(data[0]).join(","), ...data.map((row) => Object.values(row).join(","))].join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `property-bookmarks-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Export Complete",
      description: "Bookmarks exported to CSV file",
    })
  }

  const clearAllBookmarks = () => {
    setBookmarks([])
    localStorage.removeItem("property-bookmarks")

    // Dispatch custom event for header counter update
    window.dispatchEvent(new CustomEvent("bookmarkChanged"))

    toast({
      title: "All Bookmarks Cleared",
      description: "All bookmarked properties have been removed",
    })
  }

  const formatPrice = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`
    }
    return `$${value.toLocaleString()}`
  }

  const formatNetWorth = (netWorth: number) => {
    if (netWorth >= 1000000000) {
      return `$${(netWorth / 1000000000).toFixed(1)}B`
    } else if (netWorth >= 1000000) {
      return `$${(netWorth / 1000000).toFixed(1)}M`
    }
    return `$${netWorth.toLocaleString()}`
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bookmark className="h-5 w-5" />
            Loading Bookmarks...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bookmark className="h-5 w-5" />
            Bookmarked Properties ({bookmarks.length})
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={exportBookmarks} disabled={bookmarks.length === 0}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" disabled={bookmarks.length === 0}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            {bookmarks.length > 0 && (
              <Button variant="outline" size="sm" onClick={clearAllBookmarks} className="text-red-600">
                Clear All
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {bookmarks.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Bookmark className="h-16 w-16 mx-auto mb-4 opacity-30" />
            <h3 className="text-lg font-medium mb-2">No bookmarked properties yet</h3>
            <p className="text-sm mb-4">Click the heart icon on any property to save it here</p>
            <Link href="/search">
              <Button variant="outline">Browse Properties</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookmarks.map((property) => (
              <Card key={property.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-lg text-gray-900">
                            {property.address || property.title || "Unknown Property"}
                          </h4>
                          {property.location && (
                            <div className="flex items-center text-gray-600 mt-1">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span className="text-sm">{property.location}</span>
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-blue-600">{formatPrice(property.value)}</div>
                          <Badge
                            variant="outline"
                            className={
                              property.confidence === "High"
                                ? "border-green-500 text-green-700"
                                : property.confidence === "Medium"
                                  ? "border-yellow-500 text-yellow-700"
                                  : "border-red-500 text-red-700"
                            }
                          >
                            {property.confidence} Confidence
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        {property.propertyType && (
                          <div>
                            <span className="font-medium">Type:</span> {property.propertyType}
                          </div>
                        )}
                        {property.bedrooms && (
                          <div>
                            <span className="font-medium">Beds:</span> {property.bedrooms}
                          </div>
                        )}
                        {property.bathrooms && (
                          <div>
                            <span className="font-medium">Baths:</span> {property.bathrooms}
                          </div>
                        )}
                        {property.sqft && (
                          <div>
                            <span className="font-medium">Sqft:</span> {property.sqft.toLocaleString()}
                          </div>
                        )}
                      </div>

                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg border border-yellow-200 mb-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Owner: {property.ownerName || "Unknown"}
                            </p>
                            <p className="text-xs text-gray-600">
                              Bookmarked: {new Date(property.bookmarkedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center text-orange-600">
                              <DollarSign className="h-4 w-4 mr-1" />
                              <span className="font-semibold text-sm">{formatNetWorth(property.ownerWealth)}</span>
                            </div>
                            <p className="text-xs text-gray-500">Est. Net Worth</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link href={`/properties/${property.id}`} className="flex-1">
                          <Button variant="outline" className="w-full">
                            View Details
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBookmark(property.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
