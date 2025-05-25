"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Star, ThumbsUp, User, Shield, TrendingUp, Building } from "lucide-react"

interface OwnerRating {
  id: string
  userId: string
  userName: string
  userType: "agent" | "investor" | "tenant" | "business_partner"
  rating: number
  title: string
  comment: string
  date: string
  verified: boolean
  helpful: number
  category: "reliability" | "communication" | "property_quality" | "business_dealings" | "responsiveness"
}

interface OwnerRatingSystemProps {
  ownerId: string
  ownerName: string
  ratings: OwnerRating[]
  averageRating: number
  totalRatings: number
  ratingBreakdown: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}

export function OwnerRatingSystem({
  ownerId,
  ownerName,
  ratings,
  averageRating,
  totalRatings,
  ratingBreakdown,
}: OwnerRatingSystemProps) {
  const [showRatingForm, setShowRatingForm] = useState(false)
  const [newRating, setNewRating] = useState({
    rating: 5,
    title: "",
    comment: "",
    category: "reliability" as const,
    userType: "agent" as const,
  })

  const renderStars = (
    rating: number,
    size = "w-4 h-4",
    interactive = false,
    onStarClick?: (rating: number) => void,
  ) => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        onClick={() => interactive && onStarClick?.(i + 1)}
        disabled={!interactive}
        className={interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}
      >
        <Star className={`${size} ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
      </button>
    ))
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "reliability":
        return <Shield className="w-4 h-4" />
      case "communication":
        return <User className="w-4 h-4" />
      case "property_quality":
        return <Building className="w-4 h-4" />
      case "business_dealings":
        return <TrendingUp className="w-4 h-4" />
      default:
        return <Star className="w-4 h-4" />
    }
  }

  const getUserTypeBadge = (userType: string) => {
    const colors = {
      agent: "bg-blue-100 text-blue-800",
      investor: "bg-green-100 text-green-800",
      tenant: "bg-purple-100 text-purple-800",
      business_partner: "bg-orange-100 text-orange-800",
    }
    return colors[userType as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const handleSubmitRating = () => {
    // Implement rating submission
    console.log("Submitting rating:", newRating)
    setShowRatingForm(false)
    setNewRating({ rating: 5, title: "", comment: "", category: "reliability", userType: "agent" })
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            Owner Ratings & Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">{averageRating.toFixed(1)}</div>
              <div className="flex justify-center mb-2">{renderStars(Math.round(averageRating), "w-5 h-5")}</div>
              <p className="text-gray-600">{totalRatings} reviews</p>
              <div className="mt-4">
                <Badge className="bg-green-100 text-green-800">
                  {averageRating >= 4.5
                    ? "Excellent"
                    : averageRating >= 4
                      ? "Very Good"
                      : averageRating >= 3
                        ? "Good"
                        : "Fair"}{" "}
                  Owner
                </Badge>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center gap-2">
                  <span className="text-sm w-8">{stars}★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{
                        width: `${(ratingBreakdown[stars as keyof typeof ratingBreakdown] / totalRatings) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">
                    {ratingBreakdown[stars as keyof typeof ratingBreakdown]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={() => setShowRatingForm(!showRatingForm)} className="w-full mt-4">
            Rate This Owner
          </Button>
        </CardContent>
      </Card>

      {/* Rating Form */}
      {showRatingForm && (
        <Card>
          <CardHeader>
            <CardTitle>Rate {ownerName}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Your Role</label>
              <select
                value={newRating.userType}
                onChange={(e) => setNewRating({ ...newRating, userType: e.target.value as any })}
                className="w-full p-2 border rounded-md"
              >
                <option value="agent">Real Estate Agent</option>
                <option value="investor">Investor</option>
                <option value="tenant">Tenant</option>
                <option value="business_partner">Business Partner</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="flex gap-1">
                {renderStars(newRating.rating, "w-6 h-6", true, (rating) => setNewRating({ ...newRating, rating }))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={newRating.category}
                onChange={(e) => setNewRating({ ...newRating, category: e.target.value as any })}
                className="w-full p-2 border rounded-md"
              >
                <option value="reliability">Reliability</option>
                <option value="communication">Communication</option>
                <option value="property_quality">Property Quality</option>
                <option value="business_dealings">Business Dealings</option>
                <option value="responsiveness">Responsiveness</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                value={newRating.title}
                onChange={(e) => setNewRating({ ...newRating, title: e.target.value })}
                placeholder="Brief summary of your experience"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Review</label>
              <Textarea
                value={newRating.comment}
                onChange={(e) => setNewRating({ ...newRating, comment: e.target.value })}
                placeholder="Share your experience working with this owner..."
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSubmitRating}>Submit Review</Button>
              <Button variant="outline" onClick={() => setShowRatingForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {ratings.map((rating) => (
          <Card key={rating.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{rating.userName}</span>
                      {rating.verified && (
                        <Badge variant="secondary" className="text-xs">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      <Badge className={`text-xs ${getUserTypeBadge(rating.userType)}`}>
                        {rating.userType.replace("_", " ")}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      {renderStars(rating.rating)}
                      <span>•</span>
                      <span>{rating.date}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                  {getCategoryIcon(rating.category)}
                  {rating.category.replace("_", " ")}
                </Badge>
              </div>

              <h4 className="font-medium mb-2">{rating.title}</h4>
              <p className="text-gray-700 mb-3">{rating.comment}</p>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <button className="flex items-center gap-1 hover:text-blue-600">
                  <ThumbsUp className="w-4 h-4" />
                  Helpful ({rating.helpful})
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
