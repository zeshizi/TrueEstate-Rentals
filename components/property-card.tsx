"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Bed, Bath, Square, DollarSign, User, Calendar } from "lucide-react"
import Link from "next/link"

export interface Property {
  id: string
  address: string
  city: string
  state: string
  zipCode: string
  price: number
  bedrooms?: number
  bathrooms?: number
  squareFeet?: number
  propertyType: string
  yearBuilt?: number
  lotSize?: number
  owner?: {
    name: string
    type: "Individual" | "Corporate" | "Trust" | "LLC"
    estimatedNetWorth?: number
  }
  lastSaleDate?: string
  lastSalePrice?: number
  images?: string[]
  description?: string
  features?: string[]
}

interface PropertyCardProps {
  property: Property
  showOwnerInfo?: boolean
  compact?: boolean
}

export function PropertyCard({ property, showOwnerInfo = true, compact = false }: PropertyCardProps) {
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
    } else if (netWorth >= 1000) {
      return `$${(netWorth / 1000).toFixed(0)}K`
    }
    return `$${netWorth.toLocaleString()}`
  }

  const getOwnerTypeColor = (type: string) => {
    switch (type) {
      case "Corporate":
        return "bg-blue-100 text-blue-800"
      case "Trust":
        return "bg-green-100 text-green-800"
      case "LLC":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className={`hover:shadow-lg transition-shadow duration-200 ${compact ? "h-auto" : "h-full"}`}>
      <CardHeader className={compact ? "pb-2" : "pb-4"}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className={`${compact ? "text-lg" : "text-xl"} font-semibold text-gray-900 mb-1`}>
              {formatPrice(property.price)}
            </CardTitle>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className={compact ? "text-sm" : "text-base"}>
                {property.address}, {property.city}, {property.state} {property.zipCode}
              </span>
            </div>
          </div>
          <Badge variant="outline" className="ml-2">
            {property.propertyType}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className={compact ? "pt-0" : "pt-2"}>
        {/* Property Image */}
        <div className={`bg-gray-200 rounded-lg mb-4 flex items-center justify-center ${compact ? "h-32" : "h-48"}`}>
          {property.images && property.images.length > 0 ? (
            <img
              src={property.images[0] || "/placeholder.svg"}
              alt={property.address}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="text-gray-400 text-center">
              <Square className="h-8 w-8 mx-auto mb-2" />
              <span className="text-sm">No image available</span>
            </div>
          )}
        </div>

        {/* Property Details */}
        <div className={`grid grid-cols-3 gap-4 mb-4 ${compact ? "text-sm" : ""}`}>
          {property.bedrooms && (
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1 text-gray-500" />
              <span>{property.bedrooms} bed</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1 text-gray-500" />
              <span>{property.bathrooms} bath</span>
            </div>
          )}
          {property.squareFeet && (
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1 text-gray-500" />
              <span>{property.squareFeet.toLocaleString()} sqft</span>
            </div>
          )}
        </div>

        {/* Owner Information */}
        {showOwnerInfo && property.owner && (
          <div className="border-t pt-3 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1 text-gray-500" />
                <span className={`font-medium ${compact ? "text-sm" : ""}`}>{property.owner.name}</span>
              </div>
              <Badge className={getOwnerTypeColor(property.owner.type)}>{property.owner.type}</Badge>
            </div>
            {property.owner.estimatedNetWorth && (
              <div className="flex items-center text-green-600">
                <DollarSign className="h-4 w-4 mr-1" />
                <span className={`font-semibold ${compact ? "text-sm" : ""}`}>
                  Est. Net Worth: {formatNetWorth(property.owner.estimatedNetWorth)}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Sale History */}
        {property.lastSaleDate && property.lastSalePrice && (
          <div className="border-t pt-3 mb-4">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-1" />
              <span className={compact ? "text-sm" : ""}>
                Last sold: {formatPrice(property.lastSalePrice)} on {property.lastSaleDate}
              </span>
            </div>
          </div>
        )}

        {/* Property Features */}
        {property.features && property.features.length > 0 && !compact && (
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2">Features</h4>
            <div className="flex flex-wrap gap-1">
              {property.features.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {property.features.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{property.features.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <Link href={`/properties/${property.id}`}>
          <Button className="w-full" variant="outline">
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default PropertyCard
