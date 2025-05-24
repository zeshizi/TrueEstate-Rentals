import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, BarChart3, Target, TrendingUp, MapPin, DollarSign } from "lucide-react"

export default function ForAgentsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">For Real Estate Agents</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Access powerful wealth intelligence tools to identify high-net-worth prospects, analyze market trends, and
            close more premium deals.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Target Wealthy Clients</h2>
            <p className="text-xl text-gray-600">
              Professional tools designed specifically for luxury real estate agents
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-blue-500 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-blue-600" />
                  Client Wealth Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Deep dive into your prospects' financial profiles with our proprietary wealth estimation algorithms
                  and net worth analysis.
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>• Net worth estimations</li>
                  <li>• Asset portfolio analysis</li>
                  <li>• Investment history</li>
                  <li>• Risk assessment</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-500 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-green-600" />
                  Territory Mapping
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Interactive wealth distribution maps to identify the most lucrative neighborhoods and target your
                  marketing efforts effectively.
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>• Wealth heat maps</li>
                  <li>• Property value trends</li>
                  <li>• Market opportunity zones</li>
                  <li>• Competitor analysis</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-500 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Target className="h-6 w-6 text-purple-600" />
                  Lead Generation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Advanced filtering and search capabilities to find high-net-worth property owners who match your ideal
                  client profile.
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li>• Wealth-based filtering</li>
                  <li>• Property ownership history</li>
                  <li>• Contact information</li>
                  <li>• Investment patterns</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Top Agents Choose TrueEstate</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Increase Deal Value</h3>
                <p className="text-gray-600">
                  Focus on high-net-worth clients to increase your average transaction value and commission earnings.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Market Intelligence</h3>
                <p className="text-gray-600">
                  Stay ahead with real-time market data, wealth trends, and property ownership insights.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Precision Targeting</h3>
                <p className="text-gray-600">
                  Stop wasting time on unqualified leads. Target only the prospects with the financial capacity to buy.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Completely Free</h3>
                <p className="text-gray-600">
                  Access all premium features at no cost. No hidden fees, no usage limits, no subscription required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Real Estate Business?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of successful agents who use TrueEstate to identify, target, and close deals with
            high-net-worth clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start Free Today
            </Button>
            <Button size="lg" variant="outline">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
