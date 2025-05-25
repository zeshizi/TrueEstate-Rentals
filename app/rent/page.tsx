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

// Comprehensive room rental mock data
const featuredRentals = [
  // Student Accommodations - Rooms Only
  {
    id: 1,
    title: "Shared Room near Harvard University",
    location: "Cambridge, MA",
    price: 750,
    beds: 1,
    baths: 1,
    sqft: 200,
    type: "room",
    image: "/placeholder.svg?height=200&width=300&text=Harvard+Shared+Room",
    rating: 4.3,
    verified: true,
    amenities: ["WiFi", "Study Desk", "Shared Kitchen", "Laundry"],
    studentFriendly: true,
    roommates: 2,
    gender: "Mixed",
    furnished: true,
    utilities: "Included",
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
    amenities: ["WiFi", "Study Desk", "AC", "Parking"],
    studentFriendly: true,
    roommates: 3,
    gender: "Female Only",
    furnished: true,
    utilities: "Included",
  },
  {
    id: 3,
    title: "Private Room in Shared House",
    location: "Atlanta, GA",
    price: 580,
    beds: 1,
    baths: 1,
    sqft: 150,
    type: "room",
    image: "/placeholder.svg?height=200&width=300&text=Atlanta+Private+Room",
    rating: 4.2,
    verified: true,
    amenities: ["WiFi", "Private Bathroom", "Garden Access", "Kitchen"],
    studentFriendly: true,
    roommates: 2,
    gender: "Mixed",
    furnished: false,
    utilities: "Separate",
  },
  {
    id: 4,
    title: "Room near University of Phoenix",
    location: "Phoenix, AZ",
    price: 520,
    beds: 1,
    baths: 1,
    sqft: 160,
    type: "room",
    image: "/placeholder.svg?height=200&width=300&text=Phoenix+University+Room",
    rating: 4.0,
    verified: true,
    amenities: ["WiFi", "Study Area", "Pool Access", "Gym"],
    studentFriendly: true,
    roommates: 4,
    gender: "Male Only",
    furnished: true,
    utilities: "Included",
  },
  {
    id: 5,
    title: "Spacious Room in Denver",
    location: "Denver, CO",
    price: 680,
    beds: 1,
    baths: 1,
    sqft: 220,
    type: "room",
    image: "/placeholder.svg?height=200&width=300&text=Denver+Spacious+Room",
    rating: 4.6,
    verified: true,
    amenities: ["WiFi", "Mountain View", "Fireplace", "Balcony"],
    studentFriendly: true,
    roommates: 2,
    gender: "Mixed",
    furnished: true,
    utilities: "Included",
  },
  {
    id: 6,
    title: "Room near Vanderbilt University",
    location: "Nashville, TN",
    price: 620,
    beds: 1,
    baths: 1,
    sqft: 170,
    type: "room",
    image: "/placeholder.svg?height=200&width=300&text=Nashville+Vanderbilt+Room",
    rating: 4.4,
    verified: true,
    amenities: ["WiFi", "Music Room", "Study Lounge", "Parking"],
    studentFriendly: true,
    roommates: 3,
    gender: "Female Only",
    furnished: true,
    utilities: "Included",
  },
  {
    id: 7,
    title: "Modern Room in Charlotte",
    location: "Charlotte, NC",
    price: 590,
    beds: 1,
    baths: 1,
    sqft: 185,
    type: "room",
    image: "/placeholder.svg?height=200&width=300&text=Charlotte+Modern+Room",
    rating: 4.3,
    verified: true,
    amenities: ["WiFi", "Modern Kitchen", "Rooftop Access", "Security"],
    studentFriendly: true,
    roommates: 2,
    gender: "Mixed",
    furnished: true,
    utilities: "Included",
  },
  {
    id: 8,
    title: "Room near University of Tampa",
    location: "Tampa, FL",
    price: 550,
    beds: 1,
    baths: 1,
    sqft: 165,
    type: "room",
    image: "/placeholder.svg?height=200&width=300&text=Tampa+University+Room",
    rating: 4.1,
    verified: true,
    amenities: ["WiFi", "Beach Access", "Pool", "Study Room"],
    studentFriendly: true,
    roommates: 3,
    gender: "Mixed",
    furnished: true,
    utilities: "Included",
  },
  {
    id: 9,
    title: "Quiet Room for Graduate Students",
    location: "Cambridge, MA",
    price: 800,
    beds: 1,
    baths: 1,
    sqft: 210,
    type: "room",
    image: "/placeholder.svg?height=200&width=300&text=Cambridge+Graduate+Room",
    rating: 4.7,
    verified: true,
    amenities: ["WiFi", "Private Study", "Library Access", "Quiet Hours"],
    studentFriendly: true,
    roommates: 1,
    gender: "Mixed",
    furnished: true,
    utilities: "Included",
  },
  {
    id: 10,
    title: "Affordable Room in Shared Apartment",
    location: "Austin, TX",
    price: 480,
    beds: 1,
    baths: 1,
    sqft: 140,
    type: "room",
    image: "/placeholder.svg?height=200&width=300&text=Austin+Affordable+Room",
    rating: 3.9,
    verified: true,
    amenities: ["WiFi", "Shared Kitchen", "Laundry", "Bike Storage"],
    studentFriendly: true,
    roommates: 4,
    gender: "Mixed",
    furnished: false,
    utilities: "Separate",
  },
  {
    id: 11,
    title: "Room with Private Entrance",
    location: "Atlanta, GA",
    price: 720,
    beds: 1,
    baths: 1,
    sqft: 190,
    type: "room",
    image: "/placeholder.svg?height=200&width=300&text=Atlanta+Private+Entrance",
    rating: 4.5,
    verified: true,
    amenities: ["WiFi", "Private Entrance", "Kitchenette", "Parking"],
    studentFriendly: true,
    roommates: 1,
    gender: "Female Only",
    furnished: true,
    utilities: "Included",
  },
  {
    id: 12,
    title: "Room in Tech Professional House",
    location: "Phoenix, AZ",
    price: 650,
    beds: 1,
    baths: 1,
    sqft: 175,
    type: "room",
    image: "/placeholder.svg?height=200&width=300&text=Phoenix+Tech+House",
    rating: 4.4,
    verified: true,
    amenities: ["WiFi", "Home Office", "High-Speed Internet", "Gaming Room"],
    studentFriendly: true,
    roommates: 3,
    gender: "Mixed",
    furnished: true,
    utilities: "Included",
  },
  {
    id: 13,
    title: "Room near Downtown Denver",
    location: "Denver, CO",
    price: 750,
    beds: 1,
    baths: 1,
    sqft: 200,
    type: "room",
    image: "/placeholder.svg?height=200&width=300&text=Denver+Downtown+Room",
    rating: 4.2,
    verified: true,
    amenities: ["WiFi", "City View", "Public Transport", "Restaurants Nearby"],
    studentFriendly: true,
    roommates: 2,
    gender: "Mixed",
    furnished: true,
    utilities: "Included",
  },
  {
    id: 14,
    title: "Room in Music City",
    location: "Nashville, TN",
    price: 580,
    beds: 1,
    baths: 1,
    sqft: 155,
    type: "room",
    image: "/placeholder.svg?height=200&width=300&text=Nashville+Music+Room",
    rating: 4.3,
    verified: true,
    amenities: ["WiFi", "Soundproof", "Music Studio", "Creative Space"],
    studentFriendly: true,
    roommates: 2,
    gender: "Mixed",
    furnished: true,
    utilities: "Included",
  },
  {
    id: 15,
    title: "Room in Banking District",
    location: "Charlotte, NC",
    price: 670,
    beds: 1,
    baths: 1,
    sqft: 180,
    type: "room",
    image: "/placeholder.svg?height=200&width=300&text=Charlotte+Banking+Room",
    rating: 4.1,
    verified: true,
    amenities: ["WiFi", "Business Center", "Networking Events", "Professional"],
    studentFriendly: true,
    roommates: 2,
    gender: "Mixed",
    furnished: true,
    utilities: "Included",
  },
  {
    id: 16,
    title: "Beachside Room",
    location: "Tampa, FL",
    price: 690,
    beds: 1,
    baths: 1,
    sqft: 195,
    type: "room",
    image: "/placeholder.svg?height=200&width=300&text=Tampa+Beachside+Room",
    rating: 4.6,
    verified: true,
    amenities: ["WiFi", "Beach View", "Surfboard Storage", "Outdoor Shower"],
    studentFriendly: true,
    roommates: 2,
    gender: "Mixed",
    furnished: true,
    utilities: "Included",
  },
]

export default function RentPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("rooms")
  const router = useRouter()
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const searchParams = useSearchParams()

  useEffect(() => {
    try {
      const query = searchParams.get("q")
      const minValue = searchParams.get("minValue")
      const maxValue = searchParams.get("maxValue")
      const category = searchParams.get("category")

      console.log("Rent page - Raw searchParams object:", searchParams)
      console.log("Rent page - Individual params:", {
        query,
        minValue,
        maxValue,
        category,
        searchParamsEntries: searchParams ? Object.fromEntries(searchParams.entries()) : "searchParams is null",
      })

      if (query) {
        setSearchQuery(query)
        handleSearch()
      }
    } catch (error) {
      console.error("Error in Rent page useEffect:", error)
    }
  }, [searchParams])

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      setLoading(true)
      setShowResults(true)

      // Filter only room properties
      const allRentals = featuredRentals.filter((rental) => rental.type === "room")

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
          gender: property.gender,
          furnished: property.furnished,
          utilities: property.utilities,
        }))

      setSearchResults(mockResults)
      setLoading(false)
    }
  }

  const handleBrowseAll = () => {
    setLoading(true)
    setShowResults(true)

    // Generate mock search results - only rooms
    const mockResults = featuredRentals.map((property) => ({
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
      gender: property.gender,
      furnished: property.furnished,
      utilities: property.utilities,
    }))

    setSearchResults(mockResults)
    setSearchQuery("All Rooms")
    setLoading(false)
  }

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`
  }

  const getFilteredRentals = () => {
    // Always return room properties only
    return featuredRentals.filter((r) => r.type === "room")
  }

  const getCategoryInfo = () => {
    return {
      title: "Find compatible roommates",
      subtitle: "Shared Rooms & Flatmates",
      description: "Share your room with right roommates",
      priceRange: "$480 - $800",
      illustration: "Student+Roommates+Illustration",
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
              Trusted by students & young professionals
            </Badge>
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
              <span className="font-medium">Top Student Cities:</span>
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
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Featured Shared Rooms</h3>
            <p className="text-gray-600">{categoryInfo.priceRange} per month</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {getFilteredRentals()
              .slice(0, 6)
              .map((property) => (
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
                    <Badge className="absolute bottom-2 left-2 bg-blue-500 text-white">
                      <GraduationCap className="h-3 w-3 mr-1" />
                      Student Friendly
                    </Badge>
                    {property.furnished && (
                      <Badge className="absolute bottom-2 right-2 bg-orange-500 text-white">Furnished</Badge>
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
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{property.roommates}</span>
                      </div>
                    </div>

                    {/* Room Details */}
                    <div className="mb-4 text-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-600">Gender:</span>
                        <span className="font-medium">{property.gender}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Utilities:</span>
                        <span className="font-medium">{property.utilities}</span>
                      </div>
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
              Browse All Rooms
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
                <h3 className="text-2xl font-bold text-gray-900">Shared Rooms {searchQuery && `in ${searchQuery}`}</h3>
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
