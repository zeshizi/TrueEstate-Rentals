"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, Search, Filter, Map, List, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileResponsiveLayoutProps {
  children: React.ReactNode
  sidebar?: React.ReactNode
  header?: React.ReactNode
  searchBar?: React.ReactNode
  filters?: React.ReactNode
}

export function MobileResponsiveLayout({ children, sidebar, header, searchBar, filters }: MobileResponsiveLayoutProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "map">("list")

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      {isMobile && (
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {sidebar && (
                <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-2">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 p-0">
                    {sidebar}
                  </SheetContent>
                </Sheet>
              )}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
                  <Home className="h-3 w-3 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">TrueEstate</h1>
                  <p className="text-xs text-gray-500 -mt-1">Clarity before Capital</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {filters && (
                <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-2">
                      <Filter className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full p-0 max-w-sm">
                    <div className="p-4 h-full overflow-y-auto">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Filters</h2>
                        <Button variant="ghost" size="sm" onClick={() => setFiltersOpen(false)}>
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                      {filters}
                    </div>
                  </SheetContent>
                </Sheet>
              )}

              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-8 px-3"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("map")}
                  className="h-8 px-3"
                >
                  <Map className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {searchBar && <div className="mt-3">{searchBar}</div>}
        </div>
      )}

      {/* Desktop Header */}
      {!isMobile && header && <div className="sticky top-0 z-50">{header}</div>}

      {/* Main Layout */}
      <div className={cn("flex", isMobile ? "flex-col" : "flex-row")}>
        {/* Desktop Sidebar */}
        {!isMobile && sidebar && <div className="w-80 bg-white border-r border-gray-200 min-h-screen">{sidebar}</div>}

        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          {/* Desktop Search Bar */}
          {!isMobile && searchBar && <div className="bg-white border-b border-gray-200 p-4">{searchBar}</div>}

          {/* Content Area */}
          <div className={cn("h-full", isMobile ? "p-2 sm:p-4" : "p-6")}>{children}</div>
        </div>

        {/* Desktop Filters */}
        {!isMobile && filters && (
          <div className="w-80 bg-white border-l border-gray-200 min-h-screen">
            <div className="p-6">{filters}</div>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-pb">
          <div className="flex items-center justify-around">
            <Button variant="ghost" size="sm" className="flex-col h-auto py-2 px-3">
              <Search className="h-5 w-5 mb-1" />
              <span className="text-xs">Search</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col h-auto py-2 px-3">
              <Map className="h-5 w-5 mb-1" />
              <span className="text-xs">Map</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col h-auto py-2 px-3">
              <Filter className="h-5 w-5 mb-1" />
              <span className="text-xs">Filters</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col h-auto py-2 px-3">
              <Home className="h-5 w-5 mb-1" />
              <span className="text-xs">Home</span>
            </Button>
          </div>
        </div>
      )}

      {/* Mobile-specific styles */}
      <style jsx>{`
        .safe-area-pb {
          padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
    </div>
  )
}
