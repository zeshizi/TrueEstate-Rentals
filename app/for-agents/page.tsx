"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Users, BarChart3, Target, TrendingUp, MapPin, DollarSign, Search, Star, Award } from "lucide-react"

export default function ForAgentsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - Zillow Inspired */}
      <section
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/placeholder.svg?height=600&width=1200&query=real+estate+agent+showing+luxury+home+to+clients')",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Agents. Clients.
              <br />
              Wealth. Success.
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Advanced wealth intelligence tools to identify high-net-worth prospects and close premium deals
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-lg p-2 max-w-2xl mx-auto flex items-center shadow-lg">
              <MapPin className="h-5 w-5 text-gray-400 ml-3" />
              <Input
                placeholder="Find wealthy prospects by location or property type"
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
              <span className="text-sm text-gray-600">Used by 5,000+ top agents</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-600">45% increase in deal value</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-600">Industry-leading accuracy</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Prospects */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find qualified prospects with AgentAbility™</h2>
            <p className="text-lg text-gray-600">
              Answer a few questions. We'll highlight high-net-worth prospects you're likely to close deals with.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                image: "tech+ceo+luxury+home",
                netWorth: "$45M",
                location: "Palo Alto, CA",
                likelihood: "92%",
                badge: "Hot Lead",
              },
              {
                image: "finance+executive+penthouse",
                netWorth: "$28M",
                location: "Manhattan, NY",
                likelihood: "87%",
                badge: "High Interest",
              },
              {
                image: "entertainment+mogul+estate",
                netWorth: "$65M",
                location: "Beverly Hills, CA",
                likelihood: "94%",
                badge: "Premium Client",
              },
              {
                image: "oil+executive+ranch",
                netWorth: "$38M",
                location: "Houston, TX",
                likelihood: "89%",
                badge: "Qualified Buyer",
              },
            ].map((prospect, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={`/placeholder.svg?height=200&width=300&query=${prospect.image}`}
                    alt={prospect.location}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 left-3 bg-green-600">{prospect.badge}</Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-lg font-bold text-blue-600">{prospect.netWorth}</span>
                    <span className="text-sm font-semibold text-green-600">{prospect.likelihood}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{prospect.location}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    View Profile
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Target Wealthy Clients</h2>
            <p className="text-lg text-gray-600">
              Professional tools designed specifically for luxury real estate agents
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Wealth Intelligence</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Deep insights into prospect wealth, investment patterns, and buying behavior with our proprietary
                  algorithms.
                </p>
                <ul className="text-sm text-gray-500 space-y-2 text-left">
                  <li>• Net worth estimations</li>
                  <li>• Asset portfolio analysis</li>
                  <li>• Investment history tracking</li>
                  <li>• Buying probability scores</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>Territory Mapping</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Interactive wealth distribution maps to identify the most lucrative neighborhoods and optimize your
                  prospecting.
                </p>
                <ul className="text-sm text-gray-500 space-y-2 text-left">
                  <li>• Wealth heat maps</li>
                  <li>• Property value trends</li>
                  <li>• Market opportunity zones</li>
                  <li>• Competitor analysis</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>Lead Generation</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Advanced filtering and AI-powered matching to find high-net-worth prospects who fit your ideal client
                  profile.
                </p>
                <ul className="text-sm text-gray-500 space-y-2 text-left">
                  <li>• Wealth-based filtering</li>
                  <li>• Behavioral pattern analysis</li>
                  <li>• Contact information access</li>
                  <li>• Engagement tracking</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Top Agents Choose TrueEstate</h2>
            <p className="text-lg text-gray-600">Real results from real estate professionals</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">3x Higher Deal Value</h3>
                    <p className="text-gray-600">
                      "Since using TrueEstate's wealth intelligence, my average transaction value increased from $2M to
                      $6M. The platform helps me focus on qualified, high-net-worth clients."
                    </p>
                    <p className="text-sm text-gray-500 mt-3">- Sarah Chen, Luxury Agent, Beverly Hills</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">50% More Closings</h3>
                    <p className="text-gray-600">
                      "The wealth analysis and prospect scoring is incredibly accurate. I'm closing 50% more deals
                      because I'm targeting the right people from the start."
                    </p>
                    <p className="text-sm text-gray-500 mt-3">- Michael Rodriguez, Top Producer, Manhattan</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Precision Targeting</h3>
                    <p className="text-gray-600">
                      "No more cold calling or wasted marketing spend. TrueEstate shows me exactly who has the financial
                      capacity and interest to buy luxury properties."
                    </p>
                    <p className="text-sm text-gray-500 mt-3">- Jennifer Park, Luxury Specialist, Miami</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Free Premium Tools</h3>
                    <p className="text-gray-600">
                      "Getting enterprise-level wealth intelligence tools for free is incredible. This platform would
                      easily be worth $500/month, but it's completely free."
                    </p>
                    <p className="text-sm text-gray-500 mt-3">- David Kim, Team Leader, Seattle</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Real Estate Business?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of successful agents who use TrueEstate to identify, target, and close deals with
            high-net-worth clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
              Start Free Today
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
