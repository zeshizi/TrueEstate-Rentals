"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Search, MapPin, DollarSign, BarChart3, Target } from "lucide-react"
import Link from "next/link"

export default function ForInvestorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">For Real Estate Investors</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover luxury real estate investment opportunities with unprecedented owner intelligence. Make informed
            decisions with comprehensive market data and wealth insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/search">Find Opportunities</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/wealth-map">Explore Markets</Link>
            </Button>
          </div>
        </div>

        {/* Investment Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Search className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Deal Discovery</CardTitle>
              <CardDescription>
                Find off-market opportunities and distressed assets before they hit the market
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Off-market property identification</li>
                <li>• Distressed asset discovery</li>
                <li>• Owner motivation analysis</li>
                <li>• Direct owner contact</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Market Analysis</CardTitle>
              <CardDescription>Comprehensive market intelligence for informed investment decisions</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Price trend analysis</li>
                <li>• Market velocity tracking</li>
                <li>• Comparable sales data</li>
                <li>• Future growth projections</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <MapPin className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Location Intelligence</CardTitle>
              <CardDescription>
                Deep neighborhood insights and demographic analysis for strategic positioning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Neighborhood demographics</li>
                <li>• Economic indicators</li>
                <li>• Development pipeline</li>
                <li>• Infrastructure projects</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <DollarSign className="h-12 w-12 text-orange-600 mb-4" />
              <CardTitle>Financial Analysis</CardTitle>
              <CardDescription>
                Advanced financial modeling and ROI calculations for investment evaluation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• ROI calculations</li>
                <li>• Cash flow projections</li>
                <li>• Cap rate analysis</li>
                <li>• Risk assessment</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-emerald-600 mb-4" />
              <CardTitle>Portfolio Tracking</CardTitle>
              <CardDescription>Monitor and optimize your real estate investment portfolio performance</CardDescription>
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

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Target className="h-12 w-12 text-red-600 mb-4" />
              <CardTitle>Owner Intelligence</CardTitle>
              <CardDescription>
                Comprehensive owner profiles and motivation analysis for strategic outreach
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Owner identification</li>
                <li>• Wealth assessment</li>
                <li>• Motivation indicators</li>
                <li>• Contact information</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Investment Strategies */}
        <div className="bg-white rounded-2xl p-12 shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Investment Strategies We Support</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fix & Flip</h3>
              <p className="text-sm text-gray-600">
                Identify undervalued properties with renovation potential and motivated sellers
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Buy & Hold</h3>
              <p className="text-sm text-gray-600">
                Find cash-flowing rental properties in appreciating markets with strong fundamentals
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Luxury Flips</h3>
              <p className="text-sm text-gray-600">
                Target high-end properties with wealthy owners looking for quick, premium sales
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Wholesale</h3>
              <p className="text-sm text-gray-600">
                Identify distressed properties and motivated sellers for quick assignment deals
              </p>
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-12 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Investor Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">$2.3M</div>
              <div className="text-lg font-semibold mb-2">Profit in 6 Months</div>
              <p className="text-sm opacity-90">
                "Found an off-market Beverly Hills property through owner intelligence. Closed in 30 days, renovated,
                and sold for $2.3M profit."
              </p>
              <div className="text-sm mt-2 opacity-75">- Sarah Chen, Luxury Flipper</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">47%</div>
              <div className="text-lg font-semibold mb-2">Portfolio Growth</div>
              <p className="text-sm opacity-90">
                "TrueEstate's market intelligence helped me identify emerging luxury markets. My portfolio grew 47% in
                one year."
              </p>
              <div className="text-sm mt-2 opacity-75">- Michael Rodriguez, Portfolio Investor</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">$850K</div>
              <div className="text-lg font-semibold mb-2">First Deal Profit</div>
              <p className="text-sm opacity-90">
                "As a new investor, TrueEstate's owner intelligence gave me the confidence to make my first luxury deal
                profitable."
              </p>
              <div className="text-sm mt-2 opacity-75">- Jennifer Park, New Investor</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Your Next Investment Today</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of successful real estate investors who use TrueEstate to find, analyze, and close profitable
            deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/search">Find Your First Deal</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Talk to an Expert</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
