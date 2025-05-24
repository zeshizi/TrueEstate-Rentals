"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { PropertyCard } from "./property-card"

interface Filters {
  minValue: number
  maxValue: number
  propertyType: string
  ownerType: string
  wealthRange: string
  location: string
}

interface SearchResultsProps {
  initialSearchQuery?: string
}

const defaultFilters = {
  minValue: 0,
  maxValue: 10000000,
  propertyType: "all",
  ownerType: "all",
  wealthRange: "all",
  location: "",
}

export const SearchResults: React.FC<SearchResultsProps> = ({ initialSearchQuery }) => {
  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || "")
  const [filters, setFilters] = useState(defaultFilters)
  const router = useRouter()

  useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery)
      handleSearch()
    }
  }, [initialSearchQuery])

  const handleSearch = async () => {
    if (!searchQuery?.trim()) return

    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        q: searchQuery.trim(),
        type: filters?.propertyType || "all",
        minValue: (filters?.minValue || 0).toString(),
        maxValue: (filters?.maxValue || 10000000).toString(),
        location: filters?.location || "",
      })

      const response = await fetch(`/api/search?${params.toString()}`)
      const data = await response.json()
      setProperties(data)
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters)
  }

  return (
    <div>
      <input type="text" placeholder="Search..." value={searchQuery} onChange={handleInputChange} />
      <button onClick={handleSearch} disabled={isLoading}>
        {isLoading ? "Searching..." : "Search"}
      </button>

      {/* Implement filter UI here, passing filters and handleFilterChange as props */}
      {/* <FilterComponent filters={filters} onFilterChange={handleFilterChange} /> */}

      {isLoading ? (
        <p>Loading...</p>
      ) : properties.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {properties.map((property: any) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <p>No properties found.</p>
      )}
    </div>
  )
}
