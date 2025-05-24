"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { ProfessionalHeader } from "@/components/professional-header"
import { SearchResults } from "@/components/search-results"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Search, Filter } from "lucide-react"

export function EnhancedSearchPage() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const [filters, setFilters] = useState({
    type: searchParams.get("type") || "all",
    minValue: [0],
    maxValue: [50000000],
    propertyType: "all",
    ownerType: "all",
    wealthRange: "all",
    location: "",
    bedrooms: "any",
    bathrooms: "any",
  })

  const handleSearch = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        q: query,
        type: filters.type,
        minValue: filters.minValue[0].toString(),
        maxValue: filters.maxValue[0].toString(),
        propertyType: filters.propertyType,
        ownerType: filters.ownerType,
        wealthRange: filters.wealthRange,
        location: filters.location,
      })

      console.log("🔍 Enhanced search with params:", {
        query: query,
        type: filters.type,
        minValue: filters.minValue[0],
        maxValue: filters.maxValue[0],
        propertyType: filters.propertyType,
        ownerType: filters.ownerType,
        url: `/api/search?${params.toString()}`,
      })

      const response = await fetch(`/api/search?${params}`)
      const data = await response.json()

      console.log("📊 Enhanced search results:", {
        query: data.query,
        totalResults: data.results?.length || 0,
        success: !!data.results,
        error: data.error || null,
        firstResult: data.results?.[0]?.title || null,
      })

      setResults(data.results || [])
    } catch (error) {
      console.error("❌ Enhanced search error:", error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [query, filters])

  // Auto-search on load
  useEffect(() => {
    if (query || filters.type !== "all") {
      handleSearch()
    }
  }, [])

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`
    }
    return `$${price.toLocaleString()}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfessionalHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Property & Owner Search</h1>
              <p className="text-gray-600 mt-2">Discover luxury properties and their wealthy owners</p>
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Search Bar */}
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search by address, owner name, company, or location..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-10 h-12 text-lg"
                  />
                </div>
                <Button onClick={handleSearch} size="lg" disabled={loading} className="px-8">
                  {loading ? "Searching..." : "Search"}
                </Button>
              </div>

              {/* Quick Filter Tabs */}
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  { key: "all", label: "All Properties" },
                  { key: "luxury", label: "Luxury Homes" },
                  { key: "owner", label: "By Owner" },
                  { key: "wealth", label: "Wealth Analysis" },
                ].map((tab) => (
                  <Button
                    key={tab.key}
                    variant={filters.type === tab.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilters({ ...filters, type: tab.key })}
                    className="rounded-full"
                  >
                    {tab.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? "block" : "hidden lg:block"}`}>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Property Value Range</label>
                  <div className="space-y-3">
                    <Slider
                      value={filters.minValue}
                      onValueChange={(value) => setFilters({ ...filters, minValue: value })}
                      max={50000000}
                      step={100000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{formatPrice(filters.minValue[0])}</span>
                      <span>{formatPrice(50000000)}</span>
                    </div>
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Property Type</label>
                  <Select
                    value={filters.propertyType}
                    onValueChange={(value) => setFilters({ ...filters, propertyType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="single-family">Single Family</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="multi-family">Multi-Family</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Owner Type */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Owner Type</label>
                  <Select
                    value={filters.ownerType}
                    onValueChange={(value) => setFilters({ ...filters, ownerType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Owners</SelectItem>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="llc">LLC</SelectItem>
                      <SelectItem value="trust">Trust</SelectItem>
                      <SelectItem value="corporate">Corporate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Wealth Range */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Owner Wealth Range</label>
                  <Select
                    value={filters.wealthRange}
                    onValueChange={(value) => setFilters({ ...filters, wealthRange: value })}
                  >
                    <SelectTrigger>
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

                {/* Bedrooms */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Bedrooms</label>
                  <Select
                    value={filters.bedrooms}
                    onValueChange={(value) => setFilters({ ...filters, bedrooms: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Apply Filters Button */}
                <Button onClick={handleSearch} className="w-full" disabled={loading}>
                  Apply Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            {results.length > 0 && (
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <h2 className="text-xl font-semibold text-gray-900">{results.length} Properties Found</h2>
                  {query && <Badge variant="outline">Searching: "{query}"</Badge>}
                </div>
                <Select defaultValue="value-desc">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="value-desc">Highest Value</SelectItem>
                    <SelectItem value="value-asc">Lowest Value</SelectItem>
                    <SelectItem value="wealth-desc">Wealthiest Owner</SelectItem>
                    <SelectItem value="newest">Newest Listed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <SearchResults results={results} loading={loading} query={query} />
          </div>
        </div>
      </div>
    </div>
  )
}
