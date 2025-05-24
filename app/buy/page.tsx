"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square, DollarSign, Heart, TrendingUp } from "lucide-react"
import { useState } from "react"

const properties = [
  {
    id: 1,
    name: "Luxury Estate in Beverly Hills",
    price: 12500000,
    beds: 6,
    baths: 8,
    sqft: 8500,
    location: "Beverly Hills, CA",
    image: "https://source.unsplash.com/random/800x600?luxury,house",
    investmentPotential: "High",
    ownerWealth: "Extremely High",
  },
  {
    id: 2,
    name: "Waterfront Property in Miami",
    price: 8900000,
    beds: 5,
    baths: 6,
    sqft: 6200,
    location: "Miami, FL",
    image: "https://source.unsplash.com/random/800x600?waterfront,house",
    investmentPotential: "Very High",
    ownerWealth: "Very High",
  },
  {
    id: 3,
    name: "Modern Home in Aspen",
    price: 15000000,
    beds: 4,
    baths: 5,
    sqft: 7000,
    location: "Aspen, CO",
    image: "https://source.unsplash.com/random/800x600?modern,house",
    investmentPotential: "High",
    ownerWealth: "Extremely High",
  },
  {
    id: 4,
    name: "Penthouse in New York City",
    price: 22000000,
    beds: 3,
    baths: 4,
    sqft: 4800,
    location: "New York, NY",
    image: "https://source.unsplash.com/random/800x600?penthouse,city",
    investmentPotential: "Very High",
    ownerWealth: "Extremely High",
  },
  {
    id: 5,
    name: "Vineyard Estate in Napa Valley",
    price: 9750000,
    beds: 7,
    baths: 9,
    sqft: 9200,
    location: "Napa Valley, CA",
    image: "https://source.unsplash.com/random/800x600?vineyard,house",
    investmentPotential: "High",
    ownerWealth: "Very High",
  },
  {
    id: 6,
    name: "Ocean View Villa in Malibu",
    price: 25000000,
    beds: 5,
    baths: 7,
    sqft: 7800,
    location: "Malibu, CA",
    image: "https://source.unsplash.com/random/800x600?ocean,villa",
    investmentPotential: "Extremely High",
    ownerWealth: "Extremely High",
  },
]

export default function BuyPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPrice, setFilterPrice] = useState("")
  const [filterLocation, setFilterLocation] = useState("")

  const filteredProperties = properties.filter((property) => {
    const searchRegex = new RegExp(searchTerm, "i")
    const locationRegex = new RegExp(filterLocation, "i")

    return (
      searchRegex.test(property.name) &&
      locationRegex.test(property.location) &&
      (filterPrice === "" || property.price <= Number.parseInt(filterPrice))
    )
  })

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Buy Properties</h1>
          <p className="text-xl text-gray-600">Find your perfect investment property</p>
        </div>

        {/* Advanced Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Input
            type="text"
            placeholder="Search by property name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Max Price"
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Location"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
          />
        </div>

        {/* Property Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Card key={property.id}>
              <img
                src={property.image || "/placeholder.svg"}
                alt={property.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{property.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {property.location}
                  </span>
                  <Badge variant="secondary">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {property.investmentPotential}
                  </Badge>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold flex items-center gap-1">
                    <DollarSign className="h-5 w-5" />
                    {property.price.toLocaleString()}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Bed className="h-4 w-4" />
                    {property.beds} Beds
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Bath className="h-4 w-4" />
                    {property.baths} Baths
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 col-span-2">
                    <Square className="h-4 w-4" />
                    {property.sqft} Sqft
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button>
                    <Heart className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline">View Details</Button>
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
