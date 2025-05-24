import { Building2, TrendingUp, DollarSign, BarChart3, Home, Users, Calculator, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ForOwnersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Maximize Your Property Investment</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Professional tools and insights to optimize your real estate portfolio, track performance, and maximize
              returns on your property investments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">$2.4M</div>
                <div className="text-sm text-gray-600">Avg Portfolio Value</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">12.5%</div>
                <div className="text-sm text-gray-600">Annual ROI</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Home className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">5.2</div>
                <div className="text-sm text-gray-600">Avg Properties</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600">Active Owners</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Manage Your Properties</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools designed specifically for property owners to maximize returns and streamline
              management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Portfolio Management */}
            <Card className="h-full">
              <CardHeader>
                <Building2 className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Portfolio Management</CardTitle>
                <CardDescription>Track all your properties in one centralized dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Property performance tracking</li>
                  <li>• Real-time valuation updates</li>
                  <li>• Maintenance scheduling</li>
                  <li>• Document management</li>
                </ul>
              </CardContent>
            </Card>

            {/* Financial Analytics */}
            <Card className="h-full">
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Financial Analytics</CardTitle>
                <CardDescription>Deep insights into your investment performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• ROI calculations</li>
                  <li>• Cash flow analysis</li>
                  <li>• Tax optimization</li>
                  <li>• Market comparisons</li>
                </ul>
              </CardContent>
            </Card>

            {/* Market Intelligence */}
            <Card className="h-full">
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>Market Intelligence</CardTitle>
                <CardDescription>Stay ahead with real-time market data and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Neighborhood trends</li>
                  <li>• Comparable sales</li>
                  <li>• Rental rate analysis</li>
                  <li>• Investment opportunities</li>
                </ul>
              </CardContent>
            </Card>

            {/* Rental Management */}
            <Card className="h-full">
              <CardHeader>
                <Home className="h-8 w-8 text-orange-600 mb-2" />
                <CardTitle>Rental Management</CardTitle>
                <CardDescription>Streamline your rental property operations</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Tenant screening</li>
                  <li>• Lease management</li>
                  <li>• Rent collection</li>
                  <li>• Maintenance requests</li>
                </ul>
              </CardContent>
            </Card>

            {/* Tax & Legal */}
            <Card className="h-full">
              <CardHeader>
                <FileText className="h-8 w-8 text-red-600 mb-2" />
                <CardTitle>Tax & Legal</CardTitle>
                <CardDescription>Stay compliant and optimize your tax strategy</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Tax document preparation</li>
                  <li>• Depreciation tracking</li>
                  <li>• Legal compliance</li>
                  <li>• 1031 exchange support</li>
                </ul>
              </CardContent>
            </Card>

            {/* Investment Calculator */}
            <Card className="h-full">
              <CardHeader>
                <Calculator className="h-8 w-8 text-indigo-600 mb-2" />
                <CardTitle>Investment Calculator</CardTitle>
                <CardDescription>Analyze potential investments before you buy</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Cash flow projections</li>
                  <li>• ROI calculations</li>
                  <li>• Financing scenarios</li>
                  <li>• Risk assessment</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-lg text-gray-600">Flexible pricing for property owners of all sizes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <Card className="relative">
              <CardHeader>
                <CardTitle className="text-center">Starter</CardTitle>
                <div className="text-center">
                  <span className="text-3xl font-bold">$29</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <CardDescription className="text-center">Perfect for new property owners</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Up to 3 properties
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Basic analytics
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Market reports
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Email support
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Professional Plan */}
            <Card className="relative border-blue-500 border-2">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">Most Popular</Badge>
              <CardHeader>
                <CardTitle className="text-center">Professional</CardTitle>
                <div className="text-center">
                  <span className="text-3xl font-bold">$79</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <CardDescription className="text-center">For serious property investors</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Up to 15 properties
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Advanced analytics
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Rental management
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Tax optimization
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Priority support
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Get Started</Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="relative">
              <CardHeader>
                <CardTitle className="text-center">Enterprise</CardTitle>
                <div className="text-center">
                  <span className="text-3xl font-bold">$199</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <CardDescription className="text-center">For large property portfolios</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Unlimited properties
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Custom analytics
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    API access
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    White-label options
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    Dedicated support
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Optimize Your Property Portfolio?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of property owners who are maximizing their returns with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
