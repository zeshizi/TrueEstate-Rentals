"use client"

import { useState } from "react"

interface PropertyFiltersProps {
  onFiltersChange?: (filters: any) => void
}

export function PropertyFilters({ onFiltersChange }: PropertyFiltersProps) {
  const [filters, setFilters] = useState({
    minValue: 0,
    maxValue: 10000000,
    propertyType: "all",
    ownerType: "all",
    wealthRange: "all",
    bedrooms: 0,
    bathrooms: 0,
    studentFriendly: false,
    furnished: false,
    verified: false,
  })

  // Add safe filter update function
  const updateFilter = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    if (onFiltersChange) {
      onFiltersChange(newFilters)
    }
  }

  return (
    <div>
      <div>
        <label htmlFor="minValue">Min Value:</label>
        <input
          type="number"
          id="minValue"
          name="minValue"
          value={filters.minValue}
          onChange={(e) => updateFilter("minValue", Number.parseInt(e.target.value))}
        />
      </div>

      <div>
        <label htmlFor="maxValue">Max Value:</label>
        <input
          type="number"
          id="maxValue"
          name="maxValue"
          value={filters.maxValue}
          onChange={(e) => updateFilter("maxValue", Number.parseInt(e.target.value))}
        />
      </div>

      <div>
        <label htmlFor="propertyType">Property Type:</label>
        <select
          id="propertyType"
          name="propertyType"
          value={filters.propertyType}
          onChange={(e) => updateFilter("propertyType", e.target.value)}
        >
          <option value="all">All</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
        </select>
      </div>

      <div>
        <label htmlFor="ownerType">Owner Type:</label>
        <select
          id="ownerType"
          name="ownerType"
          value={filters.ownerType}
          onChange={(e) => updateFilter("ownerType", e.target.value)}
        >
          <option value="all">All</option>
          <option value="landlord">Landlord</option>
          <option value="agency">Agency</option>
        </select>
      </div>

      <div>
        <label htmlFor="wealthRange">Wealth Range:</label>
        <select
          id="wealthRange"
          name="wealthRange"
          value={filters.wealthRange}
          onChange={(e) => updateFilter("wealthRange", e.target.value)}
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div>
        <label htmlFor="bedrooms">Bedrooms:</label>
        <input
          type="number"
          id="bedrooms"
          name="bedrooms"
          value={filters.bedrooms}
          onChange={(e) => updateFilter("bedrooms", Number.parseInt(e.target.value))}
        />
      </div>

      <div>
        <label htmlFor="bathrooms">Bathrooms:</label>
        <input
          type="number"
          id="bathrooms"
          name="bathrooms"
          value={filters.bathrooms}
          onChange={(e) => updateFilter("bathrooms", Number.parseInt(e.target.value))}
        />
      </div>

      <div>
        <label htmlFor="studentFriendly">Student Friendly:</label>
        <input
          type="checkbox"
          id="studentFriendly"
          name="studentFriendly"
          checked={filters.studentFriendly}
          onChange={(e) => updateFilter("studentFriendly", e.target.checked)}
        />
      </div>

      <div>
        <label htmlFor="furnished">Furnished:</label>
        <input
          type="checkbox"
          id="furnished"
          name="furnished"
          checked={filters.furnished}
          onChange={(e) => updateFilter("furnished", e.target.checked)}
        />
      </div>

      <div>
        <label htmlFor="verified">Verified:</label>
        <input
          type="checkbox"
          id="verified"
          name="verified"
          checked={filters.verified}
          onChange={(e) => updateFilter("verified", e.target.checked)}
        />
      </div>
    </div>
  )
}
