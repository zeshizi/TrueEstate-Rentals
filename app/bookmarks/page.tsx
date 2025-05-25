"use client"

import { PropertyBookmarkManager } from "@/components/property-bookmark-manager"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function BookmarksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">My Bookmarks</h1>
          <p className="text-gray-600 mt-2">Manage your saved properties and export your favorites</p>
        </div>

        <PropertyBookmarkManager />
      </div>
    </div>
  )
}
