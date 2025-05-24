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

// At the top of the SearchFilters component, add default filters
const defaultFilters = {
  minValue: 0,
  maxValue: 10000000,
  propertyType: "all",
  ownerType: "all",
  wealthRange: "all",
}

export function SearchFilters({ filters = defaultFilters, onFiltersChange }: SearchFiltersProps) {
  const updateFilter = (key: string, value: any) => {
    if (onFiltersChange) {
      onFiltersChange({ ...filters, [key]: value })
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
          value={filters?.minValue || 0}
          onChange={(e) => updateFilter("minValue", Number.parseInt(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="maxValue">Max Value:</label>
        <input
          type="number"
          id="maxValue"
          value={filters?.maxValue || 10000000}
          onChange={(e) => updateFilter("maxValue", Number.parseInt(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="propertyType">Property Type:</label>
        <select
          id="propertyType"
          value={filters?.propertyType || "all"}
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
          value={filters?.ownerType || "all"}
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
          value={filters?.wealthRange || "all"}
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
