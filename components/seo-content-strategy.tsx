"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, TrendingUp, Users, Eye, Search, FileText, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

export function SEOContentStrategy() {
  const blogPosts = [
    {
      id: 1,
      title: "2024 Luxury Real Estate Market Trends: What High-Net-Worth Buyers Need to Know",
      excerpt:
        "Discover the latest trends shaping the luxury real estate market, from emerging neighborhoods to investment opportunities.",
      category: "Market Analysis",
      readTime: "8 min read",
      publishDate: "2024-01-20",
      views: 2847,
      featured: true,
      tags: ["luxury", "market-trends", "investment", "2024"],
    },
    {
      id: 2,
      title: "How to Identify Property Owners: A Complete Guide for Real Estate Professionals",
      excerpt:
        "Learn proven strategies and tools to research property ownership, including public records and professional databases.",
      category: "Professional Tips",
      readTime: "12 min read",
      publishDate: "2024-01-18",
      views: 1923,
      featured: true,
      tags: ["property-research", "ownership", "due-diligence", "professionals"],
    },
    {
      id: 3,
      title: "Beverly Hills vs Manhattan: Comparing America's Premier Luxury Markets",
      excerpt:
        "An in-depth comparison of two of America's most prestigious real estate markets and what drives their values.",
      category: "Location Guide",
      readTime: "10 min read",
      publishDate: "2024-01-15",
      views: 3156,
      featured: false,
      tags: ["beverly-hills", "manhattan", "luxury-markets", "comparison"],
    },
    {
      id: 4,
      title: "The Ultimate Guide to Real Estate Due Diligence for High-Value Properties",
      excerpt:
        "Essential steps and considerations when conducting due diligence on luxury and high-value real estate investments.",
      category: "Investment Guide",
      readTime: "15 min read",
      publishDate: "2024-01-12",
      views: 1654,
      featured: false,
      tags: ["due-diligence", "investment", "luxury-properties", "guide"],
    },
    {
      id: 5,
      title: "Understanding Property Wealth Data: What the Numbers Really Mean",
      excerpt:
        "Decode property wealth analytics and learn how to interpret owner net worth data for better investment decisions.",
      category: "Data Analysis",
      readTime: "7 min read",
      publishDate: "2024-01-10",
      views: 2234,
      featured: false,
      tags: ["wealth-data", "analytics", "property-intelligence", "investment"],
    },
  ]

  const marketGuides = [
    {
      title: "California Luxury Real Estate Guide",
      description: "Complete guide to luxury properties in California's most exclusive markets",
      locations: ["Beverly Hills", "Malibu", "Palo Alto", "Napa Valley"],
      properties: 1247,
    },
    {
      title: "New York Premium Properties",
      description: "Explore Manhattan's most prestigious addresses and emerging luxury markets",
      locations: ["Manhattan", "Brooklyn Heights", "Hamptons", "Westchester"],
      properties: 892,
    },
    {
      title: "Florida Waterfront Estates",
      description: "Discover oceanfront and waterfront luxury properties across Florida",
      locations: ["Miami Beach", "Naples", "Key West", "Palm Beach"],
      properties: 634,
    },
  ]

  const seoMetrics = [
    { label: "Monthly Organic Traffic", value: "45,230", change: "+23%" },
    { label: "Keyword Rankings", value: "1,247", change: "+15%" },
    { label: "Backlinks", value: "3,892", change: "+31%" },
    { label: "Domain Authority", value: "67", change: "+8%" },
  ]

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* SEO Performance Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            SEO Performance Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {seoMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-blue-600">{metric.value}</div>
                <div className="text-sm text-gray-600">{metric.label}</div>
                <div className="text-sm text-green-600 font-medium">{metric.change}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Featured Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Blog Posts */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Latest Blog Posts
                </CardTitle>
                <Button variant="outline" size="sm">
                  View All Posts
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className={`border-b pb-6 last:border-b-0 ${post.featured ? "bg-blue-50 p-4 rounded-lg border-blue-200" : ""}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant={post.featured ? "default" : "secondary"}>{post.category}</Badge>
                      {post.featured && (
                        <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {post.views.toLocaleString()}
                      </span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 cursor-pointer">{post.title}</h3>

                  <p className="text-gray-600 mb-3">{post.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.publishDate).toLocaleDateString()}
                    </div>
                  </div>
                </article>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Market Guides Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Market Guides
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {marketGuides.map((guide, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <h4 className="font-semibold mb-2">{guide.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{guide.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {guide.locations.map((location) => (
                      <Badge key={location} variant="outline" className="text-xs">
                        {location}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{guide.properties} properties</span>
                    <ArrowRight className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Newsletter Signup */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Stay Updated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Get weekly insights on luxury real estate markets, property trends, and investment opportunities.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <Button className="w-full" size="sm">
                  Subscribe to Newsletter
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">Join 12,000+ real estate professionals</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Content Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Content Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Market Analysis", count: 23, color: "bg-blue-100 text-blue-800" },
              { name: "Investment Guides", count: 18, color: "bg-green-100 text-green-800" },
              { name: "Location Guides", count: 31, color: "bg-purple-100 text-purple-800" },
              { name: "Professional Tips", count: 15, color: "bg-orange-100 text-orange-800" },
              { name: "Data Analysis", count: 12, color: "bg-red-100 text-red-800" },
              { name: "Legal Insights", count: 9, color: "bg-indigo-100 text-indigo-800" },
              { name: "Technology", count: 7, color: "bg-pink-100 text-pink-800" },
              { name: "Industry News", count: 25, color: "bg-gray-100 text-gray-800" },
            ].map((category) => (
              <Link key={category.name} href={`/blog/category/${category.name.toLowerCase().replace(" ", "-")}`}>
                <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                  <h3 className="font-medium mb-2">{category.name}</h3>
                  <Badge className={category.color}>{category.count} articles</Badge>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
