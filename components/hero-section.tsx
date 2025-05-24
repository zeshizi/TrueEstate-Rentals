"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin, Users, Shield, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function HeroSection() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [propertyType, setPropertyType] = useState("")
  const [budget, setBudget] = useState("")

  const handleSearch = () => {
    console.log("Searching for:", { searchQuery, propertyType, budget })

    // Build search URL with parameters
    const params = new URLSearchParams()
    if (searchQuery) params.set("q", searchQuery)
    if (propertyType && propertyType !== "any") params.set("propertyType", propertyType)
    if (budget && budget !== "any") params.set("budget", budget)

    // Navigate to search page with parameters
    router.push(`/search?${params.toString()}`)
  }

  const handleWealthMapSearch = () => {
    console.log("Wealth Map search for:", { searchQuery, propertyType, budget })

    // Build wealth map URL with parameters
    const params = new URLSearchParams()
    if (searchQuery) params.set("location", searchQuery)
    if (propertyType && propertyType !== "any") params.set("wealthRange", propertyType)
    if (budget && budget !== "any") params.set("ownerType", budget)

    // Navigate to wealth map with parameters
    router.push(`/wealth-map?${params.toString()}`)
  }

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      {/* Trust Badge */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex justify-center">
          <div className="inline-flex items-center bg-purple-100 text-purple-800 px-6 py-2 rounded-full text-sm font-medium">
            <Shield className="w-4 h-4 mr-2" />
            Trusted by real estate professionals nationwide
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Find Your Perfect Home with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Wealth Insights
              </span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Share your space with verified owners. Discover transparent real estate with comprehensive wealth analysis
              and verified ownership data.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-blue-500" />
                <span>10,000+ Properties</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                <span>$2B+ Analyzed</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-purple-500" />
                <span>100% Verified</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                onClick={() => router.push("/search")}
              >
                Explore Properties
              </Button>
              <Link href="/wealth-map">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-blue-200 hover:border-blue-300"
                >
                  View Wealth Map →
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {/* Search Header */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Start Your Search</h3>
              <p className="text-gray-600">Find properties with complete ownership insights</p>
            </div>

            <Tabs defaultValue="rent" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-50">
                <TabsTrigger value="rent" className="data-[state=active]:bg-white">
                  Rent
                </TabsTrigger>
                <TabsTrigger value="buy" className="data-[state=active]:bg-white">
                  Buy
                </TabsTrigger>
                <TabsTrigger value="wealth-map" className="data-[state=active]:bg-white">
                  Wealth Map
                </TabsTrigger>
              </TabsList>

              <TabsContent value="rent" className="space-y-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search Places... (e.g., New York, Los Angeles)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500"
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                    <Select value={propertyType} onValueChange={setPropertyType}>
                      <SelectTrigger className="h-12 border-2 border-gray-200">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                    <Select value={budget} onValueChange={setBudget}>
                      <SelectTrigger className="h-12 border-2 border-gray-200">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="0-1000">$0 - $1,000</SelectItem>
                        <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
                        <SelectItem value="2000-3000">$2,000 - $3,000</SelectItem>
                        <SelectItem value="3000+">$3,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={handleSearch}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12"
                  size="lg"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Search Rentals
                </Button>
              </TabsContent>

              <TabsContent value="buy" className="space-y-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search Places... (e.g., Miami, Austin)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500"
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                    <Select value={propertyType} onValueChange={setPropertyType}>
                      <SelectTrigger className="h-12 border-2 border-gray-200">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="single-family">Single Family</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="multi-family">Multi Family</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                    <Select value={budget} onValueChange={setBudget}>
                      <SelectTrigger className="h-12 border-2 border-gray-200">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="0-200k">$0 - $200k</SelectItem>
                        <SelectItem value="200k-500k">$200k - $500k</SelectItem>
                        <SelectItem value="500k-1m">$500k - $1M</SelectItem>
                        <SelectItem value="1m+">$1M+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={handleSearch}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12"
                  size="lg"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Search Properties
                </Button>
              </TabsContent>

              <TabsContent value="wealth-map" className="space-y-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search Places... (e.g., Beverly Hills, Manhattan)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500"
                    onKeyDown={(e) => e.key === "Enter" && handleWealthMapSearch()}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Wealth Range</label>
                    <Select value={propertyType} onValueChange={setPropertyType}>
                      <SelectTrigger className="h-12 border-2 border-gray-200">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                        <SelectItem value="5m-10m">$5M - $10M</SelectItem>
                        <SelectItem value="10m-50m">$10M - $50M</SelectItem>
                        <SelectItem value="50m+">$50M+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Owner Type</label>
                    <Select value={budget} onValueChange={setBudget}>
                      <SelectTrigger className="h-12 border-2 border-gray-200">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="corporation">Corporation</SelectItem>
                        <SelectItem value="trust">Trust</SelectItem>
                        <SelectItem value="llc">LLC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={handleWealthMapSearch}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12"
                  size="lg"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Explore Wealth Map
                </Button>
              </TabsContent>
            </Tabs>

            {/* Top Cities */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-600 mb-3">Top Cities:</p>
              <div className="flex flex-wrap gap-2">
                {["New York", "Los Angeles", "Miami", "Austin", "Chicago"].map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSearchQuery(city)
                      handleSearch()
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
