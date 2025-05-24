import { Header } from "@/components/header"
import { MapboxSetupGuide } from "@/components/mapbox-setup-guide"

export default function MapboxSetupPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mapbox Integration Setup</h1>
          <p className="text-gray-600">Configure Mapbox for professional interactive mapping</p>
        </div>
        <MapboxSetupGuide />
      </div>
    </div>
  )
}
