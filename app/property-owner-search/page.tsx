"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"

const formatPrice = (price: number) => {
  if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`
  if (price >= 1000) return `$${Math.round(price / 1000)}K`
  return `$${price.toLocaleString()}`
}

export default function PropertyOwnerSearchPage() {
  const [filters, setFilters] = useState({
    propertyType: "",
    location: "",
    priceRange: [0, 15000000],
    bedrooms: "",
    bathrooms: "",
    squareFootage: "",
    lotSize: "",
    yearBuilt: "",
  })

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Property Owner Search</h1>

      {/* Search Filters */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">Search Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Property Type */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Property Type</Label>
            <select
              name="propertyType"
              value={filters.propertyType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="">Any</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
            </select>
          </div>

          {/* Location */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Location</Label>
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="City, Neighborhood, or Address"
            />
          </div>

          {/* Price Range Slider */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Price Range</Label>
            <div className="px-3">
              <div className="relative mb-4">
                <input
                  type="range"
                  min="0"
                  max="15000000"
                  step="50000"
                  value={filters.priceRange[0]}
                  onChange={(e) => {
                    const newMin = Number(e.target.value)
                    const newMax = Math.max(newMin, filters.priceRange[1])
                    setFilters((prev) => ({ ...prev, priceRange: [newMin, newMax] }))
                  }}
                  className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider"
                  style={{ background: "transparent" }}
                />
                <input
                  type="range"
                  min="0"
                  max="15000000"
                  step="50000"
                  value={filters.priceRange[1]}
                  onChange={(e) => {
                    const newMax = Number(e.target.value)
                    const newMin = Math.min(filters.priceRange[0], newMax)
                    setFilters((prev) => ({ ...prev, priceRange: [newMin, newMax] }))
                  }}
                  className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider"
                  style={{ background: "transparent" }}
                />
                <div className="relative h-2 bg-gray-200 rounded-lg">
                  <div
                    className="absolute h-2 bg-blue-600 rounded-lg"
                    style={{
                      left: `${(filters.priceRange[0] / 15000000) * 100}%`,
                      width: `${((filters.priceRange[1] - filters.priceRange[0]) / 15000000) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span className="font-medium">{formatPrice(filters.priceRange[0])}</span>
                <span className="font-medium">{formatPrice(filters.priceRange[1])}</span>
              </div>
            </div>
          </div>

          {/* Bedrooms */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Bedrooms</Label>
            <select
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>

          {/* Bathrooms */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Bathrooms</Label>
            <select
              name="bathrooms"
              value={filters.bathrooms}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>

          {/* Square Footage */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Square Footage (sq ft)</Label>
            <input
              type="number"
              name="squareFootage"
              value={filters.squareFootage}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Minimum Square Footage"
            />
          </div>

          {/* Lot Size */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Lot Size (acres)</Label>
            <input
              type="number"
              name="lotSize"
              value={filters.lotSize}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Minimum Lot Size"
            />
          </div>

          {/* Year Built */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Year Built</Label>
            <input
              type="number"
              name="yearBuilt"
              value={filters.yearBuilt}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Minimum Year Built"
            />
          </div>
        </div>
      </div>

      {/* Search Results (Placeholder) */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Search Results</h2>
        <p>No results found. Please adjust your search filters.</p>
      </div>
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
    </div>
  )
}
