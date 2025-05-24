"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { MapboxWealthMap } from "@/components/mapbox-wealth-map"
import { PropertyFilters } from "@/components/property-filters"
import { PropertyDetails } from "@/components/property-details"
import { WealthAnalysis } from "@/components/wealth-analysis"
import { DataGovIntegration } from "@/components/data-gov-integration"
import { MapDataSeeder } from "@/components/map-data-seeder"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function WealthMapPage() {
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [properties, setProperties] = useState([])
  const [filters, setFilters] = useState({
    minValue: 0,
    maxValue: 10000000,
    propertyType: "all",
    ownerType: "all",
    wealthRange: "all",
  })

  useEffect(() => {
    fetchProperties()
  }, [filters])

  const fetchProperties = async () => {
    try {
      const params = new URLSearchParams({
        minValue: filters.minValue.toString(),
        maxValue: filters.maxValue.toString(),
        propertyType: filters.propertyType,
        ownerType: filters.ownerType,
        wealthRange: filters.wealthRange,
      })

      const response = await fetch(`/api/properties?${params}`)
      const data = await response.json()
      setProperties(data.properties || [])
    } catch (error) {
      console.error("Failed to fetch properties:", error)
    }
  }

  const handleDataSeeded = () => {
    // Refresh properties after seeding
    fetchProperties()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-6">
            <Tabs defaultValue="filters" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="filters">Filters</TabsTrigger>
                <TabsTrigger value="data">Data Sources</TabsTrigger>
              </TabsList>

              <TabsContent value="filters" className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">US Wealth Map</h1>
                  <p className="text-sm text-gray-600">Interactive map with {properties.length} properties loaded</p>
                </div>

                <PropertyFilters filters={filters} onFiltersChange={setFilters} />

                {selectedProperty && (
                  <div className="space-y-4">
                    <PropertyDetails property={selectedProperty} />
                    <WealthAnalysis property={selectedProperty} />
                  </div>
                )}
              </TabsContent>

              <TabsContent value="data" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Data Management</h3>
                  <MapDataSeeder onDataSeeded={handleDataSeeded} />
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold mb-4">Government Data</h3>
                  <DataGovIntegration />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Map */}
        <div className="flex-1">
          <MapboxWealthMap properties={properties} onPropertySelect={setSelectedProperty} filters={filters} />
        </div>
      </div>
    </div>
  )
}
