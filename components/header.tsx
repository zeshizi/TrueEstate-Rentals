"use client"

import { Building2, LogOut, User, Settings, Download, Menu, Bookmark } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSession, signOut } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState, useEffect } from "react"

export function Header() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [bookmarkCount, setBookmarkCount] = useState(0)

  useEffect(() => {
    // Update bookmark count when localStorage changes
    const updateBookmarkCount = () => {
      try {
        const saved = localStorage.getItem("property-bookmarks")
        if (saved) {
          const bookmarks = JSON.parse(saved)
          setBookmarkCount(bookmarks.length)
        } else {
          setBookmarkCount(0)
        }
      } catch (error) {
        setBookmarkCount(0)
      }
    }

    // Initial count
    updateBookmarkCount()

    // Listen for storage changes
    window.addEventListener("storage", updateBookmarkCount)

    // Listen for custom bookmark events
    window.addEventListener("bookmarkChanged", updateBookmarkCount)

    return () => {
      window.removeEventListener("storage", updateBookmarkCount)
      window.removeEventListener("bookmarkChanged", updateBookmarkCount)
    }
  }, [])

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold text-gray-900 tracking-tight">TrueEstate</span>
                <span className="text-xs text-gray-500 font-medium -mt-1">Clarity before Capital</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/rent"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-50"
            >
              Rent
            </Link>
            <Link
              href="/buy"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-50"
            >
              Buy
            </Link>
            <Link
              href="/wealth-map"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-50"
            >
              Wealth Map
            </Link>
            <Link
              href="/for-owners"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-50"
            >
              For Owners
            </Link>
            <Link
              href="/for-agents"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-50"
            >
              For Agents
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Bookmarks Button */}
            <Link href="/bookmarks">
              <Button
                variant="ghost"
                size="sm"
                className="relative text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                <Bookmark className="w-4 h-4 mr-2" />
                Bookmarks
                {bookmarkCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {bookmarkCount > 9 ? "9+" : bookmarkCount}
                  </span>
                )}
              </Button>
            </Link>

            {session ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:flex text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download App
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                        <AvatarFallback className="bg-gray-100 text-gray-600 text-sm">
                          {session.user.name?.charAt(0).toUpperCase() || session.user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium text-sm">{session.user.name}</p>
                        <p className="w-[200px] truncate text-xs text-gray-500">{session.user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center text-sm">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/bookmarks" className="flex items-center text-sm">
                        <Bookmark className="mr-2 h-4 w-4" />
                        My Bookmarks ({bookmarkCount})
                      </Link>
                    </DropdownMenuItem>
                    {session.user.role === "admin" && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center text-sm">
                          <Settings className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()} className="flex items-center text-sm">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild className="text-sm font-medium text-gray-600 hover:text-gray-900">
                  <Link href="/auth/signin">Sign in</Link>
                </Button>
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg"
                  asChild
                >
                  <Link href="/auth/signin">Get Started</Link>
                </Button>
              </>
            )}

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 bg-white">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/rent"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-50"
              >
                Rent
              </Link>
              <Link
                href="/buy"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-50"
              >
                Buy
              </Link>
              <Link
                href="/wealth-map"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-50"
              >
                Wealth Map
              </Link>
              <Link
                href="/for-owners"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-50"
              >
                For Owners
              </Link>
              <Link
                href="/for-agents"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-50"
              >
                For Agents
              </Link>
              <Link
                href="/bookmarks"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-md hover:bg-gray-50 flex items-center"
              >
                <Bookmark className="w-4 h-4 mr-2" />
                Bookmarks ({bookmarkCount})
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
