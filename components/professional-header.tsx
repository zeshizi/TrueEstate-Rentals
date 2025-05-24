import Link from "next/link"
import { Button } from "@/components/ui/button"

const ProfessionalHeader = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto py-4 px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Your Brand
        </Link>
        <nav className="space-x-4">
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
        </nav>
      </div>
    </header>
  )
}

export default ProfessionalHeader
