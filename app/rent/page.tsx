import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Key, TrendingUp, Shield } from "lucide-react"

export default function RentPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Rent Properties</h1>
          <p className="text-xl text-gray-600">Premium rental properties with wealth insights</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Luxury Rentals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">High-end rental properties in premium locations</p>
              <Button className="w-full">Browse Rentals</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Investment Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Rental yield analysis and market trends</p>
              <Button className="w-full" variant="outline">
                View Analysis
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Verified Owners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Properties from verified high-net-worth owners</p>
              <Button className="w-full" variant="outline">
                Learn More
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-gray-600">Coming soon: Full rental platform with owner wealth verification</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
