import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Search, Shield, TrendingUp, Users, Eye, CheckCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - Wealth Map Focus */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Problem Statement Badge */}
            <Badge className="bg-red-100 text-red-800 px-6 py-2 text-sm font-medium mb-6">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Solving Real Estate Transparency Crisis
            </Badge>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Verify Property Owners.
              <br />
              <span className="text-blue-600">Map Hidden Wealth.</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Stop falling victim to rental scams and unverified listings. Access verified ownership data, wealth
              profiles, and trust metrics to make informed real estate decisions.
            </p>

            {/* Main CTA - Wealth Map */}
            <div className="mb-12">
              <Link href="/wealth-map">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-lg font-semibold rounded-lg shadow-lg"
                >
                  <Eye className="h-5 w-5 mr-3" />
                  Explore Wealth Map
                </Button>
              </Link>
            </div>

            {/* Quick Search */}
            <Card className="bg-white shadow-xl border-0 max-w-2xl mx-auto">
              <CardContent className="p-6">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search any property address to verify ownership..."
                    className="pl-12 h-14 text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                  />
                  <Link href="/search">
                    <Button className="absolute right-2 top-2 h-10 px-6 bg-blue-600 hover:bg-blue-700">
                      <Search className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Real Estate Transparency Problem</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Current rental and real estate ecosystem lacks critical transparency, putting renters and investors at
              risk
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Problem 1: Rental Scams */}
            <Card className="border-0 shadow-lg bg-red-50">
              <CardContent className="p-8 text-center">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Rental Scams & Fraud</h3>
                <p className="text-gray-600 mb-4">
                  Renters fall victim to fake listings and unverified landlords due to lack of ownership transparency
                </p>
                <div className="text-2xl font-bold text-red-600">$1.2B</div>
                <div className="text-sm text-gray-500">Lost to rental fraud annually</div>
              </CardContent>
            </Card>

            {/* Problem 2: Unverified Listings */}
            <Card className="border-0 shadow-lg bg-orange-50">
              <CardContent className="p-8 text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Hidden Ownership Data</h3>
                <p className="text-gray-600 mb-4">
                  Investors and analysts struggle to access consolidated wealth profiles and ownership verification
                </p>
                <div className="text-2xl font-bold text-orange-600">87%</div>
                <div className="text-sm text-gray-500">Of listings lack ownership verification</div>
              </CardContent>
            </Card>

            {/* Problem 3: No Trust Metrics */}
            <Card className="border-0 shadow-lg bg-yellow-50">
              <CardContent className="p-8 text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">No Trust Metrics</h3>
                <p className="text-gray-600 mb-4">
                  Absence of landlord credibility scores and trust metrics makes informed decisions impossible
                </p>
                <div className="text-2xl font-bold text-yellow-600">0%</div>
                <div className="text-sm text-gray-500">Platforms provide trust verification</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Solution: Complete Transparency</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              TrueEstate provides verified ownership data, wealth mapping, and trust metrics for informed real estate
              decisions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Solution 1: Verified Ownership */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Verified Ownership</h3>
                <p className="text-gray-600 mb-4">
                  Access verified property ownership records and landlord credentials to avoid scams
                </p>
                <Link href="/search">
                  <Button
                    variant="outline"
                    className="w-full border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold transition-all duration-200"
                  >
                    Verify Properties
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Solution 2: Wealth Mapping */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Wealth Mapping</h3>
                <p className="text-gray-600 mb-4">
                  Interactive wealth distribution maps showing property owner portfolios and net worth
                </p>
                <Link href="/wealth-map">
                  <Button variant="outline" className="w-full">
                    Explore Wealth Map
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Solution 3: Trust Metrics */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Trust Metrics</h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive landlord ratings, reviews, and credibility scores for safe transactions
                </p>
                <Link href="/search">
                  <Button
                    variant="outline"
                    className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold transition-all duration-200"
                  >
                    Check Trust Scores
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why TrueEstate Works</h2>
            <p className="text-lg text-gray-600">Built specifically to solve real estate transparency problems</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">155M+</div>
              <div className="text-sm text-gray-600">Verified Properties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">$2.4T</div>
              <div className="text-sm text-gray-600">Tracked Wealth</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">98.7%</div>
              <div className="text-sm text-gray-600">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">50K+</div>
              <div className="text-sm text-gray-600">Verified Reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Start Making Informed Real Estate Decisions</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands who use TrueEstate to verify ownership, map wealth, and avoid real estate fraud
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/wealth-map">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                <Eye className="h-5 w-5 mr-2" />
                Explore Wealth Map
              </Button>
            </Link>
            <Link href="/search">
              <Button
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 font-semibold transition-all duration-200"
              >
                <Search className="h-5 w-5 mr-2" />
                Verify Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
