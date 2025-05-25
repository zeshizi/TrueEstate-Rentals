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

const topCities = [
  "Beverly Hills",
  "Manhattan",
  "Malibu",
  "Aspen",
  "Miami Beach",
  "Napa Valley",
  "The Hamptons",
  "Scottsdale",
]

const featuredProperties = [
  {
    id: 1,
    title: "Beverly Hills Estate",
    location: "Beverly Hills, CA",
    price: 12500000,
    beds: 6,
    baths: 8,
    sqft: 8500,
    image: "/placeholder.svg?height=200&width=300&text=Beverly+Hills+Estate",
    investmentGrade: "A+",
    ownerWealth: "Ultra High",
  },
  {
    id: 2,
    title: "Manhattan Penthouse",
    location: "New York, NY",
    price: 22000000,
    beds: 4,
    baths: 5,
    sqft: 4800,
    image: "/placeholder.svg?height=200&width=300&text=Manhattan+Penthouse",
    investmentGrade: "A+",
    ownerWealth: "Extremely High",
  },
  {
    id: 3,
    title: "Malibu Ocean Villa",
    location: "Malibu, CA",
    price: 18750000,
    beds: 5,
    baths: 7,
    sqft: 6200,
    image: "/placeholder.svg?height=200&width=300&text=Malibu+Ocean+Villa",
    investmentGrade: "A",
    ownerWealth: "Very High",
  },
]

export default function BuyPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const searchParams = useSearchParams()

  useEffect(() => {
    const query = searchParams.get("q")
    if (query) {
      setSearchQuery(query)
      // You can also handle other parameters like price range here
      console.log("Buy page loaded with search:", query)
    }
  }, [searchParams])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}&type=buy`)
    }
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
              Trusted by luxury investors worldwide
            </Badge>
          </div>

          {/* Main Headlines */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">Discover luxury properties</h1>
          <h2 className="text-2xl sm:text-3xl text-gray-700 mb-4">Estates & Investment Opportunities</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Find premium properties with verified owner wealth analysis
          </p>

          {/* Search Bar */}
          <Card className="bg-white shadow-lg border-0 max-w-2xl mx-auto mb-8">
            <CardContent className="p-6">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search Luxury Properties..."
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
              <span className="font-medium">Premium Locations:</span>
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

          {/* Illustration */}
          <div className="relative mb-12">
            <div
              className="w-full h-64 bg-cover bg-center bg-no-repeat rounded-lg"
              style={{
                backgroundImage: `url('/placeholder.svg?height=256&width=600&text=Luxury+Real+Estate+Investment+Illustration')`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Featured Properties Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Featured Investment Properties</h3>
            <p className="text-gray-600">Curated luxury estates with comprehensive wealth analysis</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                    <div className="text-xs text-gray-500 mb-1">Owner Wealth Level</div>
                    <Badge variant="outline" className="text-xs">
                      {property.ownerWealth}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-5 w-5 text-gray-500" />
                      <span className="text-xl font-bold">${(property.price / 1000000).toFixed(1)}M</span>
                    </div>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      View Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              Explore All Properties
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
