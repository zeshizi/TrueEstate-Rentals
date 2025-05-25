"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Star, ThumbsUp, User, Shield, TrendingUp } from "lucide-react"

interface Review {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  title: string
  comment: string
  date: string
  verified: boolean
  helpful: number
  category: "location" | "value" | "condition" | "neighborhood" | "investment"
}

interface PropertyReviewsProps {
  propertyId: string
  reviews: Review[]
  averageRating: number
  totalReviews: number
  ratingBreakdown: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}

export function PropertyReviews({
  propertyId,
  reviews,
  averageRating,
  totalReviews,
  ratingBreakdown,
}: PropertyReviewsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    comment: "",
    category: "value" as const,
  })

  const renderStars = (rating: number, size = "w-4 h-4") => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`${size} ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "investment":
        return <TrendingUp className="w-4 h-4" />
      case "location":
        return <User className="w-4 h-4" />
      default:
        return <Star className="w-4 h-4" />
    }
  }

  const handleSubmitReview = () => {
    // Implement review submission
    console.log("Submitting review:", newReview)
    setShowReviewForm(false)
    setNewReview({ rating: 5, title: "", comment: "", category: "value" })
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            Property Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">{averageRating.toFixed(1)}</div>
              <div className="flex justify-center mb-2">{renderStars(Math.round(averageRating), "w-5 h-5")}</div>
              <p className="text-gray-600">{totalReviews} reviews</p>
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
                        width: `${(ratingBreakdown[stars as keyof typeof ratingBreakdown] / totalReviews) * 100}%`,
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

          <Button onClick={() => setShowReviewForm(!showReviewForm)} className="w-full mt-4">
            Write a Review
          </Button>
        </CardContent>
      </Card>

      {/* Review Form */}
      {showReviewForm && (
        <Card>
          <CardHeader>
            <CardTitle>Write Your Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="flex gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <button key={i} onClick={() => setNewReview({ ...newReview, rating: i + 1 })} className="p-1">
                    <Star
                      className={`w-6 h-6 ${
                        i < newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={newReview.category}
                onChange={(e) =>
                  setNewReview({
                    ...newReview,
                    category: e.target.value as any,
                  })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="value">Property Value</option>
                <option value="location">Location</option>
                <option value="condition">Condition</option>
                <option value="neighborhood">Neighborhood</option>
                <option value="investment">Investment Potential</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                value={newReview.title}
                onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                placeholder="Brief summary of your review"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Review</label>
              <Textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="Share your thoughts about this property..."
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSubmitReview}>Submit Review</Button>
              <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.userName}</span>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      {renderStars(review.rating)}
                      <span>•</span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                  {getCategoryIcon(review.category)}
                  {review.category}
                </Badge>
              </div>

              <h4 className="font-medium mb-2">{review.title}</h4>
              <p className="text-gray-700 mb-3">{review.comment}</p>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <button className="flex items-center gap-1 hover:text-blue-600">
                  <ThumbsUp className="w-4 h-4" />
                  Helpful ({review.helpful})
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
