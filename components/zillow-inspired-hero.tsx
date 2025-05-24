"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Home, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"

interface SearchFilters {
  searchType: "buy" | "rent" | "wealth-map"
  location: string
  priceRange: [number, number]
  propertyType: string
}

export function ZillowInspiredHero() {
  const router = useRouter()
  const [filters, setFilters] = useState<SearchFilters>({
    searchType: "buy",
    location: "",
    priceRange: [0, 10000000],
    propertyType: "all",
  })

  const [isSearching, setIsSearching] = useState(false)

  const quickCities = ["New York, NY", "Los Angeles, CA", "Miami, FL", "San Francisco, CA", "Chicago, IL", "Boston, MA"]

  const handleSearch = async () => {
    setIsSearching(true)

    console.log("🔍 Search initiated with filters:", {
      searchType: filters.searchType,
      location: filters.location,
      priceMin: filters.priceRange[0],
      priceMax: filters.priceRange[1],
      propertyType: filters.propertyType,
    })

    try {
      // Build search URL with parameters
      const searchParams = new URLSearchParams({
        q: filters.location,
        type: filters.searchType,
        minValue: filters.priceRange[0].toString(),
        maxValue: filters.priceRange[1].toString(),
        propertyType: filters.propertyType,
      })

      if (filters.searchType === "wealth-map") {
        router.push(`/wealth-map?${searchParams.toString()}`)
      } else {
        router.push(`/search?${searchParams.toString()}`)
      }
    } catch (error) {
      console.error("Search navigation error:", error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleQuickCitySearch = (city: string) => {
    setFilters((prev) => ({ ...prev, location: city }))
    console.log("🏙️ Quick city selected:", city)
  }

  const formatPrice = (price: number) => {
    if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`
    if (price >= 1000) return `$${(price / 1000).toFixed(0)}K`
    return `$${price.toLocaleString()}`
  }

  const handlePriceRangeChange = (newRange: [number, number]) => {
    console.log("💰 Price range changed:", {
      from: formatPrice(newRange[0]),
      to: formatPrice(newRange[1]),
      rawValues: newRange,
    })
    setFilters((prev) => ({ ...prev, priceRange: newRange }))
  }

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 min-h-[600px] flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url('/placeholder.svg?height=600&width=1200&text=Luxury+Real+Estate')",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-sm">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Trusted by millions of users</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Wealth. Properties.
            <br />
            <span className="text-blue-600">Intelligence.</span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Clarity before Capital - Discover luxury properties with owner wealth insights
          </p>
        </div>

        {/* Search Interface */}
        <div className="max-w-4xl mx-auto">
          {/* Search Type Tabs */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-white/90 backdrop-blur-sm rounded-lg p-1 shadow-lg">
              {[
                { key: "buy", label: "Buy", icon: Home },
                { key: "rent", label: "Rent", icon: MapPin },
                { key: "wealth-map", label: "Wealth Map", icon: TrendingUp, badge: "NEW" },
              ].map(({ key, label, icon: Icon, badge }) => (
                <button
                  key={key}
                  onClick={() => setFilters((prev) => ({ ...prev, searchType: key as any }))}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all duration-200
                    ${
                      filters.searchType === key
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                  {badge && (
                    <Badge variant="secondary" className="ml-1 text-xs bg-green-100 text-green-700">
                      {badge}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Search Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
              {/* Location Input */}
              <div className="lg:col-span-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Enter an address, neighborhood, city, or ZIP code"
                    value={filters.location}
                    onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
                    className="pl-10 h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Price Range */}
              <div className="lg:col-span-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div className="space-y-2">
                  {/* Custom Range Slider */}
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="10000000"
                      step="100000"
                      value={filters.priceRange[0]}
                      onChange={(e) => {
                        const newMin = Number(e.target.value)
                        const newMax = Math.max(newMin, filters.priceRange[1])
                        handlePriceRangeChange([newMin, newMax])
                      }}
                      className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                    />
                    <input
                      type="range"
                      min="0"
                      max="10000000"
                      step="100000"
                      value={filters.priceRange[1]}
                      onChange={(e) => {
                        const newMax = Number(e.target.value)
                        const newMin = Math.min(filters.priceRange[0], newMax)
                        handlePriceRangeChange([newMin, newMax])
                      }}
                      className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                    />
                    <div className="relative h-2 bg-gray-200 rounded-lg">
                      <div
                        className="absolute h-2 bg-blue-600 rounded-lg"
                        style={{
                          left: `${(filters.priceRange[0] / 10000000) * 100}%`,
                          width: `${((filters.priceRange[1] - filters.priceRange[0]) / 10000000) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{formatPrice(filters.priceRange[0])}</span>
                    <span>{formatPrice(filters.priceRange[1])}</span>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="lg:col-span-3">
                <Button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-lg"
                >
                  {isSearching ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Searching...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Search className="h-5 w-5" />
                      Search
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Quick City Buttons */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-3">Top Cities:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {quickCities.map((city) => (
                <button
                  key={city}
                  onClick={() => handleQuickCitySearch(city)}
                  className="px-4 py-2 bg-white/80 hover:bg-white text-gray-700 hover:text-blue-600 rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md border border-gray-200"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-50 border-2 border-white shadow-lg min-w-[200px] font-semibold"
              onClick={() => router.push("/auth/signup")}
            >
              Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-blue-700 hover:bg-blue-800 text-white border-2 border-white shadow-lg min-w-[200px] font-semibold"
              onClick={() => router.push("/wealth-map")}
            >
              Explore Wealth Map
            </Button>
          </div>
        </div>
      </div>

      {/* Custom CSS for range sliders */}
      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .slider-thumb::-moz-range-thumb {
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

export default ZillowInspiredHero
