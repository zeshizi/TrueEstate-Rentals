"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Home,
  DollarSign,
  Calendar,
  MapPin,
  TrendingUp,
  BarChart3,
  Building,
  Ruler,
  RefreshCw,
  AlertCircle,
  CheckCircle,
} from "lucide-react"

interface AttomPropertyDetailsProps {
  address: string
  city: string
  state: string
  onDataUpdate?: (data: any) => void
}

export function AttomPropertyDetails({ address, city, state, onDataUpdate }: AttomPropertyDetailsProps) {
  const [propertyData, setPropertyData] = useState<any>(null)
  const [avmData, setAvmData] = useState<any>(null)
  const [salesHistory, setSalesHistory] = useState<any>(null)
  const [marketData, setMarketData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAttomData = async () => {
    setLoading(true)
    setError(null)

    try {
      // Fetch property details
      const propertyResponse = await fetch(
        `/api/integrations/attom?endpoint=property-detail&address=${encodeURIComponent(address)}&city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}`,
      )
      const propertyResult = await propertyResponse.json()

      if (propertyResult.success) {
        setPropertyData(propertyResult.data)
        onDataUpdate?.(propertyResult.data)
      }

      // Fetch AVM (Automated Valuation Model)
      const avmResponse = await fetch(
        `/api/integrations/attom?endpoint=avm&address=${encodeURIComponent(address)}&city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}`,
      )
      const avmResult = await avmResponse.json()

      if (avmResult.success) {
        setAvmData(avmResult.data)
      }

      // Fetch sales history
      const salesResponse = await fetch(
        `/api/integrations/attom?endpoint=sales-history&address=${encodeURIComponent(address)}&city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}`,
      )
      const salesResult = await salesResponse.json()

      if (salesResult.success) {
        setSalesHistory(salesResult.data)
      }

      // Fetch market data
      const marketResponse = await fetch(
        `/api/integrations/attom?endpoint=market-snapshot&city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}`,
      )
      const marketResult = await marketResponse.json()

      if (marketResult.success) {
        setMarketData(marketResult.data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch ATTOM data")
      console.error("ATTOM Data fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (address && city && state) {
      fetchAttomData()
    }
  }, [address, city, state])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <RefreshCw className="h-6 w-6 animate-spin mr-2" />
          <span>Loading ATTOM property data...</span>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
          <div>
            <p className="text-red-600 font-medium">Error loading ATTOM data</p>
            <p className="text-sm text-gray-500">{error}</p>
            <Button variant="outline" size="sm" onClick={fetchAttomData} className="mt-2">
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const property = propertyData?.property?.[0]
  const avm = avmData?.avm?.[0]
  const sales = salesHistory?.sale || []
  const market = marketData?.market?.[0]

  return (
    <div className="space-y-6">
      {/* Header with ATTOM verification */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              ATTOM Property Intelligence
            </CardTitle>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <Badge variant="secondary">Verified Data</Badge>
              <Button variant="outline" size="sm" onClick={fetchAttomData}>
                <RefreshCw className="h-4 w-4 mr-1" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="valuation">Valuation</TabsTrigger>
          <TabsTrigger value="history">Sales History</TabsTrigger>
          <TabsTrigger value="market">Market Data</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {property ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Property Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Property Type:</span>
                    <span className="text-sm font-medium">{property.summary?.proptype || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Year Built:</span>
                    <span className="text-sm font-medium">{property.summary?.yearbuilt || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Bedrooms:</span>
                    <span className="text-sm font-medium">{property.building?.rooms?.beds || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Bathrooms:</span>
                    <span className="text-sm font-medium">{property.building?.rooms?.bathstotal || "N/A"}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Ruler className="h-4 w-4" />
                    Size & Lot
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Living Area:</span>
                    <span className="text-sm font-medium">
                      {property.building?.size?.livingsize
                        ? `${property.building.size.livingsize.toLocaleString()} sq ft`
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Lot Size:</span>
                    <span className="text-sm font-medium">
                      {property.lot?.lotsize1 ? `${property.lot.lotsize1.toLocaleString()} sq ft` : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Stories:</span>
                    <span className="text-sm font-medium">{property.building?.construction?.stories || "N/A"}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">County:</span>
                    <span className="text-sm font-medium">{property.area?.countrysecsubd || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">School District:</span>
                    <span className="text-sm font-medium">{property.area?.schooldist || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Census Tract:</span>
                    <span className="text-sm font-medium">{property.area?.censustract || "N/A"}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center p-8">
                <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">No property details available from ATTOM</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="valuation" className="space-y-4">
          {avm ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Current Valuation (AVM)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {avm.amount?.value ? formatCurrency(avm.amount.value) : "N/A"}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Confidence Score:</span>
                      <span className="font-medium">{avm.eventinfo?.confidencescore || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Valuation Date:</span>
                      <span className="font-medium">
                        {avm.eventinfo?.eventdate ? formatDate(avm.eventinfo.eventdate) : "N/A"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Value Range
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Low Estimate:</span>
                        <span className="font-medium">
                          {avm.amount?.valuelow ? formatCurrency(avm.amount.valuelow) : "N/A"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">High Estimate:</span>
                        <span className="font-medium">
                          {avm.amount?.valuehigh ? formatCurrency(avm.amount.valuehigh) : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center p-8">
                <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">No valuation data available from ATTOM</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {sales.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Sales History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sales.slice(0, 5).map((sale: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">
                          {sale.amount?.saleamt ? formatCurrency(sale.amount.saleamt) : "N/A"}
                        </div>
                        <div className="text-sm text-gray-600">
                          {sale.eventinfo?.eventdate ? formatDate(sale.eventinfo.eventdate) : "N/A"}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{sale.eventinfo?.saletype || "Sale"}</div>
                        <div className="text-sm text-gray-600">{sale.eventinfo?.documenttype || "N/A"}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center p-8">
                <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">No sales history available from ATTOM</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="market" className="space-y-4">
          {market ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Market Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Median Sale Price:</span>
                    <span className="text-sm font-medium">
                      {market.medianSalePrice ? formatCurrency(market.medianSalePrice) : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Sales:</span>
                    <span className="text-sm font-medium">{market.totalSales || "N/A"}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center p-8">
                <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">No market data available from ATTOM</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
