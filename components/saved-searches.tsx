"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Save, Search, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SavedSearch {
  id: string
  name: string
  filters: any
  createdAt: Date
  lastUsed?: Date
}

interface SavedSearchesProps {
  currentFilters: any
  onLoadSearch: (filters: any) => void
}

export function SavedSearches({ currentFilters, onLoadSearch }: SavedSearchesProps) {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([])
  const [searchName, setSearchName] = useState("")
  const [showSaveForm, setShowSaveForm] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const saved = localStorage.getItem("saved-searches")
    if (saved) {
      setSavedSearches(JSON.parse(saved))
    }
  }, [])

  const saveCurrentSearch = () => {
    if (!searchName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter a name for this search",
        variant: "destructive",
      })
      return
    }

    const newSearch: SavedSearch = {
      id: `search_${Date.now()}`,
      name: searchName.trim(),
      filters: currentFilters,
      createdAt: new Date(),
    }

    const updated = [...savedSearches, newSearch]
    setSavedSearches(updated)
    localStorage.setItem("saved-searches", JSON.stringify(updated))

    setSearchName("")
    setShowSaveForm(false)

    toast({
      title: "Search Saved",
      description: `"${newSearch.name}" has been saved to your searches`,
    })
  }

  const loadSearch = (search: SavedSearch) => {
    onLoadSearch(search.filters)

    // Update last used date
    const updated = savedSearches.map((s) => (s.id === search.id ? { ...s, lastUsed: new Date() } : s))
    setSavedSearches(updated)
    localStorage.setItem("saved-searches", JSON.stringify(updated))

    toast({
      title: "Search Loaded",
      description: `Applied filters from "${search.name}"`,
    })
  }

  const deleteSearch = (searchId: string) => {
    const updated = savedSearches.filter((s) => s.id !== searchId)
    setSavedSearches(updated)
    localStorage.setItem("saved-searches", JSON.stringify(updated))

    toast({
      title: "Search Deleted",
      description: "Saved search has been removed",
    })
  }

  const getFilterSummary = (filters: any) => {
    const parts = []
    if (filters.location) parts.push(filters.location)
    if (filters.propertyType && filters.propertyType !== "all") parts.push(filters.propertyType)
    if (filters.minValue || filters.maxValue) {
      parts.push(`$${(filters.minValue / 1000000).toFixed(1)}M-$${(filters.maxValue / 1000000).toFixed(1)}M`)
    }
    return parts.join(" • ") || "All properties"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Save className="h-5 w-5" />
            Saved Searches ({savedSearches.length})
          </CardTitle>
          <Button variant="outline" size="sm" onClick={() => setShowSaveForm(!showSaveForm)}>
            <Save className="h-4 w-4 mr-2" />
            Save Current
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showSaveForm && (
          <div className="p-3 border rounded-lg bg-gray-50">
            <div className="flex gap-2">
              <Input
                placeholder="Enter search name..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveCurrentSearch()}
              />
              <Button onClick={saveCurrentSearch} size="sm">
                Save
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowSaveForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {savedSearches.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No saved searches yet</p>
            <p className="text-xs">Save your current filters to quickly access them later</p>
          </div>
        ) : (
          <div className="space-y-2">
            {savedSearches.map((search) => (
              <div key={search.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex-1 cursor-pointer" onClick={() => loadSearch(search)}>
                  <h4 className="font-medium text-sm">{search.name}</h4>
                  <p className="text-xs text-gray-600 mt-1">{getFilterSummary(search.filters)}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      Created {new Date(search.createdAt).toLocaleDateString()}
                    </Badge>
                    {search.lastUsed && (
                      <Badge variant="outline" className="text-xs">
                        Last used {new Date(search.lastUsed).toLocaleDateString()}
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteSearch(search.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
