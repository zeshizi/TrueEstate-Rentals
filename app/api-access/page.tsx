import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Code, Database, Zap, Shield } from "lucide-react"
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
              applications with verified property ownership and financial insights.
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
                Get API Key
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
                Everything you need to integrate real estate intelligence into your applications.
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
              <div className="mb-4 ml-4">-H "Authorization: Bearer YOUR_API_KEY"</div>

              <div className="mb-4">
                <span className="text-gray-500"># Get property details</span>
              </div>
              <div className="mb-2">
                <span className="text-blue-400">curl</span> -X GET \
              </div>
              <div className="mb-2 ml-4">"https://api.trueestate.com/v1/properties/123456" \</div>
              <div className="ml-4">-H "Authorization: Bearer YOUR_API_KEY"</div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">API Pricing</h2>
              <p className="text-gray-600">Flexible pricing based on your usage needs.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Starter</h3>
                <div className="text-4xl font-bold text-gray-900 mb-6">Free</div>
                <ul className="space-y-3 mb-8 text-gray-600">
                  <li>• 1,000 requests/month</li>
                  <li>• Basic property data</li>
                  <li>• Community support</li>
                  <li>• Rate limit: 10 req/min</li>
                </ul>
                <Button className="w-full" variant="outline">
                  Get Started
                </Button>
              </div>

              <div className="bg-white rounded-lg p-8 border-2 border-blue-500">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional</h3>
                <div className="text-4xl font-bold text-gray-900 mb-6">
                  $49<span className="text-lg text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8 text-gray-600">
                  <li>• 50,000 requests/month</li>
                  <li>• Full property & wealth data</li>
                  <li>• Email support</li>
                  <li>• Rate limit: 100 req/min</li>
                </ul>
                <Button className="w-full">Choose Plan</Button>
              </div>

              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise</h3>
                <div className="text-4xl font-bold text-gray-900 mb-6">Custom</div>
                <ul className="space-y-3 mb-8 text-gray-600">
                  <li>• Unlimited requests</li>
                  <li>• Premium data sources</li>
                  <li>• Dedicated support</li>
                  <li>• Custom rate limits</li>
                </ul>
                <Button className="w-full" variant="outline">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
