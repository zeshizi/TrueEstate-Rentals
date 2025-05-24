"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { X, Filter, MapPin, DollarSign, Home, User, TrendingUp } from "lucide-react"

interface AdvancedFilters {
  location: string
  propertyType: string[]
  priceRange: [number, number]
  bedrooms: number
  bathrooms: number
  sqftRange: [number, number]
  yearBuilt: [number, number]
  ownerType: string[]
  wealthRange: string
  features: string[]
  listingStatus: string
  daysOnMarket: number
  priceReduction: boolean
  virtualTour: boolean
  openHouse: boolean
}

interface AdvancedSearchFiltersProps {
  onFiltersChange: (filters: AdvancedFilters) => void
  onSearch: () => void
}

export function AdvancedSearchFilters({ onFiltersChange, onSearch }: AdvancedSearchFiltersProps) {
  const [filters, setFilters] = useState<AdvancedFilters>({
    location: "",
    propertyType: [],
    priceRange: [0, 50000000],
    bedrooms: 0,
    bathrooms: 0,
    sqftRange: [0, 20000],
    yearBuilt: [1900, 2024],
    ownerType: [],
    wealthRange: "all",
    features: [],
    listingStatus: "all",
    daysOnMarket: 365,
    priceReduction: false,
    virtualTour: false,
    openHouse: false,
  })

  const [isExpanded, setIsExpanded] = useState(false)

  const propertyTypes = [
    "Single Family",
    "Condo",
    "Townhouse",
    "Multi-Family",
    "Mansion",
    "Penthouse",
    "Estate",
    "Commercial",
  ]

  const ownerTypes = ["Individual", "Corporation", "Trust", "LLC", "Partnership", "Government", "Non-Profit"]

  const features = [
    "Pool",
    "Garage",
    "Fireplace",
    "Balcony",
    "Garden",
    "Gym",
    "Wine Cellar",
    "Home Theater",
    "Guest House",
    "Tennis Court",
    "Ocean View",
    "Mountain View",
    "City View",
    "Waterfront",
    "Gated Community",
    "Concierge",
    "Doorman",
    "Elevator",
    "Central AC",
    "Hardwood Floors",
  ]

  const updateFilter = (key: keyof AdvancedFilters, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const toggleArrayFilter = (key: keyof AdvancedFilters, value: string) => {
    const currentArray = filters[key] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    updateFilter(key, newArray)
  }

  const clearFilters = () => {
    const defaultFilters: AdvancedFilters = {
      location: "",
      propertyType: [],
      priceRange: [0, 50000000],
      bedrooms: 0,
      bathrooms: 0,
      sqftRange: [0, 20000],
      yearBuilt: [1900, 2024],
      ownerType: [],
      wealthRange: "all",
      features: [],
      listingStatus: "all",
      daysOnMarket: 365,
      priceReduction: false,
      virtualTour: false,
      openHouse: false,
    }
    setFilters(defaultFilters)
    onFiltersChange(defaultFilters)
  }

  const formatPrice = (price: number) => {
    if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`
    if (price >= 1000) return `$${(price / 1000).toFixed(0)}K`
    return `$${price.toLocaleString()}`
  }

  const handlePriceRangeChange = (newRange: [number, number]) => {
    console.log("💰 Advanced filter price range changed:", {
      from: formatPrice(newRange[0]),
      to: formatPrice(newRange[1]),
      rawValues: newRange,
    })
    updateFilter("priceRange", newRange)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Advanced Search Filters
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
              <DollarSign className="h-4 w-4" />
              Price Range
            </Label>
            <div className="px-3 py-2">
              {/* Custom Dual Range Slider */}
              <div className="relative mb-4">
                <input
                  type="range"
                  min="0"
                  max="50000000"
                  step="100000"
                  value={filters.priceRange[0]}
                  onChange={(e) => {
                    const newMin = Number(e.target.value)
                    const newMax = Math.max(newMin, filters.priceRange[1])
                    handlePriceRangeChange([newMin, newMax])
                  }}
                  className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider"
                />
                <input
                  type="range"
                  min="0"
                  max="50000000"
                  step="100000"
                  value={filters.priceRange[1]}
                  onChange={(e) => {
                    const newMax = Number(e.target.value)
                    const newMin = Math.min(filters.priceRange[0], newMax)
                    handlePriceRangeChange([newMin, newMax])
                  }}
                  className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider"
                />
                <div className="relative h-2 bg-gray-200 rounded-lg">
                  <div
                    className="absolute h-2 bg-blue-600 rounded-lg"
                    style={{
                      left: `${(filters.priceRange[0] / 50000000) * 100}%`,
                      width: `${((filters.priceRange[1] - filters.priceRange[0]) / 50000000) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{formatPrice(filters.priceRange[0])}</span>
                <span>{formatPrice(filters.priceRange[1])}</span>
              </div>
            </div>
          </div>

          <div>
            <Label className="flex items-center gap-2">
              <Home className="h-4 w-4" />
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
        </div>

        {/* Advanced Filters - Expandable */}
        {isExpanded && (
          <div className="space-y-6 border-t pt-6">
            {/* Property Types */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Property Types</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {propertyTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`property-${type}`}
                      checked={filters.propertyType.includes(type)}
                      onCheckedChange={() => toggleArrayFilter("propertyType", type)}
                    />
                    <Label htmlFor={`property-${type}`} className="text-sm">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Square Footage */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Square Footage</Label>
              <div className="px-3">
                <div className="relative mb-4">
                  <input
                    type="range"
                    min="0"
                    max="20000"
                    step="100"
                    value={filters.sqftRange[0]}
                    onChange={(e) => {
                      const newMin = Number(e.target.value)
                      const newMax = Math.max(newMin, filters.sqftRange[1])
                      updateFilter("sqftRange", [newMin, newMax])
                    }}
                    className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider"
                  />
                  <input
                    type="range"
                    min="0"
                    max="20000"
                    step="100"
                    value={filters.sqftRange[1]}
                    onChange={(e) => {
                      const newMax = Number(e.target.value)
                      const newMin = Math.min(filters.sqftRange[0], newMax)
                      updateFilter("sqftRange", [newMin, newMax])
                    }}
                    className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider"
                  />
                  <div className="relative h-2 bg-gray-200 rounded-lg">
                    <div
                      className="absolute h-2 bg-blue-600 rounded-lg"
                      style={{
                        left: `${(filters.sqftRange[0] / 20000) * 100}%`,
                        width: `${((filters.sqftRange[1] - filters.sqftRange[0]) / 20000) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{filters.sqftRange[0].toLocaleString()} sqft</span>
                  <span>{filters.sqftRange[1].toLocaleString()} sqft</span>
                </div>
              </div>
            </div>

            {/* Owner Information */}
            <div>
              <Label className="text-base font-semibold mb-3 block flex items-center gap-2">
                <User className="h-4 w-4" />
                Owner Information
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Owner Type</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {ownerTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`owner-${type}`}
                          checked={filters.ownerType.includes(type)}
                          onCheckedChange={() => toggleArrayFilter("ownerType", type)}
                        />
                        <Label htmlFor={`owner-${type}`} className="text-sm">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Wealth Range</Label>
                  <Select value={filters.wealthRange} onValueChange={(value) => updateFilter("wealthRange", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ranges</SelectItem>
                      <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                      <SelectItem value="5m-10m">$5M - $10M</SelectItem>
                      <SelectItem value="10m-25m">$10M - $25M</SelectItem>
                      <SelectItem value="25m-50m">$25M - $50M</SelectItem>
                      <SelectItem value="50m+">$50M+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Property Features</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={`feature-${feature}`}
                      checked={filters.features.includes(feature)}
                      onCheckedChange={() => toggleArrayFilter("features", feature)}
                    />
                    <Label htmlFor={`feature-${feature}`} className="text-sm">
                      {feature}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Conditions */}
            <div>
              <Label className="text-base font-semibold mb-3 block flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Market Conditions
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Listing Status</Label>
                  <Select value={filters.listingStatus} onValueChange={(value) => updateFilter("listingStatus", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Listings</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="sold">Recently Sold</SelectItem>
                      <SelectItem value="off-market">Off Market</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">Days on Market</Label>
                  <Select
                    value={filters.daysOnMarket.toString()}
                    onValueChange={(value) => updateFilter("daysOnMarket", Number.parseInt(value))}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="365">Any</SelectItem>
                      <SelectItem value="7">1 Week</SelectItem>
                      <SelectItem value="30">1 Month</SelectItem>
                      <SelectItem value="90">3 Months</SelectItem>
                      <SelectItem value="180">6 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="price-reduction"
                      checked={filters.priceReduction}
                      onCheckedChange={(checked) => updateFilter("priceReduction", checked)}
                    />
                    <Label htmlFor="price-reduction" className="text-sm">
                      Price Reduction
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="virtual-tour"
                      checked={filters.virtualTour}
                      onCheckedChange={(checked) => updateFilter("virtualTour", checked)}
                    />
                    <Label htmlFor="virtual-tour" className="text-sm">
                      Virtual Tour
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="open-house"
                      checked={filters.openHouse}
                      onCheckedChange={(checked) => updateFilter("openHouse", checked)}
                    />
                    <Label htmlFor="open-house" className="text-sm">
                      Open House
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters */}
        {(filters.propertyType.length > 0 || filters.features.length > 0 || filters.ownerType.length > 0) && (
          <div>
            <Label className="text-sm font-medium mb-2 block">Active Filters:</Label>
            <div className="flex flex-wrap gap-2">
              {filters.propertyType.map((type) => (
                <Badge
                  key={type}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => toggleArrayFilter("propertyType", type)}
                >
                  {type} <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
              {filters.features.map((feature) => (
                <Badge
                  key={feature}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => toggleArrayFilter("features", feature)}
                >
                  {feature} <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
              {filters.ownerType.map((type) => (
                <Badge
                  key={type}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => toggleArrayFilter("ownerType", type)}
                >
                  {type} <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Button onClick={onSearch} className="flex-1 bg-blue-600 hover:bg-blue-700">
            Search Properties
          </Button>
          <Button variant="outline" onClick={clearFilters}>
            Clear All
          </Button>
        </div>
      </CardContent>

      {/* Custom CSS for range sliders */}
      <style jsx>{`
        .range-slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          z-index: 10;
        }
        
        .range-slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </Card>
  )
}
