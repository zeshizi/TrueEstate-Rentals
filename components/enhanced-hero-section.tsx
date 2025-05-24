"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, Users, Building, Crown, Star, Eye, MapPin } from "lucide-react"
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
    { label: "Beverly Hills", query: "beverly hills", type: "luxury" },
    { label: "Manhattan", query: "manhattan", type: "luxury" },
    { label: "Malibu", query: "malibu", type: "luxury" },
    { label: "Aspen", query: "aspen", type: "luxury" },
  ]

  const stats = [
    { icon: Building, label: "Rental Properties", value: "2.1M+", color: "text-blue-600" },
    { icon: Users, label: "Property Owners", value: "150K+", color: "text-green-600" },
    { icon: TrendingUp, label: "Total Portfolio Value", value: "$2.8T", color: "text-purple-600" },
    { icon: Crown, label: "Verified Wealthy Owners", value: "12K+", color: "text-yellow-600" },
  ]

  return (
    <div className="relative bg-white">
      {/* Hero Image Background */}
      <div
        className="relative h-[600px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/placeholder.svg?height=600&width=1200&text=Modern+Luxury+Rental+Properties')`,
        }}
      >
        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            {/* Badge */}
            <div className="mb-6">
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm backdrop-blur-sm">
                <Star className="h-4 w-4 mr-2" />
                Rental Platform + Wealth Intelligence
              </Badge>
            </div>

            {/* Main Headlines - Updated for Rentals */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Rentals. Owners.
              <br />
              Wealth. Transparency.
            </h1>

            {/* Tagline */}
            <p className="text-xl text-white/90 mb-4 max-w-2xl mx-auto font-semibold">Clarity before Capital</p>

            <p className="text-lg text-white/80 mb-8 max-w-3xl mx-auto">
              TrueEstate Rentals combines a user-friendly rental platform with a powerful Wealth Map — serving renters,
              investors, and real estate professionals with verified, transparent ownership insights.
            </p>

            {/* Main Search Bar - Zillow Style */}
            <div className="max-w-2xl mx-auto">
              <Card className="bg-white shadow-2xl border-0">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Search Input */}
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="Enter an address, neighborhood, city, or ZIP code"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="pl-12 h-14 text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                      />
                      <Button
                        onClick={handleSearch}
                        className="absolute right-2 top-2 h-10 px-6 bg-blue-600 hover:bg-blue-700"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Quick Search Buttons */}
                    <div className="flex flex-wrap gap-2 justify-center">
                      {quickSearches.map((search, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSearchQuery(search.query)
                            setSearchType(search.type)
                          }}
                          className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                          {search.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/wealth-map">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg"
                >
                  <Eye className="h-5 w-5 mr-2" />
                  View Wealth Map
                </Button>
              </Link>
              <Link href="/rent">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/90 text-gray-900 hover:bg-white px-8 py-4 text-lg font-semibold shadow-lg border-white"
                >
                  <Building className="h-5 w-5 mr-2" />
                  Find Rentals
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Renters, Investors & Professionals</h2>
            <p className="text-lg text-gray-600">The most comprehensive rental platform with wealth intelligence</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-white p-4 rounded-full shadow-md">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
