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
  Building,
  Utensils,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SearchResults } from "@/components/search-results"
import { PropertyFilters } from "@/components/property-filters"

const topCities = ["Boston", "Austin", "Atlanta", "Phoenix", "Denver", "Nashville", "Charlotte", "Tampa"]

const rentalCategories = [
  { id: "apartments", label: "Apartments", icon: Building },
  { id: "rooms", label: "Rooms", icon: Bed },
  { id: "hostels", label: "Hostels", icon: Users },
  { id: "pgs", label: "PGs", icon: Home },
]

const featuredRentals = [
  // Student Accommodations - Rooms
  {
    id: 1,
    title: "Shared Room near Harvard",
    location: "Cambridge, MA",
    price: 750,
    beds: 1,
    baths: 1,
    sqft: 200,
    type: "room",
    image: "/placeholder.svg?height=200&width=300&text=Harvard+Shared+Room",
    rating: 4.3,
    verified: true,
    amenities: ["WiFi", "Study Desk", "Shared Kitchen"],
    studentFriendly: true,
    roommates: 2,
  },
  {
    id: 2,
    title: "Cozy Room with Study Space",
    location: "Austin, TX",
    price: 650,
    beds: 1,
    baths: 1,
    sqft: 180,
    type: "room",
    image: "/placeholder.svg?height=200&width=300&text=Austin+Study+Room",
    rating: 4.5,
    verified: true,
    amenities: ["WiFi", "Study Desk", "AC"],
    studentFriendly: true,
    roommates: 3,
  },
  // Hostels
  {
    id: 3,
    title: "Modern Student Hostel",
    location: "Austin, TX",
    price: 450,
    beds: 1,
    baths: 1,
    sqft: 150,
    type: "hostel",
    image: "/placeholder.svg?height=200&width=300&text=Austin+Modern+Hostel",
    rating: 4.1,
    verified: true,
    amenities: ["WiFi", "Common Kitchen", "Study Room"],
    studentFriendly: true,
    capacity: 8,
  },
  {
    id: 4,
    title: "Budget Hostel near Campus",
    location: "Atlanta, GA",
    price: 380,
    beds: 1,
    baths: 1,
    sqft: 120,
    type: "hostel",
    image: "/placeholder.svg?height=200&width=300&text=Atlanta+Budget+Hostel",
    rating: 3.9,
    verified: true,
    amenities: ["WiFi", "Shared Kitchen", "Study Area"],
    studentFriendly: true,
    capacity: 12,
  },
  // PGs
  {
    id: 5,
    title: "Premium PG with Meals",
    location: "Atlanta, GA",
    price: 950,
    beds: 1,
    baths: 1,
    sqft: 180,
    type: "pg",
    image: "/placeholder.svg?height=200&width=300&text=Atlanta+Premium+PG",
    rating: 4.6,
    verified: true,
    amenities: ["Meals Included", "WiFi", "AC", "Housekeeping"],
    studentFriendly: true,
    meals: true,
  },
  {
    id: 6,
    title: "Budget PG near University",
    location: "Nashville, TN",
    price: 750,
    beds: 1,
    baths: 1,
    sqft: 160,
    type: "pg",
    image: "/placeholder.svg?height=200&width=300&text=Nashville+Budget+PG",
    rating: 4.2,
    verified: true,
    amenities: ["Meals Included", "WiFi", "Study Area"],
    studentFriendly: true,
    meals: true,
  },
  // Regular Apartments
  {
    id: 7,
    title: "Affordable Studio Apartment",
    location: "Phoenix, AZ",
    price: 1200,
    beds: 0,
    baths: 1,
    sqft: 450,
    type: "apartment",
    image: "/placeholder.svg?height=200&width=300&text=Phoenix+Studio+Apartment",
    rating: 4.2,
    verified: true,
    amenities: ["Pool", "Gym", "Parking"],
    studentFriendly: false,
  },
  {
    id: 8,
    title: "Family Townhouse",
    location: "Denver, CO",
    price: 2800,
    beds: 3,
    baths: 2,
    sqft: 1400,
    type: "apartment",
    image: "/placeholder.svg?height=200&width=300&text=Denver+Family+Townhouse",
    rating: 4.7,
    verified: true,
    amenities: ["Garage", "Garden", "Pet Friendly"],
    studentFriendly: false,
  },
]

export default function RentPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("apartments")
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

      // Use only mock data - no API calls
      const allRentals = featuredRentals.filter((rental) => {
        if (activeCategory === "apartments") {
          return rental.type === "apartment"
        }
        return rental.type === activeCategory
      })

      const mockResults = allRentals
        .filter((property) => {
          const queryLower = searchQuery.toLowerCase()
          return (
            property.title.toLowerCase().includes(queryLower) ||
            property.location.toLowerCase().includes(queryLower) ||
            queryLower.includes("all")
          )
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
          category: property.type,
          image: property.image,
          rating: property.rating,
          verified: property.verified,
          amenities: property.amenities,
          studentFriendly: property.studentFriendly,
          roommates: property.roommates,
          capacity: property.capacity,
          meals: property.meals,
        }))

      setSearchResults(mockResults)
      setLoading(false)
    }
  }

  const handleBrowseAll = () => {
    setLoading(true)
    setShowResults(true)

    // Generate mock search results based on category
    const mockResults = getFilteredRentals().map((property, index) => ({
      id: property.id,
      title: property.title,
      location: property.location,
      price: property.price,
      beds: property.beds,
      baths: property.baths,
      sqft: property.sqft,
      type: "property",
      category: property.type,
      image: property.image,
      rating: property.rating,
      verified: property.verified,
      amenities: property.amenities,
      studentFriendly: property.studentFriendly,
      roommates: property.roommates,
      capacity: property.capacity,
      meals: property.meals,
    }))

    setSearchResults(mockResults)
    setSearchQuery(`All ${rentalCategories.find((c) => c.id === activeCategory)?.label}`)
    setLoading(false)
  }

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`
  }

  const getFilteredRentals = () => {
    if (activeCategory === "apartments") {
      return featuredRentals.filter((r) => r.type === "apartment")
    }
    return featuredRentals.filter((r) => r.type === activeCategory)
  }

  const getCategoryInfo = () => {
    switch (activeCategory) {
      case "rooms":
        return {
          title: "Find compatible roommates",
          subtitle: "Shared Rooms & Flatmates",
          description: "Share your room with right roommates",
          priceRange: "$400 - $1,200",
          illustration: "Student+Roommates+Illustration",
        }
      case "hostels":
        return {
          title: "Affordable student hostels",
          subtitle: "Budget-Friendly Accommodations",
          description: "Safe and affordable stays for students",
          priceRange: "$300 - $800",
          illustration: "Student+Hostel+Illustration",
        }
      case "pgs":
        return {
          title: "Premium paying guest stays",
          subtitle: "PGs with Meals & Amenities",
          description: "Comfortable stays with food and facilities",
          priceRange: "$600 - $1,500",
          illustration: "Premium+PG+Illustration",
        }
      default:
        return {
          title: "Find your perfect rental",
          subtitle: "Apartments & Houses",
          description: "Discover rental properties across all budgets",
          priceRange: "$800 - $8,000",
          illustration: "Rental+Properties+Illustration",
        }
    }
  }

  const categoryInfo = getCategoryInfo()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Trust Badge */}
          <div className="mb-6">
            <Badge className="bg-purple-100 text-purple-800 px-4 py-2 text-sm font-medium">
              {activeCategory === "apartments"
                ? "Trusted by renters nationwide"
                : "Trusted by students & young professionals"}
            </Badge>
          </div>

          {/* Category Navigation */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
              {rentalCategories.map((category) => {
                const Icon = category.icon
                const isActive = activeCategory === category.id
                return (
                  <Button
                    key={category.id}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    className={`flex items-center gap-2 ${
                      isActive ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-blue-50 border-gray-300"
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{category.label}</span>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Dynamic Headlines */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">{categoryInfo.title}</h1>
          <h2 className="text-2xl sm:text-3xl text-gray-700 mb-4">{categoryInfo.subtitle}</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">{categoryInfo.description}</p>

          {/* Search Bar */}
          <Card className="bg-white shadow-lg border-0 max-w-2xl mx-auto mb-8">
            <CardContent className="p-6">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search Places..."
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
              <span className="font-medium">
                {activeCategory === "apartments" ? "Popular Cities:" : "Top Student Cities:"}
              </span>
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
            <div className="text-center p-4 bg-white rounded-lg shadow-sm max-w-md mx-auto">
              <div className="text-2xl font-bold text-blue-600">{categoryInfo.priceRange}</div>
              <div className="text-sm text-gray-600">per month</div>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative mb-12">
            <div
              className="w-full h-64 bg-cover bg-center bg-no-repeat rounded-lg"
              style={{
                backgroundImage: `url('/placeholder.svg?height=256&width=600&text=${categoryInfo.illustration}')`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {activeCategory === "apartments"
                ? "Rentals Across All Budgets"
                : `Featured ${rentalCategories.find((c) => c.id === activeCategory)?.label}`}
            </h3>
            <p className="text-gray-600">
              {activeCategory === "apartments"
                ? "From affordable studios to luxury penthouses"
                : `${categoryInfo.priceRange} per month`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {getFilteredRentals().map((property) => (
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
                  {property.studentFriendly && (
                    <Badge className="absolute bottom-2 left-2 bg-blue-500 text-white">
                      <GraduationCap className="h-3 w-3 mr-1" />
                      Student Friendly
                    </Badge>
                  )}
                  {property.meals && (
                    <Badge className="absolute bottom-2 right-2 bg-orange-500 text-white">
                      <Utensils className="h-3 w-3 mr-1" />
                      Meals
                    </Badge>
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
                    {property.roommates && (
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{property.roommates}</span>
                      </div>
                    )}
                    {property.capacity && (
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{property.capacity}</span>
                      </div>
                    )}
                  </div>

                  {/* Amenities */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {property.amenities.slice(0, 3).map((amenity, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
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
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={handleBrowseAll}>
              Browse All {rentalCategories.find((c) => c.id === activeCategory)?.label}
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
                  {rentalCategories.find((c) => c.id === activeCategory)?.label} {searchQuery && `in ${searchQuery}`}
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
