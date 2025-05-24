"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Building, Search, Map, TrendingUp, Users, Shield, Crown, Menu, X } from "lucide-react"

export function ProfessionalHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    {
      name: "Search",
      href: "/search",
      icon: Search,
      description: "Find properties and owners",
    },
    {
      name: "Wealth Map",
      href: "/wealth-map",
      icon: Map,
      description: "Interactive wealth visualization",
    },
    {
      name: "Properties",
      href: "/properties",
      icon: Building,
      description: "Browse luxury properties",
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: TrendingUp,
      description: "Market insights and trends",
    },
  ]

  const solutions = [
    {
      name: "For Investors",
      href: "/for-investors",
      icon: TrendingUp,
      description: "Investment opportunities and market analysis",
    },
    {
      name: "For Agents",
      href: "/for-agents",
      icon: Users,
      description: "Client prospecting and lead generation",
    },
    {
      name: "For Wealth Managers",
      href: "/for-wealth-managers",
      icon: Crown,
      description: "UHNW client identification and insights",
    },
    {
      name: "Enterprise",
      href: "/enterprise",
      icon: Shield,
      description: "Custom solutions for large organizations",
    },
  ]

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Building className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">TrueEstate</span>
              <Badge variant="secondary" className="ml-2 text-xs">
                BETA
              </Badge>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {/* Platform Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-gray-900">Platform</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[500px] grid-cols-2">
                    {navigation.map((item) => (
                      <NavigationMenuLink key={item.name} asChild>
                        <Link
                          href={item.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="flex items-center space-x-2">
                            <item.icon className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">{item.name}</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{item.description}</p>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Solutions Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-gray-900">Solutions</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[500px] grid-cols-1">
                    {solutions.map((item) => (
                      <NavigationMenuLink key={item.name} asChild>
                        <Link
                          href={item.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="flex items-center space-x-2">
                            <item.icon className="h-4 w-4" />
                            <div className="text-sm font-medium leading-none">{item.name}</div>
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{item.description}</p>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Direct Links */}
              <NavigationMenuItem>
                <Link href="/about" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  About
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/contact" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/auth/signin">
              <Button variant="ghost" className="hidden sm:inline-flex">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
            </Link>

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
              <div className="border-t border-gray-200 pt-4 mt-4">
                {solutions.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
