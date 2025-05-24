"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { MapboxWealthMap } from "@/components/mapbox-wealth-map"
import { PropertyFilters } from "@/components/property-filters"
import { EnhancedPropertyDetails } from "@/components/enhanced-property-details"
import { WealthAnalysis } from "@/components/wealth-analysis"
import { DataGovIntegration } from "@/components/data-gov-integration"
import { MapDataSeeder } from "@/components/map-data-seeder"
import { PropertyBookmarkManager } from "@/components/property-bookmark-manager"
import { SavedSearches } from "@/components/saved-searches"
import { PropertyExportManager } from "@/components/property-export-manager"
import { OwnerComparisonTool } from "@/components/owner-comparison-tool"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Filter, Database, Wrench, X } from "lucide-react"

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
  const [isMobile, setIsMobile] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

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
    fetchProperties()
  }

  const handleLoadSearch = (searchFilters: any) => {
    setFilters(searchFilters)
  }

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        {/* Mobile Map Container */}
        <div className="relative h-[calc(100vh-64px)]">
          {/* Full Screen Map */}
          <div className="absolute inset-0">
            <MapboxWealthMap properties={properties} onPropertySelect={setSelectedProperty} filters={filters} />
          </div>

          {/* Mobile Controls Overlay */}
          <div className="absolute top-4 left-4 right-4 z-20">
            <div className="flex items-center justify-between">
              <div className="bg-white rounded-lg shadow-lg p-2">
                <h1 className="text-sm font-semibold text-gray-900">US Wealth Map</h1>
              </div>

              {/* Mobile Filter Button */}
              <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                <SheetTrigger asChild>
                  <Button size="sm" className="bg-white text-gray-900 shadow-lg hover:bg-gray-50">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh] rounded-t-xl">
                  <SheetHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <SheetTitle>Map Controls</SheetTitle>
                      <Button variant="ghost" size="sm" onClick={() => setFiltersOpen(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </SheetHeader>

                  <div className="overflow-y-auto h-full pb-6">
                    <Tabs defaultValue="filters" className="w-full">
                      <TabsList className="grid w-full grid-cols-3 mb-4">
                        <TabsTrigger value="filters" className="text-xs">
                          <Filter className="h-3 w-3 mr-1" />
                          Filters
                        </TabsTrigger>
                        <TabsTrigger value="data" className="text-xs">
                          <Database className="h-3 w-3 mr-1" />
                          Data
                        </TabsTrigger>
                        <TabsTrigger value="tools" className="text-xs">
                          <Wrench className="h-3 w-3 mr-1" />
                          Tools
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="filters" className="space-y-4">
                        <PropertyFilters filters={filters} onFiltersChange={setFilters} />
                        <SavedSearches currentFilters={filters} onLoadSearch={handleLoadSearch} />

                        {selectedProperty && (
                          <div className="space-y-4 border-t pt-4">
                            <h3 className="font-semibold text-sm">Selected Property</h3>
                            <EnhancedPropertyDetails property={selectedProperty} />
                            <WealthAnalysis property={selectedProperty} />
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="data" className="space-y-4">
                        <div>
                          <h3 className="text-base font-semibold mb-3">Data Management</h3>
                          <MapDataSeeder onDataSeeded={handleDataSeeded} />
                        </div>

                        <div className="border-t pt-4">
                          <h3 className="text-base font-semibold mb-3">Government Data</h3>
                          <DataGovIntegration />
                        </div>

                        <div className="border-t pt-4">
                          <PropertyBookmarkManager />
                        </div>
                      </TabsContent>

                      <TabsContent value="tools" className="space-y-4">
                        <PropertyExportManager
                          properties={properties}
                          selectedProperties={selectedProperty ? [selectedProperty.id] : []}
                        />

                        <div className="border-t pt-4">
                          <OwnerComparisonTool />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Mobile Property Info (if selected) */}
          {selectedProperty && (
            <div className="absolute bottom-4 left-4 right-4 z-20">
              <div className="bg-white rounded-lg shadow-lg p-4 max-h-48 overflow-y-auto">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm text-gray-900 flex-1">{selectedProperty.address}</h3>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedProperty(null)} className="p-1 h-auto">
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Value:</span>
                    <span className="font-medium">${(selectedProperty.value / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Owner Wealth:</span>
                    <span className="font-medium">${(selectedProperty.ownerWealth / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Owner:</span>
                    <span className="font-medium text-right flex-1 ml-2">{selectedProperty.ownerName}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Desktop Layout (unchanged)
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex h-[calc(100vh-64px)]">
        {/* Desktop Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-6">
            <Tabs defaultValue="filters" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="filters">Filters</TabsTrigger>
                <TabsTrigger value="data">Data</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
              </TabsList>

              <TabsContent value="filters" className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">US Wealth Map</h1>
                  <p className="text-sm text-gray-600">Interactive map with {properties.length} properties loaded</p>
                </div>

                <PropertyFilters filters={filters} onFiltersChange={setFilters} />

                <SavedSearches currentFilters={filters} onLoadSearch={handleLoadSearch} />

                {selectedProperty && (
                  <div className="space-y-4">
                    <EnhancedPropertyDetails property={selectedProperty} />
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

                <div className="border-t pt-4">
                  <PropertyBookmarkManager />
                </div>
              </TabsContent>

              <TabsContent value="tools" className="space-y-4">
                <PropertyExportManager
                  properties={properties}
                  selectedProperties={selectedProperty ? [selectedProperty.id] : []}
                />

                <div className="border-t pt-4">
                  <OwnerComparisonTool />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Desktop Map */}
        <div className="flex-1">
          <MapboxWealthMap properties={properties} onPropertySelect={setSelectedProperty} filters={filters} />
        </div>
      </div>
    </div>
  )
}
