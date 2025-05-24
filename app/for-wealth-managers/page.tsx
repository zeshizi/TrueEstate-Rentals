"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Users, TrendingUp, Target, Database, Award } from "lucide-react"
import Link from "next/link"

export default function ForWealthManagersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">For Wealth Managers</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Comprehensive real estate intelligence for wealth management professionals. Identify opportunities, assess
            risks, and provide superior client advisory services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/search">Start Analysis</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Schedule Demo</Link>
            </Button>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Shield className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Client Due Diligence</CardTitle>
              <CardDescription>
                Comprehensive background checks and wealth verification for new and existing clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Property ownership verification</li>
                <li>• Wealth source identification</li>
                <li>• Business interest mapping</li>
                <li>• Risk profile assessment</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Users className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Client Prospecting</CardTitle>
              <CardDescription>
                Identify high-net-worth individuals and ultra-high-net-worth prospects in your market
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• UHNW individual identification</li>
                <li>• Geographic targeting</li>
                <li>• Wealth tier segmentation</li>
                <li>• Contact information access</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Portfolio Analysis</CardTitle>
              <CardDescription>
                Analyze client real estate portfolios and identify optimization opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Portfolio composition analysis</li>
                <li>• Diversification assessment</li>
                <li>• Performance benchmarking</li>
                <li>• Optimization recommendations</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Target className="h-12 w-12 text-orange-600 mb-4" />
              <CardTitle>Investment Opportunities</CardTitle>
              <CardDescription>
                Identify and evaluate real estate investment opportunities for client portfolios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Market opportunity scanning</li>
                <li>• ROI projections</li>
                <li>• Risk-adjusted returns</li>
                <li>• Comparative analysis</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Database className="h-12 w-12 text-emerald-600 mb-4" />
              <CardTitle>Market Intelligence</CardTitle>
              <CardDescription>
                Access comprehensive market data and trends for informed advisory services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Market trend analysis</li>
                <li>• Price movement tracking</li>
                <li>• Liquidity assessments</li>
                <li>• Economic indicators</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Award className="h-12 w-12 text-red-600 mb-4" />
              <CardTitle>Compliance & Reporting</CardTitle>
              <CardDescription>
                Generate detailed reports for compliance, client meetings, and regulatory requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Automated reporting</li>
                <li>• Compliance documentation</li>
                <li>• Client presentation materials</li>
                <li>• Audit trail maintenance</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Use Cases */}
        <div className="bg-white rounded-2xl p-12 shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Common Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Client Onboarding</h3>
              <p className="text-gray-600 mb-4">
                Streamline your client onboarding process with comprehensive wealth verification and due diligence
                capabilities.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Verify reported assets</li>
                <li>• Identify undisclosed holdings</li>
                <li>• Assess wealth sources</li>
                <li>• Generate compliance reports</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Portfolio Review</h3>
              <p className="text-gray-600 mb-4">
                Conduct thorough portfolio reviews and provide data-driven recommendations to your clients.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Analyze current holdings</li>
                <li>• Identify optimization opportunities</li>
                <li>• Benchmark performance</li>
                <li>• Recommend rebalancing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Prospect Research</h3>
              <p className="text-gray-600 mb-4">
                Identify and research potential high-value clients in your target markets with precision targeting.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Geographic targeting</li>
                <li>• Wealth tier filtering</li>
                <li>• Industry focus</li>
                <li>• Contact acquisition</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Investment Advisory</h3>
              <p className="text-gray-600 mb-4">
                Provide superior investment advisory services with comprehensive market intelligence and opportunity
                identification.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Market opportunity scanning</li>
                <li>• Risk assessment</li>
                <li>• ROI projections</li>
                <li>• Timing recommendations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Elevate Your Wealth Management Practice</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join leading wealth management firms who trust TrueEstate for their real estate intelligence and client
            advisory needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/search">Start Free Trial</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Link href="/contact">Schedule Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
