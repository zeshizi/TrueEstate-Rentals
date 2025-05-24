"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Bed, Bath, Square, DollarSign, Filter, Search, Heart } from "lucide-react"
import { useState } from "react"

const sampleProperties = [
  {
    id: 1,
    name: "Luxury Apartment in Downtown",
    location: "New York, NY",
    price: 8500,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1500,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 2,
    name: "Spacious House with Garden",
    location: "Los Angeles, CA",
    price: 12000,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2800,
    image:
      "https://images.unsplash.com/photo-1568605114967-8e628aa3b6a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 3,
    name: "Modern Condo with City View",
    location: "Chicago, IL",
    price: 6000,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 900,
    image:
      "https://images.unsplash.com/photo-1520231383439-048090bb426a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
  },
  {
    id: 4,
    name: "Beachfront Villa",
    location: "Miami, FL",
    price: 15000,
    bedrooms: 5,
    bathrooms: 4,
    squareFeet: 3500,
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003dc7ddb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 5,
    name: "Cozy Apartment in Brooklyn",
    location: "Brooklyn, NY",
    price: 4200,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 750,
    image:
      "https://images.unsplash.com/photo-1513506003011-5493d7f6e573?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  },
]

export default function RentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [properties, setProperties] = useState(sampleProperties)

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value)
    // In a real application, you would filter the properties based on the search term
    // For this example, we'll just update the state with the search term
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-2">
          <div className="flex items-center w-full md:w-auto">
            <Input
              type="text"
              placeholder="Search by location..."
              className="w-full md:w-80"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button variant="outline" className="ml-2">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
          <Button variant="ghost">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Rental Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card key={property.id}>
              <div className="relative">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <Button variant="ghost" size="icon" className="absolute top-2 right-2">
                  <Heart className="h-5 w-5 text-gray-500 hover:text-red-500" />
                </Button>
              </div>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{property.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">{property.location}</span>
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4 text-gray-500" />
                    <span>{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4 text-gray-500" />
                    <span>{property.bathrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="h-4 w-4 text-gray-500" />
                    <span>{property.squareFeet} sqft</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span className="text-2xl font-bold">{property.price}</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <Button>View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
