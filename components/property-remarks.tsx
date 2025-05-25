"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { FileText, User, Shield, TrendingUp, AlertCircle, Lock } from "lucide-react"

interface Remark {
  id: string
  type: "agent" | "owner" | "inspector" | "appraiser"
  author: string
  content: string
  date: string
  isPublic: boolean
  category: "condition" | "pricing" | "market" | "investment" | "legal"
}

interface PropertyRemarksProps {
  propertyId: string
  remarks: Remark[]
  canAddRemark?: boolean
  userRole?: string
}

export function PropertyRemarks({
  propertyId,
  remarks,
  canAddRemark = false,
  userRole = "viewer",
}: PropertyRemarksProps) {
  const [showRemarkForm, setShowRemarkForm] = useState(false)
  const [newRemark, setNewRemark] = useState({
    content: "",
    category: "market" as const,
    isPublic: true,
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "agent":
        return <User className="w-4 h-4" />
      case "inspector":
        return <Shield className="w-4 h-4" />
      case "appraiser":
        return <TrendingUp className="w-4 h-4" />
      case "owner":
        return <FileText className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "condition":
        return "bg-yellow-100 text-yellow-800"
      case "pricing":
        return "bg-green-100 text-green-800"
      case "market":
        return "bg-blue-100 text-blue-800"
      case "investment":
        return "bg-purple-100 text-purple-800"
      case "legal":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleSubmitRemark = () => {
    // Implement remark submission
    console.log("Submitting remark:", newRemark)
    setShowRemarkForm(false)
    setNewRemark({ content: "", category: "market", isPublic: true })
  }

  const publicRemarks = remarks.filter((remark) => remark.isPublic)
  const privateRemarks = remarks.filter((remark) => !remark.isPublic)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Property Remarks & Notes
            </CardTitle>
            {canAddRemark && (
              <Button onClick={() => setShowRemarkForm(!showRemarkForm)} size="sm">
                Add Remark
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 mb-4">Professional insights and observations from industry experts</div>

          {/* Add Remark Form */}
          {showRemarkForm && (
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={newRemark.category}
                    onChange={(e) =>
                      setNewRemark({
                        ...newRemark,
                        category: e.target.value as any,
                      })
                    }
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="market">Market Analysis</option>
                    <option value="pricing">Pricing Assessment</option>
                    <option value="condition">Property Condition</option>
                    <option value="investment">Investment Potential</option>
                    <option value="legal">Legal Considerations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Remark</label>
                  <Textarea
                    value={newRemark.content}
                    onChange={(e) => setNewRemark({ ...newRemark, content: e.target.value })}
                    placeholder="Add your professional insight or observation..."
                    rows={3}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={newRemark.isPublic}
                    onChange={(e) => setNewRemark({ ...newRemark, isPublic: e.target.checked })}
                  />
                  <label htmlFor="isPublic" className="text-sm">
                    Make this remark public
                  </label>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSubmitRemark}>Submit Remark</Button>
                  <Button variant="outline" onClick={() => setShowRemarkForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Public Remarks */}
          {publicRemarks.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Public Remarks</h4>
              {publicRemarks.map((remark) => (
                <div key={remark.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        {getTypeIcon(remark.type)}
                        {remark.type}
                      </Badge>
                      <Badge className={getCategoryColor(remark.category)}>{remark.category}</Badge>
                    </div>
                    <span className="text-xs text-gray-500">{remark.date}</span>
                  </div>
                  <p className="text-gray-700 mb-1">{remark.content}</p>
                  <p className="text-xs text-gray-500">— {remark.author}</p>
                </div>
              ))}
            </div>
          )}

          {/* Private Remarks (for authorized users) */}
          {privateRemarks.length > 0 && userRole !== "viewer" && (
            <div className="space-y-4 mt-6">
              <h4 className="font-medium text-gray-900 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Private Remarks
              </h4>
              {privateRemarks.map((remark) => (
                <div key={remark.id} className="border-l-4 border-red-500 pl-4 py-2 bg-red-50 rounded-r">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        {getTypeIcon(remark.type)}
                        {remark.type}
                      </Badge>
                      <Badge className={getCategoryColor(remark.category)}>{remark.category}</Badge>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Private
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500">{remark.date}</span>
                  </div>
                  <p className="text-gray-700 mb-1">{remark.content}</p>
                  <p className="text-xs text-gray-500">— {remark.author}</p>
                </div>
              ))}
            </div>
          )}

          {publicRemarks.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <AlertCircle className="w-8 h-8 mx-auto mb-2" />
              <p>No remarks available for this property yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
