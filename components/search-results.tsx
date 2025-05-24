"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Building, User, DollarSign } from "lucide-react"

interface SearchResultsProps {
  results: any[]
  loading: boolean
  query: string
}

export function SearchResults({ results, loading, query }: SearchResultsProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!results.length && query) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">No results found for "{query}"</div>
        <div className="text-gray-400 mt-2">Try adjusting your search terms or filters</div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 mb-4">{results.length} results found</div>

      {results.map((result, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {result.type === "property" && <Building className="h-5 w-5 text-blue-600" />}
                  {result.type === "owner" && <User className="h-5 w-5 text-green-600" />}
                  {result.type === "address" && <MapPin className="h-5 w-5 text-purple-600" />}

                  <Badge variant="outline" className="text-xs">
                    {result.type}
                  </Badge>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-1">{result.title}</h3>

                <p className="text-gray-600 mb-3">{result.subtitle}</p>

                {result.type === "property" && (
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span>Value: ${(result.value / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>Owner Wealth: ${(result.ownerWealth / 1000000).toFixed(1)}M</span>
                    </div>
                  </div>
                )}

                {result.type === "owner" && (
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-1" />
                      <span>{result.properties} properties</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span>Total Value: ${(result.totalValue / 1000000).toFixed(1)}M</span>
                    </div>
                  </div>
                )}

                {result.type === "address" && (
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-1" />
                      <span>{result.propertyCount.toLocaleString()} properties</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span>Avg: ${(result.averageValue / 1000000).toFixed(1)}M</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
