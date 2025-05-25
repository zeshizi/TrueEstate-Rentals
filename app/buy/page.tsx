"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Search, Bed, Bath, Square, DollarSign, Heart, TrendingUp, Shield } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SearchResults } from "@/components/search-results"
import { PropertyFilters } from "@/components/property-filters"

const topCities = ["Phoenix", "Atlanta", "Dallas", "Denver", "Austin", "Charlotte", "Nashville", "Tampa"]

const featuredProperties = [
  {
    id: 1,
    title: "Starter Home in Phoenix",
    location: "Phoenix, AZ",
    price: 285000,
    beds: 3,
    baths: 2,
    sqft: 1450,
    image: "/placeholder.svg?height=200&width=300&text=Phoenix+Starter+Home",
    investmentGrade: "B+",
    ownerWealth: "Middle Class",
  },
  {
    id: 2,
    title: "Family Home in Atlanta",
    location: "Atlanta, GA",
    price: 485000,
    beds: 4,
    baths: 3,
    sqft: 2200,
    image: "/placeholder.svg?height=200&width=300&text=Atlanta+Family+Home",
    investmentGrade: "A-",
    ownerWealth: "Upper Middle",
  },
  {
    id: 3,
    title: "Executive Estate in Dallas",
    location: "Dallas, TX",
    price: 1250000,
    beds: 5,
    baths: 4,
    sqft: 3800,
    image: "/placeholder.svg?height=200&width=300&text=Dallas+Executive+Estate",
    investmentGrade: "A",
    ownerWealth: "High Net Worth",
  },
  {
    id: 4,
    title: "Luxury Penthouse in Austin",
    location: "Austin, TX",
    price: 2850000,
    beds: 3,
    baths: 3,
    sqft: 2800,
    image: "/placeholder.svg?height=200&width=300&text=Austin+Luxury+Penthouse",
    investmentGrade: "A+",
    ownerWealth: "Ultra High",
  },
  {
    id: 5,
    title: "Affordable Condo in Charlotte",
    location: "Charlotte, NC",
    price: 195000,
    beds: 2,
    baths: 1,
    sqft: 950,
    image: "/placeholder.svg?height=200&width=300&text=Charlotte+Affordable+Condo",
    investmentGrade: "B",
    ownerWealth: "Working Class",
  },
  {
    id: 6,
    title: "Modern Townhouse in Denver",
    location: "Denver, CO",
    price: 675000,
    beds: 3,
    baths: 3,
    sqft: 1850,
    image: "/placeholder.svg?height=200&width=300&text=Denver+Modern+Townhouse",
    investmentGrade: "A-",
    ownerWealth: "Professional",
  },
]

export default function BuyPage() {
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
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&type=buy`)
        const data = await response.json()

        // Filter for buy properties and add realistic pricing
        const buyProperties = data.results?.filter((r: any) => r.type === "property") || []
        setSearchResults(buyProperties)
      } catch (error) {
        console.error("Search error:", error)
        setSearchResults([])
      } finally {
        setLoading(false)
      }
    }
  }

  const formatPrice = (price: number) => {
    if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`
    if (price >= 1000) return `$${Math.round(price / 1000)}K`
    return `$${price.toLocaleString()}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      <Header />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Trust Badge */}
          <div className="mb-6">
            <Badge className="bg-emerald-100 text-emerald-800 px-4 py-2 text-sm font-medium">
              Properties for every budget
            </Badge>
          </div>

          {/* Main Headlines */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">Find your dream home</h1>
          <h2 className="text-2xl sm:text-3xl text-gray-700 mb-4">From Starter Homes to Luxury Estates</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover properties across all price ranges with verified owner information
          </p>

          {/* Search Bar */}
          <Card className="bg-white shadow-lg border-0 max-w-2xl mx-auto mb-8">
            <CardContent className="p-6">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search Properties to Buy..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-12 h-14 text-lg border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg"
                />
                <Button
                  onClick={handleSearch}
                  className="absolute right-2 top-2 h-10 px-6 bg-emerald-600 hover:bg-emerald-700"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Top Cities */}
          <div className="mb-12">
            <p className="text-sm text-gray-600 mb-4">
              <span className="font-medium">Popular Markets:</span>
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {topCities.map((city) => (
                <Button
                  key={city}
                  variant="outline"
                  size="sm"
                  className="rounded-full bg-white hover:bg-emerald-50 border-gray-300"
                  onClick={() => {
                    setSearchQuery(city)
                    handleSearch()
                  }}
                >
                  {city}
                </Button>
              ))}
              <Button variant="outline" size="sm" className="rounded-full bg-white hover:bg-emerald-50 border-gray-300">
                More →
              </Button>
            </div>
          </div>

          {/* Price Range Info */}
          <div className="mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-emerald-600">$150K+</div>
                <div className="text-sm text-gray-600">Starter Homes</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600">$300K+</div>
                <div className="text-sm text-gray-600">Family Homes</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-purple-600">$600K+</div>
                <div className="text-sm text-gray-600">Executive Homes</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-orange-600">$1M+</div>
                <div className="text-sm text-gray-600">Luxury Estates</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Properties Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Properties Across All Price Ranges</h3>
            <p className="text-gray-600">From affordable starter homes to luxury estates</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {featuredProperties.map((property) => (
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
                  <Badge className="absolute top-2 left-2 bg-emerald-500 text-white">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-lg">{property.title}</h4>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {property.investmentGrade}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{property.location}</span>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      <span>{property.beds}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      <span>{property.baths}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Square className="h-4 w-4" />
                      <span>{property.sqft.toLocaleString()} sqft</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-1">Owner Profile</div>
                    <Badge variant="outline" className="text-xs">
                      {property.ownerWealth}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-5 w-5 text-gray-500" />
                      <span className="text-xl font-bold">{formatPrice(property.price)}</span>
                    </div>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              Browse All Properties
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
                  Properties for Sale {searchQuery && `in ${searchQuery}`}
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
