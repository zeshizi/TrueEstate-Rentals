"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, DollarSign, Building, User, Star, Shield, TrendingUp, X } from "lucide-react"

interface Filters {
  minValue: number
  maxValue: number
  propertyType: string
  ownerType: string
  wealthRange: string
  verificationStatus: string
  trustScore: number
  location: string
}

interface PropertyFiltersProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

export const PropertyFilters: React.FC<PropertyFiltersProps> = ({ filters, onFiltersChange }) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
    return `$${value}`
  }

  const handlePriceChange = (values: number[]) => {
    onFiltersChange({
      ...filters,
      minValue: values[0],
      maxValue: values[1],
    })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      minValue: 0,
      maxValue: 10000000,
      propertyType: "all",
      ownerType: "all",
      wealthRange: "all",
      verificationStatus: "all",
      trustScore: 0,
      location: "",
    })
    setActiveFilters([])
  }

  const removeFilter = (filterKey: string) => {
    const newFilters = { ...filters }
    switch (filterKey) {
      case "propertyType":
        newFilters.propertyType = "all"
        break
      case "ownerType":
        newFilters.ownerType = "all"
        break
      case "wealthRange":
        newFilters.wealthRange = "all"
        break
      case "verificationStatus":
        newFilters.verificationStatus = "all"
        break
      case "trustScore":
        newFilters.trustScore = 0
        break
      case "location":
        newFilters.location = ""
        break
    }
    onFiltersChange(newFilters)
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (filters.propertyType !== "all") count++
    if (filters.ownerType !== "all") count++
    if (filters.wealthRange !== "all") count++
    if (filters.verificationStatus !== "all") count++
    if (filters.trustScore > 0) count++
    if (filters.location) count++
    if (filters.minValue > 0 || filters.maxValue < 10000000) count++
    return count
  }

  return (
    <div className="space-y-6">
      {/* Header with Clear All */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-gray-900">Filters</h2>
          {getActiveFilterCount() > 0 && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              {getActiveFilterCount()} active
            </Badge>
          )}
        </div>
        {getActiveFilterCount() > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-gray-500 hover:text-gray-700">
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {getActiveFilterCount() > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.propertyType !== "all" && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Building className="h-3 w-3" />
              {filters.propertyType}
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("propertyType")} />
            </Badge>
          )}
          {filters.ownerType !== "all" && (
            <Badge variant="outline" className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {filters.ownerType}
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("ownerType")} />
            </Badge>
          )}
          {filters.verificationStatus !== "all" && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              {filters.verificationStatus}
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("verificationStatus")} />
            </Badge>
          )}
          {filters.location && (
            <Badge variant="outline" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {filters.location}
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("location")} />
            </Badge>
          )}
        </div>
      )}

      {/* Location Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <input
            type="text"
            placeholder="Enter city, state, or ZIP code"
            value={filters.location}
            onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </CardContent>
      </Card>

      {/* Property Value Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            Property Value Range
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={[filters.minValue, filters.maxValue]}
            onValueChange={handlePriceChange}
            max={10000000}
            min={0}
            step={100000}
            className="w-full"
          />
          <div className="flex justify-between text-sm font-medium text-gray-700">
            <span className="px-2 py-1 bg-gray-100 rounded">{formatCurrency(filters.minValue)}</span>
            <span className="px-2 py-1 bg-gray-100 rounded">{formatCurrency(filters.maxValue)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Property Type */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Building className="h-4 w-4 text-purple-600" />
            Property Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={filters.propertyType}
            onValueChange={(value) => onFiltersChange({ ...filters, propertyType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Property Types</SelectItem>
              <SelectItem value="single-family">Single Family Home</SelectItem>
              <SelectItem value="condo">Condominium</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
              <SelectItem value="multi-family">Multi-Family</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="luxury">Luxury Estate</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Owner Type */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <User className="h-4 w-4 text-orange-600" />
            Owner Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={filters.ownerType}
            onValueChange={(value) => onFiltersChange({ ...filters, ownerType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select owner type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Owner Types</SelectItem>
              <SelectItem value="individual">Individual Owner</SelectItem>
              <SelectItem value="llc">LLC/Corporation</SelectItem>
              <SelectItem value="trust">Trust/Estate</SelectItem>
              <SelectItem value="investment">Investment Company</SelectItem>
              <SelectItem value="reit">REIT</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Verification Status */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-600" />
            Verification Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={filters.verificationStatus}
            onValueChange={(value) => onFiltersChange({ ...filters, verificationStatus: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select verification level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
              <SelectItem value="verified">✅ Verified Ownership</SelectItem>
              <SelectItem value="partial">⚠️ Partially Verified</SelectItem>
              <SelectItem value="unverified">❌ Unverified</SelectItem>
              <SelectItem value="flagged">🚩 Flagged/Suspicious</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Owner Wealth Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-indigo-600" />
            Owner Wealth Range
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={filters.wealthRange}
            onValueChange={(value) => onFiltersChange({ ...filters, wealthRange: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select wealth range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Wealth Levels</SelectItem>
              <SelectItem value="ultra-high">💎 Ultra High ($100M+)</SelectItem>
              <SelectItem value="very-high">💰 Very High ($50M-$100M)</SelectItem>
              <SelectItem value="high">🏆 High ($10M-$50M)</SelectItem>
              <SelectItem value="upper">📈 Upper ($5M-$10M)</SelectItem>
              <SelectItem value="medium">💼 Medium ($1M-$5M)</SelectItem>
              <SelectItem value="emerging">🌱 Emerging ($500K-$1M)</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Trust Score */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-600" />
            Minimum Trust Score
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={[filters.trustScore]}
            onValueChange={(values) => onFiltersChange({ ...filters, trustScore: values[0] })}
            max={5}
            min={0}
            step={0.5}
            className="w-full"
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Any Rating</span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">{filters.trustScore.toFixed(1)}</span>
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600">& above</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
