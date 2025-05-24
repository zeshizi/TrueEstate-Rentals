import { getDatabase } from "@/lib/mongodb"
import type { Property, PropertyFilter } from "@/lib/models/property"

export class PropertyService {
  private async getCollection() {
    const db = await getDatabase()
    return db.collection<Property>("properties")
  }

  async createProperty(property: Omit<Property, "_id" | "createdAt" | "updatedAt">): Promise<Property> {
    const collection = await this.getCollection()

    const newProperty: Property = {
      ...property,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(newProperty)
    return { ...newProperty, _id: result.insertedId }
  }

  async getProperty(id: string): Promise<Property | null> {
    const collection = await this.getCollection()
    return await collection.findOne({ id })
  }

  async searchProperties(filters: PropertyFilter, limit = 50, skip = 0): Promise<Property[]> {
    const collection = await this.getCollection()

    const query: any = { isActive: true }

    // Value range filter
    if (filters.minValue || filters.maxValue) {
      query.value = {}
      if (filters.minValue) query.value.$gte = filters.minValue
      if (filters.maxValue) query.value.$lte = filters.maxValue
    }

    // Property type filter
    if (filters.propertyType && filters.propertyType !== "all") {
      query.propertyType = filters.propertyType
    }

    // Owner type filter
    if (filters.ownerType && filters.ownerType !== "all") {
      query.ownerType = filters.ownerType
    }

    // Location filter
    if (filters.location) {
      query.address = { $regex: filters.location, $options: "i" }
    }

    // Bedrooms filter
    if (filters.bedrooms) {
      query.bedrooms = filters.bedrooms
    }

    // Bathrooms filter
    if (filters.bathrooms) {
      query.bathrooms = filters.bathrooms
    }

    // Square footage filter
    if (filters.minSqft || filters.maxSqft) {
      query.sqft = {}
      if (filters.minSqft) query.sqft.$gte = filters.minSqft
      if (filters.maxSqft) query.sqft.$lte = filters.maxSqft
    }

    // Wealth range filter
    if (filters.wealthRange && filters.wealthRange !== "all") {
      const wealthRanges: Record<string, [number, number]> = {
        "1m-5m": [1000000, 5000000],
        "5m-10m": [5000000, 10000000],
        "10m-25m": [10000000, 25000000],
        "25m-50m": [25000000, 50000000],
        "50m+": [50000000, Number.POSITIVE_INFINITY],
      }

      const range = wealthRanges[filters.wealthRange]
      if (range) {
        query.ownerWealth = { $gte: range[0], $lte: range[1] === Number.POSITIVE_INFINITY ? 999999999 : range[1] }
      }
    }

    return await collection.find(query).sort({ value: -1 }).skip(skip).limit(limit).toArray()
  }

  async getPropertiesByOwner(ownerName: string): Promise<Property[]> {
    const collection = await this.getCollection()
    return await collection
      .find({ ownerName: { $regex: ownerName, $options: "i" }, isActive: true })
      .sort({ value: -1 })
      .toArray()
  }

  async updateProperty(id: string, updates: Partial<Property>): Promise<boolean> {
    const collection = await this.getCollection()
    const result = await collection.updateOne(
      { id },
      {
        $set: {
          ...updates,
          updatedAt: new Date(),
        },
      },
    )
    return result.modifiedCount > 0
  }

  async deleteProperty(id: string): Promise<boolean> {
    const collection = await this.getCollection()
    const result = await collection.updateOne(
      { id },
      {
        $set: {
          isActive: false,
          updatedAt: new Date(),
        },
      },
    )
    return result.modifiedCount > 0
  }

  async getMarketStats(location?: string): Promise<any> {
    const collection = await this.getCollection()

    const matchStage: any = { isActive: true }
    if (location) {
      matchStage.address = { $regex: location, $options: "i" }
    }

    const stats = await collection
      .aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: null,
            totalProperties: { $sum: 1 },
            averageValue: { $avg: "$value" },
            medianValue: { $median: { input: "$value", method: "approximate" } },
            minValue: { $min: "$value" },
            maxValue: { $max: "$value" },
            averageWealthOwner: { $avg: "$ownerWealth" },
          },
        },
      ])
      .toArray()

    return stats[0] || {}
  }
}
