"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, TrendingUp, Users, Building, Eye, Star } from "lucide-react"
import Link from "next/link"

export function ZillowInspiredHero() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("buy")
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const params = new URLSearchParams({
        q: searchQuery,
        type: searchType,
      })

      console.log("🔍 Search initiated:", {
        query: searchQuery,
        type: searchType,
        url: `/search?${params.toString()}`,
      })

      router.push(`/search?${params.toString()}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const searchTypes = [
    { id: "buy", label: "Buy", active: searchType === "buy" },
    { id: "rent", label: "Rent", active: searchType === "rent" },
    { id: "wealth", label: "Wealth Map", active: searchType === "wealth" },
  ]

  return (
    <div className="relative bg-white">
      {/* Hero Section with Background Image - Zillow Style */}
      <div
        className="relative h-[500px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/placeholder.svg?height=500&width=1200&text=Beautiful+Modern+Home+with+Family')`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            {/* Trust Badge */}
            <div className="mb-6">
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm backdrop-blur-sm">
                <Star className="h-4 w-4 mr-2" />
                Trusted by millions of users
              </Badge>
            </div>

            {/* Main Headlines - Zillow Style */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Agents. Tours.
              <br />
              Wealth. Homes.
            </h1>

            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              The only platform that shows you properties AND their owners' wealth data
            </p>

            {/* Search Card - Zillow Style */}
            <Card className="bg-white shadow-2xl border-0 max-w-3xl mx-auto">
              <CardContent className="p-6">
                {/* Search Type Tabs */}
                <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
                  {searchTypes.map((type) => (
                    <Button
                      key={type.id}
                      variant={type.active ? "default" : "ghost"}
                      className={`flex-1 font-medium text-sm ${
                        type.active
                          ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                          : "bg-transparent text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                      } transition-all duration-200`}
                      onClick={() => setSearchType(type.id)}
                    >
                      {type.label}
                    </Button>
                  ))}
                </div>

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
                    disabled={isLoading}
                    className="absolute right-2 top-2 h-10 px-6 bg-blue-600 hover:bg-blue-700"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-3 mt-4 justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    onClick={() => {
                      setSearchQuery("Beverly Hills")
                      setSearchType("buy")
                    }}
                  >
                    Beverly Hills
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    onClick={() => {
                      setSearchQuery("Manhattan")
                      setSearchType("buy")
                    }}
                  >
                    Manhattan
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    onClick={() => {
                      setSearchQuery("Malibu")
                      setSearchType("buy")
                    }}
                  >
                    Malibu
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    onClick={() => {
                      setSearchQuery("Miami Beach")
                      setSearchType("buy")
                    }}
                  >
                    Miami Beach
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Value Propositions - Flatmate Style */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose TrueEstate?</h2>
            <p className="text-lg text-gray-600">
              The most comprehensive real estate platform with wealth intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wealth Transparency</h3>
              <p className="text-gray-600">See property owners' estimated net worth and investment patterns</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Properties</h3>
              <p className="text-gray-600">Access to exclusive listings and luxury real estate nationwide</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Agents</h3>
              <p className="text-gray-600">Connect with top-rated agents who understand luxury markets</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-12">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to find your dream home?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join millions of users who trust TrueEstate for their real estate needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signin">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg border-2 border-white"
              >
                Get Started Free
              </Button>
            </Link>
            <Link href="/wealth-map">
              <Button
                size="lg"
                className="bg-blue-700 hover:bg-blue-800 text-white border-2 border-white px-8 py-4 text-lg font-semibold shadow-lg"
              >
                <TrendingUp className="h-5 w-5 mr-2" />
                Explore Wealth Map
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ZillowInspiredHero
