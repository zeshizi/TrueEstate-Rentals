"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Search, Bed, Bath, Square, DollarSign, Heart, Star } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SearchResults } from "@/components/search-results"
import { PropertyFilters } from "@/components/property-filters"

const topCities = ["Atlanta", "Phoenix", "Dallas", "Tampa", "Charlotte", "Nashville", "Austin", "Denver"]

const featuredRentals = [
  {
    id: 1,
    title: "Affordable Studio Apartment",
    location: "Atlanta, GA",
    price: 1200,
    beds: 0,
    baths: 1,
    sqft: 450,
    image: "/placeholder.svg?height=200&width=300&text=Atlanta+Studio+Apartment",
    rating: 4.2,
    verified: true,
  },
  {
    id: 2,
    title: "Cozy 1-Bedroom Apartment",
    location: "Phoenix, AZ",
    price: 1650,
    beds: 1,
    baths: 1,
    sqft: 750,
    image: "/placeholder.svg?height=200&width=300&text=Phoenix+1BR+Apartment",
    rating: 4.5,
    verified: true,
  },
  {
    id: 3,
    title: "Family Townhouse",
    location: "Dallas, TX",
    price: 2800,
    beds: 3,
    baths: 2,
    sqft: 1400,
    image: "/placeholder.svg?height=200&width=300&text=Dallas+Family+Townhouse",
    rating: 4.7,
    verified: true,
  },
  {
    id: 4,
    title: "Modern Downtown Loft",
    location: "Austin, TX",
    price: 3200,
    beds: 2,
    baths: 2,
    sqft: 1100,
    image: "/placeholder.svg?height=200&width=300&text=Austin+Downtown+Loft",
    rating: 4.8,
    verified: true,
  },
  {
    id: 5,
    title: "Luxury High-Rise Apartment",
    location: "Charlotte, NC",
    price: 4500,
    beds: 2,
    baths: 2,
    sqft: 1300,
    image: "/placeholder.svg?height=200&width=300&text=Charlotte+Luxury+Apartment",
    rating: 4.9,
    verified: true,
  },
  {
    id: 6,
    title: "Executive Penthouse",
    location: "Denver, CO",
    price: 8500,
    beds: 3,
    baths: 3,
    sqft: 2200,
    image: "/placeholder.svg?height=200&width=300&text=Denver+Executive+Penthouse",
    rating: 4.9,
    verified: true,
  },
]

export default function RentPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const searchParams = useSearchParams()

  useEffect(() => {
    const query = searchParams.get("q")
    if (query) {
      setSearchQuery(query)
      handleSearch()
    }
  }, [searchParams])

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      setLoading(true)
      setShowResults(true)

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&type=rent`)
        const data = await response.json()

        // Filter for rental properties
        const rentalProperties = data.results?.filter((r: any) => r.type === "property") || []
        setSearchResults(rentalProperties)
      } catch (error) {
        console.error("Search error:", error)
        setSearchResults([])
      } finally {
        setLoading(false)
      }
    }
  }

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Trust Badge */}
          <div className="mb-6">
            <Badge className="bg-purple-100 text-purple-800 px-4 py-2 text-sm font-medium">
              Rentals for every lifestyle
            </Badge>
          </div>

          {/* Main Headlines */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">Find your perfect rental</h1>
          <h2 className="text-2xl sm:text-3xl text-gray-700 mb-4">From Studios to Luxury Apartments</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover rental properties across all budgets with verified landlord information
          </p>

          {/* Search Bar */}
          <Card className="bg-white shadow-lg border-0 max-w-2xl mx-auto mb-8">
            <CardContent className="p-6">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search Rental Properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-12 h-14 text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                />
                <Button
                  onClick={handleSearch}
                  className="absolute right-2 top-2 h-10 px-6 bg-blue-600 hover:bg-blue-700"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Top Cities */}
          <div className="mb-12">
            <p className="text-sm text-gray-600 mb-4">
              <span className="font-medium">Popular Rental Markets:</span>
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {topCities.map((city) => (
                <Button
                  key={city}
                  variant="outline"
                  size="sm"
                  className="rounded-full bg-white hover:bg-blue-50 border-gray-300"
                  onClick={() => {
                    setSearchQuery(city)
                    handleSearch()
                  }}
                >
                  {city}
                </Button>
              ))}
              <Button variant="outline" size="sm" className="rounded-full bg-white hover:bg-blue-50 border-gray-300">
                More →
              </Button>
            </div>
          </div>

          {/* Price Range Info */}
          <div className="mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600">$800+</div>
                <div className="text-sm text-gray-600">Studios</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-green-600">$1,500+</div>
                <div className="text-sm text-gray-600">1-2 Bedrooms</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-purple-600">$2,500+</div>
                <div className="text-sm text-gray-600">Family Homes</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-orange-600">$5,000+</div>
                <div className="text-sm text-gray-600">Luxury Rentals</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Rentals Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Rentals Across All Budgets</h3>
            <p className="text-gray-600">From affordable studios to luxury penthouses</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {featuredRentals.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                  {property.verified && (
                    <Badge className="absolute top-2 left-2 bg-green-500 text-white">Verified</Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-lg">{property.title}</h4>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{property.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{property.location}</span>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      <span>{property.beds === 0 ? "Studio" : property.beds}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      <span>{property.baths}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Square className="h-4 w-4" />
                      <span>{property.sqft} sqft</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-5 w-5 text-gray-500" />
                      <span className="text-2xl font-bold">{formatPrice(property.price)}</span>
                      <span className="text-gray-500">/month</span>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Browse All Rentals
            </Button>
          </div>
        </div>
      </div>

      {/* Search Results Section */}
      {showResults && (
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">
                  Rental Properties {searchQuery && `in ${searchQuery}`}
                </h3>
                <Button variant="outline" onClick={() => setShowResults(false)} className="text-gray-600">
                  Clear Results
                </Button>
              </div>

              <div className="grid lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                  <PropertyFilters onFiltersChange={(filters) => console.log("Filters:", filters)} />
                </div>
                <div className="lg:col-span-3">
                  <SearchResults results={searchResults} loading={loading} query={searchQuery} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
