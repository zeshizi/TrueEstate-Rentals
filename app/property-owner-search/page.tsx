"use client"

import { useState } from "react"
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
