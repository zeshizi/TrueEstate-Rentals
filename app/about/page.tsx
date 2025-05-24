import { Users, Target, Award } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About TrueEstate</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionizing real estate transparency with verified ownership data and wealth insights
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-4">
              TrueEstate is dedicated to bringing unprecedented transparency to the real estate market. We believe that
              access to accurate property ownership and wealth information should be available to everyone.
            </p>
            <p className="text-lg text-gray-600">
              Our platform combines official government data sources with advanced analytics to provide the most
              comprehensive real estate intelligence available.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">10M+</div>
                <div className="text-gray-600">Properties Tracked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">50</div>
                <div className="text-gray-600">States Covered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">15+</div>
                <div className="text-gray-600">Data Sources</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">99.9%</div>
                <div className="text-gray-600">Uptime</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Transparency</h3>
            <p className="text-gray-600">
              We believe in open access to property ownership information and market data.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Accuracy</h3>
            <p className="text-gray-600">
              Our data comes directly from official government sources and verified registries.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-gray-600">We continuously develop new tools and insights to serve our users better.</p>
          </div>
        </div>

        <div className="bg-gray-900 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-gray-300 mb-6">
            Join thousands of professionals using TrueEstate for real estate intelligence.
          </p>
          <a
            href="/auth/signin"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium inline-block"
          >
            Get Started Today
          </a>
        </div>
      </main>

      <Footer />
    </div>
  )
}
