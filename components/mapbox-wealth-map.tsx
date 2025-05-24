"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Layers, Navigation, Eye } from "lucide-react"

interface Property {
  id: string
  lat: number
  lng: number
  address: string
  value: number
  ownerWealth: number
  ownerName: string
  confidence: "High" | "Medium" | "Low"
  propertyType: string
}

interface MapboxWealthMapProps {
  properties: Property[]
  onPropertySelect: (property: Property | null) => void
  filters: any
}

export function MapboxWealthMap({ properties, onPropertySelect, filters }: MapboxWealthMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapStyle, setMapStyle] = useState("streets-v12")
  const [viewMode, setViewMode] = useState<"wealth" | "confidence" | "property-type">("wealth")
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [mapboxConfig, setMapboxConfig] = useState<any>(null)
  const [configError, setConfigError] = useState<string | null>(null)

  // Fetch Mapbox configuration from server
  useEffect(() => {
    const fetchMapboxConfig = async () => {
      try {
        const response = await fetch("/api/mapbox/config")
        const data = await response.json()

        if (response.ok) {
          setMapboxConfig(data)
        } else {
          setConfigError(data.error || "Failed to load Mapbox configuration")
        }
      } catch (error) {
        setConfigError("Network error loading Mapbox configuration")
      }
    }

    fetchMapboxConfig()
  }, [])

  // Initialize Mapbox
  useEffect(() => {
    const initializeMap = async () => {
      if (map.current || !mapContainer.current || !mapboxConfig?.token) return

      try {
        // Dynamically import Mapbox GL JS
        const mapboxgl = (await import("mapbox-gl")).default

        // Set access token from server config
        mapboxgl.accessToken = mapboxConfig.token

        // Create map instance
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: `mapbox://styles/mapbox/${mapStyle}`,
          center: [-98.5795, 39.8283], // Center of US
          zoom: 4,
          pitch: 45,
          bearing: 0,
        })

        // Add navigation controls
        map.current.addControl(new mapboxgl.NavigationControl(), "top-right")

        // Add fullscreen control
        map.current.addControl(new mapboxgl.FullscreenControl(), "top-right")

        // Wait for map to load
        map.current.on("load", () => {
          setMapLoaded(true)
          addPropertyLayers()
        })

        // Handle property clicks
        map.current.on("click", "properties-layer", (e: any) => {
          const property = e.features[0].properties
          const propertyData = properties.find((p) => p.id === property.id)
          if (propertyData) {
            setSelectedProperty(propertyData)
            onPropertySelect(propertyData)

            // Create popup
            new mapboxgl.Popup().setLngLat(e.lngLat).setHTML(createPopupHTML(propertyData)).addTo(map.current)
          }
        })

        // Change cursor on hover
        map.current.on("mouseenter", "properties-layer", () => {
          map.current.getCanvas().style.cursor = "pointer"
        })

        map.current.on("mouseleave", "properties-layer", () => {
          map.current.getCanvas().style.cursor = ""
        })
      } catch (error) {
        console.error("Failed to initialize Mapbox:", error)
        setConfigError("Failed to initialize Mapbox map")
      }
    }

    if (mapboxConfig) {
      initializeMap()
    }

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [mapboxConfig, mapStyle])

  // Add property data layers
  const addPropertyLayers = () => {
    if (!map.current || !mapLoaded) return

    // Convert properties to GeoJSON
    const geojsonData = {
      type: "FeatureCollection",
      features: properties.map((property) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [property.lng, property.lat],
        },
        properties: {
          id: property.id,
          address: property.address,
          value: property.value,
          ownerWealth: property.ownerWealth,
          ownerName: property.ownerName,
          confidence: property.confidence,
          propertyType: property.propertyType,
        },
      })),
    }

    // Add data source
    if (map.current.getSource("properties")) {
      map.current.getSource("properties").setData(geojsonData)
    } else {
      map.current.addSource("properties", {
        type: "geojson",
        data: geojsonData,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      })
    }

    // Add cluster layer
    if (!map.current.getLayer("clusters")) {
      map.current.addLayer({
        id: "clusters",
        type: "circle",
        source: "properties",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": ["step", ["get", "point_count"], "#51bbd6", 100, "#f1f075", 750, "#f28cb1"],
          "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
        },
      })
    }

    // Add cluster count labels
    if (!map.current.getLayer("cluster-count")) {
      map.current.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "properties",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
      })
    }

    // Add individual property points
    if (!map.current.getLayer("properties-layer")) {
      map.current.addLayer({
        id: "properties-layer",
        type: "circle",
        source: "properties",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": getCircleColor(),
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 8, 4, 16, 12],
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      })
    }

    // Add property labels
    if (!map.current.getLayer("property-labels")) {
      map.current.addLayer({
        id: "property-labels",
        type: "symbol",
        source: "properties",
        filter: ["!", ["has", "point_count"]],
        layout: {
          "text-field": [
            "format",
            "$",
            {},
            ["number-format", ["get", "value"], { "min-fraction-digits": 0, "max-fraction-digits": 0 }],
            {},
          ],
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 10,
          "text-offset": [0, 1.5],
          "text-anchor": "top",
        },
        paint: {
          "text-color": "#000000",
          "text-halo-color": "#ffffff",
          "text-halo-width": 1,
        },
        minzoom: 12,
      })
    }
  }

  // Get circle color based on view mode
  const getCircleColor = () => {
    switch (viewMode) {
      case "wealth":
        return [
          "interpolate",
          ["linear"],
          ["get", "ownerWealth"],
          1000000,
          "#22c55e", // Green for $1M+
          5000000,
          "#eab308", // Yellow for $5M+
          10000000,
          "#f97316", // Orange for $10M+
          25000000,
          "#ef4444", // Red for $25M+
        ]
      case "confidence":
        return [
          "case",
          ["==", ["get", "confidence"], "High"],
          "#22c55e",
          ["==", ["get", "confidence"], "Medium"],
          "#eab308",
          "#ef4444", // Low confidence
        ]
      case "property-type":
        return [
          "case",
          ["==", ["get", "propertyType"], "single-family"],
          "#3b82f6",
          ["==", ["get", "propertyType"], "condo"],
          "#8b5cf6",
          ["==", ["get", "propertyType"], "townhouse"],
          "#06b6d4",
          ["==", ["get", "propertyType"], "multi-family"],
          "#10b981",
          "#6b7280", // Default
        ]
      default:
        return "#3b82f6"
    }
  }

  // Update layer styling when view mode changes
  useEffect(() => {
    if (map.current && mapLoaded && map.current.getLayer("properties-layer")) {
      map.current.setPaintProperty("properties-layer", "circle-color", getCircleColor())
    }
  }, [viewMode, mapLoaded])

  // Update data when properties change
  useEffect(() => {
    if (map.current && mapLoaded) {
      addPropertyLayers()
    }
  }, [properties, mapLoaded])

  // Change map style
  const changeMapStyle = (style: string) => {
    if (map.current) {
      map.current.setStyle(`mapbox://styles/mapbox/${style}`)
      setMapStyle(style)

      // Re-add layers after style change
      map.current.once("styledata", () => {
        addPropertyLayers()
      })
    }
  }

  // Create popup HTML
  const createPopupHTML = (property: Property) => {
    return `
      <div class="p-3 min-w-[250px]">
        <h3 class="font-semibold text-sm mb-2">${property.address}</h3>
        <div class="space-y-1 text-xs">
          <div class="flex justify-between">
            <span>Property Value:</span>
            <span class="font-medium">$${(property.value / 1000000).toFixed(1)}M</span>
          </div>
          <div class="flex justify-between">
            <span>Owner:</span>
            <span class="font-medium">${property.ownerName}</span>
          </div>
          <div class="flex justify-between">
            <span>Owner Wealth:</span>
            <span class="font-medium">$${(property.ownerWealth / 1000000).toFixed(1)}M</span>
          </div>
          <div class="flex justify-between">
            <span>Confidence:</span>
            <span class="inline-flex px-2 py-1 text-xs rounded-full ${
              property.confidence === "High"
                ? "bg-green-100 text-green-800"
                : property.confidence === "Medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
            }">${property.confidence}</span>
          </div>
        </div>
      </div>
    `
  }

  // Zoom to fit all properties
  const fitToProperties = () => {
    if (map.current && properties.length > 0) {
      const bounds = new (window as any).mapboxgl.LngLatBounds()
      properties.forEach((property) => {
        bounds.extend([property.lng, property.lat])
      })
      map.current.fitBounds(bounds, { padding: 50 })
    }
  }

  // Show error state
  if (configError) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <Card className="p-6 max-w-md">
          <div className="text-center space-y-4">
            <MapPin className="h-12 w-12 text-red-500 mx-auto" />
            <h3 className="text-lg font-semibold text-red-900">Mapbox Configuration Error</h3>
            <p className="text-sm text-red-700">{configError}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  // Show loading state
  if (!mapboxConfig) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <div className="text-sm text-gray-600">Loading Mapbox configuration...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-full">
      {/* Map Container */}
      <div ref={mapContainer} className="h-full w-full" />

      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-10 space-y-3">
        {/* View Mode Selector */}
        <Card className="p-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span className="text-sm font-medium">View Mode</span>
            </div>
            <Select value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wealth">Owner Wealth</SelectItem>
                <SelectItem value="confidence">Confidence Level</SelectItem>
                <SelectItem value="property-type">Property Type</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Style Selector */}
        <Card className="p-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              <span className="text-sm font-medium">Map Style</span>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <Button
                variant={mapStyle === "streets-v12" ? "default" : "outline"}
                size="sm"
                onClick={() => changeMapStyle("streets-v12")}
              >
                Streets
              </Button>
              <Button
                variant={mapStyle === "satellite-v9" ? "default" : "outline"}
                size="sm"
                onClick={() => changeMapStyle("satellite-v9")}
              >
                Satellite
              </Button>
              <Button
                variant={mapStyle === "light-v11" ? "default" : "outline"}
                size="sm"
                onClick={() => changeMapStyle("light-v11")}
              >
                Light
              </Button>
              <Button
                variant={mapStyle === "dark-v11" ? "default" : "outline"}
                size="sm"
                onClick={() => changeMapStyle("dark-v11")}
              >
                Dark
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Legend */}
      <Card className="absolute bottom-4 left-4 z-10 p-4">
        <h3 className="font-semibold mb-3 text-sm">
          {viewMode === "wealth" && "Owner Wealth"}
          {viewMode === "confidence" && "Confidence Level"}
          {viewMode === "property-type" && "Property Type"}
        </h3>
        <div className="space-y-2 text-xs">
          {viewMode === "wealth" && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>$1M - $5M</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>$5M - $10M</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>$10M - $25M</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>$25M+</span>
              </div>
            </>
          )}
          {viewMode === "confidence" && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>High Confidence</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Medium Confidence</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Low Confidence</span>
              </div>
            </>
          )}
          {viewMode === "property-type" && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Single Family</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>Condo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                <span>Townhouse</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span>Multi-Family</span>
              </div>
            </>
          )}
        </div>
      </Card>

      {/* Property Count & Controls */}
      <Card className="absolute top-4 right-4 z-10 p-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">{properties.length} Properties</span>
          </div>
          <Button variant="outline" size="sm" onClick={fitToProperties}>
            <Navigation className="h-4 w-4 mr-1" />
            Fit All
          </Button>
        </div>
      </Card>

      {/* Loading Overlay */}
      {!mapLoaded && mapboxConfig && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <div className="text-sm text-gray-600">Loading Mapbox...</div>
          </div>
        </div>
      )}
    </div>
  )
}
