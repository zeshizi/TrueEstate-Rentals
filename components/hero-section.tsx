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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url('/images/hero-bg.png')",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">True Estate</h1>
            <p className="text-xl md:text-2xl text-blue-200 font-medium">Clarity before Capital</p>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
              Discover premium properties and their owners. Get deep insights into wealth patterns, investment
              strategies, and market opportunities across the United States.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search by location, owner, or property type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-14 text-lg bg-white/10 border-white/20 text-white placeholder:text-slate-300 focus:bg-white/20"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>
          </form>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto pt-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">102+</div>
              <div className="text-slate-300">Premium Properties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-slate-300">States Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">$2.1B+</div>
              <div className="text-slate-300">Total Property Value</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              size="lg"
              className="bg-white text-slate-900 hover:bg-slate-100 font-semibold px-8"
              onClick={() => router.push("/properties")}
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              Explore Properties
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 font-semibold px-8"
              onClick={() => router.push("/wealth-map")}
            >
              <MapPin className="mr-2 h-5 w-5" />
              View Wealth Map
            </Button>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
    </section>
  )
}

export default HeroSection
