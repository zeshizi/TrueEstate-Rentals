"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { SearchResults } from "@/components/search-results"
import { SearchFilters } from "@/components/search-filters"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    type: "all",
    minValue: 0,
    maxValue: 10000000,
    location: "",
    propertyType: searchParams.get("propertyType") || "",
    budget: searchParams.get("budget") || "",
  })

  const handleSearch = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        q: query,
        type: filters.type,
        minValue: filters.minValue.toString(),
        maxValue: filters.maxValue.toString(),
        location: filters.location,
      })

      console.log("🔍 Searching with params:", {
        query: query,
        type: filters.type,
        minValue: filters.minValue,
        maxValue: filters.maxValue,
        location: filters.location,
        fullURL: `/api/search?${params.toString()}`,
      })

      const response = await fetch(`/api/search?${params}`)
      const data = await response.json()

      console.log("📊 Search results:", {
        query: data.query,
        totalResults: data.results?.length || 0,
        results: data.results,
        suggestions: data.suggestions,
      })

      setResults(data.results || [])
    } catch (error) {
      console.error("❌ Search error:", error)
    } finally {
      setLoading(false)
    }
  }

  // Auto-search when page loads with parameters
  useEffect(() => {
    if (query || filters.propertyType || filters.budget) {
      console.log("🚀 Auto-searching on page load with:", {
        query,
        propertyType: filters.propertyType,
        budget: filters.budget,
      })
      handleSearch()
    }
  }, [])

  // Debounced search when query changes
  useEffect(() => {
    if (query) {
      const debounceTimer = setTimeout(() => {
        console.log("⏱️ Debounced search triggered for:", query)
        handleSearch()
      }, 300)
      return () => clearTimeout(debounceTimer)
    }
  }, [query, filters])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      console.log("⌨️ Enter key pressed, searching for:", query)
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Properties & Owners</h1>

          {/* Show search context if coming from hero */}
          {(filters.propertyType || filters.budget) && (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800">
                Searching for: {query && `"${query}"`}
                {filters.propertyType && ` • ${filters.propertyType}`}
                {filters.budget && ` • ${filters.budget}`}
              </p>
            </div>
          )}

          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by address, owner name, or location..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 text-lg h-12"
              />
            </div>
            <Button onClick={handleSearch} size="lg" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <SearchFilters filters={filters} onFiltersChange={setFilters} />
          </div>

          <div className="lg:col-span-3">
            <SearchResults results={results} loading={loading} query={query} />
          </div>
        </div>
      </div>
    </div>
  )
}
