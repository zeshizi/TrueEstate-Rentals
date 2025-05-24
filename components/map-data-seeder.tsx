"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Database, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

interface MapDataSeederProps {
  onDataSeeded?: () => void
}

export function MapDataSeeder({ onDataSeeded }: MapDataSeederProps) {
  const [status, setStatus] = useState<"idle" | "seeding" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [propertyCount, setPropertyCount] = useState(0)

  const seedMapData = async () => {
    setStatus("seeding")
    setMessage("Seeding property data...")

    try {
      const response = await fetch("/api/seed-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage(data.message || "Properties seeded successfully!")
        setPropertyCount(data.count || 15)

        // Notify parent component to refresh data
        if (onDataSeeded) {
          onDataSeeded()
        }
      } else {
        setStatus("error")
        setMessage(data.error || "Failed to seed properties")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Network error occurred while seeding data")
      console.error("Seeding error:", error)
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case "seeding":
        return <Loader2 className="h-4 w-4 animate-spin" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Database className="h-4 w-4" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "seeding":
        return "bg-blue-100 text-blue-800"
      case "success":
        return "bg-green-100 text-green-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Map Data Seeder
        </CardTitle>
        <CardDescription>Populate the map with 15 sample luxury properties across major US cities</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Status:</span>
          <Badge className={getStatusColor()}>
            <span className="flex items-center gap-1">
              {getStatusIcon()}
              {status === "idle" && "Ready"}
              {status === "seeding" && "Seeding..."}
              {status === "success" && "Complete"}
              {status === "error" && "Error"}
            </span>
          </Badge>
        </div>

        {message && (
          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
            {message}
            {status === "success" && propertyCount > 0 && (
              <div className="mt-2 font-medium text-green-700">{propertyCount} properties added to the map</div>
            )}
          </div>
        )}

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Sample Properties Include:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Manhattan, NY - $45M penthouse</li>
            <li>• Beverly Hills, CA - $28M mansion</li>
            <li>• San Francisco, CA - $22M historic home</li>
            <li>• Seattle, WA - $18M waterfront condo</li>
            <li>• Miami, FL - $15M Brickell condo</li>
            <li>• And 10 more luxury properties...</li>
          </ul>
        </div>

        <Button onClick={seedMapData} disabled={status === "seeding"} className="w-full">
          {status === "seeding" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Seeding Properties...
            </>
          ) : (
            <>
              <Database className="mr-2 h-4 w-4" />
              Seed Sample Properties
            </>
          )}
        </Button>

        {status === "success" && (
          <div className="text-xs text-green-600 text-center">
            ✅ Map data successfully populated! Zoom out to see all properties.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
