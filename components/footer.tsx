import { Building2 } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8" />
              <span className="text-xl font-bold">TrueEstate</span>
            </div>
            <p className="text-gray-400">Transparent real estate insights with verified ownership and wealth data.</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/rent" className="hover:text-white">
                  Rent
                </Link>
              </li>
              <li>
                <Link href="/buy" className="hover:text-white">
                  Buy
                </Link>
              </li>
              <li>
                <Link href="/wealth-map" className="hover:text-white">
                  Wealth Map
                </Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-white">
                  Properties
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Professionals</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/for-agents" className="hover:text-white">
                  For Agents
                </Link>
              </li>
              <li>
                <Link href="/for-owners" className="hover:text-white">
                  For Owners
                </Link>
              </li>
              <li>
                <Link href="/api-access" className="hover:text-white">
                  API Access
                </Link>
              </li>
              <li>
                <Link href="/enterprise" className="hover:text-white">
                  Enterprise
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 TrueEstate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
