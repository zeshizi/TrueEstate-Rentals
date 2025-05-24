import type { ObjectId } from "mongodb"

export interface WealthAnalysis {
  _id?: ObjectId
  id: string
  ownerId: string
  ownerName: string
  ownerType: string

  // Wealth estimation
  estimatedNetWorth: number
  confidence: "High" | "Medium" | "Low"
  confidenceScore: number
  lastUpdated: Date
  dataFreshness: "Recent" | "Moderate" | "Stale"

  // Data sources
  sources: Array<{
    name: string
    weight: number
    lastUpdated: Date
    reliability: number
  }>

  // Wealth breakdown
  wealthBreakdown: Array<{
    category: string
    percentage: number
    amount: number
    details?: any
  }>

  // Risk factors
  riskFactors: string[]

  // Trends
  wealthTrend: {
    direction: "increasing" | "decreasing" | "stable"
    percentage: number
    timeframe: string
  }

  // Comparisons
  comparisons: {
    percentile: number
    medianInArea: number
    averageInArea: number
  }

  // Properties owned
  properties: Array<{
    propertyId: string
    address: string
    value: number
    purchaseDate?: Date
    purchasePrice?: number
  }>

  // Metadata
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}
