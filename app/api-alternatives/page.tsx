import { ApiIntegrationUSAlternatives } from "@/components/api-integration-us-alternatives"

export default function ApiAlternativesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🇺🇸 US-Focused Free API Alternatives</h1>
        <p className="text-gray-600">Official US government data sources with zero API costs</p>
      </div>
      <ApiIntegrationUSAlternatives />
    </div>
  )
}
