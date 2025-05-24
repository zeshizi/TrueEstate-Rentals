"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Building2, TrendingUp, DollarSign, BarChart3, Search, MapPin, Star } from "lucide-react"

export default function ForOwnersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - Zillow Inspired */}
      <section
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/placeholder.svg?height=600&width=1200&query=luxury+real+estate+mansion+exterior')",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Owners. Analytics.
              <br />
              Wealth. Properties.
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Professional property management and wealth optimization tools for serious real estate owners
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-lg p-2 max-w-2xl mx-auto flex items-center shadow-lg">
              <MapPin className="h-5 w-5 text-gray-400 ml-3" />
              <Input
                placeholder="Enter property address, city, or ZIP code"
                className="border-0 text-lg flex-1 focus-visible:ring-0"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 px-8">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
              <span className="text-sm text-gray-600">Trusted by 10,000+ property owners</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-600">$2.4B+ in managed assets</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-600">12.5% average ROI increase</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Optimize your property portfolio with PropertyAbility™
            </h2>
            <p className="text-lg text-gray-600">
              Answer a few questions. We'll highlight properties you're likely to maximize returns on.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                image: "luxury+penthouse+manhattan",
                price: "$8.5M",
                location: "Manhattan, NY",
                roi: "15.2%",
                badge: "Premium ROI",
              },
              {
                image: "modern+estate+beverly+hills",
                price: "$12.8M",
                location: "Beverly Hills, CA",
                roi: "18.7%",
                badge: "High Growth",
              },
              {
                image: "waterfront+mansion+miami",
                price: "$6.2M",
                location: "Miami Beach, FL",
                roi: "22.1%",
                badge: "Top Performer",
              },
              {
                image: "tech+executive+home+seattle",
                price: "$4.9M",
                location: "Seattle, WA",
                roi: "14.8%",
                badge: "Stable Returns",
              },
            ].map((property, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={`/placeholder.svg?height=200&width=300&query=${property.image}`}
                    alt={property.location}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 left-3 bg-green-600">{property.badge}</Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xl font-bold text-blue-600">{property.price}</span>
                    <span className="text-sm font-semibold text-green-600">+{property.roi}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{property.location}</p>
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    Analyze Property
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Maximize Property Returns</h2>
            <p className="text-lg text-gray-600">Professional-grade tools designed for serious property investors</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Portfolio Analytics</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Advanced analytics and performance tracking for your entire property portfolio with real-time market
                  insights.
                </p>
                <ul className="text-sm text-gray-500 space-y-2 text-left">
                  <li>• Real-time property valuations</li>
                  <li>• ROI and cash flow analysis</li>
                  <li>• Market trend predictions</li>
                  <li>• Performance benchmarking</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>Wealth Optimization</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Optimize your wealth strategy with tax planning, investment recommendations, and portfolio
                  diversification.
                </p>
                <ul className="text-sm text-gray-500 space-y-2 text-left">
                  <li>• Tax optimization strategies</li>
                  <li>• Investment opportunity alerts</li>
                  <li>• Portfolio diversification advice</li>
                  <li>• 1031 exchange planning</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>Property Management</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Streamlined property management with tenant screening, maintenance tracking, and automated rent
                  collection.
                </p>
                <ul className="text-sm text-gray-500 space-y-2 text-left">
                  <li>• Automated rent collection</li>
                  <li>• Maintenance request system</li>
                  <li>• Tenant screening tools</li>
                  <li>• Lease management platform</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-lg text-gray-600">Flexible pricing for property owners of all portfolio sizes</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-gray-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Starter</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mt-4">
                  $49<span className="text-lg text-gray-500">/mo</span>
                </div>
                <p className="text-gray-600 mt-2">Perfect for new investors</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>Up to 5 properties
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>Basic analytics dashboard
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>Monthly market reports
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>Email support
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-500 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">Most Popular</Badge>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Professional</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mt-4">
                  $149<span className="text-lg text-gray-500">/mo</span>
                </div>
                <p className="text-gray-600 mt-2">For serious investors</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>Up to 25 properties
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>Advanced analytics & AI insights
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>Property management tools
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>Tax optimization features
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>Priority support
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Get Started</Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mt-4">
                  $399<span className="text-lg text-gray-500">/mo</span>
                </div>
                <p className="text-gray-600 mt-2">For large portfolios</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>Unlimited properties
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>Custom analytics & reporting
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>API access & integrations
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>White-label options
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>Dedicated account manager
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Optimize Your Property Portfolio?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of successful property owners who are maximizing their returns with our professional-grade
            platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
