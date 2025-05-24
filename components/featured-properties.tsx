import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, DollarSign, Home, Users } from "lucide-react"

export function FeaturedProperties() {
  const properties = [
    {
      id: 1,
      image: "/placeholder.svg?height=200&width=300",
      address: "123 Luxury Ave, Beverly Hills, CA",
      price: "$2,500,000",
      type: "Single Family",
      beds: 4,
      baths: 3,
      sqft: "3,200",
      ownerWealth: "$15M",
      confidence: "High",
    },
    {
      id: 2,
      image: "/placeholder.svg?height=200&width=300",
      address: "456 Park Place, Manhattan, NY",
      price: "$1,800,000",
      type: "Condo",
      beds: 2,
      baths: 2,
      sqft: "1,800",
      ownerWealth: "$8M",
      confidence: "Medium",
    },
    {
      id: 3,
      image: "/placeholder.svg?height=200&width=300",
      address: "789 Ocean View, Miami, FL",
      price: "$3,200,000",
      type: "Townhouse",
      beds: 5,
      baths: 4,
      sqft: "4,100",
      ownerWealth: "$25M",
      confidence: "High",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Properties</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties with verified ownership and wealth insights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.address}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-3 left-3 bg-gray-900">{property.type}</Badge>
                <Badge
                  className={`absolute top-3 right-3 ${
                    property.confidence === "High" ? "bg-green-600" : "bg-yellow-600"
                  }`}
                >
                  {property.confidence} Confidence
                </Badge>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-lg text-gray-900">{property.price}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span className="font-medium">{property.ownerWealth}</span>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{property.address}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <Home className="h-4 w-4 mr-1" />
                    <span>
                      {property.beds} bed, {property.baths} bath
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{property.sqft} sqft</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
