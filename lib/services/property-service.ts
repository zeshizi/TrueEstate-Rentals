import type { Property, PropertyFilter } from "@/lib/models/property"

export class PropertyService {
  // Mock data service - no database connection needed
  private mockProperties: Property[] = []

  constructor() {
    console.log("🎭 PropertyService initialized with mock data for all states")
  }

  async createProperty(property: Omit<Property, "_id" | "createdAt" | "updatedAt">): Promise<Property> {
    console.log("🎭 Creating mock property:", property.address)

    const newProperty: Property = {
      ...property,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Add to mock array
    this.mockProperties.push(newProperty)
    return newProperty
  }

  async getProperty(id: string): Promise<Property | null> {
    console.log("🎭 Getting mock property:", id)

    // Return mock property or null
    const mockProperty = this.mockProperties.find((p) => p.id === id)
    return mockProperty || null
  }

  async searchProperties(filters: PropertyFilter, limit = 50, skip = 0): Promise<Property[]> {
    console.log("🎭 Searching mock properties with filters:", filters)

    // Always return empty array to force fallback to API mock data
    // This ensures the API layer handles all mock data consistently
    return []
  }

  async getPropertiesByOwner(ownerName: string): Promise<Property[]> {
    console.log("🎭 Getting mock properties by owner:", ownerName)

    // Return empty array to force API fallback
    return []
  }

  async updateProperty(id: string, updates: Partial<Property>): Promise<boolean> {
    console.log("🎭 Updating mock property:", id)

    // Mock update - always return true
    return true
  }

  async deleteProperty(id: string): Promise<boolean> {
    console.log("🎭 Deleting mock property:", id)

    // Mock delete - always return true
    return true
  }

  async getMarketStats(location?: string): Promise<any> {
    console.log("🎭 Getting mock market stats for:", location || "all locations")

    // Return mock market stats
    return {
      totalProperties: 120,
      averageValue: 8500000,
      medianValue: 6800000,
      minValue: 1800000,
      maxValue: 32000000,
      averageWealthOwner: 385000000,
      dataSource: "mock_data_all_states",
    }
  }

  async seedSampleData(): Promise<void> {
    console.log("🎭 Mock data seeding - no action needed, using API mock data")

    // No seeding needed for mock mode
    return
  }
}
