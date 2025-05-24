import { RapidAPIIntegrationTest } from "@/components/rapidapi-integration-test"

export default function TestRapidAPIIntegrationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">RapidAPI Integration Test</h1>
        <p className="text-gray-600 mt-2">Test and verify all RapidAPI integrations are working correctly</p>
      </div>

      <RapidAPIIntegrationTest />
    </div>
  )
}
