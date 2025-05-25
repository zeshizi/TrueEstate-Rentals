"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Share2, Eye, MapPin, Bed, Bath, Square, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface Property {
  id: string
  title: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  sqft: number
  image: string
  ownerWealth: string
  propertyType: string
  isNew?: boolean
  isFeatured?: boolean
}

export function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Load favorites from localStorage
    const bookmarks = JSON.parse(localStorage.getItem("property-bookmarks") || "[]")
    const bookmarkedIds = new Set(bookmarks.map((b: any) => b.id))
    setFavorites(bookmarkedIds)

    // Mock data for featured properties
    const mockProperties: Property[] = [
      {
        id: "1",
        title: "Luxury Penthouse in Manhattan",
        price: 8500000,
        location: "Upper East Side, Manhattan, NY",
        bedrooms: 4,
        bathrooms: 3,
        sqft: 3200,
        image: "/placeholder.svg?height=300&width=400&text=Luxury+Manhattan+Penthouse",
        ownerWealth: "$50M+",
        propertyType: "Penthouse",
        isNew: true,
        isFeatured: true,
      },
      {
        id: "2",
        title: "Beverly Hills Estate",
        price: 12000000,
        location: "Beverly Hills, CA",
        bedrooms: 6,
        bathrooms: 8,
        sqft: 8500,
        image: "/placeholder.svg?height=300&width=400&text=Beverly+Hills+Estate",
        ownerWealth: "$100M+",
        propertyType: "Estate",
        isFeatured: true,
      },
      {
        id: "3",
        title: "Malibu Oceanfront Villa",
        price: 15000000,
        location: "Malibu, CA",
        bedrooms: 5,
        bathrooms: 6,
        sqft: 6800,
        image: "/placeholder.svg?height=300&width=400&text=Malibu+Oceanfront+Villa",
        ownerWealth: "$75M+",
        propertyType: "Villa",
        isNew: true,
      },
      {
        id: "4",
        title: "Miami Beach Condo",
        price: 3200000,
        location: "South Beach, Miami, FL",
        bedrooms: 3,
        bathrooms: 3,
        sqft: 2400,
        image: "/placeholder.svg?height=300&width=400&text=Miami+Beach+Condo",
        ownerWealth: "$25M+",
        propertyType: "Condo",
      },
    ]

    setTimeout(() => {
      setProperties(mockProperties)
      setIsLoading(false)
    }, 1000)
  }, [])

  const toggleFavorite = (property: Property) => {
    const bookmarks = JSON.parse(localStorage.getItem("property-bookmarks") || "[]")
    const isCurrentlyFavorited = favorites.has(property.id)

    if (isCurrentlyFavorited) {
      // Remove from favorites
      const updated = bookmarks.filter((b: any) => b.id !== property.id)
      localStorage.setItem("property-bookmarks", JSON.stringify(updated))
      setFavorites((prev) => {
        const newFavorites = new Set(prev)
        newFavorites.delete(property.id)
        return newFavorites
      })
      toast({
        title: "Bookmark Removed",
        description: "Property removed from your bookmarks",
      })
    } else {
      // Add to favorites
      const bookmark = {
        id: property.id,
        address: property.title,
        value: property.price,
        ownerName: "Property Owner",
        ownerWealth: Number.parseInt(property.ownerWealth.replace(/[^0-9]/g, "")) * 1000000,
        confidence: "High" as const,
        bookmarkedAt: new Date(),
      }
      bookmarks.push(bookmark)
      localStorage.setItem("property-bookmarks", JSON.stringify(bookmarks))
      setFavorites((prev) => new Set(prev).add(property.id))
      toast({
        title: "Property Bookmarked",
        description: "Property added to your bookmarks",
      })
    }
  }

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`
    }
    return `$${price.toLocaleString()}`
  }

  if (isLoading) {
    return (
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Properties</h2>
            <p className="text-lg text-gray-600">Discover luxury homes with verified owner wealth data</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Properties</h2>
          <p className="text-lg text-gray-600">Discover luxury homes with verified owner wealth data</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="group hover:shadow-xl transition-all duration-300 bg-white border-0">
              <div className="relative">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {property.isNew && <Badge className="bg-green-500 text-white">NEW</Badge>}
                  {property.isFeatured && <Badge className="bg-blue-500 text-white">FEATURED</Badge>}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                    onClick={() => toggleFavorite(property)}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        favorites.has(property.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                      }`}
                    />
                  </Button>
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-white">
                    <Share2 className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>

                {/* Owner Wealth Badge */}
                <div className="absolute bottom-3 left-3">
                  <Badge className="bg-purple-500 text-white flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Owner: {property.ownerWealth}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="mb-2">
                  <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{property.title}</h3>
                  <p className="text-2xl font-bold text-blue-600 mb-1">{formatPrice(property.price)}</p>
                </div>

                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm line-clamp-1">{property.location}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    <span>{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    <span>{property.bathrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="h-4 w-4" />
                    <span>{property.sqft.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link href={`/properties/${property.id}`} className="flex-1">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/properties">
            <Button size="lg" variant="outline" className="px-8 py-3">
              View All Properties
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FeaturedProperties
