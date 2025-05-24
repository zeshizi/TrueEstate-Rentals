"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, ZoomIn, ZoomOut, Bookmark } from "lucide-react"

interface Property {
  id: string
  lat: number
  lng: number
  address: string
  value: number
  ownerWealth: number
  ownerName: string
  confidence: "High" | "Medium" | "Low"
}

interface MapContainerProps {
  filters: any
  onPropertySelect: (property: Property | null) => void
}

export function MapContainer({ filters, onPropertySelect }: MapContainerProps) {
  const [mapView, setMapView] = useState<"standard" | "satellite">("standard")
  const [zoom, setZoom] = useState(10)
  const [properties, setProperties] = useState<Property[]>([])
  const [savedViews, setSavedViews] = useState<string[]>([])

  // Mock property data
  useEffect(() => {
    const mockProperties: Property[] = [
      {
        id: "1",
        lat: 34.0522,
        lng: -118.2437,
        address: "123 Luxury Ave, Beverly Hills, CA",
        value: 2500000,
        ownerWealth: 15000000,
        ownerName: "John Smith",
        confidence: "High",
      },
      {
        id: "2",
        lat: 40.7589,
        lng: -73.9851,
        address: "456 Park Place, Manhattan, NY",
        value: 1800000,
        ownerWealth: 8000000,
        ownerName: "Sarah Johnson",
        confidence: "Medium",
      },
      {
        id: "3",
        lat: 25.7617,
        lng: -80.1918,
        address: "789 Ocean View, Miami, FL",
        value: 3200000,
        ownerWealth: 25000000,
        ownerName: "Miami Holdings LLC",
        confidence: "High",
      },
    ]
    setProperties(mockProperties)
  }, [filters])

  const handlePropertyClick = (property: Property) => {
    onPropertySelect(property)
  }

  const saveCurrentView = () => {
    const viewId = `view-${Date.now()}`
    setSavedViews([...savedViews, viewId])
  }

  return (
    <div className="relative h-full bg-gray-200">
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 space-y-2">
        <div className="bg-white rounded-lg shadow-lg p-2">
          <Button
            variant={mapView === "standard" ? "default" : "outline"}
            size="sm"
            onClick={() => setMapView("standard")}
            className="mr-2"
          >
            Standard
          </Button>
          <Button
            variant={mapView === "satellite" ? "default" : "outline"}
            size="sm"
            onClick={() => setMapView("satellite")}
          >
            Satellite
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-2 flex flex-col space-y-1">
          <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(zoom + 1, 18))}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(zoom - 1, 1))}>
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-2">
          <Button variant="outline" size="sm" onClick={saveCurrentView}>
            <Bookmark className="h-4 w-4 mr-2" />
            Save View
          </Button>
        </div>
      </div>

      {/* Mock Map with Property Markers */}
      <div className="h-full relative overflow-hidden">
        {/* Background map simulation */}
        <div className={`h-full w-full ${mapView === "satellite" ? "bg-green-900" : "bg-gray-300"}`}>
          {/* Property markers */}
          {properties.map((property) => (
            <div
              key={property.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${((property.lng + 180) / 360) * 100}%`,
                top: `${((90 - property.lat) / 180) * 100}%`,
              }}
              onClick={() => handlePropertyClick(property)}
            >
              <div className="relative">
                <MapPin className="h-8 w-8 text-red-600 hover:text-red-700" />
                <Badge
                  className={`absolute -top-2 -right-2 text-xs ${
                    property.confidence === "High"
                      ? "bg-green-600"
                      : property.confidence === "Medium"
                        ? "bg-yellow-600"
                        : "bg-red-600"
                  }`}
                >
                  {property.confidence}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4">
        <h3 className="font-semibold mb-2">Legend</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-600 rounded mr-2"></div>
            <span>High Confidence</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-600 rounded mr-2"></div>
            <span>Medium Confidence</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-600 rounded mr-2"></div>
            <span>Low Confidence</span>
          </div>
        </div>
      </div>
    </div>
  )
}
