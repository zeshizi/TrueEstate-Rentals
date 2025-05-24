"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, User, Shield, Building, ArrowRight } from "lucide-react"
import Link from "next/link"

export function AuthSuccess() {
  const { data: session } = useSession()

  if (!session) return null

  const getNextSteps = () => {
    switch (session.user.role) {
      case "admin":
        return [
          { label: "Admin Dashboard", href: "/admin", icon: Shield },
          { label: "Manage Properties", href: "/admin/properties", icon: Building },
          { label: "View Analytics", href: "/admin/analytics", icon: Building },
        ]
      case "agent":
        return [
          { label: "Agent Dashboard", href: "/agent", icon: User },
          { label: "My Listings", href: "/agent/listings", icon: Building },
          { label: "Client Management", href: "/agent/clients", icon: User },
        ]
      default:
        return [
          { label: "Search Properties", href: "/search", icon: Building },
          { label: "Wealth Map", href: "/wealth-map", icon: Building },
          { label: "Saved Searches", href: "/profile/searches", icon: User },
        ]
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          Welcome to TrueEstate!
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              {session.user.role === "admin" ? (
                <Shield className="h-6 w-6 text-green-600" />
              ) : (
                <User className="h-6 w-6 text-green-600" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-green-900">Authentication Successful!</h3>
              <p className="text-green-800 text-sm">
                Signed in as <strong>{session.user.name}</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold">Account Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between">
              <span>Email:</span>
              <span>{session.user.email}</span>
            </div>
            <div className="flex justify-between">
              <span>Role:</span>
              <Badge variant="outline">{session.user.role}</Badge>
            </div>
            <div className="flex justify-between">
              <span>Plan:</span>
              <Badge variant="outline">{session.user.subscription?.plan}</Badge>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <Badge className="bg-green-600">{session.user.subscription?.status}</Badge>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold">What's Next?</h4>
          <div className="space-y-2">
            {getNextSteps().map((step, index) => (
              <Button key={index} variant="outline" className="w-full justify-between" asChild>
                <Link href={step.href}>
                  <div className="flex items-center gap-2">
                    <step.icon className="h-4 w-4" />
                    {step.label}
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Platform Features Available</h4>
          <div className="space-y-1 text-sm text-blue-800">
            {session.user.subscription?.features?.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3" />
                {feature.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
