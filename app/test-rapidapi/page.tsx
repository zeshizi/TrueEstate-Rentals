import { RapidAPITestDashboard } from "@/components/rapidapi-test-dashboard"

export default function TestRapidAPIPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🧪 Test RapidAPI Integration</h1>
        <p className="text-gray-600">Test your People Data Labs and Global Company Data API integration</p>
      </div>
      <RapidAPITestDashboard />
    </div>
  )
}
