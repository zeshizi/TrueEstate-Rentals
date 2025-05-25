"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  MapPin,
  Search,
  Bed,
  Bath,
  Square,
  DollarSign,
  Heart,
  Star,
  Users,
  GraduationCap,
  Home,
  User,
  TrendingUp,
  Shield,
  Bookmark,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SearchResults } from "@/components/search-results"
import { PropertyFilters } from "@/components/property-filters"

const topCities = ["Boston", "Austin", "Atlanta", "Phoenix", "Denver", "Nashville", "Charlotte", "Tampa"]

// Comprehensive mock data for student rentals and properties for sale
const allProperties = [
  // Student Rental Properties
  {
    id: 1,
    title: "Shared Room near Harvard University",
    location: "Cambridge, MA",
    price: 750,
    beds: 1,
    baths: 1,
    sqft: 200,
    type: "rent",
    category: "room",
    image: "/placeholder.svg?height=200&width=300&text=Harvard+Shared+Room",
    rating: 4.3,
    verified: true,
    amenities: ["WiFi", "Study Desk", "Shared Kitchen", "Laundry"],
    studentFriendly: true,
    roommates: 2,
    gender: "Mixed",
    furnished: true,
    utilities: "Included",
    ownerName: "Sarah Johnson",
    ownerWealth: "Upper Middle Class",
    ownerType: "Individual",
  },
  {
    id: 2,
    title: "Modern Student Apartment",
    location: "Austin, TX",
    price: 1200,
    beds: 2,
    baths: 1,
    sqft: 800,
    type: "rent",
    category: "apartment",
    image: "/placeholder.svg?height=200&width=300&text=Austin+Student+Apartment",
    rating: 4.5,
    verified: true,
    amenities: ["WiFi", "Pool", "Gym", "Study Lounge"],
    studentFriendly: true,
    furnished: true,
    utilities: "Included",
    ownerName: "Austin Student Housing LLC",
    ownerWealth: "Corporate",
    ownerType: "Company",
  },
  {
    id: 3,
    title: "Budget-Friendly Room",
    location: "Atlanta, GA",
    price: 580,
    beds: 1,
    baths: 1,
    sqft: 150,
    type: "rent",
    category: "room",
    image: "/placeholder.svg?height=200&width=300&text=Atlanta+Budget+Room",
    rating: 4.2,
    verified: true,
    amenities: ["WiFi", "Kitchen Access", "Parking"],
    studentFriendly: true,
    roommates: 3,
    gender: "Female Only",
    furnished: true,
    utilities: "Separate",
    ownerName: "Maria Rodriguez",
    ownerWealth: "Middle Class",
    ownerType: "Individual",
  },
  {
    id: 4,
    title: "Premium Student Housing",
    location: "Phoenix, AZ",
    price: 950,
    beds: 1,
    baths: 1,
    sqft: 400,
    type: "rent",
    category: "studio",
    image: "/placeholder.svg?height=200&width=300&text=Phoenix+Premium+Studio",
    rating: 4.6,
    verified: true,
    amenities: ["WiFi", "Pool", "Gym", "Concierge"],
    studentFriendly: true,
    furnished: true,
    utilities: "Included",
    ownerName: "Phoenix Student Living Corp",
    ownerWealth: "High Net Worth",
    ownerType: "Company",
  },
  {
    id: 5,
    title: "Cozy Room near University",
    location: "Denver, CO",
    price: 680,
    beds: 1,
    baths: 1,
    sqft: 220,
    type: "rent",
    category: "room",
    image: "/placeholder.svg?height=200&width=300&text=Denver+University+Room",
    rating: 4.4,
    verified: true,
    amenities: ["WiFi", "Mountain View", "Study Area"],
    studentFriendly: true,
    roommates: 2,
    gender: "Mixed",
    furnished: true,
    utilities: "Included",
    ownerName: "David Chen",
    ownerWealth: "Professional",
    ownerType: "Individual",
  },
  {
    id: 6,
    title: "Music City Student Room",
    location: "Nashville, TN",
    price: 620,
    beds: 1,
    baths: 1,
    sqft: 170,
    type: "rent",
    category: "room",
    image: "/placeholder.svg?height=200&width=300&text=Nashville+Music+Room",
    rating: 4.3,
    verified: true,
    amenities: ["WiFi", "Music Room", "Study Lounge"],
    studentFriendly: true,
    roommates: 3,
    gender: "Mixed",
    furnished: true,
    utilities: "Included",
    ownerName: "Nashville Properties Inc",
    ownerWealth: "Corporate",
    ownerType: "Company",
  },
  // Properties for Sale
  {
    id: 7,
    title: "Starter Home in Phoenix",
    location: "Phoenix, AZ",
    price: 285000,
    beds: 3,
    baths: 2,
    sqft: 1450,
    type: "buy",
    category: "house",
    image: "/placeholder.svg?height=200&width=300&text=Phoenix+Starter+Home",
    verified: true,
    investmentGrade: "B+",
    ownerName: "Michael Thompson",
    ownerWealth: "Middle Class",
    ownerType: "Individual",
  },
  {
    id: 8,
    title: "Family Home in Atlanta",
    location: "Atlanta, GA",
    price: 485000,
    beds: 4,
    baths: 3,
    sqft: 2200,
    type: "buy",
    category: "house",
    image: "/placeholder.svg?height=200&width=300&text=Atlanta+Family+Home",
    verified: true,
    investmentGrade: "A-",
    ownerName: "Jennifer Williams",
    ownerWealth: "Upper Middle Class",
    ownerType: "Individual",
  },
  {
    id: 9,
    title: "Executive Estate in Dallas",
    location: "Dallas, TX",
    price: 1250000,
    beds: 5,
    baths: 4,
    sqft: 3800,
    type: "buy",
    category: "house",
    image: "/placeholder.svg?height=200&width=300&text=Dallas+Executive+Estate",
    verified: true,
    investmentGrade: "A",
    ownerName: "Robert Davis",
    ownerWealth: "High Net Worth",
    ownerType: "Individual",
  },
  {
    id: 10,
    title: "Luxury Penthouse in Austin",
    location: "Austin, TX",
    price: 2850000,
    beds: 3,
    baths: 3,
    sqft: 2800,
    type: "buy",
    category: "condo",
    image: "/placeholder.svg?height=200&width=300&text=Austin+Luxury+Penthouse",
    verified: true,
    investmentGrade: "A+",
    ownerName: "Austin Luxury Holdings",
    ownerWealth: "Ultra High Net Worth",
    ownerType: "Company",
  },
]

export default function PropertyOwnerSearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState<"properties" | "owners">("properties")
  const [propertyType, setPropertyType] = useState<"all" | "rent" | "buy">("all")
  const router = useRouter()
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const searchParams = useSearchParams()

  useEffect(() => {
    try {
      const query = searchParams.get("q")
      const type = searchParams.get("type") // rent or buy
      const minValue = searchParams.get("minValue")
      const maxValue = searchParams.get("maxValue")

      if (query) {
        setSearchQuery(query)
      }
      if (type) {
        setPropertyType(type as "rent" | "buy")
      }

      // Auto-search if query is provided
      if (query) {
        handleSearch()
      }

      console.log("Property Owner Search page params:", {
        query,
        type,
        minValue,
        maxValue,
      })
    } catch (error) {
      console.error("Error in Property Owner Search page useEffect:", error)
    }
  }, [searchParams])

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      setLoading(true)
      setShowResults(true)

      let filteredProperties = allProperties

      // Filter by property type (rent/buy)
      if (propertyType !== "all") {
        filteredProperties = filteredProperties.filter((property) => property.type === propertyType)
      }

      // Filter by search query
      const mockResults = filteredProperties
        .filter((property) => {
          const queryLower = searchQuery.toLowerCase()
          if (searchType === "properties") {
            return (
              property.title.toLowerCase().includes(queryLower) ||
              property.location.toLowerCase().includes(queryLower) ||
              property.category.toLowerCase().includes(queryLower) ||
              queryLower.includes("all")
            )
          } else {
            // Owner search
            return (
              property.ownerName.toLowerCase().includes(queryLower) ||
              property.ownerWealth.toLowerCase().includes(queryLower) ||
              property.ownerType.toLowerCase().includes(queryLower)
            )
          }
        })
        .map((property) => ({
          id: property.id,
          title: property.title,
          location: property.location,
          price: property.price,
          beds: property.beds,
          baths: property.baths,
          sqft: property.sqft,
          type: "property",
          category: property.category,
          image: property.image,
          rating: property.rating,
          verified: property.verified,
          amenities: property.amenities,
          studentFriendly: property.studentFriendly,
          roommates: property.roommates,
          gender: property.gender,
          furnished: property.furnished,
          utilities: property.utilities,
          ownerName: property.ownerName,
          ownerWealth: property.ownerWealth,
          ownerType: property.ownerType,
          investmentGrade: property.investmentGrade,
          propertyType: property.type,
        }))

      setSearchResults(mockResults)
      setLoading(false)
    }
  }

  const formatPrice = (price: number, type: string) => {
    if (type === "rent") {
      return `$${price.toLocaleString()}/month`
    } else {
      if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`
      if (price >= 1000) return `$${Math.round(price / 1000)}K`
      return `$${price.toLocaleString()}`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Trust Badge */}
          <div className="mb-6">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm font-medium">
              Advanced Property & Owner Intelligence
            </Badge>
          </div>

          {/* Main Headlines */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">Property & Owner Search</h1>
          <h2 className="text-2xl sm:text-3xl text-gray-700 mb-4">Find Properties and Discover Owner Information</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Search for rental properties, homes for sale, and get detailed owner insights
          </p>

          {/* Search Type Toggle */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-white rounded-lg p-1 shadow-lg">
              <button
                onClick={() => setSearchType("properties")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
                  searchType === "properties" ? "bg-blue-600 text-white shadow-md" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Home className="h-4 w-4" />
                Properties
              </button>
              <button
                onClick={() => setSearchType("owners")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
                  searchType === "owners" ? "bg-blue-600 text-white shadow-md" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <User className="h-4 w-4" />
                Owners
              </button>
            </div>
          </div>

          {/* Property Type Filter */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white rounded-lg p-1 shadow-lg">
              {[
                { key: "all", label: "All" },
                { key: "rent", label: "Rent" },
                { key: "buy", label: "Buy" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setPropertyType(key as any)}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    propertyType === key ? "bg-blue-600 text-white shadow-md" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <Card className="bg-white shadow-lg border-0 max-w-2xl mx-auto mb-8">
            <CardContent className="p-6">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder={
                    searchType === "properties"
                      ? "Search properties by location, type, or features..."
                      : "Search by owner name, wealth level, or type..."
                  }
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
              <span className="font-medium">Popular Cities:</span>
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
            </div>
          </div>
        </div>
      </div>

      {/* Search Results Section */}
      {showResults && (
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">
                  {searchType === "properties" ? "Properties" : "Property Owners"}{" "}
                  {searchQuery && `for "${searchQuery}"`}
                </h3>
                <div className="flex items-center gap-4">
                  <Button variant="outline" onClick={() => router.push("/bookmarks")} className="text-gray-600">
                    <Bookmark className="h-4 w-4 mr-2" />
                    View Bookmarks
                  </Button>
                  <Button variant="outline" onClick={() => setShowResults(false)} className="text-gray-600">
                    Clear Results
                  </Button>
                </div>
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

      {/* Featured Properties Section */}
      {!showResults && (
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Featured Properties</h3>
              <p className="text-gray-600">Student rentals and properties for sale</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {allProperties.slice(0, 6).map((property) => (
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
                      <Badge className="absolute top-2 left-2 bg-green-500 text-white">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {property.studentFriendly && (
                      <Badge className="absolute bottom-2 left-2 bg-blue-500 text-white">
                        <GraduationCap className="h-3 w-3 mr-1" />
                        Student Friendly
                      </Badge>
                    )}
                    {property.investmentGrade && (
                      <Badge className="absolute bottom-2 right-2 bg-purple-500 text-white">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {property.investmentGrade}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-lg">{property.title}</h4>
                      {property.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600">{property.rating}</span>
                        </div>
                      )}
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
                        <span>{property.sqft} sqft</span>
                      </div>
                      {property.roommates && (
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{property.roommates}</span>
                        </div>
                      )}
                    </div>

                    {/* Owner Information */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="text-xs text-gray-500 mb-1">Owner Information</div>
                      <div className="text-sm font-medium">{property.ownerName}</div>
                      <div className="text-xs text-gray-600">{property.ownerWealth}</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-5 w-5 text-gray-500" />
                        <span className="text-xl font-bold">{formatPrice(property.price, property.type)}</span>
                      </div>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
