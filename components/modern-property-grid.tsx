"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Share2, MapPin, Bed, Bath, Square, DollarSign, Eye, Filter } from "lucide-react"
import Link from "next/link"
import type { Property } from "@/components/property-card"

interface ModernPropertyGridProps {
  properties?: Property[]
  loading?: boolean
}

export function ModernPropertyGrid({ properties = [], loading = false }: ModernPropertyGridProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const toggleFavorite = (propertyId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(propertyId)) {
      newFavorites.delete(propertyId)
    } else {
      newFavorites.add(propertyId)
    }
    setFavorites(newFavorites)
  }

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`
    }
    return `$${price.toLocaleString()}`
  }

  const formatNetWorth = (netWorth: number) => {
    if (netWorth >= 1000000000) {
      return `$${(netWorth / 1000000000).toFixed(1)}B`
    } else if (netWorth >= 1000000) {
      return `$${(netWorth / 1000000).toFixed(1)}M`
    }
    return `$${netWorth.toLocaleString()}`
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-t-lg" />
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* View Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Properties for you</h2>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {properties.length} results
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8 px-3"
            >
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-8 px-3"
            >
              List
            </Button>
          </div>
        </div>
      </div>

      {/* Property Grid */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {properties.map((property) => (
          <Card
            key={property.id}
            className={`group hover:shadow-xl transition-all duration-300 border-0 shadow-md ${
              viewMode === "list" ? "flex" : ""
            }`}
          >
            {/* Property Image */}
            <div className={`relative ${viewMode === "list" ? "w-80" : "w-full h-48"} overflow-hidden`}>
              <img
                src={property.images?.[0] || "/placeholder.svg?height=200&width=300&text=Property+Image"}
                alt={property.address}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Overlay Actions */}
              <div className="absolute top-3 right-3 flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/90 hover:bg-white h-8 w-8 p-0"
                  onClick={() => toggleFavorite(property.id)}
                >
                  <Heart
                    className={`h-4 w-4 ${favorites.has(property.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                  />
                </Button>
                <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white h-8 w-8 p-0">
                  <Share2 className="h-4 w-4 text-gray-600" />
                </Button>
              </div>

              {/* Property Type Badge */}
              <div className="absolute top-3 left-3">
                <Badge className="bg-blue-600 text-white">{property.propertyType}</Badge>
              </div>

              {/* Virtual Tour Badge */}
              {property.features?.includes("Virtual Tour") && (
                <div className="absolute bottom-3 left-3">
                  <Badge className="bg-green-600 text-white">
                    <Eye className="h-3 w-3 mr-1" />
                    Virtual Tour
                  </Badge>
                </div>
              )}
            </div>

            {/* Property Details */}
            <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
              <div className="space-y-3">
                {/* Price */}
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">{formatPrice(property.price)}</h3>
                  {property.lastSalePrice && (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      +{Math.round(((property.price - property.lastSalePrice) / property.lastSalePrice) * 100)}%
                    </Badge>
                  )}
                </div>

                {/* Address */}
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="text-sm">
                    {property.address}, {property.city}, {property.state}
                  </span>
                </div>

                {/* Property Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  {property.bedrooms && (
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      <span>{property.bedrooms} bed</span>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      <span>{property.bathrooms} bath</span>
                    </div>
                  )}
                  {property.squareFeet && (
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-1" />
                      <span>{property.squareFeet.toLocaleString()} sqft</span>
                    </div>
                  )}
                </div>

                {/* Owner Wealth Info */}
                {property.owner?.estimatedNetWorth && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg border border-yellow-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{property.owner.name}</p>
                        <p className="text-xs text-gray-600">{property.owner.type}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-orange-600">
                          <DollarSign className="h-4 w-4 mr-1" />
                          <span className="font-semibold text-sm">
                            {formatNetWorth(property.owner.estimatedNetWorth)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">Est. Net Worth</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <Link href={`/properties/${property.id}`}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">View Details</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      {properties.length > 0 && (
        <div className="text-center pt-8">
          <Button variant="outline" size="lg" className="px-8">
            Load More Properties
          </Button>
        </div>
      )}
    </div>
  )
}
