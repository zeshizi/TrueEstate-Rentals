"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { PropertyCard } from "@/components/property-card"
import { PropertySearchFilters } from "@/components/property-search-filters"

interface Property {
  id: string
  title: string
  location: string
  price: number
  propertyType: string
  bedrooms: number
  bathrooms: number
  imageUrl: string
  listingType: string
}

interface Filters {
  minValue: number
  maxValue: number
  propertyType: string
  bedrooms: number
  bathrooms: number
  location: string
  listingType: string
}

export const EnhancedSearchPage = () => {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    minValue: 0,
    maxValue: 1000000,
    propertyType: "Any",
    bedrooms: 0,
    bathrooms: 0,
    location: "",
    listingType: "Any",
  })
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    handleSearch()
  }, [])

  const handleSearch = async () => {
    setLoading(true)
    try {
      // Simulate API call with filters
      const results = await simulateApiCall(filters)
      setProperties(results)
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const simulateApiCall = async (filters: Filters): Promise<Property[]> => {
    // Replace with actual API endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockProperties: Property[] = [
          {
            id: "1",
            title: "Luxury Villa",
            location: "Miami",
            price: 500000,
            propertyType: "Villa",
            bedrooms: 4,
            bathrooms: 3,
            imageUrl: "/villa.jpg",
            listingType: "Sale",
          },
          {
            id: "2",
            title: "Cozy Apartment",
            location: "New York",
            price: 250000,
            propertyType: "Apartment",
            bedrooms: 2,
            bathrooms: 1,
            imageUrl: "/apartment.jpg",
            listingType: "Rent",
          },
          {
            id: "3",
            title: "Modern House",
            location: "Los Angeles",
            price: 750000,
            propertyType: "House",
            bedrooms: 3,
            bathrooms: 2,
            imageUrl: "/house.jpg",
            listingType: "Sale",
          },
        ]

        // Apply filters to mock data
        const filteredProperties = mockProperties.filter((property) => {
          const priceCondition = property.price >= filters.minValue && property.price <= filters.maxValue
          const typeCondition = filters.propertyType === "Any" || property.propertyType === filters.propertyType
          const bedroomsCondition = filters.bedrooms === 0 || property.bedrooms === filters.bedrooms
          const bathroomsCondition = filters.bathrooms === 0 || property.bathrooms === filters.bathrooms
          const locationCondition =
            filters.location === "" || property.location.toLowerCase().includes(filters.location.toLowerCase())
          const listingTypeCondition = filters.listingType === "Any" || property.listingType === filters.listingType

          return (
            priceCondition &&
            typeCondition &&
            bedroomsCondition &&
            bathroomsCondition &&
            locationCondition &&
            listingTypeCondition
          )
        })

        resolve(filteredProperties)
      }, 500)
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Property Search</h1>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 mb-4 md:mb-0 md:mr-4">
          <PropertySearchFilters
            onFiltersChange={(newFilters) => {
              setFilters({
                minValue: newFilters.priceRange[0],
                maxValue: newFilters.priceRange[1],
                propertyType: newFilters.propertyType,
                bedrooms: newFilters.bedrooms,
                bathrooms: newFilters.bathrooms,
                location: newFilters.location,
                listingType: newFilters.listingType,
              })
            }}
            onSearch={handleSearch}
            loading={loading}
          />
        </div>

        <div className="w-full md:w-3/4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
