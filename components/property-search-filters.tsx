"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, DollarSign, Home, Bed, Bath, Filter, X } from "lucide-react"

interface PropertyFilters {
  location: string
  propertyType: string
  priceRange: [number, number]
  bedrooms: number
  bathrooms: number
  listingType: string
}

interface PropertySearchFiltersProps {
  onFiltersChange: (filters: PropertyFilters) => void
  onSearch: () => void
  loading?: boolean
}

export function PropertySearchFilters({ onFiltersChange, onSearch, loading = false }: PropertySearchFiltersProps) {
  const [filters, setFilters] = useState<PropertyFilters>({
    location: "",
    propertyType: "all",
    priceRange: [0, 15000000],
    bedrooms: 0,
    bathrooms: 0,
    listingType: "all",
  })

  const [isExpanded, setIsExpanded] = useState(false)

  const propertyTypes = ["Single Family", "Condo", "Townhouse", "Multi-Family", "Luxury Estate", "Studio", "Apartment"]

  const updateFilter = (key: keyof PropertyFilters, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    const defaultFilters: PropertyFilters = {
      location: "",
      propertyType: "all",
      priceRange: [0, 15000000],
      bedrooms: 0,
      bathrooms: 0,
      listingType: "all",
    }
    setFilters(defaultFilters)
    onFiltersChange(defaultFilters)
  }

  const formatPrice = (price: number) => {
    if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`
    if (price >= 1000) return `$${Math.round(price / 1000)}K`
    return `$${price.toLocaleString()}`
  }

  const handlePriceRangeChange = (newRange: [number, number]) => {
    updateFilter("priceRange", newRange)
  }

  const activeFiltersCount = [
    filters.location,
    filters.propertyType !== "all" ? filters.propertyType : null,
    filters.bedrooms > 0 ? filters.bedrooms : null,
    filters.bathrooms > 0 ? filters.bathrooms : null,
    filters.listingType !== "all" ? filters.listingType : null,
  ].filter(Boolean).length

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Property Search Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount} active
              </Badge>
            )}
          </CardTitle>
          <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "Collapse" : "Expand"}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Basic Filters - Always Visible */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </Label>
            <Input
              id="location"
              placeholder="City, State, or ZIP"
              value={filters.location}
              onChange={(e) => updateFilter("location", e.target.value)}
            />
          </div>

          <div>
            <Label className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Listing Type
            </Label>
            <Select value={filters.listingType} onValueChange={(value) => updateFilter("listingType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="buy">For Sale</SelectItem>
                <SelectItem value="rent">For Rent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Property Type
            </Label>
            <Select value={filters.propertyType} onValueChange={(value) => updateFilter("propertyType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {propertyTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Price Range - Always Visible */}
        <div>
          <Label className="flex items-center gap-2 mb-3">
            <DollarSign className="h-4 w-4" />
            Price Range
          </Label>
          <div className="px-3">
            <div className="relative mb-4">
              <input
                type="range"
                min="0"
                max="15000000"
                step="100000"
                value={filters.priceRange[0]}
                onChange={(e) => {
                  const newMin = Number(e.target.value)
                  const newMax = Math.max(newMin, filters.priceRange[1])
                  handlePriceRangeChange([newMin, newMax])
                }}
                className="absolute w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider"
                style={{ background: "transparent" }}
              />
              <input
                type="range"
                min="0"
                max="15000000"
                step="100000"
                value={filters.priceRange[1]}
                onChange={(e) => {
                  const newMax = Number(e.target.value)
                  const newMin = Math.min(filters.priceRange[0], newMax)
                  handlePriceRangeChange([newMin, newMax])
                }}
                className="absolute w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider"
                style={{ background: "transparent" }}
              />
              <div className="relative h-3 bg-gray-200 rounded-lg">
                <div
                  className="absolute h-3 bg-blue-600 rounded-lg"
                  style={{
                    left: `${(filters.priceRange[0] / 15000000) * 100}%`,
                    width: `${((filters.priceRange[1] - filters.priceRange[0]) / 15000000) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span className="font-semibold text-blue-600">{formatPrice(filters.priceRange[0])}</span>
              <span className="font-semibold text-blue-600">{formatPrice(filters.priceRange[1])}</span>
            </div>
          </div>
        </div>

        {/* Advanced Filters - Expandable */}
        {isExpanded && (
          <div className="space-y-4 border-t pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="flex items-center gap-2">
                  <Bed className="h-4 w-4" />
                  Bedrooms
                </Label>
                <Select
                  value={filters.bedrooms.toString()}
                  onValueChange={(value) => updateFilter("bedrooms", Number.parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  <Bath className="h-4 w-4" />
                  Bathrooms
                </Label>
                <Select
                  value={filters.bathrooms.toString()}
                  onValueChange={(value) => updateFilter("bathrooms", Number.parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div>
            <Label className="text-sm font-medium mb-2 block">Active Filters:</Label>
            <div className="flex flex-wrap gap-2">
              {filters.location && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => updateFilter("location", "")}>
                  Location: {filters.location} <X className="h-3 w-3 ml-1" />
                </Badge>
              )}
              {filters.propertyType !== "all" && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => updateFilter("propertyType", "all")}
                >
                  Type: {filters.propertyType} <X className="h-3 w-3 ml-1" />
                </Badge>
              )}
              {filters.listingType !== "all" && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => updateFilter("listingType", "all")}
                >
                  Listing: {filters.listingType} <X className="h-3 w-3 ml-1" />
                </Badge>
              )}
              {filters.bedrooms > 0 && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => updateFilter("bedrooms", 0)}>
                  {filters.bedrooms}+ Bedrooms <X className="h-3 w-3 ml-1" />
                </Badge>
              )}
              {filters.bathrooms > 0 && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => updateFilter("bathrooms", 0)}>
                  {filters.bathrooms}+ Bathrooms <X className="h-3 w-3 ml-1" />
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Button onClick={onSearch} className="flex-1 bg-blue-600 hover:bg-blue-700" disabled={loading}>
            {loading ? "Searching..." : "Search Properties"}
          </Button>
          <Button variant="outline" onClick={clearFilters}>
            Clear All
          </Button>
        </div>
      </CardContent>

      {/* CSS for range sliders */}
      <style jsx>{`
        .range-slider::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          z-index: 10;
        }
        
        .range-slider::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </Card>
  )
}
