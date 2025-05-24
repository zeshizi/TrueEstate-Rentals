"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Search, Users, Home, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"

export function FlatmateInspiredSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("rooms")
  const router = useRouter()

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}&type=${searchType}`)
    }
  }

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

  const searchTypes = [
    { id: "rooms", label: "Rooms & Apartments", icon: Home },
    { id: "flatmates", label: "Find Flatmates", icon: Users },
    { id: "luxury", label: "Luxury Properties", icon: TrendingUp },
  ]

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Trust Badge */}
        <div className="mb-6">
          <Badge className="bg-purple-100 text-purple-800 px-4 py-2 text-sm">Trusted & loved by million users</Badge>
        </div>

        {/* Main Headline - Flatmate Style */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">Find compatible flatmates</h1>
        <h2 className="text-2xl sm:text-3xl text-gray-700 mb-4">Rooms & PGs</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">Share your room with right roommates</p>

        {/* Search Types */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {searchTypes.map((type) => (
            <Button
              key={type.id}
              variant={searchType === type.id ? "default" : "outline"}
              className={`flex items-center gap-2 ${
                searchType === type.id ? "bg-blue-600 text-white" : "bg-white text-gray-700"
              }`}
              onClick={() => setSearchType(type.id)}
            >
              <type.icon className="h-4 w-4" />
              {type.label}
            </Button>
          ))}
        </div>

        {/* Search Card */}
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
              <Button onClick={handleSearch} className="absolute right-2 top-2 h-10 px-6 bg-blue-600 hover:bg-blue-700">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Top Cities */}
        <div className="mb-8">
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

        {/* Illustration Area */}
        <div className="relative">
          <div
            className="w-full h-64 bg-cover bg-center bg-no-repeat rounded-lg"
            style={{
              backgroundImage: `url('/placeholder.svg?height=256&width=600&text=Happy+People+Finding+Homes+Together')`,
            }}
          />
        </div>
      </div>
    </div>
  )
}
