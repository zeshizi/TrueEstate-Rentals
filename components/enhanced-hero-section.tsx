import { Button } from "@/components/ui/button"
import Link from "next/link"

const EnhancedHeroSection = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">Unlock Your Potential with Our Platform</h1>
        <p className="text-xl text-gray-700 mb-8">
          Join our community and access powerful tools to achieve your goals.
        </p>
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3" asChild>
          <Link href="/auth/signin">Get Started</Link>
        </Button>
      </div>
    </section>
  )
}

export default EnhancedHeroSection
