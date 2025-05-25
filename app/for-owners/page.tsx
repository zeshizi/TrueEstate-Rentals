"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Building2, TrendingUp, DollarSign, BarChart3, Search, MapPin, Star } from "lucide-react"
import { useState } from "react"

export default function ForOwnersPage() {
  const [selectedProperty, setSelectedProperty] = useState<any>(null)
  const [showAnalytics, setShowAnalytics] = useState(false)

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

      {/* Portfolio Analytics Dashboard */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Portfolio Analytics Dashboard</h2>
            <p className="text-lg text-gray-600">
              Real-time insights from your property portfolio based on current market data
            </p>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">24</div>
                <div className="text-sm text-gray-600">Total Properties</div>
                <div className="text-xs text-green-600 mt-1">+3 this quarter</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">$42.8M</div>
                <div className="text-sm text-gray-600">Portfolio Value</div>
                <div className="text-xs text-green-600 mt-1">+12.5% YoY</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">18.7%</div>
                <div className="text-sm text-gray-600">Average ROI</div>
                <div className="text-xs text-green-600 mt-1">+2.3% vs market</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-orange-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">$285K</div>
                <div className="text-sm text-gray-600">Monthly Revenue</div>
                <div className="text-xs text-green-600 mt-1">+8.2% this month</div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performing Properties */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Top Performing Properties</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  image: "luxury+penthouse+manhattan",
                  address: "432 Park Avenue, Manhattan, NY",
                  value: "$8.5M",
                  roi: "22.1%",
                  monthlyIncome: "$45K",
                  appreciation: "+15.2%",
                  badge: "Top Performer",
                  badgeColor: "bg-green-600",
                },
                {
                  image: "waterfront+mansion+miami",
                  address: "1200 Ocean Drive, Miami Beach, FL",
                  value: "$3.2M",
                  roi: "19.8%",
                  monthlyIncome: "$18K",
                  appreciation: "+12.7%",
                  badge: "High Growth",
                  badgeColor: "bg-blue-600",
                },
                {
                  image: "modern+estate+beverly+hills",
                  address: "9876 Sunset Blvd, Beverly Hills, CA",
                  value: "$2.85M",
                  roi: "18.5%",
                  monthlyIncome: "$16K",
                  appreciation: "+11.3%",
                  badge: "Stable Returns",
                  badgeColor: "bg-purple-600",
                },
              ].map((property, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={`/placeholder.svg?height=200&width=300&query=${property.image}`}
                      alt={property.address}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className={`absolute top-3 left-3 ${property.badgeColor}`}>{property.badge}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-3">
                      <div className="text-lg font-bold text-blue-600 mb-1">{property.value}</div>
                      <div className="text-sm text-gray-600">{property.address}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">ROI:</span>
                        <span className="font-semibold text-green-600 ml-1">{property.roi}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Monthly:</span>
                        <span className="font-semibold ml-1">{property.monthlyIncome}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-500">Appreciation:</span>
                        <span className="font-semibold text-green-600 ml-1">{property.appreciation}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-3"
                      onClick={() => {
                        setSelectedProperty(property)
                        setShowAnalytics(true)
                      }}
                    >
                      View Analytics
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Market Insights */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Market Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Your Portfolio vs Market</span>
                    <span className="text-sm font-semibold text-green-600">+5.2% ahead</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Market Average</div>
                      <div className="font-semibold">13.4% ROI</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Your Average</div>
                      <div className="font-semibold text-green-600">18.7% ROI</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Geographic Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { location: "California", properties: 8, value: "$18.2M", percentage: 42 },
                    { location: "New York", properties: 6, value: "$12.8M", percentage: 30 },
                    { location: "Florida", properties: 4, value: "$6.4M", percentage: 15 },
                    { location: "Texas", properties: 6, value: "$5.4M", percentage: 13 },
                  ].map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.location}</span>
                        <span className="text-gray-600">
                          {item.properties} properties • {item.value}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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

      {/* Property Analytics Modal */}
      {showAnalytics && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Property Analytics</h2>
                  <p className="text-gray-600">{selectedProperty.address}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowAnalytics(false)}>
                  ✕
                </Button>
              </div>

              {/* Analytics Content */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Financial Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="h-5 w-5 mr-2" />
                      Financial Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current Value</span>
                        <span className="font-semibold">{selectedProperty.value}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Income</span>
                        <span className="font-semibold text-green-600">{selectedProperty.monthlyIncome}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Annual ROI</span>
                        <span className="font-semibold text-green-600">{selectedProperty.roi}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Appreciation</span>
                        <span className="font-semibold text-green-600">{selectedProperty.appreciation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cap Rate</span>
                        <span className="font-semibold">6.8%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Market Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Market Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Market Value</span>
                        <span className="font-semibold">{selectedProperty.value}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Comparable Sales</span>
                        <span className="font-semibold">$8.2M avg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Days on Market</span>
                        <span className="font-semibold">45 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Market Trend</span>
                        <span className="font-semibold text-green-600">+12.5% YoY</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Investment Grade</span>
                        <Badge className="bg-green-600">A+</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Chart */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      12-Month Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { month: "Jan 2024", value: "$7.8M", income: "$42K", growth: "+2.1%" },
                        { month: "Mar 2024", value: "$8.0M", income: "$43K", growth: "+2.6%" },
                        { month: "Jun 2024", value: "$8.2M", income: "$44K", growth: "+2.5%" },
                        { month: "Sep 2024", value: "$8.4M", income: "$45K", growth: "+2.4%" },
                        { month: "Dec 2024", value: "$8.5M", income: "$45K", growth: "+1.2%" },
                      ].map((data, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="font-medium">{data.month}</span>
                          <div className="flex gap-4 text-sm">
                            <span>Value: {data.value}</span>
                            <span>Income: {data.income}</span>
                            <span className="text-green-600">{data.growth}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building2 className="h-5 w-5 mr-2" />
                      AI Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-500">
                        <div className="font-semibold text-blue-900">Rent Optimization</div>
                        <div className="text-blue-700 text-sm">
                          Consider increasing rent by 8% based on market analysis
                        </div>
                      </div>
                      <div className="p-3 bg-green-50 rounded border-l-4 border-green-500">
                        <div className="font-semibold text-green-900">Tax Strategy</div>
                        <div className="text-green-700 text-sm">
                          Eligible for 1031 exchange - potential $180K tax savings
                        </div>
                      </div>
                      <div className="p-3 bg-purple-50 rounded border-l-4 border-purple-500">
                        <div className="font-semibold text-purple-900">Market Timing</div>
                        <div className="text-purple-700 text-sm">
                          Optimal selling window: Q2 2025 based on market trends
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-6 pt-6 border-t">
                <Button className="flex-1">Download Report</Button>
                <Button variant="outline" className="flex-1">
                  Schedule Consultation
                </Button>
                <Button variant="outline" className="flex-1">
                  Share Analytics
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
