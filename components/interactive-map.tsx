"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, ZoomIn, ZoomOut, Layers, Navigation } from "lucide-react"

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

interface InteractiveMapProps {
  properties: Property[]
  onPropertySelect: (property: Property | null) => void
  center?: [number, number]
  zoom?: number
}

export function InteractiveMap({
  properties,
  onPropertySelect,
  center = [40.7128, -74.006],
  zoom = 10,
}: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<any[]>([])
  const [mapLayer, setMapLayer] = useState<"street" | "satellite">("street")
  const [isLoading, setIsLoading] = useState(true)

  // Load Leaflet dynamically
  useEffect(() => {
    const loadLeaflet = async () => {
      if (typeof window === "undefined") return

      // Dynamically import Leaflet
      const L = (await import("leaflet")).default

      // Load Leaflet CSS
      if (!document.querySelector('link[href*="leaflet.css"]')) {
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        document.head.appendChild(link)
      }

      // Fix default markers
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      })

      if (mapRef.current && !map) {
        const newMap = L.map(mapRef.current).setView(center, zoom)

        // Add tile layers
        const streetLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        })

        const satelliteLayer = L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          {
            attribution: "© Esri",
          },
        )

        streetLayer.addTo(newMap)

        // Store layers for switching
        ;(newMap as any).streetLayer = streetLayer
        ;(newMap as any).satelliteLayer = satelliteLayer

        setMap(newMap)
        setIsLoading(false)
      }
    }

    loadLeaflet()
  }, [center, zoom, map])

  // Update markers when properties change
  useEffect(() => {
    if (!map || !properties.length) return

    const L = require("leaflet")

    // Clear existing markers
    markers.forEach((marker) => map.removeLayer(marker))

    // Create new markers
    const newMarkers = properties.map((property) => {
      // Custom icon based on confidence
      const iconColor = property.confidence === "High" ? "green" : property.confidence === "Medium" ? "orange" : "red"

      const customIcon = L.divIcon({
        className: "custom-marker",
        html: `
          <div style="
            background-color: ${iconColor};
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 10px;
            font-weight: bold;
          ">
            $
          </div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      })

      const marker = L.marker([property.lat, property.lng], { icon: customIcon })
        .bindPopup(
          `
          <div style="min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">${property.address}</h3>
            <p style="margin: 4px 0; font-size: 12px;"><strong>Value:</strong> $${(property.value / 1000000).toFixed(1)}M</p>
            <p style="margin: 4px 0; font-size: 12px;"><strong>Owner:</strong> ${property.ownerName}</p>
            <p style="margin: 4px 0; font-size: 12px;"><strong>Owner Wealth:</strong> $${(property.ownerWealth / 1000000).toFixed(1)}M</p>
            <p style="margin: 4px 0; font-size: 12px;"><strong>Confidence:</strong> ${property.confidence}</p>
          </div>
        `,
        )
        .on("click", () => {
          onPropertySelect(property)
        })

      marker.addTo(map)
      return marker
    })

    setMarkers(newMarkers)

    // Fit map to show all markers
    if (newMarkers.length > 0) {
      const group = new L.featureGroup(newMarkers)
      map.fitBounds(group.getBounds().pad(0.1))
    }
  }, [map, properties, onPropertySelect])

  const toggleMapLayer = () => {
    if (!map) return

    const L = require("leaflet")
    const newLayer = mapLayer === "street" ? "satellite" : "street"

    if (newLayer === "satellite") {
      map.removeLayer((map as any).streetLayer)
      ;(map as any).satelliteLayer.addTo(map)
    } else {
      map.removeLayer((map as any).satelliteLayer)
      ;(map as any).streetLayer.addTo(map)
    }

    setMapLayer(newLayer)
  }

  const zoomIn = () => map?.zoomIn()
  const zoomOut = () => map?.zoomOut()
  const centerMap = () => map?.setView(center, zoom)

  if (isLoading) {
    return (
      <div className="h-full bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <div className="text-sm text-gray-600">Loading map...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-full">
      {/* Map Container */}
      <div ref={mapRef} className="h-full w-full" />

      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-[1000] space-y-2">
        <Card className="p-2">
          <div className="flex space-x-1">
            <Button variant={mapLayer === "street" ? "default" : "outline"} size="sm" onClick={toggleMapLayer}>
              <Layers className="h-4 w-4 mr-1" />
              {mapLayer === "street" ? "Street" : "Satellite"}
            </Button>
          </div>
        </Card>

        <Card className="p-2">
          <div className="flex flex-col space-y-1">
            <Button variant="outline" size="sm" onClick={zoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={zoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={centerMap}>
              <Navigation className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Map Legend */}
      <Card className="absolute bottom-4 left-4 z-[1000] p-4">
        <h3 className="font-semibold mb-2 text-sm">Confidence Level</h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
            <span>High Confidence</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-600 rounded-full mr-2"></div>
            <span>Medium Confidence</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
            <span>Low Confidence</span>
          </div>
        </div>
      </Card>

      {/* Property Count */}
      <Card className="absolute top-4 left-4 z-[1000] p-3">
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium">{properties.length} Properties</span>
        </div>
      </Card>
    </div>
  )
}
