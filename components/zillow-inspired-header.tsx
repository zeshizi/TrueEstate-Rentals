"use client"

import { Building2, Menu, Bell, Heart } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export function ZillowInspiredHeader() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-blue-600">TrueEstate</span>
            </Link>
          </div>

          {/* Main Navigation - Zillow Style */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/buy" className="text-gray-700 hover:text-blue-600 font-medium text-base transition-colors">
              Buy
            </Link>
            <Link href="/rent" className="text-gray-700 hover:text-blue-600 font-medium text-base transition-colors">
              Rent
            </Link>
            <Link href="/sell" className="text-gray-700 hover:text-blue-600 font-medium text-base transition-colors">
              Sell
            </Link>
            <Link
              href="/wealth-map"
              className="text-gray-700 hover:text-blue-600 font-medium text-base transition-colors relative"
            >
              Wealth Map
              <Badge className="absolute -top-2 -right-8 bg-orange-500 text-white text-xs px-1.5 py-0.5">NEW</Badge>
            </Link>
            <Link
              href="/for-agents"
              className="text-gray-700 hover:text-blue-600 font-medium text-base transition-colors"
            >
              Find an Agent
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                {/* Saved Properties */}
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  <Heart className="w-4 h-4 mr-2" />
                  Saved
                </Button>

                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    3
                  </span>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
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
                      <Link href="/profile">Your Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/saved-properties">Saved Properties</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/search-history">Search History</Link>
                    </DropdownMenuItem>
                    {session.user.role === "admin" && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/admin">Admin Dashboard</Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/auth/signin">Sign in</Link>
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/auth/signin">Join</Link>
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
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-3">
              <Link href="/buy" className="text-gray-700 hover:text-blue-600 font-medium">
                Buy
              </Link>
              <Link href="/rent" className="text-gray-700 hover:text-blue-600 font-medium">
                Rent
              </Link>
              <Link href="/sell" className="text-gray-700 hover:text-blue-600 font-medium">
                Sell
              </Link>
              <Link href="/wealth-map" className="text-gray-700 hover:text-blue-600 font-medium">
                Wealth Map
              </Link>
              <Link href="/for-agents" className="text-gray-700 hover:text-blue-600 font-medium">
                Find an Agent
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
