import { ApiIntegrationRapidAPI } from "@/components/api-integration-rapidapi"

export default function RapidAPISetupPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">⚡ RapidAPI Integration Setup</h1>
        <p className="text-gray-600">
          Professional data enrichment using People Data Labs and Global Company Data APIs
        </p>
      </div>
      <ApiIntegrationRapidAPI />
    </div>
  )
}
