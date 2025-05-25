"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

interface PropertyFiltersProps {
  filters: {
    minValue: number
    maxValue: number
    propertyType: string
    ownerType: string
    wealthRange: string
  }
  onFiltersChange: (filters: any) => void
}

function PropertyFilters({ filters, onFiltersChange }: PropertyFiltersProps) {
  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const resetFilters = () => {
    onFiltersChange({
      minValue: 0,
      maxValue: 10000000,
      propertyType: "all",
      ownerType: "all",
      wealthRange: "all",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="outline" size="sm" onClick={resetFilters}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium">Property Value Range</Label>
          <div className="mt-2">
            <Slider
              value={[filters.minValue, filters.maxValue]}
              onValueChange={([min, max]) => {
                updateFilter("minValue", min)
                updateFilter("maxValue", max)
              }}
              max={10000000}
              step={100000}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>${(filters.minValue / 1000000).toFixed(1)}M</span>
              <span>${(filters.maxValue / 1000000).toFixed(1)}M</span>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Property Type</Label>
          <Select value={filters.propertyType} onValueChange={(value) => updateFilter("propertyType", value)}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="single-family">Single Family</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
              <SelectItem value="multi-family">Multi Family</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium">Owner Type</Label>
          <Select value={filters.ownerType} onValueChange={(value) => updateFilter("ownerType", value)}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Owners</SelectItem>
              <SelectItem value="individual">Individual</SelectItem>
              <SelectItem value="corporation">Corporation</SelectItem>
              <SelectItem value="trust">Trust</SelectItem>
              <SelectItem value="llc">LLC</SelectItem>
              <SelectItem value="partnership">Partnership</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium">Owner Wealth Range</Label>
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
  )
}

export { PropertyFilters }
