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

  async seedSampleData(): Promise<void> {
    const collection = await this.getCollection()

    // Check if data already exists
    const existingCount = await collection.countDocuments()
    if (existingCount > 0) {
      console.log("Sample data already exists, skipping seed")
      return
    }

    const sampleProperties = [
      {
        id: "prop_beverly_hills_1",
        address: "456 Beverly Hills Drive",
        city: "Beverly Hills",
        state: "CA",
        zipCode: "90210",
        value: 15000000,
        bedrooms: 6,
        bathrooms: 8,
        sqft: 8500,
        propertyType: "Single Family",
        yearBuilt: 2018,
        lotSize: 25000,
        ownerName: "Sarah Johnson",
        ownerType: "Individual",
        ownerWealth: 250000000,
        lastSaleDate: "2022-03-20",
        lastSalePrice: 14200000,
        images: ["/placeholder.svg?height=300&width=400&text=Beverly+Hills+Mansion"],
        features: ["Pool", "Wine Cellar", "Home Theater", "Tennis Court"],
        isActive: true,
        dataSource: "manual",
        coordinates: { lat: 34.0736, lng: -118.4004 },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "prop_manhattan_1",
        address: "123 Park Avenue",
        city: "New York",
        state: "NY",
        zipCode: "10016",
        value: 8500000,
        bedrooms: 4,
        bathrooms: 4,
        sqft: 3200,
        propertyType: "Condo",
        yearBuilt: 2019,
        lotSize: 0,
        ownerName: "Goldman Investment LLC",
        ownerType: "LLC",
        ownerWealth: 180000000,
        lastSaleDate: "2023-06-15",
        lastSalePrice: 8000000,
        images: ["/placeholder.svg?height=300&width=400&text=Manhattan+Penthouse"],
        features: ["Doorman", "Gym", "Rooftop Deck", "Central Park View"],
        isActive: true,
        dataSource: "manual",
        coordinates: { lat: 40.7505, lng: -73.9934 },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "prop_malibu_1",
        address: "789 Pacific Coast Highway",
        city: "Malibu",
        state: "CA",
        zipCode: "90265",
        value: 12000000,
        bedrooms: 5,
        bathrooms: 6,
        sqft: 6800,
        propertyType: "Single Family",
        yearBuilt: 2020,
        lotSize: 15000,
        ownerName: "Entertainment Mogul Trust",
        ownerType: "Trust",
        ownerWealth: 320000000,
        lastSaleDate: "2023-01-10",
        lastSalePrice: 11500000,
        images: ["/placeholder.svg?height=300&width=400&text=Malibu+Oceanfront"],
        features: ["Ocean View", "Private Beach", "Guest House", "Infinity Pool"],
        isActive: true,
        dataSource: "manual",
        coordinates: { lat: 34.0259, lng: -118.7798 },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "prop_hamptons_1",
        address: "321 Meadow Lane",
        city: "East Hampton",
        state: "NY",
        zipCode: "11937",
        value: 9200000,
        bedrooms: 7,
        bathrooms: 9,
        sqft: 9500,
        propertyType: "Single Family",
        yearBuilt: 2017,
        lotSize: 35000,
        ownerName: "Real Estate Dynasty Corp",
        ownerType: "Corporate",
        ownerWealth: 200000000,
        lastSaleDate: "2022-08-05",
        lastSalePrice: 8800000,
        images: ["/placeholder.svg?height=300&width=400&text=Hamptons+Estate"],
        features: ["Tennis Court", "Pool House", "Wine Cellar", "Ocean Access"],
        isActive: true,
        dataSource: "manual",
        coordinates: { lat: 40.9629, lng: -72.1989 },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "prop_aspen_1",
        address: "654 Aspen Mountain Road",
        city: "Aspen",
        state: "CO",
        zipCode: "81611",
        value: 6800000,
        bedrooms: 5,
        bathrooms: 6,
        sqft: 5200,
        propertyType: "Single Family",
        yearBuilt: 2021,
        lotSize: 12000,
        ownerName: "Hedge Fund Partners LLC",
        ownerType: "LLC",
        ownerWealth: 150000000,
        lastSaleDate: "2023-04-12",
        lastSalePrice: 6500000,
        images: ["/placeholder.svg?height=300&width=400&text=Aspen+Ski+Lodge"],
        features: ["Ski Access", "Hot Tub", "Fireplace", "Mountain Views"],
        isActive: true,
        dataSource: "manual",
        coordinates: { lat: 39.1911, lng: -106.8175 },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    await collection.insertMany(sampleProperties)
    console.log(`✅ Seeded ${sampleProperties.length} sample properties to MongoDB`)
  }
}
