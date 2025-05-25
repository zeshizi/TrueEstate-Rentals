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

interface Owner {
  id: string
  name: string
  email: string
  company: string
  title: string
  location: string
  properties: number
  totalValue: number
  wealthLevel: string
  investmentGrade: string
  source: string
}

const topCities = ["Boston", "Austin", "Atlanta", "Phoenix", "Denver", "Nashville", "Charlotte", "Tampa"]

// Comprehensive mock data for all US states - student rentals and properties for sale
const allProperties = [
  // CALIFORNIA
  {
    id: 1,
    title: "Shared Room near UCLA",
    location: "Los Angeles, CA",
    price: 1200,
    beds: 1,
    baths: 1,
    sqft: 180,
    type: "rent",
    category: "room",
    image: "/placeholder.svg?height=200&width=300&text=UCLA+Shared+Room",
    rating: 4.4,
    verified: true,
    amenities: ["WiFi", "Study Desk", "Pool", "Gym"],
    studentFriendly: true,
    roommates: 2,
    gender: "Mixed",
    furnished: true,
    utilities: "Included",
    ownerName: "California Student Housing Corp",
    ownerWealth: "Corporate",
    ownerType: "Company",
    value: 1200,
    confidence: "High",
    subtitle: "Los Angeles, CA - Student Housing",
    reviewCount: 45,
    reviewSummary: "Great location near campus with excellent amenities",
    reviewAuthor: "Student Reviewer",
  },
  {
    id: 2,
    title: "Luxury Condo in San Francisco",
    location: "San Francisco, CA",
    price: 2850000,
    beds: 3,
    baths: 3,
    sqft: 2200,
    type: "buy",
    category: "condo",
    image: "/placeholder.svg?height=200&width=300&text=SF+Luxury+Condo",
    verified: true,
    investmentGrade: "A+",
    ownerName: "Tech Executive Holdings",
    ownerWealth: "Ultra High Net Worth",
    ownerType: "Individual",
    value: 2850000,
    confidence: "High",
    subtitle: "San Francisco, CA - Luxury Real Estate",
    reviewCount: 12,
    reviewSummary: "Stunning views and premium finishes throughout",
    reviewAuthor: "Real Estate Expert",
  },

  // TEXAS
  {
    id: 3,
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
    value: 1200,
    confidence: "High",
    subtitle: "Austin, TX - Student Apartment Complex",
    reviewCount: 78,
    reviewSummary: "Perfect for students with great amenities and location",
    reviewAuthor: "UT Student",
  },
  {
    id: 4,
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
    ownerName: "Texas Oil Executive",
    ownerWealth: "High Net Worth",
    ownerType: "Individual",
    value: 1250000,
    confidence: "High",
    subtitle: "Dallas, TX - Executive Estate",
    reviewCount: 8,
    reviewSummary: "Impressive estate with luxury amenities",
    reviewAuthor: "Luxury Buyer",
  },

  // NEW YORK
  {
    id: 5,
    title: "Manhattan Studio near NYU",
    location: "New York, NY",
    price: 2800,
    beds: 0,
    baths: 1,
    sqft: 400,
    type: "rent",
    category: "studio",
    image: "/placeholder.svg?height=200&width=300&text=NYU+Studio",
    rating: 4.2,
    verified: true,
    amenities: ["WiFi", "Doorman", "Rooftop"],
    studentFriendly: true,
    furnished: true,
    utilities: "Separate",
    ownerName: "Manhattan Properties Inc",
    ownerWealth: "Corporate",
    ownerType: "Company",
    value: 2800,
    confidence: "High",
    subtitle: "New York, NY - Manhattan Studio",
    reviewCount: 34,
    reviewSummary: "Prime location in the heart of Manhattan",
    reviewAuthor: "NYU Student",
  },
  {
    id: 6,
    title: "Penthouse in Manhattan",
    location: "New York, NY",
    price: 8500000,
    beds: 4,
    baths: 4,
    sqft: 3500,
    type: "buy",
    category: "condo",
    image: "/placeholder.svg?height=200&width=300&text=Manhattan+Penthouse",
    verified: true,
    investmentGrade: "A++",
    ownerName: "Wall Street Executive",
    ownerWealth: "Ultra High Net Worth",
    ownerType: "Individual",
    value: 8500000,
    confidence: "High",
    subtitle: "New York, NY - Luxury Penthouse",
    reviewCount: 5,
    reviewSummary: "Unparalleled luxury in prime Manhattan location",
    reviewAuthor: "Luxury Real Estate Agent",
  },

  // FLORIDA
  {
    id: 7,
    title: "Beach House Student Room",
    location: "Miami, FL",
    price: 950,
    beds: 1,
    baths: 1,
    sqft: 220,
    type: "rent",
    category: "room",
    image: "/placeholder.svg?height=200&width=300&text=Miami+Beach+Room",
    rating: 4.6,
    verified: true,
    amenities: ["WiFi", "Beach Access", "Pool"],
    studentFriendly: true,
    roommates: 3,
    gender: "Mixed",
    furnished: true,
    utilities: "Included",
    ownerName: "Florida Beach Properties",
    ownerWealth: "High Net Worth",
    ownerType: "Company",
    value: 950,
    confidence: "High",
    subtitle: "Miami, FL - Beach House Room",
    reviewCount: 67,
    reviewSummary: "Amazing beach access and vibrant student community",
    reviewAuthor: "Miami Student",
  },
  {
    id: 8,
    title: "Waterfront Villa",
    location: "Miami, FL",
    price: 3200000,
    beds: 6,
    baths: 5,
    sqft: 4500,
    type: "buy",
    category: "house",
    image: "/placeholder.svg?height=200&width=300&text=Miami+Waterfront+Villa",
    verified: true,
    investmentGrade: "A+",
    ownerName: "Miami Real Estate Mogul",
    ownerWealth: "Ultra High Net Worth",
    ownerType: "Individual",
    value: 3200000,
    confidence: "High",
    subtitle: "Miami, FL - Waterfront Villa",
    reviewCount: 15,
    reviewSummary: "Spectacular waterfront views and luxury amenities",
    reviewAuthor: "Luxury Home Buyer",
  },

  // MASSACHUSETTS
  {
    id: 9,
    title: "Shared Room near Harvard",
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
    amenities: ["WiFi", "Study Desk", "Library Access"],
    studentFriendly: true,
    roommates: 2,
    gender: "Mixed",
    furnished: true,
    utilities: "Included",
    ownerName: "Harvard Area Properties",
    ownerWealth: "Upper Middle Class",
    ownerType: "Individual",
    value: 750,
    confidence: "High",
    subtitle: "Cambridge, MA - Harvard Area",
    reviewCount: 89,
    reviewSummary: "Perfect location for Harvard students",
    reviewAuthor: "Harvard Student",
  },
  {
    id: 10,
    title: "Historic Boston Townhouse",
    location: "Boston, MA",
    price: 1850000,
    beds: 4,
    baths: 3,
    sqft: 2800,
    type: "buy",
    category: "house",
    image: "/placeholder.svg?height=200&width=300&text=Boston+Historic+Townhouse",
    verified: true,
    investmentGrade: "A",
    ownerName: "Boston Heritage Trust",
    ownerWealth: "High Net Worth",
    ownerType: "Trust",
    value: 1850000,
    confidence: "High",
    subtitle: "Boston, MA - Historic Townhouse",
    reviewCount: 22,
    reviewSummary: "Beautiful historic charm with modern updates",
    reviewAuthor: "Boston Resident",
  },

  // GEORGIA
  {
    id: 11,
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
    ownerName: "Georgia Student Housing",
    ownerWealth: "Middle Class",
    ownerType: "Individual",
    value: 580,
    confidence: "Medium",
    subtitle: "Atlanta, GA - Budget Student Room",
    reviewCount: 156,
    reviewSummary: "Great value for money in safe neighborhood",
    reviewAuthor: "Georgia Tech Student",
  },
  {
    id: 12,
    title: "Modern Atlanta Home",
    location: "Atlanta, GA",
    price: 485000,
    beds: 4,
    baths: 3,
    sqft: 2200,
    type: "buy",
    category: "house",
    image: "/placeholder.svg?height=200&width=300&text=Atlanta+Modern+Home",
    verified: true,
    investmentGrade: "A-",
    ownerName: "Atlanta Development Group",
    ownerWealth: "Upper Middle Class",
    ownerType: "Company",
    value: 485000,
    confidence: "High",
    subtitle: "Atlanta, GA - Modern Family Home",
    reviewCount: 31,
    reviewSummary: "Well-designed modern home in growing neighborhood",
    reviewAuthor: "Atlanta Family",
  },

  // Add more states...
  {
    id: 13,
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
    ownerName: "Arizona Student Living",
    ownerWealth: "High Net Worth",
    ownerType: "Company",
    value: 950,
    confidence: "High",
    subtitle: "Phoenix, AZ - Premium Student Studio",
    reviewCount: 43,
    reviewSummary: "Luxury amenities perfect for students",
    reviewAuthor: "ASU Student",
  },
  {
    id: 14,
    title: "Mountain View Student Room",
    location: "Denver, CO",
    price: 680,
    beds: 1,
    baths: 1,
    sqft: 220,
    type: "rent",
    category: "room",
    image: "/placeholder.svg?height=200&width=300&text=Denver+Mountain+Room",
    rating: 4.4,
    verified: true,
    amenities: ["WiFi", "Mountain View", "Ski Storage"],
    studentFriendly: true,
    roommates: 2,
    gender: "Mixed",
    furnished: true,
    utilities: "Included",
    ownerName: "Colorado Mountain Properties",
    ownerWealth: "Professional",
    ownerType: "Individual",
    value: 680,
    confidence: "High",
    subtitle: "Denver, CO - Mountain View Room",
    reviewCount: 72,
    reviewSummary: "Beautiful mountain views and outdoor access",
    reviewAuthor: "CU Denver Student",
  },
  {
    id: 15,
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
    amenities: ["WiFi", "Music Room", "Recording Studio"],
    studentFriendly: true,
    roommates: 3,
    gender: "Mixed",
    furnished: true,
    utilities: "Included",
    ownerName: "Nashville Music Properties",
    ownerWealth: "Corporate",
    ownerType: "Company",
    value: 620,
    confidence: "High",
    subtitle: "Nashville, TN - Music City Room",
    reviewCount: 98,
    reviewSummary: "Perfect for music students with recording access",
    reviewAuthor: "Belmont Student",
  },
]

const PropertyOwnerSearch = () => {
  const [ownerSearchQuery, setOwnerSearchQuery] = useState("")
  const [ownerResults, setOwnerResults] = useState<Owner[]>([])
  const [ownerLoading, setOwnerLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [propertyType, setPropertyType] = useState<"all" | "rent" | "buy">("all")
  const [searchType, setSearchType] = useState<"properties" | "owners">("properties")
  const [searchResults, setSearchResults] = useState([])
  const router = useRouter()
  const searchParams = useSearchParams()

  // Using mock data - no API keys required
  const usingMockData = true

  const handleOwnerSearch = async () => {
    if (!ownerSearchQuery.trim()) return

    setOwnerLoading(true)
    setOwnerResults([])

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock owner data based on search query
      const mockOwners = [
        {
          id: "owner-1",
          name: "John Smith",
          email: "john.smith@email.com",
          company: "Smith Real Estate Holdings",
          title: "CEO & Founder",
          location: "Beverly Hills, CA",
          properties: 12,
          totalValue: 15000000,
          wealthLevel: "High Net Worth",
          investmentGrade: "A+",
          source: "Mock Data",
        },
        {
          id: "owner-2",
          name: "Sarah Johnson",
          email: "sarah@johnsonproperties.com",
          company: "Johnson Property Group",
          title: "Managing Partner",
          location: "Manhattan, NY",
          properties: 8,
          totalValue: 25000000,
          wealthLevel: "Ultra High Net Worth",
          investmentGrade: "A++",
          source: "Mock Data",
        },
        {
          id: "owner-3",
          name: "Michael Chen",
          email: "m.chen@chenrealty.com",
          company: "Chen Realty Investments",
          title: "Principal Investor",
          location: "San Francisco, CA",
          properties: 15,
          totalValue: 18000000,
          wealthLevel: "High Net Worth",
          investmentGrade: "A+",
          source: "Mock Data",
        },
      ]

      // Filter based on search query
      const filteredOwners = mockOwners.filter(
        (owner) =>
          owner.name.toLowerCase().includes(ownerSearchQuery.toLowerCase()) ||
          owner.company.toLowerCase().includes(ownerSearchQuery.toLowerCase()) ||
          owner.email.toLowerCase().includes(ownerSearchQuery.toLowerCase()),
      )

      setOwnerResults(filteredOwners.length > 0 ? filteredOwners : mockOwners.slice(0, 2))
    } catch (error) {
      console.error("Owner search error:", error)
      setOwnerResults([])
    } finally {
      setOwnerLoading(false)
    }
  }

  // Update the useEffect to automatically trigger a search for "student" when the page loads for demonstration

  useEffect(() => {
    try {
      const query = searchParams?.get("q") || ""
      const type = searchParams?.get("type") || ""
      const minValue = ""
      const maxValue = ""

      if (query) {
        setSearchQuery(query)
        setShowResults(true)
      }
      if (type && (type === "rent" || type === "buy")) {
        setPropertyType(type)
      }

      // Auto-search if query is provided
      if (query) {
        setTimeout(() => {
          handleSearch()
        }, 100)
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

  // Add a specific student search function
  const handleStudentSearch = async () => {
    try {
      setOwnerLoading(true)
      setShowResults(true)

      // Mock student data based on search query
      const mockOwners = [
        {
          id: "owner-1",
          name: "Student Smith",
          email: "student.smith@email.com",
          company: "Student Real Estate Holdings",
          title: "CEO & Founder",
          location: "Beverly Hills, CA",
          properties: 12,
          totalValue: 15000000,
          wealthLevel: "High Net Worth",
          investmentGrade: "A+",
          source: "Mock Data",
        },
        {
          id: "owner-2",
          name: "Student Johnson",
          email: "student@johnsonproperties.com",
          company: "Student Property Group",
          title: "Managing Partner",
          location: "Manhattan, NY",
          properties: 8,
          totalValue: 25000000,
          wealthLevel: "Ultra High Net Worth",
          investmentGrade: "A++",
          source: "Mock Data",
        },
        {
          id: "owner-3",
          name: "Student Chen",
          email: "m.chen@chenrealty.com",
          company: "Student Realty Investments",
          title: "Principal Investor",
          location: "San Francisco, CA",
          properties: 15,
          totalValue: 18000000,
          wealthLevel: "High Net Worth",
          investmentGrade: "A+",
          source: "Mock Data",
        },
      ]

      setOwnerResults(mockOwners)
      setOwnerLoading(false)
    } catch (error) {
      console.error("Student search error:", error)
      setOwnerLoading(false)
      setOwnerResults([])
    }
  }

  const handleSearch = async () => {
    try {
      if (searchQuery.trim()) {
        setLoading(true)
        setShowResults(true)

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        let filteredProperties = allProperties

        // Filter by property type (rent/buy)
        if (propertyType !== "all") {
          filteredProperties = filteredProperties.filter((property) => property.type === propertyType)
        }

        // Enhanced filtering by search query
        const mockResults = filteredProperties
          .filter((property) => {
            const queryLower = searchQuery.toLowerCase()
            if (searchType === "properties") {
              return (
                property.title.toLowerCase().includes(queryLower) ||
                property.location.toLowerCase().includes(queryLower) ||
                property.category.toLowerCase().includes(queryLower) ||
                queryLower.includes("all") ||
                queryLower === "" ||
                // State matching
                property.location
                  .split(", ")[1]
                  ?.toLowerCase()
                  .includes(queryLower) ||
                // City matching
                property.location
                  .split(", ")[0]
                  ?.toLowerCase()
                  .includes(queryLower)
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
            subtitle: property.subtitle || property.location,
            value: property.value || property.price,
            ownerName: property.ownerName,
            ownerWealth: property.ownerWealth,
            confidence: property.confidence || "High",
            type: "property",
            rating: property.rating,
            reviewCount: property.reviewCount || 0,
            reviewSummary: property.reviewSummary,
            reviewAuthor: property.reviewAuthor,
            image: property.image,
          }))

        setSearchResults(mockResults)
        setLoading(false)
      }
    } catch (error) {
      console.error("Search error:", error)
      setLoading(false)
      setSearchResults([])
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
            Search for rental properties, homes for sale, and get detailed owner insights across all US states
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
                      ? "Search by state, city, or property type (e.g., California, Austin, student)..."
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
              <span className="font-medium">Popular Searches:</span>
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {["California", "Texas", "New York", "Florida", "student", "luxury"].map((term) => (
                <Button
                  key={term}
                  variant="outline"
                  size="sm"
                  className="rounded-full bg-white hover:bg-blue-50 border-gray-300"
                  onClick={() => {
                    setSearchQuery(term)
                    handleSearch()
                  }}
                >
                  {term}
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
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Featured Properties Across US States</h3>
              <p className="text-gray-600">Student rentals and properties for sale nationwide</p>
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

export default PropertyOwnerSearch
