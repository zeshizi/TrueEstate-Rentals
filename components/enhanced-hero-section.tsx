"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, Users, Building, Crown, Star, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function EnhancedHeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("all")
  const router = useRouter()

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const params = new URLSearchParams({
        q: searchQuery,
        type: searchType,
      })
      router.push(`/search?${params.toString()}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const quickSearches = [
    { label: "Beverly Hills Mansions", query: "beverly hills", type: "luxury" },
    { label: "Manhattan Penthouses", query: "manhattan penthouse", type: "luxury" },
    { label: "Malibu Oceanfront", query: "malibu ocean", type: "luxury" },
    { label: "Aspen Ski Properties", query: "aspen", type: "luxury" },
  ]

  const stats = [
    { icon: Building, label: "Properties Analyzed", value: "2.1M+", color: "text-blue-600" },
    { icon: Users, label: "Wealthy Owners Identified", value: "150K+", color: "text-green-600" },
    { icon: TrendingUp, label: "Total Property Value", value: "$2.8T", color: "text-purple-600" },
    { icon: Crown, label: "Ultra-High Net Worth", value: "12K+", color: "text-yellow-600" },
  ]

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920&text=Luxury+Real+Estate+Background')] bg-cover bg-center opacity-10"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Main Hero Content */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="mb-6">
              <Badge variant="outline" className="bg-white/10 text-white border-white/20 px-4 py-2 text-sm">
                <Star className="h-4 w-4 mr-2" />
                World's First Wealth Intelligence Platform
              </Badge>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Discover Who Owns
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Luxury Real Estate
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">Clarity before Capital</p>

            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              Uncover property ownership, analyze wealth patterns, and identify high-net-worth individuals through our
              proprietary intelligence platform.
            </p>

            {/* Search Section */}
            <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 max-w-3xl mx-auto">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Search Type Tabs */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Button
                      variant={searchType === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSearchType("all")}
                      className="rounded-full"
                    >
                      All Properties
                    </Button>
                    <Button
                      variant={searchType === "luxury" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSearchType("luxury")}
                      className="rounded-full"
                    >
                      Luxury Homes
                    </Button>
                    <Button
                      variant={searchType === "owner" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSearchType("owner")}
                      className="rounded-full"
                    >
                      By Owner
                    </Button>
                    <Button
                      variant={searchType === "wealth" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSearchType("wealth")}
                      className="rounded-full"
                    >
                      Wealth Analysis
                    </Button>
                  </div>

                  {/* Main Search Bar */}
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="Enter address, city, owner name, or company..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="pl-12 h-14 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <Button onClick={handleSearch} size="lg" className="h-14 px-8 bg-blue-600 hover:bg-blue-700">
                      Search
                    </Button>
                  </div>

                  {/* Quick Searches */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="text-sm text-gray-600 mr-2">Popular:</span>
                    {quickSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchQuery(search.query)
                          setSearchType(search.type)
                        }}
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {search.label}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/wealth-map">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
                >
                  <Eye className="h-5 w-5 mr-2" />
                  View Wealth Map
                </Button>
              </Link>
              <Link href="/properties">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg"
                >
                  <Building className="h-5 w-5 mr-2" />
                  Browse Properties
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
                  <CardContent className="p-6">
                    <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
