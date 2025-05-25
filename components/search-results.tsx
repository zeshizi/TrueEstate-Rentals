"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Building, User, DollarSign, Star, Heart, MessageSquare, Bookmark } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface SearchResultsProps {
  results: any[]
  loading: boolean
  query: string
}

export function SearchResults({ results, loading, query }: SearchResultsProps) {
  const [bookmarkedItems, setBookmarkedItems] = useState<string[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Load bookmarked items from localStorage
    const bookmarks = JSON.parse(localStorage.getItem("property-bookmarks") || "[]")
    setBookmarkedItems(bookmarks.map((b: any) => b.id))
  }, [])

  const handleBookmark = (result: any, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    const bookmarks = JSON.parse(localStorage.getItem("property-bookmarks") || "[]")
    const isBookmarked = bookmarkedItems.includes(result.id)

    if (isBookmarked) {
      // Remove bookmark
      const updated = bookmarks.filter((b: any) => b.id !== result.id)
      localStorage.setItem("property-bookmarks", JSON.stringify(updated))
      setBookmarkedItems((prev) => prev.filter((id) => id !== result.id))

      // Dispatch custom event for header counter update
      window.dispatchEvent(new CustomEvent("bookmarkChanged"))

      toast({
        title: "Bookmark Removed",
        description: `${result.title} removed from bookmarks`,
      })
    } else {
      // Add bookmark
      const bookmark = {
        id: result.id,
        address: result.title || result.subtitle,
        value: result.value || result.totalValue || 0,
        ownerName: result.ownerName || "Unknown Owner",
        ownerWealth: result.ownerWealth || result.totalValue || 0,
        confidence: result.confidence || "Medium",
        bookmarkedAt: new Date(),
        title: result.title,
        location: result.subtitle,
        propertyType: result.type,
      }

      bookmarks.push(bookmark)
      localStorage.setItem("property-bookmarks", JSON.stringify(bookmarks))
      setBookmarkedItems((prev) => [...prev, result.id])

      // Dispatch custom event for header counter update
      window.dispatchEvent(new CustomEvent("bookmarkChanged"))

      toast({
        title: "Bookmarked",
        description: `${result.title} added to bookmarks`,
      })
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!results.length && query) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">No results found for "{query}"</div>
        <div className="text-gray-400 mt-2">Try adjusting your search terms or filters</div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header with results count and view bookmarks button */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-gray-600">{results.length} results found</div>
        <Link href="/bookmarks">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Bookmark className="h-4 w-4" />
            View Bookmarks
          </Button>
        </Link>
      </div>

      {results.map((result, index) => (
        <Card key={`${result.id}-${index}`} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {result.type === "property" && <Building className="h-5 w-5 text-blue-600" />}
                  {result.type === "owner" && <User className="h-5 w-5 text-green-600" />}
                  {result.type === "address" && <MapPin className="h-5 w-5 text-purple-600" />}

                  <Badge variant="outline" className="text-xs">
                    {result.type}
                  </Badge>

                  {/* Rating Display */}
                  {result.rating && (
                    <div className="flex items-center gap-1">
                      {renderStars(result.rating)}
                      <span className="text-sm text-gray-600">({result.reviewCount || 0})</span>
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-1">{result.title}</h3>

                <p className="text-gray-600 mb-3">{result.subtitle}</p>

                {/* Property Details */}
                {result.type === "property" && (
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span>Value: ${(result.value / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>Owner Wealth: ${(result.ownerWealth / 1000000).toFixed(1)}M</span>
                    </div>
                    {result.confidence && (
                      <Badge
                        className={
                          result.confidence === "High"
                            ? "bg-green-100 text-green-800"
                            : result.confidence === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {result.confidence} Confidence
                      </Badge>
                    )}
                  </div>
                )}

                {/* Owner Details */}
                {result.type === "owner" && (
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-1" />
                      <span>{result.properties} properties</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span>Total Value: ${(result.totalValue / 1000000).toFixed(1)}M</span>
                    </div>
                    {result.ownerType && <Badge variant="outline">{result.ownerType}</Badge>}
                  </div>
                )}

                {/* Address Details */}
                {result.type === "address" && (
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-1" />
                      <span>{result.propertyCount.toLocaleString()} properties</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span>Avg: ${(result.averageValue / 1000000).toFixed(1)}M</span>
                    </div>
                  </div>
                )}

                {/* Reviews Summary */}
                {result.reviewSummary && (
                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium">Recent Review</span>
                    </div>
                    <p className="text-sm text-gray-700 italic">"{result.reviewSummary}"</p>
                    <p className="text-xs text-gray-500 mt-1">- {result.reviewAuthor}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-2 mt-4">
                  <Link href={`/properties/${result.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => handleBookmark(result, e)}
                    className={`transition-colors ${
                      bookmarkedItems.includes(result.id)
                        ? "text-red-600 border-red-600 bg-red-50 hover:bg-red-100"
                        : "hover:text-red-600 hover:border-red-600"
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${bookmarkedItems.includes(result.id) ? "fill-current" : ""}`} />
                  </Button>
                  {result.type === "property" && (
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Reviews ({result.reviewCount || 0})
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
