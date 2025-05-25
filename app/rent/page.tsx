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

const topCities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
]

const featuredRentals = [
  {
    id: 1,
    title: "Luxury Apartment in Manhattan",
    location: "New York, NY",
    price: 8500,
    beds: 2,
    baths: 2,
    sqft: 1500,
    image: "/placeholder.svg?height=200&width=300&text=Luxury+Manhattan+Apartment",
    rating: 4.9,
    verified: true,
  },
  {
    id: 2,
    title: "Modern Condo with City View",
    location: "Los Angeles, CA",
    price: 6800,
    beds: 1,
    baths: 1,
    sqft: 1200,
    image: "/placeholder.svg?height=200&width=300&text=Modern+LA+Condo",
    rating: 4.8,
    verified: true,
  },
  {
    id: 3,
    title: "Spacious Loft in Downtown",
    location: "Chicago, IL",
    price: 4200,
    beds: 2,
    baths: 2,
    sqft: 1800,
    image: "/placeholder.svg?height=200&width=300&text=Chicago+Loft",
    rating: 4.7,
    verified: true,
  },
]

export default function RentPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const searchParams = useSearchParams()

  useEffect(() => {
    const query = searchParams.get("q")
    if (query) {
      setSearchQuery(query)
      // You can also handle other parameters like price range here
      console.log("Rent page loaded with search:", query)
    }
  }, [searchParams])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}&type=rent`)
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
            <Badge className="bg-purple-100 text-purple-800 px-4 py-2 text-sm font-medium">
              Trusted by luxury property seekers
            </Badge>
          </div>

          {/* Main Headlines */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">Find premium rentals</h1>
          <h2 className="text-2xl sm:text-3xl text-gray-700 mb-4">Luxury Apartments & Houses</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover high-end rental properties with verified owners
          </p>

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
              <span className="font-medium">Top Cities:</span>
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

          {/* Illustration */}
          <div className="relative mb-12">
            <div
              className="w-full h-64 bg-cover bg-center bg-no-repeat rounded-lg"
              style={{
                backgroundImage: `url('/placeholder.svg?height=256&width=600&text=Luxury+Rental+Properties+Illustration')`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Featured Rentals Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Featured Luxury Rentals</h3>
            <p className="text-gray-600">Handpicked premium properties available now</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-5 w-5 text-gray-500" />
                      <span className="text-2xl font-bold">${property.price.toLocaleString()}</span>
                      <span className="text-gray-500">/month</span>
                    </div>
                    <Button size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              View All Rentals
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
