"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Rocket, MapPin, Shield, Zap } from "lucide-react"

export function ProductionReadyBanner() {
  return (
    <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-full">
            <Rocket className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-green-900">🎉 Production Ready!</h3>
            <p className="text-green-700">Your TrueEstate platform is fully configured and ready to deploy.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">Authentication</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">Database</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">Mapbox</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">APIs</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <a href="/wealth-map">
              <MapPin className="h-4 w-4 mr-2" />
              Launch Wealth Map
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/admin">
              <Shield className="h-4 w-4 mr-2" />
              Admin Dashboard
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/auth/verify">
              <Zap className="h-4 w-4 mr-2" />
              Run Verification
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
