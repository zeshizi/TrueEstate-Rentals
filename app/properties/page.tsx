import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Property Database</h1>
          <p className="text-gray-600">
            Explore our comprehensive database of properties with verified ownership and wealth insights.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Advanced Property Search</h2>
          <p className="text-gray-600 mb-6">
            Use our powerful search tools to find properties by location, owner, or characteristics.
          </p>
          <div className="space-y-4">
            <a
              href="/search"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Property Search
            </a>
            <div className="text-sm text-gray-500">Search by address, owner name, property type, or value range</div>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-2">Property Search</h3>
            <p className="text-gray-600 text-sm">
              Find properties by address, neighborhood, or ZIP code with detailed ownership information.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-2">Owner Analysis</h3>
            <p className="text-gray-600 text-sm">
              Discover property owners with wealth estimates and business entity information.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-gray-900 mb-2">Market Insights</h3>
            <p className="text-gray-600 text-sm">
              Access property values, transaction history, and market trend analysis.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
