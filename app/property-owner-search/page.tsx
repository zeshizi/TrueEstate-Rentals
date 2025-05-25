"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { Skeleton } from "@/components/ui/skeleton"

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

const PropertyOwnerSearch = () => {
  const [ownerSearchQuery, setOwnerSearchQuery] = useState("")
  const [ownerResults, setOwnerResults] = useState<Owner[]>([])
  const [ownerLoading, setOwnerLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [propertyType, setPropertyType] = useState("all")
  const [searchType, setSearchType] = useState("properties")
  const [searchResults, setSearchResults] = useState([])

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
      const query = ""
      const type = ""
      const minValue = ""
      const maxValue = ""

      if (query) {
        setOwnerSearchQuery(query)
      }
      if (type && (type === "rent" || type === "buy")) {
        //setPropertyType(type) //setPropertyType does not exist in this context
      }

      // Auto-search if query is provided OR demonstrate student search
      if (query || !query) {
        // For demonstration, let's search for "student" automatically
        setOwnerSearchQuery("student")
        //setPropertyType("rent") //setPropertyType does not exist in this context
        setTimeout(() => {
          handleStudentSearch()
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
  }, [])

  // Add a specific student search function
  const handleStudentSearch = async () => {
    try {
      setOwnerLoading(true)
      //setShowResults(true) //setShowResults does not exist in this context

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Property Owner Search</h1>
      <div className="flex items-center space-x-2 mb-4">
        <Input
          type="text"
          placeholder="Enter owner name, company, or email"
          value={ownerSearchQuery}
          onChange={(e) => setOwnerSearchQuery(e.target.value)}
        />
        <Button onClick={handleOwnerSearch} disabled={ownerLoading}>
          {ownerLoading ? "Searching..." : "Search"}
          <MagnifyingGlassIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {ownerLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={`skeleton-${i}`}>
              <CardHeader>
                <CardTitle>
                  <Skeleton />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-[60%]" />
                <Skeleton className="h-4 w-[40%]" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {ownerResults.length > 0 && !ownerLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ownerResults.map((owner) => (
            <Card key={owner.id}>
              <CardHeader>
                <CardTitle>{owner.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Email:</strong> {owner.email}
                </p>
                <p>
                  <strong>Company:</strong> {owner.company}
                </p>
                <p>
                  <strong>Title:</strong> {owner.title}
                </p>
                <p>
                  <strong>Location:</strong> {owner.location}
                </p>
                <p>
                  <strong>Properties:</strong> {owner.properties}
                </p>
                <p>
                  <strong>Total Value:</strong> ${owner.totalValue.toLocaleString()}
                </p>
                <p>
                  <strong>Wealth Level:</strong> {owner.wealthLevel}
                </p>
                <p>
                  <strong>Investment Grade:</strong> {owner.investmentGrade}
                </p>
                <p>
                  <strong>Source:</strong> {owner.source}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!ownerLoading && ownerResults.length === 0 && ownerSearchQuery.trim() !== "" && (
        <p>No owners found matching your search criteria.</p>
      )}
    </div>
  )
}

export default PropertyOwnerSearch
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
  },

  // ARIZONA
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
  },
  {
    id: 14,
    title: "Desert Oasis Home",
    location: "Scottsdale, AZ",
    price: 750000,
    beds: 3,
    baths: 3,
    sqft: 2100,
    type: "buy",
    category: "house",
    image: "/placeholder.svg?height=200&width=300&text=Scottsdale+Desert+Home",
    verified: true,
    investmentGrade: "B+",
    ownerName: "Desert Properties LLC",
    ownerWealth: "High Net Worth",
    ownerType: "Company",
  },

  // COLORADO
  {
    id: 15,
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
  },
  {
    id: 16,
    title: "Mountain Retreat",
    location: "Aspen, CO",
    price: 4200000,
    beds: 5,
    baths: 4,
    sqft: 3200,
    type: "buy",
    category: "house",
    image: "/placeholder.svg?height=200&width=300&text=Aspen+Mountain+Retreat",
    verified: true,
    investmentGrade: "A++",
    ownerName: "Aspen Elite Holdings",
    ownerWealth: "Ultra High Net Worth",
    ownerType: "Trust",
  },

  // WASHINGTON
  {
    id: 17,
    title: "Seattle Tech Hub Room",
    location: "Seattle, WA",
    price: 1100,
    beds: 1,
    baths: 1,
    sqft: 250,
    type: "rent",
    category: "room",
    image: "/placeholder.svg?height=200&width=300&text=Seattle+Tech+Room",
    rating: 4.5,
    verified: true,
    amenities: ["WiFi", "Tech Hub", "Coffee Bar"],
    studentFriendly: true,
    roommates: 2,
    gender: "Mixed",
    furnished: true,
    utilities: "Included",
    ownerName: "Seattle Tech Properties",
    ownerWealth: "High Net Worth",
    ownerType: "Company",
  },
  {
    id: 18,
    title: "Waterfront Seattle Condo",
    location: "Seattle, WA",
    price: 1650000,
    beds: 2,
    baths: 2,
    sqft: 1400,
    type: "buy",
    category: "condo",
    image: "/placeholder.svg?height=200&width=300&text=Seattle+Waterfront+Condo",
    verified: true,
    investmentGrade: "A",
    ownerName: "Pacific Northwest Investments",
    ownerWealth: "High Net Worth",
    ownerType: "Company",
  },

  // ILLINOIS
  {
    id: 19,
    title: "Chicago University District",
    location: "Chicago, IL",
    price: 850,
    beds: 1,
    baths: 1,
    sqft: 300,
    type: "rent",
    category: "room",
    image: "/placeholder.svg?height=200&width=300&text=Chicago+University+Room",
    rating: 4.3,
    verified: true,
    amenities: ["WiFi", "Study Lounge", "Transit Access"],
    studentFriendly: true,
    roommates: 3,
    gender: "Mixed",
    furnished: true,
    utilities: "Included",
    ownerName: "Chicago Student Living",
    ownerWealth: "Corporate",
    ownerType: "Company",
  },
  {
    id: 20,
    title: "Downtown Chicago Loft",
    location: "Chicago, IL",
    price: 950000,
    beds: 2,
    baths: 2,
    sqft: 1600,
    type: "buy",
    category: "loft",
    image: "/placeholder.svg?height=200&width=300&text=Chicago+Downtown+Loft",
    verified: true,
    investmentGrade: "A-",
    ownerName: "Windy City Properties",
    ownerWealth: "High Net Worth",
    ownerType: "Individual",
  },

  // TENNESSEE
  {
    id: 21,
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
  },
  {
    id: 22,
    title: "Nashville Country Estate",
    location: "Nashville, TN",
    price: 1200000,
    beds: 4,
    baths: 3,
    sqft: 3000,
    type: "buy",
    category: "house",
    image: "/placeholder.svg?height=200&width=300&text=Nashville+Country+Estate",
    verified: true,
    investmentGrade: "A",
    ownerName: "Country Music Investments",
    ownerWealth: "High Net Worth",
    ownerType: "Trust",
  },

  // NORTH CAROLINA
  {
    id: 23,
    title: "Research Triangle Student Housing",
    location: "Durham, NC",
    price: 720,
    beds: 1,
    baths: 1,
    sqft: 200,
    type: "rent",
    category: "room",
    image: "/placeholder.svg?height=200&width=300&text=Durham+Research+Room",
    rating: 4.4,
    verified: true,
    amenities: ["WiFi", "Research Lab Access", "Study Pods"],
    studentFriendly: true,
    roommates: 2,
    gender: "Mixed",
    furnished: true,
    utilities: "Included",
    ownerName: "Triangle Student Properties",
    ownerWealth: "Professional",
    ownerType: "Individual",
  },
  {
    id: 24,
    title: "Charlotte Business District Condo",
    location: "Charlotte, NC",
    price: 425000,
    beds: 2,
    baths: 2,
    sqft: 1200,
    type: "buy",
    category: "condo",
    image: "/placeholder.svg?height=200&width=300&text=Charlotte+Business+Condo",
    verified: true,
    investmentGrade: "B+",
    ownerName: "Carolina Investments",
    ownerWealth: "Upper Middle Class",
    ownerType: "Company",
  },

  // OREGON
  {
    id: 25,
    title: "Portland Eco-Friendly Room",
    location: "Portland, OR",
    price: 780,
    beds: 1,
    baths: 1,
    sqft: 180,
    type: "rent",
    category: "room",
    image: "/placeholder.svg?height=200&width=300&text=Portland+Eco+Room",
    rating: 4.5,
    verified: true,
    amenities: ["WiFi", "Solar Power", "Bike Storage"],
    studentFriendly: true,
    roommates: 2,
    gender: "Mixed",
    furnished: true,
    utilities: "Included",
    ownerName: "Green Portland Properties",
    ownerWealth: "Professional",
    ownerType: "Individual",
  },
  {
    id: 26,
    title: "Portland Craftsman Home",
    location: "Portland, OR",
    price: 650000,
    beds: 3,
    baths: 2,
    sqft: 1800,
    type: "buy",
    category: "house",
    image: "/placeholder.svg?height=200&width=300&text=Portland+Craftsman+Home",
    verified: true,
    investmentGrade: "B+",
    ownerName: "Pacific Northwest Homes",
    ownerWealth: "Upper Middle Class",
    ownerType: "Individual",
  },

  // NEVADA
  {
    id: 27,
    title: "Las Vegas Student Suite",
    location: "Las Vegas, NV",
    price: 890,
    beds: 1,
    baths: 1,
    sqft: 350,
    type: "rent",
    category: "studio",
    image: "/placeholder.svg?height=200&width=300&text=Vegas+Student+Suite",
    rating: 4.2,
    verified: true,
    amenities: ["WiFi", "Pool", "Entertainment District"],
    studentFriendly: true,
    furnished: true,
    utilities: "Included",
    ownerName: "Vegas Student Living",
    ownerWealth: "Corporate",
    ownerType: "Company",
  },
  {
    id: 28,
    title: "Las Vegas Luxury High-Rise",
    location: "Las Vegas, NV",
    price: 1850000,
    beds: 3,
    baths: 3,
    sqft: 2400,
    type: "buy",
    category: "condo",
    image: "/placeholder.svg?height=200&width=300&text=Vegas+Luxury+Highrise",
    verified: true,
    investmentGrade: "A",
    ownerName: "Vegas Elite Properties",
    ownerWealth: "High Net Worth",
    ownerType: "Company",
  },

  // UTAH
  {
    id: 29,
    title: "Salt Lake City Student Room",
    location: "Salt Lake City, UT",
    price: 650,
    beds: 1,
    baths: 1,
    sqft: 190,
    type: "rent",
    category: "room",
    image: "/placeholder.svg?height=200&width=300&text=SLC+Student+Room",
    rating: 4.4,
    verified: true,
    amenities: ["WiFi", "Mountain Access", "Ski Pass"],
    studentFriendly: true,
    roommates: 2,
    gender: "Mixed",
    furnished: true,
    utilities: "Included",
    ownerName: "Utah Mountain Properties",
    ownerWealth: "Professional",
    ownerType: "Individual",
  },
  {
    id: 30,
    title: "Park City Ski Lodge",
    location: "Park City, UT",
    price: 2200000,
    beds: 4,
    baths: 4,
    sqft: 2800,
    type: "buy",
    category: "house",
    image: "/placeholder.svg?height=200&width=300&text=Park+City+Ski+Lodge",
    verified: true,
    investmentGrade: "A+",
    ownerName: "Mountain Resort Holdings",
    ownerWealth: "Ultra High Net Worth",
    ownerType: "Trust",
  },
]

const handleSearch = async () => {
  try {
    if (searchQuery.trim()) {
      setLoading(true)
      setShowResults(true)

      let filteredProperties = allProperties

      // Filter by property type (rent/buy)
      if (propertyType !== "all") {
        filteredProperties = filteredProperties.filter((property) => property.type === propertyType)
      }

      // Enhanced filtering by search query - includes state names and abbreviations
      const mockResults = filteredProperties
        .filter((property) => {
          const queryLower = searchQuery.toLowerCase()
          if (searchType === "properties") {
            return (
              property.title.toLowerCase().includes(queryLower) ||
              property.location.toLowerCase().includes(queryLower) ||
              property.category.toLowerCase().includes(queryLower) ||
              // State name matching
              property.location
                .toLowerCase()
                .includes(queryLower) ||
              // State abbreviation matching
              getStateAbbreviation(property.location)
                .toLowerCase()
                .includes(queryLower) ||
              queryLower.includes("all") ||
              queryLower === ""
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
  } catch (error) {
    console.error("Search error:", error)
    setLoading(false)
    setSearchResults([])
  }
}

// Helper function to get state abbreviation
const getStateAbbreviation = (location: string) => {
  const stateMap: { [key: string]: string } = {
    California: "CA",
    Texas: "TX",
    "New York": "NY",
    Florida: "FL",
    Massachusetts: "MA",
    Georgia: "GA",
    Arizona: "AZ",
    Colorado: "CO",
    Washington: "WA",
    Illinois: "IL",
    Tennessee: "TN",
    "North Carolina": "NC",
    Oregon: "OR",
    Nevada: "NV",
    Utah: "UT",
  }

  for (const [state, abbrev] of Object.entries(stateMap)) {
    if (location.includes(state) || location.includes(abbrev)) {
      return abbrev
    }
  }
  return ""
}
