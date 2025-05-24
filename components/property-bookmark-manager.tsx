"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bookmark, Trash2, Download, Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BookmarkedProperty {
  id: string
  address: string
  value: number
  ownerName: string
  ownerWealth: number
  confidence: "High" | "Medium" | "Low"
  bookmarkedAt: Date
}

export function PropertyBookmarkManager() {
  const [bookmarks, setBookmarks] = useState<BookmarkedProperty[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Load bookmarks from localStorage
    const saved = localStorage.getItem("property-bookmarks")
    if (saved) {
      setBookmarks(JSON.parse(saved))
    }
  }, [])

  const removeBookmark = (propertyId: string) => {
    const updated = bookmarks.filter((b) => b.id !== propertyId)
    setBookmarks(updated)
    localStorage.setItem("property-bookmarks", JSON.stringify(updated))
    toast({
      title: "Bookmark Removed",
      description: "Property removed from your bookmarks",
    })
  }

  const exportBookmarks = () => {
    const data = bookmarks.map((b) => ({
      Address: b.address,
      Value: `$${(b.value / 1000000).toFixed(1)}M`,
      Owner: b.ownerName,
      "Owner Wealth": `$${(b.ownerWealth / 1000000).toFixed(1)}M`,
      Confidence: b.confidence,
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
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {bookmarks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Bookmark className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No bookmarked properties yet</p>
            <p className="text-sm">Click the bookmark icon on any property to save it here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {bookmarks.map((property) => (
              <div key={property.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{property.address}</h4>
                  <div className="flex items-center gap-4 text-xs text-gray-600 mt-1">
                    <span>Value: ${(property.value / 1000000).toFixed(1)}M</span>
                    <span>Owner: {property.ownerName}</span>
                    <Badge variant="outline" className="text-xs">
                      {property.confidence}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeBookmark(property.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
