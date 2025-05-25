"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, User, Building, TrendingUp, MapPin, Phone, Mail, Calendar, Star } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WealthDashboard } from "@/components/wealth-dashboard"
import { OwnerRatingSystem } from "@/components/owner-rating-system"

interface OwnerDetails {
  id: string
  name: string
  title: string
  company: string
  image: string
  netWorth: number
  email: string
  phone: string
  location: string
  joinDate: string
  totalProperties: number
  totalValue: number
  averageRating: number
  totalRatings: number
  bio: string
  specialties: string[]
  achievements: string[]
  socialMedia: {
    linkedin?: string
    twitter?: string
    website?: string
  }
}

export default function OwnerDetailPage() {
  const params = useParams()
  const [owner, setOwner] = useState<OwnerDetails | null>(null)
  const [loading, setLoading] = useState(true)

  // Mock data for the owner
  const mockOwnerData: OwnerDetails = {
    id: params.id as string,
    name: "David Chen",
    title: "Tech CEO & Real Estate Investor",
    company: "InnovateTech Solutions",
    image: "tech+ceo+professional+headshot",
    netWorth: 45000000,
    email: "david.chen@innovatetech.com",
    phone: "+1 (650) 555-0123",
    location: "Palo Alto, CA",
    joinDate: "2019-03-15",
    totalProperties: 12,
    totalValue: 28500000,
    averageRating: 4.7,
    totalRatings: 23,
    bio: "David Chen is a successful technology entrepreneur and real estate investor with over 15 years of experience in both industries. He founded InnovateTech Solutions in 2015 and has since built a diverse portfolio of luxury properties across California and New York.",
    specialties: ["Luxury Properties", "Tech Hub Locations", "Investment Properties", "Commercial Real Estate"],
    achievements: [
      "Built $45M real estate portfolio",
      "Founded successful tech company",
      "Top 1% property investor in Bay Area",
      "Featured in Forbes Real Estate",
    ],
    socialMedia: {
      linkedin: "https://linkedin.com/in/davidchen",
      twitter: "https://twitter.com/davidchen",
      website: "https://davidchen.com",
    },
  }

  // Mock wealth dashboard data
  const mockWealthData = {
    ownerId: params.id as string,
    ownerName: mockOwnerData.name,
    totalNetWorth: 45000000,
    realEstateValue: 28500000,
    liquidAssets: 8500000,
    investments: 6000000,
    businessAssets: 2000000,
    properties: [
      {
        id: "1",
        address: "432 Park Avenue, Manhattan, NY",
        value: 8500000,
        region: "New York",
        propertyType: "Luxury Condo",
        acquisitionDate: "2022-01",
        currentROI: 22.1,
      },
      {
        id: "2",
        address: "1200 Ocean Drive, Miami Beach, FL",
        value: 3200000,
        region: "Florida",
        propertyType: "Waterfront",
        acquisitionDate: "2021-06",
        currentROI: 19.8,
      },
      {
        id: "3",
        address: "9876 Sunset Blvd, Beverly Hills, CA",
        value: 2850000,
        region: "California",
        propertyType: "Mansion",
        acquisitionDate: "2020-11",
        currentROI: 18.5,
      },
      {
        id: "4",
        address: "555 Tech Drive, Palo Alto, CA",
        value: 4200000,
        region: "California",
        propertyType: "Modern Estate",
        acquisitionDate: "2019-08",
        currentROI: 25.3,
      },
      {
        id: "5",
        address: "789 Lake Shore, Chicago, IL",
        value: 2100000,
        region: "Illinois",
        propertyType: "Penthouse",
        acquisitionDate: "2023-02",
        currentROI: 15.7,
      },
    ],
  }

  // Mock ratings data
  const mockRatings = [
    {
      id: "1",
      userId: "agent1",
      userName: "Sarah Williams",
      userType: "agent" as const,
      rating: 5,
      title: "Exceptional to work with",
      comment:
        "David is one of the most professional and reliable property owners I've worked with. Always responsive and fair in all dealings.",
      date: "2024-01-15",
      verified: true,
      helpful: 12,
      category: "reliability" as const,
    },
    {
      id: "2",
      userId: "investor1",
      userName: "Michael Rodriguez",
      userType: "investor" as const,
      rating: 5,
      title: "Great investment partner",
      comment: "Partnered with David on several deals. His market knowledge and integrity are outstanding.",
      date: "2024-01-10",
      verified: true,
      helpful: 8,
      category: "business_dealings" as const,
    },
    {
      id: "3",
      userId: "agent2",
      userName: "Jennifer Park",
      userType: "agent" as const,
      rating: 4,
      title: "Professional and knowledgeable",
      comment: "David knows the luxury market very well. Properties are always well-maintained and fairly priced.",
      date: "2023-12-20",
      verified: true,
      helpful: 6,
      category: "property_quality" as const,
    },
  ]

  const mockRatingBreakdown = {
    5: 18,
    4: 4,
    3: 1,
    2: 0,
    1: 0,
  }

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setOwner(mockOwnerData)
      setLoading(false)
    }, 1000)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!owner) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Owner Not Found</h1>
            <p className="text-gray-600 mb-6">The owner you're looking for doesn't exist.</p>
            <Link href="/search">
              <Button>Back to Search</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/search">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
        </Link>

        {/* Owner Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start gap-6">
            <img
              src={`/placeholder.svg?height=120&width=120&query=${owner.image}`}
              alt={owner.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{owner.name}</h1>
                  <p className="text-lg text-gray-600 mb-2">{owner.title}</p>
                  <p className="text-gray-500 mb-3">{owner.company}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{owner.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Member since {new Date(owner.joinDate).getFullYear()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>
                        {owner.averageRating} ({owner.totalRatings} reviews)
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {owner.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    ${(owner.netWorth / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm text-gray-600">Net Worth</div>
                  <div className="mt-2">
                    <Badge className="bg-green-100 text-green-800">Verified Owner</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="wealth">Wealth Dashboard</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="ratings">Ratings & Reviews</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Building className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{owner.totalProperties}</div>
                  <div className="text-sm text-gray-600">Properties Owned</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">${(owner.totalValue / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-gray-600">Portfolio Value</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2 fill-current" />
                  <div className="text-2xl font-bold text-gray-900">{owner.averageRating}</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <User className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{owner.totalRatings}</div>
                  <div className="text-sm text-gray-600">Total Reviews</div>
                </CardContent>
              </Card>
            </div>

            {/* Bio and Achievements */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{owner.bio}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {owner.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="wealth">
            <WealthDashboard {...mockWealthData} />
          </TabsContent>

          <TabsContent value="properties">
            <div className="grid gap-6">
              {mockWealthData.properties.map((property) => (
                <Card key={property.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{property.address}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{property.propertyType}</span>
                          <span>•</span>
                          <span>{property.region}</span>
                          <span>•</span>
                          <span>Acquired {property.acquisitionDate}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-blue-600">${(property.value / 1000000).toFixed(1)}M</div>
                        <div className="text-sm text-green-600">ROI: {property.currentROI}%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ratings">
            <OwnerRatingSystem
              ownerId={owner.id}
              ownerName={owner.name}
              ratings={mockRatings}
              averageRating={owner.averageRating}
              totalRatings={owner.totalRatings}
              ratingBreakdown={mockRatingBreakdown}
            />
          </TabsContent>

          <TabsContent value="contact">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-gray-600">{owner.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-gray-600">{owner.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium">Location</div>
                      <div className="text-gray-600">{owner.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Connect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Schedule Call
                  </Button>
                  <div className="pt-4 border-t">
                    <div className="text-sm font-medium mb-2">Social Media</div>
                    <div className="flex gap-2">
                      {owner.socialMedia.linkedin && (
                        <Button variant="outline" size="sm">
                          LinkedIn
                        </Button>
                      )}
                      {owner.socialMedia.twitter && (
                        <Button variant="outline" size="sm">
                          Twitter
                        </Button>
                      )}
                      {owner.socialMedia.website && (
                        <Button variant="outline" size="sm">
                          Website
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
