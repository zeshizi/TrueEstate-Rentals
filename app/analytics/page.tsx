"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Users, DollarSign, MapPin, Building } from "lucide-react"
import Link from "next/link"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Real Estate Analytics</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Powerful analytics and insights for luxury real estate markets. Track wealth patterns, property trends, and
            investment opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/search">Start Analyzing</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/wealth-map">View Wealth Map</Link>
            </Button>
          </div>
        </div>

        {/* Analytics Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Market Analytics</CardTitle>
              <CardDescription>
                Comprehensive market analysis with price trends, volume data, and forecasting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Price trend analysis</li>
                <li>• Market volume tracking</li>
                <li>• Comparative market analysis</li>
                <li>• Predictive modeling</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Wealth Intelligence</CardTitle>
              <CardDescription>
                Deep insights into property owner wealth patterns and investment behavior
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Owner wealth analysis</li>
                <li>• Investment pattern tracking</li>
                <li>• Portfolio composition</li>
                <li>• Risk assessment</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <MapPin className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Geographic Insights</CardTitle>
              <CardDescription>Location-based analytics with demographic and economic indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Neighborhood analysis</li>
                <li>• Demographic insights</li>
                <li>• Economic indicators</li>
                <li>• Growth projections</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Users className="h-12 w-12 text-orange-600 mb-4" />
              <CardTitle>Owner Intelligence</CardTitle>
              <CardDescription>Comprehensive owner profiles and business intelligence</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Owner identification</li>
                <li>• Business connections</li>
                <li>• Investment history</li>
                <li>• Contact information</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <DollarSign className="h-12 w-12 text-emerald-600 mb-4" />
              <CardTitle>Investment Analysis</CardTitle>
              <CardDescription>ROI calculations, cash flow analysis, and investment opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• ROI calculations</li>
                <li>• Cash flow analysis</li>
                <li>• Market opportunities</li>
                <li>• Risk assessment</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Building className="h-12 w-12 text-red-600 mb-4" />
              <CardTitle>Portfolio Tracking</CardTitle>
              <CardDescription>Track and analyze real estate portfolios across multiple markets</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Portfolio overview</li>
                <li>• Performance metrics</li>
                <li>• Diversification analysis</li>
                <li>• Benchmark comparison</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of investors, agents, and wealth managers who trust TrueEstate for their real estate
            intelligence needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/search">Start Free Trial</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
