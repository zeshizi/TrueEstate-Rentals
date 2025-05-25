import { NextResponse } from "next/server"

const propertyTypes = ["House", "Apartment", "Condo", "Townhouse"]
const propertyStatuses = ["For Sale", "For Rent"]
const locations = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"]
const amenities = ["Pool", "Gym", "Parking", "Balcony", "Garden"]

const generateMockProperties = (count: number) => {
  const properties = []

  // Generate diverse price ranges from affordable to luxury
  const priceSegments = [
    { min: 150000, max: 300000, weight: 0.25 }, // Affordable housing
    { min: 300000, max: 600000, weight: 0.3 }, // Middle class
    { min: 600000, max: 1200000, weight: 0.25 }, // Upper middle class
    { min: 1200000, max: 3000000, weight: 0.15 }, // High-end
    { min: 3000000, max: 15000000, weight: 0.05 }, // Luxury
  ]

  const getRandomPrice = () => {
    const random = Math.random()
    let cumulativeWeight = 0

    for (const segment of priceSegments) {
      cumulativeWeight += segment.weight
      if (random <= cumulativeWeight) {
        return Math.floor(Math.random() * (segment.max - segment.min) + segment.min)
      }
    }
    return 500000 // fallback
  }

  for (let i = 0; i < count; i++) {
    const type = propertyTypes[Math.floor(Math.random() * propertyTypes.length)]
    const status = propertyStatuses[Math.floor(Math.random() * propertyStatuses.length)]
    const location = locations[Math.floor(Math.random() * locations.length)]
    const bedrooms = Math.floor(Math.random() * 5) + 1
    const bathrooms = Math.floor(Math.random() * 4) + 1
    const sqft = Math.floor(Math.random() * 2000) + 800
    const hasPool = Math.random() < 0.5
    const hasGym = Math.random() < 0.5
    const hasParking = Math.random() < 0.7
    const hasBalcony = Math.random() < 0.4
    const hasGarden = Math.random() < 0.3
    const value = getRandomPrice()

    // For rent properties, calculate monthly rent (roughly 0.5-1% of property value per month)
    const monthlyRent = Math.floor(value * 0.007 + Math.random() * value * 0.003)

    properties.push({
      id: i + 1,
      type,
      status,
      location,
      bedrooms,
      bathrooms,
      sqft,
      price: value,
      rent: status === "For Rent" ? monthlyRent : null,
      amenities: [
        hasPool ? "Pool" : null,
        hasGym ? "Gym" : null,
        hasParking ? "Parking" : null,
        hasBalcony ? "Balcony" : null,
        hasGarden ? "Garden" : null,
      ].filter(Boolean),
      image: `/images/property${(i % 6) + 1}.jpg`, // Cycle through 6 images
    })
  }
  return properties
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query") || ""
  const count = Number.parseInt(searchParams.get("count") || "10", 10)

  const mockProperties = generateMockProperties(count)

  const filteredProperties = mockProperties.filter((property) => {
    const searchTerm = query.toLowerCase()
    return (
      property.location.toLowerCase().includes(searchTerm) ||
      property.type.toLowerCase().includes(searchTerm) ||
      property.status.toLowerCase().includes(searchTerm)
    )
  })

  return NextResponse.json(filteredProperties)
}
