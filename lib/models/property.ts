import type { ObjectId } from "mongodb"

export interface Property {
  _id?: ObjectId
  id: string
  address: string
  lat: number
  lng: number
  value: number
  propertyType: "single-family" | "condo" | "townhouse" | "multi-family" | "commercial"
  bedrooms?: number
  bathrooms?: number
  sqft?: number
  yearBuilt?: number
  lotSize?: number

  // Owner information
  ownerName: string
  ownerType: "individual" | "corporation" | "trust" | "llc" | "partnership"
  ownerWealth: number
  confidence: "High" | "Medium" | "Low"

  // Property details
  images: string[]
  features: string[]
  appliances: string[]
  parking?: string
  heating?: string
  cooling?: string
  flooring?: string

  // Financial information
  lastSaleDate?: string
  lastSalePrice?: number
  propertyTax?: number
  zillowEstimate?: number
  rentEstimate?: number

  // Location data
  neighborhood?: {
    walkScore?: number
    transitScore?: number
    bikeScore?: number
    schools?: Array<{
      name: string
      rating: number
      distance: number
    }>
  }

  // Reviews and ratings
  reviews?: Array<{
    id: string
    userId: string
    userName: string
    userAvatar?: string
    rating: number // 1-5 stars
    title: string
    comment: string
    date: string
    verified: boolean
    helpful: number
    category: "location" | "value" | "condition" | "neighborhood" | "investment"
  }>
  averageRating?: number
  totalReviews?: number
  ratingBreakdown?: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }

  // Property remarks and notes
  remarks?: Array<{
    id: string
    type: "agent" | "owner" | "inspector" | "appraiser"
    author: string
    content: string
    date: string
    isPublic: boolean
    category: "condition" | "pricing" | "market" | "investment" | "legal"
  }>

  // Metadata
  createdAt: Date
  updatedAt: Date
  isActive: boolean
  dataSource: string
  lastVerified?: Date
}

export interface PropertyFilter {
  minValue?: number
  maxValue?: number
  propertyType?: string
  ownerType?: string
  wealthRange?: string
  location?: string
  bedrooms?: number
  bathrooms?: number
  minSqft?: number
  maxSqft?: number
}
