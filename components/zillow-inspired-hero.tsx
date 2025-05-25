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
        minValue: filters.priceRange[0].toString(),
        maxValue: filters.priceRange[1].toString(),
        propertyType: filters.propertyType,
      })

      // Route to appropriate page based on search type
      if (filters.searchType === "buy") {
        router.push(`/buy?${searchParams.toString()}`)
      } else if (filters.searchType === "rent") {
        router.push(`/rent?${searchParams.toString()}`)
      } else if (filters.searchType === "wealth-map") {
        router.push(`/wealth-map?${searchParams.toString()}`)
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
        <div className="text-center mb-6 sm:mb-8">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 sm:px-4 mb-4 sm:mb-6 shadow-sm">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-xs sm:text-sm font-medium text-gray-700">Trusted by millions of users</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            Wealth. Properties.
            <br />
            <span className="text-blue-600">Intelligence.</span>
          </h1>

          {/* Tagline */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            Clarity before Capital - Discover luxury properties with owner wealth insights
          </p>
        </div>

        {/* Search Interface */}
        <div className="max-w-4xl mx-auto">
          {/* Search Type Tabs */}
          <div className="flex justify-center mb-4 sm:mb-6 px-4">
            <div className="inline-flex bg-white/90 backdrop-blur-sm rounded-lg p-1 shadow-lg w-full sm:w-auto">
              {[
                { key: "buy", label: "Buy", icon: Home },
                { key: "rent", label: "Rent", icon: MapPin },
                { key: "wealth-map", label: "Wealth Map", icon: TrendingUp, badge: "NEW" },
              ].map(({ key, label, icon: Icon, badge }) => (
                <button
                  key={key}
                  onClick={() => setFilters((prev) => ({ ...prev, searchType: key as any }))}
                  className={`
                    flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-all duration-200 flex-1 sm:flex-none text-sm sm:text-base
                    ${
                      filters.searchType === key
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">{label}</span>
                  <span className="xs:hidden">{label.split(" ")[0]}</span>
                  {badge && (
                    <Badge variant="secondary" className="ml-1 text-xs bg-green-100 text-green-700 hidden sm:inline">
                      {badge}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Search Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 border border-white/20 mx-4 sm:mx-0">
            <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-4 lg:items-end">
              {/* Location Input */}
              <div className="lg:col-span-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Enter city, state, or ZIP"
                    value={filters.location}
                    onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
                    className="pl-9 sm:pl-10 h-11 sm:h-12 text-sm sm:text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Price Range */}
              <div className="lg:col-span-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div className="space-y-3">
                  {/* Mobile-Optimized Range Slider */}
                  <div className="relative px-2">
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
                      className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb z-10"
                      style={{ background: "transparent" }}
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
                      className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb z-20"
                      style={{ background: "transparent" }}
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
                  <div className="flex justify-between text-xs sm:text-sm text-gray-600 px-2">
                    <span className="font-medium">{formatPrice(filters.priceRange[0])}</span>
                    <span className="font-medium">{formatPrice(filters.priceRange[1])}</span>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="lg:col-span-3">
                <Button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="w-full h-11 sm:h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base shadow-lg"
                >
                  {isSearching ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span className="hidden sm:inline">Searching...</span>
                      <span className="sm:hidden">...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>Search</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Quick City Buttons */}
          <div className="mt-4 sm:mt-6 text-center px-4 sm:px-0">
            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">Top Cities:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {quickCities.map((city) => (
                <button
                  key={city}
                  onClick={() => handleQuickCitySearch(city)}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/80 hover:bg-white text-gray-700 hover:text-blue-600 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md border border-gray-200"
                >
                  {city.split(",")[0]} {/* Show only city name on mobile */}
                  <span className="hidden sm:inline">{city.includes(",") ? city.split(",")[1] : ""}</span>
                </button>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 sm:mt-8 px-4 sm:px-0">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-50 border-2 border-white shadow-lg w-full sm:min-w-[200px] font-semibold h-12 sm:h-14 text-sm sm:text-base"
              onClick={() => router.push("/auth/signup")}
            >
              Get Started Free
            </Button>
            <Button
              size="lg"
              className="bg-blue-700 hover:bg-blue-800 text-white border-2 border-white shadow-lg w-full sm:min-w-[200px] font-semibold h-12 sm:h-14 text-sm sm:text-base"
              onClick={() => router.push("/wealth-map")}
            >
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Explore Wealth Map
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile CSS for range sliders */}
      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          position: relative;
          z-index: 100;
        }
        
        .slider-thumb::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }

        /* Mobile touch targets */
        @media (max-width: 640px) {
          .slider-thumb::-webkit-slider-thumb {
            height: 28px;
            width: 28px;
            border: 4px solid #ffffff;
          }
          
          .slider-thumb::-moz-range-thumb {
            height: 28px;
            width: 28px;
            border: 4px solid #ffffff;
          }
        }

        /* Custom breakpoint for extra small screens */
        @media (min-width: 475px) {
          .xs\\:inline {
            display: inline !important;
          }
          .xs\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export default ZillowInspiredHero
