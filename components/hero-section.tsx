"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [propertyType, setPropertyType] = useState("")
  const [budget, setBudget] = useState("")

  const handleSearch = () => {
    // Implement search functionality
    console.log("Searching for:", { searchQuery, propertyType, budget })
  }

  return (
    <section className="relative bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block bg-gray-200 px-4 py-2 rounded-full text-sm font-medium text-gray-700">
              Transparent Real Estate Insights
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Find Your Perfect Home with <span className="text-gray-700">Wealth Insights</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              TrueEstate Rentals combines a user-friendly rental platform with a powerful Wealth Map — serving renters,
              investors, and real estate professionals across the United States with verified, transparent ownership and
              wealth insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800">
                Explore Properties
              </Button>
              <Link href="/wealth-map">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  View Wealth Map →
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <Tabs defaultValue="rent" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="rent">Rent</TabsTrigger>
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="wealth-map">Wealth Map</TabsTrigger>
              </TabsList>

              <TabsContent value="rent" className="space-y-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Enter US city or ZIP code"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                    <Select value={propertyType} onValueChange={setPropertyType}>
                      <SelectTrigger>
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
                      <SelectTrigger>
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

                <Button onClick={handleSearch} className="w-full bg-gray-900 hover:bg-gray-800" size="lg">
                  <Search className="mr-2 h-5 w-5" />
                  Search Properties
                </Button>
              </TabsContent>

              <TabsContent value="buy" className="space-y-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Enter US city or ZIP code"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                    <Select value={propertyType} onValueChange={setPropertyType}>
                      <SelectTrigger>
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
                      <SelectTrigger>
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

                <Button onClick={handleSearch} className="w-full bg-gray-900 hover:bg-gray-800" size="lg">
                  <Search className="mr-2 h-5 w-5" />
                  Search Properties
                </Button>
              </TabsContent>

              <TabsContent value="wealth-map" className="space-y-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Enter US city or ZIP code"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Wealth Range</label>
                    <Select value={propertyType} onValueChange={setPropertyType}>
                      <SelectTrigger>
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
                      <SelectTrigger>
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

                <Link href="/wealth-map" className="block">
                  <Button className="w-full bg-gray-900 hover:bg-gray-800" size="lg">
                    <Search className="mr-2 h-5 w-5" />
                    Explore Wealth Map
                  </Button>
                </Link>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  )
}
