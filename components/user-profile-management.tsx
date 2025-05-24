"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Settings, Heart, Search, Shield, CreditCard } from "lucide-react"

interface UserProfile {
  id: string
  email: string
  name: string
  phone?: string
  company?: string
  licenseNumber?: string
  bio?: string
  avatar?: string
  role: "user" | "agent" | "admin"
  preferences: {
    notifications: boolean
    emailUpdates: boolean
    marketingEmails: boolean
    smsAlerts: boolean
    savedSearches: SavedSearch[]
    bookmarkedProperties: string[]
    preferredLocations: string[]
  }
  subscription: {
    plan: "free" | "basic" | "premium" | "enterprise"
    status: "active" | "inactive" | "cancelled"
    expiresAt?: Date
    features: string[]
  }
  activity: {
    lastLogin?: Date
    searchCount: number
    viewCount: number
    savedCount: number
  }
}

interface SavedSearch {
  id: string
  name: string
  filters: any
  alertsEnabled: boolean
  createdAt: Date
  lastRun?: Date
  resultCount?: number
}

export function UserProfileManagement() {
  const { data: session, update } = useSession()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")

  useEffect(() => {
    loadUserProfile()
  }, [session])

  const loadUserProfile = async () => {
    if (!session?.user?.email) return

    try {
      // Mock user profile data
      const mockProfile: UserProfile = {
        id: session.user.userId || "user_123",
        email: session.user.email,
        name: session.user.name || "",
        phone: "+1 (555) 123-4567",
        company: "Real Estate Ventures LLC",
        licenseNumber: session.user.role === "agent" ? "RE123456789" : undefined,
        bio: "Experienced real estate professional specializing in luxury properties and investment opportunities.",
        avatar: session.user.image,
        role: (session.user.role as any) || "user",
        preferences: {
          notifications: true,
          emailUpdates: true,
          marketingEmails: false,
          smsAlerts: true,
          savedSearches: [
            {
              id: "search_1",
              name: "Beverly Hills Mansions",
              filters: { location: "Beverly Hills", propertyType: "mansion", minValue: 5000000 },
              alertsEnabled: true,
              createdAt: new Date("2024-01-15"),
              lastRun: new Date("2024-01-20"),
              resultCount: 12,
            },
            {
              id: "search_2",
              name: "Manhattan Penthouses",
              filters: { location: "Manhattan", propertyType: "penthouse", minValue: 10000000 },
              alertsEnabled: false,
              createdAt: new Date("2024-01-10"),
              lastRun: new Date("2024-01-18"),
              resultCount: 8,
            },
          ],
          bookmarkedProperties: ["prop_1", "prop_2", "prop_3"],
          preferredLocations: ["Beverly Hills, CA", "Manhattan, NY", "Miami Beach, FL"],
        },
        subscription: {
          plan: session.user.role === "admin" ? "enterprise" : session.user.role === "agent" ? "premium" : "free",
          status: "active",
          expiresAt: new Date("2024-12-31"),
          features:
            session.user.role === "admin"
              ? ["unlimited_searches", "api_access", "analytics", "white_label"]
              : session.user.role === "agent"
                ? ["advanced_search", "lead_management", "crm_integration"]
                : ["basic_search", "property_alerts"],
        },
        activity: {
          lastLogin: new Date(),
          searchCount: 47,
          viewCount: 156,
          savedCount: 23,
        },
      }

      setProfile(mockProfile)
    } catch (error) {
      console.error("Error loading profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const saveProfile = async (updates: Partial<UserProfile>) => {
    if (!profile) return

    setIsSaving(true)
    try {
      // Mock save operation
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setProfile({ ...profile, ...updates })

      // Update session if name changed
      if (updates.name) {
        await update({ name: updates.name })
      }

      console.log("Profile updated successfully")
    } catch (error) {
      console.error("Error saving profile:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const updatePreferences = (key: string, value: any) => {
    if (!profile) return

    const newPreferences = { ...profile.preferences, [key]: value }
    saveProfile({ preferences: newPreferences })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="text-center p-8">
        <p>Unable to load profile. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
              <AvatarFallback className="text-lg">
                {profile.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("") || profile.email[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{profile.name || profile.email}</h1>
              <p className="text-gray-600">{profile.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge
                  variant={profile.role === "admin" ? "default" : profile.role === "agent" ? "secondary" : "outline"}
                >
                  {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                </Badge>
                <Badge variant="outline">{profile.subscription.plan} Plan</Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Member since</div>
              <div className="font-medium">January 2024</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="searches" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Saved Searches
          </TabsTrigger>
          <TabsTrigger value="bookmarks" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Bookmarks
          </TabsTrigger>
          <TabsTrigger value="subscription" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Subscription
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" value={profile.email} disabled />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone || ""}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={profile.company || ""}
                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                  />
                </div>
                {profile.role === "agent" && (
                  <div>
                    <Label htmlFor="license">License Number</Label>
                    <Input
                      id="license"
                      value={profile.licenseNumber || ""}
                      onChange={(e) => setProfile({ ...profile, licenseNumber: e.target.value })}
                    />
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio || ""}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows={4}
                />
              </div>
              <Button onClick={() => saveProfile(profile)} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Email Notifications</Label>
                  <p className="text-sm text-gray-600">Receive property alerts and updates via email</p>
                </div>
                <Switch
                  checked={profile.preferences.emailUpdates}
                  onCheckedChange={(checked) => updatePreferences("emailUpdates", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">SMS Alerts</Label>
                  <p className="text-sm text-gray-600">Get instant notifications via text message</p>
                </div>
                <Switch
                  checked={profile.preferences.smsAlerts}
                  onCheckedChange={(checked) => updatePreferences("smsAlerts", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Marketing Emails</Label>
                  <p className="text-sm text-gray-600">Receive newsletters and promotional content</p>
                </div>
                <Switch
                  checked={profile.preferences.marketingEmails}
                  onCheckedChange={(checked) => updatePreferences("marketingEmails", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Saved Searches Tab */}
        <TabsContent value="searches">
          <Card>
            <CardHeader>
              <CardTitle>Saved Searches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile.preferences.savedSearches.map((search) => (
                  <div key={search.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{search.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant={search.alertsEnabled ? "default" : "secondary"}>
                          {search.alertsEnabled ? "Alerts On" : "Alerts Off"}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {search.resultCount} properties found • Last run {search.lastRun?.toLocaleDateString()}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(search.filters).map(([key, value]) => (
                        <Badge key={key} variant="outline" className="text-xs">
                          {key}: {String(value)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bookmarks Tab */}
        <TabsContent value="bookmarks">
          <Card>
            <CardHeader>
              <CardTitle>Bookmarked Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No bookmarks yet</h3>
                <p className="text-gray-600 mb-4">Start exploring properties and save your favorites here</p>
                <Button>Browse Properties</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscription Tab */}
        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium capitalize">{profile.subscription.plan} Plan</h3>
                  <p className="text-sm text-gray-600">
                    Status: <span className="capitalize">{profile.subscription.status}</span>
                  </p>
                </div>
                <Badge variant={profile.subscription.status === "active" ? "default" : "secondary"}>
                  {profile.subscription.status}
                </Badge>
              </div>

              <div>
                <h4 className="font-medium mb-3">Included Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {profile.subscription.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm capitalize">{feature.replace(/_/g, " ")}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline">Change Plan</Button>
                <Button variant="outline">Billing History</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
