import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SearchFilters } from "@/components/search-filters"
import { SearchResults } from "@/components/search-results"

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

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <SearchFilters />
          </div>

          <div className="lg:col-span-3">
            <SearchResults />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
