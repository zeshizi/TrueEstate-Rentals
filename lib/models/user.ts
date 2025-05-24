import type { ObjectId } from "mongodb"

export interface User {
  _id?: ObjectId
  id: string
  email: string
  name: string
  image?: string
  role: "user" | "agent" | "admin"

  // Profile information
  phone?: string
  company?: string
  licenseNumber?: string
  bio?: string

  // Preferences
  preferences: {
    notifications: boolean
    emailUpdates: boolean
    savedSearches: SavedSearch[]
    bookmarkedProperties: string[]
  }

  // Subscription
  subscription: {
    plan: "free" | "basic" | "premium" | "enterprise"
    status: "active" | "inactive" | "cancelled"
    expiresAt?: Date
    features: string[]
  }

  // Activity tracking
  lastLogin?: Date
  searchCount: number
  viewCount: number

  // Metadata
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}

export interface SavedSearch {
  id: string
  name: string
  filters: any
  alertsEnabled: boolean
  createdAt: Date
}
