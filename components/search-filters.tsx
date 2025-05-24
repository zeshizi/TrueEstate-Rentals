"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

interface SearchFiltersProps {
  filters: {
    type: string
    minValue: number
    maxValue: number
    location: string
  }
  onFiltersChange: (filters: any) => void
}

export function SearchFilters({ filters, onFiltersChange }: SearchFiltersProps) {
  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const resetFilters = () => {
    onFiltersChange({
      type: "all",
      minValue: 0,
      maxValue: 10000000,
      location: "",
    })
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="outline" size="sm" onClick={resetFilters}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium">Search Type</Label>
          <Select value={filters.type} onValueChange={(value) => updateFilter("type", value)}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Results</SelectItem>
              <SelectItem value="properties">Properties Only</SelectItem>
              <SelectItem value="owners">Owners Only</SelectItem>
              <SelectItem value="addresses">Locations Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium">Location</Label>
          <Input
            placeholder="City, State, or ZIP"
            value={filters.location}
            onChange={(e) => updateFilter("location", e.target.value)}
            className="mt-2"
          />
        </div>

        <div>
          <Label className="text-sm font-medium">Value Range</Label>
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
      </div>
    </div>
  )
}
