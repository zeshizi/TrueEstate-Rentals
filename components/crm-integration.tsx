"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, Phone, Mail, Calendar, DollarSign, TrendingUp, FileText, Star, Plus } from "lucide-react"

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  source: string
  status: "new" | "contacted" | "qualified" | "proposal" | "closed" | "lost"
  value: number
  lastContact: Date
  nextFollowUp?: Date
  notes: string
  properties: string[]
  agent: string
  score: number
}

interface Activity {
  id: string
  leadId: string
  type: "call" | "email" | "meeting" | "note" | "property_view"
  description: string
  date: Date
  agent: string
}

export function CRMIntegration() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    loadMockData()
  }, [])

  const loadMockData = () => {
    const mockLeads: Lead[] = [
      {
        id: "lead_1",
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+1 (555) 123-4567",
        source: "Website",
        status: "qualified",
        value: 2500000,
        lastContact: new Date("2024-01-18"),
        nextFollowUp: new Date("2024-01-22"),
        notes: "Interested in Beverly Hills properties. Budget $2-3M. Looking for 4+ bedrooms.",
        properties: ["prop_1", "prop_2"],
        agent: "John Smith",
        score: 85,
      },
      {
        id: "lead_2",
        name: "Michael Chen",
        email: "m.chen@techcorp.com",
        phone: "+1 (555) 987-6543",
        source: "Referral",
        status: "proposal",
        value: 5200000,
        lastContact: new Date("2024-01-19"),
        nextFollowUp: new Date("2024-01-21"),
        notes: "Tech executive looking for Manhattan penthouse. Very motivated buyer.",
        properties: ["prop_3"],
        agent: "Jane Doe",
        score: 95,
      },
      {
        id: "lead_3",
        name: "Emily Rodriguez",
        email: "emily.r@investment.com",
        phone: "+1 (555) 456-7890",
        source: "Cold Call",
        status: "new",
        value: 1800000,
        lastContact: new Date("2024-01-20"),
        notes: "Investment property buyer. Looking for rental income opportunities.",
        properties: [],
        agent: "John Smith",
        score: 70,
      },
    ]

    const mockActivities: Activity[] = [
      {
        id: "activity_1",
        leadId: "lead_1",
        type: "call",
        description: "Initial consultation call - discussed requirements",
        date: new Date("2024-01-18"),
        agent: "John Smith",
      },
      {
        id: "activity_2",
        leadId: "lead_2",
        type: "email",
        description: "Sent property proposals for Manhattan penthouses",
        date: new Date("2024-01-19"),
        agent: "Jane Doe",
      },
      {
        id: "activity_3",
        leadId: "lead_1",
        type: "property_view",
        description: "Viewed Beverly Hills mansion listing",
        date: new Date("2024-01-17"),
        agent: "John Smith",
      },
    ]

    setLeads(mockLeads)
    setActivities(mockActivities)
  }

  const getStatusColor = (status: string) => {
    const colors = {
      new: "bg-blue-100 text-blue-800",
      contacted: "bg-yellow-100 text-yellow-800",
      qualified: "bg-green-100 text-green-800",
      proposal: "bg-purple-100 text-purple-800",
      closed: "bg-emerald-100 text-emerald-800",
      lost: "bg-red-100 text-red-800",
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const filteredLeads = statusFilter === "all" ? leads : leads.filter((lead) => lead.status === statusFilter)

  const totalValue = leads.reduce((sum, lead) => sum + lead.value, 0)
  const qualifiedLeads = leads.filter((lead) => lead.status === "qualified" || lead.status === "proposal")

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">CRM Dashboard</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Lead
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Leads</p>
                    <p className="text-2xl font-bold">{leads.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Qualified Leads</p>
                    <p className="text-2xl font-bold">{qualifiedLeads.length}</p>
                  </div>
                  <Star className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pipeline Value</p>
                    <p className="text-2xl font-bold">${(totalValue / 1000000).toFixed(1)}M</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                    <p className="text-2xl font-bold">23%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.slice(0, 5).map((activity) => {
                  const lead = leads.find((l) => l.id === activity.leadId)
                  return (
                    <div key={activity.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                      <div className="flex-shrink-0">
                        {activity.type === "call" && <Phone className="h-5 w-5 text-blue-600" />}
                        {activity.type === "email" && <Mail className="h-5 w-5 text-green-600" />}
                        {activity.type === "meeting" && <Calendar className="h-5 w-5 text-purple-600" />}
                        {activity.type === "note" && <FileText className="h-5 w-5 text-orange-600" />}
                        {activity.type === "property_view" && <TrendingUp className="h-5 w-5 text-red-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{lead?.name}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                      </div>
                      <div className="text-sm text-gray-500">{activity.date.toLocaleDateString()}</div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leads Tab */}
        <TabsContent value="leads" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Label>Filter by status:</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="proposal">Proposal</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4">
            {filteredLeads.map((lead) => (
              <Card
                key={lead.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedLead(lead)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>
                          {lead.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{lead.name}</h3>
                        <p className="text-sm text-gray-600">{lead.email}</p>
                        <p className="text-sm text-gray-600">{lead.phone}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge className={getStatusColor(lead.status)}>
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </Badge>
                      <p className="text-lg font-semibold">${(lead.value / 1000000).toFixed(1)}M</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">{lead.score}/100</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-gray-600">{lead.notes}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-500">
                        Last contact: {lead.lastContact.toLocaleDateString()}
                      </span>
                      {lead.nextFollowUp && (
                        <span className="text-sm text-blue-600">
                          Next follow-up: {lead.nextFollowUp.toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Activities Tab */}
        <TabsContent value="activities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => {
                  const lead = leads.find((l) => l.id === activity.leadId)
                  return (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0">
                        {activity.type === "call" && <Phone className="h-6 w-6 text-blue-600" />}
                        {activity.type === "email" && <Mail className="h-6 w-6 text-green-600" />}
                        {activity.type === "meeting" && <Calendar className="h-6 w-6 text-purple-600" />}
                        {activity.type === "note" && <FileText className="h-6 w-6 text-orange-600" />}
                        {activity.type === "property_view" && <TrendingUp className="h-6 w-6 text-red-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{lead?.name}</h4>
                          <span className="text-sm text-gray-500">{activity.agent}</span>
                        </div>
                        <p className="text-gray-600">{activity.description}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {activity.date.toLocaleDateString()} at {activity.date.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Lead Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Website</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Referrals</span>
                    <span className="font-medium">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cold Calls</span>
                    <span className="font-medium">25%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>New Leads</span>
                    <span className="font-medium">100 (100%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contacted</span>
                    <span className="font-medium">75 (75%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Qualified</span>
                    <span className="font-medium">45 (45%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Closed</span>
                    <span className="font-medium">23 (23%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{selectedLead.name}</CardTitle>
                <Button variant="ghost" onClick={() => setSelectedLead(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Email</Label>
                  <p>{selectedLead.email}</p>
                </div>
                <div>
                  <Label>Phone</Label>
                  <p>{selectedLead.phone}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge className={getStatusColor(selectedLead.status)}>{selectedLead.status}</Badge>
                </div>
                <div>
                  <Label>Value</Label>
                  <p>${selectedLead.value.toLocaleString()}</p>
                </div>
              </div>
              <div>
                <Label>Notes</Label>
                <Textarea value={selectedLead.notes} readOnly />
              </div>
              <div className="flex gap-2">
                <Button>Call</Button>
                <Button variant="outline">Email</Button>
                <Button variant="outline">Schedule Meeting</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
