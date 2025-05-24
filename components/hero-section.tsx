"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setIsSearching(true)
      console.log("Searching for:", searchQuery.trim())
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setTimeout(() => setIsSearching(false), 1000)
    }
  }

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920&query=luxury real estate skyline')",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />

      {/* Main Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight tracking-tight">True Estate</h1>
            <p className="text-2xl md:text-3xl text-blue-200 font-medium">Clarity before Capital</p>
            <p className="text-lg md:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Discover premium properties and their owners. Get deep insights into wealth patterns, investment
              strategies, and market opportunities across the United States.
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-3xl mx-auto pt-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-6 w-6" />
                  <Input
                    type="text"
                    placeholder="Search by location, owner, or property type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-16 text-lg bg-white/10 border-white/20 text-white placeholder:text-slate-300 focus:bg-white/20 focus:border-white/40 rounded-xl"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSearching}
                  className="h-16 px-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50 rounded-xl text-lg"
                >
                  <Search className="mr-3 h-6 w-6" />
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </div>
            </form>
          </div>

          {/* Stats Section */}
          <div className="pt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              <div className="text-center space-y-3">
                <div className="text-5xl md:text-6xl font-bold text-white">102+</div>
                <div className="text-lg text-slate-300 font-medium">Premium Properties</div>
              </div>
              <div className="text-center space-y-3">
                <div className="text-5xl md:text-6xl font-bold text-white">50+</div>
                <div className="text-lg text-slate-300 font-medium">States Covered</div>
              </div>
              <div className="text-center space-y-3">
                <div className="text-5xl md:text-6xl font-bold text-white">$2.1B+</div>
                <div className="text-lg text-slate-300 font-medium">Total Property Value</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="pt-12">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                className="h-14 px-10 bg-white text-slate-900 hover:bg-slate-100 font-semibold text-lg rounded-xl shadow-lg border-2 border-white"
                onClick={() => router.push("/properties")}
              >
                <TrendingUp className="mr-3 h-6 w-6" />
                Explore Properties
              </Button>
              <Button
                size="lg"
                className="h-14 px-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-xl shadow-lg border-2 border-blue-600"
                onClick={() => router.push("/wealth-map")}
              >
                <MapPin className="mr-3 h-6 w-6" />
                View Wealth Map
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
