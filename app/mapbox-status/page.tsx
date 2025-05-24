import { Header } from "@/components/header"
import { MapboxStatus } from "@/components/mapbox-status"

export default function MapboxStatusPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mapbox Integration Status</h1>
          <p className="text-gray-600">Verify your Mapbox configuration and test the wealth map features</p>
        </div>
        <MapboxStatus />
      </div>
    </div>
  )
}
