import { getDatabase } from "@/lib/mongodb"
import type { WealthAnalysis } from "@/lib/models/wealth-analysis"
import { PropertyService } from "./property-service"

export class WealthService {
  private propertyService = new PropertyService()

  private async getCollection() {
    const db = await getDatabase()
    return db.collection<WealthAnalysis>("wealth_analyses")
  }

  async createWealthAnalysis(
    analysis: Omit<WealthAnalysis, "_id" | "createdAt" | "updatedAt">,
  ): Promise<WealthAnalysis> {
    const collection = await this.getCollection()

    const newAnalysis: WealthAnalysis = {
      ...analysis,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(newAnalysis)
    return { ...newAnalysis, _id: result.insertedId }
  }

  async getWealthAnalysis(ownerId: string): Promise<WealthAnalysis | null> {
    const collection = await this.getCollection()
    return await collection.findOne({ ownerId, isActive: true })
  }

  async generateWealthAnalysis(ownerName: string): Promise<WealthAnalysis> {
    // Get all properties owned by this person
    const properties = await this.propertyService.getPropertiesByOwner(ownerName)

    if (properties.length === 0) {
      throw new Error("No properties found for this owner")
    }

    const totalPropertyValue = properties.reduce((sum, prop) => sum + prop.value, 0)
    const averagePropertyValue = totalPropertyValue / properties.length

    // Determine location for wealth calculation
    const primaryLocation = this.extractLocation(properties[0].address)

    // Calculate estimated net worth using our algorithm
    const estimatedNetWorth = this.calculateEstimatedNetWorth(averagePropertyValue, properties.length, primaryLocation)

    const confidence = this.calculateConfidence(averagePropertyValue, properties.length, primaryLocation)
    const wealthBreakdown = this.calculateWealthBreakdown(estimatedNetWorth, totalPropertyValue)

    const analysis: Omit<WealthAnalysis, "_id" | "createdAt" | "updatedAt"> = {
      id: `wealth_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ownerId: `owner_${ownerName.toLowerCase().replace(/\s+/g, "_")}`,
      ownerName,
      ownerType: properties[0].ownerType,
      estimatedNetWorth,
      confidence: confidence.level as "High" | "Medium" | "Low",
      confidenceScore: confidence.score,
      lastUpdated: new Date(),
      dataFreshness: "Recent",
      sources: [
        {
          name: "Property Records",
          weight: 60,
          lastUpdated: new Date(),
          reliability: 90,
        },
        {
          name: "Market Analysis",
          weight: 25,
          lastUpdated: new Date(),
          reliability: 75,
        },
        {
          name: "Location Data",
          weight: 15,
          lastUpdated: new Date(),
          reliability: 80,
        },
      ],
      wealthBreakdown,
      riskFactors: this.generateRiskFactors(properties, estimatedNetWorth),
      wealthTrend: {
        direction: "increasing",
        percentage: Math.random() * 20 + 5, // 5-25% growth
        timeframe: "12 months",
      },
      comparisons: {
        percentile: this.calculatePercentile(estimatedNetWorth),
        medianInArea: Math.round(estimatedNetWorth * 0.3),
        averageInArea: Math.round(estimatedNetWorth * 0.45),
      },
      properties: properties.map((prop) => ({
        propertyId: prop.id,
        address: prop.address,
        value: prop.value,
        purchaseDate: prop.lastSaleDate ? new Date(prop.lastSaleDate) : undefined,
        purchasePrice: prop.lastSalePrice,
      })),
      isActive: true,
    }

    return await this.createWealthAnalysis(analysis)
  }

  private extractLocation(address: string): string {
    // Extract city from address
    const parts = address.split(",")
    return parts.length > 1 ? parts[1].trim() : "Unknown"
  }

  private calculateEstimatedNetWorth(propertyValue: number, propertyCount: number, location: string): number {
    let baseMultiplier = 2.5

    const locationMultipliers: Record<string, number> = {
      "beverly hills": 3.5,
      manhattan: 4.0,
      malibu: 3.2,
      miami: 2.8,
      "palo alto": 4.2,
      "san francisco": 3.8,
      aspen: 5.0,
      hamptons: 4.5,
    }

    const locationKey = location.toLowerCase()
    for (const [area, multiplier] of Object.entries(locationMultipliers)) {
      if (locationKey.includes(area)) {
        baseMultiplier = multiplier
        break
      }
    }

    const propertyMultiplier = Math.min(1 + (propertyCount - 1) * 0.3, 2.5)
    let valueMultiplier = 1
    if (propertyValue > 5000000) valueMultiplier = 1.5
    else if (propertyValue > 2000000) valueMultiplier = 1.3
    else if (propertyValue > 1000000) valueMultiplier = 1.1

    const totalPropertyValue = propertyValue * propertyCount
    return Math.round(totalPropertyValue * baseMultiplier * propertyMultiplier * valueMultiplier)
  }

  private calculateConfidence(
    propertyValue: number,
    propertyCount: number,
    location: string,
  ): { level: string; score: number } {
    let score = 50

    if (propertyValue > 2000000) score += 20
    else if (propertyValue > 1000000) score += 10
    else if (propertyValue > 500000) score += 5

    score += Math.min(propertyCount * 5, 25)

    const highValueAreas = ["beverly hills", "manhattan", "malibu", "palo alto", "san francisco"]
    if (highValueAreas.some((area) => location.toLowerCase().includes(area))) {
      score += 10
    }

    score = Math.min(score, 95)

    let level = "Low"
    if (score >= 80) level = "High"
    else if (score >= 60) level = "Medium"

    return { level, score }
  }

  private calculateWealthBreakdown(totalWealth: number, propertyValue: number) {
    const realEstatePercentage = Math.min((propertyValue / totalWealth) * 100, 70)

    return [
      {
        category: "Real Estate",
        percentage: Math.round(realEstatePercentage),
        amount: propertyValue,
      },
      {
        category: "Investments",
        percentage: Math.round((100 - realEstatePercentage) * 0.5),
        amount: Math.round(totalWealth * (100 - realEstatePercentage) * 0.005),
      },
      {
        category: "Business Assets",
        percentage: Math.round((100 - realEstatePercentage) * 0.3),
        amount: Math.round(totalWealth * (100 - realEstatePercentage) * 0.003),
      },
      {
        category: "Other",
        percentage: Math.round((100 - realEstatePercentage) * 0.2),
        amount: Math.round(totalWealth * (100 - realEstatePercentage) * 0.002),
      },
    ]
  }

  private generateRiskFactors(properties: any[], netWorth: number): string[] {
    const factors = []

    if (properties.length === 1) {
      factors.push("Single property concentration risk")
    }

    const realEstatePercentage = (properties.reduce((sum, p) => sum + p.value, 0) / netWorth) * 100
    if (realEstatePercentage > 60) {
      factors.push("High concentration in real estate")
    }

    const locations = [...new Set(properties.map((p) => this.extractLocation(p.address)))]
    if (locations.length === 1) {
      factors.push("Geographic concentration risk")
    }

    return factors
  }

  private calculatePercentile(netWorth: number): number {
    // Simplified percentile calculation based on US wealth distribution
    if (netWorth >= 50000000) return 99.9
    if (netWorth >= 25000000) return 99.5
    if (netWorth >= 10000000) return 99.0
    if (netWorth >= 5000000) return 98.0
    if (netWorth >= 2000000) return 95.0
    if (netWorth >= 1000000) return 90.0
    return 75.0
  }
}
