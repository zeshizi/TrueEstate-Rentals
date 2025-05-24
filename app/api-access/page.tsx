import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Code, Database, Zap, Shield, Key, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ApiAccessPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-6">TrueEstate API</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Access our comprehensive real estate and wealth data through our powerful REST API. Build custom
              applications with verified property ownership and financial insights - completely free.
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
                Get Free API Key
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-900"
              >
                View Documentation
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">API Features</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to integrate real estate intelligence into your applications - all free.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Rich Data</h3>
                <p className="text-gray-600">
                  Access property details, ownership records, wealth estimates, and transaction history.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast & Reliable</h3>
                <p className="text-gray-600">99.9% uptime with sub-100ms response times and global CDN distribution.</p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Developer Friendly</h3>
                <p className="text-gray-600">
                  RESTful design with comprehensive documentation and SDKs for popular languages.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure</h3>
                <p className="text-gray-600">
                  Enterprise-grade security with API key authentication and rate limiting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Start</h2>
              <p className="text-gray-600">Get started with our API in minutes with these simple examples.</p>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 text-green-400 font-mono text-sm overflow-x-auto">
              <div className="mb-4">
                <span className="text-gray-500"># Search for properties</span>
              </div>
              <div className="mb-2">
                <span className="text-blue-400">curl</span> -X GET \
              </div>
              <div className="mb-2 ml-4">
                "https://api.trueestate.com/v1/properties?location=manhattan&min_value=1000000" \
              </div>
              <div className="mb-4 ml-4">-H "Authorization: Bearer YOUR_FREE_API_KEY"</div>

              <div className="mb-4">
                <span className="text-gray-500"># Get property details</span>
              </div>
              <div className="mb-2">
                <span className="text-blue-400">curl</span> -X GET \
              </div>
              <div className="mb-2 ml-4">"https://api.trueestate.com/v1/properties/123456" \</div>
              <div className="ml-4">-H "Authorization: Bearer YOUR_FREE_API_KEY"</div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What's Included - All Free</h2>
              <p className="text-gray-600">Complete API access with no usage limits or hidden fees.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-lg p-8 border border-gray-200 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Key className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Free API Access</h3>
                <ul className="space-y-3 text-gray-600 text-left">
                  <li>• Unlimited requests</li>
                  <li>• Full property database</li>
                  <li>• Real-time data updates</li>
                  <li>• No rate limiting</li>
                  <li>• Commercial use allowed</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-8 border border-gray-200 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Complete Data Access</h3>
                <ul className="space-y-3 text-gray-600 text-left">
                  <li>• Property details & history</li>
                  <li>• Owner information</li>
                  <li>• Wealth estimations</li>
                  <li>• Transaction records</li>
                  <li>• Market analytics</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-8 border border-gray-200 text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Developer Support</h3>
                <ul className="space-y-3 text-gray-600 text-left">
                  <li>• Comprehensive documentation</li>
                  <li>• Code examples & SDKs</li>
                  <li>• Community support</li>
                  <li>• Regular updates</li>
                  <li>• Technical assistance</li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Your Free API Key
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
