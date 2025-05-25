import { NextResponse } from "next/server"

// Mock properties data (replace with your actual data source)
const mockProperties = [
  {
    id: "1",
    name: "Luxury Villa",
    location: "Malibu",
    price: 10000000,
    image: "/images/property1.jpg",
  },
  {
    id: "2",
    name: "Cozy Apartment",
    location: "New York",
    price: 2500000,
    image: "/images/property2.jpg",
  },
  {
    id: "3",
    name: "Beachfront House",
    location: "Miami",
    price: 7500000,
    image: "/images/property3.jpg",
  },
  {
    id: "4",
    name: "Mountain Cabin",
    location: "Aspen",
    price: 5000000,
    image: "/images/property4.jpg",
  },
  {
    id: "5",
    name: "Modern Loft",
    location: "Chicago",
    price: 1500000,
    image: "/images/property5.jpg",
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query") || ""

  // Handle "browse all" queries
  if (query === "all properties" || query === "all rentals") {
    // Return all mock properties for browsing
    const allProperties = [
      // Include all the existing mock properties from different price ranges
      ...mockProperties,
      // Add more diverse properties for comprehensive browsing
    ]

    return NextResponse.json({
      results: allProperties.map((property) => ({
        ...property,
        type: "property",
      })),
      total: allProperties.length,
      query: query,
    })
  }

  const results = mockProperties
    .filter(
      (property) =>
        property.name.toLowerCase().includes(query.toLowerCase()) ||
        property.location.toLowerCase().includes(query.toLowerCase()),
    )
    .map((property) => ({
      ...property,
      type: "property",
    }))

  return NextResponse.json({
    results: results,
    total: results.length,
    query: query,
  })
}
