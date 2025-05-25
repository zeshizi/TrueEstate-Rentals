"use client"

interface SearchFiltersProps {
  filters?: {
    minValue: number
    maxValue: number
    propertyType: string
    ownerType: string
    wealthRange: string
  }
  onFiltersChange?: (filters: {
    minValue: number
    maxValue: number
    propertyType: string
    ownerType: string
    wealthRange: string
  }) => void
}

// Update the default filters constant
const defaultFilters = {
  minValue: 0,
  maxValue: 10000000,
  propertyType: "all",
  ownerType: "all",
  wealthRange: "all",
}

export function SearchFilters({ filters = defaultFilters, onFiltersChange }: SearchFiltersProps) {
  // Ensure filters always has default values
  const safeFilters = {
    ...defaultFilters,
    ...filters,
  }

  const updateFilter = (key: string, value: any) => {
    if (onFiltersChange) {
      onFiltersChange({ ...safeFilters, [key]: value })
    }
  }

  const resetFilters = () => {
    if (onFiltersChange) {
      onFiltersChange(defaultFilters)
    }
  }

  return (
    <div>
      <div>
        <label htmlFor="minValue">Min Value:</label>
        <input
          type="number"
          id="minValue"
          value={safeFilters.minValue}
          onChange={(e) => updateFilter("minValue", Number.parseInt(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="maxValue">Max Value:</label>
        <input
          type="number"
          id="maxValue"
          value={safeFilters.maxValue}
          onChange={(e) => updateFilter("maxValue", Number.parseInt(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="propertyType">Property Type:</label>
        <select
          id="propertyType"
          value={safeFilters.propertyType}
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
          value={safeFilters.ownerType}
          onChange={(e) => updateFilter("ownerType", e.target.value)}
        >
          <option value="all">All</option>
          <option value="individual">Individual</option>
          <option value="company">Company</option>
        </select>
      </div>
      <div>
        <label htmlFor="wealthRange">Wealth Range:</label>
        <select
          id="wealthRange"
          value={safeFilters.wealthRange}
          onChange={(e) => updateFilter("wealthRange", e.target.value)}
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button onClick={resetFilters}>Reset Filters</button>
    </div>
  )
}
