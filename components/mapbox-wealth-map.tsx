"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Layers, Navigation, Eye, Crown, Star } from "lucide-react"

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
  featured?: boolean
}

interface MapboxWealthMapProps {
  properties: Property[]
  onPropertySelect: (property: Property | null) => void
  filters: any
}

// Sample featured properties with real coordinates
const SAMPLE_PROPERTIES: Property[] = [
  {
    id: "sample_1",
    lat: 34.0901,
    lng: -118.4065,
    address: "912 N Beverly Dr, Beverly Hills, CA",
    value: 15000000,
    ownerWealth: 250000000,
    ownerName: "Tech CEO Holdings LLC",
    confidence: "High",
    propertyType: "single-family",
    featured: true,
  },
  {
    id: "sample_2",
    lat: 40.7614,
    lng: -73.9776,
    address: "432 Park Ave, Manhattan, NY",
    value: 8500000,
    ownerWealth: 180000000,
    ownerName: "Goldman Investment Trust",
    confidence: "High",
    propertyType: "condo",
    featured: true,
  },
  {
    id: "sample_3",
    lat: 34.0259,
    lng: -118.7798,
    address: "23456 Pacific Coast Hwy, Malibu, CA",
    value: 12000000,
    ownerWealth: 320000000,
    ownerName: "Entertainment Mogul Inc",
    confidence: "High",
    propertyType: "single-family",
    featured: true,
  },
  {
    id: "sample_4",
    lat: 39.1911,
    lng: -106.8175,
    address: "789 Aspen Mountain Rd, Aspen, CO",
    value: 6800000,
    ownerWealth: 150000000,
    ownerName: "Hedge Fund Partners",
    confidence: "High",
    propertyType: "single-family",
    featured: true,
  },
  {
    id: "sample_5",
    lat: 40.9176,
    lng: -72.3951,
    address: "567 Meadow Ln, East Hampton, NY",
    value: 9200000,
    ownerWealth: 200000000,
    ownerName: "Real Estate Dynasty LLC",
    confidence: "High",
    propertyType: "single-family",
    featured: true,
  },
  {
    id: "sample_6",
    lat: 37.4419,
    lng: -122.143,
    address: "1234 University Ave, Palo Alto, CA",
    value: 4500000,
    ownerWealth: 85000000,
    ownerName: "Startup Founder",
    confidence: "Medium",
    propertyType: "single-family",
    featured: true,
  },
  {
    id: "sample_7",
    lat: 41.0534,
    lng: -73.5387,
    address: "890 Round Hill Rd, Greenwich, CT",
    value: 3800000,
    ownerWealth: 95000000,
    ownerName: "Finance Executive",
    confidence: "Medium",
    propertyType: "single-family",
    featured: true,
  },
  {
    id: "sample_8",
    lat: 33.4942,
    lng: -111.9261,
    address: "345 Desert Mountain Dr, Scottsdale, AZ",
    value: 2900000,
    ownerWealth: 75000000,
    ownerName: "Retired CEO",
    confidence: "Medium",
    propertyType: "single-family",
    featured: true,
  },
]

export function MapboxWealthMap({ properties, onPropertySelect, filters }: MapboxWealthMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapStyle, setMapStyle] = useState("streets-v12")
  const [viewMode, setViewMode] = useState<"wealth" | "confidence" | "property-type">("wealth")
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [mapboxConfig, setMapboxConfig] = useState<any>(null)
  const [configError, setConfigError] = useState<string | null>(null)
  const [showSamples, setShowSamples] = useState(true)

  // Combine sample properties with user properties
  const allProperties = showSamples ? [...SAMPLE_PROPERTIES, ...properties] : properties

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
          const propertyData = allProperties.find((p) => p.id === property.id)
          if (propertyData) {
            setSelectedProperty(propertyData)
            onPropertySelect(propertyData)

            // Create popup
            new mapboxgl.Popup().setLngLat(e.lngLat).setHTML(createPopupHTML(propertyData)).addTo(map.current)
          }
        })

        // Handle featured property clicks
        map.current.on("click", "featured-properties-layer", (e: any) => {
          const property = e.features[0].properties
          const propertyData = allProperties.find((p) => p.id === property.id)
          if (propertyData) {
            setSelectedProperty(propertyData)
            onPropertySelect(propertyData)

            // Create enhanced popup for featured properties
            new mapboxgl.Popup().setLngLat(e.lngLat).setHTML(createFeaturedPopupHTML(propertyData)).addTo(map.current)
          }
        })

        // Change cursor on hover
        map.current.on("mouseenter", "properties-layer", () => {
          map.current.getCanvas().style.cursor = "pointer"
        })

        map.current.on("mouseleave", "properties-layer", () => {
          map.current.getCanvas().style.cursor = ""
        })

        map.current.on("mouseenter", "featured-properties-layer", () => {
          map.current.getCanvas().style.cursor = "pointer"
        })

        map.current.on("mouseleave", "featured-properties-layer", () => {
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

    // Separate featured and regular properties
    const featuredProperties = allProperties.filter((p) => p.featured)
    const regularProperties = allProperties.filter((p) => !p.featured)

    // Convert regular properties to GeoJSON
    const regularGeojsonData = {
      type: "FeatureCollection",
      features: regularProperties.map((property) => ({
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

    // Convert featured properties to GeoJSON
    const featuredGeojsonData = {
      type: "FeatureCollection",
      features: featuredProperties.map((property) => ({
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

    // Add regular properties source
    if (map.current.getSource("properties")) {
      map.current.getSource("properties").setData(regularGeojsonData)
    } else {
      map.current.addSource("properties", {
        type: "geojson",
        data: regularGeojsonData,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      })
    }

    // Add featured properties source
    if (map.current.getSource("featured-properties")) {
      map.current.getSource("featured-properties").setData(featuredGeojsonData)
    } else {
      map.current.addSource("featured-properties", {
        type: "geojson",
        data: featuredGeojsonData,
      })
    }

    // Add cluster layer for regular properties
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

    // Add individual regular property points
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

    // Add featured properties layer with special styling
    if (!map.current.getLayer("featured-properties-layer")) {
      map.current.addLayer({
        id: "featured-properties-layer",
        type: "circle",
        source: "featured-properties",
        paint: {
          "circle-color": [
            "interpolate",
            ["linear"],
            ["get", "ownerWealth"],
            50000000,
            "#fbbf24", // Gold for $50M+
            100000000,
            "#f59e0b", // Darker gold for $100M+
            200000000,
            "#d97706", // Orange for $200M+
            300000000,
            "#dc2626", // Red for $300M+
          ],
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 8, 8, 16, 20],
          "circle-stroke-width": 3,
          "circle-stroke-color": "#ffffff",
          "circle-opacity": 0.9,
        },
      })
    }

    // Add pulsing animation for featured properties
    if (!map.current.getLayer("featured-properties-pulse")) {
      map.current.addLayer({
        id: "featured-properties-pulse",
        type: "circle",
        source: "featured-properties",
        paint: {
          "circle-color": "#fbbf24",
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 8, 15, 16, 30],
          "circle-opacity": ["interpolate", ["linear"], ["zoom"], 8, 0.3, 16, 0.1],
          "circle-stroke-width": 0,
        },
      })
    }

    // Add featured property labels
    if (!map.current.getLayer("featured-property-labels")) {
      map.current.addLayer({
        id: "featured-property-labels",
        type: "symbol",
        source: "featured-properties",
        layout: {
          "text-field": [
            "format",
            "★ $",
            { "font-scale": 0.8 },
            ["number-format", ["get", "value"], { "min-fraction-digits": 0, "max-fraction-digits": 0 }],
            {},
          ],
          "text-font": ["DIN Offc Pro Bold", "Arial Unicode MS Bold"],
          "text-size": 12,
          "text-offset": [0, 2],
          "text-anchor": "top",
        },
        paint: {
          "text-color": "#1f2937",
          "text-halo-color": "#ffffff",
          "text-halo-width": 2,
        },
        minzoom: 10,
      })
    }

    // Add regular property labels
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
  }, [allProperties, mapLoaded, showSamples])

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

  // Create popup HTML for regular properties
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

  // Create enhanced popup HTML for featured properties
  const createFeaturedPopupHTML = (property: Property) => {
    return `
      <div class="p-4 min-w-[300px] bg-gradient-to-br from-yellow-50 to-orange-50">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-yellow-500">★</span>
          <h3 class="font-bold text-base text-gray-900">Featured Property</h3>
        </div>
        <h4 class="font-semibold text-sm mb-3 text-gray-800">${property.address}</h4>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-600">Property Value:</span>
            <span class="font-bold text-green-700">$${(property.value / 1000000).toFixed(1)}M</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Owner:</span>
            <span class="font-semibold text-gray-900">${property.ownerName}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Estimated Net Worth:</span>
            <span class="font-bold text-blue-700">$${(property.ownerWealth / 1000000).toFixed(0)}M</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Analysis Confidence:</span>
            <span class="inline-flex px-3 py-1 text-xs font-medium rounded-full ${
              property.confidence === "High"
                ? "bg-green-100 text-green-800"
                : property.confidence === "Medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
            }">${property.confidence}</span>
          </div>
        </div>
        <div class="mt-3 pt-3 border-t border-yellow-200">
          <p class="text-xs text-gray-600">Ultra-high net worth individual identified through our proprietary analysis</p>
        </div>
      </div>
    `
  }

  // Zoom to fit all properties
  const fitToProperties = () => {
    if (map.current && allProperties.length > 0) {
      const bounds = new (window as any).mapboxgl.LngLatBounds()
      allProperties.forEach((property) => {
        bounds.extend([property.lng, property.lat])
      })
      map.current.fitBounds(bounds, { padding: 50 })
    }
  }

  // Zoom to featured properties
  const showFeaturedProperties = () => {
    if (map.current && SAMPLE_PROPERTIES.length > 0) {
      const bounds = new (window as any).mapboxgl.LngLatBounds()
      SAMPLE_PROPERTIES.forEach((property) => {
        bounds.extend([property.lng, property.lat])
      })
      map.current.fitBounds(bounds, { padding: 100 })
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
        {/* Featured Properties Toggle */}
        <Card className="p-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Sample Properties</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant={showSamples ? "default" : "outline"}
                size="sm"
                onClick={() => setShowSamples(!showSamples)}
              >
                {showSamples ? "Hide" : "Show"} Samples
              </Button>
              <Button variant="outline" size="sm" onClick={showFeaturedProperties}>
                <Crown className="h-3 w-3 mr-1" />
                Tour
              </Button>
            </div>
          </div>
        </Card>

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
          {showSamples && (
            <div className="mb-3 pb-2 border-b border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                <span className="font-medium">Featured Properties</span>
              </div>
              <div className="text-xs text-gray-600">Ultra-high net worth samples</div>
            </div>
          )}
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
            <span className="text-sm font-medium">{allProperties.length} Properties</span>
          </div>
          <Button variant="outline" size="sm" onClick={fitToProperties}>
            <Navigation className="h-4 w-4 mr-1" />
            Fit All
          </Button>
        </div>
        {showSamples && (
          <div className="mt-2 text-xs text-gray-600">{SAMPLE_PROPERTIES.length} featured samples included</div>
        )}
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
