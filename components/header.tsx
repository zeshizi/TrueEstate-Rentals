"use client"

import { Building2, LogOut, User, Settings, Download } from "lucide-react"
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

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TrueEstate
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/rent" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Rent
            </Link>
            <Link href="/buy" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Buy
            </Link>
            <Link href="/wealth-map" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              US Wealth Map
            </Link>
            <Link href="/for-owners" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              For Owners
            </Link>
            <Link href="/for-agents" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              For Agents
            </Link>
            <Link href="/auth/verify" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              System Status
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex items-center border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download App
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {session.user.name?.charAt(0).toUpperCase() || session.user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{session.user.name}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">{session.user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    {session.user.role === "admin" && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center">
                          <Settings className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()} className="flex items-center">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild className="text-gray-700 hover:text-blue-600">
                  <Link href="/auth/signin">Login / Register</Link>
                </Button>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  asChild
                >
                  <Link href="/auth/signin">Download App</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
