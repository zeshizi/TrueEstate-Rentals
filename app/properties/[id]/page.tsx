"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, User, Heart, Share2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface PropertyDetails {
  id: string
  title: string
  subtitle: string
  address: string
  city: string
  state: string
  zipCode: string
  value: number
  ownerName: string
  ownerWealth: number
  propertyType: string
  coordinates: { lat: number; lng: number }
  bedrooms: number
  bathrooms: number
  sqft: number
  images: string[]
  features: string[]
}

export default function PropertyDetailPage() {
  const params = useParams()
  const { toast } = useToast()
  const [property, setProperty] = useState<PropertyDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        // First try to get from search results
        const response = await fetch(`/api/search?q=`)
        const data = await response.json()

        const foundProperty = data.results?.find((p: any) => p.id === params.id)

        if (foundProperty) {
          setProperty(foundProperty)
        } else {
          // If not found, create a mock property for demo
          setProperty({
            id: params.id as string,
            title: "Property Details",
            subtitle: "Luxury Property",
            address: "Property Address",
            city: "City",
            state: "State",
            zipCode: "00000",
            value: 5000000,
            ownerName: "Property Owner",
            ownerWealth: 50000000,
            propertyType: "luxury",
            coordinates: { lat: 40.7128, lng: -74.006 },
            bedrooms: 4,
            bathrooms: 3,
            sqft: 3000,
            images: ["/placeholder.svg?height=400&width=600&text=Property+Image"],
            features: ["Pool", "Garden", "Garage"],
          })
        }

        // Check if bookmarked
        const bookmarks = JSON.parse(localStorage.getItem("property-bookmarks") || "[]")
        setIsBookmarked(bookmarks.some((b: any) => b.id === params.id))
      } catch (error) {
        console.error("Error fetching property:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProperty()
    }
  }, [params.id])

  const handleBookmark = () => {
    if (!property) return

    const bookmarks = JSON.parse(localStorage.getItem("property-bookmarks") || "[]")

    if (isBookmarked) {
      // Remove bookmark
      const updated = bookmarks.filter((b: any) => b.id !== property.id)
      localStorage.setItem("property-bookmarks", JSON.stringify(updated))
      setIsBookmarked(false)

      // Dispatch custom event for header counter update
      window.dispatchEvent(new CustomEvent("bookmarkChanged"))

      toast({
        title: "Bookmark Removed",
        description: `${property.title} removed from bookmarks`,
      })
    } else {
      // Add bookmark
      const bookmark = {
        id: property.id,
        address: property.title,
        value: property.value,
        ownerName: property.ownerName,
        ownerWealth: property.ownerWealth,
        confidence: "High",
        bookmarkedAt: new Date(),
        title: property.title,
        location: property.subtitle,
        propertyType: property.propertyType,
      }

      bookmarks.push(bookmark)
      localStorage.setItem("property-bookmarks", JSON.stringify(bookmarks))
      setIsBookmarked(true)

      // Dispatch custom event for header counter update
      window.dispatchEvent(new CustomEvent("bookmarkChanged"))

      toast({
        title: "Bookmarked",
        description: `${property.title} added to bookmarks`,
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
            <p className="text-gray-600 mb-6">The property you're looking for doesn't exist.</p>
            <Link href="/search">
              <Button>Back to Search</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/search">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
        </Link>

        {/* Property Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-5 w-5 mr-2" />
                <span>
                  {property.address}, {property.city}, {property.state} {property.zipCode}
                </span>
              </div>
              <div className="text-2xl font-bold text-blue-600">${(property.value / 1000000).toFixed(1)}M</div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleBookmark}
                className={isBookmarked ? "text-red-600 border-red-600 bg-red-50" : ""}
              >
                <Heart className={`h-4 w-4 mr-2 ${isBookmarked ? "fill-current" : ""}`} />
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Property Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Image */}
            <Card>
              <CardContent className="p-0">
                <img
                  src={property.images[0] || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
              </CardContent>
            </Card>

            {/* Property Info */}
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{property.sqft.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Sq Ft</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{property.propertyType}</div>
                    <div className="text-sm text-gray-600">Type</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {property.features.map((feature, index) => (
                      <Badge key={index} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Owner Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Owner Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600">Owner</div>
                    <div className="font-semibold">{property.ownerName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Estimated Net Worth</div>
                    <div className="text-lg font-bold text-green-600">
                      ${(property.ownerWealth / 1000000).toFixed(1)}M
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">High Confidence</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Investment Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Property Value</span>
                    <span className="font-semibold">${(property.value / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Price per Sq Ft</span>
                    <span className="font-semibold">${Math.round(property.value / property.sqft)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Market Trend</span>
                    <Badge className="bg-green-100 text-green-800">Appreciating</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
